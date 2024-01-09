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
import java.util.Optional;

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
        return repository.existsByEmail(email);
    }

    /**
     * nickname 중복 체크
     * 회원가입 기능 구현 시 사용
     * 중복되면 true return
     */
    public boolean checkNickNameDuplicate(String nickName) {
        return repository.existsByNickName(nickName);
    }

    // 가입시 USER 권한 부여
    //PasswordEncoder 로 비밀번호 암호화
    public void signInMember (SignInRequest request) {

//        Member findMember = repository.findByEmail(request.getEmail());
//        findMember.setRoles(Collections.singletonList(Authority.builder().name("ROLE_USER").build()));

//        repository.save(request.SignInRequestToEntity(encoder.encode(request.getPassword())));

        // 빌더 패턴 활용해 SignInRequestToEntity 메서드 구현하고 Mapper 대체
        Member member = request.SignInRequestToEntity(encoder.encode(request.getPassword()));

        // 회원의 권한을 "USER"로 설정
        Authority userRole = Authority.builder().name("ROLE_USER").build();
        member.setRoles(Collections.singletonList(userRole));

        // 회원 정보를 저장
        repository.save(member);
    }

    public Member findVerifyMember(Long memberId) {
        Optional<Member> member = repository.findById(memberId);
        return member.get();
    }


}
