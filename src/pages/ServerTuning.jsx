import { Link } from 'react-router-dom';

const ServerTuning = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>DB 서버 튜닝</h1>
        <p>InnoDB 버퍼 풀, 커넥션, 캐시, 파라미터 최적화</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>MySQL/InnoDB의 핵심 파라미터를 이해하고 최적화한다.</li>
              <li>버퍼 풀, 로그, 캐시 설정을 시스템에 맞게 조정한다.</li>
              <li>커넥션 관리와 쓰레드 풀을 최적화한다.</li>
              <li>하드웨어 리소스(CPU, 메모리, 디스크)와 DB 설정의 관계를 파악한다.</li>
            </ul>
          </div>

          <h2>1. MySQL 서버 아키텍처</h2>

          <div className="code-block">
            <div className="code-header">MySQL 메모리 구조</div>
            <pre><code>{`[클라이언트 연결]
       ↓
[커넥션 핸들러] ─── 쓰레드 풀
       ↓
[SQL 파서 → 옵티마이저 → 실행 엔진]
       ↓
┌─────────────────────────────────────────┐
│           글로벌 메모리 영역               │
│  ┌─────────────────────────────────┐    │
│  │  InnoDB Buffer Pool             │    │ ← 가장 중요!
│  │  (데이터 + 인덱스 캐시)           │    │
│  └─────────────────────────────────┘    │
│  ┌──────────┐  ┌──────────────────┐    │
│  │ Query    │  │  Redo Log Buffer │    │
│  │ Cache    │  │  (로그 버퍼)      │    │
│  └──────────┘  └──────────────────┘    │
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│           세션별 메모리 영역               │
│  sort_buffer, join_buffer,              │
│  read_buffer, tmp_table_size            │
│  (커넥션 × 세션 버퍼 = 총 메모리)         │
└─────────────────────────────────────────┘`}</code></pre>
          </div>

          <h2>2. InnoDB Buffer Pool</h2>

          <p>
            <strong>InnoDB Buffer Pool</strong>은 MySQL 성능의 핵심입니다.
            테이블 데이터와 인덱스를 메모리에 캐싱하여 디스크 I/O를 줄입니다.
          </p>

          <div className="code-block">
            <div className="code-header">Buffer Pool 설정</div>
            <pre><code>{`-- 현재 Buffer Pool 크기 확인
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';

-- 💡 권장: 전체 메모리의 70~80%
-- 예: 서버 메모리 16GB → Buffer Pool 12GB
SET GLOBAL innodb_buffer_pool_size = 12 * 1024 * 1024 * 1024;  -- 12GB

-- my.cnf (영구 설정)
-- [mysqld]
-- innodb_buffer_pool_size = 12G
-- innodb_buffer_pool_instances = 8    # Pool을 여러 개로 분할 (경합 감소)

-- Buffer Pool 적중률 확인 (99% 이상이 이상적)
SHOW STATUS LIKE 'Innodb_buffer_pool_read%';
-- Innodb_buffer_pool_read_requests = 1000000  (메모리에서 읽은 횟수)
-- Innodb_buffer_pool_reads = 500              (디스크에서 읽은 횟수)
-- 적중률 = (1 - reads/read_requests) × 100 = 99.95%

SELECT
  ROUND((1 - (
    (SELECT VARIABLE_VALUE FROM performance_schema.global_status
     WHERE VARIABLE_NAME = 'Innodb_buffer_pool_reads') /
    (SELECT VARIABLE_VALUE FROM performance_schema.global_status
     WHERE VARIABLE_NAME = 'Innodb_buffer_pool_read_requests')
  )) * 100, 2) AS buffer_pool_hit_rate;`}</code></pre>
          </div>

          <h2>3. 핵심 InnoDB 파라미터</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>파라미터</th><th>기본값</th><th>권장</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>innodb_buffer_pool_size</strong></td><td>128MB</td><td>메모리의 70~80%</td><td>데이터/인덱스 캐시 크기</td></tr>
              <tr><td><strong>innodb_log_file_size</strong></td><td>48MB</td><td>1~2GB</td><td>Redo 로그 파일 크기</td></tr>
              <tr><td><strong>innodb_log_buffer_size</strong></td><td>16MB</td><td>64~256MB</td><td>로그 버퍼 크기</td></tr>
              <tr><td><strong>innodb_flush_log_at_trx_commit</strong></td><td>1</td><td>1(안전) / 2(성능)</td><td>트랜잭션 커밋 시 로그 플러시</td></tr>
              <tr><td><strong>innodb_io_capacity</strong></td><td>200</td><td>SSD: 2000~5000</td><td>초당 I/O 작업 수</td></tr>
              <tr><td><strong>innodb_flush_method</strong></td><td>fsync</td><td>O_DIRECT (Linux)</td><td>디스크 플러시 방식</td></tr>
              <tr><td><strong>innodb_file_per_table</strong></td><td>ON</td><td>ON</td><td>테이블별 파일 분리</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">innodb_flush_log_at_trx_commit 비교</div>
            <pre><code>{`-- 값 = 1 (기본, 가장 안전)
-- 커밋마다 로그를 디스크에 즉시 기록 (fsync)
-- 장애 시 데이터 손실 없음
-- 성능: 가장 느림

-- 값 = 2 (성능과 안전의 절충)
-- 커밋마다 OS 버퍼에 기록, 1초마다 디스크에 플러시
-- OS 장애 시 최대 1초 데이터 손실 가능
-- 성능: 약 2~3배 빠름

-- 값 = 0 (가장 빠름, 위험)
-- 1초마다 로그를 디스크에 기록
-- MySQL 장애 시 최대 1초 데이터 손실
-- 성능: 가장 빠름

-- 💡 운영: 1, 배치 작업 시: 일시적으로 2로 변경 가능`}</code></pre>
          </div>

          <h2>4. 커넥션 관리</h2>

          <div className="code-block">
            <div className="code-header">커넥션 파라미터 최적화</div>
            <pre><code>{`-- 현재 커넥션 상태 확인
SHOW STATUS LIKE 'Threads%';
-- Threads_connected: 현재 연결된 커넥션 수
-- Threads_running:   현재 실행 중인 쿼리 수
-- Threads_created:   총 생성된 쓰레드 수 (캐시 미스)

SHOW STATUS LIKE 'Max_used_connections';
-- 서버 시작 후 최대 동시 접속 수

SHOW VARIABLES LIKE 'max_connections';
-- 최대 허용 커넥션 수 (기본: 151)

-- 커넥션 관련 설정
-- [mysqld]
-- max_connections = 500               # 최대 커넥션 (앱 서버 수 × 풀 크기)
-- thread_cache_size = 50              # 쓰레드 캐시 (재사용)
-- wait_timeout = 600                  # 유휴 커넥션 타임아웃 (10분)
-- interactive_timeout = 600
-- max_connect_errors = 100000         # 연결 오류 허용 횟수

-- 💡 커넥션 풀 크기 공식 (HikariCP 권장)
-- 최적 풀 크기 = CPU 코어 수 × 2 + 디스크 수
-- 예: 4코어, SSD 1개 → 4 × 2 + 1 = 9개

-- ⚠️ 주의: 커넥션이 너무 많으면 오히려 성능 저하
-- (컨텍스트 스위칭, 메모리 사용 증가)`}</code></pre>
          </div>

          <h2>5. 세션별 메모리 버퍼</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>파라미터</th><th>기본값</th><th>권장</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>sort_buffer_size</strong></td><td>256KB</td><td>2~8MB</td><td>ORDER BY, GROUP BY 정렬용</td></tr>
              <tr><td><strong>join_buffer_size</strong></td><td>256KB</td><td>2~8MB</td><td>인덱스 없는 JOIN용</td></tr>
              <tr><td><strong>read_buffer_size</strong></td><td>128KB</td><td>1~4MB</td><td>순차 스캔 버퍼</td></tr>
              <tr><td><strong>read_rnd_buffer_size</strong></td><td>256KB</td><td>2~8MB</td><td>인덱스 정렬 후 테이블 접근</td></tr>
              <tr><td><strong>tmp_table_size</strong></td><td>16MB</td><td>64~256MB</td><td>메모리 임시 테이블 크기</td></tr>
              <tr><td><strong>max_heap_table_size</strong></td><td>16MB</td><td>64~256MB</td><td>MEMORY 테이블 최대 크기</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">세션 메모리 계산</div>
            <pre><code>{`-- ⚠️ 세션 버퍼는 커넥션마다 할당됨!
-- 총 세션 메모리 = max_connections × (sort_buffer + join_buffer + ...)
-- 예: 500 커넥션 × (8MB + 4MB + 2MB + 2MB) = 500 × 16MB = 8GB!

-- 따라서:
-- 1. 세션 버퍼는 보수적으로 설정
-- 2. 특정 세션에서만 필요 시 세션 변수로 조정
SET SESSION sort_buffer_size = 16 * 1024 * 1024;  -- 이 세션만 16MB
-- 대량 정렬 작업 실행 후 원복
SET SESSION sort_buffer_size = DEFAULT;`}</code></pre>
          </div>

          <h2>6. 모니터링 쿼리</h2>

          <div className="code-block">
            <div className="code-header">성능 모니터링 필수 쿼리</div>
            <pre><code>{`-- 1. 현재 실행 중인 쿼리 확인
SHOW PROCESSLIST;
-- 또는 상세 버전
SELECT * FROM information_schema.processlist
WHERE command != 'Sleep' ORDER BY time DESC;

-- 2. InnoDB 상태 (락, 트랜잭션, I/O)
SHOW ENGINE INNODB STATUS\\G

-- 3. 테이블별 I/O 통계
SELECT
    object_schema, object_name,
    count_read, count_write,
    ROUND(sum_timer_read / 1e12, 2) AS read_sec,
    ROUND(sum_timer_write / 1e12, 2) AS write_sec
FROM performance_schema.table_io_waits_summary_by_table
WHERE object_schema = 'school'
ORDER BY sum_timer_read + sum_timer_write DESC
LIMIT 10;

-- 4. 인덱스 사용 통계 (사용되지 않는 인덱스 찾기)
SELECT
    object_schema, object_name, index_name,
    count_read, count_fetch
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE object_schema = 'school' AND index_name IS NOT NULL
  AND count_read = 0
ORDER BY object_name;

-- 5. 글로벌 상태 요약
SHOW GLOBAL STATUS LIKE 'Questions';           -- 총 쿼리 수
SHOW GLOBAL STATUS LIKE 'Slow_queries';        -- 슬로우 쿼리 수
SHOW GLOBAL STATUS LIKE 'Innodb_rows_%';       -- InnoDB 행 작업 통계
SHOW GLOBAL STATUS LIKE 'Created_tmp%';        -- 임시 테이블 생성 횟수`}</code></pre>
          </div>

          <h2>7. 최적화 설정 예시 (my.cnf)</h2>

          <div className="code-block">
            <div className="code-header">my.cnf — 16GB 메모리 서버 기준</div>
            <pre><code>{`[mysqld]
# === InnoDB 핵심 ===
innodb_buffer_pool_size = 12G
innodb_buffer_pool_instances = 8
innodb_log_file_size = 2G
innodb_log_buffer_size = 64M
innodb_flush_log_at_trx_commit = 1
innodb_flush_method = O_DIRECT
innodb_io_capacity = 2000
innodb_io_capacity_max = 4000
innodb_file_per_table = ON

# === 커넥션 ===
max_connections = 300
thread_cache_size = 50
wait_timeout = 600
interactive_timeout = 600

# === 세션 버퍼 ===
sort_buffer_size = 4M
join_buffer_size = 4M
read_buffer_size = 2M
read_rnd_buffer_size = 4M
tmp_table_size = 128M
max_heap_table_size = 128M

# === 로깅 ===
slow_query_log = ON
long_query_time = 1
log_queries_not_using_indexes = ON

# === 기타 ===
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
default_storage_engine = InnoDB
skip-name-resolve`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>InnoDB Buffer Pool</strong>은 전체 메모리의 70~80%로 설정하라.</li>
              <li><strong>Buffer Pool 적중률</strong>은 99% 이상을 목표로 유지하라.</li>
              <li><strong>커넥션 수</strong>는 CPU 코어 × 2 + 디스크 수가 최적이다.</li>
              <li><strong>세션 버퍼</strong>는 커넥션마다 할당되므로 보수적으로 설정하라.</li>
              <li><strong>모니터링</strong>: SHOW PROCESSLIST, SHOW ENGINE INNODB STATUS를 주기적으로 확인하라.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> InnoDB Buffer Pool의 역할과 적절한 크기 설정 방법을 설명하세요.</p>
            <p><strong>문제 2.</strong> innodb_flush_log_at_trx_commit 값 1과 2의 차이를 설명하세요.</p>
            <p><strong>문제 3.</strong> max_connections을 너무 크게 설정하면 발생하는 문제를 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/tuning/sql" className="lesson-nav-btn prev">&larr; SQL 튜닝 기법</Link>
            <Link to="/tuning/case-study" className="lesson-nav-btn next">튜닝 실전 사례 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default ServerTuning;
