// components/NewsCard.jsx
import React from 'react';
import styled from 'styled-components';
import NoHeart from '../assets/NoHeart.svg';
import YesHeart from '../assets/YesHeart.svg';

const Card = styled.div`
display: flex;
width: 384px;
height: 418px;
flex-direction: column;
justify-content: flex-start;
align-items: center;
 border-radius: 20px;
border: 1.5px solid #D8D8D8;
background: #FFF;

/* button shadow */
box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const ThumbnailContainer = styled.div`
  position: relative;
   border-radius:20px 20px 0px 0px;
  width: 100%;
  height: 259px;
  background-color: aliceblue
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  border-radius: 8px 8px 0 0;
`;

const HeartButton = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
`;

const Textbox = styled.div`
  display: flex;
  width: 384px;
  height: 150px;
  padding: 16px 16px 16px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
`;

const KeyWrapper = styled.div`
  height: 32px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BaseText = styled.h3`
  border-radius: 8px;
  display: flex;
  padding: 7px 15px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  border: 1.5px solid #759AFC;
`;

const Keyword = styled(BaseText)`
  color: #FAF9F6;
  background-color: ${(props) => (props.isOrange ? '#FF9762' : '#759AFC')};
  border-color: ${(props) => (props.isOrange ? '#FF9762' : '#759AFC')};
  font-family: NanumSquareOTF;
`;

const Date = styled(BaseText)`
  color: #494954;
  border-color: ${(props) => (props.isOrange ? '#FF9762' : '#759AFC')};
  font-family: NanumSquareOTF;
`;

const Title = styled.div`
  width: 347px;
  height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  color: #494954;
  transition: color 0.2s ease;
  font-family: SUIT;

color: var(--Typo-Black01, #494954);
font-family: SUIT;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: 30px; /* 120% */
  ${Card}:hover & {
    color: ${(props) => (props.isOrange ? '#FF9762' : '#759AFC')};
  }
`;

function NewsCard({
  id,
  title,
  keyword,
  date,
  imageUrl,
  isOrange,
  liked = false,
  onToggleLike,
  onClick,
}) {
  const handleHeartClick = (e) => {
    e.stopPropagation();
    onToggleLike?.(id);
  };

  return (
    <Card onClick={onClick}>
      <ThumbnailContainer>
        <Thumbnail src={imageUrl} alt="썸네일" />
        <HeartButton
          src={liked ? YesHeart : NoHeart}
          alt="찜하기"
          onClick={handleHeartClick}
        />
      </ThumbnailContainer>

      <Textbox>
        <KeyWrapper>
          <Keyword isOrange={isOrange}>{keyword|| "키워드 불러오는 중..."}</Keyword>
          <Date isOrange={isOrange}>{isOrange ? "사용자 생성 보고서" : date}</Date>
        </KeyWrapper>
        <Title isOrange={isOrange}>{title}</Title>
      </Textbox>
    </Card>
  );
}

export default NewsCard;