package pair.boardspring.jwt.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pair.boardspring.exception.TokenExpiredException;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.jwt.entity.Token;
import pair.boardspring.jwt.repository.TokenRepository;
import pair.boardspring.jwt.token.TokenProvider;
import pair.boardspring.member.dto.LogInRequest;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;
import pair.boardspring.member.service.MemberService;
import pair.boardspring.security.userdetails.CustomUserDetails;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TokenService {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;

    public TokenDto login(LogInRequest request) {
        //Controller 에서 LoginRequest 를 통해 전달받은 ID(email)와 Password 객체 생성
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("이메일 정보를 찾을수 없습니다! : " + request.getEmail()));

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        Token token = tokenProvider.createToken(authentication).TokenDtoToEntity();
        token.setMember(member);

        if(!checkTokenDuplicate(tokenProvider.createAccessToken(authentication))) {
            tokenRepository.save(token);
        }
        return tokenProvider.createToken(authentication);
    }

    public void logoutAndRemoveToken (Long memberId) {
        Member findMember = memberService.findVerifyMember(memberId);
        Optional<Token> refreshTokenOptional = tokenRepository.findByMember(findMember);
        refreshTokenOptional.ifPresent(refreshToken -> {
            tokenRepository.delete(refreshToken);
        });
        SecurityContextHolder.clearContext();
    }

    public String refreshToken(String refreshToken) {
        if (tokenProvider.validateAcessToken(refreshToken)) {
            Token token = tokenRepository.findByRefreshToken(refreshToken).orElseThrow(
                    () -> new IllegalArgumentException("해당 REFRESH_TOKEN 을 찾을 수 없습니다.\nREFRESH_TOKEN = " + refreshToken));

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(token.getMember().getEmail(), token.getMember().getPassword());
            Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

            return tokenProvider.createRefreshToken(authentication);
        }
        return null;
    }

    public boolean checkTokenDuplicate(String accessToken) {
        return tokenRepository.existsByAccessToken(accessToken);
    }

    //엑세스토큰 만료 검증 만료시 refreshtoken 으로 재발급 진행
    public boolean checkAccessTokenExpired (String accessToken) {
        return true;
    }
}
