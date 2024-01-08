package com.pair.boardspring.board.mapper;

import com.pair.boardspring.board.dto.BoardDto;
import com.pair.boardspring.board.entity.BoardEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    BoardEntity boardPostDtoToBoardEntity(BoardDto.Post postDto);
    @Mapping(target = "id", ignore = true)
    BoardEntity boardPatchDtoToBoardEntity(BoardDto.Patch patchDto, @MappingTarget BoardEntity boardEntity);
}
