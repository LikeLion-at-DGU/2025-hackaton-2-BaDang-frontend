
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";
import SignUpStep4 from "./SignUpStep4";

// --- Data Transformation Maps (for API) ---
const CATEGORY_MAIN_MAP = { "음식": 1, "소매": 2, "생활서비스": 3, "교육": 4, "숙박": 5, "오락/여가": 6, "의료/건강": 7, "운송/자동차": 8, "제조/생산": 9, "기타": 10 };
const CATEGORY_SUB_MAP = { "한식": 1, "카페": 2 /* Add all other sub-categories... */ };
const AGE_MAP = {"청소년": 0, "청년": 1, "중년층": 2, "노년층": 3, "외국인": 4};

export default function SignUpPage() {
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNext = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleStep2Next = async (step2Data) => {
        const combinedData = { ...data, ...step2Data };
        setData(combinedData);
        setLoading(true);

        try {
            // 1. User Signup API Call
            const signupResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // ✅ HttpOnly 쿠키를 자동으로 주고받도록 설정
                credentials: 'include',
                body: JSON.stringify({
                    id: combinedData.username,
                    password: combinedData.password,
                    name: combinedData.name,
                    phoneNumber: combinedData.phoneNumber,
                }),
            });

            if (!signupResponse.ok) {
                // ... (기존 오류 처리 로직)
            }

            // 2. Store Creation API Call
            const storeResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/stores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // ✅ Authorization 헤더를 직접 설정하는 코드 제거
                    // 'Authorization': `Bearer ${accessToken}`,
                },
                // ✅ HttpOnly 쿠키를 자동으로 주고받도록 설정
                credentials: 'include', 
                body: JSON.stringify({
                    name: combinedData.storeName,
                    address: combinedData.address,
                }),
            });
            
            if (!storeResponse.ok) {
                // ... (기존 오류 처리 로직)
            }

            setStep(3);

        } catch (error) {
            // ... (오류 처리 로직)
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (step4Data) => {
        const finalData = { ...data, ...step4Data };
        setData(finalData);
        setLoading(true);
    
        // API 요청을 위한 데이터 형태로 변환
        const payload = {
            type: CATEGORY_MAIN_MAP[finalData.main],
            category: CATEGORY_SUB_MAP[finalData.sub],
            visitor: {
                gender: finalData.gender === "남자" ? "M" : "F",
                age_group: AGE_MAP[finalData.ages[0]] ?? 1,
                is_foreign: finalData.ages.includes("외국인"),
            },
            isWillingCollaborate: finalData.consent === "동의",
            storeContent: finalData.note,
            menu: finalData.items.map(item => ({ name: item.name, price: Number(item.price) })),
        };
    
        try {
          // ✅ 백엔드의 storeView에 맞게 URL을 수정하고, 메서드를 PATCH로 변경
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/main/stores`, {
                method: 'PATCH', // ✅ POST에서 PATCH로 변경
                headers: { 
                'Content-Type': 'application/json' 
            },
            // 쿠키 인증을 위해 credentials 옵션 유지
            credentials: 'include',
            body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || '상세 정보 등록에 실패했습니다.');
            }
    
            alert("회원가입이 성공적으로 완료되었습니다!");
            navigate("/");
    
        } catch (error) {
            console.error("API Error:", error);
            alert(`오류가 발생했습니다: ${error.message}`);
        } finally {
            setLoading(false);
        }
        };

    const steps = [
        <SignUpStep1 defaultValues={data} onNext={handleNext} />,
        <SignUpStep2 defaultValues={data} onNext={handleStep2Next} onBack={handleBack} loading={loading} />,
        <SignUpStep3 defaultValues={data} onNext={handleNext} onBack={handleBack} />,
        <SignUpStep4 defaultValues={data} onComplete={handleComplete} onBack={handleBack} loading={loading} />,
    ];

    return steps[step - 1] || null;
}
