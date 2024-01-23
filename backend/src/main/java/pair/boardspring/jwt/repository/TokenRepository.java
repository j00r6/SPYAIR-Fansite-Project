package pair.boardspring.jwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pair.boardspring.jwt.dto.TokenDto;
import pair.boardspring.jwt.entity.Token;
import pair.boardspring.member.entity.Member;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, String> {
    boolean existsByAccessToken (String accessToken);
    Optional<Token> findByMember (Member member);

    Optional<Token> findByRefreshToken (String refreshToken);
}
