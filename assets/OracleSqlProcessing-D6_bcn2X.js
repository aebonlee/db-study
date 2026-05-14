import{j as s,L as e}from"./index-CnJhLTM_.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"SQL 처리 구조와 Oracle I/O"}),s.jsx("p",{children:"Oracle의 SQL 처리 흐름과 메모리/디스크 I/O 구조를 이해합니다"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Oracle SQL 처리 절차(Parse → Bind → Execute → Fetch)를 이해한다."}),s.jsx("li",{children:"SGA, PGA, Buffer Cache 등 메모리 구조를 파악한다."}),s.jsx("li",{children:"Hard Parsing과 Soft Parsing의 차이를 이해한다."}),s.jsx("li",{children:"실행계획의 기본 구조와 읽는 방법을 익힌다."}),s.jsx("li",{children:"조건절 튜닝의 핵심 원칙을 학습한다."})]})]}),s.jsx("h2",{children:"1. Oracle SQL 처리 절차"}),s.jsx("p",{children:"Oracle에서 SQL이 실행되면 다음 4단계를 거칩니다. 이 흐름을 이해하는 것이 튜닝의 출발점입니다."}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"단계"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"튜닝 포인트"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Parse"})}),s.jsx("td",{children:"SQL 구문 분석, 권한 확인, 실행계획 생성"}),s.jsx("td",{children:"Hard Parse ↓ → 바인드 변수 사용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Bind"})}),s.jsx("td",{children:"바인드 변수에 실제 값 대입"}),s.jsx("td",{children:"Bind Peeking 주의"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Execute"})}),s.jsx("td",{children:"실행계획에 따라 데이터 처리"}),s.jsx("td",{children:"I/O 최소화가 핵심"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Fetch"})}),s.jsx("td",{children:"결과 행을 클라이언트에 반환"}),s.jsx("td",{children:"불필요한 컬럼/행 제거"})]})]})]}),s.jsx("h3",{children:"1.1 Hard Parsing vs Soft Parsing"}),s.jsxs("p",{children:["Oracle은 SQL을 실행하기 전에 ",s.jsx("strong",{children:"Library Cache"}),"에서 동일한 SQL이 있는지 확인합니다."]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"구분"}),s.jsx("th",{children:"Hard Parsing"}),s.jsx("th",{children:"Soft Parsing"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"발생 조건"})}),s.jsx("td",{children:"Library Cache에 SQL 없음"}),s.jsx("td",{children:"Library Cache에 SQL 존재"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"비용"})}),s.jsx("td",{children:"높음 (구문 분석 + 실행계획 생성)"}),s.jsx("td",{children:"낮음 (기존 실행계획 재사용)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"해결법"})}),s.jsx("td",{children:"바인드 변수 사용, CURSOR_SHARING"}),s.jsx("td",{children:"이상적인 상태"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"리터럴 SQL vs 바인드 변수"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ 리터럴 SQL → 매번 Hard Parse 발생
SELECT * FROM EMP WHERE EMPNO = 7369;
SELECT * FROM EMP WHERE EMPNO = 7499;
SELECT * FROM EMP WHERE EMPNO = 7521;
-- 각각 별도의 SQL로 인식 → Library Cache 낭비

-- ✅ 바인드 변수 사용 → Soft Parse (SQL 재사용)
SELECT * FROM EMP WHERE EMPNO = :empno;
-- 하나의 SQL로 공유 → 파싱 비용 절감`})})]}),s.jsx("h2",{children:"2. Oracle 메모리 구조 (SGA / PGA)"}),s.jsx("h3",{children:"2.1 SGA (System Global Area)"}),s.jsxs("p",{children:[s.jsx("strong",{children:"SGA"}),"는 Oracle 인스턴스의 공유 메모리 영역으로, 모든 세션이 함께 사용합니다."]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"구성 요소"}),s.jsx("th",{children:"역할"}),s.jsx("th",{children:"튜닝 포인트"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Buffer Cache"})}),s.jsx("td",{children:"디스크에서 읽어온 데이터 블록 캐싱"}),s.jsx("td",{children:"크기 ↑ → 디스크 I/O ↓"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Shared Pool"})}),s.jsx("td",{children:"SQL 실행계획, 데이터 딕셔너리 캐싱"}),s.jsx("td",{children:"Hard Parse ↓ → 부하 감소"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Redo Log Buffer"})}),s.jsx("td",{children:"변경 내역 임시 저장 (복구용)"}),s.jsx("td",{children:"COMMIT 빈도 조절"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Large Pool"})}),s.jsx("td",{children:"Parallel Query, RMAN 등 대규모 작업"}),s.jsx("td",{children:"병렬처리 시 중요"})]})]})]}),s.jsx("h3",{children:"2.2 PGA (Program Global Area)"}),s.jsxs("p",{children:[s.jsx("strong",{children:"PGA"}),"는 각 세션(서버 프로세스)이 독립적으로 사용하는 메모리 영역입니다."]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"구성 요소"}),s.jsx("th",{children:"역할"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Sort Area"})}),s.jsx("td",{children:"ORDER BY, GROUP BY 등 정렬 작업"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Hash Area"})}),s.jsx("td",{children:"Hash Join 수행 시 해시 테이블 생성"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Session Memory"})}),s.jsx("td",{children:"세션 변수, 커서 정보 저장"})]})]})]}),s.jsxs("div",{className:"callout-box tip",children:[s.jsx("h3",{children:"Buffer Cache의 동작 원리"}),s.jsxs("p",{children:["SQL이 데이터를 읽을 때, 먼저 ",s.jsx("strong",{children:"Buffer Cache"}),"에서 해당 블록을 찾습니다. 캐시에 있으면 ",s.jsx("strong",{children:"Logical Read"}),"(메모리), 없으면 디스크에서 읽어오는",s.jsx("strong",{children:"Physical Read"}),"가 발생합니다. 튜닝의 핵심은 ",s.jsx("strong",{children:"Physical Read를 줄이는 것"}),"입니다."]})]}),s.jsx("h2",{children:"3. 실행계획(Execution Plan) 기초"}),s.jsxs("p",{children:["실행계획은 Oracle 옵티마이저가 SQL을 어떤 경로로 처리할지 보여주는 ",s.jsx("strong",{children:"내부 처리 계획서"}),"입니다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"실행계획 확인 방법"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 방법 1: EXPLAIN PLAN
EXPLAIN PLAN FOR
SELECT * FROM EMP WHERE DEPTNO = 10;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- 방법 2: AUTOTRACE (SQL*Plus)
SET AUTOTRACE ON
SELECT * FROM EMP WHERE DEPTNO = 10;

-- 방법 3: 실제 실행 후 통계 확인
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));`})})]}),s.jsx("h3",{children:"3.1 실행계획 구성 요소"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"항목"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"주의사항"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Id"})}),s.jsx("td",{children:"실행 단계 번호 (계층 구조)"}),s.jsx("td",{children:"아래에서 위로 실행 (Id 순서 ≠ 실행 순서)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Operation"})}),s.jsx("td",{children:"처리 방법"}),s.jsx("td",{children:"TABLE ACCESS FULL, INDEX RANGE SCAN 등"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Rows"})}),s.jsx("td",{children:"예상 반환 행 수 (Cardinality)"}),s.jsx("td",{children:"통계 기반 예측값"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Cost"})}),s.jsx("td",{children:"옵티마이저의 상대적 비용"}),s.jsx("td",{children:"SQL 간 상대 비교 지표"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Access Predicate"})}),s.jsx("td",{children:"인덱스 수준에서 적용되는 조건"}),s.jsx("td",{children:"인덱스를 활용하는 조건"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Filter Predicate"})}),s.jsx("td",{children:"데이터를 가져온 후 필터링하는 조건"}),s.jsx("td",{children:"Filter만 있으면 인덱스 미활용"})]})]})]}),s.jsxs("div",{className:"callout-box warning",children:[s.jsx("h3",{children:"Access vs Filter Predicate"}),s.jsxs("p",{children:[s.jsx("strong",{children:"Access Predicate"}),"는 인덱스를 통해 필요한 범위만 접근하는 조건이고,",s.jsx("strong",{children:"Filter Predicate"}),"는 데이터를 가져온 뒤 걸러내는 조건입니다. Filter만 존재하고 Access가 없으면 인덱스가 제대로 활용되지 않는 것입니다."]})]}),s.jsx("h3",{children:"3.2 주요 Operation 종류"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Operation"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"성능"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TABLE ACCESS FULL"})}),s.jsx("td",{children:"테이블 전체 스캔"}),s.jsx("td",{children:"대용량 시 느림"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TABLE ACCESS BY INDEX ROWID"})}),s.jsx("td",{children:"인덱스로 찾은 ROWID로 테이블 접근"}),s.jsx("td",{children:"효율적"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INDEX UNIQUE SCAN"})}),s.jsx("td",{children:"유일 인덱스로 1건 조회"}),s.jsx("td",{children:"최고"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INDEX RANGE SCAN"})}),s.jsx("td",{children:"인덱스 범위 스캔"}),s.jsx("td",{children:"우수"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INDEX FULL SCAN"})}),s.jsx("td",{children:"인덱스 전체 순회"}),s.jsx("td",{children:"보통"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INDEX SKIP SCAN"})}),s.jsx("td",{children:"선두 컬럼 생략 스캔"}),s.jsx("td",{children:"비효율적"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"NESTED LOOPS"})}),s.jsx("td",{children:"반복 조인"}),s.jsx("td",{children:"소량 데이터 시 유리"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"HASH JOIN"})}),s.jsx("td",{children:"해시 테이블 기반 조인"}),s.jsx("td",{children:"대량 데이터 시 유리"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"MERGE JOIN"})}),s.jsx("td",{children:"정렬 병합 조인"}),s.jsx("td",{children:"정렬된 데이터 시 유리"})]})]})]}),s.jsx("h2",{children:"4. 조건절 튜닝 전략"}),s.jsxs("p",{children:["인덱스를 활용하려면 ",s.jsx("strong",{children:"WHERE 조건절의 구조"}),"가 핵심입니다. 조건절에 함수, 연산, OR 등이 있으면 인덱스를 사용할 수 없습니다."]}),s.jsx("h3",{children:"4.1 함수 제거"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"함수가 인덱스를 무력화하는 예"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ 문제 SQL: 컬럼에 함수 적용 → INDEX 사용 불가
SELECT * FROM EMP
WHERE TO_CHAR(HIREDATE, 'YYYY') = '2022';
-- → TABLE ACCESS FULL (풀 스캔)

-- ✅ 개선 SQL: 함수 제거, 범위 조건으로 변환
SELECT * FROM EMP
WHERE HIREDATE >= TO_DATE('2022-01-01', 'YYYY-MM-DD')
  AND HIREDATE <  TO_DATE('2023-01-01', 'YYYY-MM-DD');
-- → INDEX RANGE SCAN (인덱스 활용)`})})]}),s.jsx("h3",{children:"4.2 산술 연산 제거"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"컬럼에 연산 적용 시"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ 비효율: 컬럼에 산술 연산
SELECT * FROM EMP WHERE SAL * 1.1 > 3000;

-- ✅ 효율: 상수 쪽에 연산 이동
SELECT * FROM EMP WHERE SAL > 3000 / 1.1;`})})]}),s.jsx("h3",{children:"4.3 OR 조건 → UNION ALL"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"OR 조건 분해"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ OR 사용 → Index Merge 또는 Full Scan
SELECT * FROM EMP
WHERE JOB = 'CLERK' OR DEPTNO = 10;

-- ✅ UNION ALL로 분해 → 각각 인덱스 활용
SELECT * FROM EMP WHERE JOB = 'CLERK'
UNION ALL
SELECT * FROM EMP WHERE DEPTNO = 10
  AND JOB != 'CLERK';  -- 중복 제거`})})]}),s.jsx("h3",{children:"4.4 NOT IN → NOT EXISTS"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"NOT IN 대체"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ❌ NOT IN: NULL 처리 문제 + 풀 스캔 가능성
SELECT * FROM EMP
WHERE DEPTNO NOT IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'DALLAS');

-- ✅ NOT EXISTS: ANTI JOIN으로 최적화 가능
SELECT * FROM EMP E
WHERE NOT EXISTS (
  SELECT 1 FROM DEPT D
  WHERE D.DEPTNO = E.DEPTNO AND D.LOC = 'DALLAS'
);`})})]}),s.jsx("h3",{children:"4.5 조건절 튜닝 요약"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"문제 유형"}),s.jsx("th",{children:"개선 전략"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("code",{children:"TO_CHAR(date_col)"})}),s.jsx("td",{children:"함수 제거 → BETWEEN 범위 조건"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("code",{children:"LIKE '%값%'"})}),s.jsx("td",{children:"구조 변경 또는 Full Text Index"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("code",{children:"OR 조건"})}),s.jsx("td",{children:"UNION ALL로 분해"})]}),s.jsxs("tr",{children:[s.jsxs("td",{children:[s.jsx("code",{children:"NOT IN"}),", ",s.jsx("code",{children:"!="})]}),s.jsx("td",{children:"NOT EXISTS, ANTI JOIN 사용"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("code",{children:"column + 1 = 100"})}),s.jsx("td",{children:"산술 연산 제거, 등가 변환"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("code",{children:"SUBSTR(col, 1, 3)"})}),s.jsx("td",{children:"LIKE 'ABC%' 또는 함수 기반 인덱스"})]})]})]}),s.jsx("h2",{children:"5. 인덱스(Index) 구조 이해"}),s.jsx("h3",{children:"5.1 B-Tree 인덱스"}),s.jsxs("p",{children:["Oracle의 기본 인덱스는 ",s.jsx("strong",{children:"B-Tree(Balanced Tree)"})," 구조입니다. Root → Branch → Leaf 노드로 구성되며, Leaf 노드에는 키 값과 ROWID가 저장됩니다."]}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"구성 요소"}),s.jsx("th",{children:"설명"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Root Block"})}),s.jsx("td",{children:"트리의 최상위, 검색 시작점"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Branch Block"})}),s.jsx("td",{children:"중간 단계, 하위 블록으로 분기"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"Leaf Block"})}),s.jsx("td",{children:"실제 키 값 + ROWID 저장, 정렬 상태 유지"})]})]})]}),s.jsx("h3",{children:"5.2 인덱스 진단 지표"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"지표"}),s.jsx("th",{children:"의미"}),s.jsx("th",{children:"진단 기준"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"BLEVEL"})}),s.jsx("td",{children:"트리 깊이 (Root → Leaf 단계 수)"}),s.jsx("td",{children:"3 이상이면 REBUILD 고려"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LEAF_BLOCKS"})}),s.jsx("td",{children:"리프 블록 수"}),s.jsx("td",{children:"급격한 증가 → 단편화"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CLUSTERING_FACTOR"})}),s.jsx("td",{children:"인덱스 순서와 테이블 물리적 순서의 일치도"}),s.jsx("td",{children:"ROWS에 가까울수록 비효율"})]})]})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"인덱스 진단 쿼리"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 인덱스 상태 확인
SELECT INDEX_NAME, BLEVEL, LEAF_BLOCKS, CLUSTERING_FACTOR,
       NUM_ROWS, DISTINCT_KEYS
