export const fetchNewsletterList = async ({ storeId, cursor = null, limit = 9 }) => {
  const query = new URLSearchParams({
    storeId: storeId.toString(),
    cursor: cursor !== null ? cursor.toString() : "",
    limit: limit.toString(),
  }).toString();

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/newsletter/newsletters?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "뉴스레터 조회에 실패했습니다.");
  }

  const data = await res.json();
  return data.data;
};

export default fetchNewsletterList;

export async function fetchNewsletterSearch({
  query,
  page = 1,
  limit = 9,
  isUserMade,
}) {
  const params = new URLSearchParams({ query, page, limit });
  if (isUserMade !== undefined) params.append("isUserMade", isUserMade);

  const res = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }/newsletter/newsletters/search?${params}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "뉴스레터 검색 실패");
  }

  return res.json();
}

export async function fetchNewsletterDetail({ id }) {
  if (!id) throw new Error('id is required');

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/newsletter/newsletters/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || '뉴스레터 상세 조회 실패');
  }

  const json = await res.json();
  // Expect { message, statusCode, data: { ... } }
  return json.data || json;
}
