package pair.boardspring.freeboard.repository;

import org.springframework.data.jpa.repository.Query;
import pair.boardspring.freeboard.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    List<BoardEntity> findByBoardNumGreaterThanOrderByBoardNum(Long boardNum);
    @Query("SELECT MAX(b.boardNum) FROM BoardEntity b")
    Long findMaxBoardNum();

    BoardEntity findByBoardNum(Long boardNum);

    void deleteByBoardNum(Long boardNum);
}
