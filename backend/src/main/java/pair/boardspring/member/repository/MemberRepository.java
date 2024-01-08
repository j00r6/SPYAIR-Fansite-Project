package pair.boardspring.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pair.boardspring.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existByEmail(String email);
    boolean existByNickName(String nickName);

}
