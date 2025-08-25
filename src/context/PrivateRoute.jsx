// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  // 로그인한 사용자는 요청한 페이지를 보여줌
  return <Outlet />;
}