package pair.boardspring.security.userdetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pair.boardspring.member.entity.Authority;
import pair.boardspring.member.entity.Member;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public class CustomUserDetails implements UserDetails {

    private final Member member;

    public CustomUserDetails(Member member){
        this.member = member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return member.getRoles()
                .stream()
                .map(o -> new SimpleGrantedAuthority(o.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    public Long getMemberId() {
        return member.getMemberId();
    }

    public String getNickName() { return member.getNickName(); }

    public List<Authority> getRoles() { return member.getRoles(); }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
