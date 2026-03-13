import { Link } from 'react-router-dom';

const SqlChapter5 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>5장. 함수와 표현식</h1>
        <p>문자열, 숫자, 날짜 함수, CASE, NULL 처리</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>문자열 함수를 사용하여 텍스트를 가공한다.</li>
              <li>숫자 함수를 활용하여 계산을 수행한다.</li>
              <li>날짜 함수로 날짜/시간 데이터를 처리한다.</li>
              <li>CASE 표현식으로 조건에 따라 값을 변환한다.</li>
              <li>IFNULL, COALESCE로 NULL 값을 처리한다.</li>
            </ul>
          </div>

          <h2>1. 문자열 함수</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>함수</th><th>설명</th><th>예시</th><th>결과</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>CONCAT</strong></td><td>문자열 연결</td><td>CONCAT('홍', '길동')</td><td>'홍길동'</td></tr>
              <tr><td><strong>LENGTH</strong></td><td>바이트 수</td><td>LENGTH('abc')</td><td>3</td></tr>
              <tr><td><strong>CHAR_LENGTH</strong></td><td>문자 수</td><td>CHAR_LENGTH('홍길동')</td><td>3</td></tr>
              <tr><td><strong>UPPER</strong></td><td>대문자 변환</td><td>UPPER('hello')</td><td>'HELLO'</td></tr>
              <tr><td><strong>LOWER</strong></td><td>소문자 변환</td><td>LOWER('HELLO')</td><td>'hello'</td></tr>
              <tr><td><strong>SUBSTRING</strong></td><td>부분 문자열</td><td>SUBSTRING('Hello', 1, 3)</td><td>'Hel'</td></tr>
              <tr><td><strong>TRIM</strong></td><td>공백 제거</td><td>TRIM('  hi  ')</td><td>'hi'</td></tr>
              <tr><td><strong>REPLACE</strong></td><td>문자열 치환</td><td>REPLACE('abc', 'b', 'x')</td><td>'axc'</td></tr>
              <tr><td><strong>LEFT / RIGHT</strong></td><td>왼쪽/오른쪽 N자</td><td>LEFT('Hello', 2)</td><td>'He'</td></tr>
              <tr><td><strong>LPAD / RPAD</strong></td><td>왼쪽/오른쪽 채우기</td><td>LPAD('5', 3, '0')</td><td>'005'</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">SQL 실전 예제</div>
            <pre><code>{`-- 이름과 전공을 연결하여 출력
SELECT CONCAT(name, ' (', major, ')') AS 학생정보
FROM students;
-- 결과: 홍길동 (컴퓨터공학)

-- 이메일에서 @ 앞부분만 추출
SELECT name,
       SUBSTRING(email, 1, LOCATE('@', email) - 1) AS 아이디
FROM students;

-- 이름 글자 수
SELECT name, CHAR_LENGTH(name) AS 이름길이
FROM students;`}</code></pre>
          </div>

          <h2>2. 숫자 함수</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>함수</th><th>설명</th><th>예시</th><th>결과</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>ROUND</strong></td><td>반올림</td><td>ROUND(3.567, 1)</td><td>3.6</td></tr>
              <tr><td><strong>CEIL / CEILING</strong></td><td>올림</td><td>CEIL(3.1)</td><td>4</td></tr>
              <tr><td><strong>FLOOR</strong></td><td>내림</td><td>FLOOR(3.9)</td><td>3</td></tr>
              <tr><td><strong>TRUNCATE</strong></td><td>소수점 절삭</td><td>TRUNCATE(3.567, 1)</td><td>3.5</td></tr>
              <tr><td><strong>ABS</strong></td><td>절대값</td><td>ABS(-5)</td><td>5</td></tr>
              <tr><td><strong>MOD</strong></td><td>나머지</td><td>MOD(10, 3)</td><td>1</td></tr>
              <tr><td><strong>POWER</strong></td><td>거듭제곱</td><td>POWER(2, 3)</td><td>8</td></tr>
              <tr><td><strong>SQRT</strong></td><td>제곱근</td><td>SQRT(16)</td><td>4</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">SQL 실전 예제</div>
            <pre><code>{`-- 학점을 소수 첫째자리까지 반올림
SELECT name, ROUND(grade, 1) AS 학점
FROM students;

-- 학점을 100점 만점으로 환산 후 반올림
SELECT name,
       grade,
       ROUND(grade * 25, 0) AS "100점 환산"
FROM students;`}</code></pre>
          </div>

          <h2>3. 날짜 함수</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>함수</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>NOW()</strong></td><td>현재 날짜+시간</td><td>2024-03-15 14:30:00</td></tr>
              <tr><td><strong>CURDATE()</strong></td><td>현재 날짜</td><td>2024-03-15</td></tr>
              <tr><td><strong>CURTIME()</strong></td><td>현재 시간</td><td>14:30:00</td></tr>
              <tr><td><strong>YEAR()</strong></td><td>연도 추출</td><td>YEAR('2024-03-15') → 2024</td></tr>
              <tr><td><strong>MONTH()</strong></td><td>월 추출</td><td>MONTH('2024-03-15') → 3</td></tr>
              <tr><td><strong>DAY()</strong></td><td>일 추출</td><td>DAY('2024-03-15') → 15</td></tr>
              <tr><td><strong>DATEDIFF</strong></td><td>날짜 차이(일)</td><td>DATEDIFF('2024-03-15', '2024-03-01') → 14</td></tr>
              <tr><td><strong>DATE_ADD</strong></td><td>날짜 더하기</td><td>DATE_ADD('2024-03-15', INTERVAL 7 DAY)</td></tr>
              <tr><td><strong>DATE_FORMAT</strong></td><td>날짜 포맷</td><td>DATE_FORMAT(NOW(), '%Y년 %m월 %d일')</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">SQL 실전 예제</div>
            <pre><code>{`-- 입학 후 경과 일수
SELECT name,
       enrolled,
       DATEDIFF(CURDATE(), enrolled) AS 경과일수
FROM students;

-- 입학 연도별 학생 수
SELECT YEAR(enrolled) AS 입학연도,
       COUNT(*) AS 학생수
FROM students
GROUP BY YEAR(enrolled);

-- 날짜 포맷 변경
SELECT name,
       DATE_FORMAT(enrolled, '%Y년 %m월 %d일') AS 입학일
FROM students;`}</code></pre>
          </div>

          <h2>4. CASE 표현식</h2>

          <h3>4.1 단순 CASE</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 전공별 계열 분류
