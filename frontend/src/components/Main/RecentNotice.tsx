import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecentNotice = () => {
  const navigate = useNavigate();
  //임시데이터
  const posts = [
    {
      boardNum: 1,
      title: "이케형 사랑합니다 아이시떼루",
      createdAt: "2023-01-22 12:00",
      nickName: "박진수",
    },
    {
      boardNum: 2,
      title: "SPYAIR 없는 삶은 상상이 안가네요",
      createdAt: "2023-01-23 15:30",
      nickName: "전찬혁",
    },
    {
      boardNum: 3,
      title: "스파이에어 내한 언제 오나요??????????",
      createdAt: "2023-01-24 15:30",
      nickName: "송유정",
    },
  ];

  const goToPost = (postId: number) => {
    navigate(`/notice/${postId}`);
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
  justify-content: space-between;
`;

const PostContainer = styled.div`
  display: flex;
  padding: 1rem 0.3rem;
  border-right: 1px solid #333333;
  cursor: pointer;
`;

const Title = styled.div``;

const Section = styled.div`
  display: flex;
  /* justify-content: center; */
`;
