package pair.boardspring.jwt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.jwt.token.TokenProvider;
import pair.boardspring.member.dto.LogInRequest;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;
import pair.boardspring.security.userdetails.CustomUserDetails;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final MemberRepository repository;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider token;

    public TokenDto login (LogInRequest request) {
        //Controller 에서 LoginRequest 를 통해 전달받은 ID(email)와 Password 객체 생성
        Member member = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("이메일 정보를 찾을수 없습니다! : " + request.getEmail()));

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return token.createAccessToken(authentication);
    }

}
