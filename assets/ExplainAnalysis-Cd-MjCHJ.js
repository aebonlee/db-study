import{j as s,L as e}from"./index-D7XyfEmW.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"실행 계획 분석"}),s.jsx("p",{children:"EXPLAIN, 쿼리 프로파일링, 실행 계획 읽는 법"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"EXPLAIN 명령어로 쿼리 실행 계획을 분석한다."}),s.jsx("li",{children:"실행 계획의 각 컬럼(type, key, rows, Extra)을 이해한다."}),s.jsx("li",{children:"풀 테이블 스캔과 인덱스 스캔의 차이를 파악한다."}),s.jsx("li",{children:"EXPLAIN ANALYZE로 실제 실행 시간을 측정한다."})]})]}),s.jsx("h2",{children:"1. EXPLAIN이란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"EXPLAIN"}),"은 MySQL이 쿼리를 어떻게 실행할지 ",s.jsx("strong",{children:"실행 계획(Execution Plan)"}),"을 보여주는 명령어입니다. 쿼리를 실제로 실행하지 않고도 성능 문제를 파악할 수 있습니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"EXPLAIN 기본 사용법"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 기본 EXPLAIN
EXPLAIN SELECT * FROM students WHERE major = '컴퓨터공학';

-- EXPLAIN ANALYZE (MySQL 8.0.18+) — 실제 실행 시간 포함
EXPLAIN ANALYZE SELECT * FROM students WHERE major = '컴퓨터공학';

-- EXPLAIN FORMAT=JSON — 상세 정보 (JSON 형식)
EXPLAIN FORMAT=JSON SELECT * FROM students WHERE major = '컴퓨터공학';

