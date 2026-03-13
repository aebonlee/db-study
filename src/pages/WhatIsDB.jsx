import { Link } from 'react-router-dom';

const WhatIsDB = () => (
  <>
    <section className="page-header">
      <div className="container">
        <h1>데이터베이스란 무엇인가?</h1>
        <p>데이터베이스의 정의, 역사, DBMS의 종류와 특징</p>
      </div>
    </section>
    <section className="section lesson-content">
      <div className="container">
        <div className="lesson-body">

          <div className="callout-box">
            <h3>학습 목표</h3>
            <ul>
              <li>데이터베이스(Database)의 정의와 필요성을 이해한다.</li>
              <li>파일 시스템과 데이터베이스의 차이점을 설명할 수 있다.</li>
              <li>DBMS(Database Management System)의 역할과 종류를 파악한다.</li>
              <li>데이터베이스의 발전 역사를 개괄적으로 이해한다.</li>
            </ul>
          </div>

          <h2>1. 데이터베이스의 정의</h2>

          <h3>1.1 데이터베이스란?</h3>
          <p>
            <strong>데이터베이스(Database, DB)</strong>란 여러 사용자나 응용 프로그램이 <strong>공유</strong>하여 사용할 수 있도록
            <strong>체계적으로 구성</strong>된 데이터의 집합입니다. 단순히 데이터를 모아놓은 것이 아니라,
            특정 목적을 위해 <strong>구조화</strong>되고 <strong>통합 관리</strong>되는 데이터를 의미합니다.
          </p>
          <p>
            일상생활에서의 예를 들면, 학교의 학생 명부, 도서관의 도서 목록, 병원의 환자 기록 등이
            모두 데이터베이스의 형태라고 할 수 있습니다.
          </p>

          <h3>1.2 데이터베이스의 특징</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>특징</th><th>설명</th><th>예시</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>실시간 접근성</strong></td><td>사용자의 요청에 즉시 응답</td><td>ATM에서 잔액 조회 시 즉시 결과 표시</td></tr>
              <tr><td><strong>계속적 변화</strong></td><td>삽입, 삭제, 수정으로 항상 최신 상태 유지</td><td>온라인 쇼핑몰의 재고 수량 실시간 반영</td></tr>
              <tr><td><strong>동시 공유</strong></td><td>여러 사용자가 동시에 접근 가능</td><td>수강신청 시 여러 학생이 동시 접속</td></tr>
              <tr><td><strong>내용에 의한 참조</strong></td><td>저장 위치가 아닌 데이터 값으로 검색</td><td>"홍길동"이라는 이름으로 학생 정보 검색</td></tr>
            </tbody>
          </table>

          <h2>2. 파일 시스템 vs 데이터베이스</h2>

          <h3>2.1 파일 시스템의 문제점</h3>
          <p>
            데이터베이스가 등장하기 전에는 <strong>파일 시스템(File System)</strong>으로 데이터를 관리했습니다.
            각 응용 프로그램이 자신만의 파일을 가지고 데이터를 저장하는 방식인데, 여러 심각한 문제가 있었습니다.
          </p>
          <ul>
            <li><strong>데이터 중복(Redundancy)</strong>: 같은 데이터가 여러 파일에 중복 저장되어 저장 공간 낭비</li>
            <li><strong>데이터 불일치(Inconsistency)</strong>: 중복된 데이터 중 일부만 수정되면 서로 다른 값이 존재</li>
            <li><strong>데이터 종속성(Dependency)</strong>: 파일 구조가 바뀌면 프로그램도 함께 수정해야 함</li>
            <li><strong>동시 접근 불가</strong>: 여러 사용자가 동시에 같은 파일을 수정하기 어려움</li>
            <li><strong>보안 취약</strong>: 세밀한 접근 제어가 어려움</li>
          </ul>

          <h3>2.2 데이터베이스의 장점</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>구분</th><th>파일 시스템</th><th>데이터베이스</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>데이터 중복</strong></td><td>중복 허용, 비효율적</td><td>최소화, 통합 관리</td></tr>
              <tr><td><strong>데이터 일관성</strong></td><td>불일치 발생 가능</td><td>일관성 보장</td></tr>
              <tr><td><strong>동시 접근</strong></td><td>제한적</td><td>동시성 제어 지원</td></tr>
              <tr><td><strong>보안</strong></td><td>파일 단위 접근 제어</td><td>세밀한 권한 관리</td></tr>
              <tr><td><strong>데이터 독립성</strong></td><td>프로그램에 종속</td><td>프로그램과 독립</td></tr>
              <tr><td><strong>백업/복구</strong></td><td>수동 관리</td><td>자동 백업, 트랜잭션 복구</td></tr>
            </tbody>
          </table>

          <h2>3. DBMS (Database Management System)</h2>

          <h3>3.1 DBMS란?</h3>
          <p>
            <strong>DBMS</strong>는 데이터베이스를 생성하고 관리하는 소프트웨어 시스템입니다.
            사용자와 데이터베이스 사이에서 중개자 역할을 하며, 데이터의 정의, 조작, 제어 기능을 제공합니다.
          </p>
          <div className="code-block">
            <div className="code-header">DBMS의 역할</div>
            <pre><code>{`사용자/응용 프로그램
        ↕  SQL 요청/결과
      [ DBMS ]
        ↕  데이터 읽기/쓰기
    [ 데이터베이스 (저장장치) ]`}</code></pre>
          </div>

          <h3>3.2 DBMS의 주요 기능</h3>
          <ul>
            <li><strong>정의 기능(DDL)</strong>: 데이터베이스 구조를 정의 — 테이블 생성, 수정, 삭제</li>
            <li><strong>조작 기능(DML)</strong>: 데이터를 검색, 삽입, 수정, 삭제</li>
            <li><strong>제어 기능(DCL)</strong>: 접근 권한 관리, 동시성 제어, 무결성 유지</li>
          </ul>

          <h3>3.3 주요 DBMS 종류</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>DBMS</th><th>개발사</th><th>유형</th><th>특징</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>MySQL</strong></td><td>Oracle (오픈소스)</td><td>관계형</td><td>가장 널리 사용, 웹 개발에 최적화</td></tr>
              <tr><td><strong>PostgreSQL</strong></td><td>오픈소스 커뮤니티</td><td>관계형</td><td>표준 SQL 준수, 고급 기능 풍부</td></tr>
              <tr><td><strong>Oracle DB</strong></td><td>Oracle</td><td>관계형</td><td>대규모 엔터프라이즈, 고성능</td></tr>
              <tr><td><strong>SQL Server</strong></td><td>Microsoft</td><td>관계형</td><td>Windows 생태계, BI 통합</td></tr>
              <tr><td><strong>SQLite</strong></td><td>오픈소스</td><td>관계형</td><td>경량, 서버 불필요, 모바일/임베디드</td></tr>
              <tr><td><strong>MongoDB</strong></td><td>MongoDB Inc.</td><td>NoSQL(문서)</td><td>JSON 기반, 유연한 스키마</td></tr>
              <tr><td><strong>Redis</strong></td><td>오픈소스</td><td>NoSQL(키-값)</td><td>인메모리, 초고속, 캐싱</td></tr>
            </tbody>
          </table>

          <h2>4. 데이터베이스의 발전 역사</h2>

          <h3>4.1 주요 연대기</h3>
          <table className="lesson-table">
            <thead>
              <tr><th>시기</th><th>모델</th><th>특징</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>1960년대</strong></td><td>계층형 / 네트워크형</td><td>IBM IMS, 트리/그래프 구조, 복잡한 탐색</td></tr>
              <tr><td><strong>1970년</strong></td><td>관계형 모델 제안</td><td>E.F. Codd의 논문 발표, 테이블 기반</td></tr>
              <tr><td><strong>1979년</strong></td><td>Oracle 출시</td><td>최초의 상용 관계형 DBMS</td></tr>
              <tr><td><strong>1986년</strong></td><td>SQL 표준화</td><td>ANSI/ISO SQL 표준 제정</td></tr>
              <tr><td><strong>1995년</strong></td><td>MySQL 출시</td><td>오픈소스 RDBMS의 대중화</td></tr>
              <tr><td><strong>2000년대</strong></td><td>NoSQL 등장</td><td>빅데이터 시대, MongoDB, Redis 등</td></tr>
              <tr><td><strong>2010년대~</strong></td><td>클라우드 DB</td><td>AWS RDS, Google Cloud SQL, Azure SQL</td></tr>
            </tbody>
          </table>

          <h3>4.2 E.F. Codd의 관계형 모델</h3>
          <p>
            1970년 IBM 연구원 <strong>에드거 F. 코드(Edgar F. Codd)</strong>가 발표한 논문
            <em>"A Relational Model of Data for Large Shared Data Banks"</em>는
            현대 데이터베이스의 초석이 되었습니다. 그는 데이터를 <strong>테이블(관계, Relation)</strong> 형태로 표현하고,
            <strong>수학적 집합론</strong>을 기반으로 데이터를 조작하는 방법을 제안했습니다.
            이 혁신적인 아이디어가 오늘날 우리가 사용하는 관계형 데이터베이스와 SQL의 근간이 됩니다.
          </p>

          <h2>5. 데이터베이스 모델의 종류</h2>

          <h3>5.1 관계형 데이터베이스 (RDBMS)</h3>
          <p>
            데이터를 <strong>테이블(행과 열)</strong>로 구성하며, 테이블 간의 <strong>관계(Relationship)</strong>를 통해
            데이터를 연결합니다. <strong>SQL</strong>을 사용하여 데이터를 조작합니다.
            전체 DBMS 시장의 약 70% 이상을 차지하는 가장 보편적인 모델입니다.
          </p>

          <h3>5.2 NoSQL 데이터베이스</h3>
          <p>
            관계형 모델의 한계를 극복하기 위해 등장한 데이터베이스들의 총칭입니다.
            "Not Only SQL"의 약자로, 다양한 데이터 모델을 지원합니다.
          </p>
          <table className="lesson-table">
            <thead>
              <tr><th>유형</th><th>특징</th><th>대표 DBMS</th><th>활용 예</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>문서형</strong></td><td>JSON/BSON 문서 저장</td><td>MongoDB, CouchDB</td><td>콘텐츠 관리, 카탈로그</td></tr>
              <tr><td><strong>키-값형</strong></td><td>키와 값의 쌍으로 저장</td><td>Redis, DynamoDB</td><td>세션, 캐싱, 설정</td></tr>
              <tr><td><strong>컬럼형</strong></td><td>컬럼 단위로 저장</td><td>Cassandra, HBase</td><td>시계열 데이터, 로그</td></tr>
              <tr><td><strong>그래프형</strong></td><td>노드와 엣지로 관계 표현</td><td>Neo4j, ArangoDB</td><td>소셜 네트워크, 추천</td></tr>
            </tbody>
          </table>

          <div className="callout-box">
            <h3>핵심 정리</h3>
            <ul>
              <li><strong>데이터베이스</strong>는 체계적으로 구성된 공유 가능한 데이터의 집합이다.</li>
              <li>파일 시스템의 <strong>중복, 불일치, 종속성</strong> 문제를 해결하기 위해 DBMS가 등장했다.</li>
              <li><strong>DBMS</strong>는 데이터 정의(DDL), 조작(DML), 제어(DCL) 기능을 제공한다.</li>
              <li>1970년 <strong>E.F. Codd</strong>의 관계형 모델이 현대 RDBMS의 기초가 되었다.</li>
              <li><strong>관계형(RDBMS)</strong>과 <strong>NoSQL</strong>은 각각의 장점이 있으며 용도에 따라 선택한다.</li>
            </ul>
          </div>

          <div className="exercise-box">
            <h3>확인 문제</h3>
            <p><strong>문제 1.</strong> 파일 시스템 대비 데이터베이스의 장점 3가지를 설명하세요.</p>
            <p><strong>문제 2.</strong> DBMS의 3가지 주요 기능(DDL, DML, DCL)을 각각 예를 들어 설명하세요.</p>
            <p><strong>문제 3.</strong> 관계형 데이터베이스와 NoSQL 데이터베이스의 차이점을 비교하세요.</p>
          </div>

          <div className="lesson-nav">
            <Link to="/" className="lesson-nav-btn prev">← 홈으로</Link>
            <Link to="/intro/rdbms" className="lesson-nav-btn next">관계형 데이터베이스 →</Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default WhatIsDB;
