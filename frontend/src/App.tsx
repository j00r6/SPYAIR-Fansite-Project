import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyle from "./styles/GlobalStyles";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Header />
      초기세팅
    </Container>
  );
}
export default App;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
