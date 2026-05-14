import{j as s,L as e}from"./index-C6Ztfr-z.js";const n=()=>s.jsxs(s.Fragment,{children:[s.jsx("section",{className:"page-header",children:s.jsxs("div",{className:"container",children:[s.jsx("h1",{children:"NoSQL 데이터베이스"}),s.jsx("p",{children:"MongoDB, Redis, Cassandra, Neo4j 등 NoSQL의 종류와 특징"})]})}),s.jsx("section",{className:"section lesson-content",children:s.jsx("div",{className:"container",children:s.jsxs("div",{className:"lesson-body",children:[s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"학습 목표"}),s.jsxs("ul",{children:[s.jsx("li",{children:"NoSQL의 등장 배경과 핵심 특징을 이해한다."}),s.jsx("li",{children:"4가지 NoSQL 유형(문서형, 키-값형, 컬럼형, 그래프형)을 구분한다."}),s.jsx("li",{children:"주요 NoSQL DBMS의 특징과 사용 사례를 파악한다."}),s.jsx("li",{children:"RDBMS vs NoSQL 선택 기준을 이해한다."})]})]}),s.jsx("h2",{children:"1. NoSQL이란?"}),s.jsx("h3",{children:"1.1 등장 배경"}),s.jsxs("p",{children:[s.jsx("strong",{children:"NoSQL(Not Only SQL)"}),"은 전통적인 관계형 데이터베이스의 한계를 극복하기 위해 등장했습니다. 2000년대 후반 빅데이터와 웹 2.0 시대에 대규모 분산 처리, 유연한 스키마, 높은 확장성에 대한 요구가 커지면서 급속히 발전했습니다."]}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"대용량 데이터"}),": 소셜 미디어, IoT 등에서 발생하는 방대한 비정형 데이터"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"수평 확장"}),": 서버를 추가하여 성능을 확장 (Scale-Out)"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"유연한 스키마"}),": 사전 정의 없이 데이터 구조를 자유롭게 변경"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"고가용성"}),": 일부 서버 장애에도 서비스 지속"]})]}),s.jsx("h2",{children:"2. NoSQL 유형별 비교"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"유형"}),s.jsx("th",{children:"데이터 모델"}),s.jsx("th",{children:"대표 DBMS"}),s.jsx("th",{children:"강점"}),s.jsx("th",{children:"사용 사례"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"문서형"})}),s.jsx("td",{children:"JSON/BSON 문서"}),s.jsx("td",{children:"MongoDB, CouchDB"}),s.jsx("td",{children:"유연한 스키마, 직관적"}),s.jsx("td",{children:"CMS, 카탈로그, 사용자 프로필"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"키-값형"})}),s.jsx("td",{children:"Key-Value 쌍"}),s.jsx("td",{children:"Redis, DynamoDB, Memcached"}),s.jsx("td",{children:"초고속, 단순 구조"}),s.jsx("td",{children:"캐싱, 세션, 실시간 랭킹"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"컬럼형"})}),s.jsx("td",{children:"컬럼 패밀리"}),s.jsx("td",{children:"Cassandra, HBase, ScyllaDB"}),s.jsx("td",{children:"대규모 쓰기, 시계열"}),s.jsx("td",{children:"로그, IoT, 시계열 데이터"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"그래프형"})}),s.jsx("td",{children:"노드 + 엣지"}),s.jsx("td",{children:"Neo4j, ArangoDB, Amazon Neptune"}),s.jsx("td",{children:"관계 탐색 최적화"}),s.jsx("td",{children:"소셜 네트워크, 추천, 사기 탐지"})]})]})]}),s.jsx("h2",{children:"3. 문서형 — MongoDB"}),s.jsx("h3",{children:"3.1 특징"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["데이터를 ",s.jsx("strong",{children:"JSON과 유사한 BSON(Binary JSON)"})," 형태로 저장"]}),s.jsx("li",{children:"스키마 없이(Schemaless) 자유롭게 필드를 추가/제거 가능"}),s.jsxs("li",{children:["NoSQL 중 ",s.jsx("strong",{children:"가장 인기 있는"})," 데이터베이스"]}),s.jsx("li",{children:"풍부한 쿼리 기능, 인덱스, 집계 파이프라인 지원"})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"MongoDB 문서 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`// 학생 컬렉션의 문서 (JSON 형태)
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
// MongoDB는 하나의 문서에 모든 정보를 담을 수 있다.`})})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"MongoDB 기본 쿼리"}),s.jsx("pre",{children:s.jsx("code",{children:`// 삽입
db.students.insertOne({ name: "홍길동", age: 20, major: "컴퓨터공학" })

// 조회 (SQL: SELECT * FROM students WHERE age >= 20)
db.students.find({ age: { $gte: 20 } })

// 수정 (SQL: UPDATE students SET age = 21 WHERE name = "홍길동")
db.students.updateOne({ name: "홍길동" }, { $set: { age: 21 } })

