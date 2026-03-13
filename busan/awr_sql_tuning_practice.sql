-- [0] 실습 테이블 생성 및 데이터 삽입
DROP TABLE orders PURGE;

CREATE TABLE orders AS
SELECT level AS order_id,
       MOD(level, 1000) AS customer_id,
       TO_DATE('2020-01-01', 'YYYY-MM-DD') + MOD(level, 365) AS order_date,
       DBMS_RANDOM.VALUE(100, 5000) AS amount
FROM dual CONNECT BY level <= 1000000;

-- [1] AWR 스냅샷 생성 (튜닝 전 시작)
EXEC DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT();

-- [2] 비효율 SQL 반복 실행
BEGIN
  FOR i IN 1..10000 LOOP
    EXECUTE IMMEDIATE q'[SELECT * FROM orders WHERE TO_CHAR(order_date, 'YYYY-MM') = '2020-05']';
  END LOOP;
END;
/

-- [3] AWR 스냅샷 생성 (튜닝 전 종료)
EXEC DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT();

-- [4] EXPLAIN PLAN (튜닝 전)
EXPLAIN PLAN FOR
SELECT * FROM orders WHERE TO_CHAR(order_date, 'YYYY-MM') = '2020-05';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- [5] 인덱스 생성 및 개선 SQL
CREATE INDEX idx_orders_date ON orders(order_date);

-- [6] EXPLAIN PLAN (튜닝 후)
EXPLAIN PLAN FOR
SELECT * FROM orders 
WHERE order_date BETWEEN TO_DATE('2020-05-01', 'YYYY-MM-DD')
                     AND TO_DATE('2020-05-31', 'YYYY-MM-DD');
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- [7] 튜닝된 SQL 반복 실행
EXEC DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT();

BEGIN
  FOR i IN 1..10000 LOOP
    EXECUTE IMMEDIATE q'[SELECT * FROM orders 
                         WHERE order_date BETWEEN TO_DATE('2020-05-01', 'YYYY-MM-DD') 
                                             AND TO_DATE('2020-05-31', 'YYYY-MM-DD')]';
  END LOOP;
END;
/

EXEC DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT();

-- [8] AWR 리포트는 SQL*Plus에서 아래 명령으로 생성
-- @?/rdbms/admin/awrrpt.sql
