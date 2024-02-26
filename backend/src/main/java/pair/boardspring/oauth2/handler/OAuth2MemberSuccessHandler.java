package pair.boardspring.oauth2.handler;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import pair.boardspring.jwt.token.TokenProvider;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;
import pair.boardspring.member.service.MemberService;
import pair.boardspring.oauth2.oauthUser.CustomOauth2User;
import pair.boardspring.security.userdetails.CustomUserDetails;

import java.io.IOException;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Component
public class OAuth2MemberSuccessHandler implements AuthenticationSuccessHandler, InitializingBean {
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final CustomOauth2User customOauth2User;

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

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        CustomOauth2User customOauth2User = (CustomOauth2User) authentication.getPrincipal();

        String accessToken = createAccessToken(customOauth2User.getEmail());

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.addHeader("Authorization-refresh", "Bearer " + refreshToken);
    }

    public String createAccessToken(String email) {

        Date actExpiryDate = new Date(new Date().getTime() + accessTokenTime);

        return Jwts.builder()
                .setSubject(email)
                .claim("memberId", customOauth2User.get)
                .setIssuedAt(new Date())
                .setExpiration(actExpiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
}