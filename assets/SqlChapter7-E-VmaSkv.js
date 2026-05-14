import{j as s,L as e}from"./index-7qo320fS.js";const c=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"07. 데이터 조작 (DML)"}),s.jsx("p",{children:"INSERT, UPDATE, DELETE"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"INSERT로 새로운 데이터를 삽입한다."}),s.jsx("li",{children:"UPDATE로 기존 데이터를 수정한다."}),s.jsx("li",{children:"DELETE로 데이터를 삭제한다."}),s.jsx("li",{children:"DML 사용 시 주의사항을 이해한다."})]})]}),s.jsx("h2",{children:"1. INSERT — 데이터 삽입"}),s.jsx("h3",{children:"1.1 기본 문법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 모든 컬럼에 값 입력 (컬럼 순서대로)
INSERT INTO 테이블명
VALUES (값1, 값2, 값3, ...);

-- 특정 컬럼만 입력 (나머지는 기본값 또는 NULL)
INSERT INTO 테이블명 (컬럼1, 컬럼2)
VALUES (값1, 값2);`})})]}),s.jsx("h3",{children:"1.2 기본 INSERT"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 특정 컬럼에 데이터 삽입
INSERT INTO students (name, age, major, grade, enrolled, email)
VALUES ('신짱구', 19, '미술학', 2.50, '2024-03-02', 'shin@school.ac.kr');

-- 확인
SELECT * FROM students WHERE name = '신짱구';`})})]}),s.jsx("h3",{children:"1.3 여러 행 한 번에 삽입"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`INSERT INTO students (name, age, major, grade, enrolled, email)
VALUES
    ('김민수', 21, '물리학',   3.40, '2023-03-02', 'minsu@school.ac.kr'),
    ('이하나', 20, '화학과',   3.60, '2024-03-02', 'hana@school.ac.kr'),
    ('최준호', 22, '경영학',   3.10, '2022-03-02', 'junho@school.ac.kr');`})})]}),s.jsx("h3",{children:"1.4 INSERT ... SELECT"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 다른 테이블의 데이터를 복사하여 삽입
INSERT INTO honor_students (name, major, grade)
SELECT name, major, grade
FROM students
WHERE grade >= 3.5;`})})]}),s.jsx("h2",{children:"2. UPDATE — 데이터 수정"}),s.jsx("h3",{children:"2.1 기본 문법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`UPDATE 테이블명
SET 컬럼1 = 값1, 컬럼2 = 값2, ...
WHERE 조건;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"주의"}),s.jsx("ul",{children:s.jsxs("li",{children:[s.jsx("strong",{children:"WHERE 절을 반드시 작성하세요!"})," WHERE 없이 UPDATE를 실행하면 ",s.jsx("strong",{children:"모든 행"}),"이 수정됩니다."]})})]}),s.jsx("h3",{children:"2.2 단일 행 수정"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 홍길동의 학점 수정
UPDATE students
SET grade = 3.70
WHERE name = '홍길동';

-- id로 특정 행 수정 (더 안전)
UPDATE students
SET grade = 3.70
WHERE id = 1;`})})]}),s.jsx("h3",{children:"2.3 여러 컬럼 동시 수정"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 여러 컬럼 한 번에 수정
UPDATE students
SET age = 21,
    major = '소프트웨어공학',
    grade = 3.60
WHERE id = 1;`})})]}),s.jsx("h3",{children:"2.4 조건에 맞는 여러 행 수정"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 컴퓨터공학 전공 학생 전체의 학점을 0.1 올리기
UPDATE students
SET grade = grade + 0.1
WHERE major = '컴퓨터공학';

-- 확인
SELECT name, grade FROM students WHERE major = '컴퓨터공학';`})})]}),s.jsx("h2",{children:"3. DELETE — 데이터 삭제"}),s.jsx("h3",{children:"3.1 기본 문법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`DELETE FROM 테이블명
WHERE 조건;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"주의"}),s.jsx("ul",{children:s.jsxs("li",{children:[s.jsx("strong",{children:"WHERE 절을 반드시 작성하세요!"})," WHERE 없이 DELETE를 실행하면 ",s.jsx("strong",{children:"모든 행"}),"이 삭제됩니다."]})})]}),s.jsx("h3",{children:"3.2 DELETE 사용 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 특정 학생 삭제
DELETE FROM students
WHERE id = 9;

-- 조건에 맞는 여러 행 삭제
DELETE FROM students
WHERE grade < 2.0;

-- 삭제 전 확인 (습관 들이기!)
SELECT * FROM students WHERE grade < 2.0;
-- → 삭제 대상 확인 후 DELETE 실행`})})]}),s.jsx("h3",{children:"3.3 DELETE vs TRUNCATE vs DROP"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"명령어"}),s.jsx("th",{children:"분류"}),s.jsx("th",{children:"동작"}),s.jsx("th",{children:"복구"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DELETE"})}),s.jsx("td",{children:"DML"}),s.jsx("td",{children:"조건에 맞는 행 삭제"}),s.jsx("td",{children:"ROLLBACK 가능"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TRUNCATE"})}),s.jsx("td",{children:"DDL"}),s.jsx("td",{children:"전체 행 삭제 (구조 유지)"}),s.jsx("td",{children:"ROLLBACK 불가"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DROP"})}),s.jsx("td",{children:"DDL"}),s.jsx("td",{children:"테이블 자체 삭제"}),s.jsx("td",{children:"ROLLBACK 불가"})]})]})]}),s.jsx("h2",{children:"4. 안전한 DML 사용 가이드"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"안전한 DML 사용 패턴"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 1단계: SELECT로 대상 확인
SELECT * FROM students WHERE id = 5;

-- 2단계: UPDATE 또는 DELETE 실행
UPDATE students SET grade = 3.5 WHERE id = 5;

-- 3단계: 결과 확인
SELECT * FROM students WHERE id = 5;

-- ⚠️ 실수 방지: Safe Updates 모드 (MySQL)
SET SQL_SAFE_UPDATES = 1;
-- → WHERE 없이 UPDATE/DELETE 실행 시 에러 발생`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"INSERT"}),": 새로운 행을 추가한다. 여러 행을 한 번에 삽입할 수 있다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"UPDATE"}),": 기존 행의 값을 수정한다. WHERE 필수!"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"DELETE"}),": 행을 삭제한다. WHERE 필수!"]}),s.jsxs("li",{children:["DML 실행 전 ",s.jsx("strong",{children:"SELECT로 대상을 먼저 확인"}),"하는 습관을 들이자."]}),s.jsx("li",{children:"DELETE는 ROLLBACK 가능하지만, TRUNCATE와 DROP은 불가능하다."})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," students 테이블에 새 학생(이름: 한소희, 나이: 21, 전공: 디자인학, 학점: 3.85)을 추가하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," id가 3인 학생의 전공을 '컴퓨터공학'으로, 학점을 3.50으로 수정하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," 학점이 3.0 미만인 학생을 삭제하세요 (삭제 전 SELECT로 확인)."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/aggregate",className:"lesson-nav-btn prev",children:"← 데이터 집계"}),s.jsx(e,{to:"/sql/ddl",className:"lesson-nav-btn next",children:"테이블 정의 (DDL) →"})]})]})})})]});export{c as default};
