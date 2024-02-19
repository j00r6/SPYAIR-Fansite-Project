package pair.boardspring.oauth2;

import lombok.Builder;
import lombok.Getter;
import pair.boardspring.member.entity.Member;
import pair.boardspring.oauth2.entity.SocialType;
import pair.boardspring.oauth2.userinfo.GoogleAuthUserinfo;
import pair.boardspring.oauth2.userinfo.KaKaoAuthUserinfo;
import pair.boardspring.oauth2.userinfo.NaverAuthUserinfo;
import pair.boardspring.oauth2.userinfo.OauthUserInfo;

import java.util.Map;
import java.util.UUID;

@Getter
public class OAuthAttributes {

    private String nameAttributeKey;
    private OauthUserInfo oauthUserInfo;

    @Builder
    public OAuthAttributes(String nameAttributeKey, OauthUserInfo oauthUserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauthUserInfo = oauthUserInfo;
    }

    public static OAuthAttributes of(SocialType socialType,
                                     String userNameAttributeName, Map<String, Object> attributes) {

        if (socialType == SocialType.NAVER) {
            return ofNaver(userNameAttributeName, attributes);
        }
        if (socialType == SocialType.KAKAO) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauthUserInfo(new KaKaoAuthUserinfo(attributes))
                .build();
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauthUserInfo(new GoogleAuthUserinfo(attributes))
                .build();
    }

    public static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauthUserInfo(new NaverAuthUserinfo(attributes))
                .build();
    }

    public Member toEntity(SocialType socialType, OauthUserInfo oauthUserInfo) {
        return Member.builder()
                .socialType(socialType)
                .socialId(oauthUserInfo.getId())
                .email(UUID.randomUUID() + "@socialUser.com")
                .nickName(oauthUserInfo.getNickName())
                .build();
    }
}

