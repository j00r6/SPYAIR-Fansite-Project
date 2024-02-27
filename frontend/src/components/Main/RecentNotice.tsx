import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const api = import.meta.env.VITE_APP_API_ENDPOINT;

type Post = {
  boardNum: number;
  title: string;
  createdAt: string;
  nickName: string;
};

const RecentNotice = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const page = 1;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${api}/notice/page`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page,
            size: 3,
          },
        });
        const responseData = response.data;
        setPosts(responseData);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생", error);
      }
    };
    fetchPosts();
  }, []);

  const goToPost = (boardNum: number) => {
    navigate(`/notice/${boardNum}`);
  };

  const handleWriteButtonClick = () => {
    navigate("/notice");
  };

  return (
    <Container>
      <SectionTitle>INFORMATION</SectionTitle>
      <ButtonWrapper>
        <WriteButton onClick={handleWriteButtonClick}>more</WriteButton>
      </ButtonWrapper>
      <PostSection>
        {posts.map((post) => (
          <PostContainer
            key={post.boardNum}
            onClick={() => goToPost(post.boardNum)}
          >
            <Section>
              <Title>{post.title}</Title>
            </Section>
          </PostContainer>
        ))}
      </PostSection>
    </Container>
  );
};
export default RecentNotice;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.text`
  font-size: 28px;
  font-weight: bold;
  border-bottom: 1px solid #ffffff;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const WriteButton = styled.button`
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

const PostSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PostContainer = styled.div`
  display: flex;
  padding: 1rem 0.3rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 100%;
  &:not(:last-child) {
    border-right: 1px solid #ffffff; /* 이전 지시에 잘못된 부분, 올바른 위치가 아닙니다 */
  }
`;

const Title = styled.div``;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
