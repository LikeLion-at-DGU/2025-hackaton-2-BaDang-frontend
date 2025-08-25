// components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
  console.log('[ScrollToTop] run', location.pathname, window.scrollY);
}, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // pathname이 바뀔 때마다 실행

  return null;
}
