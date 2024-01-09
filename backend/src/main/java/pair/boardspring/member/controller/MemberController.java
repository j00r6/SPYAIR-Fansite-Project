package pair.boardspring.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pair.boardspring.member.dto.SignInRequest;
import pair.boardspring.member.service.MemberService;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService service;

    @PostMapping("/register")
    public ResponseEntity memberSignIn(@RequestBody SignInRequest request) {

        // 이메일 중복 체크
        if (service.checkLoginIdDuplicate(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("이메일 중복!");
        }
        // 닉네임 중복 체크
        if (service.checkNickNameDuplicate(request.getNickName())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("닉네임 중복!");
        }
        service.signInMember(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("회원가입 성공!");
    }
}
