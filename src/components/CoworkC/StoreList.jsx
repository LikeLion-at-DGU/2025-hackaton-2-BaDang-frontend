// components/CoworkC/StoreList.jsx
import React from "react";
import styled from "styled-components";
import StoreBtn from "./StoreBtn";
const Box = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
const Title = styled.div`
  color: #17171b;
  text-align: center;
  height: 31px;
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const NothingText = styled.div`
  height: 63px;
  color: #494954;
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;
function StoreList({ title, nothing, stores = [], onClick }) {
  return (
    <Box>
      <Title>{title}</Title>
      <List>
        {stores.length > 0 ? (
          stores.map((storeItem, idx) => (
            <StoreBtn 
            key={idx}
            storeName={storeItem.allData?.name|| storeItem.allData?.storeName||"이름 없음"} 
             onClick={() => onClick(storeItem)} />
          ))
        ) : (
          <NothingText>{nothing}</NothingText>
        )}
      </List>
    </Box>
  );
}

export default StoreList;
