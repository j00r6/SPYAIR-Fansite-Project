import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const api = import.meta.env.VITE_APP_API_ENDPOINT;

type Post = {
  boardNum: number;
  title: string;
  createdAt: string;
  nickName: string;
};

const BoardList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 확인하는 상태
  const [loading, setLoading] = useState(false); //로딩 상태

  //초기 데이터
  useEffect(() => {
    const fetchPosts = async () => {
      if (page !== 1) return;
      setLoading(true);
      try {
        const response = await axios.get(`${api}/board/page`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page,
            size: 5,
          },
        });
        const responseData = response.data;
        setPosts(responseData);
        if (responseData.length < 5) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const loadMoreData = async () => {
    if (loading || !hasMore) return; // 로딩 중이거나 더 불러올 데이터가 없으면 실행하지 않음
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await axios.get(`${api}/board/page`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: nextPage,
          size: 5,
        },
      });
      const responseData = response.data;
      setPosts((prevData) => [...prevData, ...responseData]);
      setPage(nextPage);
      if (responseData.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  // 게시물 클릭 이벤트 핸들러
  const goToPost = (postId: number) => {
    navigate(`/free-board/${postId}`);
  };

  // 글쓰기 버튼 클릭 이벤트 핸들러
  const handleWriteButtonClick = () => {
    const isLoggedIn = localStorage.getItem("accessToken") !== null;
    if (isLoggedIn) {
      navigate("/free-board-edit/new");
    } else {
      alert("로그인 후 자유게시판 글을 작성할 수 있습니다.");
    }
  };

  return (
    <Container>
      <ButtonWrapper>
        <WriteButton onClick={handleWriteButtonClick}>글쓰기</WriteButton>
      </ButtonWrapper>
      <InfiniteScroll
        dataLength={posts.length}
        next={loadMoreData}
        scrollThreshold={0.9}
        hasMore={hasMore}
        loader={hasMore ? <Loader>Loading...</Loader> : <></>}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostContainer
              key={post.boardNum}
              onClick={() => goToPost(post.boardNum)}
            >
              <Title>{post.title}</Title>
              <Section>
                <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
                <Author>{post.nickName}</Author>
              </Section>
            </PostContainer>
          ))
        ) : (
          <NoPostMessage>아직 작성된 글이 없어요!</NoPostMessage>
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default BoardList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 3em;
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

const NoPostMessage = styled.div`
  margin-top: 3em;
  text-align: center;
  font-size: 24px;
  color: #ffffff;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
`;
