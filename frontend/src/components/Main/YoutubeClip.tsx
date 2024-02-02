import styled from "styled-components";

const YoutubeClip = () => {
  return (
    <Container>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/amJBEAW9FJQ "
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
  width: 80%;
  height: 520px;
`;
