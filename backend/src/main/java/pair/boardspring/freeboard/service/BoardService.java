package pair.boardspring.freeboard.service;

import jakarta.transaction.Transactional;
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

    public void save(BoardDto.Post postDto, Long memberId){
        Member member = memberService.findVerifyMember(memberId);
        BoardEntity createBoardEntity = mapper.boardPostDtoToBoardEntity(postDto, member);
        Long maxBoardNum = repository.findMaxBoardNum();
        if(maxBoardNum == null){
            maxBoardNum = 0L;
        }
        createBoardEntity.setBoardNum(maxBoardNum+1);
        repository.save(createBoardEntity);
    }

    public void update(Long boardNum, BoardDto.Patch patch) {
        BoardEntity updateBoardEntity = mapper.boardPatchDtoToBoardEntity(patch, repository.findByBoardNum(boardNum));
        repository.save(updateBoardEntity);
    }

    public List<BoardEntity> findAll() {
        return repository.findAll();
    }

    @Transactional
    public void delete(Long boardNum) {
        repository.deleteByBoardNum(boardNum);
        // 삭제된 이후의 모든 주문을 가져와서 순서를 조정
        List<BoardEntity> boardEntities = repository.findByBoardNumGreaterThanOrderByBoardNum(boardNum);
        for(int i=0; i<boardEntities.size(); i++){
            BoardEntity boardEntity = boardEntities.get(i);
            boardEntity.setBoardNum(boardNum+i);
        }
        // 변경된 순서로 업데이트
        repository.saveAll(boardEntities);
    }

    public BoardEntity findBoardById(Long id){
        return repository.findById(id).orElseThrow();
    }

    public BoardDto.responseDetail findBoardDetail(Long id){
        BoardEntity findBoard = repository.findById(id).orElseThrow();
        BoardDto.responseDetail response = mapper.boardResponseDetailDtoToBoardEntity(findBoard);
        response.setMemberId(findBoard.getMember().getMemberId());
        response.setNickName(findBoard.getMember().getNickName());
        return response;
    }

    public List<BoardDto.GetPage> findBoardPage(Long num) {
        int intNum = num.intValue();
        Pageable pageable = PageRequest.of(intNum-1, 10);

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
