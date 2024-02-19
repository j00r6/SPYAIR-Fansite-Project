package pair.boardspring.member.entity;

import jakarta.persistence.*;
import lombok.*;
import pair.boardspring.jwt.entity.Token;
import pair.boardspring.oauth2.entity.SocialType;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "MEMBER")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long memberId;

    @Column
    public String email;

    @Column
    public String password;

    @Column
    public String nickName;

    @Column
    public String socialId;

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    //빌더 패턴 디폴트로 비어있는 roles List 를 설정해놓고
    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Authority> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    public void setRoles(List<Authority> role) {
        this.roles = role;
        role.forEach(o -> o.setMember(this));
    }

}
