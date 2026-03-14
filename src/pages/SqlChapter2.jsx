import { Link } from 'react-router-dom';

const SqlChapter2 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>02. SELECT 기초</h1>
        <p>SELECT, FROM, 컬럼 선택, 별칭(AS)</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>SELECT 문의 기본 구조를 이해한다.</li>
              <li>전체 컬럼 또는 특정 컬럼을 선택하여 조회한다.</li>
              <li>별칭(AS)을 사용하여 컬럼/테이블 이름을 변경한다.</li>
              <li>DISTINCT로 중복을 제거하여 조회한다.</li>
              <li>산술 연산과 문자열 연결을 수행한다.</li>
            </ul>
          </div>

          <h2>1. SELECT 문 기본 구조</h2>

          <h3>1.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SELECT 기본 문법</div>
            <pre><code>{`SELECT 컬럼1, 컬럼2, ...
FROM 테이블명;

-- 또는 전체 컬럼 조회
SELECT *
FROM 테이블명;`}</code></pre>
          </div>
          <p>
            <strong>SELECT</strong>는 데이터베이스에서 데이터를 <strong>조회(검색)</strong>하는 명령어입니다.
            가장 많이 사용되는 SQL 명령어이며, 데이터를 변경하지 않는 <strong>읽기 전용</strong> 작업입니다.
          </p>

          <h3>1.2 전체 컬럼 조회</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- students 테이블의 모든 컬럼 조회
SELECT *
FROM students;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+----+--------+------+------------+-------+------------+-------------------+
| id | name   | age  | major      | grade | enrolled   | email             |
+----+--------+------+------------+-------+------------+-------------------+
|  1 | 홍길동 |   20 | 컴퓨터공학 |  3.50 | 2023-03-02 | hong@school.ac.kr |
|  2 | 김영희 |   21 | 경영학     |  3.80 | 2022-03-02 | kim@school.ac.kr  |
|  3 | 이철수 |   22 | 전자공학   |  3.20 | 2021-03-02 | lee@school.ac.kr  |
| ...                                                                      |
+----+--------+------+------------+-------+------------+-------------------+`}</code></pre>
          </div>

          <h3>1.3 특정 컬럼 조회</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 이름과 전공만 조회
SELECT name, major
FROM students;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+--------+------------+
| name   | major      |
+--------+------------+
| 홍길동 | 컴퓨터공학 |
| 김영희 | 경영학     |
| 이철수 | 전자공학   |
| 박민지 | 컴퓨터공학 |
| ...                 |
+--------+------------+`}</code></pre>
          </div>

          <h2>2. 별칭 (AS)</h2>

          <h3>2.1 컬럼 별칭</h3>
          <p>
            <strong>AS</strong> 키워드를 사용하면 결과에 표시되는 컬럼 이름을 원하는 이름으로 바꿀 수 있습니다.
          </p>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 컬럼에 별칭 지정
SELECT name AS 이름,
       major AS 전공,
       grade AS 학점
FROM students;

-- AS 키워드 생략 가능
SELECT name 이름, major 전공
FROM students;

-- 공백이 포함된 별칭은 따옴표 사용
SELECT name AS "학생 이름",
       grade AS "평균 학점"
FROM students;`}</code></pre>
          </div>

          <h3>2.2 테이블 별칭</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 테이블에 별칭 지정 (JOIN에서 유용)
SELECT s.name, s.major
FROM students AS s;

-- AS 생략 가능
SELECT s.name, s.major
FROM students s;`}</code></pre>
          </div>

          <h2>3. DISTINCT — 중복 제거</h2>

          <h3>3.1 기본 사용법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전공 목록 (중복 포함)
SELECT major FROM students;
-- 결과: 컴퓨터공학, 경영학, 전자공학, 컴퓨터공학, 수학과, 경영학, 컴퓨터공학, 디자인학

-- 전공 목록 (중복 제거)
SELECT DISTINCT major FROM students;
-- 결과: 컴퓨터공학, 경영학, 전자공학, 수학과, 디자인학`}</code></pre>
          </div>

          <h3>3.2 여러 컬럼의 DISTINCT</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전공 + 나이 조합의 중복 제거
SELECT DISTINCT major, age
FROM students;
-- (컴퓨터공학, 20)과 (컴퓨터공학, 22)는 서로 다른 조합이므로 둘 다 표시`}</code></pre>
          </div>

          <h2>4. 산술 연산</h2>

          <h3>4.1 컬럼에 연산 적용</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학점을 4.5 만점으로 환산
