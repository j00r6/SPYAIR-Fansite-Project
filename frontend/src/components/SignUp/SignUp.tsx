import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const watchPassword = watch("password", "");

  const onSubmit = (data: FormValues) => {
    console.log("회원가입해유:", data.username, data.email, data.password);
  };

  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="닉네임" {...register("username")} />
        <Error>{errors.username?.message}</Error>

        <Input placeholder="Email" {...register("email")} />
        <Error>{errors.email?.message}</Error>

        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register("password")}
        />
        <Error>{errors.password?.message}</Error>

        <Input
          type="password"
          placeholder="비밀번호를 재입력하세요"
          {...register("passwordConfirmation")}
        />
        <Error>{errors.passwordConfirmation?.message}</Error>

        <SignUpButton type="submit">가입하기</SignUpButton>
      </form>
    </SignUpContainer>
  );
};

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "닉네임은 2글자 이상이어야 합니다.")
    .required("닉네임은 필수입니다."),
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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치해야 합니다.")
    .required("비밀번호 확인은 필수입니다."),
});

export default SignUp;

const SignUpContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h2 {
    text-align: center;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #727272;
  }
`;

const Error = styled.div`
  color: #ffffff;
  font-size: 12px;
  margin-bottom: 10px;
`;
