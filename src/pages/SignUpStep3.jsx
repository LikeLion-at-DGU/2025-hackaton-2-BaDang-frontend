// pages/SignUpStep3.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/Icons/WelcomeRobotIcon.svg";

/** ====== 업종 옵션 ====== */
const CATEGORY_OPTIONS = {
  "음식": ["한식","중식","일식","서양식","기타외국식","분식","패스트푸드","제과제빵","카페"],
  "소매": ["슈퍼마켓","편의점","전통시장","농축수산물","건강식품","의류","패션잡화","생활잡화","가전제품","서적/문구","애완용품"],
  "생활서비스": ["미용실","네일숍","피부관리","세탁소","수선/수리","사진관","예식/행사","인테리어"],
  "교육": ["입시/보습학원","외국어학원","예체능학원","컴퓨터/IT교육","평생교육"],
  "숙박": ["호텔","모텔","게스트하우스","펜션/민박"],
  "오락/여가": ["PC방","노래방","게임방","스크린골프","당구장","헬스/요가/필라테스"],
  "의료/건강": ["약국","한의원","병원","안경점","헬스용품"],
  "운송/자동차": ["주유소","세차장","자동차수리","렌터카"],
  "제조/생산": ["식품제조","의류제조","가구제조","인쇄/출판"],
  "기타": ["부동산중개","여행사","종교단체","비영리단체"],
};

export default function SignUpStep3({ defaultValues, onNext, onBack }) {
  const [main, setMain] = useState(defaultValues?.main ?? "");
  const [sub, setSub] = useState(defaultValues?.sub ?? "");

  // [{name:"", price:""}] 최소 1개 보여주기
  const [items, setItems] = useState(
    defaultValues?.items?.length
      ? defaultValues.items
      : [{ name: "", price: "" }]
  );

  // 메인 바꾸면 서브 초기화
  const subOptions = useMemo(() => CATEGORY_OPTIONS[main] ?? [], [main]);
  const canAdd = items.length < 3;

  const setItem = (i, key, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [key]: value };
      return next;
    });
  };

  const addItem = () => {
    if (!canAdd) return;
    setItems((prev) => [...prev, { name: "", price: "" }]);
  };

  const removeItem = (i) => {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  };

  // 유효성: 메인/서브 선택 + 아이템 최소 1개, 작성 중인 모든 행이 name/price 채움
  const isValid = useMemo(() => {
    if (!main || !sub) return false;
    if (items.length === 0) return false;
    // 모든 행 양쪽 값 채워졌는지 + 숫자
    return items.every(
      (it) => it.name.trim() && /^\d+$/.test(String(it.price).trim())
    );
  }, [main, sub, items]);

  const submit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // 숫자형으로 넘기고 싶다면 여기서 변환
    const normalized = items.map((it) => ({
      name: it.name.trim(),
      price: Number(String(it.price).trim()),
    }));
    onNext?.({ main, sub, items: normalized });
  };

  return (
    <Page>
      <Card>
        <Header>
          <h1>바당 시작하기</h1>
          <RobotImg src={Robot} alt="" />
        </Header>

        <Form onSubmit={submit}>
          {/* 업종 */}
          <Block>
            <Label>업종</Label>
            <TwoCols>
              <Select
                value={main}
                onChange={(e) => {
                  setMain(e.target.value);
                  setSub(""); // 메인 변경 시 서브 초기화
                }}
              >
                <option value="">대분류를 선택하세요</option>
                {Object.keys(CATEGORY_OPTIONS).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>

              <Select
                value={sub}
                onChange={(e) => setSub(e.target.value)}
                disabled={!main}
              >
                <option value="">소분류를 선택하세요</option>
                {subOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </TwoCols>
          </Block>

          {/* 대표 품목 및 가격대 */}
          <Block>
            <Label>대표 품목 및 가격대</Label>

            {items.map((it, i) => (
              <Row key={i}>
                <Input
                  placeholder="ex) 팥빙수"
                  value={it.name}
                  onChange={(e) => setItem(i, "name", e.target.value)}
                />
                <Input
                  placeholder="13900"
                  inputMode="numeric"
                  // 숫자만 허용
                  value={it.price}
                  onChange={(e) =>
                    setItem(i, "price", e.target.value.replace(/[^\d]/g, ""))
                  }
                />
                {items.length > 1 && (
                  <RemoveBtn type="button" onClick={() => removeItem(i)}>
                    ✕
                  </RemoveBtn>
                )}
              </Row>
            ))}

            <AddBtn
              type="button"
              onClick={addItem}
              disabled={!canAdd}
              title={canAdd ? "" : "최대 3개까지 입력할 수 있어요"}
            >
              대표 품목 추가하기
            </AddBtn>
          </Block>

          <Footer>
            {onBack && (
              <BackButton type="button" onClick={onBack}>
                이전
              </BackButton>
            )}
            <NextButton type="submit" disabled={!isValid}>
              다음
            </NextButton>
          </Footer>
        </Form>
      </Card>
    </Page>
  );
}

/* ===== styled ===== */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
  background: #ebeeff;
`;

const Card = styled.section`
  width: 960px;
  border-radius: 20px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.12);
  overflow: hidden;
  background: #fff;
`;

const Header = styled.header`
  position: relative;
  background: #494954;
  padding: 32px 32px;
  display: flex;
  justify-content: center;
  h1 {
    color: #fff;
    font-weight: 800;
    font-size: 36px;
    line-height: 1.2;
  }
`;

const RobotImg = styled.img`
  position: absolute;
  right: 28px;
  top: -1px;
  transform: rotate(-20.611deg);
  width: 120px;
  height: auto;
  pointer-events: none;
`;

const Form = styled.form`
  padding: 32px 144px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-weight: 800;
  color: #17171b;
  font-size: 18px;
`;

const TwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  height: 56px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 0 14px;
  font-size: 16px;
  color: #17171b;

  &:disabled {
    background: #f4f4f6;
    color: #9aa1a7;
  }

  &:focus {
    border-color: #759afc;
    box-shadow: 0 0 0 3px rgba(117,154,252,0.2);
    outline: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
`;

const Input = styled.input`
  height: 56px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  color: #17171b;

  &::placeholder { color: #98a2b3; }

  &:focus {
    border-color: #759afc;
    box-shadow: 0 0 0 3px rgba(117,154,252,0.2);
  }
`;

const RemoveBtn = styled.button`
  min-width: 44px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
  &:hover { background: #f9fafb; }
`;

const AddBtn = styled.button`
  margin-top: 8px;
  height: 56px;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  background: #e5935d;      /* 오렌지 버튼 */
  cursor: pointer;

  &:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
`;

const NextButton = styled.button`
  flex: 1;
  max-width: 520px;
  height: 56px;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
  background: #0046ff;
  cursor: pointer;

  &:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  height: 56px;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #17171b;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: #f9fafb; }
`;
