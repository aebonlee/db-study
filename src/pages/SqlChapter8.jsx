import { Link } from 'react-router-dom';

const SqlChapter8 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>8장. 테이블 정의 (DDL)</h1>
        <p>CREATE TABLE, ALTER, DROP, 자료형, 제약조건</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>CREATE TABLE로 테이블을 생성한다.</li>
              <li>MySQL의 주요 자료형을 이해한다.</li>
              <li>제약 조건(NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY 등)을 설정한다.</li>
              <li>ALTER TABLE로 테이블 구조를 변경한다.</li>
              <li>DROP TABLE로 테이블을 삭제한다.</li>
            </ul>
          </div>

          <h2>1. MySQL 주요 자료형</h2>

          <h3>1.1 숫자형</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>자료형</th><th>크기</th><th>범위</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>TINYINT</strong></td><td>1바이트</td><td>-128 ~ 127</td><td>작은 정수, 상태값</td></tr>
              <tr><td><strong>INT</strong></td><td>4바이트</td><td>약 ±21억</td><td>일반 정수 (가장 많이 사용)</td></tr>
              <tr><td><strong>BIGINT</strong></td><td>8바이트</td><td>약 ±922경</td><td>매우 큰 정수</td></tr>
              <tr><td><strong>DECIMAL(p,s)</strong></td><td>가변</td><td>정밀 소수</td><td>금액, 학점 (정확한 계산)</td></tr>
              <tr><td><strong>FLOAT</strong></td><td>4바이트</td><td>근사 소수</td><td>과학 계산 (근사치 허용)</td></tr>
              <tr><td><strong>DOUBLE</strong></td><td>8바이트</td><td>근사 소수</td><td>과학 계산 (높은 정밀도)</td></tr>
            </tbody>
          </table>

          <h3>1.2 문자형</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>자료형</th><th>크기</th><th>특징</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>CHAR(n)</strong></td><td>고정 n바이트</td><td>남는 공간 공백 채움</td><td>코드, 우편번호 등 고정 길이</td></tr>
              <tr><td><strong>VARCHAR(n)</strong></td><td>가변 최대 n</td><td>실제 데이터 크기만큼만 저장</td><td>이름, 이메일 등 (가장 많이 사용)</td></tr>
              <tr><td><strong>TEXT</strong></td><td>최대 65KB</td><td>긴 텍스트</td><td>본문, 설명</td></tr>
              <tr><td><strong>LONGTEXT</strong></td><td>최대 4GB</td><td>매우 긴 텍스트</td><td>대용량 텍스트</td></tr>
            </tbody>
          </table>

          <h3>1.3 날짜/시간형</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>자료형</th><th>형식</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>DATE</strong></td><td>YYYY-MM-DD</td><td>날짜만</td></tr>
              <tr><td><strong>TIME</strong></td><td>HH:MM:SS</td><td>시간만</td></tr>
              <tr><td><strong>DATETIME</strong></td><td>YYYY-MM-DD HH:MM:SS</td><td>날짜 + 시간</td></tr>
              <tr><td><strong>TIMESTAMP</strong></td><td>YYYY-MM-DD HH:MM:SS</td><td>자동 업데이트 가능, UTC 저장</td></tr>
            </tbody>
          </table>

          <h2>2. CREATE TABLE — 테이블 생성</h2>

          <h3>2.1 기본 문법</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`CREATE TABLE 테이블명 (
    컬럼명1 자료형 [제약조건],
    컬럼명2 자료형 [제약조건],
    ...
    [테이블 레벨 제약조건]
);`}</code></pre>
          </div>

          <h3>2.2 실전 예제</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`CREATE TABLE employees (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50) NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    department  VARCHAR(50) DEFAULT '미정',
    salary      DECIMAL(10,2),
    hire_date   DATE NOT NULL,
    is_active   TINYINT(1) DEFAULT 1,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}</code></pre>
          </div>

          <h2>3. 제약 조건 (Constraints)</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>제약 조건</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>NOT NULL</strong></td><td>NULL 값 불허</td><td>name VARCHAR(50) NOT NULL</td></tr>
              <tr><td><strong>UNIQUE</strong></td><td>중복 값 불허 (NULL 허용)</td><td>email VARCHAR(100) UNIQUE</td></tr>
              <tr><td><strong>PRIMARY KEY</strong></td><td>기본키 (NOT NULL + UNIQUE)</td><td>id INT PRIMARY KEY</td></tr>
              <tr><td><strong>FOREIGN KEY</strong></td><td>외래키 (다른 테이블 참조)</td><td>FOREIGN KEY (dept_id) REFERENCES departments(id)</td></tr>
              <tr><td><strong>DEFAULT</strong></td><td>기본값 설정</td><td>status VARCHAR(20) DEFAULT '활성'</td></tr>
              <tr><td><strong>CHECK</strong></td><td>값 범위 제한 (MySQL 8.0+)</td><td>CHECK (age &gt;= 0 AND age &lt;= 150)</td></tr>
              <tr><td><strong>AUTO_INCREMENT</strong></td><td>자동 증가 (MySQL)</td><td>id INT PRIMARY KEY AUTO_INCREMENT</td></tr>
            </tbody>
          </table>

          <h3>3.1 외래키(FOREIGN KEY) 상세</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 부서 테이블
CREATE TABLE departments (
    id    INT PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(50) NOT NULL
);

-- 직원 테이블 (departments 참조)
CREATE TABLE employees (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50) NOT NULL,
    dept_id     INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
        ON DELETE SET NULL      -- 부서 삭제 시 직원의 dept_id를 NULL로
        ON UPDATE CASCADE       -- 부서 id 변경 시 함께 변경
);`}</code></pre>
          </div>

          <h3>3.2 ON DELETE / ON UPDATE 옵션</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>옵션</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>CASCADE</strong></td><td>부모 행 삭제/수정 시 자식도 함께 삭제/수정</td></tr>
              <tr><td><strong>SET NULL</strong></td><td>부모 행 삭제/수정 시 자식의 외래키를 NULL로</td></tr>
              <tr><td><strong>RESTRICT</strong></td><td>자식이 참조 중이면 부모 삭제/수정 거부 (기본값)</td></tr>
              <tr><td><strong>SET DEFAULT</strong></td><td>기본값으로 설정 (InnoDB에서 미지원)</td></tr>
              <tr><td><strong>NO ACTION</strong></td><td>RESTRICT와 동일</td></tr>
            </tbody>
          </table>

          <h2>4. ALTER TABLE — 테이블 구조 변경</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 컬럼 추가
