// pages/MainPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BigCards from "../components/MainC/BigCards";
import Advertisement from "../components/MainC/Advertisement";
import SmallCards from "../components/MainC/SmallCards";
import { useAuth } from "../context/AuthContext";
import { useGetNewsletterList } from "../hooks/queries/useGetNewsletterList";

const Page = styled.div`
  margin: auto;
  display: flex;
  width: 1200px;
  flex-direction: column;
  min-height: 100vh;
`;

const HelloText = styled.div`
  width: 751px;
  height: 150px;
  margin: 48px auto;
  color: #494954;
  text-align: center;
  font-family: SUIT;
  font-size: 40px;
  font-weight: 800;
  line-height: 60px;
`;

const Orange = styled.span`
  color: #ff9762;
`;

const Blue = styled.span`
  color: #759afc;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

export default function MainPage() {
  const { user } = useAuth();
  const storeId = user?.storeId;

  // 최신 2개 뉴스레터만 담을 상태
  const [latestTwo, setLatestTwo] = useState([]);

  // 훅으로 전체 뉴스레터 불러오기
  const { newsletters, loading, error, loadMore } = useGetNewsletterList(storeId, 9);

  useEffect(() => {
    if (newsletters.length > 0) {
      // 최신 2개만 추출
      setLatestTwo(newsletters.slice(0, 2));
    }
  }, [newsletters]);

  if (loading) return <Page>Loading...</Page>;

  return (
    <Page>
      <HelloText>
        안녕하세요 {user?.username} <Blue>사장님</Blue> <br />
        리뷰를 <Orange>분석</Orange>하고 이번주 <Orange>보고서</Orange>를 확인해보세요!
      </HelloText>

      <CardWrapper>
        {/* 최신 2개 뉴스레터 전달 */}
        <BigCards newsletters={latestTwo} />
        <Advertisement />
        <SmallCards />
      </CardWrapper>
    </Page>
  );
}
