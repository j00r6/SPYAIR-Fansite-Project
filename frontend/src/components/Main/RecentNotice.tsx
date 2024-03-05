import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT;

type Post = {
  noticeNum: number;
  title: string;
  createdAt: string;
  nickName: string;
};

const RecentNotice = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/notice/page`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: 1,
            size: 3,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생", error);
      }
    };
    fetchPosts();
  }, []);

  const goToPost = (noticeNum: number) => {
    navigate(`/notice/${noticeNum}`);
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
        {posts.map((post, index) => (
          <PostContainer
            key={post.noticeNum}
            onClick={() => goToPost(post.noticeNum)}
          >
            <Section>
              <PostNum>{index + 1}</PostNum>
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
  margin-bottom: 5rem;
`;

const SectionTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 28px;
  font-weight: bold;
  border-bottom: 1px solid #ffffff;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;
`;

const WriteButton = styled.button`
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  background-color: #000000;
  color: #ffffff;
  border: 1px solid white;
  transition: background-color 0.8s ease;
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const PostSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    /* font-size: 20px; */
    display: flex;
    flex-direction: column;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;

  &:not(:last-child) {
    border-right: 1px solid #3f3f3f;
  }
  @media (max-width: 768px) {
    &:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid #3f3f3f;
    }
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const PostNum = styled.div`
  font-size: 28px;
  font-weight: bold;
  width: 32px;
  margin: 0 1rem;
`;

const Title = styled.div`
  overflow: hidden;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  margin-right: 1rem;
`;
