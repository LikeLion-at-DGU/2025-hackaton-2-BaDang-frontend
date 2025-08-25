# 🐯 BaDang
BaDang(바당)은 AI를 활용한 시니어 자영업자 대상 온라인 가게 정보 분석 서비스입니다.
이 저장소는 BaDang의 프론트엔드 개발을 담당하는 레포지토리입니다.
<br />
<br />
<img width="3284" height="1975" alt="image"/>



---

## 📦 기술 스택

| 역할                 | 종류                                                                                                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | React, VITE |
| Programming Language | Javascript, Java |
| Styling              | CSS Styling |
| Data Fetching        | Axios |
| Formatting           | eslint |
| Package Manager      | NPM |
| Version Control      | Git, Github |
| State Management     | React |
| Deploy               | Netlify |

---

## 🚀 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```


## 🔧 작업 전 공통 절차: develop 브랜치 최신화

```bash
# 1. develop 브랜치로 이동
git checkout develop

# 2. 원격 저장소에서 최신 코드 가져오기
git pull origin develop
```


## 🛠 브랜치 생성

```bash
# develop 최신화 후 작업 브랜치 생성
git checkout -b feature/#이슈번호-스크린ID-작업명
```


## 🚀 PR 전 점검 및 병합

```bash
# develop 최신화 (생략 가능하지만 권장)
git checkout dev
git pull origin dev

# 작업 브랜치로 이동
git checkout feature/#...

# 최신 develop을 작업 브랜치에 병합
git merge develop

# 충돌 해결 후 커밋
```


