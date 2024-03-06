package pair.boardspring.oauth2.userinfo;

import java.util.Map;

public abstract class OauthUserInfo {

    protected Map<String, Object> attributes;

    public OauthUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getId(); //소셜 식별 값 : 구글 - "sub", 카카오 - "id", 네이버 - "id"

    public abstract String getNickName();

    public abstract String getEmail();
}
