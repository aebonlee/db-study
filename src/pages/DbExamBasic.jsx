import { useState, useEffect, useRef, useCallback } from 'react';
import useAOS from '../hooks/useAOS';

/* ─── 26문제 데이터 ─── */
const questions = [
  // A형: 객관·단답 (각 2점, 총 20점)
  { id:1, type:'multiple', cat:'A형', pts:2, q:'다음 중 DBMS 필수 기능이 아닌 것은?', opts:['A. 정의','B. 조작','C. 제어','D. 연산'], ans:'D', exp:'DBMS의 3대 기능은 정의(DDL), 조작(DML), 제어(DCL)입니다. 연산은 별도 기능이 아닙니다.' },
  { id:2, type:'multiple', cat:'A형', pts:2, q:'3단계 스키마에 포함되지 않는 것은?', opts:['A. 외부','B. 개념','C. 내부','D. 관계'], ans:'D', exp:'스키마 3단계는 외부, 개념, 내부 스키마로 구성됩니다. 관계 스키마는 없습니다.' },
  { id:3, type:'multiple', cat:'A형', pts:2, q:'테이블의 행·열에 대한 용어 대응으로 옳은 것은?', opts:['A. 행=속성, 열=튜플','B. 행=튜플, 열=속성','C. 행=도메인, 열=튜플','D. 행=카디널리티, 열=디그리'], ans:'B', exp:'행(Row)=튜플(Tuple), 열(Column)=속성(Attribute)입니다.' },
  { id:4, type:'multiple', cat:'A형', pts:2, q:'기본키(Primary Key) 특성이 아닌 것은?', opts:['A. 유일성','B. NULL 허용','C. 최소성','D. 튜플 식별'], ans:'B', exp:'기본키는 NULL을 허용하지 않습니다 (개체 무결성).' },
  { id:5, type:'multiple', cat:'A형', pts:2, q:'다음 중 DCL에 속하는 명령어의 올바른 짝은?', opts:['A. CREATE, ALTER','B. SELECT, UPDATE','C. GRANT, REVOKE','D. INSERT, DELETE'], ans:'C', exp:'DCL(데이터 제어어)은 GRANT(권한 부여), REVOKE(권한 회수) 등입니다.' },
  { id:6, type:'multiple', cat:'A형', pts:2, q:'트랜잭션 ACID 중 "커밋 후 결과가 영구히 보존"되는 성질은?', opts:['A. 원자성','B. 일관성','C. 고립성','D. 영속성'], ans:'D', exp:'영속성(Durability)은 커밋 후 결과가 영구적으로 보존되는 특성입니다.' },
  { id:7, type:'multiple', cat:'A형', pts:2, q:'관계 연산자 중 "열(속성) 부분집합만 추출하며 중복 제거"는?', opts:['A. σ(선택)','B. ▷◁(조인)','C. π(프로젝션)','D. ÷(나누기)'], ans:'C', exp:'프로젝션(π)은 릴레이션에서 원하는 속성만 추출하고 중복을 제거합니다.' },
  { id:8, type:'multiple', cat:'A형', pts:2, q:'뷰(View)의 장점으로 옳지 않은 것은?', opts:['A. 논리적 데이터 독립성','B. 자동 보안','C. 독립 인덱스 소유','D. 관리 용이'], ans:'C', exp:'뷰는 가상 테이블로 독자적인 인덱스를 소유할 수 없습니다.' },
  { id:9, type:'shortAnswer', cat:'A형', pts:2, q:'카디널리티(Cardinality)와 디그리(Degree)를 각각 정의하시오.', ans:'Cardinality: 테이블의 행(튜플)의 수\nDegree: 테이블의 열(속성)의 수', exp:'카디널리티는 행의 수, 디그리는 열의 수를 의미합니다.' },
  { id:10, type:'shortAnswer', cat:'A형', pts:2, q:'외래키(FK)가 위배되기 쉬운 대표적 무결성 유형 한 가지를 쓰시오.', ans:'참조 무결성', exp:'외래키는 참조 무결성(Referential Integrity)과 밀접한 관련이 있습니다.' },
  // B형: 서술·개념 (각 5점, 총 40점)
  { id:11, type:'essay', cat:'B형', pts:5, q:'외부/개념/내부 스키마의 관점 차이와 예시를 설명하시오.', ans:'외부 스키마는 사용자 관점에서 필요한 데이터만 보는 뷰 형태입니다. 개념 스키마는 전체 데이터베이스의 논리적 구조를 나타내며 관리자가 설계합니다. 내부 스키마는 물리적 저장 구조를 다루며 설계자가 성능 최적화를 담당합니다.', exp:'스키마 3단계 구조는 데이터 독립성을 보장하기 위한 아키텍처입니다.' },
  { id:12, type:'essay', cat:'B형', pts:5, q:'논리적 독립성 vs 물리적 독립성을 비교하고, 실무 시나리오를 1개씩 제시하시오.', ans:'논리적 독립성은 스키마 변경 시 응용프로그램 수정 불필요. 물리적 독립성은 저장구조 변경 시 스키마 수정 불필요. 논리적: 테이블 구조 변경, 물리적: 인덱스 추가/변경', exp:'논리적 독립성은 외부-개념 사이, 물리적 독립성은 개념-내부 사이의 독립성입니다.' },
  { id:13, type:'essay', cat:'B형', pts:5, q:'정규화가 필요한 이유와 1NF→2NF→3NF 진행 시 제거되는 종속 형태를 요약하시오.', ans:'이상 현상 제거가 목적. 1NF: 반복 그룹 제거, 2NF: 부분 함수 종속 제거, 3NF: 이행적 함수 종속 제거', exp:'정규화는 이상 현상(삽입/삭제/갱신)을 방지하기 위한 테이블 분해 과정입니다.' },
  { id:14, type:'essay', cat:'B형', pts:5, q:'트랜잭션 회복 기법 2가지를 선택하여 REDO/UNDO 수행 여부를 정리하시오.', ans:'즉시갱신: REDO O, UNDO O / 지연갱신: REDO O, UNDO X', exp:'즉시갱신은 변경을 즉시 반영하므로 UNDO가 필요하고, 지연갱신은 커밋 시까지 반영을 미루므로 UNDO가 불필요합니다.' },
  { id:15, type:'essay', cat:'B형', pts:5, q:'접근통제(DAC/MAC/RBAC)의 차이와 SQL 차원의 통제 예시를 제시하시오.', ans:'DAC: 소유자 결정권한, MAC: 관리자 강제정책, RBAC: 역할기반 권한. 예시: GRANT SELECT, 보안라벨 설정, CREATE ROLE', exp:'DAC은 임의적, MAC은 강제적, RBAC은 역할 기반 접근통제 방식입니다.' },
  { id:16, type:'essay', cat:'B형', pts:5, q:'관계대수 σ/π/조인을 예제로 설명하고, SQL 키워드를 대응시키시오.', ans:'σ(선택): WHERE 조건절, π(프로젝션): SELECT 컬럼명, 조인: JOIN ... ON 조건', exp:'관계대수의 연산은 SQL의 기본 구문에 직접 대응됩니다.' },
  { id:17, type:'essay', cat:'B형', pts:5, q:'뷰(View)의 장단점 2가지씩과 뷰로는 곤란한 작업 1가지를 쓰시오.', ans:'장점: 보안성, 간편성 / 단점: 성능저하, 갱신제한 / 곤란작업: 인덱스 생성', exp:'뷰는 논리적 독립성을 제공하지만 물리적 저장이 없어 인덱스를 생성할 수 없습니다.' },
  { id:18, type:'essay', cat:'B형', pts:5, q:'MySQL 실습 환경 구축 시 필수 점검 항목 3가지와 확인 SQL/명령을 쓰시오.', ans:'1. 서버가동: SHOW STATUS 2. 접속확인: SELECT VERSION() 3. 권한확인: SHOW GRANTS', exp:'MySQL 설치 후 서버 상태, 접속, 권한을 반드시 확인해야 합니다.' },
  // C형: 실기 SQL (각 5점, 총 40점)
  { id:19, type:'sql', cat:'C형', pts:5, q:'CS 학과 학생의 sid, name을 sid 오름차순으로 조회하시오.', schema:'CREATE TABLE Students (\n  sid INT PRIMARY KEY,\n  name VARCHAR(50),\n  dept VARCHAR(20),\n  admit_year INT\n);', sample:"Students: (1,'Kim','CS',2023), (2,'Lee','IS',2024), (3,'Park','CS',2024)", ans:'SELECT sid, name FROM Students WHERE dept = "CS" ORDER BY sid;', exp:'WHERE로 학과를 필터링하고 ORDER BY로 정렬합니다.' },
  { id:20, type:'sql', cat:'C형', pts:5, q:'수강신청(Enroll) 기준으로 수강 중인 학과명(중복 제거)을 조회하시오.', ans:'SELECT DISTINCT s.dept FROM Students s JOIN Enroll e ON s.sid = e.sid;', exp:'DISTINCT로 중복을 제거하고 JOIN으로 두 테이블을 연결합니다.' },
  { id:21, type:'sql', cat:'C형', pts:5, q:'2024년에 입학한 학생의 이름과 "admit_year + 1" 값을 NEXT_YEAR 별칭으로 출력하시오.', ans:'SELECT name, admit_year + 1 AS NEXT_YEAR FROM Students WHERE admit_year = 2024;', exp:'산술 연산과 AS 별칭을 활용한 SELECT문입니다.' },
  { id:22, type:'sql', cat:'C형', pts:5, q:'학생 이름을 대문자로 변환해 name_up 컬럼으로 조회하시오.', ans:'SELECT UPPER(name) AS name_up FROM Students;', exp:'UPPER() 함수는 문자열을 대문자로 변환합니다.' },
  { id:23, type:'sql', cat:'C형', pts:5, q:'과목 title에서 앞의 3글자만 잘라 abbr로 조회하시오.', ans:'SELECT SUBSTRING(title, 1, 3) AS abbr FROM Courses;', exp:'SUBSTRING() 함수로 문자열의 일부를 추출합니다.' },
  { id:24, type:'sql', cat:'C형', pts:5, q:'Kim이 수강 중인 과목의 title 목록을 조회하시오.', ans:'SELECT c.title FROM Students s JOIN Enroll e ON s.sid = e.sid JOIN Courses c ON e.cid = c.cid WHERE s.name = "Kim";', exp:'3개 테이블 JOIN으로 학생-수강-과목을 연결합니다.' },
  { id:25, type:'sql', cat:'C형', pts:5, q:"Enroll.grade가 'A'면 4, 'B'면 3, 그 외 0으로 환산하여 score 컬럼으로 조회하시오.", ans:'SELECT CASE WHEN grade = "A" THEN 4 WHEN grade = "B" THEN 3 ELSE 0 END AS score FROM Enroll;', exp:'CASE WHEN 구문으로 조건별 값을 지정합니다.' },
  { id:26, type:'sql', cat:'C형', pts:5, q:'학생 테이블에 대한 SELECT 권한을 사용자 studuser에게 부여하고, 이후 해당 권한을 회수하는 SQL을 작성하시오.', ans:'GRANT SELECT ON Students TO studuser;\nREVOKE SELECT ON Students FROM studuser;', exp:'GRANT로 권한 부여, REVOKE로 권한 회수합니다.' },
];

