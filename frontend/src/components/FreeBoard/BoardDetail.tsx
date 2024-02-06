import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavigationButtons from "../NavigationButtons";

const api = import.meta.env.VITE_APP_API_ENDPOINT;
const accessToken = localStorage.getItem("accessToken");
interface Post {
  boardNum: number;
  title: string;
  content: string;
  memberId: number;
  nickName: string;
  createdAt: string;
  updatedAt: string;
  totalNum: number;
}

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);

  useEffect(() => {
    if (accessToken) {
      try {
        const parts = accessToken.split(".");
        if (parts.length === 3) {
          let payload = parts[1];
          payload = payload.replace(/-/g, "+").replace(/_/g, "/");
          const decodedPayload = atob(payload);
          const parsedPayload = JSON.parse(decodedPayload);
          setCurrentMemberId(parsedPayload.memberId);
        }
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${api}/board/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        console.log("응답:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("엥 실패ㅋㅋ:", error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  const handleEdit = () => {
    navigate(`/free-board-edit/${post.boardNum}`);
  };

  const handleDelete = async () => {
    if (!accessToken) {
      console.error("인증 토큰이 없습니다.");
      return;
    }

    if (window.confirm("이 글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${api}/board/${post.boardNum}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("글 삭제 완료");
        navigate("/free-board");
      } catch (error) {
        console.error("글 삭제 실패:", error);
      }
    }
  };

  console.log("토큰", currentMemberId);

  return (
    <Container>
      <Title>{post.title}</Title>
      <Section>
        <CreateSection>
          <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
          <Author>{post.nickName}</Author>
        </CreateSection>
        {currentMemberId === post.memberId && (
          <EditSection>
            <EditButton onClick={handleEdit}>수정</EditButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </EditSection>
        )}
      </Section>
      <Content>{post.content}</Content>
      <NavigationButtons postId={post.boardNum} totalPost={post.totalNum} />
    </Container>
  );
};

export default BoardDetail;

const Container = styled.div``;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 0.5rem;
`;

const Section = styled.div`
  display: flex;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #333333;
  justify-content: space-between;
`;

const CreateSection = styled.div`
  display: flex;
`;

const PostTime = styled.span`
  font-size: 12px;
  margin-right: 1rem;
`;

const Author = styled.span`
  font-size: 12px;
`;
const EditSection = styled.span`
  font-size: 12px;
`;

const EditButton = styled.span`
  font-size: 12px;
  margin-right: 1rem;
  cursor: pointer;
`;

const DeleteButton = styled.span`
  font-size: 12px;
  cursor: pointer;
`;

const Content = styled.div`
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333333;
`;
