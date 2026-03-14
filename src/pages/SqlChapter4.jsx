import { Link } from 'react-router-dom';

const SqlChapter4 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>04. 정렬과 제한</h1>
        <p>ORDER BY, LIMIT, OFFSET, DISTINCT</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>ORDER BY를 사용하여 결과를 정렬한다.</li>
              <li>ASC(오름차순)와 DESC(내림차순)를 구분한다.</li>
              <li>LIMIT로 결과 행 수를 제한한다.</li>
              <li>OFFSET으로 페이징(Paging)을 구현한다.</li>
            </ul>
          </div>

          <h2>1. ORDER BY — 정렬</h2>

          <h3>1.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`SELECT 컬럼1, 컬럼2
FROM 테이블명
ORDER BY 정렬기준컬럼 [ASC | DESC];

-- ASC  : 오름차순 (기본값, 생략 가능)
-- DESC : 내림차순`}</code></pre>
          </div>

          <h3>1.2 오름차순 정렬 (ASC)</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 나이 오름차순 (작은 값 → 큰 값)
SELECT name, age
FROM students
ORDER BY age ASC;

-- ASC는 기본값이므로 생략 가능
SELECT name, age
FROM students
ORDER BY age;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+--------+------+
| name   | age  |
+--------+------+
| 홍길동 |   20 |
| 박민지 |   20 |
| 윤서연 |   20 |
| 김영희 |   21 |
| 최지우 |   21 |
| 이철수 |   22 |
| 강동원 |   22 |
| 정수현 |   23 |
+--------+------+`}</code></pre>
          </div>

          <h3>1.3 내림차순 정렬 (DESC)</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학점 내림차순 (높은 학점 → 낮은 학점)
SELECT name, grade
FROM students
ORDER BY grade DESC;`}</code></pre>
          </div>

          <h3>1.4 다중 컬럼 정렬</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전공별 오름차순 → 같은 전공 내에서 학점 내림차순
SELECT name, major, grade
FROM students
ORDER BY major ASC, grade DESC;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+--------+------------+-------+
| name   | major      | grade |
+--------+------------+-------+
| 김영희 | 경영학     |  3.80 |   ← 경영학 내 학점 높은 순
| 최지우 | 경영학     |  3.60 |
| 박민지 | 컴퓨터공학 |  3.90 |   ← 컴퓨터공학 내 학점 높은 순
| 홍길동 | 컴퓨터공학 |  3.50 |
| 강동원 | 컴퓨터공학 |  3.10 |
| ...                         |
+--------+------------+-------+`}</code></pre>
          </div>

          <h3>1.5 컬럼 번호로 정렬</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- SELECT에서 2번째 컬럼(major) 기준 정렬
SELECT name, major, grade
FROM students
ORDER BY 2 ASC, 3 DESC;
-- ORDER BY major ASC, grade DESC; 와 동일

-- ※ 가독성이 떨어지므로 컬럼 이름 사용을 권장`}</code></pre>
          </div>

          <h2>2. LIMIT — 결과 수 제한</h2>

          <h3>2.1 기본 사용법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 상위 3명만 조회
SELECT name, grade
FROM students
ORDER BY grade DESC
LIMIT 3;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+--------+-------+
| name   | grade |
+--------+-------+
| 박민지 |  3.90 |
| 김영희 |  3.80 |
| 윤서연 |  3.70 |
+--------+-------+`}</code></pre>
          </div>

          <h3>2.2 OFFSET — 건너뛰기</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학점 상위 4~6번째 학생 (3개 건너뛰고 3개 조회)
SELECT name, grade
FROM students
ORDER BY grade DESC
LIMIT 3 OFFSET 3;

-- 또는 LIMIT offset, count 형태
SELECT name, grade
FROM students
ORDER BY grade DESC
LIMIT 3, 3;  -- OFFSET 3, LIMIT 3과 동일`}</code></pre>
          </div>

          <h3>2.3 페이징(Paging) 구현</h3>
          <p>
            게시판, 검색 결과 등에서 <strong>페이지 번호</strong>별로 데이터를 나누어 보여줄 때 LIMIT과 OFFSET을 사용합니다.
          </p>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 한 페이지에 3명씩 표시할 때:
-- 1페이지: OFFSET 0
SELECT * FROM students ORDER BY id LIMIT 3 OFFSET 0;

-- 2페이지: OFFSET 3
SELECT * FROM students ORDER BY id LIMIT 3 OFFSET 3;

-- 3페이지: OFFSET 6
SELECT * FROM students ORDER BY id LIMIT 3 OFFSET 6;

-- 공식: OFFSET = (페이지번호 - 1) × 페이지크기`}</code></pre>
          </div>

          <h2>3. 실전 활용 예제</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학점 TOP 3 학생 (이름, 전공, 학점)
SELECT name, major, grade
FROM students
ORDER BY grade DESC
LIMIT 3;

-- 가장 최근 입학한 학생 5명
SELECT name, enrolled
FROM students
ORDER BY enrolled DESC
LIMIT 5;

-- 컴퓨터공학 학생을 이름순으로 정렬
SELECT name, grade
FROM students
WHERE major = '컴퓨터공학'
ORDER BY name ASC;

-- 학점이 3.0 이상인 학생을 학점 높은 순으로 상위 3명
SELECT name, major, grade
FROM students
WHERE grade >= 3.0
ORDER BY grade DESC
LIMIT 3;`}</code></pre>
          </div>

          <h2>4. 정렬 시 NULL 처리</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- MySQL에서 NULL은 가장 작은 값으로 취급
-- ASC : NULL이 맨 앞에 위치
-- DESC: NULL이 맨 뒤에 위치

-- NULL을 맨 뒤로 보내려면:
SELECT name, age
FROM students
ORDER BY age IS NULL ASC, age ASC;
-- IS NULL이 0(FALSE=NOT NULL)인 행이 먼저, 1(TRUE=NULL)인 행이 나중에`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>ORDER BY</strong>는 결과를 정렬한다. ASC(오름차순, 기본), DESC(내림차순).</li>
              <li>여러 컬럼으로 정렬할 때 <strong>앞의 컬럼이 우선</strong> 적용된다.</li>
              <li><strong>LIMIT N</strong>은 상위 N개 행만 반환한다.</li>
              <li><strong>OFFSET M</strong>은 M개 행을 건너뛰고 결과를 반환한다.</li>
              <li>페이징 공식: <strong>OFFSET = (페이지 - 1) × 페이지크기</strong></li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> 학생을 나이순(오름차순)으로 정렬하고, 나이가 같으면 이름 가나다순으로 정렬하세요.</p>
            <p><strong>문제 2.</strong> 학점이 가장 높은 학생 1명의 이름과 학점을 조회하세요.</p>
            <p><strong>문제 3.</strong> 한 페이지에 2명씩 보여줄 때, 3페이지에 해당하는 학생을 조회하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/where" className="lesson-nav-btn prev">&larr; WHERE 조건절</Link>
            <Link to="/sql/function" className="lesson-nav-btn next">함수와 표현식 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter4;
