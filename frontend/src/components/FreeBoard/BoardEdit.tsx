import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BoardEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isEditMode = id != null; // 글 수정 모드 여부 확인

  useEffect(() => {
    if (isEditMode) {
      // 글 수정 모드일 때 기존 데이터 불러오기
      // API 요청을 통해 해당 글 데이터 불러오는 로직 구현
      setTitle("기존 제목");
      setContent("기존 내용");
    } else {
      // 글 작성 모드일 때 입력창 초기화
      setTitle("");
      setContent("");
    }
  }, [id, isEditMode]);

  const handleSubmit = () => {
    if (isEditMode) {
      // 글 수정 모드일 때의 서버 전송 로직
      console.log(`수정 - 제목: ${title}, 내용: ${content}`);
    } else {
      // 글 작성 모드일 때의 서버 전송 로직
      console.log(`작성 - 제목: ${title}, 내용: ${content}`);
    }
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <Container>
      <Title>{isEditMode ? "Edit Post" : "Write Post"}</Title>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
      />
      <ContentInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <SubmitButton onClick={handleSubmit}>
        {isEditMode ? "수정 완료" : "글 등록"}
      </SubmitButton>
    </Container>
  );
};

export default BoardEdit;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: 1px solid #ffffff;
`;

const ContentInput = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 1px solid #ffffff;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  width: 15%;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  background-color: #000000;
  color: #ffffff;
  border: 1px solid white;
  margin-bottom: 1rem;
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;
