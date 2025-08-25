// pages/CreateReportPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import RobotIcon from "../assets/Icons/CreateReportRobotIcon.svg";
import { useNavigate } from "react-router-dom";

export default function CreateReportPage() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const term = keyword.trim();
    if (!term) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trend/keywords`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ keyword: term }),
      });
      const data = await response.json();
      console.log("응답:", data);

      navigate("/report");
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <Wrap>
      <Card>
        <Icon src={RobotIcon} alt="" />

        <Title>
          원하는 키워드를 입력하시면
          <br />
          가게 정보에 맞춰
          <br />
          바당이 맞춤형 보고서를 만들어드려요
        </Title>

        <Form onSubmit={handleSubmit}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="원하는 키워드를 입력하세요"
          />
          <Primary type="submit" disabled={!keyword.trim()}>
            제작하기
          </Primary>
        </Form>
      </Card>
    </Wrap>
  );
}

/* ===== styled ===== */
const Wrap = styled.div`
  width: 100%;
  /* Navbar는 이미 App에서 고정이므로, 페이지 중간만 구성 */
`;

const Card = styled.section`
  max-width: 760px;
  margin: 130px auto 131px;              /* 위 130 / 아래 131 */
  padding: 60px;                          /* 좌우 60, 상하 60(안쪽 여백) */
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  margin-bottom: 24px;                    /* 아이콘과 타이틀 간격(대략 60.5 총합 맞추기 위해 일부는 상/하 패딩으로 처리) */
`;

const Title = styled.h2`
  margin: 0 0 28px;
  text-align: center;
  color: #2b2f38;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: -0.2px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  font-size: 16px;
  color: #17171b;
  outline: none;

  ::placeholder {
    color: #98a2b3;
  }

  &:focus {
    border-color: #759afc;
    box-shadow: 0 0 0 4px rgba(117, 154, 252, 0.2);
  }
`;

const Primary = styled.button`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 16px;
  background: #759afc;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    filter: brightness(0.97);
  }
  &:active:not(:disabled) {
    filter: brightness(0.94);
  }
  &:disabled {
    background: #c7d2fe;
    cursor: default;
  }
`;
