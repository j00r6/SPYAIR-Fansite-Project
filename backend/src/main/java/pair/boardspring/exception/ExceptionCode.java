package pair.boardspring.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    CHAT_NOT_FOUND(404, "Chat not found"),
    POST_NOT_FOUND(404, "Post not found"),
    BOARD_NOT_FOUND(404, "Board not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ALREADY_SUBMIT(409, "Already submit"),
    COMMENT_EXISTS(409, "Comment exists"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    PASSWORD_NOT_MATCHED(409, "Password not matched"),
    ACCESS_DENIED(401, "Access denied");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
