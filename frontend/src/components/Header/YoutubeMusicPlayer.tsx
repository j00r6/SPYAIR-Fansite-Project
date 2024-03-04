import styled from "styled-components";

const YoutubeClip = () => {
  return (
    <Container>
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
export default YoutubeClip;

const Container = styled.div``;
