package pair.boardspring.freeboard.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import pair.boardspring.freeboard.dto.BoardDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pair.boardspring.freeboard.service.BoardService;
import pair.boardspring.resolver.LoginMemberId;

import java.util.List;

@RequestMapping("/board")
@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService service;

    @PostMapping
    public ResponseEntity createBoard(@RequestBody BoardDto.Post postDto,
                                      @Valid @Positive @LoginMemberId Long memberId){
        service.save(postDto, memberId);
        return new ResponseEntity<>("success",HttpStatus.CREATED);
    }

    @GetMapping("/page/{pageNum}")
    public ResponseEntity readBoardPage(@PathVariable Long pageNum){
        List<BoardDto.GetPage> dtoList = service.findBoardPage(pageNum);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/{boardNum}")
    public ResponseEntity readBoardDetail(@PathVariable Long boardNum){
        BoardDto.responseDetail response = service.findBoardDetail(boardNum);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{boardNum}")
    public ResponseEntity updateBoard(@PathVariable Long boardNum,
                                      @RequestBody BoardDto.Patch patchDto) {

        service.update(boardNum, patchDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @DeleteMapping("/{boardNum}")
    public ResponseEntity deleteBoard(@PathVariable Long boardNum){
        service.delete(boardNum);
        return new ResponseEntity<>("success",HttpStatus.OK);
    }
}
