import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const sections = [
  {
    title: 'MySQL 공식 문서',
    items: [
      { name: 'MySQL 8.0 Reference Manual', url: 'https://dev.mysql.com/doc/refman/8.0/en/', desc: 'MySQL 공식 레퍼런스 매뉴얼 (영문)' },
      { name: 'MySQL Tutorial', url: 'https://dev.mysql.com/doc/refman/8.0/en/tutorial.html', desc: 'MySQL 공식 튜토리얼' },
      { name: 'MySQL Downloads', url: 'https://dev.mysql.com/downloads/', desc: 'MySQL 다운로드 페이지' },
    ],
  },
  {
    title: 'SQL 학습 사이트',
    items: [
      { name: 'W3Schools SQL Tutorial', url: 'https://www.w3schools.com/sql/', desc: '초보자 친화적인 SQL 튜토리얼' },
      { name: 'SQLBolt', url: 'https://sqlbolt.com/', desc: '인터랙티브 SQL 연습 문제' },
      { name: 'LeetCode Database', url: 'https://leetcode.com/problemset/database/', desc: 'SQL 코딩 테스트 문제' },
      { name: 'HackerRank SQL', url: 'https://www.hackerrank.com/domains/sql', desc: 'SQL 난이도별 문제 풀이' },
      { name: 'SQLZoo', url: 'https://sqlzoo.net/', desc: '단계별 SQL 학습 및 퀴즈' },
    ],
  },
  {
    title: '데이터베이스 도구',
    items: [
      { name: 'DBeaver', url: 'https://dbeaver.io/', desc: '무료 오픈소스 데이터베이스 관리 도구' },
      { name: 'MySQL Workbench', url: 'https://www.mysql.com/products/workbench/', desc: 'MySQL 공식 GUI 도구' },
      { name: 'phpMyAdmin', url: 'https://www.phpmyadmin.net/', desc: '웹 기반 MySQL 관리 도구' },
      { name: 'TablePlus', url: 'https://tableplus.com/', desc: '모던 데이터베이스 GUI (유료/무료)' },
    ],
  },
  {
    title: '추천 도서',
    items: [
      { name: 'SQL 첫걸음', url: '#', desc: '아사이 아츠시 저 — SQL 입문자를 위한 최고의 책' },
      { name: '데이터베이스 개론', url: '#', desc: '김연희 저 — 한국어 데이터베이스 교재' },
      { name: 'Learning SQL (3rd Edition)', url: '#', desc: 'Alan Beaulieu 저 — SQL 학습 바이블 (영문)' },
      { name: 'SQL Antipatterns', url: '#', desc: 'Bill Karwin 저 — SQL 안티패턴과 해결법' },
    ],
  },
  {
    title: '온라인 DB 실습 환경',
    items: [
      { name: 'DB Fiddle', url: 'https://www.db-fiddle.com/', desc: '온라인 SQL 실행 환경 (MySQL, PostgreSQL, SQLite)' },
      { name: 'SQL Fiddle', url: 'http://sqlfiddle.com/', desc: '온라인 SQL 테스트 도구' },
      { name: 'OneCompiler SQL', url: 'https://onecompiler.com/mysql', desc: '온라인 MySQL 컴파일러' },
    ],
  },
];

const References = () => {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('site.ref.title')} path="/references" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.ref.title')}</h1>
          <p>{t('site.ref.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">
            {sections.map((sec, i) => (
              <div key={sec.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <h2>{sec.title}</h2>
                <table className="lesson-table">
                  <thead>
                    <tr><th>이름</th><th>설명</th></tr>
                  </thead>
                  <tbody>
                    {sec.items.map((item) => (
                      <tr key={item.name}>
                        <td>
                          {item.url !== '#' ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <strong>{item.name}</strong>
                            </a>
                          ) : (
                            <strong>{item.name}</strong>
                          )}
                        </td>
                        <td>{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default References;
