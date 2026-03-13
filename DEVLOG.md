# DB Study 개발일지

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | DB Study — 데이터베이스와 SQL 학습 사이트 |
| **URL** | https://db-study.dreamitbiz.com/ |
| **GitHub** | https://github.com/aebonlee/db-study |
| **기술 스택** | React 19 + Vite 7 + React Router DOM 7 |
| **개발 기간** | 2026-03-14 |
| **배포 방식** | GitHub Pages + GitHub Actions CI/CD |

---

## 2026-03-14 (Day 1-2) — "DB 서비스 종류" 메뉴 추가

### 추가 배경
DB 개론 메뉴 옆에 다양한 데이터베이스 서비스 종류를 학습할 수 있는 새로운 메뉴 섹션을 추가.

### 생성 파일 (5개 페이지)

| 파일 | 페이지 | 내용 |
|------|--------|------|
| `DbServices.jsx` | 목차 | 4개 서비스 카드 그리드 |
| `RdbmsCompare.jsx` | 관계형 DB 비교 | MySQL, PostgreSQL, Oracle, SQL Server, SQLite 특징/장단점/선택 가이드 |
| `NoSqlDb.jsx` | NoSQL 데이터베이스 | 문서형(MongoDB), 키-값형(Redis), 컬럼형(Cassandra), 그래프형(Neo4j) |
| `CloudDb.jsx` | 클라우드 DB 서비스 | AWS RDS/Aurora/DynamoDB, GCP Cloud SQL/Spanner, Azure, Firebase vs Supabase, 서버리스 DB |
| `NewSqlDb.jsx` | NewSQL & 특수목적 DB | CockroachDB, TimescaleDB, Elasticsearch, 벡터 DB(Pinecone, pgvector), Polyglot Persistence |

### 수정 파일 (4개)

| 파일 | 변경 내용 |
|------|-----------|
| `site.js` | menuItems에 "DB 서비스 종류" 드롭다운 메뉴 추가, footerLinks에 링크 추가 |
| `translations.js` | ko/en 번역 키 추가 (services, rdbmsCompare, nosql, cloudDb, newsql) |
| `PublicLayout.jsx` | 5개 라우트 추가 (/services, /services/rdbms-compare, /services/nosql, /services/cloud-db, /services/newsql) |
| `Home.jsx` | "DB 서비스 종류" 카드 섹션 추가 (DB 개론과 SQL 커리큘럼 사이) |

### 메뉴 구조 변경
```
홈 | DB 개론 ▼ | DB 서비스 종류 ▼ | SQL 학습 ▼ | 참고자료
               ├ 관계형 DB 비교
               ├ NoSQL 데이터베이스
               ├ 클라우드 DB 서비스
               └ NewSQL & 특수목적 DB
```

---

## 2026-03-14 (Day 1-1) — 프로젝트 생성 및 전체 사이트 완성

### 1단계: 프로젝트 인프라 구축

**생성 파일:**
- `package.json` — React 19.2, Vite 7.3.1, React Router DOM 7.13 의존성 설정
- `vite.config.js` — Vite 빌드 설정, 404.html 복사 플러그인 (SPA GitHub Pages 지원)
- `index.html` — Open Graph 메타 태그 포함 (og:url, og:title, og:description, og:type, og:image, og:site_name)
- `public/favicon.svg` — 파란색 둥근 사각형에 "DB" 텍스트 아이콘
- `public/og-image.svg` — 1200×630 OG 이미지 (그라데이션 배경 + "DB Study" 타이틀)
- `public/CNAME` — 커스텀 도메인 `db-study.dreamitbiz.com`
- `.gitignore` — node_modules, dist 등 제외

**설계 결정:**
- 기존 koreatech 컴퓨팅사고 사이트와 동일한 아키텍처 채택
- Supabase 인증, 검색 모달, 토스트 등 불필요한 기능 제거 (순수 학습 사이트)
- React.lazy + Suspense로 전 페이지 코드 스플리팅 적용

### 2단계: 컨텍스트, 훅, 유틸리티, 설정 파일

