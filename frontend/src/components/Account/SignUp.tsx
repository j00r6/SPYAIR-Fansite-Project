import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const api = import.meta.env.VITE_APP_API_ENDPOINT;
console.log(api);

interface FormValues {
  nickName: string;
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

  const onSubmit = async (data: FormValues) => {
    console.log(data.email, data.password, data.nickName);
    try {
      const response = await axios.post(
        `${api}/members/register`,
        {
          email: data.email,
          password: data.password,
          nickName: data.nickName,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log("서버 응답:", response.data);
      if (response.status === 200) {
        console.log("회원가입 성공!야호~");
        // 성공 시 추가 동작 수행
      } else {
        console.log("회원가입 실패ㅜㅜ");
        // 실패 시 적절한 처리 수행
      }
    } catch (error) {
      console.error("회원가입 에러 발생:", error);
      // 에러 발생 시 적절한 처리 수행
    }
  };

  return (
    <SignUpContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="닉네임" {...register("nickName")} />
        <Error>{errors.nickName?.message}</Error>

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
  nickName: yup
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
  max-width: 520px;
  min-width: 320px;
  margin: 0 auto;
  padding: 20px;
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

const SignUpButton = styled.button`
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
