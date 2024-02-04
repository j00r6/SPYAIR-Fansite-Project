import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface NavigationButtonsProps {
  postId: number;
  totalPost: number;
}

const NavigationButtons = ({ postId, totalPost }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  console.log("total", totalPost);
  console.log("postId", postId);
  const goToPreviousPost = () => {
    if (postId < totalPost) {
      navigate(`/free-board/${postId + 1}`);
    }
  };
  const goToNextPost = () => {
    if (postId > 1) {
      navigate(`/free-board/${postId - 1}`);
    }
  };
  const goToPostList = () => navigate("/free-board");

  return (
    <Navigation>
      {postId < totalPost && <Button onClick={goToPreviousPost}>이전글</Button>}
      <Button onClick={goToPostList}>글 목록</Button>
      {postId > 1 && <Button onClick={goToNextPost}>다음글</Button>}
    </Navigation>
  );
};

export default NavigationButtons;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 0.5rem;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;
