import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo=styled.div`
    color:  #FF8040;
    font-family: Paperlogy;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const NavbarContainer=styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 105px;
    display: flex;
    justify-content: space-between ;
    align-items: center;
    padding: 24px 120px;
    background: #FFF;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.05);
`
const Menu =styled.ul`
    width: 602px;
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 0; 
`;
const MenuItem =styled.li`
    height: 23px;
    padding: 9px 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#17171B;
    font-family: NanumSquareOTF;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
`;
const LogOut =styled.div`
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
const StyledLink = styled(Link)`
  color: inherit;        
  text-decoration: none;   /* 밑줄 없애기 */
  display: flex;         
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

`;
function Navbar() {



  return (
    <NavbarContainer>
        <Logo>
                <StyledLink to="/">badang</StyledLink>
        </Logo>
        <Menu>

            <MenuItem>
                <StyledLink to="/online-review">온라인 리뷰 분석</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to="/custom-keyword-news">맞춤형 키워드 뉴스</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to="/collaboration-management">협업 관리</StyledLink>
            </MenuItem>
            <MenuItem>
                <StyledLink to="/profile-edit">정보 수정</StyledLink>
            </MenuItem>
        </Menu>
        <LogOut>로그아웃</LogOut>
    </NavbarContainer>
    
  );
}

export default Navbar;
