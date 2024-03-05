import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavigationButtons from "../NavigationButtons";

const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT;
const accessToken = localStorage.getItem("accessToken");

interface Post {
  noticeNum: number;
  title: string;
  content: string;
  memberId: number;
  nickName: string;
  createdAt: string;
  updatedAt: string;
  totalNum: number;
}

const NoticeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (accessToken) {
      try {
        const parts = accessToken.split(".");
        if (parts.length === 3) {
          let payload = parts[1];
          payload = payload.replace(/-/g, "+").replace(/_/g, "/");
          const base64DecodedPayload = atob(payload);
          const utf8Decoder = new TextDecoder(); // UTF-8 디코더 인스턴스 생성
          const decodedPayload = utf8Decoder.decode(
            new Uint8Array(
              [...base64DecodedPayload].map((c) => c.charCodeAt(0))
            )
          );
          const parsedPayload = JSON.parse(decodedPayload);
          const roleArray = parsedPayload.roles ?? [];
          const role = roleArray.length > 0 ? roleArray[1].name : null;
          console.log("Member Role:", role);

          if (role === "ROLE_ADMIN") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }
    console.log("어드민", isAdmin);
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/notice/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        console.log("응답:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("엥 실패ㅋㅋ:", error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  const handleEdit = () => {
    navigate(`/notice-edit/${post.noticeNum}`);
  };

  const handleDelete = async () => {
    if (!accessToken) {
      console.error("인증 토큰이 없습니다.");
      return;
    }

    if (window.confirm("이 글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${API_ENDPOINT}/notice/${post.noticeNum}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("글 삭제 완료");
        navigate("/notice");
      } catch (error) {
        console.error("글 삭제 실패:", error);
      }
    }
  };

  return (
    <Container>
      <Title>{post.title}</Title>
      <Section>
        <CreateSection>
          <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
          <Author>{post.nickName}</Author>
        </CreateSection>
        {isAdmin && (
          <EditSection>
            <EditButton onClick={handleEdit}>수정</EditButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </EditSection>
        )}
      </Section>
      <Content>{post.content}</Content>
      <NavigationButtons postId={post.noticeNum} totalPost={post.totalNum} />
    </Container>
  );
};

export default NoticeDetail;

const Container = styled.div``;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 0.5rem;
`;

const Section = styled.div`
  display: flex;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #333333;
  justify-content: space-between;
`;

const CreateSection = styled.div`
  display: flex;
`;

const PostTime = styled.span`
  font-size: 12px;
  margin-right: 1rem;
`;

const Author = styled.span`
  font-size: 12px;
`;
const EditSection = styled.span`
  font-size: 12px;
`;

const EditButton = styled.span`
  font-size: 12px;
  margin-right: 1rem;
  cursor: pointer;
`;

const DeleteButton = styled.span`
  font-size: 12px;
  cursor: pointer;
`;

const Content = styled.div`
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333333;
`;
