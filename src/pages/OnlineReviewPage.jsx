import React, { useState, useEffect } from "react";
import TimeBtnGroup from "../components/TimeBtnGroup";
import ReviewSection from "../components/ReviewC/ReviewSection";
import PieChart from "../components/ReviewC/PieChart";
import styled from "styled-components";
import BigQ from "../assets/Popups/BigQ.svg";
import GoodIcon from "../assets/Icons/GoodIcon.svg";
import BadIcon from "../assets/Icons/BadIcon.svg";
import Popup1 from "../assets/Popups/Popup1.svg";
import Popup2 from "../assets/Popups/Popup2.svg";
import Popup3 from "../assets/Popups/Popup3.svg";
import Popup4 from "../assets/Popups/Popup4.svg";
import LoadingPage from "./LoadingPage"
import useGetReviewAnalysis from "../hooks/queries/useGetReviewAnalysis";
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 48px;
  width: 1200px;
`;

const BigQPopup = styled.img`
    position: absolute;
  top: 50%;              /* 아이콘 세로 중앙 기준 */
  left: 100%;            /* QWrapper 오른쪽 바로 옆 */
  transform: translateY(-50%) translateX(4px); /* 세로 중앙 맞추고 약간 간격 띄움 */
  height: auto;
  z-index: 10;
  display: none;
`;

const QWrapper = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${BigQPopup} {
    display: block;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Title = styled.div`
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const TitleLarge = styled.span`
  color: #17171b;
  text-align: center;
  font-family: "NanumSquareOTF";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TitleSmall = styled.span`
  color: #17171b;
  font-family: "NanumSquareOTF";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const QIcon = styled.img`
  width: 27.6px;
  height: 27.6px;
  cursor: pointer;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
   grid-auto-rows: min-content; 
  gap: 24px;
  padding: 36px 120px;
`;
const KeywordBox = styled.div`
  white-space: pre-line; 
  word-break: keep-all;
`;
const StyledReviewSection = styled(ReviewSection)`
  &.section-1 {  width: 588px; }
  &.section-2 {  width: 587px; }
  &.section-3 { grid-row: 2 / 4;  width: 588px; }
  &.section-4 {  width: 588px; }
  &.section-5 { }
  &.section-6 { grid-column: 1 / 3;  width: 100%; }
`;

const PageContainer = styled.div`
  display: flex;
  width: 1440px;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

function OnlineReviewPage() {
  const options = ["전체", "한 달", "일주일"];
  const [selectedOption, setSelectedOption] = useState("전체");

  const { analysisData, loading, error } = useGetReviewAnalysis(selectedOption); // 옵션 상태 변경 시 훅 재호출.

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>데이터 불러오기 실패: {error.message}</div>; // 에러 발생 시 보여줄 404 페이지 만들어주세요...
  }

  console.log(analysisData);

  const {
    storeName,
    goodPoint,
    badPoint,
    percentage,
    analysisKeyword,
    analysisProblem,
    analysisSolution,
  } = analysisData;

  return (
    <PageContainer>
      <Header>
        <TitleSection>
          <Title>
            <TitleLarge>{storeName}</TitleLarge>
            <TitleSmall>의 전체 리뷰 분석</TitleSmall>
          </Title>
          <QWrapper>
            <QIcon src={BigQ} alt="BigQ" />
            <BigQPopup src={Popup1} alt="Popup1" />
          </QWrapper>
        </TitleSection>

        <TimeBtnGroup
          options={options}
          selectedValue={selectedOption}
          onSelect={setSelectedOption}
        />
      </Header>

      <GridContainer>
        <StyledReviewSection
          title="좋았어요"
          icon={GoodIcon}
          className="section-1"
          showSmallQ={false}
        >
          {goodPoint}
        </StyledReviewSection>

        <StyledReviewSection
          title="아쉬워요"
          icon={BadIcon}
          className="section-2"
          showSmallQ={false}
        >
          {badPoint}
        </StyledReviewSection>

        <StyledReviewSection
          title="긍·부정 비율"
          className="section-3"
          showSmallQ={false}
          ratios={percentage}
        >
          <PieChart
            positive={percentage.goodPercentage}
            neutral={percentage.middlePercentage}
            negative={percentage.badPercentage}
          />
        </StyledReviewSection>

        <StyledReviewSection
          title="키워드 분석"
          className="section-4"
          popupImage={Popup2}
        >
          <KeywordBox>
          {analysisKeyword}

          </KeywordBox>
        </StyledReviewSection>

        <StyledReviewSection
          title="리뷰 기반 개선점"
          className="section-5"
          popupImage={Popup3}
        >
          {analysisProblem}
        </StyledReviewSection>

        <StyledReviewSection
          title="사장님을 위한 제안"
          className="section-6"
          popupImage={Popup4}
        >
          {analysisSolution}
        </StyledReviewSection>
      </GridContainer>
    </PageContainer>
  );
}

export default OnlineReviewPage;
