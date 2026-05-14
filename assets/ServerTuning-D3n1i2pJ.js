import{j as e,L as s}from"./index-7qo320fS.js";const r=()=>e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"DB 서버 튜닝"}),e.jsx("p",{children:"InnoDB 버퍼 풀, 커넥션, 캐시, 파라미터 최적화"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"학습 목표"}),e.jsxs("ul",{children:[e.jsx("li",{children:"MySQL/InnoDB의 핵심 파라미터를 이해하고 최적화한다."}),e.jsx("li",{children:"버퍼 풀, 로그, 캐시 설정을 시스템에 맞게 조정한다."}),e.jsx("li",{children:"커넥션 관리와 쓰레드 풀을 최적화한다."}),e.jsx("li",{children:"하드웨어 리소스(CPU, 메모리, 디스크)와 DB 설정의 관계를 파악한다."})]})]}),e.jsx("h2",{children:"1. MySQL 서버 아키텍처"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"MySQL 메모리 구조"}),e.jsx("pre",{children:e.jsx("code",{children:`[클라이언트 연결]
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
└─────────────────────────────────────────┘`})})]}),e.jsx("h2",{children:"2. InnoDB Buffer Pool"}),e.jsxs("p",{children:[e.jsx("strong",{children:"InnoDB Buffer Pool"}),"은 MySQL 성능의 핵심입니다. 테이블 데이터와 인덱스를 메모리에 캐싱하여 디스크 I/O를 줄입니다."]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Buffer Pool 설정"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 현재 Buffer Pool 크기 확인
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
  )) * 100, 2) AS buffer_pool_hit_rate;`})})]}),e.jsx("h2",{children:"3. 핵심 InnoDB 파라미터"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"파라미터"}),e.jsx("th",{children:"기본값"}),e.jsx("th",{children:"권장"}),e.jsx("th",{children:"설명"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"innodb_buffer_pool_size"})}),e.jsx("td",{children:"128MB"}),e.jsx("td",{children:"메모리의 70~80%"}),e.jsx("td",{children:"데이터/인덱스 캐시 크기"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"innodb_log_file_size"})}),e.jsx("td",{children:"48MB"}),e.jsx("td",{children:"1~2GB"}),e.jsx("td",{children:"Redo 로그 파일 크기"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"innodb_log_buffer_size"})}),e.jsx("td",{children:"16MB"}),e.jsx("td",{children:"64~256MB"}),e.jsx("td",{children:"로그 버퍼 크기"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"innodb_flush_log_at_trx_commit"})}),e.jsx("td",{children:"1"}),e.jsx("td",{children:"1(안전) / 2(성능)"}),e.jsx("td",{children:"트랜잭션 커밋 시 로그 플러시"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"innodb_io_capacity"})}),e.jsx("td",{children:"200"}),e.jsx("td",{children:"SSD: 2000~5000"}),e.jsx("td",{children:"초당 I/O 작업 수"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"innodb_flush_method"})}),e.jsx("td",{children:"fsync"}),e.jsx("td",{children:"O_DIRECT (Linux)"}),e.jsx("td",{children:"디스크 플러시 방식"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"innodb_file_per_table"})}),e.jsx("td",{children:"ON"}),e.jsx("td",{children:"ON"}),e.jsx("td",{children:"테이블별 파일 분리"})]})]})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"innodb_flush_log_at_trx_commit 비교"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 값 = 1 (기본, 가장 안전)
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

-- 💡 운영: 1, 배치 작업 시: 일시적으로 2로 변경 가능`})})]}),e.jsx("h2",{children:"4. 커넥션 관리"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"커넥션 파라미터 최적화"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 현재 커넥션 상태 확인
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
-- (컨텍스트 스위칭, 메모리 사용 증가)`})})]}),e.jsx("h2",{children:"5. 세션별 메모리 버퍼"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"파라미터"}),e.jsx("th",{children:"기본값"}),e.jsx("th",{children:"권장"}),e.jsx("th",{children:"용도"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"sort_buffer_size"})}),e.jsx("td",{children:"256KB"}),e.jsx("td",{children:"2~8MB"}),e.jsx("td",{children:"ORDER BY, GROUP BY 정렬용"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"join_buffer_size"})}),e.jsx("td",{children:"256KB"}),e.jsx("td",{children:"2~8MB"}),e.jsx("td",{children:"인덱스 없는 JOIN용"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"read_buffer_size"})}),e.jsx("td",{children:"128KB"}),e.jsx("td",{children:"1~4MB"}),e.jsx("td",{children:"순차 스캔 버퍼"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"read_rnd_buffer_size"})}),e.jsx("td",{children:"256KB"}),e.jsx("td",{children:"2~8MB"}),e.jsx("td",{children:"인덱스 정렬 후 테이블 접근"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"tmp_table_size"})}),e.jsx("td",{children:"16MB"}),e.jsx("td",{children:"64~256MB"}),e.jsx("td",{children:"메모리 임시 테이블 크기"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"max_heap_table_size"})}),e.jsx("td",{children:"16MB"}),e.jsx("td",{children:"64~256MB"}),e.jsx("td",{children:"MEMORY 테이블 최대 크기"})]})]})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"세션 메모리 계산"}),e.jsx("pre",{children:e.jsx("code",{children:`-- ⚠️ 세션 버퍼는 커넥션마다 할당됨!
-- 총 세션 메모리 = max_connections × (sort_buffer + join_buffer + ...)
-- 예: 500 커넥션 × (8MB + 4MB + 2MB + 2MB) = 500 × 16MB = 8GB!

-- 따라서:
-- 1. 세션 버퍼는 보수적으로 설정
-- 2. 특정 세션에서만 필요 시 세션 변수로 조정
SET SESSION sort_buffer_size = 16 * 1024 * 1024;  -- 이 세션만 16MB
-- 대량 정렬 작업 실행 후 원복
SET SESSION sort_buffer_size = DEFAULT;`})})]}),e.jsx("h2",{children:"6. 모니터링 쿼리"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"성능 모니터링 필수 쿼리"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 1. 현재 실행 중인 쿼리 확인
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
SHOW GLOBAL STATUS LIKE 'Created_tmp%';        -- 임시 테이블 생성 횟수`})})]}),e.jsx("h2",{children:"7. 최적화 설정 예시 (my.cnf)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"my.cnf — 16GB 메모리 서버 기준"}),e.jsx("pre",{children:e.jsx("code",{children:`[mysqld]
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
skip-name-resolve`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"핵심 정리"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"InnoDB Buffer Pool"}),"은 전체 메모리의 70~80%로 설정하라."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Buffer Pool 적중률"}),"은 99% 이상을 목표로 유지하라."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"커넥션 수"}),"는 CPU 코어 × 2 + 디스크 수가 최적이다."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"세션 버퍼"}),"는 커넥션마다 할당되므로 보수적으로 설정하라."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"모니터링"}),": SHOW PROCESSLIST, SHOW ENGINE INNODB STATUS를 주기적으로 확인하라."]})]})]}),e.jsxs("div",{className:"exercise-box",children:[e.jsx("h3",{children:"확인 문제"}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 1."})," InnoDB Buffer Pool의 역할과 적절한 크기 설정 방법을 설명하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 2."})," innodb_flush_log_at_trx_commit 값 1과 2의 차이를 설명하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 3."})," max_connections을 너무 크게 설정하면 발생하는 문제를 설명하세요."]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/tuning/sql",className:"lesson-nav-btn prev",children:"← SQL 튜닝 기법"}),e.jsx(s,{to:"/tuning/case-study",className:"lesson-nav-btn next",children:"튜닝 실전 사례 →"})]})]})})})]});export{r as default};
