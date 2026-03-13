
-- 실습을 위한 테이블 생성 및 데이터 입력
DROP TABLE customer PURGE;
CREATE TABLE customer (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(100),
    region VARCHAR2(10),
    birth_date DATE,
    phone_no VARCHAR2(20)
);

-- 데이터 샘플 (단순화된 버전)
BEGIN
  FOR i IN 1..10000 LOOP
    INSERT INTO customer VALUES (
      i,
      '고객_' || MOD(i, 100),
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

-------------------------------------------------------
-- 3.1.1 테이블 랜덤 액세스
-- 인덱스 경유 시 RowID로 테이블 접근: Random I/O
CREATE INDEX idx_customer_name ON customer(name);

-- 실행계획 확인
EXPLAIN PLAN FOR
SELECT * FROM customer WHERE name = '고객_99';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-------------------------------------------------------
-- 3.1.2 인덱스 클러스터링 팩터
SELECT INDEX_NAME, CLUSTERING_FACTOR FROM USER_INDEXES WHERE TABLE_NAME = 'CUSTOMER';

-- 클러스터링 팩터 개선 실습 (정렬된 테이블 재생성)
DROP TABLE customer_sorted PURGE;
CREATE TABLE customer_sorted AS
SELECT * FROM customer ORDER BY name;

-- 인덱스 재생성 후 팩터 비교
CREATE INDEX idx_sorted_name ON customer_sorted(name);
SELECT INDEX_NAME, CLUSTERING_FACTOR FROM USER_INDEXES WHERE TABLE_NAME = 'CUSTOMER_SORTED';

-------------------------------------------------------
-- 3.1.3 인덱스 손익분기점 실험
-- 범위조회 & 정확도 분석
EXPLAIN PLAN FOR
SELECT * FROM customer WHERE name LIKE '고객_%';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-------------------------------------------------------
-- 3.1.4 인덱스 컬럼 추가 (Covering Index)
CREATE INDEX idx_customer_cover ON customer(name, phone_no);

-- 인덱스만으로 처리 가능 (Index Only Scan)
EXPLAIN PLAN FOR
SELECT name, phone_no FROM customer WHERE name = '고객_10';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-------------------------------------------------------
-- 3.1.5 인덱스만 읽고 처리 (Index Only Scan 확인)
-- 인덱스에 포함된 컬럼만 조회 시 테이블 액세스 생략
-- 확인은 PREDICATE INFORMATION에서 TABLE ACCESS ABSENT 여부로 판단

-------------------------------------------------------
-- 3.1.6 인덱스 구조 테이블 (Index Organized Table)
DROP TABLE iot_customer PURGE;
CREATE TABLE iot_customer (
    id NUMBER,
    name VARCHAR2(100),
    CONSTRAINT pk_iot_customer PRIMARY KEY(id)
) ORGANIZATION INDEX;

INSERT INTO iot_customer SELECT id, name FROM customer;
COMMIT;

EXPLAIN PLAN FOR SELECT name FROM iot_customer WHERE id = 500;
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-------------------------------------------------------
-- 3.1.7 클러스터 테이블
DROP CLUSTER cust_cluster FORCE;

-- 클러스터 생성
CREATE CLUSTER cust_cluster (region VARCHAR2(10)) 
  SIZE 512
  TABLESPACE USERS;

-- 클러스터 테이블 생성
CREATE TABLE clustered_customer (
    id NUMBER,
    name VARCHAR2(100),
    region VARCHAR2(10)
) CLUSTER cust_cluster(region);

-- 클러스터 인덱스 생성
CREATE INDEX idx_cluster_region ON CLUSTER cust_cluster;

-- 데이터 입력
INSERT INTO clustered_customer
SELECT id, name, region FROM customer;
COMMIT;

-- 클러스터 테이블 조회
EXPLAIN PLAN FOR SELECT * FROM clustered_customer WHERE region = '서울';
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
