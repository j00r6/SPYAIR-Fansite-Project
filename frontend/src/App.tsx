import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";
import Profile from "./pages/ProfilePage";
import GlobalStyle from "./styles/GlobalStyles";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import FreeBoardListPage from "./pages/FreeBoardListPage";
import FreeBoardDetailPage from "./pages/FreeBoardDetailPage";
import FreeBoardEditPage from "./pages/FreeBoardEditPage";
import NoticeListPage from "./pages/NoticeListPage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import NoticeEditPage from "./pages/NoticeEditPage";
import Footer from "./components/Footer";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <Router>
      <Container>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/free-board" element={<FreeBoardListPage />} />
          <Route path="/free-board/:id" element={<FreeBoardDetailPage />} />
          <Route path="/free-board-edit/:id" element={<FreeBoardEditPage />} />
          <Route path="/notice" element={<NoticeListPage />} />
          <Route path="/notice/:id" element={<NoticeDetailPage />} />
          <Route path="/notice-edit/:id" element={<NoticeEditPage />} />
          <Route path="/login/oauth2/code/google" element={<RedirectPage />} />
        </Routes>
        <Footer />
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
