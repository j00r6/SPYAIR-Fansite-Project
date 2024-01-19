package pair.boardspring.jwt.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.jwt.service.TokenService;
import pair.boardspring.jwt.token.TokenProvider;
import pair.boardspring.member.dto.LogInRequest;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class TokenController {
    private final TokenService service;
    private final TokenProvider token;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> memberLogin (@RequestBody LogInRequest request) {
        TokenDto tokenDto = service.login(request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tokenDto);
    }
}
