import { Link } from 'react-router-dom';

const SqlChapter9 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>09. JOIN</h1>
        <p>INNER, LEFT, RIGHT, FULL OUTER, CROSS, Self JOIN</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>JOIN의 개념과 필요성을 이해한다.</li>
              <li>INNER JOIN, LEFT JOIN, RIGHT JOIN의 차이를 구분한다.</li>
              <li>CROSS JOIN과 Self JOIN을 사용한다.</li>
              <li>여러 테이블을 결합하여 원하는 데이터를 조회한다.</li>
            </ul>
          </div>

          <h2>1. JOIN이란?</h2>

          <p>
            <strong>JOIN</strong>은 두 개 이상의 테이블을 <strong>공통 컬럼</strong>을 기준으로 결합하여
            하나의 결과 집합으로 만드는 연산입니다. 관계형 데이터베이스에서 가장 중요한 개념 중 하나입니다.
          </p>

          <div className="code-block">
            <div className="code-header">JOIN이 필요한 상황</div>
            <pre><code>{`-- 수강 내역을 조회하면 학생 id와 과목 id만 보임
SELECT * FROM enrollments;
-- student_id=1, course_id=1, score=85 → 누가 무슨 과목?

-- JOIN으로 학생 이름과 과목 이름을 함께 조회
SELECT s.name, c.title, e.score
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id;
-- 홍길동, 데이터베이스, 85 → 훨씬 유용한 정보!`}</code></pre>
          </div>

          <h2>2. INNER JOIN</h2>

          <h3>2.1 개념</h3>
          <p>
            두 테이블에서 <strong>조건이 일치하는 행만</strong> 반환합니다.
            교집합과 유사합니다.
          </p>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 기본 문법
SELECT 컬럼 목록
FROM 테이블A
INNER JOIN 테이블B ON 테이블A.컬럼 = 테이블B.컬럼;

-- INNER는 생략 가능
SELECT 컬럼 목록
FROM 테이블A
JOIN 테이블B ON 테이블A.컬럼 = 테이블B.컬럼;`}</code></pre>
          </div>

          <h3>2.2 실전 예제</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학생별 수강 과목과 점수
SELECT s.name AS 학생명,
       c.title AS 과목명,
       e.score AS 점수
FROM enrollments e
INNER JOIN students s ON e.student_id = s.id
INNER JOIN courses c ON e.course_id = c.id
ORDER BY s.name, c.title;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+--------+--------------+------+
| 학생명 | 과목명       | 점수 |
+--------+--------------+------+
| 강동원 | 데이터베이스 |   78 |
| 강동원 | 자료구조     |   80 |
| 김영희 | 경영학원론   |   88 |
| 김영희 | 데이터베이스 |   75 |
| 박민지 | 데이터베이스 |   95 |
| 박민지 | 웹프로그래밍 |   92 |
| ...                          |
+--------+--------------+------+`}</code></pre>
          </div>

          <h2>3. LEFT JOIN (LEFT OUTER JOIN)</h2>

          <h3>3.1 개념</h3>
          <p>
            <strong>왼쪽 테이블의 모든 행</strong>을 반환하고, 오른쪽 테이블에서 일치하는 행이 없으면 <strong>NULL</strong>로 채웁니다.
          </p>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 모든 학생 + 수강 정보 (수강 안 한 학생도 포함)
SELECT s.name AS 학생명,
       c.title AS 과목명,
       e.score AS 점수
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN courses c ON e.course_id = c.id
ORDER BY s.name;`}</code></pre>
          </div>
          <p>
            수강 내역이 없는 학생도 결과에 포함되며, 과목명과 점수는 <strong>NULL</strong>로 표시됩니다.
          </p>

          <h3>3.2 LEFT JOIN으로 "없는 데이터" 찾기</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 아무 과목도 수강하지 않은 학생 찾기
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
WHERE e.id IS NULL;`}</code></pre>
          </div>

          <h2>4. RIGHT JOIN (RIGHT OUTER JOIN)</h2>

          <p>
            LEFT JOIN의 반대로, <strong>오른쪽 테이블의 모든 행</strong>을 반환합니다.
            실무에서는 LEFT JOIN이 더 많이 사용됩니다.
          </p>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 모든 과목 + 수강 학생 (수강생 없는 과목도 포함)
SELECT c.title AS 과목명,
       s.name AS 학생명,
       e.score AS 점수
