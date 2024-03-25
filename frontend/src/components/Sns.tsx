import styled from "styled-components";
import twitterIcon from "../../public/assets/icon_twitter.png";
import facebookIcon from "../../public/assets/icon_facebook.png";
import instagramIcon from "../../public/assets/icon_instagram.png";
import lineIcon from "../../public/assets/icon_line.png";
import youtubeIcon from "../../public/assets/icon_youtube.png";
import tiktokIcon from "../../public/assets/icon_tiktok.png";

const snsList = [
  {
    icon: <img src={twitterIcon} alt="Twitter" />,
    link: "https://twitter.com/SPYAIRSTAFF",
  },
  {
    icon: <img src={facebookIcon} alt="Facebook" />,
    link: "https://www.facebook.com/spyairofficial",
  },
  {
    icon: <img src={instagramIcon} alt="Instagram" />,
    link: "https://www.instagram.com/spyairstaff/",
  },
  {
    icon: <img src={lineIcon} alt="Line" />,
    link: "https://line.me/R/ti/p/@spyair?from=page&openQrModal=true&searchId=spyair",
  },
  {
    icon: <img src={youtubeIcon} alt="YouTube" />,
    link: "https://www.youtube.com/user/spyairSMEJ",
  },
  {
    icon: <img src={tiktokIcon} alt="TikTok" />,
    link: "https://www.tiktok.com/@spyair_official",
  },
];

const Sns = () => {
  return (
    <Container>
      {snsList.map((sns, index) => (
        <SnsItem
          key={index}
          href={sns.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {sns.icon}
        </SnsItem>
      ))}
    </Container>
  );
};
export default Sns;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const SnsItem = styled.a`
  cursor: pointer;
  img {
    transition: transform 0.3s ease;
    width: 40px;
    height: 40px;
  }

  &:hover {
    opacity: 0.7;
    img {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
