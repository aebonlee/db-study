import { Link } from 'react-router-dom';

const RdbmsCompare = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>관계형 DB 비교</h1>
        <p>MySQL, PostgreSQL, Oracle, SQL Server, SQLite 비교 분석</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>주요 관계형 DBMS의 특징과 차이점을 이해한다.</li>
              <li>각 DBMS의 장단점과 적합한 사용 사례를 파악한다.</li>
              <li>프로젝트 요구사항에 맞는 DBMS를 선택할 수 있다.</li>
            </ul>
          </div>

          <h2>1. 주요 RDBMS 한눈에 비교</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>항목</th><th>MySQL</th><th>PostgreSQL</th><th>Oracle DB</th><th>SQL Server</th><th>SQLite</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>개발사</strong></td><td>Oracle (오픈소스)</td><td>커뮤니티</td><td>Oracle</td><td>Microsoft</td><td>D. Richard Hipp</td></tr>
              <tr><td><strong>라이선스</strong></td><td>GPL / 상용</td><td>PostgreSQL License (MIT 유사)</td><td>상용 (유료)</td><td>상용 / Express (무료)</td><td>퍼블릭 도메인</td></tr>
              <tr><td><strong>최초 출시</strong></td><td>1995년</td><td>1996년</td><td>1979년</td><td>1989년</td><td>2000년</td></tr>
              <tr><td><strong>서버 필요</strong></td><td>O</td><td>O</td><td>O</td><td>O</td><td>X (파일 기반)</td></tr>
              <tr><td><strong>SQL 표준 준수</strong></td><td>보통</td><td>매우 높음</td><td>높음</td><td>높음</td><td>보통</td></tr>
              <tr><td><strong>JSON 지원</strong></td><td>O (5.7+)</td><td>O (JSONB)</td><td>O</td><td>O</td><td>O (제한적)</td></tr>
              <tr><td><strong>동시 접속</strong></td><td>수천~수만</td><td>수천~수만</td><td>수만 이상</td><td>수천~수만</td><td>단일/소수</td></tr>
            </tbody>
          </table>

          <h2>2. MySQL</h2>

          <h3>2.1 특징</h3>
          <ul>
            <li>세계에서 <strong>가장 널리 사용되는</strong> 오픈소스 RDBMS</li>
            <li>웹 애플리케이션에 최적화 (LAMP 스택: Linux, Apache, MySQL, PHP)</li>
            <li>InnoDB 엔진으로 트랜잭션, 외래키 지원</li>
            <li>읽기 성능이 뛰어나고 설정이 간편</li>
            <li>복제(Replication) 기능으로 읽기 확장 용이</li>
          </ul>

          <h3>2.2 사용 사례</h3>
          <div className="code-block">
            <div className="code-header">MySQL이 적합한 경우</div>
            <pre><code>{`• 웹 애플리케이션 (WordPress, Drupal 등 CMS)
• 이커머스 플랫폼 (Shopify, Magento)
• SaaS 서비스 백엔드
• 읽기 비중이 높은 서비스
• 빠른 개발과 간편한 운영이 필요한 스타트업

사용 기업: Facebook, Twitter, YouTube, Netflix, Uber`}</code></pre>
          </div>

          <h2>3. PostgreSQL</h2>

          <h3>3.1 특징</h3>
          <ul>
            <li><strong>가장 진보된</strong> 오픈소스 관계형 데이터베이스</li>
            <li>SQL 표준 준수율이 가장 높음</li>
            <li>JSONB, 배열, 범위(Range), 지리(PostGIS) 등 <strong>확장 데이터 타입</strong> 풍부</li>
            <li>윈도우 함수, CTE, 머티리얼라이즈드 뷰 등 고급 기능 완벽 지원</li>
            <li>확장(Extension) 시스템으로 기능 추가 가능 (PostGIS, pg_trgm 등)</li>
            <li>MVCC(Multi-Version Concurrency Control)로 높은 동시성</li>
          </ul>

          <h3>3.2 MySQL vs PostgreSQL</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>비교 항목</th><th>MySQL</th><th>PostgreSQL</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>학습 난이도</strong></td><td>쉬움</td><td>중간</td></tr>
              <tr><td><strong>읽기 성능</strong></td><td>우수 (단순 쿼리)</td><td>우수 (복잡 쿼리)</td></tr>
              <tr><td><strong>쓰기 성능</strong></td><td>좋음</td><td>매우 좋음 (MVCC)</td></tr>
              <tr><td><strong>데이터 무결성</strong></td><td>좋음</td><td>매우 엄격</td></tr>
              <tr><td><strong>JSON 처리</strong></td><td>기본 지원</td><td>JSONB (인덱싱, 검색 우수)</td></tr>
              <tr><td><strong>전문 검색</strong></td><td>FULLTEXT 인덱스</td><td>tsvector + GIN 인덱스 (더 강력)</td></tr>
              <tr><td><strong>지리 데이터</strong></td><td>기본 Spatial</td><td>PostGIS (업계 표준)</td></tr>
              <tr><td><strong>호스팅 옵션</strong></td><td>매우 다양</td><td>다양 (Supabase, Neon 등)</td></tr>
            </tbody>
          </table>

          <div className="code-block">
            <div className="code-header">PostgreSQL이 적합한 경우</div>
            <pre><code>{`• 복잡한 쿼리와 데이터 분석이 필요한 서비스
• 지리/위치 기반 서비스 (PostGIS)
• JSON과 관계형 데이터를 함께 다루는 경우
• 데이터 무결성이 매우 중요한 금융/의료 시스템
• Supabase, Hasura 등 모던 백엔드 플랫폼

사용 기업: Apple, Instagram, Spotify, Reddit, Twitch`}</code></pre>
          </div>

          <h2>4. Oracle Database</h2>

          <h3>4.1 특징</h3>
          <ul>
            <li><strong>엔터프라이즈 시장 1위</strong> — 대규모 기업 시스템의 표준</li>
            <li>RAC(Real Application Clusters)로 고가용성 클러스터링</li>
            <li>파티셔닝, 샤딩, 인메모리 옵션 등 고급 기능</li>
            <li>PL/SQL로 강력한 서버사이드 프로그래밍</li>
            <li>높은 라이선스 비용 (CPU당 수천만 원)</li>
          </ul>

          <div className="code-block">
            <div className="code-header">Oracle이 적합한 경우</div>
            <pre><code>{`• 대규모 엔터프라이즈 시스템 (은행, 통신, 대기업 ERP)
• 미션 크리티컬 시스템 (99.999% 가용성 필요)
• 대용량 데이터 처리 (수십 TB 이상)
• 기존 Oracle 기반 시스템 유지보수

사용 기업: 대부분의 글로벌 은행, 삼성, SK, LG, 정부 기관`}</code></pre>
          </div>

          <h2>5. SQL Server</h2>

          <h3>5.1 특징</h3>
          <ul>
            <li>Microsoft 생태계와 <strong>완벽한 통합</strong> (.NET, Azure, Power BI)</li>
            <li>SSMS(SQL Server Management Studio) — 강력한 GUI 관리 도구</li>
            <li>T-SQL — SQL의 Microsoft 확장</li>
            <li>Express 에디션은 무료 (10GB 제한)</li>
            <li>BI(Business Intelligence) 기능 내장 (SSRS, SSIS, SSAS)</li>
          </ul>

          <div className="code-block">
            <div className="code-header">SQL Server가 적합한 경우</div>
            <pre><code>{`• Microsoft 기술 스택 (.NET, C#, Azure) 기반 프로젝트
• 비즈니스 인텔리전스/보고서 시스템
• Windows Server 환경
• Active Directory 연동이 필요한 경우

사용 기업: Stack Overflow, 대부분의 .NET 기반 기업`}</code></pre>
          </div>

          <h2>6. SQLite</h2>

          <h3>6.1 특징</h3>
          <ul>
            <li><strong>서버가 필요 없는</strong> 임베디드 데이터베이스</li>
            <li>단일 파일로 데이터베이스 전체를 저장</li>
            <li>설치 불필요 — 라이브러리로 링크</li>
            <li>모바일(Android, iOS), 데스크톱, IoT에 널리 사용</li>
            <li>가장 많이 배포된 데이터베이스 (수십억 대의 기기에 탑재)</li>
          </ul>

          <div className="code-block">
            <div className="code-header">SQLite가 적합한 경우</div>
            <pre><code>{`• 모바일 앱 (Android, iOS 내장 DB)
• 데스크톱 애플리케이션 (브라우저 히스토리, 메신저)
• IoT / 임베디드 시스템
• 프로토타이핑 / 로컬 개발 환경
• 서버 없이 간단한 데이터 저장이 필요한 경우

사용 사례: 모든 Android/iOS 기기, Chrome, Firefox, Skype`}</code></pre>
          </div>

          <h2>7. RDBMS 선택 가이드</h2>

          <table className="lesson-table">
            <thead>
              <tr><th>상황</th><th>추천 DBMS</th><th>이유</th></tr>
            </thead>
            <tbody>
              <tr><td>웹 서비스 시작</td><td><strong>MySQL</strong> 또는 <strong>PostgreSQL</strong></td><td>무료, 커뮤니티 활발, 호스팅 풍부</td></tr>
              <tr><td>복잡한 데이터 분석</td><td><strong>PostgreSQL</strong></td><td>고급 SQL 기능, 확장 타입</td></tr>
              <tr><td>대기업 미션 크리티컬</td><td><strong>Oracle</strong></td><td>최고 수준의 안정성, 기술 지원</td></tr>
              <tr><td>.NET / Azure 환경</td><td><strong>SQL Server</strong></td><td>Microsoft 생태계 통합</td></tr>
              <tr><td>모바일 / 임베디드</td><td><strong>SQLite</strong></td><td>서버 불필요, 가벼움</td></tr>
              <tr><td>모던 풀스택 (Supabase)</td><td><strong>PostgreSQL</strong></td><td>Supabase, Prisma 등 최신 도구 지원</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>MySQL</strong>: 가장 대중적, 웹 개발에 최적, 쉬운 학습 곡선</li>
              <li><strong>PostgreSQL</strong>: SQL 표준 최고 준수, 고급 기능 풍부, 모던 백엔드 표준</li>
              <li><strong>Oracle</strong>: 엔터프라이즈 1위, 미션 크리티컬 시스템, 고비용</li>
              <li><strong>SQL Server</strong>: Microsoft 생태계 최적, BI 기능 내장</li>
              <li><strong>SQLite</strong>: 서버 불필요, 모바일/임베디드, 세계 최다 배포</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> MySQL과 PostgreSQL의 주요 차이점 3가지를 설명하세요.</p>
            <p><strong>문제 2.</strong> SQLite가 서버 기반 DBMS와 다른 점을 설명하고, 적합한 사용 사례를 2가지 이상 들어보세요.</p>
            <p><strong>문제 3.</strong> 새로운 웹 서비스를 시작할 때 RDBMS를 선택하는 기준 3가지를 제시하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/services" className="lesson-nav-btn prev">&larr; DB 서비스 종류</Link>
            <Link to="/services/nosql" className="lesson-nav-btn next">NoSQL 데이터베이스 &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default RdbmsCompare;
