import{j as e,L as s}from"./index-EgWK4-lQ.js";const c=()=>e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"04. 정렬과 제한"}),e.jsx("p",{children:"ORDER BY, LIMIT, OFFSET, DISTINCT"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"학습 목표"}),e.jsxs("ul",{children:[e.jsx("li",{children:"ORDER BY를 사용하여 결과를 정렬한다."}),e.jsx("li",{children:"ASC(오름차순)와 DESC(내림차순)를 구분한다."}),e.jsx("li",{children:"LIMIT로 결과 행 수를 제한한다."}),e.jsx("li",{children:"OFFSET으로 페이징(Paging)을 구현한다."})]})]}),e.jsx("h2",{children:"1. ORDER BY — 정렬"}),e.jsx("h3",{children:"1.1 기본 문법"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`SELECT 컬럼1, 컬럼2
FROM 테이블명
ORDER BY 정렬기준컬럼 [ASC | DESC];

-- ASC  : 오름차순 (기본값, 생략 가능)
-- DESC : 내림차순`})})]}),e.jsx("h3",{children:"1.2 오름차순 정렬 (ASC)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 나이 오름차순 (작은 값 → 큰 값)
SELECT name, age
FROM students
ORDER BY age ASC;

-- ASC는 기본값이므로 생략 가능
SELECT name, age
FROM students
ORDER BY age;`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"실행 결과"}),e.jsx("pre",{children:e.jsx("code",{children:`+--------+------+
| name   | age  |
+--------+------+
| 홍길동 |   20 |
| 박민지 |   20 |
| 윤서연 |   20 |
| 김영희 |   21 |
| 최지우 |   21 |
| 이철수 |   22 |
| 강동원 |   22 |
| 정수현 |   23 |
+--------+------+`})})]}),e.jsx("h3",{children:"1.3 내림차순 정렬 (DESC)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 학점 내림차순 (높은 학점 → 낮은 학점)
SELECT name, grade
FROM students
ORDER BY grade DESC;`})})]}),e.jsx("h3",{children:"1.4 다중 컬럼 정렬"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 전공별 오름차순 → 같은 전공 내에서 학점 내림차순
SELECT name, major, grade
FROM students
ORDER BY major ASC, grade DESC;`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"실행 결과"}),e.jsx("pre",{children:e.jsx("code",{children:`+--------+------------+-------+
| name   | major      | grade |
+--------+------------+-------+
| 김영희 | 경영학     |  3.80 |   ← 경영학 내 학점 높은 순
| 최지우 | 경영학     |  3.60 |
| 박민지 | 컴퓨터공학 |  3.90 |   ← 컴퓨터공학 내 학점 높은 순
| 홍길동 | 컴퓨터공학 |  3.50 |
| 강동원 | 컴퓨터공학 |  3.10 |
| ...                         |
+--------+------------+-------+`})})]}),e.jsx("h3",{children:"1.5 컬럼 번호로 정렬"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- SELECT에서 2번째 컬럼(major) 기준 정렬
SELECT name, major, grade
FROM students
ORDER BY 2 ASC, 3 DESC;
-- ORDER BY major ASC, grade DESC; 와 동일

-- ※ 가독성이 떨어지므로 컬럼 이름 사용을 권장`})})]}),e.jsx("h2",{children:"2. LIMIT — 결과 수 제한"}),e.jsx("h3",{children:"2.1 기본 사용법"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 상위 3명만 조회
SELECT name, grade
FROM students
ORDER BY grade DESC
LIMIT 3;`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"실행 결과"}),e.jsx("pre",{children:e.jsx("code",{children:`+--------+-------+
| name   | grade |
+--------+-------+
| 박민지 |  3.90 |
| 김영희 |  3.80 |
| 윤서연 |  3.70 |
+--------+-------+`})})]}),e.jsx("h3",{children:"2.2 OFFSET — 건너뛰기"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 학점 상위 4~6번째 학생 (3개 건너뛰고 3개 조회)
SELECT name, grade
FROM students
ORDER BY grade DESC
LIMIT 3 OFFSET 3;

-- 또는 LIMIT offset, count 형태
SELECT name, grade
FROM students
ORDER BY grade DESC
LIMIT 3, 3;  -- OFFSET 3, LIMIT 3과 동일`})})]}),e.jsx("h3",{children:"2.3 페이징(Paging) 구현"}),e.jsxs("p",{children:["게시판, 검색 결과 등에서 ",e.jsx("strong",{children:"페이지 번호"}),"별로 데이터를 나누어 보여줄 때 LIMIT과 OFFSET을 사용합니다."]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 한 페이지에 3명씩 표시할 때:
-- 1페이지: OFFSET 0
SELECT * FROM students ORDER BY id LIMIT 3 OFFSET 0;

-- 2페이지: OFFSET 3
SELECT * FROM students ORDER BY id LIMIT 3 OFFSET 3;

-- 3페이지: OFFSET 6
SELECT * FROM students ORDER BY id LIMIT 3 OFFSET 6;

-- 공식: OFFSET = (페이지번호 - 1) × 페이지크기`})})]}),e.jsx("h2",{children:"3. 실전 활용 예제"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 학점 TOP 3 학생 (이름, 전공, 학점)
SELECT name, major, grade
FROM students
ORDER BY grade DESC
LIMIT 3;

-- 가장 최근 입학한 학생 5명
SELECT name, enrolled
FROM students
ORDER BY enrolled DESC
LIMIT 5;

-- 컴퓨터공학 학생을 이름순으로 정렬
SELECT name, grade
FROM students
WHERE major = '컴퓨터공학'
ORDER BY name ASC;

-- 학점이 3.0 이상인 학생을 학점 높은 순으로 상위 3명
SELECT name, major, grade
FROM students
WHERE grade >= 3.0
ORDER BY grade DESC
LIMIT 3;`})})]}),e.jsx("h2",{children:"4. 정렬 시 NULL 처리"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQL"}),e.jsx("pre",{children:e.jsx("code",{children:`-- MySQL에서 NULL은 가장 작은 값으로 취급
-- ASC : NULL이 맨 앞에 위치
-- DESC: NULL이 맨 뒤에 위치

-- NULL을 맨 뒤로 보내려면:
SELECT name, age
FROM students
ORDER BY age IS NULL ASC, age ASC;
-- IS NULL이 0(FALSE=NOT NULL)인 행이 먼저, 1(TRUE=NULL)인 행이 나중에`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"핵심 정리"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ORDER BY"}),"는 결과를 정렬한다. ASC(오름차순, 기본), DESC(내림차순)."]}),e.jsxs("li",{children:["여러 컬럼으로 정렬할 때 ",e.jsx("strong",{children:"앞의 컬럼이 우선"})," 적용된다."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LIMIT N"}),"은 상위 N개 행만 반환한다."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"OFFSET M"}),"은 M개 행을 건너뛰고 결과를 반환한다."]}),e.jsxs("li",{children:["페이징 공식: ",e.jsx("strong",{children:"OFFSET = (페이지 - 1) × 페이지크기"})]})]})]}),e.jsxs("div",{className:"exercise-box",children:[e.jsx("h3",{children:"연습 문제"}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 1."})," 학생을 나이순(오름차순)으로 정렬하고, 나이가 같으면 이름 가나다순으로 정렬하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 2."})," 학점이 가장 높은 학생 1명의 이름과 학점을 조회하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 3."})," 한 페이지에 2명씩 보여줄 때, 3페이지에 해당하는 학생을 조회하세요."]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/sql/where",className:"lesson-nav-btn prev",children:"← WHERE 조건절"}),e.jsx(s,{to:"/sql/function",className:"lesson-nav-btn next",children:"함수와 표현식 →"})]})]})})})]});export{c as default};
