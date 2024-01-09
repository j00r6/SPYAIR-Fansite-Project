package pair.boardspring.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pair.boardspring.member.dto.SignInRequest;
import pair.boardspring.member.entity.Authority;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;

import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository repository;
    private final PasswordEncoder encoder;

    /**
     * loginId 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkLoginIdDuplicate(String email) {
        return repository.existByEmail(email);
    }

    /**
     * nickname 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkNicknameDuplicate(String nickname) {
        return repository.existByNickName(nickname);
    }

    // 가입시 USER 권한 부여
    //PasswordEncoder 로 비밀번호 암호화
    public void signInMember (SignInRequest request) {
        Member.setRoles(Collections.singletonList(Authority.builder().name("ROLE_USER").build()));
        repository.save(request.SignInRequestToEntity(encoder.encode(request.getPassword())));
    }


}
