import { Link } from 'react-router-dom';

const AuthSecurity = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>인증과 보안</h1>
        <p>SQL Injection 방지, 비밀번호 해싱, JWT, 세션</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>SQL Injection 공격의 원리와 방지 방법을 이해한다.</li>
              <li>비밀번호를 안전하게 저장하는 해싱 기법을 익힌다.</li>
              <li>세션 기반 인증과 JWT 토큰 인증의 차이를 파악한다.</li>
              <li>웹-DB 연동 시 보안 모범 사례를 적용한다.</li>
            </ul>
          </div>

          <h2>1. SQL Injection</h2>

          <h3>1.1 SQL Injection이란?</h3>
          <p>
            <strong>SQL Injection</strong>은 사용자 입력에 악의적인 SQL 코드를 삽입하여
            데이터베이스를 비정상적으로 조작하는 공격입니다. <strong>OWASP Top 10</strong>에 항상 포함되는 가장 위험한 취약점 중 하나입니다.
          </p>

          <div className="code-block">
            <div className="code-header">SQL Injection 공격 예시</div>
            <pre><code>{`// ❌ 취약한 코드 — 사용자 입력을 직접 SQL에 삽입
const username = req.body.username;  // 사용자 입력: ' OR '1'='1
const password = req.body.password;  // 사용자 입력: ' OR '1'='1

const sql = "SELECT * FROM users WHERE username = '" + username
          + "' AND password = '" + password + "'";

// 실제 실행되는 SQL:
// SELECT * FROM users
// WHERE username = '' OR '1'='1' AND password = '' OR '1'='1'
// → 조건이 항상 TRUE → 모든 사용자 정보 유출!

// 더 위험한 공격:
// 입력: '; DROP TABLE users; --
// → SELECT * FROM users WHERE username = ''; DROP TABLE users; --'
// → 테이블 전체 삭제!`}</code></pre>
          </div>

          <h3>1.2 방지 방법</h3>

          <div className="code-block">
            <div className="code-header">Prepared Statement (파라미터 바인딩)</div>
            <pre><code>{`// ✅ Node.js (mysql2) — ? 플레이스홀더
const [rows] = await pool.query(
  'SELECT * FROM users WHERE username = ? AND password = ?',
  [username, password]
);

// ✅ Python (PyMySQL) — %s 플레이스홀더
cursor.execute(
    'SELECT * FROM users WHERE username = %s AND password = %s',
    (username, password)
)

// ✅ Prisma ORM — 자동으로 파라미터 바인딩
const user = await prisma.user.findFirst({
  where: { username, password }
});

// 핵심: 사용자 입력을 절대 SQL 문자열에 직접 연결하지 않는다!`}</code></pre>
          </div>

          <table className="lesson-table">
            <thead>
              <tr><th>방지 방법</th><th>설명</th><th>효과</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Prepared Statement</strong></td><td>? 또는 $1 플레이스홀더 사용</td><td>가장 효과적, 필수</td></tr>
              <tr><td><strong>ORM 사용</strong></td><td>Prisma, Sequelize 등 자동 이스케이프</td><td>매우 효과적</td></tr>
              <tr><td><strong>입력 유효성 검사</strong></td><td>타입, 길이, 형식 검증</td><td>추가 방어층</td></tr>
              <tr><td><strong>최소 권한 원칙</strong></td><td>DB 사용자 권한을 최소화</td><td>피해 범위 축소</td></tr>
              <tr><td><strong>WAF</strong></td><td>웹 방화벽으로 의심 쿼리 차단</td><td>네트워크 레벨 방어</td></tr>
            </tbody>
          </table>

          <h2>2. 비밀번호 보안</h2>

          <h3>2.1 절대 하면 안 되는 것</h3>
          <div className="code-block">
            <div className="code-header">잘못된 비밀번호 저장</div>
            <pre><code>{`// ❌ 평문 저장 — 해킹 시 모든 비밀번호 노출
INSERT INTO users (username, password)
VALUES ('홍길동', 'mypassword123');

// ❌ 단순 해시 (MD5, SHA-256) — 레인보우 테이블로 해독 가능
INSERT INTO users (username, password)
VALUES ('홍길동', SHA2('mypassword123', 256));`}</code></pre>
          </div>

          <h3>2.2 올바른 방법: bcrypt</h3>
          <div className="code-block">
            <div className="code-header">Node.js — bcrypt 사용</div>
            <pre><code>{`const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;  // 솔트 라운드 (높을수록 안전, 느림)

// 회원가입: 비밀번호 해싱 후 저장
async function register(username, plainPassword) {
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  // hashedPassword 예: $2b$12$LJ3m4ys7Gke...

  await pool.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );
}

// 로그인: 해시 비교
async function login(username, plainPassword) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  if (rows.length === 0) return null; // 사용자 없음

  const user = rows[0];
  const isMatch = await bcrypt.compare(plainPassword, user.password);

  if (!isMatch) return null; // 비밀번호 불일치
  return user; // 로그인 성공
}`}</code></pre>
          </div>

          <h2>3. 인증 방식 비교</h2>

          <h3>3.1 세션 기반 인증</h3>
          <div className="code-block">
            <div className="code-header">세션 인증 흐름</div>
            <pre><code>{`1. 로그인 → 서버가 세션 ID 생성 → 쿠키로 전송
2. 이후 요청마다 쿠키에 세션 ID 자동 포함
3. 서버가 세션 저장소(메모리/Redis)에서 세션 확인

[브라우저]                    [서버]                [Redis/메모리]
  POST /login ────────────►  세션 생성 ──────────►  { sid: "abc",
  (id, password)              sid = "abc"            user: { id: 1 } }
  ◄──────────────────────── Set-Cookie: sid=abc

  GET /api/profile ────────►  Cookie: sid=abc
                              세션 확인 ──────────►  { sid: "abc" ✓ }
  ◄──────────────────────── { name: "홍길동" }`}</code></pre>
          </div>

          <h3>3.2 JWT 토큰 인증</h3>
          <div className="code-block">
            <div className="code-header">JWT 인증 흐름</div>
            <pre><code>{`1. 로그인 → 서버가 JWT 토큰 발급 (서명 포함)
2. 클라이언트가 토큰을 저장 (로컬스토리지 또는 쿠키)
3. 이후 요청마다 Authorization 헤더에 토큰 포함
4. 서버가 토큰 서명을 검증 (DB 조회 불필요!)

[브라우저]                    [서버]
  POST /login ────────────►  JWT 생성 (서명)
  ◄──────────────────────── { token: "eyJhbGci..." }

  GET /api/profile
  Authorization: Bearer eyJhbGci...
  ──────────────────────────► 토큰 검증 (서명 확인)
  ◄──────────────────────── { name: "홍길동" }

JWT 구조: Header.Payload.Signature
  Header:  { alg: "HS256", typ: "JWT" }
  Payload: { userId: 1, role: "user", exp: 1700000000 }
  Signature: HMAC-SHA256(header + payload, SECRET_KEY)`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">Node.js — JWT 구현</div>
            <pre><code>{`const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// 토큰 발급 (로그인 성공 시)
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    SECRET,
    { expiresIn: '24h' }
  );
}

// 미들웨어: 토큰 검증
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer xxx"

  if (!token) {
    return res.status(401).json({ message: '토큰이 없습니다' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;  // { userId: 1, role: "user" }
    next();
  } catch (err) {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다' });
  }
}

// 보호된 API
app.get('/api/profile', authMiddleware, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT id, name, email FROM users WHERE id = ?',
    [req.user.userId]
  );
  res.json(rows[0]);
});`}</code></pre>
          </div>

          <h3>3.3 세션 vs JWT 비교</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>세션</th><th>JWT</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>상태</strong></td><td>Stateful (서버 저장)</td><td>Stateless (클라이언트 저장)</td></tr>
              <tr><td><strong>확장성</strong></td><td>서버 간 세션 공유 필요</td><td>서버 추가 시 문제 없음</td></tr>
              <tr><td><strong>보안</strong></td><td>세션 탈취 위험</td><td>토큰 탈취 + 만료 전 무효화 어려움</td></tr>
              <tr><td><strong>로그아웃</strong></td><td>세션 삭제로 즉시 무효화</td><td>만료 전 무효화 어려움 (블랙리스트 필요)</td></tr>
              <tr><td><strong>적합한 경우</strong></td><td>SSR, 전통적 웹앱</td><td>SPA, 모바일 앱, 마이크로서비스</td></tr>
            </tbody>
          </table>

          <h2>4. 보안 체크리스트</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>점검 내용</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>SQL Injection</strong></td><td>모든 DB 쿼리에 Prepared Statement 또는 ORM 사용</td></tr>
              <tr><td><strong>비밀번호</strong></td><td>bcrypt/argon2로 해싱, 평문/MD5/SHA 저장 금지</td></tr>
              <tr><td><strong>HTTPS</strong></td><td>모든 통신 HTTPS 적용, 쿠키에 Secure 플래그</td></tr>
              <tr><td><strong>환경변수</strong></td><td>DB 비밀번호, API 키를 .env로 관리, Git에 커밋 금지</td></tr>
              <tr><td><strong>입력 검증</strong></td><td>서버에서 모든 입력 타입/길이/형식 검증</td></tr>
              <tr><td><strong>CORS</strong></td><td>허용된 도메인만 API 접근 가능하도록 설정</td></tr>
              <tr><td><strong>Rate Limiting</strong></td><td>로그인 시도 횟수 제한으로 브루트포스 방지</td></tr>
              <tr><td><strong>DB 권한</strong></td><td>앱용 DB 사용자는 최소 권한만 부여 (DROP 금지)</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>SQL Injection</strong>: Prepared Statement로 100% 방지할 수 있다.</li>
              <li><strong>비밀번호</strong>는 반드시 bcrypt/argon2로 해싱하여 저장한다.</li>
              <li><strong>세션</strong>은 서버에서 상태 관리, <strong>JWT</strong>는 클라이언트에서 토큰 관리.</li>
              <li>보안은 한 가지만이 아니라 <strong>여러 층(Defense in Depth)</strong>으로 적용해야 한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> SQL Injection 공격이 발생하는 원리를 예시와 함께 설명하세요.</p>
            <p><strong>문제 2.</strong> bcrypt가 MD5/SHA보다 안전한 이유를 설명하세요.</p>
            <p><strong>문제 3.</strong> 세션 인증과 JWT 인증의 장단점을 각각 2가지씩 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/web/orm" className="lesson-nav-btn prev">&larr; ORM과 쿼리빌더</Link>
            <Link to="/web/deploy" className="lesson-nav-btn next">배포와 운영 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AuthSecurity;
