package pair.boardspring.freeboard.controller;

import org.apache.coyote.Response;
import pair.boardspring.freeboard.dto.BoardDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pair.boardspring.freeboard.entity.BoardEntity;
import pair.boardspring.freeboard.service.BoardService;

import java.net.http.HttpResponse;
import java.util.List;

@RequestMapping("/board")
@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService service;

    /**
      member와 연결 해야함
     **/
    @PostMapping
    public ResponseEntity createBoard(@RequestBody BoardDto.Post postDto){
        BoardEntity boardEntity = service.save(postDto);
        return new ResponseEntity<>(boardEntity, HttpStatus.CREATED);
    }

    @GetMapping("/page/{num}")
    public ResponseEntity readBoardPage(@PathVariable int num){
        List<BoardDto.GetPage> dtoList = service.findBoardPage(num);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity readBoardDetail(@PathVariable Long id){
        BoardEntity responseEntity = service.findBoardById(id);
        return new ResponseEntity<>(responseEntity, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity updateBoard(@PathVariable Long id,
                                      @RequestBody BoardDto.Patch patchDto) {
        BoardEntity boardEntity = service.update(id, patchDto);
        return new ResponseEntity<>(boardEntity, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteBoard(@PathVariable Long id){
        service.delete(id);
        return readBoardPage(1);
    }
}