ALTER TABLE students
ADD COLUMN phone VARCHAR(20);

-- 컬럼 수정 (자료형 변경)
ALTER TABLE students
MODIFY COLUMN phone VARCHAR(15);

-- 컬럼 이름 변경
ALTER TABLE students
CHANGE COLUMN phone tel VARCHAR(15);

-- 컬럼 삭제
ALTER TABLE students
DROP COLUMN tel;

-- 테이블 이름 변경
ALTER TABLE students
RENAME TO student_info;

-- 제약조건 추가
ALTER TABLE students
ADD CONSTRAINT uk_email UNIQUE (email);

-- 제약조건 삭제
ALTER TABLE students
DROP INDEX uk_email;`}</code></pre>
          </div>

          <h2>5. DROP TABLE — 테이블 삭제</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 테이블 삭제
DROP TABLE 테이블명;

-- 테이블이 존재할 때만 삭제 (에러 방지)
DROP TABLE IF EXISTS 테이블명;

-- 주의: 외래키로 참조되는 테이블은 삭제 불가
-- → 자식 테이블을 먼저 삭제하거나 외래키를 제거해야 함`}</code></pre>
          </div>

          <h2>6. 데이터베이스 관리</h2>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 데이터베이스 생성
CREATE DATABASE mydb
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 목록 확인
SHOW DATABASES;

-- 데이터베이스 선택
USE mydb;

-- 테이블 목록 확인
SHOW TABLES;

-- 테이블 구조 확인
DESCRIBE students;
-- 또는
SHOW CREATE TABLE students;

-- 데이터베이스 삭제
DROP DATABASE IF EXISTS mydb;`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li>MySQL 자료형: <strong>INT, VARCHAR, DATE, DECIMAL</strong> 등이 가장 많이 사용된다.</li>
              <li><strong>제약 조건</strong>: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, DEFAULT, CHECK</li>
              <li><strong>CREATE TABLE</strong>: 테이블 생성, <strong>ALTER TABLE</strong>: 구조 변경, <strong>DROP TABLE</strong>: 삭제</li>
              <li><strong>외래키</strong>의 ON DELETE/ON UPDATE 옵션으로 참조 무결성을 관리한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> 도서(books) 테이블을 만드세요: id(PK), title(NOT NULL), author, price(DECIMAL), published_date(DATE)</p>
            <p><strong>문제 2.</strong> books 테이블에 publisher(VARCHAR(50), DEFAULT '미정') 컬럼을 추가하세요.</p>
            <p><strong>문제 3.</strong> 외래키의 ON DELETE CASCADE와 ON DELETE SET NULL의 차이를 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/dml" className="lesson-nav-btn prev">&larr; 데이터 조작 (DML)</Link>
            <Link to="/sql/join" className="lesson-nav-btn next">JOIN &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter8;
