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

## 2026-03-14 (Day 1-8) — 홈 메뉴 삭제, 교육신청 메뉴 추가, 푸터 리디자인

### 변경 내용

#### 1. 네비게이션 "홈" 메뉴 삭제
- `site.js` menuItems에서 `{ path: '/', labelKey: 'nav.home' }` 항목 제거
- footerLinks에서도 홈 링크 제거
- 로고 클릭으로 홈 이동 가능하므로 별도 메뉴 불필요

#### 2. "교육신청" 메뉴 및 페이지 추가
- **참고**: https://html.dreamitbiz.com 교육신청 페이지 디자인
- 네비게이션 마지막에 "교육신청" 메뉴 추가 (`/training`)

| 파일 | 변경 내용 |
|------|-----------|
| `Training.jsx` | 신규 — 4개 과정 카드(바이브코딩 기초/UI·UX/풀스택AI/맞춤과정) + 교육 문의 연락처 |
| `site.js` | menuItems/footerLinks에 training 추가 |
| `translations.js` | ko: '교육신청', en: 'Apply' 추가 |
| `PublicLayout.jsx` | Training lazy import + `/training` 라우트 추가 |
| `site.css` | training-grid, training-card, training-badge, training-contact 등 CSS 추가 |

#### 3. 푸터 리디자인
- **참고**: https://html.dreamitbiz.com 푸터 디자인
- 2열 구조(브랜드+링크) → 3열 구조(브랜드+연락처+바로가기)로 변경
- 연락처 정보 추가 (이메일, 전화, 카카오톡, 운영시간)
- Family Site 드롭다운 추가
- 하단 사업자 정보 추가 (사업자등록번호, 통신판매신고번호, 출판사 신고번호)

| 파일 | 변경 내용 |
|------|-----------|
| `Footer.jsx` | 3열 구조로 전면 재작성 |
| `footer.css` | footer-quick-links 스타일 추가 |

---

## 2026-03-14 (Day 1-7) — SQL 챕터 번호 형식 변경

### 변경 내용
SQL 하위 메뉴 및 페이지 제목의 번호 형식을 `X장` → `0X.`으로 변경.

| 위치 | 변경 전 | 변경 후 |
|------|---------|---------|
| 네비게이션 메뉴 (ko) | 1장. 환경 구축 | 01. 환경 구축 |
| 네비게이션 메뉴 (en) | Ch.1 Setup | 01. Setup |
| SQL 목차 페이지 | 1장 | 01. |
| 홈 카드 | 1장 | 01. |
| 각 챕터 페이지 h1 | 1장. ~ 12장. | 01. ~ 12. |

수정 파일: `translations.js`, `SqlLesson.jsx`, `Home.jsx`, `SqlChapter1~12.jsx` (총 15개)

---

## 2026-03-14 (Day 1-6) — DB 튜닝 / Oracle 튜닝 목차 페이지 디자인 개선

### 변경 배경
`/tuning`(DB 튜닝 MySQL)과 `/oracle`(Oracle SQL 튜닝) 두 목차 페이지가 기본 카드 그리드만 사용하고 있어, 학습 흐름이 한눈에 보이지 않았음. 박스형 카드 디자인으로 전면 개선.

### 디자인 변경 내용

#### 공통 추가 요소
- **학습 흐름 오버뷰 바**: 상단에 단계별 아이콘+제목을 화살표로 연결한 수평 플로우 바 추가
- **박스형 카드 리스트**: 기존 정사각형 그리드 → 가로형 카드 리스트로 변경
  - Step/Day 뱃지, 아이콘, 제목/설명, 키워드 태그, 호버 화살표 포함
- **키워드 태그**: 각 카드에 핵심 키워드 태그 표시 (pill 스타일)
- **상호 링크**: DB 튜닝 → Oracle 튜닝 안내, Oracle 튜닝 → DB 튜닝 안내

#### 수정 파일

| 파일 | 변경 내용 |
|------|-----------|
| `DbTuning.jsx` | 오버뷰 플로우 바 + 5개 박스형 카드(Step 1-5) + Oracle 튜닝 안내 callout |
| `OracleTuning.jsx` | 오버뷰 플로우 바 + 5개 박스형 카드(Day 1-5) + MySQL 튜닝 안내 callout + Oracle 튜닝의 본질 callout |
| `site.css` | ~140줄 CSS 추가 (tuning-overview, tuning-card-box, tuning-tag, 다크모드, 반응형) |