-- EXPLAIN FORMAT=TREE — 트리 형태 출력
EXPLAIN FORMAT=TREE SELECT * FROM students WHERE major = '컴퓨터공학';`})})]}),s.jsx("h2",{children:"2. EXPLAIN 출력 컬럼"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"컬럼"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"확인 포인트"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"id"})}),s.jsx("td",{children:"쿼리 내 SELECT 번호"}),s.jsx("td",{children:"서브쿼리/UNION 시 여러 행"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"select_type"})}),s.jsx("td",{children:"SELECT 유형"}),s.jsx("td",{children:"SIMPLE, SUBQUERY, DERIVED 등"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"table"})}),s.jsx("td",{children:"접근하는 테이블"}),s.jsx("td",{children:"별칭 또는 서브쿼리명"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"type"})}),s.jsx("td",{children:"접근 방식 (가장 중요!)"}),s.jsx("td",{children:"ALL이면 풀스캔 → 개선 필요"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"possible_keys"})}),s.jsx("td",{children:"사용 가능한 인덱스 목록"}),s.jsx("td",{children:"NULL이면 인덱스 없음"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"key"})}),s.jsx("td",{children:"실제 사용한 인덱스"}),s.jsx("td",{children:"NULL이면 인덱스 미사용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"key_len"})}),s.jsx("td",{children:"사용한 인덱스 길이(바이트)"}),s.jsx("td",{children:"복합 인덱스에서 몇 컬럼 사용했는지 판단"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"ref"})}),s.jsx("td",{children:"인덱스와 비교되는 값"}),s.jsx("td",{children:"const, 컬럼명, func 등"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"rows"})}),s.jsx("td",{children:"검사할 예상 행 수"}),s.jsx("td",{children:"클수록 느림"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"filtered"})}),s.jsx("td",{children:"조건에 의해 필터링되는 비율(%)"}),s.jsx("td",{children:"낮을수록 비효율"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Extra"})}),s.jsx("td",{children:"추가 정보"}),s.jsx("td",{children:"Using filesort, Using temporary 주의"})]})]})]}),s.jsx("h2",{children:"3. type 컬럼 — 접근 방식 (성능 순서)"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"type"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"성능"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"system"})}),s.jsx("td",{children:"테이블에 1행만 존재"}),s.jsx("td",{children:"최고"}),s.jsx("td",{children:"시스템 테이블"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"const"})}),s.jsx("td",{children:"PK/Unique로 1행 조회"}),s.jsx("td",{children:"매우 빠름"}),s.jsx("td",{children:"WHERE id = 1"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"eq_ref"})}),s.jsx("td",{children:"JOIN에서 PK/Unique 매칭"}),s.jsx("td",{children:"매우 빠름"}),s.jsx("td",{children:"JOIN ON a.id = b.id"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"ref"})}),s.jsx("td",{children:"인덱스로 여러 행 조회"}),s.jsx("td",{children:"빠름"}),s.jsx("td",{children:"WHERE major = '컴공'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"range"})}),s.jsx("td",{children:"인덱스 범위 스캔"}),s.jsx("td",{children:"보통"}),s.jsx("td",{children:"WHERE age BETWEEN 20 AND 25"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"index"})}),s.jsx("td",{children:"인덱스 풀 스캔"}),s.jsx("td",{children:"느림"}),s.jsx("td",{children:"인덱스 전체 순회"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"ALL"})}),s.jsx("td",{children:"테이블 풀 스캔"}),s.jsx("td",{children:"최악 ⚠️"}),s.jsx("td",{children:"인덱스 없는 조건 검색"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"type별 EXPLAIN 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ✅ const — PK로 1건 조회 (가장 빠름)
EXPLAIN SELECT * FROM students WHERE id = 1;
-- type: const, rows: 1

-- ✅ ref — 인덱스가 있는 컬럼 조회
EXPLAIN SELECT * FROM students WHERE major = '컴퓨터공학';
-- type: ref, key: idx_major, rows: 15

-- ⚠️ ALL — 풀 테이블 스캔 (인덱스 없음!)
EXPLAIN SELECT * FROM students WHERE name LIKE '%길동%';
-- type: ALL, rows: 1000 → 개선 필요!`})})]}),s.jsx("h2",{children:"4. Extra 컬럼 — 주의 사항"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Extra 값"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"조치"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Using index"})}),s.jsx("td",{children:"커버링 인덱스 사용 (좋음 ✅)"}),s.jsx("td",{children:"유지"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Using where"})}),s.jsx("td",{children:"WHERE 조건으로 필터링"}),s.jsx("td",{children:"정상"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Using index condition"})}),s.jsx("td",{children:"인덱스 조건 푸시다운 (ICP)"}),s.jsx("td",{children:"좋음"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Using temporary"})}),s.jsx("td",{children:"임시 테이블 생성 ⚠️"}),s.jsx("td",{children:"쿼리/인덱스 재검토"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Using filesort"})}),s.jsx("td",{children:"추가 정렬 작업 ⚠️"}),s.jsx("td",{children:"ORDER BY에 인덱스 활용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Using join buffer"})}),s.jsx("td",{children:"조인 버퍼 사용 ⚠️"}),s.jsx("td",{children:"조인 컬럼에 인덱스 추가"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Full scan on NULL key"})}),s.jsx("td",{children:"서브쿼리에서 풀스캔"}),s.jsx("td",{children:"서브쿼리 최적화"})]})]})]}),s.jsx("h2",{children:"5. EXPLAIN ANALYZE"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"EXPLAIN ANALYZE — 실제 실행 시간 측정"}),s.jsx("pre",{children:s.jsx("code",{children:`-- EXPLAIN ANALYZE는 실제로 쿼리를 실행하고 시간을 측정
EXPLAIN ANALYZE
SELECT s.name, c.title
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE s.major = '컴퓨터공학';

-- 출력 예시:
-- -> Nested loop inner join  (cost=12.5 rows=15)
--     (actual time=0.045..0.123 rows=12 loops=1)
--     -> Index lookup on s using idx_major (major='컴퓨터공학')
--         (cost=3.5 rows=15)
--         (actual time=0.025..0.035 rows=15 loops=1)
--     -> Index lookup on e using idx_student_id (student_id=s.id)
--         (cost=0.6 rows=1)
--         (actual time=0.004..0.005 rows=0.8 loops=15)

-- 핵심: actual time과 rows를 확인하여 병목 구간 파악`})})]}),s.jsx("h2",{children:"6. 쿼리 프로파일링"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SHOW PROFILE — 쿼리 단계별 시간 측정"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 프로파일링 활성화
SET profiling = 1;

-- 쿼리 실행
SELECT * FROM students WHERE major = '컴퓨터공학' ORDER BY grade DESC;

-- 프로파일 확인
SHOW PROFILES;
-- +----------+------------+--------------------------------------------------+
-- | Query_ID | Duration   | Query                                            |
-- +----------+------------+--------------------------------------------------+
-- |        1 | 0.00125400 | SELECT * FROM students WHERE ...                 |
-- +----------+------------+--------------------------------------------------+

-- 특정 쿼리의 상세 프로파일
SHOW PROFILE FOR QUERY 1;
-- +----------------------+----------+
-- | Status               | Duration |
-- +----------------------+----------+
-- | starting             | 0.000042 |
-- | checking permissions | 0.000005 |
-- | Opening tables       | 0.000015 |
-- | init                 | 0.000018 |
-- | System lock          | 0.000006 |
-- | optimizing           | 0.000008 |
-- | statistics           | 0.000052 |
-- | preparing            | 0.000010 |
-- | Sorting result       | 0.000005 |  ← 정렬에 걸린 시간
-- | executing            | 0.000003 |
-- | Sending data         | 0.001012 |  ← 데이터 전송 (가장 오래 걸림)
-- | end                  | 0.000004 |
-- +----------------------+----------+`})})]}),s.jsx("h2",{children:"7. 슬로우 쿼리 로그"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"슬로우 쿼리 설정 및 분석"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 슬로우 쿼리 로그 활성화
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;          -- 1초 이상 걸리는 쿼리 기록
SET GLOBAL log_queries_not_using_indexes = 'ON';  -- 인덱스 미사용 쿼리도 기록

-- 현재 설정 확인
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';

-- 슬로우 쿼리 로그 파일 위치 확인
SHOW VARIABLES LIKE 'slow_query_log_file';

-- mysqldumpslow로 슬로우 쿼리 분석 (터미널)
-- 가장 느린 쿼리 10개
-- mysqldumpslow -s t -t 10 /var/log/mysql/slow.log

-- 가장 자주 발생하는 슬로우 쿼리
-- mysqldumpslow -s c -t 10 /var/log/mysql/slow.log`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"EXPLAIN"}),"은 쿼리 튜닝의 첫 번째 도구 — 반드시 실행 계획을 확인하라."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"type 컬럼"}),"에서 ALL(풀스캔)이 보이면 인덱스 추가를 검토하라."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Extra"}),"에 Using filesort, Using temporary가 있으면 쿼리를 재검토하라."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"EXPLAIN ANALYZE"}),"로 예상이 아닌 실제 실행 시간을 측정하라."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"슬로우 쿼리 로그"}),"를 활성화하여 느린 쿼리를 지속적으로 모니터링하라."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"확인 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," EXPLAIN의 type 컬럼에서 ALL, ref, const의 차이를 설명하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."}),' Extra에 "Using filesort"가 나타났을 때 해결 방법을 설명하세요.']}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," EXPLAIN과 EXPLAIN ANALYZE의 차이를 설명하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/tuning",className:"lesson-nav-btn prev",children:"← DB 튜닝 목차"}),s.jsx(e,{to:"/tuning/index",className:"lesson-nav-btn next",children:"인덱스 튜닝 →"})]})]})})})]});export{r as default};
