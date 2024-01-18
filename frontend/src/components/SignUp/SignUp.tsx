import { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // 회원가입 기능 구현
    console.log("회원가입해유:", username, password);
  };

  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
      <input
        placeholder="닉네임"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호를 재입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SignUpButton onClick={handleSignUp}>가입하기</SignUpButton>
    </SignUpContainer>
  );
};

export default SignUp;

export const SignUpContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h2 {
    text-align: center;
  }

  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
  }
`;

export const SignUpButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;
