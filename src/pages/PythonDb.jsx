import { Link } from 'react-router-dom';

const PythonDb = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>Python + DB</h1>
        <p>Flask/FastAPI, SQLAlchemy ORM, DB 연동 패턴</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>Python에서 MySQL/PostgreSQL에 연결하는 방법을 익힌다.</li>
              <li>Flask로 간단한 REST API를 구축한다.</li>
              <li>FastAPI로 고성능 비동기 API를 구축한다.</li>
              <li>SQLAlchemy ORM으로 DB를 객체 지향적으로 다룬다.</li>
            </ul>
          </div>

          <h2>1. Python DB 드라이버</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>DB</th><th>드라이버</th><th>설치</th><th>특징</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>MySQL</strong></td><td>PyMySQL</td><td>pip install pymysql</td><td>순수 Python, 간편</td></tr>
              <tr><td><strong>MySQL</strong></td><td>mysql-connector</td><td>pip install mysql-connector-python</td><td>Oracle 공식</td></tr>
              <tr><td><strong>PostgreSQL</strong></td><td>psycopg2</td><td>pip install psycopg2-binary</td><td>가장 인기 있는 PG 드라이버</td></tr>
              <tr><td><strong>SQLite</strong></td><td>sqlite3</td><td>기본 내장</td><td>설치 불필요</td></tr>
            </tbody>
          </table>

          <h2>2. Flask + MySQL 연동</h2>

          <h3>2.1 프로젝트 설정</h3>
          <div className="code-block">
            <div className="code-header">터미널</div>
            <pre><code>{`# 가상 환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\\Scripts\\activate     # Windows

# 패키지 설치
pip install flask pymysql python-dotenv`}</code></pre>
          </div>

          <h3>2.2 Flask CRUD API</h3>
          <div className="code-block">
            <div className="code-header">app.py — Flask + MySQL</div>
            <pre><code>{`from flask import Flask, request, jsonify
import pymysql
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

def get_db():
    """DB 연결 생성"""
    return pymysql.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        user=os.getenv('DB_USER', 'root'),
        password=os.getenv('DB_PASS', ''),
        database=os.getenv('DB_NAME', 'school'),
        cursorclass=pymysql.cursors.DictCursor  # 딕셔너리로 결과 반환
    )

# 전체 학생 조회
@app.route('/api/students', methods=['GET'])
def get_students():
    db = get_db()
    try:
        with db.cursor() as cursor:
            cursor.execute('SELECT * FROM students ORDER BY id')
            students = cursor.fetchall()
        return jsonify({'success': True, 'data': students})
    finally:
        db.close()

# 특정 학생 조회
@app.route('/api/students/<int:id>', methods=['GET'])
def get_student(id):
    db = get_db()
    try:
        with db.cursor() as cursor:
            cursor.execute('SELECT * FROM students WHERE id = %s', (id,))
            student = cursor.fetchone()
        if not student:
            return jsonify({'success': False, 'message': '학생을 찾을 수 없습니다'}), 404
        return jsonify({'success': True, 'data': student})
    finally:
        db.close()

# 학생 등록
@app.route('/api/students', methods=['POST'])
def create_student():
    data = request.get_json()
    db = get_db()
    try:
        with db.cursor() as cursor:
            cursor.execute(
                'INSERT INTO students (name, age, major, grade, email) '
                'VALUES (%s, %s, %s, %s, %s)',
                (data['name'], data.get('age'), data.get('major'),
                 data.get('grade'), data.get('email'))
            )
            db.commit()
            return jsonify({'success': True, 'id': cursor.lastrowid}), 201
    finally:
        db.close()

# 학생 수정
@app.route('/api/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()
    db = get_db()
    try:
        with db.cursor() as cursor:
            cursor.execute(
                'UPDATE students SET name=%s, age=%s, major=%s, grade=%s, email=%s WHERE id=%s',
                (data['name'], data.get('age'), data.get('major'),
                 data.get('grade'), data.get('email'), id)
            )
            db.commit()
            if cursor.rowcount == 0:
                return jsonify({'success': False, 'message': '학생을 찾을 수 없습니다'}), 404
        return jsonify({'success': True, 'message': '수정되었습니다'})
    finally:
        db.close()

# 학생 삭제
@app.route('/api/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    db = get_db()
    try:
        with db.cursor() as cursor:
            cursor.execute('DELETE FROM students WHERE id = %s', (id,))
            db.commit()
            if cursor.rowcount == 0:
                return jsonify({'success': False, 'message': '학생을 찾을 수 없습니다'}), 404
        return jsonify({'success': True, 'message': '삭제되었습니다'})
    finally:
        db.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}</code></pre>
          </div>

          <h2>3. FastAPI + 비동기 DB</h2>

          <div className="code-block">
            <div className="code-header">터미널</div>
            <pre><code>{`pip install fastapi uvicorn aiomysql python-dotenv`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">main.py — FastAPI + aiomysql</div>
            <pre><code>{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import aiomysql
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="School API", version="1.0")

# Pydantic 모델 (자동 유효성 검사 + API 문서 생성)
class StudentCreate(BaseModel):
    name: str
    age: int | None = None
    major: str | None = None
    grade: float | None = None
    email: str | None = None

# 커넥션 풀
pool = None

@app.on_event("startup")
async def startup():
    global pool
    pool = await aiomysql.create_pool(
        host=os.getenv('DB_HOST', 'localhost'),
        user=os.getenv('DB_USER', 'root'),
        password=os.getenv('DB_PASS', ''),
        db=os.getenv('DB_NAME', 'school'),
        autocommit=True
    )

@app.on_event("shutdown")
async def shutdown():
    pool.close()
    await pool.wait_closed()

@app.get("/api/students")
async def get_students():
    async with pool.acquire() as conn:
        async with conn.cursor(aiomysql.DictCursor) as cur:
            await cur.execute("SELECT * FROM students ORDER BY id")
            rows = await cur.fetchall()
    return {"success": True, "data": rows}

@app.get("/api/students/{id}")
async def get_student(id: int):
    async with pool.acquire() as conn:
        async with conn.cursor(aiomysql.DictCursor) as cur:
            await cur.execute("SELECT * FROM students WHERE id = %s", (id,))
            row = await cur.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="학생을 찾을 수 없습니다")
    return {"success": True, "data": row}

@app.post("/api/students", status_code=201)
async def create_student(student: StudentCreate):
    async with pool.acquire() as conn:
        async with conn.cursor() as cur:
            await cur.execute(
                "INSERT INTO students (name, age, major, grade, email) "
                "VALUES (%s, %s, %s, %s, %s)",
                (student.name, student.age, student.major,
                 student.grade, student.email)
            )
    return {"success": True, "id": cur.lastrowid}

# uvicorn main:app --reload --port 8000
# API 문서: http://localhost:8000/docs (자동 생성!)`}</code></pre>
          </div>

          <h2>4. SQLAlchemy ORM</h2>

          <div className="code-block">
            <div className="code-header">models.py — SQLAlchemy 모델 정의</div>
            <pre><code>{`from sqlalchemy import create_engine, Column, Integer, String, Float, Date
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# DB 연결 (커넥션 풀 자동 관리)
DATABASE_URL = "mysql+pymysql://root:password@localhost/school"
engine = create_engine(DATABASE_URL, pool_size=5, echo=True)
Session = sessionmaker(bind=engine)

class Base(DeclarativeBase):
    pass

# 모델 정의 (테이블 ↔ 클래스 매핑)
class Student(Base):
    __tablename__ = 'students'

    id    = Column(Integer, primary_key=True, autoincrement=True)
    name  = Column(String(50), nullable=False)
    age   = Column(Integer)
    major = Column(String(100))
    grade = Column(Float)
    email = Column(String(100), unique=True)

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'age': self.age,
            'major': self.major, 'grade': self.grade, 'email': self.email
        }

# 사용 예시
session = Session()

# CREATE: 학생 추가
new_student = Student(name="홍길동", age=20, major="컴퓨터공학", grade=3.5)
session.add(new_student)
session.commit()

# READ: 전체 조회
students = session.query(Student).all()

# READ: 조건 조회 (WHERE major = '컴퓨터공학' AND grade >= 3.5)
cs_students = session.query(Student).filter(
    Student.major == '컴퓨터공학',
    Student.grade >= 3.5
).all()

# UPDATE: 수정
student = session.query(Student).get(1)
student.grade = 3.7
session.commit()

# DELETE: 삭제
session.delete(student)
session.commit()

session.close()`}</code></pre>
          </div>

          <h2>5. Flask vs FastAPI 비교</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>비교</th><th>Flask</th><th>FastAPI</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>성능</strong></td><td>동기 (보통)</td><td>비동기 (빠름)</td></tr>
              <tr><td><strong>유효성 검사</strong></td><td>수동 또는 별도 라이브러리</td><td>Pydantic 자동 검사</td></tr>
              <tr><td><strong>API 문서</strong></td><td>수동 작성</td><td>Swagger/ReDoc 자동 생성</td></tr>
              <tr><td><strong>학습 곡선</strong></td><td>매우 낮음</td><td>낮음</td></tr>
              <tr><td><strong>타입 힌트</strong></td><td>선택</td><td>필수 (Python 타입 힌트 활용)</td></tr>
              <tr><td><strong>커뮤니티</strong></td><td>매우 큼 (오래된 역사)</td><td>빠르게 성장 중</td></tr>
              <tr><td><strong>추천 상황</strong></td><td>간단한 웹앱, 프로토타입</td><td>API 서버, 마이크로서비스</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li>Python에서는 <strong>PyMySQL</strong>(MySQL), <strong>psycopg2</strong>(PostgreSQL)로 DB에 연결한다.</li>
              <li><strong>Flask</strong>는 간단하고 유연한 마이크로 프레임워크, 빠른 프로토타이핑에 적합하다.</li>
              <li><strong>FastAPI</strong>는 비동기 지원, 자동 문서화, Pydantic 유효성 검사로 현대적 API 개발에 적합하다.</li>
              <li><strong>SQLAlchemy ORM</strong>은 Python 객체로 DB를 다루며, SQL을 직접 작성하지 않아도 된다.</li>
              <li>항상 <strong>파라미터 바인딩(%s)</strong>을 사용하여 SQL Injection을 방지해야 한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>실습 과제</h3>
            <p><strong>과제 1.</strong> Flask로 courses 테이블의 CRUD API를 구현하세요.</p>
            <p><strong>과제 2.</strong> FastAPI로 학생 검색 API(GET /api/students?search=홍)를 구현하세요.</p>
            <p><strong>과제 3.</strong> SQLAlchemy 모델에 Course 클래스를 추가하고 Student와의 관계를 설정하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/web/node-mysql" className="lesson-nav-btn prev">&larr; Node.js + MySQL</Link>
            <Link to="/web/orm" className="lesson-nav-btn next">ORM과 쿼리빌더 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default PythonDb;
