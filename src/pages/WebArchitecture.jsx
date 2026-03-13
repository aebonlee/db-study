import { Link } from 'react-router-dom';

const WebArchitecture = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>웹-DB 연동 구조</h1>
        <p>클라이언트-서버 아키텍처, REST API, 3계층 구조</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>웹 애플리케이션에서 데이터베이스가 어떻게 연결되는지 전체 구조를 이해한다.</li>
              <li>3계층 아키텍처(프레젠테이션, 비즈니스 로직, 데이터)를 파악한다.</li>
              <li>REST API의 개념과 HTTP 메서드를 이해한다.</li>
              <li>커넥션 풀과 DB 드라이버의 역할을 파악한다.</li>
            </ul>
          </div>

          <h2>1. 웹과 데이터베이스의 관계</h2>

          <h3>1.1 왜 웹에서 DB가 필요한가?</h3>
          <p>
            웹 애플리케이션은 사용자의 데이터를 <strong>영구적으로 저장</strong>하고 <strong>다시 불러와야</strong> 합니다.
            회원 정보, 게시글, 주문 내역, 설정 등 모든 데이터는 데이터베이스에 저장되고,
            웹 서버를 통해 클라이언트(브라우저)에 전달됩니다.
          </p>

          <div className="code-block">
            <div className="code-header">웹-DB 연동 전체 흐름</div>
            <pre><code>{`[브라우저/앱]          [웹 서버]              [데이터베이스]
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
     │◄──────────────────│                      │`}</code></pre>
          </div>

          <h2>2. 3계층 아키텍처</h2>

          <h3>2.1 계층 구조</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>계층</th><th>역할</th><th>기술 예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>프레젠테이션 계층</strong><br/>(클라이언트)</td><td>사용자 인터페이스, 화면 표시</td><td>React, Vue, HTML/CSS/JS, 모바일 앱</td></tr>
              <tr><td><strong>비즈니스 로직 계층</strong><br/>(서버/API)</td><td>요청 처리, 데이터 가공, 인증</td><td>Node.js(Express), Python(Flask/FastAPI), Java(Spring)</td></tr>
              <tr><td><strong>데이터 계층</strong><br/>(데이터베이스)</td><td>데이터 저장, 검색, 수정</td><td>MySQL, PostgreSQL, MongoDB, Redis</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">3계층 아키텍처 다이어그램</div>
            <pre><code>{`┌─────────────────────────────────────────────────┐
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
└─────────────────────────────────────────────────┘`}</code></pre>
          </div>

          <h2>3. REST API 기초</h2>

          <h3>3.1 REST란?</h3>
          <p>
            <strong>REST(Representational State Transfer)</strong>는 웹 서비스를 설계하는 아키텍처 스타일입니다.
            <strong>URL로 자원을 표현</strong>하고, <strong>HTTP 메서드로 행위를 정의</strong>합니다.
          </p>

          <h3>3.2 HTTP 메서드와 CRUD</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>HTTP 메서드</th><th>CRUD</th><th>SQL</th><th>URL 예시</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>GET</strong></td><td>Read</td><td>SELECT</td><td>GET /api/users</td><td>사용자 목록 조회</td></tr>
              <tr><td><strong>GET</strong></td><td>Read</td><td>SELECT</td><td>GET /api/users/1</td><td>1번 사용자 조회</td></tr>
              <tr><td><strong>POST</strong></td><td>Create</td><td>INSERT</td><td>POST /api/users</td><td>새 사용자 생성</td></tr>
              <tr><td><strong>PUT</strong></td><td>Update</td><td>UPDATE</td><td>PUT /api/users/1</td><td>1번 사용자 수정 (전체)</td></tr>
              <tr><td><strong>PATCH</strong></td><td>Update</td><td>UPDATE</td><td>PATCH /api/users/1</td><td>1번 사용자 수정 (일부)</td></tr>
              <tr><td><strong>DELETE</strong></td><td>Delete</td><td>DELETE</td><td>DELETE /api/users/1</td><td>1번 사용자 삭제</td></tr>
            </tbody>
          </table>

          <h3>3.3 REST API 요청/응답 예시</h3>
          <div className="code-block">
            <div className="code-header">HTTP 요청</div>
            <pre><code>{`GET /api/users?major=컴퓨터공학 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">HTTP 응답</div>
            <pre><code>{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": [
    { "id": 1, "name": "홍길동", "major": "컴퓨터공학", "grade": 3.5 },
    { "id": 4, "name": "박민지", "major": "컴퓨터공학", "grade": 3.9 }
  ],
  "total": 2
}`}</code></pre>
          </div>

          <h3>3.4 HTTP 상태 코드</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>코드</th><th>의미</th><th>사용 상황</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>200</strong></td><td>OK</td><td>성공적으로 처리</td></tr>
              <tr><td><strong>201</strong></td><td>Created</td><td>리소스 생성 성공 (POST)</td></tr>
              <tr><td><strong>400</strong></td><td>Bad Request</td><td>잘못된 요청 (유효성 검사 실패)</td></tr>
              <tr><td><strong>401</strong></td><td>Unauthorized</td><td>인증 필요 (로그인 안 됨)</td></tr>
              <tr><td><strong>403</strong></td><td>Forbidden</td><td>권한 없음 (로그인은 됐지만 접근 불가)</td></tr>
              <tr><td><strong>404</strong></td><td>Not Found</td><td>리소스를 찾을 수 없음</td></tr>
              <tr><td><strong>500</strong></td><td>Internal Server Error</td><td>서버 내부 오류</td></tr>
            </tbody>
          </table>

          <h2>4. DB 연결 방식</h2>

          <h3>4.1 DB 드라이버</h3>
          <p>
            <strong>DB 드라이버</strong>는 프로그래밍 언어에서 데이터베이스에 연결하고 SQL을 실행할 수 있게 해주는 라이브러리입니다.
          </p>
          <table className="lesson-table">
            <thead>
              <tr><th>언어</th><th>MySQL 드라이버</th><th>PostgreSQL 드라이버</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Node.js</strong></td><td>mysql2</td><td>pg (node-postgres)</td></tr>
              <tr><td><strong>Python</strong></td><td>mysql-connector, PyMySQL</td><td>psycopg2, asyncpg</td></tr>
              <tr><td><strong>Java</strong></td><td>JDBC (MySQL Connector/J)</td><td>JDBC (PostgreSQL Driver)</td></tr>
              <tr><td><strong>PHP</strong></td><td>PDO, mysqli</td><td>PDO, pg_connect</td></tr>
            </tbody>
          </table>

          <h3>4.2 커넥션 풀 (Connection Pool)</h3>
          <p>
            DB에 연결할 때마다 새 커넥션을 생성하면 성능이 저하됩니다.
            <strong>커넥션 풀</strong>은 미리 여러 개의 커넥션을 만들어 두고 재사용하는 방식입니다.
          </p>
          <div className="code-block">
            <div className="code-header">커넥션 풀 동작 원리</div>
            <pre><code>{`커넥션 풀 없이:
  요청1 → DB 연결 생성 → 쿼리 → 연결 종료  (느림)
  요청2 → DB 연결 생성 → 쿼리 → 연결 종료  (느림)
  요청3 → DB 연결 생성 → 쿼리 → 연결 종료  (느림)

커넥션 풀 사용:
  [풀: 연결1, 연결2, 연결3, 연결4, 연결5]

  요청1 → 연결1 빌림 → 쿼리 → 연결1 반납  (빠름)
  요청2 → 연결2 빌림 → 쿼리 → 연결2 반납  (빠름)
  요청3 → 연결1 빌림 → 쿼리 → 연결1 반납  (재사용, 빠름)`}</code></pre>
          </div>

          <h2>5. 프론트엔드와 백엔드 통신</h2>

          <div className="code-block">
            <div className="code-header">JavaScript — fetch API로 백엔드 호출</div>
            <pre><code>{`// 사용자 목록 조회
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
const result = await response.json();`}</code></pre>
          </div>

          <h2>6. 주요 백엔드 기술 스택</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>기술 스택</th><th>언어</th><th>프레임워크</th><th>특징</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>MERN</strong></td><td>JavaScript</td><td>MongoDB + Express + React + Node.js</td><td>풀스택 JS, 가장 인기</td></tr>
              <tr><td><strong>LAMP</strong></td><td>PHP</td><td>Linux + Apache + MySQL + PHP</td><td>전통적 웹 개발</td></tr>
              <tr><td><strong>Django</strong></td><td>Python</td><td>Django + PostgreSQL</td><td>빠른 개발, 관리자 자동 생성</td></tr>
              <tr><td><strong>FastAPI</strong></td><td>Python</td><td>FastAPI + SQLAlchemy + PostgreSQL</td><td>고성능 API, 자동 문서화</td></tr>
              <tr><td><strong>Spring</strong></td><td>Java</td><td>Spring Boot + JPA + MySQL</td><td>엔터프라이즈 표준</td></tr>
              <tr><td><strong>Next.js</strong></td><td>JavaScript</td><td>Next.js + Prisma + PostgreSQL</td><td>풀스택 React, SSR</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li>웹 애플리케이션은 <strong>클라이언트 → 서버 → DB</strong>의 3계층 구조로 동작한다.</li>
              <li><strong>REST API</strong>는 URL로 자원을, HTTP 메서드로 행위를 표현한다.</li>
              <li><strong>DB 드라이버</strong>는 프로그래밍 언어와 DB를 연결하는 라이브러리이다.</li>
              <li><strong>커넥션 풀</strong>은 DB 연결을 재사용하여 성능을 향상시킨다.</li>
              <li>프론트엔드는 fetch/axios로 백엔드 API를 호출하여 데이터를 주고받는다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> 3계층 아키텍처의 각 계층과 역할을 설명하세요.</p>
            <p><strong>문제 2.</strong> REST API에서 GET, POST, PUT, DELETE가 각각 어떤 CRUD 작업에 대응하는지 설명하세요.</p>
            <p><strong>문제 3.</strong> 커넥션 풀이 필요한 이유를 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/web" className="lesson-nav-btn prev">&larr; DB 웹 연동</Link>
            <Link to="/web/node-mysql" className="lesson-nav-btn next">Node.js + MySQL &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default WebArchitecture;
