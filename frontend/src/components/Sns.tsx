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

const Container = styled.div``;

const SnsItem = styled.a`
  display: inline-block;
  margin-right: 1rem;
  cursor: pointer;
  img {
    width: 80%;
    height: 80%;
  }

  &:hover {
    opacity: 0.7;
  }
`;
