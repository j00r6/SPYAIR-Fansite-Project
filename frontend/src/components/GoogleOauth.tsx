import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import styled from "styled-components";
import axios from "axios";

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const GoogleOauth = () => {
  const handleGoogleLogin = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenId" in response) {
      try {
        const { tokenId } = response;
        const res = await axios.post("/api/auth/google", { token: tokenId }); //임시 엔드포인트
        console.log("서버 응답:", res.data);
        console.log("로그인 성공");
        // console.log("사용자 이름: " + response.profileObj.name);
        // console.log("이메일: " + response.profileObj.email);
      } catch (error) {
        console.error("서버 인증 실패: ", error);
      }
    } else {
      console.log("로그인 실패: 응답에 tokenId가 없음");
    }
  };
  return (
    <Container>
      <StyledGoogleLogin
        clientId={clientId}
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        // cookiePolicy={"single_host_origin"}
      >
        <Text>Google로 로그인</Text>
      </StyledGoogleLogin>
    </Container>
  );
};

export default GoogleOauth;

const Container = styled.div`
  max-width: 520px;
  min-width: 320px;
  padding: 20px;
`;

const StyledGoogleLogin = styled(GoogleLogin)`
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  height: 32px;
  opacity: 1;
  justify-content: center;
  > div {
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Text = styled.div`
  color: black;
`;
