import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const chapters = [
  { ch: 1,  path: '/sql/setup',     icon: '🖥️', title: 'SQL 환경 구축',            desc: 'MySQL 설치, DBeaver 설정, 샘플 DB 구성' },
  { ch: 2,  path: '/sql/select',    icon: '🔍', title: 'SELECT 기초',              desc: 'SELECT, FROM, 컬럼 선택, 별칭(AS)' },
  { ch: 3,  path: '/sql/where',     icon: '🎯', title: 'WHERE 조건절',             desc: 'WHERE, 비교연산자, AND/OR, LIKE, IN, BETWEEN' },
  { ch: 4,  path: '/sql/sort',      icon: '📊', title: '정렬과 제한',               desc: 'ORDER BY, LIMIT, OFFSET, DISTINCT' },
  { ch: 5,  path: '/sql/function',  icon: '⚙️', title: '함수와 표현식',              desc: '문자열, 숫자, 날짜 함수, CASE, NULL 처리' },
  { ch: 6,  path: '/sql/aggregate', icon: '📈', title: '데이터 집계',               desc: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING' },
  { ch: 7,  path: '/sql/dml',       icon: '✏️', title: '데이터 조작 (DML)',          desc: 'INSERT, UPDATE, DELETE' },
  { ch: 8,  path: '/sql/ddl',       icon: '🏗️', title: '테이블 정의 (DDL)',          desc: 'CREATE TABLE, ALTER, DROP, 자료형, 제약조건' },
  { ch: 9,  path: '/sql/join',      icon: '🔗', title: 'JOIN',                     desc: 'INNER, LEFT, RIGHT, FULL OUTER, CROSS, Self JOIN' },
  { ch: 10, path: '/sql/subquery',  icon: '🔄', title: '서브쿼리',                  desc: '스칼라, 인라인 뷰, 상관 서브쿼리, EXISTS' },
  { ch: 11, path: '/sql/advanced',  icon: '🚀', title: '고급 SQL',                 desc: '윈도우 함수, CTE, 뷰, 인덱스' },
  { ch: 12, path: '/sql/design',    icon: '📐', title: 'DB 설계',                  desc: '정규화, ERD, 데이터 모델링, 트랜잭션' },
];

const SqlLesson = () => {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('site.sql.title')} path="/sql" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.sql.title')}</h1>
          <p>{t('site.sql.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {chapters.map((w, i) => (
              <Link
                to={w.path}
                key={w.ch}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <span className="curriculum-step">{String(w.ch).padStart(2, '0')}.</span>
                <span className="curriculum-icon">{w.icon}</span>
                <h3 className="curriculum-card-title">{w.title}</h3>
                <p className="curriculum-card-desc">{w.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SqlLesson;
