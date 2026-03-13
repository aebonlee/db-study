import { Link } from 'react-router-dom';

const SqlChapter7 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>7장. 데이터 조작 (DML)</h1>
        <p>INSERT, UPDATE, DELETE</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>INSERT로 새로운 데이터를 삽입한다.</li>
              <li>UPDATE로 기존 데이터를 수정한다.</li>
              <li>DELETE로 데이터를 삭제한다.</li>
              <li>DML 사용 시 주의사항을 이해한다.</li>
            </ul>
          </div>

          <h2>1. INSERT — 데이터 삽입</h2>

          <h3>1.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 모든 컬럼에 값 입력 (컬럼 순서대로)
INSERT INTO 테이블명
VALUES (값1, 값2, 값3, ...);

-- 특정 컬럼만 입력 (나머지는 기본값 또는 NULL)
INSERT INTO 테이블명 (컬럼1, 컬럼2)
VALUES (값1, 값2);`}</code></pre>
          </div>

          <h3>1.2 기본 INSERT</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 특정 컬럼에 데이터 삽입
INSERT INTO students (name, age, major, grade, enrolled, email)
VALUES ('신짱구', 19, '미술학', 2.50, '2024-03-02', 'shin@school.ac.kr');

-- 확인
SELECT * FROM students WHERE name = '신짱구';`}</code></pre>
          </div>

          <h3>1.3 여러 행 한 번에 삽입</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`INSERT INTO students (name, age, major, grade, enrolled, email)
VALUES
    ('김민수', 21, '물리학',   3.40, '2023-03-02', 'minsu@school.ac.kr'),
    ('이하나', 20, '화학과',   3.60, '2024-03-02', 'hana@school.ac.kr'),
    ('최준호', 22, '경영학',   3.10, '2022-03-02', 'junho@school.ac.kr');`}</code></pre>
          </div>

          <h3>1.4 INSERT ... SELECT</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 다른 테이블의 데이터를 복사하여 삽입
INSERT INTO honor_students (name, major, grade)
SELECT name, major, grade
FROM students
WHERE grade >= 3.5;`}</code></pre>
          </div>

          <h2>2. UPDATE — 데이터 수정</h2>

          <h3>2.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`UPDATE 테이블명
SET 컬럼1 = 값1, 컬럼2 = 값2, ...
WHERE 조건;`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>주의</h3>
            <ul>
              <li><strong>WHERE 절을 반드시 작성하세요!</strong> WHERE 없이 UPDATE를 실행하면 <strong>모든 행</strong>이 수정됩니다.</li>
            </ul>
          </div>

          <h3>2.2 단일 행 수정</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 홍길동의 학점 수정
UPDATE students
SET grade = 3.70
WHERE name = '홍길동';

-- id로 특정 행 수정 (더 안전)
UPDATE students
SET grade = 3.70
WHERE id = 1;`}</code></pre>
          </div>

          <h3>2.3 여러 컬럼 동시 수정</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 여러 컬럼 한 번에 수정
UPDATE students
SET age = 21,
    major = '소프트웨어공학',
    grade = 3.60
WHERE id = 1;`}</code></pre>
          </div>

          <h3>2.4 조건에 맞는 여러 행 수정</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 컴퓨터공학 전공 학생 전체의 학점을 0.1 올리기
UPDATE students
SET grade = grade + 0.1
WHERE major = '컴퓨터공학';

-- 확인
SELECT name, grade FROM students WHERE major = '컴퓨터공학';`}</code></pre>
          </div>

          <h2>3. DELETE — 데이터 삭제</h2>

          <h3>3.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`DELETE FROM 테이블명
WHERE 조건;`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>주의</h3>
            <ul>
              <li><strong>WHERE 절을 반드시 작성하세요!</strong> WHERE 없이 DELETE를 실행하면 <strong>모든 행</strong>이 삭제됩니다.</li>
            </ul>
          </div>

          <h3>3.2 DELETE 사용 예제</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 특정 학생 삭제
DELETE FROM students
WHERE id = 9;

-- 조건에 맞는 여러 행 삭제
DELETE FROM students
WHERE grade < 2.0;

-- 삭제 전 확인 (습관 들이기!)
SELECT * FROM students WHERE grade < 2.0;
-- → 삭제 대상 확인 후 DELETE 실행`}</code></pre>
          </div>

          <h3>3.3 DELETE vs TRUNCATE vs DROP</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>명령어</th><th>분류</th><th>동작</th><th>복구</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>DELETE</strong></td><td>DML</td><td>조건에 맞는 행 삭제</td><td>ROLLBACK 가능</td></tr>
              <tr><td><strong>TRUNCATE</strong></td><td>DDL</td><td>전체 행 삭제 (구조 유지)</td><td>ROLLBACK 불가</td></tr>
              <tr><td><strong>DROP</strong></td><td>DDL</td><td>테이블 자체 삭제</td><td>ROLLBACK 불가</td></tr>
            </tbody>
          </table>

          <h2>4. 안전한 DML 사용 가이드</h2>

          <div className="code-block">
            <div className="code-header">안전한 DML 사용 패턴</div>
            <pre><code>{`-- 1단계: SELECT로 대상 확인
SELECT * FROM students WHERE id = 5;

-- 2단계: UPDATE 또는 DELETE 실행
UPDATE students SET grade = 3.5 WHERE id = 5;

-- 3단계: 결과 확인
SELECT * FROM students WHERE id = 5;

-- ⚠️ 실수 방지: Safe Updates 모드 (MySQL)
SET SQL_SAFE_UPDATES = 1;
-- → WHERE 없이 UPDATE/DELETE 실행 시 에러 발생`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>INSERT</strong>: 새로운 행을 추가한다. 여러 행을 한 번에 삽입할 수 있다.</li>
              <li><strong>UPDATE</strong>: 기존 행의 값을 수정한다. WHERE 필수!</li>
              <li><strong>DELETE</strong>: 행을 삭제한다. WHERE 필수!</li>
              <li>DML 실행 전 <strong>SELECT로 대상을 먼저 확인</strong>하는 습관을 들이자.</li>
              <li>DELETE는 ROLLBACK 가능하지만, TRUNCATE와 DROP은 불가능하다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> students 테이블에 새 학생(이름: 한소희, 나이: 21, 전공: 디자인학, 학점: 3.85)을 추가하세요.</p>
            <p><strong>문제 2.</strong> id가 3인 학생의 전공을 '컴퓨터공학'으로, 학점을 3.50으로 수정하세요.</p>
            <p><strong>문제 3.</strong> 학점이 3.0 미만인 학생을 삭제하세요 (삭제 전 SELECT로 확인).</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/aggregate" className="lesson-nav-btn prev">&larr; 데이터 집계</Link>
            <Link to="/sql/ddl" className="lesson-nav-btn next">테이블 정의 (DDL) &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter7;
