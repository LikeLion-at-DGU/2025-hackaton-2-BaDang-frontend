// components/Advertisement.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Ad1 from "../../assets/Ads/AdMembership.svg";
import Ad2 from "../../assets/Ads/AdInstagram.svg";

const AdContainer = styled.div`
  position: relative;
  width: 1200px;
  min-height: 195px;
  border-radius: 20px;
  overflow: hidden;
  margin: auto;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: ${props => props.$numImages * 1200}px;
  transition: transform 1s ease; // 슬라이드 이동 속도
  transform: translateX(${props => -props.$currentIndex * 1200}px);
`;

const AdContent = styled.img`
  width: 1200px;
  height: 195px;
  object-fit: cover;
  border-radius: 20px;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: -30px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => (props.$active ? "#759AFC" : "#9D9D9D")};
  cursor: pointer;
`;

function Advertisement() {
  const ads = [Ad1, Ad2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev === ads.length - 1 ? 0 : prev + 1));
    }, 10000); // 10초마다 자동 이동
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  return (
    <>
      <AdContainer>
        <SlideWrapper $currentIndex={currentIndex} $numImages={ads.length}>
          {ads.map((ad, idx) => (
            <AdContent key={idx} src={ad} alt={`광고${idx}`} />
          ))}
        </SlideWrapper>
      </AdContainer>

      <DotContainer>
          {ads.map((_, idx) => (
            <Dot
              key={idx}
              $active={idx === currentIndex}
              onClick={() => goToSlide(idx)}
            />
          ))}
      </DotContainer>
    </>
  );
}

export default Advertisement;
