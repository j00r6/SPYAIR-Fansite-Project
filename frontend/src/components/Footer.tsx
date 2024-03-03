import styled from "styled-components";
import Sns from "./Sns";
const Footer = () => {
  return (
    <Container>
      <StyledSns />
      <LinkSection>
        <Link href="https://www.spyair.net/" target="_blank">
          SPYAIR OFFICIAL
        </Link>
        <Link href="https://cafe.naver.com/spyair" target="_blank">
          SPYAIR KOREA FanCafe
        </Link>
      </LinkSection>
      <Text>© 2024 SPYAIR, All rights reserved.</Text>
    </Container>
  );
};
export default Footer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #171717;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSns = styled(Sns)`
  width: 50%;
  height: 50%;
`;

const LinkSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Link = styled.a`
  font-size: 12px;
  color: #3f3f3f;
  margin-top: 10px;
  text-decoration: none;
`;

const Text = styled.p`
  margin-top: 10px;
  color: #3f3f3f;
  font-size: 12px;
`;
