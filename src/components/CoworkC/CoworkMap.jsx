// components/CoworkC/CoworkMap.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StoreBtn from "./StoreBtn";
import axios from "axios";

const Container = styled.div`
  display: flex;
  width: 1200px;
  height: 416px;
  gap: 57px;
  margin: auto;
`;

const MapBox = styled.div`
  width: 494px;
  height: 404px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  box-shadow: 0 8px 24.3px 0 rgba(0, 0, 0, 0.06);
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 645px;
  height: 70px;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-left: 28px;
  font-size: 16px;
  line-height: 1.2;
  border-radius: 53px;
  border: 1.5px solid #9d9d9d;
  background: #fff;
`;

const SearchButton = styled.button`
  all: unset;
  position: absolute;
  right: 0;
  top: 0;
  width: 90px;
  height: 100%;
  background: ${(props) => (props.$active ? "#759AFC" : "#9D9D9D")};
  color: #faf9f6;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.$active ? "pointer" : "default")};
  border-radius: 0 53px 53px 0;
`;

const Title = styled.div`
  color: #494954;
  font-family: SUIT;
  font-size: 25px;
  font-weight: 700;
  line-height: normal;
  margin-top: 20px;
`;

const SelectWrapper = styled.div`
  display: flex;
  width: 649px;
  align-items: center;
  gap: 24px;
`;

const Select = styled.select`
  display: flex;
  width: 312.5px;
  height: 73px;
  padding: 23px 16px;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  background: #fff;
`;

const ButtonsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  width: 649px;
`;

// 카테고리별 소분류 옵션
const subCategoryOptions = {
  음식: [
    "한식",
    "중식",
    "일식",
    "서양식",
    "기타외국식",
    "분식",
    "패스트푸드",
    "제과제빵",
    "카페",
  ],
  소매: [
    "슈퍼마켓",
    "편의점",
    "전통시장",
    "농축수산물",
    "건강식품",
    "의류",
    "패션잡화",
    "생활잡화",
    "가전제품",
    "서적/문구",
    "애완용품",
  ],
  생활서비스: [
    "미용실",
    "네일숍",
    "피부관리",
    "세탁소",
    "수선/수리",
    "사진관",
    "예식/행사",
    "인테리어",
  ],
  교육: [
    "입시/보습학원",
    "외국어학원",
    "예체능학원",
    "컴퓨터/IT교육",
    "평생교육",
  ],
  숙박: ["호텔", "모텔", "게스트하우스", "펜션/민박"],
  "오락/여가": [
    "PC방",
    "노래방",
    "게임방",
    "스크린골프",
    "당구장",
    "헬스/요가/필라테스",
  ],
  "의료/건강": ["약국", "한의원", "병원", "안경점", "헬스용품"],
  "운송/자동차": ["주유소", "세차장", "자동차수리", "렌터카"],
  "제조/생산": ["식품제조", "의류제조", "가구제조", "인쇄/출판"],
  기타: ["부동산중개", "여행사", "종교단체", "비영리단체"],
};
function CoworkMap({ onStoreClick }) {
  const mapRef = useRef(null);
  const [storeId, setStoreId] = useState(null); // 가게 번호
  const [userLat, setUserLat] = useState(37.55886);
  const [userLng, setUserLng] = useState(126.99989);

  const [map, setMap] = useState(null);
  const [categoryBig, setCategoryBig] = useState("");
  const [categorySub, setCategorySub] = useState("");
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const kakaoKey = import.meta.env.VITE_REACT_APP_KAKAO_API_KEY;
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(`${backendUrl}/main/me`, {
          withCredentials: true,
        });
        // console.log("맵 콘솔로그:", response.data);
        const id = response.data.stores[0]?.id;
        setStoreId(id);
        const lat = response.data.stores[0]?.latitude;
        setUserLat(lat);
        const lng = response.data.stores[0]?.longitude;
        setUserLng(lng);

        // console.log("스토어아이디", id);
      } catch (error) {
        console.error("Failed to fetch me:", error);
      } finally {
      }
    };
    fetchMe();
  }, [backendUrl]);
  useEffect(() => {
    if (!kakaoKey) return;
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      if (!window.kakao) return;
      window.kakao.maps.load(async () => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(userLat, userLng),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);
      });
    };
    console.log("userlat", userLat);
    console.log("userlng", userLng);

    return () => document.head.removeChild(script);
  }, [storeId]);

  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  const handleSearch = async (
    newBig = categoryBig,
    newSub = categorySub,
    searchKeyword = keyword
  ) => {
    if (!map) return;

    const typeIndex = newBig
      ? Object.keys(subCategoryOptions).indexOf(newBig) + 1
      : null;

    const categoryIndex =
      newBig && newSub ? subCategoryOptions[newBig].indexOf(newSub) + 1 : null;
    try {
      // 요청 데이터 구성
      const requestData = {};
      if (searchKeyword.trim()) requestData.query = searchKeyword.trim();
      if (!searchKeyword.trim()) {
        if (typeIndex) requestData.type = typeIndex;
        if (categoryIndex) requestData.category = categoryIndex;
      }
      requestData.storeId = storeId || "";

      const res = await axios.post(
        `${backendUrl}/collaboration/search`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data?.data?.store) {
        setPlaces(res.data.data.store);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const moveToPlace = (place) => {
    if (!map) return;
    const pos = new window.kakao.maps.LatLng(place.store.latitude, place.store.longitude);
    map.setCenter(pos);
    clearMarkers();
    const marker = new window.kakao.maps.Marker({ map, position: pos });
    markersRef.current = [marker];
  };

  return (
    <Container>
      <MapBox ref={mapRef} />
      <RightPanel>
        <Controls>
          <InputWrapper>
            <Input
              type="text"
              placeholder="찾으시는 가게명을 입력해주세요 (예: 스타벅스)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <SearchButton onClick={() => handleSearch()} $active={!!keyword}>
              검색
            </SearchButton>
          </InputWrapper>

          <Title>업종</Title>
          <SelectWrapper>
            <Select
              value={categoryBig}
              onChange={(e) => {
                const newBig = e.target.value || "";
                setCategoryBig(newBig);
                setCategorySub("");
                handleSearch(newBig, "", keyword);
              }}
            >
              <option value="">대분류를 선택하세요</option>
              {Object.keys(subCategoryOptions).map((key, idx) => (
                <option key={idx} value={key}>
                  {key}
                </option>
              ))}
            </Select>
            <Select
              value={categorySub}
              onChange={(e) => {
                const newSub = e.target.value || "";
                setCategorySub(newSub);
                handleSearch(categoryBig, newSub, keyword);
              }}
              disabled={!categoryBig}
            >
              <option value="">소분류를 선택하세요</option>
              {categoryBig &&
                subCategoryOptions[categoryBig].map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
            </Select>
          </SelectWrapper>
        </Controls>

        <ButtonsBox>
          {places.map((place, idx) => (
            <StoreBtn
              id={storeId}
              key={idx}
              storeName={place.store.name}
              onClick={() => {
                moveToPlace(place);
                onStoreClick && onStoreClick(place);
              }}
              
            />
          ))}
        </ButtonsBox>
      </RightPanel>
    </Container>
  );
}

export default CoworkMap;
