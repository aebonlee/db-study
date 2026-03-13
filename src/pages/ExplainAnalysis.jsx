import { Link } from 'react-router-dom';

const ExplainAnalysis = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>실행 계획 분석</h1>
        <p>EXPLAIN, 쿼리 프로파일링, 실행 계획 읽는 법</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>EXPLAIN 명령어로 쿼리 실행 계획을 분석한다.</li>
              <li>실행 계획의 각 컬럼(type, key, rows, Extra)을 이해한다.</li>
              <li>풀 테이블 스캔과 인덱스 스캔의 차이를 파악한다.</li>
              <li>EXPLAIN ANALYZE로 실제 실행 시간을 측정한다.</li>
            </ul>
          </div>

          <h2>1. EXPLAIN이란?</h2>
          <p>
            <strong>EXPLAIN</strong>은 MySQL이 쿼리를 어떻게 실행할지 <strong>실행 계획(Execution Plan)</strong>을
            보여주는 명령어입니다. 쿼리를 실제로 실행하지 않고도 성능 문제를 파악할 수 있습니다.
          </p>

          <div className="code-block">
            <div className="code-header">EXPLAIN 기본 사용법</div>
            <pre><code>{`-- 기본 EXPLAIN
EXPLAIN SELECT * FROM students WHERE major = '컴퓨터공학';

-- EXPLAIN ANALYZE (MySQL 8.0.18+) — 실제 실행 시간 포함
EXPLAIN ANALYZE SELECT * FROM students WHERE major = '컴퓨터공학';

-- EXPLAIN FORMAT=JSON — 상세 정보 (JSON 형식)
EXPLAIN FORMAT=JSON SELECT * FROM students WHERE major = '컴퓨터공학';

-- EXPLAIN FORMAT=TREE — 트리 형태 출력
EXPLAIN FORMAT=TREE SELECT * FROM students WHERE major = '컴퓨터공학';`}</code></pre>
          </div>

          <h2>2. EXPLAIN 출력 컬럼</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>컬럼</th><th>의미</th><th>확인 포인트</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>id</strong></td><td>쿼리 내 SELECT 번호</td><td>서브쿼리/UNION 시 여러 행</td></tr>
              <tr><td><strong>select_type</strong></td><td>SELECT 유형</td><td>SIMPLE, SUBQUERY, DERIVED 등</td></tr>
              <tr><td><strong>table</strong></td><td>접근하는 테이블</td><td>별칭 또는 서브쿼리명</td></tr>
              <tr><td><strong>type</strong></td><td>접근 방식 (가장 중요!)</td><td>ALL이면 풀스캔 → 개선 필요</td></tr>
              <tr><td><strong>possible_keys</strong></td><td>사용 가능한 인덱스 목록</td><td>NULL이면 인덱스 없음</td></tr>
              <tr><td><strong>key</strong></td><td>실제 사용한 인덱스</td><td>NULL이면 인덱스 미사용</td></tr>
              <tr><td><strong>key_len</strong></td><td>사용한 인덱스 길이(바이트)</td><td>복합 인덱스에서 몇 컬럼 사용했는지 판단</td></tr>
              <tr><td><strong>ref</strong></td><td>인덱스와 비교되는 값</td><td>const, 컬럼명, func 등</td></tr>
              <tr><td><strong>rows</strong></td><td>검사할 예상 행 수</td><td>클수록 느림</td></tr>
              <tr><td><strong>filtered</strong></td><td>조건에 의해 필터링되는 비율(%)</td><td>낮을수록 비효율</td></tr>
              <tr><td><strong>Extra</strong></td><td>추가 정보</td><td>Using filesort, Using temporary 주의</td></tr>
            </tbody>
          </table>

          <h2>3. type 컬럼 — 접근 방식 (성능 순서)</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>type</th><th>설명</th><th>성능</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>system</strong></td><td>테이블에 1행만 존재</td><td>최고</td><td>시스템 테이블</td></tr>
              <tr><td><strong>const</strong></td><td>PK/Unique로 1행 조회</td><td>매우 빠름</td><td>WHERE id = 1</td></tr>
              <tr><td><strong>eq_ref</strong></td><td>JOIN에서 PK/Unique 매칭</td><td>매우 빠름</td><td>JOIN ON a.id = b.id</td></tr>
              <tr><td><strong>ref</strong></td><td>인덱스로 여러 행 조회</td><td>빠름</td><td>WHERE major = '컴공'</td></tr>
              <tr><td><strong>range</strong></td><td>인덱스 범위 스캔</td><td>보통</td><td>WHERE age BETWEEN 20 AND 25</td></tr>
              <tr><td><strong>index</strong></td><td>인덱스 풀 스캔</td><td>느림</td><td>인덱스 전체 순회</td></tr>
              <tr><td><strong>ALL</strong></td><td>테이블 풀 스캔</td><td>최악 ⚠️</td><td>인덱스 없는 조건 검색</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">type별 EXPLAIN 예시</div>
            <pre><code>{`-- ✅ const — PK로 1건 조회 (가장 빠름)
EXPLAIN SELECT * FROM students WHERE id = 1;
-- type: const, rows: 1

-- ✅ ref — 인덱스가 있는 컬럼 조회
EXPLAIN SELECT * FROM students WHERE major = '컴퓨터공학';
-- type: ref, key: idx_major, rows: 15

-- ⚠️ ALL — 풀 테이블 스캔 (인덱스 없음!)
EXPLAIN SELECT * FROM students WHERE name LIKE '%길동%';
-- type: ALL, rows: 1000 → 개선 필요!`}</code></pre>
          </div>

          <h2>4. Extra 컬럼 — 주의 사항</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>Extra 값</th><th>의미</th><th>조치</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Using index</strong></td><td>커버링 인덱스 사용 (좋음 ✅)</td><td>유지</td></tr>
              <tr><td><strong>Using where</strong></td><td>WHERE 조건으로 필터링</td><td>정상</td></tr>
              <tr><td><strong>Using index condition</strong></td><td>인덱스 조건 푸시다운 (ICP)</td><td>좋음</td></tr>
              <tr><td><strong>Using temporary</strong></td><td>임시 테이블 생성 ⚠️</td><td>쿼리/인덱스 재검토</td></tr>
              <tr><td><strong>Using filesort</strong></td><td>추가 정렬 작업 ⚠️</td><td>ORDER BY에 인덱스 활용</td></tr>
              <tr><td><strong>Using join buffer</strong></td><td>조인 버퍼 사용 ⚠️</td><td>조인 컬럼에 인덱스 추가</td></tr>
              <tr><td><strong>Full scan on NULL key</strong></td><td>서브쿼리에서 풀스캔</td><td>서브쿼리 최적화</td></tr>
            </tbody>
          </table>

          <h2>5. EXPLAIN ANALYZE</h2>

          <div className="code-block">
            <div className="code-header">EXPLAIN ANALYZE — 실제 실행 시간 측정</div>
            <pre><code>{`-- EXPLAIN ANALYZE는 실제로 쿼리를 실행하고 시간을 측정
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

-- 핵심: actual time과 rows를 확인하여 병목 구간 파악`}</code></pre>
          </div>

          <h2>6. 쿼리 프로파일링</h2>

          <div className="code-block">
            <div className="code-header">SHOW PROFILE — 쿼리 단계별 시간 측정</div>
            <pre><code>{`-- 프로파일링 활성화
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
-- +----------------------+----------+`}</code></pre>
          </div>

          <h2>7. 슬로우 쿼리 로그</h2>

          <div className="code-block">
            <div className="code-header">슬로우 쿼리 설정 및 분석</div>
            <pre><code>{`-- 슬로우 쿼리 로그 활성화
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
-- mysqldumpslow -s c -t 10 /var/log/mysql/slow.log`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>EXPLAIN</strong>은 쿼리 튜닝의 첫 번째 도구 — 반드시 실행 계획을 확인하라.</li>
              <li><strong>type 컬럼</strong>에서 ALL(풀스캔)이 보이면 인덱스 추가를 검토하라.</li>
              <li><strong>Extra</strong>에 Using filesort, Using temporary가 있으면 쿼리를 재검토하라.</li>
              <li><strong>EXPLAIN ANALYZE</strong>로 예상이 아닌 실제 실행 시간을 측정하라.</li>
              <li><strong>슬로우 쿼리 로그</strong>를 활성화하여 느린 쿼리를 지속적으로 모니터링하라.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> EXPLAIN의 type 컬럼에서 ALL, ref, const의 차이를 설명하세요.</p>
            <p><strong>문제 2.</strong> Extra에 "Using filesort"가 나타났을 때 해결 방법을 설명하세요.</p>
            <p><strong>문제 3.</strong> EXPLAIN과 EXPLAIN ANALYZE의 차이를 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/tuning" className="lesson-nav-btn prev">&larr; DB 튜닝 목차</Link>
            <Link to="/tuning/index" className="lesson-nav-btn next">인덱스 튜닝 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default ExplainAnalysis;