SELECT name,
       grade AS "4.0 학점",
       grade * 1.125 AS "4.5 학점"
FROM students;

-- 나이 + 1 (내년 나이)
SELECT name,
       age AS 현재나이,
       age + 1 AS 내년나이
FROM students;`}</code></pre>
          </div>
          <p>
            사용 가능한 산술 연산자: <strong>+</strong>(더하기), <strong>-</strong>(빼기),
            <strong>*</strong>(곱하기), <strong>/</strong>(나누기), <strong>%</strong>(나머지)
          </p>

          <h2>5. NULL 값</h2>

          <h3>5.1 NULL이란?</h3>
          <p>
            <strong>NULL</strong>은 <strong>값이 없음</strong>을 나타내는 특수한 값입니다.
            0이나 빈 문자열('')과는 다릅니다. NULL과의 산술 연산 결과는 항상 NULL입니다.
          </p>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- NULL 확인
SELECT name, age
FROM students
WHERE age IS NULL;      -- NULL인 행 조회

SELECT name, age
FROM students
WHERE age IS NOT NULL;  -- NULL이 아닌 행 조회

-- 주의: WHERE age = NULL (X) → 항상 거짓
-- 올바른 방법: WHERE age IS NULL (O)`}</code></pre>
          </div>

          <h2>6. SQL 실행 순서</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>순서</th><th>절</th><th>역할</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td><strong>FROM</strong></td><td>데이터를 가져올 테이블 지정</td></tr>
              <tr><td>2</td><td><strong>WHERE</strong></td><td>조건에 맞는 행 필터링</td></tr>
              <tr><td>3</td><td><strong>GROUP BY</strong></td><td>그룹화</td></tr>
              <tr><td>4</td><td><strong>HAVING</strong></td><td>그룹 필터링</td></tr>
              <tr><td>5</td><td><strong>SELECT</strong></td><td>표시할 컬럼 선택</td></tr>
              <tr><td>6</td><td><strong>ORDER BY</strong></td><td>정렬</td></tr>
              <tr><td>7</td><td><strong>LIMIT</strong></td><td>결과 수 제한</td></tr>
            </tbody>
          </table>
          <p>
            SQL은 작성 순서(SELECT → FROM → WHERE ...)와 <strong>실행 순서</strong>가 다릅니다.
            FROM이 가장 먼저 실행되고, SELECT는 거의 마지막에 실행됩니다.
            이 때문에 SELECT에서 정의한 별칭을 WHERE에서 사용할 수 없습니다.
          </p>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>SELECT *</strong>은 전체 컬럼, <strong>SELECT 컬럼명</strong>은 특정 컬럼을 조회한다.</li>
              <li><strong>AS</strong>를 사용하여 컬럼이나 테이블에 별칭을 줄 수 있다.</li>
              <li><strong>DISTINCT</strong>는 조회 결과에서 중복을 제거한다.</li>
              <li><strong>NULL</strong>은 값이 없음을 의미하며, IS NULL / IS NOT NULL로 확인한다.</li>
              <li>SQL의 <strong>실행 순서</strong>는 작성 순서와 다르다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> students 테이블에서 학생의 이름과 이메일만 조회하세요.</p>
            <p><strong>문제 2.</strong> students 테이블에서 중복 없이 전공 목록을 조회하세요.</p>
            <p><strong>문제 3.</strong> students 테이블에서 이름(name)을 &quot;학생명&quot;, 학점(grade)을 &quot;GPA&quot;로 별칭을 지정하여 조회하세요.</p>
            <p><strong>문제 4.</strong> students 테이블에서 이름과 학점을 조회하되, 학점을 100점 만점으로 환산(grade × 25)한 컬럼도 함께 표시하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/setup" className="lesson-nav-btn prev">&larr; SQL 환경 구축</Link>
            <Link to="/sql/where" className="lesson-nav-btn next">WHERE 조건절 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter2;
