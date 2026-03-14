import { Link } from 'react-router-dom';
import useAOS from '../hooks/useAOS';

const exams = [
  {
    path: '/exam/basic',
    level: '초급',
    title: 'DB 초급테스트',
    desc: '데이터베이스 기본 개념, SQL 기초, 스키마·정규화·트랜잭션 등 종합 평가',
    details: ['A형 객관·단답 10문항 (20점)', 'B형 서술·개념 8문항 (40점)', 'C형 SQL 실기 8문항 (40점)'],
    total: '26문제 · 100점 · 60분',
    icon: '&#x1F4D7;',
    color: '#3b82f6',
  },
  {
    path: '/exam/intermediate',
    level: '중급',
    title: 'DB 중급테스트',
    desc: '데이터베이스 이론 심화 — DBMS, 정규화, 트랜잭션, SQL, 무결성 종합 평가',
    details: ['객관식 30문항 (60점)', '단답식 20문항 (40점)'],
    total: '50문제 · 100점 · 60분',
    icon: '&#x1F4D8;',
    color: '#8b5cf6',
  },
];

const DbExam = () => {
  useAOS();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>DB 실력테스트</h1>
          <p>데이터베이스 실력을 점검하고 학습 방향을 확인하세요</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="exam-level-grid">
            {exams.map((exam) => (
              <Link to={exam.path} key={exam.path} className="exam-level-card" data-aos="fade-up"
                style={{ '--exam-color': exam.color }}>
                <div className="exam-level-header">
                  <span className="exam-level-icon" dangerouslySetInnerHTML={{ __html: exam.icon }} />
                  <span className="exam-level-badge" style={{ background: exam.color }}>{exam.level}</span>
                </div>
                <h2 className="exam-level-title">{exam.title}</h2>
                <p className="exam-level-desc">{exam.desc}</p>
                <ul className="exam-level-details">
                  {exam.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
                <div className="exam-level-total">{exam.total}</div>
                <span className="exam-level-start">시험 시작하기 &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DbExam;
