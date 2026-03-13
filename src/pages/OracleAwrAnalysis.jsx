import { Link } from 'react-router-dom';

const OracleAwrAnalysis = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>AWR 분석과 성능 진단</h1>
        <p>AWR 리포트, V$SQL, 통계 수집, 히스토그램, 인덱스 유지보수</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>AWR 리포트를 생성하고 Top SQL을 분석한다.</li>
              <li>옵티마이저 통계와 히스토그램의 역할을 이해한다.</li>
              <li>V$SQL, DBA_HIST_SQLSTAT으로 SQL 성능을 진단한다.</li>
              <li>Lock과 Wait Event의 기본 개념을 파악한다.</li>
              <li>인덱스 유지보수 기준(REBUILD, DROP)을 학습한다.</li>
            </ul>
          </div>

          {/* ───── 1. AWR 리포트 ───── */}
          <h2>1. AWR (Automatic Workload Repository)</h2>
          <p>
            AWR은 Oracle이 <strong>자동으로 성능 데이터를 수집</strong>하여 저장하는 시스템입니다.
            일정 간격(기본 1시간)으로 스냅샷을 생성하며, 두 스냅샷 간의 비교를 통해
            성능 변화를 분석합니다.
          </p>

          <div className="code-block">
            <div className="code-header">AWR 리포트 생성</div>
            <pre><code>{`-- AWR 스냅샷 수동 생성
EXEC DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT;

-- AWR 리포트 생성 (HTML)
@$ORACLE_HOME/rdbms/admin/awrrpt.sql
-- 또는 PL/SQL로:
SELECT * FROM TABLE(
  DBMS_WORKLOAD_REPOSITORY.AWR_REPORT_HTML(
    L_DBID     => (SELECT DBID FROM V$DATABASE),
    L_INST_NUM => 1,
    L_BID      => 100,  -- 시작 스냅샷 ID
    L_EID      => 101   -- 종료 스냅샷 ID
  )
);

-- 스냅샷 목록 확인
SELECT SNAP_ID, BEGIN_INTERVAL_TIME, END_INTERVAL_TIME
FROM DBA_HIST_SNAPSHOT
ORDER BY SNAP_ID DESC
FETCH FIRST 20 ROWS ONLY;`}</code></pre>
          </div>

          <h3>1.1 AWR 리포트 핵심 섹션</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>섹션</th><th>내용</th><th>확인 포인트</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>SQL ordered by Elapsed Time</strong></td>
                <td>실행 시간이 긴 SQL 순위</td>
                <td>전체 시간의 몇 %인지 확인</td>
              </tr>
              <tr>
                <td><strong>SQL ordered by Buffer Gets</strong></td>
                <td>메모리 블록 접근이 많은 SQL</td>
                <td>높은 Gets → 인덱스/조건 개선</td>
              </tr>
              <tr>
                <td><strong>SQL ordered by Disk Reads</strong></td>
                <td>디스크 I/O가 많은 SQL</td>
                <td>Full Scan 또는 캐시 부족</td>
              </tr>
              <tr>
                <td><strong>SQL ordered by Executions</strong></td>
                <td>실행 횟수가 많은 SQL</td>
                <td>반복 호출 → 캐싱/배치 고려</td>
              </tr>
              <tr>
                <td><strong>Top 5 Timed Events</strong></td>
                <td>가장 시간을 많이 소비한 이벤트</td>
                <td>Wait Event 진단 핵심</td>
              </tr>
              <tr>
                <td><strong>Instance Efficiency</strong></td>
                <td>Buffer Cache Hit Ratio 등</td>
                <td>95% 이상이 목표</td>
              </tr>
            </tbody>
          </table>

          <h3>1.2 DBA_HIST_SQLSTAT 활용</h3>
          <div className="code-block">
            <div className="code-header">AWR 기반 SQL 성능 추적</div>
            <pre><code>{`-- 특정 기간의 Top SQL 분석
SELECT SQL_ID,
       SUM(ELAPSED_TIME_DELTA)/1000000 AS TOTAL_ELAPSED_SEC,
       SUM(BUFFER_GETS_DELTA) AS TOTAL_BUFFER_GETS,
       SUM(DISK_READS_DELTA) AS TOTAL_DISK_READS,
       SUM(EXECUTIONS_DELTA) AS TOTAL_EXECUTIONS
FROM DBA_HIST_SQLSTAT
WHERE SNAP_ID BETWEEN 100 AND 110
GROUP BY SQL_ID
ORDER BY TOTAL_ELAPSED_SEC DESC
FETCH FIRST 10 ROWS ONLY;

-- SQL_ID로 SQL 텍스트 확인
SELECT SQL_TEXT
FROM DBA_HIST_SQLTEXT
WHERE SQL_ID = 'abc123def';

-- Before/After 성능 비교 (튜닝 전후 스냅샷)
SELECT SNAP_ID, ELAPSED_TIME_DELTA/1000000 AS ELAPSED_SEC,
       BUFFER_GETS_DELTA, DISK_READS_DELTA
FROM DBA_HIST_SQLSTAT
WHERE SQL_ID = 'abc123def'
ORDER BY SNAP_ID;`}</code></pre>
          </div>

          {/* ───── 2. 통계와 히스토그램 ───── */}
          <h2>2. 옵티마이저 통계와 히스토그램</h2>
          <p>
            Oracle 옵티마이저는 <strong>통계 정보를 기반으로 실행계획을 결정</strong>합니다.
            통계가 부정확하면 잘못된 실행계획이 선택됩니다.
          </p>

          <h3>2.1 통계 수집</h3>
          <div className="code-block">
            <div className="code-header">DBMS_STATS 사용법</div>
            <pre><code>{`-- 테이블 통계 수집 (기본)
EXEC DBMS_STATS.GATHER_TABLE_STATS(
  OWNNAME          => 'SCOTT',
  TABNAME          => 'EMP',
  ESTIMATE_PERCENT => DBMS_STATS.AUTO_SAMPLE_SIZE,
  CASCADE          => TRUE  -- 인덱스 통계도 함께 수집
);

-- 스키마 전체 통계 수집
EXEC DBMS_STATS.GATHER_SCHEMA_STATS(
  OWNNAME => 'SCOTT'
);

-- 현재 통계 확인
SELECT TABLE_NAME, NUM_ROWS, BLOCKS, AVG_ROW_LEN,
       LAST_ANALYZED
FROM USER_TABLES
WHERE TABLE_NAME = 'EMP';

-- 컬럼 통계 확인
SELECT COLUMN_NAME, NUM_DISTINCT, LOW_VALUE, HIGH_VALUE,
       NUM_NULLS, HISTOGRAM
FROM USER_TAB_COL_STATISTICS
WHERE TABLE_NAME = 'EMP';`}</code></pre>
          </div>

          <h3>2.2 히스토그램</h3>
          <p>
            히스토그램은 컬럼 값의 <strong>분포를 반영</strong>하여 옵티마이저가 더 정확한
            Selectivity를 계산하도록 합니다. <strong>값 분포가 심하게 편향</strong>된 경우 필요합니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>히스토그램 종류</th><th>설명</th><th>적용 상황</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>FREQUENCY</strong></td>
                <td>각 값의 빈도를 정확히 기록</td>
                <td>NDV가 적은 컬럼 (STATUS 등)</td>
              </tr>
              <tr>
                <td><strong>HEIGHT BALANCED</strong></td>
                <td>값 범위를 균등 구간으로 나눔</td>
                <td>NDV가 많지만 편향된 경우</td>
              </tr>
              <tr>
                <td><strong>TOP-FREQUENCY</strong></td>
                <td>상위 빈출 값만 기록 (12c+)</td>
                <td>소수 값이 대부분 차지</td>
              </tr>
              <tr>
                <td><strong>HYBRID</strong></td>
                <td>FREQUENCY + HEIGHT BALANCED 혼합 (12c+)</td>
                <td>자동 선택됨</td>
              </tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">히스토그램 생성 예시</div>
            <pre><code>{`-- 히스토그램이 필요한 상황:
-- STATUS 컬럼: 'Y' 90%, 'N' 10% (심한 편향)
-- 히스토그램 없으면 옵티마이저가 50:50으로 가정

-- 히스토그램 포함 통계 수집
EXEC DBMS_STATS.GATHER_TABLE_STATS(
  OWNNAME    => 'SCOTT',
  TABNAME    => 'ORDERS',
  METHOD_OPT => 'FOR COLUMNS SIZE 10 STATUS'
);
-- SIZE 10 = 최대 10개 버킷

-- 히스토그램 확인
SELECT COLUMN_NAME, HISTOGRAM, NUM_BUCKETS
FROM USER_TAB_COL_STATISTICS
WHERE TABLE_NAME = 'ORDERS' AND COLUMN_NAME = 'STATUS';

-- 히스토그램 적용 효과:
-- WHERE STATUS = 'Y' → 옵티마이저가 90% 행 예측 → Full Scan
-- WHERE STATUS = 'N' → 옵티마이저가 10% 행 예측 → Index Scan`}</code></pre>
          </div>

          <div className="callout-box tip">
            <h3>Selectivity와 Cardinality</h3>
            <ul>
              <li><strong>Selectivity</strong> = 조건에 해당하는 행 비율 (0~1)</li>
              <li><strong>Cardinality</strong> = 전체 행 수 × Selectivity = 예상 반환 행 수</li>
              <li>히스토그램이 없으면 Selectivity = 1/NDV (균등 분포 가정)</li>
              <li>히스토그램이 있으면 실제 분포 반영 → 정확한 실행계획</li>
            </ul>
          </div>

          {/* ───── 3. Lock과 Wait Event 기초 ───── */}
          <h2>3. Lock과 Wait Event 기초</h2>
          <p>
            성능 저하가 <strong>SQL 자체가 아닌 Lock 대기</strong> 때문인 경우가 많습니다.
            Wait Event 진단은 Oracle 튜닝의 핵심입니다.
          </p>

          <h3>3.1 주요 Wait Event</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>Wait Event</th><th>의미</th><th>대응 방안</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>enq: TX - row lock contention</strong></td>
                <td>다른 세션이 같은 행을 수정 중</td>
                <td>COMMIT 빈도 조절, 트랜잭션 단위 축소</td>
              </tr>
              <tr>
                <td><strong>buffer busy waits</strong></td>
                <td>같은 블록에 동시 접근</td>
                <td>Hot Block 분산 (해시 파티셔닝)</td>
              </tr>
              <tr>
                <td><strong>db file sequential read</strong></td>
                <td>인덱스를 통한 단일 블록 읽기</td>
                <td>인덱스 튜닝, Clustering Factor 개선</td>
              </tr>
              <tr>
                <td><strong>db file scattered read</strong></td>
                <td>Full Scan으로 다중 블록 읽기</td>
                <td>인덱스 생성, 파티션 Pruning</td>
              </tr>
              <tr>
                <td><strong>log file sync</strong></td>
                <td>COMMIT 시 Redo Log 기록 대기</td>
                <td>COMMIT 빈도 조절, 로그 디스크 성능</td>
              </tr>
              <tr>
                <td><strong>latch: shared pool</strong></td>
                <td>Shared Pool 경합</td>
                <td>바인드 변수 사용, Shared Pool 크기 조절</td>
              </tr>
            </tbody>
          </table>

          <h3>3.2 Wait Event 진단 쿼리</h3>
          <div className="code-block">
            <div className="code-header">Blocking Session 추적</div>
            <pre><code>{`-- 현재 대기 중인 세션 확인
SELECT SID, SERIAL#, USERNAME, EVENT, WAIT_CLASS,
       BLOCKING_SESSION, STATE, SECONDS_IN_WAIT
FROM V$SESSION
WHERE WAIT_CLASS != 'Idle'
ORDER BY SECONDS_IN_WAIT DESC;

-- Lock 정보 확인
SELECT L.SID, L.TYPE, L.LMODE, L.REQUEST, L.BLOCK,
       S.USERNAME, S.PROGRAM
FROM V$LOCK L
JOIN V$SESSION S ON L.SID = S.SID
WHERE L.BLOCK = 1;  -- 다른 세션을 차단 중인 Lock

-- Blocking 관계 트리
SELECT LEVEL, SID, BLOCKING_SESSION, EVENT,
       LPAD(' ', (LEVEL-1)*2) || SID AS TREE
FROM V$SESSION
WHERE BLOCKING_SESSION IS NOT NULL
   OR SID IN (SELECT BLOCKING_SESSION FROM V$SESSION)
CONNECT BY PRIOR SID = BLOCKING_SESSION
START WITH BLOCKING_SESSION IS NULL;`}</code></pre>
          </div>

          <h3>3.3 트랜잭션 튜닝 전략</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>전략</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>COMMIT 타이밍 조절</strong></td>
                <td>불필요하게 COMMIT을 지연하지 않음</td>
                <td>대량 UPDATE 시 N건마다 COMMIT</td>
              </tr>
              <tr>
                <td><strong>트랜잭션 단위 축소</strong></td>
                <td>하나의 트랜잭션 범위를 줄임</td>
                <td>10만 건 → 1만 건씩 분할</td>
              </tr>
              <tr>
                <td><strong>NOWAIT 활용</strong></td>
                <td>Lock 대기 없이 즉시 에러 반환</td>
                <td><code>SELECT ... FOR UPDATE NOWAIT</code></td>
              </tr>
              <tr>
                <td><strong>SKIP LOCKED</strong></td>
                <td>Lock된 행을 건너뛰고 처리</td>
                <td><code>SELECT ... FOR UPDATE SKIP LOCKED</code></td>
              </tr>
            </tbody>
          </table>

          {/* ───── 4. 인덱스 유지보수 ───── */}
          <h2>4. 인덱스 유지보수 전략</h2>

          <div className="code-block">
            <div className="code-header">인덱스 진단 및 유지보수</div>
            <pre><code>{`-- 인덱스 상태 종합 점검
SELECT I.INDEX_NAME, I.BLEVEL, I.LEAF_BLOCKS,
       I.CLUSTERING_FACTOR, I.NUM_ROWS, I.DISTINCT_KEYS,
       I.LAST_ANALYZED,
       ROUND(I.CLUSTERING_FACTOR / NULLIF(I.NUM_ROWS, 0), 2) AS CF_RATIO
FROM USER_INDEXES I
WHERE I.TABLE_NAME = 'EMP'
ORDER BY I.BLEVEL DESC;

-- CF_RATIO 해석:
-- 0에 가까움: 인덱스 순서 ≈ 테이블 물리 순서 (효율적)
-- 1에 가까움: 순서 불일치 (비효율적)

-- 인덱스 사용 여부 모니터링
ALTER INDEX IDX_EMP_JOB MONITORING USAGE;
-- 일정 기간 후 확인:
SELECT INDEX_NAME, MONITORING, USED, START_MONITORING
FROM V$OBJECT_USAGE;
-- USED = 'NO' → DROP 후보

-- 인덱스 리빌드 (단편화 해소)
ALTER INDEX IDX_EMP_JOB REBUILD ONLINE;

-- 통계 갱신
EXEC DBMS_STATS.GATHER_INDEX_STATS(
  OWNNAME => 'SCOTT',
  INDNAME => 'IDX_EMP_JOB'
);`}</code></pre>
          </div>

          {/* ───── 5. 튜닝 리포트 작성법 ───── */}
          <h2>5. SQL 튜닝 리포트 작성법</h2>
          <p>
            SQL 튜닝 결과는 <strong>리포트로 정량화</strong>해야 설득력이 있습니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>내용</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>1. 대상 SQL</strong></td><td>SQL 기능 설명, 실행 빈도, 영향 범위</td></tr>
              <tr><td><strong>2. 병목 원인 분석</strong></td><td>실행계획 + COST, BUFFER_GETS, DISK_READS</td></tr>
              <tr><td><strong>3. 개선 전략</strong></td><td>조건절 개선, 인덱스 추가, 힌트 적용, 통계 수집</td></tr>
              <tr><td><strong>4. Before/After 비교</strong></td><td>수치 비교표 (COST, GETS 등) — 반드시 포함</td></tr>
              <tr><td><strong>5. 결론</strong></td><td>적용 가능성, 주의사항, 향후 과제</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">Before/After 비교표 예시</div>
            <pre><code>{`┌─────────────────┬──────────┬──────────┬───────────┐
│     지표         │  Before  │  After   │  개선율    │
├─────────────────┼──────────┼──────────┼───────────┤
│ COST            │    245   │     12   │  95.1% ↓  │
│ BUFFER_GETS     │  4,560   │     85   │  98.1% ↓  │
│ DISK_READS      │    320   │      2   │  99.4% ↓  │
│ ELAPSED_TIME(s) │   3.42   │   0.08   │  97.7% ↓  │
│ ROWS_PROCESSED  │     14   │     14   │  동일     │
│ 실행계획        │ FULL SCAN │ INDEX    │  개선     │
└─────────────────┴──────────┴──────────┴───────────┘

주요 개선 사항:
1. TO_CHAR(HIREDATE) → BETWEEN 범위 조건 (함수 제거)
2. 스칼라 서브쿼리 → JOIN 변환
3. IDX_EMP_HIREDATE 인덱스 생성`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li>AWR은 <strong>스냅샷 간 성능 비교</strong>로 튜닝 전후 효과를 검증한다.</li>
              <li><strong>히스토그램</strong>은 값 분포가 편향된 컬럼에 적용하여 정확한 실행계획을 유도한다.</li>
              <li>성능 저하가 <strong>Lock 대기</strong> 때문인지 V$SESSION, V$LOCK으로 진단한다.</li>
              <li>인덱스는 BLEVEL, CLUSTERING_FACTOR, 사용 이력으로 <strong>REBUILD/DROP</strong>을 판단한다.</li>
              <li>튜닝 리포트는 <strong>Before/After 수치 비교</strong>가 핵심이다.</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/oracle/index-strategy" className="nav-link">← 인덱스 전략과 조인 튜닝</Link>
            <Link to="/oracle/parallel-wait" className="nav-link">병렬처리와 Wait Event →</Link>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default OracleAwrAnalysis;