FROM enrollments e
RIGHT JOIN courses c ON e.course_id = c.id
LEFT JOIN students s ON e.student_id = s.id
ORDER BY c.title;`}</code></pre>
          </div>

          <h2>5. CROSS JOIN</h2>

          <p>
            두 테이블의 <strong>모든 행의 조합</strong>(카르테시안 곱)을 반환합니다.
            조건 없이 모든 가능한 조합을 생성합니다.
          </p>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 모든 학생 × 모든 과목 조합
SELECT s.name, c.title
FROM students s
CROSS JOIN courses c;
-- 학생 8명 × 과목 5개 = 40행

-- 활용: 빈 시간표 생성
SELECT s.name, c.title, NULL AS score
FROM students s
CROSS JOIN courses c;`}</code></pre>
          </div>

          <h2>6. Self JOIN</h2>

          <p>
            같은 테이블을 자기 자신과 조인하는 것입니다.
            <strong>별칭</strong>을 사용하여 두 개의 다른 테이블처럼 취급합니다.
          </p>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 같은 전공의 다른 학생 쌍 찾기
SELECT a.name AS 학생1,
       b.name AS 학생2,
       a.major AS 전공
FROM students a
JOIN students b ON a.major = b.major AND a.id < b.id;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+---------+---------+------------+
| 학생1   | 학생2   | 전공       |
+---------+---------+------------+
| 홍길동  | 박민지  | 컴퓨터공학 |
| 홍길동  | 강동원  | 컴퓨터공학 |
| 박민지  | 강동원  | 컴퓨터공학 |
| 김영희  | 최지우  | 경영학     |
+---------+---------+------------+`}</code></pre>
          </div>

          <h2>7. JOIN 종류 비교</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>JOIN 종류</th><th>반환 행</th><th>사용 시나리오</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>INNER JOIN</strong></td><td>양쪽 모두 일치하는 행</td><td>두 테이블 모두에 있는 데이터 조회</td></tr>
              <tr><td><strong>LEFT JOIN</strong></td><td>왼쪽 전체 + 오른쪽 일치</td><td>왼쪽 기준으로 오른쪽 데이터 붙이기</td></tr>
              <tr><td><strong>RIGHT JOIN</strong></td><td>오른쪽 전체 + 왼쪽 일치</td><td>오른쪽 기준으로 왼쪽 데이터 붙이기</td></tr>
              <tr><td><strong>CROSS JOIN</strong></td><td>모든 조합 (곱집합)</td><td>가능한 모든 조합 생성</td></tr>
              <tr><td><strong>Self JOIN</strong></td><td>같은 테이블 내 관계</td><td>계층 구조, 같은 그룹 찾기</td></tr>
            </tbody>
          </table>

          <h2>8. 다중 테이블 JOIN</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학생 이름, 과목명, 교수명, 점수를 한 번에 조회
SELECT s.name AS 학생명,
       c.title AS 과목명,
       c.professor AS 교수명,
       e.score AS 점수,
       e.semester AS 학기
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE e.semester = '2024-1'
ORDER BY s.name;`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>INNER JOIN</strong>: 양쪽 테이블에 일치하는 행만 반환 (교집합).</li>
              <li><strong>LEFT JOIN</strong>: 왼쪽 전체 + 오른쪽 일치하는 행 (없으면 NULL).</li>
              <li><strong>CROSS JOIN</strong>: 모든 행의 조합 (카르테시안 곱).</li>
              <li><strong>Self JOIN</strong>: 같은 테이블을 별칭으로 두 번 사용하여 조인.</li>
              <li>테이블 <strong>별칭</strong>을 사용하면 JOIN 쿼리가 훨씬 간결해진다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> students와 enrollments를 JOIN하여 각 학생의 수강 과목 수를 조회하세요.</p>
            <p><strong>문제 2.</strong> LEFT JOIN을 사용하여 수강 신청을 하지 않은 학생을 찾으세요.</p>
            <p><strong>문제 3.</strong> 학생 이름, 과목명, 점수를 조회하되, 점수가 80 이상인 것만 표시하세요 (3개 테이블 JOIN).</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/ddl" className="lesson-nav-btn prev">&larr; 테이블 정의 (DDL)</Link>
            <Link to="/sql/subquery" className="lesson-nav-btn next">서브쿼리 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter9;
