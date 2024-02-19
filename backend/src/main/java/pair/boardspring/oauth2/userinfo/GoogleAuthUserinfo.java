package pair.boardspring.oauth2.userinfo;

import java.util.Map;

public class GoogleAuthUserinfo extends OauthUserInfo{
    public GoogleAuthUserinfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getNickName() {
        return (String) attributes.get("name");
    }
}
