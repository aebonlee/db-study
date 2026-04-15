import{r,j as e}from"./index-DDYL5Uc_.js";import{u as V}from"./useAOS-1IAr0FVL.js";const l=[{id:1,type:"multiple",cat:"A형",pts:2,q:"다음 중 DBMS 필수 기능이 아닌 것은?",opts:["A. 정의","B. 조작","C. 제어","D. 연산"],ans:"D",exp:"DBMS의 3대 기능은 정의(DDL), 조작(DML), 제어(DCL)입니다. 연산은 별도 기능이 아닙니다.",guide:`DBMS 3대 기능:
• 정의(DDL): CREATE, ALTER, DROP
• 조작(DML): SELECT, INSERT, UPDATE, DELETE
• 제어(DCL): GRANT, REVOKE, COMMIT, ROLLBACK`},{id:2,type:"multiple",cat:"A형",pts:2,q:"3단계 스키마에 포함되지 않는 것은?",opts:["A. 외부","B. 개념","C. 내부","D. 관계"],ans:"D",exp:"스키마 3단계는 외부, 개념, 내부 스키마로 구성됩니다. 관계 스키마는 없습니다.",guide:`스키마 3단계 구조:
• 외부 스키마: 사용자 관점, 뷰
• 개념 스키마: 전체 논리적 구조
• 내부 스키마: 물리적 저장 구조
→ 논리적/물리적 독립성 보장`},{id:3,type:"multiple",cat:"A형",pts:2,q:"테이블의 행·열에 대한 용어 대응으로 옳은 것은?",opts:["A. 행=속성, 열=튜플","B. 행=튜플, 열=속성","C. 행=도메인, 열=튜플","D. 행=카디널리티, 열=디그리"],ans:"B",exp:"행(Row)=튜플(Tuple), 열(Column)=속성(Attribute)입니다.",guide:`관계형 DB 용어:
• 행(Row) = 튜플(Tuple) = 레코드
• 열(Column) = 속성(Attribute) = 필드
• 차수(Degree) = 속성(열)의 수
• 기수(Cardinality) = 튜플(행)의 수`},{id:4,type:"multiple",cat:"A형",pts:2,q:"기본키(Primary Key) 특성이 아닌 것은?",opts:["A. 유일성","B. NULL 허용","C. 최소성","D. 튜플 식별"],ans:"B",exp:"기본키는 NULL을 허용하지 않습니다 (개체 무결성).",guide:`기본키(PK) 조건:
• 유일성 — 중복 불가
• 최소성 — 최소 속성으로 구성
• NOT NULL — NULL 불가 (개체 무결성)
• 테이블당 1개만 존재`},{id:5,type:"multiple",cat:"A형",pts:2,q:"다음 중 DCL에 속하는 명령어의 올바른 짝은?",opts:["A. CREATE, ALTER","B. SELECT, UPDATE","C. GRANT, REVOKE","D. INSERT, DELETE"],ans:"C",exp:"DCL(데이터 제어어)은 GRANT(권한 부여), REVOKE(권한 회수) 등입니다.",guide:`SQL 분류:
• DDL(정의어): CREATE, ALTER, DROP
• DML(조작어): SELECT, INSERT, UPDATE, DELETE
• DCL(제어어): GRANT, REVOKE
• TCL(트랜잭션): COMMIT, ROLLBACK`},{id:6,type:"multiple",cat:"A형",pts:2,q:'트랜잭션 ACID 중 "커밋 후 결과가 영구히 보존"되는 성질은?',opts:["A. 원자성","B. 일관성","C. 고립성","D. 영속성"],ans:"D",exp:"영속성(Durability)은 커밋 후 결과가 영구적으로 보존되는 특성입니다.",guide:`ACID 특성:
• Atomicity(원자성): All or Nothing
• Consistency(일관성): 무결성 제약 유지
• Isolation(고립성): 트랜잭션 간 간섭 없음
• Durability(영속성): 커밋 후 영구 반영`},{id:7,type:"multiple",cat:"A형",pts:2,q:'관계 연산자 중 "열(속성) 부분집합만 추출하며 중복 제거"는?',opts:["A. σ(선택)","B. ▷◁(조인)","C. π(프로젝션)","D. ÷(나누기)"],ans:"C",exp:"프로젝션(π)은 릴레이션에서 원하는 속성만 추출하고 중복을 제거합니다.",guide:`관계대수 연산:
• σ(Select): 조건에 맞는 행 선택 → WHERE
• π(Project): 원하는 열 추출 → SELECT 컬럼
• ⋈(Join): 두 릴레이션 결합 → JOIN
• ÷(Division): 나누기 연산`},{id:8,type:"multiple",cat:"A형",pts:2,q:"뷰(View)의 장점으로 옳지 않은 것은?",opts:["A. 논리적 데이터 독립성","B. 자동 보안","C. 독립 인덱스 소유","D. 관리 용이"],ans:"C",exp:"뷰는 가상 테이블로 독자적인 인덱스를 소유할 수 없습니다.",guide:`뷰(View):
• 가상 테이블 — 물리적 저장공간 없음
• 장점: 보안, 편의성, 논리적 독립성
• 단점: 인덱스 불가, 갱신 제한
• ALTER 불가, DROP 후 재생성`},{id:9,type:"shortAnswer",cat:"A형",pts:2,q:"카디널리티(Cardinality)와 디그리(Degree)를 각각 정의하시오.",ans:`Cardinality: 테이블의 행(튜플)의 수
Degree: 테이블의 열(속성)의 수`,exp:"카디널리티는 행의 수, 디그리는 열의 수를 의미합니다.",guide:`차수(Degree) = 릴레이션의 속성(열) 개수
기수(Cardinality) = 릴레이션의 튜플(행) 개수

예: 5개 컬럼, 10개 행인 테이블
→ 차수=5, 기수=10`},{id:10,type:"shortAnswer",cat:"A형",pts:2,q:"외래키(FK)가 위배되기 쉬운 대표적 무결성 유형 한 가지를 쓰시오.",ans:"참조 무결성",exp:"외래키는 참조 무결성(Referential Integrity)과 밀접한 관련이 있습니다.",guide:`무결성 제약조건:
• 개체 무결성: 기본키 NOT NULL, UNIQUE
• 참조 무결성: 외래키는 참조 테이블에 존재
• 도메인 무결성: 속성값은 도메인 범위 내
→ 외래키는 "참조 무결성"과 직접 관련`},{id:11,type:"essay",cat:"B형",pts:5,q:"외부/개념/내부 스키마의 관점 차이와 예시를 설명하시오.",ans:"외부 스키마는 사용자 관점에서 필요한 데이터만 보는 뷰 형태입니다. 개념 스키마는 전체 데이터베이스의 논리적 구조를 나타내며 관리자가 설계합니다. 내부 스키마는 물리적 저장 구조를 다루며 설계자가 성능 최적화를 담당합니다.",exp:"스키마 3단계 구조는 데이터 독립성을 보장하기 위한 아키텍처입니다.",guide:`스키마 3단계:
• 외부: 사용자별 뷰 (예: 학생 성적 조회)
• 개념: 전체 논리 구조 (예: 학생·과목·수강 테이블)
• 내부: 물리 저장 (예: 인덱스, 파일 구조)
→ 각 관점의 주체와 역할을 설명`},{id:12,type:"essay",cat:"B형",pts:5,q:"논리적 독립성 vs 물리적 독립성을 비교하고, 실무 시나리오를 1개씩 제시하시오.",ans:"논리적 독립성은 스키마 변경 시 응용프로그램 수정 불필요. 물리적 독립성은 저장구조 변경 시 스키마 수정 불필요. 논리적: 테이블 구조 변경, 물리적: 인덱스 추가/변경",exp:"논리적 독립성은 외부-개념 사이, 물리적 독립성은 개념-내부 사이의 독립성입니다.",guide:`데이터 독립성:
• 논리적: 개념 스키마 변경 → 외부 스키마 영향 없음
  예: 테이블 구조 변경해도 앱 수정 불필요
• 물리적: 내부 스키마 변경 → 개념 스키마 영향 없음
  예: 인덱스 추가해도 논리 구조 변경 불필요`},{id:13,type:"essay",cat:"B형",pts:5,q:"정규화가 필요한 이유와 1NF→2NF→3NF 진행 시 제거되는 종속 형태를 요약하시오.",ans:"이상 현상 제거가 목적. 1NF: 반복 그룹 제거, 2NF: 부분 함수 종속 제거, 3NF: 이행적 함수 종속 제거",exp:"정규화는 이상 현상(삽입/삭제/갱신)을 방지하기 위한 테이블 분해 과정입니다.",guide:`정규화 단계와 제거 대상:
• 1NF: 반복 그룹 제거 (원자 값)
• 2NF: 부분 함수 종속 제거
• 3NF: 이행적 함수 종속 제거
• BCNF: 모든 결정자가 후보키
→ 목적: 이상 현상(삽입/삭제/갱신) 방지`},{id:14,type:"essay",cat:"B형",pts:5,q:"트랜잭션 회복 기법 2가지를 선택하여 REDO/UNDO 수행 여부를 정리하시오.",ans:"즉시갱신: REDO O, UNDO O / 지연갱신: REDO O, UNDO X",exp:"즉시갱신은 변경을 즉시 반영하므로 UNDO가 필요하고, 지연갱신은 커밋 시까지 반영을 미루므로 UNDO가 불필요합니다.",guide:`회복 기법:
• 즉시갱신: 변경 즉시 반영
  → REDO O, UNDO O
• 지연갱신: 커밋 시까지 반영 유보
  → REDO O, UNDO X
• 체크포인트: 로그 기반 복구 지점 설정`},{id:15,type:"essay",cat:"B형",pts:5,q:"접근통제(DAC/MAC/RBAC)의 차이와 SQL 차원의 통제 예시를 제시하시오.",ans:"DAC: 소유자 결정권한, MAC: 관리자 강제정책, RBAC: 역할기반 권한. 예시: GRANT SELECT, 보안라벨 설정, CREATE ROLE",exp:"DAC은 임의적, MAC은 강제적, RBAC은 역할 기반 접근통제 방식입니다.",guide:`접근통제 3가지:
• DAC(임의적): 소유자가 권한 부여 → GRANT/REVOKE
• MAC(강제적): 관리자가 보안등급 설정
• RBAC(역할 기반): 역할 생성 후 권한 할당
  → CREATE ROLE, GRANT role TO user`},{id:16,type:"essay",cat:"B형",pts:5,q:"관계대수 σ/π/조인을 예제로 설명하고, SQL 키워드를 대응시키시오.",ans:"σ(선택): WHERE 조건절, π(프로젝션): SELECT 컬럼명, 조인: JOIN ... ON 조건",exp:"관계대수의 연산은 SQL의 기본 구문에 직접 대응됩니다.",guide:`관계대수 → SQL 대응:
• σ(Select) → WHERE 조건절
  예: σ(dept="CS")(Students)
• π(Project) → SELECT 컬럼명
  예: π(name,dept)(Students)
• ⋈(Join) → JOIN ... ON 조건
  예: Students ⋈ Enroll`},{id:17,type:"essay",cat:"B형",pts:5,q:"뷰(View)의 장단점 2가지씩과 뷰로는 곤란한 작업 1가지를 쓰시오.",ans:"장점: 보안성, 간편성 / 단점: 성능저하, 갱신제한 / 곤란작업: 인덱스 생성",exp:"뷰는 논리적 독립성을 제공하지만 물리적 저장이 없어 인덱스를 생성할 수 없습니다.",guide:`뷰(View):
장점: ① 보안성(필요 데이터만 노출)
      ② 간편성(복잡한 쿼리 단순화)
단점: ① 성능 저하(매번 재실행)
      ② 갱신 제한(집계, 조인 뷰)
곤란: 인덱스 생성 불가 (물리적 저장 없음)`},{id:18,type:"essay",cat:"B형",pts:5,q:"MySQL 실습 환경 구축 시 필수 점검 항목 3가지와 확인 SQL/명령을 쓰시오.",ans:"1. 서버가동: SHOW STATUS 2. 접속확인: SELECT VERSION() 3. 권한확인: SHOW GRANTS",exp:"MySQL 설치 후 서버 상태, 접속, 권한을 반드시 확인해야 합니다.",guide:`MySQL 환경 점검:
① 서버 가동 확인: SHOW STATUS
② 접속 확인: SELECT VERSION()
③ 권한 확인: SHOW GRANTS
④ DB 목록: SHOW DATABASES
⑤ 문자셋: SHOW VARIABLES LIKE "char%"`},{id:19,type:"sql",cat:"C형",pts:5,q:"CS 학과 학생의 sid, name을 sid 오름차순으로 조회하시오.",schema:`CREATE TABLE Students (
  sid INT PRIMARY KEY,
  name VARCHAR(50),
  dept VARCHAR(20),
  admit_year INT
);`,sample:"Students: (1,'Kim','CS',2023), (2,'Lee','IS',2024), (3,'Park','CS',2024)",ans:'SELECT sid, name FROM Students WHERE dept = "CS" ORDER BY sid;',exp:"WHERE로 학과를 필터링하고 ORDER BY로 정렬합니다.",guide:`SELECT 기본 구문:
SELECT 컬럼 FROM 테이블
WHERE 조건
ORDER BY 컬럼 [ASC|DESC];
→ 조건 필터링 + 정렬 조합`},{id:20,type:"sql",cat:"C형",pts:5,q:"수강신청(Enroll) 기준으로 수강 중인 학과명(중복 제거)을 조회하시오.",ans:"SELECT DISTINCT s.dept FROM Students s JOIN Enroll e ON s.sid = e.sid;",exp:"DISTINCT로 중복을 제거하고 JOIN으로 두 테이블을 연결합니다.",guide:`DISTINCT + JOIN:
DISTINCT: 중복 행 제거
JOIN: 두 테이블을 공통 키로 연결
→ SELECT DISTINCT 컬럼 FROM A JOIN B ON 조건`},{id:21,type:"sql",cat:"C형",pts:5,q:'2024년에 입학한 학생의 이름과 "admit_year + 1" 값을 NEXT_YEAR 별칭으로 출력하시오.',ans:"SELECT name, admit_year + 1 AS NEXT_YEAR FROM Students WHERE admit_year = 2024;",exp:"산술 연산과 AS 별칭을 활용한 SELECT문입니다.",guide:`산술 연산 + 별칭:
SELECT 컬럼, 연산식 AS 별칭
FROM 테이블 WHERE 조건;
→ AS 키워드로 결과 컬럼에 이름 부여`},{id:22,type:"sql",cat:"C형",pts:5,q:"학생 이름을 대문자로 변환해 name_up 컬럼으로 조회하시오.",ans:"SELECT UPPER(name) AS name_up FROM Students;",exp:"UPPER() 함수는 문자열을 대문자로 변환합니다.",guide:`문자열 함수:
• UPPER(): 대문자 변환
• LOWER(): 소문자 변환
• LENGTH(): 문자열 길이
• SUBSTRING(): 부분 문자열 추출
• CONCAT(): 문자열 연결`},{id:23,type:"sql",cat:"C형",pts:5,q:"과목 title에서 앞의 3글자만 잘라 abbr로 조회하시오.",ans:"SELECT SUBSTRING(title, 1, 3) AS abbr FROM Courses;",exp:"SUBSTRING() 함수로 문자열의 일부를 추출합니다.",guide:`SUBSTRING 함수:
SUBSTRING(문자열, 시작위치, 길이)
→ 시작위치부터 길이만큼 추출
예: SUBSTRING("Database", 1, 4) → "Data"`},{id:24,type:"sql",cat:"C형",pts:5,q:"Kim이 수강 중인 과목의 title 목록을 조회하시오.",ans:'SELECT c.title FROM Students s JOIN Enroll e ON s.sid = e.sid JOIN Courses c ON e.cid = c.cid WHERE s.name = "Kim";',exp:"3개 테이블 JOIN으로 학생-수강-과목을 연결합니다.",guide:`다중 테이블 JOIN:
Students → Enroll → Courses
3개 테이블을 공통 키로 순차 연결
JOIN A ON 조건 JOIN B ON 조건
→ WHERE로 최종 필터링`},{id:25,type:"sql",cat:"C형",pts:5,q:"Enroll.grade가 'A'면 4, 'B'면 3, 그 외 0으로 환산하여 score 컬럼으로 조회하시오.",ans:'SELECT CASE WHEN grade = "A" THEN 4 WHEN grade = "B" THEN 3 ELSE 0 END AS score FROM Enroll;',exp:"CASE WHEN 구문으로 조건별 값을 지정합니다.",guide:`CASE WHEN 조건 분기:
CASE
  WHEN 조건1 THEN 값1
  WHEN 조건2 THEN 값2
  ELSE 기본값
END AS 별칭
→ 조건에 따라 다른 값 반환`},{id:26,type:"sql",cat:"C형",pts:5,q:"학생 테이블에 대한 SELECT 권한을 사용자 studuser에게 부여하고, 이후 해당 권한을 회수하는 SQL을 작성하시오.",ans:`GRANT SELECT ON Students TO studuser;
REVOKE SELECT ON Students FROM studuser;`,exp:"GRANT로 권한 부여, REVOKE로 권한 회수합니다.",guide:`DCL 명령어:
• GRANT 권한 ON 객체 TO 사용자;
  → 권한 부여
• REVOKE 권한 ON 객체 FROM 사용자;
  → 권한 회수
→ 두 명령어를 함께 작성`}],O=3600,H=["A형","B형","C형"];function J(t,m){if(m==null||m==="")return 0;const o=String(m);if(!o.trim())return 0;if(t.type==="multiple")return m===t.ans?t.pts:0;const n=String(t.ans).replace(/[.,;:!?()]/g," ").split(/\s+/).filter(x=>x.length>=2),u=o.toLowerCase(),E=n.filter(x=>u.includes(x.toLowerCase())).length/n.length;return E>=.7?t.pts:E>=.4?Math.round(t.pts*.7):E>=.2?Math.round(t.pts*.4):0}const Y=()=>{V();const[t,m]=r.useState("intro"),[o,L]=r.useState(""),[n,u]=r.useState(0),[d,E]=r.useState({}),[x,D]=r.useState(O),[w,y]=r.useState(null),[U,R]=r.useState(!1),[b,f]=r.useState("A형"),N=r.useRef(null);r.useEffect(()=>{if(t==="exam")return N.current=setInterval(()=>{D(s=>s<=1?(N.current!==null&&clearInterval(N.current),0):s-1)},1e3),()=>{N.current!==null&&clearInterval(N.current)}},[t]),r.useEffect(()=>{t==="exam"&&x===0&&q()},[x,t]);const v=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`,I=()=>{o.trim()&&m("exam")},B=r.useCallback(s=>{E(c=>({...c,[n]:s}))},[n]),A=()=>Object.keys(d).filter(s=>d[Number(s)]!==""&&d[Number(s)]!==void 0).length,q=()=>{N.current!==null&&clearInterval(N.current);let s=0;const c={};H.forEach(i=>{c[i]={s:0,t:0}}),l.forEach(i=>{c[i.cat].t+=i.pts});const j=l.map((i,a)=>{const h=J(i,d[a]);return s+=h,c[i.cat].s+=h,{...i,userAns:d[a]||"",score:h}});y({total:s,cats:c,details:j,student:o,time:O-x}),m("result"),R(!1)},F=()=>{E({}),u(0),D(O),y(null),m("intro"),f("A형")};if(t==="intro")return e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"DB 초급테스트"}),e.jsx("p",{children:"데이터베이스 종합 실력 평가 — 26문제, 100점 만점, 60분"})]})}),e.jsx("section",{className:"section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"exam-intro","data-aos":"fade-up",children:[e.jsxs("div",{className:"exam-info-grid",children:[e.jsxs("div",{className:"exam-info-card",children:[e.jsx("span",{className:"exam-info-icon",children:"✓"}),e.jsx("strong",{children:"A형 — 객관·단답"}),e.jsx("span",{children:"10문제 · 20점"})]}),e.jsxs("div",{className:"exam-info-card",children:[e.jsx("span",{className:"exam-info-icon",children:"✍"}),e.jsx("strong",{children:"B형 — 서술·개념"}),e.jsx("span",{children:"8문제 · 40점"})]}),e.jsxs("div",{className:"exam-info-card",children:[e.jsx("span",{className:"exam-info-icon",children:"💻"}),e.jsx("strong",{children:"C형 — SQL 실기"}),e.jsx("span",{children:"8문제 · 40점"})]}),e.jsxs("div",{className:"exam-info-card",children:[e.jsx("span",{className:"exam-info-icon",children:"⏱"}),e.jsx("strong",{children:"제한시간"}),e.jsx("span",{children:"60분"})]})]}),e.jsxs("div",{className:"exam-notice",children:[e.jsx("h3",{children:"시험 안내"}),e.jsxs("ul",{children:[e.jsx("li",{children:"A형(객관식/단답) 10문항, B형(서술) 8문항, C형(SQL) 8문항으로 구성됩니다."}),e.jsx("li",{children:"서술형/SQL 문제는 키워드 기반으로 채점됩니다."}),e.jsx("li",{children:"시험 시간은 60분이며, 시간 초과 시 자동 제출됩니다."}),e.jsx("li",{children:"문제를 풀면서 학습 가이드를 참고할 수 있습니다."})]})]}),e.jsxs("div",{className:"exam-start-form",children:[e.jsx("input",{type:"text",placeholder:"이름을 입력하세요",value:o,onChange:s=>L(s.target.value),onKeyDown:s=>s.key==="Enter"&&I(),className:"exam-name-input"}),e.jsx("button",{onClick:I,className:"exam-start-btn",disabled:!o.trim(),children:"시험 시작"})]})]})})})]});if(t==="exam"){const s=l[n],c=l.filter(a=>a.cat==="A형"),j=l.filter(a=>a.cat==="B형"),i=l.filter(a=>a.cat==="C형");return e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header exam-header-bar",children:e.jsxs("div",{className:"container exam-top-bar",children:[e.jsx("span",{className:"exam-student",children:o}),e.jsxs("span",{className:"exam-progress-text",children:[A()," / ",l.length," 답변"]}),e.jsx("span",{className:`exam-timer ${x<=300?"exam-timer--warn":""}`,children:v(x)})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"exam-sidebar-layout",children:[e.jsxs("div",{className:"exam-sidebar",children:[[{label:"A형 객관·단답 (1-10)",qs:c,offset:0},{label:"B형 서술 (11-18)",qs:j,offset:10},{label:"C형 SQL (19-26)",qs:i,offset:18}].map(({label:a,qs:h,offset:S})=>e.jsxs("div",{className:"exam-nav-section",children:[e.jsx("h4",{children:a}),e.jsx("div",{className:"exam-nav-buttons",children:h.map((M,G)=>{const C=S+G,K=d[C]!==void 0&&d[C]!=="";return e.jsx("button",{className:`exam-nav-btn ${C===n?"exam-nav-btn--cur":""} ${K?"exam-nav-btn--done":""}`,onClick:()=>u(C),children:C+1},C)})})]},a)),e.jsxs("div",{className:"exam-score-tracker",children:[e.jsx("h4",{children:"진행 현황"}),e.jsxs("div",{className:"exam-live-score",children:[A(),e.jsxs("span",{children:[" / ",l.length]})]}),e.jsx("div",{className:"exam-progress-track",children:e.jsx("div",{className:"exam-progress-fill",style:{width:`${A()/l.length*100}%`}})})]})]}),e.jsxs("div",{className:"exam-question-area",children:[e.jsxs("div",{className:"exam-q-header",children:[e.jsxs("span",{className:"exam-q-num",children:["문제 ",n+1]}),e.jsxs("span",{className:"exam-q-meta",children:[s.cat," · ",s.pts,"점"]})]}),e.jsx("p",{className:"exam-q-text",children:s.q}),s.schema&&e.jsxs("div",{className:"exam-schema",children:[e.jsx("h4",{children:"스키마 정보"}),e.jsx("pre",{children:s.schema})]}),s.sample&&e.jsxs("div",{className:"exam-schema",children:[e.jsx("h4",{children:"샘플 데이터"}),e.jsx("p",{children:s.sample})]}),s.type==="multiple"?e.jsx("div",{className:"exam-options",children:s.opts.map((a,h)=>{const S=a.charAt(0),M=a.substring(3);return e.jsxs("label",{className:`exam-option ${d[n]===S?"exam-option--sel":""}`,children:[e.jsx("input",{type:"radio",name:`q${n}`,checked:d[n]===S,onChange:()=>B(S)}),e.jsx("span",{className:"exam-option-num",children:"①②③④"[h]}),M]},S)})}):e.jsx("textarea",{className:`exam-textarea ${s.type==="sql"?"exam-textarea--sql":""}`,rows:s.type==="essay"?8:s.type==="sql"?6:3,placeholder:s.type==="sql"?"SQL 쿼리를 입력하세요...":"답안을 입력하세요...",value:d[n]||"",onChange:a=>B(a.target.value)}),e.jsxs("div",{className:"exam-controls",children:[e.jsx("button",{className:"exam-ctrl-btn",disabled:n===0,onClick:()=>u(n-1),children:"이전"}),n<l.length-1?e.jsx("button",{className:"exam-ctrl-btn exam-ctrl-btn--next",onClick:()=>u(n+1),children:"다음"}):e.jsx("button",{className:"exam-ctrl-btn exam-ctrl-btn--submit",onClick:()=>R(!0),children:"제출"})]})]}),e.jsx("div",{className:"exam-guide-area",children:e.jsxs("div",{className:"exam-guide-panel",children:[e.jsx("h4",{children:"📖 학습 가이드"}),s.guide?e.jsx("div",{className:"exam-guide-content",children:e.jsx("pre",{children:s.guide})}):e.jsx("p",{className:"exam-guide-empty",children:"이 문제에 대한 가이드가 없습니다."})]})})]}),U&&e.jsx("div",{className:"exam-modal-overlay",onClick:()=>R(!1),children:e.jsxs("div",{className:"exam-modal",onClick:a=>a.stopPropagation(),children:[e.jsx("h3",{children:"시험 제출 확인"}),e.jsxs("div",{className:"exam-modal-stats",children:[e.jsxs("p",{children:["답변: ",e.jsx("strong",{children:A()})," / ",l.length]}),e.jsxs("p",{children:["미답변: ",e.jsx("strong",{style:{color:"var(--warning-color,#f59e0b)"},children:l.length-A()}),"개"]})]}),e.jsx("p",{className:"exam-modal-warn",children:"제출 후에는 답안을 수정할 수 없습니다."}),e.jsxs("div",{className:"exam-modal-actions",children:[e.jsx("button",{className:"exam-ctrl-btn exam-ctrl-btn--submit",onClick:q,children:"제출"}),e.jsx("button",{className:"exam-ctrl-btn",onClick:()=>R(!1),children:"취소"})]})]})})]})})]})}const{total:p,cats:k,details:g,student:W,time:Q}=w,P=p>=90?"A":p>=80?"B":p>=70?"C":p>=60?"D":"F",T=p>=90?"#22c55e":p>=80?"#3b82f6":p>=70?"#f59e0b":"#ef4444";return e.jsxs(e.Fragment,{children:[e.jsx("section",{className:"page-header",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{children:"시험 결과"}),e.jsxs("p",{children:[W,"님의 초급테스트 결과입니다"]})]})}),e.jsx("section",{className:"section",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"exam-result-summary","data-aos":"fade-up",children:[e.jsxs("div",{className:"exam-score-circle",style:{borderColor:T},children:[e.jsx("span",{className:"exam-score-num",style:{color:T},children:p}),e.jsx("span",{className:"exam-score-label",children:"/ 100"})]}),e.jsxs("div",{className:"exam-score-info",children:[e.jsxs("span",{className:"exam-grade",style:{background:T},children:[P,"등급"]}),e.jsxs("span",{children:["소요시간: ",v(Q)]}),e.jsxs("span",{children:["정답률: ",Math.round(g.filter(s=>s.score===s.pts).length/l.length*100),"%"]})]})]}),e.jsx("div",{className:"exam-cat-scores","data-aos":"fade-up","data-aos-delay":"100",children:Object.entries(k).map(([s,c])=>{const{s:j,t:i}=c;return e.jsxs("div",{className:"exam-cat-bar",children:[e.jsxs("div",{className:"exam-cat-label",children:[e.jsx("strong",{children:s}),e.jsxs("span",{children:[j," / ",i]})]}),e.jsx("div",{className:"exam-bar-track",children:e.jsx("div",{className:"exam-bar-fill",style:{width:`${j/i*100}%`,background:T}})})]},s)})}),e.jsx("div",{className:"exam-result-tabs","data-aos":"fade-up","data-aos-delay":"150",children:H.map(s=>e.jsxs("button",{className:`exam-tab-btn ${b===s?"exam-tab-btn--active":""}`,onClick:()=>f(s),children:[s," (",g.filter(c=>c.cat===s).length,")"]},s))}),e.jsx("div",{className:"exam-detail-list",children:g.filter(s=>s.cat===b).map(s=>e.jsxs("details",{className:`exam-detail-item ${s.score===s.pts?"exam-detail--ok":s.score>0?"exam-detail--partial":"exam-detail--wrong"}`,children:[e.jsxs("summary",{children:[e.jsxs("span",{className:"exam-detail-num",children:["Q",s.id]}),e.jsx("span",{className:"exam-detail-q",children:s.q.length>60?s.q.slice(0,60)+"...":s.q}),e.jsxs("span",{className:"exam-detail-score",children:[s.score,"/",s.pts]})]}),e.jsxs("div",{className:"exam-detail-body",children:[e.jsx("p",{children:e.jsx("strong",{children:"내 답안:"})}),e.jsx("pre",{className:"exam-detail-ans",children:s.userAns||"(미답변)"}),e.jsx("p",{children:e.jsx("strong",{children:"정답:"})}),e.jsx("pre",{className:"exam-detail-ans exam-detail-correct",children:s.ans}),s.exp&&e.jsxs("div",{className:"exam-explanation",children:[e.jsx("strong",{children:"해설:"})," ",s.exp]})]})]},s.id))}),e.jsxs("div",{className:"exam-result-actions","data-aos":"fade-up",children:[e.jsx("button",{className:"exam-ctrl-btn exam-ctrl-btn--next",onClick:F,children:"다시 풀기"}),e.jsx("button",{className:"exam-ctrl-btn",onClick:()=>window.print(),children:"인쇄"})]})]})})]})};export{Y as default};
