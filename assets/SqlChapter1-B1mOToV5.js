import{j as e,L as s}from"./index-PxxDzTRM.js";const l=()=>e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"01. SQL 환경 구축"}),e.jsx("p",{children:"MySQL 설치, DBeaver 설정, 샘플 데이터베이스 구성"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"학습 목표"}),e.jsxs("ul",{children:[e.jsx("li",{children:"MySQL 서버를 설치하고 기본 설정을 완료한다."}),e.jsx("li",{children:"DBeaver를 설치하고 MySQL에 연결한다."}),e.jsx("li",{children:"학습용 샘플 데이터베이스를 생성한다."}),e.jsx("li",{children:"SQL 명령어를 실행하는 기본 방법을 익힌다."})]})]}),e.jsx("h2",{children:"1. MySQL 설치"}),e.jsx("h3",{children:"1.1 MySQL이란?"}),e.jsxs("p",{children:[e.jsx("strong",{children:"MySQL"}),"은 세계에서 가장 널리 사용되는 오픈소스 관계형 데이터베이스 관리 시스템(RDBMS)입니다. 웹 애플리케이션, 엔터프라이즈 시스템, 데이터 분석 등 다양한 분야에서 활용됩니다."]}),e.jsx("h3",{children:"1.2 Windows에서 설치"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"MySQL 설치 단계 (Windows)"}),e.jsx("pre",{children:e.jsx("code",{children:`1. MySQL 공식 사이트(https://dev.mysql.com/downloads/)에서
   MySQL Installer 다운로드

2. "Developer Default" 또는 "Server only" 선택

3. 설치 과정에서 설정:
   - Root 비밀번호 설정 (기억해두세요!)
   - Port: 3306 (기본값)
   - Windows Service로 등록 (자동 시작)

4. 설치 완료 후 확인:
   $ mysql --version
   mysql  Ver 8.0.xx for Win64 on x86_64`})})]}),e.jsx("h3",{children:"1.3 macOS에서 설치"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Homebrew로 MySQL 설치 (macOS)"}),e.jsx("pre",{children:e.jsx("code",{children:`# Homebrew 설치 (없는 경우)
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# MySQL 설치
$ brew install mysql

# MySQL 서비스 시작
$ brew services start mysql

# Root 비밀번호 설정
$ mysql_secure_installation

# 버전 확인
$ mysql --version`})})]}),e.jsx("h3",{children:"1.4 MySQL 접속 확인"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"터미널에서 MySQL 접속"}),e.jsx("pre",{children:e.jsx("code",{children:`# MySQL 접속
$ mysql -u root -p
Enter password: ********

# 접속 성공 시
mysql> SELECT VERSION();
+-----------+
| VERSION() |
+-----------+
| 8.0.36    |
+-----------+

# 종료
mysql> EXIT;`})})]}),e.jsx("h2",{children:"2. DBeaver 설치 및 설정"}),e.jsx("h3",{children:"2.1 DBeaver란?"}),e.jsxs("p",{children:[e.jsx("strong",{children:"DBeaver"}),"는 무료 오픈소스 데이터베이스 관리 도구입니다. GUI 환경에서 SQL을 작성하고 실행할 수 있어, 터미널보다 편리하게 데이터베이스를 관리할 수 있습니다."]}),e.jsx("h3",{children:"2.2 DBeaver 설치"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"DBeaver 설치"}),e.jsx("pre",{children:e.jsx("code",{children:`1. DBeaver 공식 사이트(https://dbeaver.io/download/)에서
   Community Edition 다운로드

2. 운영체제에 맞는 버전 선택:
   - Windows: .exe 설치 파일
   - macOS: .dmg 파일
   - Linux: .deb 또는 .rpm

3. 설치 후 실행`})})]}),e.jsx("h3",{children:"2.3 MySQL 연결 설정"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"DBeaver에서 MySQL 연결"}),e.jsx("pre",{children:e.jsx("code",{children:`1. DBeaver 실행 → "새 데이터베이스 연결" 클릭
2. "MySQL" 선택 → "다음" 클릭
3. 연결 정보 입력:
   - Server Host: localhost
   - Port: 3306
   - Database: (비워두기)
   - Username: root
   - Password: (설치 시 설정한 비밀번호)
4. "Test Connection" 클릭 → "Connected" 확인
5. "완료" 클릭

※ 드라이버 다운로드 팝업이 뜨면 "다운로드" 클릭`})})]}),e.jsx("h2",{children:"3. 샘플 데이터베이스 생성"}),e.jsx("h3",{children:"3.1 학습용 데이터베이스 만들기"}),e.jsxs("p",{children:["본 학습에서 사용할 ",e.jsx("strong",{children:"school"})," 데이터베이스를 만들겠습니다. DBeaver의 SQL 편집기(Ctrl+Enter로 실행)에서 아래 코드를 순서대로 실행하세요."]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"데이터베이스 및 테이블 생성"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS school
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 선택
USE school;

-- 학생 테이블
CREATE TABLE students (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50)  NOT NULL,
    age        INT,
    major      VARCHAR(100),
    grade      DECIMAL(3,2),
    enrolled   DATE,
    email      VARCHAR(100) UNIQUE
);

-- 과목 테이블
CREATE TABLE courses (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(100) NOT NULL,
    professor   VARCHAR(50),
    credits     INT DEFAULT 3,
    department  VARCHAR(100)
);

-- 수강 테이블 (M:N 관계)
CREATE TABLE enrollments (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    student_id  INT NOT NULL,
    course_id   INT NOT NULL,
    semester    VARCHAR(20),
    score       INT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);`})})]}),e.jsx("h3",{children:"3.2 샘플 데이터 입력"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"샘플 데이터 삽입"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 학생 데이터
INSERT INTO students (name, age, major, grade, enrolled, email) VALUES
('홍길동', 20, '컴퓨터공학', 3.50, '2023-03-02', 'hong@school.ac.kr'),
('김영희', 21, '경영학',     3.80, '2022-03-02', 'kim@school.ac.kr'),
('이철수', 22, '전자공학',   3.20, '2021-03-02', 'lee@school.ac.kr'),
('박민지', 20, '컴퓨터공학', 3.90, '2023-03-02', 'park@school.ac.kr'),
('정수현', 23, '수학과',     2.80, '2020-03-02', 'jung@school.ac.kr'),
('최지우', 21, '경영학',     3.60, '2022-03-02', 'choi@school.ac.kr'),
('강동원', 22, '컴퓨터공학', 3.10, '2021-03-02', 'kang@school.ac.kr'),
('윤서연', 20, '디자인학',   3.70, '2023-03-02', 'yoon@school.ac.kr');

-- 과목 데이터
INSERT INTO courses (title, professor, credits, department) VALUES
('데이터베이스', '김교수', 3, '컴퓨터공학'),
('자료구조',     '이교수', 3, '컴퓨터공학'),
('경영학원론',   '박교수', 3, '경영학'),
('미적분학',     '정교수', 3, '수학과'),
('웹프로그래밍', '최교수', 3, '컴퓨터공학');

-- 수강 데이터
INSERT INTO enrollments (student_id, course_id, semester, score) VALUES
(1, 1, '2024-1', 85), (1, 2, '2024-1', 90),
(2, 3, '2024-1', 88), (2, 1, '2024-1', 75),
(3, 2, '2024-1', 70), (3, 4, '2024-1', 65),
(4, 1, '2024-1', 95), (4, 5, '2024-1', 92),
(5, 4, '2024-1', 60), (6, 3, '2024-1', 82),
(7, 1, '2024-1', 78), (7, 2, '2024-1', 80),
(8, 5, '2024-1', 88);`})})]}),e.jsx("h3",{children:"3.3 데이터 확인"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"데이터 확인 쿼리"}),e.jsx("pre",{children:e.jsx("code",{children:`-- 학생 목록 확인
SELECT * FROM students;

-- 과목 목록 확인
SELECT * FROM courses;

-- 수강 내역 확인
SELECT * FROM enrollments;`})})]}),e.jsx("h2",{children:"4. SQL 실행 환경 사용법"}),e.jsx("h3",{children:"4.1 DBeaver에서 SQL 실행"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"SQL 편집기 열기"}),": Ctrl+] (Windows) 또는 Cmd+] (macOS)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"전체 실행"}),": Ctrl+Shift+Enter — 편집기의 모든 SQL 실행"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"선택 실행"}),": Ctrl+Enter — 커서가 위치한 SQL 문 하나만 실행"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"자동 완성"}),": Ctrl+Space — 테이블명, 컬럼명 자동 완성"]})]}),e.jsx("h3",{children:"4.2 주의사항"}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"SQL 작성 시 주의사항"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["SQL 문장 끝에 ",e.jsx("strong",{children:"세미콜론(;)"}),"을 붙여야 합니다."]}),e.jsxs("li",{children:["SQL 키워드는 대소문자를 구분하지 않지만, ",e.jsx("strong",{children:"대문자로 작성"}),"하는 것이 관례입니다."]}),e.jsxs("li",{children:["문자열은 ",e.jsx("strong",{children:"작은따옴표('')"}),"로 감쌉니다 (큰따옴표 아님)."]}),e.jsxs("li",{children:["주석은 ",e.jsx("strong",{children:"-- (한 줄)"})," 또는 ",e.jsx("strong",{children:"/* */ (여러 줄)"}),"을 사용합니다."]})]})]}),e.jsxs("div",{className:"exercise-box",children:[e.jsx("h3",{children:"실습 과제"}),e.jsxs("p",{children:[e.jsx("strong",{children:"과제 1."})," MySQL을 설치하고 터미널에서 ",e.jsx("code",{children:"mysql --version"}),"으로 버전을 확인하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"과제 2."})," DBeaver를 설치하고 MySQL에 연결하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"과제 3."})," 위의 샘플 데이터베이스(school)를 생성하고 ",e.jsx("code",{children:"SELECT * FROM students;"}),"로 데이터를 확인하세요."]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/sql",className:"lesson-nav-btn prev",children:"← SQL 목차"}),e.jsx(s,{to:"/sql/select",className:"lesson-nav-btn next",children:"SELECT 기초 →"})]})]})})})]});export{l as default};
