import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import MainPage from "./pages/Mainpage";
import Profile from "./pages/Profile";
import GlobalStyle from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <Container>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-image: url("https://www.spyair.net/assets/img/common/bg_spyair_2.png");
  background-size: cover; // 배경 이미지를 컨테이너에 맞게 조절
  background-position: center center; // 배경 이미지를 가운데 정렬 */
`;
