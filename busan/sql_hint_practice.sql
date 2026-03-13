-- 힌트 실습 예제: customer + region 테이블 기반

-- [1] region 테이블 생성 및 데이터 삽입
DROP TABLE region PURGE;

CREATE TABLE region (
  region_cd VARCHAR2(10) PRIMARY KEY,
  region_name VARCHAR2(100)
);

INSERT INTO region VALUES ('서울', '서울특별시');
INSERT INTO region VALUES ('부산', '부산광역시');
INSERT INTO region VALUES ('대구', '대구광역시');
INSERT INTO region VALUES ('광주', '광주광역시');
INSERT INTO region VALUES ('제주', '제주특별자치도');
COMMIT;

-- [2] 인덱스 힌트 사용 예제
-- name 컬럼 인덱스가 있다고 가정 (없다면 먼저 생성 필요)
CREATE INDEX idx_customer_name ON customer(name);

-- 인덱스 사용 유도
SELECT /*+ INDEX(customer idx_customer_name) */ *
FROM customer
WHERE name = '고객_5000';

-- [3] 풀스캔 유도 힌트
SELECT /*+ FULL(customer) */ *
FROM customer
WHERE name = '고객_5000';

-- [4] 조인 순서 제어 힌트 (LEADING)
SELECT /*+ LEADING(c r) */
  c.cust_id, c.name, r.region_name
FROM customer c
JOIN region r ON c.region_cd = r.region_cd
WHERE r.region_name = '서울특별시';

-- [5] 조인 방식 제어 힌트 (USE_NL / USE_HASH)
-- Nested Loop Join
SELECT /*+ USE_NL(c r) */
  c.cust_id, c.name, r.region_name
FROM customer c
JOIN region r ON c.region_cd = r.region_cd
WHERE r.region_name = '부산광역시';

-- Hash Join
SELECT /*+ USE_HASH(c r) */
  c.cust_id, c.name, r.region_name
FROM customer c
JOIN region r ON c.region_cd = r.region_cd
WHERE r.region_name = '부산광역시';
