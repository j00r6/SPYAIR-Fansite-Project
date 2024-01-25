import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavigationButtons from "./NavigationButtons";

const api = import.meta.env.VITE_APP_API_ENDPOINT;

interface Post {
  boardNum: number;
  title: string;
  content: string;
  memberId: number;
  nickName: string;
  createdAt: string;
  updatedAt: string;
}

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const parts = accessToken.split(".");
      if (parts.length === 3) {
        const payload = parts[1];
        const decodedPayload = atob(payload);
        const parsedPayload = JSON.parse(decodedPayload);
        setCurrentMemberId(parsedPayload.memberId);
      }
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${api}/boards/${id}`);
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
    navigate(`/edit/${post.boardNum}`);
  };

  return (
    <Container>
      <Title>{post.title}</Title>
      <Section>
        <CreateSection>
          <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
          <Author>{post.nickName}</Author>
        </CreateSection>
        {currentMemberId === post.memberId && ( // memberId가 일치할 때만 수정/삭제 버튼 표시
          <EditSection>
            <EditButton onClick={handleEdit}>수정</EditButton>
            <DeleteButton>삭제</DeleteButton>
          </EditSection>
        )}
      </Section>
      <Content>{post.content}</Content>
      <NavigationButtons postId={post.boardNum} />
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
