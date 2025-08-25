// components/NewsCard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';


const Card = styled.div`
    display: flex;
    width: 384px;
    height: 418px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.15);
`;
const ThumbnailContainer = styled.div`
  position: relative;
  width: 384px;
  height: 259px;
`
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: #494954;
  border-radius: 20px 20px 0 0;
`

const Textbox = styled.div`
display: flex;
width: 384px;
height: 165px;
text-align: center;
justify-content: center;
align-items: center;
flex-shrink: 0;
`




const Title=styled.h3`
color:#494954;
text-align: center;
font-family: SUIT;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: 30px; /* 120% */
  

`
  
function NothingCard({ imageUrl, text }) {


  return (
    <Card>
      <ThumbnailContainer>
        <Thumbnail src={imageUrl} alt='사진' />
      </ThumbnailContainer>
      <Textbox>
        <Title>{text}</Title>
        </Textbox>
    </Card>
  );
}

export default NothingCard;
