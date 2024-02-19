package pair.boardspring.jwt.dto;

import lombok.*;
import pair.boardspring.jwt.entity.Token;
import pair.boardspring.member.entity.Member;

@Getter
@Builder
@AllArgsConstructor
public class TokenDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class response {
        String type;
        String accessToken;
        String refreshToken;

        public Token TokenDtoToEntity() {
            return Token.builder()
                    .refreshToken(this.refreshToken)
                    .accessToken(this.accessToken)
                    .build();
        }
    }

    public static class request {
        String accessToken;
        String refreshToken;
    }
}
