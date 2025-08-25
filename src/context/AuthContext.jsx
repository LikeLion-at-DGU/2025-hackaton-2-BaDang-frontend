// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Context 생성
const AuthContext = createContext(null);

// 3. Provider 컴포넌트 생성
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ 인증 상태 확인 중임을 나타내는 로딩 상태 추가

  // App이 처음 로드될 때 한 번만 실행됩니다.
  useEffect(() => {
    // 서버에 현재 로그인 상태인지 확인하는 함수
    const verifyUser = async () => {
      try {
        // 백엔드에 추가된 /main/me/ API를 호출합니다.
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/me/`, {
          method: 'GET',
          credentials: 'include', // 인증을 위해 쿠키를 함께 보냅니다.
        });

        // API 호출이 성공하면 (유효한 쿠키가 있으면) 로그인 상태로 설정합니다.
        if (response.ok) {
          const data = await response.json().catch(() => null);
          // response.data shape depends on backend; assume it returns user object directly
          if (data) {
            // try common shapes
            const raw = data.user || data.data || data;
            // normalize: some backends return { stores: [...] }, others return storeId
            const storeObj = raw?.stores && Array.isArray(raw.stores) && raw.stores[0];
            // try common id keys on the first store object
            let storeIdFromArray = null;
            if (storeObj) {
              const idKeys = ["id", "pk", "storeId", "store_id", "sid"];
              for (const k of idKeys) {
                if (storeObj[k] !== undefined && storeObj[k] !== null) {
                  storeIdFromArray = storeObj[k];
                  break;
                }
              }
              // fallback: pick the first string/number prop that looks like an id
              if (!storeIdFromArray) {
                const candidate = Object.keys(storeObj).find((k) => /id|pk|sid/i.test(k) && (typeof storeObj[k] === 'string' || typeof storeObj[k] === 'number'));
                if (candidate) storeIdFromArray = storeObj[candidate];
              }
            }

            const normalized = {
              ...raw,
              storeId: raw.storeId || raw.store_id || storeIdFromArray || null,
            };
            try {
              console.debug("AuthContext: normalized user:", normalized);
            } catch (e) {}
            setUser(normalized);
          }
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        // API 호출 자체에 실패하면 로그아웃 상태로 둡니다.
        console.error("Authentication check failed:", error);
        setIsLoggedIn(false);
      } finally {
        // 확인 작업이 끝나면 로딩 상태를 해제합니다.
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // 로그인/로그아웃 시 상태를 업데이트하는 함수
  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = { isLoggedIn, login, logout, loading, user }; // 로딩 상태와 user도 함께 제공

  // ✅ 인증 상태 확인이 완료될 때까지는 자식 컴포넌트(App) 렌더링을 보류합니다.
  // 이렇게 하면 상태 확인 전에 PrivateRoute가 동작하는 것을 막을 수 있습니다.
  if (loading) {
    return <div>Loading...</div>; // 또는 로딩 스피너 컴포넌트를 보여줄 수 있습니다.
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. 쉽게 Context를 사용할 수 있는 Custom Hook 생성
export function useAuth() {
  return useContext(AuthContext);
}