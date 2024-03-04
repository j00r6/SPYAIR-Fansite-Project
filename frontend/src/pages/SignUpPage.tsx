import styled from "styled-components";
import SignUp from "../components/Account/SignUp";
import GoogleOauth from "../components/GoogleOauth";
const SignUpPage = () => {
  return (
    <Container>
      <Title>Sign Up</Title>
      <SignUp />
      <GoogleOauth />
    </Container>
  );
};

export default SignUpPage;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 0%.5;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("https://www.spyair.net/assets/img/common/bg_spyair_2.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
