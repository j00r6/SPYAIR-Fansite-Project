package pair.boardspring.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pair.boardspring.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    boolean existByEmail(String email);
    boolean existByNickName(String nickName);

}
