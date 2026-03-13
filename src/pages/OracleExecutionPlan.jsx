import { Link } from 'react-router-dom';

const OracleExecutionPlan = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>실행계획과 옵티마이저</h1>
        <p>DBMS_XPLAN, 커서 공유, 서브쿼리 튜닝, 힌트 전략</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>DBMS_XPLAN으로 실행계획을 상세히 분석한다.</li>
              <li>커서 공유(Cursor Sharing)와 Library Cache 구조를 이해한다.</li>
              <li>서브쿼리 튜닝 전략(IN → EXISTS → JOIN)을 학습한다.</li>
              <li>Oracle 힌트(Hint)의 종류와 사용법을 익힌다.</li>
            </ul>
          </div>

          {/* ───── 1. DBMS_XPLAN 상세 활용 ───── */}
          <h2>1. DBMS_XPLAN 상세 활용</h2>
          <p>
            <code>DBMS_XPLAN</code> 패키지는 실행계획을 다양한 형태로 출력해주는 Oracle 내장 유틸리티입니다.
          </p>

          <div className="code-block">
            <div className="code-header">DBMS_XPLAN 사용법</div>
            <pre><code>{`-- 1) 예상 실행계획 확인
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
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR('sql_id_here', NULL, 'ALLSTATS'));`}</code></pre>
          </div>

          <h3>1.1 실행계획 읽는 규칙</h3>
          <div className="callout-box tip">
            <h3>실행 순서</h3>
            <ul>
              <li>같은 레벨이면 <strong>위에서 아래로</strong> 실행</li>
              <li>부모-자식 관계면 <strong>자식(하위)부터</strong> 실행</li>
              <li>Id 번호 순서 ≠ 실행 순서 (들여쓰기 기준)</li>
            </ul>
          </div>

          <div className="code-block">
            <div className="code-header">실행계획 예시</div>
            <pre><code>{`------------------------------------------------------------------------
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

-- 실행 순서: 3 → 2 → 5 → 4 → 1 → 0`}</code></pre>
          </div>

          <h3>1.2 실행계획 수치 진단</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>지표</th><th>의미</th><th>판단 기준</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>COST ↑↑</strong></td><td>상대적 실행 비용</td><td>복잡한 조인, Full Scan 가능성</td></tr>
              <tr><td><strong>BUFFER_GETS ↑</strong></td><td>메모리 블록 접근 횟수</td><td>반복 접근, 캐시 낭비</td></tr>
              <tr><td><strong>DISK_READS ↑</strong></td><td>디스크 I/O 횟수</td><td>Full Scan, 인덱스 미적용</td></tr>
              <tr><td><strong>EXECUTIONS ↑</strong></td><td>SQL 실행 횟수</td><td>공유 실패, 바인드 변수 미사용</td></tr>
              <tr><td><strong>ROWS ↓ (예상 대비 실제)</strong></td><td>반환 행 수</td><td>과도한 필터링 또는 통계 오류</td></tr>
            </tbody>
          </table>

          {/* ───── 2. 커서 공유 ───── */}
          <h2>2. 커서 공유 (Cursor Sharing)</h2>
          <p>
            Oracle은 동일한 SQL을 Library Cache에서 공유하여 파싱 비용을 절감합니다.
            하지만 SQL이 <strong>정확히 동일</strong>하지 않으면 공유에 실패합니다.
          </p>

          <h3>2.1 공유 실패 원인</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>원인</th><th>설명</th><th>해결 방법</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>리터럴 SQL</strong></td>
                <td>상수 값이 다르면 별도 SQL로 인식</td>
                <td>바인드 변수 사용</td>
              </tr>
              <tr>
                <td><strong>BIND_MISMATCH</strong></td>
                <td>바인드 변수 타입/길이 불일치</td>
                <td>일관된 바인드 타입 사용</td>
              </tr>
              <tr>
                <td><strong>AUTH_CHECK_MISMATCH</strong></td>
                <td>권한이 다른 사용자의 동일 SQL</td>
                <td>-</td>
              </tr>
              <tr>
                <td><strong>OPTIMIZER_MISMATCH</strong></td>
                <td>세션별 옵티마이저 설정 차이</td>
                <td>세션 파라미터 통일</td>
              </tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">커서 공유 진단</div>
            <pre><code>{`-- 공유된 커서 확인
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
ALTER SESSION SET CURSOR_SHARING = FORCE;`}</code></pre>
          </div>

          <h3>2.2 Shared Pool 튜닝</h3>
          <div className="code-block">
            <div className="code-header">Library Cache 상태 확인</div>
            <pre><code>{`-- Library Cache 적중률
SELECT NAMESPACE, GETS, GETHITS,
       ROUND(GETHITRATIO * 100, 2) || '%' AS HIT_RATIO
FROM V$LIBRARYCACHE
WHERE NAMESPACE = 'SQL AREA';

-- SESSION_CACHED_CURSORS 설정
-- 자주 사용하는 SQL의 커서를 세션 캐시에 보관
ALTER SYSTEM SET SESSION_CACHED_CURSORS = 100;`}</code></pre>
          </div>

          {/* ───── 3. 서브쿼리 튜닝 ───── */}
          <h2>3. 서브쿼리 튜닝 전략</h2>

          <h3>3.1 IN → EXISTS → JOIN 변환</h3>
          <div className="code-block">
            <div className="code-header">서브쿼리 리팩토링</div>
            <pre><code>{`-- ❌ IN 서브쿼리
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
WHERE D.LOC = 'CHICAGO';`}</code></pre>
          </div>

          <h3>3.2 스칼라 서브쿼리 제거</h3>
          <div className="code-block">
            <div className="code-header">스칼라 서브쿼리 → JOIN 변환</div>
            <pre><code>{`-- ❌ 스칼라 서브쿼리: 행 수만큼 반복 실행
SELECT EMPNO, ENAME,
  (SELECT DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME
FROM EMP E;
-- EMP 테이블 14건 → 서브쿼리 14회 반복

-- ✅ OUTER JOIN으로 변환: 1회 조인
SELECT E.EMPNO, E.ENAME, D.DNAME
FROM EMP E
LEFT JOIN DEPT D ON E.DEPTNO = D.DEPTNO;`}</code></pre>
          </div>

          <h3>3.3 인라인 뷰와 View Merge</h3>
          <div className="code-block">
            <div className="code-header">MERGE / NO_MERGE 힌트</div>
            <pre><code>{`-- 인라인 뷰 (FROM 절의 서브쿼리)
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
) V WHERE V.DEPTNO = 10;`}</code></pre>
          </div>

          {/* ───── 4. Oracle 힌트 ───── */}
          <h2>4. Oracle 힌트(Hint) 전략</h2>
          <p>
            힌트는 옵티마이저의 판단을 <strong>일시적으로 재정의</strong>하는 지시문입니다.
            옵티마이저가 잘못된 실행계획을 선택할 때 <strong>제한적이고 예외적으로</strong> 사용합니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>힌트</th><th>기능</th><th>사용 예시</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>INDEX(table)</strong></td>
                <td>특정 인덱스 사용 유도</td>
                <td><code>/*+ INDEX(EMP IDX_SAL) */</code></td>
              </tr>
              <tr>
                <td><strong>FULL(table)</strong></td>
                <td>Full Table Scan 유도</td>
                <td><code>/*+ FULL(EMP) */</code></td>
              </tr>
              <tr>
                <td><strong>LEADING(t1 t2)</strong></td>
                <td>조인 순서 지정</td>
                <td><code>/*+ LEADING(E D) */</code></td>
              </tr>
              <tr>
                <td><strong>USE_NL(table)</strong></td>
                <td>Nested Loop Join 유도</td>
                <td><code>/*+ USE_NL(D) */</code></td>
              </tr>
              <tr>
                <td><strong>USE_HASH(table)</strong></td>
                <td>Hash Join 유도</td>
                <td><code>/*+ USE_HASH(D) */</code></td>
              </tr>
              <tr>
                <td><strong>USE_MERGE(table)</strong></td>
                <td>Sort Merge Join 유도</td>
                <td><code>/*+ USE_MERGE(D) */</code></td>
              </tr>
              <tr>
                <td><strong>PARALLEL(table n)</strong></td>
                <td>병렬 실행</td>
                <td><code>/*+ PARALLEL(SALES 4) */</code></td>
              </tr>
              <tr>
                <td><strong>MERGE(view)</strong></td>
                <td>뷰 병합 유도</td>
                <td><code>/*+ MERGE(V) */</code></td>
              </tr>
              <tr>
                <td><strong>NO_MERGE(view)</strong></td>
                <td>뷰 병합 방지</td>
                <td><code>/*+ NO_MERGE(V) */</code></td>
              </tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">힌트 조합 사용 예시</div>
            <pre><code>{`-- 조인 순서 + 조인 방법 + 인덱스 지정
SELECT /*+ LEADING(E D) USE_NL(D) INDEX(E IDX_EMP_DEPTNO) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO
AND    E.SAL > 2000;

-- EMP를 먼저 읽고 (LEADING)
-- DEPT와 Nested Loop Join (USE_NL)
-- EMP의 IDX_EMP_DEPTNO 인덱스 사용 (INDEX)`}</code></pre>
          </div>

          <div className="callout-box warning">
            <h3>힌트 사용 주의사항</h3>
            <ul>
              <li>힌트는 <strong>옵티마이저가 잘못 판단할 때만 제한적으로</strong> 사용</li>
              <li>통계가 정확하면 옵티마이저 판단이 대부분 맞음</li>
              <li>데이터 분포가 변하면 힌트가 오히려 성능을 악화시킬 수 있음</li>
              <li>힌트보다 <strong>통계 수집, 인덱스 설계, 조건절 개선</strong>이 우선</li>
            </ul>
          </div>

          {/* ───── 5. 대용량 처리 전략 ───── */}
          <h2>5. 대용량 처리 기초</h2>

          <h3>5.1 파티셔닝</h3>
          <div className="code-block">
            <div className="code-header">Range Partition 예시</div>
            <pre><code>{`-- 날짜 기준 Range Partition
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
-- → P_2024 파티션만 스캔 (나머지 파티션 건너뜀)`}</code></pre>
          </div>

          <h3>5.2 통계 수집과 샘플링</h3>
          <div className="code-block">
            <div className="code-header">DBMS_STATS로 통계 수집</div>
            <pre><code>{`-- 기본 통계 수집
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
);`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>DBMS_XPLAN.DISPLAY_CURSOR</strong>로 실제 실행된 SQL의 실행계획을 확인한다.</li>
              <li>커서 공유 실패는 <strong>V$SQL_SHARED_CURSOR</strong>로 원인을 추적한다.</li>
              <li>스칼라 서브쿼리는 <strong>행 수만큼 반복</strong>되므로 JOIN으로 변환한다.</li>
              <li>힌트는 <strong>INDEX, FULL, LEADING, USE_NL, USE_HASH</strong> 5가지가 핵심이다.</li>
              <li>힌트보다 <strong>조건절 개선, 인덱스 설계, 통계 수집</strong>이 우선이다.</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/oracle/sql-processing" className="nav-link">← SQL 처리 구조와 I/O</Link>
            <Link to="/oracle/index-strategy" className="nav-link">인덱스 전략과 조인 튜닝 →</Link>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default OracleExecutionPlan;
