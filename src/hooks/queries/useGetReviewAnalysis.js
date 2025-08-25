import { useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  storeName: "",
  goodPoint: "",
  badPoint: "",
  percentage: { goodPercentage: 0, middlePercentage: 0, badPercentage: 0 },
  analysisKeyword: "",
  analysisProblem: "",
  analysisSolution: "",
};

const useGetReviewAnalysis = (term) => {
  //analysisData 객체로 묶어서 필드 관리
  const [analysisData, setAnalysisData] = useState(initialState);

  // 로딩 에러 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const termMap = { 전체: 0, "한 달": 1, 일주일: 2 };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setAnalysisData(initialState); 

      try {
        const response = await axios.get(`${backendUrl}/review/analysis`, {
          params: { term: termMap[term] ?? 0 },
          withCredentials: true,
        });
        setAnalysisData(response.data.data);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [term]); // 전체, 한 달 등 탭 클릭할 때마다 실행.

  return { analysisData, loading, error };
};

export default useGetReviewAnalysis;
