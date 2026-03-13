import { Link } from 'react-router-dom';

const OracleParallelWait = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>병렬처리와 Wait Event 진단</h1>
        <p>Parallel Query, DOP, Wait Event 분석, 종합 튜닝 전략</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>Parallel Query의 구조(QC + PX)와 DOP 설정을 이해한다.</li>
              <li>병렬처리 실행계획을 해석한다.</li>
              <li>Wait Event 기반 성능 진단 방법을 학습한다.</li>
              <li>종합 튜닝 전략 — 조건절, 인덱스, 힌트, 통계를 조합한다.</li>
              <li>튜닝 패턴 정리와 핵심 전략을 복습한다.</li>
            </ul>
          </div>

          {/* ───── 1. 병렬처리 개요 ───── */}
          <h2>1. 병렬처리 (Parallel Query)</h2>
          <p>
            대용량 데이터를 처리할 때 <strong>여러 프로세스(PX 서버)가 동시에 작업</strong>하여
            처리 시간을 단축하는 기법입니다.
          </p>

          <h3>1.1 병렬처리 구조</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>구성 요소</th><th>역할</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Query Coordinator (QC)</strong></td>
                <td>병렬 작업을 분배하고 결과를 통합하는 주 프로세스</td>
              </tr>
              <tr>
                <td><strong>PX Server</strong></td>
                <td>실제 데이터를 처리하는 워커 프로세스</td>
              </tr>
              <tr>
                <td><strong>DOP (Degree of Parallelism)</strong></td>
                <td>병렬 프로세스 수 (기본값: CPU 수 기반)</td>
              </tr>
            </tbody>
          </table>

          <h3>1.2 병렬처리 적용 방법</h3>
          <div className="code-block">
            <div className="code-header">PARALLEL 힌트와 설정</div>
            <pre><code>{`-- 방법 1: 힌트로 병렬 실행
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
SELECT /*+ PARALLEL(SOURCE 4) */ * FROM SOURCE;`}</code></pre>
          </div>

          <h3>1.3 병렬처리 실행계획 해석</h3>
          <div className="code-block">
            <div className="code-header">병렬 실행계획 예시</div>
            <pre><code>{`------------------------------------------------------------------------
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
-- P→P: Parallel → Parallel (PX 서버 간 전달)`}</code></pre>
          </div>

          <h3>1.4 병렬처리 모니터링</h3>
          <div className="code-block">
            <div className="code-header">PX 세션 모니터링</div>
            <pre><code>{`-- 현재 실행 중인 병렬 세션 확인
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
ORDER BY ELAPSED_TIME DESC;`}</code></pre>
          </div>

          <div className="callout-box warning">
            <h3>병렬처리 주의사항</h3>
            <ul>
              <li>DOP를 과도하게 높이면 <strong>시스템 전체 리소스를 독점</strong>할 수 있음</li>
              <li>OLTP(온라인 트랜잭션) 환경에서는 병렬처리를 <strong>제한적으로</strong> 사용</li>
              <li>배치 작업이나 DW(데이터 웨어하우스)에서 주로 활용</li>
              <li>테스트 환경에서 <strong>충분히 검증</strong>한 후 운영에 적용</li>
              <li>과도한 병렬 사용은 Wait Event를 오히려 증가시킬 수 있음</li>
            </ul>
          </div>

          {/* ───── 2. Wait Event 심화 ───── */}
          <h2>2. Wait Event 심화 진단</h2>

          <h3>2.1 Wait Class 분류</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>Wait Class</th><th>대표 이벤트</th><th>의미</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>User I/O</strong></td>
                <td>db file sequential read, db file scattered read</td>
                <td>디스크 I/O 대기</td>
              </tr>
              <tr>
                <td><strong>Concurrency</strong></td>
                <td>buffer busy waits, latch free</td>
                <td>동시 접근 경합</td>
              </tr>
              <tr>
                <td><strong>Application</strong></td>
                <td>enq: TX - row lock contention</td>
                <td>애플리케이션 Lock</td>
              </tr>
              <tr>
                <td><strong>Commit</strong></td>
                <td>log file sync</td>
                <td>COMMIT 처리 대기</td>
              </tr>
              <tr>
                <td><strong>Network</strong></td>
                <td>SQL*Net message from client</td>
                <td>네트워크 지연</td>
              </tr>
              <tr>
                <td><strong>Configuration</strong></td>
                <td>log file switch, enq: HW</td>
                <td>시스템 설정 문제</td>
              </tr>
            </tbody>
          </table>

          <h3>2.2 주요 Wait Event 대응 전략</h3>

          <h4>db file sequential read (인덱스 단일 블록 읽기)</h4>
          <div className="code-block">
            <div className="code-header">진단 및 대응</div>
            <pre><code>{`-- 이 Wait가 많으면: 인덱스를 통한 I/O가 과다
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
-- 3. Buffer Cache 크기 증가`}</code></pre>
          </div>

          <h4>enq: TX - row lock contention (행 잠금 경합)</h4>
          <div className="code-block">
            <div className="code-header">Lock 경합 해결</div>
            <pre><code>{`-- 원인: 여러 세션이 같은 행을 동시에 UPDATE/DELETE

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
FETCH FIRST 10 ROWS ONLY;`}</code></pre>
          </div>

          {/* ───── 3. 종합 튜닝 전략 ───── */}
          <h2>3. 종합 튜닝 전략 정리</h2>

          <h3>3.1 유형별 대응 전략</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>문제 유형</th><th>진단 방법</th><th>해결 전략</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>조건절 함수</strong></td>
                <td>실행계획에 Filter만 있고 Access 없음</td>
                <td>함수 제거, 범위 조건 변환</td>
              </tr>
              <tr>
                <td><strong>OR 조건</strong></td>
                <td>실행계획에 CONCATENATION 또는 Full Scan</td>
                <td>UNION ALL로 분해</td>
              </tr>
              <tr>
                <td><strong>NOT IN</strong></td>
                <td>ANTI JOIN 미발생, Full Scan</td>
                <td>NOT EXISTS로 변환</td>
              </tr>
              <tr>
                <td><strong>스칼라 서브쿼리</strong></td>
                <td>BUFFER_GETS ↑↑ (행마다 반복)</td>
                <td>JOIN으로 변환</td>
              </tr>
              <tr>
                <td><strong>인덱스 미사용</strong></td>
                <td>실행계획에 TABLE ACCESS FULL</td>
                <td>조건 구조 개선 또는 인덱스 생성</td>
              </tr>
              <tr>
                <td><strong>잘못된 조인 방법</strong></td>
                <td>소량인데 Hash Join, 대량인데 NL Join</td>
                <td>USE_NL / USE_HASH 힌트</td>
              </tr>
              <tr>
                <td><strong>통계 오류</strong></td>
                <td>Rows 예측 ≠ 실제 (큰 차이)</td>
                <td>DBMS_STATS 통계 수집, 히스토그램</td>
              </tr>
              <tr>
                <td><strong>Hard Parse 과다</strong></td>
                <td>PARSE_CALLS ↑, EXECUTIONS 대비</td>
                <td>바인드 변수, CURSOR_SHARING</td>
              </tr>
              <tr>
                <td><strong>Lock 대기</strong></td>
                <td>V$SESSION Wait Event</td>
                <td>COMMIT 조절, 트랜잭션 분할</td>
              </tr>
            </tbody>
          </table>

          <h3>3.2 튜닝 프로세스</h3>
          <div className="callout-box tip">
            <h3>SQL 튜닝 5단계 프로세스</h3>
            <ol>
              <li><strong>문제 SQL 식별</strong> — AWR Top SQL, V$SQL 분석</li>
              <li><strong>실행계획 분석</strong> — DBMS_XPLAN, Access/Filter 구분</li>
              <li><strong>병목 원인 파악</strong> — 조건절, 인덱스, 통계, Lock</li>
              <li><strong>개선 전략 적용</strong> — 조건 개선 + 인덱스 + 힌트 + 통계 조합</li>
              <li><strong>효과 검증</strong> — Before/After 수치 비교, AWR 비교</li>
            </ol>
          </div>

          {/* ───── 4. 핵심 5가지 힌트 ───── */}
          <h2>4. 핵심 5가지 힌트 정리</h2>
          <table className="lesson-table">
            <thead>
              <tr><th>힌트</th><th>용도</th><th>사용 예시</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>INDEX</strong></td>
                <td>인덱스 사용 유도</td>
                <td><code>/*+ INDEX(EMP IDX_SAL) */</code></td>
              </tr>
              <tr>
                <td><strong>FULL</strong></td>
                <td>Full Scan 유도</td>
                <td><code>/*+ FULL(EMP) */</code></td>
              </tr>
              <tr>
                <td><strong>LEADING</strong></td>
                <td>조인 순서 지정</td>
                <td><code>/*+ LEADING(A B C) */</code></td>
              </tr>
              <tr>
                <td><strong>USE_NL</strong></td>
                <td>Nested Loop Join 유도</td>
                <td><code>/*+ USE_NL(B) */</code></td>
              </tr>
              <tr>
                <td><strong>USE_HASH</strong></td>
                <td>Hash Join 유도</td>
                <td><code>/*+ USE_HASH(B) */</code></td>
              </tr>
            </tbody>
          </table>

          {/* ───── 5. 실전 종합 연습 ───── */}
          <h2>5. 실전 종합 연습 문제</h2>

          <h3>문제 1: 조건절 + 서브쿼리 튜닝</h3>
          <div className="code-block">
            <div className="code-header">튜닝 대상 SQL</div>
            <pre><code>{`-- [문제] 다음 SQL의 병목 원인을 찾고 개선하시오.
SELECT E.EMPNO, E.ENAME, E.SAL,
  (SELECT D.DNAME FROM DEPT D WHERE D.DEPTNO = E.DEPTNO) AS DNAME
FROM EMP E
WHERE SUBSTR(E.ENAME, 1, 1) = 'S'
AND   E.DEPTNO NOT IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'BOSTON');`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">개선 SQL</div>
            <pre><code>{`-- [해답]
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
);`}</code></pre>
          </div>

          <h3>문제 2: 조인 + 힌트 튜닝</h3>
          <div className="code-block">
            <div className="code-header">대용량 조인 튜닝</div>
            <pre><code>{`-- [문제] SALES(1천만 건)와 PRODUCTS(1000건) 조인 최적화
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
-- 파티션 Pruning과 함께 사용하면 더 효율적`}</code></pre>
          </div>

          {/* ───── 6. 핵심 요약 ───── */}
          <h2>6. Oracle SQL 튜닝 전체 요약</h2>

          <div className="callout-box">
            <h3>SQL 튜닝의 본질</h3>
            <p>
              <em>"SQL 튜닝은 단일 SQL을 빠르게 만드는 것이 아니라,
              SQL이 왜 느린지를 읽고, 설계하고, 그 결과를 증명하는 전 과정이다."</em>
            </p>
          </div>

          <table className="lesson-table">
            <thead>
              <tr><th>영역</th><th>핵심 키워드</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>SQL 처리 구조</strong></td><td>Parse → Bind → Execute → Fetch, Hard/Soft Parse, SGA/PGA</td></tr>
              <tr><td><strong>실행계획</strong></td><td>DBMS_XPLAN, Access/Filter Predicate, COST/ROWS/BYTES</td></tr>
              <tr><td><strong>조건절 튜닝</strong></td><td>함수 제거, OR → UNION ALL, NOT IN → NOT EXISTS</td></tr>
              <tr><td><strong>인덱스 전략</strong></td><td>선두 컬럼, Function-Based Index, BLEVEL, Clustering Factor</td></tr>
              <tr><td><strong>조인 튜닝</strong></td><td>NL(소량+인덱스), Hash(대량), Merge(정렬), LEADING/USE_NL/USE_HASH</td></tr>
              <tr><td><strong>커서 공유</strong></td><td>바인드 변수, CURSOR_SHARING, V$SQL_SHARED_CURSOR</td></tr>
              <tr><td><strong>통계/히스토그램</strong></td><td>DBMS_STATS, FREQUENCY/HEIGHT BALANCED, Selectivity</td></tr>
              <tr><td><strong>병렬처리</strong></td><td>PARALLEL 힌트, DOP, QC + PX, V$PX_SESSION</td></tr>
              <tr><td><strong>Wait Event</strong></td><td>V$SESSION, V$LOCK, enq:TX, buffer busy waits</td></tr>
              <tr><td><strong>성능 진단</strong></td><td>AWR, V$SQL, DBA_HIST_SQLSTAT, Before/After 비교</td></tr>
            </tbody>
          </table>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/oracle/awr-analysis" className="nav-link">← AWR 분석과 성능 진단</Link>
            <Link to="/oracle" className="nav-link">Oracle 튜닝 목차 →</Link>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default OracleParallelWait;
