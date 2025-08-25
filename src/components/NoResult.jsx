// components/NoResult.jsx
import React from "react";
import styled from "styled-components";
import RobotIcon from "../assets/Icons/NoResultRobotIcon.svg";

export default function NoResult({
  title = "검색 결과가 없어요",
  subtitle = "보고서를 직접 만들어 볼까요?",
  buttonText = "보고서 만들러 가기",
  onMakeReport,
}) {
  return (
    <Wrap role="status" aria-live="polite">
      <Icon src={RobotIcon} alt="" />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <CTA type="button" onClick={onMakeReport}>
        {buttonText}
      </CTA>
    </Wrap>
  );
}

/* ===== styled ===== */
const Wrap = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 60px;              /* ↔︎, ↕︎ 모두 60px */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Icon = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
`;

const Title = styled.h2`
  margin-top: 8px;
  font-size: 24px;
  font-weight: 800;
  color: #2b2f38;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #4b5563;
  text-align: center;
`;

const CTA = styled.button`
  margin-top: 12px;
  width: 100%;
  max-width: 520px;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: #759afc;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;

  &:hover { filter: brightness(0.96); }
  &:active { filter: brightness(0.92); }
`;
