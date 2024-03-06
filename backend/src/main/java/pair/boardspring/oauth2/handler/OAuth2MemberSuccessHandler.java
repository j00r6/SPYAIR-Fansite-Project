package pair.boardspring.oauth2.handler;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.jwt.entity.Token;
import pair.boardspring.jwt.repository.TokenRepository;
import pair.boardspring.oauth2.oauthUser.CustomOauth2User;
import pair.boardspring.security.userdetails.CustomUserDetails;

import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Component
public class OAuth2MemberSuccessHandler implements AuthenticationSuccessHandler,InitializingBean {
    private final TokenRepository tokenRepository;

    private Key key;

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.oauth-access-token-expiration-minutes}")
    private int accessTokenTime;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenTime;

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        //로그인한 유저의 권한정보 Resource Server 로부터 받아오기
        CustomOauth2User customOauth2User = (CustomOauth2User) authentication.getPrincipal();

        //로그인한 유저정보가 저장된 authentication 을 활용하여 토큰생성하기
        String accessToken = createAccessToken(authentication);
        String refreshToken = createRefreshToken(authentication);

        //생성된 토큰 정보를 Entity 객체로 변환하여 tokenRepository 에 저장하기
        Token token = createToken(authentication).TokenDtoToEntity();
        tokenRepository.save(token);

        //tokenRepository 에 잘 저장됐는지 memberId 기반으로 검색하여 확인하기
        log.info("tokenRepository 저장 확인 (findByMemberId) : " + customOauth2User.getMemberId());

        //소셜로그인 완료후 인증된 정보를 바탕으로 accessToken 생성 해당 토큰을 응답헤더 에 포함시키기
        response.addHeader("Authorization", "Bearer " + accessToken);
        response.addHeader("Authorization-refresh", "Bearer " + refreshToken);

        // 사용자를 리다이렉트할 페이지로 이동
//        String redirectUrl = "http://localhost:5173";
//        response.sendRedirect(redirectUrl + accessToken);
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

        CustomOauth2User customOauth2User = (CustomOauth2User) authentication.getPrincipal();

        Date actExpiryDate = new Date(new Date().getTime() + accessTokenTime);

        return Jwts.builder()
                .setSubject(customOauth2User.getEmail())
                .claim("email", customOauth2User.getEmail())
                .claim("nickName", customOauth2User.getNickName())
                .claim("roles", customOauth2User.getRole())
                .claim("memberId", customOauth2User.getMemberId())
                .claim("auth", authorities)
                .setIssuedAt(new Date())
                .setExpiration(actExpiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String createRefreshToken(Authentication authentication) {

        CustomOauth2User customOauth2User = (CustomOauth2User) authentication.getPrincipal();
        Date retExpiryDate = new Date(new Date().getTime() + refreshTokenTime);

        return Jwts.builder()
                .setSubject(customOauth2User.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(retExpiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
}