import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NoticeList = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const parts = accessToken.split(".");
        if (parts.length === 3) {
          let payload = parts[1];
          payload = payload.replace(/-/g, "+").replace(/_/g, "/");
          const base64DecodedPayload = atob(payload);
          const utf8Decoder = new TextDecoder(); // UTF-8 디코더 인스턴스 생성
          const decodedPayload = utf8Decoder.decode(
            new Uint8Array(
              [...base64DecodedPayload].map((c) => c.charCodeAt(0))
            )
          );
          const parsedPayload = JSON.parse(decodedPayload);
          const roleArray = parsedPayload.roles ?? [];
          const role = roleArray.length > 0 ? roleArray[0].name : null;
          console.log("Member Roles:", role);

          if (role === "ROLE_ADMIN") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }
  }, []);

  // 임시 데이터
  const posts = [
    {
      id: 1,
      title: "이케형 사랑합니다 아이시떼루",
      createdAt: "2023-01-22 12:00",
      nickName: "박진수",
    },
    {
      id: 2,
      title: "SPYAIR 없는 삶은 상상이 안가네요",
      createdAt: "2023-01-23 15:30",
      nickName: "전찬혁",
    },
    {
      id: 3,
      title: "스파이에어 내한 언제 오나요??????????",
      createdAt: "2023-01-24 15:30",
      nickName: "송유정",
    },
  ];

  const goToPost = (postId: number) => {
    navigate(`/notice/${postId}`);
  };

  const handleWriteButtonClick = () => {
    const isLoggedIn = localStorage.getItem("accessToken") !== null;

    if (isLoggedIn && isAdmin) {
      navigate("/notice-edit/new"); //
    } else {
      alert("로그인 후 자유게시판 글을 작성할 수 있습니다.");
    }
  };

  return (
    <Container>
      <ButtonWrapper>
        {isAdmin && (
          <WriteButton onClick={handleWriteButtonClick}>글쓰기</WriteButton>
        )}
      </ButtonWrapper>
      {posts.map((post) => (
        <PostContainer key={post.id} onClick={() => goToPost(post.id)}>
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

export default NoticeList;

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
