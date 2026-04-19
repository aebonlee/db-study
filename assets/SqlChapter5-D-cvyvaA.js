import{j as s,L as d}from"./index-BNxIBIdV.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"05. 함수와 표현식"}),s.jsx("p",{children:"문자열, 숫자, 날짜 함수, CASE, NULL 처리"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"문자열 함수를 사용하여 텍스트를 가공한다."}),s.jsx("li",{children:"숫자 함수를 활용하여 계산을 수행한다."}),s.jsx("li",{children:"날짜 함수로 날짜/시간 데이터를 처리한다."}),s.jsx("li",{children:"CASE 표현식으로 조건에 따라 값을 변환한다."}),s.jsx("li",{children:"IFNULL, COALESCE로 NULL 값을 처리한다."})]})]}),s.jsx("h2",{children:"1. 문자열 함수"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"함수"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"예시"}),s.jsx("th",{children:"결과"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CONCAT"})}),s.jsx("td",{children:"문자열 연결"}),s.jsx("td",{children:"CONCAT('홍', '길동')"}),s.jsx("td",{children:"'홍길동'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LENGTH"})}),s.jsx("td",{children:"바이트 수"}),s.jsx("td",{children:"LENGTH('abc')"}),s.jsx("td",{children:"3"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CHAR_LENGTH"})}),s.jsx("td",{children:"문자 수"}),s.jsx("td",{children:"CHAR_LENGTH('홍길동')"}),s.jsx("td",{children:"3"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"UPPER"})}),s.jsx("td",{children:"대문자 변환"}),s.jsx("td",{children:"UPPER('hello')"}),s.jsx("td",{children:"'HELLO'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LOWER"})}),s.jsx("td",{children:"소문자 변환"}),s.jsx("td",{children:"LOWER('HELLO')"}),s.jsx("td",{children:"'hello'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"SUBSTRING"})}),s.jsx("td",{children:"부분 문자열"}),s.jsx("td",{children:"SUBSTRING('Hello', 1, 3)"}),s.jsx("td",{children:"'Hel'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TRIM"})}),s.jsx("td",{children:"공백 제거"}),s.jsx("td",{children:"TRIM('  hi  ')"}),s.jsx("td",{children:"'hi'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"REPLACE"})}),s.jsx("td",{children:"문자열 치환"}),s.jsx("td",{children:"REPLACE('abc', 'b', 'x')"}),s.jsx("td",{children:"'axc'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LEFT / RIGHT"})}),s.jsx("td",{children:"왼쪽/오른쪽 N자"}),s.jsx("td",{children:"LEFT('Hello', 2)"}),s.jsx("td",{children:"'He'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LPAD / RPAD"})}),s.jsx("td",{children:"왼쪽/오른쪽 채우기"}),s.jsx("td",{children:"LPAD('5', 3, '0')"}),s.jsx("td",{children:"'005'"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL 실전 예제"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 이름과 전공을 연결하여 출력
SELECT CONCAT(name, ' (', major, ')') AS 학생정보
FROM students;
-- 결과: 홍길동 (컴퓨터공학)

-- 이메일에서 @ 앞부분만 추출
SELECT name,
       SUBSTRING(email, 1, LOCATE('@', email) - 1) AS 아이디
FROM students;

-- 이름 글자 수
SELECT name, CHAR_LENGTH(name) AS 이름길이
FROM students;`})})]}),s.jsx("h2",{children:"2. 숫자 함수"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"함수"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"예시"}),s.jsx("th",{children:"결과"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"ROUND"})}),s.jsx("td",{children:"반올림"}),s.jsx("td",{children:"ROUND(3.567, 1)"}),s.jsx("td",{children:"3.6"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CEIL / CEILING"})}),s.jsx("td",{children:"올림"}),s.jsx("td",{children:"CEIL(3.1)"}),s.jsx("td",{children:"4"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"FLOOR"})}),s.jsx("td",{children:"내림"}),s.jsx("td",{children:"FLOOR(3.9)"}),s.jsx("td",{children:"3"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TRUNCATE"})}),s.jsx("td",{children:"소수점 절삭"}),s.jsx("td",{children:"TRUNCATE(3.567, 1)"}),s.jsx("td",{children:"3.5"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"ABS"})}),s.jsx("td",{children:"절대값"}),s.jsx("td",{children:"ABS(-5)"}),s.jsx("td",{children:"5"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"MOD"})}),s.jsx("td",{children:"나머지"}),s.jsx("td",{children:"MOD(10, 3)"}),s.jsx("td",{children:"1"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"POWER"})}),s.jsx("td",{children:"거듭제곱"}),s.jsx("td",{children:"POWER(2, 3)"}),s.jsx("td",{children:"8"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"SQRT"})}),s.jsx("td",{children:"제곱근"}),s.jsx("td",{children:"SQRT(16)"}),s.jsx("td",{children:"4"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL 실전 예제"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학점을 소수 첫째자리까지 반올림
SELECT name, ROUND(grade, 1) AS 학점
FROM students;

-- 학점을 100점 만점으로 환산 후 반올림
SELECT name,
       grade,
       ROUND(grade * 25, 0) AS "100점 환산"
FROM students;`})})]}),s.jsx("h2",{children:"3. 날짜 함수"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"함수"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"NOW()"})}),s.jsx("td",{children:"현재 날짜+시간"}),s.jsx("td",{children:"2024-03-15 14:30:00"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CURDATE()"})}),s.jsx("td",{children:"현재 날짜"}),s.jsx("td",{children:"2024-03-15"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CURTIME()"})}),s.jsx("td",{children:"현재 시간"}),s.jsx("td",{children:"14:30:00"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"YEAR()"})}),s.jsx("td",{children:"연도 추출"}),s.jsx("td",{children:"YEAR('2024-03-15') → 2024"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"MONTH()"})}),s.jsx("td",{children:"월 추출"}),s.jsx("td",{children:"MONTH('2024-03-15') → 3"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DAY()"})}),s.jsx("td",{children:"일 추출"}),s.jsx("td",{children:"DAY('2024-03-15') → 15"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DATEDIFF"})}),s.jsx("td",{children:"날짜 차이(일)"}),s.jsx("td",{children:"DATEDIFF('2024-03-15', '2024-03-01') → 14"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DATE_ADD"})}),s.jsx("td",{children:"날짜 더하기"}),s.jsx("td",{children:"DATE_ADD('2024-03-15', INTERVAL 7 DAY)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DATE_FORMAT"})}),s.jsx("td",{children:"날짜 포맷"}),s.jsx("td",{children:"DATE_FORMAT(NOW(), '%Y년 %m월 %d일')"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL 실전 예제"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 입학 후 경과 일수
SELECT name,
       enrolled,
       DATEDIFF(CURDATE(), enrolled) AS 경과일수
FROM students;

-- 입학 연도별 학생 수
SELECT YEAR(enrolled) AS 입학연도,
       COUNT(*) AS 학생수
FROM students
GROUP BY YEAR(enrolled);

-- 날짜 포맷 변경
SELECT name,
       DATE_FORMAT(enrolled, '%Y년 %m월 %d일') AS 입학일
FROM students;`})})]}),s.jsx("h2",{children:"4. CASE 표현식"}),s.jsx("h3",{children:"4.1 단순 CASE"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공별 계열 분류
SELECT name, major,
       CASE major
           WHEN '컴퓨터공학' THEN '공학 계열'
           WHEN '전자공학'   THEN '공학 계열'
           WHEN '경영학'     THEN '상경 계열'
           WHEN '수학과'     THEN '자연 계열'
           ELSE '기타'
       END AS 계열
FROM students;`})})]}),s.jsx("h3",{children:"4.2 검색 CASE"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학점에 따른 등급
SELECT name, grade,
       CASE
           WHEN grade >= 3.5 THEN 'A (우수)'
           WHEN grade >= 3.0 THEN 'B (양호)'
           WHEN grade >= 2.5 THEN 'C (보통)'
           ELSE 'D (미흡)'
       END AS 등급
FROM students;`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행 결과"}),s.jsx("pre",{children:s.jsx("code",{children:`+--------+-------+-----------+
| name   | grade | 등급      |
+--------+-------+-----------+
| 홍길동 |  3.50 | A (우수)  |
| 김영희 |  3.80 | A (우수)  |
| 이철수 |  3.20 | B (양호)  |
| 박민지 |  3.90 | A (우수)  |
| 정수현 |  2.80 | C (보통)  |
| ...                        |
+--------+-------+-----------+`})})]}),s.jsx("h2",{children:"5. NULL 처리 함수"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"함수"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"IFNULL(a, b)"})}),s.jsx("td",{children:"a가 NULL이면 b 반환"}),s.jsx("td",{children:"IFNULL(age, 0)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"COALESCE(a, b, c, ...)"})}),s.jsx("td",{children:"첫 번째 NULL이 아닌 값 반환"}),s.jsx("td",{children:"COALESCE(phone, email, '없음')"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"NULLIF(a, b)"})}),s.jsx("td",{children:"a = b이면 NULL 반환"}),s.jsx("td",{children:"NULLIF(score, 0)"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL 실전 예제"}),s.jsx("pre",{children:s.jsx("code",{children:`-- NULL인 나이를 '미입력'으로 표시
SELECT name,
       IFNULL(CAST(age AS CHAR), '미입력') AS 나이
FROM students;

-- COALESCE로 여러 값 중 NULL이 아닌 첫 번째 값
SELECT COALESCE(phone, email, '연락처 없음') AS 연락처
FROM students;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"문자열 함수"}),": CONCAT, SUBSTRING, UPPER, LOWER, TRIM, REPLACE 등"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"숫자 함수"}),": ROUND, CEIL, FLOOR, ABS, MOD 등"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"날짜 함수"}),": NOW, CURDATE, DATEDIFF, DATE_FORMAT 등"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"CASE"}),": 조건에 따라 다른 값을 반환하는 조건 표현식"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"NULL 처리"}),": IFNULL, COALESCE로 NULL을 대체 값으로 변환"]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."}),' 학생 이름과 전공을 "홍길동 - 컴퓨터공학" 형식으로 출력하세요 (CONCAT 사용).']}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," 학생의 입학 후 경과 일수를 계산하여 이름, 입학일, 경과일수를 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," CASE를 사용하여 학점 3.5 이상은 '장학금 대상', 미만은 '해당 없음'으로 표시하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(d,{to:"/sql/sort",className:"lesson-nav-btn prev",children:"← 정렬과 제한"}),s.jsx(d,{to:"/sql/aggregate",className:"lesson-nav-btn next",children:"데이터 집계 →"})]})]})})})]});export{r as default};
