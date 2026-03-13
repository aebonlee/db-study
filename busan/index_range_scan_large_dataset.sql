
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
