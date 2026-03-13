import { Link } from 'react-router-dom';

const SqlChapter3 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>3장. WHERE 조건절</h1>
        <p>WHERE, 비교연산자, AND/OR, LIKE, IN, BETWEEN</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>WHERE 절을 사용하여 조건에 맞는 데이터를 필터링한다.</li>
              <li>비교 연산자(=, &lt;&gt;, &gt;, &lt;, &gt;=, &lt;=)를 활용한다.</li>
              <li>논리 연산자(AND, OR, NOT)로 복합 조건을 구성한다.</li>
              <li>LIKE, IN, BETWEEN 연산자를 사용한다.</li>
            </ul>
          </div>

          <h2>1. WHERE 절 기본</h2>

          <h3>1.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`SELECT 컬럼1, 컬럼2
FROM 테이블명
WHERE 조건식;`}</code></pre>
          </div>
          <p>
            <strong>WHERE</strong> 절은 FROM 절 다음에 위치하며, 조건식이 <strong>참(TRUE)</strong>인 행만
            결과에 포함시킵니다.
          </p>

          <h2>2. 비교 연산자</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>연산자</th><th>의미</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>=</strong></td><td>같다</td><td>age = 20</td></tr>
              <tr><td><strong>&lt;&gt;</strong> 또는 <strong>!=</strong></td><td>같지 않다</td><td>major &lt;&gt; '경영학'</td></tr>
              <tr><td><strong>&gt;</strong></td><td>크다</td><td>grade &gt; 3.5</td></tr>
              <tr><td><strong>&lt;</strong></td><td>작다</td><td>age &lt; 22</td></tr>
              <tr><td><strong>&gt;=</strong></td><td>크거나 같다</td><td>grade &gt;= 3.0</td></tr>
              <tr><td><strong>&lt;=</strong></td><td>작거나 같다</td><td>age &lt;= 21</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">SQL 예제</div>
            <pre><code>{`-- 나이가 20인 학생
SELECT name, age FROM students WHERE age = 20;

-- 학점이 3.5 이상인 학생
SELECT name, grade FROM students WHERE grade >= 3.5;

-- 전공이 컴퓨터공학이 아닌 학생
SELECT name, major FROM students WHERE major <> '컴퓨터공학';`}</code></pre>
          </div>

          <h2>3. 논리 연산자</h2>

          <h3>3.1 AND — 그리고</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 컴퓨터공학 전공이면서 학점 3.5 이상인 학생
SELECT name, major, grade
FROM students
WHERE major = '컴퓨터공학'
  AND grade >= 3.5;`}</code></pre>
          </div>

          <h3>3.2 OR — 또는</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 컴퓨터공학 또는 경영학 전공 학생
SELECT name, major
FROM students
WHERE major = '컴퓨터공학'
   OR major = '경영학';`}</code></pre>
          </div>

          <h3>3.3 NOT — 부정</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 컴퓨터공학이 아닌 학생
SELECT name, major
FROM students
WHERE NOT major = '컴퓨터공학';`}</code></pre>
          </div>

          <h3>3.4 연산자 우선순위</h3>
          <p>
            <strong>NOT &gt; AND &gt; OR</strong> 순서로 우선순위가 적용됩니다.
            복잡한 조건에서는 <strong>괄호()</strong>를 사용하여 명확하게 표현하세요.
          </p>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 괄호 없이: AND가 OR보다 먼저 평가
SELECT * FROM students
WHERE major = '컴퓨터공학' OR major = '경영학' AND grade >= 3.5;
-- → 경영학이면서 3.5 이상이거나, 컴퓨터공학인 학생 (의도와 다를 수 있음)

-- 괄호 사용: 의도를 명확하게
SELECT * FROM students
WHERE (major = '컴퓨터공학' OR major = '경영학')
  AND grade >= 3.5;
-- → 컴퓨터공학 또는 경영학이면서, 학점 3.5 이상인 학생`}</code></pre>
          </div>

          <h2>4. BETWEEN — 범위 조건</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학점이 3.0 이상 3.8 이하인 학생
SELECT name, grade
FROM students
WHERE grade BETWEEN 3.0 AND 3.8;

