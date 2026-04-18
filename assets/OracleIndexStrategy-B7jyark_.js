import{j as s,L as E}from"./index-BzTEy25C.js";const d=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"인덱스 전략과 조인 튜닝"}),s.jsx("p",{children:"B-Tree, 복합 인덱스, 함수 기반 인덱스, NL/Hash/Merge Join"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"복합 인덱스의 선두 컬럼 원칙을 이해한다."}),s.jsx("li",{children:"Function-Based Index를 활용한 조건절 튜닝을 학습한다."}),s.jsx("li",{children:"Nested Loop, Hash Join, Merge Join의 차이와 적용 상황을 파악한다."}),s.jsx("li",{children:"조인 순서 힌트(LEADING)와 조인 방법 힌트(USE_NL, USE_HASH)를 익힌다."}),s.jsx("li",{children:"비효율 SQL 탐지와 V$SQL 활용법을 학습한다."})]})]}),s.jsx("h2",{children:"1. 복합 인덱스 설계 원칙"}),s.jsxs("p",{children:["복합(Composite) 인덱스는 여러 컬럼을 조합하여 생성합니다.",s.jsx("strong",{children:"선두 컬럼"}),"이 WHERE 절에 반드시 포함되어야 인덱스를 효율적으로 활용합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"복합 인덱스와 선두 컬럼"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 복합 인덱스 생성
CREATE INDEX IDX_EMP_DEPT_JOB ON EMP(DEPTNO, JOB);

-- ✅ 선두 컬럼(DEPTNO) 포함 → INDEX RANGE SCAN
SELECT * FROM EMP WHERE DEPTNO = 10 AND JOB = 'CLERK';
SELECT * FROM EMP WHERE DEPTNO = 10;  -- 선두 컬럼만으로도 OK

-- ❌ 선두 컬럼 없이 후행 컬럼만 → INDEX SKIP SCAN (비효율)
SELECT * FROM EMP WHERE JOB = 'CLERK';
-- JOB만으로는 인덱스 선두 컬럼을 건너뛰어야 함`})})]}),s.jsx("h3",{children:"1.1 인덱스 설계 기준"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"기준"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"선택도(Selectivity)"})}),s.jsx("td",{children:"조건 적용 후 남는 비율이 낮을수록 좋음"}),s.jsxs("td",{children:["EMP_ID (고유) ",">"," GENDER (2가지)"]})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"조건 빈도"})}),s.jsx("td",{children:"자주 사용되는 조건 컬럼을 선두에 배치"}),s.jsx("td",{children:"WHERE STATUS = ... 이 빈번하면 선두"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"정렬 순서"})}),s.jsx("td",{children:"ORDER BY 컬럼을 포함하면 정렬 비용 절감"}),s.jsx("td",{children:"INDEX(A, B) + ORDER BY A, B"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DML 부하"})}),s.jsx("td",{children:"INSERT/UPDATE/DELETE 시 인덱스도 갱신됨"}),s.jsx("td",{children:"사용 안 하는 인덱스는 DROP"})]})]})]}),s.jsx("h2",{children:"2. Function-Based Index (함수 기반 인덱스)"}),s.jsxs("p",{children:["조건절에서 함수 사용이 불가피할 때, ",s.jsx("strong",{children:"함수 적용 결과"}),"에 인덱스를 생성합니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"함수 기반 인덱스 활용"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 문제: UPPER 함수 때문에 인덱스 사용 불가
SELECT * FROM EMP WHERE UPPER(ENAME) = 'SMITH';
-- → TABLE ACCESS FULL

-- 해결: 함수 기반 인덱스 생성
CREATE INDEX IDX_EMP_UPPER_ENAME ON EMP(UPPER(ENAME));

-- 이제 인덱스 사용 가능
SELECT * FROM EMP WHERE UPPER(ENAME) = 'SMITH';
-- → INDEX RANGE SCAN (IDX_EMP_UPPER_ENAME)

-- 날짜 함수에도 적용 가능
CREATE INDEX IDX_EMP_HIRE_YEAR ON EMP(TO_CHAR(HIREDATE, 'YYYY'));

SELECT * FROM EMP WHERE TO_CHAR(HIREDATE, 'YYYY') = '1981';
-- → INDEX RANGE SCAN`})})]}),s.jsx("h2",{children:"3. Index Skip Scan"}),s.jsxs("p",{children:["복합 인덱스에서 ",s.jsx("strong",{children:"선두 컬럼 조건이 없을 때"})," Oracle이 시도하는 스캔 방식입니다. 선두 컬럼의 Distinct 값이 적을 때만 효과적이며, 일반적으로 비효율적입니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Skip Scan 발생 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 인덱스: IDX_EMP_DEPT_JOB (DEPTNO, JOB)
-- DEPTNO 값: 10, 20, 30 (3가지)

-- 선두 컬럼 없이 후행 컬럼만 사용
SELECT * FROM EMP WHERE JOB = 'CLERK';

-- Oracle이 내부적으로 다음과 같이 처리:
-- WHERE DEPTNO = 10 AND JOB = 'CLERK'  → INDEX RANGE SCAN
-- WHERE DEPTNO = 20 AND JOB = 'CLERK'  → INDEX RANGE SCAN
-- WHERE DEPTNO = 30 AND JOB = 'CLERK'  → INDEX RANGE SCAN
-- 결과를 합침

-- DEPTNO의 Distinct 값이 많으면 Skip Scan 횟수 증가 → 비효율`})})]}),s.jsx("h2",{children:"4. 인덱스 유지보수"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"항목"}),s.jsx("th",{children:"진단 기준"}),s.jsx("th",{children:"조치"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"BLEVEL ≥ 3"})}),s.jsx("td",{children:"트리 깊이가 깊어 탐색 비용 증가"}),s.jsx("td",{children:"ALTER INDEX ... REBUILD"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LEAF_BLOCKS 급증"})}),s.jsx("td",{children:"데이터 삭제 후 빈 블록 잔존 (단편화)"}),s.jsx("td",{children:"REBUILD 또는 COALESCE"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CLUSTERING_FACTOR ≈ NUM_ROWS"})}),s.jsx("td",{children:"인덱스 순서와 테이블 물리 순서 불일치"}),s.jsx("td",{children:"테이블 재구성 고려"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"사용 이력 없음"})}),s.jsx("td",{children:"V$OBJECT_USAGE에서 미사용 확인"}),s.jsx("td",{children:"DROP 고려 (DML 부하 감소)"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"인덱스 Rebuild"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 인덱스 리빌드
ALTER INDEX IDX_EMP_DEPTNO REBUILD;

-- 온라인 리빌드 (운영 중 가능)
ALTER INDEX IDX_EMP_DEPTNO REBUILD ONLINE;

-- 인덱스 압축
ALTER INDEX IDX_EMP_DEPTNO REBUILD COMPRESS;`})})]}),s.jsx("h2",{children:"5. 조인(JOIN) 튜닝 전략"}),s.jsx("h3",{children:"5.1 조인 방법 비교"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"조인 방법"}),s.jsx("th",{children:"동작 원리"}),s.jsx("th",{children:"적합한 상황"}),s.jsx("th",{children:"주의사항"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Nested Loop Join"})}),s.jsx("td",{children:"외부 테이블 행마다 내부 테이블 반복 접근"}),s.jsx("td",{children:"소량 데이터, 인덱스 존재"}),s.jsx("td",{children:"외부 테이블 건수가 많으면 비효율"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Hash Join"})}),s.jsx("td",{children:"작은 테이블로 해시 테이블 생성 → 큰 테이블과 매칭"}),s.jsx("td",{children:"대용량 데이터, 인덱스 없음"}),s.jsx("td",{children:"PGA 메모리 사용량 증가"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Sort Merge Join"})}),s.jsx("td",{children:"양쪽 테이블을 정렬 후 병합"}),s.jsx("td",{children:"이미 정렬된 데이터, 인덱스 정렬"}),s.jsx("td",{children:"정렬 비용 발생"})]})]})]}),s.jsx("h3",{children:"5.2 Nested Loop Join 상세"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"NL Join 동작 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- NL Join 유도
SELECT /*+ LEADING(D) USE_NL(E) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO
AND    D.LOC = 'CHICAGO';

-- 실행 흐름:
-- 1. DEPT에서 LOC = 'CHICAGO' 조건으로 행을 찾음 (외부 루프)
-- 2. 찾은 DEPTNO로 EMP를 인덱스 접근 (내부 루프)
-- 3. DEPT 결과 행마다 EMP 반복 접근

-- 적합: DEPT 결과가 소량 (1~2건) + EMP에 DEPTNO 인덱스 존재`})})]}),s.jsx("h3",{children:"5.3 Hash Join 상세"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Hash Join 동작 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- Hash Join 유도
SELECT /*+ LEADING(D) USE_HASH(E) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO;

-- 실행 흐름:
-- 1. 작은 테이블(DEPT)을 메모리에 올려 해시 테이블 생성 (Build)
-- 2. 큰 테이블(EMP)을 스캔하며 해시 테이블과 매칭 (Probe)

-- 적합: 대용량 조인, 인덱스 없는 경우, 집계 쿼리`})})]}),s.jsx("h3",{children:"5.4 Sort Merge Join 상세"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Merge Join 동작"}),s.jsx("pre",{children:s.jsx("code",{children:`-- Sort Merge Join 유도
SELECT /*+ USE_MERGE(E D) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO;

-- 실행 흐름:
-- 1. EMP를 DEPTNO 기준으로 정렬
-- 2. DEPT를 DEPTNO 기준으로 정렬
-- 3. 두 정렬 결과를 순차적으로 병합

-- 적합: 이미 정렬된 데이터, 범위 조인 (>, <, BETWEEN)`})})]}),s.jsx("h3",{children:"5.5 OUTER JOIN 주의사항"}),s.jsxs("div",{className:"callout-box warning",children:[s.jsx("h3",{children:"OUTER JOIN과 옵티마이저"}),s.jsxs("p",{children:["OUTER JOIN에서는 옵티마이저가 ",s.jsx("strong",{children:"조인 순서를 변경할 수 없습니다"}),". 항상 기준 테이블(보존 테이블)이 먼저 읽히므로, 조인 순서가 비효율적이면 ",s.jsx("strong",{children:"SQL 구조 자체를 변경"}),"해야 합니다."]})]}),s.jsx("h2",{children:"6. 비효율 SQL 탐지"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"V$SQL로 Top Load SQL 찾기"}),s.jsx("pre",{children:s.jsx("code",{children:`-- Buffer Gets 기준 Top 10 SQL
SELECT SQL_ID, ELAPSED_TIME/1000000 AS ELAPSED_SEC,
       BUFFER_GETS, DISK_READS, EXECUTIONS,
       ROUND(BUFFER_GETS/EXECUTIONS) AS GETS_PER_EXEC,
       SUBSTR(SQL_TEXT, 1, 100) AS SQL_TEXT
FROM V$SQL
WHERE EXECUTIONS > 0
ORDER BY BUFFER_GETS DESC
FETCH FIRST 10 ROWS ONLY;

-- Elapsed Time 기준 Top SQL
SELECT SQL_ID, ELAPSED_TIME/1000000 AS ELAPSED_SEC,
       CPU_TIME/1000000 AS CPU_SEC,
       BUFFER_GETS, ROWS_PROCESSED
FROM V$SQL
ORDER BY ELAPSED_TIME DESC
FETCH FIRST 10 ROWS ONLY;`})})]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"지표"}),s.jsx("th",{children:"해석"}),s.jsx("th",{children:"개선 방향"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"BUFFER_GETS ↑"})}),s.jsx("td",{children:"반복 접근, 캐시 낭비"}),s.jsx("td",{children:"인덱스 개선, 조건절 튜닝"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DISK_READS ↑"})}),s.jsx("td",{children:"Full Scan 또는 인덱스 미적용"}),s.jsx("td",{children:"인덱스 생성, Buffer Cache 증가"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"EXECUTIONS ↑, PARSE_CALLS ↑"})}),s.jsx("td",{children:"Hard Parse 반복"}),s.jsx("td",{children:"바인드 변수 사용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"BUFFER_GETS/EXECUTIONS ↑"})}),s.jsx("td",{children:"1회 실행당 과도한 블록 접근"}),s.jsx("td",{children:"SQL 구조 리팩토링"})]})]})]}),s.jsx("h2",{children:"7. 실전 종합 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"비즈니스 SQL 튜닝 Before/After"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ═══════════════════════════════════════
-- [Before] 스칼라 서브쿼리 + 함수 사용
-- ═══════════════════════════════════════
SELECT E.EMPNO, E.ENAME,
  (SELECT D.DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME,
  (SELECT COUNT(*) FROM EMP E2 WHERE E2.DEPTNO = E.DEPTNO) AS DEPT_CNT
FROM EMP E
WHERE TO_CHAR(E.HIREDATE, 'YYYY') = '1981'
AND   E.SAL * 1.1 > 3000;

-- 문제점:
-- 1. 스칼라 서브쿼리 2개 → 행마다 반복 실행
-- 2. TO_CHAR(HIREDATE) → 인덱스 무력화
-- 3. SAL * 1.1 → 산술 연산으로 인덱스 무력화
-- COST: 120, BUFFER_GETS: 4,560

-- ═══════════════════════════════════════
-- [After] JOIN + 조건절 개선
-- ═══════════════════════════════════════
SELECT E.EMPNO, E.ENAME, D.DNAME, C.DEPT_CNT
FROM EMP E
JOIN DEPT D ON E.DEPTNO = D.DEPTNO
JOIN (
  SELECT DEPTNO, COUNT(*) AS DEPT_CNT
  FROM EMP GROUP BY DEPTNO
) C ON E.DEPTNO = C.DEPTNO
WHERE E.HIREDATE >= TO_DATE('1981-01-01', 'YYYY-MM-DD')
AND   E.HIREDATE <  TO_DATE('1982-01-01', 'YYYY-MM-DD')
AND   E.SAL > 3000 / 1.1;

-- 개선 효과:
-- 1. 스칼라 서브쿼리 → JOIN 변환 (반복 제거)
-- 2. 함수 제거 → BETWEEN 범위 조건
-- 3. 산술 연산 → 상수 측으로 이동
-- COST: 12, BUFFER_GETS: 85`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["복합 인덱스는 ",s.jsx("strong",{children:"선두 컬럼이 WHERE에 포함"}),"되어야 효율적이다."]}),s.jsxs("li",{children:["함수 사용이 불가피하면 ",s.jsx("strong",{children:"Function-Based Index"}),"를 생성한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"NL Join"}),": 소량 + 인덱스, ",s.jsx("strong",{children:"Hash Join"}),": 대용량, ",s.jsx("strong",{children:"Merge Join"}),": 정렬 데이터"]}),s.jsxs("li",{children:["OUTER JOIN은 옵티마이저가 ",s.jsx("strong",{children:"조인 순서를 변경할 수 없어"})," 주의가 필요하다."]}),s.jsxs("li",{children:["V$SQL로 ",s.jsx("strong",{children:"BUFFER_GETS, ELAPSED_TIME"})," 기준 Top SQL을 찾아 튜닝한다."]})]})]}),s.jsxs("div",{style:{marginTop:"2rem",display:"flex",justifyContent:"space-between"},children:[s.jsx(E,{to:"/oracle/execution-plan",className:"nav-link",children:"← 실행계획과 옵티마이저"}),s.jsx(E,{to:"/oracle/awr-analysis",className:"nav-link",children:"AWR 분석과 성능 진단 →"})]})]})})})]});export{d as default};
