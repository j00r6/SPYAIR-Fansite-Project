import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState, useEffect } from "react";

const api = import.meta.env.VITE_APP_API_ENDPOINT;

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식으로 입력하세요.")
    .required("이메일은 필수입니다."),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "영문자 대소문자, 숫자 조합 8글자 이상이어야 합니다."
    )
    .required("비밀번호는 필수입니다."),
});

const Login = () => {
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (email || password) {
      setLoginError("");
    }
  }, [email, password]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(
        `${api}/members/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        window.location.href = "/";
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.message || "로그인 중 문제가 발생했습니다.";
        console.error("로그인 에러 발생:", message);
        setLoginError(message);
      } else {
        setLoginError("로그인 요청 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Email"
          {...register("email", {
            onChange: () => setLoginError(""),
          })}
        />
        <Error>
          {errors.email?.message || (loginError && <span>{loginError}</span>)}
        </Error>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Error>{errors.password?.message}</Error>
        <LoginButton type="submit">로그인</LoginButton>
      </form>
    </LoginContainer>
  );
};

export default Login;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoginContainer = styled.div`
  max-width: 520px;
  min-width: 320px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeIn} 1.5s ease-out;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 8px;
  color: #d6d6d6;
  padding: 8px;
  background-color: rgba(179, 179, 179, 0.35);
  border: 1px solid #000000;
  &::placeholder {
    color: #d6d6d6;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: rgba(179, 179, 179, 0.35);
    color: #ffffff;
  }
`;

const Error = styled.div`
  color: #ffffff;
  font-size: 12px;
  margin-bottom: 10px;
`;
