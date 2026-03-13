
-- ▼ 3.2.1 부분범위 처리 예제: Index Range Scan 유도
DROP TABLE orders PURGE;
CREATE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    customer_id NUMBER,
    order_date DATE,
    amount NUMBER
);

-- 예제 데이터 삽입
BEGIN
  FOR i IN 1..10000 LOOP
    INSERT INTO orders VALUES (
      i,
      MOD(i, 1000),
      TO_DATE('2020-01-01','YYYY-MM-DD') + MOD(i, 365 * 3),
      ROUND(DBMS_RANDOM.VALUE(1000, 100000), -3)
    );
  END LOOP;
  COMMIT;
END;
/

-- 인덱스 생성
CREATE INDEX idx_orders_orderdate ON orders(order_date);

-- ▼ 3.2.2 부분범위 처리 구현: 특정 날짜 범위만 가져오기
-- 전체 테이블 스캔 방지 & Index Range Scan 유도
EXPLAIN PLAN FOR
SELECT * FROM orders
WHERE order_date BETWEEN TO_DATE('2021-01-01','YYYY-MM-DD') AND TO_DATE('2021-01-31','YYYY-MM-DD');
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- 날짜 조건 없이 실행했을 경우 (비교)
EXPLAIN PLAN FOR
SELECT * FROM orders;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- ▼ 3.2.3 OLTP 환경에서의 성능개선 원리 시뮬레이션
-- 주문 ID 검색 (PK 인덱스 이용)
EXPLAIN PLAN FOR
SELECT * FROM orders WHERE order_id = 500;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- 주문 일자 + 금액 조건 복합 조회 (복합 인덱스로 튜닝 가능 예시)
CREATE INDEX idx_orders_date_amt ON orders(order_date, amount);

EXPLAIN PLAN FOR
SELECT * FROM orders
WHERE order_date BETWEEN TO_DATE('2022-01-01','YYYY-MM-DD') AND TO_DATE('2022-12-31','YYYY-MM-DD')
AND amount >= 50000;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
