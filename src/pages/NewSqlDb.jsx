import { Link } from 'react-router-dom';

const NewSqlDb = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>NewSQL & 특수목적 DB</h1>
        <p>CockroachDB, TimescaleDB, Elasticsearch, 벡터 DB</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>NewSQL의 개념과 등장 배경을 이해한다.</li>
              <li>시계열 DB, 검색 엔진 DB, 벡터 DB 등 특수목적 DB를 파악한다.</li>
              <li>각 DB의 적합한 사용 사례를 이해한다.</li>
              <li>Polyglot Persistence(다중 DB 전략)를 이해한다.</li>
            </ul>
          </div>

          <h2>1. NewSQL이란?</h2>

          <h3>1.1 등장 배경</h3>
          <p>
            <strong>NewSQL</strong>은 RDBMS의 <strong>ACID 보장과 SQL 호환성</strong>을 유지하면서,
            NoSQL처럼 <strong>수평 확장(Scale-Out)</strong>이 가능한 차세대 데이터베이스입니다.
          </p>
          <div className="code-block">
            <div className="code-header">데이터베이스 진화</div>
            <pre><code>{`RDBMS (1970s~)              NoSQL (2000s~)              NewSQL (2010s~)
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│ ✓ ACID       │          │ ✗ ACID (BASE)│          │ ✓ ACID       │
│ ✓ SQL        │          │ ✗ SQL        │          │ ✓ SQL        │
│ ✗ 수평 확장  │    →     │ ✓ 수평 확장  │    →     │ ✓ 수평 확장  │
│ ✓ 관계/JOIN  │          │ ✗ 관계/JOIN  │          │ ✓ 관계/JOIN  │
└──────────────┘          └──────────────┘          └──────────────┘
   안정적이지만               확장성 좋지만              두 장점을
   확장 어려움                일관성 부족               모두 결합`}</code></pre>
          </div>

          <h3>1.2 주요 NewSQL 데이터베이스</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>DBMS</th><th>개발사</th><th>특징</th><th>사용 사례</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>CockroachDB</strong></td><td>Cockroach Labs</td><td>PostgreSQL 호환, 글로벌 분산, 자동 복구</td><td>글로벌 서비스, 금융</td></tr>
              <tr><td><strong>Google Spanner</strong></td><td>Google</td><td>글로벌 강력한 일관성, TrueTime API</td><td>구글 내부, 글로벌 금융</td></tr>
              <tr><td><strong>TiDB</strong></td><td>PingCAP</td><td>MySQL 호환, HTAP(OLTP+OLAP)</td><td>MySQL 확장이 필요한 경우</td></tr>
              <tr><td><strong>YugabyteDB</strong></td><td>Yugabyte</td><td>PostgreSQL 호환, 분산 트랜잭션</td><td>클라우드 네이티브 앱</td></tr>
            </tbody>
          </table>

          <h2>2. 시계열 데이터베이스 (Time-Series DB)</h2>

          <h3>2.1 특징</h3>
          <p>
            <strong>시계열 DB</strong>는 시간에 따라 변화하는 데이터를 효율적으로 저장하고 분석하는 데 특화된 데이터베이스입니다.
          </p>
          <ul>
            <li>시간 기반 데이터 자동 정렬 및 압축</li>
            <li>시간 범위 쿼리, 다운샘플링, 데이터 보존 정책</li>
            <li>IoT 센서, 서버 모니터링, 주식 시세 등에 활용</li>
          </ul>

          <table className="lesson-table">
            <thead>
              <tr><th>DBMS</th><th>특징</th><th>사용 사례</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>InfluxDB</strong></td><td>가장 인기 있는 시계열 DB, Flux 쿼리 언어</td><td>서버/인프라 모니터링</td></tr>
              <tr><td><strong>TimescaleDB</strong></td><td>PostgreSQL 확장, SQL 사용 가능</td><td>IoT, 금융 데이터 분석</td></tr>
              <tr><td><strong>Prometheus</strong></td><td>메트릭 수집 및 모니터링 특화</td><td>Kubernetes 모니터링</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">TimescaleDB 예시 (SQL 사용 가능)</div>
            <pre><code>{`-- 센서 데이터 테이블 (하이퍼테이블)
CREATE TABLE sensor_data (
    time        TIMESTAMPTZ NOT NULL,
    sensor_id   INT,
    temperature DOUBLE PRECISION,
    humidity    DOUBLE PRECISION
);
SELECT create_hypertable('sensor_data', 'time');

-- 최근 1시간 센서별 평균 온도
SELECT sensor_id,
       time_bucket('5 minutes', time) AS bucket,
       AVG(temperature) AS avg_temp
FROM sensor_data
WHERE time > NOW() - INTERVAL '1 hour'
GROUP BY sensor_id, bucket
ORDER BY bucket DESC;`}</code></pre>
          </div>

          <h2>3. 검색 엔진 데이터베이스</h2>

          <h3>3.1 Elasticsearch</h3>
          <ul>
            <li>Apache Lucene 기반의 <strong>분산 검색/분석 엔진</strong></li>
            <li>전문 검색(Full-Text Search), 로그 분석, 실시간 분석</li>
            <li>ELK 스택: <strong>E</strong>lasticsearch + <strong>L</strong>ogstash + <strong>K</strong>ibana</li>
            <li>REST API로 JSON 문서 저장 및 검색</li>
            <li>역인덱스(Inverted Index)로 초고속 검색</li>
          </ul>

          <div className="code-block">
            <div className="code-header">Elasticsearch 사용 사례</div>
            <pre><code>{`• 사이트 내 검색 (쇼핑몰 상품 검색, 블로그 검색)
• 로그 수집 및 분석 (서버 로그, 애플리케이션 로그)
• 실시간 대시보드 (Kibana와 연동)
• 보안 이벤트 분석 (SIEM)

사용 기업: Wikipedia, GitHub, Stack Overflow, Netflix, Uber`}</code></pre>
          </div>

          <h2>4. 벡터 데이터베이스 (Vector DB)</h2>

          <h3>4.1 벡터 DB란?</h3>
          <p>
            <strong>벡터 데이터베이스</strong>는 AI/ML에서 생성된 <strong>임베딩 벡터</strong>(고차원 수치 배열)를
            효율적으로 저장하고 <strong>유사도 검색</strong>을 수행하는 데이터베이스입니다.
            ChatGPT, RAG(검색 증강 생성) 등 AI 애플리케이션의 핵심 인프라입니다.
          </p>

          <div className="code-block">
            <div className="code-header">벡터 DB 개념</div>
            <pre><code>{`전통적 검색:  "데이터베이스" → 키워드 일치하는 문서 검색
벡터 검색:    "데이터 저장소" → 의미적으로 유사한 문서 검색

텍스트 → AI 모델 → 벡터 [0.12, -0.34, 0.56, ...] (1536차원)
                              ↓
                    벡터 DB에 저장 & 유사도 검색
                    (코사인 유사도, 유클리드 거리)`}</code></pre>
          </div>

          <table className="lesson-table">
            <thead>
              <tr><th>DBMS</th><th>특징</th><th>비고</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Pinecone</strong></td><td>완전 관리형, 서버리스</td><td>가장 쉬운 시작</td></tr>
              <tr><td><strong>Weaviate</strong></td><td>오픈소스, 멀티모달 검색</td><td>이미지+텍스트 동시 검색</td></tr>
              <tr><td><strong>Milvus</strong></td><td>오픈소스, 대규모 벡터 처리</td><td>10억+ 벡터 지원</td></tr>
              <tr><td><strong>Chroma</strong></td><td>오픈소스, 경량, Python 친화</td><td>빠른 프로토타이핑</td></tr>
              <tr><td><strong>pgvector</strong></td><td>PostgreSQL 확장</td><td>기존 PostgreSQL에 추가</td></tr>
            </tbody>
          </table>

          <h2>5. Polyglot Persistence — 다중 DB 전략</h2>

          <p>
            현대 애플리케이션은 하나의 DB로 모든 요구사항을 충족하기 어렵습니다.
            <strong>Polyglot Persistence</strong>는 각 데이터 특성에 맞는 최적의 DB를 선택하여 함께 사용하는 전략입니다.
          </p>

          <div className="code-block">
            <div className="code-header">이커머스 서비스의 다중 DB 구성 예시</div>
            <pre><code>{`┌─────────────────────────────────────────────┐
│            이커머스 애플리케이션              │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│ 회원 │ 상품 │ 주문 │ 캐시 │ 검색 │ 추천/AI  │
│ 정보 │ 카탈 │ 결제 │      │      │          │
├──────┼──────┼──────┼──────┼──────┼──────────┤
│Postgr│Mongo │Postgr│Redis │Elast │ Pinecone │
│ eSQL │ DB   │ eSQL │      │ ic   │ (벡터DB) │
│      │      │      │      │search│          │
│관계형│문서형│관계형│키-값 │검색  │ 벡터     │
│      │      │ACID  │캐싱  │엔진  │ 유사도   │
└──────┴──────┴──────┴──────┴──────┴──────────┘

각 영역에 가장 적합한 DB를 선택하여 조합`}</code></pre>
          </div>

          <h2>6. DB 선택 종합 가이드</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>요구사항</th><th>추천 DB 유형</th><th>대표 서비스</th></tr>
            </thead>
            <tbody>
              <tr><td>정형 데이터 + ACID 트랜잭션</td><td>RDBMS</td><td>PostgreSQL, MySQL</td></tr>
              <tr><td>유연한 스키마 + 빠른 개발</td><td>문서형 NoSQL</td><td>MongoDB, Firestore</td></tr>
              <tr><td>초고속 캐싱 + 세션</td><td>키-값 NoSQL</td><td>Redis, Memcached</td></tr>
              <tr><td>대규모 분산 + SQL</td><td>NewSQL</td><td>CockroachDB, TiDB</td></tr>
              <tr><td>시계열 데이터 분석</td><td>시계열 DB</td><td>TimescaleDB, InfluxDB</td></tr>
              <tr><td>전문 검색 + 로그 분석</td><td>검색 엔진</td><td>Elasticsearch</td></tr>
              <tr><td>AI/ML 유사도 검색</td><td>벡터 DB</td><td>Pinecone, pgvector</td></tr>
              <tr><td>빠른 풀스택 개발</td><td>BaaS</td><td>Supabase, Firebase</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>NewSQL</strong>: RDBMS의 ACID + NoSQL의 수평 확장을 결합한 차세대 DB</li>
              <li><strong>시계열 DB</strong>: 시간 기반 데이터(IoT, 모니터링)에 최적화</li>
              <li><strong>Elasticsearch</strong>: 전문 검색과 로그 분석의 표준</li>
              <li><strong>벡터 DB</strong>: AI 시대의 핵심 인프라, 의미 기반 유사도 검색</li>
              <li>실무에서는 <strong>Polyglot Persistence</strong>로 여러 DB를 목적에 맞게 조합하여 사용한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> NewSQL이 기존 RDBMS와 NoSQL의 어떤 장점을 결합했는지 설명하세요.</p>
            <p><strong>문제 2.</strong> 벡터 데이터베이스가 AI 애플리케이션에서 왜 필요한지 설명하세요.</p>
            <p><strong>문제 3.</strong> 이커머스 서비스를 설계한다면 어떤 DB를 어떤 용도로 사용할지 구성도를 작성하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/services/cloud-db" className="lesson-nav-btn prev">&larr; 클라우드 DB 서비스</Link>
            <Link to="/sql" className="lesson-nav-btn next">SQL 학습 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default NewSqlDb;
