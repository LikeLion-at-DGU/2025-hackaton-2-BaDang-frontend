// components/CoworkC/StoreListPopup.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Btn from "../CoworkC/PopupButton.jsx";
import Close from "../../assets/Icons/XIcon.svg"; // 엑스 아이콘
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.53);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
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
  justify-content: center;
  gap: 24px;
  align-items: center;
`;
const TextBox = styled.textarea`
  resize: none;
  display: flex;
  padding: 16px 16px 112px 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid #759afc;
  background: #fff;
  color: #494954;
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const subCategoryOptions = {
  음식: [
    "한식",
    "중식",
    "일식",
    "서양식",
    "기타외국식",
    "분식",
    "패스트푸드",
    "제과제빵",
    "카페",
  ],
  소매: [
    "슈퍼마켓",
    "편의점",
    "전통시장",
    "농축수산물",
    "건강식품",
    "의류",
    "패션잡화",
    "생활잡화",
    "가전제품",
    "서적/문구",
    "애완용품",
  ],
  생활서비스: [
    "미용실",
    "네일숍",
    "피부관리",
    "세탁소",
    "수선/수리",
    "사진관",
    "예식/행사",
    "인테리어",
  ],
  교육: [
    "입시/보습학원",
    "외국어학원",
    "예체능학원",
    "컴퓨터/IT교육",
    "평생교육",
  ],
  숙박: ["호텔", "모텔", "게스트하우스", "펜션/민박"],
  "오락/여가": [
    "PC방",
    "노래방",
    "게임방",
    "스크린골프",
    "당구장",
    "헬스/요가/필라테스",
  ],
  "의료/건강": ["약국", "한의원", "병원", "안경점", "헬스용품"],
  "운송/자동차": ["주유소", "세차장", "자동차수리", "렌터카"],
  "제조/생산": ["식품제조", "의류제조", "가구제조", "인쇄/출판"],
  기타: ["부동산중개", "여행사", "종교단체", "비영리단체"],
};
const storeTypeMap = {
  1: "음식",
  2: "소매",
  3: "생활서비스",
  4: "교육",
  5: "숙박",
  6: "오락/여가",
  7: "의료/건강",
  8: "운송/자동차",
  9: "제조/생산",
  10: "기타",
};

const getCategoryName = (type, categoryNumber) => {
  const typeName = storeTypeMap[type];
  if (!typeName) return "알 수 없음";

  const subCategories = subCategoryOptions[typeName];
  if (!subCategories) return "알 수 없음";

  return subCategories[categoryNumber - 1] || "알 수 없음"; // 1부터 시작하므로 -1
};

function StoreListPopup({
  storeName,
  storeType,
  storeCategory,
  phoneNumber,
  requestContent,
  collaborateId,
  onClose,
  startedAt,
  
}) {
  const [content, setContent] = useState(requestContent);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(collaborateId,requestContent);
  // 메모 수정
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${backendUrl}/collaboration/memo`,
        { collaborateId,
           memo: content },
        {
          withCredentials: true, // 수정 위치
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      alert(response.data.message);
      onClose();
    } catch (err) {
      console.error("메모 수정 실패:", err);
      alert("메모 수정에 실패했습니다.");
    }
  };

  // 협업 종료
  const handleEndCollaboration = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/collaboration/${collaborateId}`,
        {
          withCredentials: true, // 수정 위치
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("협업 종료 완료");
        onClose();
      } else {
        alert("협업 종료 실패");
      }
    } catch (err) {
      console.error("협업 종료 실패:", err);
      alert("서버 오류로 협업 종료에 실패했습니다.");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <PopupBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={Close} alt="닫기" onClick={onClose} />
        <TextWrapper>
          <Title>{storeName}</Title>
          <ContentWrapper>
            <Content>
              {storeName} : {storeTypeMap[storeType] || "알 수 없음"} -{" "}
              {getCategoryName(storeType, storeCategory)}
            </Content>

            <Content>전화 번호 : {phoneNumber}</Content>
            <Content>협업 시작 일시 : {startedAt}</Content>

            <Content>협업 내용</Content>
            <TextBox
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ContentWrapper>
        </TextWrapper>
        <BtnWrapper>
          <Btn
            btnName="수정완료"
            width="221px"
            color="#9D9D9D"
            onClick={handleSave}
          />
          <Btn
            btnName="협업종료"
            width="221px"
            color="#FF9762"
            onClick={handleEndCollaboration}
          />
        </BtnWrapper>
      </PopupBox>
    </Overlay>
  );
}

export default StoreListPopup;
