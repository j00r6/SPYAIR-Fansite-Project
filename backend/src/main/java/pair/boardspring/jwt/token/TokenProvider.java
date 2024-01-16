package pair.boardspring.jwt.token;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.security.userdetails.CustomUserDetails;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider implements InitializingBean {

    private static final String AUTHORITIES_KEY = "auth";
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

    // 빈이 생성되고 주입을 받은 후에 secret값을 Base64 Decode해서 key 변수에 할당하기 위해
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenDto createToken(Authentication authentication) {
        // 권한정보 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 토큰 유효시간 설정
        long now = (new Date()).getTime();
        Date validity = new Date(now + this.accessTokenTime);

        // 토큰에 유저정보 담기
//        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
//        Long memberId = userDetails.getMemberId();
//        String email = userDetails.getUsername();

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities) // 정보 저장
//                .claim("memberId", memberId)
                .signWith(key, SignatureAlgorithm.HS512) // 사용할 암호화 알고리즘과 , signature 에 들어갈 secret값 세팅
                .setExpiration(validity) // set Expire Time 해당 옵션 안넣으면 expire안함
                .compact();

        return TokenDto.builder()
                .accessToken(accessToken)
                .type("Bearer")
                .build();
    }

    // 토큰으로 클레임을 만들고 이를 이용해 유저 객체를 만들어서 최종적으로 authentication 객체를 리턴
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // 토큰의 유효성 검증을 수행
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {

        } catch (ExpiredJwtException e) {
            //적절한 exception code 활용 "만료된 JWT 토큰입니다."

        } catch (UnsupportedJwtException e) {
            //적절한 exception code 활용 "지원되지 않는 JWT 토큰입니다."

        } catch (IllegalArgumentException e) {
            //적절한 exception code 활용 "JWT 토큰이 잘못되었습니다."

        }
        return false;
    }

}
