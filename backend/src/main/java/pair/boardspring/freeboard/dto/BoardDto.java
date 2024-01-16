package pair.boardspring.freeboard.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

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
        private String memberId;
//        private MultipartFile imgFile;

    }
}
