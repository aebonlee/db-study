import { Link } from 'react-router-dom';
import useAOS from '../hooks/useAOS';

const chapters = [
  { path: '/web/architecture',  title: '웹-DB 연동 구조',         desc: '클라이언트-서버 아키텍처, REST API, 3계층 구조',   icon: '🏗️' },
  { path: '/web/node-mysql',    title: 'Node.js + MySQL',        desc: 'Express.js, mysql2, 커넥션 풀, CRUD API 구축',     icon: '🟢' },
  { path: '/web/python-db',     title: 'Python + DB',            desc: 'Flask/FastAPI, SQLAlchemy ORM, DB 연동 패턴',      icon: '🐍' },
  { path: '/web/orm',           title: 'ORM과 쿼리빌더',          desc: 'Prisma, Sequelize, TypeORM, SQLAlchemy 비교',     icon: '🔧' },
  { path: '/web/auth-security', title: '인증과 보안',              desc: 'SQL Injection 방지, 비밀번호 해싱, JWT, 세션',     icon: '🔒' },
  { path: '/web/deploy',        title: '배포와 운영',              desc: '환경변수, 마이그레이션, 백업, 모니터링, CI/CD',    icon: '🚀' },
];

const WebIntegration = () => {
  useAOS();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>DB 웹 연동</h1>
          <p>웹 애플리케이션과 데이터베이스를 연결하는 실전 기술을 학습합니다</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {chapters.map((item, i) => (
              <Link
                to={item.path}
                key={item.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 60}
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

export default WebIntegration;
