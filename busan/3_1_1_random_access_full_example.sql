
-- ▼ 1. 고객 테이블 생성 및 초기화
DROP TABLE customer PURGE;

CREATE TABLE customer (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    region VARCHAR2(10),
    birth_date DATE,
    phone_no VARCHAR2(20)
);

-- ▼ 2. 고객 데이터 삽입 (총 10,000건)
BEGIN
  FOR i IN 1..10000 LOOP
    INSERT INTO customer VALUES (
      i,
      '고객_' || MOD(i, 1000),
      CASE MOD(i, 3)
        WHEN 0 THEN '서울'
        WHEN 1 THEN '부산'
        ELSE '대구'
      END,
      TO_DATE('1980-01-01','YYYY-MM-DD') + MOD(i, 3650),
      '010-' || TO_CHAR(MOD(i, 10000), 'FM0000')
    );
  END LOOP;
  COMMIT;
END;
/

-- ▼ 3. 이름 컬럼 인덱스 생성
CREATE INDEX idx_customer_name ON customer(name);

-- ▼ 4. 고객 이름을 기준으로 인덱스를 타는 SELECT 쿼리
EXPLAIN PLAN FOR
SELECT * FROM customer WHERE name = '고객_99';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
