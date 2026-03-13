
-- ========================================
-- Day04 실습: 옵티마이저와 정렬 튜닝 실습용 SQL
-- ========================================

-- [1] 세션 설정 실험용: WORKAREA/PGA 관련
ALTER SESSION SET WORKAREA_SIZE_POLICY = MANUAL;
ALTER SESSION SET SORT_AREA_SIZE = 524288; -- 512KB

-- [문제 1] 정렬 쿼리 기본 실행
SELECT id AS order_id, customer_id, order_date
FROM orders
ORDER BY order_date DESC;

-- [문제 1-2] PGA 크기 변경 후 재실행
ALTER SESSION SET SORT_AREA_SIZE = 10485760; -- 10MB
SELECT id AS order_id, customer_id, order_date
FROM orders
ORDER BY order_date DESC;

-- [문제 2] GROUP BY 쿼리 기본 실행
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id;

-- [문제 2-1] Sort Group By 힌트
SELECT /*+ USE_SORT_AGGREGATION */ customer_id, COUNT(*) 
FROM orders 
GROUP BY customer_id;

-- [문제 2-2] Hash Group By 힌트
SELECT /*+ USE_HASH_AGGREGATION */ customer_id, COUNT(*) 
FROM orders 
GROUP BY customer_id;

-- [문제 3] 통계 수집 전 실행계획 확인용 쿼리
SELECT * FROM orders
WHERE order_date BETWEEN SYSDATE - 30 AND SYSDATE;

-- [문제 3-1] 통계 수집
EXEC DBMS_STATS.GATHER_TABLE_STATS(USER, 'ORDERS');

-- [문제 3-2] 통계 수집 후 동일 쿼리 실행
SELECT * FROM orders
WHERE order_date BETWEEN SYSDATE - 30 AND SYSDATE;

-- [문제 4] 병렬 처리 힌트 실험
SELECT customer_id, COUNT(*) 
FROM orders
GROUP BY customer_id;

-- 병렬 힌트 적용
SELECT /*+ PARALLEL(orders 4) */ customer_id, COUNT(*) 
FROM orders
GROUP BY customer_id;
