import { Link } from 'react-router-dom';

const TuningCaseStudy = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>튜닝 실전 사례</h1>
        <p>슬로우 쿼리 분석, Before/After, 튜닝 체크리스트</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>실전 슬로우 쿼리를 분석하고 개선하는 과정을 학습한다.</li>
              <li>Before/After 비교로 튜닝 효과를 측정한다.</li>
              <li>단계별 튜닝 프로세스를 체득한다.</li>
              <li>튜닝 체크리스트로 체계적으로 점검한다.</li>
            </ul>
          </div>

          <h2>1. 튜닝 프로세스</h2>

          <div className="code-block">
            <div className="code-header">DB 튜닝 5단계 프로세스</div>
            <pre><code>{`1️⃣ 문제 발견
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
   └─ 모니터링 지속`}</code></pre>
          </div>

          <h2>2. 사례 1: 게시판 목록 조회 (풀스캔 → 인덱스)</h2>

          <div className="code-block">
            <div className="code-header">Before — 3.2초 (풀 테이블 스캔)</div>
            <pre><code>{`-- 문제 쿼리: 게시판 목록 최신순 조회 (100만 행)
SELECT id, title, author, created_at, view_count
FROM posts
WHERE board_id = 5 AND status = 'active'
ORDER BY created_at DESC
LIMIT 20;

-- EXPLAIN 결과:
-- type: ALL          ← 풀 테이블 스캔!
-- rows: 1,048,576    ← 100만 행 전부 스캔
-- Extra: Using where; Using filesort  ← 정렬까지 추가!
-- 실행 시간: 3.2초`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">After — 0.003초 (복합 인덱스 + 커버링)</div>
            <pre><code>{`-- 해결: 복합 인덱스 생성 (등호 조건 → 범위/정렬 순서)
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
-- 3. 인덱스 정렬과 쿼리 정렬이 일치 → filesort 불필요`}</code></pre>
          </div>

          <h2>3. 사례 2: 회원별 주문 통계 (N+1 → JOIN)</h2>

          <div className="code-block">
            <div className="code-header">Before — 12초 (N+1 서브쿼리)</div>
            <pre><code>{`-- 문제 쿼리: 회원별 총 주문 금액 (회원 5만 명)
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
-- 실행 시간: 12초`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">After — 0.15초 (JOIN + GROUP BY)</div>
            <pre><code>{`-- 해결: LEFT JOIN + GROUP BY로 한 번에 집계
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
-- 3. orders.user_id에 인덱스 추가`}</code></pre>
          </div>

          <h2>4. 사례 3: 대용량 페이징 (OFFSET → 커서)</h2>

          <div className="code-block">
            <div className="code-header">Before — 4.5초 (큰 OFFSET)</div>
            <pre><code>{`-- 문제 쿼리: 5000페이지 (100만 행 테이블)
SELECT * FROM products
ORDER BY id DESC
LIMIT 20 OFFSET 100000;

-- 실행 시간: 4.5초 (100,020행 읽고 100,000행 버림)
-- OFFSET이 커질수록 선형적으로 느려짐`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">After — 0.002초 (커서 기반 페이징)</div>
            <pre><code>{`-- 해결: 커서 기반 페이징
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
-- }`}</code></pre>
          </div>

          <h2>5. 사례 4: 날짜 함수로 인덱스 무시</h2>

          <div className="code-block">
            <div className="code-header">Before — 2.1초</div>
            <pre><code>{`-- 문제: 이번 달 매출 집계
SELECT DATE(created_at) AS sale_date, SUM(amount) AS daily_total
FROM sales
WHERE YEAR(created_at) = 2024 AND MONTH(created_at) = 3
GROUP BY DATE(created_at);

-- created_at에 인덱스가 있지만...
-- YEAR(), MONTH() 함수 때문에 인덱스 무시! → 풀스캔
-- 실행 시간: 2.1초`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">After — 0.05초</div>
            <pre><code>{`-- 해결: 범위 조건으로 변경
SELECT DATE(created_at) AS sale_date, SUM(amount) AS daily_total
FROM sales
WHERE created_at >= '2024-03-01'
  AND created_at <  '2024-04-01'
GROUP BY DATE(created_at);

-- 인덱스 활용 가능 → range 스캔
-- 실행 시간: 0.05초 (42배 개선!)

-- 💡 핵심 원칙:
-- 컬럼에 함수를 적용하지 말고, 값 쪽을 변환하라!`}</code></pre>
          </div>

          <h2>6. 사례 5: 락 경합과 트랜잭션 최적화</h2>

          <div className="code-block">
            <div className="code-header">Before — 데드락 빈발</div>
            <pre><code>{`-- 문제: 재고 차감 시 락 경합
START TRANSACTION;
  -- 1. 재고 확인 (조회 시점과 차감 시점 사이에 다른 트랜잭션 개입 가능)
  SELECT stock FROM products WHERE id = 100;
  -- stock = 5

  -- 2. 재고 차감
  UPDATE products SET stock = stock - 1 WHERE id = 100;
  -- 다른 트랜잭션도 동시에 같은 행 수정 → 데드락!

  INSERT INTO orders (product_id, quantity) VALUES (100, 1);
COMMIT;`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">After — 원자적 업데이트</div>
            <pre><code>{`-- 해결: 원자적 업데이트 (조회+수정을 하나의 UPDATE로)
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
-- 3. 트랜잭션 시간 최소화 → 락 점유 시간 감소`}</code></pre>
          </div>

          <h2>7. 종합 튜닝 체크리스트</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>단계</th><th>항목</th><th>확인</th></tr>
            </thead>
            <tbody>
              <tr><td rowSpan="4"><strong>쿼리</strong></td><td>SELECT * 대신 필요한 컬럼만 조회하는가?</td><td>□</td></tr>
              <tr><td>WHERE 조건이 Sargable한가? (컬럼에 함수 미적용)</td><td>□</td></tr>
              <tr><td>상관 서브쿼리를 JOIN으로 변환했는가?</td><td>□</td></tr>
              <tr><td>N+1 문제가 없는가?</td><td>□</td></tr>
              <tr><td rowSpan="4"><strong>인덱스</strong></td><td>WHERE/JOIN/ORDER BY 컬럼에 적절한 인덱스가 있는가?</td><td>□</td></tr>
              <tr><td>복합 인덱스 순서가 최좌선 원칙을 따르는가?</td><td>□</td></tr>
              <tr><td>사용되지 않는 인덱스를 정리했는가?</td><td>□</td></tr>
              <tr><td>커버링 인덱스를 활용할 수 있는가?</td><td>□</td></tr>
              <tr><td rowSpan="3"><strong>서버</strong></td><td>Buffer Pool 적중률이 99% 이상인가?</td><td>□</td></tr>
              <tr><td>커넥션 수가 적절한가? (CPU × 2 + 디스크)</td><td>□</td></tr>
              <tr><td>슬로우 쿼리 로그를 활성화했는가?</td><td>□</td></tr>
              <tr><td rowSpan="3"><strong>설계</strong></td><td>적절한 정규화/비정규화가 되어 있는가?</td><td>□</td></tr>
              <tr><td>데이터 타입이 최적인가? (VARCHAR(255) 남용 금지)</td><td>□</td></tr>
              <tr><td>파티셔닝이 필요한 대용량 테이블은 없는가?</td><td>□</td></tr>
            </tbody>
          </table>

          <h2>8. 성능 개선 효과 요약</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>사례</th><th>Before</th><th>After</th><th>개선율</th><th>핵심 기법</th></tr>
            </thead>
            <tbody>
              <tr><td>게시판 목록</td><td>3.2초</td><td>0.003초</td><td>1,000배</td><td>복합 인덱스</td></tr>
              <tr><td>회원 주문 통계</td><td>12초</td><td>0.15초</td><td>80배</td><td>서브쿼리 → JOIN</td></tr>
              <tr><td>대용량 페이징</td><td>4.5초</td><td>0.002초</td><td>2,250배</td><td>커서 기반 페이징</td></tr>
              <tr><td>월별 매출 집계</td><td>2.1초</td><td>0.05초</td><td>42배</td><td>Sargable 조건</td></tr>
              <tr><td>재고 차감</td><td>데드락</td><td>정상</td><td>-</td><td>원자적 업데이트</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li>튜닝은 <strong>발견 → 분석 → 개선 → 테스트 → 측정</strong> 5단계로 진행한다.</li>
              <li>대부분의 성능 문제는 <strong>적절한 인덱스</strong>와 <strong>쿼리 리팩토링</strong>으로 해결된다.</li>
              <li><strong>EXPLAIN으로 실행 계획을 반드시 확인</strong>하고, Before/After를 비교하라.</li>
              <li>트랜잭션은 <strong>최소한의 범위</strong>로, 락 점유 시간을 줄여라.</li>
              <li>튜닝은 한 번이 아니라 <strong>지속적으로 모니터링하고 개선</strong>하는 과정이다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>종합 실습</h3>
            <p><strong>실습 1.</strong> 슬로우 쿼리 로그를 활성화하고, 느린 쿼리를 찾아 EXPLAIN으로 분석하세요.</p>
            <p><strong>실습 2.</strong> 상관 서브쿼리를 사용하는 쿼리를 작성한 뒤, JOIN으로 변환하고 성능을 비교하세요.</p>
            <p><strong>실습 3.</strong> 100만 건 테이블에서 OFFSET 페이징과 커서 기반 페이징의 성능을 비교하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/tuning/server" className="lesson-nav-btn prev">&larr; DB 서버 튜닝</Link>
            <Link to="/references" className="lesson-nav-btn next">참고자료 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default TuningCaseStudy;
