import { Link } from 'react-router-dom';

const OracleIndexStrategy = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>인덱스 전략과 조인 튜닝</h1>
        <p>B-Tree, 복합 인덱스, 함수 기반 인덱스, NL/Hash/Merge Join</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>복합 인덱스의 선두 컬럼 원칙을 이해한다.</li>
              <li>Function-Based Index를 활용한 조건절 튜닝을 학습한다.</li>
              <li>Nested Loop, Hash Join, Merge Join의 차이와 적용 상황을 파악한다.</li>
              <li>조인 순서 힌트(LEADING)와 조인 방법 힌트(USE_NL, USE_HASH)를 익힌다.</li>
              <li>비효율 SQL 탐지와 V$SQL 활용법을 학습한다.</li>
            </ul>
          </div>

          {/* ───── 1. 복합 인덱스 설계 ───── */}
          <h2>1. 복합 인덱스 설계 원칙</h2>
          <p>
            복합(Composite) 인덱스는 여러 컬럼을 조합하여 생성합니다.
            <strong>선두 컬럼</strong>이 WHERE 절에 반드시 포함되어야 인덱스를 효율적으로 활용합니다.
          </p>

          <div className="code-block">
            <div className="code-header">복합 인덱스와 선두 컬럼</div>
            <pre><code>{`-- 복합 인덱스 생성
CREATE INDEX IDX_EMP_DEPT_JOB ON EMP(DEPTNO, JOB);

-- ✅ 선두 컬럼(DEPTNO) 포함 → INDEX RANGE SCAN
SELECT * FROM EMP WHERE DEPTNO = 10 AND JOB = 'CLERK';
SELECT * FROM EMP WHERE DEPTNO = 10;  -- 선두 컬럼만으로도 OK

-- ❌ 선두 컬럼 없이 후행 컬럼만 → INDEX SKIP SCAN (비효율)
SELECT * FROM EMP WHERE JOB = 'CLERK';
-- JOB만으로는 인덱스 선두 컬럼을 건너뛰어야 함`}</code></pre>
          </div>

          <h3>1.1 인덱스 설계 기준</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>기준</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>선택도(Selectivity)</strong></td>
                <td>조건 적용 후 남는 비율이 낮을수록 좋음</td>
                <td>EMP_ID (고유) {'>'} GENDER (2가지)</td>
              </tr>
              <tr>
                <td><strong>조건 빈도</strong></td>
                <td>자주 사용되는 조건 컬럼을 선두에 배치</td>
                <td>WHERE STATUS = ... 이 빈번하면 선두</td>
              </tr>
              <tr>
                <td><strong>정렬 순서</strong></td>
                <td>ORDER BY 컬럼을 포함하면 정렬 비용 절감</td>
                <td>INDEX(A, B) + ORDER BY A, B</td>
              </tr>
              <tr>
                <td><strong>DML 부하</strong></td>
                <td>INSERT/UPDATE/DELETE 시 인덱스도 갱신됨</td>
                <td>사용 안 하는 인덱스는 DROP</td>
              </tr>
            </tbody>
          </table>

          {/* ───── 2. Function-Based Index ───── */}
          <h2>2. Function-Based Index (함수 기반 인덱스)</h2>
          <p>
            조건절에서 함수 사용이 불가피할 때, <strong>함수 적용 결과</strong>에 인덱스를 생성합니다.
          </p>

          <div className="code-block">
            <div className="code-header">함수 기반 인덱스 활용</div>
            <pre><code>{`-- 문제: UPPER 함수 때문에 인덱스 사용 불가
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
-- → INDEX RANGE SCAN`}</code></pre>
          </div>

          {/* ───── 3. Index Skip Scan ───── */}
          <h2>3. Index Skip Scan</h2>
          <p>
            복합 인덱스에서 <strong>선두 컬럼 조건이 없을 때</strong> Oracle이 시도하는 스캔 방식입니다.
            선두 컬럼의 Distinct 값이 적을 때만 효과적이며, 일반적으로 비효율적입니다.
          </p>

          <div className="code-block">
            <div className="code-header">Skip Scan 발생 예시</div>
            <pre><code>{`-- 인덱스: IDX_EMP_DEPT_JOB (DEPTNO, JOB)
-- DEPTNO 값: 10, 20, 30 (3가지)

-- 선두 컬럼 없이 후행 컬럼만 사용
SELECT * FROM EMP WHERE JOB = 'CLERK';

-- Oracle이 내부적으로 다음과 같이 처리:
-- WHERE DEPTNO = 10 AND JOB = 'CLERK'  → INDEX RANGE SCAN
-- WHERE DEPTNO = 20 AND JOB = 'CLERK'  → INDEX RANGE SCAN
-- WHERE DEPTNO = 30 AND JOB = 'CLERK'  → INDEX RANGE SCAN
-- 결과를 합침

-- DEPTNO의 Distinct 값이 많으면 Skip Scan 횟수 증가 → 비효율`}</code></pre>
          </div>

          {/* ───── 4. 인덱스 유지보수 ───── */}
          <h2>4. 인덱스 유지보수</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>진단 기준</th><th>조치</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>BLEVEL ≥ 3</strong></td>
                <td>트리 깊이가 깊어 탐색 비용 증가</td>
                <td>ALTER INDEX ... REBUILD</td>
              </tr>
              <tr>
                <td><strong>LEAF_BLOCKS 급증</strong></td>
                <td>데이터 삭제 후 빈 블록 잔존 (단편화)</td>
                <td>REBUILD 또는 COALESCE</td>
              </tr>
              <tr>
                <td><strong>CLUSTERING_FACTOR ≈ NUM_ROWS</strong></td>
                <td>인덱스 순서와 테이블 물리 순서 불일치</td>
                <td>테이블 재구성 고려</td>
              </tr>
              <tr>
                <td><strong>사용 이력 없음</strong></td>
                <td>V$OBJECT_USAGE에서 미사용 확인</td>
                <td>DROP 고려 (DML 부하 감소)</td>
              </tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">인덱스 Rebuild</div>
            <pre><code>{`-- 인덱스 리빌드
ALTER INDEX IDX_EMP_DEPTNO REBUILD;

-- 온라인 리빌드 (운영 중 가능)
ALTER INDEX IDX_EMP_DEPTNO REBUILD ONLINE;

-- 인덱스 압축
ALTER INDEX IDX_EMP_DEPTNO REBUILD COMPRESS;`}</code></pre>
          </div>

          {/* ───── 5. 조인 튜닝 ───── */}
          <h2>5. 조인(JOIN) 튜닝 전략</h2>

          <h3>5.1 조인 방법 비교</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>조인 방법</th><th>동작 원리</th><th>적합한 상황</th><th>주의사항</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nested Loop Join</strong></td>
                <td>외부 테이블 행마다 내부 테이블 반복 접근</td>
                <td>소량 데이터, 인덱스 존재</td>
                <td>외부 테이블 건수가 많으면 비효율</td>
              </tr>
              <tr>
                <td><strong>Hash Join</strong></td>
                <td>작은 테이블로 해시 테이블 생성 → 큰 테이블과 매칭</td>
                <td>대용량 데이터, 인덱스 없음</td>
                <td>PGA 메모리 사용량 증가</td>
              </tr>
              <tr>
                <td><strong>Sort Merge Join</strong></td>
                <td>양쪽 테이블을 정렬 후 병합</td>
                <td>이미 정렬된 데이터, 인덱스 정렬</td>
                <td>정렬 비용 발생</td>
              </tr>
            </tbody>
          </table>

          <h3>5.2 Nested Loop Join 상세</h3>
          <div className="code-block">
            <div className="code-header">NL Join 동작 예시</div>
            <pre><code>{`-- NL Join 유도
SELECT /*+ LEADING(D) USE_NL(E) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO
AND    D.LOC = 'CHICAGO';

-- 실행 흐름:
-- 1. DEPT에서 LOC = 'CHICAGO' 조건으로 행을 찾음 (외부 루프)
-- 2. 찾은 DEPTNO로 EMP를 인덱스 접근 (내부 루프)
-- 3. DEPT 결과 행마다 EMP 반복 접근

-- 적합: DEPT 결과가 소량 (1~2건) + EMP에 DEPTNO 인덱스 존재`}</code></pre>
          </div>

          <h3>5.3 Hash Join 상세</h3>
          <div className="code-block">
            <div className="code-header">Hash Join 동작 예시</div>
            <pre><code>{`-- Hash Join 유도
SELECT /*+ LEADING(D) USE_HASH(E) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO;

-- 실행 흐름:
-- 1. 작은 테이블(DEPT)을 메모리에 올려 해시 테이블 생성 (Build)
-- 2. 큰 테이블(EMP)을 스캔하며 해시 테이블과 매칭 (Probe)

-- 적합: 대용량 조인, 인덱스 없는 경우, 집계 쿼리`}</code></pre>
          </div>

          <h3>5.4 Sort Merge Join 상세</h3>
          <div className="code-block">
            <div className="code-header">Merge Join 동작</div>
            <pre><code>{`-- Sort Merge Join 유도
SELECT /*+ USE_MERGE(E D) */
       E.ENAME, E.SAL, D.DNAME
FROM   EMP E, DEPT D
WHERE  E.DEPTNO = D.DEPTNO;

-- 실행 흐름:
-- 1. EMP를 DEPTNO 기준으로 정렬
-- 2. DEPT를 DEPTNO 기준으로 정렬
-- 3. 두 정렬 결과를 순차적으로 병합

-- 적합: 이미 정렬된 데이터, 범위 조인 (>, <, BETWEEN)`}</code></pre>
          </div>

          <h3>5.5 OUTER JOIN 주의사항</h3>
          <div className="callout-box warning">
            <h3>OUTER JOIN과 옵티마이저</h3>
            <p>
              OUTER JOIN에서는 옵티마이저가 <strong>조인 순서를 변경할 수 없습니다</strong>.
              항상 기준 테이블(보존 테이블)이 먼저 읽히므로,
              조인 순서가 비효율적이면 <strong>SQL 구조 자체를 변경</strong>해야 합니다.
            </p>
          </div>

          {/* ───── 6. 비효율 SQL 탐지 ───── */}
          <h2>6. 비효율 SQL 탐지</h2>

          <div className="code-block">
            <div className="code-header">V$SQL로 Top Load SQL 찾기</div>
            <pre><code>{`-- Buffer Gets 기준 Top 10 SQL
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
FETCH FIRST 10 ROWS ONLY;`}</code></pre>
          </div>

          <table className="lesson-table">
            <thead>
              <tr><th>지표</th><th>해석</th><th>개선 방향</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>BUFFER_GETS ↑</strong></td>
                <td>반복 접근, 캐시 낭비</td>
                <td>인덱스 개선, 조건절 튜닝</td>
              </tr>
              <tr>
                <td><strong>DISK_READS ↑</strong></td>
                <td>Full Scan 또는 인덱스 미적용</td>
                <td>인덱스 생성, Buffer Cache 증가</td>
              </tr>
              <tr>
                <td><strong>EXECUTIONS ↑, PARSE_CALLS ↑</strong></td>
                <td>Hard Parse 반복</td>
                <td>바인드 변수 사용</td>
              </tr>
              <tr>
                <td><strong>BUFFER_GETS/EXECUTIONS ↑</strong></td>
                <td>1회 실행당 과도한 블록 접근</td>
                <td>SQL 구조 리팩토링</td>
              </tr>
            </tbody>
          </table>

          {/* ───── 7. 실전 종합 예제 ───── */}
          <h2>7. 실전 종합 예제</h2>

          <div className="code-block">
            <div className="code-header">비즈니스 SQL 튜닝 Before/After</div>
            <pre><code>{`-- ═══════════════════════════════════════
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
-- COST: 12, BUFFER_GETS: 85`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li>복합 인덱스는 <strong>선두 컬럼이 WHERE에 포함</strong>되어야 효율적이다.</li>
              <li>함수 사용이 불가피하면 <strong>Function-Based Index</strong>를 생성한다.</li>
              <li><strong>NL Join</strong>: 소량 + 인덱스, <strong>Hash Join</strong>: 대용량, <strong>Merge Join</strong>: 정렬 데이터</li>
              <li>OUTER JOIN은 옵티마이저가 <strong>조인 순서를 변경할 수 없어</strong> 주의가 필요하다.</li>
              <li>V$SQL로 <strong>BUFFER_GETS, ELAPSED_TIME</strong> 기준 Top SQL을 찾아 튜닝한다.</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/oracle/execution-plan" className="nav-link">← 실행계획과 옵티마이저</Link>
            <Link to="/oracle/awr-analysis" className="nav-link">AWR 분석과 성능 진단 →</Link>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default OracleIndexStrategy;
