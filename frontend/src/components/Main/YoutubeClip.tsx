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
  padding-top: 39.25%;
  position: relative;
  margin-bottom: 5rem;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-top: 55%;
    margin-bottom: 3rem;
  }
`;
