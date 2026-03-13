import { Link } from 'react-router-dom';

const NoSqlDb = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>NoSQL 데이터베이스</h1>
        <p>MongoDB, Redis, Cassandra, Neo4j 등 NoSQL의 종류와 특징</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>NoSQL의 등장 배경과 핵심 특징을 이해한다.</li>
              <li>4가지 NoSQL 유형(문서형, 키-값형, 컬럼형, 그래프형)을 구분한다.</li>
              <li>주요 NoSQL DBMS의 특징과 사용 사례를 파악한다.</li>
              <li>RDBMS vs NoSQL 선택 기준을 이해한다.</li>
            </ul>
          </div>

          <h2>1. NoSQL이란?</h2>

          <h3>1.1 등장 배경</h3>
          <p>
            <strong>NoSQL(Not Only SQL)</strong>은 전통적인 관계형 데이터베이스의 한계를 극복하기 위해 등장했습니다.
            2000년대 후반 빅데이터와 웹 2.0 시대에 대규모 분산 처리, 유연한 스키마, 높은 확장성에 대한 요구가 커지면서 급속히 발전했습니다.
          </p>
          <ul>
            <li><strong>대용량 데이터</strong>: 소셜 미디어, IoT 등에서 발생하는 방대한 비정형 데이터</li>
            <li><strong>수평 확장</strong>: 서버를 추가하여 성능을 확장 (Scale-Out)</li>
            <li><strong>유연한 스키마</strong>: 사전 정의 없이 데이터 구조를 자유롭게 변경</li>
            <li><strong>고가용성</strong>: 일부 서버 장애에도 서비스 지속</li>
          </ul>

          <h2>2. NoSQL 유형별 비교</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>유형</th><th>데이터 모델</th><th>대표 DBMS</th><th>강점</th><th>사용 사례</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>문서형</strong></td><td>JSON/BSON 문서</td><td>MongoDB, CouchDB</td><td>유연한 스키마, 직관적</td><td>CMS, 카탈로그, 사용자 프로필</td></tr>
              <tr><td><strong>키-값형</strong></td><td>Key-Value 쌍</td><td>Redis, DynamoDB, Memcached</td><td>초고속, 단순 구조</td><td>캐싱, 세션, 실시간 랭킹</td></tr>
              <tr><td><strong>컬럼형</strong></td><td>컬럼 패밀리</td><td>Cassandra, HBase, ScyllaDB</td><td>대규모 쓰기, 시계열</td><td>로그, IoT, 시계열 데이터</td></tr>
              <tr><td><strong>그래프형</strong></td><td>노드 + 엣지</td><td>Neo4j, ArangoDB, Amazon Neptune</td><td>관계 탐색 최적화</td><td>소셜 네트워크, 추천, 사기 탐지</td></tr>
            </tbody>
          </table>

          <h2>3. 문서형 — MongoDB</h2>

          <h3>3.1 특징</h3>
          <ul>
            <li>데이터를 <strong>JSON과 유사한 BSON(Binary JSON)</strong> 형태로 저장</li>
            <li>스키마 없이(Schemaless) 자유롭게 필드를 추가/제거 가능</li>
            <li>NoSQL 중 <strong>가장 인기 있는</strong> 데이터베이스</li>
            <li>풍부한 쿼리 기능, 인덱스, 집계 파이프라인 지원</li>
          </ul>

          <div className="code-block">
            <div className="code-header">MongoDB 문서 예시</div>
            <pre><code>{`// 학생 컬렉션의 문서 (JSON 형태)
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "홍길동",
  "age": 20,
  "major": "컴퓨터공학",
  "courses": ["데이터베이스", "자료구조"],    // 배열 가능
  "address": {                                // 중첩 객체 가능
    "city": "서울",
    "district": "강남구"
  }
}

// RDBMS에서는 별도 테이블 + JOIN이 필요하지만,
// MongoDB는 하나의 문서에 모든 정보를 담을 수 있다.`}</code></pre>
          </div>

          <div className="code-block">
            <div className="code-header">MongoDB 기본 쿼리</div>
            <pre><code>{`// 삽입
db.students.insertOne({ name: "홍길동", age: 20, major: "컴퓨터공학" })

// 조회 (SQL: SELECT * FROM students WHERE age >= 20)
db.students.find({ age: { $gte: 20 } })

// 수정 (SQL: UPDATE students SET age = 21 WHERE name = "홍길동")
db.students.updateOne({ name: "홍길동" }, { $set: { age: 21 } })

// 삭제 (SQL: DELETE FROM students WHERE name = "홍길동")
db.students.deleteOne({ name: "홍길동" })`}</code></pre>
          </div>

          <h2>4. 키-값형 — Redis</h2>

          <h3>4.1 특징</h3>
          <ul>
            <li><strong>인메모리(In-Memory)</strong> 데이터 저장소 — 디스크가 아닌 RAM에 저장</li>
            <li>초고속 읽기/쓰기 (마이크로초 단위 응답)</li>
            <li>문자열, 리스트, 셋, 해시, 정렬 셋 등 다양한 자료구조 지원</li>
            <li>캐시, 세션, 실시간 순위표, 메시지 브로커 등에 활용</li>
            <li>TTL(Time-To-Live)로 자동 만료 설정 가능</li>
          </ul>

          <div className="code-block">
            <div className="code-header">Redis 기본 명령어</div>
            <pre><code>{`# 문자열 저장/조회
SET user:1:name "홍길동"
GET user:1:name          → "홍길동"

# 만료 시간 설정 (30분 후 자동 삭제)
SET session:abc123 "user_data" EX 1800

# 해시 (객체처럼 사용)
HSET user:1 name "홍길동" age 20 major "컴퓨터공학"
HGET user:1 name         → "홍길동"
HGETALL user:1           → name, 홍길동, age, 20, ...

# 정렬 셋 (랭킹)
ZADD leaderboard 95 "박민지" 88 "김영희" 85 "홍길동"
ZREVRANGE leaderboard 0 2   → 박민지, 김영희, 홍길동 (점수 높은 순)`}</code></pre>
          </div>

          <h2>5. 컬럼형 — Apache Cassandra</h2>

          <h3>5.1 특징</h3>
          <ul>
            <li>Facebook에서 개발, Apache 재단에 기증</li>
            <li><strong>대규모 분산 환경</strong>에서 뛰어난 쓰기 성능</li>
            <li>단일 장애점(SPOF) 없는 P2P 아키텍처</li>
            <li>지리적으로 분산된 멀티 데이터센터 복제 지원</li>
            <li>CQL(Cassandra Query Language) — SQL과 유사한 문법</li>
          </ul>

          <div className="code-block">
            <div className="code-header">Cassandra 사용 사례</div>
            <pre><code>{`• 시계열 데이터: IoT 센서 데이터, 주식 시세
• 이벤트 로깅: 사용자 활동 로그, 시스템 로그
• 메시징: 채팅 메시지 히스토리
• 추천 시스템: 사용자 행동 데이터 저장

사용 기업: Netflix, Instagram, Apple, Discord`}</code></pre>
          </div>

          <h2>6. 그래프형 — Neo4j</h2>

          <h3>6.1 특징</h3>
          <ul>
            <li>데이터를 <strong>노드(Node)</strong>와 <strong>엣지(Edge, 관계)</strong>로 표현</li>
            <li>관계 탐색이 매우 빠름 — JOIN 없이 직접 연결 탐색</li>
            <li>Cypher 쿼리 언어 사용</li>
            <li>소셜 네트워크, 추천, 지식 그래프에 최적</li>
          </ul>

          <div className="code-block">
            <div className="code-header">Neo4j Cypher 쿼리 예시</div>
            <pre><code>{`// 노드 생성
CREATE (hong:Student {name: "홍길동", age: 20})
CREATE (db:Course {title: "데이터베이스"})

// 관계 생성
CREATE (hong)-[:ENROLLED_IN {score: 85}]->(db)

// 홍길동이 수강하는 과목 조회
MATCH (s:Student {name: "홍길동"})-[:ENROLLED_IN]->(c:Course)
RETURN c.title

// 같은 과목을 수강하는 다른 학생 찾기 (친구 추천)
MATCH (s1:Student {name: "홍길동"})-[:ENROLLED_IN]->(c)
      <-[:ENROLLED_IN]-(s2:Student)
WHERE s1 <> s2
RETURN DISTINCT s2.name`}</code></pre>
          </div>

          <h2>7. RDBMS vs NoSQL 선택 기준</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>기준</th><th>RDBMS 선택</th><th>NoSQL 선택</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>데이터 구조</strong></td><td>정형 데이터, 관계가 명확</td><td>비정형/반정형, 구조가 자주 변경</td></tr>
              <tr><td><strong>트랜잭션</strong></td><td>ACID가 필수 (금융, 결제)</td><td>일관성보다 가용성 우선</td></tr>
              <tr><td><strong>확장 방식</strong></td><td>수직 확장 (Scale-Up)</td><td>수평 확장 (Scale-Out)</td></tr>
              <tr><td><strong>쿼리 복잡도</strong></td><td>복잡한 JOIN, 집계</td><td>단순 CRUD, 키 기반 조회</td></tr>
              <tr><td><strong>데이터 규모</strong></td><td>중소규모 (수 TB)</td><td>대규모 (수십~수백 TB)</td></tr>
              <tr><td><strong>개발 속도</strong></td><td>스키마 설계 필요</td><td>스키마리스, 빠른 프로토타이핑</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>NoSQL</strong>은 "Not Only SQL"로, 관계형 모델 외의 다양한 데이터 모델을 지원한다.</li>
              <li><strong>문서형(MongoDB)</strong>: JSON 형태, 유연한 스키마, 가장 범용적</li>
              <li><strong>키-값형(Redis)</strong>: 인메모리 초고속, 캐싱과 세션에 최적</li>
              <li><strong>컬럼형(Cassandra)</strong>: 대규모 분산 쓰기, 시계열 데이터</li>
              <li><strong>그래프형(Neo4j)</strong>: 관계 탐색 최적화, 소셜/추천 시스템</li>
              <li>실무에서는 RDBMS와 NoSQL을 <strong>함께 사용(Polyglot Persistence)</strong>하는 것이 일반적이다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> NoSQL의 4가지 유형을 각각 대표 DBMS와 함께 설명하세요.</p>
            <p><strong>문제 2.</strong> MongoDB에서 데이터를 저장하는 형태가 RDBMS와 어떻게 다른지 비교하세요.</p>
            <p><strong>문제 3.</strong> Redis가 캐싱에 적합한 이유를 3가지 이상 설명하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/services/rdbms-compare" className="lesson-nav-btn prev">&larr; 관계형 DB 비교</Link>
            <Link to="/services/cloud-db" className="lesson-nav-btn next">클라우드 DB 서비스 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default NoSqlDb;
