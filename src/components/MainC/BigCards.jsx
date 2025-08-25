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



  return (
    <Page>
      {(latestTwo.length > 0
        ? latestTwo.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              title={item.title}
              keyword={item.keywords[0].keywordName}
              date={item.createdAt}
              imageUrl={item.keywords[0].keywordImageUrl}
              isOrange={item.isOrange}
              liked={item.isLiked}
              onToggleLike={item.onToggleLike}
              onClick={item.onClick}
            />
          ))
        : <NothingCard imageUrl={NotebookIcon} text="앗! 아직 보고서가 없어요" />
      )}
      <BlueCardBtn />
    </Page>
  );
}

export default BigCards;

