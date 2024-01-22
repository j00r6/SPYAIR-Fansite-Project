import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const BoardEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // API 요청을 통해 해당 글 데이터 불러오는 로직 구현 해야함

    // 임시 초기 상태
    setTitle("기존 제목");
    setContent("기존 내용");
  }, [id]);

  const handleSubmit = () => {
    // 여기에서 수정된 데이터를 서버에 전송하는 로직을 구현하세요.
    // 예시에서는 콘솔에 출력하고 이전 페이지로 이동합니다.
    console.log(`제목: ${title}, 내용: ${content}`);
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <Container>
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <ContentInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
    </Container>
  );
};

export default BoardEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  /* 스타일링 */
`;

const ContentInput = styled.textarea`
  /* 스타일링 */
`;

const SubmitButton = styled.button`
  /* 스타일링 */
`;
