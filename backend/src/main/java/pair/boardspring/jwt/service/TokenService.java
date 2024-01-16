package pair.boardspring.jwt.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.jwt.token.TokenProvider;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider token;

    public TokenDto login (String email, String password) {
        //Controller 에서 LoginRequest 를 통해 전달받은 ID(email)와 Password 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = token.createToken(authentication);

        return tokenDto;
    }

}