**생성 파일:**
- `src/contexts/ThemeContext.jsx` — 다크/라이트/자동 모드 + 5색 테마 (blue/red/green/purple/orange)
- `src/contexts/LanguageContext.jsx` — 한국어/영어 전환, 도트 표기법 번역 함수
- `src/utils/translations.js` — ko/en 번역 리소스
- `src/config/site.js` — 브랜드, 메뉴 구조 (DB 개론 2항목 + SQL 12장 + 참고자료), 푸터 링크
- `src/components/SEOHead.jsx` — 페이지별 OG 메타 태그 동적 설정 (카카오 디버거 호환)
- `src/hooks/useAOS.js` — IntersectionObserver 기반 스크롤 애니메이션
- `src/hooks/useCodeCopy.js` — 코드 블록 자동 복사 버튼 생성
- `src/hooks/useTableScroller.js` — 테이블 가로 스크롤 화살표 UI

### 3단계: CSS 스타일 (8개 파일)

**생성 파일:**
- `src/styles/base.css` — CSS 변수, 리셋, 타이포그래피, 컴포넌트 기본 스타일
- `src/styles/navbar.css` — 글라스모피즘 네비게이션 바
- `src/styles/hero.css` — 히어로 섹션 그라데이션 + 애니메이션
- `src/styles/footer.css` — 푸터 레이아웃
- `src/styles/animations.css` — 트랜지션, 키프레임 애니메이션
- `src/styles/site.css` — 레슨 페이지 전용 (code-block, lesson-table, callout-box, exercise-box, lesson-nav)
- `src/styles/dark-mode.css` — 다크 모드 변수 오버라이드
- `src/styles/responsive.css` — 반응형 미디어 쿼리 (768px, 480px 분기점)

### 4단계: 레이아웃 및 페이지 컴포넌트 (18개 파일)

**레이아웃/공통:**
- `src/components/layout/Navbar.jsx` — 드롭다운 메뉴, 테마 전환, 색상 선택, 언어 전환
- `src/components/layout/Footer.jsx` — 브랜드, 퀵 링크, 저작권
- `src/layouts/PublicLayout.jsx` — 라우트 정의 (17개 라우트)

**페이지 컴포넌트:**

| 파일 | 페이지 | 내용 |
|------|--------|------|
| `Home.jsx` | 메인 | 히어로, DB 소개, DB 개론 카드 2개, SQL 커리큘럼 카드 12개 |
| `WhatIsDB.jsx` | DB 개론 1 | DB 정의/특징, 파일 시스템 vs DB, DBMS, 발전 역사, DB 모델 |
| `RDBMS.jsx` | DB 개론 2 | 관계형 모델 용어, 테이블 구조, 키, 관계(1:1/1:N/M:N), SQL 개요, ACID |
| `SqlLesson.jsx` | SQL 목차 | 12장 커리큘럼 그리드 |
| `SqlChapter1.jsx` | 1장 | MySQL 설치, DBeaver 설정, 샘플 DB(school) 구축 |
| `SqlChapter2.jsx` | 2장 | SELECT, FROM, *, 컬럼 선택, AS 별칭, DISTINCT, NULL |
| `SqlChapter3.jsx` | 3장 | WHERE, 비교/논리 연산자, BETWEEN, IN, LIKE 패턴 |
| `SqlChapter4.jsx` | 4장 | ORDER BY (ASC/DESC), 다중 정렬, LIMIT, OFFSET, 페이징 |
| `SqlChapter5.jsx` | 5장 | 문자열/숫자/날짜 함수, CASE 표현식, IFNULL/COALESCE |
| `SqlChapter6.jsx` | 6장 | COUNT/SUM/AVG/MIN/MAX, GROUP BY, HAVING |
| `SqlChapter7.jsx` | 7장 | INSERT, UPDATE, DELETE, 안전한 DML 패턴 |
| `SqlChapter8.jsx` | 8장 | 자료형, CREATE TABLE, 제약 조건, ALTER, DROP, FK 옵션 |
| `SqlChapter9.jsx` | 9장 | INNER/LEFT/RIGHT/CROSS/Self JOIN, 다중 테이블 JOIN |
| `SqlChapter10.jsx` | 10장 | WHERE/스칼라/인라인 뷰 서브쿼리, 상관 서브쿼리, EXISTS |
| `SqlChapter11.jsx` | 11장 | 윈도우 함수(ROW_NUMBER/RANK/LAG), CTE, 뷰, 인덱스 |
| `SqlChapter12.jsx` | 12장 | 데이터 모델링, ERD, 정규화(1NF/2NF/3NF), 트랜잭션/ACID |
| `References.jsx` | 참고자료 | 공식 문서, 학습 사이트, DB 도구, 추천 도서, 실습 환경 |
| `NotFound.jsx` | 404 | 페이지 없음 안내 |

