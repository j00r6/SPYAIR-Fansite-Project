package pair.boardspring.oauth2.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import pair.boardspring.global.exception.LoginIdDuplicateException;
import pair.boardspring.member.entity.Authority;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;
import pair.boardspring.oauth2.OAuthAttributes;
import pair.boardspring.oauth2.entity.SocialType;
import pair.boardspring.oauth2.oauthUser.CustomOauth2User;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    private static final String NAVER = "naver";
    private static final String KAKAO = "kakao";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        SocialType socialType = getSocialType(registrationId);
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuthAttributes extractAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);
        Member createdMember = getUser(extractAttributes, socialType);

        log.info("OAuthUser 멤버아이디 찾기 1 : " + createdMember.getMemberId());

        return new CustomOauth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdMember.getRoles().toString())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdMember.getEmail(),
                createdMember.getRoles(),
                createdMember.getNickName(),
                createdMember.getMemberId()
        );
    }
    private SocialType getSocialType(String registrationId) {
        if(NAVER.equals(registrationId)) {
            return SocialType.NAVER;
        }
        if(KAKAO.equals(registrationId)) {
            return SocialType.KAKAO;
        }
        return SocialType.GOOGLE;
    }

    private Member getUser(OAuthAttributes attributes, SocialType socialType) {
        Member findMember = memberRepository.findBySocialIdAndSocialType(attributes.getOauthUserInfo().getId(), socialType)
                .orElse(null);

        if(findMember == null) {
            return saveMember(attributes, socialType);
        }
        return findMember;
    }

    private Member saveMember(OAuthAttributes attributes, SocialType socialType) {
        Member createOAuthMember = attributes.toEntity(socialType, attributes.getOauthUserInfo());
        Authority userRole = Authority.builder().name("ROLE_SOCIAL").build();
        boolean findMemberEmail = memberRepository.existsByEmail(createOAuthMember.getEmail());

        if (socialType != null) {
            createOAuthMember.setRoles(Collections.singletonList(userRole));
        }

        if (findMemberEmail){
            throw new LoginIdDuplicateException("이미 존재하는 회원정보입니다!");
        }

        return memberRepository.save(createOAuthMember);
    }
}