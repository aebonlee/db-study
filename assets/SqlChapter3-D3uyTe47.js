import{j as s,L as e}from"./index-DSU11JyL.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"03. WHERE 조건절"}),s.jsx("p",{children:"WHERE, 비교연산자, AND/OR, LIKE, IN, BETWEEN"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"WHERE 절을 사용하여 조건에 맞는 데이터를 필터링한다."}),s.jsx("li",{children:"비교 연산자(=, <>, >, <, >=, <=)를 활용한다."}),s.jsx("li",{children:"논리 연산자(AND, OR, NOT)로 복합 조건을 구성한다."}),s.jsx("li",{children:"LIKE, IN, BETWEEN 연산자를 사용한다."})]})]}),s.jsx("h2",{children:"1. WHERE 절 기본"}),s.jsx("h3",{children:"1.1 기본 문법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`SELECT 컬럼1, 컬럼2
FROM 테이블명
WHERE 조건식;`})})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"WHERE"})," 절은 FROM 절 다음에 위치하며, 조건식이 ",s.jsx("strong",{children:"참(TRUE)"}),"인 행만 결과에 포함시킵니다."]}),s.jsx("h2",{children:"2. 비교 연산자"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"연산자"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"="})}),s.jsx("td",{children:"같다"}),s.jsx("td",{children:"age = 20"})]}),s.jsxs("tr",{children:[s.jsxs("td",{children:[s.jsx("strong",{children:"<>"})," 또는 ",s.jsx("strong",{children:"!="})]}),s.jsx("td",{children:"같지 않다"}),s.jsx("td",{children:"major <> '경영학'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:">"})}),s.jsx("td",{children:"크다"}),s.jsx("td",{children:"grade > 3.5"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"<"})}),s.jsx("td",{children:"작다"}),s.jsx("td",{children:"age < 22"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:">="})}),s.jsx("td",{children:"크거나 같다"}),s.jsx("td",{children:"grade >= 3.0"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"<="})}),s.jsx("td",{children:"작거나 같다"}),s.jsx("td",{children:"age <= 21"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL 예제"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 나이가 20인 학생
SELECT name, age FROM students WHERE age = 20;

-- 학점이 3.5 이상인 학생
SELECT name, grade FROM students WHERE grade >= 3.5;

-- 전공이 컴퓨터공학이 아닌 학생
SELECT name, major FROM students WHERE major <> '컴퓨터공학';`})})]}),s.jsx("h2",{children:"3. 논리 연산자"}),s.jsx("h3",{children:"3.1 AND — 그리고"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 컴퓨터공학 전공이면서 학점 3.5 이상인 학생
SELECT name, major, grade
FROM students
WHERE major = '컴퓨터공학'
  AND grade >= 3.5;`})})]}),s.jsx("h3",{children:"3.2 OR — 또는"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 컴퓨터공학 또는 경영학 전공 학생
SELECT name, major
FROM students
WHERE major = '컴퓨터공학'
   OR major = '경영학';`})})]}),s.jsx("h3",{children:"3.3 NOT — 부정"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 컴퓨터공학이 아닌 학생
SELECT name, major
FROM students
WHERE NOT major = '컴퓨터공학';`})})]}),s.jsx("h3",{children:"3.4 연산자 우선순위"}),s.jsxs("p",{children:[s.jsx("strong",{children:"NOT > AND > OR"})," 순서로 우선순위가 적용됩니다. 복잡한 조건에서는 ",s.jsx("strong",{children:"괄호()"}),"를 사용하여 명확하게 표현하세요."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 괄호 없이: AND가 OR보다 먼저 평가
SELECT * FROM students
WHERE major = '컴퓨터공학' OR major = '경영학' AND grade >= 3.5;
-- → 경영학이면서 3.5 이상이거나, 컴퓨터공학인 학생 (의도와 다를 수 있음)

-- 괄호 사용: 의도를 명확하게
SELECT * FROM students
WHERE (major = '컴퓨터공학' OR major = '경영학')
  AND grade >= 3.5;
-- → 컴퓨터공학 또는 경영학이면서, 학점 3.5 이상인 학생`})})]}),s.jsx("h2",{children:"4. BETWEEN — 범위 조건"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 학점이 3.0 이상 3.8 이하인 학생
SELECT name, grade
FROM students
WHERE grade BETWEEN 3.0 AND 3.8;

-- 위와 동일한 조건
SELECT name, grade
FROM students
WHERE grade >= 3.0 AND grade <= 3.8;

-- NOT BETWEEN: 범위 밖
SELECT name, grade
FROM students
WHERE grade NOT BETWEEN 3.0 AND 3.8;`})})]}),s.jsxs("p",{children:["BETWEEN은 ",s.jsx("strong",{children:"양쪽 경계값을 포함"}),"합니다 (이상, 이하)."]}),s.jsx("h2",{children:"5. IN — 목록 포함 여부"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 전공이 컴퓨터공학, 경영학, 수학과 중 하나인 학생
SELECT name, major
FROM students
WHERE major IN ('컴퓨터공학', '경영학', '수학과');

-- 위와 동일한 조건
SELECT name, major
FROM students
WHERE major = '컴퓨터공학'
   OR major = '경영학'
   OR major = '수학과';

-- NOT IN: 목록에 없는 값
SELECT name, major
FROM students
WHERE major NOT IN ('컴퓨터공학', '경영학');`})})]}),s.jsx("h2",{children:"6. LIKE — 패턴 매칭"}),s.jsx("h3",{children:"6.1 와일드카드 문자"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"와일드카드"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"%"})}),s.jsx("td",{children:"0개 이상의 임의 문자"}),s.jsx("td",{children:"'김%' → 김으로 시작하는 모든 값"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"_"})}),s.jsx("td",{children:"정확히 1개의 임의 문자"}),s.jsx("td",{children:"'_철수' → 2글자+철수"})]})]})]}),s.jsx("h3",{children:"6.2 LIKE 사용 예시"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- '김'으로 시작하는 이름
SELECT * FROM students WHERE name LIKE '김%';

-- '학'으로 끝나는 전공
SELECT * FROM students WHERE major LIKE '%학';

-- '공'을 포함하는 전공
SELECT * FROM students WHERE major LIKE '%공%';

-- 이름이 정확히 3글자인 학생
SELECT * FROM students WHERE name LIKE '___';

-- 이메일이 'k'로 시작하는 학생
SELECT * FROM students WHERE email LIKE 'k%';

-- NOT LIKE: 패턴에 맞지 않는 값
SELECT * FROM students WHERE name NOT LIKE '김%';`})})]}),s.jsx("h2",{children:"7. 조건 조합 실전 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 20~21세 컴퓨터공학 학생 중 학점 3.5 이상
SELECT name, age, major, grade
FROM students
WHERE age BETWEEN 20 AND 21
  AND major = '컴퓨터공학'
  AND grade >= 3.5;

-- 2023년에 입학한 학생
SELECT name, enrolled
FROM students
WHERE enrolled BETWEEN '2023-01-01' AND '2023-12-31';

-- 이메일에 'school' 포함되고 학점이 3.0 이상
SELECT name, email, grade
FROM students
WHERE email LIKE '%school%'
  AND grade >= 3.0;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"WHERE"}),"는 조건에 맞는 행만 필터링한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"비교 연산자"}),": =, <>, >, <, >=, <= 로 값을 비교한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"AND"}),"(그리고), ",s.jsx("strong",{children:"OR"}),"(또는), ",s.jsx("strong",{children:"NOT"}),"(부정)으로 조건을 조합한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"BETWEEN"}),": 범위 조건, ",s.jsx("strong",{children:"IN"}),": 목록 포함 여부를 확인한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"LIKE"}),": %와 _를 사용한 패턴 매칭으로 문자열을 검색한다."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 나이가 21 이상인 학생의 이름과 나이를 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," 전공이 '컴퓨터공학' 또는 '전자공학'인 학생을 IN을 사용하여 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," 학점이 3.0 이상 3.7 이하인 학생을 BETWEEN으로 조회하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 4."})," 이름이 '이'로 시작하는 학생을 LIKE로 조회하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/select",className:"lesson-nav-btn prev",children:"← SELECT 기초"}),s.jsx(e,{to:"/sql/sort",className:"lesson-nav-btn next",children:"정렬과 제한 →"})]})]})})})]});export{r as default};
