import { Link } from 'react-router-dom';

const OracleSqlProcessing = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>SQL 처리 구조와 Oracle I/O</h1>
        <p>Oracle의 SQL 처리 흐름과 메모리/디스크 I/O 구조를 이해합니다</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>Oracle SQL 처리 절차(Parse → Bind → Execute → Fetch)를 이해한다.</li>
              <li>SGA, PGA, Buffer Cache 등 메모리 구조를 파악한다.</li>
              <li>Hard Parsing과 Soft Parsing의 차이를 이해한다.</li>
              <li>실행계획의 기본 구조와 읽는 방법을 익힌다.</li>
              <li>조건절 튜닝의 핵심 원칙을 학습한다.</li>
            </ul>
          </div>

          {/* ───── 1. SQL 처리 절차 ───── */}
          <h2>1. Oracle SQL 처리 절차</h2>
          <p>
            Oracle에서 SQL이 실행되면 다음 4단계를 거칩니다. 이 흐름을 이해하는 것이
            튜닝의 출발점입니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>단계</th><th>설명</th><th>튜닝 포인트</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Parse</strong></td>
                <td>SQL 구문 분석, 권한 확인, 실행계획 생성</td>
                <td>Hard Parse ↓ → 바인드 변수 사용</td>
              </tr>
              <tr>
                <td><strong>Bind</strong></td>
                <td>바인드 변수에 실제 값 대입</td>
                <td>Bind Peeking 주의</td>
              </tr>
              <tr>
                <td><strong>Execute</strong></td>
                <td>실행계획에 따라 데이터 처리</td>
                <td>I/O 최소화가 핵심</td>
              </tr>
              <tr>
                <td><strong>Fetch</strong></td>
                <td>결과 행을 클라이언트에 반환</td>
                <td>불필요한 컬럼/행 제거</td>
              </tr>
            </tbody>
          </table>

          <h3>1.1 Hard Parsing vs Soft Parsing</h3>
          <p>
            Oracle은 SQL을 실행하기 전에 <strong>Library Cache</strong>에서 동일한 SQL이 있는지 확인합니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>구분</th><th>Hard Parsing</th><th>Soft Parsing</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>발생 조건</strong></td>
                <td>Library Cache에 SQL 없음</td>
                <td>Library Cache에 SQL 존재</td>
              </tr>
              <tr>
                <td><strong>비용</strong></td>
                <td>높음 (구문 분석 + 실행계획 생성)</td>
                <td>낮음 (기존 실행계획 재사용)</td>
              </tr>
              <tr>
                <td><strong>해결법</strong></td>
                <td>바인드 변수 사용, CURSOR_SHARING</td>
                <td>이상적인 상태</td>
              </tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">리터럴 SQL vs 바인드 변수</div>
            <pre><code>{`-- ❌ 리터럴 SQL → 매번 Hard Parse 발생
SELECT * FROM EMP WHERE EMPNO = 7369;
SELECT * FROM EMP WHERE EMPNO = 7499;
SELECT * FROM EMP WHERE EMPNO = 7521;
-- 각각 별도의 SQL로 인식 → Library Cache 낭비

-- ✅ 바인드 변수 사용 → Soft Parse (SQL 재사용)
SELECT * FROM EMP WHERE EMPNO = :empno;
-- 하나의 SQL로 공유 → 파싱 비용 절감`}</code></pre>
          </div>

          {/* ───── 2. Oracle 메모리 구조 ───── */}
          <h2>2. Oracle 메모리 구조 (SGA / PGA)</h2>

          <h3>2.1 SGA (System Global Area)</h3>
          <p>
            <strong>SGA</strong>는 Oracle 인스턴스의 공유 메모리 영역으로, 모든 세션이 함께 사용합니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>구성 요소</th><th>역할</th><th>튜닝 포인트</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Buffer Cache</strong></td>
                <td>디스크에서 읽어온 데이터 블록 캐싱</td>
                <td>크기 ↑ → 디스크 I/O ↓</td>
              </tr>
              <tr>
                <td><strong>Shared Pool</strong></td>
                <td>SQL 실행계획, 데이터 딕셔너리 캐싱</td>
                <td>Hard Parse ↓ → 부하 감소</td>
              </tr>
              <tr>
                <td><strong>Redo Log Buffer</strong></td>
                <td>변경 내역 임시 저장 (복구용)</td>
                <td>COMMIT 빈도 조절</td>
              </tr>
              <tr>
                <td><strong>Large Pool</strong></td>
                <td>Parallel Query, RMAN 등 대규모 작업</td>
                <td>병렬처리 시 중요</td>
              </tr>
            </tbody>
          </table>

          <h3>2.2 PGA (Program Global Area)</h3>
          <p>
            <strong>PGA</strong>는 각 세션(서버 프로세스)이 독립적으로 사용하는 메모리 영역입니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>구성 요소</th><th>역할</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Sort Area</strong></td><td>ORDER BY, GROUP BY 등 정렬 작업</td></tr>
              <tr><td><strong>Hash Area</strong></td><td>Hash Join 수행 시 해시 테이블 생성</td></tr>
              <tr><td><strong>Session Memory</strong></td><td>세션 변수, 커서 정보 저장</td></tr>
            </tbody>
          </table>

          <div className="callout-box tip">
            <h3>Buffer Cache의 동작 원리</h3>
            <p>
              SQL이 데이터를 읽을 때, 먼저 <strong>Buffer Cache</strong>에서 해당 블록을 찾습니다.
              캐시에 있으면 <strong>Logical Read</strong>(메모리), 없으면 디스크에서 읽어오는
              <strong>Physical Read</strong>가 발생합니다. 튜닝의 핵심은 <strong>Physical Read를 줄이는 것</strong>입니다.
            </p>
          </div>

          {/* ───── 3. 실행계획 기초 ───── */}
          <h2>3. 실행계획(Execution Plan) 기초</h2>
          <p>
            실행계획은 Oracle 옵티마이저가 SQL을 어떤 경로로 처리할지 보여주는 <strong>내부 처리 계획서</strong>입니다.
          </p>

          <div className="code-block">
            <div className="code-header">실행계획 확인 방법</div>
            <pre><code>{`-- 방법 1: EXPLAIN PLAN
EXPLAIN PLAN FOR
SELECT * FROM EMP WHERE DEPTNO = 10;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- 방법 2: AUTOTRACE (SQL*Plus)
SET AUTOTRACE ON
SELECT * FROM EMP WHERE DEPTNO = 10;

-- 방법 3: 실제 실행 후 통계 확인
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));`}</code></pre>
          </div>

          <h3>3.1 실행계획 구성 요소</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>의미</th><th>주의사항</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Id</strong></td>
                <td>실행 단계 번호 (계층 구조)</td>
                <td>아래에서 위로 실행 (Id 순서 ≠ 실행 순서)</td>
              </tr>
              <tr>
                <td><strong>Operation</strong></td>
                <td>처리 방법</td>
                <td>TABLE ACCESS FULL, INDEX RANGE SCAN 등</td>
              </tr>
              <tr>
                <td><strong>Rows</strong></td>
                <td>예상 반환 행 수 (Cardinality)</td>
                <td>통계 기반 예측값</td>
              </tr>
              <tr>
                <td><strong>Cost</strong></td>
                <td>옵티마이저의 상대적 비용</td>
                <td>SQL 간 상대 비교 지표</td>
              </tr>
              <tr>
                <td><strong>Access Predicate</strong></td>
                <td>인덱스 수준에서 적용되는 조건</td>
                <td>인덱스를 활용하는 조건</td>
              </tr>
              <tr>
                <td><strong>Filter Predicate</strong></td>
                <td>데이터를 가져온 후 필터링하는 조건</td>
                <td>Filter만 있으면 인덱스 미활용</td>
              </tr>
            </tbody>
          </table>

          <div className="callout-box warning">
            <h3>Access vs Filter Predicate</h3>
            <p>
              <strong>Access Predicate</strong>는 인덱스를 통해 필요한 범위만 접근하는 조건이고,
              <strong>Filter Predicate</strong>는 데이터를 가져온 뒤 걸러내는 조건입니다.
              Filter만 존재하고 Access가 없으면 인덱스가 제대로 활용되지 않는 것입니다.
            </p>
          </div>

          <h3>3.2 주요 Operation 종류</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>Operation</th><th>설명</th><th>성능</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>TABLE ACCESS FULL</strong></td><td>테이블 전체 스캔</td><td>대용량 시 느림</td></tr>
              <tr><td><strong>TABLE ACCESS BY INDEX ROWID</strong></td><td>인덱스로 찾은 ROWID로 테이블 접근</td><td>효율적</td></tr>
              <tr><td><strong>INDEX UNIQUE SCAN</strong></td><td>유일 인덱스로 1건 조회</td><td>최고</td></tr>
              <tr><td><strong>INDEX RANGE SCAN</strong></td><td>인덱스 범위 스캔</td><td>우수</td></tr>
              <tr><td><strong>INDEX FULL SCAN</strong></td><td>인덱스 전체 순회</td><td>보통</td></tr>
              <tr><td><strong>INDEX SKIP SCAN</strong></td><td>선두 컬럼 생략 스캔</td><td>비효율적</td></tr>
              <tr><td><strong>NESTED LOOPS</strong></td><td>반복 조인</td><td>소량 데이터 시 유리</td></tr>
              <tr><td><strong>HASH JOIN</strong></td><td>해시 테이블 기반 조인</td><td>대량 데이터 시 유리</td></tr>
              <tr><td><strong>MERGE JOIN</strong></td><td>정렬 병합 조인</td><td>정렬된 데이터 시 유리</td></tr>
            </tbody>
          </table>

          {/* ───── 4. 조건절 튜닝 전략 ───── */}
          <h2>4. 조건절 튜닝 전략</h2>
          <p>
            인덱스를 활용하려면 <strong>WHERE 조건절의 구조</strong>가 핵심입니다.
            조건절에 함수, 연산, OR 등이 있으면 인덱스를 사용할 수 없습니다.
          </p>

          <h3>4.1 함수 제거</h3>
          <div className="code-block">
            <div className="code-header">함수가 인덱스를 무력화하는 예</div>
            <pre><code>{`-- ❌ 문제 SQL: 컬럼에 함수 적용 → INDEX 사용 불가
SELECT * FROM EMP
WHERE TO_CHAR(HIREDATE, 'YYYY') = '2022';
-- → TABLE ACCESS FULL (풀 스캔)

-- ✅ 개선 SQL: 함수 제거, 범위 조건으로 변환
SELECT * FROM EMP
WHERE HIREDATE >= TO_DATE('2022-01-01', 'YYYY-MM-DD')
  AND HIREDATE <  TO_DATE('2023-01-01', 'YYYY-MM-DD');
-- → INDEX RANGE SCAN (인덱스 활용)`}</code></pre>
          </div>

          <h3>4.2 산술 연산 제거</h3>
          <div className="code-block">
            <div className="code-header">컬럼에 연산 적용 시</div>
            <pre><code>{`-- ❌ 비효율: 컬럼에 산술 연산
SELECT * FROM EMP WHERE SAL * 1.1 > 3000;

-- ✅ 효율: 상수 쪽에 연산 이동
SELECT * FROM EMP WHERE SAL > 3000 / 1.1;`}</code></pre>
          </div>

          <h3>4.3 OR 조건 → UNION ALL</h3>
          <div className="code-block">
            <div className="code-header">OR 조건 분해</div>
            <pre><code>{`-- ❌ OR 사용 → Index Merge 또는 Full Scan
SELECT * FROM EMP
WHERE JOB = 'CLERK' OR DEPTNO = 10;

-- ✅ UNION ALL로 분해 → 각각 인덱스 활용
SELECT * FROM EMP WHERE JOB = 'CLERK'
UNION ALL
SELECT * FROM EMP WHERE DEPTNO = 10
  AND JOB != 'CLERK';  -- 중복 제거`}</code></pre>
          </div>

          <h3>4.4 NOT IN → NOT EXISTS</h3>
          <div className="code-block">
            <div className="code-header">NOT IN 대체</div>
            <pre><code>{`-- ❌ NOT IN: NULL 처리 문제 + 풀 스캔 가능성
SELECT * FROM EMP
WHERE DEPTNO NOT IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'DALLAS');

-- ✅ NOT EXISTS: ANTI JOIN으로 최적화 가능
SELECT * FROM EMP E
WHERE NOT EXISTS (
  SELECT 1 FROM DEPT D
  WHERE D.DEPTNO = E.DEPTNO AND D.LOC = 'DALLAS'
);`}</code></pre>
          </div>

          <h3>4.5 조건절 튜닝 요약</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>문제 유형</th><th>개선 전략</th></tr>
            </thead>
            <tbody>
              <tr><td><code>TO_CHAR(date_col)</code></td><td>함수 제거 → BETWEEN 범위 조건</td></tr>
              <tr><td><code>LIKE '%값%'</code></td><td>구조 변경 또는 Full Text Index</td></tr>
              <tr><td><code>OR 조건</code></td><td>UNION ALL로 분해</td></tr>
              <tr><td><code>NOT IN</code>, <code>!=</code></td><td>NOT EXISTS, ANTI JOIN 사용</td></tr>
              <tr><td><code>column + 1 = 100</code></td><td>산술 연산 제거, 등가 변환</td></tr>
              <tr><td><code>SUBSTR(col, 1, 3)</code></td><td>LIKE 'ABC%' 또는 함수 기반 인덱스</td></tr>
            </tbody>
          </table>

          {/* ───── 5. 인덱스 구조 기초 ───── */}
          <h2>5. 인덱스(Index) 구조 이해</h2>

          <h3>5.1 B-Tree 인덱스</h3>
          <p>
            Oracle의 기본 인덱스는 <strong>B-Tree(Balanced Tree)</strong> 구조입니다.
            Root → Branch → Leaf 노드로 구성되며, Leaf 노드에는 키 값과 ROWID가 저장됩니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>구성 요소</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Root Block</strong></td><td>트리의 최상위, 검색 시작점</td></tr>
              <tr><td><strong>Branch Block</strong></td><td>중간 단계, 하위 블록으로 분기</td></tr>
              <tr><td><strong>Leaf Block</strong></td><td>실제 키 값 + ROWID 저장, 정렬 상태 유지</td></tr>
            </tbody>
          </table>

          <h3>5.2 인덱스 진단 지표</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>지표</th><th>의미</th><th>진단 기준</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>BLEVEL</strong></td>
                <td>트리 깊이 (Root → Leaf 단계 수)</td>
                <td>3 이상이면 REBUILD 고려</td>
              </tr>
              <tr>
                <td><strong>LEAF_BLOCKS</strong></td>
                <td>리프 블록 수</td>
                <td>급격한 증가 → 단편화</td>
              </tr>
              <tr>
                <td><strong>CLUSTERING_FACTOR</strong></td>
                <td>인덱스 순서와 테이블 물리적 순서의 일치도</td>
                <td>ROWS에 가까울수록 비효율</td>
              </tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">인덱스 진단 쿼리</div>
            <pre><code>{`-- 인덱스 상태 확인
SELECT INDEX_NAME, BLEVEL, LEAF_BLOCKS, CLUSTERING_FACTOR,
       NUM_ROWS, DISTINCT_KEYS
FROM USER_INDEXES
WHERE TABLE_NAME = 'EMP';

-- 인덱스 사용 여부 모니터링
ALTER INDEX IDX_EMP_DEPTNO MONITORING USAGE;
-- ... 일정 기간 후 확인
SELECT * FROM V$OBJECT_USAGE;`}</code></pre>
          </div>

          {/* ───── 6. 종합 실습 ───── */}
          <h2>6. 종합 실습 예제</h2>

          <div className="code-block">
            <div className="code-header">조건절 + 인덱스 튜닝 Before/After</div>
            <pre><code>{`-- ═══════════════════════════════════════
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
-- COST: 5, BUFFER_GETS: 28`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li>SQL 처리 절차: <strong>Parse → Bind → Execute → Fetch</strong></li>
              <li>바인드 변수를 사용하면 <strong>Hard Parse를 줄여</strong> Shared Pool 부하를 감소시킨다.</li>
              <li>실행계획은 <strong>아래에서 위로</strong> 읽으며, Access/Filter Predicate를 구분한다.</li>
              <li>조건절에 <strong>함수, 연산, OR, NOT IN</strong>을 사용하면 인덱스가 무력화된다.</li>
              <li>인덱스 건강 상태는 <strong>BLEVEL, LEAF_BLOCKS, CLUSTERING_FACTOR</strong>로 진단한다.</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/oracle" className="nav-link">← Oracle 튜닝 목차</Link>
            <Link to="/oracle/execution-plan" className="nav-link">실행계획과 옵티마이저 →</Link>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default OracleSqlProcessing;
