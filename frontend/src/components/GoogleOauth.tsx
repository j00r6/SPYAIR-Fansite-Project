import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GoogleOauth = () => {
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const redirectUri = "http://localhost:5173/login/oauth2/code/google";
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const scope = "email profile";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("code:", code);
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5173/api/auth/google",
        {
          code,
        }
      );
      console.log("Access Token:", response.data.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
  };

  return (
    <Container>
      <StyledGoogleLogin onClick={handleGoogleLogin}>
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

const StyledGoogleLogin = styled.button`
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
