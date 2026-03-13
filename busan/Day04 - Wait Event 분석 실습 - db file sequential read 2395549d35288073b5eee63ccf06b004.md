# Day04 - Wait Event 분석 실습 - db file sequential read vs scattered read

### 🎯 학습 목표

- Oracle의 주요 Wait Event 개념과 역할을 이해한다.
- `db file sequential read`와 `db file scattered read`의 차이를 실습을 통해 체감한다.
- 실행계획과 Wait Event 로그를 연계하여 SQL 성능 병목을 진단하는 기초 역량을 기른다.

---

## 📘 이론 정리: Wait Event 개요

| 구분 | db file sequential read | db file scattered read |
| --- | --- | --- |
| 설명 | **단일 블록 읽기** – 보통 **인덱스 사용시 발생** | **다중 블록 읽기** – 보통 **Full Table Scan 발생** |
| 유형 | Random I/O (비효율 가능) | Sequential I/O (빠른 스캔 가능) |
| 주요 발생 SQL | `INDEX SCAN`, `INDEX RANGE SCAN` | `TABLE ACCESS FULL` |
| 관련 뷰 | `V$SESSION`, `V$SESSION_WAIT`, `V$SYSTEM_EVENT` 등 |  |

---

## 🧪 실습 1: 환경 준비

```sql
-- 테스트 테이블 생성 및 데이터 삽입
CREATE TABLE read_test (
  id NUMBER PRIMARY KEY,
  name VARCHAR2(50),
  age NUMBER
);

BEGIN
  FOR i IN 1..50000 LOOP
    INSERT INTO read_test VALUES (i, '고객_' || i, MOD(i, 100));
  END LOOP;
  COMMIT;
END;
```

---

## 🧪 실습 2: 인덱스 기반 조회 → db file **sequential** read 유발

```sql
-- 인덱스를 통한 단건 조회 → Random I/O
SELECT /*+ INDEX(read_test PK_READ_TEST) */ *
FROM read_test WHERE id = 12345;

-- 실행계획 확인
EXPLAIN PLAN FOR
SELECT /*+ INDEX(read_test PK_READ_TEST) */ *
FROM read_test WHERE id = 12345;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

👉 **실행계획에** `INDEX UNIQUE SCAN` 또는 `TABLE ACCESS BY ROWID` 확인

👉 `V$SESSION_WAIT` 또는 `V$SYSTEM_EVENT` 확인 시 `db file sequential read` 증가 확인

---

## 🧪 실습 3: Full Table Scan → db file **scattered** read 유발

```sql
-- Full Table Scan 유도 → Sequential I/O
SELECT /*+ FULL(read_test) */ *
FROM read_test WHERE age = 50;

-- 실행계획 확인
EXPLAIN PLAN FOR
SELECT /*+ FULL(read_test) */ *
FROM read_test WHERE age = 50;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

👉 **실행계획에** `TABLE ACCESS FULL` 확인

👉 `V$SESSION_WAIT` 또는 `V$SYSTEM_EVENT` 에서 `db file scattered read` 증가 관찰

---

## 🧪 실습 4: 실시간 Wait Event 확인

```sql
-- 현재 세션에서 발생 중인 Wait Event 확인
SELECT sid, event, wait_class, state, seconds_in_wait
FROM v$session
WHERE username IS NOT NULL AND status = 'ACTIVE';

-- 시스템 전체의 누적 Wait Event 통계 확인
SELECT event, total_waits, time_waited, average_wait
FROM v$system_event
WHERE event IN ('db file sequential read', 'db file scattered read');
```

---

## 📝 과제

1. `read_test` 테이블에서 **범위 조건 (BETWEEN)** 으로 인덱스 스캔을 유도하고, `db file sequential read` 발생 여부를 확인하세요.
    
    ```sql
    SELECT * FROM read_test WHERE id BETWEEN 10000 AND 10020;
    ```
    
2. 아래 쿼리의 실행계획과 Wait Event를 확인하고 분석해보세요:
    
    ```sql
    SELECT COUNT(*) FROM read_test WHERE age = 30;
    ```
    
    👉 힌트: 인덱스를 생성하면 sequential read로 바뀔 수 있음
    
3. `V$ACTIVE_SESSION_HISTORY` 또는 `DBA_HIST_SYSTEM_EVENT`를 활용한 이벤트 추적 실습도 함께 진행해보세요.

---

## 📌 참고 자료

- 《오라클강의_PDF_교재_v1_0.pdf》
    - Wait Event 분석과 `db file sequential/scattered read` 상세 설명
- `DBMS_XPLAN.DISPLAY`, `V$SESSION`, `V$SYSTEM_EVENT`, `V$ACTIVE_SESSION_HISTORY`