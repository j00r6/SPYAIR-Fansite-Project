package pair.boardspring.notice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import pair.boardspring.member.entity.Member;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long noticeNum;
    private String title;
    private String content;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PreUpdate
    public void setUpdatedAt(){
        this.updatedAt = LocalDateTime.now();
    }
}
