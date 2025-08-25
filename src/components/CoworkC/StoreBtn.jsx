// components/CoworkC/StoreBtn.jsx
import React from "react";
import styled from "styled-components";
const BtnWrapper = styled.button`
  width: 139px;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #759AFC;
  }
`;

const StoreName = styled.div`
  font-family: "NanumSquareOTF";
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  color: #494954;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  text-align: center;
  
  ${BtnWrapper}:hover & {
    color: #FAF9F6;
  }
`;

function formatStoreName(name) {
   if (!name) return ""; // name이 undefined/null이면 빈 문자열 반환
  // 띄어쓰기 있는 경우 먼저 줄바꿈
  if (name.includes(" ")) {
    const words = name.split(" ");
    let firstLine = words[0]; // 첫 번째 단어
    let secondLine = words.slice(1).join(" "); // 나머지 단어
    if (secondLine.length > 10) secondLine = secondLine.slice(0, 10) + "...";
    return firstLine + "\n" + secondLine;
  }

  // 띄어쓰기 없는 경우
  const maxFirstLine = 9;
  const maxSecondLine = 10;
  let firstLine = name.slice(0, maxFirstLine);
  let secondLine = name.slice(maxFirstLine);
  if (secondLine.length > maxSecondLine) secondLine = secondLine.slice(0, maxSecondLine) + "...";

  return firstLine + "\n" + secondLine;
}
function StoreBtn({ storeName, onClick }) {
  return (
    <BtnWrapper onClick={onClick}>
      <StoreName>{formatStoreName(storeName)}</StoreName>
    </BtnWrapper>
  );
}

export default StoreBtn;
