// components/CoworkC/RequestPopup.jsx
import React, { useState } from "react";

import styled from "styled-components";
import Btn from "../CoworkC/PopupButton.jsx";
import Close from "../../assets/Icons/XIcon.svg"; // 엑스 아이콘
import axios from "axios";

const Overlay = styled.div`
  position: fixed; /* 화면 전체 덮기 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.53); /* 반투명 검정 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소 위에 표시 */
`;
const PopupBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 623px;
  padding: 24px 16px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  gap: 48px;
  position: relative;
`;
const TextWrapper = styled.div`
  display: flex;
  width: 467px;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;
const Title = styled.div`
  color: #17171b;
  text-align: center;

  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const CloseBtn = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const ContentWrapper = styled.div`
  gap: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  color: #494954;
  text-align: center;
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;
const BtnWrapper = styled.div`
  width: 591px;
  height: 59px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const Box = styled.textarea`
  overflow: hidden; /* 스크롤 없애기 */
  display: flex;
  height: 120px;
  padding: 16px;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  background: #fff;
  resize: none;
  color: #494954;
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
function RequestPopup({ store, onClose }) {
  const [message, setMessage] = useState(""); // 입력 내용
  const toStoreId = store.store.storeId;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleRequest = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/collaboration/`,
        {
          toStoreId,
          initialMessage: message,
        },
        {
             withCredentials: true, 
        }
      );
      console.log("toStoreId:", toStoreId);
      console.log("message:", message);

      if (response.status === 201) {
        alert(response.data.message); // "신청이 완료되었습니다"
        onClose(); // 팝업 닫기
      }
    } catch (error) {
      console.error(error);
      alert("협업 요청에 실패했습니다.");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <PopupBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={Close} alt="닫기" onClick={onClose} />
        <TextWrapper>
          <Title>{store.store.name}에 협업을 요청할까요?</Title>
          <ContentWrapper>
            <Content>
              {store.store.name} : {store.store.address}
            </Content>
            <Box
              placeholder="원하시는 협업 내용을 간단히 입력해주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </ContentWrapper>
        </TextWrapper>
        <BtnWrapper>
          <Btn
            btnName="요청하기"
            width="467px"
            color="#759AFC"
            onClick={handleRequest}
          />
        </BtnWrapper>
      </PopupBox>
    </Overlay>
  );
}

export default RequestPopup;
