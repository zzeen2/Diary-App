# ☁️ MoodCloud - 감정 기록 및 공유 앱
---

<p align="center">
  <img src="./src/assets/logo2.png" width="150px"/>
</p>
<h1 align="center">MoodCloud</h1>
<p align="center">
"MoodCloud는 '감정을 담는 구름'이라는 의미로, AI 분석과 스트릭 시스템을 활용해 감정 표현이 어려운 현대인의 정서적 웰빙과 지속가능한 기록 습관을 지원하는 플랫폼입니다."
</p>

---

## 📖 목차
- [✨ 프로젝트 소개](#-프로젝트-소개)
- [📝 프로젝트 개요](#-프로젝트-개요)
- [🚀 앱 실행 방법 (또는 배포 정보)](#-앱-실행-방법-또는-배포-정보)
- [💡 주요 기능](#-주요-기능)
- [🧑‍💻 팀원 및 주요 기여 (본인 역할 강조)](#-팀원-및-주요-기여)
- [📱 화면 구성 및 기능](#-화면-구성-및-기능)
  - [🏠 메인 화면 (홈)](#-메인-화면-홈)
  - [📔 일기 관련 화면 (작성, 상세, 목록)](#-일기-관련-화면)
  - [👤 프로필 화면 (내 정보, 친구 프로필)](#-프로필-화면)
  - [📊 통계 화면](#-통계-화면)
  - [➕ 기타 (모달 등)](#-기타-모달-등)
- [🔧 API 주요 명세 (기여 부분 중심)](#-api-주요-명세)
- [🛠 기술 스택 및 협업 도구](#-기술-스택-및-협업-도구)
- [📁 프로젝트 폴더 구조](#-프로젝트-폴더-구조)

---
## ✨ 프로젝트 소개

MoodCloud는 바쁜 일상 속에서 자신의 감정을 돌아보고 기록할 수 있는 공간을 제공합니다. 사용자는 다양한 감정 아이콘을 선택하여 그날의 기분을 표현하고, 상세한 일기를 작성할 수 있습니다. AI 감정 분석을 통해 스스로도 미처 깨닫지 못했던 내면의 감정까지 발견하고, 연속 기록 스트릭과 월별 감정 통계로 자신만의 감정 패턴을 이해할 수 있습니다. 친구들과의 일기 공유 기능을 통해 혼자가 아닌 연결된 정서 경험을 나누며, 꾸준히 자신의 마음을 돌보고 타인과 긍정적인 관계를 맺도록 돕는 것을 목표로 합니다.

---

## 💬 프로젝트 개요
- **프로젝트명**: MoodCloud
- **목적**: 사용자의 감정 기록, 일기 작성 및 소셜 공유를 위한 플렛폼 개발
- **개발 기간**: 2025.05.13 ~ 2025.06.01 
- **참여 인원**: 총 3명

---

## 🔗 배포 정보
- **테스트 환경**: (Expo Go를 통해 실행하는 방법, 안드로이드/iOS 빌드 방법 등)
- **(선택) 배포 주소**:
    - App Store: [앱스토어_링크_또는_예정]
    - Google Play: [구글플레이_링크_또는_예정]

---

## 💡 주요 기능
* 오늘의 감정 선택 및 기록 (감정 아이콘 활용)
* Open AI의 API를 활용한 일기 감정 분석
* 상세 일기 작성, 수정, 삭제 기능 (Markdown 또는 일반 텍스트)
* 일기 및 감정 기록 기반 연속 스트릭 표시
* 감정 통계 시각화 (파이차트, 막대그래프 등)
* 친구 팔로우/팔로잉 및 친구 일기 피드
* 사용자 프로필 (자기소개, 프로필 이미지, 공개 일기 목록)
* 일기 공개/비공개 설정
* 친구 검색 기능


---

## 🧑‍💻 팀원 및 주요 기여

| 이름   | 깃허브                               | 주요 기여                                                                                                                                                                                                                            |
| :----- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 김지은 | [@[zzeen2]](https셔플://github.com/[본인_깃허브_ID]) | **[앱 프론트엔드 리드 및 전체 개발]**<br>• React Native 기반 UI/UX 설계 및 전체 화면 구현<br>• 상태 관리 (Redux / Context API) 구조 설계 및 적용<br>• API 연동 및 클라이언트 데이터 처리 로직 개발<br>• 내비게이션, 공통 컴포넌트 및 주요 로직 개발<br><br>**[앱 백엔드 일부 개발]**<br>• 사용자 인증, 일기 CRUD, 감정 기록 등 주요 API 엔드포인트 설계 및 개발 (Node.js, Express 등 사용 기술 명시)<br>• 데이터베이스 스키마 일부 설계 및 API 연동 (사용 DB 명시)<br><br>• 프로젝트 초기 구조 설계 및 버전 관리(Git) |
| (다른 팀원이 있다면 추가) |                                      |                                                                                                                                                                                                                    |

---

## 📱 화면 구성 및 기능

### 🏠 메인 화면 (홈)
<p align="center">
  <!-- <img src="[메인화면_스크린샷_경로]" width="300px"/> -->
  스크린샷을 추가하면 좋습니다.
</p>

- **주요 기능**:
    - 오늘 날짜 및 인사 메시지 표시
    - 오늘의 감정 기록 여부에 따른 분기 처리:
        - 미작성 시: 감정 선택기, 일기 작성 버튼, 감정만 기록 버튼
        - 작성 시: 월별 작성률, 랜덤 일기 추천 (또는 오늘 작성한 일기 요약)
    - 나의 최근 일기 목록 (더보기 > 일기장 이동)
    - 친구들의 최근 일기 목록 (더보기 > 친구 일기장 이동, 친구 없을 시 친구 찾기 유도)
    - 하단 탭 바를 통한 주요 메뉴 이동 (홈, 일기장, 통계, 프로필)
    - 연속 기록 스트릭 및 프로필 이미지 헤더 표시

### 📔 일기 관련 화면
<div align="center">
  <table>
    <tr>
      <td align="center">
        <!-- <img src="[일기작성_스크린샷_경로]" width="250"/> --><br/>
        <b>일기 작성 화면</b>
      </td>
      <td align="center">
        <!-- <img src="[일기상세_스크린샷_경로]" width="250"/> --><br/>
        <b>일기 상세 화면</b>
      </td>
      <td align="center">
        <!-- <img src="[일기목록_스크린샷_경로]" width="250"/> --><br/>
        <b>일기 목록 화면</b>
      </td>
    </tr>
  </table>
</div>

- **일기 작성 화면**:
    - 선택한 감정 표시
    - 일기 제목 및 내용 입력 (텍스트 에디터)
    - 공개/비공개 설정
    - 저장 기능
- **일기 상세 화면**:
    - 일기 내용, 작성자 정보, 날짜, 감정 표시
    - 본인 일기일 경우 수정/삭제 버튼 제공
- **일기 목록 화면 (나의 일기장 / 친구 일기장)**:
    - 필터링 기능 (예: 감정별, 기간별)
    - 일기 카드 리스트 (요약 정보 표시)
    - 카드 선택 시 상세 화면으로 이동

### 👤 프로필 화면
<div align="center">
  <table>
    <tr>
      <td align="center">
        <!-- <img src="[내프로필_스크린샷_경로]" width="250"/> --><br/>
        <b>내 프로필 화면</b>
      </td>
      <td align="center">
        <!-- <img src="[타인프로필_스크린샷_경로]" width="250"/> --><br/>
        <b>타인 프로필 화면 (예시)</b>
      </td>
    </tr>
  </table>
</div>

- **내 프로필 화면**:
    - 프로필 이미지, 닉네임, 자기소개 표시 및 수정 기능
    - 팔로워 수, 팔로잉 수, 공개된 일기 수 표시
    - 팔로워/팔로잉 목록 조회 모달
    - 내가 작성한 공개 일기 목록
    - 설정 (로그아웃 등)
- **타인 프로필 화면**:
    - 프로필 정보 및 공개 일기 목록 표시
    - 팔로우/언팔로우 기능

### 📊 통계 화면
<p align="center">
  <!-- <img src="[통계화면_스크린샷_경로]" width="300px"/> -->
  스크린샷을 추가하면 좋습니다.
</p>

- **주요 기능**:
    - 감정 달력: 날짜별 기록된 감정 표시
    - 감정 차트: 특정 기간 동안의 감정 분포 시각화 (원형 차트, 막대 차트 등)
    - 주요 감정 통계, 작성 빈도 등

### ➕ 기타 (모달 등)
- **친구 검색 모달**: 사용자 닉네임으로 친구 검색 및 팔로우 요청
- **자기소개 수정 모달**: 자기소개 텍스트 입력 및 저장
- **팔로우/팔로잉 목록 모달**: 사용자 목록 표시

---

## 🔧 API 주요 명세 (기여 부분 중심)

*(이 부분은 프론트엔드에서 주로 어떤 API와 상호작용했는지, 혹은 백엔드 개발에 참여하신 API 위주로 작성합니다.)*

### 사용자 인증 및 프로필 API (예시)
| Method | Path                      | Description               | 담당 |
|--------|---------------------------|---------------------------|------|
| POST   | `/auth/login`             | 카카오/이메일 로그인      | 백엔드 |
| GET    | `/users/me`               | 내 프로필 정보 조회       | 프론트/백엔드 |
| PUT    | `/users/me/bio`           | 자기소개 수정             | 프론트/백엔드 |
| GET    | `/users/{userId}/profile` | 타인 프로필 정보 조회     | 프론트/백엔드 |
| GET    | `/users/stats/{userId}`   | 사용자 통계(팔로워/일기 수)| 프론트/백엔드 |

### 일기 API (예시)
| Method | Path                        | Description                | 담당 |
|--------|-----------------------------|----------------------------|------|
| POST   | `/diaries`                  | 새 일기 작성               | 프론트/백엔드 |
| GET    | `/diaries/today/check`      | 오늘 일기 작성 여부 확인   | 프론트/백엔드 |
| GET    | `/diaries/today`            | 오늘 작성한 일기 가져오기  | 프론트/백엔드 |
| GET    | `/diaries/random`           | 랜덤 일기 가져오기         | 프론트/백엔드 |
| GET    | `/diaries/{diaryId}`        | 특정 일기 상세 조회        | 프론트 |
| PUT    | `/diaries/{diaryId}`        | 일기 수정                  | 프론트/백엔드 |
| DELETE | `/diaries/{diaryId}`        | 일기 삭제                  | 프론트/백엔드 |
| POST   | `/diaries/emotion-only`     | 감정만 기록                | 프론트/백엔드 |

### 친구 관계 API (예시)
| Method | Path                         | Description             | 담당 |
|--------|------------------------------|-------------------------|------|
| POST   | `/friends/follow/{userId}`   | 사용자 팔로우           | 프론트/백엔드 |
| DELETE | `/friends/unfollow/{userId}` | 사용자 언팔로우         | 프론트/백엔드 |
| GET    | `/friends/search`            | 친구 검색               | 프론트 |
| GET    | `/friends/diaries`           | 친구 일기 목록 가져오기 | 프론트 |

*(실제 프로젝트에서 사용하고 기여하신 API 명세를 구체적으로 작성해주세요.)*

---
## 🛠 기술 스택 및 협업 도구
- **Frontend**:
  <img src="https://img.shields.io/badge/react_native-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white">
  <img src="https://img.shields.io/badge/React_Navigation-6B52AE?style=for-the-badge&logo=react&logoColor=white">
  <!-- 사용하신 상태관리 라이브러리 (Redux, Zustand 등) 추가 -->
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

- **Backend (일부 참여)**:
  <!-- 참여하신 백엔드 기술 스택 명시 -->
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

- **Database (일부 참여)**:
  <!-- 참여하신 DB 명시 -->
  <!-- <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> -->
  <!-- <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> -->

- **Version Control**:
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

- **Collaboration Tools**:
  <!-- 사용하신 협업 도구 명시 -->
  <img src="https://img.shields.io/badge/NOTION-FFFFFF?style=for-the-badge&logo=notion&logoColor=black">
  <!-- <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> -->
  <!-- <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> -->

---

## 📁 프로젝트 폴더 구조 (예시)
📦MoodCloudApp
┣ 📂src
┃ ┣ 📂actions // Redux 액션 또는 비동기 요청 함수
┃ ┣ 📂api // API 호출 함수 모듈
┃ ┣ 📂assets // 이미지, 폰트 등 정적 에셋
┃ ┣ 📂components // 재사용 가능한 UI 컴포넌트 (atoms, molecules, organisms, templates)
┃ ┃ ┣ 📂atoms
┃ ┃ ┣ 📂molecules
┃ ┃ ┣ 📂organisms
┃ ┃ ┗ 📂templates // 화면 단위 템플릿 또는 Screen 컴포넌트
┃ ┣ 📂constants // 상수 값
┃ ┣ 📂context // React Context API
┃ ┣ 📂hooks // 커스텀 훅
┃ ┣ 📂navigation // React Navigation 설정
┃ ┣ 📂reducers // Redux 리듀서
┃ ┣ 📂screens // (templates 폴더를 screen으로 사용하지 않을 경우)
┃ ┣ 📂store // Redux 스토어 설정
┃ ┗ 📂utils // 유틸리티 함수
┣ 📜App.js // 앱 진입점
┣ 📜babel.config.js
┣ 📜package.json
┗ 📜README.md // 현재 파일