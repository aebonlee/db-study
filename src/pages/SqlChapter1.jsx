import { Link } from 'react-router-dom';

const SqlChapter1 = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>1장. SQL 환경 구축</h1>
        <p>MySQL 설치, DBeaver 설정, 샘플 데이터베이스 구성</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>MySQL 서버를 설치하고 기본 설정을 완료한다.</li>
              <li>DBeaver를 설치하고 MySQL에 연결한다.</li>
              <li>학습용 샘플 데이터베이스를 생성한다.</li>
              <li>SQL 명령어를 실행하는 기본 방법을 익힌다.</li>
            </ul>
          </div>

          <h2>1. MySQL 설치</h2>

          <h3>1.1 MySQL이란?</h3>
          <p>
            <strong>MySQL</strong>은 세계에서 가장 널리 사용되는 오픈소스 관계형 데이터베이스 관리 시스템(RDBMS)입니다.
            웹 애플리케이션, 엔터프라이즈 시스템, 데이터 분석 등 다양한 분야에서 활용됩니다.
          </p>

          <h3>1.2 Windows에서 설치</h3>
          <div className="code-block">
            <div className="code-header">MySQL 설치 단계 (Windows)</div>
            <pre><code>{`1. MySQL 공식 사이트(https://dev.mysql.com/downloads/)에서
   MySQL Installer 다운로드

2. "Developer Default" 또는 "Server only" 선택

3. 설치 과정에서 설정:
   - Root 비밀번호 설정 (기억해두세요!)
   - Port: 3306 (기본값)
   - Windows Service로 등록 (자동 시작)

4. 설치 완료 후 확인:
   $ mysql --version
   mysql  Ver 8.0.xx for Win64 on x86_64`}</code></pre>
          </div>

          <h3>1.3 macOS에서 설치</h3>
          <div className="code-block">
            <div className="code-header">Homebrew로 MySQL 설치 (macOS)</div>
            <pre><code>{`# Homebrew 설치 (없는 경우)
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# MySQL 설치
$ brew install mysql

# MySQL 서비스 시작
$ brew services start mysql

# Root 비밀번호 설정
$ mysql_secure_installation

# 버전 확인
$ mysql --version`}</code></pre>
          </div>

          <h3>1.4 MySQL 접속 확인</h3>
          <div className="code-block">
            <div className="code-header">터미널에서 MySQL 접속</div>
            <pre><code>{`# MySQL 접속
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
mysql> EXIT;`}</code></pre>
          </div>

          <h2>2. DBeaver 설치 및 설정</h2>

          <h3>2.1 DBeaver란?</h3>
          <p>
            <strong>DBeaver</strong>는 무료 오픈소스 데이터베이스 관리 도구입니다. GUI 환경에서 SQL을 작성하고 실행할 수 있어,
            터미널보다 편리하게 데이터베이스를 관리할 수 있습니다.
          </p>

          <h3>2.2 DBeaver 설치</h3>
          <div className="code-block">
            <div className="code-header">DBeaver 설치</div>
            <pre><code>{`1. DBeaver 공식 사이트(https://dbeaver.io/download/)에서
   Community Edition 다운로드

2. 운영체제에 맞는 버전 선택:
   - Windows: .exe 설치 파일
   - macOS: .dmg 파일
   - Linux: .deb 또는 .rpm

3. 설치 후 실행`}</code></pre>
          </div>

          <h3>2.3 MySQL 연결 설정</h3>
          <div className="code-block">
            <div className="code-header">DBeaver에서 MySQL 연결</div>
            <pre><code>{`1. DBeaver 실행 → "새 데이터베이스 연결" 클릭
2. "MySQL" 선택 → "다음" 클릭
3. 연결 정보 입력:
   - Server Host: localhost
   - Port: 3306
   - Database: (비워두기)
   - Username: root
   - Password: (설치 시 설정한 비밀번호)
4. "Test Connection" 클릭 → "Connected" 확인
5. "완료" 클릭

※ 드라이버 다운로드 팝업이 뜨면 "다운로드" 클릭`}</code></pre>
          </div>

          <h2>3. 샘플 데이터베이스 생성</h2>

          <h3>3.1 학습용 데이터베이스 만들기</h3>
          <p>
            본 학습에서 사용할 <strong>school</strong> 데이터베이스를 만들겠습니다.
            DBeaver의 SQL 편집기(Ctrl+Enter로 실행)에서 아래 코드를 순서대로 실행하세요.
          </p>
          <div className="code-block">
            <div className="code-header">데이터베이스 및 테이블 생성</div>
            <pre><code>{`-- 데이터베이스 생성
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
);`}</code></pre>
          </div>

          <h3>3.2 샘플 데이터 입력</h3>
          <div className="code-block">
            <div className="code-header">샘플 데이터 삽입</div>
            <pre><code>{`-- 학생 데이터
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
(8, 5, '2024-1', 88);`}</code></pre>
          </div>

          <h3>3.3 데이터 확인</h3>
          <div className="code-block">
            <div className="code-header">데이터 확인 쿼리</div>
            <pre><code>{`-- 학생 목록 확인
SELECT * FROM students;

-- 과목 목록 확인
SELECT * FROM courses;

-- 수강 내역 확인
SELECT * FROM enrollments;`}</code></pre>
          </div>

          <h2>4. SQL 실행 환경 사용법</h2>

          <h3>4.1 DBeaver에서 SQL 실행</h3>
          <ul>
            <li><strong>SQL 편집기 열기</strong>: Ctrl+] (Windows) 또는 Cmd+] (macOS)</li>
            <li><strong>전체 실행</strong>: Ctrl+Shift+Enter — 편집기의 모든 SQL 실행</li>
            <li><strong>선택 실행</strong>: Ctrl+Enter — 커서가 위치한 SQL 문 하나만 실행</li>
            <li><strong>자동 완성</strong>: Ctrl+Space — 테이블명, 컬럼명 자동 완성</li>
          </ul>

          <h3>4.2 주의사항</h3>
          <div className="callout-box">
            <h3>SQL 작성 시 주의사항</h3>
            <ul>
              <li>SQL 문장 끝에 <strong>세미콜론(;)</strong>을 붙여야 합니다.</li>
              <li>SQL 키워드는 대소문자를 구분하지 않지만, <strong>대문자로 작성</strong>하는 것이 관례입니다.</li>
              <li>문자열은 <strong>작은따옴표('')</strong>로 감쌉니다 (큰따옴표 아님).</li>
              <li>주석은 <strong>-- (한 줄)</strong> 또는 <strong>/* */ (여러 줄)</strong>을 사용합니다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>실습 과제</h3>
            <p><strong>과제 1.</strong> MySQL을 설치하고 터미널에서 <code>mysql --version</code>으로 버전을 확인하세요.</p>
            <p><strong>과제 2.</strong> DBeaver를 설치하고 MySQL에 연결하세요.</p>
            <p><strong>과제 3.</strong> 위의 샘플 데이터베이스(school)를 생성하고 <code>SELECT * FROM students;</code>로 데이터를 확인하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/sql" className="lesson-nav-btn prev">&larr; SQL 목차</Link>
            <Link to="/sql/select" className="lesson-nav-btn next">SELECT 기초 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SqlChapter1;
