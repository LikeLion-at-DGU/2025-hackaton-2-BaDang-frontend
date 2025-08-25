import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Robot from "../assets/Icons/LoginRobotIcon.svg";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const errors = useMemo(() => {
    const e = {};
    if (!form.username.trim()) e.username = "아이디를 입력하세요.";
    if (!form.password) e.password = "비밀번호를 입력하세요.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      console.log('로그인 요청 시도:', {
        id: form.username.trim(),
        password: '***',
        url: `${import.meta.env.VITE_BACKEND_URL}/main/login`
      });

      const response = await apiClient.post('/main/login', {
        id: form.username.trim(),
        password: form.password,
      });

      console.log('로그인 응답:', response);

      if (response.status === 200) {
        console.log('로그인 성공 - 백그라운드 리뷰 분석이 진행 중일 수 있습니다.');
        login();
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error("Login Error:", error);
      
      let message = "로그인에 실패했습니다.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }
      
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <Card onSubmit={handleSubmit}>
        <Head>
          <RobotIcon src={Robot} alt="Badang 로봇" />
          <Wordmark>
            <span className="ba">Ba</span>
            <span className="dang">Dang</span>
          </Wordmark>
          <Tagline>
            <p>매주 받아보는 맞춤형 분석</p>
            <strong>
              AI로 <orange>바</orange>뀌는 <em>당</em>신의 가게
            </strong>
          </Tagline>
        </Head>

        <Form>
          <Input
            placeholder="아이디를 입력하세요"
            value={form.username}
            onChange={(e) => set("username", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, username: true }))}
            aria-invalid={!!(touched.username && errors.username)}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            aria-invalid={!!(touched.password && errors.password)}
            style={{ marginTop: 12 }}
          />

          <PrimaryBtn type="submit" disabled={!canSubmit}>
            {submitting ? "로그인 중..." : "로그인하기"}
          </PrimaryBtn>

          <SecondaryBtn
            type="button"
            onClick={() => navigate("/signup")}
            aria-label="회원가입 페이지로 이동"
          >
            회원가입하기
          </SecondaryBtn>
        </Form>
      </Card>
    </Page>
  );
}

/* ---------- styled ---------- */
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  background: #ebeeff;
`;

const Card = styled.form`
  width: 960px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12);
  padding: 56px 80px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 720px) {
    width: 100%;
    padding: 32px 20px 40px;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RobotIcon = styled.img`
  width: 92px;
  height: 92px;
  object-fit: contain;
  border-radius: 20px;
`;

const Wordmark = styled.div`
  margin-top: 18px;
  font-weight: 900;
  font-size: 44px;
  line-height: 1;
  letter-spacing: 0.5px;
  font-family: GangwonEduPower;
  .dang {
    color: #5f74ff;
  }
  .ba {
    color: #ff8040;
    margin-left: 2px;
  }
`;

const Tagline = styled.div`
  margin-top: 16px;
  text-align: center;
  color: #42454d;
  p {
    margin: 2px 0;
    font-size: 18px;
    line-height: 1.5;
  }
  em {
    font-style: normal;
    color: #5f74ff;
    font-weight: 800;
  }
  orange {
    font-style: normal;
    color: #FF9762;
    font-weight: 800;
  }
  strong {
    color: #17171b;
    font-size: 21px;
  }
`;

const Form = styled.div`
  width: 100%;
  max-width: 720px;
  margin-top: 28px;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  color: #17171b;

  &::placeholder {
    color: #98a2b3;
  }

  &:focus {
    border-color: #759afc;
    box-shadow: 0 0 0 3px rgba(117, 154, 252, 0.2);
  }

  &[aria-invalid="true"] {
    border-color: #ff6a3d;
  }
`;

const PrimaryBtn = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 18px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  background: #759afc;
  cursor: pointer;
  transition: transform 0.03s ease, opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const SecondaryBtn = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 12px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  background: #e69463;
  cursor: pointer;
  transition: transform 0.03s ease;

  &:active {
    transform: translateY(1px);
  }
`;