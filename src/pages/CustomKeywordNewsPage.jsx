import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import KeywordRequestBox from "../components/KeywordRequestBox";
import CategoryTabs from "../components/CategoryTabs";
import FavoritePanel from "../components/FavoritePanel";
import Pagination from "../components/Pagination";
import NoResult from "../components/NoResult";
import { useFavorites } from "../context/FavoritesContext";
import { useGetNewsletterList } from "../hooks/queries/useGetNewsletterList";
import { useGetNewsletterSearch } from "../hooks/queries/useGetNewsletterSearch";
import { useAuth } from "../context/AuthContext";

/** ===== 레이아웃 ===== */
const Page = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 24px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* 상단(검색바 + 최근검색/보고서)만 중앙 고정 폭 */
const SearchSection = styled.section`
  width: 100%;
  max-width: 670px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* 검색바를 648px로 쓰고 있어서 한 번 더 감싸 중앙 정렬 */
const CenterLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* 컨트롤 줄: 카테고리 탭(좌) + 찜 패널(우) */
const ControlsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* 본문 섹션 */
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardsGrid = styled.section`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 384px);
    justify-content: space-between;
  }
  @media (min-width: 1300px) {
    grid-template-columns: repeat(3, 384px);
    justify-content: space-between;
  }
`;

/** ===== 데이터(예시) ===== */
const CATEGORIES = ["전체", "바당이 만든 뉴스", "직접 만든 뉴스"];
const MOCK_NEWS = Array.from({ length: 27 }).map((_, i) => ({
  id: i + 1,
  title:
    "폭폭 찌는 더운 날씨, 사람들의 마음을 사로잡을 수 있는 가게 운영 방법은?",
  keyword: i % 3 === 0 ? "민생 회복 소비쿠폰" : "환경",
  date: "00년 0월 0주차",
  imageUrl: "https://picsum.photos/seed/" + (i + 1) + "/384/288",
  isOrange: i % 3 === 0,
  category:
    i % 3 === 0 ? "바당이 만든 뉴스" : i % 3 === 1 ? "직접 만든 뉴스" : "전체",
}));
const PAGE_SIZE = 9;

/** ===== 페이지 ===== */
export default function CustomKeywordNewsPage() {
  // 전체 뉴스레터 조회 로직

  //탠스택 쿼리 써도 되면 이 코드 쓰기... 가장 효율적 / 유지보수 편함
  // const storeId; // 실제 로그인된 유저의 storeId 가져오기
  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   (storeId, 9);

  const navigate = useNavigate();
  const { user } = useAuth();
  const storeId = user?.storeId;
  const [mode, setMode] = useState("list"); // list | search
  const [searchInput, setSearchInput] = useState("");
  const [recent, setRecent] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const { likedIds, isLiked, toggleLike } = useFavorites();
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  // 전체 목록
  const {
    newsletters: listNews,
    hasMore: listHasMore,
    loading: listLoading,
    loadMore,
  } = useGetNewsletterList(storeId);

  // 검색 목록
  const {
    newsletters: searchNews,
    hasMore: searchHasMore,
    loading: searchLoading,
    search,
    changePage,
  } = useGetNewsletterSearch({ limit: 9 });

  const baseNews = mode === "list" ? listNews : searchNews;
  const hasMore = mode === "list" ? listHasMore : searchHasMore;
  const loading = mode === "list" ? listLoading : searchLoading;

  const displayedNewsletters = useMemo(() => {
    let base = [...baseNews];

    // 카테고리 필터: "바당이 만든 뉴스" = isUserMade === false, "직접 만든 뉴스" = true
    if (selectedCategory && selectedCategory !== "전체") {
      if (selectedCategory === "바당이 만든 뉴스") base = base.filter((n) => n.isUserMade === false);
      else if (selectedCategory === "직접 만든 뉴스") base = base.filter((n) => n.isUserMade === true);
    }

    // 찜만 보기 필터
    if (favoriteOnly) base = base.filter((n) => isLiked(n.id));

    return base;
  }, [baseNews, selectedCategory, favoriteOnly, isLiked]);

  /** 검색 실행 */
  const handleSearch = (term) => {
    setMode("search");
    pushRecent(term);
    search({ query: term, page: 1 });
  };

  // 최근검색
  const pushRecent = (term) => {
    if (!term) return;
    setRecent((prev) => {
      const next = [term, ...prev.filter((x) => x !== term)];
      return next.slice(0, 3);
    });
  };

  const handleSelectRecent = (keyword) => {
    setSearchInput(keyword);
    handleSearch(keyword);
  };

  //카테고리
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);

    if (mode === "list") {
      return;
    }

    // search 모드
    if (cat === "전체") search({ isUserMade: null, page: 1 });
    else if (cat === "바당이 만든 뉴스") search({ isUserMade: false, page: 1 });
    else if (cat === "직접 만든 뉴스") search({ isUserMade: true, page: 1 });
  };

  const handleMakeReport = () => {
    const term = (searchInput || "").trim();
    navigate("/create-report", { state: { keyword: term } });
  };

  // if (isLoading) return <div>불러오는 중...</div>;

  // const newsletters = data.pages.flatMap((page) => page.newsletter);

  // const navigate = useNavigate();
  // // 검색 입력값 vs 실제 적용된 쿼리
  // const [searchInput, setSearchInput] = useState("");
  // const [query, setQuery] = useState("");

  // // 최근 검색어(최대 3개, 최신 우선, 중복 제거)
  // const [recent, setRecent] = useState([]);

  // // 카테고리/페이지
  // const [selectedCategory, setSelectedCategory] = useState("전체");
  // const [currentPage, setCurrentPage] = useState(1);

  // // ❤️ 좋아요 상태 + 찜 필터 토글
  // const { likedIds, isLiked, toggleLike } = useFavorites();
  // const [favoriteOnly, setFavoriteOnly] = useState(false);

  // // 최근 검색어 삭제
  // const handleRemoveRecent = (kw) => {
  //   setRecent((prev) => prev.filter((x) => x !== kw));
  // };

  // // 결과 필터링
  // const filtered = useMemo(() => {
  //   let base = MOCK_NEWS;
  //   if (selectedCategory !== "전체") {
  //     base = base.filter((n) => n.category === selectedCategory);
  //   }
  //   if (query) {
  //     const q = query.toLowerCase();
  //     base = base.filter(
  //       (n) =>
  //         n.title.toLowerCase().includes(q) ||
  //         n.keyword.toLowerCase().includes(q)
  //     );
  //   }
  //   if (favoriteOnly) base = base.filter((n) => isLiked(n.id));
  //   return base;
  // }, [query, selectedCategory, favoriteOnly, isLiked]);

  // const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // const pageSlice = filtered.slice(
  //   (currentPage - 1) * PAGE_SIZE,
  //   currentPage * PAGE_SIZE
  // );

  // // 최근검색 업데이트
  // const pushRecent = (term) => {
  //   if (!term) return;
  //   setRecent((prev) => {
  //     const next = [term, ...prev.filter((x) => x !== term)];
  //     return next.slice(0, 3);
  //   });
  // };

  // const handleSearch = () => {
  //   const term = searchInput.trim();
  //   setQuery(term);
  //   setCurrentPage(1);
  //   pushRecent(term);
  // };

  // const handleSelectRecent = (kw) => {
  //   setSearchInput(kw);
  //   setQuery(kw);
  //   setCurrentPage(1);
  //   pushRecent(kw);
  // };

  // const handleCategoryChange = (cat) => {
  //   setSelectedCategory(cat);
  //   setCurrentPage(1);
  // };

  // const handleMakeReport = () => {
  //   // 현재 입력/검색어를 함께 넘기고 싶다면 state로 전달
  //   const term = (searchInput || query || "").trim();
  //   navigate("/create-report", { state: { keyword: term } });
  // };

  return (
    <Page>
      <Main>
        {/* 상단: 중앙 고정 폭 */}
        <SearchSection>
          <CenterLine>
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              placeholder="찾으시는 단어를 입력하세요"
            />
          </CenterLine>

          <KeywordRequestBox
            recent={recent}
            onSelect={handleSelectRecent}
            onRemove={(keyword) =>
              setRecent((prev) => prev.filter((x) => x !== keyword))
            }
            onMakeReport={handleMakeReport}
          />
        </SearchSection>

        {/* 컨트롤 줄: 탭 ↔︎ 찜 패널 */}
        <ControlsRow>
          <CategoryTabs
            options={CATEGORIES}
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <FavoritePanel
            active={favoriteOnly}
            count={likedIds.size}
            onToggle={() => {
              setFavoriteOnly((v) => !v);
              setCurrentPage(1);
            }}
          />
        </ControlsRow>

        {/* 카드 영역 (없으면 NoResult 표시) */}
        <Section>
          {loading && displayedNewsletters.length === 0 && <div>불러오는 중...</div>}
          {!loading && displayedNewsletters.length === 0 && (
            <NoResult onMakeReport={handleMakeReport} />
          )}
          <CardsGrid>
            {displayedNewsletters.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                keyword={item.keyword}
                date={item.date}
                imageUrl={item.imageUrl}
                isOrange={item.isOrange}
                liked={isLiked(item.id)}
                onToggleLike={() => toggleLike(item.id)}
                onClick={() =>
                  navigate(`/news/${item.id}`, { state: { item } })
                }
              />
            ))}
          </CardsGrid>
        </Section>

        {/* 하단 페이지네이션: 결과 없을 땐 숨김 */}
  {displayedNewsletters.length > 0 && (
          <Section style={{ alignItems: "center" }}>
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
            />
            {/* hasMore에 따라 더보기/마지막 페이지 안내 */}
            <div style={{ marginTop: 12, color: "#888", fontSize: 14 }}>
              {hasMore ? `더 많은 결과가 있습니다` : `마지막 페이지입니다`}
            </div>
          </Section>
        )}
      </Main>
    </Page>
  );
}
