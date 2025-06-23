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
  - [🎬 Welcome Page](#-welcome-page)
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

## 🚀 배포 정보

### 테스트 환경

#### 📱 모바일 앱 (Expo)
- **Expo Go 앱 다운로드**
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

- **앱 실행 방법**
  1. Expo Go 앱 설치
  2. 아래 QR 코드를 스캔하거나 링크로 접속:
     - [Expo Go 링크](https://expo.dev/preview/update?message=Version%201.0.3&updateRuntimeVersion=1.0.2&createdAt=2025-06-05T06%3A22%3A37.957Z&slug=exp&projectId=7cdbd4d8-a4ea-4f4b-b914-d29b6312b483&group=3c41cc86-4eeb-4060-a215-ac30d4761568)

     <img src="./src/assets/readme_imgs/app_qr.png" alt="QR 코드" width="200" />

  3. 또는 프로젝트 루트 디렉토리에서:
     ```bash
     npm install
     npx expo start
     ```


#### 🌐 웹 버전
- **배포된 웹사이트**: [https://cuekim.shop/](https://moodcloud.app)

### 스토어 배포
- **App Store**: 예정
- **Google Play**: 예정

---

## 💡 주요 기능
* 오늘의 감정 선택 및 기록 (감정 아이콘 활용)
* Open AI의 API를 활용한 일기 감정 분석
* 상세 일기 작성, 수정, 삭제 기능 
* 상세 일기 댓글 기능
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
| 김지은 | [@zzeen2](https://github.com/zzeen2) | **📱 모바일 앱 프론트엔드 리드**<br>• React Native 기반 UI/UX 설계 및 전체 화면 구현<br>• 상태 관리 (Redux/Context API) 구조 설계 및 적용<br>• 내비게이션 및 공통 컴포넌트 개발<br>• API 연동 및 클라이언트 데이터 처리 로직 구현<br><br>**🌐 웹 프론트엔드 기여**<br>• 초기 EJS 템플릿 기반 웹 구조 설계<br><br>**🔧 백엔드 API 보완**<br>• 기존 API의 누락된 기능 추가 및 수정<br>• 사용자 카카오 인증, 일기 CRUD, 감정 분석 API 보완<br><br>**🛠 프로젝트 관리**<br>• MoodCloud 프로젝트 아이디어 제안 및 기획<br>• 프로젝트 초기 아키텍처 설계<br>• 팀 전체 개발 방향 리드 및 일정 관리 |

---

## 📱 화면 구성 및 기능

### 🎬 Welcome Page
<div align="center">
  <img src="./src/assets/readme_imgs/welcome/welcome_flow.gif" width="250" alt="Welcome Flow">
  <br><b>웰컴 페이지 플로우</b>
</div>

**주요 기능**:
- **카카오 OAuth 인증**: WebView 기반 카카오 로그인 구현
- **자동 로그인**: AsyncStorage를 통한 로그인 상태 유지

### 🏠 메인 화면 (홈)
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./src/assets/readme_imgs/main//main_cap2.PNG" width="250"/><br/>
        <b>메인 화면 - 구성 1</b>
      </td>
      <td align="center">
        <img src="./src/assets/readme_imgs/main/main_cap1.PNG" width="250"/><br/>
        <b>메인 화면 - 구성 2</b>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./src/assets/readme_imgs/main/main_onlyE.gif" width="250"/><br/>
        <b>메인 화면 - 감정만 저장</b>
      </td>
      <td align="center">
        <img src="./src/assets/readme_imgs/main/main_after.PNG" width="250"/><br/>
        <b>메인 화면 - 감정/일기 직성 후</b>
      </td>
    </tr>
  </table>
</div>

**주요 기능**:
- **오늘의 감정 선택**: 8가지 감정 아이콘 (기쁨, 슬픔, 화남, 평온, 사랑, 놀람, 불안, 지루함)
- **감정 기록 후 화면**: 감정/일기 등록 후 랜덤 일기 추천으로 재미 요소 제공
- **감정만 기록**: 간단한 감정 기록으로 빠른 오늘 감정 기록 가능
- **연속 스트릭**: 상단 헤더에 연속 기록 일수 표시로 동기부여
- **일기 요약 섹션**: 본문 스크롤 영역에 내 일기/팔로워 일기 요약 표시

### 📔 일기 관련 화면

#### ✍️ 일기 작성
<p align="center">
  <video width="300" controls>
    <source src="./src/assets/readme_imgs/diary/create_diary.gif" type="video/mp4">
  </video>
  <br/><b>일기 작성 플로우</b>
</p>

**주요 기능**:
- **감정 아이콘 표시**: 선택한 감정이 상단 감정 섹션에 표시
- **공개/비공개 설정**: 일기 공개 범위 선택
- **AI 감정 분석**: 작성 완료 시 OpenAI API를 통한 감정 분석

#### 📅 일기 목록 (일기 검색)
<div align="center">
  <img src="./src/assets/readme_imgs/diary/mylist_after.jpeg" width="300"/>
  <br/><b>일기 저장 후 내 일기 달력</b>
</div>
<p align="center">
  <video width="300" controls>
    <source src="./src/assets/readme_imgs/diary/mylist.gif" type="video/mp4">
  </video>
  <br/><b>달력 기반 내일기 검색</b>
</p>


**주요 기능**:
- **달력 뷰**: 월별 달력에서 일기 및 감정 작성 여부 시각적 표시
- **감정 아이콘 표시** : 감정만 등록 혹은 기존 일기 삭제 시 아이콘 백그라운드 반투명 및 테두리 점선 처리
- **일기 검색**: 특정 날짜 클릭 시 해당 날짜 일기 조회
- **감정별 필터링**: 감정 아이콘으로 일기 분류
- **일기 요약**: 카드 형태로 일기 제목, 감정, 작성 시간 표시

#### 📝 일기 상세 및 댓글
<p align="center">
  <video width="300" controls>
    <source src="./src/assets/readme_imgs/diary/edit_comment.gif" type="video/mp4">
  </video>
  <br/><b>일기 수정 및 댓글 기능</b>
</p>

**주요 기능**:
- **일기 상세 보기**: 전체 일기 내용, 작성자, 날짜, 감정 표시
- **수정/삭제**: 본인 일기일 경우 수정 및 삭제 기능
- **댓글 시스템**: 친구들과 일기에 대한 댓글 작성
- **공개 설정 변경**: 비공개 → 공개 전환 가능

### 👥 소셜 기능

#### 📖 친구 일기 목록
<div align="center">
  <img src="./src/assets/readme_imgs/friendlist.PNG" width="300"/>
  <br/><b>친구 일기 목록</b>
</div>

**주요 기능**:
- **친구 일기 피드**: 팔로우한 친구들의 오늘 작성된 공개 일기 목록
- **실시간 업데이트**: 새로운 일기 작성 시 실시간 반영
- **일기 미리보기**: 일기 제목, 감정, 작성 시간 표시

#### 👤 친구 추가/팔로우
<p align="center">
  <video width="300" controls>
    <source src="./src/assets/readme_imgs/add_friend.MP4" type="video/mp4">
  </video>
  <br/><b>친구 프로필 및 팔로우 기능</b>
</p>

**주요 기능**:
- **친구 검색**: 닉네임으로 친구 검색
- **프로필 조회**: 친구의 프로필 정보 및 공개 일기 목록
- **팔로우/언팔로우**: 원클릭 팔로우 기능
- **상호 팔로우**: 서로 팔로우 시 친구 관계 형성
- **친구 추천**: 공통 관심사 기반 친구 추천

#### 👥 팔로워/팔로잉 관리
<p align="center">
  <video width="300" controls>
    <source src="./src/assets/readme_imgs/follow_list.mov" type="video/mp4">
  </video>
  <br/><b>팔로워/팔로잉 목록 모달</b>
</p>

**주요 기능**:
- **팔로워 목록**: 나를 팔로우하는 사용자 목록
- **팔로잉 목록**: 내가 팔로우하는 사용자 목록
- **상호작용**: 목록에서 직접 팔로우/언팔로우
- **프로필 이동**: 목록에서 친구 프로필로 바로 이동
- **친구 관리**: 친구 관계 관리 및 정리

### 👤 프로필 화면
<div align="center">
  <img src="./src/assets/readme_imgs/my_profile.jpeg" width="300"/>
  <br/><b>내 프로필 화면</b>
</div>

**주요 기능**:
- **프로필 정보**: 프로필 이미지, 닉네임, 자기소개 표시 및 수정
- **통계 정보**: 팔로워/팔로잉 수, 공개 일기 수, 연속 기록 일수
- **내 일기 목록**: 작성한 공개 일기들의 목록
- **설정 메뉴**: 로그아웃, 계정 삭제, 알림 설정 등
- **프로필 공유**: 내 프로필 링크 공유 기능

### 📊 통계 화면
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./src/assets/readme_imgs/stats1.png" width="250"/><br/>
        <b>감정 통계 (원그래프)</b>
      </td>
      <td align="center">
        <img src="./src/assets/readme_imgs/stats2.png" width="250"/><br/>
        <b>연속 기록 스트릭</b>
      </td>
    </tr>
  </table>
</div>

**주요 기능**:
- **감정 분포 차트**: 월별/기간별 감정 통계 원그래프
- **연속 기록 스트릭**: Duolingo 스타일의 연속 기록 시스템
- **감정 달력**: 날짜별 기록된 감정을 달력에 시각화
- **감정 트렌드**: 시간에 따른 감정 변화 추이 분석
- **통계 내보내기**: 감정 통계 데이터 CSV 다운로드
- **목표 설정**: 월별 기록 목표 설정 및 달성률 표시

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

## 회고
👍 Like (좋았던 점)
효율적인 팀 협업과 아이디어 융합
주제 선정 과정에서 팀원 간 의견 충돌 없이 빠르게 합의가 이루어졌고, 구체화 과정에서도 각자의 아이디어가 자연스럽게 융합되어 방향 설정이 매끄럽게 진행되었다.
차별화된 서비스 컨셉
단순한 일기 작성 플랫폼을 넘어, 사용자의 감정을 기록하고 이를 '구름'이라는 시각적 요소에 담아 표현하는 컨셉이 팀 전체에게 매력적으로 다가왔다.
사용자 참여 유도 시스템
듀오링고의 스트릭 시스템에서 착안한 '연속 기록 유도 시스템'은 테스트 사용자로부터 실질적인 동기부여 요소로 작용했다는 긍정적인 피드백을 받았다.
효율적인 기술 스택 선택
프론트엔드는 React Native, 백엔드는 Node.js/Express 기반으로 구성하여 앱과 웹을 모두 대응할 수 있는 구조로 설계했고, Expo를 활용하여 빠른 개발 및 테스트 환경을 구축할 수 있었던 점도 개발 효율성을 높이는 데 도움이 되었다.
안정적인 상태 관리 구현
JWT 기반 인증과 AsyncStorage를 통한 로그인 상태 유지 구현, Redux를 활용한 감정 상태 및 사용자 상태의 글로벌 관리가 잘 작동했다.

📚 Learned (새롭게 배운 점)
모바일 앱 개발 전체 흐름 이해
React Native 기반의 모바일 앱 개발이 처음이었음에도, Expo의 구조, 빌드 시스템, 그리고 Native 모듈 적용 방식을 직접 경험하며 모바일 앱 개발의 전반적인 흐름을 익힐 수 있었습니다.

효율적인 상태 관리 및 폴더 구조 설계
Redux를 활용해 상태 관리를 분리하고, streak, user, emotion 등의 핵심 상태를 효율적으로 관리했습니다.
이 과정에서 이전 프로젝트에서 혼동을 겪었던 재사용 가능한 폴더 구조 설계 및 적용 방법을 체득할 수 있었습니다.

UI/UX 심화 학습
프론트엔드에서 감정 선택, 일기 작성, 통계 시각화 등 UI 흐름을 사용자 관점에서 설계하기 위해 노력하며, UI/UX에 대한 이해를 한층 더 구체적으로 발전시키는 계기가 되었습니다.

소셜 로그인(OAuth) 구현과 환경 의존성 극복
모바일 앱 개발 과정에서 예상치 못한 난관에 부딪히기도 했습니다. 특히 카카오 로그인 기능 구현은 큰 학습 경험이었습니다.
초기에는 expo-auth-session을 시도했으나, Expo Go 개발 환경의 exp:// 스킴과 카카오의 HTTPS redirect_uri 요구사항 불일치로 인해 작동하지 않는 문제에 직면했습니다.
이어서 @react-native-seoul/kakao-login 같은 네이티브 모듈을 시도했으나, 앱 빌드 과정에서 Maven 저장소나 Kotlin 버전 호환성 등 네이티브 의존성 관리의 복잡성으로 다시금 어려움을 겪었습니다.
이러한 시행착오를 통해 OAuth 인증 흐름과 redirect_uri 처리 메커니즘, 그리고 Expo 환경에서의 네이티브 기능 연동에 대한 깊이 있는 이해를 얻게 되었습니다.
결국, WebView 방식을 채택하여 앱 내에서 카카오 로그인 페이지를 직접 제어하고 onNavigationStateChange로 리다이렉트 URL을 파싱함으로써, 개발 환경의 제약을 우회하고 성공적으로 기능을 구현할 수 있었습니다.

웹 개발과 앱 개발의 차이점 이해
기존 웹 개발 경험만 있었던 상태에서 앱 개발을 시작하면서, 두 환경의 근본적인 차이점을 깊이 이해할 수 있었습니다.
특히 iOS와 Android 플랫폼 간의 차이점, 네이티브 모듈 연동 등 웹 개발에서는 고려하지 않았던 요소들을 경험했습니다.
Expo의 개발 환경과 실제 빌드 환경의 차이, 네이티브 코드와의 상호작용 등 앱 개발만의 특수한 고려사항들을 학습할 수 있었습니다.
이러한 경험을 통해 크로스 플랫폼 개발의 장단점과 한계점을 직접 체감하며, 더 나은 개발 결정을 내릴 수 있는 통찰력을 얻을 수 있었습니다.


🧩 Lacked (부족했던 점)
API 설계와 협업 프로세스 미흡
프론트와 백엔드를 분리하여 작업하고자 했으나, 앱 프론트와 백엔드 간 API 명세에 대한 사전 협의가 부족해, 앱 프론트에서 일부 기능 구현 시 API를 추가하거나 수정하는 경우가 있었다.
데이터 시각화와 UX 최적화 부족
감정 데이터 시각화와 관련된 통계 페이지 구현에서, 사용자 데이터를 바탕으로 한 UX 최적화가 부족하여 개선 여지가 남았다.
상태 관리 구조의 일관성 부족
로그인 후 유저 정보를 글로벌 상태로 관리하는 방식에서 Redux와 Context API가 혼용되어 구조적으로 일관성이 떨어지는 부분이 있었다.
초기 프로젝트 구조 설계 미흡
프로젝트 초기 구조 설계와 폴더 구조 정리에 더 많은 시간을 들였다면, 중후반 기능 확장 및 유지보수가 수월했을 것이라 느꼈다.
보일러플레이트 코드의 중요성과 클린코드가 초반에는 부족해서 중복적으로 많이 사용하거나 정리되지 않은 코드들이 아쉬움을 느꼈고, 이후 이를 개선하기 위해 최대한 지키려 노력했다.

🌠 Longed for (탑재하고 싶었지만 구현하지 못한 점)
고도화된 데이터 시각화 기능
감정 변화 추이를 시각적으로 보여주는 선형 그래프나 히트맵 기반 통계 기능은 기획되었지만 시간 관계상 구현 범주에서 제외되었다.
AI 기반 맞춤형 콘텐츠 추천
AI 감정 분석 결과를 바탕으로 한 맞춤형 콘텐츠 추천(예: 음악, 명언, 일기 예시 등)을 구현하고자 했으나, 외부 API 연동 및 추천 알고리즘 설계에 시간이 부족했다.
소셜 기능 확장
친구 간 감정 공유 후 피드백이나 공감 버튼 등 커뮤니케이션 기능을 추가하려 했으나, 기본 기능 완성도 확보를 우선시하여 추후 기능으로 미뤄졌다.
푸시 알림 시스템
감정 기록 리마인드 알림 기능(예: 매일 밤 10시 푸시 알림)도 사용자의 꾸준한 기록을 유도하기 위한 아이디어였지만, Expo Push Notification 세팅 문제로 구현이 보류되었다.
감정 캐릭터 성장 시스템
초기에는 감정 기록 기반으로 나만의 감정 캐릭터를 성장시키는 '감정 구름 성장 시스템'도 기획되었지만, 디자인 리소스 부족과 개발 범위 제한으로 도입하지 못했다.
앱 스토어 배포
추후에 기능 백엔드 및 프론트엔드 서버가 안정화된다면, 앱스토어나 플레이스토어에 배포를 해보는 것도 좋은 경험이 될 것 같다.
이를 통해 한정된 테스트 사용자가 아닌 실제 사용자들의 피드백을 받고, 앱 스토어 배포 프로세스와 앱 심사 과정에 대한 경험을 쌓을 수 있을 것이다.