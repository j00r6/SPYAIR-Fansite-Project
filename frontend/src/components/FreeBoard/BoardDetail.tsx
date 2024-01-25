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
  const postId = id ? parseInt(id) : 0;
  const [post, setPost] = useState<Post | null>(null);

  // 임시 데이터
  // const [post, setPost] = useState({
  //   id: id,
  //   title: "제목이다킬킬..",
  //   content:
  //     "안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해. 안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해",
  //   createdAt: "2024-01-22T16:04:21.392554",
  //   author: "카레맨",
  // });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${api}/boards/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("엥 실패ㅋㅋ:", error);
        // 에러 처리
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
    navigate(`/edit/${postId}`); // 수정 페이지로 이동
  };

  return (
    <Container>
      <Title>{post.title}</Title>
      <Section>
        <CreateSection>
          <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
          {/* <Author>{post.author}</Author> //백엔드 구현 완료되면 추가 */}
        </CreateSection>
        <EditSection>
          <EditButton onClick={handleEdit}>수정</EditButton>
          <DeleteButton>삭제</DeleteButton>
        </EditSection>
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