FROM USER_INDEXES
WHERE TABLE_NAME = 'EMP';

-- 인덱스 사용 여부 모니터링
ALTER INDEX IDX_EMP_DEPTNO MONITORING USAGE;
-- ... 일정 기간 후 확인
SELECT * FROM V$OBJECT_USAGE;`})})]}),s.jsx("h2",{children:"6. 종합 실습 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"조건절 + 인덱스 튜닝 Before/After"}),s.jsx("pre",{children:s.jsx("code",{children:`-- ═══════════════════════════════════════
-- [Before] 튜닝 전 — Full Table Scan
-- ═══════════════════════════════════════
SELECT E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  TO_CHAR(E.HIREDATE, 'YYYY') = '1981'
AND    E.DEPTNO = D.DEPTNO
AND    E.SAL * 1.1 > 3000;

-- 실행계획:
-- TABLE ACCESS FULL (EMP)
-- COST: 45, BUFFER_GETS: 1,230

-- ═══════════════════════════════════════
-- [After] 튜닝 후 — Index Range Scan
-- ═══════════════════════════════════════
SELECT E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.HIREDATE >= TO_DATE('1981-01-01', 'YYYY-MM-DD')
AND    E.HIREDATE <  TO_DATE('1982-01-01', 'YYYY-MM-DD')
AND    E.DEPTNO = D.DEPTNO
AND    E.SAL > 3000 / 1.1;

