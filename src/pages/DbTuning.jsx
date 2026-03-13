import { Link } from 'react-router-dom';

const DbTuning = () => {
  const cards = [
    { path: '/tuning/explain',       title: '실행 계획 분석',       desc: 'EXPLAIN, 실행 계획 읽기, 쿼리 프로파일링',   icon: '🔬' },
    { path: '/tuning/index',         title: '인덱스 튜닝',         desc: 'B-Tree, 복합 인덱스, 커버링 인덱스, 풀스캔 방지', icon: '📑' },
    { path: '/tuning/sql',           title: 'SQL 튜닝 기법',       desc: '쿼리 리팩토링, 안티패턴, 조인 최적화',        icon: '⚡' },
    { path: '/tuning/server',        title: 'DB 서버 튜닝',        desc: '버퍼 풀, 캐시, 커넥션, 파라미터 최적화',      icon: '🖥️' },
    { path: '/tuning/case-study',    title: '튜닝 실전 사례',       desc: '슬로우 쿼리 분석, Before/After, 체크리스트',   icon: '🏆' },
  ];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>DB 튜닝</h1>
          <p>실행 계획, 인덱스, SQL 최적화, 서버 튜닝, 실전 사례</p>
        </div>
      </section>
      <section className="section curriculum-section">
        <div className="container">
          <h2 className="section-title">DB 튜닝 커리큘럼</h2>
          <p className="section-subtitle">데이터베이스 성능 최적화를 체계적으로 학습합니다.</p>
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
    </>
  );
};

export default DbTuning;
