import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

export default function About(): ReactElement {
  return (
    <>
      <SEOHead title="About | DB Study" description="데이터베이스와 SQL을 기초부터 고급까지 체계적으로 학습하는 교육 플랫폼" />
      <section className="page-header">
        <div className="container">
          <h1>About</h1>
          <p>데이터베이스 & SQL 학습</p>
        </div>
      </section>

      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          {/* 제작의도 */}
          <div style={{
            background: 'var(--bg-secondary, #f8f9fa)',
            borderLeft: '4px solid var(--primary-blue, #0046C8)',
            padding: '28px 32px',
            borderRadius: '0 12px 12px 0',
            marginBottom: '48px',
            lineHeight: 1.8,
            fontSize: '15px',
            color: 'var(--text-primary, #1a1a1a)',
          }}>
            <strong style={{ fontSize: '17px', display: 'block', marginBottom: '12px' }}>
              이 사이트는 데이터베이스와 SQL을 체계적으로 학습하는 교육 플랫폼입니다.
            </strong>
            <p style={{ margin: 0 }}>
              드림아이티비즈(DreamIT Biz)는 기업과 개인의 실제 니즈를 반영한 맞춤형 교육 플랫폼을 제작합니다.
              데이터베이스 기초 개념부터 SQL 쿼리 작성, 고급 데이터베이스 설계까지 단계별로 학습할 수 있습니다.
            </p>
          </div>

          {/* 주요 특징 */}
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary, #1a1a1a)' }}>
            주요 특징
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
            {[
              { icon: 'fa-database', title: 'DB 기초', desc: '관계형 데이터베이스의 핵심 개념을 학습합니다.' },
              { icon: 'fa-code', title: 'SQL 실습', desc: 'SELECT, JOIN, 서브쿼리 등 SQL 문법을 실습합니다.' },
              { icon: 'fa-diagram-project', title: 'DB 설계', desc: '정규화, ER 다이어그램 등 설계 기법을 배웁니다.' },
              { icon: 'fa-chart-line', title: '성능 최적화', desc: '인덱스, 쿼리 최적화 등 성능 튜닝을 다룹니다.' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '16px',
                padding: '24px',
                background: 'var(--bg-white, #fff)',
                border: '1px solid var(--line, #e5e7eb)',
                borderRadius: '12px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--bg-secondary, #f0f4ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i className={`fa-solid ${item.icon}`} style={{ color: 'var(--primary-blue, #0046C8)', fontSize: '18px' }} />
                </div>
                <div>
                  <strong style={{ fontSize: '15px', color: 'var(--text-primary, #1a1a1a)' }}>{item.title}</strong>
                  <p style={{ margin: '6px 0 0', fontSize: '14px', color: 'var(--text-secondary, #6b7280)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 개발사 정보 */}
          <div style={{
            padding: '32px',
            background: 'var(--bg-secondary, #f8f9fa)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary-blue, #0046C8)', marginBottom: '8px', letterSpacing: '0.05em' }}>DEVELOPED BY</p>
            <p style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary, #1a1a1a)' }}>드림아이티비즈 (DreamIT Biz)</p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary, #6b7280)', lineHeight: 1.6, marginBottom: '16px' }}>
              100개 교육 사이트를 운영하는 에듀테크 전문 기업
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-secondary, #6b7280)' }}>
              <span><i className="fa-solid fa-envelope" style={{ marginRight: '6px' }} />aebon@dreamitbiz.com</span>
              <span><i className="fa-solid fa-globe" style={{ marginRight: '6px' }} />www.dreamitbiz.com</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
