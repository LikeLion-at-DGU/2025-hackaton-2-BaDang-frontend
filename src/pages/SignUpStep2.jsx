// pages/SignUpStep2.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/Icons/WelcomeRobotIcon.svg";

/** 2단계: 전화번호 / 주소 / 가게명 */
export default function SignUpStep2({ defaultValues, onNext, onBack }) {
  const [form, setForm] = useState({
    phoneNumber: defaultValues?.phoneNumber ?? "",
    address: defaultValues?.address ?? "",
    storeName: defaultValues?.storeName ?? "",
  });
  const [touched, setTouched] = useState({});

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // 전화번호 자동 하이픈 (숫자만 허용)
  const formatTel = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length < 4) return d;
    if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  };

  const handlePhoneChange = (e) => set("phoneNumber", formatTel(e.target.value));

  // 유효성 검사
  const errors = useMemo(() => {
    const e = {};
    const digits = form.phoneNumber.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11) e.phoneNumber = "올바른 전화번호를 입력해 주세요.";
    if (!form.address.trim()) e.address = "주소를 입력해 주세요.";
    if (!form.storeName.trim()) e.storeName = "가게명을 입력해 주세요.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ phoneNumber: true, address: true, storeName: true });
    if (!isValid) return;
    onNext?.({
      phoneNumber: form.phoneNumber.trim(),            // 하이픈 포함 문자열(원하면 digits로 바꿔 넘겨도 OK)
      address: form.address.trim(),
      storeName: form.storeName.trim(),
    });
  };

  return (
    <Page>
      <Card>
        <Header>
          <h1>바당 시작하기</h1>
          <RobotImg src={Robot} alt="" />
        </Header>

        <Form onSubmit={handleSubmit}>
          <Group>
            <Label>전화번호</Label>
            <Input
              type="tel"
              value={form.phoneNumber}
              placeholder="전화번호를 입력하세요"
              onChange={handlePhoneChange}
              onBlur={() => setTouched((t) => ({ ...t, phoneNumber: true }))}
              aria-invalid={!!(touched.phoneNumber && errors.phoneNumber)}
            />
            {touched.phoneNumber && errors.phoneNumber && <Error>{errors.phoneNumber}</Error>}
          </Group>

          <Group>
            <Label>가게 선택</Label>
            <Input
              value={form.address}
              placeholder="주소를 입력해주세요"
              onChange={(e) => set("address", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, address: true }))}
              aria-invalid={!!(touched.address && errors.address)}
              style={{ marginBottom: 12 }}
            />
            <Input
              value={form.storeName}
              placeholder="가게명을 입력해주세요"
              onChange={(e) => set("storeName", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, storeName: true }))}
              aria-invalid={!!(touched.storeName && errors.storeName)}
            />
            {touched.address && errors.address && <Error style={{ marginTop: 8 }}>{errors.address}</Error>}
            {touched.storeName && errors.storeName && <Error>{errors.storeName}</Error>}
          </Group>

          <Footer>
            {onBack && (
              <BackButton type="button" onClick={onBack}>
                이전
              </BackButton>
            )}
            <NextButton type="submit" disabled={!isValid}>다음</NextButton>
          </Footer>
        </Form>
      </Card>
    </Page>
  );
}

/* ---------- styled: 1단계와 동일 스타일 유지 ---------- */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
  background: #EBEEFF;
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
  h1 { color: #fff; font-weight: 800; font-size: 36px; line-height: 1.2; }
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
  @media (max-width: 768px) { padding: 24px; }
`;

const Group = styled.div`
  display: flex; flex-direction: column;
`;

const Label = styled.label`
  font-weight: 800; color: #17171b; margin-bottom: 10px; font-size: 18px;
`;

const Input = styled.input`
  height: 56px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff;
  outline: none; padding: 0 16px; font-size: 16px; color: #17171b;
  &::placeholder { color: #98a2b3; }
  &:focus { border-color: #759afc; box-shadow: 0 0 0 3px rgba(117,154,252,0.2); }
  &[aria-invalid="true"] { border-color: #ff6a3d; }
`;

const Error = styled.span`
  margin-top: 4px; font-size: 13px; color: #ff6a3d; font-weight: 600;
`;

const Footer = styled.div`
  display: flex; justify-content: center; margin-top: 12px;
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
  margin-right: 15px;
`;

const NextButton = styled.button`
  width: 70%; height: 56px; border: none; border-radius: 14px;
  font-weight: 800; font-size: 18px; color: #fff; background: #0046ff;
  cursor: pointer; transition: transform .03s ease;
  &:disabled { background: #bdbdbd; cursor: not-allowed; }
  &:active:not(:disabled) { transform: translateY(1px); }
`;