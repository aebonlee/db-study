import { Link } from 'react-router-dom';
import useAOS from '../hooks/useAOS';

const cards = [
  {
    path: '/oracle/sql-processing',
    step: 'Day 1',
    title: 'SQL 처리 구조와 I/O',
    desc: 'Oracle SQL 처리 절차와 메모리/디스크 I/O 구조를 이해하고, 조건절 튜닝 전략을 학습합니다.',
    icon: '🏛️',
    tags: ['Parse/Bind/Execute/Fetch', 'SGA/PGA', 'Buffer Cache', 'Hard/Soft Parse', '조건절 함수 제거', 'B-Tree 인덱스'],
  },
  {
    path: '/oracle/execution-plan',
    step: 'Day 2',
    title: '실행계획과 옵티마이저',
    desc: 'DBMS_XPLAN으로 실행계획을 분석하고, 커서 공유와 힌트 전략을 학습합니다.',
    icon: '📋',
    tags: ['DBMS_XPLAN', 'Access/Filter Predicate', '커서 공유', 'Library Cache', 'Oracle 힌트', '서브쿼리 튜닝'],
  },
  {
    path: '/oracle/index-strategy',
    step: 'Day 3',
    title: '인덱스 전략과 조인 튜닝',
    desc: '복합 인덱스 설계 원칙과 NL/Hash/Merge Join의 차이와 적용 전략을 학습합니다.',
    icon: '📑',
    tags: ['복합 인덱스', 'Function-Based Index', 'Skip Scan', 'NL Join', 'Hash Join', 'Merge Join', 'V$SQL'],
  },
  {
    path: '/oracle/awr-analysis',
    step: 'Day 4',
    title: 'AWR 분석과 성능 진단',
    desc: 'AWR 리포트로 Top SQL을 분석하고, 통계/히스토그램과 Lock 진단을 학습합니다.',
    icon: '📊',
    tags: ['AWR 리포트', 'DBA_HIST_SQLSTAT', 'DBMS_STATS', '히스토그램', 'Wait Event', 'Lock 진단', '튜닝 리포트'],
  },
  {
    path: '/oracle/parallel-wait',
    step: 'Day 5',
    title: '병렬처리와 Wait Event',
    desc: 'Parallel Query 구조와 Wait Event 기반 성능 진단, 종합 튜닝 전략을 학습합니다.',
    icon: '⚡',
    tags: ['Parallel Query', 'DOP', 'PX COORDINATOR', 'Wait Class', 'enq:TX', 'SKIP LOCKED', '종합 전략'],
  },
];

const OracleTuning = () => {
  useAOS();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Oracle SQL 튜닝</h1>
          <p>Oracle 데이터베이스 성능 최적화 — 실행계획, 인덱스, 조인, AWR, Wait Event</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tuning-overview">
            <div className="tuning-overview-item" data-aos="fade-up">
              <span className="tuning-overview-icon">🏛️</span>
              <div><strong>구조 이해</strong><br /><span>SQL 처리 / I/O</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="50">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="100">
              <span className="tuning-overview-icon">📋</span>
              <div><strong>실행계획</strong><br /><span>옵티마이저 / 힌트</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="150">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="200">
              <span className="tuning-overview-icon">📑</span>
              <div><strong>인덱스 / 조인</strong><br /><span>NL / Hash / Merge</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="250">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="300">
              <span className="tuning-overview-icon">📊</span>
              <div><strong>AWR 분석</strong><br /><span>통계 / 히스토그램</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="350">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="400">
              <span className="tuning-overview-icon">⚡</span>
              <div><strong>병렬 / Wait</strong><br /><span>진단 / 종합</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tuning-cards-list">
            {cards.map((card, i) => (
              <Link
                to={card.path}
                key={card.path}
                className="tuning-card-box"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="tuning-card-step">{card.step}</div>
                <div className="tuning-card-icon">{card.icon}</div>
                <div className="tuning-card-body">
                  <h3 className="tuning-card-title">{card.title}</h3>
                  <p className="tuning-card-desc">{card.desc}</p>
                  <div className="tuning-card-tags">
                    {card.tags.map(tag => (
                      <span key={tag} className="tuning-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="tuning-card-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">
            <div className="callout-box">
              <h3>Oracle SQL 튜닝의 본질</h3>
              <p>
                SQL 튜닝은 단순히 "SQL을 빠르게" 만드는 것이 아니라,{' '}
                <strong>병목 지점을 찾아 불필요한 자원 낭비를 제거</strong>하는 것입니다.
                실행계획을 해석하고, 조건절을 개선하며, 인덱스 전략을 수립하는{' '}
                <strong>구조적 사고</strong>가 핵심입니다.
              </p>
            </div>

            <div className="callout-box tip">
              <h3>MySQL 튜닝을 찾으시나요?</h3>
              <p>
                MySQL 환경에서의 튜닝은{' '}
                <Link to="/tuning">DB 튜닝(MySQL)</Link> 메뉴에서 학습할 수 있습니다.
                EXPLAIN, InnoDB Buffer Pool, my.cnf 파라미터 등 MySQL 전용 내용을 다룹니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OracleTuning;
