import styled from "styled-components";
import React from "react";
import { useLocation } from "react-router-dom";

const StyledNavItem = styled.div`
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
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    `
      background-color: #759AFC;
      color: #FAF9F6;
  `}
  
  &:hover {
    background-color: #eaf0ff; /* 살짝 연한 블루로 hover 표시 */
    color: #759AFC;
  }

  ${({ $active }) =>
    $active &&
    `
      &:hover {
        background-color: #759AFC;
        color: #FAF9F6;
      }
  `}
`;

function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <StyledNavItem $active={isActive} onClick={handleClick}>
      {children}
    </StyledNavItem>
  );
}

export default NavItem;