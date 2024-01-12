package pair.boardspring.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pair.boardspring.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findById(Long memberId);
    boolean existsByEmail(String email);
    boolean existsByNickName(String nickName);

    Optional<Member> findOneWithAuthoritiesByEmail(String username);
}
