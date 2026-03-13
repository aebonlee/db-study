# [추가 예제] 인덱스 실습 : INDEX RANGE SCAN 유도를 위한 대용량 실습

## 🔍 기대 실행계획 비교

[index_range_scan_large_dataset.sql](index_range_scan_large_dataset.sql)

## ✅ 실습 요점

| 구분 | 내용 |
| --- | --- |
| 📌 테이블 | `employees` (10만 건 이상) |
| 📌 인덱스 대상 | `hire_date` |
| ✅ 인덱스 사용 쿼리 | `WHERE hire_date BETWEEN '2020-01-01' AND '2020-12-31'` |
| ❌ 인덱스 미사용 쿼리 | `WHERE TO_CHAR(hire_date, 'YYYY') = '2020'` (함수 적용) |
| 🔍 확인 방법 | `DBMS_XPLAN.DISPLAY`로 `INDEX RANGE SCAN` vs `FULL SCAN` 비교 |

```sql
-- ▼ INDEX RANGE SCAN 유도를 위한 대용량 실습

-- 1. employees 테이블 생성
DROP TABLE employees PURGE;

CREATE TABLE employees (
    emp_id NUMBER PRIMARY KEY,
    emp_name VARCHAR2(100),
    department_id NUMBER,
    hire_date DATE,
    salary NUMBER
);

-- 2. 100,000건 이상 대용량 데이터 삽입
BEGIN
  FOR i IN 1..100000 LOOP
    INSERT INTO employees VALUES (
      i,
      '사원_' || TO_CHAR(i),
      MOD(i, 10),  -- 0~9 부서
      TO_DATE('2010-01-01','YYYY-MM-DD') + MOD(i, 3650), -- 약 10년간 hire_date 분포
      3000 + MOD(i * 11, 7000)
    );
  END LOOP;
  COMMIT;
END;
/

-- 3. hire_date 인덱스 생성
CREATE INDEX idx_emp_hire_date ON employees(hire_date);

-- 4. 인덱스를 사용하는 쿼리 (2020년 한 해만 검색 → 전체의 약 10%)
EXPLAIN PLAN FOR
SELECT * FROM employees
WHERE hire_date BETWEEN TO_DATE('2020-01-01','YYYY-MM-DD')
                    AND TO_DATE('2020-12-31','YYYY-MM-DD');

-- 5. 실행계획 출력
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- 6. 인덱스를 사용하지 않는 쿼리 (함수 포함 → 인덱스 무효화)
EXPLAIN PLAN FOR
SELECT * FROM employees
WHERE TO_CHAR(hire_date, 'YYYY') = '2020';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

---

## 🔧 인덱스 생성

```sql
CREATE INDEX idx_emp_hire_date ON employees(hire_date);
```

---

## ✅ 인덱스를 사용하는 쿼리

```sql
PLAIN PLAN FOR
SELECT * FROM employees
WHERE hire_date BETWEEN TO_DATE('2020-01-01','YYYY-MM-DD')
                    AND TO_DATE('2020-12-31','YYYY-MM-DD');

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

### 📌 기대 결과 (Index 사용됨)

```

| TABLE ACCESS BY INDEX ROWID | EMPLOYEES |
| INDEX RANGE SCAN            | IDX_EMP_HIRE_DATE |
```

---

## ❌ 인덱스를 사용하지 못하는 쿼리 (함수 적용 시)

```sql

EXPLAIN PLAN FOR
SELECT * FROM employees
WHERE TO_CHAR(hire_date, 'YYYY') = '2020';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

### 📌 기대 결과 (Full Scan 발생)

```
| TABLE ACCESS FULL | EMPLOYEES |
```

---

## 🔍 핵심 비교 요약

| 조건 유형 | 인덱스 사용 | 주의사항 |
| --- | --- | --- |
| `hire_date BETWEEN ...` | ✅ 사용 | 범위 조건에 유리함 |
| `TO_CHAR(hire_date, 'YYYY')` | ❌ 미사용 | 함수 적용 시 인덱스 무효화 |

---

## 📌 실습 팁

- `AUTOTRACE` 또는 `STATISTICS_LEVEL = ALL`을 통해 실행 비용 확인
- `100000건` 이상의 데이터를 사용하면 `INDEX RANGE SCAN` 차이를 체감 가능

---

🧠 **결론**: 인덱스는 잘 설계된 조건에서만 유효하다. 조건식과 데이터 량이 핵심이다!