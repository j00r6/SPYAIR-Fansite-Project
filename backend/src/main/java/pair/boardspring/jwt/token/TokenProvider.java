package pair.boardspring.jwt.token;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import pair.boardspring.global.exception.IllegalToken;
import pair.boardspring.global.exception.TokenExpiredException;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.security.userdetails.CustomUserDetails;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class TokenProvider implements InitializingBean {

    private Key key;

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenTime;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenTime;

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenDto.response createToken(Authentication authentication) {

        String accessToken = createAccessToken(authentication);
        String refreshToken = createRefreshToken(authentication);

        // TokenDto 생성
        return new TokenDto.response("Bearer", accessToken, refreshToken);
    }

    public String createAccessToken(Authentication authentication) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        Date actExpiryDate = new Date(new Date().getTime() + accessTokenTime);

        return Jwts.builder()
                .setSubject(customUserDetails.getUsername())
                .claim("memberId", customUserDetails.getMemberId())
                .claim("email", customUserDetails.getUsername())
                .claim("nickName", customUserDetails.getNickName())
                .claim("roles", customUserDetails.getRoles())
                .claim("auth", authorities)
                .setIssuedAt(new Date())
                .setExpiration(actExpiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }


    public String createRefreshToken(Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        Date retExpiryDate = new Date(new Date().getTime() + refreshTokenTime);

        return Jwts.builder()
                .setSubject(customUserDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(retExpiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("memberId", Long.class);
    }


    // 토큰으로 클레임을 만들고 이를 이용해 유저 객체를 만들어서 최종적으로 authentication 객체를 리턴
    public Authentication getAuthentication(String accessToken) {

        Claims claims = parseClaims(accessToken);

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        org.springframework.security.core.userdetails.User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, accessToken, authorities);
    }


    // 토큰의 유효성 검증을 수행
    public boolean validateAcessToken(String accessToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {

        } catch (ExpiredJwtException e) {
            //적절한 exception code 활용 "만료된 JWT 토큰입니다."
            throw new TokenExpiredException("AccessToken 시간 만료!");
        } catch (UnsupportedJwtException e) {
            //적절한 exception code 활용 "지원되지 않는 JWT 토큰입니다."
            log.info("지원되지 않는 JWT 입니다.");
        } catch (IllegalArgumentException e) {
            //적절한 exception code 활용 "JWT 토큰이 잘못되었습니다."
            throw new IllegalToken ("토큰 정보가 잘못됐습니다!");
        }
        return false;
    }

    private Claims parseClaims (String accessToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

}
