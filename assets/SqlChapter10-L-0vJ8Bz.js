import{j as s,L as e}from"./index-PxxDzTRM.js";const n=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"10. 서브쿼리"}),s.jsx("p",{children:"스칼라, 인라인 뷰, 상관 서브쿼리, EXISTS"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"서브쿼리의 개념과 종류를 이해한다."}),s.jsx("li",{children:"WHERE 절, SELECT 절, FROM 절에서 서브쿼리를 사용한다."}),s.jsx("li",{children:"상관 서브쿼리와 비상관 서브쿼리를 구분한다."}),s.jsx("li",{children:"EXISTS, IN과 서브쿼리를 조합하여 활용한다."})]})]}),s.jsx("h2",{children:"1. 서브쿼리란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"서브쿼리(Subquery)"}),"는 SQL 문 안에 포함된 ",s.jsx("strong",{children:"또 다른 SQL 문"}),"입니다. 괄호 ",s.jsx("code",{children:"()"}),"로 감싸며, 외부 쿼리(메인 쿼리)에 값을 제공합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"서브쿼리 기본 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 평균 학점보다 높은 학생 조회
SELECT name, grade
FROM students
WHERE grade > (SELECT AVG(grade) FROM students);
--             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
--             이 부분이 서브쿼리 (평균 학점 = 3.45)`})})]}),s.jsx("h2",{children:"2. 서브쿼리의 위치별 분류"}),s.jsx("h3",{children:"2.1 WHERE 절 서브쿼리"}),s.jsx("p",{children:"가장 일반적인 형태로, 조건의 값을 서브쿼리로 가져옵니다."}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 단일 행 서브쿼리: 하나의 값 반환
-- 가장 높은 학점의 학생
SELECT name, grade
FROM students
WHERE grade = (SELECT MAX(grade) FROM students);

-- 다중 행 서브쿼리: 여러 값 반환 → IN 사용
-- '데이터베이스' 과목을 수강하는 학생
SELECT name
FROM students
WHERE id IN (
    SELECT student_id
    FROM enrollments
    WHERE course_id = (
        SELECT id FROM courses WHERE title = '데이터베이스'
    )
);`})})]}),s.jsx("h3",{children:"2.2 스칼라 서브쿼리 (SELECT 절)"}),s.jsxs("p",{children:[s.jsx("strong",{children:"스칼라 서브쿼리"}),"는 SELECT 절에서 사용되며, ",s.jsx("strong",{children:"반드시 하나의 값"}),"만 반환해야 합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 각 학생의 학점과 전체 평균 학점의 차이
SELECT name,
       grade,
       ROUND(grade - (SELECT AVG(grade) FROM students), 2) AS 평균과의차이
FROM students;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+--------+-------+-------------+
| name   | grade | 평균과의차이 |
+--------+-------+-------------+
| 홍길동 |  3.50 |        0.05 |
| 김영희 |  3.80 |        0.35 |
| 이철수 |  3.20 |       -0.25 |
| 박민지 |  3.90 |        0.45 |
| 정수현 |  2.80 |       -0.65 |
| ...                           |
+--------+-------+-------------+`})})]}),s.jsx("h3",{children:"2.3 인라인 뷰 (FROM 절 서브쿼리)"}),s.jsxs("p",{children:[s.jsx("strong",{children:"인라인 뷰"}),"는 FROM 절에서 임시 테이블처럼 사용되는 서브쿼리입니다. 반드시 ",s.jsx("strong",{children:"별칭"}),"을 지정해야 합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공별 평균 학점 테이블을 만들고, 3.5 이상인 전공 조회
SELECT *
FROM (
    SELECT major,
           COUNT(*) AS 학생수,
           ROUND(AVG(grade), 2) AS 평균학점
    FROM students
    GROUP BY major
) AS major_stats        -- 반드시 별칭 필요!
WHERE 평균학점 >= 3.5;`})})]}),s.jsx("h2",{children:"3. 상관 서브쿼리"}),s.jsx("h3",{children:"3.1 비상관 vs 상관 서브쿼리"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"구분"}),s.jsx("th",{children:"비상관 서브쿼리"}),s.jsx("th",{children:"상관 서브쿼리"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"실행 방식"})}),s.jsx("td",{children:"한 번 실행 후 결과 재사용"}),s.jsx("td",{children:"외부 행마다 반복 실행"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"외부 참조"})}),s.jsx("td",{children:"외부 쿼리를 참조하지 않음"}),s.jsx("td",{children:"외부 쿼리의 컬럼을 참조"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"성능"})}),s.jsx("td",{children:"상대적으로 빠름"}),s.jsx("td",{children:"데이터가 많으면 느릴 수 있음"})]})]})]}),s.jsx("h3",{children:"3.2 상관 서브쿼리 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 같은 전공 내에서 평균 학점보다 높은 학생
SELECT s1.name, s1.major, s1.grade
FROM students s1
WHERE s1.grade > (
    SELECT AVG(s2.grade)
    FROM students s2
    WHERE s2.major = s1.major    -- 외부 쿼리의 s1.major를 참조!
);`})})]}),s.jsx("h2",{children:"4. EXISTS / NOT EXISTS"}),s.jsx("h3",{children:"4.1 EXISTS"}),s.jsxs("p",{children:[s.jsx("strong",{children:"EXISTS"}),"는 서브쿼리의 결과가 ",s.jsx("strong",{children:"한 행이라도 존재하면 TRUE"}),"를 반환합니다. 주로 상관 서브쿼리와 함께 사용됩니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 수강 내역이 있는 학생만 조회
SELECT s.name, s.major
FROM students s
WHERE EXISTS (
    SELECT 1
    FROM enrollments e
    WHERE e.student_id = s.id
);

-- 수강 내역이 없는 학생 조회
SELECT s.name, s.major
FROM students s
WHERE NOT EXISTS (
    SELECT 1
    FROM enrollments e
    WHERE e.student_id = s.id
);`})})]}),s.jsx("h3",{children:"4.2 EXISTS vs IN 비교"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- IN 사용
SELECT name FROM students
WHERE id IN (SELECT student_id FROM enrollments);

-- EXISTS 사용 (동일 결과)
SELECT name FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.id
);

-- 일반적으로:
-- 서브쿼리 결과가 적으면 → IN이 효율적
-- 서브쿼리 결과가 많으면 → EXISTS가 효율적`})})]}),s.jsx("h2",{children:"5. 서브쿼리 실전 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 1. 가장 많은 수강생이 있는 과목명
SELECT title
FROM courses
WHERE id = (
    SELECT course_id
    FROM enrollments
    GROUP BY course_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);

-- 2. 전공별 최고 학점 학생
SELECT name, major, grade
FROM students s1
WHERE grade = (
    SELECT MAX(grade)
    FROM students s2
    WHERE s2.major = s1.major
);

-- 3. 평균 점수가 80 이상인 학생의 이름과 평균 점수
SELECT s.name,
       (SELECT ROUND(AVG(e.score), 1)
        FROM enrollments e
        WHERE e.student_id = s.id) AS 평균점수
FROM students s
WHERE (SELECT AVG(e.score)
       FROM enrollments e
       WHERE e.student_id = s.id) >= 80;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"서브쿼리"}),"는 SQL 안에 포함된 또 다른 SQL이다."]}),s.jsxs("li",{children:["위치에 따라 ",s.jsx("strong",{children:"WHERE절"}),", ",s.jsx("strong",{children:"스칼라(SELECT절)"}),", ",s.jsx("strong",{children:"인라인 뷰(FROM절)"}),"로 구분된다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"상관 서브쿼리"}),"는 외부 쿼리의 컬럼을 참조하며, 행마다 반복 실행된다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"EXISTS"}),"는 서브쿼리 결과의 존재 여부를 확인한다."]}),s.jsxs("li",{children:["서브쿼리 대신 ",s.jsx("strong",{children:"JOIN"}),"으로 대체할 수 있는 경우가 많다."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 전체 평균 학점보다 높은 학점의 학생 이름과 학점을 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," '데이터베이스' 과목을 수강하는 학생의 이름을 서브쿼리로 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," EXISTS를 사용하여 수강 내역이 없는 학생을 조회하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/join",className:"lesson-nav-btn prev",children:"← JOIN"}),s.jsx(e,{to:"/sql/advanced",className:"lesson-nav-btn next",children:"고급 SQL →"})]})]})})})]});export{n as default};