SELECT name, major,
       CASE major
           WHEN '컴퓨터공학' THEN '공학 계열'
           WHEN '전자공학'   THEN '공학 계열'
           WHEN '경영학'     THEN '상경 계열'
           WHEN '수학과'     THEN '자연 계열'
           ELSE '기타'
       END AS 계열
FROM students;`}</code></pre>
          </div>

          <h3>4.2 검색 CASE</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 학점에 따른 등급
SELECT name, grade,
       CASE
           WHEN grade >= 3.5 THEN 'A (우수)'
           WHEN grade >= 3.0 THEN 'B (양호)'
           WHEN grade >= 2.5 THEN 'C (보통)'
           ELSE 'D (미흡)'
       END AS 등급
FROM students;`}</code></pre>
          </div>
          <div className="code-block">
            <div className="code-header">실행 결과</div>
            <pre><code>{`+--------+-------+-----------+
| name   | grade | 등급      |
+--------+-------+-----------+
| 홍길동 |  3.50 | A (우수)  |
| 김영희 |  3.80 | A (우수)  |
| 이철수 |  3.20 | B (양호)  |
| 박민지 |  3.90 | A (우수)  |
| 정수현 |  2.80 | C (보통)  |
| ...                        |
+--------+-------+-----------+`}</code></pre>
          </div>

          <h2>5. NULL 처리 함수</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>함수</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>IFNULL(a, b)</strong></td><td>a가 NULL이면 b 반환</td><td>IFNULL(age, 0)</td></tr>
              <tr><td><strong>COALESCE(a, b, c, ...)</strong></td><td>첫 번째 NULL이 아닌 값 반환</td><td>COALESCE(phone, email, '없음')</td></tr>
              <tr><td><strong>NULLIF(a, b)</strong></td><td>a = b이면 NULL 반환</td><td>NULLIF(score, 0)</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">SQL 실전 예제</div>
            <pre><code>{`-- NULL인 나이를 '미입력'으로 표시
SELECT name,
       IFNULL(CAST(age AS CHAR), '미입력') AS 나이
FROM students;

-- COALESCE로 여러 값 중 NULL이 아닌 첫 번째 값
SELECT COALESCE(phone, email, '연락처 없음') AS 연락처
FROM students;`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>문자열 함수</strong>: CONCAT, SUBSTRING, UPPER, LOWER, TRIM, REPLACE 등</li>
              <li><strong>숫자 함수</strong>: ROUND, CEIL, FLOOR, ABS, MOD 등</li>
              <li><strong>날짜 함수</strong>: NOW, CURDATE, DATEDIFF, DATE_FORMAT 등</li>
              <li><strong>CASE</strong>: 조건에 따라 다른 값을 반환하는 조건 표현식</li>
              <li><strong>NULL 처리</strong>: IFNULL, COALESCE로 NULL을 대체 값으로 변환</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> 학생 이름과 전공을 "홍길동 - 컴퓨터공학" 형식으로 출력하세요 (CONCAT 사용).</p>
            <p><strong>문제 2.</strong> 학생의 입학 후 경과 일수를 계산하여 이름, 입학일, 경과일수를 조회하세요.</p>
            <p><strong>문제 3.</strong> CASE를 사용하여 학점 3.5 이상은 '장학금 대상', 미만은 '해당 없음'으로 표시하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/sort" className="lesson-nav-btn prev">&larr; 정렬과 제한</Link>
            <Link to="/sql/aggregate" className="lesson-nav-btn next">데이터 집계 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter5;
