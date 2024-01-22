import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
  const navigate = useNavigate();

  // 임시 데이터
  const posts = [
    {
      id: 1,
      title: "이케형 사랑합니다 아이시떼루",
      createdAt: "2023-01-22 12:00",
      author: "박진수",
    },
    {
      id: 2,
      title: "SPYAIR 없는 삶은 상상이 안가네요",
      createdAt: "2023-01-23 15:30",
      author: "전찬혁",
    },
    {
      id: 3,
      title: "스파이에어 내한 언제 오나요??????????",
      createdAt: "2023-01-24 15:30",
      author: "송유정",
    },
  ];

  const goToPost = (postId: number) => {
    navigate(`/free-board/${postId}`); // 상세 페이지로 이동
  };

  return (
    <Container>
      {posts.map((post) => (
        <PostContainer key={post.id} onClick={() => goToPost(post.id)}>
          <Title>{post.title}</Title>
          <Section>
            <PostTime>{post.createdAt}</PostTime>
            <Author>{post.author}</Author>
          </Section>
        </PostContainer>
      ))}
    </Container>
  );
};

export default BoardList;

const Container = styled.div`
  width: 100%;
`;

const PostContainer = styled.div`
  padding: 1rem 0.3rem;
  border-bottom: 1px solid #333333;
  cursor: pointer;
  &:first-child {
    border-top: 1px solid #333333;
  }
`;

const Title = styled.div``;

const Section = styled.div`
  margin-top: 0.3em;
  display: flex;
`;

const PostTime = styled.p`
  font-size: 12px;
  margin-right: 1rem;
`;

const Author = styled.p`
  font-size: 12px;
`;
