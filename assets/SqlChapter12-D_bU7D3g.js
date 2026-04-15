import{j as s,L as e}from"./index-CIjzQfov.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"12. DB 설계"}),s.jsx("p",{children:"정규화, ERD, 데이터 모델링, 트랜잭션"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"데이터 모델링의 개념과 과정을 이해한다."}),s.jsx("li",{children:"ERD(Entity-Relationship Diagram)를 읽고 작성한다."}),s.jsx("li",{children:"정규화(1NF, 2NF, 3NF)를 이해하고 적용한다."}),s.jsx("li",{children:"트랜잭션과 ACID 속성을 이해한다."})]})]}),s.jsx("h2",{children:"1. 데이터 모델링"}),s.jsx("h3",{children:"1.1 데이터 모델링이란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"데이터 모델링"}),"은 현실 세계의 데이터를 ",s.jsx("strong",{children:"데이터베이스 구조로 변환"}),"하는 과정입니다. 애플리케이션을 개발하기 전에 데이터의 구조, 관계, 제약 조건 등을 설계합니다."]}),s.jsx("h3",{children:"1.2 모델링 단계"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"단계"}),s.jsx("th",{children:"이름"}),s.jsx("th",{children:"내용"}),s.jsx("th",{children:"산출물"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"1단계"})}),s.jsx("td",{children:"개념적 모델링"}),s.jsx("td",{children:"핵심 엔티티와 관계 파악"}),s.jsx("td",{children:"개념 ERD"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"2단계"})}),s.jsx("td",{children:"논리적 모델링"}),s.jsx("td",{children:"속성, 키, 정규화 적용"}),s.jsx("td",{children:"논리 ERD, 테이블 명세서"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"3단계"})}),s.jsx("td",{children:"물리적 모델링"}),s.jsx("td",{children:"자료형, 인덱스, 파티셔닝"}),s.jsx("td",{children:"CREATE TABLE 스크립트"})]})]})]}),s.jsx("h2",{children:"2. ERD (Entity-Relationship Diagram)"}),s.jsx("h3",{children:"2.1 ERD 구성 요소"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"요소"}),s.jsx("th",{children:"표기"}),s.jsx("th",{children:"설명"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"엔티티(Entity)"})}),s.jsx("td",{children:"사각형"}),s.jsx("td",{children:"관리할 대상 (학생, 과목, 주문 등)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"속성(Attribute)"})}),s.jsx("td",{children:"타원"}),s.jsx("td",{children:"엔티티의 특성 (이름, 나이, 학점 등)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"관계(Relationship)"})}),s.jsx("td",{children:"마름모 / 선"}),s.jsx("td",{children:"엔티티 간의 연결 (수강하다, 주문하다 등)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"기본키(PK)"})}),s.jsx("td",{children:"밑줄"}),s.jsx("td",{children:"엔티티를 유일하게 식별하는 속성"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"외래키(FK)"})}),s.jsx("td",{children:"점선 밑줄"}),s.jsx("td",{children:"다른 엔티티를 참조하는 속성"})]})]})]}),s.jsx("h3",{children:"2.2 ERD 예시 — 학교 시스템"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"ERD (텍스트 표현)"}),s.jsx("pre",{children:s.jsx("code",{children:`┌──────────────┐         ┌──────────────┐
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

M:N 관계 → 중간 테이블(enrollments)로 해소`})})]}),s.jsx("h2",{children:"3. 정규화 (Normalization)"}),s.jsx("h3",{children:"3.1 정규화란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"정규화"}),"는 데이터의 ",s.jsx("strong",{children:"중복을 최소화"}),"하고 ",s.jsx("strong",{children:"무결성을 보장"}),"하기 위해 테이블을 분리하는 과정입니다. 일반적으로 1NF → 2NF → 3NF까지 적용합니다."]}),s.jsx("h3",{children:"3.2 제1정규형 (1NF)"}),s.jsxs("p",{children:[s.jsx("strong",{children:"규칙"}),": 모든 속성의 값은 ",s.jsx("strong",{children:"원자값(Atomic Value)"}),"이어야 한다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"1NF 위반 vs 준수"}),s.jsx("pre",{children:s.jsx("code",{children:`❌ 1NF 위반 (하나의 셀에 여러 값)
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
+----+--------+--------------+`})})]}),s.jsx("h3",{children:"3.3 제2정규형 (2NF)"}),s.jsxs("p",{children:[s.jsx("strong",{children:"규칙"}),": 1NF를 만족하고, ",s.jsx("strong",{children:"부분 함수 종속"}),"이 없어야 한다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"2NF 위반 vs 준수"}),s.jsx("pre",{children:s.jsx("code",{children:`❌ 2NF 위반 (복합키의 일부에만 종속)
수강(학번, 과목코드, 성적, 과목명)
     ^^^^^^^^^^^ PK
과목명은 과목코드에만 종속 → 부분 종속!

✅ 2NF 준수 (테이블 분리)
수강(학번, 과목코드, 성적)     ← 학번+과목코드에 완전 종속
과목(과목코드, 과목명)          ← 과목코드에 종속`})})]}),s.jsx("h3",{children:"3.4 제3정규형 (3NF)"}),s.jsxs("p",{children:[s.jsx("strong",{children:"규칙"}),": 2NF를 만족하고, ",s.jsx("strong",{children:"이행적 함수 종속"}),"이 없어야 한다."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"3NF 위반 vs 준수"}),s.jsx("pre",{children:s.jsx("code",{children:`❌ 3NF 위반 (이행적 종속)
학생(학번, 이름, 학과코드, 학과명)
학번 → 학과코드 → 학과명  (이행적 종속!)

✅ 3NF 준수 (테이블 분리)
학생(학번, 이름, 학과코드)
학과(학과코드, 학과명)`})})]}),s.jsx("h3",{children:"3.5 정규화 요약"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"정규형"}),s.jsx("th",{children:"조건"}),s.jsx("th",{children:"핵심"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"1NF"})}),s.jsx("td",{children:"원자값"}),s.jsx("td",{children:"하나의 셀에 하나의 값만"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"2NF"})}),s.jsx("td",{children:"완전 함수 종속"}),s.jsx("td",{children:"복합키의 일부에만 종속하는 컬럼 분리"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"3NF"})}),s.jsx("td",{children:"이행적 종속 제거"}),s.jsx("td",{children:"PK가 아닌 컬럼이 다른 비키 컬럼에 종속하면 분리"})]})]})]}),s.jsx("h2",{children:"4. 반정규화 (Denormalization)"}),s.jsxs("p",{children:["정규화를 과도하게 적용하면 ",s.jsx("strong",{children:"JOIN이 많아져 성능이 저하"}),"될 수 있습니다. 이런 경우 의도적으로 중복을 허용하는 ",s.jsx("strong",{children:"반정규화"}),"를 적용합니다."]}),s.jsxs("ul",{children:[s.jsx("li",{children:"읽기 성능이 중요한 경우 (통계, 보고서)"}),s.jsx("li",{children:"JOIN 비용이 큰 대용량 데이터"}),s.jsx("li",{children:"자주 함께 조회되는 데이터를 합치기"})]}),s.jsx("h2",{children:"5. 트랜잭션 (Transaction)"}),s.jsx("h3",{children:"5.1 트랜잭션이란?"}),s.jsxs("p",{children:[s.jsx("strong",{children:"트랜잭션"}),"은 ",s.jsx("strong",{children:"하나의 논리적 작업 단위"}),"를 구성하는 SQL 문들의 집합입니다. 트랜잭션 내의 모든 작업은 ",s.jsx("strong",{children:"전부 성공하거나, 전부 취소"}),"됩니다 (All or Nothing)."]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 계좌 이체 예시: A → B로 10만원 이체
START TRANSACTION;

UPDATE accounts SET balance = balance - 100000 WHERE id = 'A';
UPDATE accounts SET balance = balance + 100000 WHERE id = 'B';

-- 두 작업 모두 성공하면
COMMIT;

-- 하나라도 실패하면
ROLLBACK;`})})]}),s.jsx("h3",{children:"5.2 ACID 속성"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"속성"}),s.jsx("th",{children:"영어"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"원자성"})}),s.jsx("td",{children:"Atomicity"}),s.jsx("td",{children:"전부 실행 또는 전부 취소"}),s.jsx("td",{children:"이체 중 오류 시 모두 취소"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"일관성"})}),s.jsx("td",{children:"Consistency"}),s.jsx("td",{children:"트랜잭션 전후 데이터 일관"}),s.jsx("td",{children:"이체 후 총 잔액 변화 없음"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"독립성"})}),s.jsx("td",{children:"Isolation"}),s.jsx("td",{children:"동시 트랜잭션 간 간섭 없음"}),s.jsx("td",{children:"두 이체가 동시에 같은 계좌 접근"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"지속성"})}),s.jsx("td",{children:"Durability"}),s.jsx("td",{children:"커밋된 결과는 영구 보존"}),s.jsx("td",{children:"시스템 장애 후 복구 가능"})]})]})]}),s.jsx("h3",{children:"5.3 SAVEPOINT"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`START TRANSACTION;

INSERT INTO students (name, age, major) VALUES ('테스트1', 20, '수학과');
SAVEPOINT sp1;

INSERT INTO students (name, age, major) VALUES ('테스트2', 21, '물리학');
SAVEPOINT sp2;

INSERT INTO students (name, age, major) VALUES ('테스트3', 22, '화학과');

-- 테스트3만 취소하고 싶으면:
ROLLBACK TO sp2;

-- 테스트1만 남기고 싶으면:
ROLLBACK TO sp1;

COMMIT;  -- 최종 확정`})})]}),s.jsx("h2",{children:"6. 설계 실습 — 온라인 서점"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"온라인 서점 DB 설계"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 1. 요구사항 분석
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
);`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"데이터 모델링"}),": 개념적 → 논리적 → 물리적 단계로 진행한다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"ERD"}),": 엔티티, 속성, 관계를 시각적으로 표현한 다이어그램이다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"정규화"}),": 1NF(원자값), 2NF(부분 종속 제거), 3NF(이행 종속 제거)."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"트랜잭션"}),": ACID 속성으로 데이터의 안정성과 일관성을 보장한다."]}),s.jsx("li",{children:"COMMIT은 확정, ROLLBACK은 취소, SAVEPOINT는 중간 저장 지점이다."})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 다음 테이블이 어떤 정규형을 위반하는지 판단하세요: 학생(학번, 이름, 과목1, 과목2, 과목3)"]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."}),' "도서관 대출 시스템"의 ERD를 설계하세요 (회원, 도서, 대출 엔티티).']}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," 트랜잭션을 사용하여 도서 주문 처리를 작성하세요 (재고 감소 + 주문 기록 추가)."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/sql/advanced",className:"lesson-nav-btn prev",children:"← 고급 SQL"}),s.jsx(e,{to:"/references",className:"lesson-nav-btn next",children:"참고자료 →"})]})]})})})]});export{r as default};
