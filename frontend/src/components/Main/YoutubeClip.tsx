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
  position: relative; /* iframe을 절대 위치로 배치하기 위해 필요 */
  margin-bottom: 5rem;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    /* width: 100%; */
    /* height: 100%; */
  }
`;
