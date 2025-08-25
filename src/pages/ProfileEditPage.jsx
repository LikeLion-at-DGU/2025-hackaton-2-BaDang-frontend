// pages/ProfileEditPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileEditStep1 from "./ProfileEditStep1";
import ProfileEditStep2 from "./ProfileEditStep2";

// 숫자 → 프론트 라벨
const REVERSE_CATEGORY_MAIN_MAP = { 1: "음식", 2: "소매", 3: "생활서비스", 4: "교육", 5: "숙박", 6: "오락/여가", 7: "의료/건강", 8: "운송/자동차", 9: "제조/생산", 10: "기타" };
const REVERSE_CATEGORY_SUB_MAP   = { 1: "한식", 2: "카페" };
const REVERSE_AGE_MAP            = { 0: "청소년", 1: "청년", 2: "중년층", 3: "노년층", 4: "외국인" };

// 프론트 라벨 → 숫자
const CATEGORY_MAIN_MAP = { "음식": 1, "소매": 2, "생활서비스": 3, "교육": 4, "숙박": 5, "오락/여가": 6, "의료/건강": 7, "운송/자동차": 8, "제조/생산": 9, "기타": 10 };
const CATEGORY_SUB_MAP   = { "한식": 1, "카페": 2 };
const AGE_MAP            = { "청소년": 0, "청년": 1, "중년층": 2, "노년층": 3, "외국인": 4 };

// 콤마/공백 제거 후 안전 숫자화
const toNumberSafe = (v) => {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/[,\s]/g, ""));
    return Number.isFinite(n) ? n : NaN;
  }
  return NaN;
};

export default function ProfileEditPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // 초기 로드
  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/me/`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("사용자 정보를 불러오는데 실패했습니다.");

        const apiData = await res.json();
        const store = apiData.stores?.[0] || {};
        const visitor = (store && typeof store.visitor === "object") ? store.visitor : {};
        // ✅ 메뉴는 store 안의 'menu'로 옴 (storeReadSerializer에서 source="menus")
        const apiMenus = Array.isArray(store.menu) ? store.menu : [];

        // visitor → 프론트 상태로 변환 (ageGroup + isForeign → Set)
        const agesSet = new Set();
        if (Number.isInteger(visitor.ageGroup)) {
          const label = REVERSE_AGE_MAP[visitor.ageGroup];
          if (label && label !== "외국인") agesSet.add(label);
        }
        if (visitor.isForeign) agesSet.add("외국인");

        const initialFormData = {
          main: REVERSE_CATEGORY_MAIN_MAP[store.type] || "",
          sub:  REVERSE_CATEGORY_SUB_MAP[store.category] || "",
          items: apiMenus.length ? apiMenus : [{ name: "", price: "" }],
          gender: visitor.gender === "M" ? "남자" : visitor.gender === "F" ? "여자" : "",
          ages: agesSet,
          consent: store.isWillingCollaborate ? "동의" : "비동의",
          note: store.content || "",
        };

        setFormData(initialFormData);
        setOriginalData(JSON.parse(JSON.stringify({
          ...initialFormData,
          ages: Array.from(initialFormData.ages),
        })));
      } catch (e) {
        console.error(e);
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentData();
  }, []);

  const isChanged = useMemo(() => {
    if (!originalData) return false;
    const a = { ...originalData, ages: Array.from(originalData.ages || []) };
    const b = { ...formData,    ages: Array.from(formData.ages    || []) };
    return JSON.stringify(a) !== JSON.stringify(b);
  }, [originalData, formData]);

  const handleNext = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };
  const handleBack = () => setStep((p) => p - 1);

  // 저장
  const handleComplete = async (step4Data) => {
    const finalData = { ...formData, ...step4Data };
    setLoading(true);

    // 메뉴 정제 → 'menu' 이름으로 보냄
    const menu = (finalData.items ?? [])
      .map((it) => ({ name: (it?.name ?? "").trim(), price: toNumberSafe(it?.price) }))
      .filter((m) => m.name.length > 0 && Number.isFinite(m.price) && m.price >= 0);

    // ages(Set) → age_group / is_foreign
    const agesArr     = Array.from(finalData.ages ?? []);
    const is_foreign  = agesArr.includes("외국인");
    const ageOnly     = agesArr.find((a) => a !== "외국인");      // 단일 나이대 가정
    const age_group   = ageOnly != null ? AGE_MAP[ageOnly] : undefined;

    // 백엔드 스펙에 맞춘 payload
    const payload = {
      type: CATEGORY_MAIN_MAP[finalData.main],
      category: CATEGORY_SUB_MAP[finalData.sub],
      isWillingCollaborate: finalData.consent === "동의",
      storeContent: (finalData.note ?? "").trim(),   // 쓰기는 storeContent
      menu,                                          // 쓰기는 menu
      visitor: {
        gender: finalData.gender === "남자" ? "M" : finalData.gender === "여자" ? "F" : undefined,
        age_group,
        is_foreign,
      },
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/stores`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let msg = "정보 수정에 실패했습니다.";
        try {
          const body = await response.json();
          const merged = typeof body === "object" ? Object.values(body).flat().join(" ") : "";
          if (merged) msg = merged;
        } catch {}
        throw new Error(msg);
      }

      alert("정보가 성공적으로 수정되었습니다!");
      navigate("/");
    } catch (e) {
      console.error("API Error:", e);
      alert(`오류가 발생했습니다: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Page>
        <LoadingText>정보를 불러오는 중입니다...</LoadingText>
      </Page>
    );
  }

  const steps = [
    <ProfileEditStep1
      title="가게 정보 수정"
      defaultValues={formData}
      onNext={handleNext}
    />,
    <ProfileEditStep2
      title="고객 정보 수정"
      defaultValues={formData}
      onComplete={handleComplete}
      onBack={handleBack}
      isChanged={isChanged}
    />,
  ];

  return steps[step - 1] || null;
}

const Page = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
`;
const LoadingText = styled.p`
  font-size: 18px;
  color: #555;
`;
