// components/SearchBar.jsx
import React from "react";
import styled from "styled-components";
import SearchIcon from "../assets/Icons/SearchGrayIcon.svg";
import DeleteIcon from "../assets/Icons/DeleteIcon.svg";

const Wrap = styled.form`

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 53px;
  width: 648px;
  height: 70px;
  padding: 0 0 0 28px;

  /* 글 입력 여부에 따라 테두리 색상 변경 */
  border: 1.5px solid ${(props) => (props.hasText ? "#759AFC" : "#9D9D9D")};
  background: #fff;
  transition: border 0.2s; /* 부드럽게 변화 */
`;

const Icon = styled.div`
  width: 23px;
  height: 23px;
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #17171b;
  background: transparent;

  ::placeholder {
    color: #98a2b3;
  }
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClearBtn = styled.button`
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 99px;
  margin: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
 &:hover { background: #f2f4f7; }
  img {
    width: 16px;
    height: 16px;
  }
`;


const SearchBtn = styled.button`
all: unset; 
    height: 69px;
    width: 91px;
  border: none;
  border-radius: 0 53px 53px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: NanumSquareOTF;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;

  /* 글 입력 여부에 따라 배경색 변경 */
  background: ${(props) => (props.hasText ? "#759AFC" : "#9D9D9D")};
  color: #fff;
`;

export default function SearchBar({
  value = "",
  onChange,
  onSearch,
  placeholder = "키워드를 입력하세요",
  autoFocus = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const hasText = value.length > 0; // 입력 여부

  return (
    <Wrap onSubmit={handleSubmit} hasText={hasText}>
      <Icon aria-hidden>
        <img src={SearchIcon} alt="검색" />
      </Icon>

      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />

      <Btns>
        {hasText && (
          <ClearBtn type="button" onClick={() => onChange?.("")}>
            <img src={DeleteIcon} alt="삭제" />
          </ClearBtn>
        )}
        <SearchBtn type="submit" hasText={hasText}>
          검색
        </SearchBtn>
      </Btns>
    </Wrap>
  );
}