### 5단계: 빌드, Git 초기화, 배포

- `npm install` — 69개 패키지 설치 (0 취약점)
- `npm run build` — 프로덕션 빌드 성공 (1.91초)
  - 총 빌드 크기: CSS 84.5KB + JS 247KB (gzip: 14.9KB + 79.4KB)
  - 16개 페이지 각각 별도 청크로 코드 스플리팅
- Git 초기화 → `origin` 리모트 연결 → 커밋 및 푸시 완료
- `.github/workflows/deploy.yml` — GitHub Actions CI/CD 파이프라인 구성

---

## 아키텍처

```
src/
├── main.jsx                    # 앱 진입점
├── App.jsx                     # ThemeProvider > LanguageProvider > Router
├── index.css                   # CSS 임포트 허브
├── config/
│   └── site.js                 # 사이트 설정 (메뉴, 브랜드, 링크)
├── contexts/
│   ├── ThemeContext.jsx         # 테마 상태 관리
│   └── LanguageContext.jsx      # 언어 상태 관리
├── hooks/
│   ├── useAOS.js               # 스크롤 애니메이션
│   ├── useCodeCopy.js          # 코드 복사 버튼
│   └── useTableScroller.js     # 테이블 스크롤 화살표
├── components/
│   ├── SEOHead.jsx             # OG 메타 태그
│   └── layout/
│       ├── Navbar.jsx          # 네비게이션 바
│       └── Footer.jsx          # 푸터
├── layouts/
│   └── PublicLayout.jsx        # 라우팅 + 레이아웃
├── pages/
│   ├── Home.jsx                # 메인 페이지
│   ├── WhatIsDB.jsx            # DB 개론 1
│   ├── RDBMS.jsx               # DB 개론 2
│   ├── SqlLesson.jsx           # SQL 목차
│   ├── SqlChapter1~12.jsx      # SQL 12개 장
│   ├── References.jsx          # 참고자료
│   └── NotFound.jsx            # 404
├── styles/
│   ├── base.css                # 기본 스타일
│   ├── navbar.css              # 네비게이션
│   ├── hero.css                # 히어로 섹션
│   ├── footer.css              # 푸터
│   ├── animations.css          # 애니메이션
│   ├── site.css                # 레슨 페이지
│   ├── dark-mode.css           # 다크 모드
│   └── responsive.css          # 반응형
└── utils/
    └── translations.js         # 다국어 번역
```

## 주요 기능

- **5색 테마**: 블루, 레드, 그린, 퍼플, 오렌지
- **다크/라이트/자동 모드**: 시스템 설정 연동
- **한국어/영어 전환**: 즉시 전환, 로컬스토리지 저장
- **글라스모피즘 UI**: 반투명 배경 + backdrop-filter
- **코드 블록 복사**: 원클릭 코드 복사
- **스크롤 애니메이션**: IntersectionObserver 기반 fade-up
- **Open Graph 메타 태그**: 카카오톡/페이스북/트위터 공유 미리보기
- **SPA 404 핸들링**: GitHub Pages에서 클라이언트 사이드 라우팅 지원
- **코드 스플리팅**: 16개 페이지 lazy loading으로 초기 로드 최적화

## 배포 설정

- **호스팅**: GitHub Pages
- **CI/CD**: GitHub Actions (main 브랜치 push 시 자동 빌드 & 배포)
- **커스텀 도메인**: db-study.dreamitbiz.com (CNAME 파일)
- **빌드 도구**: Vite 7.3.1
- **Node.js**: v22