-- 위와 동일한 조건
SELECT name, grade
FROM students
WHERE grade >= 3.0 AND grade <= 3.8;

-- NOT BETWEEN: 범위 밖
SELECT name, grade
FROM students
WHERE grade NOT BETWEEN 3.0 AND 3.8;`}</code></pre>
          </div>
          <p>
            BETWEEN은 <strong>양쪽 경계값을 포함</strong>합니다 (이상, 이하).
          </p>

          <h2>5. IN — 목록 포함 여부</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전공이 컴퓨터공학, 경영학, 수학과 중 하나인 학생
SELECT name, major
FROM students
WHERE major IN ('컴퓨터공학', '경영학', '수학과');

-- 위와 동일한 조건
SELECT name, major
FROM students
WHERE major = '컴퓨터공학'
   OR major = '경영학'
   OR major = '수학과';

-- NOT IN: 목록에 없는 값
SELECT name, major
FROM students
WHERE major NOT IN ('컴퓨터공학', '경영학');`}</code></pre>
          </div>

          <h2>6. LIKE — 패턴 매칭</h2>

          <h3>6.1 와일드카드 문자</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>와일드카드</th><th>의미</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>%</strong></td><td>0개 이상의 임의 문자</td><td>'김%' → 김으로 시작하는 모든 값</td></tr>
              <tr><td><strong>_</strong></td><td>정확히 1개의 임의 문자</td><td>'_철수' → 2글자+철수</td></tr>
            </tbody>
          </table>

          <h3>6.2 LIKE 사용 예시</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- '김'으로 시작하는 이름
SELECT * FROM students WHERE name LIKE '김%';

-- '학'으로 끝나는 전공
SELECT * FROM students WHERE major LIKE '%학';

-- '공'을 포함하는 전공
SELECT * FROM students WHERE major LIKE '%공%';

-- 이름이 정확히 3글자인 학생
SELECT * FROM students WHERE name LIKE '___';

-- 이메일이 'k'로 시작하는 학생
SELECT * FROM students WHERE email LIKE 'k%';

-- NOT LIKE: 패턴에 맞지 않는 값
SELECT * FROM students WHERE name NOT LIKE '김%';`}</code></pre>
          </div>

          <h2>7. 조건 조합 실전 예제</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 20~21세 컴퓨터공학 학생 중 학점 3.5 이상
SELECT name, age, major, grade
FROM students
WHERE age BETWEEN 20 AND 21
  AND major = '컴퓨터공학'
  AND grade >= 3.5;

-- 2023년에 입학한 학생
SELECT name, enrolled
FROM students
WHERE enrolled BETWEEN '2023-01-01' AND '2023-12-31';

-- 이메일에 'school' 포함되고 학점이 3.0 이상
SELECT name, email, grade
FROM students
WHERE email LIKE '%school%'
  AND grade >= 3.0;`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>WHERE</strong>는 조건에 맞는 행만 필터링한다.</li>
              <li><strong>비교 연산자</strong>: =, &lt;&gt;, &gt;, &lt;, &gt;=, &lt;= 로 값을 비교한다.</li>
              <li><strong>AND</strong>(그리고), <strong>OR</strong>(또는), <strong>NOT</strong>(부정)으로 조건을 조합한다.</li>
              <li><strong>BETWEEN</strong>: 범위 조건, <strong>IN</strong>: 목록 포함 여부를 확인한다.</li>
              <li><strong>LIKE</strong>: %와 _를 사용한 패턴 매칭으로 문자열을 검색한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> 나이가 21 이상인 학생의 이름과 나이를 조회하세요.</p>
            <p><strong>문제 2.</strong> 전공이 '컴퓨터공학' 또는 '전자공학'인 학생을 IN을 사용하여 조회하세요.</p>
            <p><strong>문제 3.</strong> 학점이 3.0 이상 3.7 이하인 학생을 BETWEEN으로 조회하세요.</p>
            <p><strong>문제 4.</strong> 이름이 '이'로 시작하는 학생을 LIKE로 조회하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/select" className="lesson-nav-btn prev">&larr; SELECT 기초</Link>
            <Link to="/sql/sort" className="lesson-nav-btn next">정렬과 제한 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter3;
