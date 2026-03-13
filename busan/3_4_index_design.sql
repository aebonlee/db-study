
-- ▼ 3.4 인덱스 설계 실습용 테이블
DROP TABLE orders PURGE;

CREATE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    customer_id NUMBER,
    order_date DATE,
    product_id NUMBER,
    quantity NUMBER,
    amount NUMBER
);

-- 데이터 삽입
BEGIN
  FOR i IN 1..10000 LOOP
    INSERT INTO orders VALUES (
      i,
      MOD(i, 500),
      TO_DATE('2020-01-01', 'YYYY-MM-DD') + MOD(i, 1000),
      MOD(i, 100),
      MOD(i, 5) + 1,
      ROUND(DBMS_RANDOM.VALUE(10000, 50000), -2)
    );
  END LOOP;
  COMMIT;
END;
/

-- ▼ 3.4.2 가장 중요한 선택 기준 (선택도 높은 컬럼 우선)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

EXPLAIN PLAN FOR
SELECT * FROM orders
WHERE customer_id = 200
AND order_date BETWEEN TO_DATE('2021-01-01') AND TO_DATE('2021-12-31');
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- ▼ 3.4.4 공식을 초월한 전략적 설계
-- 정렬 생략을 위해 ORDER BY 컬럼 포함
CREATE INDEX idx_orders_sort ON orders(customer_id, order_date, amount);

EXPLAIN PLAN FOR
SELECT * FROM orders
WHERE customer_id = 123
AND order_date BETWEEN TO_DATE('2021-01-01') AND TO_DATE('2021-12-31')
ORDER BY amount;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- ▼ 3.4.6 결합 인덱스 선택도 비교 실습
CREATE INDEX idx_orders_prod_qty ON orders(product_id, quantity);
EXPLAIN PLAN FOR
SELECT * FROM orders WHERE product_id = 50 AND quantity = 2;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- ▼ 3.4.7 중복 인덱스 제거 고려
-- 예시: 아래 인덱스는 기존 idx_orders_customer_date와 중복 가능성 있음
CREATE INDEX idx_orders_customer_only ON orders(customer_id);
-- 필요 시 삭제
-- DROP INDEX idx_orders_customer_only;

-- ▼ 3.4.8 인덱스 설계도 작성은 노션/문서로 정리 (예시 생략)
