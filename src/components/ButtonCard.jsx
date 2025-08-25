// components/ButtonCard.jsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
   display: flex;
   flex-direction: column ;
    height: 197px;
    width: 384px;
    padding: 22px 21px;
    gap: 32px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
`;
const Icon = styled.img`
    height: 97px;

`
const Textbox = styled.div`
    height: 25px;
    color: #000;
    text-align: center;
    font-family: 'NanumSquareOTF';
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 25px; 
`
function ButtonCard({ title, imageUrl }) {
  return (
    <Card>
      <Icon src={imageUrl} alt='아이콘' />
      <Textbox>
        {title === "지난 콘텐츠 다시 보기" ? (
          <><span style={{color: '#0066FF'}}>지난 콘텐츠</span> 다시 보기</>
        ) : title === "원하는 키워드로 맞춤형 뉴스 만들기" ? (
          <><span style={{color: '#FF8040'}}>원하는 키워드</span>로 맞춤형 뉴스 만들기</>
        ) : (
          title
        )}
      </Textbox>
    </Card>
  );
}
export default ButtonCard;
