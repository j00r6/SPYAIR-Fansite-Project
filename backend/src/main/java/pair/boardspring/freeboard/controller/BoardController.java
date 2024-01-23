package pair.boardspring.freeboard.controller;

import jakarta.validation.constraints.Positive;
import pair.boardspring.freeboard.dto.BoardDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pair.boardspring.freeboard.entity.BoardEntity;
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
    public ResponseEntity createBoard(@RequestBody BoardDto.Post postDto){
        BoardEntity boardEntity = service.save(postDto);
        return new ResponseEntity<>(boardEntity, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity readBoard(){
        List<BoardEntity> boardEntity = service.findAll();
        return new ResponseEntity<>(boardEntity, HttpStatus.OK);
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
        return readBoard();
    }
}