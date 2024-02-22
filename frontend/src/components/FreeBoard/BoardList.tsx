import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = import.meta.env.VITE_APP_API_ENDPOINT;
type Post = {
  boardNum: number;
  title: string;
  createdAt: string;
  nickName: string;
};

const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${api}/board`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setPosts(response.data);
        console.log("응답", response.data);
      } catch (error) {
        console.error("게시물 불러오기 실패", error);
      }
    };
    fetchPosts();
  }, []);

  const goToPost = (postId: number) => {
    navigate(`/free-board/${postId}`);
    console.log("postId", postId);
  };

  const handleWriteButtonClick = () => {
    const isLoggedIn = localStorage.getItem("accessToken") !== null;

    if (isLoggedIn) {
      navigate("/free-board-edit/new"); //
    } else {
      alert("로그인 후 자유게시판 글을 작성할 수 있습니다.");
    }
  };

  return (
    <Container>
      <ButtonWrapper>
        <WriteButton onClick={handleWriteButtonClick}>글쓰기</WriteButton>
      </ButtonWrapper>
      {posts.map((post) => (
        <PostContainer
          key={post.boardNum}
          onClick={() => goToPost(post.boardNum)}
        >
          <Title>{post.title}</Title>
          <Section>
            <PostTime>{post.createdAt}</PostTime>
            <Author>{post.nickName}</Author>
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
