package pair.boardspring.jwt.dto;

import lombok.*;

@Getter
@Setter
public class RefreshDto {
    @AllArgsConstructor
    @Getter
    @Setter
    public static class postRequest {
        private String refreshToken;
        private String accessToken;
    }
}
