# Day04 - Library Cache 경합 & Hard Parsing 병목 실습

### 학습 목표

- Oracle Shared Pool(Library Cache)의 구조와 역할을 이해한다.
- Hard Parsing 발생 원인과 성능 저하 메커니즘을 체험한다.
- `Literal SQL` 과 `Bind Variable SQL` 의 성능 차이를 실습한다.
- SQL 공유 정책(CURSOR_SHARING 등)과 Pinning 전략을 적용해본다.

---

## 📘 Library Cache 경합 & Hard Parsing 병목

| 항목 | 설명 |
| --- | --- |
| **Library Cache** | SQL, PL/SQL, 실행계획이 저장되는 SGA 내 공유 메모리 영역 |
| **Hard Parsing** | SQL 실행 시 Library Cache에 없으면 새로 파싱 → CPU & Latch 사용 |
| **Soft Parsing** | 동일 SQL 존재 시 재사용 (실행계획 공유) |
| **경합 원인** | Literal SQL 남발, 동시접속 사용자 많을 때 Hard Parse 증가 |
| **Wait Event** | `library cache lock`, `library cache: mutex X`, `cursor: pin S wait on X` |

---

## 🧪 실습 1: Hard Parsing 유도 (Literal SQL)

```sql
-- 반복적으로 새로운 SQL문 (문자열 다름 → Hard Parsing 발생)
BEGIN
  FOR i IN 1..1000 LOOP
    EXECUTE IMMEDIATE 'SELECT * FROM dual WHERE dummy = ''' || i || '''';
  END LOOP;
END;
```

👉 `library cache`에 계속 새로운 SQL 등록됨 → Hard Parsing 증가

---

## 🧪 실습 2: Soft Parsing 유도 (Bind Variable 사용)

```sql
-- 같은 SQL + 바인드 변수 → Shared SQL 영역 재사용
VARIABLE b_val VARCHAR2(10)
BEGIN
  FOR i IN 1..1000 LOOP
    :b_val := TO_CHAR(i);
    EXECUTE IMMEDIATE 'SELECT * FROM dual WHERE dummy = :1' USING :b_val;
  END LOOP;
END;
```

👉 동일 SQL 구조 사용 → 실행계획 재사용 → Soft Parsing

---

## 🧪 실습 3: 경합 확인 및 분석

```sql
-- 경합 발생 확인
SELECT event, total_waits, time_waited, average_wait
FROM v$system_event
WHERE event LIKE 'library cache%';

-- SQL 수 증가 확인
SELECT COUNT(*) FROM v$sqlarea WHERE sql_text LIKE 'SELECT * FROM dual WHERE dummy =%';

-- Hard Parsing 확인
SELECT name, value FROM v$sysstat
WHERE name IN ('parse count (hard)', 'parse count (total)');
```

---

## 🧪 실습 4: 공유 정책 CURSOR_SHARING 적용

```sql
-- 1. 기본 설정 확인
SHOW PARAMETER cursor_sharing;

-- 2. 강제로 비슷한 SQL을 공유하도록 설정
ALTER SYSTEM SET cursor_sharing = FORCE;

-- 3. 다시 Literal SQL 실행 → 공유 확인
BEGIN
  FOR i IN 1..1000 LOOP
    EXECUTE IMMEDIATE 'SELECT * FROM dual WHERE dummy = ''' || i || '''';
  END LOOP;
END;
```

👉 실행계획 재사용되고 `V$SQLAREA` SQL 수 증가폭 줄어드는지 확인

---

## 🧪 실습 5: Pinning 테스트 (대형 PL/SQL 고정 유지)

```sql
-- 예: 큰 패키지 또는 함수 Pin 유지
EXECUTE DBMS_SHARED_POOL.KEEP('패키지명');

-- 확인
SELECT owner, name, type, kept FROM v$db_object_cache
WHERE type = 'PACKAGE' AND kept = 'YES';
```

---

## 📝 과제

1. `parse count (hard)`와 `parse count (total)` 수치를 비교하여 Hard Parsing 비율을 계산해보세요.
2. `V$SQLAREA`에서 동일 SQL 구조가 Literal로 몇 개 생성되었는지 확인해보세요.
3. `cursor_sharing`을 FORCE로 설정한 후, 전체 성능 지표 변화(AWR 기반)를 비교해보세요.

---

## 📌 참고 자료

- 《오라클강의_PDF_교재_v1_0.pdf》
    - Library Cache 구조, SQL Aging, Pinning 전략, 경합 예시
- 관련 뷰:
    - `V$LIBRARYCACHE`, `V$SQLAREA`, `V$DB_OBJECT_CACHE`, `V$SYSTEM_EVENT`