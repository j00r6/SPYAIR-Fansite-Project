import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const api = import.meta.env.VITE_APP_API_ENDPOINT; // API 엔드포인트 설정

// 게시물 타입 정의
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
  const [totalBoard, setTotalBoard] = useState(0);
  useEffect(() => {
    const fetchPosts = async () => {
      // if (!hasMore || isLoading) return;

      // setIsLoading(true);
      const requestUrl = `${api}/board/page`;
      try {
        const response = await axios.get(requestUrl, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page,
            size: 5,
          },
        });
        const responseData = response.data;
        console.log("초기 응답 데이터: ", responseData);
        if (!responseData) {
          throw new Error("서버 응답 데이터가 올바르지 않습니다.");
        }

        // 첫 페이지 로드 시 기존 데이터를 유지할 필요가 없으므로, 직접 설정
        if (page === 1) {
          setPosts(responseData);
        } else {
          // 추가 페이지 로드 시 기존 데이터에 새 데이터 추가
          setPosts((prevPosts) => [...prevPosts, ...responseData]);
        }
        setTotalBoard(responseData.totalBoard);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchPosts();
  }, [page]);

  const loadMoreData = async () => {
    const startIndex = page * 5;
    const endIndex = startIndex + 5;
    console.log("total", totalBoard);
    if (startIndex >= totalBoard) {
      // 모든 데이터를 로드한 경우 hasMore를 false로 설정하여 스크롤 중단
      setHasMore(false);
    } else {
      try {
        const response = await axios.get(`${api}/board/page`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page + 1, // 다음 페이지 요청
            size: 5,
          },
        });

        const responseData = response.data;
        const newData = responseData.slice(startIndex, endIndex);
        setPosts((prevData) => [...prevData, ...newData]);
        setPage(page + 1);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    }
    console.log(hasMore);
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
                <PostTime>{post.createdAt}</PostTime>
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
