import styled from "styled-components";
import BoardList from "../components/FreeBoard/BoardList";

const FreeBoardListPage = () => {
  return (
    <Container>
      <Title>FREE BOARD</Title>
      <Section>
        <WriteButton>글쓰기</WriteButton>
      </Section>
      <BoardList></BoardList>
    </Container>
  );
};
export default FreeBoardListPage;

const Container = styled.div`
  width: 80%;
  height: 100vh;
  background-image: url("https://www.spyair.net/assets/img/common/bg_spyair_2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Section = styled.div`
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
