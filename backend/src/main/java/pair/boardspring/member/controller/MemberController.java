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

        service.signInMember(request);
        return new ResponseEntity<>("회원가입 성공!", HttpStatus.OK);
    }
}
