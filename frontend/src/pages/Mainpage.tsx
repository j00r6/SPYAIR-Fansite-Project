import YoutubeClip from "../components/Main/YoutubeClip";
import styled from "styled-components";
const MainPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  return (
    <Container>
      <YoutubeClip />
    </Container>
  );
};
export default MainPage;

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
