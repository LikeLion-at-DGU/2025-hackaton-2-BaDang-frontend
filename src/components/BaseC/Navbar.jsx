// components/BaseC/Navbar.jsx 

import styled from 'styled-components'; 
import React from 'react'; 
import { NavLink, Link, useNavigate } from 'react-router-dom'; // NavLink가 기본으로 사용됩니다.
import logoSvg from '../../assets/BadangLogo.svg'; 
import { useAuth } from '../../context/AuthContext'; 

// 로고 및 기본 컨테이너 스타일 (기존과 동일)
const Logo = styled.img`
    height: 48px;
    cursor: pointer;
`;

const NavbarContainer = styled.div`
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    box-sizing: border-box;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 5%;
    background: #FFF;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.05);
    gap: 16px;
    border-bottom: 1px solid #D8D8D8;
`;

const Menu = styled.ul`
    width: 602px;
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 0;  
    gap: 16px;
`;

const MenuItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
`;

const LogOut = styled.div`
    color: #9D9D9D;
    text-align: center;
    font-family: "Nanum Gothic";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
    cursor: pointer;
`;

const LogoLink = styled(Link)`
    color: inherit;      
    text-decoration: none;    
    display: flex;          
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
`;

// ✅ a 태그 대신 NavLink를 기반으로 스타일링합니다.
const StyledNavLink = styled(NavLink)`
    color: #494954;
    text-align: center;
    font-family: SUIT;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
    height: 41px;
    min-width: fit-content;

    text-decoration: none;  
    display: flex;          
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    padding: 9px 13px;
    box-sizing: border-box;
    transition: all 0.2s ease;

    // NavLink가 활성화되면 active 클래스가 자동으로 추가됩니다.
    &.active {
        background-color: #759AFC;
        color: #FAF9F6;
    }
    
    &:hover:not(.active) {
        background-color: #FFF;
        color: #759AFC;
    }
`;

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ✅ 수정된 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/logout`, {
        method: 'POST',
        credentials: 'include', // HttpOnly 쿠키 전송을 위해 필수
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("서버 로그아웃 실패:", errorData.detail || '오류가 발생했습니다.');
      }

    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
    } finally {
      // API 요청 성공 여부와 관계없이 클라이언트 측 상태를 초기화하고 로그인 페이지로 보냅니다.
      logout(); // 전역 상태(AuthContext) 초기화
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  return (
    <NavbarContainer>
        <LogoLink to="/">
            <Logo src={logoSvg} alt="badang logo" />
        </LogoLink>
        <Menu>
            {/* ✅ onClick 대신 to prop을 사용합니다. */}
            <MenuItem>
                <StyledNavLink to="/online-review">온라인 리뷰 분석</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink to="/custom-keyword-news">맞춤형 키워드 뉴스</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink to="/collaboration-management">협업 관리</StyledNavLink>
            </MenuItem>
            <MenuItem>
                <StyledNavLink to="/profile-edit">정보 수정</StyledNavLink>
            </MenuItem>
        </Menu>
        <LogOut onClick={handleLogout}>로그아웃</LogOut>
    </NavbarContainer>
  );
}

export default Navbar;