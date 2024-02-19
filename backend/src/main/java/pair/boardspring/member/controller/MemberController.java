package pair.boardspring.member.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pair.boardspring.member.dto.SignInRequest;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.service.MemberService;
import pair.boardspring.resolver.LoginMemberId;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService service;

    @PostMapping("/register")
    public ResponseEntity memberSignIn(@RequestBody SignInRequest request) {

        service.signInMember(request);
        return new ResponseEntity<>("회원가입 성공!", HttpStatus.OK);
    }

    @PostMapping("/test-resolver")
    public ResponseEntity resolverTest(@Valid @LoginMemberId @Positive Long memberId ) {

        Member findMember = service.findVerifyMember(memberId);
        Member hasToken = service.validateAccessToken(memberId);

        log.info("잘찾아오니 " + findMember.getEmail());
        if (findMember.getMemberId() == memberId) {
            return new ResponseEntity<>("테스트성공~", HttpStatus.OK);
        }
        return new ResponseEntity<>("실패ㅠㅠ", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity findMember(@PathVariable("member-id") @LoginMemberId Long memberId) {
        Member findMember = service.findVerifyMember(memberId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(findMember);
    }

}
