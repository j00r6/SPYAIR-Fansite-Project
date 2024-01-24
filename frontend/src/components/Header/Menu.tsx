import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Sns from "../Sns";

const api = import.meta.env.VITE_APP_API_ENDPOINT;

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const menuList = [
  { text: "PROFILE", link: "/profile" },
  { text: "INFORMATION", link: "/information" },
  { text: "FREE BOARD", link: "/free-board" },
];

const accountList = [
  { text: "Sign Up", link: "/signup" },
  { text: "Login", link: "/login" },
];

const Menu = ({ isOpen, toggleMenu }: MenuProps) => {
  const isLoggedIn = localStorage.getItem("accessToken") !== null;
  console.log(isLoggedIn);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        await axios.post(
          `${api}/members/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    toggleMenu();
  };
  return (
    <MenuModal isOpen={isOpen}>
      <BackButton to="#" onClick={toggleMenu}>
        <FaArrowLeft />
      </BackButton>
      <MenuList>
        {menuList.map((menuItem) => (
          <MenuItem
            key={menuItem.text}
            as={Link}
            to={menuItem.link}
            onClick={toggleMenu}
          >
            {menuItem.text}
          </MenuItem>
        ))}
      </MenuList>
      <Account>
        {isLoggedIn ? (
          <AccountItem
            // as="button" // 링크 대신 버튼으로 변경
            onClick={handleLogout} // 로그아웃 처리 함수 연결
          >
            Logout
          </AccountItem>
        ) : (
          accountList.map((menuItem) => (
            <AccountItem
              key={menuItem.text}
              as={Link}
              to={menuItem.link}
              onClick={toggleMenu}
            >
              {menuItem.text}
            </AccountItem>
          ))
        )}
      </Account>

      <Sns />
    </MenuModal>
  );
};

export default Menu;

interface MenuModalProps {
  isOpen: boolean;
}

const MenuModal = styled.div<MenuModalProps>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: right 0.3s ease-in-out;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  background-color: #000000;
`;

const BackButton = styled(Link)`
  font-size: 24px;
  color: #fff;
  padding: 16px;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.7;
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled(Link)`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  padding: 16px;
  cursor: pointer;
  text-decoration: none;
  position: relative;

  &:hover {
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background-color: #fff;
      animation: underlineAnimation 0.3s forwards;
    }
  }

  @keyframes underlineAnimation {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
`;

const Account = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const AccountItem = styled.p`
  color: #fff;
  font-size: 20px;
  text-decoration: none;
  padding: 16px;
  &:hover {
    opacity: 0.7;
  }
`;
