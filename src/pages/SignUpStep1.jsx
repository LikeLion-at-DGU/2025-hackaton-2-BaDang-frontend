// pages/SignUpStep1.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Robot from "../assets/Icons/WelcomeRobotIcon.svg";

export default function SignUpStep1({ defaultValues, onNext }) {
  const [form, setForm] = useState({
    name: defaultValues?.name ?? "",
    username: defaultValues?.username ?? "",
    password: defaultValues?.password ?? "",
    confirm: defaultValues?.confirm ?? "",
  });
  const [touched, setTouched] = useState({});

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // 간단 유효성 (규칙 강화 가능)
  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "이름을 입력해 주세요.";
    if (!form.username.trim()) e.username = "아이디를 입력해 주세요.";
    if (!form.password) e.password = "비밀번호를 입력해 주세요.";
    if (!form.confirm) e.confirm = "비밀번호 확인을 입력해 주세요.";
    if (form.password && form.confirm && form.password !== form.confirm) {
      e.confirm = "비밀번호가 일치하지 않습니다.";
    }
    // 예시: 비밀번호 최소 8자
    if (form.password && form.password.length < 8) {
      e.password = "비밀번호는 8자 이상이어야 합니다.";
    }
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, username: true, password: true, confirm: true });
    if (!isValid) return;
    onNext?.({
      name: form.name.trim(),
      username: form.username.trim(),
      password: form.password,
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
            <Label>이름</Label>
            <Input
              value={form.name}
              placeholder="ex) 김바당"
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              aria-invalid={!!(touched.name && errors.name)}
            />
            {touched.name && errors.name && <Error>{errors.name}</Error>}
          </Group>

          <Group>
            <Label>아이디</Label>
            <Input
              value={form.username}
              placeholder="아이디를 입력하세요"
              onChange={(e) => set("username", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, username: true }))}
              aria-invalid={!!(touched.username && errors.username)}
            />
            {touched.username && errors.username && (
              <Error>{errors.username}</Error>
            )}
          </Group>

          <Group>
            <Label>비밀번호</Label>

            <Input
              type="password"
              value={form.password}
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => set("password", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              aria-invalid={!!(touched.password && errors.password)}
            />
            {touched.password && errors.password && (
              <Error>{errors.password}</Error>
            )}

            <Input
              type="password"
              value={form.confirm}
              placeholder="비밀번호를 한번 더 입력하세요"
              onChange={(e) => set("confirm", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
              aria-invalid={!!(touched.confirm && errors.confirm)}
              style={{ marginTop: 12 }}
            />
            {touched.confirm && errors.confirm && (
              <Error>{errors.confirm}</Error>
            )}
          </Group>

          <Footer>
            <NextButton type="submit" disabled={!isValid}>
              다음
            </NextButton>
          </Footer>
        </Form>
      </Card>
    </Page>
  );
}

/* ---------- styled ---------- */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
  background: #EBEEFF; /* 은은한 보라톤 배경 */
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
  padding: 32px 144px 32px 144px; /* 시안 여백 값 반영 */
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 800;
  color: #17171b;
  margin-bottom: 10px;
  font-size: 18px;
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

  &[aria-invalid="true"] {
    border-color: #ff6a3d;
  }
`;

const Error = styled.span`
  margin-top: 8px;
  font-size: 13px;
  color: #ff6a3d;
  font-weight: 600;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const NextButton = styled.button`
  width: 70%;
  height: 56px;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
  background: #0046ff;
  cursor: pointer;
  transition: transform .03s ease;

  &:disabled {
    background: #bdbdbd;   /* 비활성 회색 (시안처럼) */
    cursor: not-allowed;
  }

  &:active:not(:disabled) { transform: translateY(1px); }
`;
