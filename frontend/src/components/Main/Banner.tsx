import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const images = [
  "https://www.spyair.net/assets/img/top/slide/main_55.jpg",
  "https://www.spyair.net/assets/img/top/slide/main_54.jpg",
  "https://www.spyair.net/assets/img/top/slide/main_53.jpg",
];

const ImageSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SliderContainer>
      <ImageWrapper index={index}>
        {images.map((img) => (
          <ImageBox key={img}>
            <img src={img} alt={`Slide ${img}`} />
          </ImageBox>
        ))}
      </ImageWrapper>
      <Dots>
        {images.map((_, i) => (
          <Dot key={i} active={index === i} onClick={() => goToSlide(i)} />
        ))}
      </Dots>
    </SliderContainer>
  );
};

export default ImageSlider;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SliderContainer = styled.div`
  width: 70%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const ImageWrapper = styled.div<{ index: number }>`
  display: flex;
  width: 100%;
  transform: translateX(${(props) => -props.index * 100}%);
  transition: transform 0.5s ease-in-out;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 1.5s ease-out;
`;

const ImageBox = styled.div`
  flex: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div<{ active: boolean }>`
  padding: 4px;
  margin-right: 0.8rem;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "white" : "rgba(255, 255, 255, 0.5)"};
`;
