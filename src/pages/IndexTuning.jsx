import { Link } from 'react-router-dom';

const IndexTuning = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>인덱스 튜닝</h1>
        <p>B-Tree, 복합 인덱스, 커버링 인덱스, 인덱스 설계 전략</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>인덱스의 내부 구조(B-Tree)를 이해한다.</li>
              <li>단일 인덱스와 복합 인덱스의 차이와 설계 원칙을 파악한다.</li>
              <li>커버링 인덱스로 성능을 극대화하는 방법을 익힌다.</li>
              <li>인덱스가 무시되는 상황과 해결법을 학습한다.</li>
            </ul>
          </div>

          <h2>1. 인덱스 기본 개념</h2>

          <p>
            <strong>인덱스(Index)</strong>는 테이블의 데이터를 빠르게 찾기 위한 <strong>자료 구조</strong>입니다.
            책의 목차처럼, 전체 데이터를 순회하지 않고 원하는 데이터의 위치를 빠르게 찾아갑니다.
          </p>

          <div className="code-block">
            <div className="code-header">인덱스 없이 vs 있을 때</div>
            <pre><code>{`-- 인덱스 없이: 풀 테이블 스캔 (100만 행 전부 확인)
SELECT * FROM students WHERE major = '컴퓨터공학';
-- → 100만 행 순차 스캔 → 약 2초

-- 인덱스 있을 때: B-Tree 탐색 (3~4단계만에 도달)
CREATE INDEX idx_major ON students(major);
SELECT * FROM students WHERE major = '컴퓨터공학';
-- → 인덱스로 50행 직접 접근 → 약 0.01초 (200배 빠름!)`}</code></pre>
          </div>

          <h2>2. B-Tree 인덱스 구조</h2>

          <div className="code-block">
            <div className="code-header">B-Tree 구조 시각화</div>
            <pre><code>{`                    [루트 노드]
                  /      |      \\
            [가-나]   [다-라]   [마-바]     ← 브랜치 노드
           /   |     /   |     /   |
        [가영] [나영] [다영] [라영] [마영] [바영]  ← 리프 노드
        ↓      ↓      ↓      ↓      ↓      ↓
      실제 행  실제 행  실제 행  실제 행  실제 행  실제 행

특징:
• 리프 노드는 실제 데이터 행의 위치(포인터)를 저장
• 리프 노드끼리 링크드 리스트로 연결 → 범위 검색 효율적
• 트리 깊이 3~4 수준 → 수천만 행도 3~4번 비교로 탐색
• 정렬된 상태 유지 → ORDER BY 최적화 가능`}</code></pre>
          </div>

          <h2>3. 인덱스 종류</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>종류</th><th>생성 방법</th><th>특징</th><th>사용 예</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>PRIMARY KEY</strong></td><td>자동 생성</td><td>클러스터드 인덱스, NOT NULL, UNIQUE</td><td>id 컬럼</td></tr>
              <tr><td><strong>UNIQUE</strong></td><td>CREATE UNIQUE INDEX</td><td>중복 불허, NULL 허용</td><td>email, 주민번호</td></tr>
              <tr><td><strong>일반(Non-Unique)</strong></td><td>CREATE INDEX</td><td>중복 허용</td><td>major, status</td></tr>
              <tr><td><strong>복합(Composite)</strong></td><td>CREATE INDEX (a, b, c)</td><td>여러 컬럼 조합</td><td>(major, grade)</td></tr>
              <tr><td><strong>FULLTEXT</strong></td><td>CREATE FULLTEXT INDEX</td><td>전문 검색용</td><td>게시글 본문 검색</td></tr>
              <tr><td><strong>SPATIAL</strong></td><td>CREATE SPATIAL INDEX</td><td>공간 데이터용</td><td>좌표, 위치 데이터</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">인덱스 생성/조회/삭제</div>
            <pre><code>{`-- 단일 인덱스 생성
CREATE INDEX idx_major ON students(major);

-- 복합 인덱스 생성
CREATE INDEX idx_major_grade ON students(major, grade);

-- UNIQUE 인덱스
CREATE UNIQUE INDEX idx_email ON students(email);

-- 테이블의 인덱스 목록 확인
SHOW INDEX FROM students;

-- 인덱스 삭제
DROP INDEX idx_major ON students;
ALTER TABLE students DROP INDEX idx_major;

-- 인덱스 크기 확인
SELECT
    table_name,
    index_name,
    ROUND(stat_value * @@innodb_page_size / 1024 / 1024, 2) AS size_mb
FROM mysql.innodb_index_stats
WHERE database_name = 'school'
  AND stat_name = 'size';`}</code></pre>
          </div>

          <h2>4. 복합 인덱스와 컬럼 순서</h2>

          <div className="code-block">
            <div className="code-header">복합 인덱스 — 최좌선 원칙(Leftmost Prefix)</div>
            <pre><code>{`-- 복합 인덱스: (major, grade, age)
CREATE INDEX idx_m_g_a ON students(major, grade, age);

-- ✅ 인덱스 사용됨 (왼쪽부터 순서대로 사용)
WHERE major = '컴퓨터공학'                          -- major ✅
WHERE major = '컴퓨터공학' AND grade >= 3.5          -- major + grade ✅
WHERE major = '컴퓨터공학' AND grade >= 3.5 AND age > 20  -- 전부 사용 ✅

-- ❌ 인덱스 사용 안 됨 (왼쪽 컬럼 건너뜀)
WHERE grade >= 3.5                                  -- major 건너뜀 ❌
WHERE age > 20                                      -- major, grade 건너뜀 ❌
WHERE grade >= 3.5 AND age > 20                     -- major 건너뜀 ❌

-- ⚠️ 부분 사용 (major만 인덱스 사용)
WHERE major = '컴퓨터공학' AND age > 20              -- grade 건너뜀, age 미사용`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">복합 인덱스 설계 원칙</div>
            <pre><code>{`복합 인덱스 컬럼 순서 결정 기준:

1️⃣ 등호(=) 조건 컬럼을 앞에 배치
   WHERE status = 'active' AND created_at > '2024-01-01'
   → INDEX (status, created_at)  ✅
   → INDEX (created_at, status)  ❌

2️⃣ 카디널리티(고유값 수)가 높은 컬럼을 앞에
   → user_id(10만 종류) > status(3종류) > gender(2종류)

3️⃣ 범위 조건(<, >, BETWEEN)은 뒤에 배치
   WHERE department = '개발팀' AND salary > 5000
   → INDEX (department, salary)  ✅

4️⃣ ORDER BY / GROUP BY 컬럼도 고려
   WHERE status = 'active' ORDER BY created_at DESC
   → INDEX (status, created_at)  ✅ filesort 방지`}</code></pre>
          </div>

          <h2>5. 커버링 인덱스</h2>

          <div className="code-block">
            <div className="code-header">커버링 인덱스 — 테이블 접근 없이 인덱스만으로 응답</div>
            <pre><code>{`-- 인덱스: (major, grade)
CREATE INDEX idx_major_grade ON students(major, grade);

-- ✅ 커버링 인덱스 (Extra: Using index)
-- major와 grade만 조회 → 인덱스에 모든 데이터 있음 → 테이블 접근 불필요!
SELECT major, grade FROM students WHERE major = '컴퓨터공학';
-- EXPLAIN → Extra: Using index ← 커버링 인덱스!

-- ❌ 커버링 인덱스 아님 (name은 인덱스에 없음)
SELECT name, major, grade FROM students WHERE major = '컴퓨터공학';
-- EXPLAIN → Extra: NULL ← 테이블도 접근해야 함

-- 💡 커버링 인덱스 효과
-- 일반 인덱스: 인덱스 탐색 → 테이블 랜덤 I/O (느림)
-- 커버링 인덱스: 인덱스 탐색만으로 완료 (2~5배 빠름)`}</code></pre>
          </div>

          <h2>6. 인덱스가 무시되는 경우</h2>

          <div className="code-block">
            <div className="code-header">인덱스를 타지 않는 안티 패턴</div>
            <pre><code>{`-- 인덱스: idx_name ON students(name)
-- 인덱스: idx_age ON students(age)
-- 인덱스: idx_grade ON students(grade)

-- ❌ 1. 컬럼에 함수/연산 적용
WHERE YEAR(enrolled) = 2024           -- 함수 적용 → 풀스캔
WHERE age + 1 > 21                    -- 연산 적용 → 풀스캔
-- ✅ 해결:
WHERE enrolled >= '2024-01-01' AND enrolled < '2025-01-01'
WHERE age > 20

-- ❌ 2. 암묵적 타입 변환
WHERE phone = 01012345678             -- 문자열 컬럼에 숫자 비교
-- ✅ 해결:
WHERE phone = '01012345678'

-- ❌ 3. LIKE '%패턴' (와일드카드 앞에)
WHERE name LIKE '%길동'               -- 앞에 % → 풀스캔
-- ✅ 해결:
WHERE name LIKE '홍%'                 -- 뒤에만 % → 인덱스 사용

-- ❌ 4. OR 조건 (일부 컬럼에 인덱스 없을 때)
WHERE major = '컴공' OR name = '홍길동'  -- name에 인덱스 없으면 풀스캔
-- ✅ 해결:
WHERE major = '컴공'
UNION
WHERE name = '홍길동'                 -- 각각 인덱스 활용

-- ❌ 5. NOT IN, <>, != (부정 조건)
WHERE status != 'deleted'             -- 대부분의 행 → 옵티마이저가 풀스캔 선택
-- ✅ 해결:
WHERE status IN ('active', 'pending') -- 긍정 조건으로 변환

-- ❌ 6. IS NULL / IS NOT NULL (NULL이 많은 컬럼)
WHERE email IS NOT NULL               -- 대부분 NOT NULL이면 풀스캔`}</code></pre>
          </div>

          <h2>7. 인덱스 설계 체크리스트</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>체크</th></tr>
            </thead>
            <tbody>
              <tr><td>WHERE 절에 자주 사용되는 컬럼에 인덱스가 있는가?</td><td>□</td></tr>
              <tr><td>JOIN 조건 컬럼(FK)에 인덱스가 있는가?</td><td>□</td></tr>
              <tr><td>ORDER BY 컬럼이 인덱스와 일치하는가?</td><td>□</td></tr>
              <tr><td>복합 인덱스 컬럼 순서가 최좌선 원칙을 따르는가?</td><td>□</td></tr>
              <tr><td>SELECT 컬럼을 커버링 인덱스로 처리할 수 있는가?</td><td>□</td></tr>
              <tr><td>불필요하거나 중복된 인덱스는 없는가?</td><td>□</td></tr>
              <tr><td>컬럼에 함수/연산을 적용하여 인덱스를 무효화하고 있지 않은가?</td><td>□</td></tr>
              <tr><td>인덱스 크기가 테이블 대비 과도하지 않은가?</td><td>□</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>인덱스</strong>는 B-Tree 구조로 데이터를 빠르게 탐색한다.</li>
              <li><strong>복합 인덱스</strong>는 최좌선 원칙(Leftmost Prefix)을 따른다.</li>
              <li><strong>커버링 인덱스</strong>는 테이블 접근 없이 인덱스만으로 결과를 반환한다.</li>
              <li>컬럼에 <strong>함수/연산, 타입 변환, LIKE '%...'</strong>를 사용하면 인덱스가 무시된다.</li>
              <li>인덱스는 <strong>INSERT/UPDATE/DELETE 성능을 저하</strong>시키므로 필요한 만큼만 생성한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> 복합 인덱스 (a, b, c)에서 WHERE b = 1 AND c = 2 로 조회하면 인덱스를 사용하는지 설명하세요.</p>
            <p><strong>문제 2.</strong> 커버링 인덱스의 원리와 성능 이점을 설명하세요.</p>
            <p><strong>문제 3.</strong> WHERE YEAR(created_at) = 2024 가 인덱스를 사용하지 못하는 이유와 해결법을 제시하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/tuning/explain" className="lesson-nav-btn prev">&larr; 실행 계획 분석</Link>
            <Link to="/tuning/sql" className="lesson-nav-btn next">SQL 튜닝 기법 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default IndexTuning;
