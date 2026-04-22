import{j as s,L as e}from"./index-B89W_sQX.js";const E=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"실행계획과 옵티마이저"}),s.jsx("p",{children:"DBMS_XPLAN, 커서 공유, 서브쿼리 튜닝, 힌트 전략"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"DBMS_XPLAN으로 실행계획을 상세히 분석한다."}),s.jsx("li",{children:"커서 공유(Cursor Sharing)와 Library Cache 구조를 이해한다."}),s.jsx("li",{children:"서브쿼리 튜닝 전략(IN → EXISTS → JOIN)을 학습한다."}),s.jsx("li",{children:"Oracle 힌트(Hint)의 종류와 사용법을 익힌다."})]})]}),s.jsx("h2",{children:"1. DBMS_XPLAN 상세 활용"}),s.jsxs("p",{children:[s.jsx("code",{children:"DBMS_XPLAN"})," 패키지는 실행계획을 다양한 형태로 출력해주는 Oracle 내장 유틸리티입니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"DBMS_XPLAN 사용법"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 1) 예상 실행계획 확인
EXPLAIN PLAN FOR
SELECT * FROM EMP E, DEPT D
WHERE E.DEPTNO = D.DEPTNO AND E.SAL > 3000;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- 2) 실제 실행 후 실행계획 확인 (가장 정확)
SELECT /*+ GATHER_PLAN_STATISTICS */ *
FROM EMP E, DEPT D
WHERE E.DEPTNO = D.DEPTNO AND E.SAL > 3000;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));

-- 3) SQL_ID로 특정 SQL 실행계획 조회
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR('sql_id_here', NULL, 'ALLSTATS'));`})})]}),s.jsx("h3",{children:"1.1 실행계획 읽는 규칙"}),s.jsxs("div",{className:"callout-box tip",children:[s.jsx("h3",{children:"실행 순서"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["같은 레벨이면 ",s.jsx("strong",{children:"위에서 아래로"})," 실행"]}),s.jsxs("li",{children:["부모-자식 관계면 ",s.jsx("strong",{children:"자식(하위)부터"})," 실행"]}),s.jsx("li",{children:"Id 번호 순서 ≠ 실행 순서 (들여쓰기 기준)"})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행계획 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`------------------------------------------------------------------------
| Id | Operation                    | Name    | Rows | Cost | Time     |
------------------------------------------------------------------------
|  0 | SELECT STATEMENT             |         |    3 |    5 | 00:00:01 |
|  1 |  NESTED LOOPS                |         |    3 |    5 | 00:00:01 |
|  2 |   TABLE ACCESS BY INDEX ROWID| EMP     |    3 |    2 | 00:00:01 |
|* 3 |    INDEX RANGE SCAN          | IDX_SAL |    3 |    1 | 00:00:01 |
|  4 |   TABLE ACCESS BY INDEX ROWID| DEPT    |    1 |    1 | 00:00:01 |
|* 5 |    INDEX UNIQUE SCAN         | PK_DEPT |    1 |    0 | 00:00:01 |
------------------------------------------------------------------------
Predicate Information:
  3 - access("E"."SAL" > 3000)           ← Access Predicate (인덱스 활용)
  5 - access("E"."DEPTNO" = "D"."DEPTNO") ← Access Predicate