#### 새로 추가된 CSS 클래스
- `.tuning-overview` — 수평 플로우 바 컨테이너
- `.tuning-overview-item` / `.tuning-overview-arrow` — 단계 아이템과 화살표
- `.tuning-cards-list` — 세로 카드 리스트 컨테이너
- `.tuning-card-box` — 가로형 카드 (호버 시 그림자+화살표 애니메이션)
- `.tuning-card-step` — 파란 pill 뱃지 (Step/Day)
- `.tuning-card-tags` / `.tuning-tag` — 키워드 태그
- 다크모드 및 모바일 반응형 스타일 포함

---

## 2026-03-14 (Day 1-5) — "Oracle SQL 튜닝" 메뉴 추가

### 추가 배경
BNK 부산은행 Oracle SQL 튜닝 과정(5일 40시간) 학습 자료를 기반으로, Oracle 환경에서의 SQL 튜닝을 체계적으로 학습할 수 있는 별도 메뉴 섹션 추가. 기존 MySQL 튜닝 메뉴는 그대로 유지.

### 생성 파일 (6개 페이지)

| 파일 | 페이지 | 내용 |
|------|--------|------|
| `OracleTuning.jsx` | 목차 | 5개 Oracle 튜닝 학습 카드, 학습 로드맵, MySQL과의 차이점 |
| `OracleSqlProcessing.jsx` | SQL 처리 구조와 I/O | Parse→Bind→Execute→Fetch, Hard/Soft Parse, SGA/PGA, Buffer Cache, 실행계획 기초, 조건절 튜닝(함수 제거, OR→UNION ALL, NOT IN→NOT EXISTS), B-Tree 인덱스 |
| `OracleExecutionPlan.jsx` | 실행계획과 옵티마이저 | DBMS_XPLAN 상세 활용, 실행계획 읽는 규칙, 수치 진단, 커서 공유/Shared Pool, 서브쿼리 튜닝(IN→EXISTS→JOIN, 스칼라→JOIN), Oracle 힌트(INDEX/FULL/LEADING/USE_NL/USE_HASH), 파티셔닝 |
| `OracleIndexStrategy.jsx` | 인덱스 전략과 조인 튜닝 | 복합 인덱스 선두 컬럼, Function-Based Index, Index Skip Scan, 인덱스 유지보수(REBUILD), NL/Hash/Merge Join 상세, OUTER JOIN 주의사항, V$SQL 비효율 SQL 탐지 |
| `OracleAwrAnalysis.jsx` | AWR 분석과 성능 진단 | AWR 리포트 생성/해석, DBA_HIST_SQLSTAT, DBMS_STATS 통계 수집, 히스토그램(FREQUENCY/HEIGHT BALANCED/TOP-FREQUENCY), Wait Event 기초, Lock 진단(V$SESSION/V$LOCK), 인덱스 유지보수, 튜닝 리포트 작성법 |
| `OracleParallelWait.jsx` | 병렬처리와 Wait Event | Parallel Query 구조(QC+PX), DOP, 병렬 실행계획 해석, PX 모니터링, Wait Class 분류, Wait Event 대응(db file sequential read, enq:TX), 종합 튜닝 전략 정리, 실전 연습 문제 |

### 수정 파일 (4개)

