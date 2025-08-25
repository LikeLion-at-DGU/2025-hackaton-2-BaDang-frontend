// components/CategoryTabs.jsx
import React, { useRef } from "react";
import styled from "styled-components";

export default function CategoryTabs({ options = [], value, onChange }) {
  const btnRefs = useRef([]);

  const focusAt = (i) => btnRefs.current[i]?.focus();

  // 키보드 내비게이션(←/→, Enter/Space)
  const handleKeyDown = (e, i, opt) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % options.length;
      focusAt(next);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + options.length) % options.length;
      focusAt(prev);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange?.(opt);
    }
  };

  return (
    <Group role="tablist" aria-label="뉴스 구분">
      {options.map((opt, i) => {
        const active = value === opt;
        return (
          <BtnWrapper
            key={opt}
            ref={(el) => (btnRefs.current[i] = el)}
            className={active ? "active" : ""}
            onClick={() => onChange?.(opt)}
            onKeyDown={(e) => handleKeyDown(e, i, opt)}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
          >
            <BtnText>{opt}</BtnText>
          </BtnWrapper>
        );
      })}
    </Group>
  );
}

/* ===== styled ===== */
const Group = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  height: 63px;
border: 1px solid var(--Primary-gray2, #D8D8D8);
background: var(--Background-White, #FFF);

/* button shadow */
box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

const BtnWrapper = styled.div`
  display: flex;
  padding: 20px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s ease;

  &.active {
    background: var(--Primary-Blue01, #759AFC);
    color: #FAF9F6;
  }

  &:hover:not(.active) {
    color: #759AFC;
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
    color: #FFF;
  }

  ${BtnWrapper}:hover:not(.active) & {
    color: #759AFC;
  }
`;
