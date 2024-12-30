# 🔥BonFire
<div align="center">
  <img width="646" alt="image" src="https://github.com/user-attachments/assets/9cfd4739-7ee1-43d5-8c8b-ac756c0f65fd" />
</div>

![Home](https://github.com/user-attachments/assets/44943fae-8999-4ac5-a37c-9d4e79d3f18f)

## 📖 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [팀원 및 팀소개](#팀원-및-팀소개)
3. [주요기능](#주요기능)
4. [적용 기술 및 기술적 의사결정](#적용-기술-및-기술적-의사결정)
5. [Trouble Shooting](#trouble-shooting)
6. [개발기간](#개발기간)
7. [기술스택](#기술스택)
8. [와이어프레임](#와이어프레임)
9. [ERD](#ERD)
10. [프로젝트 파일 구조](#프로젝트-파일-구조)

## 🔥 프로젝트 소개  
캠핑에 따뜻한 불빛을 더하다, **BonFire**  

> ### "가장 따뜻한 캠핑 장소를 손쉽게 찾아보세요."  

**BonFire**는 날씨 데이터를 기반으로 캠핑 장소를 추천하고, 사용자 리뷰와 편의시설 정보를 제공하는 플랫폼입니다.  

이 프로젝트는 캠핑을 사랑하는 사용자들이 최고의 캠핑 경험을 누릴 수 있도록 기획되었습니다.  
사용자는 현재 위치를 기준으로 주변 캠핑장을 빠르게 탐색할 수 있으며, 실시간 날씨와 환경 정보를 바탕으로 최적의 장소를 선택할 수 있습니다.  

캠핑장 리뷰와 좋아요 기능은 사용자 간의 소통을 활성화하며, 만족스러운 캠핑 경험을 공유할 수 있도록 돕습니다. 또한, 캠핑장 주변의 편의시설 정보를 통해 준비를 완벽히 하고 더 편안하고 즐거운 캠핑을 즐길 수 있습니다.  

**BonFire**와 함께 따뜻한 모닥불 같은 추억을 만들어보세요. 🔥

## 팀원 및 팀소개
- 🏋️‍♀️ 건강보다 과제입니다 **안현희**

- 🐇 코딩하는 토끼 **김현지**

- 🔓 낙관적 감자 **박채현**

- 🔧 넥스트 장인 **최강건**

- 🎭 T같은 F **박민준**

| **안현희** | **김현지** | **박채현** | **최강건** | **박민준** |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://avatars.githubusercontent.com/u/86466729?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/86361624?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/182470863?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/144163335?v=4" width="150px"> | <img src="https://avatars.githubusercontent.com/u/144163335?v=4" width="150px"> |
| **팀장** | **팀원** | **팀원** | **팀원** | **팀원** |
| 북마크 기능, 마이페이지 | (소셜)로그인, 회원가입 | 댓글, 상세페이지 | 캠핑 API, 날씨 API 및 관련기능 | 지도 API 및 관련기능  |

## 주요기능

### 회원가입/로그인 및 프로필 수정

- 이메일 및 비밀번호를 통한 계정 생성할 수 있습니다.
- 프로필 이미지 업로드가 가능합니다.

**로그인**
![bonfire-login](https://github.com/user-attachments/assets/a1dc0099-f92d-4907-a2f7-380d7bc6102e)

**마이페이지**
![bonfire-mypage](https://github.com/user-attachments/assets/48f0a8f2-f170-4941-8cb8-372bc05ad685)

### 좋아요
- 캠핑 장소에 좋아요 추가/삭제가 가능합니다.
- 내가 좋아요를 누른 장소 목록 확인할 수 있습니다.

![bonfire-likes](https://github.com/user-attachments/assets/337f319c-abcc-45dd-a5b2-b3d7f923086f)

### 댓글 작성 및 관리
- 장소에 대한 리뷰 댓글 작성 및 수정/삭제가 가능합니다.

![bonfire-comments](https://github.com/user-attachments/assets/68b054b3-5d26-42bc-9031-508a4f66c95a)

### 캠핑 장소 추천
- 지역별 날씨 정보를 기반으로 최적의 캠핑 장소를 제공합니다.
- 캠핑 장소마다의 날씨를 실시간으로 제공합니다. 

![bonfire-recommendations](https://github.com/user-attachments/assets/39b23aed-8de7-4922-8e64-bfcb33d5d594)

### 편의시설 추천           
- 장소 근처 편의시설(마트, 화장실, 주차장 등) 찾아 보여줍니다.
- 특정 필터 조건으로 시설 검색 가능합니다.

![bonfire-near-facilities](https://github.com/user-attachments/assets/5384364d-da0a-47c8-a608-cd7670c26cc5)

## 🚀적용 기술 및 기술적 의사결정

![bonfire-tech](https://github.com/user-attachments/assets/575426e4-f91a-47f5-abde-b323fcde21a5)

### 🔐 소셜 로그인
Google OAuth를 활용하여 사용자에게 간단하고 안전한 로그인 기능을 제공합니다.
이메일 기반 회원가입 및 로그인 외에도 Google 계정을 통해 빠르게 인증할 수 있습니다. Supabase의 보안 정책을 적용해 데이터는 안전하게 처리됩니다.

### ⚛️ Tanstack & Zustand 상태 관리
React 상태 관리를 위해 Tanstack Query와 Zustand를 도입했습니다.
Tanstack Query로 서버 데이터의 효율적인 캐싱과 데이터 패칭을 처리하며,
Zustand를 통해 전역 상태를 간결하게 관리하여 코드의 가독성과 유지보수성을 높였습니다.

### 🗺️ 카카오맵 API 아웃소싱
카카오맵 API를 활용해 스터디 공간 검색 및 지도 기반 탐색 기능을 구현했습니다.
현재 위치 기반 추천과 장소 검색 필터를 통해 사용자가 쉽게 공간을 찾을 수 있습니다.
지도 API와 연동된 상세 정보를 제공하여 사용자 경험을 향상시켰습니다.

### 🗄️ Supabase DB 관리
Supabase를 데이터베이스 및 인증 관리로 사용해 프로젝트의 백엔드를 간소화했습니다.
유저 정보 저장, 북마크 CRUD, 소셜 로그인 등 주요 데이터 관리에 활용됩니다.
Supabase의 강력한 보안 정책으로 데이터를 안전하게 보호하고 효율적으로 관리합니다.

## Trouble Shooting  

### Build 시 모든 페이지가 Dynamic으로 생성되는 오류  

#### ⚙️ 문제 상황 및 원인 분석  
- **문제 상황**:  
  빌드 시 모든 페이지가 동적으로 생성되며, 정적인 HTML 페이지가 생성되지 않는 문제가 발생하였습니다.
  `yarn build` 결과에서 모든 페이지가 `Dynamic`으로 표시되었습니다.  

- **원인 분석**:  
  `fetchSession` 함수가 서버에서 세션 데이터를 가져오는 **비동기 작업**으로 인해 발생한 문제였습니다.
  해당 함수가 실행되는 시점은 **서버 측**이며, Next.js는 데이터를 가져오기 위해 해당 페이지를 **SSR(동적 렌더링)** 방식으로 처리해야 했습니다.
  이로 인해 정적 페이지 생성이 불가능해지고 모든 페이지가 동적으로 렌더링되었습니다.  

#### 🚀 해결 과정
**Header 컴포넌트를 클라이언트 컴포넌트로 선언하였습니다.**

- "use client"를 선언한 컴포넌트는 서버 컴포넌트에서 실행되지 않고, 클라이언트에서만 동작합니다.
클라이언트 컴포넌트 내부에서 useState, useEffect와 같은 클라이언트 전용 상태 관리 로직을 사용해도 서버 렌더링에 영향을 주지 않습니다.
이를 통해 클라이언트에서 특정 데이터를 로드하거나 동적인 UI를 생성하더라도 서버 빌드 프로세스에서 무시되도록 처리하였습니다.

<!-- ### 2번의 로그인 요청

#### ⚙️ 문제 상황 및 원인 분석

(문제 설명)

#### 🚀 해결 과정

(해결 과정) -->

## ⏲️ 개발기간

- 2024.12.20(금) ~ 2024.12.30(월)

## 📚️ 기술스택

### ✔️ Language

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)

### ✔️ Version Control

![Git](https://img.shields.io/badge/GIT-100000?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

### ✔️ IDE

![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

### ✔️ Framework / Library
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

<details>
<summary><b>사용한 라이브러리 목록</b></h4></summary>
<div markdown="1">

- `@hookform/resolvers: ^3.9.1`  
- `@radix-ui/react-dropdown-menu: ^2.1.4`  
- `@radix-ui/react-slot: ^1.1.1`  
- `@shadcn/ui: ^0.0.4`  
- `@supabase/ssr: ^0.5.2`  
- `@supabase/supabase-js: ^2.47.10`  
- `@tanstack/react-query: ^5.62.8`  
- `@tanstack/react-query-devtools: ^5.62.8`  
- `class-variance-authority: ^0.7.1`  
- `clsx: ^2.1.1`  
- `lucide-react: ^0.469.0`  
- `next: 14.2.3`  
- `react: ^18`  
- `react-dom: ^18`  
- `react-hook-form: ^7.54.2`  
- `react-icons: ^5.4.0`  
- `react-kakao-maps-sdk: ^1.1.27`  
- `sweetalert2: ^11.15.2`  
- `swiper: ^11.1.15`  
- `tailwind-merge: ^2.5.5`  
- `tailwindcss-animate: ^1.0.7`  
- `xml2js: ^0.6.2`  
- `zod: ^3.24.1`  
- `zustand: ^5.0.2`

<br>
</div>
</details>

### ✔️ Deploy

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### ✔️ Social Sign-On (SSO)
![Vercel](https://img.shields.io/badge/Google_Auth-4c8bf5?style=for-the-badge&logo=google&logoColor=white)

### ✔️ Database Manage System

![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=49EB7C)

## 🖍️ 와이어프레임
<img width="565" alt="image" src="https://github.com/user-attachments/assets/e97c3152-69cf-4218-ae64-5bcfb8c01b20" />

### 페이지별 와이어프레임

<details>
<summary><b>홈페이지</b></h4></summary>
<div markdown="1">

![Home](https://github.com/user-attachments/assets/ae72cf84-e005-453c-85fe-34aef0cff36a)

<br>
</div>
</details>

<details>
<summary><b>로그인/회원가입</b></h4></summary>
<div markdown="1">

![Auth](https://github.com/user-attachments/assets/41110f7a-40b2-4e9d-af90-9d9de3d7fb2f)

<br>
</div>
</details>

<details>
<summary><b>상세페이지</b></h4></summary>
<div markdown="1">

![DetailPage](https://github.com/user-attachments/assets/b861664f-31d1-403b-ad05-bf40a2c73022)

<br>
</div>
</details>

<details>
<summary><b>마이페이지</b></h4></summary>
<div markdown="1">

![MyPage](https://github.com/user-attachments/assets/85421d5c-4cdd-41d0-98ec-e816b507a32c)

<br>
</div>
</details>


## 📊 ERD
![ERD](https://github.com/user-attachments/assets/5b3b65f1-4d77-4f3c-9d94-f1a2ea752800)

### 프로젝트 ERD 설명

**1. Users 테이블**  
- 사용자 정보를 저장합니다.  
  - `id`: 고유 사용자 식별자 (uuid).  
  - `nickname`: 사용자의 닉네임.  
  - `profile_image`: 사용자의 프로필 이미지 경로.  
  - `created_at`: 계정 생성 시간.  
  - `updated_at`: 계정 정보 수정 시간.  

**2. Comments 테이블**  
- 사용자가 캠핑 장소에 남긴 댓글을 저장합니다.  
  - `id`: 고유 댓글 식별자 (uuid).  
  - `place_name`: 댓글이 달린 장소 이름.  
  - `user_id`: 댓글 작성자 ID (users 테이블의 `id`와 연관).  
  - `content`: 댓글 내용.  
  - `created_at`: 댓글 작성 시간.  
  - `updated_at`: 댓글 수정 시간.  

**3. Likes 테이블**  
- 사용자가 좋아요를 표시한 캠핑 장소를 저장합니다.  
  - `id`: 고유 좋아요 식별자 (uuid).  
  - `user_id`: 좋아요를 누른 사용자 ID (users 테이블의 `id`와 연관).  
  - `place_image`: 장소의 이미지 경로.  
  - `place_name`: 좋아요 표시된 장소 이름.  
  - `address_name`: 장소의 주소.  
  - `phone_number`: 장소의 전화번호.  
  - `location_x`, `location_y`: 장소의 지리적 좌표.  

**연관 관계 (Foreign Key Relationship)**  
- `users.id`와 `comments.user_id`, `likes.user_id`가 외래 키로 연결되어 있습니다.  
- 사용자와 댓글 및 좋아요 간의 관계를 정의하며, 특정 사용자와 그가 남긴 댓글 또는 좋아요를 추적할 수 있습니다.  


## 프로젝트 파일 구조

```
BONFIRE/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/callback/
│   │   ├── detail/
│   │   │   └── [id]/
│   │   ├── login/
│   │   ├── mypage/
│   │   └── signup/
│   ├── components/
│   │   ├── camping/
│   │   ├── common/
│   │   ├── detail/
│   │   ├── layout/
│   │   ├── login/
│   │   ├── map/
│   │   ├── mypage/
│   │   └── weather/
│   ├── hooks/
│   │   ├── camping/
│   │   ├── comment/
│   │   ├── like/
│   │   ├── map/
│   │   ├── mypage/
│   │   └── weather/
│   ├── utils/
│   │   ├── likes/
│   │   ├── map/
│   │   └── supabase/
│   ├── lib/
│   ├── providers/
│   ├── store/
│   ├── styles/
│   ├── types/
│   └── validations/
│       └── middleware.ts
└── README.md
``` 
<details>
<summary><b>프로젝트 디렉토리 구조 세부 설명</b></h4></summary>
<div markdown="1">

- `public/` : 정적 파일을 저장하는 폴더 (이미지, favicon 등).  
- `src/` : 소스 코드와 관련된 모든 파일을 포함하는 폴더.  
  - `app/` : 애플리케이션의 주요 페이지와 라우트를 관리합니다.  
    - `api/auth/callback/` : 인증 콜백을 처리하는 API 관련 파일.  
    - `detail/[id]/` : 특정 캠핑 장소의 상세 페이지.   
    - `login/` : 로그인 페이지.  
    - `mypage/` : 사용자 마이페이지.  
    - `signup/` : 회원가입 페이지.
  - `components/`: 프로젝트에 사용되는 UI 컴포넌트를 관리합니다.  
    - `camping/`: 캠핑 관련 컴포넌트.  
    - `common/`: 공통으로 사용하는 컴포넌트.  
    - `detail/` : 상세 페이지 관련 컴포넌트.  
    - `layout/` : 레이아웃과 관련된 컴포넌트.  
    - `login/` : 로그인 페이지의 UI 컴포넌트.  
    - `map/` : 지도 관련 UI 컴포넌트.  
    - `mypage/` : 마이페이지 관련 컴포넌트.  
    - `weather/` : 날씨 정보를 보여주는 컴포넌트.  
  - `hooks/` : 커스텀 훅스를 관리합니다.  
    - `camping/` : 캠핑 관련 데이터를 처리하는 훅스.  
    - `comment/` : 댓글 데이터를 처리하는 훅스.  
    - `like/`: 좋아요 관련 데이터를 처리하는 훅스.  
    - `map/`: 지도 데이터를 처리하는 훅스.  
    - `mypage/`: 마이페이지 데이터 처리를 위한 훅스.  
    - `weather/`: 날씨 데이터를 가져오는 훅스.  
  - `utils/` : 유틸리티 함수들을 저장합니다.  
    - `likes/`: 좋아요 기능 관련 함수들.  
    - `map/`: 지도 데이터를 처리하는 함수들.  
    - `supabase/`: Supabase와 관련된 기능들을 처리하는 함수들.  
  - `lib/`: 외부 라이브러리와 관련된 코드.  
  - `providers/`: 앱의 상태나 서비스 제공자를 설정하는 파일.  
  - `store/`: Zustand나 Redux 등 상태 관리를 위한 스토어 설정.  
  - `styles/`: 프로젝트의 스타일 관련 파일(CSS, SCSS 등).  
  - `types/`: TypeScript 타입 정의 파일.  
  - `validations/`: 데이터 검증과 관련된 파일 (e.g., `middleware.ts`).  

<br>
</div>
</details>