| 파일 | 변경 내용 |
|------|-----------|
| `site.js` | menuItems에 "Oracle 튜닝" 드롭다운 메뉴 추가 (5개 항목), footerLinks에 링크 추가 |
| `translations.js` | ko/en 번역 키 추가 (oracle, oracleSqlProcessing, oracleExecutionPlan, oracleIndexStrategy, oracleAwrAnalysis, oracleParallelWait) |
| `PublicLayout.jsx` | 6개 lazy import + 6개 라우트 추가 (/oracle/*) |
| `Home.jsx` | "Oracle SQL 튜닝" 카드 섹션 추가 (DB 튜닝과 SQL 커리큘럼 사이, 3열 그리드) |

### 메뉴 구조 변경
```
홈 | DB 개론 ▼ | DB 서비스 종류 ▼ | DB 웹 연동 ▼ | SQL 학습 ▼ | DB 튜닝 ▼ | Oracle 튜닝 ▼ | 참고자료
                                                                              ├ SQL 처리 구조와 I/O
                                                                              ├ 실행계획과 옵티마이저
                                                                              ├ 인덱스 전략과 조인
                                                                              ├ AWR 분석과 성능 진단
                                                                              └ 병렬처리와 Wait Event
```

### 빌드 결과
- 총 47개 청크로 코드 스플리팅 (6개 Oracle 튜닝 페이지 추가)
- 빌드 시간: 2.21초

---

## 2026-03-14 (Day 1-4) — "DB 튜닝" 메뉴 추가

### 추가 배경
BNK SQL 튜닝 학습 자료를 기반으로, DB 성능 분석과 최적화를 체계적으로 학습할 수 있는 메뉴 섹션 추가.

### 생성 파일 (6개 페이지)

| 파일 | 페이지 | 내용 |
|------|--------|------|
| `DbTuning.jsx` | 목차 | 5개 튜닝 학습 카드 그리드 |
| `ExplainAnalysis.jsx` | 실행 계획 분석 | EXPLAIN 컬럼 해석, type 성능 순서, Extra 주의사항, EXPLAIN ANALYZE, SHOW PROFILE, 슬로우 쿼리 로그 |
| `IndexTuning.jsx` | 인덱스 튜닝 | B-Tree 구조, 인덱스 종류, 복합 인덱스 최좌선 원칙, 커버링 인덱스, 인덱스 무시 안티패턴 |
| `SqlTuning.jsx` | SQL 튜닝 기법 | Sargable 쿼리, JOIN 최적화, 서브쿼리→JOIN 변환, 커서 기반 페이징, COUNT/ORDER BY 최적화, 안티패턴 |
| `ServerTuning.jsx` | DB 서버 튜닝 | InnoDB Buffer Pool, flush_log_at_trx_commit, 커넥션 관리, 세션 버퍼, 모니터링 쿼리, my.cnf 예시 |
| `TuningCaseStudy.jsx` | 튜닝 실전 사례 | 5단계 프로세스, Before/After 5개 사례(게시판/통계/페이징/날짜함수/락), 종합 체크리스트 |

### 수정 파일 (4개)

| 파일 | 변경 내용 |
|------|-----------|
| `site.js` | menuItems에 "DB 튜닝" 드롭다운 메뉴 추가 (5개 항목), footerLinks에 링크 추가 |
| `translations.js` | ko/en 번역 키 추가 (tuning, tuningExplain, tuningIndex, tuningSql, tuningServer, tuningCase) |
| `PublicLayout.jsx` | 6개 lazy import + 6개 라우트 추가 (/tuning/*) |
| `Home.jsx` | "DB 튜닝" 카드 섹션 추가 (DB 웹 연동과 SQL 커리큘럼 사이, 3열 그리드) |

### 메뉴 구조 변경
```
홈 | DB 개론 ▼ | DB 서비스 종류 ▼ | DB 웹 연동 ▼ | SQL 학습 ▼ | DB 튜닝 ▼ | 참고자료
                                                               ├ 실행 계획 분석
                                                               ├ 인덱스 튜닝
                                                               ├ SQL 튜닝 기법
                                                               ├ DB 서버 튜닝
                                                               └ 튜닝 실전 사례
```

---

## 2026-03-14 (Day 1-3) — "DB 웹 연동" 메뉴 추가

### 추가 배경
웹 애플리케이션과 데이터베이스를 연동하는 실무 기술을 체계적으로 학습할 수 있도록 새로운 메뉴 섹션 추가.

### 생성 파일 (7개 페이지)

| 파일 | 페이지 | 내용 |
|------|--------|------|
| `WebIntegration.jsx` | 목차 | 6개 학습 카드 그리드 |
| `WebArchitecture.jsx` | 웹-DB 연동 구조 | 3-tier 아키텍처, REST API, HTTP 메서드, DB 드라이버, 커넥션 풀 |
| `NodeMysql.jsx` | Node.js + MySQL | Express.js + mysql2, 커넥션 풀 설정, CRUD API, 검색/필터/페이지네이션 |
| `PythonDb.jsx` | Python + DB | Flask + PyMySQL, FastAPI + aiomysql, SQLAlchemy ORM, Flask vs FastAPI 비교 |
| `OrmQueryBuilder.jsx` | ORM과 쿼리빌더 | Raw SQL vs 쿼리빌더 vs ORM, Prisma/Sequelize/TypeORM/SQLAlchemy 비교, N+1 문제 |
| `AuthSecurity.jsx` | 인증과 보안 | SQL Injection 원리/방지, bcrypt 해싱, 세션 vs JWT 인증, 보안 체크리스트 |
| `DeployOps.jsx` | 배포와 운영 | 환경 분리, 마이그레이션(Prisma/수동), mysqldump 백업/복원, 모니터링, CI/CD, 성능 최적화 |

### 수정 파일 (4개)

| 파일 | 변경 내용 |
|------|-----------|
| `site.js` | menuItems에 "DB 웹 연동" 드롭다운 메뉴 추가 (6개 항목), footerLinks에 링크 추가 |
| `translations.js` | ko/en 번역 키 추가 (webIntegration, webArchitecture, nodeMysql, pythonDb, orm, authSecurity, deploy) |
| `PublicLayout.jsx` | 7개 lazy import + 7개 라우트 추가 (/web, /web/architecture, /web/node-mysql, /web/python-db, /web/orm, /web/auth-security, /web/deploy) |
| `Home.jsx` | "DB 웹 연동" 카드 섹션 추가 (DB 서비스 종류와 SQL 커리큘럼 사이, 3열 그리드) |

### 메뉴 구조 변경
```
홈 | DB 개론 ▼ | DB 서비스 종류 ▼ | DB 웹 연동 ▼ | SQL 학습 ▼ | 참고자료
                                   ├ 웹-DB 연동 구조
                                   ├ Node.js + MySQL
                                   ├ Python + DB
                                   ├ ORM과 쿼리빌더
                                   ├ 인증과 보안
                                   └ 배포와 운영
```

### 빌드 결과
- 총 35개 청크로 코드 스플리팅 (7개 웹연동 페이지 추가)
- 빌드 시간: 2.05초

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
│   ├── DbServices.jsx          # DB 서비스 목차
│   ├── RdbmsCompare.jsx        # 관계형 DB 비교
│   ├── NoSqlDb.jsx             # NoSQL
│   ├── CloudDb.jsx             # 클라우드 DB
│   ├── NewSqlDb.jsx            # NewSQL & 특수목적 DB
│   ├── WebIntegration.jsx      # DB 웹 연동 목차
│   ├── WebArchitecture.jsx     # 웹-DB 연동 구조
│   ├── NodeMysql.jsx           # Node.js + MySQL
│   ├── PythonDb.jsx            # Python + DB
│   ├── OrmQueryBuilder.jsx     # ORM과 쿼리빌더
│   ├── AuthSecurity.jsx        # 인증과 보안
│   ├── DeployOps.jsx           # 배포와 운영
│   ├── DbTuning.jsx            # MySQL 튜닝 목차
│   ├── ExplainAnalysis.jsx     # 실행 계획 분석 (MySQL)
│   ├── IndexTuning.jsx         # 인덱스 튜닝 (MySQL)
│   ├── SqlTuning.jsx           # SQL 튜닝 기법 (MySQL)
│   ├── ServerTuning.jsx        # DB 서버 튜닝 (MySQL)
│   ├── TuningCaseStudy.jsx     # 튜닝 실전 사례 (MySQL)
│   ├── OracleTuning.jsx        # Oracle 튜닝 목차
│   ├── OracleSqlProcessing.jsx # SQL 처리 구조와 I/O
│   ├── OracleExecutionPlan.jsx # 실행계획과 옵티마이저
│   ├── OracleIndexStrategy.jsx # 인덱스 전략과 조인
│   ├── OracleAwrAnalysis.jsx   # AWR 분석과 성능 진단
│   ├── OracleParallelWait.jsx  # 병렬처리와 Wait Event
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
