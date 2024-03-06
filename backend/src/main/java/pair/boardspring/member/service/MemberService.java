package pair.boardspring.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pair.boardspring.global.exception.BadRequestException;
import pair.boardspring.global.exception.LoginIdDuplicateException;
import pair.boardspring.global.exception.TokenExpiredException;
import pair.boardspring.jwt.entity.Token;
import pair.boardspring.jwt.repository.TokenRepository;
import pair.boardspring.member.dto.SignInRequest;
import pair.boardspring.member.entity.Authority;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final TokenRepository tokenRepository;
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
        // 이메일 중복검사
        if (checkLoginIdDuplicate(request.getEmail())) throw new LoginIdDuplicateException("이미 존재하는 이메일입니다.");

        if (checkNickNameDuplicate(request.getNickName())) throw new BadRequestException("이미 존재하는 닉네임입니다.");

        // 빌더 패턴 활용해 SignInRequestToEntity 메서드 구현하고 Mapper 대체
        Member member = request.SignInRequestToEntity(encoder.encode(request.getPassword()));

        // 회원의 권한을 "USER"로 설정
        Authority userRole = Authority.builder().name("ROLE_USER").build();
        member.setRoles(Collections.singletonList(userRole));

        // 회원 정보를 저장
        repository.save(member);
    }

//    public Member validateAccessToken (Long memberId) {
//        Member findMember = findVerifyMember(memberId);
//        Optional<Token> haveAccessToken = tokenRepository.findByMember(findMember);
//        if (haveAccessToken.isPresent()) {
//            return null;
//        } else {
//            throw new TokenExpiredException("토큰이 만료되었슴니당!");
//        }
//    }

    public Member findVerifyMember(Long memberId) {
        Optional<Member> member = repository.findById(memberId);
        return member.get();
    }

    public Member findMemberByPrincipal(String principal) {
        Optional<Member> optionalMember = repository.findByEmail(principal);
        if (!optionalMember.isPresent()) {
            return null;
        }
        return optionalMember.get();
    }

    public void giveAdmin(Long memberId) {
        Member findMember = repository.findByMemberId(memberId);
        Authority giveAdmin = Authority.builder().name("ROLE_ADMIN").build();
        findMember.setRoles(Collections.singletonList(giveAdmin));
    }
}
