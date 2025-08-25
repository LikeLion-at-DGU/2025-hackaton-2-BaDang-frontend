// components/FavoritePanel.jsx
import React from "react";
import styled from "styled-components";
import NoHeart from "../assets/NoHeart.svg";
import YesHeart from "../assets/YesHeart.svg";

export default function FavoritePanel({ active = false, count = 0, onToggle }) {
  return (
    <Wrap>
      <Pill type="button" onClick={onToggle} aria-pressed={active}>
        <Label>찜한 뉴스</Label>
        <Icon src={active ? YesHeart : NoHeart} alt="" />
        {count > 0 && <Badge>{count}</Badge>}
      </Pill>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Pill = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 63px;
  border-radius: 20px;
  display: flex;
padding: 20px 16px;
align-items: center;
gap: 10px;
  border: 1px solid #d8d8d8;
  background: #fff;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

const Label = styled.span`
  color: var(--Typo-Black01, #494954);
  text-align: center;
  font-family: NanumSquareOTF;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  opacity: 0.9;
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ff9762;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  font-weight: 700;
`;
