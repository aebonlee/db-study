import{j as s,L as e}from"./index-7qo320fS.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"웹-DB 연동 구조"}),s.jsx("p",{children:"클라이언트-서버 아키텍처, REST API, 3계층 구조"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"웹 애플리케이션에서 데이터베이스가 어떻게 연결되는지 전체 구조를 이해한다."}),s.jsx("li",{children:"3계층 아키텍처(프레젠테이션, 비즈니스 로직, 데이터)를 파악한다."}),s.jsx("li",{children:"REST API의 개념과 HTTP 메서드를 이해한다."}),s.jsx("li",{children:"커넥션 풀과 DB 드라이버의 역할을 파악한다."})]})]}),s.jsx("h2",{children:"1. 웹과 데이터베이스의 관계"}),s.jsx("h3",{children:"1.1 왜 웹에서 DB가 필요한가?"}),s.jsxs("p",{children:["웹 애플리케이션은 사용자의 데이터를 ",s.jsx("strong",{children:"영구적으로 저장"}),"하고 ",s.jsx("strong",{children:"다시 불러와야"})," 합니다. 회원 정보, 게시글, 주문 내역, 설정 등 모든 데이터는 데이터베이스에 저장되고, 웹 서버를 통해 클라이언트(브라우저)에 전달됩니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"웹-DB 연동 전체 흐름"}),s.jsx("pre",{children:s.jsx("code",{children:`[브라우저/앱]          [웹 서버]              [데이터베이스]
(클라이언트)          (백엔드)               (MySQL, PostgreSQL 등)

  사용자가            서버가 요청을           DB에서 데이터를
  버튼 클릭           받아서 처리             읽기/쓰기
     │                   │                      │
     │  ① HTTP 요청      │                      │
     │  GET /api/users   │                      │
     │──────────────────►│                      │
     │                   │  ② SQL 쿼리 실행      │
     │                   │  SELECT * FROM users  │
     │                   │─────────────────────►│
     │                   │                      │
     │                   │  ③ 결과 반환          │
     │                   │◄─────────────────────│
     │  ④ JSON 응답      │                      │
     │  [{name: "홍길동"}]│                      │
     │◄──────────────────│                      │`})})]}),s.jsx("h2",{children:"2. 3계층 아키텍처"}),s.jsx("h3",{children:"2.1 계층 구조"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"계층"}),s.jsx("th",{children:"역할"}),s.jsx("th",{children:"기술 예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsxs("td",{children:[s.jsx("strong",{children:"프레젠테이션 계층"}),s.jsx("br",{}),"(클라이언트)"]}),s.jsx("td",{children:"사용자 인터페이스, 화면 표시"}),s.jsx("td",{children:"React, Vue, HTML/CSS/JS, 모바일 앱"})]}),s.jsxs("tr",{children:[s.jsxs("td",{children:[s.jsx("strong",{children:"비즈니스 로직 계층"}),s.jsx("br",{}),"(서버/API)"]}),s.jsx("td",{children:"요청 처리, 데이터 가공, 인증"}),s.jsx("td",{children:"Node.js(Express), Python(Flask/FastAPI), Java(Spring)"})]}),s.jsxs("tr",{children:[s.jsxs("td",{children:[s.jsx("strong",{children:"데이터 계층"}),s.jsx("br",{}),"(데이터베이스)"]}),s.jsx("td",{children:"데이터 저장, 검색, 수정"}),s.jsx("td",{children:"MySQL, PostgreSQL, MongoDB, Redis"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"3계층 아키텍처 다이어그램"}),s.jsx("pre",{children:s.jsx("code",{children:`┌─────────────────────────────────────────────────┐
│              프레젠테이션 계층                    │
│   React, Vue, Angular, 모바일 앱                 │
│   → HTML/CSS/JS로 화면 렌더링                    │
│   → HTTP 요청으로 서버와 통신                     │
└────────────────────┬────────────────────────────┘
                     │ HTTP (REST API / GraphQL)
┌────────────────────▼────────────────────────────┐
│              비즈니스 로직 계층                    │
│   Express.js, FastAPI, Spring Boot               │
│   → 요청 유효성 검사, 인증/인가                   │
│   → 비즈니스 규칙 적용                           │
│   → DB 쿼리 실행 후 결과 가공                     │
└────────────────────┬────────────────────────────┘
                     │ SQL / ORM 쿼리
┌────────────────────▼────────────────────────────┐
│              데이터 계층                          │
│   MySQL, PostgreSQL, MongoDB                     │
│   → 데이터 영구 저장                             │
│   → 트랜잭션, 무결성 보장                        │
│   → 인덱스로 검색 최적화                         │
└─────────────────────────────────────────────────┘`})})]}),s.jsx("h2",{children:"3. REST API 기초"}),s.jsx("h3",{children:"3.1 REST란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"REST(Representational State Transfer)"}),"는 웹 서비스를 설계하는 아키텍처 스타일입니다.",s.jsx("strong",{children:"URL로 자원을 표현"}),"하고, ",s.jsx("strong",{children:"HTTP 메서드로 행위를 정의"}),"합니다."]}),s.jsx("h3",{children:"3.2 HTTP 메서드와 CRUD"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"HTTP 메서드"}),s.jsx("th",{children:"CRUD"}),s.jsx("th",{children:"SQL"}),s.jsx("th",{children:"URL 예시"}),s.jsx("th",{children:"설명"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"GET"})}),s.jsx("td",{children:"Read"}),s.jsx("td",{children:"SELECT"}),s.jsx("td",{children:"GET /api/users"}),s.jsx("td",{children:"사용자 목록 조회"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"GET"})}),s.jsx("td",{children:"Read"}),s.jsx("td",{children:"SELECT"}),s.jsx("td",{children:"GET /api/users/1"}),s.jsx("td",{children:"1번 사용자 조회"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"POST"})}),s.jsx("td",{children:"Create"}),s.jsx("td",{children:"INSERT"}),s.jsx("td",{children:"POST /api/users"}),s.jsx("td",{children:"새 사용자 생성"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"PUT"})}),s.jsx("td",{children:"Update"}),s.jsx("td",{children:"UPDATE"}),s.jsx("td",{children:"PUT /api/users/1"}),s.jsx("td",{children:"1번 사용자 수정 (전체)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"PATCH"})}),s.jsx("td",{children:"Update"}),s.jsx("td",{children:"UPDATE"}),s.jsx("td",{children:"PATCH /api/users/1"}),s.jsx("td",{children:"1번 사용자 수정 (일부)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DELETE"})}),s.jsx("td",{children:"Delete"}),s.jsx("td",{children:"DELETE"}),s.jsx("td",{children:"DELETE /api/users/1"}),s.jsx("td",{children:"1번 사용자 삭제"})]})]})]}),s.jsx("h3",{children:"3.3 REST API 요청/응답 예시"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"HTTP 요청"}),s.jsx("pre",{children:s.jsx("code",{children:`GET /api/users?major=컴퓨터공학 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"HTTP 응답"}),s.jsx("pre",{children:s.jsx("code",{children:`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": [
    { "id": 1, "name": "홍길동", "major": "컴퓨터공학", "grade": 3.5 },
    { "id": 4, "name": "박민지", "major": "컴퓨터공학", "grade": 3.9 }
  ],
  "total": 2
}`})})]}),s.jsx("h3",{children:"3.4 HTTP 상태 코드"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"코드"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"사용 상황"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"200"})}),s.jsx("td",{children:"OK"}),s.jsx("td",{children:"성공적으로 처리"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"201"})}),s.jsx("td",{children:"Created"}),s.jsx("td",{children:"리소스 생성 성공 (POST)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"400"})}),s.jsx("td",{children:"Bad Request"}),s.jsx("td",{children:"잘못된 요청 (유효성 검사 실패)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"401"})}),s.jsx("td",{children:"Unauthorized"}),s.jsx("td",{children:"인증 필요 (로그인 안 됨)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"403"})}),s.jsx("td",{children:"Forbidden"}),s.jsx("td",{children:"권한 없음 (로그인은 됐지만 접근 불가)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"404"})}),s.jsx("td",{children:"Not Found"}),s.jsx("td",{children:"리소스를 찾을 수 없음"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"500"})}),s.jsx("td",{children:"Internal Server Error"}),s.jsx("td",{children:"서버 내부 오류"})]})]})]}),s.jsx("h2",{children:"4. DB 연결 방식"}),s.jsx("h3",{children:"4.1 DB 드라이버"}),s.jsxs("p",{children:[s.jsx("strong",{children:"DB 드라이버"}),"는 프로그래밍 언어에서 데이터베이스에 연결하고 SQL을 실행할 수 있게 해주는 라이브러리입니다."]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"언어"}),s.jsx("th",{children:"MySQL 드라이버"}),s.jsx("th",{children:"PostgreSQL 드라이버"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Node.js"})}),s.jsx("td",{children:"mysql2"}),s.jsx("td",{children:"pg (node-postgres)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Python"})}),s.jsx("td",{children:"mysql-connector, PyMySQL"}),s.jsx("td",{children:"psycopg2, asyncpg"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Java"})}),s.jsx("td",{children:"JDBC (MySQL Connector/J)"}),s.jsx("td",{children:"JDBC (PostgreSQL Driver)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"PHP"})}),s.jsx("td",{children:"PDO, mysqli"}),s.jsx("td",{children:"PDO, pg_connect"})]})]})]}),s.jsx("h3",{children:"4.2 커넥션 풀 (Connection Pool)"}),s.jsxs("p",{children:["DB에 연결할 때마다 새 커넥션을 생성하면 성능이 저하됩니다.",s.jsx("strong",{children:"커넥션 풀"}),"은 미리 여러 개의 커넥션을 만들어 두고 재사용하는 방식입니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"커넥션 풀 동작 원리"}),s.jsx("pre",{children:s.jsx("code",{children:`커넥션 풀 없이:
  요청1 → DB 연결 생성 → 쿼리 → 연결 종료  (느림)
  요청2 → DB 연결 생성 → 쿼리 → 연결 종료  (느림)
  요청3 → DB 연결 생성 → 쿼리 → 연결 종료  (느림)

커넥션 풀 사용:
  [풀: 연결1, 연결2, 연결3, 연결4, 연결5]

  요청1 → 연결1 빌림 → 쿼리 → 연결1 반납  (빠름)
  요청2 → 연결2 빌림 → 쿼리 → 연결2 반납  (빠름)
  요청3 → 연결1 빌림 → 쿼리 → 연결1 반납  (재사용, 빠름)`})})]}),s.jsx("h2",{children:"5. 프론트엔드와 백엔드 통신"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"JavaScript — fetch API로 백엔드 호출"}),s.jsx("pre",{children:s.jsx("code",{children:`// 사용자 목록 조회
const response = await fetch('/api/users');
const data = await response.json();
console.log(data);  // [{ id: 1, name: "홍길동" }, ...]

// 새 사용자 생성
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '신규 사용자',
    email: 'new@example.com'
  })
});
const result = await response.json();`})})]}),s.jsx("h2",{children:"6. 주요 백엔드 기술 스택"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"기술 스택"}),s.jsx("th",{children:"언어"}),s.jsx("th",{children:"프레임워크"}),s.jsx("th",{children:"특징"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"MERN"})}),s.jsx("td",{children:"JavaScript"}),s.jsx("td",{children:"MongoDB + Express + React + Node.js"}),s.jsx("td",{children:"풀스택 JS, 가장 인기"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LAMP"})}),s.jsx("td",{children:"PHP"}),s.jsx("td",{children:"Linux + Apache + MySQL + PHP"}),s.jsx("td",{children:"전통적 웹 개발"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Django"})}),s.jsx("td",{children:"Python"}),s.jsx("td",{children:"Django + PostgreSQL"}),s.jsx("td",{children:"빠른 개발, 관리자 자동 생성"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"FastAPI"})}),s.jsx("td",{children:"Python"}),s.jsx("td",{children:"FastAPI + SQLAlchemy + PostgreSQL"}),s.jsx("td",{children:"고성능 API, 자동 문서화"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Spring"})}),s.jsx("td",{children:"Java"}),s.jsx("td",{children:"Spring Boot + JPA + MySQL"}),s.jsx("td",{children:"엔터프라이즈 표준"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Next.js"})}),s.jsx("td",{children:"JavaScript"}),s.jsx("td",{children:"Next.js + Prisma + PostgreSQL"}),s.jsx("td",{children:"풀스택 React, SSR"})]})]})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["웹 애플리케이션은 ",s.jsx("strong",{children:"클라이언트 → 서버 → DB"}),"의 3계층 구조로 동작한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"REST API"}),"는 URL로 자원을, HTTP 메서드로 행위를 표현한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"DB 드라이버"}),"는 프로그래밍 언어와 DB를 연결하는 라이브러리이다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"커넥션 풀"}),"은 DB 연결을 재사용하여 성능을 향상시킨다."]}),s.jsx("li",{children:"프론트엔드는 fetch/axios로 백엔드 API를 호출하여 데이터를 주고받는다."})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"확인 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 3계층 아키텍처의 각 계층과 역할을 설명하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," REST API에서 GET, POST, PUT, DELETE가 각각 어떤 CRUD 작업에 대응하는지 설명하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," 커넥션 풀이 필요한 이유를 설명하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/web",className:"lesson-nav-btn prev",children:"← DB 웹 연동"}),s.jsx(e,{to:"/web/node-mysql",className:"lesson-nav-btn next",children:"Node.js + MySQL →"})]})]})})})]});export{r as default};
