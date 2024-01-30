package pair.boardspring.notice.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pair.boardspring.notice.entity.NoticeEntity;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity, Long> {
    List<NoticeEntity> findByNoticeNumGreaterThanOrderByNoticeNum(Long noticeNum);
    @Query("SELECT MAX(n.noticeNum) FROM NoticeEntity n")
    Long findMaxNoticeNum();
    NoticeEntity findByNoticeNum(Long noticeNum);
    void deleteByNoticeNum(Long noticeNum);


}
