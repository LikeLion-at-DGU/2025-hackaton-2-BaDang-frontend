// components/CoworkC/CoworkPopup.jsx
import React from 'react';
import styled from 'styled-components';
import Btn from '../CoworkC/PopupButton.jsx';
import Close from '../../assets/Icons/XIcon.svg'; // 엑스 아이콘

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
const PopupBox=styled.div`
    display: flex;
    flex-direction: column;
width: 623px;
height: 357px;
padding: 24px 16px;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 20px;
background: #FFF;
gap: 48px;
  position: relative;

`
const TextWrapper=styled.div`
    display: flex;
    width: 467px;
    flex-direction: column;
    align-items: center;
    gap: 48px;
`
const Title=styled.div`
    color: #17171B;
    text-align: center;

    font-family: SUIT;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const CloseBtn=styled.img`
    position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`
const ContentWrapper=styled.div`
    gap: 8px;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;`

const Content=styled.div`
    color:#494954;
    text-align: center;
    font-family: SUIT;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; 

`
const BtnWrapper=styled.div`
    width: 591px;
    height: 59px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 24px;
    align-items: center;
`

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
function CoworkPopup({ storeName, storeType, storeCategory,requestContent, collaborateId, onClose }) {
const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleDecision = async (isAccepted) => {
    try {
console.log("가게이름",storeName)
      
const response = await fetch(`${backendUrl}/collaboration/accept`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', 
  body: JSON.stringify({
    collaborateId: collaborateId,
    isAccepted: isAccepted,
  }),
});

      if (!response.ok) {
        console.error('서버 오류:', response.status);
        return;
      }

      const result = await response.json();
      console.log(result); // { status:200, message:"수락/거절 결정완료" }

      onClose(); // 팝업 닫기
    } catch (err) {
      console.error('요청 실패:', err);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <PopupBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={Close} alt="닫기" onClick={onClose} />
        <TextWrapper>
          <Title>
            {storeName}의 <br /> 협업 요청을 수락할까요?
          </Title>
          <ContentWrapper>
             <Content>
              {storeName} : {storeTypeMap[storeType] || "알 수 없음"} -{" "}
              {getCategoryName(storeType, storeCategory)}
            </Content>
            <Content>요청 내용 : {requestContent}</Content>
          </ContentWrapper>
        </TextWrapper>
        <BtnWrapper>
          <Btn btnName='수락하기' color='#759AFC' width="221px" 
               onClick={() => handleDecision('ACCEPTED')} />
          <Btn btnName='거절하기' color='#FF9762' width="221px" 
               onClick={() => handleDecision('REJECTED')} />
        </BtnWrapper>
      </PopupBox>
    </Overlay>
  );
}

export default CoworkPopup;
