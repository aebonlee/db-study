import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import site from '../config/site';

const Home = () => {
  const { t } = useLanguage();
  useAOS();

  const chapters = [
    { path: '/sql/setup',     title: 'SQL 환경 구축',          desc: 'MySQL 설치, DBeaver, 샘플 DB 구성',      icon: '🖥️', step: '1장' },
    { path: '/sql/select',    title: 'SELECT 기초',           desc: 'SELECT, FROM, 컬럼 선택, 별칭(AS)',       icon: '🔍', step: '2장' },
    { path: '/sql/where',     title: 'WHERE 조건절',          desc: 'WHERE, 비교연산자, AND/OR, LIKE, IN',     icon: '🎯', step: '3장' },
    { path: '/sql/sort',      title: '정렬과 제한',            desc: 'ORDER BY, LIMIT, OFFSET, DISTINCT',      icon: '📊', step: '4장' },
    { path: '/sql/function',  title: '함수와 표현식',           desc: '문자열, 숫자, 날짜 함수, CASE, NULL',      icon: '⚙️', step: '5장' },
    { path: '/sql/aggregate', title: '데이터 집계',            desc: 'COUNT, SUM, AVG, GROUP BY, HAVING',      icon: '📈', step: '6장' },
    { path: '/sql/dml',       title: '데이터 조작(DML)',       desc: 'INSERT, UPDATE, DELETE',                  icon: '✏️', step: '7장' },
    { path: '/sql/ddl',       title: '테이블 정의(DDL)',       desc: 'CREATE, ALTER, DROP, 자료형, 제약조건',     icon: '🏗️', step: '8장' },
    { path: '/sql/join',      title: 'JOIN',                  desc: 'INNER, LEFT, RIGHT, FULL, CROSS JOIN',   icon: '🔗', step: '9장' },
    { path: '/sql/subquery',  title: '서브쿼리',              desc: '스칼라, 인라인 뷰, EXISTS, IN',             icon: '🔄', step: '10장' },
    { path: '/sql/advanced',  title: '고급 SQL',              desc: '윈도우 함수, CTE, 뷰, 인덱스',              icon: '🚀', step: '11장' },
    { path: '/sql/design',    title: 'DB 설계',               desc: '정규화, ERD, 모델링, 트랜잭션',              icon: '📐', step: '12장' },
  ];

  const introCards = [
    { path: '/intro/what-is-db', title: '데이터베이스란?',    desc: 'DB의 정의, 역사, DBMS 종류',    icon: '💾' },
    { path: '/intro/rdbms',      title: '관계형 데이터베이스',  desc: '테이블, 키, 관계, SQL 개요',    icon: '🗃️' },
  ];

  return (
    <>
      <SEOHead
        title={`${site.name} | ${site.nameKo}`}
        description={site.description}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title">
              <span className="hero-title-line1">데이터베이스와 SQL을</span>{' '}
              <span className="hero-title-line2">체계적으로 배우다</span>
            </h1>
            <p className="hero-description">{t('site.home.heroDesc')}</p>
            <div className="hero-actions">
              <Link to="/sql" className="hero-btn primary">{t('site.home.startLearning')}</Link>
              <Link to="/references" className="hero-btn secondary">{t('site.home.goToRef')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is DB */}
      <section className="section ct-intro-section">
        <div className="container">
          <div className="ct-intro" data-aos="fade-up">
            <h2 className="section-title">{t('site.home.whatIsDB')}</h2>
            <p className="ct-description">{t('site.home.dbDescription')}</p>
          </div>
          <div className="learning-goals" data-aos="fade-up" data-aos-delay="200">
            <h3>{t('site.home.learningGoals')}</h3>
            <ul className="goals-list">
              <li>{t('site.home.goal1')}</li>
              <li>{t('site.home.goal2')}</li>
              <li>{t('site.home.goal3')}</li>
              <li>{t('site.home.goal4')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DB Intro Cards */}
      <section className="section curriculum-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">DB 개론</h2>
          <p className="section-subtitle" data-aos="fade-up">데이터베이스의 기본 개념과 관계형 모델을 이해합니다.</p>
          <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '640px', margin: '0 auto' }}>
            {introCards.map((item, i) => (
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

      {/* SQL Curriculum Cards */}
      <section className="section curriculum-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">{t('site.home.curriculum')}</h2>
          <p className="section-subtitle" data-aos="fade-up">{t('site.home.curriculumDesc')}</p>
          <div className="curriculum-grid">
            {chapters.map((ch, i) => (
              <Link
                to={ch.path}
                key={ch.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <span className="curriculum-step">{ch.step}</span>
                <span className="curriculum-icon">{ch.icon}</span>
                <h3 className="curriculum-card-title">{ch.title}</h3>
                <p className="curriculum-card-desc">{ch.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
