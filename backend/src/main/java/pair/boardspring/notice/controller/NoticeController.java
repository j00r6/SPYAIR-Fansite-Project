package pair.boardspring.notice.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pair.boardspring.notice.dto.NoticeDto;
import pair.boardspring.notice.service.NoticeService;
import pair.boardspring.resolver.LoginMemberId;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService service;

    @PostMapping
    public ResponseEntity createNotice(@LoginMemberId Long memberId,
                                       @Valid @Positive @RequestBody NoticeDto.Post postDto){
        service.save(postDto, memberId);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    @GetMapping("/page/{pageNum}")
    public ResponseEntity readNoticePage(@PathVariable Long pageNum){
        List<NoticeDto.GetPage> dtoList = service.findNoticePage(pageNum);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/{noticeNum}")
    public ResponseEntity readNoticeDetail(@PathVariable Long noticeNum){
        NoticeDto.responseDetail response = service.findNoticeDetail(noticeNum);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{noticeNum}")
    public ResponseEntity updateNotice(@PathVariable Long noticeNum,
                                      @RequestBody NoticeDto.Patch patchDto) {

        service.update(noticeNum, patchDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @DeleteMapping("/{noticeNum}")
    public ResponseEntity deleteNotice(@PathVariable Long noticeNum){
        service.delete(noticeNum);
        return new ResponseEntity<>("success",HttpStatus.OK);
    }
}
