
-- 1. 실습용 테이블 생성
CREATE TABLE emp_large (
  empno NUMBER,
  ename VARCHAR2(20),
  job VARCHAR2(10),
  sal NUMBER,
  deptno NUMBER
);

-- 2. 대량 데이터 삽입 (1만 건)
BEGIN
  FOR i IN 1..10000 LOOP
    INSERT INTO emp_large
    VALUES (
      i,
      'EMP_' || TO_CHAR(i),
      CASE MOD(i, 4)
        WHEN 0 THEN 'CLERK'
        WHEN 1 THEN 'MANAGER'
        WHEN 2 THEN 'SALESMAN'
        ELSE 'ANALYST'
      END,
      MOD(i, 5000) + 1000,
      MOD(i, 4)*10 + 10
    );
  END LOOP;
  COMMIT;
END;
/

-- 3. 인덱스 없이 조회
SET AUTOTRACE ON
SELECT * FROM emp_large WHERE job = 'MANAGER';

-- 4. 단일 인덱스 생성 후 실행
CREATE INDEX idx_emp_large_job ON emp_large(job);
SELECT * FROM emp_large WHERE job = 'MANAGER';

-- 5. 복합 인덱스 생성 후 실행
CREATE INDEX idx_emp_large_dept_job ON emp_large(deptno, job);
SELECT * FROM emp_large WHERE deptno = 10 AND job = 'CLERK';

-- 6. 선택도 분석
SELECT job, COUNT(*) FROM emp_large GROUP BY job;
SELECT deptno, COUNT(*) FROM emp_large GROUP BY deptno;

-- 7. 인덱스 미사용 예시 (선두 컬럼 빠짐)
SELECT * FROM emp_large WHERE job = 'CLERK';
