import{j as e,L as s}from"./index-BzTEy25C.js";const r=()=>e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"튜닝 실전 사례"}),e.jsx("p",{children:"슬로우 쿼리 분석, Before/After, 튜닝 체크리스트"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"학습 목표"}),e.jsxs("ul",{children:[e.jsx("li",{children:"실전 슬로우 쿼리를 분석하고 개선하는 과정을 학습한다."}),e.jsx("li",{children:"Before/After 비교로 튜닝 효과를 측정한다."}),e.jsx("li",{children:"단계별 튜닝 프로세스를 체득한다."}),e.jsx("li",{children:"튜닝 체크리스트로 체계적으로 점검한다."})]})]}),e.jsx("h2",{children:"1. 튜닝 프로세스"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"DB 튜닝 5단계 프로세스"}),e.jsx("pre",{children:e.jsx("code",{children:`1️⃣ 문제 발견
   └─ 슬로우 쿼리 로그, 모니터링 도구, 사용자 불만

2️⃣ 원인 분석
   └─ EXPLAIN / EXPLAIN ANALYZE로 실행 계획 확인
   └─ SHOW PROFILE로 단계별 시간 측정

3️⃣ 개선안 수립
   └─ 인덱스 추가/변경
   └─ 쿼리 리팩토링
   └─ 서버 파라미터 조정
   └─ 스키마 변경 (정규화/비정규화)

4️⃣ 적용 및 테스트
   └─ 개발/스테이징 환경에서 먼저 테스트
   └─ 실행 계획 재확인
   └─ 부하 테스트

5️⃣ 효과 측정
   └─ Before/After 실행 시간 비교
   └─ 영향받는 다른 쿼리 확인
   └─ 모니터링 지속`})})]}),e.jsx("h2",{children:"2. 사례 1: 게시판 목록 조회 (풀스캔 → 인덱스)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Before — 3.2초 (풀 테이블 스캔)"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 문제 쿼리: 게시판 목록 최신순 조회 (100만 행)
SELECT id, title, author, created_at, view_count
FROM posts
WHERE board_id = 5 AND status = 'active'
ORDER BY created_at DESC
LIMIT 20;

-- EXPLAIN 결과:
-- type: ALL          ← 풀 테이블 스캔!
-- rows: 1,048,576    ← 100만 행 전부 스캔
-- Extra: Using where; Using filesort  ← 정렬까지 추가!
-- 실행 시간: 3.2초`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"After — 0.003초 (복합 인덱스 + 커버링)"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 해결: 복합 인덱스 생성 (등호 조건 → 범위/정렬 순서)
CREATE INDEX idx_board_status_created
ON posts(board_id, status, created_at DESC);

-- EXPLAIN 결과:
-- type: ref           ← 인덱스 사용!
-- key: idx_board_status_created
-- rows: 20            ← 20행만 접근
-- Extra: Using index condition  ← filesort 제거!
-- 실행 시간: 0.003초 (1,000배 개선!)

-- 💡 포인트:
-- 1. board_id(=), status(=)는 등호 → 앞에 배치
-- 2. created_at(ORDER BY DESC) → 뒤에 배치
-- 3. 인덱스 정렬과 쿼리 정렬이 일치 → filesort 불필요`})})]}),e.jsx("h2",{children:"3. 사례 2: 회원별 주문 통계 (N+1 → JOIN)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Before — 12초 (N+1 서브쿼리)"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 문제 쿼리: 회원별 총 주문 금액 (회원 5만 명)
SELECT
    u.id, u.name, u.email,
    (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count,
    (SELECT COALESCE(SUM(total), 0) FROM orders o WHERE o.user_id = u.id) AS total_amount
FROM users u
WHERE u.status = 'active'
ORDER BY total_amount DESC
LIMIT 50;

-- 문제점:
-- 1. 상관 서브쿼리 2개 × 5만 명 = 10만 번 서브쿼리 실행!
-- 2. total_amount에 ORDER BY → filesort
-- 실행 시간: 12초`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"After — 0.15초 (JOIN + GROUP BY)"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 해결: LEFT JOIN + GROUP BY로 한 번에 집계
SELECT
    u.id, u.name, u.email,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total), 0) AS total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id, u.name, u.email
ORDER BY total_amount DESC
LIMIT 50;

-- 추가: 인덱스 생성
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_users_status ON users(status);

-- 실행 시간: 0.15초 (80배 개선!)

-- 💡 포인트:
-- 1. 상관 서브쿼리를 LEFT JOIN으로 변환
-- 2. 2개 서브쿼리를 1개 JOIN으로 통합
-- 3. orders.user_id에 인덱스 추가`})})]}),e.jsx("h2",{children:"4. 사례 3: 대용량 페이징 (OFFSET → 커서)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Before — 4.5초 (큰 OFFSET)"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 문제 쿼리: 5000페이지 (100만 행 테이블)
SELECT * FROM products
ORDER BY id DESC
LIMIT 20 OFFSET 100000;

-- 실행 시간: 4.5초 (100,020행 읽고 100,000행 버림)
-- OFFSET이 커질수록 선형적으로 느려짐`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"After — 0.002초 (커서 기반 페이징)"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 해결: 커서 기반 페이징
-- 클라이언트가 마지막으로 본 id를 전달
SELECT * FROM products
WHERE id < 900000         -- 이전 페이지 마지막 id
ORDER BY id DESC
LIMIT 20;

-- 실행 시간: 0.002초 (2,250배 개선!)
-- PK 인덱스로 바로 위치 찾아서 20건만 읽음

-- 💡 API 응답 예시:
-- {
--   "data": [...20건...],
--   "cursor": { "lastId": 899981 },  -- 다음 요청 시 이 값 전달
--   "hasNext": true
-- }`})})]}),e.jsx("h2",{children:"5. 사례 4: 날짜 함수로 인덱스 무시"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Before — 2.1초"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 문제: 이번 달 매출 집계
SELECT DATE(created_at) AS sale_date, SUM(amount) AS daily_total
FROM sales
WHERE YEAR(created_at) = 2024 AND MONTH(created_at) = 3
GROUP BY DATE(created_at);

-- created_at에 인덱스가 있지만...
-- YEAR(), MONTH() 함수 때문에 인덱스 무시! → 풀스캔
-- 실행 시간: 2.1초`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"After — 0.05초"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 해결: 범위 조건으로 변경
SELECT DATE(created_at) AS sale_date, SUM(amount) AS daily_total
FROM sales
WHERE created_at >= '2024-03-01'
  AND created_at <  '2024-04-01'
GROUP BY DATE(created_at);

-- 인덱스 활용 가능 → range 스캔
-- 실행 시간: 0.05초 (42배 개선!)

-- 💡 핵심 원칙:
-- 컬럼에 함수를 적용하지 말고, 값 쪽을 변환하라!`})})]}),e.jsx("h2",{children:"6. 사례 5: 락 경합과 트랜잭션 최적화"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Before — 데드락 빈발"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 문제: 재고 차감 시 락 경합
START TRANSACTION;
  -- 1. 재고 확인 (조회 시점과 차감 시점 사이에 다른 트랜잭션 개입 가능)
  SELECT stock FROM products WHERE id = 100;
  -- stock = 5

  -- 2. 재고 차감
  UPDATE products SET stock = stock - 1 WHERE id = 100;
  -- 다른 트랜잭션도 동시에 같은 행 수정 → 데드락!

  INSERT INTO orders (product_id, quantity) VALUES (100, 1);
COMMIT;`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"After — 원자적 업데이트"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 해결: 원자적 업데이트 (조회+수정을 하나의 UPDATE로)
START TRANSACTION;
  -- 1. 원자적 재고 차감 + 조건 체크
  UPDATE products
  SET stock = stock - 1
  WHERE id = 100 AND stock > 0;   -- 재고 있을 때만 차감
  -- affected_rows가 0이면 → 재고 부족

  -- 2. 차감 성공 시에만 주문 생성
  IF affected_rows > 0 THEN
    INSERT INTO orders (product_id, quantity) VALUES (100, 1);
  END IF;
COMMIT;

-- 💡 포인트:
-- 1. SELECT + UPDATE 분리 → 하나의 UPDATE로 통합
-- 2. WHERE 조건에 stock > 0 추가 → 음수 방지
-- 3. 트랜잭션 시간 최소화 → 락 점유 시간 감소`})})]}),e.jsx("h2",{children:"7. 종합 튜닝 체크리스트"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"단계"}),e.jsx("th",{children:"항목"}),e.jsx("th",{children:"확인"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{rowSpan:4,children:e.jsx("strong",{children:"쿼리"})}),e.jsx("td",{children:"SELECT * 대신 필요한 컬럼만 조회하는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"WHERE 조건이 Sargable한가? (컬럼에 함수 미적용)"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"상관 서브쿼리를 JOIN으로 변환했는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"N+1 문제가 없는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{rowSpan:4,children:e.jsx("strong",{children:"인덱스"})}),e.jsx("td",{children:"WHERE/JOIN/ORDER BY 컬럼에 적절한 인덱스가 있는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"복합 인덱스 순서가 최좌선 원칙을 따르는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"사용되지 않는 인덱스를 정리했는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"커버링 인덱스를 활용할 수 있는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{rowSpan:3,children:e.jsx("strong",{children:"서버"})}),e.jsx("td",{children:"Buffer Pool 적중률이 99% 이상인가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"커넥션 수가 적절한가? (CPU × 2 + 디스크)"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"슬로우 쿼리 로그를 활성화했는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{rowSpan:3,children:e.jsx("strong",{children:"설계"})}),e.jsx("td",{children:"적절한 정규화/비정규화가 되어 있는가?"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"데이터 타입이 최적인가? (VARCHAR(255) 남용 금지)"}),e.jsx("td",{children:"□"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"파티셔닝이 필요한 대용량 테이블은 없는가?"}),e.jsx("td",{children:"□"})]})]})]}),e.jsx("h2",{children:"8. 성능 개선 효과 요약"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"사례"}),e.jsx("th",{children:"Before"}),e.jsx("th",{children:"After"}),e.jsx("th",{children:"개선율"}),e.jsx("th",{children:"핵심 기법"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"게시판 목록"}),e.jsx("td",{children:"3.2초"}),e.jsx("td",{children:"0.003초"}),e.jsx("td",{children:"1,000배"}),e.jsx("td",{children:"복합 인덱스"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"회원 주문 통계"}),e.jsx("td",{children:"12초"}),e.jsx("td",{children:"0.15초"}),e.jsx("td",{children:"80배"}),e.jsx("td",{children:"서브쿼리 → JOIN"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"대용량 페이징"}),e.jsx("td",{children:"4.5초"}),e.jsx("td",{children:"0.002초"}),e.jsx("td",{children:"2,250배"}),e.jsx("td",{children:"커서 기반 페이징"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"월별 매출 집계"}),e.jsx("td",{children:"2.1초"}),e.jsx("td",{children:"0.05초"}),e.jsx("td",{children:"42배"}),e.jsx("td",{children:"Sargable 조건"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"재고 차감"}),e.jsx("td",{children:"데드락"}),e.jsx("td",{children:"정상"}),e.jsx("td",{children:"-"}),e.jsx("td",{children:"원자적 업데이트"})]})]})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"핵심 정리"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["튜닝은 ",e.jsx("strong",{children:"발견 → 분석 → 개선 → 테스트 → 측정"})," 5단계로 진행한다."]}),e.jsxs("li",{children:["대부분의 성능 문제는 ",e.jsx("strong",{children:"적절한 인덱스"}),"와 ",e.jsx("strong",{children:"쿼리 리팩토링"}),"으로 해결된다."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"EXPLAIN으로 실행 계획을 반드시 확인"}),"하고, Before/After를 비교하라."]}),e.jsxs("li",{children:["트랜잭션은 ",e.jsx("strong",{children:"최소한의 범위"}),"로, 락 점유 시간을 줄여라."]}),e.jsxs("li",{children:["튜닝은 한 번이 아니라 ",e.jsx("strong",{children:"지속적으로 모니터링하고 개선"}),"하는 과정이다."]})]})]}),e.jsxs("div",{className:"exercise-box",children:[e.jsx("h3",{children:"종합 실습"}),e.jsxs("p",{children:[e.jsx("strong",{children:"실습 1."})," 슬로우 쿼리 로그를 활성화하고, 느린 쿼리를 찾아 EXPLAIN으로 분석하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"실습 2."})," 상관 서브쿼리를 사용하는 쿼리를 작성한 뒤, JOIN으로 변환하고 성능을 비교하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"실습 3."})," 100만 건 테이블에서 OFFSET 페이징과 커서 기반 페이징의 성능을 비교하세요."]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/tuning/server",className:"lesson-nav-btn prev",children:"← DB 서버 튜닝"}),e.jsx(s,{to:"/references",className:"lesson-nav-btn next",children:"참고자료 →"})]})]})})})]});export{r as default};
