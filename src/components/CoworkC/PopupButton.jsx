// components/CoworkC/PopupButton.jsx
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Button = styled.div`
  display: flex;
  height: ${(props) => props.height || '59px'};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: ${(props) => props.width || '200px'};
  background: ${(props) => props.color || '#FF9762'}; /* 🔹 color props */
  color: #FAF9F6;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

function PopupButton({ btnName, width, color, height, onClick}) {
  return <Button width={width}  height={height} color={color} onClick={onClick}>{btnName} </Button>;
}

export default PopupButton;
