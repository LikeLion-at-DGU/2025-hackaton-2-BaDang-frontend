import React from "react";
import styled from "styled-components";
import CardBox from "../../assets/Cards/OrangeCard.svg";
import Arrow from "../../assets/Icons/ArrowIcon.svg";
import { Link } from "react-router-dom";

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 가로/세로 중앙 정렬 */
  display: flex;
  align-items: center;
  gap: 32px; /* Icon과 Text 사이 간격 */
`;

const Icon = styled.img`
  height: 70px;
  transition: transform 0.5s ease, opacity 0.5s ease;
`;

const Text = styled.div`
  width: 140px;
  color: #faf9f6;
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 35px;
  white-space: pre-line;
  transition: transform 0.5s ease, opacity 0.5s ease;
`;
const HoverText = styled.div`
  width: 300px;
  transform: translate(13%, -200%); /* 가로/세로 중앙 정렬 */
  color: #faf9f6;
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 800;
  line-height: 35px;
  white-space: pre-line;
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease;
`;
const Card = styled(Link)`
  /* Link로 변경 */
  position: relative;
  width: 384px;
  height: 197px;
  display: block;
  text-decoration: none; /* 링크 밑줄 제거 */
  &:hover ${HoverText} {
    opacity: 1; /* hover 시 나타남 */
  }

  &:hover ${Icon} {
    transform: translateX(-100px); /* 왼쪽으로 이동 */
    opacity: 0; /* 자연스럽게 사라지게 */
  }

  &:hover ${Text} {
    transform: translateX(+100px); /* 왼쪽으로 이동 */
    opacity: 0; /* 자연스럽게 사라지게 */
  }
`;
const ArrowBtn = styled.img`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 40px;
  height: 40px;
`;
function SmallCardBtn({ imgSrc, text, hovertext, to }) {
  return (
    <Card to={to}>
      <Background src={CardBox} alt="card background" />
      <Content>
        <Icon src={imgSrc} alt={text} />
        <Text>{text}</Text>
      </Content>
        <HoverText>{hovertext}</HoverText>

      <ArrowBtn src={Arrow} alt="arrow" />
    </Card>
  );
}

export default SmallCardBtn;
