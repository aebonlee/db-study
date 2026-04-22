import{j as s,L as e}from"./index-B89W_sQX.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"11. 고급 SQL"}),s.jsx("p",{children:"윈도우 함수, CTE, 뷰, 인덱스"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"윈도우 함수(Window Function)를 사용한다."}),s.jsx("li",{children:"CTE(Common Table Expression)로 복잡한 쿼리를 정리한다."}),s.jsx("li",{children:"뷰(View)를 생성하고 활용한다."}),s.jsx("li",{children:"인덱스(Index)의 개념과 사용법을 이해한다."})]})]}),s.jsx("h2",{children:"1. 윈도우 함수 (Window Function)"}),s.jsx("h3",{children:"1.1 윈도우 함수란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"윈도우 함수"}),"는 GROUP BY 없이 ",s.jsx("strong",{children:"행 단위의 집계"}),'를 수행합니다. 각 행에 대해 관련된 행들의 집합("윈도우")을 기준으로 계산하되,',s.jsx("strong",{children:"원본 행을 유지"}),"한다는 점이 GROUP BY와 다릅니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"기본 문법"}),s.jsx("pre",{children:s.jsx("code",{children:`함수명() OVER (
    [PARTITION BY 그룹컬럼]
    [ORDER BY 정렬컬럼]
    [ROWS/RANGE 프레임]
)`})})]}),s.jsx("h3",{children:"1.2 ROW_NUMBER, RANK, DENSE_RANK"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학점 순위 매기기
SELECT name, major, grade,
       ROW_NUMBER() OVER (ORDER BY grade DESC) AS 순번,
       RANK()       OVER (ORDER BY grade DESC) AS 순위,
       DENSE_RANK() OVER (ORDER BY grade DESC) AS 밀집순위
FROM students;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+--------+-------+------+------+----------+
| name   | grade | 순번 | 순위 | 밀집순위 |
+--------+-------+------+------+----------+
| 박민지 |  3.90 |    1 |    1 |        1 |
| 김영희 |  3.80 |    2 |    2 |        2 |
| 윤서연 |  3.70 |    3 |    3 |        3 |
| 최지우 |  3.60 |    4 |    4 |        4 |
| 홍길동 |  3.50 |    5 |    5 |        5 |
| ...                                      |
+--------+-------+------+------+----------+

-- ROW_NUMBER: 항상 고유한 순번 (1,2,3,4,5)
-- RANK:       동점이면 같은 순위, 다음 순위 건너뜀 (1,2,2,4,5)
-- DENSE_RANK: 동점이면 같은 순위, 다음 순위 연속 (1,2,2,3,4)`})})]}),s.jsx("h3",{children:"1.3 PARTITION BY — 그룹별 윈도우"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공별 학점 순위
SELECT name, major, grade,
       RANK() OVER (
           PARTITION BY major
           ORDER BY grade DESC
       ) AS 전공내순위
FROM students;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+--------+------------+-------+----------+
| name   | major      | grade | 전공내순위 |
+--------+------------+-------+----------+
| 김영희 | 경영학     |  3.80 |        1 |
| 최지우 | 경영학     |  3.60 |        2 |
| 박민지 | 컴퓨터공학 |  3.90 |        1 |  ← 전공별로 순위 재시작
| 홍길동 | 컴퓨터공학 |  3.50 |        2 |
| 강동원 | 컴퓨터공학 |  3.10 |        3 |
| ...                                     |
+--------+------------+-------+----------+`})})]}),s.jsx("h3",{children:"1.4 집계 윈도우 함수"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 각 행에 전체 평균, 전공별 평균 함께 표시
SELECT name, major, grade,
       ROUND(AVG(grade) OVER (), 2)                    AS 전체평균,
       ROUND(AVG(grade) OVER (PARTITION BY major), 2)  AS 전공평균,
       COUNT(*) OVER (PARTITION BY major)               AS 전공인원
FROM students;

-- 누적합 (Running Total)
SELECT name, grade,
       SUM(grade) OVER (ORDER BY id) AS 누적학점합
FROM students;`})})]}),s.jsx("h3",{children:"1.5 LAG, LEAD"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 이전/다음 학생과의 학점 비교
SELECT name, grade,
       LAG(grade, 1)  OVER (ORDER BY grade DESC) AS 이전학생학점,
       LEAD(grade, 1) OVER (ORDER BY grade DESC) AS 다음학생학점
FROM students;

-- LAG(컬럼, N): N행 이전 값
-- LEAD(컬럼, N): N행 이후 값`})})]}),s.jsx("h2",{children:"2. CTE (Common Table Expression)"}),s.jsx("h3",{children:"2.1 CTE란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"CTE"}),"는 ",s.jsx("code",{children:"WITH"})," 키워드로 임시 결과 집합을 정의하여 쿼리의 가독성을 높입니다. 서브쿼리보다 읽기 쉽고 재사용이 가능합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공별 통계를 CTE로 정의
WITH major_stats AS (
    SELECT major,
           COUNT(*) AS student_count,
           ROUND(AVG(grade), 2) AS avg_grade
    FROM students
    GROUP BY major
)
SELECT major, student_count, avg_grade
FROM major_stats
WHERE avg_grade >= 3.5
ORDER BY avg_grade DESC;`})})]}),s.jsx("h3",{children:"2.2 다중 CTE"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 여러 CTE를 동시에 정의
WITH
student_scores AS (
    SELECT s.id, s.name, s.major,
           ROUND(AVG(e.score), 1) AS avg_score
    FROM students s
    JOIN enrollments e ON s.id = e.student_id
    GROUP BY s.id, s.name, s.major
),
major_avg AS (
    SELECT major,
           ROUND(AVG(avg_score), 1) AS major_avg_score
    FROM student_scores
    GROUP BY major
)
SELECT ss.name, ss.major, ss.avg_score,
       ma.major_avg_score,
       ss.avg_score - ma.major_avg_score AS 차이
FROM student_scores ss
JOIN major_avg ma ON ss.major = ma.major
ORDER BY 차이 DESC;`})})]}),s.jsx("h2",{children:"3. 뷰 (View)"}),s.jsx("h3",{children:"3.1 뷰란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"뷰(View)"}),"는 SELECT 문을 저장한 ",s.jsx("strong",{children:"가상 테이블"}),"입니다. 실제 데이터를 저장하지 않고, 호출할 때마다 원본 테이블에서 데이터를 가져옵니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 뷰 생성
CREATE VIEW student_course_view AS
SELECT s.name AS 학생명,
       c.title AS 과목명,
       c.professor AS 교수명,
       e.score AS 점수
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id;

-- 뷰 사용 (일반 테이블처럼 조회)
SELECT * FROM student_course_view;
SELECT * FROM student_course_view WHERE 점수 >= 80;

-- 뷰 수정
CREATE OR REPLACE VIEW student_course_view AS
SELECT ... (새로운 쿼리);

-- 뷰 삭제
DROP VIEW IF EXISTS student_course_view;`})})]}),s.jsx("h3",{children:"3.2 뷰의 장점"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"쿼리 간소화"}),": 복잡한 JOIN을 뷰로 만들어 간단히 사용"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"보안"}),": 민감한 컬럼을 제외한 뷰를 제공"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"독립성"}),": 테이블 구조 변경 시 뷰만 수정하면 됨"]})]}),s.jsx("h2",{children:"4. 인덱스 (Index)"}),s.jsx("h3",{children:"4.1 인덱스란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"인덱스"}),"는 테이블의 데이터를 빠르게 검색하기 위한 ",s.jsx("strong",{children:"자료구조"}),"입니다. 책의 색인(Index)처럼 원하는 데이터의 위치를 빠르게 찾아줍니다."]}),s.jsx("h3",{children:"4.2 인덱스 생성과 관리"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 인덱스 생성
CREATE INDEX idx_students_major ON students(major);

-- 복합 인덱스 (여러 컬럼)
CREATE INDEX idx_students_major_grade ON students(major, grade);

-- 유니크 인덱스
CREATE UNIQUE INDEX idx_students_email ON students(email);

-- 인덱스 확인
SHOW INDEX FROM students;

-- 인덱스 삭제
DROP INDEX idx_students_major ON students;`})})]}),s.jsx("h3",{children:"4.3 인덱스 사용 시 고려사항"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"인덱스가 유리한 경우"}),s.jsx("th",{children:"인덱스가 불리한 경우"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:"WHERE, JOIN, ORDER BY에 자주 사용되는 컬럼"}),s.jsx("td",{children:"INSERT, UPDATE, DELETE가 빈번한 테이블"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"값의 종류가 많은 컬럼 (높은 카디널리티)"}),s.jsx("td",{children:"값의 종류가 적은 컬럼 (성별, 참/거짓 등)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:"대용량 테이블의 검색 속도 개선"}),s.jsx("td",{children:"소규모 테이블 (오히려 오버헤드)"})]})]})]}),s.jsx("h3",{children:"4.4 실행 계획 (EXPLAIN)"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 쿼리 실행 계획 확인
EXPLAIN SELECT * FROM students WHERE major = '컴퓨터공학';

-- 인덱스 사용 여부, 스캔 방식 등을 확인할 수 있음
-- type: ALL(풀스캔), ref(인덱스 사용), const(상수), index(인덱스 스캔)`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"윈도우 함수"}),": 행을 유지하면서 집계/순위/비교를 수행한다 (OVER 절 사용)."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"CTE"}),": WITH 절로 임시 결과를 정의하여 가독성을 높인다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"뷰"}),": 복잡한 쿼리를 가상 테이블로 저장하여 재사용한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"인덱스"}),": 검색 속도를 향상시키지만 쓰기 성능에 영향을 줄 수 있다."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 윈도우 함수를 사용하여 전공별 학점 순위를 매기세요 (RANK + PARTITION BY)."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," CTE를 사용하여 수강 과목이 2개 이상인 학생의 이름과 수강 과목 수를 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," students 테이블의 major 컬럼에 인덱스를 생성하고, EXPLAIN으로 효과를 확인하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/subquery",className:"lesson-nav-btn prev",children:"← 서브쿼리"}),s.jsx(e,{to:"/sql/design",className:"lesson-nav-btn next",children:"DB 설계 →"})]})]})})})]});export{r as default};
