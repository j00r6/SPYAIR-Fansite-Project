package pair.boardspring.notice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import pair.boardspring.member.entity.Member;
import pair.boardspring.notice.dto.NoticeDto;
import pair.boardspring.notice.entity.NoticeEntity;

@Mapper(componentModel = "spring")
public interface NoticeMapper {
    NoticeEntity noticePostDtoToNoticeEntity(NoticeDto.Post postDto, Member member);
    @Mapping(target = "id", ignore = true)
    NoticeEntity noticePatchDtoToNoticeEntity(NoticeDto.Patch patchDto, @MappingTarget NoticeEntity boardEntity);

    NoticeDto.responseDetail noticeResponseDetailDtoToNoticeEntity(NoticeEntity findBoard);
}
