package pair.boardspring.oauth2.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import pair.boardspring.oauth2.service.OauthService;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class OAuth2LoginSecurityConfig {

    private final OauthService oauthService;
    @Bean
    public SecurityFilterChain oauth2FilterChain (HttpSecurity http) throws Exception {
        http
                .oauth2Login((auth) -> auth
                        .userInfoEndpoint((userInfo) -> userInfo
                                .userService(oauthService)
                ));
        return http.build();
    }
}
