package pair.boardspring.security.userdetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import pair.boardspring.exception.BadRequestException;
//import pair.boardspring.exception.BusinessLogicException;
//import pair.boardspring.exception.ExceptionCode;

import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;

import java.util.Collection;
import java.util.Optional;


@Component("userDetailsService")
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository repository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = repository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BadRequestException("존재하지 않는 회원정보 입니다!"));

        log.info("로그인한 멤버의 멤버 ID " + findMember.getMemberId().toString());

        Collection<? extends GrantedAuthority> authorities = findMember.getRoles().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .toList();

        return new CustomUserDetails(findMember);
    }
}


