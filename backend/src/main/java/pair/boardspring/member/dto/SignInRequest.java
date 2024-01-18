package pair.boardspring.member.dto;

import lombok.*;
import pair.boardspring.member.entity.Authority;
import pair.boardspring.member.entity.Member;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {
    public String email;
    public String password;
    public String nickName;
    public String name;

    private List<Authority> roles = new ArrayList<>();


    public Member SignInRequestToEntity(String encryptPassword) {
        return Member.builder()
                .email(this.email)
                .password(encryptPassword)
                .nickName(this.nickName)
                .name(this.name)
                .roles(this.roles)
                .build();
    }
}
