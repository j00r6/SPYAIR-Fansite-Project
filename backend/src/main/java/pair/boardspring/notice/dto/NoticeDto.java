package pair.boardspring.notice.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pair.boardspring.notice.entity.NoticeEntity;

import java.time.LocalDateTime;

public class NoticeDto {
    @Getter
    @Setter
    public static class Patch{
        private String title;
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        private String title;
        private String content;
    }

    @Getter
    @Setter
    public static class responseDetail{
        private Long noticeNum;
        private String title;
        private String content;
        private Long memberId;
        private String nickName;
        private Long totalNum;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class GetPage{
        private Long noticeNum;
        private String title;
        private String nickName;
        private LocalDateTime createdAt;

        public GetPage() {

        }

        public static GetPage fromEntity(NoticeEntity entity) {
            GetPage dto = new GetPage();
            dto.setNoticeNum(entity.getNoticeNum());
            dto.setTitle(entity.getTitle());
            dto.setCreatedAt(entity.getCreatedAt());
            dto.setNickName(entity.getMember().getNickName());
            return dto;
        }
    }
}
