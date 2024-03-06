package pair.boardspring.oauth2.oauthUser;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import pair.boardspring.member.entity.Authority;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
public class CustomOauth2User extends DefaultOAuth2User {

    private String email;
    private String nickName;
    private List<Authority> role;
    private Long memberId;

    public CustomOauth2User(Collection<? extends GrantedAuthority> authorities,
                            Map<String, Object> attributes, String nameAttributeKey,
                            String email, List<Authority> role, String nickName, Long memberId) {
        super(authorities, attributes, nameAttributeKey);
        this.email = email;
        this.nickName = nickName;
        this.role = role;
        this.memberId = memberId;
    }
}