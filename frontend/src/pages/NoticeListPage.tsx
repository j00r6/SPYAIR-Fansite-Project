import styled from "styled-components";
import NoticeList from "../components/Notice/NoticeList";

const NoticeNoticeListPage = () => {
  return (
    <Container>
      <Title>NOTICE</Title>
      <NoticeList></NoticeList>
    </Container>
  );
};
export default NoticeNoticeListPage;

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
