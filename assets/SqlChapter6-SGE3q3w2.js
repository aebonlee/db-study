import{j as s,L as e}from"./index-DSU11JyL.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"06. 데이터 집계"}),s.jsx("p",{children:"COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"집계 함수(COUNT, SUM, AVG, MIN, MAX)를 사용한다."}),s.jsx("li",{children:"GROUP BY로 그룹별 집계를 수행한다."}),s.jsx("li",{children:"HAVING으로 그룹 필터링을 한다."}),s.jsx("li",{children:"GROUP BY와 WHERE/HAVING의 차이를 이해한다."})]})]}),s.jsx("h2",{children:"1. 집계 함수"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"함수"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"NULL 처리"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"COUNT(*)"})}),s.jsx("td",{children:"전체 행 수"}),s.jsx("td",{children:"NULL 포함"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"COUNT(컬럼)"})}),s.jsx("td",{children:"NULL이 아닌 값의 수"}),s.jsx("td",{children:"NULL 제외"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"SUM(컬럼)"})}),s.jsx("td",{children:"합계"}),s.jsx("td",{children:"NULL 제외"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"AVG(컬럼)"})}),s.jsx("td",{children:"평균"}),s.jsx("td",{children:"NULL 제외"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"MIN(컬럼)"})}),s.jsx("td",{children:"최솟값"}),s.jsx("td",{children:"NULL 제외"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"MAX(컬럼)"})}),s.jsx("td",{children:"최댓값"}),s.jsx("td",{children:"NULL 제외"})]})]})]}),s.jsx("h3",{children:"1.1 기본 사용"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전체 학생 수
SELECT COUNT(*) AS 학생수 FROM students;
-- 결과: 8

-- 평균 학점
SELECT AVG(grade) AS 평균학점 FROM students;
-- 결과: 3.4500

-- 최고 학점 / 최저 학점
SELECT MAX(grade) AS 최고학점,
       MIN(grade) AS 최저학점
FROM students;
-- 결과: 3.90 / 2.80

-- 나이 합계
SELECT SUM(age) AS 나이합계 FROM students;`})})]}),s.jsx("h3",{children:"1.2 COUNT의 차이"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- COUNT(*): NULL 포함 전체 행 수
SELECT COUNT(*) FROM students;        -- 8

-- COUNT(컬럼): NULL 제외
SELECT COUNT(email) FROM students;    -- 이메일이 있는 학생 수

-- COUNT(DISTINCT 컬럼): 중복 제외
SELECT COUNT(DISTINCT major) FROM students;  -- 전공 종류 수: 5`})})]}),s.jsx("h2",{children:"2. GROUP BY — 그룹별 집계"}),s.jsx("h3",{children:"2.1 기본 문법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`SELECT 그룹컬럼, 집계함수(컬럼)
FROM 테이블명
GROUP BY 그룹컬럼;`})})]}),s.jsx("h3",{children:"2.2 전공별 통계"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공별 학생 수
SELECT major AS 전공,
       COUNT(*) AS 학생수
FROM students
GROUP BY major;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+------------+--------+
| 전공       | 학생수 |
+------------+--------+
| 컴퓨터공학 |      3 |
| 경영학     |      2 |
| 전자공학   |      1 |
| 수학과     |      1 |
| 디자인학   |      1 |
+------------+--------+`})})]}),s.jsx("h3",{children:"2.3 다양한 집계 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공별 평균 학점
SELECT major AS 전공,
       COUNT(*) AS 학생수,
       ROUND(AVG(grade), 2) AS 평균학점,
       MAX(grade) AS 최고학점,
       MIN(grade) AS 최저학점
FROM students
GROUP BY major;

-- 입학 연도별 학생 수
SELECT YEAR(enrolled) AS 입학연도,
       COUNT(*) AS 학생수
FROM students
GROUP BY YEAR(enrolled)
ORDER BY 입학연도;

-- 나이대별 학생 수
SELECT age, COUNT(*) AS 학생수
FROM students
GROUP BY age
ORDER BY age;`})})]}),s.jsx("h2",{children:"3. HAVING — 그룹 필터링"}),s.jsx("h3",{children:"3.1 HAVING vs WHERE"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"구분"}),s.jsx("th",{children:"WHERE"}),s.jsx("th",{children:"HAVING"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"실행 시점"})}),s.jsx("td",{children:"그룹화 전"}),s.jsx("td",{children:"그룹화 후"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"대상"})}),s.jsx("td",{children:"개별 행"}),s.jsx("td",{children:"그룹"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"집계 함수"})}),s.jsx("td",{children:"사용 불가"}),s.jsx("td",{children:"사용 가능"})]})]})]}),s.jsx("h3",{children:"3.2 HAVING 사용 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 2명 이상인 전공만 표시
SELECT major, COUNT(*) AS 학생수
FROM students
GROUP BY major
HAVING COUNT(*) >= 2;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+------------+--------+
| major      | 학생수 |
+------------+--------+
| 컴퓨터공학 |      3 |
| 경영학     |      2 |
+------------+--------+`})})]}),s.jsx("h3",{children:"3.3 WHERE + GROUP BY + HAVING 조합"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학점 3.0 이상인 학생 중, 전공별 평균 학점이 3.5 이상인 전공
SELECT major AS 전공,
       COUNT(*) AS 학생수,
       ROUND(AVG(grade), 2) AS 평균학점
FROM students
WHERE grade >= 3.0           -- ① 개별 행 필터 (그룹화 전)
GROUP BY major               -- ② 그룹화
HAVING AVG(grade) >= 3.5     -- ③ 그룹 필터 (그룹화 후)
ORDER BY 평균학점 DESC;       -- ④ 정렬`})})]}),s.jsx("h2",{children:"4. GROUP BY 주의사항"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ✗ 잘못된 쿼리: GROUP BY에 없는 컬럼을 SELECT에 사용
SELECT name, major, COUNT(*)
FROM students
GROUP BY major;
-- → name은 어떤 값을 보여줘야 할지 모호함 (에러 발생)

-- ✓ 올바른 쿼리: GROUP BY 컬럼 + 집계 함수만 SELECT
SELECT major, COUNT(*)
FROM students
GROUP BY major;

-- ✓ 올바른 쿼리: GROUP BY에 포함된 컬럼은 SELECT 가능
SELECT major, age, COUNT(*)
FROM students
GROUP BY major, age;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"집계 함수"}),": COUNT, SUM, AVG, MIN, MAX는 여러 행을 하나의 값으로 요약한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"GROUP BY"}),"는 특정 컬럼의 값이 같은 행끼리 그룹화한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"HAVING"}),"은 그룹화 후 조건을 필터링한다 (vs WHERE는 그룹화 전)."]}),s.jsx("li",{children:"SELECT에는 GROUP BY에 포함된 컬럼과 집계 함수만 사용 가능하다."})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 전체 학생의 평균 나이와 평균 학점을 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," 전공별 학생 수와 평균 학점을 조회하되, 학생 수가 2명 이상인 전공만 표시하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," 과목별 수강 학생 수와 평균 점수를 조회하세요 (enrollments 테이블 사용)."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/function",className:"lesson-nav-btn prev",children:"← 함수와 표현식"}),s.jsx(e,{to:"/sql/dml",className:"lesson-nav-btn next",children:"데이터 조작 (DML) →"})]})]})})})]});export{r as default};
