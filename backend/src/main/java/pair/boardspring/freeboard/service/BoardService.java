package pair.boardspring.freeboard.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import pair.boardspring.freeboard.dto.BoardDto;
import pair.boardspring.freeboard.mapper.BoardMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pair.boardspring.freeboard.entity.BoardEntity;
import pair.boardspring.freeboard.repository.BoardRepository;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.service.MemberService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class BoardService {
    private final BoardRepository repository;
    private final BoardMapper mapper;
    private final MemberService memberService;

    public BoardEntity save(BoardDto.Post postDto){
//         예시: 서버 파일 시스템에 저장
//         이미지 파일을 저장할 경로 설정
//        String filePath = "/path/to/save/images/" + postDto.getImgFile().getOriginalFilename();
////
//        // 파일 저장
//        try {
//            Files.copy(postDto.getImgFile().getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
//        } catch (IOException e) {
//            e.printStackTrace();  // 예외 처리 필요
//        }
//
//        // 데이터베이스에는 이미지 파일의 경로를 저장

        // 로그인 정보 불러오기
//        log.info("prcp1");
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        log.info(principal+"prcp2");
//        Member member = memberService.findMemberByPrincipal(principal.toString());
        BoardEntity createBoardEntity = mapper.boardPostDtoToBoardEntity(postDto);
//        createBoardEntity.setMember(member);

//        createBoardEntity.setImgPath(filePath);
        repository.save(createBoardEntity);

        return createBoardEntity;
    }

    public BoardEntity update(Long id, BoardDto.Patch patch) {
        BoardEntity updateBoardEntity = mapper.boardPatchDtoToBoardEntity(patch, findBoardById(id));
        repository.save(updateBoardEntity);
        return updateBoardEntity;

    }

    public List<BoardEntity> findAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public BoardEntity findBoardById(Long id){
        return repository.findById(id).orElseThrow();
    }

    public List<BoardDto.GetPage> findBoardPage(int num) {
        Pageable pageable = PageRequest.of(num-1, 10);

        Page<BoardEntity> page = findAllPaged(pageable);
        List<BoardDto.GetPage> dtoList = page.getContent().stream()
                .map(BoardDto.GetPage::fromEntity)  // YourDTO의 정적 메서드를 사용해서 Entity를 DTO로 변환
                .toList();
        return dtoList;
    }

    public Page<BoardEntity> findAllPaged(Pageable pageable) {
        return repository.findAll(PageRequest.of(pageable.getPageNumber(), 10, Sort.by("id").descending()));
    }


}