-- 실행계획:
-- INDEX RANGE SCAN (IDX_EMP_HIREDATE)
-- COST: 5, BUFFER_GETS: 28`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["SQL 처리 절차: ",s.jsx("strong",{children:"Parse → Bind → Execute → Fetch"})]}),s.jsxs("li",{children:["바인드 변수를 사용하면 ",s.jsx("strong",{children:"Hard Parse를 줄여"})," Shared Pool 부하를 감소시킨다."]}),s.jsxs("li",{children:["실행계획은 ",s.jsx("strong",{children:"아래에서 위로"})," 읽으며, Access/Filter Predicate를 구분한다."]}),s.jsxs("li",{children:["조건절에 ",s.jsx("strong",{children:"함수, 연산, OR, NOT IN"}),"을 사용하면 인덱스가 무력화된다."]}),s.jsxs("li",{children:["인덱스 건강 상태는 ",s.jsx("strong",{children:"BLEVEL, LEAF_BLOCKS, CLUSTERING_FACTOR"}),"로 진단한다."]})]})]}),s.jsxs("div",{style:{marginTop:"2rem",display:"flex",justifyContent:"space-between"},children:[s.jsx(e,{to:"/oracle",className:"nav-link",children:"← Oracle 튜닝 목차"}),s.jsx(e,{to:"/oracle/execution-plan",className:"nav-link",children:"실행계획과 옵티마이저 →"})]})]})})})]});export{r as default};
