import React from 'react';
import { Navigate } from 'react-router-dom';

// 로그인이 필요한 페이지를 위한 보호막 컴포넌트
function PrivateRoute({ children }) {
  // 간단하게 localStorage에 저장된 플래그로 인증 상태를 확인합니다.
  const isAuthed = localStorage.getItem('badang:isAuthed') === 'true';

  // isAuthed가 true이면 자식 컴포넌트(요청한 페이지)를 보여주고,
  // 그렇지 않으면 로그인 페이지로 리디렉션합니다.
  return isAuthed ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;