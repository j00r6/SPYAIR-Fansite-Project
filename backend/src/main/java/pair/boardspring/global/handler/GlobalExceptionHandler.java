package pair.boardspring.global.handler;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pair.boardspring.global.exception.IllegalToken;
import pair.boardspring.global.exception.LoginIdDuplicateException;
import pair.boardspring.global.exception.MemberNotFoundException;
import pair.boardspring.global.exception.TokenExpiredException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Message> handle(BadRequestException e) {
        Message message = new Message(e.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LoginIdDuplicateException.class)
    public ResponseEntity<Message> handle(LoginIdDuplicateException e) {
        Message message = new Message(e.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<Message> handle(TokenExpiredException e) {
        Message message = new Message(e.getMessage(), HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalToken.class)
    public ResponseEntity<Message> handle(IllegalToken e) {
        Message message = new Message(e.getMessage(), HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<Message> handle(MemberNotFoundException e) {
        Message message = new Message(e.getMessage(), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}