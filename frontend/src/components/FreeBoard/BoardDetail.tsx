import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NavigationButtons from "./NavigationButtons";

const BoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id) : 0;

  // 임시 데이터
  const [post, setPost] = useState({
    id: id,
    title: "제목이다킬킬..",
    content:
      "안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해. 안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해.안녕안녕 내 저녁은 카레다. 지금 당장 먹고싶지만 일단 조금 참고있긴해",
    createdAt: "2024-01-22T16:04:21.392554",
    author: "카레맨",
  });

  // 상태 데이터가 없을 때를 대비한 로딩 상태 표시
  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      <Section>
        <CreateSection>
          <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
          <Author>{post.author}</Author>
        </CreateSection>
        <EditSection>
          <EditButton>수정</EditButton>
          <DeleteButton>삭제</DeleteButton>
        </EditSection>
      </Section>
      <Content>{post.content}</Content>
      <NavigationButtons postId={postId} />
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
`;

const DeleteButton = styled.span`
  font-size: 12px;
`;

const Content = styled.div`
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333333;
`;
