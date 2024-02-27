import styled from "styled-components";

const YoutubeClip = () => {
  return (
    <Container>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/YkVjY1F-Eoc "
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Container>
  );
};
export default YoutubeClip;

const Container = styled.div`
  width: 70%;
  height: 520px;
  margin-bottom: 3rem;
`;