package pair.boardspring.freeboard.mapper;

import pair.boardspring.freeboard.dto.BoardDto;
import pair.boardspring.freeboard.entity.BoardEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import pair.boardspring.member.entity.Member;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    BoardEntity boardPostDtoToBoardEntity(BoardDto.Post postDto, Member member);
    @Mapping(target = "id", ignore = true)
    BoardEntity boardPatchDtoToBoardEntity(BoardDto.Patch patchDto, @MappingTarget BoardEntity boardEntity);

    BoardDto.responseDetail boardResponseDetailDtoToBoardEntity(BoardEntity findBoard);
}
