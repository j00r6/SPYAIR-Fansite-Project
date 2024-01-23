package pair.boardspring.freeboard.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import pair.boardspring.freeboard.entity.BoardEntity;

import java.time.LocalDateTime;

public class BoardDto {
    @Getter
    @Setter
    public static class Patch{
        private String title;
        private String content;
//        private MultipartFile imgFile;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {
        private String title;
        private String content;
//        private String memberId;
//        private MultipartFile imgFile;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class GetPage{
        private Long id;
        private String title;
        private LocalDateTime createdAt;

        public GetPage() {

        }

        public static GetPage fromEntity(BoardEntity entity) {
            GetPage dto = new GetPage();
            dto.setId(entity.getId());
            dto.setTitle(entity.getTitle());
            dto.setCreatedAt(entity.getCreatedAt());
            return dto;
        }
    }
}
