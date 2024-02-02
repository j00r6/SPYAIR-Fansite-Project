import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { responsiveHeaderStyles } from "../../styles/GlobalStyles";
import Menu from "./Menu";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false); // 모달의 열림/닫힘 상태를 관리하는 상태 추가

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen); // 모달 상태를 토글
  };

  const handleLogoClick = () => {
    navigate("/"); // 메인 페이지 경로 (예시: '/')
  };

  return (
    <Container>
      <Logo
        src="https://www.spyair.net/assets/img/common/header/logo_2.png"
        alt="Logo"
        onClick={handleLogoClick}
      />
      <MenuBtnArea>
        <TxtMenu>MENU</TxtMenu>
        <MenuBtn onClick={toggleMenu}>
          <MenuTrigger>
            <Span></Span>
            <Span></Span>
            <Span></Span>
          </MenuTrigger>
        </MenuBtn>
        <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </MenuBtnArea>
    </Container>
  );
};

export default Header;

const logoAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;
const menuBarAnimation = keyframes`
  0%, 100% {
    width: 100%;
    transform: translateX(0);
  }
  50% {
    width: 50%;
    transform: translateX(50%);
  }
`;

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  background-color: #000000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${responsiveHeaderStyles}
  z-index:999;
`;

const Logo = styled.img`
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.5em;
  animation: ${logoAnimation} 0.75s forwards;
`;

const MenuBtnArea = styled.div`
  margin-right: 2.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TxtMenu = styled.p`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-right: 16px;
`;

const MenuBtn = styled.div`
  cursor: pointer;
`;

const MenuTrigger = styled.div`
  width: 40px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s;
  box-sizing: border-box;
  &:hover span:nth-of-type(2) {
    opacity: 1;
  }
`;

const Span = styled.span`
  display: inline-block;
  transition: all 0.8s;
  width: 100%;
  height: 2px;
  background-color: #fff;

  &:nth-of-type(1) {
    top: 0;
    animation: ${menuBarAnimation} 0.75s forwards;
  }

  &:nth-of-type(2) {
    top: 10px;
    animation: ${menuBarAnimation} 0.75s forwards;
  }

  &:nth-of-type(3) {
    bottom: 0;
    animation: ${menuBarAnimation} 0.75s forwards;
  }
`;