-- 실행 순서: 3 → 2 → 5 → 4 → 1 → 0`})})]}),s.jsx("h3",{children:"1.2 실행계획 수치 진단"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"지표"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"판단 기준"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"COST ↑↑"})}),s.jsx("td",{children:"상대적 실행 비용"}),s.jsx("td",{children:"복잡한 조인, Full Scan 가능성"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"BUFFER_GETS ↑"})}),s.jsx("td",{children:"메모리 블록 접근 횟수"}),s.jsx("td",{children:"반복 접근, 캐시 낭비"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DISK_READS ↑"})}),s.jsx("td",{children:"디스크 I/O 횟수"}),s.jsx("td",{children:"Full Scan, 인덱스 미적용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"EXECUTIONS ↑"})}),s.jsx("td",{children:"SQL 실행 횟수"}),s.jsx("td",{children:"공유 실패, 바인드 변수 미사용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"ROWS ↓ (예상 대비 실제)"})}),s.jsx("td",{children:"반환 행 수"}),s.jsx("td",{children:"과도한 필터링 또는 통계 오류"})]})]})]}),s.jsx("h2",{children:"2. 커서 공유 (Cursor Sharing)"}),s.jsxs("p",{children:["Oracle은 동일한 SQL을 Library Cache에서 공유하여 파싱 비용을 절감합니다. 하지만 SQL이 ",s.jsx("strong",{children:"정확히 동일"}),"하지 않으면 공유에 실패합니다."]}),s.jsx("h3",{children:"2.1 공유 실패 원인"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"원인"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"해결 방법"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"리터럴 SQL"})}),s.jsx("td",{children:"상수 값이 다르면 별도 SQL로 인식"}),s.jsx("td",{children:"바인드 변수 사용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"BIND_MISMATCH"})}),s.jsx("td",{children:"바인드 변수 타입/길이 불일치"}),s.jsx("td",{children:"일관된 바인드 타입 사용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"AUTH_CHECK_MISMATCH"})}),s.jsx("td",{children:"권한이 다른 사용자의 동일 SQL"}),s.jsx("td",{children:"-"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"OPTIMIZER_MISMATCH"})}),s.jsx("td",{children:"세션별 옵티마이저 설정 차이"}),s.jsx("td",{children:"세션 파라미터 통일"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"커서 공유 진단"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 공유된 커서 확인
SELECT SQL_ID, SQL_TEXT, PARSE_CALLS, EXECUTIONS, CHILD_NUMBER
FROM V$SQL
WHERE SQL_TEXT LIKE '%EMP%'
ORDER BY PARSE_CALLS DESC;

-- 공유 실패 원인 분석
SELECT SQL_ID, CHILD_NUMBER, REASON
FROM V$SQL_SHARED_CURSOR
WHERE SQL_ID = 'your_sql_id';

-- CURSOR_SHARING 파라미터 설정
-- EXACT (기본): 정확히 일치해야 공유
-- FORCE: 리터럴을 바인드 변수로 강제 변환
ALTER SESSION SET CURSOR_SHARING = FORCE;`})})]}),s.jsx("h3",{children:"2.2 Shared Pool 튜닝"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Library Cache 상태 확인"}),s.jsx("pre",{children:s.jsx("code",{children:`-- Library Cache 적중률
SELECT NAMESPACE, GETS, GETHITS,
       ROUND(GETHITRATIO * 100, 2) || '%' AS HIT_RATIO
FROM V$LIBRARYCACHE
WHERE NAMESPACE = 'SQL AREA';

-- SESSION_CACHED_CURSORS 설정
-- 자주 사용하는 SQL의 커서를 세션 캐시에 보관
ALTER SYSTEM SET SESSION_CACHED_CURSORS = 100;`})})]}),s.jsx("h2",{children:"3. 서브쿼리 튜닝 전략"}),s.jsx("h3",{children:"3.1 IN → EXISTS → JOIN 변환"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"서브쿼리 리팩토링"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ IN 서브쿼리
SELECT * FROM EMP
WHERE DEPTNO IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'CHICAGO');

-- ✅ EXISTS로 변환 (대용량 시 더 효율적)
SELECT * FROM EMP E
WHERE EXISTS (
  SELECT 1 FROM DEPT D
  WHERE D.DEPTNO = E.DEPTNO AND D.LOC = 'CHICAGO'
);

-- ✅ JOIN으로 변환 (가장 직관적)
SELECT E.*
FROM EMP E
JOIN DEPT D ON E.DEPTNO = D.DEPTNO
WHERE D.LOC = 'CHICAGO';`})})]}),s.jsx("h3",{children:"3.2 스칼라 서브쿼리 제거"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"스칼라 서브쿼리 → JOIN 변환"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ 스칼라 서브쿼리: 행 수만큼 반복 실행
SELECT EMPNO, ENAME,
  (SELECT DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME
FROM EMP E;
-- EMP 테이블 14건 → 서브쿼리 14회 반복

-- ✅ OUTER JOIN으로 변환: 1회 조인
SELECT E.EMPNO, E.ENAME, D.DNAME
FROM EMP E
LEFT JOIN DEPT D ON E.DEPTNO = D.DEPTNO;`})})]}),s.jsx("h3",{children:"3.3 인라인 뷰와 View Merge"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"MERGE / NO_MERGE 힌트"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 인라인 뷰 (FROM 절의 서브쿼리)
SELECT * FROM (
  SELECT EMPNO, ENAME, SAL, DEPTNO
  FROM EMP WHERE SAL > 2000
) V
WHERE V.DEPTNO = 10;

-- MERGE 힌트: 인라인 뷰를 외부 쿼리와 병합
SELECT /*+ MERGE(V) */ * FROM (
  SELECT EMPNO, ENAME, SAL, DEPTNO
  FROM EMP WHERE SAL > 2000
) V WHERE V.DEPTNO = 10;

-- NO_MERGE 힌트: 인라인 뷰를 독립 실행
SELECT /*+ NO_MERGE(V) */ * FROM (
  SELECT EMPNO, ENAME, SAL, DEPTNO
  FROM EMP WHERE SAL > 2000
) V WHERE V.DEPTNO = 10;`})})]}),s.jsx("h2",{children:"4. Oracle 힌트(Hint) 전략"}),s.jsxs("p",{children:["힌트는 옵티마이저의 판단을 ",s.jsx("strong",{children:"일시적으로 재정의"}),"하는 지시문입니다. 옵티마이저가 잘못된 실행계획을 선택할 때 ",s.jsx("strong",{children:"제한적이고 예외적으로"})," 사용합니다."]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"힌트"}),s.jsx("th",{children:"기능"}),s.jsx("th",{children:"사용 예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INDEX(table)"})}),s.jsx("td",{children:"특정 인덱스 사용 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ INDEX(EMP IDX_SAL) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"FULL(table)"})}),s.jsx("td",{children:"Full Table Scan 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ FULL(EMP) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LEADING(t1 t2)"})}),s.jsx("td",{children:"조인 순서 지정"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ LEADING(E D) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"USE_NL(table)"})}),s.jsx("td",{children:"Nested Loop Join 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ USE_NL(D) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"USE_HASH(table)"})}),s.jsx("td",{children:"Hash Join 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ USE_HASH(D) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"USE_MERGE(table)"})}),s.jsx("td",{children:"Sort Merge Join 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ USE_MERGE(D) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"PARALLEL(table n)"})}),s.jsx("td",{children:"병렬 실행"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ PARALLEL(SALES 4) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"MERGE(view)"})}),s.jsx("td",{children:"뷰 병합 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ MERGE(V) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"NO_MERGE(view)"})}),s.jsx("td",{children:"뷰 병합 방지"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ NO_MERGE(V) */"})})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"힌트 조합 사용 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 조인 순서 + 조인 방법 + 인덱스 지정
SELECT /*+ LEADING(E D) USE_NL(D) INDEX(E IDX_EMP_DEPTNO) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO
AND    E.SAL > 2000;

-- EMP를 먼저 읽고 (LEADING)
-- DEPT와 Nested Loop Join (USE_NL)
-- EMP의 IDX_EMP_DEPTNO 인덱스 사용 (INDEX)`})})]}),s.jsxs("div",{className:"callout-box warning",children:[s.jsx("h3",{children:"힌트 사용 주의사항"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["힌트는 ",s.jsx("strong",{children:"옵티마이저가 잘못 판단할 때만 제한적으로"})," 사용"]}),s.jsx("li",{children:"통계가 정확하면 옵티마이저 판단이 대부분 맞음"}),s.jsx("li",{children:"데이터 분포가 변하면 힌트가 오히려 성능을 악화시킬 수 있음"}),s.jsxs("li",{children:["힌트보다 ",s.jsx("strong",{children:"통계 수집, 인덱스 설계, 조건절 개선"}),"이 우선"]})]})]}),s.jsx("h2",{children:"5. 대용량 처리 기초"}),s.jsx("h3",{children:"5.1 파티셔닝"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Range Partition 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 날짜 기준 Range Partition
CREATE TABLE SALES (
  SALE_ID   NUMBER,
  SALE_DATE DATE,
  AMOUNT    NUMBER
)
PARTITION BY RANGE (SALE_DATE) (
  PARTITION P_2023 VALUES LESS THAN (TO_DATE('2024-01-01','YYYY-MM-DD')),
  PARTITION P_2024 VALUES LESS THAN (TO_DATE('2025-01-01','YYYY-MM-DD')),
  PARTITION P_2025 VALUES LESS THAN (MAXVALUE)
);

-- Partition Pruning: 해당 파티션만 접근
SELECT * FROM SALES
WHERE SALE_DATE >= TO_DATE('2024-06-01','YYYY-MM-DD')
  AND SALE_DATE <  TO_DATE('2024-07-01','YYYY-MM-DD');
-- → P_2024 파티션만 스캔 (나머지 파티션 건너뜀)`})})]}),s.jsx("h3",{children:"5.2 통계 수집과 샘플링"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"DBMS_STATS로 통계 수집"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 기본 통계 수집
EXEC DBMS_STATS.GATHER_TABLE_STATS(
  OWNNAME         => 'SCOTT',
  TABNAME         => 'EMP',
  ESTIMATE_PERCENT => DBMS_STATS.AUTO_SAMPLE_SIZE
);

-- 히스토그램 포함 통계 수집
EXEC DBMS_STATS.GATHER_TABLE_STATS(
  OWNNAME    => 'SCOTT',
  TABNAME    => 'EMP',
  METHOD_OPT => 'FOR COLUMNS SIZE 10 DEPTNO, JOB'
);`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"DBMS_XPLAN.DISPLAY_CURSOR"}),"로 실제 실행된 SQL의 실행계획을 확인한다."]}),s.jsxs("li",{children:["커서 공유 실패는 ",s.jsx("strong",{children:"V$SQL_SHARED_CURSOR"}),"로 원인을 추적한다."]}),s.jsxs("li",{children:["스칼라 서브쿼리는 ",s.jsx("strong",{children:"행 수만큼 반복"}),"되므로 JOIN으로 변환한다."]}),s.jsxs("li",{children:["힌트는 ",s.jsx("strong",{children:"INDEX, FULL, LEADING, USE_NL, USE_HASH"})," 5가지가 핵심이다."]}),s.jsxs("li",{children:["힌트보다 ",s.jsx("strong",{children:"조건절 개선, 인덱스 설계, 통계 수집"}),"이 우선이다."]})]})]}),s.jsxs("div",{style:{marginTop:"2rem",display:"flex",justifyContent:"space-between"},children:[s.jsx(e,{to:"/oracle/sql-processing",className:"nav-link",children:"← SQL 처리 구조와 I/O"}),s.jsx(e,{to:"/oracle/index-strategy",className:"nav-link",children:"인덱스 전략과 조인 튜닝 →"})]})]})})})]});export{E as default};
