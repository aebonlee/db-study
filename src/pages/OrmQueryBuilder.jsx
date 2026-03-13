import { Link } from 'react-router-dom';

const OrmQueryBuilder = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>ORM과 쿼리빌더</h1>
        <p>Prisma, Sequelize, TypeORM, SQLAlchemy 비교</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>ORM(Object-Relational Mapping)의 개념과 장단점을 이해한다.</li>
              <li>쿼리빌더와 Raw SQL의 차이를 파악한다.</li>
              <li>주요 ORM/쿼리빌더의 문법을 비교한다.</li>
              <li>프로젝트 상황에 맞는 DB 접근 방식을 선택한다.</li>
            </ul>
          </div>

          <h2>1. DB 접근 방식 비교</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>방식</th><th>설명</th><th>예시</th><th>장점</th><th>단점</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Raw SQL</strong></td><td>SQL을 직접 작성</td><td>mysql2, pg</td><td>최고 성능, 완전한 제어</td><td>반복 코드, SQL Injection 위험</td></tr>
              <tr><td><strong>쿼리빌더</strong></td><td>메서드 체인으로 SQL 생성</td><td>Knex.js</td><td>SQL 추상화, DB 이식성</td><td>복잡한 쿼리 한계</td></tr>
              <tr><td><strong>ORM</strong></td><td>객체 ↔ 테이블 자동 매핑</td><td>Prisma, Sequelize</td><td>객체 지향, 관계 매핑</td><td>학습 곡선, N+1 문제</td></tr>
            </tbody>
          </table>

          <h2>2. Prisma (Node.js — 가장 인기)</h2>

          <h3>2.1 특징</h3>
          <ul>
            <li><strong>차세대 ORM</strong> — TypeScript 최우선 지원, 타입 안전</li>
            <li>스키마 파일(.prisma)로 모델을 정의하면 자동으로 클라이언트 코드 생성</li>
            <li>직관적인 API, 자동 완성 지원</li>
            <li>마이그레이션 기능 내장</li>
            <li>MySQL, PostgreSQL, SQLite, SQL Server, MongoDB 지원</li>
          </ul>

          <div className="code-block">
            <div className="code-header">schema.prisma — 스키마 정의</div>
            <pre><code>{`datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Student {
  id         Int          @id @default(autoincrement())
  name       String       @db.VarChar(50)
  age        Int?
  major      String?      @db.VarChar(100)
  grade      Float?
  email      String?      @unique @db.VarChar(100)
  enrolledAt DateTime?    @map("enrolled") @db.Date
  enrollments Enrollment[]

  @@map("students")
}

model Course {
  id          Int          @id @default(autoincrement())
  title       String       @db.VarChar(100)
  professor   String?      @db.VarChar(50)
  credits     Int          @default(3)
  enrollments Enrollment[]

  @@map("courses")
}

model Enrollment {
  id        Int     @id @default(autoincrement())
  student   Student @relation(fields: [studentId], references: [id])
  studentId Int     @map("student_id")
  course    Course  @relation(fields: [courseId], references: [id])
  courseId   Int     @map("course_id")
  semester  String? @db.VarChar(20)
  score     Int?

  @@map("enrollments")
}`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">Prisma CRUD 예시</div>
            <pre><code>{`import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// CREATE
const student = await prisma.student.create({
  data: { name: '홍길동', age: 20, major: '컴퓨터공학', grade: 3.5 }
})

// READ — 전체 조회 (WHERE, ORDER BY, LIMIT)
const students = await prisma.student.findMany({
  where: { major: '컴퓨터공학', grade: { gte: 3.0 } },
  orderBy: { grade: 'desc' },
  take: 10
})

// READ — 관계 포함 조회 (자동 JOIN!)
const studentWithCourses = await prisma.student.findUnique({
  where: { id: 1 },
  include: {
    enrollments: {
      include: { course: true }
    }
  }
})

// UPDATE
await prisma.student.update({
  where: { id: 1 },
  data: { grade: 3.7 }
})

// DELETE
await prisma.student.delete({ where: { id: 1 } })`}</code></pre>
          </div>

          <h2>3. Sequelize (Node.js — 전통적)</h2>

          <div className="code-block">
            <div className="code-header">Sequelize 모델 및 CRUD</div>
            <pre><code>{`const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('school', 'root', 'password', {
  host: 'localhost', dialect: 'mysql'
});

// 모델 정의
const Student = sequelize.define('Student', {
  name:  { type: DataTypes.STRING(50), allowNull: false },
  age:   { type: DataTypes.INTEGER },
  major: { type: DataTypes.STRING(100) },
  grade: { type: DataTypes.FLOAT },
  email: { type: DataTypes.STRING(100), unique: true }
}, { tableName: 'students', timestamps: false });

// CRUD
const all = await Student.findAll({
  where: { major: '컴퓨터공학' },
  order: [['grade', 'DESC']]
});

const student = await Student.create({
  name: '홍길동', age: 20, major: '컴퓨터공학'
});

await Student.update({ grade: 3.7 }, { where: { id: 1 } });

await Student.destroy({ where: { id: 1 } });`}</code></pre>
          </div>

          <h2>4. TypeORM (TypeScript/Node.js)</h2>

          <div className="code-block">
            <div className="code-header">TypeORM 엔티티 및 CRUD</div>
            <pre><code>{`import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ length: 100, nullable: true })
  major: string;

  @Column('float', { nullable: true })
  grade: number;
}

// CRUD (Repository 패턴)
const repo = dataSource.getRepository(Student);

// 조회
const students = await repo.find({
  where: { major: '컴퓨터공학' },
  order: { grade: 'DESC' }
});

// 생성
const student = repo.create({ name: '홍길동', age: 20 });
await repo.save(student);

// 수정
await repo.update(1, { grade: 3.7 });

// 삭제
await repo.delete(1);`}</code></pre>
          </div>

          <h2>5. SQLAlchemy (Python)</h2>

          <div className="code-block">
            <div className="code-header">SQLAlchemy 2.0 스타일</div>
            <pre><code>{`from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session, DeclarativeBase, Mapped, mapped_column

engine = create_engine("mysql+pymysql://root:pass@localhost/school")

class Base(DeclarativeBase):
    pass

class Student(Base):
    __tablename__ = 'students'
    id:    Mapped[int] = mapped_column(primary_key=True)
    name:  Mapped[str] = mapped_column(String(50))
    major: Mapped[str | None] = mapped_column(String(100))
    grade: Mapped[float | None]

# 조회
with Session(engine) as session:
    stmt = select(Student).where(Student.major == '컴퓨터공학')
    students = session.scalars(stmt).all()

# 생성
with Session(engine) as session:
    student = Student(name='홍길동', age=20, major='컴퓨터공학')
    session.add(student)
    session.commit()`}</code></pre>
          </div>

          <h2>6. ORM 비교 정리</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>ORM</th><th>언어</th><th>타입 안전</th><th>마이그레이션</th><th>학습 곡선</th><th>인기도</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Prisma</strong></td><td>Node.js/TS</td><td>매우 높음</td><td>내장</td><td>낮음</td><td>가장 빠르게 성장</td></tr>
              <tr><td><strong>Sequelize</strong></td><td>Node.js</td><td>보통</td><td>내장</td><td>중간</td><td>전통적 인기</td></tr>
              <tr><td><strong>TypeORM</strong></td><td>Node.js/TS</td><td>높음</td><td>내장</td><td>중간</td><td>NestJS 공식</td></tr>
              <tr><td><strong>Drizzle</strong></td><td>Node.js/TS</td><td>매우 높음</td><td>내장</td><td>낮음</td><td>신흥 인기</td></tr>
              <tr><td><strong>SQLAlchemy</strong></td><td>Python</td><td>2.0+에서 개선</td><td>Alembic</td><td>높음</td><td>Python 표준</td></tr>
              <tr><td><strong>Django ORM</strong></td><td>Python</td><td>보통</td><td>내장</td><td>낮음</td><td>Django 필수</td></tr>
            </tbody>
          </table>

          <h2>7. N+1 문제와 해결</h2>

          <div className="code-block">
            <div className="code-header">N+1 문제 예시</div>
            <pre><code>{`// ❌ N+1 문제 — 학생 10명 조회 → 각각 수강 내역 10번 추가 쿼리 = 총 11번
const students = await prisma.student.findMany();  // 1번 쿼리
for (const s of students) {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: s.id }  // N번 쿼리 (학생 수만큼)
  });
}

// ✅ 해결 — include로 한 번에 조회 (JOIN)
const students = await prisma.student.findMany({
  include: { enrollments: { include: { course: true } } }
});  // 1~2번 쿼리로 해결!`}</code></pre>
          </div>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>Raw SQL</strong>: 최고 성능과 제어, 반복 코드 많음.</li>
              <li><strong>쿼리빌더</strong>: SQL을 추상화, DB 이식성 제공.</li>
              <li><strong>ORM</strong>: 객체 지향적 DB 조작, 관계 자동 매핑.</li>
              <li><strong>Prisma</strong>가 현재 Node.js/TypeScript에서 가장 인기 있는 ORM이다.</li>
              <li><strong>N+1 문제</strong>를 이해하고 include/eager loading으로 해결해야 한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> Raw SQL, 쿼리빌더, ORM의 차이점을 설명하세요.</p>
            <p><strong>문제 2.</strong> Prisma에서 학생과 수강 내역을 한 번에 조회하는 코드를 작성하세요.</p>
            <p><strong>문제 3.</strong> N+1 문제가 무엇이고 어떻게 해결하는지 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/web/python-db" className="lesson-nav-btn prev">&larr; Python + DB</Link>
            <Link to="/web/auth-security" className="lesson-nav-btn next">인증과 보안 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default OrmQueryBuilder;
