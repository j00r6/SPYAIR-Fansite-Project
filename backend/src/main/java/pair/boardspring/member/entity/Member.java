package pair.boardspring.member.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MEMBER")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long memberId;

    @Column(columnDefinition = "VARCHAR(255)")
    public String email;

    @Column(columnDefinition = "VARCHAR(255)")
    public String password;

    @Column(columnDefinition = "VARCHAR(255)")
    public String nickName;

    @Column(columnDefinition = "VARCHAR(255)")
    public String phone;

    @Column(columnDefinition = "VARCHAR(255)")
    public String name;

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

    public void setRoles(List<Authority> role) {
        this.roles = role;
        role.forEach(o -> o.setMember(this));
    }

}
