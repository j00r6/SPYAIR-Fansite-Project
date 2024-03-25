import NoticeEdit from "../components/Notice/NoticeEdit";
import styled from "styled-components";

const NoticeEditPage = () => {
  return (
    <Container>
      <NoticeEdit></NoticeEdit>
    </Container>
  );
};
export default NoticeEditPage;

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
