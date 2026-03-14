import { Link } from 'react-router-dom';
import useAOS from '../hooks/useAOS';

const cards = [
  {
    path: '/tuning/explain',
    step: 'Step 1',
    title: '실행 계획 분석',
    desc: 'MySQL이 쿼리를 어떻게 처리하는지 실행 계획을 읽고 병목 지점을 파악합니다.',
    icon: '🔬',
    tags: ['EXPLAIN', 'type 컬럼', 'Extra', 'EXPLAIN ANALYZE', 'SHOW PROFILE', '슬로우 쿼리'],
  },
  {
    path: '/tuning/index',
    step: 'Step 2',
    title: '인덱스 튜닝',
    desc: '인덱스의 구조를 이해하고, 효율적인 인덱스 설계와 안티패턴을 학습합니다.',
    icon: '📑',
    tags: ['B-Tree', '복합 인덱스', '커버링 인덱스', '최좌선 원칙', '인덱스 무시 패턴'],
  },
  {
    path: '/tuning/sql',
    step: 'Step 3',
    title: 'SQL 튜닝 기법',
    desc: '쿼리를 리팩토링하고 안티패턴을 제거하여 성능을 극대화합니다.',
    icon: '⚡',
    tags: ['Sargable 쿼리', 'JOIN 최적화', '서브쿼리→JOIN', '페이징', 'ORDER BY 최적화'],
  },
  {
    path: '/tuning/server',
    step: 'Step 4',
    title: 'DB 서버 튜닝',
    desc: 'MySQL 서버 파라미터를 조정하여 전체 시스템 성능을 최적화합니다.',
    icon: '🖥️',
    tags: ['Buffer Pool', 'innodb 파라미터', '커넥션 관리', 'my.cnf', '모니터링 쿼리'],
  },
  {
    path: '/tuning/case-study',
    step: 'Step 5',
    title: '튜닝 실전 사례',
    desc: '실제 슬로우 쿼리를 분석하고 Before/After로 개선 효과를 검증합니다.',
    icon: '🏆',
    tags: ['Before/After', '게시판 쿼리', '통계 쿼리', '페이징 최적화', '체크리스트'],
  },
];

const DbTuning = () => {
  useAOS();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>DB 튜닝 (MySQL)</h1>
          <p>MySQL 데이터베이스 성능을 분석하고 최적화하는 실전 기법을 학습합니다</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tuning-overview">
            <div className="tuning-overview-item" data-aos="fade-up">
              <span className="tuning-overview-icon">📉</span>
              <div><strong>EXPLAIN</strong><br /><span>실행 계획 분석</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="50">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="100">
              <span className="tuning-overview-icon">📑</span>
              <div><strong>INDEX</strong><br /><span>인덱스 설계</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="150">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="200">
              <span className="tuning-overview-icon">⚡</span>
              <div><strong>SQL</strong><br /><span>쿼리 최적화</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="250">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="300">
              <span className="tuning-overview-icon">🖥️</span>
              <div><strong>SERVER</strong><br /><span>서버 파라미터</span></div>
            </div>
            <div className="tuning-overview-arrow" data-aos="fade-up" data-aos-delay="350">→</div>
            <div className="tuning-overview-item" data-aos="fade-up" data-aos-delay="400">
              <span className="tuning-overview-icon">🏆</span>
              <div><strong>CASE</strong><br /><span>실전 적용</span></div>
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
            <div className="callout-box tip">
              <h3>Oracle 튜닝을 찾으시나요?</h3>
              <p>
                Oracle 데이터베이스 환경에서의 SQL 튜닝은{' '}
                <Link to="/oracle">Oracle SQL 튜닝</Link> 메뉴에서 학습할 수 있습니다.
                SGA/PGA 아키텍처, DBMS_XPLAN, AWR, 힌트 체계 등 Oracle 전용 내용을 다룹니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DbTuning;
