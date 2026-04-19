import{j as s,L as e}from"./index-D7XyfEmW.js";const c=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"09. JOIN"}),s.jsx("p",{children:"INNER, LEFT, RIGHT, FULL OUTER, CROSS, Self JOIN"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"JOIN의 개념과 필요성을 이해한다."}),s.jsx("li",{children:"INNER JOIN, LEFT JOIN, RIGHT JOIN의 차이를 구분한다."}),s.jsx("li",{children:"CROSS JOIN과 Self JOIN을 사용한다."}),s.jsx("li",{children:"여러 테이블을 결합하여 원하는 데이터를 조회한다."})]})]}),s.jsx("h2",{children:"1. JOIN이란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"JOIN"}),"은 두 개 이상의 테이블을 ",s.jsx("strong",{children:"공통 컬럼"}),"을 기준으로 결합하여 하나의 결과 집합으로 만드는 연산입니다. 관계형 데이터베이스에서 가장 중요한 개념 중 하나입니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"JOIN이 필요한 상황"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 수강 내역을 조회하면 학생 id와 과목 id만 보임
SELECT * FROM enrollments;
-- student_id=1, course_id=1, score=85 → 누가 무슨 과목?

-- JOIN으로 학생 이름과 과목 이름을 함께 조회
SELECT s.name, c.title, e.score
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id;
-- 홍길동, 데이터베이스, 85 → 훨씬 유용한 정보!`})})]}),s.jsx("h2",{children:"2. INNER JOIN"}),s.jsx("h3",{children:"2.1 개념"}),s.jsxs("p",{children:["두 테이블에서 ",s.jsx("strong",{children:"조건이 일치하는 행만"})," 반환합니다. 교집합과 유사합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 기본 문법
SELECT 컬럼 목록
FROM 테이블A
INNER JOIN 테이블B ON 테이블A.컬럼 = 테이블B.컬럼;

-- INNER는 생략 가능
SELECT 컬럼 목록
FROM 테이블A
JOIN 테이블B ON 테이블A.컬럼 = 테이블B.컬럼;`})})]}),s.jsx("h3",{children:"2.2 실전 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학생별 수강 과목과 점수
SELECT s.name AS 학생명,
       c.title AS 과목명,
       e.score AS 점수
FROM enrollments e
INNER JOIN students s ON e.student_id = s.id
INNER JOIN courses c ON e.course_id = c.id
ORDER BY s.name, c.title;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+--------+--------------+------+
| 학생명 | 과목명       | 점수 |
+--------+--------------+------+
| 강동원 | 데이터베이스 |   78 |
| 강동원 | 자료구조     |   80 |
| 김영희 | 경영학원론   |   88 |
| 김영희 | 데이터베이스 |   75 |
| 박민지 | 데이터베이스 |   95 |
| 박민지 | 웹프로그래밍 |   92 |
| ...                          |
+--------+--------------+------+`})})]}),s.jsx("h2",{children:"3. LEFT JOIN (LEFT OUTER JOIN)"}),s.jsx("h3",{children:"3.1 개념"}),s.jsxs("p",{children:[s.jsx("strong",{children:"왼쪽 테이블의 모든 행"}),"을 반환하고, 오른쪽 테이블에서 일치하는 행이 없으면 ",s.jsx("strong",{children:"NULL"}),"로 채웁니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 모든 학생 + 수강 정보 (수강 안 한 학생도 포함)
SELECT s.name AS 학생명,
       c.title AS 과목명,
       e.score AS 점수
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN courses c ON e.course_id = c.id
ORDER BY s.name;`})})]}),s.jsxs("p",{children:["수강 내역이 없는 학생도 결과에 포함되며, 과목명과 점수는 ",s.jsx("strong",{children:"NULL"}),"로 표시됩니다."]}),s.jsx("h3",{children:'3.2 LEFT JOIN으로 "없는 데이터" 찾기'}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 아무 과목도 수강하지 않은 학생 찾기
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
WHERE e.id IS NULL;`})})]}),s.jsx("h2",{children:"4. RIGHT JOIN (RIGHT OUTER JOIN)"}),s.jsxs("p",{children:["LEFT JOIN의 반대로, ",s.jsx("strong",{children:"오른쪽 테이블의 모든 행"}),"을 반환합니다. 실무에서는 LEFT JOIN이 더 많이 사용됩니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 모든 과목 + 수강 학생 (수강생 없는 과목도 포함)
SELECT c.title AS 과목명,
       s.name AS 학생명,
       e.score AS 점수
FROM enrollments e
RIGHT JOIN courses c ON e.course_id = c.id
LEFT JOIN students s ON e.student_id = s.id
ORDER BY c.title;`})})]}),s.jsx("h2",{children:"5. CROSS JOIN"}),s.jsxs("p",{children:["두 테이블의 ",s.jsx("strong",{children:"모든 행의 조합"}),"(카르테시안 곱)을 반환합니다. 조건 없이 모든 가능한 조합을 생성합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 모든 학생 × 모든 과목 조합
SELECT s.name, c.title
FROM students s
CROSS JOIN courses c;
-- 학생 8명 × 과목 5개 = 40행

-- 활용: 빈 시간표 생성
SELECT s.name, c.title, NULL AS score
FROM students s
CROSS JOIN courses c;`})})]}),s.jsx("h2",{children:"6. Self JOIN"}),s.jsxs("p",{children:["같은 테이블을 자기 자신과 조인하는 것입니다.",s.jsx("strong",{children:"별칭"}),"을 사용하여 두 개의 다른 테이블처럼 취급합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 같은 전공의 다른 학생 쌍 찾기
SELECT a.name AS 학생1,
       b.name AS 학생2,
       a.major AS 전공
FROM students a
JOIN students b ON a.major = b.major AND a.id < b.id;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+---------+---------+------------+
| 학생1   | 학생2   | 전공       |
+---------+---------+------------+
| 홍길동  | 박민지  | 컴퓨터공학 |
| 홍길동  | 강동원  | 컴퓨터공학 |
| 박민지  | 강동원  | 컴퓨터공학 |
| 김영희  | 최지우  | 경영학     |
+---------+---------+------------+`})})]}),s.jsx("h2",{children:"7. JOIN 종류 비교"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"JOIN 종류"}),s.jsx("th",{children:"반환 행"}),s.jsx("th",{children:"사용 시나리오"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INNER JOIN"})}),s.jsx("td",{children:"양쪽 모두 일치하는 행"}),s.jsx("td",{children:"두 테이블 모두에 있는 데이터 조회"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LEFT JOIN"})}),s.jsx("td",{children:"왼쪽 전체 + 오른쪽 일치"}),s.jsx("td",{children:"왼쪽 기준으로 오른쪽 데이터 붙이기"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"RIGHT JOIN"})}),s.jsx("td",{children:"오른쪽 전체 + 왼쪽 일치"}),s.jsx("td",{children:"오른쪽 기준으로 왼쪽 데이터 붙이기"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CROSS JOIN"})}),s.jsx("td",{children:"모든 조합 (곱집합)"}),s.jsx("td",{children:"가능한 모든 조합 생성"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Self JOIN"})}),s.jsx("td",{children:"같은 테이블 내 관계"}),s.jsx("td",{children:"계층 구조, 같은 그룹 찾기"})]})]})]}),s.jsx("h2",{children:"8. 다중 테이블 JOIN"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학생 이름, 과목명, 교수명, 점수를 한 번에 조회
SELECT s.name AS 학생명,
       c.title AS 과목명,
       c.professor AS 교수명,
       e.score AS 점수,
       e.semester AS 학기
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE e.semester = '2024-1'
ORDER BY s.name;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"INNER JOIN"}),": 양쪽 테이블에 일치하는 행만 반환 (교집합)."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"LEFT JOIN"}),": 왼쪽 전체 + 오른쪽 일치하는 행 (없으면 NULL)."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"CROSS JOIN"}),": 모든 행의 조합 (카르테시안 곱)."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Self JOIN"}),": 같은 테이블을 별칭으로 두 번 사용하여 조인."]}),s.jsxs("li",{children:["테이블 ",s.jsx("strong",{children:"별칭"}),"을 사용하면 JOIN 쿼리가 훨씬 간결해진다."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," students와 enrollments를 JOIN하여 각 학생의 수강 과목 수를 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," LEFT JOIN을 사용하여 수강 신청을 하지 않은 학생을 찾으세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," 학생 이름, 과목명, 점수를 조회하되, 점수가 80 이상인 것만 표시하세요 (3개 테이블 JOIN)."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/ddl",className:"lesson-nav-btn prev",children:"← 테이블 정의 (DDL)"}),s.jsx(e,{to:"/sql/subquery",className:"lesson-nav-btn next",children:"서브쿼리 →"})]})]})})})]});export{c as default};
