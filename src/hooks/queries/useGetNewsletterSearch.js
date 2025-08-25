import { useState, useEffect } from "react";
import { fetchNewsletterSearch } from "../../apis/newsletter";

export function useGetNewsletterSearch(initialParams = {}) {
  const [params, setParams] = useState({ ...initialParams, page: 1, limit: 9 });
  const [newsletters, setNewsletters] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 검색 실행
  const search = async (override = {}) => {
    setLoading(true);
    setError(null);
    try {
      const merged = { ...params, ...override };
      setParams(merged);

      // If there's no query/keyword provided, don't call the search API.
      // This avoids calling the search endpoint when the user hasn't entered a search term.
      if (!merged.query && !merged.keyword) {
        setNewsletters([]);
        setHasMore(false);
        return;
      }

      const data = await fetchNewsletterSearch(merged);

      // Backend shape can differ:
      // { data: { newsletters: [...] }, hasMore: bool }
      // or { data: { newsletter: [...] }, data: { hasMore: ... } }
      // or { newsletters: [...] }
      const items =
        data?.data?.newsletters || data?.data?.newsletter || data?.newsletters || [];

      const hasMoreVal =
        data?.hasMore ?? data?.data?.hasMore ?? false;

      setNewsletters(items);
      setHasMore(hasMoreVal);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경
  const changePage = (page) => {
    search({ page });
  };

  // 초기 로딩: initialParams에 query 또는 keyword가 있을 때만 자동 검색 실행
  useEffect(() => {
    const hasInitialSearch = Boolean(initialParams && (initialParams.query || initialParams.keyword));
    if (hasInitialSearch) {
      search(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    newsletters,
    hasMore,
    loading,
    error,
    params,
    search,
    changePage,
  };
}
