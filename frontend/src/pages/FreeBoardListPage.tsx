import styled from "styled-components";
import BoardList from "../components/FreeBoard/BoardList";

const FreeBoardListPage = () => {
  return (
    <Container>
      <Title>FREE BOARD</Title>
      <BoardList></BoardList>
    </Container>
  );
};
export default FreeBoardListPage;

const Container = styled.div`
  width: 80%;
  height: 100%;
  background-image: url("https://www.spyair.net/assets/img/common/bg_spyair_2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 2rem;
`;
