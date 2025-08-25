import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import Advertisement from "../components/Advertisement2";
import NoHeart from "../assets/NoHeart.svg";
import YesHeart from "../assets/YesHeart.svg";
import { useFavorites } from "../context/FavoritesContext";
import { useGetNewsletterDetail } from "../hooks/queries/useGetNewsletterDetail";

export default function NewsDetailPage() {
  const { id } = useParams();
  const { isLiked, toggleLike } = useFavorites();

  const { data: newsletter, loading, error } = useGetNewsletterDetail(id);
  console.log(newsletter);

  const liked = isLiked(id);

  return (
    <Page>
      <Article>
        <IssueBadge>{id}</IssueBadge>

        {loading && <div>불러오는 중...</div>}
        {error && <div>데이터 로드 실패: {String(error)}</div>}
        {!loading && !error && (
          <>
            <Title>{newsletter?.title}</Title>

            <MetaRow>
              <ChipPrimary>{newsletter?.keyword}</ChipPrimary>
              <ChipLine>{newsletter?.createdAt}</ChipLine>
              <LikeBtn type="button" onClick={() => toggleLike(id)}>
                찜하기
                <HeartIcon src={liked ? YesHeart : NoHeart} alt="" />
              </LikeBtn>
            </MetaRow>

            <Hero
              src={
                newsletter?.keywords?.[0]?.keywordImageUrl ||
                newsletter?.thumbnail ||
                newsletter?.imageUrl ||
                ""
              }
              alt="뉴스레터 썸네일"
            />

            {/* 썸네일 여기에 넣어야 함....!*/}

            {/* 본문 */}
            <Paragraph>{newsletter?.firstContent}</Paragraph>
            <Paragraph>{newsletter?.secondContent}</Paragraph>

            <Advertisement />
          </>
        )}
      </Article>
    </Page>
  );
}

/* ===== styled ===== */
const Page = styled.div`
  min-height: 100vh;
`;

const Article = styled.main`
  max-width: 768px; /* 좌우 324px 여백 느낌 */
  margin: 48px auto 48px; /* 상단 여유 */
  padding: 0 16px; /* 모바일 대비 내부 여백 */
`;

const IssueBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #ff6a3d;
  color: #fff;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  color: var(--Primary-Black01, #17171b);
  font-family: SUIT;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const ChipBase = styled.span`
  display: inline-flex;
  align-items: center;
  height: 52px;
  padding: 0 12px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
`;

const ChipPrimary = styled(ChipBase)`
  color: #fff;
  background: #0046ff;
`;

const ChipLine = styled(ChipBase)`
  color: #17171b;
  border: 1px solid #e5e7eb;
  background: #fff;
`;

const LikeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 52px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #17171b;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

const HeartIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const Hero = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
  margin: 12px 0 20px;
  object-fit: cover;
`;

const Paragraph = styled.p`
  color: var(--Primary-Black01, #17171b);
  font-family: SUIT;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: 37px; /* 148% */
  margin: 25px 0;
`;
