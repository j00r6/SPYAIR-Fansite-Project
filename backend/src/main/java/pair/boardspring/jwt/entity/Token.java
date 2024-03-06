package pair.boardspring.jwt.entity;

import jakarta.persistence.*;
import lombok.*;
import pair.boardspring.member.entity.Member;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TOKEN")
//@RedisHash(value = "jwtToken", timeToLive = 60*60*24) // TTL(timeToLive) = 레디스 데이터 만료시간 설정
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 512)
    private String refreshToken;

//    @Indexed
    @Column(length = 512)
    private String accessToken;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Token EntityToTokenDto() {
        return Token.builder()
                .refreshToken(this.refreshToken)
                .accessToken(this.accessToken)
                .build();
    }
}
