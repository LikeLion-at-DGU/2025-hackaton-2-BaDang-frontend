import axios from 'axios';

// 1. Axios 인스턴스 생성
const apiClient = axios.create({
  // 2. 기본 URL 설정
  // 모든 요청에 이 주소가 기본으로 앞에 붙습니다.
  baseURL: import.meta.env.VITE_BACKEND_URL,

  // 3. withCredentials를 true로 설정
  // 모든 요청에 쿠키를 포함하도록 기본값으로 지정합니다.
  withCredentials: true,
});

// 4. (선택) 요청 인터셉터: 모든 요청이 보내지기 전에 실행할 로직
apiClient.interceptors.request.use(
  (config) => {
    // 여기에 요청을 보내기 전에 할 일들을 추가할 수 있습니다.
    // 예를 들어, 로컬 스토리지에서 토큰을 가져와 헤더에 추가하는 로직 등
    console.log('API 요청 보냄:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 5. 생성한 인스턴스를 내보냅니다.
export default apiClient;