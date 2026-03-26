import{j as s,L as e}from"./index-B7RmXR7j.js";const c=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"02. SELECT 기초"}),s.jsx("p",{children:"SELECT, FROM, 컬럼 선택, 별칭(AS)"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"SELECT 문의 기본 구조를 이해한다."}),s.jsx("li",{children:"전체 컬럼 또는 특정 컬럼을 선택하여 조회한다."}),s.jsx("li",{children:"별칭(AS)을 사용하여 컬럼/테이블 이름을 변경한다."}),s.jsx("li",{children:"DISTINCT로 중복을 제거하여 조회한다."}),s.jsx("li",{children:"산술 연산과 문자열 연결을 수행한다."})]})]}),s.jsx("h2",{children:"1. SELECT 문 기본 구조"}),s.jsx("h3",{children:"1.1 기본 문법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SELECT 기본 문법"}),s.jsx("pre",{children:s.jsx("code",{children:`SELECT 컬럼1, 컬럼2, ...
FROM 테이블명;

-- 또는 전체 컬럼 조회
SELECT *
FROM 테이블명;`})})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"SELECT"}),"는 데이터베이스에서 데이터를 ",s.jsx("strong",{children:"조회(검색)"}),"하는 명령어입니다. 가장 많이 사용되는 SQL 명령어이며, 데이터를 변경하지 않는 ",s.jsx("strong",{children:"읽기 전용"})," 작업입니다."]}),s.jsx("h3",{children:"1.2 전체 컬럼 조회"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- students 테이블의 모든 컬럼 조회
SELECT *
FROM students;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+----+--------+------+------------+-------+------------+-------------------+
| id | name   | age  | major      | grade | enrolled   | email             |
+----+--------+------+------------+-------+------------+-------------------+
|  1 | 홍길동 |   20 | 컴퓨터공학 |  3.50 | 2023-03-02 | hong@school.ac.kr |
|  2 | 김영희 |   21 | 경영학     |  3.80 | 2022-03-02 | kim@school.ac.kr  |
|  3 | 이철수 |   22 | 전자공학   |  3.20 | 2021-03-02 | lee@school.ac.kr  |
| ...                                                                      |
+----+--------+------+------------+-------+------------+-------------------+`})})]}),s.jsx("h3",{children:"1.3 특정 컬럼 조회"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 이름과 전공만 조회
SELECT name, major
FROM students;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+--------+------------+
| name   | major      |
+--------+------------+
| 홍길동 | 컴퓨터공학 |
| 김영희 | 경영학     |
| 이철수 | 전자공학   |
| 박민지 | 컴퓨터공학 |
| ...                 |
+--------+------------+`})})]}),s.jsx("h2",{children:"2. 별칭 (AS)"}),s.jsx("h3",{children:"2.1 컬럼 별칭"}),s.jsxs("p",{children:[s.jsx("strong",{children:"AS"})," 키워드를 사용하면 결과에 표시되는 컬럼 이름을 원하는 이름으로 바꿀 수 있습니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 컬럼에 별칭 지정
SELECT name AS 이름,
       major AS 전공,
       grade AS 학점
FROM students;

-- AS 키워드 생략 가능
SELECT name 이름, major 전공
FROM students;

-- 공백이 포함된 별칭은 따옴표 사용
SELECT name AS "학생 이름",
       grade AS "평균 학점"
FROM students;`})})]}),s.jsx("h3",{children:"2.2 테이블 별칭"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 테이블에 별칭 지정 (JOIN에서 유용)
SELECT s.name, s.major
FROM students AS s;

-- AS 생략 가능
SELECT s.name, s.major
FROM students s;`})})]}),s.jsx("h2",{children:"3. DISTINCT — 중복 제거"}),s.jsx("h3",{children:"3.1 기본 사용법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공 목록 (중복 포함)
SELECT major FROM students;
-- 결과: 컴퓨터공학, 경영학, 전자공학, 컴퓨터공학, 수학과, 경영학, 컴퓨터공학, 디자인학

-- 전공 목록 (중복 제거)
SELECT DISTINCT major FROM students;
-- 결과: 컴퓨터공학, 경영학, 전자공학, 수학과, 디자인학`})})]}),s.jsx("h3",{children:"3.2 여러 컬럼의 DISTINCT"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공 + 나이 조합의 중복 제거
SELECT DISTINCT major, age
FROM students;
-- (컴퓨터공학, 20)과 (컴퓨터공학, 22)는 서로 다른 조합이므로 둘 다 표시`})})]}),s.jsx("h2",{children:"4. 산술 연산"}),s.jsx("h3",{children:"4.1 컬럼에 연산 적용"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학점을 4.5 만점으로 환산
SELECT name,
       grade AS "4.0 학점",
       grade * 1.125 AS "4.5 학점"
FROM students;

-- 나이 + 1 (내년 나이)
SELECT name,
       age AS 현재나이,
       age + 1 AS 내년나이
FROM students;`})})]}),s.jsxs("p",{children:["사용 가능한 산술 연산자: ",s.jsx("strong",{children:"+"}),"(더하기), ",s.jsx("strong",{children:"-"}),"(빼기),",s.jsx("strong",{children:"*"}),"(곱하기), ",s.jsx("strong",{children:"/"}),"(나누기), ",s.jsx("strong",{children:"%"}),"(나머지)"]}),s.jsx("h2",{children:"5. NULL 값"}),s.jsx("h3",{children:"5.1 NULL이란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"NULL"}),"은 ",s.jsx("strong",{children:"값이 없음"}),"을 나타내는 특수한 값입니다. 0이나 빈 문자열('')과는 다릅니다. NULL과의 산술 연산 결과는 항상 NULL입니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- NULL 확인
SELECT name, age
FROM students
WHERE age IS NULL;      -- NULL인 행 조회

SELECT name, age
FROM students
WHERE age IS NOT NULL;  -- NULL이 아닌 행 조회

-- 주의: WHERE age = NULL (X) → 항상 거짓
-- 올바른 방법: WHERE age IS NULL (O)`})})]}),s.jsx("h2",{children:"6. SQL 실행 순서"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"순서"}),s.jsx("th",{children:"절"}),s.jsx("th",{children:"역할"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:"1"}),s.jsx("td",{children:s.jsx("strong",{children:"FROM"})}),s.jsx("td",{children:"데이터를 가져올 테이블 지정"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"2"}),s.jsx("td",{children:s.jsx("strong",{children:"WHERE"})}),s.jsx("td",{children:"조건에 맞는 행 필터링"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"3"}),s.jsx("td",{children:s.jsx("strong",{children:"GROUP BY"})}),s.jsx("td",{children:"그룹화"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"4"}),s.jsx("td",{children:s.jsx("strong",{children:"HAVING"})}),s.jsx("td",{children:"그룹 필터링"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"5"}),s.jsx("td",{children:s.jsx("strong",{children:"SELECT"})}),s.jsx("td",{children:"표시할 컬럼 선택"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"6"}),s.jsx("td",{children:s.jsx("strong",{children:"ORDER BY"})}),s.jsx("td",{children:"정렬"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"7"}),s.jsx("td",{children:s.jsx("strong",{children:"LIMIT"})}),s.jsx("td",{children:"결과 수 제한"})]})]})]}),s.jsxs("p",{children:["SQL은 작성 순서(SELECT → FROM → WHERE ...)와 ",s.jsx("strong",{children:"실행 순서"}),"가 다릅니다. FROM이 가장 먼저 실행되고, SELECT는 거의 마지막에 실행됩니다. 이 때문에 SELECT에서 정의한 별칭을 WHERE에서 사용할 수 없습니다."]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"SELECT *"}),"은 전체 컬럼, ",s.jsx("strong",{children:"SELECT 컬럼명"}),"은 특정 컬럼을 조회한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"AS"}),"를 사용하여 컬럼이나 테이블에 별칭을 줄 수 있다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"DISTINCT"}),"는 조회 결과에서 중복을 제거한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"NULL"}),"은 값이 없음을 의미하며, IS NULL / IS NOT NULL로 확인한다."]}),s.jsxs("li",{children:["SQL의 ",s.jsx("strong",{children:"실행 순서"}),"는 작성 순서와 다르다."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," students 테이블에서 학생의 이름과 이메일만 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," students 테이블에서 중복 없이 전공 목록을 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."}),' students 테이블에서 이름(name)을 "학생명", 학점(grade)을 "GPA"로 별칭을 지정하여 조회하세요.']}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 4."})," students 테이블에서 이름과 학점을 조회하되, 학점을 100점 만점으로 환산(grade × 25)한 컬럼도 함께 표시하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/setup",className:"lesson-nav-btn prev",children:"← SQL 환경 구축"}),s.jsx(e,{to:"/sql/where",className:"lesson-nav-btn next",children:"WHERE 조건절 →"})]})]})})})]});export{c as default};
