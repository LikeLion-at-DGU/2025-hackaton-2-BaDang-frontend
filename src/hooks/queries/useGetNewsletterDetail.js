import { useState, useEffect, useCallback } from 'react';
import { fetchNewsletterDetail } from '../../apis/newsletter';

export function useGetNewsletterDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const d = await fetchNewsletterDetail({ id });
      setData(d);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
