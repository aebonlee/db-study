import { Link } from 'react-router-dom';

const CloudDb = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>클라우드 DB 서비스</h1>
        <p>AWS RDS, Google Cloud SQL, Azure SQL, Supabase, Firebase</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>클라우드 데이터베이스의 개념과 장점을 이해한다.</li>
              <li>주요 클라우드 DB 서비스(AWS, GCP, Azure)를 비교한다.</li>
              <li>BaaS(Backend as a Service) 플랫폼을 파악한다.</li>
              <li>서버리스 데이터베이스의 개념을 이해한다.</li>
            </ul>
          </div>

          <h2>1. 클라우드 DB란?</h2>

          <h3>1.1 정의</h3>
          <p>
            <strong>클라우드 데이터베이스</strong>는 클라우드 인프라 위에서 운영되는 데이터베이스 서비스입니다.
            서버 구매, 설치, 운영체제 설정, DB 설치 등을 직접 하지 않고
            <strong>클라우드 제공업체가 관리</strong>하며, 사용자는 데이터에만 집중할 수 있습니다.
          </p>

          <h3>1.2 온프레미스 vs 클라우드 DB</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>온프레미스 (자체 서버)</th><th>클라우드 DB</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>초기 비용</strong></td><td>서버 구매 (수천만 원~)</td><td>사용한 만큼 과금</td></tr>
              <tr><td><strong>설치/설정</strong></td><td>수일~수주</td><td>수분 (클릭 몇 번)</td></tr>
              <tr><td><strong>확장</strong></td><td>서버 추가 구매 필요</td><td>슬라이더로 즉시 확장</td></tr>
              <tr><td><strong>백업</strong></td><td>직접 스크립트 작성</td><td>자동 백업 (PITR)</td></tr>
              <tr><td><strong>고가용성</strong></td><td>복잡한 구성 필요</td><td>멀티 AZ, 자동 장애 조치</td></tr>
              <tr><td><strong>운영 인력</strong></td><td>DBA 필수</td><td>최소 인원으로 운영 가능</td></tr>
            </tbody>
          </table>

          <h2>2. AWS 데이터베이스 서비스</h2>

          <h3>2.1 Amazon RDS</h3>
          <ul>
            <li><strong>관리형 관계형 DB</strong> — MySQL, PostgreSQL, MariaDB, Oracle, SQL Server 지원</li>
            <li>자동 백업, 패치, 모니터링, 읽기 복제본</li>
            <li>Multi-AZ 배포로 고가용성 보장</li>
            <li>가장 많이 사용되는 클라우드 DB 서비스</li>
          </ul>

          <h3>2.2 Amazon Aurora</h3>
          <ul>
            <li>AWS가 자체 개발한 <strong>클라우드 네이티브 RDBMS</strong></li>
            <li>MySQL의 5배, PostgreSQL의 3배 성능</li>
            <li>자동 스토리지 확장 (10GB → 128TB)</li>
            <li><strong>Aurora Serverless</strong>: 요청이 없으면 자동으로 일시정지 (비용 절약)</li>
          </ul>

          <h3>2.3 Amazon DynamoDB</h3>
          <ul>
            <li>AWS의 <strong>서버리스 NoSQL</strong> (키-값 + 문서형)</li>
            <li>완전 관리형 — 용량 계획 불필요</li>
            <li>한 자릿수 밀리초 응답 시간</li>
            <li>자동 확장, 글로벌 테이블 지원</li>
          </ul>

          <table className="lesson-table">
            <thead>
              <tr><th>서비스</th><th>유형</th><th>특징</th><th>적합한 경우</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>RDS</strong></td><td>관계형 (관리형)</td><td>기존 RDBMS 호환</td><td>기존 앱 마이그레이션</td></tr>
              <tr><td><strong>Aurora</strong></td><td>관계형 (클라우드 네이티브)</td><td>고성능, 자동 확장</td><td>신규 대규모 서비스</td></tr>
              <tr><td><strong>DynamoDB</strong></td><td>NoSQL (서버리스)</td><td>무한 확장, 초저지연</td><td>게임, IoT, 모바일 백엔드</td></tr>
              <tr><td><strong>ElastiCache</strong></td><td>인메모리 캐시</td><td>Redis/Memcached 관리형</td><td>캐싱, 세션 저장</td></tr>
              <tr><td><strong>Redshift</strong></td><td>데이터 웨어하우스</td><td>대규모 분석</td><td>BI, 데이터 분석</td></tr>
            </tbody>
          </table>

          <h2>3. Google Cloud 데이터베이스</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>서비스</th><th>유형</th><th>특징</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Cloud SQL</strong></td><td>관계형 (관리형)</td><td>MySQL, PostgreSQL, SQL Server 지원</td></tr>
              <tr><td><strong>Cloud Spanner</strong></td><td>관계형 (글로벌 분산)</td><td>글로벌 규모의 강력한 일관성 + 수평 확장</td></tr>
              <tr><td><strong>Firestore</strong></td><td>NoSQL (문서형)</td><td>실시간 동기화, 오프라인 지원</td></tr>
              <tr><td><strong>Bigtable</strong></td><td>NoSQL (컬럼형)</td><td>대규모 분석 워크로드, HBase 호환</td></tr>
              <tr><td><strong>BigQuery</strong></td><td>데이터 웨어하우스</td><td>서버리스, 페타바이트 규모 분석</td></tr>
            </tbody>
          </table>

          <h2>4. Azure 데이터베이스</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>서비스</th><th>유형</th><th>특징</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Azure SQL Database</strong></td><td>관계형 (관리형)</td><td>SQL Server 기반, 지능형 성능 최적화</td></tr>
              <tr><td><strong>Azure Cosmos DB</strong></td><td>NoSQL (멀티모델)</td><td>글로벌 분산, 5가지 일관성 수준 선택</td></tr>
              <tr><td><strong>Azure Database for MySQL/PostgreSQL</strong></td><td>관계형 (관리형)</td><td>오픈소스 DB 관리형 서비스</td></tr>
            </tbody>
          </table>

          <h2>5. BaaS (Backend as a Service)</h2>

          <h3>5.1 Firebase</h3>
          <ul>
            <li>Google의 <strong>모바일/웹 앱 개발 플랫폼</strong></li>
            <li>Realtime Database: JSON 트리 구조, 실시간 동기화</li>
            <li>Firestore: 문서형 NoSQL, 오프라인 지원, 확장성</li>
            <li>인증, 스토리지, 호스팅 등 올인원 백엔드</li>
            <li>서버 코드 없이 클라이언트에서 직접 DB 접근</li>
          </ul>

          <h3>5.2 Supabase</h3>
          <ul>
            <li><strong>"오픈소스 Firebase 대안"</strong> — PostgreSQL 기반</li>
            <li>관계형 DB의 강점(SQL, JOIN, 트랜잭션) + BaaS의 편의성</li>
            <li>실시간 구독, Row Level Security, Edge Functions</li>
            <li>대시보드에서 테이블 관리, SQL 편집기 제공</li>
            <li>REST API, GraphQL API 자동 생성</li>
          </ul>

          <h3>5.3 Firebase vs Supabase</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>비교</th><th>Firebase</th><th>Supabase</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>DB 유형</strong></td><td>NoSQL (Firestore)</td><td>관계형 (PostgreSQL)</td></tr>
              <tr><td><strong>쿼리</strong></td><td>제한적 (복잡한 조건 어려움)</td><td>SQL 전체 사용 가능</td></tr>
              <tr><td><strong>관계</strong></td><td>중첩/참조 (비효율적)</td><td>외래키, JOIN 지원</td></tr>
              <tr><td><strong>오픈소스</strong></td><td>X</td><td>O (셀프 호스팅 가능)</td></tr>
              <tr><td><strong>가격</strong></td><td>읽기/쓰기 횟수 기반</td><td>프로젝트/용량 기반 (예측 가능)</td></tr>
              <tr><td><strong>학습 곡선</strong></td><td>낮음</td><td>중간 (SQL 지식 필요)</td></tr>
            </tbody>
          </table>

          <h2>6. 서버리스 데이터베이스</h2>

          <p>
            <strong>서버리스 DB</strong>는 서버 관리 없이 사용량에 따라 자동으로 확장/축소되며,
            사용하지 않을 때는 <strong>비용이 0</strong>에 가깝습니다.
          </p>

          <table className="lesson-table">
            <thead>
              <tr><th>서비스</th><th>유형</th><th>특징</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Aurora Serverless</strong></td><td>관계형</td><td>MySQL/PostgreSQL, 자동 일시정지</td></tr>
              <tr><td><strong>DynamoDB</strong></td><td>NoSQL</td><td>온디맨드 용량, 무한 확장</td></tr>
              <tr><td><strong>PlanetScale</strong></td><td>관계형</td><td>MySQL 호환, 브랜칭, 스키마 변경 안전</td></tr>
              <tr><td><strong>Neon</strong></td><td>관계형</td><td>PostgreSQL, 브랜칭, 프리 티어 관대</td></tr>
              <tr><td><strong>Turso</strong></td><td>관계형</td><td>SQLite 기반, 엣지 배포, 초저지연</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>클라우드 DB</strong>는 인프라 관리 부담을 줄이고 빠른 확장과 고가용성을 제공한다.</li>
              <li><strong>AWS RDS/Aurora</strong>, <strong>GCP Cloud SQL</strong>, <strong>Azure SQL</strong>이 3대 클라우드 관리형 DB이다.</li>
              <li><strong>Firebase</strong>(NoSQL)와 <strong>Supabase</strong>(PostgreSQL)는 BaaS로 빠른 개발을 지원한다.</li>
              <li><strong>서버리스 DB</strong>는 사용량 기반 과금으로 소규모 프로젝트에 경제적이다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> 온프레미스 DB와 클라우드 DB의 장단점을 비교하세요.</p>
            <p><strong>문제 2.</strong> Firebase와 Supabase의 차이점 3가지를 설명하세요.</p>
            <p><strong>문제 3.</strong> 서버리스 데이터베이스가 적합한 프로젝트 유형을 2가지 이상 제시하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/services/nosql" className="lesson-nav-btn prev">&larr; NoSQL 데이터베이스</Link>
            <Link to="/services/newql" className="lesson-nav-btn next">NewSQL &amp; 특수목적 DB &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default CloudDb;