const TIME_LIMIT = 60 * 60;
const CATS = ['A형', 'B형', 'C형'];

/* ─── 채점 ─── */
function scoreQuestion(q, userAns) {
  if (!userAns || !userAns.trim()) return 0;
  if (q.type === 'multiple') return userAns === q.ans ? q.pts : 0;
  const keywords = q.ans.replace(/[.,;:!?()]/g, ' ').split(/\s+/).filter(w => w.length >= 2);
  const input = userAns.toLowerCase();
  const matched = keywords.filter(kw => input.includes(kw.toLowerCase()));
  const ratio = matched.length / keywords.length;
  if (ratio >= 0.7) return q.pts;
  if (ratio >= 0.4) return Math.round(q.pts * 0.7);
  if (ratio >= 0.2) return Math.round(q.pts * 0.4);
  return 0;
}

/* ─── 메인 컴포넌트 ─── */
const DbExamBasic = () => {
  useAOS();
  const [phase, setPhase] = useState('intro');
  const [studentName, setStudentName] = useState('');
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [results, setResults] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('A형');
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase !== 'exam') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === 'exam' && timeLeft === 0) handleSubmit();
  }, [timeLeft, phase]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const startExam = () => { if (studentName.trim()) setPhase('exam'); };

  const saveAnswer = useCallback((val) => {
    setAnswers(prev => ({ ...prev, [cur]: val }));
  }, [cur]);

  const getAnsweredCount = () => Object.keys(answers).filter(k => answers[k] !== '' && answers[k] !== undefined).length;

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    let total = 0;
    const cats = {};
    CATS.forEach(c => { cats[c] = { s: 0, t: 0 }; });
    questions.forEach(q => { cats[q.cat].t += q.pts; });
    const details = questions.map((q, i) => {
      const sc = scoreQuestion(q, answers[i]);
      total += sc;
      cats[q.cat].s += sc;
      return { ...q, userAns: answers[i] || '', score: sc };
    });
    setResults({ total, cats, details, student: studentName, time: TIME_LIMIT - timeLeft });
    setPhase('result');
    setShowConfirm(false);
  };

  const retake = () => {
    setAnswers({}); setCur(0); setTimeLeft(TIME_LIMIT); setResults(null); setPhase('intro'); setActiveTab('A형');
  };

  /* ─── INTRO ─── */
  if (phase === 'intro') {
    return (
      <>
        <section className="page-header"><div className="container">
          <h1>DB 초급테스트</h1>
          <p>데이터베이스 종합 실력 평가 — 26문제, 100점 만점, 60분</p>
        </div></section>
        <section className="section"><div className="container">
          <div className="exam-intro" data-aos="fade-up">
            <div className="exam-info-grid">
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x2713;</span>
                <strong>A형 — 객관·단답</strong><span>10문제 · 20점</span>
              </div>
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x270D;</span>
                <strong>B형 — 서술·개념</strong><span>8문제 · 40점</span>
              </div>
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x1F4BB;</span>
                <strong>C형 — SQL 실기</strong><span>8문제 · 40점</span>
              </div>
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x23F1;</span>
                <strong>제한시간</strong><span>60분</span>
              </div>
            </div>
            <div className="exam-notice">
              <h3>시험 안내</h3>
              <ul>
                <li>A형(객관식/단답) 10문항, B형(서술) 8문항, C형(SQL) 8문항으로 구성됩니다.</li>
                <li>서술형/SQL 문제는 키워드 기반으로 채점됩니다.</li>
                <li>시험 시간은 60분이며, 시간 초과 시 자동 제출됩니다.</li>
              </ul>
            </div>
            <div className="exam-start-form">
              <input type="text" placeholder="이름을 입력하세요" value={studentName}
                onChange={e => setStudentName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && startExam()}
                className="exam-name-input" />
              <button onClick={startExam} className="exam-start-btn" disabled={!studentName.trim()}>시험 시작</button>
            </div>
          </div>
        </div></section>
      </>
    );
  }

  /* ─── EXAM ─── */
  if (phase === 'exam') {
    const q = questions[cur];
    const aQs = questions.filter(x => x.cat === 'A형');
    const bQs = questions.filter(x => x.cat === 'B형');
    const cQs = questions.filter(x => x.cat === 'C형');

    return (
      <>
        <section className="page-header exam-header-bar"><div className="container exam-top-bar">
          <span className="exam-student">{studentName}</span>
          <span className="exam-progress-text">{getAnsweredCount()} / {questions.length} 답변</span>
          <span className={`exam-timer ${timeLeft <= 300 ? 'exam-timer--warn' : ''}`}>{fmt(timeLeft)}</span>
        </div></section>
        <section className="section"><div className="container">
          <div className="exam-sidebar-layout">
            {/* 사이드바 */}
            <div className="exam-sidebar">
              {[{ label: 'A형 객관·단답 (1-10)', qs: aQs, offset: 0 },
                { label: 'B형 서술 (11-18)', qs: bQs, offset: 10 },
                { label: 'C형 SQL (19-26)', qs: cQs, offset: 18 }].map(({ label, qs, offset }) => (
                <div key={label} className="exam-nav-section">
                  <h4>{label}</h4>
                  <div className="exam-nav-buttons">
                    {qs.map((_, i) => {
                      const gi = offset + i;
                      const answered = answers[gi] !== undefined && answers[gi] !== '';
                      return (
                        <button key={gi} className={`exam-nav-btn ${gi === cur ? 'exam-nav-btn--cur' : ''} ${answered ? 'exam-nav-btn--done' : ''}`}
                          onClick={() => setCur(gi)}>{gi + 1}</button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="exam-score-tracker">
                <h4>진행 현황</h4>
                <div className="exam-live-score">{getAnsweredCount()}<span> / {questions.length}</span></div>
                <div className="exam-progress-track">
                  <div className="exam-progress-fill" style={{ width: `${(getAnsweredCount()/questions.length)*100}%` }} />
                </div>
              </div>
            </div>

            {/* 문제 영역 */}
            <div className="exam-question-area">
              <div className="exam-q-header">
                <span className="exam-q-num">문제 {cur + 1}</span>
                <span className="exam-q-meta">{q.cat} · {q.pts}점</span>
              </div>
              <p className="exam-q-text">{q.q}</p>

              {q.schema && <div className="exam-schema"><h4>스키마 정보</h4><pre>{q.schema}</pre></div>}
              {q.sample && <div className="exam-schema"><h4>샘플 데이터</h4><p>{q.sample}</p></div>}

              {q.type === 'multiple' ? (
                <div className="exam-options">
                  {q.opts.map(opt => {
                    const val = opt.charAt(0);
                    return (
                      <label key={val} className={`exam-option ${answers[cur] === val ? 'exam-option--sel' : ''}`}>
                        <input type="radio" name={`q${cur}`} checked={answers[cur] === val}
                          onChange={() => saveAnswer(val)} />
                        {opt}
                      </label>
                    );
                  })}
                </div>
              ) : (
                <textarea
                  className={`exam-textarea ${q.type === 'sql' ? 'exam-textarea--sql' : ''}`}
                  rows={q.type === 'essay' ? 8 : q.type === 'sql' ? 6 : 3}
                  placeholder={q.type === 'sql' ? 'SQL 쿼리를 입력하세요...' : '답안을 입력하세요...'}
                  value={answers[cur] || ''}
                  onChange={e => saveAnswer(e.target.value)} />
              )}

              <div className="exam-controls">
                <button className="exam-ctrl-btn" disabled={cur === 0} onClick={() => setCur(cur - 1)}>이전</button>
                {cur < questions.length - 1 ? (
                  <button className="exam-ctrl-btn exam-ctrl-btn--next" onClick={() => setCur(cur + 1)}>다음</button>
                ) : (
                  <button className="exam-ctrl-btn exam-ctrl-btn--submit" onClick={() => setShowConfirm(true)}>제출</button>
                )}
              </div>
            </div>
          </div>

          {showConfirm && (
            <div className="exam-modal-overlay" onClick={() => setShowConfirm(false)}>
              <div className="exam-modal" onClick={e => e.stopPropagation()}>
                <h3>시험 제출 확인</h3>
                <div className="exam-modal-stats">
                  <p>답변: <strong>{getAnsweredCount()}</strong> / {questions.length}</p>
                  <p>미답변: <strong style={{color:'var(--warning-color,#f59e0b)'}}>{questions.length - getAnsweredCount()}</strong>개</p>
                </div>
                <p className="exam-modal-warn">제출 후에는 답안을 수정할 수 없습니다.</p>
                <div className="exam-modal-actions">
                  <button className="exam-ctrl-btn exam-ctrl-btn--submit" onClick={handleSubmit}>제출</button>
                  <button className="exam-ctrl-btn" onClick={() => setShowConfirm(false)}>취소</button>
                </div>
              </div>
            </div>
          )}
        </div></section>
      </>
    );
  }

  /* ─── RESULT ─── */
  const { total, cats, details, student, time } = results;
  const grade = total >= 90 ? 'A' : total >= 80 ? 'B' : total >= 70 ? 'C' : total >= 60 ? 'D' : 'F';
  const gradeColor = total >= 90 ? '#22c55e' : total >= 80 ? '#3b82f6' : total >= 70 ? '#f59e0b' : '#ef4444';

  return (
    <>
      <section className="page-header"><div className="container">
        <h1>시험 결과</h1>
        <p>{student}님의 초급테스트 결과입니다</p>
      </div></section>
      <section className="section"><div className="container">
        <div className="exam-result-summary" data-aos="fade-up">
          <div className="exam-score-circle" style={{ borderColor: gradeColor }}>
            <span className="exam-score-num" style={{ color: gradeColor }}>{total}</span>
            <span className="exam-score-label">/ 100</span>
          </div>
          <div className="exam-score-info">
            <span className="exam-grade" style={{ background: gradeColor }}>{grade}등급</span>
            <span>소요시간: {fmt(time)}</span>
            <span>정답률: {Math.round(details.filter(d => d.score === d.pts).length / questions.length * 100)}%</span>
          </div>
        </div>

        <div className="exam-cat-scores" data-aos="fade-up" data-aos-delay="100">
          {Object.entries(cats).map(([cat, { s, t }]) => (
            <div key={cat} className="exam-cat-bar">
              <div className="exam-cat-label"><strong>{cat}</strong><span>{s} / {t}</span></div>
              <div className="exam-bar-track"><div className="exam-bar-fill" style={{ width: `${(s/t)*100}%`, background: gradeColor }} /></div>
            </div>
          ))}
        </div>

        <div className="exam-result-tabs" data-aos="fade-up" data-aos-delay="150">
          {CATS.map(c => (
            <button key={c} className={`exam-tab-btn ${activeTab === c ? 'exam-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(c)}>{c} ({details.filter(d => d.cat === c).length})</button>
          ))}
        </div>

        <div className="exam-detail-list">
          {details.filter(d => d.cat === activeTab).map((d) => (
            <details key={d.id} className={`exam-detail-item ${d.score === d.pts ? 'exam-detail--ok' : d.score > 0 ? 'exam-detail--partial' : 'exam-detail--wrong'}`}>
              <summary>
                <span className="exam-detail-num">Q{d.id}</span>
                <span className="exam-detail-q">{d.q.length > 60 ? d.q.slice(0,60)+'...' : d.q}</span>
                <span className="exam-detail-score">{d.score}/{d.pts}</span>
              </summary>
              <div className="exam-detail-body">
                <p><strong>내 답안:</strong></p>
                <pre className="exam-detail-ans">{d.userAns || '(미답변)'}</pre>
                <p><strong>정답:</strong></p>
                <pre className="exam-detail-ans exam-detail-correct">{d.ans}</pre>
                {d.exp && <div className="exam-explanation"><strong>해설:</strong> {d.exp}</div>}
              </div>
            </details>
          ))}
        </div>

        <div className="exam-result-actions" data-aos="fade-up">
          <button className="exam-ctrl-btn exam-ctrl-btn--next" onClick={retake}>다시 풀기</button>
          <button className="exam-ctrl-btn" onClick={() => window.print()}>인쇄</button>
        </div>
      </div></section>
    </>
  );
};

export default DbExamBasic;
