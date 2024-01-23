import styled from "styled-components";
const MainPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);
  return <Container>메인페이지</Container>;
};
export default MainPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
