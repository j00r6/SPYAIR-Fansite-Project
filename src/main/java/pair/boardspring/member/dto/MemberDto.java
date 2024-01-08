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

    // 로그인 시
    @Getter
    @Setter
    @NoArgsConstructor
    public static class logInRequest {
        public String email;
        public String password;
    }

    // 마이페이지 접근 Or 회원정보 조히 시
    @Getter
    @Setter
    @NoArgsConstructor
    public static class memberInfoRequest {
        public String email;
        public String password;
        public String nickName;
        public String phone;
        public String name;
        // 게시글 리스트 추가
    }

    // 마이페이지 에서 회원정보 수정 시
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




}
