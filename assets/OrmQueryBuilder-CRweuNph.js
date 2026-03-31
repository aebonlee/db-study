import{j as e,L as s}from"./index-Cb0IWjvp.js";const n=()=>e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"ORM과 쿼리빌더"}),e.jsx("p",{children:"Prisma, Sequelize, TypeORM, SQLAlchemy 비교"})]})}),e.jsx("section",{className:"section lesson-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"lesson-body",children:[e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"학습 목표"}),e.jsxs("ul",{children:[e.jsx("li",{children:"ORM(Object-Relational Mapping)의 개념과 장단점을 이해한다."}),e.jsx("li",{children:"쿼리빌더와 Raw SQL의 차이를 파악한다."}),e.jsx("li",{children:"주요 ORM/쿼리빌더의 문법을 비교한다."}),e.jsx("li",{children:"프로젝트 상황에 맞는 DB 접근 방식을 선택한다."})]})]}),e.jsx("h2",{children:"1. DB 접근 방식 비교"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"방식"}),e.jsx("th",{children:"설명"}),e.jsx("th",{children:"예시"}),e.jsx("th",{children:"장점"}),e.jsx("th",{children:"단점"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Raw SQL"})}),e.jsx("td",{children:"SQL을 직접 작성"}),e.jsx("td",{children:"mysql2, pg"}),e.jsx("td",{children:"최고 성능, 완전한 제어"}),e.jsx("td",{children:"반복 코드, SQL Injection 위험"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"쿼리빌더"})}),e.jsx("td",{children:"메서드 체인으로 SQL 생성"}),e.jsx("td",{children:"Knex.js"}),e.jsx("td",{children:"SQL 추상화, DB 이식성"}),e.jsx("td",{children:"복잡한 쿼리 한계"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"ORM"})}),e.jsx("td",{children:"객체 ↔ 테이블 자동 매핑"}),e.jsx("td",{children:"Prisma, Sequelize"}),e.jsx("td",{children:"객체 지향, 관계 매핑"}),e.jsx("td",{children:"학습 곡선, N+1 문제"})]})]})]}),e.jsx("h2",{children:"2. Prisma (Node.js — 가장 인기)"}),e.jsx("h3",{children:"2.1 특징"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"차세대 ORM"})," — TypeScript 최우선 지원, 타입 안전"]}),e.jsx("li",{children:"스키마 파일(.prisma)로 모델을 정의하면 자동으로 클라이언트 코드 생성"}),e.jsx("li",{children:"직관적인 API, 자동 완성 지원"}),e.jsx("li",{children:"마이그레이션 기능 내장"}),e.jsx("li",{children:"MySQL, PostgreSQL, SQLite, SQL Server, MongoDB 지원"})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"schema.prisma — 스키마 정의"}),e.jsx("pre",{children:e.jsx("code",{children:`datasource db {
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
}`})})]}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Prisma CRUD 예시"}),e.jsx("pre",{children:e.jsx("code",{children:`import { PrismaClient } from '@prisma/client'
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
await prisma.student.delete({ where: { id: 1 } })`})})]}),e.jsx("h2",{children:"3. Sequelize (Node.js — 전통적)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"Sequelize 모델 및 CRUD"}),e.jsx("pre",{children:e.jsx("code",{children:`const { Sequelize, DataTypes } = require('sequelize');
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

