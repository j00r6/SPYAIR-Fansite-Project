import NoticeDetail from "../components/Notice/NoticeDetail";
import styled from "styled-components";

const NoticeDetailPage = () => {
  return (
    <Container>
      <NoticeDetail></NoticeDetail>
    </Container>
  );
};
export default NoticeDetailPage;

const Container = styled.div`
  width: 80%;
  height: 100vh;
  background-image: url("https://www.spyair.net/assets/img/common/bg_spyair_2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;
