import styled from "styled-components";

interface YoutubeMusicPlayerProps {
  isMusicPlaying: boolean;
}

const YoutubeMusicPlayer = ({ isMusicPlaying }: YoutubeMusicPlayerProps) => {
  return (
    <Container isMusicPlaying={isMusicPlaying}>
      <iframe
        width="0"
        height="0"
        src="https://www.youtube.com/embed/YkVjY1F-Eoc?autoplay=1&mute=0"
        title="YouTube audio player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Container>
  );
};
export default YoutubeMusicPlayer;

const Container = styled.div<{ isMusicPlaying: boolean }>`
  ${({ isMusicPlaying }) =>
    isMusicPlaying ? "display: none;" : "visibility: hidden;"};
`;
