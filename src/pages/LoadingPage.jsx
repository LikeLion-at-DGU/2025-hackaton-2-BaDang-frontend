import styled from "styled-components";
import { useState, useEffect } from "react";
import TypingRobot from "../assets/Icons/TypingRobotIcon.svg";
import RunningRobot from "../assets/Icons/RunningRobotIcon.svg";

const Page = styled.div`
  position: relative; // Fade absolute의 기준
  margin: auto;
  width: 708px;
  height: 1024px; // Fade 겹침을 위한 높이
  display: flex;
  justify-content: flex-start; // padding-top 대신 위치 조절
  align-items: center;
`;

const Text = styled.div`
  width: 100%;
  color: #494954;
  text-align: center;
  font-family: SUIT;
  font-size: 30px;
  font-weight: 700;
  line-height: 45px;
`;

const Fade = styled.div`
  position: absolute;
  width: 507px;
  top: 200px; // Page 안에서 위치
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

function LoadingPage() {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSecond(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Page>
      <Fade show={!showSecond}>
        <img src={RunningRobot} alt="로봇 이미지" />
        <Text>바당이 분석에 필요한 정보를 모으고 있어요</Text>
      </Fade>

      <Fade show={showSecond}>
        <img src={TypingRobot} alt="로봇 이미지" />
        <Text>바당이 사장님을 위한 분석을 진행 중이에요</Text>
      </Fade>
    </Page>
  );
}

export default LoadingPage;
