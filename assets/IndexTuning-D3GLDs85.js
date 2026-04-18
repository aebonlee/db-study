import{j as e,L as s}from"./index-BzTEy25C.js";const r=()=>e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"인덱스 튜닝"}),e.jsx("p",{children:"B-Tree, 복합 인덱스, 커버링 인덱스, 인덱스 설계 전략"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"학습 목표"}),e.jsxs("ul",{children:[e.jsx("li",{children:"인덱스의 내부 구조(B-Tree)를 이해한다."}),e.jsx("li",{children:"단일 인덱스와 복합 인덱스의 차이와 설계 원칙을 파악한다."}),e.jsx("li",{children:"커버링 인덱스로 성능을 극대화하는 방법을 익힌다."}),e.jsx("li",{children:"인덱스가 무시되는 상황과 해결법을 학습한다."})]})]}),e.jsx("h2",{children:"1. 인덱스 기본 개념"}),e.jsxs("p",{children:[e.jsx("strong",{children:"인덱스(Index)"}),"는 테이블의 데이터를 빠르게 찾기 위한 ",e.jsx("strong",{children:"자료 구조"}),"입니다. 책의 목차처럼, 전체 데이터를 순회하지 않고 원하는 데이터의 위치를 빠르게 찾아갑니다."]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"인덱스 없이 vs 있을 때"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 인덱스 없이: 풀 테이블 스캔 (100만 행 전부 확인)
SELECT * FROM students WHERE major = '컴퓨터공학';
-- → 100만 행 순차 스캔 → 약 2초

-- 인덱스 있을 때: B-Tree 탐색 (3~4단계만에 도달)
CREATE INDEX idx_major ON students(major);
SELECT * FROM students WHERE major = '컴퓨터공학';
-- → 인덱스로 50행 직접 접근 → 약 0.01초 (200배 빠름!)`})})]}),e.jsx("h2",{children:"2. B-Tree 인덱스 구조"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"B-Tree 구조 시각화"}),e.jsx("pre",{children:e.jsx("code",{children:`                    [루트 노드]
                  /      |      \\
            [가-나]   [다-라]   [마-바]     ← 브랜치 노드
           /   |     /   |     /   |
        [가영] [나영] [다영] [라영] [마영] [바영]  ← 리프 노드
        ↓      ↓      ↓      ↓      ↓      ↓
      실제 행  실제 행  실제 행  실제 행  실제 행  실제 행

특징:
• 리프 노드는 실제 데이터 행의 위치(포인터)를 저장
• 리프 노드끼리 링크드 리스트로 연결 → 범위 검색 효율적
• 트리 깊이 3~4 수준 → 수천만 행도 3~4번 비교로 탐색
• 정렬된 상태 유지 → ORDER BY 최적화 가능`})})]}),e.jsx("h2",{children:"3. 인덱스 종류"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"종류"}),e.jsx("th",{children:"생성 방법"}),e.jsx("th",{children:"특징"}),e.jsx("th",{children:"사용 예"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"PRIMARY KEY"})}),e.jsx("td",{children:"자동 생성"}),e.jsx("td",{children:"클러스터드 인덱스, NOT NULL, UNIQUE"}),e.jsx("td",{children:"id 컬럼"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"UNIQUE"})}),e.jsx("td",{children:"CREATE UNIQUE INDEX"}),e.jsx("td",{children:"중복 불허, NULL 허용"}),e.jsx("td",{children:"email, 주민번호"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"일반(Non-Unique)"})}),e.jsx("td",{children:"CREATE INDEX"}),e.jsx("td",{children:"중복 허용"}),e.jsx("td",{children:"major, status"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"복합(Composite)"})}),e.jsx("td",{children:"CREATE INDEX (a, b, c)"}),e.jsx("td",{children:"여러 컬럼 조합"}),e.jsx("td",{children:"(major, grade)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"FULLTEXT"})}),e.jsx("td",{children:"CREATE FULLTEXT INDEX"}),e.jsx("td",{children:"전문 검색용"}),e.jsx("td",{children:"게시글 본문 검색"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"SPATIAL"})}),e.jsx("td",{children:"CREATE SPATIAL INDEX"}),e.jsx("td",{children:"공간 데이터용"}),e.jsx("td",{children:"좌표, 위치 데이터"})]})]})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"인덱스 생성/조회/삭제"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 단일 인덱스 생성
CREATE INDEX idx_major ON students(major);

-- 복합 인덱스 생성
CREATE INDEX idx_major_grade ON students(major, grade);

-- UNIQUE 인덱스
CREATE UNIQUE INDEX idx_email ON students(email);

-- 테이블의 인덱스 목록 확인
SHOW INDEX FROM students;

-- 인덱스 삭제
DROP INDEX idx_major ON students;
ALTER TABLE students DROP INDEX idx_major;

-- 인덱스 크기 확인
SELECT
    table_name,
    index_name,
    ROUND(stat_value * @@innodb_page_size / 1024 / 1024, 2) AS size_mb
FROM mysql.innodb_index_stats
WHERE database_name = 'school'
  AND stat_name = 'size';`})})]}),e.jsx("h2",{children:"4. 복합 인덱스와 컬럼 순서"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"복합 인덱스 — 최좌선 원칙(Leftmost Prefix)"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 복합 인덱스: (major, grade, age)
CREATE INDEX idx_m_g_a ON students(major, grade, age);

-- ✅ 인덱스 사용됨 (왼쪽부터 순서대로 사용)
WHERE major = '컴퓨터공학'                          -- major ✅
WHERE major = '컴퓨터공학' AND grade >= 3.5          -- major + grade ✅
WHERE major = '컴퓨터공학' AND grade >= 3.5 AND age > 20  -- 전부 사용 ✅

-- ❌ 인덱스 사용 안 됨 (왼쪽 컬럼 건너뜀)
WHERE grade >= 3.5                                  -- major 건너뜀 ❌
WHERE age > 20                                      -- major, grade 건너뜀 ❌
WHERE grade >= 3.5 AND age > 20                     -- major 건너뜀 ❌

-- ⚠️ 부분 사용 (major만 인덱스 사용)
WHERE major = '컴퓨터공학' AND age > 20              -- grade 건너뜀, age 미사용`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"복합 인덱스 설계 원칙"}),e.jsx("pre",{children:e.jsx("code",{children:`복합 인덱스 컬럼 순서 결정 기준:

1️⃣ 등호(=) 조건 컬럼을 앞에 배치
   WHERE status = 'active' AND created_at > '2024-01-01'
   → INDEX (status, created_at)  ✅
   → INDEX (created_at, status)  ❌

2️⃣ 카디널리티(고유값 수)가 높은 컬럼을 앞에
   → user_id(10만 종류) > status(3종류) > gender(2종류)

3️⃣ 범위 조건(<, >, BETWEEN)은 뒤에 배치
   WHERE department = '개발팀' AND salary > 5000
   → INDEX (department, salary)  ✅

4️⃣ ORDER BY / GROUP BY 컬럼도 고려
   WHERE status = 'active' ORDER BY created_at DESC
   → INDEX (status, created_at)  ✅ filesort 방지`})})]}),e.jsx("h2",{children:"5. 커버링 인덱스"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"커버링 인덱스 — 테이블 접근 없이 인덱스만으로 응답"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 인덱스: (major, grade)
CREATE INDEX idx_major_grade ON students(major, grade);

-- ✅ 커버링 인덱스 (Extra: Using index)
-- major와 grade만 조회 → 인덱스에 모든 데이터 있음 → 테이블 접근 불필요!
SELECT major, grade FROM students WHERE major = '컴퓨터공학';
-- EXPLAIN → Extra: Using index ← 커버링 인덱스!

-- ❌ 커버링 인덱스 아님 (name은 인덱스에 없음)
SELECT name, major, grade FROM students WHERE major = '컴퓨터공학';
-- EXPLAIN → Extra: NULL ← 테이블도 접근해야 함

-- 💡 커버링 인덱스 효과
-- 일반 인덱스: 인덱스 탐색 → 테이블 랜덤 I/O (느림)
-- 커버링 인덱스: 인덱스 탐색만으로 완료 (2~5배 빠름)`})})]}),e.jsx("h2",{children:"6. 인덱스가 무시되는 경우"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"인덱스를 타지 않는 안티 패턴"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 인덱스: idx_name ON students(name)
-- 인덱스: idx_age ON students(age)
-- 인덱스: idx_grade ON students(grade)

-- ❌ 1. 컬럼에 함수/연산 적용
WHERE YEAR(enrolled) = 2024           -- 함수 적용 → 풀스캔
WHERE age + 1 > 21                    -- 연산 적용 → 풀스캔
-- ✅ 해결:
WHERE enrolled >= '2024-01-01' AND enrolled < '2025-01-01'
WHERE age > 20

-- ❌ 2. 암묵적 타입 변환
WHERE phone = 01012345678             -- 문자열 컬럼에 숫자 비교
-- ✅ 해결:
WHERE phone = '01012345678'

-- ❌ 3. LIKE '%패턴' (와일드카드 앞에)
WHERE name LIKE '%길동'               -- 앞에 % → 풀스캔
-- ✅ 해결:
WHERE name LIKE '홍%'                 -- 뒤에만 % → 인덱스 사용

-- ❌ 4. OR 조건 (일부 컬럼에 인덱스 없을 때)
WHERE major = '컴공' OR name = '홍길동'  -- name에 인덱스 없으면 풀스캔
-- ✅ 해결:
WHERE major = '컴공'
UNION
WHERE name = '홍길동'                 -- 각각 인덱스 활용

-- ❌ 5. NOT IN, <>, != (부정 조건)
WHERE status != 'deleted'             -- 대부분의 행 → 옵티마이저가 풀스캔 선택
-- ✅ 해결:
WHERE status IN ('active', 'pending') -- 긍정 조건으로 변환

-- ❌ 6. IS NULL / IS NOT NULL (NULL이 많은 컬럼)
WHERE email IS NOT NULL               -- 대부분 NOT NULL이면 풀스캔`})})]}),e.jsx("h2",{children:"7. 인덱스 설계 체크리스트"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"항목"}),e.jsx("th",{children:"체크"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"WHERE 절에 자주 사용되는 컬럼에 인덱스가 있는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"JOIN 조건 컬럼(FK)에 인덱스가 있는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"ORDER BY 컬럼이 인덱스와 일치하는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"복합 인덱스 컬럼 순서가 최좌선 원칙을 따르는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"SELECT 컬럼을 커버링 인덱스로 처리할 수 있는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"불필요하거나 중복된 인덱스는 없는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"컬럼에 함수/연산을 적용하여 인덱스를 무효화하고 있지 않은가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"인덱스 크기가 테이블 대비 과도하지 않은가?"}),e.jsx("td",{children:"□"})]})]})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"핵심 정리"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"인덱스"}),"는 B-Tree 구조로 데이터를 빠르게 탐색한다."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"복합 인덱스"}),"는 최좌선 원칙(Leftmost Prefix)을 따른다."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"커버링 인덱스"}),"는 테이블 접근 없이 인덱스만으로 결과를 반환한다."]}),e.jsxs("li",{children:["컬럼에 ",e.jsx("strong",{children:"함수/연산, 타입 변환, LIKE '%...'"}),"를 사용하면 인덱스가 무시된다."]}),e.jsxs("li",{children:["인덱스는 ",e.jsx("strong",{children:"INSERT/UPDATE/DELETE 성능을 저하"}),"시키므로 필요한 만큼만 생성한다."]})]})]}),e.jsxs("div",{className:"exercise-box",children:[e.jsx("h3",{children:"확인 문제"}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 1."})," 복합 인덱스 (a, b, c)에서 WHERE b = 1 AND c = 2 로 조회하면 인덱스를 사용하는지 설명하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 2."})," 커버링 인덱스의 원리와 성능 이점을 설명하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 3."})," WHERE YEAR(created_at) = 2024 가 인덱스를 사용하지 못하는 이유와 해결법을 제시하세요."]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/tuning/explain",className:"lesson-nav-btn prev",children:"← 실행 계획 분석"}),e.jsx(s,{to:"/tuning/sql",className:"lesson-nav-btn next",children:"SQL 튜닝 기법 →"})]})]})})})]});export{r as default};
