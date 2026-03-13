import { Link } from 'react-router-dom';
import useAOS from '../hooks/useAOS';

const services = [
  { path: '/services/rdbms-compare', title: '관계형 DB 비교',      desc: 'MySQL, PostgreSQL, Oracle, SQL Server, SQLite 비교 분석', icon: '🏛️' },
  { path: '/services/nosql',        title: 'NoSQL 데이터베이스',    desc: 'MongoDB, Redis, Cassandra, Neo4j 등 NoSQL 종류와 특징',   icon: '🍃' },
  { path: '/services/cloud-db',     title: '클라우드 DB 서비스',    desc: 'AWS RDS, Google Cloud SQL, Azure SQL, Supabase, Firebase', icon: '☁️' },
  { path: '/services/newsql',       title: 'NewSQL & 특수목적 DB', desc: 'CockroachDB, TimescaleDB, Elasticsearch, 벡터 DB',         icon: '⚡' },
];

const DbServices = () => {
  useAOS();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>DB 서비스 종류</h1>
          <p>다양한 데이터베이스 서비스의 종류, 특징, 선택 기준을 학습합니다</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {services.map((item, i) => (
              <Link
                to={item.path}
                key={item.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
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

export default DbServices;
