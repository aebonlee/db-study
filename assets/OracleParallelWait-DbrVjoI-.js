import{j as s,L as e}from"./index-B7SSvP4q.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"병렬처리와 Wait Event 진단"}),s.jsx("p",{children:"Parallel Query, DOP, Wait Event 분석, 종합 튜닝 전략"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Parallel Query의 구조(QC + PX)와 DOP 설정을 이해한다."}),s.jsx("li",{children:"병렬처리 실행계획을 해석한다."}),s.jsx("li",{children:"Wait Event 기반 성능 진단 방법을 학습한다."}),s.jsx("li",{children:"종합 튜닝 전략 — 조건절, 인덱스, 힌트, 통계를 조합한다."}),s.jsx("li",{children:"튜닝 패턴 정리와 핵심 전략을 복습한다."})]})]}),s.jsx("h2",{children:"1. 병렬처리 (Parallel Query)"}),s.jsxs("p",{children:["대용량 데이터를 처리할 때 ",s.jsx("strong",{children:"여러 프로세스(PX 서버)가 동시에 작업"}),"하여 처리 시간을 단축하는 기법입니다."]}),s.jsx("h3",{children:"1.1 병렬처리 구조"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"구성 요소"}),s.jsx("th",{children:"역할"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Query Coordinator (QC)"})}),s.jsx("td",{children:"병렬 작업을 분배하고 결과를 통합하는 주 프로세스"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"PX Server"})}),s.jsx("td",{children:"실제 데이터를 처리하는 워커 프로세스"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DOP (Degree of Parallelism)"})}),s.jsx("td",{children:"병렬 프로세스 수 (기본값: CPU 수 기반)"})]})]})]}),s.jsx("h3",{children:"1.2 병렬처리 적용 방법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"PARALLEL 힌트와 설정"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 방법 1: 힌트로 병렬 실행
SELECT /*+ PARALLEL(SALES 4) */ *
FROM SALES
WHERE SALE_DATE >= TO_DATE('2024-01-01','YYYY-MM-DD');

-- 방법 2: 테이블 속성으로 설정
ALTER TABLE SALES PARALLEL 4;

-- 방법 3: 세션 레벨 설정
ALTER SESSION FORCE PARALLEL QUERY PARALLEL 4;

-- DML 병렬 처리
ALTER SESSION ENABLE PARALLEL DML;
INSERT /*+ PARALLEL(TARGET 4) APPEND */ INTO TARGET
SELECT /*+ PARALLEL(SOURCE 4) */ * FROM SOURCE;`})})]}),s.jsx("h3",{children:"1.3 병렬처리 실행계획 해석"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"병렬 실행계획 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`------------------------------------------------------------------------
| Id | Operation                  | Name     | TQ   | IN-OUT | PQ Distrib |
------------------------------------------------------------------------
|  0 | SELECT STATEMENT           |          |      |        |            |
|  1 |  PX COORDINATOR            |          |      |        |            |
|  2 |   PX SEND QC (RANDOM)      | :TQ10001 | Q1,01| P→S    | QC (RAND)  |
|  3 |    HASH JOIN               |          | Q1,01| PCWP   |            |
|  4 |     PX RECEIVE             |          | Q1,01| PCWP   |            |
|  5 |      PX SEND BROADCAST     | :TQ10000 | Q1,00| P→P    | BROADCAST  |
|  6 |       PX BLOCK ITERATOR    |          | Q1,00| PCWC   |            |
|  7 |        TABLE ACCESS FULL   | DEPT     | Q1,00| PCWP   |            |
|  8 |     PX BLOCK ITERATOR      |          | Q1,01| PCWC   |            |
|  9 |      TABLE ACCESS FULL     | EMP      | Q1,01| PCWP   |            |
------------------------------------------------------------------------

-- 핵심 오퍼레이션:
-- PX COORDINATOR: 병렬 작업 통합 (최종 결과)
-- PX SEND / PX RECEIVE: PX 서버 간 데이터 전송
-- PX BLOCK ITERATOR: 데이터를 블록 단위로 분배
-- P→S: Parallel → Serial (QC에게 전달)
-- P→P: Parallel → Parallel (PX 서버 간 전달)`})})]}),s.jsx("h3",{children:"1.4 병렬처리 모니터링"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"PX 세션 모니터링"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 현재 실행 중인 병렬 세션 확인
SELECT QCSID, SID, INST_ID, SERVER_GROUP, SERVER_SET,
       DEGREE, REQ_DEGREE
FROM V$PX_SESSION;

-- PQ 데이터 전송 통계
SELECT TQ_ID, SERVER_TYPE, NUM_ROWS, BYTES
FROM V$PQ_TQSTAT
ORDER BY TQ_ID, SERVER_TYPE;

-- 병렬 실행 통계 (SQL Monitor)
SELECT SQL_ID, STATUS, ELAPSED_TIME/1000000 AS ELAPSED_SEC,
       PX_SERVERS_ALLOCATED
FROM V$SQL_MONITOR
WHERE PX_SERVERS_ALLOCATED > 0
ORDER BY ELAPSED_TIME DESC;`})})]}),s.jsxs("div",{className:"callout-box warning",children:[s.jsx("h3",{children:"병렬처리 주의사항"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["DOP를 과도하게 높이면 ",s.jsx("strong",{children:"시스템 전체 리소스를 독점"}),"할 수 있음"]}),s.jsxs("li",{children:["OLTP(온라인 트랜잭션) 환경에서는 병렬처리를 ",s.jsx("strong",{children:"제한적으로"})," 사용"]}),s.jsx("li",{children:"배치 작업이나 DW(데이터 웨어하우스)에서 주로 활용"}),s.jsxs("li",{children:["테스트 환경에서 ",s.jsx("strong",{children:"충분히 검증"}),"한 후 운영에 적용"]}),s.jsx("li",{children:"과도한 병렬 사용은 Wait Event를 오히려 증가시킬 수 있음"})]})]}),s.jsx("h2",{children:"2. Wait Event 심화 진단"}),s.jsx("h3",{children:"2.1 Wait Class 분류"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Wait Class"}),s.jsx("th",{children:"대표 이벤트"}),s.jsx("th",{children:"의미"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"User I/O"})}),s.jsx("td",{children:"db file sequential read, db file scattered read"}),s.jsx("td",{children:"디스크 I/O 대기"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Concurrency"})}),s.jsx("td",{children:"buffer busy waits, latch free"}),s.jsx("td",{children:"동시 접근 경합"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Application"})}),s.jsx("td",{children:"enq: TX - row lock contention"}),s.jsx("td",{children:"애플리케이션 Lock"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Commit"})}),s.jsx("td",{children:"log file sync"}),s.jsx("td",{children:"COMMIT 처리 대기"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Network"})}),s.jsx("td",{children:"SQL*Net message from client"}),s.jsx("td",{children:"네트워크 지연"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Configuration"})}),s.jsx("td",{children:"log file switch, enq: HW"}),s.jsx("td",{children:"시스템 설정 문제"})]})]})]}),s.jsx("h3",{children:"2.2 주요 Wait Event 대응 전략"}),s.jsx("h4",{children:"db file sequential read (인덱스 단일 블록 읽기)"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"진단 및 대응"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 이 Wait가 많으면: 인덱스를 통한 I/O가 과다
-- 원인: Clustering Factor가 높거나, 과도한 인덱스 접근

-- 진단
SELECT SQL_ID, BUFFER_GETS, DISK_READS, EXECUTIONS,
       ELAPSED_TIME/1000000 AS ELAPSED_SEC
FROM V$SQL
ORDER BY DISK_READS DESC
FETCH FIRST 5 ROWS ONLY;

-- 대응:
-- 1. 인덱스 구조 개선 (Clustering Factor 확인)
-- 2. SQL 튜닝으로 불필요한 인덱스 접근 줄이기
-- 3. Buffer Cache 크기 증가`})})]}),s.jsx("h4",{children:"enq: TX - row lock contention (행 잠금 경합)"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Lock 경합 해결"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 원인: 여러 세션이 같은 행을 동시에 UPDATE/DELETE

-- 1. Blocking Session 확인
SELECT S1.SID AS WAITING_SID, S1.USERNAME,
       S2.SID AS BLOCKING_SID, S2.USERNAME AS BLOCKER
FROM V$SESSION S1
JOIN V$SESSION S2 ON S1.BLOCKING_SESSION = S2.SID
WHERE S1.EVENT LIKE '%TX%';

-- 2. Blocking Session의 SQL 확인
SELECT SQL_TEXT FROM V$SQL
WHERE SQL_ID = (SELECT SQL_ID FROM V$SESSION WHERE SID = :blocking_sid);

-- 대응 전략:
-- 1. COMMIT 지연 구조 개선
-- 2. 트랜잭션 범위 축소
-- 3. FOR UPDATE NOWAIT / SKIP LOCKED 활용
SELECT * FROM ORDERS
WHERE STATUS = 'PENDING'
FOR UPDATE SKIP LOCKED
FETCH FIRST 10 ROWS ONLY;`})})]}),s.jsx("h2",{children:"3. 종합 튜닝 전략 정리"}),s.jsx("h3",{children:"3.1 유형별 대응 전략"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"문제 유형"}),s.jsx("th",{children:"진단 방법"}),s.jsx("th",{children:"해결 전략"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"조건절 함수"})}),s.jsx("td",{children:"실행계획에 Filter만 있고 Access 없음"}),s.jsx("td",{children:"함수 제거, 범위 조건 변환"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"OR 조건"})}),s.jsx("td",{children:"실행계획에 CONCATENATION 또는 Full Scan"}),s.jsx("td",{children:"UNION ALL로 분해"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"NOT IN"})}),s.jsx("td",{children:"ANTI JOIN 미발생, Full Scan"}),s.jsx("td",{children:"NOT EXISTS로 변환"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"스칼라 서브쿼리"})}),s.jsx("td",{children:"BUFFER_GETS ↑↑ (행마다 반복)"}),s.jsx("td",{children:"JOIN으로 변환"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"인덱스 미사용"})}),s.jsx("td",{children:"실행계획에 TABLE ACCESS FULL"}),s.jsx("td",{children:"조건 구조 개선 또는 인덱스 생성"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"잘못된 조인 방법"})}),s.jsx("td",{children:"소량인데 Hash Join, 대량인데 NL Join"}),s.jsx("td",{children:"USE_NL / USE_HASH 힌트"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"통계 오류"})}),s.jsx("td",{children:"Rows 예측 ≠ 실제 (큰 차이)"}),s.jsx("td",{children:"DBMS_STATS 통계 수집, 히스토그램"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Hard Parse 과다"})}),s.jsx("td",{children:"PARSE_CALLS ↑, EXECUTIONS 대비"}),s.jsx("td",{children:"바인드 변수, CURSOR_SHARING"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Lock 대기"})}),s.jsx("td",{children:"V$SESSION Wait Event"}),s.jsx("td",{children:"COMMIT 조절, 트랜잭션 분할"})]})]})]}),s.jsx("h3",{children:"3.2 튜닝 프로세스"}),s.jsxs("div",{className:"callout-box tip",children:[s.jsx("h3",{children:"SQL 튜닝 5단계 프로세스"}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"문제 SQL 식별"})," — AWR Top SQL, V$SQL 분석"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"실행계획 분석"})," — DBMS_XPLAN, Access/Filter 구분"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"병목 원인 파악"})," — 조건절, 인덱스, 통계, Lock"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"개선 전략 적용"})," — 조건 개선 + 인덱스 + 힌트 + 통계 조합"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"효과 검증"})," — Before/After 수치 비교, AWR 비교"]})]})]}),s.jsx("h2",{children:"4. 핵심 5가지 힌트 정리"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"힌트"}),s.jsx("th",{children:"용도"}),s.jsx("th",{children:"사용 예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INDEX"})}),s.jsx("td",{children:"인덱스 사용 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ INDEX(EMP IDX_SAL) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"FULL"})}),s.jsx("td",{children:"Full Scan 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ FULL(EMP) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LEADING"})}),s.jsx("td",{children:"조인 순서 지정"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ LEADING(A B C) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"USE_NL"})}),s.jsx("td",{children:"Nested Loop Join 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ USE_NL(B) */"})})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"USE_HASH"})}),s.jsx("td",{children:"Hash Join 유도"}),s.jsx("td",{children:s.jsx("code",{children:"/*+ USE_HASH(B) */"})})]})]})]}),s.jsx("h2",{children:"5. 실전 종합 연습 문제"}),s.jsx("h3",{children:"문제 1: 조건절 + 서브쿼리 튜닝"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"튜닝 대상 SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- [문제] 다음 SQL의 병목 원인을 찾고 개선하시오.
SELECT E.EMPNO, E.ENAME, E.SAL,
  (SELECT D.DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME
FROM EMP E
WHERE SUBSTR(E.ENAME, 1, 1) = 'S'
AND   E.DEPTNO NOT IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'BOSTON');`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"개선 SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- [해답]
-- 병목 원인:
-- 1. SUBSTR(ENAME) → 인덱스 무력화
-- 2. 스칼라 서브쿼리 → 행마다 반복
-- 3. NOT IN → ANTI JOIN 미발생 가능

-- 개선:
SELECT E.EMPNO, E.ENAME, E.SAL, D.DNAME
FROM EMP E
JOIN DEPT D ON E.DEPTNO = D.DEPTNO
WHERE E.ENAME LIKE 'S%'                    -- SUBSTR → LIKE 변환
AND NOT EXISTS (                             -- NOT IN → NOT EXISTS
  SELECT 1 FROM DEPT D2
  WHERE D2.DEPTNO = E.DEPTNO AND D2.LOC = 'BOSTON'
);`})})]}),s.jsx("h3",{children:"문제 2: 조인 + 힌트 튜닝"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"대용량 조인 튜닝"}),s.jsx("pre",{children:s.jsx("code",{children:`-- [문제] SALES(1천만 건)와 PRODUCTS(1000건) 조인 최적화
SELECT S.SALE_ID, P.PRODUCT_NAME, S.AMOUNT
FROM SALES S, PRODUCTS P
WHERE S.PRODUCT_ID = P.PRODUCT_ID
AND   S.SALE_DATE >= TO_DATE('2024-01-01','YYYY-MM-DD')
AND   P.CATEGORY = 'ELECTRONICS';

-- [해답] 작은 테이블(PRODUCTS) 기준으로 Hash Join
SELECT /*+ LEADING(P S) USE_HASH(S) */
       S.SALE_ID, P.PRODUCT_NAME, S.AMOUNT
FROM SALES S, PRODUCTS P
WHERE S.PRODUCT_ID = P.PRODUCT_ID
AND   S.SALE_DATE >= TO_DATE('2024-01-01','YYYY-MM-DD')
AND   P.CATEGORY = 'ELECTRONICS';

-- PRODUCTS(소량)로 해시 테이블 Build → SALES Probe
-- 파티션 Pruning과 함께 사용하면 더 효율적`})})]}),s.jsx("h2",{children:"6. Oracle SQL 튜닝 전체 요약"}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"SQL 튜닝의 본질"}),s.jsx("p",{children:s.jsx("em",{children:'"SQL 튜닝은 단일 SQL을 빠르게 만드는 것이 아니라, SQL이 왜 느린지를 읽고, 설계하고, 그 결과를 증명하는 전 과정이다."'})})]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"영역"}),s.jsx("th",{children:"핵심 키워드"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"SQL 처리 구조"})}),s.jsx("td",{children:"Parse → Bind → Execute → Fetch, Hard/Soft Parse, SGA/PGA"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"실행계획"})}),s.jsx("td",{children:"DBMS_XPLAN, Access/Filter Predicate, COST/ROWS/BYTES"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"조건절 튜닝"})}),s.jsx("td",{children:"함수 제거, OR → UNION ALL, NOT IN → NOT EXISTS"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"인덱스 전략"})}),s.jsx("td",{children:"선두 컬럼, Function-Based Index, BLEVEL, Clustering Factor"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"조인 튜닝"})}),s.jsx("td",{children:"NL(소량+인덱스), Hash(대량), Merge(정렬), LEADING/USE_NL/USE_HASH"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"커서 공유"})}),s.jsx("td",{children:"바인드 변수, CURSOR_SHARING, V$SQL_SHARED_CURSOR"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"통계/히스토그램"})}),s.jsx("td",{children:"DBMS_STATS, FREQUENCY/HEIGHT BALANCED, Selectivity"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"병렬처리"})}),s.jsx("td",{children:"PARALLEL 힌트, DOP, QC + PX, V$PX_SESSION"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Wait Event"})}),s.jsx("td",{children:"V$SESSION, V$LOCK, enq:TX, buffer busy waits"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"성능 진단"})}),s.jsx("td",{children:"AWR, V$SQL, DBA_HIST_SQLSTAT, Before/After 비교"})]})]})]}),s.jsxs("div",{style:{marginTop:"2rem",display:"flex",justifyContent:"space-between"},children:[s.jsx(e,{to:"/oracle/awr-analysis",className:"nav-link",children:"← AWR 분석과 성능 진단"}),s.jsx(e,{to:"/oracle",className:"nav-link",children:"Oracle 튜닝 목차 →"})]})]})})})]});export{r as default};
