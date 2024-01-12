package pair.boardspring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        http
//                .headers()
//                .frameOptions()
//                .disable()
//                .and()
//                .csrf().disable()
//                .cors().configurationSource(corsConfigurationSource())
//                .and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .apply(new CustomFilterConfigurer())
//                .and()
//                .authorizeHttpRequests(authorize -> authorize
//                        .antMatchers(HttpMethod.POST, "/members/**").permitAll()
//                        .antMatchers(HttpMethod.PATCH, "/members/**").permitAll()
//                        .antMatchers(HttpMethod.DELETE, "/members/**").permitAll()
//                        .antMatchers(HttpMethod.GET, "/members/**").permitAll()
//                        .anyRequest().permitAll());
//        return http.build();
//    }

    /**
     * 필터체인 각 메서드 별 설명 참조 사이트
     * https://jwlim94.tistory.com/15
     */

    /**
     * 기존의 builder 방식에서 Lambda 로 변경된 이유
     *
     * 공식 문서에서는 기존에 작성하던 방식이 코드 가독성을 해쳐서
     * 코드를 작성하고 활용하는데 어려움을 준다고 설명합니다.
     *
     * 원문 참조 링크
     * https://docs.spring.io/spring-security/reference/migration-7/configuration.html#_use_the_lambda_dsl
     */
    @Bean
    public SecurityFilterChain basicConfig (HttpSecurity http) throws Exception {
        http
                /**
                 * 의문점 : CSRF 공격을 방지하려면 설정을 disable 하는것이 아니라 활용해야 하는것 아닌가?
                 *
                 * 답 : CSRF의 공격 방식은 SSR 방식에서 쿠키와 세션을 활용한 인증방식으로 서버에 인증정보를 저장하던 시점에서 많이 이루어지던 공격이다.
                 * 현대의 REST API 개발 에서는 CSR 방식을 많이 활용하여
                 * 서버에 인증정보를 저장하지 않고 토큰 방식을 통해 클라이언트에서 정보를 저장하기 때문에 CSRF 공격으로 부터 비교적 안전하다고 한다.
                 *
                 * https://tlatmsrud.tistory.com/77
                 */
                .csrf(AbstractHttpConfigurer::disable) //  CSRF 비활성화 대체가능 .csrf((csrf) -> csrf.disable())

                /**
                 * formLogin 과 httpBasic 을 disable 처리할 경우
                 * UsernamePasswordAuthenticationFilter 를 사용하지 않게 되지만
                 * 추후에 토큰인증 방식에서 해당 필터를 활용하여 JWT 토큰 발급 전에 로그인 인증을 구현한다.
                 *
                 * 로그인 인증 기능은 반드시 UsernamePasswordAuthenticationFilter만 이용해서 구현해야 한다고 정해져 있는 건 아니다.
                 * 예를 들어 OncePerRequestFilter 같은 Filter를 이용해서 구현할 수도 있으며,
                 * Controller 에서 API 엔드포인트로 구현하는 방법도 많이 사용하는 방법이다.
                 */
                .formLogin(AbstractHttpConfigurer::disable)
                // formLogin 비활성화 대체 가능 .formLogin((formLogin) -> formLogin.disable())
                // 로컬 개발일 경우 sameOrigin 사용하여 동일출처 허용
                .httpBasic(AbstractHttpConfigurer::disable) //

                //토큰 방식 활용을 위해 Session Stateless 설정
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                /**
                 * frameOptions 설정은 HTML 에서 <frame>, <iframe>, <object> 등의 태그를 활용하여
                 * 웹 보안 취약점을 노려 clickjacking 공격을 방지하기 위해 사용한다.
                 */
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))


                /**
                 * CORS 설정을 활용하는 방법중 가장 쉬운 방법이 CorsFilter 를 활용하는 방법
                 * corsConfigurationSource 를 Bean 으로 설정함으로써 CorsFilter 를 활용 가능
                 *
                 * .cors((cors) -> cors
                 * 				.configurationSource(apiConfigurationSource()))
                 *
                 * 	위와 같이 메서드 명(apiConfigurationSource)을 ㅂ구분하여 서로 다른 CORS 설정을 세팅 가능
                 *
                 * 	공식문서 참조
                 * 	https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html#page-title
                 */

                //CORS withDefaults 사용 시 Bean 으로 등록된 corsConfigurationSource 을 사용합니다.
                // Todo : 1월 8일 회의 이후 CORS 세팅 corsConfigurationSource 구현하기
                .cors(withDefaults())

                /**
                 * MEMBER 의 인증/인가 구현
                 * 권한에 따른 페이지 구분을 구현할 경우
                 * Member Entity 상에서 Enum 으로 구분할 때
                 * ROLE_"권한" 양식을 사용해야 Spring Security 에서 인식을 한다.
                 */
                .securityMatcher("/api/**", "/app/**")

                /**
                 * 다중 필터체인 구현에서 authorizeHttpRequests 와 configurationSource 의 연관관계
                 *
                 * 다중 필터체인을 구현하는 이유는 authorizeHttpRequests 를 활용하여 URL 패턴별로 권한을 나눌때 사용한다.
                 * authorizeHttpRequests 를 활용하여 URL 별로 권한을 나누어 구현을 할 경우
                 * 각각의 필터체인마다 CORS 설정을 위해 configurationSource 를 구현해주어야한다.
                 *
                 * 공식문서 참조
                 * https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html#page-title
                 *
                 * authorizeHttpRequests 은 인증/인가 에 관한 설정을 해주고
                 * configurationSource 는 단순히 CORS 설정을 위한 것
                 */
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                );


        return http.build();
    }


    /**
     * TODO : MEMBER 에 권한정보를 부여할지 말지 결정 그에 따라 다중 필터체인 적용 여부를 확인
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:8080","https://ea60-121-162-236-116.ngrok-free.app", "http://3.35.193.208:8080", "chrome-extension://ggnhohnkfcpcanfekomdkjffnfcjnjam", "http://pettalk-bucket.s3-website.ap-northeast-2.amazonaws.com")); //직접입력
        configuration.setAllowedMethods(Arrays.asList("*")); // 직접입력
        configuration.setAllowedHeaders(Arrays.asList("*")); // 직접입력
        configuration.setExposedHeaders(Arrays.asList("*","Authorization","Refresh")); //직접입력
        configuration.setAllowCredentials(true); // true일 경우 * 가 작동안함
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);//직접입력
        return source;
    }


    /**
     * Spring Security 에서 기본으로 제공되는 PasswordEncoder 외에
     * DelegatingPasswordEncoder 를 구현하여 커스텀 하는것이 가능
     * Spring Security 의 PasswordEncoder 에 기본으로 내장되어있는것은 NoOpPasswordEncoder 로 단방향 암호화 방식
     *
     * 한층더 보안이 강화된 방식을 활용하려면 PasswordEncoder 를 커스텀하여
     * DelegatingPasswordEncoder 를 구현하여 사용한다.
     *
     * 공식문서 참조
     * https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html#authentication-password-storage-dpe
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    public static PasswordEncoder createDelegatingPasswordEncoder() {
        String encodingId = "bcrypt";
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put(encodingId, new BCryptPasswordEncoder());
//        encoders.put("noop", org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance());
//        encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
//        encoders.put("scrypt", new SCryptPasswordEncoder());
//        encoders.put("argon2", new Argon2PasswordEncoder());
        return new DelegatingPasswordEncoder(encodingId, encoders);
    }
}
