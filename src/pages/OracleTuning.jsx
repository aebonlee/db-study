import { Link } from 'react-router-dom';

const OracleTuning = () => {
  const cards = [
    { path: '/oracle/sql-processing',  title: 'SQL 처리 구조와 I/O',     desc: 'Parse/Bind/Execute/Fetch, SGA/PGA, Buffer Cache',      icon: '🏛️' },
    { path: '/oracle/execution-plan',  title: '실행계획과 옵티마이저',      desc: 'DBMS_XPLAN, Access/Filter, 커서 공유, 힌트',           icon: '📋' },
    { path: '/oracle/index-strategy',  title: '인덱스 전략과 조인 튜닝',   desc: 'B-Tree, 복합 인덱스, NL/Hash/Merge Join',              icon: '📑' },
    { path: '/oracle/awr-analysis',    title: 'AWR 분석과 성능 진단',     desc: 'AWR 리포트, V$SQL, 통계/히스토그램',                    icon: '📊' },
    { path: '/oracle/parallel-wait',   title: '병렬처리와 Wait Event',    desc: 'Parallel Query, Lock 진단, 트랜잭션 튜닝',             icon: '⚡' },
  ];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Oracle SQL 튜닝</h1>
          <p>Oracle 데이터베이스 성능 최적화 — 실행계획, 인덱스, 조인, AWR, Wait Event</p>
        </div>
      </section>
      <section className="section curriculum-section">
        <div className="container">
          <h2 className="section-title">Oracle 튜닝 커리큘럼</h2>
          <p className="section-subtitle">Oracle DB 환경에서의 SQL 튜닝을 체계적으로 학습합니다.</p>
          <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '960px', margin: '0 auto' }}>
            {cards.map((item, i) => (
              <Link
                to={item.path}
                key={item.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <span className="curriculum-icon">{item.icon}</span>
                <h3 className="curriculum-card-title">{item.title}</h3>
                <p className="curriculum-card-desc">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>Oracle SQL 튜닝이란?</h3>
              <p>
                SQL 튜닝은 단순히 "SQL을 빠르게" 만드는 것이 아니라, <strong>병목 지점을 찾아 불필요한 자원 낭비를 제거</strong>하는 것입니다.
                실행계획을 해석하고, 조건절을 개선하며, 인덱스 전략을 수립하는 <strong>구조적 사고</strong>가 핵심입니다.
              </p>
            </div>

            <h2>학습 로드맵</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>단계</th><th>주제</th><th>핵심 내용</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>1단계</strong></td><td>SQL 처리 구조와 I/O</td><td>Parse → Bind → Execute → Fetch, SGA/PGA, Buffer Cache</td></tr>
                <tr><td><strong>2단계</strong></td><td>실행계획과 옵티마이저</td><td>DBMS_XPLAN, Access/Filter Predicate, 커서 공유, 힌트</td></tr>
                <tr><td><strong>3단계</strong></td><td>인덱스 전략과 조인 튜닝</td><td>B-Tree, 복합/함수 기반 인덱스, NL/Hash/Merge Join</td></tr>
                <tr><td><strong>4단계</strong></td><td>AWR 분석과 성능 진단</td><td>AWR 리포트, Top SQL, 통계 수집, 히스토그램</td></tr>
                <tr><td><strong>5단계</strong></td><td>병렬처리와 Wait Event</td><td>Parallel Query, DOP, Lock/Wait 진단, 트랜잭션 튜닝</td></tr>
              </tbody>
            </table>

            <h2>핵심 튜닝 원칙</h2>
            <ul>
              <li><strong>COST ↓</strong> — 실행 비용 절감</li>
              <li><strong>BUFFER_GETS ↓</strong> — 메모리 블록 접근 최소화</li>
              <li><strong>DISK_READS ↓</strong> — 디스크 I/O 줄이기</li>
              <li><strong>EXECUTIONS ↓</strong> — 불필요한 반복 실행 제거</li>
            </ul>

            <div className="callout-box tip">
              <h3>MySQL 튜닝과의 차이</h3>
              <p>
                MySQL 튜닝은 <Link to="/tuning">DB 튜닝(MySQL)</Link> 메뉴에서 학습할 수 있습니다.
                Oracle은 <strong>SGA/PGA 아키텍처, 커서 공유, AWR, 힌트 체계</strong> 등이
                MySQL과 다르므로 별도로 학습합니다.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default OracleTuning;
