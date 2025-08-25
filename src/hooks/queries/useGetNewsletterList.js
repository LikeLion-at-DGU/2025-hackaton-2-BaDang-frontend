import { useState, useEffect, useRef } from "react";
import fetchNewsletterList from "../../apis/newsletter";

export function useGetNewsletterList(storeId, limit = 9) {
  const [newsletters, setNewsletters] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inFlightRef = useRef(false);

  const loadMore = async () => {
  if (!storeId || !hasMore || loading) return; // storeId 체크
  if (inFlightRef.current) return; // 이미 진행 중인 요청이 있으면 중복 호출 방지
  inFlightRef.current = true;
  setLoading(true);

  try {
    const data = await fetchNewsletterList({ storeId, cursor, limit });
    setNewsletters((prev) => [...prev, ...data.newsletters]);
    setHasMore(data.hasMore);

    if (data.newsletters.length > 0) {
      setCursor(data.newsletters[data.newsletters.length - 1].id);
    }
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
    inFlightRef.current = false;
  }
};

useEffect(() => {
  if (storeId) { // storeId가 준비되어 있을 때만 호출
    // storeId가 바뀌면 기존 목록 초기화하고 새로 불러오기
    setNewsletters([]);
    setCursor(null);
    setHasMore(true);
    loadMore();
  }
}, [storeId]);

  return { newsletters, hasMore, loading, error, loadMore };
}