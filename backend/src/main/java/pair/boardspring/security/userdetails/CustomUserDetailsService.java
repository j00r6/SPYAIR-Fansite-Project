package pair.boardspring.security.userdetails;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import pair.boardspring.exception.BusinessLogicException;
import pair.boardspring.exception.ExceptionCode;

import pair.boardspring.member.entity.Member;
import pair.boardspring.member.repository.MemberRepository;

import java.util.Collection;
import java.util.Optional;


@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = repository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        Collection<? extends GrantedAuthority> authorities = findMember.getRoles().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .toList();

        return new User(findMember.getEmail(), findMember.getPassword(), authorities);
    }
}

//    private org.springframework.security.core.userdetails.User createMember(Member member) {
//
//        List<GrantedAuthority> grantedAuthorities = member.getRoles().stream()
//                    .map(authority -> new SimpleGrantedAuthority(authority.getName()))
//                    .collect(Collectors.toList());
//
//        return new org.springframework.security.core.userdetails.User(member.getEmail(),
//                    member.getPassword(),
//                    grantedAuthorities);
//    }

