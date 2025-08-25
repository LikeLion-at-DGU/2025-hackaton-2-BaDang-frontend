// components/BigCards.jsx
import React from 'react';
import styled from 'styled-components';
import NewsCard from '../NewsCard';
import BlueCardBtn from './BigCardBtn';
import NothingCard from './NothingCard';
import NotebookIcon from '../../assets/Icons/NotebookIcon.svg';
import RobotIcon from '../../assets/Icons/RobotIcon.svg';

const Page = styled.div`
  display: flex;
  width: 1200px;
  height: 418px;
  flex-direction: row;
  gap: 24px;
`;

function BigCards({ newsletters = [] }) {
  // 최신 뉴스 2개만 선택
  const latestTwo = newsletters.slice(0, 2);

  const firstCard = latestTwo[0]
    ? (
      <NewsCard
        id={latestTwo[0].id}
        title={latestTwo[0].title}
        keyword={latestTwo[0].keywords[0].keywordName}
        date={latestTwo[0].createdAt}
        imageUrl={latestTwo[0].thumbnail}
        isOrange={latestTwo[0].isOrange}
        liked={latestTwo[0].isLiked}
        onToggleLike={latestTwo[0].onToggleLike}
        onClick={latestTwo[0].onClick}
      />
    )
    : <NothingCard imageUrl={NotebookIcon} text="앗! 아직 보고서가 없어요" />;

  const secondCard = latestTwo[1]
    ? (
      <NewsCard
        id={latestTwo[1].id}
        title={latestTwo[1].title}
        keyword={latestTwo[1].keywords[0].keywordName}
        date={latestTwo[1].createdAt}
        imageUrl={latestTwo[1].thumbnail}
        isOrange={latestTwo[1].isOrange}
        liked={latestTwo[1].isLiked}
        onToggleLike={latestTwo[1].onToggleLike}
        onClick={latestTwo[1].onClick}
      />
    )
    : <NothingCard imageUrl={RobotIcon} text="앗! 아직 보고서가 없어요" />;

  return (
    <Page>
      {firstCard}
      {secondCard}
      <BlueCardBtn />
    </Page>
  );
}

export default BigCards;
