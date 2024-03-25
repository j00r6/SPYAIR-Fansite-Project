import Banner from "../components/Main/Banner";
import YoutubeClip from "../components/Main/YoutubeClip";
import RecentNotice from "../components/Main/RecentNotice";
import styled from "styled-components";

const MainPage = () => {
  return (
    <Container>
      <Banner />
      <RecentNotice />
      <YoutubeClip />
    </Container>
  );
};
export default MainPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://www.spyair.net/assets/img/common/bg_spyair_2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
