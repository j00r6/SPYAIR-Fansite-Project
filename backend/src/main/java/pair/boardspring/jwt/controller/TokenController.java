package pair.boardspring.jwt.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pair.boardspring.jwt.dto.RefreshDto;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.jwt.entity.Token;
import pair.boardspring.jwt.service.TokenService;
import pair.boardspring.jwt.token.TokenProvider;
import pair.boardspring.member.dto.LogInRequest;
import pair.boardspring.resolver.LoginMemberId;

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

    @PostMapping("/logout")
    public ResponseEntity memberLogout (@LoginMemberId Long memberId) {
        try {
            service.logoutAndRemoveToken(memberId);
            return new ResponseEntity<>("로그아웃 완료되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity regenerateAccessToken (@RequestHeader("REFRESH_TOKEN") String refreshToken) {
        String newAccessToken = service.refreshToken(refreshToken);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(newAccessToken);
    }
}
