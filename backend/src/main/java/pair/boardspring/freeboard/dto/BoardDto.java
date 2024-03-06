package pair.boardspring.freeboard.dto;


import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import pair.boardspring.freeboard.entity.BoardEntity;
import pair.boardspring.member.entity.Member;

import java.time.LocalDateTime;

public class BoardDto {
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
        private Long boardNum;
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
        private Long boardNum;
        private String title;
        private String nickName;
        private LocalDateTime createdAt;

        public GetPage() {

        }

        public static GetPage fromEntity(BoardEntity entity) {
            GetPage dto = new GetPage();
            dto.setBoardNum(entity.getBoardNum());
            dto.setTitle(entity.getTitle());
            dto.setCreatedAt(entity.getCreatedAt());
            dto.setNickName(entity.getMember().getNickName());
            return dto;
        }
    }
}
