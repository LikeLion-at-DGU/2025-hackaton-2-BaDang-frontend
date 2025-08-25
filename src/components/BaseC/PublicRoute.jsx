import React from 'react';
import { Navigate } from 'react-router-dom';

// 로그인/회원가입 페이지처럼 로그아웃 상태에서만 보여야 할 페이지를 위한 컴포넌트
function PublicRoute({ children }) {
  const isAuthed = localStorage.getItem('badang:isAuthed') === 'true';

  // isAuthed가 true이면 메인 페이지로 리디렉션하고,
  // 그렇지 않으면 자식 컴포넌트(로그인/회원가입 페이지)를 보여줍니다.
  return isAuthed ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;