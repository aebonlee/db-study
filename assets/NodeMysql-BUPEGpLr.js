import{j as s,L as e}from"./index-CIjzQfov.js";const a=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"Node.js + MySQL"}),s.jsx("p",{children:"Express.js, mysql2, 커넥션 풀, CRUD API 구축"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Node.js와 Express.js로 웹 서버를 구성한다."}),s.jsx("li",{children:"mysql2 패키지로 MySQL에 연결한다."}),s.jsx("li",{children:"CRUD REST API를 구현한다."}),s.jsx("li",{children:"Prepared Statement로 SQL Injection을 방지한다."})]})]}),s.jsx("h2",{children:"1. 프로젝트 설정"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"터미널"}),s.jsx("pre",{children:s.jsx("code",{children:`# 프로젝트 생성
mkdir my-api && cd my-api
npm init -y

# 패키지 설치
npm install express mysql2 dotenv cors
npm install -D nodemon

# package.json에 스크립트 추가
# "scripts": { "dev": "nodemon server.js" }`})})]}),s.jsx("h2",{children:"2. MySQL 연결"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"db.js — 커넥션 풀 설정"}),s.jsx("pre",{children:s.jsx("code",{children:`const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:     process.env.DB_HOST || 'localhost',
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'school',
  port:     process.env.DB_PORT || 3306,

  // 커넥션 풀 설정
  waitForConnections: true,
  connectionLimit: 10,     // 최대 연결 수
  queueLimit: 0,           // 대기열 제한 (0 = 무제한)
  idleTimeout: 60000,      // 유휴 연결 타임아웃 (60초)
});

module.exports = pool;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:".env — 환경변수 (Git에 커밋하지 않음!)"}),s.jsx("pre",{children:s.jsx("code",{children:`DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=school
DB_PORT=3306
PORT=3000`})})]}),s.jsx("h2",{children:"3. Express 서버 구성"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"server.js — 메인 서버 파일"}),s.jsx("pre",{children:s.jsx("code",{children:`const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(cors());                         // CORS 허용
app.use(express.json());                 // JSON 파싱
app.use(express.urlencoded({ extended: true }));

// 라우터
const studentRouter = require('./routes/students');
app.use('/api/students', studentRouter);

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(\`서버 실행 중: http://localhost:\${PORT}\`);
});`})})]}),s.jsx("h2",{children:"4. CRUD API 구현"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"routes/students.js — 학생 CRUD API"}),s.jsx("pre",{children:s.jsx("code",{children:`const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ READ — 전체 학생 조회
// GET /api/students
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students ORDER BY id');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ READ — 특정 학생 조회
// GET /api/students/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM students WHERE id = ?',   // ? = Prepared Statement
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: '학생을 찾을 수 없습니다' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ CREATE — 새 학생 등록
// POST /api/students
router.post('/', async (req, res) => {
  try {
    const { name, age, major, grade, email } = req.body;

    // 유효성 검사
    if (!name) {
      return res.status(400).json({ success: false, message: '이름은 필수입니다' });
    }

    const [result] = await pool.query(
      'INSERT INTO students (name, age, major, grade, email) VALUES (?, ?, ?, ?, ?)',
      [name, age, major, grade, email]
    );

    res.status(201).json({
      success: true,
      message: '학생이 등록되었습니다',
      data: { id: result.insertId }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ UPDATE — 학생 정보 수정
// PUT /api/students/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, age, major, grade, email } = req.body;
    const [result] = await pool.query(
      'UPDATE students SET name=?, age=?, major=?, grade=?, email=? WHERE id=?',
      [name, age, major, grade, email, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '학생을 찾을 수 없습니다' });
    }

    res.json({ success: true, message: '수정되었습니다' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ DELETE — 학생 삭제
// DELETE /api/students/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM students WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '학생을 찾을 수 없습니다' });
    }

    res.json({ success: true, message: '삭제되었습니다' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;`})})]}),s.jsx("h2",{children:"5. API 테스트"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"curl 명령어로 API 테스트"}),s.jsx("pre",{children:s.jsx("code",{children:`# 전체 학생 조회
curl http://localhost:3000/api/students

# 1번 학생 조회
curl http://localhost:3000/api/students/1

# 새 학생 등록
curl -X POST http://localhost:3000/api/students \\
  -H "Content-Type: application/json" \\
  -d '{"name":"테스트","age":20,"major":"컴퓨터공학","grade":3.5}'

# 학생 수정
curl -X PUT http://localhost:3000/api/students/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"홍길동","age":21,"major":"소프트웨어","grade":3.7}'

# 학생 삭제
curl -X DELETE http://localhost:3000/api/students/9`})})]}),s.jsx("h2",{children:"6. 검색/필터/페이지네이션"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"고급 조회 API — 검색, 필터, 페이징"}),s.jsx("pre",{children:s.jsx("code",{children:`// GET /api/students?search=홍&major=컴퓨터공학&page=1&limit=10
router.get('/', async (req, res) => {
  try {
    const { search, major, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND name LIKE ?';
      params.push(\`%\${search}%\`);
    }
    if (major) {
      sql += ' AND major = ?';
      params.push(major);
    }

    // 전체 개수 조회
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) AS total');
    const [[{ total }]] = await pool.query(countSql, params);

    // 페이징 적용
    sql += ' ORDER BY id LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [rows] = await pool.query(sql, params);

    res.json({
      success: true,
      data: rows,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});`})})]}),s.jsx("h2",{children:"7. 에러 처리 미들웨어"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"server.js에 추가"}),s.jsx("pre",{children:s.jsx("code",{children:`// 404 핸들러
app.use((req, res) => {
  res.status(404).json({ success: false, message: '엔드포인트를 찾을 수 없습니다' });
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error('에러 발생:', err.stack);
  res.status(500).json({ success: false, message: '서버 내부 오류' });
});`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"mysql2/promise"}),"로 async/await 기반 MySQL 연결과 커넥션 풀 사용."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Prepared Statement"}),"(?)를 반드시 사용하여 SQL Injection 방지."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"CRUD API"}),": GET(조회), POST(생성), PUT(수정), DELETE(삭제)."]}),s.jsxs("li",{children:[s.jsx("strong",{children:".env"})," 파일로 DB 정보 관리, Git에는 커밋하지 않음."]}),s.jsx("li",{children:"검색/필터/페이지네이션은 쿼리 파라미터로 구현한다."})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"실습 과제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"과제 1."})," 위 코드를 참고하여 courses 테이블에 대한 CRUD API를 직접 구현하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"과제 2."})," 학생별 수강 과목 목록을 JOIN으로 조회하는 API(GET /api/students/:id/courses)를 만드세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"과제 3."})," 전공별 학생 수를 반환하는 통계 API(GET /api/stats/majors)를 만드세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/web/architecture",className:"lesson-nav-btn prev",children:"← 웹-DB 연동 구조"}),s.jsx(e,{to:"/web/python-db",className:"lesson-nav-btn next",children:"Python + DB →"})]})]})})})]});export{a as default};
