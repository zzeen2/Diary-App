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
- [🔧 API 주요 명세](#-api-주요-명세)
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
<div align="center">
  <img src="./src/assets/readme_imgs/diary/create_diary.gif" width="250" alt="Welcome Flow">
  <br><b>감정 일기 작성 플로우</b>
</div>

<!-- <p align="center">
  <video width="300" controls>
    <source src="./src/assets/readme_imgs/diary/create_diary.gif" type="video/mp4">
  </video>
  <br/><b>일기 작성 플로우</b>
</p> -->

**주요 기능**:
- **감정 아이콘 표시**: 선택한 감정이 상단 감정 섹션에 표시
- **공개/비공개 설정**: 일기 공개 범위 선택
- **AI 감정 분석**: 작성 완료 시 OpenAI API를 통한 감정 분석

#### 📅 일기 목록 (일기 검색)
<!-- <div align="center">
  <img src="./src/assets/readme_imgs/diary/mylist_after.jpeg" width="300"/>
  <br/><b>일기 저장 후 내 일기 달력</b>
</div>
<div align="center">
  <img src="./src/assets/readme_imgs/diary/mylist.gif" width="300" alt="Welcome Flow">
  <br><b>내 일기 검색 플로우</b>
</div> -->
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./src/assets/readme_imgs/diary/mylist_after.jpeg" width="300"/>
        <br/><b>일기 저장 후 내 일기 달력</b>
      </td>
      <td align="center">
        <img src="./src/assets/readme_imgs/diary/mylist.gif" width="300" alt="Welcome Flow">
        <br><b>내 일기 검색 플로우</b>
      </td>
    </tr>
  </table>
</div>

**주요 기능**:
- **달력 뷰**: 월별 달력에서 일기 및 감정 작성 여부 시각적 표시
- **감정 아이콘 표시** : 감정만 등록 혹은 기존 일기 삭제 시 아이콘 백그라운드 반투명 및 테두리 점선 처리
- **일기 검색**: 특정 날짜 클릭 시 해당 날짜 일기 조회
- **감정별 필터링**: 감정 아이콘으로 일기 분류
- **일기 요약**: 카드 형태로 일기 제목, 감정, 작성 시간 표시

#### 📝 일기 상세 및 댓글
<div align="center">
  <img src="./src/assets/readme_imgs/diary/edit_comment.gif" width="250" alt="Welcome Flow">
  <br><b>일기 수정 및 댓글 기능</b>
</div>
<!-- <p align="center">
  <video width="300" controls>
    <source src="./src/assets/readme_imgs/diary/edit_comment.gif" type="video/mp4">
  </video>
  <br/><b>일기 수정 및 댓글 기능</b>
</p> -->

**주요 기능**:
- **일기 상세 보기**: 전체 일기 내용, 작성자, 날짜, 감정 표시
- **수정/삭제**: 본인 일기일 경우 수정 및 삭제 기능
- **댓글 시스템**: 팔로워와 일기에 대한 댓글 작성
- **공개 설정 변경**: 비공개/공개 전환 가능

### 👥 소셜 기능

#### 📖 친구 일기 목록
<div align="center">
  <img src="./src/assets/readme_imgs/diary/friendlist.PNG" width="300"/>
  <br/><b>친구 일기 목록탭</b>
</div>

**주요 기능**:
- **팔로잉 일기 피드**: 팔로우한 친구들의 오늘 작성된 공개 일기 목록
- **팔로잉 추가**: 헤더 오른쪽의 팔로잉 버튼을 눌러 팔로잉 검색 및 추가 가능


#### 👤 친구 추가/팔로우
<div align="center">
  <img src="./src/assets/readme_imgs/social/add_friend.gif" width="300"/>
  <br/><b>친구 프로필 및 팔로우 기능</b>
</div>

**주요 기능**:
- **친구 검색**: 닉네임으로 친구 검색(카카오 닉네임)
- **프로필 조회**: 친구의 프로필 정보 및 공개 일기 목록
- **팔로우/언팔로우**: 팔로우/팔로잉 버튼으로 상호작용

#### 👥 팔로워/팔로잉 관리
<div align="center">
  <img src="./src/assets/readme_imgs/profile/follow_list.gif" width="300"/>
  <br/><b>팔로워/팔로잉 목록 모달</b>
</div>

**주요 기능**:
- **팔로워 목록**: 나를 팔로우하는 사용자 목록
- **팔로잉 목록**: 내가 팔로우하는 사용자 목록
- **프로필 이동**: 목록에서 친구 프로필로 바로 이동

### 👤 사용자 프로필 화면
<div align="center">
  <img src="./src/assets/readme_imgs/profile/my_profile.jpeg" width="300"/>
  <br/><b>내 프로필 화면</b>
</div>

**주요 기능**:
- **프로필 정보**: 프로필 이미지, 닉네임, 자기소개 표시 및 수정
- **통계 정보**: 팔로워/팔로잉 수, 공개 일기 수 등
- **내 일기 목록**: 작성한 공개 일기들의 목록

### 📊 통계 화면
<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./src/assets/readme_imgs/stats/stat1.PNG" width="250"/><br/>
        <b>감정 통계 (원그래프)</b>
      </td>
      <td align="center">
        <img src="./src/assets/readme_imgs/stats/stat2.PNG" width="250"/><br/>
        <b>연속 기록 스트릭</b>
      </td>
    </tr>
  </table>
</div>

**주요 기능**:
- **감정 분포 차트**: 누적 감정 통계 원그래프
- **연속 기록 스트릭**: 누적 기록을 확인 가능한 연속 기록 통계 시스템
- **목표 설정**: 월별 기록 목표 설정 및 달성률 표시

---

## 🔧 API 주요 명세

### 사용자 인증 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| POST | `/login/kakaoapp` | 카카오 앱 로그인 | WebView 기반 OAuth 구현 |
| GET | `/login/app/user` | 내 프로필 정보 조회 | 로그인 후 사용자 정보 표시 |
| GET | `/login/search/users` | 사용자 검색 | 친구 검색 기능 |

### 메인 화면 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| GET | `/main/app/checkTodayWritten` | 오늘 일기 작성 여부 확인 | 메인 화면 분기 처리 |
| GET | `/main/app/todayDiary` | 오늘 작성한 일기 조회 | 메인 화면 일기 표시 |
| GET | `/main/app/randomDiary` | 랜덤 일기 조회 | 메인 화면 재미 요소 |
| GET | `/main/app/mydiary` | 내 최근 일기 목록 | 메인 화면 하단 일기 목록 |
| GET | `/main/app/diary/followed` | 팔로잉 일기 목록 | 메인 화면 친구 일기 피드 |
| POST | `/main/app/emotionOnly` | 감정만 기록 | 빠른 감정 기록 기능 |
| GET | `/main/app/streak` | 연속 기록 스트릭 | 상단 헤더 스트릭 표시 |
| GET | `/main/app/written-dates` | 작성한 날짜 목록 | 달력 뷰 데이터 |

### 일기 작성 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| POST | `/write/app` | 일기 작성 | 일기 작성 화면 |
| POST | `/write/analyze` | AI 감정 분석 | 일기 작성 후 감정 분석 |
| POST | `/write/upload` | 이미지 업로드 | 일기 작성 시 이미지 첨부 |

### 일기 관리 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| GET | `/detail/:id` | 일기 상세 조회 | 일기 상세 화면 |
| PUT | `/edit/app/:id` | 일기 수정 | 일기 수정 화면 |
| DELETE | `/detail/delete/:id` | 일기 삭제 | 일기 상세 화면 |
| POST | `/detail/app/createComment` | 댓글 작성 | 일기 상세 화면 댓글 |

### 친구/팔로우 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| POST | `/follow/create` | 팔로우 생성 | 친구 프로필 팔로우 |
| DELETE | `/follow/delete` | 팔로우 삭제 | 친구 프로필 언팔로우 |
| GET | `/follow/status` | 팔로우 상태 확인 | 친구 프로필 팔로우 버튼 |
| GET | `/follow/app/followers` | 팔로워 목록 | 프로필 팔로워 모달 |
| GET | `/follow/app/followings` | 팔로잉 목록 | 프로필 팔로잉 모달 |
| GET | `/follow/app/followings/todayDiaries` | 팔로잉 오늘 일기 | 친구 일기 탭 |

### 프로필 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| GET | `/mypage/public/:uid` | 공개 일기 목록 | 사용자 프로필 화면 |
| GET | `/mypage/app/userBio` | 사용자 정보 수정 | 프로필 자기소개 수정 |

### 통계 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| GET | `/stats/app/emotion` | 감정 통계 | 통계 화면 원그래프 |
| GET | `/stats/app/streak` | 스트릭 통계 | 통계 화면 스트릭 |

### 기타 API
| Method | Path | Description | 앱에서의 활용 |
|--------|------|-------------|---------------|
| GET | `/main/emotionAll` | 모든 감정 조회 | 감정 선택 화면 |
| GET | `/main/app/calendar-emotions` | 달력 감정 데이터 | 달력 뷰 감정 표시 |

---
## 🛠 기술 스택 및 협업 도구
- **Frontend**:
  <img src="https://img.shields.io/badge/react_native-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white">
  <img src="https://img.shields.io/badge/React_Navigation-6B52AE?style=for-the-badge&logo=react&logoColor=white">
  <!-- (Redux, Zustand 등) 추가 -->
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

- **Backend**:
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

- **Database**:
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

- **Version Control**:
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

- **Collaboration Tools**:
  <!-- 사용하신 협업 도구 명시 -->
  <img src="https://img.shields.io/badge/NOTION-FFFFFF?style=for-the-badge&logo=notion&logoColor=black">
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">

---

## 📁 프로젝트 폴더 구조
```
📦MoodCloudApp
┣ 📂src
┃ ┣ 📂actions // Redux 액션 및 비동기 요청 함수
┃ ┣ 📂api // API 호출 함수 모듈
┃ ┣ 📂assets // 이미지, 폰트 등 정적 에셋
┃ ┃ ┗ 📂readme_imgs // README용 이미지 및 비디오
┃ ┣ 📂components // 재사용 가능한 UI 컴포넌트 (Atomic Design)
┃ ┃ ┣ 📂atoms // 기본 UI 요소 (버튼, 텍스트, 아이콘 등)
┃ ┃ ┃ ┣ 📂buttons // 버튼 컴포넌트
┃ ┃ ┃ ┣ 📂icons // 아이콘 컴포넌트
┃ ┃ ┃ ┣ 📂inputs // 입력 컴포넌트
┃ ┃ ┃ ┣ 📂TextsAndLabel // 텍스트 및 라벨 컴포넌트
┃ ┃ ┃ ┗ 📂thumbnail // 썸네일 컴포넌트
┃ ┃ ┣ 📂molecules // 분자 단위 컴포넌트
┃ ┃ ┃ ┣ 📂boxes // 박스 컴포넌트
┃ ┃ ┃ ┣ 📂cards // 카드 컴포넌트
┃ ┃ ┃ ┣ 📂filters // 필터 컴포넌트
┃ ┃ ┃ ┣ 📂headers // 헤더 컴포넌트
┃ ┃ ┃ ┣ 📂modals // 모달 컴포넌트
┃ ┃ ┃ ┗ 📂Rows // 행 컴포넌트
┃ ┃ ┣ 📂organisms // 유기체 단위 컴포넌트
┃ ┃ ┃ ┣ 📂Detail // 상세 화면 관련 컴포넌트
┃ ┃ ┃ ┣ 📂main // 메인 화면 관련 컴포넌트
┃ ┃ ┃ ┣ 📂stats // 통계 화면 관련 컴포넌트
┃ ┃ ┃ ┣ 📂TabBar // 탭바 컴포넌트
┃ ┃ ┃ ┗ 📂write // 작성 화면 관련 컴포넌트
┃ ┃ ┗ 📂templates // 화면 단위 템플릿 (Screen 컴포넌트)
┃ ┃   ┣ 📜createDiary.js // 일기 작성 화면
┃ ┃   ┣ 📜DiaryDetail.js // 일기 상세 화면
┃ ┃   ┣ 📜DiaryEdit.js // 일기 수정 화면
┃ ┃   ┣ 📜DiaryList.js // 일기 목록 화면
┃ ┃   ┣ 📜LoginScreen.js // 로그인 화면
┃ ┃   ┣ 📜MainScreen.js // 메인 화면
┃ ┃   ┣ 📜Myprofile.js // 내 프로필 화면
┃ ┃   ┣ 📜StatsTemplate.js // 통계 화면
┃ ┃   ┗ 📜UserProfile.js // 사용자 프로필 화면
┃ ┣ 📂context // React Context API
┃ ┣ 📂hooks // 커스텀 훅
┃ ┣ 📂reducers // Redux 리듀서
┃ ┣ 📂screens // 화면 컴포넌트
┃ ┃ ┗ 📜WelcomeScreens.js // 웰컴 화면
┃ ┣ 📂store // Redux 스토어 설정
┃ ┗ 📂utils // 유틸리티 함수
┣ 📜App.tsx // 앱 진입점
┣ 📜app.config.js // Expo 앱 설정
┣ 📜babel.config.js // Babel 설정
┣ 📜index.js // 앱 시작점
┣ 📜package.json // 프로젝트 의존성
┣ 📜tsconfig.json // TypeScript 설정
┗ 📜README.md // 프로젝트 문서