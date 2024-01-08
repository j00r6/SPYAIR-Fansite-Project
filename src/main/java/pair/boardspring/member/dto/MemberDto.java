package pair.boardspring.member.dto;

import lombok.*;
import pair.boardspring.member.entity.Member;

public class MemberDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class signInRequest {
        public String email;
        public String password;
        public String nickName;
        public String phone;
        public String name;

        public Member signInRequestToEntity() {
            return Member.builder()
                    .email(this.email)
                    .password(this.password)
                    .nickName(this.nickName)
                    .phone(this.phone)
                    .name(this.name)
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class patchRequest {
        public String email;
        public String password;
        public String nickName;
        public String phone;
        public String name;

        public Member patchRequestToEntity() {
            return Member.builder()
                    .email(this.email)
                    .password(this.password)
                    .nickName(this.nickName)
                    .phone(this.phone)
                    .name(this.name)
                    .build();
        }

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class logInRequest {
        public String email;
        public String password;
    }


}
