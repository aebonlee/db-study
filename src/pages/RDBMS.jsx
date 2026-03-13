import { Link } from 'react-router-dom';

const RDBMS = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>관계형 데이터베이스</h1>
        <p>테이블, 키, 관계의 개념과 SQL 개요</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>관계형 데이터베이스(RDBMS)의 핵심 개념을 이해한다.</li>
              <li>테이블, 행, 열의 구조를 설명할 수 있다.</li>
              <li>기본키, 외래키 등 키의 종류와 역할을 파악한다.</li>
              <li>테이블 간 관계(1:1, 1:N, M:N)를 이해한다.</li>
              <li>SQL의 개요와 분류를 파악한다.</li>
            </ul>
          </div>

          <h2>1. 관계형 데이터베이스란?</h2>

          <h3>1.1 정의</h3>
          <p>
            <strong>관계형 데이터베이스(Relational Database)</strong>는 데이터를 <strong>테이블(Table)</strong> 형태로
            구성하고, 테이블 간의 <strong>관계(Relationship)</strong>를 통해 데이터를 연결하는 데이터베이스입니다.
            1970년 E.F. Codd가 제안한 관계형 모델에 기반하며, 현재 가장 널리 사용되는 데이터베이스 모델입니다.
          </p>

          <h3>1.2 관계형 모델의 용어</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>수학적 용어</th><th>데이터베이스 용어</th><th>파일 시스템 용어</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>릴레이션(Relation)</strong></td><td>테이블(Table)</td><td>파일(File)</td><td>데이터를 저장하는 2차원 구조</td></tr>
              <tr><td><strong>튜플(Tuple)</strong></td><td>행(Row)</td><td>레코드(Record)</td><td>하나의 데이터 항목</td></tr>
              <tr><td><strong>속성(Attribute)</strong></td><td>열(Column)</td><td>필드(Field)</td><td>데이터의 특성/항목</td></tr>
              <tr><td><strong>도메인(Domain)</strong></td><td>데이터 타입</td><td>-</td><td>속성이 가질 수 있는 값의 범위</td></tr>
            </tbody>
          </table>

          <h2>2. 테이블의 구조</h2>

          <h3>2.1 테이블 예시</h3>
          <p>
            학생 정보를 관리하는 <strong>students</strong> 테이블을 예로 들어보겠습니다.
          </p>
          <div className="code-block">
            <div className="code-header">students 테이블</div>
            <pre><code>{`+----+--------+------+------------+--------+
| id | name   | age  | major      | grade  |
+----+--------+------+------------+--------+
|  1 | 홍길동 |   20 | 컴퓨터공학 |    3.5 |
|  2 | 김영희 |   21 | 경영학     |    3.8 |
|  3 | 이철수 |   22 | 전자공학   |    3.2 |
|  4 | 박민지 |   20 | 컴퓨터공학 |    3.9 |
+----+--------+------+------------+--------+

• 열(Column) : id, name, age, major, grade → 5개
• 행(Row)    : 홍길동, 김영희, 이철수, 박민지 → 4개
• 기본키(PK) : id (각 행을 유일하게 식별)`}</code></pre>
          </div>

          <h3>2.2 스키마와 인스턴스</h3>
          <ul>
            <li><strong>스키마(Schema)</strong>: 테이블의 구조 정의 — 테이블 이름, 열 이름, 데이터 타입, 제약 조건 등</li>
            <li><strong>인스턴스(Instance)</strong>: 특정 시점에 테이블에 저장된 실제 데이터</li>
          </ul>

          <h2>3. 키(Key)의 종류</h2>

          <h3>3.1 키란?</h3>
          <p>
            <strong>키(Key)</strong>는 테이블에서 행을 <strong>구별</strong>하거나 테이블 간의 <strong>관계</strong>를 설정하는 데 사용되는
            열(또는 열의 조합)입니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>키 종류</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>기본키 (Primary Key, PK)</strong></td><td>각 행을 유일하게 식별하는 키. NULL 불가, 중복 불가</td><td>학번, 주민번호, 자동증가 id</td></tr>
              <tr><td><strong>외래키 (Foreign Key, FK)</strong></td><td>다른 테이블의 기본키를 참조하여 관계를 맺는 키</td><td>주문 테이블의 customer_id</td></tr>
              <tr><td><strong>후보키 (Candidate Key)</strong></td><td>기본키가 될 수 있는 후보. 유일성 + 최소성 만족</td><td>학번, 이메일 (둘 다 유일)</td></tr>
              <tr><td><strong>대체키 (Alternate Key)</strong></td><td>후보키 중 기본키로 선택되지 않은 키</td><td>학번이 PK이면, 이메일은 대체키</td></tr>
              <tr><td><strong>복합키 (Composite Key)</strong></td><td>두 개 이상의 열을 조합하여 만든 키</td><td>(수강년도, 학번, 과목코드)</td></tr>
            </tbody>
          </table>

          <h3>3.2 기본키와 외래키의 관계</h3>
          <div className="code-block">
            <div className="code-header">테이블 간 관계 예시</div>
            <pre><code>{`[customers 테이블]              [orders 테이블]
+----+--------+              +----+-------------+--------+
| id | name   |              | id | customer_id | amount |
+----+--------+              +----+-------------+--------+
|  1 | 홍길동 |  ◄──────────  |  1 |           1 |  50000 |
|  2 | 김영희 |  ◄──────────  |  2 |           2 |  30000 |
+----+--------+              |  3 |           1 |  20000 |
                              +----+-------------+--------+
     PK: id                       PK: id
                                  FK: customer_id → customers.id`}</code></pre>
          </div>

          <h2>4. 관계(Relationship)의 종류</h2>

          <h3>4.1 1:1 관계 (One-to-One)</h3>
          <p>
            한 테이블의 하나의 행이 다른 테이블의 <strong>하나의 행</strong>과만 대응됩니다.
          </p>
          <ul>
            <li>예: 사용자(users) ↔ 사용자 프로필(user_profiles)</li>
            <li>각 사용자는 하나의 프로필만 가지고, 각 프로필은 한 사용자에게만 속함</li>
          </ul>

          <h3>4.2 1:N 관계 (One-to-Many)</h3>
          <p>
            한 테이블의 하나의 행이 다른 테이블의 <strong>여러 행</strong>과 대응됩니다.
            가장 흔한 관계 유형입니다.
          </p>
          <ul>
            <li>예: 고객(customers) ↔ 주문(orders) — 한 고객이 여러 주문을 할 수 있음</li>
            <li>예: 부서(departments) ↔ 직원(employees) — 한 부서에 여러 직원이 소속</li>
          </ul>

          <h3>4.3 M:N 관계 (Many-to-Many)</h3>
          <p>
            양쪽 테이블 모두 <strong>여러 행</strong>이 서로 대응됩니다.
            직접 구현이 불가능하므로 <strong>중간 테이블(연결 테이블)</strong>을 사용합니다.
          </p>
          <div className="code-block">
            <div className="code-header">M:N 관계 → 중간 테이블로 분해</div>
            <pre><code>{`[students]        [enrollments]        [courses]
+----+--------+   +------------+-----+   +----+----------+
| id | name   |   | student_id | course_id | | id | title    |
+----+--------+   +------------+-----------+ +----+----------+
|  1 | 홍길동 |   |          1 |         1 | |  1 | 데이터베이스 |
|  2 | 김영희 |   |          1 |         2 | |  2 | 자료구조    |
+----+--------+   |          2 |         1 | +----+----------+
                  +------------+-----------+

한 학생이 여러 과목을 수강하고,
한 과목에 여러 학생이 등록할 수 있다.`}</code></pre>
          </div>

          <h2>5. SQL 개요</h2>

          <h3>5.1 SQL이란?</h3>
          <p>
            <strong>SQL(Structured Query Language)</strong>은 관계형 데이터베이스를 다루기 위한 <strong>표준 질의 언어</strong>입니다.
            1986년 ANSI, 1987년 ISO에서 표준으로 제정되었으며, 대부분의 RDBMS에서 공통적으로 사용됩니다.
          </p>

          <h3>5.2 SQL의 분류</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>분류</th><th>전체 이름</th><th>주요 명령어</th><th>역할</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>DDL</strong></td><td>Data Definition Language</td><td>CREATE, ALTER, DROP, TRUNCATE</td><td>데이터베이스/테이블 구조 정의</td></tr>
              <tr><td><strong>DML</strong></td><td>Data Manipulation Language</td><td>SELECT, INSERT, UPDATE, DELETE</td><td>데이터 검색, 삽입, 수정, 삭제</td></tr>
              <tr><td><strong>DCL</strong></td><td>Data Control Language</td><td>GRANT, REVOKE</td><td>접근 권한 부여/회수</td></tr>
              <tr><td><strong>TCL</strong></td><td>Transaction Control Language</td><td>COMMIT, ROLLBACK, SAVEPOINT</td><td>트랜잭션 제어</td></tr>
            </tbody>
          </table>

          <h3>5.3 SQL 맛보기</h3>
          <div className="code-block">
            <div className="code-header">SQL 기본 문법 예시</div>
            <pre><code>{`-- 테이블 생성 (DDL)
CREATE TABLE students (
    id    INT PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(50) NOT NULL,
    age   INT,
    major VARCHAR(100)
);

-- 데이터 삽입 (DML)
INSERT INTO students (name, age, major)
VALUES ('홍길동', 20, '컴퓨터공학');

-- 데이터 조회 (DML)
SELECT name, major
FROM students
WHERE age >= 20;

-- 데이터 수정 (DML)
UPDATE students
SET age = 21
WHERE name = '홍길동';

-- 데이터 삭제 (DML)
DELETE FROM students
WHERE id = 1;`}</code></pre>
          </div>

          <h2>6. 관계형 데이터베이스의 특징</h2>

          <h3>6.1 장점</h3>
          <ul>
            <li><strong>데이터 무결성</strong>: 제약 조건을 통해 정확하고 일관된 데이터 유지</li>
            <li><strong>유연한 질의</strong>: SQL을 통한 복잡한 검색과 분석 가능</li>
            <li><strong>표준화</strong>: SQL 표준으로 다양한 DBMS 간 호환</li>
            <li><strong>트랜잭션 지원</strong>: ACID 속성으로 안전한 데이터 처리</li>
            <li><strong>정규화</strong>: 데이터 중복 최소화를 위한 체계적 설계 방법론</li>
          </ul>

          <h3>6.2 ACID 속성</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>속성</th><th>영어</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>원자성</strong></td><td>Atomicity</td><td>트랜잭션은 전부 실행되거나 전부 취소 (All or Nothing)</td></tr>
              <tr><td><strong>일관성</strong></td><td>Consistency</td><td>트랜잭션 전후 데이터베이스 상태가 일관적</td></tr>
              <tr><td><strong>독립성</strong></td><td>Isolation</td><td>동시 실행 트랜잭션이 서로 영향을 주지 않음</td></tr>
              <tr><td><strong>지속성</strong></td><td>Durability</td><td>완료된 트랜잭션의 결과는 영구적으로 보존</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>관계형 데이터베이스</strong>는 데이터를 테이블 형태로 구성하고 관계로 연결한다.</li>
              <li><strong>기본키(PK)</strong>는 행을 유일하게 식별하고, <strong>외래키(FK)</strong>는 테이블 간 관계를 맺는다.</li>
              <li>관계에는 <strong>1:1, 1:N, M:N</strong> 세 가지 유형이 있다.</li>
              <li><strong>SQL</strong>은 DDL, DML, DCL, TCL로 분류되며, RDBMS를 다루는 표준 언어이다.</li>
              <li><strong>ACID 속성</strong>으로 안전하고 일관된 데이터 처리를 보장한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> 릴레이션, 튜플, 속성을 각각 데이터베이스 용어로 설명하세요.</p>
            <p><strong>문제 2.</strong> 기본키와 외래키의 역할과 차이점을 설명하세요.</p>
            <p><strong>문제 3.</strong> 1:N 관계와 M:N 관계의 예를 하나씩 들고, M:N을 테이블로 어떻게 구현하는지 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/intro/what-is-db" className="lesson-nav-btn prev">&larr; 데이터베이스란?</Link>
            <Link to="/sql" className="lesson-nav-btn next">SQL 학습 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default RDBMS;
