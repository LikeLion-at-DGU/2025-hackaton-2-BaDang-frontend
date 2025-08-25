// src/context/FavoritesContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "badang_favorites_v1";
const Ctx = createContext(null);

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      return new Set(JSON.parse(raw).map(String));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  }, [ids]);

  // 다른 탭과 동기화
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const arr = JSON.parse(e.newValue);
          setIds(new Set(arr.map(String)));
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const api = useMemo(
    () => ({
      likedIds: ids,
      isLiked: (id) => ids.has(String(id)),
      toggleLike: (id) =>
        setIds((prev) => {
          const next = new Set(prev);
          const key = String(id);
          if (next.has(key)) next.delete(key);
          else next.add(key);
          return next;
        }),
      setLike: (id, val) =>
        setIds((prev) => {
          const next = new Set(prev);
          const key = String(id);
          if (val) next.add(key);
          else next.delete(key);
          return next;
        }),
      clear: () => setIds(new Set()),
    }),
    [ids]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
