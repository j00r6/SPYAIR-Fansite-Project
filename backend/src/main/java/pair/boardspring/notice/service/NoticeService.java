package pair.boardspring.notice.service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pair.boardspring.member.entity.Member;
import pair.boardspring.member.service.MemberService;
import pair.boardspring.notice.dto.NoticeDto;
import pair.boardspring.notice.entity.NoticeEntity;
import pair.boardspring.notice.mapper.NoticeMapper;
import pair.boardspring.notice.repository.NoticeRepository;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class NoticeService {
    private final NoticeRepository repository;
    private final NoticeMapper mapper;
    private final MemberService memberService;

    public void save(NoticeDto.Post postDto, Long memberId){
        Member member = memberService.findVerifyMember(memberId);
        NoticeEntity createNoticeEntity = mapper.noticePostDtoToNoticeEntity(postDto, member);
        Long maxNoticeNum = repository.findMaxNoticeNum();
        if(maxNoticeNum == null){
            maxNoticeNum = 0L;
        }
        createNoticeEntity.setNoticeNum(maxNoticeNum+1);
        repository.save(createNoticeEntity);
    }

    public void update(Long noticeNum, NoticeDto.Patch patch) {
        NoticeEntity updateNoticeEntity = mapper.noticePatchDtoToNoticeEntity(patch, repository.findByNoticeNum(noticeNum));
        repository.save(updateNoticeEntity);
    }

    public List<NoticeDto.GetPage> findAllNotice() {
        Sort sort = Sort.by(Sort.Direction.DESC, "noticeNum");
        List<NoticeEntity> findAllNotice = repository.findAll(sort);
        return mapper.noticeGetPageDtoListToNoticeEntityList(findAllNotice);
    }

    public List<NoticeEntity> findAll() {
        return repository.findAll();
    }

    @Transactional
    public void delete(Long noticeNum) {
        repository.deleteByNoticeNum(noticeNum);
        // 삭제된 이후의 모든 주문을 가져와서 순서를 조정
        List<NoticeEntity> noticeEntities = repository.findByNoticeNumGreaterThanOrderByNoticeNum(noticeNum);
        for(int i=0; i<noticeEntities.size(); i++){
            NoticeEntity noticeEntity = noticeEntities.get(i);
            noticeEntity.setNoticeNum(noticeNum+i);
        }
        // 변경된 순서로 업데이트
        repository.saveAll(noticeEntities);
    }

    public NoticeEntity findNoticeById(Long id){
        return repository.findById(id).orElseThrow();
    }

    public NoticeDto.responseDetail findNoticeDetail(Long id){
        NoticeEntity findNotice = repository.findByNoticeNum(id);
        NoticeDto.responseDetail response = mapper.noticeResponseDetailDtoToNoticeEntity(findNotice);
        Long totalNum = repository.findMaxNoticeNum();
        response.setTotalNum(totalNum);
        response.setMemberId(findNotice.getMember().getMemberId());
        response.setNickName(findNotice.getMember().getNickName());
        return response;
    }

    public List<NoticeDto.GetPage> findNoticePage(Long num) {
        int intNum = num.intValue();
        Pageable pageable = PageRequest.of(intNum-1, 10);

        Page<NoticeEntity> page = findAllPaged(pageable);
        List<NoticeDto.GetPage> dtoList = page.getContent().stream()
                .map(NoticeDto.GetPage::fromEntity)  // 정적 메서드를 사용해서 Entity를 DTO로 변환
                .toList();
        return dtoList;
    }

    public List<NoticeDto.GetPage> findNoticePageSize(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        Page<NoticeEntity> pageList = findAllPaged(pageable);
        List<NoticeDto.GetPage> dtoList = pageList.getContent().stream()
                .map(NoticeDto.GetPage::fromEntity)
                .toList();
        return dtoList;
    }

    public Page<NoticeEntity> findAllPaged(Pageable pageable) {
        return repository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending()));
    }

}