// 삭제 (SQL: DELETE FROM students WHERE name = "홍길동")
db.students.deleteOne({ name: "홍길동" })`})})]}),s.jsx("h2",{children:"4. 키-값형 — Redis"}),s.jsx("h3",{children:"4.1 특징"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"인메모리(In-Memory)"})," 데이터 저장소 — 디스크가 아닌 RAM에 저장"]}),s.jsx("li",{children:"초고속 읽기/쓰기 (마이크로초 단위 응답)"}),s.jsx("li",{children:"문자열, 리스트, 셋, 해시, 정렬 셋 등 다양한 자료구조 지원"}),s.jsx("li",{children:"캐시, 세션, 실시간 순위표, 메시지 브로커 등에 활용"}),s.jsx("li",{children:"TTL(Time-To-Live)로 자동 만료 설정 가능"})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Redis 기본 명령어"}),s.jsx("pre",{children:s.jsx("code",{children:`# 문자열 저장/조회
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
ZREVRANGE leaderboard 0 2   → 박민지, 김영희, 홍길동 (점수 높은 순)`})})]}),s.jsx("h2",{children:"5. 컬럼형 — Apache Cassandra"}),s.jsx("h3",{children:"5.1 특징"}),s.jsxs("ul",{children:[s.jsx("li",{children:"Facebook에서 개발, Apache 재단에 기증"}),s.jsxs("li",{children:[s.jsx("strong",{children:"대규모 분산 환경"}),"에서 뛰어난 쓰기 성능"]}),s.jsx("li",{children:"단일 장애점(SPOF) 없는 P2P 아키텍처"}),s.jsx("li",{children:"지리적으로 분산된 멀티 데이터센터 복제 지원"}),s.jsx("li",{children:"CQL(Cassandra Query Language) — SQL과 유사한 문법"})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Cassandra 사용 사례"}),s.jsx("pre",{children:s.jsx("code",{children:`• 시계열 데이터: IoT 센서 데이터, 주식 시세
• 이벤트 로깅: 사용자 활동 로그, 시스템 로그
• 메시징: 채팅 메시지 히스토리
• 추천 시스템: 사용자 행동 데이터 저장

사용 기업: Netflix, Instagram, Apple, Discord`})})]}),s.jsx("h2",{children:"6. 그래프형 — Neo4j"}),s.jsx("h3",{children:"6.1 특징"}),s.jsxs("ul",{children:[s.jsxs("li",{children:["데이터를 ",s.jsx("strong",{children:"노드(Node)"}),"와 ",s.jsx("strong",{children:"엣지(Edge, 관계)"}),"로 표현"]}),s.jsx("li",{children:"관계 탐색이 매우 빠름 — JOIN 없이 직접 연결 탐색"}),s.jsx("li",{children:"Cypher 쿼리 언어 사용"}),s.jsx("li",{children:"소셜 네트워크, 추천, 지식 그래프에 최적"})]}),s.jsxs("div",{className:"code-block",children:[s.jsx("div",{className:"code-header",children:"Neo4j Cypher 쿼리 예시"}),s.jsx("pre",{children:s.jsx("code",{children:`// 노드 생성
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
RETURN DISTINCT s2.name`})})]}),s.jsx("h2",{children:"7. RDBMS vs NoSQL 선택 기준"}),s.jsxs("table",{className:"lesson-table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"기준"}),s.jsx("th",{children:"RDBMS 선택"}),s.jsx("th",{children:"NoSQL 선택"})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"데이터 구조"})}),s.jsx("td",{children:"정형 데이터, 관계가 명확"}),s.jsx("td",{children:"비정형/반정형, 구조가 자주 변경"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"트랜잭션"})}),s.jsx("td",{children:"ACID가 필수 (금융, 결제)"}),s.jsx("td",{children:"일관성보다 가용성 우선"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"확장 방식"})}),s.jsx("td",{children:"수직 확장 (Scale-Up)"}),s.jsx("td",{children:"수평 확장 (Scale-Out)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"쿼리 복잡도"})}),s.jsx("td",{children:"복잡한 JOIN, 집계"}),s.jsx("td",{children:"단순 CRUD, 키 기반 조회"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"데이터 규모"})}),s.jsx("td",{children:"중소규모 (수 TB)"}),s.jsx("td",{children:"대규모 (수십~수백 TB)"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("strong",{children:"개발 속도"})}),s.jsx("td",{children:"스키마 설계 필요"}),s.jsx("td",{children:"스키마리스, 빠른 프로토타이핑"})]})]})]}),s.jsxs("div",{className:"callout-box",children:[s.jsx("h3",{children:"핵심 정리"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"NoSQL"}),'은 "Not Only SQL"로, 관계형 모델 외의 다양한 데이터 모델을 지원한다.']}),s.jsxs("li",{children:[s.jsx("strong",{children:"문서형(MongoDB)"}),": JSON 형태, 유연한 스키마, 가장 범용적"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"키-값형(Redis)"}),": 인메모리 초고속, 캐싱과 세션에 최적"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"컬럼형(Cassandra)"}),": 대규모 분산 쓰기, 시계열 데이터"]}),s.jsxs("li",{children:[s.jsx("strong",{children:"그래프형(Neo4j)"}),": 관계 탐색 최적화, 소셜/추천 시스템"]}),s.jsxs("li",{children:["실무에서는 RDBMS와 NoSQL을 ",s.jsx("strong",{children:"함께 사용(Polyglot Persistence)"}),"하는 것이 일반적이다."]})]})]}),s.jsxs("div",{className:"exercise-box",children:[s.jsx("h3",{children:"확인 문제"}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 1."})," NoSQL의 4가지 유형을 각각 대표 DBMS와 함께 설명하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 2."})," MongoDB에서 데이터를 저장하는 형태가 RDBMS와 어떻게 다른지 비교하세요."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"문제 3."})," Redis가 캐싱에 적합한 이유를 3가지 이상 설명하세요."]})]}),s.jsxs("div",{className:"lesson-nav",children:[s.jsx(e,{to:"/services/rdbms-compare",className:"lesson-nav-btn prev",children:"← 관계형 DB 비교"}),s.jsx(e,{to:"/services/cloud-db",className:"lesson-nav-btn next",children:"클라우드 DB 서비스 →"})]})]})})})]});export{n as default};