await Student.destroy({ where: { id: 1 } });`})})]}),e.jsx("h2",{children:"4. TypeORM (TypeScript/Node.js)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"TypeORM 엔티티 및 CRUD"}),e.jsx("pre",{children:e.jsx("code",{children:`import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
await repo.delete(1);`})})]}),e.jsx("h2",{children:"5. SQLAlchemy (Python)"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"SQLAlchemy 2.0 스타일"}),e.jsx("pre",{children:e.jsx("code",{children:`from sqlalchemy import create_engine, select
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
    session.commit()`})})]}),e.jsx("h2",{children:"6. ORM 비교 정리"}),e.jsxs("table",{className:"lesson-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"ORM"}),e.jsx("th",{children:"언어"}),e.jsx("th",{children:"타입 안전"}),e.jsx("th",{children:"마이그레이션"}),e.jsx("th",{children:"학습 곡선"}),e.jsx("th",{children:"인기도"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Prisma"})}),e.jsx("td",{children:"Node.js/TS"}),e.jsx("td",{children:"매우 높음"}),e.jsx("td",{children:"내장"}),e.jsx("td",{children:"낮음"}),e.jsx("td",{children:"가장 빠르게 성장"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Sequelize"})}),e.jsx("td",{children:"Node.js"}),e.jsx("td",{children:"보통"}),e.jsx("td",{children:"내장"}),e.jsx("td",{children:"중간"}),e.jsx("td",{children:"전통적 인기"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"TypeORM"})}),e.jsx("td",{children:"Node.js/TS"}),e.jsx("td",{children:"높음"}),e.jsx("td",{children:"내장"}),e.jsx("td",{children:"중간"}),e.jsx("td",{children:"NestJS 공식"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Drizzle"})}),e.jsx("td",{children:"Node.js/TS"}),e.jsx("td",{children:"매우 높음"}),e.jsx("td",{children:"내장"}),e.jsx("td",{children:"낮음"}),e.jsx("td",{children:"신흥 인기"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"SQLAlchemy"})}),e.jsx("td",{children:"Python"}),e.jsx("td",{children:"2.0+에서 개선"}),e.jsx("td",{children:"Alembic"}),e.jsx("td",{children:"높음"}),e.jsx("td",{children:"Python 표준"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Django ORM"})}),e.jsx("td",{children:"Python"}),e.jsx("td",{children:"보통"}),e.jsx("td",{children:"내장"}),e.jsx("td",{children:"낮음"}),e.jsx("td",{children:"Django 필수"})]})]})]}),e.jsx("h2",{children:"7. N+1 문제와 해결"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"code-header",children:"N+1 문제 예시"}),e.jsx("pre",{children:e.jsx("code",{children:`// ❌ N+1 문제 — 학생 10명 조회 → 각각 수강 내역 10번 추가 쿼리 = 총 11번
const students = await prisma.student.findMany();  // 1번 쿼리
for (const s of students) {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: s.id }  // N번 쿼리 (학생 수만큼)
  });
}

// ✅ 해결 — include로 한 번에 조회 (JOIN)
const students = await prisma.student.findMany({
  include: { enrollments: { include: { course: true } } }
});  // 1~2번 쿼리로 해결!`})})]}),e.jsxs("div",{className:"callout-box",children:[e.jsx("h3",{children:"핵심 정리"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Raw SQL"}),": 최고 성능과 제어, 반복 코드 많음."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"쿼리빌더"}),": SQL을 추상화, DB 이식성 제공."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ORM"}),": 객체 지향적 DB 조작, 관계 자동 매핑."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Prisma"}),"가 현재 Node.js/TypeScript에서 가장 인기 있는 ORM이다."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"N+1 문제"}),"를 이해하고 include/eager loading으로 해결해야 한다."]})]})]}),e.jsxs("div",{className:"exercise-box",children:[e.jsx("h3",{children:"확인 문제"}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 1."})," Raw SQL, 쿼리빌더, ORM의 차이점을 설명하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 2."})," Prisma에서 학생과 수강 내역을 한 번에 조회하는 코드를 작성하세요."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"문제 3."})," N+1 문제가 무엇이고 어떻게 해결하는지 설명하세요."]})]}),e.jsxs("div",{className:"lesson-nav",children:[e.jsx(s,{to:"/web/python-db",className:"lesson-nav-btn prev",children:"← Python + DB"}),e.jsx(s,{to:"/web/auth-security",className:"lesson-nav-btn next",children:"인증과 보안 →"})]})]})})})]});export{n as default};
