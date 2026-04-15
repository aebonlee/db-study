import{j as s,L as d}from"./index-DDYL5Uc_.js";const r=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"08. 테이블 정의 (DDL)"}),s.jsx("p",{children:"CREATE TABLE, ALTER, DROP, 자료형, 제약조건"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"CREATE TABLE로 테이블을 생성한다."}),s.jsx("li",{children:"MySQL의 주요 자료형을 이해한다."}),s.jsx("li",{children:"제약 조건(NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY 등)을 설정한다."}),s.jsx("li",{children:"ALTER TABLE로 테이블 구조를 변경한다."}),s.jsx("li",{children:"DROP TABLE로 테이블을 삭제한다."})]})]}),s.jsx("h2",{children:"1. MySQL 주요 자료형"}),s.jsx("h3",{children:"1.1 숫자형"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"자료형"}),s.jsx("th",{children:"크기"}),s.jsx("th",{children:"범위"}),s.jsx("th",{children:"용도"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TINYINT"})}),s.jsx("td",{children:"1바이트"}),s.jsx("td",{children:"-128 ~ 127"}),s.jsx("td",{children:"작은 정수, 상태값"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"INT"})}),s.jsx("td",{children:"4바이트"}),s.jsx("td",{children:"약 ±21억"}),s.jsx("td",{children:"일반 정수 (가장 많이 사용)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"BIGINT"})}),s.jsx("td",{children:"8바이트"}),s.jsx("td",{children:"약 ±922경"}),s.jsx("td",{children:"매우 큰 정수"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DECIMAL(p,s)"})}),s.jsx("td",{children:"가변"}),s.jsx("td",{children:"정밀 소수"}),s.jsx("td",{children:"금액, 학점 (정확한 계산)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"FLOAT"})}),s.jsx("td",{children:"4바이트"}),s.jsx("td",{children:"근사 소수"}),s.jsx("td",{children:"과학 계산 (근사치 허용)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DOUBLE"})}),s.jsx("td",{children:"8바이트"}),s.jsx("td",{children:"근사 소수"}),s.jsx("td",{children:"과학 계산 (높은 정밀도)"})]})]})]}),s.jsx("h3",{children:"1.2 문자형"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"자료형"}),s.jsx("th",{children:"크기"}),s.jsx("th",{children:"특징"}),s.jsx("th",{children:"용도"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CHAR(n)"})}),s.jsx("td",{children:"고정 n바이트"}),s.jsx("td",{children:"남는 공간 공백 채움"}),s.jsx("td",{children:"코드, 우편번호 등 고정 길이"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"VARCHAR(n)"})}),s.jsx("td",{children:"가변 최대 n"}),s.jsx("td",{children:"실제 데이터 크기만큼만 저장"}),s.jsx("td",{children:"이름, 이메일 등 (가장 많이 사용)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TEXT"})}),s.jsx("td",{children:"최대 65KB"}),s.jsx("td",{children:"긴 텍스트"}),s.jsx("td",{children:"본문, 설명"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"LONGTEXT"})}),s.jsx("td",{children:"최대 4GB"}),s.jsx("td",{children:"매우 긴 텍스트"}),s.jsx("td",{children:"대용량 텍스트"})]})]})]}),s.jsx("h3",{children:"1.3 날짜/시간형"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"자료형"}),s.jsx("th",{children:"형식"}),s.jsx("th",{children:"용도"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DATE"})}),s.jsx("td",{children:"YYYY-MM-DD"}),s.jsx("td",{children:"날짜만"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TIME"})}),s.jsx("td",{children:"HH:MM:SS"}),s.jsx("td",{children:"시간만"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DATETIME"})}),s.jsx("td",{children:"YYYY-MM-DD HH:MM:SS"}),s.jsx("td",{children:"날짜 + 시간"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"TIMESTAMP"})}),s.jsx("td",{children:"YYYY-MM-DD HH:MM:SS"}),s.jsx("td",{children:"자동 업데이트 가능, UTC 저장"})]})]})]}),s.jsx("h2",{children:"2. CREATE TABLE — 테이블 생성"}),s.jsx("h3",{children:"2.1 기본 문법"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`CREATE TABLE 테이블명 (
    컬럼명1 자료형 [제약조건],
    컬럼명2 자료형 [제약조건],
    ...
    [테이블 레벨 제약조건]
);`})})]}),s.jsx("h3",{children:"2.2 실전 예제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`CREATE TABLE employees (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(50) NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    department  VARCHAR(50) DEFAULT '미정',
    salary      DECIMAL(10,2),
    hire_date   DATE NOT NULL,
    is_active   TINYINT(1) DEFAULT 1,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`})})]}),s.jsx("h2",{children:"3. 제약 조건 (Constraints)"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"제약 조건"}),s.jsx("th",{children:"설명"}),s.jsx("th",{children:"예시"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"NOT NULL"})}),s.jsx("td",{children:"NULL 값 불허"}),s.jsx("td",{children:"name VARCHAR(50) NOT NULL"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"UNIQUE"})}),s.jsx("td",{children:"중복 값 불허 (NULL 허용)"}),s.jsx("td",{children:"email VARCHAR(100) UNIQUE"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"PRIMARY KEY"})}),s.jsx("td",{children:"기본키 (NOT NULL + UNIQUE)"}),s.jsx("td",{children:"id INT PRIMARY KEY"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"FOREIGN KEY"})}),s.jsx("td",{children:"외래키 (다른 테이블 참조)"}),s.jsx("td",{children:"FOREIGN KEY (dept_id) REFERENCES departments(id)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"DEFAULT"})}),s.jsx("td",{children:"기본값 설정"}),s.jsx("td",{children:"status VARCHAR(20) DEFAULT '활성'"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CHECK"})}),s.jsx("td",{children:"값 범위 제한 (MySQL 8.0+)"}),s.jsx("td",{children:"CHECK (age >= 0 AND age <= 150)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"AUTO_INCREMENT"})}),s.jsx("td",{children:"자동 증가 (MySQL)"}),s.jsx("td",{children:"id INT PRIMARY KEY AUTO_INCREMENT"})]})]})]}),s.jsx("h3",{children:"3.1 외래키(FOREIGN KEY) 상세"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 부서 테이블
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
);`})})]}),s.jsx("h3",{children:"3.2 ON DELETE / ON UPDATE 옵션"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"옵션"}),s.jsx("th",{children:"설명"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"CASCADE"})}),s.jsx("td",{children:"부모 행 삭제/수정 시 자식도 함께 삭제/수정"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"SET NULL"})}),s.jsx("td",{children:"부모 행 삭제/수정 시 자식의 외래키를 NULL로"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"RESTRICT"})}),s.jsx("td",{children:"자식이 참조 중이면 부모 삭제/수정 거부 (기본값)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"SET DEFAULT"})}),s.jsx("td",{children:"기본값으로 설정 (InnoDB에서 미지원)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"NO ACTION"})}),s.jsx("td",{children:"RESTRICT와 동일"})]})]})]}),s.jsx("h2",{children:"4. ALTER TABLE — 테이블 구조 변경"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 컬럼 추가
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
DROP INDEX uk_email;`})})]}),s.jsx("h2",{children:"5. DROP TABLE — 테이블 삭제"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 테이블 삭제
DROP TABLE 테이블명;

-- 테이블이 존재할 때만 삭제 (에러 방지)
DROP TABLE IF EXISTS 테이블명;

-- 주의: 외래키로 참조되는 테이블은 삭제 불가
-- → 자식 테이블을 먼저 삭제하거나 외래키를 제거해야 함`})})]}),s.jsx("h2",{children:"6. 데이터베이스 관리"}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"SQL"}),s.jsx("pre",{children:s.jsx("code",{children:`-- 데이터베이스 생성
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
DROP DATABASE IF EXISTS mydb;`})})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["MySQL 자료형: ",s.jsx("strong",{children:"INT, VARCHAR, DATE, DECIMAL"})," 등이 가장 많이 사용된다."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"제약 조건"}),": NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, DEFAULT, CHECK"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"CREATE TABLE"}),": 테이블 생성, ",s.jsx("strong",{children:"ALTER TABLE"}),": 구조 변경, ",s.jsx("strong",{children:"DROP TABLE"}),": 삭제"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"외래키"}),"의 ON DELETE/ON UPDATE 옵션으로 참조 무결성을 관리한다."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"연습 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," 도서(books) 테이블을 만드세요: id(PK), title(NOT NULL), author, price(DECIMAL), published_date(DATE)"]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," books 테이블에 publisher(VARCHAR(50), DEFAULT '미정') 컬럼을 추가하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," 외래키의 ON DELETE CASCADE와 ON DELETE SET NULL의 차이를 설명하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(d,{to:"/sql/dml",className:"lesson-nav-btn prev",children:"← 데이터 조작 (DML)"}),s.jsx(d,{to:"/sql/join",className:"lesson-nav-btn next",children:"JOIN →"})]})]})})})]});export{r as default};
