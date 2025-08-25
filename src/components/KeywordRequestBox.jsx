// components/KeywordRequestBox.jsx
import React from "react";
import styled from "styled-components";
import RightIcon from "../assets/Icons/RightIcon.svg"

export default function KeywordRequestBox({
  recent = [],                 // string[]
  onSelect,                    // (keyword) => void
  onRemove,                    // (keyword) => void
  onMakeReport,                // () => void
}) {
  // 키보드 접근성(Enter/Space로 chip 선택)
  const handleKey = (e, kw) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(kw);
    }
  };

  return (
    <Wrap>
      <ChipsRow>
        {recent.map((kw) => (
          <Chip
            key={kw}
            role="button"
            tabIndex={0}
            onClick={() => onSelect?.(kw)}
            onKeyDown={(e) => handleKey(e, kw)}
            aria-label={`${kw} 검색`}
          >
            <span>{kw}</span>
            <RemoveBtn
              type="button"
              aria-label={`${kw} 삭제`}
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.(kw);
              }}
              title="최근 검색어에서 제거"
            >
              ×
            </RemoveBtn>
          </Chip>
        ))}
      </ChipsRow>

      <ReportButton type="button" onClick={onMakeReport}>
        <ReportText>
          <Accent>보고서</Accent>직접 만들기
        </ReportText>
        <ReportIcon src={RightIcon} alt="report icon" />
      </ReportButton>
    </Wrap>
  );
}

/** ===== styled ===== */
const Wrap = styled.div`
max-height: 63px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: nowrap;
`;

const ChipsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  white-space: nowrap;
`;

const Chip = styled.div`
display: flex;
padding: 20px 15px;
height: 63px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 20px;
border: 1px solid  #D8D8D8;
background:#FFF;

box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
color:  #494954;
text-align: center;
font-family: NanumSquareOTF;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
  cursor: pointer;

  &:hover { background: #f9fafb; }
  &:focus-visible { outline: 2px solid #0046ff; outline-offset: 2px; }
`;

const RemoveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #667085;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;

  &:hover { background: #f2f4f7; }
`;

const ReportButton = styled.button`
max-height: 63px;
  display: flex;
  white-space: nowrap;
  justify-content: center;
  align-items: flex-end;
  gap: 88px;
  padding: 14px 16px 15px 16px;
  border-radius: 20px;
  border: 1px solid  #D8D8D8;
  background:#FFF;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;
`;

const ReportText = styled.span`
  font-size: 20px;
  font-family: NanumSquareOTF;
  font-style: normal;
  line-height: 155%;
  font-weight: 500;

  color:  #494954;
`;

const Accent = styled.span`
  color: #FF9762;
  font-weight: 500;
  font-family: NanumSquareOTF;
  font-size: 20px;
  font-style: normal;
  line-height: 155%;
  margin-right: 4px;
`;

const ReportIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 999px;
`;
