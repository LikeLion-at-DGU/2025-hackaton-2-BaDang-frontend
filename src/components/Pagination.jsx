// components/Pagination.jsx
import React, { useMemo } from "react";
import styled from "styled-components";

export default function Pagination({
  current = 1,
  total = 1,
  onChange,
  max = 5,               // 한 번에 보여줄 페이지 수(기본 5)
}) {
  const pages = useMemo(() => buildRange(current, total, max), [current, total, max]);

  if (total <= 1) return null;

  const prev = () => current > 1 && onChange?.(current - 1);
  const next = () => current < total && onChange?.(current + 1);

  return (
    <Nav role="navigation" aria-label="pagination">
      <Arrow
        aria-label="이전 페이지"
        disabled={current === 1}
        onClick={prev}
      >
        ‹
      </Arrow>

      {pages.map((p, i) =>
        p === "…" ? (
          <Ellipsis key={`e-${i}`} aria-hidden>…</Ellipsis>
        ) : (
          <PageBtn
            key={p}
            onClick={() => onChange?.(p)}
            aria-current={p === current ? "page" : undefined}
            className={p === current ? "active" : ""}
          >
            {p}
          </PageBtn>
        )
      )}

      <Arrow
        aria-label="다음 페이지"
        disabled={current === total}
        onClick={next}
      >
        ›
      </Arrow>
    </Nav>
  );
}

/** ===== helpers ===== */
function buildRange(current, total, max) {
  const clamp = Math.max(1, Math.min(max, 9)); // 안전장치
  let start = Math.max(1, current - Math.floor(clamp / 2));
  let end = start + clamp - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - clamp + 1);
  }
  const nums = [];
  for (let i = start; i <= end; i++) nums.push(i);

  // 앞/뒤에 남는 구간이 크면 … 처리
  if (nums[0] > 2) nums.unshift(1, "…");
  else if (nums[0] === 2) nums.unshift(1);

  if (nums[nums.length - 1] < total - 1) nums.push("…", total);
  else if (nums[nums.length - 1] === total - 1) nums.push(total);

  return nums;
}

/** ===== styled ===== */
const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`;

const circle = `
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const PageBtn = styled.button`
  ${circle};
  border: none;
  background: transparent;
  color: #3a3a3f;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #e7edff;            /* 연한 파랑 */
  }
  &.active {
    background: #759afc;            /* 메인 파랑 */
    color: #fff;
  }
`;

const Ellipsis = styled.span`
  ${circle};
  color: #9aa0a6;
`;

const Arrow = styled.button`
  ${circle};
  border: none;
  background: transparent;
  color: #3a3a3f;
  cursor: pointer;

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
  &:not(:disabled):hover {
    background: #f0f2f7;
  }

  font-size: 18px;
`;
