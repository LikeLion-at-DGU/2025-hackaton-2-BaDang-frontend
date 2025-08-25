// components/Sw/SmallCards.jsx
import React from "react";
import styled from "styled-components";
import Card from "./SmallCardBtn";
import PastIcon from "../../assets/Icons/PastIcon.svg";
import MakeIcon from "../../assets/Icons/MakeIcon.svg";
import CoworkIcon from "../../assets/Icons/CoworkIcon.svg";

const Page = styled.div`
  display: flex;
  width: 1200px;
  height: 197px;
  flex-direction: row;
  gap: 24px;
`;

function SmallCards() {
  return (
    <Page>
      <Card
        imgSrc={PastIcon}
        text={`지난 보고서\n모아 보기`}
        hovertext={`지금까지 받은 보고서들을 \n한 번에 모아볼 수 있어요`}
        to="/custom-keyword-news"
      />
      <Card
        imgSrc={MakeIcon}
        text={`키워드 보고서\n직접 만들기`}
        hovertext={`원하는 키워드를 넣으면 \n바당이 보고서를 만들어드려요`}
        to="/create-report"
      />
      <Card
        imgSrc={CoworkIcon}
        text={`협업할 가게\n찾아보기`}
        hovertext={`바당이 주변에 있는 가게와 \n협업할 수 있게 도와드려요`}
        to="/collaboration-management"
      />
    </Page>
  );
}

export default SmallCards;
