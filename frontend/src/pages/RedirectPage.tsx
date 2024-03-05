import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT;

const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("code: ", code);
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");
    console.log("엑셋,", accessToken);
    if (code) {
      axios
        .post(`${API_ENDPOINT}/auth/google`, { code })
        .then((response) => {
          console.log("로그인 성공! : ", response.data);
          // localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("jwtToken", response.data.jwtToken);
          // navigate("/");
        })
        .catch((error) => {
          console.error("로그인 실패: ", error);
        });
    } else {
      console.error("권한승인 코드 없음");
    }
  }, [navigate]);
  return <Container>Redirecting!!!!!!!!!!!!!!!!</Container>;
};
export default RedirectPage;

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
