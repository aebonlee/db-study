import useAOS from '../hooks/useAOS';

const courses = [
  {
    level: '입문',
    levelClass: 'beginner',
    title: '바이브 코딩 기초',
    desc: 'AI를 활용한 코드 생성의 기초를 배우고, 간단한 웹 애플리케이션을 만들어봅니다.',
    features: [
      'AI 도구 소개 및 설정',
      '프롬프트 엔지니어링 기초',
      '웹 앱 프로토타이핑',
      '실습 프로젝트 1개',
    ],
  },
  {
    level: '중급',
    levelClass: 'intermediate',
    title: 'UI/UX 디자인 with AI',
    desc: '사용자 중심 설계 원칙과 AI 도구를 활용한 효율적인 UI/UX 디자인 방법을 학습합니다.',
    features: [
      'UX 리서치 및 사용자 분석',
      'UI 컴포넌트 설계 패턴',
      'AI 기반 디자인 워크플로',
      '반응형 디자인 실습',
    ],
  },
  {
    level: '고급',
    levelClass: 'advanced',
    title: '풀스택 AI 개발',
    desc: '프론트엔드부터 백엔드, 배포까지 AI를 활용한 전체 개발 프로세스를 마스터합니다.',
    features: [
      '프론트엔드 프레임워크 활용',
      'API 설계 및 구현',
      '클라우드 배포 실습',
      '팀 프로젝트 협업',
    ],
  },
  {
    level: '맞춤',
    levelClass: 'custom',
    title: '맞춤 과정 (포트폴리오 & 웹사이트 제작)',
    desc: '개인 포트폴리오, 회사 홈페이지, 쇼핑몰 등 원하는 결과물을 직접 만들며 배우는 1:1 맞춤 수업입니다.',
    features: [
      '개인 포트폴리오 사이트 제작',
      '회사/브랜드 홈페이지 구축',
      '쇼핑몰·랜딩 페이지 제작',
      '1:1 맞춤 커리큘럼',
    ],
  },
];

const Training = () => {
  useAOS();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>교육 과정 안내</h1>
          <p>AI 시대의 개발 역량을 키우는 교육 프로그램</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="training-grid">
            {courses.map((course, i) => (
              <div
                key={course.title}
                className="training-card"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <span className={`training-badge training-badge--${course.levelClass}`}>
                  {course.level}
                </span>
                <h3 className="training-card-title">{course.title}</h3>
                <p className="training-card-desc">{course.desc}</p>
                <ul className="training-features">
                  {course.features.map(f => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="training-contact" data-aos="fade-up">
            <h3>교육 문의</h3>
            <p>교육 과정에 대한 자세한 문의는 아래 연락처로 연락주세요.</p>
            <div className="training-contact-list">
              <div className="training-contact-item">
                <span className="training-contact-icon">📧</span>
                <div>
                  <strong>이메일</strong>
                  <a href="mailto:aebon@dreamitbiz.com">aebon@dreamitbiz.com</a>
                </div>
              </div>
              <div className="training-contact-item">
                <span className="training-contact-icon">📞</span>
                <div>
                  <strong>전화</strong>
                  <a href="tel:010-3700-0629">010-3700-0629</a>
                </div>
              </div>
              <div className="training-contact-item">
                <span className="training-contact-icon">💬</span>
                <div>
                  <strong>카카오톡</strong>
                  <span>aebon</span>
                </div>
              </div>
              <div className="training-contact-item">
                <span className="training-contact-icon">🕐</span>
                <div>
                  <strong>운영시간</strong>
                  <span>평일 09:00 ~ 18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Training;
