import { useState } from "react";
import styled from "styled-components";

const Banner = () => {
  const [actIndex, setactIndex] = useState(0);
  const images = [
    "https://www.spyair.net/assets/img/top/slide/main_55.jpg",
    "https://www.spyair.net/assets/img/top/slide/main_54.jpg",
    "https://www.spyair.net/assets/img/top/slide/main_53.jpg",
  ];

  const handleDotClick = (index: number) => {
    setactIndex(index);
  };

  return (
    <Container>
      <ImagesContainer activeIndex={actIndex} imagesCount={images.length}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            active={index === actIndex}
          />
        ))}
      </ImagesContainer>
      <Dots>
        {images.map((_, index) => (
          <Dot
            key={index}
            onClick={() => handleDotClick(index)}
            active={index === actIndex}
          />
        ))}
      </Dots>
    </Container>
  );
};
export default Banner;

const Container = styled.div`
  overflow: hidden;
  margin-bottom: 3rem;
`;

const ImagesContainer = styled.div<{
  activeIndex: number;
  imagesCount: number;
}>`
  display: flex;
  transition: transform 0.8s ease;
  width: 60vw;
  width: calc(70% * ${({ imagesCount }) => imagesCount});
  transform: ${({ activeIndex }) =>
    `translateX(${-70 * activeIndex + (100 - 70) / 2}vw)`};
  margin-bottom: 1rem;
`;

const Image = styled.img<{ active: boolean }>`
  width: 100%;
  height: auto;
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  transition: opacity 0.5s ease; // 부드러운 전환 효과를 위해 transition 추가
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Dot = styled.div<{ active: boolean }>`
  padding: 5px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "white" : "gray")};
  cursor: pointer;
`;
