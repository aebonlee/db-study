import { Link } from 'react-router-dom';

const SqlChapter6 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>6장. 데이터 집계</h1>
        <p>COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>집계 함수(COUNT, SUM, AVG, MIN, MAX)를 사용한다.</li>
              <li>GROUP BY로 그룹별 집계를 수행한다.</li>
              <li>HAVING으로 그룹 필터링을 한다.</li>
              <li>GROUP BY와 WHERE/HAVING의 차이를 이해한다.</li>
            </ul>
          </div>

          <h2>1. 집계 함수</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>함수</th><th>설명</th><th>NULL 처리</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>COUNT(*)</strong></td><td>전체 행 수</td><td>NULL 포함</td></tr>
              <tr><td><strong>COUNT(컬럼)</strong></td><td>NULL이 아닌 값의 수</td><td>NULL 제외</td></tr>
              <tr><td><strong>SUM(컬럼)</strong></td><td>합계</td><td>NULL 제외</td></tr>
              <tr><td><strong>AVG(컬럼)</strong></td><td>평균</td><td>NULL 제외</td></tr>
              <tr><td><strong>MIN(컬럼)</strong></td><td>최솟값</td><td>NULL 제외</td></tr>
              <tr><td><strong>MAX(컬럼)</strong></td><td>최댓값</td><td>NULL 제외</td></tr>
            </tbody>
          </table>

          <h3>1.1 기본 사용</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전체 학생 수
SELECT COUNT(*) AS 학생수 FROM students;
-- 결과: 8

-- 평균 학점
SELECT AVG(grade) AS 평균학점 FROM students;
-- 결과: 3.4500

-- 최고 학점 / 최저 학점
SELECT MAX(grade) AS 최고학점,
       MIN(grade) AS 최저학점
FROM students;
-- 결과: 3.90 / 2.80

-- 나이 합계
SELECT SUM(age) AS 나이합계 FROM students;`}</code></pre>
          </div>

          <h3>1.2 COUNT의 차이</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- COUNT(*): NULL 포함 전체 행 수
SELECT COUNT(*) FROM students;        -- 8

-- COUNT(컬럼): NULL 제외
SELECT COUNT(email) FROM students;    -- 이메일이 있는 학생 수

-- COUNT(DISTINCT 컬럼): 중복 제외
SELECT COUNT(DISTINCT major) FROM students;  -- 전공 종류 수: 5`}</code></pre>
          </div>

          <h2>2. GROUP BY — 그룹별 집계</h2>

          <h3>2.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`SELECT 그룹컬럼, 집계함수(컬럼)
FROM 테이블명
GROUP BY 그룹컬럼;`}</code></pre>
          </div>

          <h3>2.2 전공별 통계</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전공별 학생 수
SELECT major AS 전공,
       COUNT(*) AS 학생수
FROM students
GROUP BY major;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+------------+--------+
| 전공       | 학생수 |
+------------+--------+
| 컴퓨터공학 |      3 |
| 경영학     |      2 |
| 전자공학   |      1 |
| 수학과     |      1 |
| 디자인학   |      1 |
+------------+--------+`}</code></pre>
          </div>

          <h3>2.3 다양한 집계 예제</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전공별 평균 학점
SELECT major AS 전공,
       COUNT(*) AS 학생수,
       ROUND(AVG(grade), 2) AS 평균학점,
       MAX(grade) AS 최고학점,
       MIN(grade) AS 최저학점
FROM students
GROUP BY major;

-- 입학 연도별 학생 수
SELECT YEAR(enrolled) AS 입학연도,
       COUNT(*) AS 학생수
FROM students
GROUP BY YEAR(enrolled)
ORDER BY 입학연도;

-- 나이대별 학생 수
SELECT age, COUNT(*) AS 학생수
FROM students
GROUP BY age
ORDER BY age;`}</code></pre>
          </div>

          <h2>3. HAVING — 그룹 필터링</h2>

          <h3>3.1 HAVING vs WHERE</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>구분</th><th>WHERE</th><th>HAVING</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>실행 시점</strong></td><td>그룹화 전</td><td>그룹화 후</td></tr>
              <tr><td><strong>대상</strong></td><td>개별 행</td><td>그룹</td></tr>
              <tr><td><strong>집계 함수</strong></td><td>사용 불가</td><td>사용 가능</td></tr>
            </tbody>
          </table>

          <h3>3.2 HAVING 사용 예제</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 2명 이상인 전공만 표시
SELECT major, COUNT(*) AS 학생수
FROM students
GROUP BY major
HAVING COUNT(*) >= 2;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+------------+--------+
| major      | 학생수 |
+------------+--------+
| 컴퓨터공학 |      3 |
| 경영학     |      2 |
+------------+--------+`}</code></pre>
          </div>

          <h3>3.3 WHERE + GROUP BY + HAVING 조합</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학점 3.0 이상인 학생 중, 전공별 평균 학점이 3.5 이상인 전공
SELECT major AS 전공,
       COUNT(*) AS 학생수,
       ROUND(AVG(grade), 2) AS 평균학점
FROM students
WHERE grade >= 3.0           -- ① 개별 행 필터 (그룹화 전)
GROUP BY major               -- ② 그룹화
HAVING AVG(grade) >= 3.5     -- ③ 그룹 필터 (그룹화 후)
ORDER BY 평균학점 DESC;       -- ④ 정렬`}</code></pre>
          </div>

          <h2>4. GROUP BY 주의사항</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- ✗ 잘못된 쿼리: GROUP BY에 없는 컬럼을 SELECT에 사용
SELECT name, major, COUNT(*)
FROM students
GROUP BY major;
-- → name은 어떤 값을 보여줘야 할지 모호함 (에러 발생)

-- ✓ 올바른 쿼리: GROUP BY 컬럼 + 집계 함수만 SELECT
SELECT major, COUNT(*)
FROM students
GROUP BY major;

-- ✓ 올바른 쿼리: GROUP BY에 포함된 컬럼은 SELECT 가능
SELECT major, age, COUNT(*)
FROM students
GROUP BY major, age;`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>집계 함수</strong>: COUNT, SUM, AVG, MIN, MAX는 여러 행을 하나의 값으로 요약한다.</li>
              <li><strong>GROUP BY</strong>는 특정 컬럼의 값이 같은 행끼리 그룹화한다.</li>
              <li><strong>HAVING</strong>은 그룹화 후 조건을 필터링한다 (vs WHERE는 그룹화 전).</li>
              <li>SELECT에는 GROUP BY에 포함된 컬럼과 집계 함수만 사용 가능하다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> 전체 학생의 평균 나이와 평균 학점을 조회하세요.</p>
            <p><strong>문제 2.</strong> 전공별 학생 수와 평균 학점을 조회하되, 학생 수가 2명 이상인 전공만 표시하세요.</p>
            <p><strong>문제 3.</strong> 과목별 수강 학생 수와 평균 점수를 조회하세요 (enrollments 테이블 사용).</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/function" className="lesson-nav-btn prev">&larr; 함수와 표현식</Link>
            <Link to="/sql/dml" className="lesson-nav-btn next">데이터 조작 (DML) &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter6;
