package pair.boardspring.member.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pair.boardspring.member.repository.MemberRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository repository;
    public boolean checkLoginIdDuplicate(String loginId) {
        return repository.existByEmail(loginId);
    }
}
