package pair.boardspring.resolver;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.service.MemberService;

@Component
@Slf4j
public class LoginUserIdArgumentResolver implements HandlerMethodArgumentResolver {
    private final MemberService memberService;


    public LoginUserIdArgumentResolver(MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        parameter.getParameterAnnotations();
        return true;
    }


    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName(); // 사용자 인증 정보
        log.info(principal.toString() + " principal");

        // 익명이면 -1L 리턴
        if ("anonymousUser".equals(principal)) {
            return -1L;
        }

        Member member = memberService.findMemberByPrincipal(principal.toString());
        return member.getMemberId();
    }
}
