// App.jsx
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/BaseC/Navbar.jsx';
import Footer from './components/BaseC/Footer.jsx';
import ScrollToTop from './components/BaseC/ScrollToTop.jsx';
import PrivateRoute from './context/PrivateRoute.jsx'; // PrivateRoute 임포트

import MainPage from './pages/MainPage';
import OnlineReviewPage from './pages/OnlineReviewPage.jsx';
import CustomKeywordNewsPage from './pages/CustomKeywordNewsPage.jsx';
import CoworkPage from './pages/CoworkPage.jsx';
import CreateReportPage from './pages/CreateReportPage.jsx';
import NewsDetailPage from './pages/NewsDetailPage.jsx';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfileEditPage from "./pages/ProfileEditPage"

import { FavoritesProvider } from "./context/FavoritesContext";
import { useAuth } from './context/AuthContext'; // useAuth 훅 임포트

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { min-height: 100%; background-color: #FFF; overflow-x: hidden; }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFF;
`;

const MainContent = styled.div`
  padding-top: 80px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기

  // 네비바/푸터를 숨길 경로
  const hideChromeRoutes = ['/signup', '/login'];
  const hideChrome = hideChromeRoutes.includes(location.pathname);

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {!hideChrome && <Navbar />}

        <ScrollToTop />
        <FavoritesProvider>
          <Routes>
            {/* 로그인/회원가입 페이지 */}
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/" replace /> : <SignUpPage />}
            />
            
            {/* 로그인이 필요한 페이지들 (PrivateRoute로 감싸기) */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/*"
                element={
                  <MainContent>
                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/online-review" element={<OnlineReviewPage />} />
                      <Route path="/custom-keyword-news" element={<CustomKeywordNewsPage />} />
                      <Route path="/collaboration-management" element={<CoworkPage />} />
                      <Route path="/create-report" element={<CreateReportPage />} />
                      <Route path="/news/:id" element={<NewsDetailPage />} />
                      <Route path="/profile-edit" element={<ProfileEditPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </MainContent>
                }
              />
            </Route>
          </Routes>
        </FavoritesProvider>
        
        {!hideChrome && <Footer />}
      </AppContainer>
    </>
  );
}

export default App;