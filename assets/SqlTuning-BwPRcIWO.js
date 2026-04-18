import{j as s,L as e}from"./index-DSU11JyL.js";const n=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"SQL 튜닝 기법"}),s.jsx("p",{children:"쿼리 리팩토링, 조인 최적화, 안티패턴 제거"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"느린 쿼리를 빠르게 리팩토링하는 기법을 익힌다."}),s.jsx("li",{children:"JOIN, 서브쿼리, UNION의 성능 차이를 이해한다."}),s.jsx("li",{children:"페이징, 카운트, 정렬 쿼리를 최적화한다."}),s.jsx("li",{children:"SQL 안티패턴을 인식하고 개선한다."})]})]}),s.jsx("h2",{children:"1. SELECT 최적화"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"필요한 컬럼만 조회"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ SELECT * — 불필요한 컬럼까지 전부 읽음
SELECT * FROM students WHERE major = '컴퓨터공학';

-- ✅ 필요한 컬럼만 지정 — 네트워크/메모리 절약
SELECT id, name, grade FROM students WHERE major = '컴퓨터공학';

-- 💡 특히 TEXT/BLOB 컬럼이 있는 테이블에서 SELECT *는 치명적!
-- 게시판 목록에서 본문(TEXT)까지 불러오면 10배 이상 느려질 수 있음`})})]}),s.jsx("h2",{children:"2. WHERE 조건 최적화"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Sargable 쿼리 (인덱스 활용 가능한 쿼리)"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ Non-Sargable (인덱스 사용 불가)
WHERE DATE(created_at) = '2024-03-15'
WHERE LOWER(name) = '홍길동'
WHERE price * 1.1 > 10000
WHERE SUBSTRING(code, 1, 3) = 'ABC'

-- ✅ Sargable (인덱스 사용 가능)
WHERE created_at >= '2024-03-15' AND created_at < '2024-03-16'
WHERE name = '홍길동'              -- 저장 시 소문자로 통일
WHERE price > 10000 / 1.1
WHERE code LIKE 'ABC%'`})})]}),s.jsx("h2",{children:"3. JOIN 최적화"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"JOIN 성능 개선 기법"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ 느린 JOIN — 조인 조건 컬럼에 인덱스 없음
SELECT s.name, c.title
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;
-- student_id, course_id에 인덱스가 없으면 → Nested Loop Full Scan

-- ✅ 해결: FK 컬럼에 인덱스 추가
CREATE INDEX idx_enrollment_student ON enrollments(student_id);
CREATE INDEX idx_enrollment_course ON enrollments(course_id);

-- ❌ 조인 전에 불필요한 행까지 조인
SELECT s.name, c.title
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE s.major = '컴퓨터공학' AND c.credits >= 3;

-- ✅ 드라이빙 테이블(먼저 읽는 테이블)의 행을 줄여라
-- → MySQL 옵티마이저가 자동으로 최적화하지만,
--    WHERE 조건이 인덱스를 탈 수 있도록 보장해야 함
--    students.major에 인덱스 필요`})})]}),s.jsx("h2",{children:"4. 서브쿼리 vs JOIN"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"서브쿼리를 JOIN으로 변환"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ 상관 서브쿼리 — 행마다 서브쿼리 실행 (N+1 유사)
SELECT name,
       (SELECT COUNT(*) FROM enrollments e
        WHERE e.student_id = s.id) AS course_count
FROM students s;
-- → students가 1000행이면 서브쿼리도 1000번 실행!

-- ✅ JOIN + GROUP BY로 변환 — 한 번에 처리
SELECT s.name, COUNT(e.id) AS course_count
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.name;

-- ❌ WHERE IN (서브쿼리) — 대용량에서 느림
SELECT * FROM students
WHERE id IN (SELECT student_id FROM enrollments WHERE course_id = 5);

-- ✅ EXISTS로 변환 — 존재 여부만 확인하므로 더 빠름
SELECT * FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e
    WHERE e.student_id = s.id AND e.course_id = 5
);

-- ✅ 또는 JOIN으로 변환
SELECT DISTINCT s.*
FROM students s
JOIN enrollments e ON s.id = e.student_id
WHERE e.course_id = 5;`})})]}),s.jsx("h2",{children:"5. 페이징 최적화"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"대용량 페이징 — OFFSET 문제와 해결"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ OFFSET이 클수록 느려짐 (건너뛸 행을 모두 읽어야 함)
SELECT * FROM posts ORDER BY id DESC LIMIT 20 OFFSET 100000;
-- → 100,020행을 읽고 100,000행을 버림!

-- ✅ 해결 1: 커서 기반 페이징 (Keyset Pagination)
-- 이전 페이지 마지막 id를 기억하여 WHERE 조건으로 사용
SELECT * FROM posts
WHERE id < 50000          -- 이전 페이지 마지막 id
ORDER BY id DESC
LIMIT 20;
-- → 인덱스로 바로 50000 위치부터 20건만 읽음!

-- ✅ 해결 2: 디퍼드 조인 (Deferred Join)
-- 먼저 PK만 빠르게 조회 → 그 PK로 상세 데이터 조인
SELECT p.*
FROM posts p
JOIN (
    SELECT id FROM posts ORDER BY id DESC LIMIT 20 OFFSET 100000
) AS sub ON p.id = sub.id;
-- → 커버링 인덱스로 id만 빠르게 찾고, 20건만 상세 조회`})})]}),s.jsx("h2",{children:"6. COUNT 최적화"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"대용량 테이블 카운트"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ 정확한 COUNT — 대용량 테이블에서 느림
SELECT COUNT(*) FROM posts WHERE status = 'active';
-- → 조건에 맞는 모든 행을 세야 함

-- ✅ 해결 1: 근사값 사용 (InnoDB 통계)
SELECT table_rows
FROM information_schema.tables
WHERE table_schema = 'mydb' AND table_name = 'posts';
-- → 정확하지 않지만 매우 빠름 (O(1))

-- ✅ 해결 2: 캐싱 (카운트 테이블/Redis)
-- 별도 테이블에 카운트 저장, INSERT/DELETE 시 트리거로 갱신
CREATE TABLE post_counts (
    status VARCHAR(20) PRIMARY KEY,
    cnt INT DEFAULT 0
);

-- ✅ 해결 3: 페이지네이션에서 "전체 개수" 대신 "다음 페이지 존재 여부"
-- LIMIT 21로 조회하여 21개가 나오면 다음 페이지 있음
SELECT * FROM posts ORDER BY id DESC LIMIT 21;
-- → 21개 반환 시 → hasNextPage = true, 20개만 표시`})})]}),s.jsx("h2",{children:"7. ORDER BY 최적화"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"filesort 제거"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ filesort 발생 — 인덱스와 정렬 순서 불일치
SELECT * FROM students WHERE major = '컴퓨터공학' ORDER BY grade DESC;
-- EXPLAIN → Extra: Using filesort

-- ✅ 해결: 복합 인덱스에 정렬 컬럼 포함
CREATE INDEX idx_major_grade ON students(major, grade);
SELECT * FROM students WHERE major = '컴퓨터공학' ORDER BY grade DESC;
-- EXPLAIN → Extra: Using index condition (filesort 없음!)

-- ⚠️ 주의: 인덱스 정렬 방향과 쿼리 정렬 방향이 같아야 함
-- MySQL 8.0+에서는 내림차순 인덱스 지원
CREATE INDEX idx_major_grade_desc ON students(major, grade DESC);`})})]}),s.jsx("h2",{children:"8. SQL 안티패턴 정리"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"안티패턴"}),s.jsx("th",{children:"문제"}),s.jsx("th",{children:"해결"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"SELECT *"})}),s.jsx("td",{children:"불필요한 컬럼 전송"}),s.jsx("td",{children:"필요한 컬럼만 지정"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"N+1 쿼리"})}),s.jsx("td",{children:"반복적 DB 호출"}),s.jsx("td",{children:"JOIN / eager loading"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"큰 OFFSET"})}),s.jsx("td",{children:"건너뛸 행 모두 읽음"}),s.jsx("td",{children:"커서 기반 페이징"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"상관 서브쿼리"})}),s.jsx("td",{children:"행마다 서브쿼리 실행"}),s.jsx("td",{children:"JOIN + GROUP BY로 변환"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"컬럼에 함수 적용"})}),s.jsx("td",{children:"인덱스 무시"}),s.jsx("td",{children:"조건을 Sargable로 변환"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"OR 남용"})}),s.jsx("td",{children:"인덱스 활용 불가"}),s.jsx("td",{children:"UNION ALL로 분리"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DISTINCT 남용"})}),s.jsx("td",{children:"임시 테이블 + 정렬"}),s.jsx("td",{children:"JOIN/쿼리 로직 재검토"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"불필요한 ORDER BY"})}),s.jsx("td",{children:"추가 정렬 비용"}),s.jsx("td",{children:"정렬 불필요 시 제거"})]})]})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"SELECT *"})," 대신 필요한 컬럼만 조회하라."]}),s.jsxs("li",{children:["WHERE 조건은 ",s.jsx("strong",{children:"Sargable"}),"하게 작성하여 인덱스를 활용하라."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"상관 서브쿼리"}),"는 JOIN + GROUP BY로 변환하라."]}),s.jsxs("li",{children:["대용량 페이징은 ",s.jsx("strong",{children:"커서 기반 페이징"}),"을 사용하라."]}),s.jsxs("li",{children:["ORDER BY는 ",s.jsx("strong",{children:"복합 인덱스"}),"에 정렬 컬럼을 포함시켜 filesort를 방지하라."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"확인 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 상관 서브쿼리가 느린 이유와 JOIN으로 변환하는 방법을 설명하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," OFFSET 100000 LIMIT 20이 느린 이유와 커서 기반 페이징 해결법을 작성하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," Sargable 쿼리란 무엇인지 예시와 함께 설명하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/tuning/index",className:"lesson-nav-btn prev",children:"← 인덱스 튜닝"}),s.jsx(e,{to:"/tuning/server",className:"lesson-nav-btn next",children:"DB 서버 튜닝 →"})]})]})})})]});export{n as default};
