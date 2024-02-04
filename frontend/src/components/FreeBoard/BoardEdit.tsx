import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const api = import.meta.env.VITE_APP_API_ENDPOINT;

const BoardEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isEditMode = id !== "new"; // 글 수정 모드 여부 확인

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${api}/board/${id}`, {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const postData = response.data;
        setTitle(postData.title);
        setContent(postData.content);
      } catch (error) {
        console.error("글 불러오기 실패:", error);
      }
    };

    if (isEditMode) {
      fetchPost();
    }
  }, [id, isEditMode]);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("인증 토큰이 없습니다.");
      return;
    }

    try {
      if (isEditMode && id) {
        // 글 수정 모드일 때의 서버 전송 로직
        await axios.patch(
          `${api}/board/${id}`,
          { title, content },
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        console.log("수정 완료");
      } else {
        // 글 작성 모드일 때의 서버 전송 로직
        await axios.post(
          `${api}/board`,
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        console.log("글 등록 완료");
      }
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("글 등록/수정 실패:", error);
    }
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
