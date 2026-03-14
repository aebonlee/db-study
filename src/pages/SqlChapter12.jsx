import { Link } from 'react-router-dom';

const SqlChapter12 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>12. DB 설계</h1>
        <p>정규화, ERD, 데이터 모델링, 트랜잭션</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>데이터 모델링의 개념과 과정을 이해한다.</li>
              <li>ERD(Entity-Relationship Diagram)를 읽고 작성한다.</li>
              <li>정규화(1NF, 2NF, 3NF)를 이해하고 적용한다.</li>
              <li>트랜잭션과 ACID 속성을 이해한다.</li>
            </ul>
          </div>

          <h2>1. 데이터 모델링</h2>

          <h3>1.1 데이터 모델링이란?</h3>
          <p>
            <strong>데이터 모델링</strong>은 현실 세계의 데이터를 <strong>데이터베이스 구조로 변환</strong>하는 과정입니다.
            애플리케이션을 개발하기 전에 데이터의 구조, 관계, 제약 조건 등을 설계합니다.
          </p>

          <h3>1.2 모델링 단계</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>단계</th><th>이름</th><th>내용</th><th>산출물</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>1단계</strong></td><td>개념적 모델링</td><td>핵심 엔티티와 관계 파악</td><td>개념 ERD</td></tr>
              <tr><td><strong>2단계</strong></td><td>논리적 모델링</td><td>속성, 키, 정규화 적용</td><td>논리 ERD, 테이블 명세서</td></tr>
              <tr><td><strong>3단계</strong></td><td>물리적 모델링</td><td>자료형, 인덱스, 파티셔닝</td><td>CREATE TABLE 스크립트</td></tr>
            </tbody>
          </table>

          <h2>2. ERD (Entity-Relationship Diagram)</h2>

          <h3>2.1 ERD 구성 요소</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>요소</th><th>표기</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>엔티티(Entity)</strong></td><td>사각형</td><td>관리할 대상 (학생, 과목, 주문 등)</td></tr>
              <tr><td><strong>속성(Attribute)</strong></td><td>타원</td><td>엔티티의 특성 (이름, 나이, 학점 등)</td></tr>
              <tr><td><strong>관계(Relationship)</strong></td><td>마름모 / 선</td><td>엔티티 간의 연결 (수강하다, 주문하다 등)</td></tr>
              <tr><td><strong>기본키(PK)</strong></td><td>밑줄</td><td>엔티티를 유일하게 식별하는 속성</td></tr>
              <tr><td><strong>외래키(FK)</strong></td><td>점선 밑줄</td><td>다른 엔티티를 참조하는 속성</td></tr>
            </tbody>
          </table>

          <h3>2.2 ERD 예시 — 학교 시스템</h3>
          <div className="code-block">
            <div className="code-header">ERD (텍스트 표현)</div>
            <pre><code>{`┌──────────────┐         ┌──────────────┐
│   students   │         │   courses    │
├──────────────┤         ├──────────────┤
│ *id (PK)     │         │ *id (PK)     │
│  name        │         │  title       │
│  age         │    M:N  │  professor   │
│  major       │◄───────►│  credits     │
│  grade       │         │  department  │
│  enrolled    │         └──────────────┘
│  email       │               │
└──────────────┘               │
       │                       │
       │    ┌──────────────┐   │
       │    │ enrollments  │   │
       └───►├──────────────┤◄──┘
            │ *id (PK)     │
            │  student_id (FK)
            │  course_id (FK)
            │  semester    │
            │  score       │
            └──────────────┘

M:N 관계 → 중간 테이블(enrollments)로 해소`}</code></pre>
          </div>

          <h2>3. 정규화 (Normalization)</h2>

          <h3>3.1 정규화란?</h3>
          <p>
            <strong>정규화</strong>는 데이터의 <strong>중복을 최소화</strong>하고 <strong>무결성을 보장</strong>하기 위해
            테이블을 분리하는 과정입니다. 일반적으로 1NF → 2NF → 3NF까지 적용합니다.
          </p>

          <h3>3.2 제1정규형 (1NF)</h3>
          <p><strong>규칙</strong>: 모든 속성의 값은 <strong>원자값(Atomic Value)</strong>이어야 한다.</p>
          <div className="code-block">
            <div className="code-header">1NF 위반 vs 준수</div>
            <pre><code>{`❌ 1NF 위반 (하나의 셀에 여러 값)
+----+--------+------------------+
| id | name   | courses          |
+----+--------+------------------+
|  1 | 홍길동 | 데이터베이스, 자료구조 |  ← 원자값 아님!
+----+--------+------------------+

✅ 1NF 준수 (각 셀에 하나의 값)
+----+--------+--------------+
| id | name   | course       |
+----+--------+--------------+
|  1 | 홍길동 | 데이터베이스 |
|  1 | 홍길동 | 자료구조     |
+----+--------+--------------+`}</code></pre>
          </div>

          <h3>3.3 제2정규형 (2NF)</h3>
          <p><strong>규칙</strong>: 1NF를 만족하고, <strong>부분 함수 종속</strong>이 없어야 한다.</p>
          <div className="code-block">
            <div className="code-header">2NF 위반 vs 준수</div>
            <pre><code>{`❌ 2NF 위반 (복합키의 일부에만 종속)
수강(학번, 과목코드, 성적, 과목명)
     ^^^^^^^^^^^ PK
과목명은 과목코드에만 종속 → 부분 종속!

✅ 2NF 준수 (테이블 분리)
수강(학번, 과목코드, 성적)     ← 학번+과목코드에 완전 종속
과목(과목코드, 과목명)          ← 과목코드에 종속`}</code></pre>
          </div>

          <h3>3.4 제3정규형 (3NF)</h3>
          <p><strong>규칙</strong>: 2NF를 만족하고, <strong>이행적 함수 종속</strong>이 없어야 한다.</p>
          <div className="code-block">
            <div className="code-header">3NF 위반 vs 준수</div>
            <pre><code>{`❌ 3NF 위반 (이행적 종속)
학생(학번, 이름, 학과코드, 학과명)
학번 → 학과코드 → 학과명  (이행적 종속!)

✅ 3NF 준수 (테이블 분리)
학생(학번, 이름, 학과코드)
학과(학과코드, 학과명)`}</code></pre>
          </div>

          <h3>3.5 정규화 요약</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>정규형</th><th>조건</th><th>핵심</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>1NF</strong></td><td>원자값</td><td>하나의 셀에 하나의 값만</td></tr>
              <tr><td><strong>2NF</strong></td><td>완전 함수 종속</td><td>복합키의 일부에만 종속하는 컬럼 분리</td></tr>
              <tr><td><strong>3NF</strong></td><td>이행적 종속 제거</td><td>PK가 아닌 컬럼이 다른 비키 컬럼에 종속하면 분리</td></tr>
            </tbody>
          </table>

          <h2>4. 반정규화 (Denormalization)</h2>

          <p>
            정규화를 과도하게 적용하면 <strong>JOIN이 많아져 성능이 저하</strong>될 수 있습니다.
            이런 경우 의도적으로 중복을 허용하는 <strong>반정규화</strong>를 적용합니다.
          </p>
          <ul>
            <li>읽기 성능이 중요한 경우 (통계, 보고서)</li>
            <li>JOIN 비용이 큰 대용량 데이터</li>
            <li>자주 함께 조회되는 데이터를 합치기</li>
          </ul>

          <h2>5. 트랜잭션 (Transaction)</h2>

          <h3>5.1 트랜잭션이란?</h3>
          <p>
            <strong>트랜잭션</strong>은 <strong>하나의 논리적 작업 단위</strong>를 구성하는 SQL 문들의 집합입니다.
            트랜잭션 내의 모든 작업은 <strong>전부 성공하거나, 전부 취소</strong>됩니다 (All or Nothing).
          </p>

          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`-- 계좌 이체 예시: A → B로 10만원 이체
START TRANSACTION;

UPDATE accounts SET balance = balance - 100000 WHERE id = 'A';
UPDATE accounts SET balance = balance + 100000 WHERE id = 'B';

-- 두 작업 모두 성공하면
COMMIT;

-- 하나라도 실패하면
ROLLBACK;`}</code></pre>
          </div>

          <h3>5.2 ACID 속성</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>속성</th><th>영어</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>원자성</strong></td><td>Atomicity</td><td>전부 실행 또는 전부 취소</td><td>이체 중 오류 시 모두 취소</td></tr>
              <tr><td><strong>일관성</strong></td><td>Consistency</td><td>트랜잭션 전후 데이터 일관</td><td>이체 후 총 잔액 변화 없음</td></tr>
              <tr><td><strong>독립성</strong></td><td>Isolation</td><td>동시 트랜잭션 간 간섭 없음</td><td>두 이체가 동시에 같은 계좌 접근</td></tr>
              <tr><td><strong>지속성</strong></td><td>Durability</td><td>커밋된 결과는 영구 보존</td><td>시스템 장애 후 복구 가능</td></tr>
            </tbody>
          </table>

          <h3>5.3 SAVEPOINT</h3>
          <div className="code-block">
            <div className="code-header">SQL</div>
            <pre><code>{`START TRANSACTION;

INSERT INTO students (name, age, major) VALUES ('테스트1', 20, '수학과');
SAVEPOINT sp1;

INSERT INTO students (name, age, major) VALUES ('테스트2', 21, '물리학');
SAVEPOINT sp2;

INSERT INTO students (name, age, major) VALUES ('테스트3', 22, '화학과');

-- 테스트3만 취소하고 싶으면:
ROLLBACK TO sp2;

-- 테스트1만 남기고 싶으면:
ROLLBACK TO sp1;

COMMIT;  -- 최종 확정`}</code></pre>
          </div>

          <h2>6. 설계 실습 — 온라인 서점</h2>

          <div className="code-block">
            <div className="code-header">온라인 서점 DB 설계</div>
            <pre><code>{`-- 1. 요구사항 분석
-- 회원이 도서를 주문한다
-- 도서는 카테고리에 속한다
-- 주문은 여러 도서를 포함할 수 있다

-- 2. 테이블 설계
CREATE TABLE categories (
    id    INT PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(50) NOT NULL
);

CREATE TABLE books (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(200) NOT NULL,
    author       VARCHAR(100),
    price        DECIMAL(10,2) NOT NULL,
    stock        INT DEFAULT 0,
    category_id  INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE members (
    id        INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(50) NOT NULL,
    email     VARCHAR(100) UNIQUE NOT NULL,
    phone     VARCHAR(20),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    member_id   INT NOT NULL,
    order_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2),
    status      VARCHAR(20) DEFAULT '주문완료',
    FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE TABLE order_items (
    id        INT PRIMARY KEY AUTO_INCREMENT,
    order_id  INT NOT NULL,
    book_id   INT NOT NULL,
    quantity  INT DEFAULT 1,
    price     DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>데이터 모델링</strong>: 개념적 → 논리적 → 물리적 단계로 진행한다.</li>
              <li><strong>ERD</strong>: 엔티티, 속성, 관계를 시각적으로 표현한 다이어그램이다.</li>
              <li><strong>정규화</strong>: 1NF(원자값), 2NF(부분 종속 제거), 3NF(이행 종속 제거).</li>
              <li><strong>트랜잭션</strong>: ACID 속성으로 데이터의 안정성과 일관성을 보장한다.</li>
              <li>COMMIT은 확정, ROLLBACK은 취소, SAVEPOINT는 중간 저장 지점이다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>연습 문제</h3>
            <p><strong>문제 1.</strong> 다음 테이블이 어떤 정규형을 위반하는지 판단하세요: 학생(학번, 이름, 과목1, 과목2, 과목3)</p>
            <p><strong>문제 2.</strong> "도서관 대출 시스템"의 ERD를 설계하세요 (회원, 도서, 대출 엔티티).</p>
            <p><strong>문제 3.</strong> 트랜잭션을 사용하여 도서 주문 처리를 작성하세요 (재고 감소 + 주문 기록 추가).</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql/advanced" className="lesson-nav-btn prev">&larr; 고급 SQL</Link>
            <Link to="/references" className="lesson-nav-btn next">참고자료 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter12;
