// components/TimeBtnGroup.jsx
import React from "react";
import styled from "styled-components";

const TimeBtnWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  background:  #fff;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

const BtnWrapper = styled.div`
  display: inline-flex;
  padding: 20px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: fit-content;
  background: transparent;
  cursor: pointer;

  &.active {
    background-color: #759afc;
    color: #faf9f6;
    border-radius: 20px;
  }
`;

const BtnText = styled.div`
  color: #494954;
  text-align: center;
  font-family: "NanumSquareOTF";
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  transition: all 0.2s ease;

  ${BtnWrapper}.active & {
    color: #fff;
  }
  ${BtnWrapper}:hover:not(.active) & {
    color: #759afc;
  }
`;

function TimeBtnGroup({ options, selectedValue, onSelect }) {
  return (
    <TimeBtnWrapper>
      {options.map((option) => (
        <BtnWrapper
          key={option}
          onClick={() => onSelect(option)}
          className={selectedValue === option ? "active" : ""}
        >
          <BtnText>{option}</BtnText>
        </BtnWrapper>
      ))}
    </TimeBtnWrapper>
  );
}

export default TimeBtnGroup;
