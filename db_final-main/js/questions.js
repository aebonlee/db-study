// 데이터베이스 문제 데이터베이스
const questions = [
    // 객관식 문제 (1-30)
    {
        id: 1,
        type: 'multiple',
        question: '데이터베이스를 사용하는 경우의 장점이 아닌 것은?',
        options: ['데이터 중복의 최소화', '데이터의 공유', '데이터 무결성 유지', '전산화 비용 증가'],
        answer: 3,
        explanation: '데이터베이스 도입 시 장점은 중복 최소화, 공유, 일관성·무결성 유지, 독립성 확보 등이고, 전산화 비용 증가는 오히려 단점에 해당합니다.',
        guide: {
            title: '데이터베이스의 장점',
            content: `
                <h4>📊 데이터베이스 시스템의 주요 장점</h4>
                <p>데이터베이스 시스템은 기존의 파일 시스템의 한계를 극복하기 위해 개발되었습니다.</p>
                
                <h5>🔹 주요 장점들</h5>
                <ul>
                    <li><strong>데이터 중복 최소화</strong> - 동일한 데이터의 반복 저장 방지</li>
                    <li><strong>데이터 공유</strong> - 여러 사용자가 동시에 데이터 접근</li>
                    <li><strong>데이터 무결성 유지</strong> - 데이터의 정확성과 일관성 보장</li>
                    <li><strong>데이터 독립성</strong> - 응용프로그램과 데이터 구조의 분리</li>
                    <li><strong>데이터 보안</strong> - 접근 권한 제어 및 보안 강화</li>
                </ul>
                
                <h5>⚠️ 단점들</h5>
                <ul>
                    <li>초기 도입 비용이 높음</li>
                    <li>복잡한 시스템 관리</li>
                    <li>전문 인력 필요</li>
                </ul>
            `
        }
    },
    {
        id: 2,
        type: 'multiple',
        question: 'DBMS의 필수 기능이 아닌 것은?',
        options: ['정의 기능', '조작 기능', '제어 기능', '계산 기능'],
        answer: 3,
        explanation: 'DBMS는 데이터를 구조적으로 정의(DDL), 조작(DML), 제어(DCL) 하는 기능이 핵심입니다. 계산 기능은 응용 프로그램 차원의 역할입니다.',
        guide: {
            title: 'DBMS의 3대 기능',
            content: `
                <h4>⚙️ DBMS의 핵심 기능들</h4>
                <p>데이터베이스 관리 시스템(DBMS)은 다음 3가지 핵심 기능을 제공합니다.</p>
                
                <h5>🔹 정의 기능 (Definition)</h5>
                <ul>
                    <li>DDL(Data Definition Language) 사용</li>
                    <li>데이터베이스 구조 정의</li>
                    <li>스키마, 테이블, 인덱스 생성</li>
                </ul>
                
                <h5>🔹 조작 기능 (Manipulation)</h5>
                <ul>
                    <li>DML(Data Manipulation Language) 사용</li>
                    <li>데이터 삽입, 수정, 삭제, 검색</li>
                    <li>SELECT, INSERT, UPDATE, DELETE</li>
                </ul>
                
                <h5>🔹 제어 기능 (Control)</h5>
                <ul>
                    <li>DCL(Data Control Language) 사용</li>
                    <li>데이터 무결성, 보안, 회복, 동시성 제어</li>
                    <li>GRANT, REVOKE, COMMIT, ROLLBACK</li>
                </ul>
            `
        }
    },
    {
        id: 3,
        type: 'multiple',
        question: '스키마 3단계 구조가 아닌 것은?',
        options: ['외부 스키마', '개념 스키마', '내부 스키마', '구조 스키마'],
        answer: 3,
        explanation: '스키마는 외부(사용자 관점), 개념(전체 논리), 내부(물리) 스키마의 3단계 구조로 나뉩니다. 구조 스키마라는 용어는 쓰지 않습니다.',
        guide: {
            title: '스키마 3단계 구조',
            content: `
                <h4>📐 데이터베이스 스키마의 3단계 구조</h4>
                <p>데이터베이스 시스템은 데이터 독립성을 위해 3단계 스키마 구조를 채택합니다.</p>
                
                <h5>🔹 외부 스키마 (External Schema)</h5>
                <ul>
                    <li>사용자 관점에서 본 데이터베이스 구조</li>
                    <li>개별 사용자가 필요한 부분만 정의</li>
                    <li>뷰(View)를 통해 구현</li>
                </ul>
                
                <h5>🔹 개념 스키마 (Conceptual Schema)</h5>
                <ul>
                    <li>전체 데이터베이스의 논리적 구조</li>
                    <li>기관 전체의 데이터 관점</li>
                    <li>개체, 속성, 관계 정의</li>
                </ul>
                
                <h5>🔹 내부 스키마 (Internal Schema)</h5>
                <ul>
                    <li>물리적 저장 구조</li>
                    <li>파일 구조, 인덱스, 접근 경로</li>
                    <li>실제 저장 방법 정의</li>
                </ul>
                
                <h5>✨ 데이터 독립성</h5>
                <p>논리적 독립성: 개념 스키마 변경이 외부 스키마에 영향 없음</p>
                <p>물리적 독립성: 내부 스키마 변경이 개념 스키마에 영향 없음</p>
            `
        }
    },
    {
        id: 4,
        type: 'multiple',
        question: '릴레이션의 속성 값이 취할 수 있는 값들의 집합은?',
        options: ['튜플', '필드', '도메인', '차수'],
        answer: 2,
        explanation: '도메인(Domain)은 한 속성이 가질 수 있는 값들의 범위(집합)를 의미합니다. 예: 성별 속성의 도메인은 {남, 여}.',
        guide: {
            title: '관계형 데이터베이스 용어',
            content: `
                <h4>📚 관계형 데이터베이스 기본 용어</h4>
                
                <h5>🔹 도메인 (Domain)</h5>
                <ul>
                    <li>속성이 가질 수 있는 값들의 집합</li>
                    <li>예: 성별 도메인 = {남, 여}</li>
                    <li>예: 성적 도메인 = {A, B, C, D, F}</li>
                </ul>
                
                <h5>🔹 튜플 (Tuple)</h5>
                <ul>
                    <li>릴레이션의 행(Row)</li>
                    <li>하나의 레코드를 의미</li>
                </ul>
                
                <h5>🔹 속성 (Attribute)</h5>
                <ul>
                    <li>릴레이션의 열(Column)</li>
                    <li>필드(Field)와 같은 의미</li>
                </ul>
                
                <h5>🔹 차수 (Degree)</h5>
                <ul>
                    <li>릴레이션의 속성 개수</li>
                </ul>
                
                <h5>🔹 기수 (Cardinality)</h5>
                <ul>
                    <li>릴레이션의 튜플 개수</li>
                </ul>
            `
        }
    },
    {
        id: 5,
        type: 'multiple',
        question: '기본키의 특징으로 옳지 않은 것은?',
        options: ['중복될 수 없다', 'NULL을 허용하지 않는다', '유일성과 최소성을 가진다', '여러 개 정의할 수 있다'],
        answer: 3,
        explanation: '한 테이블에는 기본키는 1개만 존재합니다. 중복 불가, NULL 불가, 유일성·최소성을 만족해야 한다는 점은 모두 맞습니다.',
        guide: {
            title: '기본키(Primary Key)',
            content: `
                <h4>🔑 기본키의 특징과 조건</h4>
                
                <h5>🔹 기본키의 필수 조건</h5>
                <ul>
                    <li><strong>유일성(Uniqueness)</strong> - 중복 값 불가</li>
                    <li><strong>최소성(Minimality)</strong> - 최소한의 속성으로 구성</li>
                    <li><strong>개체 무결성</strong> - NULL 값 불가</li>
                    <li><strong>불변성</strong> - 값이 자주 변경되지 않음</li>
                </ul>
                
                <h5>🔹 기본키 제약사항</h5>
                <ul>
                    <li>한 테이블에 최대 1개만 존재</li>
                    <li>복합키 가능 (여러 속성 조합)</li>
                    <li>자동으로 인덱스 생성</li>
                </ul>
                
                <h5>🔹 관련 키 개념들</h5>
                <ul>
                    <li><strong>후보키</strong> - 기본키가 될 수 있는 모든 키</li>
                    <li><strong>대체키</strong> - 기본키로 선택되지 않은 후보키</li>
                    <li><strong>외래키</strong> - 다른 테이블의 기본키를 참조</li>
                </ul>
            `
        }
    },
    {
        id: 6,
        type: 'multiple',
        question: '후보키 중에서 기본키로 선택되지 않은 키를 무엇이라 하는가?',
        options: ['슈퍼키', '대체키', '외래키', '부분키'],
        answer: 1,
        explanation: '후보키들 중 하나가 기본키로 선정되고, 나머지 후보키들을 대체키(Alternate Key) 라고 부릅니다.',
        guide: {
            title: '키의 종류와 관계',
            content: `
                <h4>🗝️ 데이터베이스 키의 계층구조</h4>
                
                <h5>🔹 슈퍼키 (Super Key)</h5>
                <ul>
                    <li>튜플을 유일하게 식별할 수 있는 속성들의 집합</li>
                    <li>가장 넓은 범위의 키</li>
                </ul>
                
                <h5>🔹 후보키 (Candidate Key)</h5>
                <ul>
                    <li>최소성을 만족하는 슈퍼키</li>
                    <li>기본키가 될 수 있는 모든 키</li>
                </ul>
                
                <h5>🔹 기본키 (Primary Key)</h5>
                <ul>
                    <li>후보키 중에서 선택된 대표 키</li>
                    <li>테이블당 1개만 존재</li>
                </ul>
                
                <h5>🔹 대체키 (Alternate Key)</h5>
                <ul>
                    <li>기본키로 선택되지 않은 나머지 후보키들</li>
                    <li>유일성 제약조건 설정 가능</li>
                </ul>
                
                <h5>🔹 외래키 (Foreign Key)</h5>
                <ul>
                    <li>다른 테이블의 기본키를 참조하는 키</li>
                    <li>참조 무결성 제약조건</li>
                </ul>
            `
        }
    },
    {
        id: 7,
        type: 'multiple',
        question: '외래키(FK)에 대한 설명으로 옳은 것은?',
        options: ['NULL을 절대 가질 수 없다', '다른 테이블의 기본키를 참조한다', '유일성만 만족하면 된다', '기본키가 아닌 속성을 의미한다'],
        answer: 1,
        explanation: '외래키는 다른 릴레이션의 기본키를 참조하는 속성입니다. 경우에 따라 NULL을 가질 수 있으며, 유일성은 필수 조건이 아닙니다(중복 허용 가능).',
        guide: {
            title: '외래키(Foreign Key)',
            content: `
                <h4>🔗 외래키의 특징과 제약조건</h4>
                
                <h5>🔹 외래키의 정의</h5>
                <ul>
                    <li>다른 릴레이션의 기본키를 참조하는 속성</li>
                    <li>테이블 간 관계를 연결하는 역할</li>
                    <li>참조하는 테이블을 자식(Child), 참조되는 테이블을 부모(Parent)</li>
                </ul>
                
                <h5>🔹 외래키 제약조건</h5>
                <ul>
                    <li><strong>참조 무결성</strong> - 참조하는 값은 반드시 존재해야 함</li>
                    <li>NULL 값 허용 가능 (선택적 관계)</li>
                    <li>중복 값 허용 가능</li>
                    <li>자기 자신 참조 가능</li>
                </ul>
                
                <h5>🔹 참조 무결성 규칙</h5>
                <ul>
                    <li><strong>제한 (RESTRICT)</strong> - 참조되는 튜플 삭제/수정 금지</li>
                    <li><strong>연쇄 (CASCADE)</strong> - 참조되는 튜플과 함께 삭제/수정</li>
                    <li><strong>널값 설정 (SET NULL)</strong> - 외래키를 NULL로 설정</li>
                </ul>
            `
        }
    },
    {
        id: 8,
        type: 'multiple',
        question: '데이터 독립성 중 논리적 독립성의 의미는?',
        options: ['내부 구조 변경 시 응용프로그램 영향 없음', '논리 구조 변경 시 응용프로그램 영향 없음', '저장 장치 변경 가능', '뷰 변경 가능'],
        answer: 1,
        explanation: '논리적 독립성은 개념 스키마(논리 구조) 변경이 있어도 응용프로그램(외부 스키마)에 영향을 주지 않는 것을 말합니다.',
        guide: {
            title: '데이터 독립성',
            content: `
                <h4>🔄 데이터 독립성의 종류</h4>
                
                <h5>🔹 논리적 독립성 (Logical Independence)</h5>
                <ul>
                    <li>개념 스키마 변경이 외부 스키마에 영향 없음</li>
                    <li>테이블 구조 변경이 응용프로그램에 영향 없음</li>
                    <li>뷰(View)를 통해 구현</li>
                    <li>예: 테이블에 새 컬럼 추가</li>
                </ul>
                
                <h5>🔹 물리적 독립성 (Physical Independence)</h5>
                <ul>
                    <li>내부 스키마 변경이 개념 스키마에 영향 없음</li>
                    <li>저장 구조 변경이 논리 구조에 영향 없음</li>
                    <li>예: 인덱스 추가, 파일 구조 변경</li>
                </ul>
                
                <h5>🔹 데이터 독립성의 장점</h5>
                <ul>
                    <li>유지보수 비용 절감</li>
                    <li>데이터베이스 구조 변경의 유연성</li>
                    <li>응용프로그램 재작성 불필요</li>
                </ul>
            `
        }
    },
    {
        id: 9,
        type: 'multiple',
        question: '정규화의 목적이 아닌 것은?',
        options: ['이상 현상 제거', '데이터 중복 최소화', '저장공간 증가', '데이터 일관성 유지'],
        answer: 2,
        explanation: '정규화는 중복 감소, 이상(삽입·삭제·갱신) 현상 제거, 일관성과 무결성 향상이 목적입니다. 저장공간은 보통 줄어들지 늘어나지 않습니다.',
        guide: {
            title: '정규화(Normalization)',
            content: `
                <h4>🎯 정규화의 목적과 과정</h4>
                
                <h5>🔹 정규화의 주요 목적</h5>
                <ul>
                    <li><strong>이상 현상 제거</strong> - 삽입, 삭제, 갱신 이상 방지</li>
                    <li><strong>데이터 중복 최소화</strong> - 저장공간 효율성</li>
                    <li><strong>데이터 일관성 유지</strong> - 무결성 향상</li>
                    <li><strong>테이블 구조 개선</strong> - 논리적 설계 최적화</li>
                </ul>
                
                <h5>🔹 이상 현상의 종류</h5>
                <ul>
                    <li><strong>삽입 이상</strong> - 불필요한 데이터를 함께 입력</li>
                    <li><strong>삭제 이상</strong> - 필요한 데이터까지 함께 삭제</li>
                    <li><strong>갱신 이상</strong> - 데이터 불일치 발생</li>
                </ul>
                
                <h5>🔹 정규화 과정</h5>
                <p>1NF → 2NF → 3NF → BCNF → 4NF → 5NF</p>
                <p>보통 3NF까지 정규화하면 충분</p>
            `
        }
    },
    {
        id: 10,
        type: 'multiple',
        question: '제1정규형의 조건은?',
        options: ['기본키가 완전 함수 종속', '원자 값이어야 함', '이행 종속 제거', '모든 결정자가 후보키'],
        answer: 1,
        explanation: '제1정규형(1NF)은 모든 속성이 원자 값(더 이상 분해되지 않는 값) 을 가져야 합니다. 복합값·반복 속성을 허용하지 않습니다.',
        guide: {
            title: '제1정규형(1NF)',
            content: `
                <h4>📝 제1정규형의 조건과 예시</h4>
                
                <h5>🔹 1NF 조건</h5>
                <ul>
                    <li>모든 속성은 <strong>원자 값</strong>만 가져야 함</li>
                    <li>반복 그룹(다중 값) 제거</li>
                    <li>복합 속성 분해</li>
                </ul>
                
                <h5>⚠️ 1NF 위반 예시</h5>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>학번</th><th>이름</th><th>과목</th></tr>
                    <tr><td>1001</td><td>김철수</td><td>수학, 영어, 과학</td></tr>
                </table>
                
                <h5>✅ 1NF 만족 예시</h5>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>학번</th><th>이름</th><th>과목</th></tr>
                    <tr><td>1001</td><td>김철수</td><td>수학</td></tr>
                    <tr><td>1001</td><td>김철수</td><td>영어</td></tr>
                    <tr><td>1001</td><td>김철수</td><td>과학</td></tr>
                </table>
            `
        }
    },
    {
        id: 11,
        type: 'multiple',
        question: '제2정규형의 조건은?',
        options: ['원자성', '부분 함수 종속 제거', '다치 종속 제거', '이행 종속 제거'],
        answer: 1,
        explanation: '제2정규형(2NF)은 1NF를 만족하면서 기본키가 복합키일 때, 기본키의 일부에만 종속되는 속성(부분 함수 종속)을 제거한 상태입니다.',
        guide: {
            title: '제2정규형(2NF)',
            content: `
                <h4>📝 제2정규형 완전 가이드</h4>
                <p>2NF는 1NF를 만족하면서 부분 함수 종속을 제거한 상태입니다.</p>
                
                <h5>🔹 부분 함수 종속이란?</h5>
                <ul>
                    <li>복합키의 일부에만 종속되는 속성이 있는 경우</li>
                    <li>예: (학번, 과목코드) → 교수명 (과목코드만으로도 교수명 결정)</li>
                </ul>
                
                <h5>⚠️ 2NF 위반 예시</h5>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>학번</th><th>과목코드</th><th>성적</th><th>교수명</th></tr>
                    <tr><td>1001</td><td>CS101</td><td>90</td><td>김교수</td></tr>
                    <tr><td>1002</td><td>CS101</td><td>85</td><td>김교수</td></tr>
                </table>
                <p>문제: 과목코드만으로도 교수명이 결정됨 (부분함수종속)</p>
                
                <h5>✅ 2NF 만족 해결법</h5>
                <p><strong>수강 테이블</strong></p>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>학번</th><th>과목코드</th><th>성적</th></tr>
                    <tr><td>1001</td><td>CS101</td><td>90</td></tr>
                </table>
                
                <p><strong>과목 테이블</strong></p>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>과목코드</th><th>교수명</th></tr>
                    <tr><td>CS101</td><td>김교수</td></tr>
                </table>
            `
        }
    },
    {
        id: 12,
        type: 'multiple',
        question: '제3정규형은 어떤 종속을 제거해야 하는가?',
        options: ['부분 함수 종속', '이행적 함수 종속', '다치 종속', '조인 종속'],
        answer: 1,
        explanation: '제3정규형(3NF)은 2NF를 만족하면서 일반 속성 간의 이행 함수 종속(X→Y, Y→Z ⇒ X→Z) 를 제거한 정규형입니다.',
        guide: {
            title: '제3정규형(3NF)',
            content: `
                <h4>📝 제3정규형 완전 가이드</h4>
                <p>3NF는 2NF를 만족하면서 이행적 함수 종속을 제거한 상태입니다.</p>
                
                <h5>🔹 이행적 함수 종속이란?</h5>
                <ul>
                    <li>X → Y, Y → Z 관계에서 X → Z가 성립하는 경우</li>
                    <li>기본키가 아닌 속성에 다른 속성이 종속되는 경우</li>
                    <li>예: 학번 → 학과, 학과 → 학과사무실 ⇒ 학번 → 학과사무실</li>
                </ul>
                
                <h5>⚠️ 3NF 위반 예시</h5>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>학번</th><th>이름</th><th>학과</th><th>학과사무실</th></tr>
                    <tr><td>1001</td><td>김철수</td><td>컴퓨터</td><td>301호</td></tr>
                    <tr><td>1002</td><td>이영희</td><td>전자</td><td>302호</td></tr>
                </table>
                <p>문제: 학과사무실이 학과에만 종속됨 (이행함수종속)</p>
                
                <h5>✅ 3NF 만족 해결법</h5>
                <p><strong>학생 테이블</strong></p>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>학번</th><th>이름</th><th>학과</th></tr>
                    <tr><td>1001</td><td>김철수</td><td>컴퓨터</td></tr>
                </table>
                
                <p><strong>학과 테이블</strong></p>
                <table style="border: 1px solid #ccc; margin: 10px 0;">
                    <tr><th>학과</th><th>학과사무실</th></tr>
                    <tr><td>컴퓨터</td><td>301호</td></tr>
                </table>
            `
        }
    },
    {
        id: 13,
        type: 'multiple',
        question: '트랜잭션의 ACID 중 일관성이 의미하는 것은?',
        options: ['트랜잭션이 모두 수행되거나 취소', '데이터의 무결성 유지', '다른 트랜잭션 간 간섭 없음', '영구적으로 저장됨'],
        answer: 1,
        explanation: '일관성(Consistency)은 트랜잭션 수행 전·후에 DB가 정의된 무결성 제약 조건을 항상 만족하는 상태를 말합니다.',
        guide: {
            title: '트랜잭션의 ACID 특성',
            content: `
                <h4>🔐 ACID 트랜잭션 특성</h4>
                <ul>
                    <li><strong>Atomicity (원자성):</strong> All or Nothing - 모두 실행되거나 전혀 실행되지 않음</li>
                    <li><strong>Consistency (일관성):</strong> 트랜잭션 실행 전후 무결성 제약조건을 만족</li>
                    <li><strong>Isolation (고립성):</strong> 트랜잭션들이 서로 간섭하지 않음</li>
                    <li><strong>Durability (지속성):</strong> 완료된 트랜잭션 결과가 영구적으로 반영</li>
                </ul>
            `
        }
    },
    {
        id: 14,
        type: 'multiple',
        question: 'COMMIT의 기능은?',
        options: ['트랜잭션 취소', '변경 내용 확정', '이전 상태로 되돌림', '백업 수행'],
        answer: 1,
        explanation: 'COMMIT은 트랜잭션을 정상 종료하고, 지금까지의 변경 내용을 데이터베이스에 영구 반영하는 명령입니다.',
        guide: {
            title: 'COMMIT - 트랜잭션 확정',
            content: `
                <h4>✅ COMMIT 명령어 완전 가이드</h4>
                <p>COMMIT은 트랜잭션의 변경사항을 데이터베이스에 영구적으로 반영하는 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>COMMIT [WORK];

-- 예시
BEGIN TRANSACTION;
UPDATE 학생 SET 성적=90 WHERE 학번='2023001';
INSERT INTO 수강 VALUES ('2023001', 'CS101', 90);
COMMIT; -- 변경사항 영구 반영</code></pre>
                </div>
                
                <h5>🔹 COMMIT의 역할</h5>
                <ul>
                    <li><strong>데이터 영구 저장</strong>: 트랜잭션의 모든 변경사항을 디스크에 기록</li>
                    <li><strong>록 해제</strong>: 트랜잭션이 걸어둔 모든 잠금 해제</li>
                    <li><strong>세이브포인트 제거</strong>: 모든 중간 저장점 삭제</li>
                    <li><strong>트랜잭션 종료</strong>: 현재 트랜잭션 완전 종료</li>
                </ul>
                
                <h5>🔹 자동 COMMIT 상황</h5>
                <ul>
                    <li>DDL 명령어 실행 시 (CREATE, ALTER, DROP)</li>
                    <li>DCL 명령어 실행 시 (GRANT, REVOKE)</li>
                    <li>데이터베이스 연결 종료 시</li>
                    <li>일부 DBMS에서 DML 자동커밋 모드</li>
                </ul>
                
                <h5>🔹 COMMIT과 트랜잭션 상태</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>시점</th><th>데이터 상태</th><th>다른 세션에서 보임</th></tr>
                    <tr><td>COMMIT 전</td><td>임시 저장</td><td>보이지 않음</td></tr>
                    <tr><td>COMMIT 후</td><td>영구 저장</td><td>보임</td></tr>
                </table>
                
                <h5>⚠️ 주의사항</h5>
                <ul>
                    <li>COMMIT 후에는 ROLLBACK으로 되돌릴 수 없음</li>
                    <li>장시간 트랜잭션은 록 캐시를 비효적으로 사용</li>
                    <li>중요한 데이터 변경 전에는 백업 권장</li>
                </ul>
            `
        }
    },
    {
        id: 15,
        type: 'multiple',
        question: 'ROLLBACK의 기능은?',
        options: ['작업 취소 및 이전상태 복구', '작업 영구 반영', '인덱스 생성', '제약 조건 생성'],
        answer: 0,
        explanation: 'ROLLBACK은 트랜잭션 내의 변경 작업을 모두 취소하고 트랜잭션 시작 전 상태로 복구하는 명령입니다.',
        guide: {
            title: '트랜잭션 제어',
            content: `
                <h4>⚡ 트랜잭션 제어 명령어</h4>
                <ul>
                    <li><strong>COMMIT:</strong> 트랜잭션의 모든 변경사항을 영구적으로 저장</li>
                    <li><strong>ROLLBACK:</strong> 트랜잭션의 모든 변경사항을 취소하고 이전 상태로 복원</li>
                    <li><strong>SAVEPOINT:</strong> 트랜잭션 내부에 중간 저장점 설정</li>
                </ul>
            `
        }
    },
    {
        id: 16,
        type: 'multiple',
        question: 'SELECT 문에서 중복 제거는 어떤 키워드인가?',
        options: ['DISTINCT', 'UNIQUE', 'REMOVE', 'CLEAN'],
        answer: 0,
        explanation: 'SELECT 문의 결과에서 중복 튜플을 제거할 때 DISTINCT 키워드를 사용합니다.',
        guide: {
            title: 'SQL SELECT 구문',
            content: `
                <h4>🔍 SQL SELECT 기본 문법</h4>
                <p><strong>DISTINCT:</strong> 중복된 레코드를 제거하여 고유한 값만 반환</p>
                <p><strong>사용법:</strong> SELECT DISTINCT 컬럼명 FROM 테이블명;</p>
                <p><strong>예시:</strong> SELECT DISTINCT 학과 FROM 학생;</p>
            `
        }
    },
    {
        id: 17,
        type: 'multiple',
        question: 'WHERE 절의 역할은?',
        options: ['정렬', '조건 검색', '그룹화', '중복 제거'],
        answer: 1,
        explanation: 'WHERE 절은 SELECT에서 조건을 지정하여 필요한 튜플만 필터링할 때 사용합니다.',
        guide: {
            title: 'WHERE 절 - 조건 검색',
            content: `
                <h4>🔍 WHERE 절 완전 가이드</h4>
                <p>WHERE 절은 SQL 문에서 특정 조건을 만족하는 데이터만 추출하는 필터링 역할을 합니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>SELECT 컬럼명
FROM 테이블명
WHERE 조건;</code></pre>
                </div>
                
                <h5>🔹 비교 연산자</h5>
                <ul>
                    <li><strong>=</strong>: 등할 - WHERE 나이 = 20</li>
                    <li><strong>!=, <></strong>: 부등할 - WHERE 나이 != 20</li>
                    <li><strong>>, >=, <, <=</strong>: 비교 - WHERE 나이 >= 18</li>
                    <li><strong>BETWEEN</strong>: 범위 - WHERE 나이 BETWEEN 18 AND 25</li>
                    <li><strong>IN</strong>: 목록 중 하나 - WHERE 학과 IN ('컴퓨터', '전자')</li>
                    <li><strong>LIKE</strong>: 패턴 매칭 - WHERE 이름 LIKE '김%'</li>
                </ul>
                
                <h5>🔹 논리 연산자</h5>
                <ul>
                    <li><strong>AND</strong>: 둘 다 참 - WHERE 나이 >= 20 AND 학과='CS'</li>
                    <li><strong>OR</strong>: 하나라도 참 - WHERE 나이 < 20 OR 나이 > 30</li>
                    <li><strong>NOT</strong>: 부정 - WHERE NOT 학과='CS'</li>
                </ul>
                
                <h5>🔹 특수 조건</h5>
                <ul>
                    <li><strong>IS NULL</strong>: 널 값 확인 - WHERE 전화번호 IS NULL</li>
                    <li><strong>IS NOT NULL</strong>: 널이 아니 - WHERE 이메일 IS NOT NULL</li>
                </ul>
            `
        }
    },
    {
        id: 18,
        type: 'multiple',
        question: 'GROUP BY 절을 사용할 때 주로 함께 사용하는, 그룹에 대한 조건 절은?',
        options: ['ORDER BY', 'WHERE', 'HAVING', 'DISTINCT'],
        answer: 2,
        explanation: 'GROUP BY로 그룹을 만든 후, 그룹 단위에 조건을 걸 때 HAVING 절을 사용합니다.',
        guide: {
            title: 'GROUP BY & HAVING - 그룹화와 집계',
            content: `
                <h4>📋 GROUP BY & HAVING 완전 가이드</h4>
                <p>GROUP BY는 데이터를 그룹별로 묶고, HAVING은 그룹에 대한 조건을 설정합니다.</p>
                
                <h5>🔹 GROUP BY 기본 문법</h5>
                <div class="code-example">
                    <pre><code>SELECT 컬럼명, 집계함수
FROM 테이블명
WHERE 조건
GROUP BY 그룹화컬럼
HAVING 그룹조건
ORDER BY 정렬컬럼;</code></pre>
                </div>
                
                <h5>🔹 주요 집계함수</h5>
                <ul>
                    <li><strong>COUNT(*)</strong>: 전체 행 수</li>
                    <li><strong>COUNT(컬럼)</strong>: NULL이 아닌 값의 개수</li>
                    <li><strong>SUM(컬럼)</strong>: 합계</li>
                    <li><strong>AVG(컬럼)</strong>: 평균</li>
                    <li><strong>MAX(컬럼)</strong>: 최대값</li>
                    <li><strong>MIN(컬럼)</strong>: 최소값</li>
                </ul>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>학과별 학생 수</strong>:<br>
                    SELECT 학과, COUNT(*) FROM 학생 GROUP BY 학과;</li>
                    <li><strong>성적 평균 80 이상인 학과</strong>:<br>
                    SELECT 학과, AVG(성적) FROM 수강 GROUP BY 학과 HAVING AVG(성적) >= 80;</li>
                </ul>
                
                <h5>🔹 WHERE vs HAVING</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>구분</th><th>WHERE</th><th>HAVING</th></tr>
                    <tr><td>시점</td><td>그룹화 이전</td><td>그룹화 이후</td></tr>
                    <tr><td>대상</td><td>개별 행</td><td>그룹</td></tr>
                    <tr><td>집계함수</td><td>사용 불가</td><td>사용 가능</td></tr>
                </table>
            `
        }
    },
    {
        id: 19,
        type: 'multiple',
        question: 'ORDER BY에서 기본 정렬은?',
        options: ['ASC', 'DESC', 'RANDOM', 'NONE'],
        answer: 0,
        explanation: 'ORDER BY는 기본값이 ASC(오름차순) 이며, 내림차순은 DESC를 명시해야 합니다.',
        guide: {
            title: 'ORDER BY - 데이터 정렬',
            content: `
                <h4>🔄 ORDER BY 완전 가이드</h4>
                <p>ORDER BY는 조회된 데이터를 원하는 순서로 정렬하는 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>SELECT 컬럼명
FROM 테이블명
[WHERE 조건]
ORDER BY 컬럼1 [ASC|DESC], 컬럼2 [ASC|DESC], ...;</code></pre>
                </div>
                
                <h5>🔹 정렬 옵션</h5>
                <ul>
                    <li><strong>ASC (Ascending)</strong>: 오름차순 (기본값)</li>
                    <li><strong>DESC (Descending)</strong>: 내림차순</li>
                </ul>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>단일 컬럼 오름차순</strong>:<br>
                    SELECT * FROM 학생 ORDER BY 이름;</li>
                    <li><strong>단일 컬럼 내림차순</strong>:<br>
                    SELECT * FROM 학생 ORDER BY 나이 DESC;</li>
                    <li><strong>다중 컬럼 정렬</strong>:<br>
                    SELECT * FROM 학생 ORDER BY 학과 ASC, 나이 DESC;</li>
                    <li><strong>컬럼 번호로 정렬</strong>:<br>
                    SELECT 이름, 나이 FROM 학생 ORDER BY 2 DESC;</li>
                </ul>
                
                <h5>🔹 정렬 규칙</h5>
                <ul>
                    <li>기본적으로 ASC(오름차순) 적용</li>
                    <li>숫자: 1, 2, 3, 4...</li>
                    <li>문자: A, B, C... (사전 순서)</li>
                    <li>날짜: 오래된 날짜부터</li>
                    <li>NULL 값은 마지막에 위치</li>
                </ul>
                
                <h5>🔹 다중 컬럼 정렬 원리</h5>
                <p>첫번째 컬럼이 같으면 두번째 컬럼으로, 두번째 컬럼도 같으면 세번째 컬럼으로 정렬</p>
            `
        }
    },
    {
        id: 20,
        type: 'multiple',
        question: '다음 중 DDL이 아닌 것은?',
        options: ['CREATE', 'ALTER', 'INSERT', 'DROP'],
        answer: 2,
        explanation: 'DDL은 테이블/뷰 구조를 정의·변경하는 CREATE, ALTER, DROP 등이며, INSERT는 DML(데이터 조작어)입니다.',
    },
    {
        id: 21,
        type: 'multiple',
        question: '다음 중 DML에 해당하는 것은?',
        options: ['GRANT', 'UPDATE', 'CREATE', 'ALTER'],
        answer: 1,
        explanation: 'DML은 SELECT, INSERT, UPDATE, DELETE 와 같이 데이터를 조작하는 명령어입니다.',
    },
    {
        id: 22,
        type: 'multiple',
        question: '데이터 무결성 제약 조건이 아닌 것은?',
        options: ['도메인 무결성', '개체 무결성', '참조 무결성', '논리 무결성'],
        answer: 3,
        explanation: '대표적인 무결성은 개체(기본키), 도메인(속성 범위), 참조(외래키) 무결성입니다. 논리 무결성이라는 용어는 일반적으로 사용하지 않습니다.',
        guide: {
            title: '데이터 무결성 제약조건',
            content: `
                <h4>🔒 데이터 무결성 완전 가이드</h4>
                <p>데이터 무결성은 데이터베이스의 데이터가 정확하고 일관성 있게 유지되도록 하는 제약조건들입니다.</p>
                
                <h5>🔹 개체 무결성 (Entity Integrity)</h5>
                <ul>
                    <li>기본키(PK)는 NULL 값을 가질 수 없음</li>
                    <li>기본키는 중복된 값을 가질 수 없음</li>
                    <li>각 튜플의 고유성을 보장</li>
                </ul>
                
                <h5>🔹 도메인 무결성 (Domain Integrity)</h5>
                <ul>
                    <li>각 속성에 정의된 도메인 범위의 값만 허용</li>
                    <li>데이터 타입, 범위, 형식 제한</li>
                    <li>예: 나이는 0~120 사이 정수값</li>
                </ul>
                
                <h5>🔹 참조 무결성 (Referential Integrity)</h5>
                <ul>
                    <li>외래키(FK) 값은 참조 테이블의 기본키 값 중 하나이거나 NULL이어야 함</li>
                    <li>참조되는 테이블의 데이터 삭제/수정 제한</li>
                    <li>데이터 간의 일관성 보장</li>
                </ul>
                
                <h5>🔹 무결성 위반 예시</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>무결성 종류</th><th>위반 사례</th></tr>
                    <tr><td>개체</td><td>기본키에 동일한 값 입력</td></tr>
                    <tr><td>도메인</td><td>나이 필드에 -10 입력</td></tr>
                    <tr><td>참조</td><td>외래키에 존재하지 않는 값 입력</td></tr>
                </table>
            `
        }
    },
    {
        id: 23,
        type: 'multiple',
        question: '개체 무결성에서 기본키가 가질 수 없는 값은?',
        options: ['문자열', '숫자', 'NULL', '0'],
        answer: 2,
        explanation: '개체 무결성 규칙에 따라 기본키를 구성하는 속성은 NULL이나 중복 값을 가질 수 없습니다.',
    },
    {
        id: 24,
        type: 'multiple',
        question: '참조 무결성이 위배되는 경우는?',
        options: ['참조하는 PK가 존재하지 않음', 'PK가 변경됨', 'NULL 값 존재', '데이터가 중복됨'],
        answer: 0,
        explanation: '참조 무결성은 외래키 값이 NULL 또는 참조 릴레이션의 기본키 값 중 하나여야 함을 뜻합니다.',
    },
    {
        id: 25,
        type: 'multiple',
        question: '뷰(View)의 특징으로 틀린 것은?',
        options: ['가상 테이블', '독자적인 저장 공간을 가진다', '데이터 보안 제공', 'ALTER 불가'],
        answer: 1,
        explanation: '뷰는 기본 테이블 위에 논리적으로 정의된 가상 테이블이며, 별도의 물리 저장공간을 갖지 않습니다.',
        guide: {
            title: '뷰(View) - 가상 테이블',
            content: `
                <h4>🕵️ 뷰(View) 완전 가이드</h4>
                <p>뷰는 하나 이상의 기본 테이블로부터 유도된 가상의 테이블입니다.</p>
                
                <h5>🔹 뷰의 특징</h5>
                <ul>
                    <li><strong>가상 테이블</strong>: 물리적 저장공간이 없음</li>
                    <li><strong>독립성</strong>: 기본 테이블 구조 변경에 대한 논리적 데이터 독립성</li>
                    <li><strong>단순성</strong>: 복잡한 질의를 단순하게 만듦</li>
                    <li><strong>보안성</strong>: 특정 사용자에게 필요한 데이터만 제공</li>
                </ul>
                
                <h5>🔹 뷰 생성 문법</h5>
                <div class="code-example">
                    <pre><code>CREATE VIEW 뷰명 [([속성명1, 속성명2, ...])]
AS SELECT 문
[WITH CHECK OPTION];</code></pre>
                </div>
                
                <h5>🔹 뷰 사용 예시</h5>
                <ul>
                    <li><strong>특정 컬럼만 보이기</strong>:<br>
                    CREATE VIEW 학생뷰 AS SELECT 학번, 이름, 학과 FROM 학생;</li>
                    <li><strong>조건부 데이터</strong>:<br>
                    CREATE VIEW CS학생 AS SELECT * FROM 학생 WHERE 학과='컴퓨터';</li>
                    <li><strong>조인 결과</strong>:<br>
                    CREATE VIEW 수강내역 AS SELECT s.이름, c.과목명 FROM 학생 s, 수강 c WHERE s.학번=c.학번;</li>
                </ul>
                
                <h5>🔹 뷰의 장단점</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>장점</th><th>단점</th></tr>
                    <tr><td>보안성 향상</td><td>성능 저하 가능</td></tr>
                    <tr><td>질의 단순화</td><td>수정 제약</td></tr>
                    <tr><td>데이터 독립성</td><td>의존성 문제</td></tr>
                </table>
                
                <h5>⚠️ 뷰 수정 제약사항</h5>
                <ul>
                    <li>집계함수가 포함된 뷰는 수정 불가</li>
                    <li>DISTINCT, GROUP BY가 있는 뷰는 수정 불가</li>
                    <li>여러 테이블을 조인한 뷰는 제약적 수정만 가능</li>
                </ul>
            `
        }
    },
    {
        id: 26,
        type: 'multiple',
        question: '로킹(Locking)의 목적은?',
        options: ['저장공간 절약', '병행 제어', '중복성 증가', '속성 증가'],
        answer: 1,
        explanation: '로킹은 동시에 여러 트랜잭션이 수행될 때 같은 데이터에 대한 동시 접근을 제어하여 일관성과 무결성을 보장하는 병행 제어 기법입니다.',
    },
    {
        id: 27,
        type: 'multiple',
        question: '관계대수에서 SELECT(σ)의 기능은?',
        options: ['속성 추출', '조건에 맞는 튜플 선택', '조인', '나누기'],
        answer: 1,
        explanation: 'σ(Select)는 조건식을 만족하는 튜플(행)만 선택하는 수평 연산입니다.',
        guide: {
            title: '관계대수 연산자',
            content: `
                <h4>🧠 관계대수 연산자 가이드</h4>
                <p>관계대수는 관계형 데이터베이스를 조작하기 위한 수학적 연산자 집합입니다.</p>
                
                <h5>🔹 기본 연산자</h5>
                <ul>
                    <li><strong>σ (Select, 셀렉트)</strong>: 조건에 맞는 행 선택 - 튜플 수평 연산</li>
                    <li><strong>π (Project, 프로젝트)</strong>: 특정 속성 선택 - 속성 수직 연산</li>
                    <li><strong>∪ (Union, 합집합)</strong>: 두 릴레이션의 합집합</li>
                    <li><strong>∩ (Intersection, 교집합)</strong>: 두 릴레이션의 교집합</li>
                    <li><strong>- (Difference, 차집합)</strong>: 두 릴레이션의 차집합</li>
                    <li><strong>× (Cartesian Product, 카르테지안 곱)</strong>: 두 릴레이션의 곱집합</li>
                </ul>
                
                <h5>🔹 조인 연산자</h5>
                <ul>
                    <li><strong>⨝ (Natural Join, 자연조인)</strong>: 공통 속성으로 자동 조인</li>
                    <li><strong>⋈ (Theta Join, 세타조인)</strong>: 조건을 명시한 조인</li>
                    <li><strong>⟕ (Left Outer Join)</strong>: 왼쪽 외부조인</li>
                    <li><strong>⟖ (Right Outer Join)</strong>: 오른쪽 외부조인</li>
                </ul>
                
                <h5>🔹 연산 예시</h5>
                <ul>
                    <li><strong>셀렉트</strong>: σ(나이>=20)(학생) - 20세 이상 학생</li>
                    <li><strong>프로젝트</strong>: π(이름,학과)(학생) - 이름과 학과만 추출</li>
                    <li><strong>조인</strong>: 학생 ⨝ 수강 - 학번으로 자연조인</li>
                </ul>
                
                <h5>🔹 SQL과의 대응</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>관계대수</th><th>SQL</th></tr>
                    <tr><td>σ(조건)(R)</td><td>SELECT * FROM R WHERE 조건</td></tr>
                    <tr><td>π(속성)(R)</td><td>SELECT 속성 FROM R</td></tr>
                    <tr><td>R ∪ S</td><td>SELECT * FROM R UNION SELECT * FROM S</td></tr>
                    <tr><td>R ⨝ S</td><td>SELECT * FROM R NATURAL JOIN S</td></tr>
                </table>
            `
        }
    },
    {
        id: 28,
        type: 'multiple',
        question: '조인(Join) 연산은 두 릴레이션을 어떻게 하는 연산인가?',
        options: ['나눔', '합침', '조건 검색', '정렬'],
        answer: 1,
        explanation: '조인은 두 개의 릴레이션을 공통 속성 등을 기준으로 결합하여 하나의 새로운 릴레이션을 생성하는 연산입니다.',
    },
    {
        id: 29,
        type: 'multiple',
        question: '트랜잭션 종료 시 로그를 기반으로 다시 수행하여 데이터베이스를 복구하는 것은?',
        options: ['UNDO', 'REDO', 'ROLLBACK', 'COMMIT'],
        answer: 1,
        explanation: 'REDO는 트랜잭션의 시작과 완료 기록이 있는 경우, 로그를 이용해 작업을 다시 수행하여 복구하는 기법입니다.',
    },
    {
        id: 30,
        type: 'multiple',
        question: '외래키는 어떤 테이블의 기본키를 참조하는가?',
        options: ['자기 테이블', '다른 테이블', '임의의 테이블', '시스템 테이블'],
        answer: 1,
        explanation: '외래키(FK)는 다른 릴레이션의 기본키(PK)를 참조하며, 이 관계를 통해 테이블 간 참조 무결성이 유지됩니다.',
    },
    
    // 단답식 문제 (31-50)
    {
        id: 31,
        type: 'short',
        question: '\'행\'을 의미하는 릴레이션 용어는?',
        answer: '튜플',
        keywords: ['튜플', 'tuple', 'Tuple'],
        explanation: '릴레이션에서 한 줄(레코드)에 해당하는 단위를 튜플이라고 합니다.',
    },
    {
        id: 32,
        type: 'short',
        question: '\'열\'을 의미하는 릴레이션 용어는?',
        answer: '속성',
        keywords: ['속성', 'attribute', 'Attribute', '애트리뷰트'],
        explanation: '릴레이션의 세로 방향, 각 컬럼을 속성(Attribute) 이라고 하며, 필드와 같은 의미입니다.',
    },
    {
        id: 33,
        type: 'short',
        question: '한 테이블에서 속성의 개수를 의미하는 용어는?',
        answer: '차수',
        keywords: ['차수', 'degree', 'Degree'],
        explanation: '릴레이션에서 열(속성)의 개수를 차수라고 부릅니다.',
    },
    {
        id: 34,
        type: 'short',
        question: '한 테이블에서 튜플의 개수를 의미하는 용어는?',
        answer: '기수',
        keywords: ['기수', 'cardinality', 'Cardinality', '카디널리티'],
        explanation: '릴레이션에서 행(튜플)의 개수를 기수(카디널리티)라고 합니다.',
    },
    {
        id: 35,
        type: 'short',
        question: '기본키로 선정되지 않은 후보키를 무엇이라 하는가?',
        answer: '대체키',
        keywords: ['대체키', 'alternate key', 'Alternate Key', '얼터네이트키'],
        explanation: '후보키 중 기본키로 채택되지 않은 나머지 키들을 대체키라고 부릅니다.',
    },
    {
        id: 36,
        type: 'short',
        question: '다른 테이블의 PK를 참조하는 속성은?',
        answer: '외래키',
        keywords: ['외래키', 'foreign key', 'Foreign Key', 'FK'],
        explanation: '외래키는 테이블 간 관계를 연결하기 위해 다른 릴레이션의 기본키를 참조하는 속성입니다.',
    },
    {
        id: 37,
        type: 'short',
        question: '모든 속성이 원자값이어야 함을 의미하는 정규형은?',
        answer: '제1정규형',
        keywords: ['제1정규형', '1NF', '1정규형', '첫번째정규형'],
        explanation: '제1정규형은 각 속성이 더 이상 나눌 수 없는 원자 값만을 가지도록 하는 정규형입니다.',
        guide: {
            title: '제1정규형(1NF)',
            content: `
                <h4>🔢 제1정규형 완전 가이드</h4>
                <p>1NF는 데이터베이스 정규화의 가장 기본 단계로, 모든 속성이 원자값을 가진다는 조건입니다.</p>
                
                <h5>🔹 1NF 조건</h5>
                <ul>
                    <li><strong>원자값</strong>: 모든 속성은 더 이상 나눌 수 없는 값만 가져야 함</li>
                    <li><strong>반복 그룹 금지</strong>: 다중값이나 반복되는 값 금지</li>
                    <li><strong>고정 속성</strong>: 각 행이 동일한 수의 속성을 가져야 함</li>
                </ul>
                
                <h5>⚠️ 1NF 위반 예시</h5>
                <table style="border: 1px solid #ccc;">
                    <tr><th>학번</th><th>이름</th><th>취미</th></tr>
                    <tr><td>1001</td><td>김철수</td><td>독서, 영화감상</td></tr>
                </table>
                
                <h5>✅ 1NF 만족 해결</h5>
                <table style="border: 1px solid #ccc;">
                    <tr><th>학번</th><th>이름</th><th>취미</th></tr>
                    <tr><td>1001</td><td>김철수</td><td>독서</td></tr>
                    <tr><td>1001</td><td>김철수</td><td>영화감상</td></tr>
                </table>
            `
        }
    },
    {
        id: 38,
        type: 'short',
        question: '부분 함수 종속을 제거한 정규형은?',
        answer: '제2정규형',
        keywords: ['제2정규형', '2NF', '2정규형', '두번째정규형'],
        explanation: '복합키의 일부에만 종속하는 속성이 없도록 한 것이 2NF입니다.',
        guide: {
            title: '제2정규형(2NF)',
            content: `
                <h4>🔢 제2정규형 완전 가이드</h4>
                <p>2NF는 1NF를 만족하면서 부분 함수 종속을 제거한 상태입니다.</p>
                
                <h5>🔹 부분 함수 종속</h5>
                <ul>
                    <li>복합키의 일부에만 종속하는 속성</li>
                    <li>예: (학번, 과목코드) → 교수명</li>
                </ul>
                
                <h5>⚠️ 2NF 위반 예시</h5>
                <table style="border: 1px solid #ccc;">
                    <tr><th>학번</th><th>과목코드</th><th>성적</th><th>교수명</th></tr>
                    <tr><td>1001</td><td>CS101</td><td>90</td><td>김교수</td></tr>
                </table>
                
                <h5>✅ 2NF 만족 해결</h5>
                <p>수강 테이블: (학번, 과목코드, 성적)</p>
                <p>과목 테이블: (과목코드, 교수명)</p>
            `
        }
    },
    {
        id: 39,
        type: 'short',
        question: '이행 함수 종속을 제거한 정규형은?',
        answer: '제3정규형',
        keywords: ['제3정규형', '3NF', '3정규형', '세번째정규형'],
        explanation: '일반 속성 간에 X→Y, Y→Z로 이어지는 이행 종속을 제거한 상태가 3NF입니다.',
        guide: {
            title: '제3정규형(3NF)',
            content: `
                <h4>🔢 제3정규형 완전 가이드</h4>
                <p>3NF는 2NF를 만족하면서 이행적 함수 종속을 제거한 상태입니다.</p>
                
                <h5>🔹 이행 함수 종속</h5>
                <ul>
                    <li>A → B, B → C에서 A → C가 성립</li>
                    <li>기본키가 아닌 속성에 다른 속성이 종속</li>
                </ul>
                
                <h5>⚠️ 3NF 위반 예시</h5>
                <table style="border: 1px solid #ccc;">
                    <tr><th>학번</th><th>이름</th><th>학과</th><th>사무실</th></tr>
                    <tr><td>1001</td><td>김철수</td><td>컴퓨터</td><td>301호</td></tr>
                </table>
                <p>학과 → 사무실 (이행종속)</p>
                
                <h5>✅ 3NF 만족 해결</h5>
                <p>학생 테이블: (학번, 이름, 학과)</p>
                <p>학과 테이블: (학과, 사무실)</p>
            `
        }
    },
    {
        id: 40,
        type: 'short',
        question: '트랜잭션이 완전히 실행되거나 전혀 실행되지 않는 성질은?',
        answer: '원자성',
        keywords: ['원자성', 'atomicity', 'Atomicity'],
        explanation: '원자성은 트랜잭션을 더 이상 쪼갤 수 없는 단위로 보아 모두 수행되거나 전혀 수행되지 않도록 보장하는 특성입니다.',
    },
    {
        id: 41,
        type: 'short',
        question: '트랜잭션 완료 시 데이터가 영구적으로 저장되는 성질은?',
        answer: '영속성',
        keywords: ['영속성', 'durability', 'Durability', '지속성'],
        explanation: '영속성은 COMMIT 이후 트랜잭션의 결과가 시스템 고장 이후에도 보존되도록 하는 특성입니다.',
    },
    {
        id: 42,
        type: 'short',
        question: '트랜잭션 간 서로 간섭을 허용하지 않는 성질은?',
        answer: '고립성',
        keywords: ['고립성', 'isolation', 'Isolation', '격리성'],
        explanation: '고립성은 여러 트랜잭션이 동시에 수행되더라도 서로의 중간 결과를 보거나 영향을 주지 못하게 하는 성질입니다.',
    },
    {
        id: 43,
        type: 'short',
        question: '조건에 맞는 데이터를 검색하는 SQL 명령어는?',
        answer: 'SELECT',
        keywords: ['SELECT', 'select', 'Select'],
        explanation: 'SELECT는 테이블에서 원하는 컬럼과 튜플을 조회(검색) 하는 DML 명령어입니다.',
        guide: {
            title: 'SELECT - 데이터 조회',
            content: `
                <h4>📊 SELECT 명령어 완전 가이드</h4>
                <p>SELECT는 데이터베이스에서 가장 많이 사용되는 DML 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>SELECT [DISTINCT] 컬럼명1, 컬럼명2, ...
FROM 테이블명
[WHERE 조건]
[GROUP BY 컬럼명]
[HAVING 조건]
[ORDER BY 컬럼명 [ASC|DESC]];</code></pre>
                </div>
                
                <h5>🔹 주요 사용 예시</h5>
                <ul>
                    <li><strong>전체 조회</strong>: SELECT * FROM 학생;</li>
                    <li><strong>특정 컬럼</strong>: SELECT 이름, 학과 FROM 학생;</li>
                    <li><strong>조건부 조회</strong>: SELECT * FROM 학생 WHERE 학과='컴퓨터';</li>
                    <li><strong>정렬</strong>: SELECT * FROM 학생 ORDER BY 이름;</li>
                </ul>
                
                <h5>🔹 SELECT의 특징</h5>
                <ul>
                    <li>데이터 검색 전용 - 데이터를 변경하지 않음</li>
                    <li>복잡한 조건과 함수 사용 가능</li>
                    <li>여러 테이블 조인 가능</li>
                </ul>
            `
        }
    },
    {
        id: 44,
        type: 'short',
        question: '새로운 튜플을 삽입하는 SQL 명령어는?',
        answer: 'INSERT',
        keywords: ['INSERT', 'insert', 'Insert'],
        explanation: 'INSERT는 테이블에 새로운 행(튜플)을 추가할 때 사용하는 명령어입니다.',
        guide: {
            title: 'INSERT - 데이터 삽입',
            content: `
                <h4>➕ INSERT 명령어 완전 가이드</h4>
                <p>INSERT는 테이블에 새로운 데이터를 추가하는 DML 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>INSERT INTO 테이블명 (컬럼1, 컬럼2, ...)
VALUES (값1, 값2, ...);

-- 또는 전체 컬럼에 값 입력시
INSERT INTO 테이블명
VALUES (값1, 값2, ...);</code></pre>
                </div>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>특정 컬럼 삽입</strong>:<br>
                    INSERT INTO 학생(학번, 이름, 학과) VALUES ('2023001', '홍길동', '컴퓨터');</li>
                    <li><strong>전체 컬럼 삽입</strong>:<br>
                    INSERT INTO 학생 VALUES ('2023002', '김철수', '전자', 3);</li>
                    <li><strong>다중 행 삽입</strong>:<br>
                    INSERT INTO 학생 VALUES ('2023003', '이영희', '수학', 2), ('2023004', '박민수', '물리', 1);</li>
                </ul>
                
                <h5>🔹 주의사항</h5>
                <ul>
                    <li>데이터 타입과 제약조건 준수 필요</li>
                    <li>기본키(PK) 중복 불가</li>
                    <li>NOT NULL 컬럼은 값 필수 입력</li>
                </ul>
            `
        }
    },
    {
        id: 45,
        type: 'short',
        question: '기존 튜플을 수정하는 SQL 명령어는?',
        answer: 'UPDATE',
        keywords: ['UPDATE', 'update', 'Update'],
        explanation: 'UPDATE는 테이블에 이미 존재하는 데이터의 값을 변경(갱신) 할 때 사용합니다.',
        guide: {
            title: 'UPDATE - 데이터 수정',
            content: `
                <h4>✏️ UPDATE 명령어 완전 가이드</h4>
                <p>UPDATE는 기존 테이블 데이터를 수정하는 DML 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>UPDATE 테이블명
SET 컬럼1 = 값1, 컬럼2 = 값2, ...
[WHERE 조건];</code></pre>
                </div>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>특정 행 수정</strong>:<br>
                    UPDATE 학생 SET 학과='소프트웨어' WHERE 학번='2023001';</li>
                    <li><strong>여러 컬럼 수정</strong>:<br>
                    UPDATE 학생 SET 학과='AI', 학년=2 WHERE 이름='홍길동';</li>
                    <li><strong>조건부 수정</strong>:<br>
                    UPDATE 학생 SET 학년 = 학년+1 WHERE 학과='컴퓨터';</li>
                </ul>
                
                <h5>🔹 주의사항</h5>
                <ul>
                    <li><strong>WHERE 절 필수</strong>: 생략시 전체 행이 수정됨</li>
                    <li>기본키(PK) 수정은 신중히 결정</li>
                    <li>제약조건 위반시 수정 실패</li>
                    <li>트랜잭션 내에서 COMMIT/ROLLBACK 가능</li>
                </ul>
            `
        }
    },
    {
        id: 46,
        type: 'short',
        question: '튜플을 삭제하는 SQL 명령어는?',
        answer: 'DELETE',
        keywords: ['DELETE', 'delete', 'Delete'],
        explanation: 'DELETE는 조건에 맞는 튜플을 삭제하는 DML입니다.',
        guide: {
            title: 'DELETE - 데이터 삭제',
            content: `
                <h4>🗑️ DELETE 명령어 완전 가이드</h4>
                <p>DELETE는 테이블에서 불필요한 데이터를 제거하는 DML 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>DELETE FROM 테이블명
[WHERE 조건];

-- 전체 삭제 (주의!)
DELETE FROM 테이블명;</code></pre>
                </div>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>특정 행 삭제</strong>:<br>
                    DELETE FROM 학생 WHERE 학번='2023001';</li>
                    <li><strong>조건부 삭제</strong>:<br>
                    DELETE FROM 학생 WHERE 학과='폐지된학과';</li>
                    <li><strong>복합 조건 삭제</strong>:<br>
                    DELETE FROM 학생 WHERE 학년=4 AND 졸업='Y';</li>
                </ul>
                
                <h5>🔹 관련 명령어 비교</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>명령어</th><th>기능</th><th>특징</th></tr>
                    <tr><td>DELETE</td><td>행 삭제</td><td>WHERE 조건 가능, ROLLBACK 가능</td></tr>
                    <tr><td>DROP</td><td>테이블 삭제</td><td>구조와 데이터 모두 삭제</td></tr>
                    <tr><td>TRUNCATE</td><td>전체 삭제</td><td>빠르지만 ROLLBACK 불가</td></tr>
                </table>
                
                <h5>⚠️ 주의사항</h5>
                <ul>
                    <li><strong>WHERE 절 필수</strong>: 생략시 전체 데이터 삭제</li>
                    <li>참조 무결성 제약조건 확인 필요</li>
                    <li>삭제 전 반드시 백업 권장</li>
                </ul>
            `
        }
    },
    {
        id: 47,
        type: 'short',
        question: '데이터 정의어(DDL) 중 테이블 생성 명령어는?',
        answer: 'CREATE',
        keywords: ['CREATE', 'create', 'Create'],
        explanation: 'CREATE는 테이블, 뷰, 데이터베이스 등의 객체를 새로 생성할 때 사용하는 DDL입니다.',
        guide: {
            title: 'CREATE - 객체 생성',
            content: `
                <h4>🏠 CREATE 명령어 완전 가이드</h4>
                <p>CREATE는 데이터베이스 객체를 생성하는 DDL(Data Definition Language) 명령어입니다.</p>
                
                <h5>🔹 CREATE TABLE 문법</h5>
                <div class="code-example">
                    <pre><code>CREATE TABLE 테이블명 (
    컬럼1 데이터타입 [DEFAULT 값] [NOT NULL],
    컬럼2 데이터타입 [UNIQUE],
    ...,
    PRIMARY KEY (컬럼명),
    FOREIGN KEY (컬럼링) REFERENCES 참조테이블(컬럼명)
);</code></pre>
                </div>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>기본 테이블</strong>:<br>
                    CREATE TABLE 학생(학번 CHAR(10) PRIMARY KEY, 이름 VARCHAR(20) NOT NULL, 학과 VARCHAR(30));</li>
                    <li><strong>제약조건 포함</strong>:<br>
                    CREATE TABLE 수강(학번 CHAR(10), 과목코드 CHAR(6), 성적 INT CHECK(성적 >= 0 AND 성적 <= 100));</li>
                    <li><strong>외래키 설정</strong>:<br>
                    CREATE TABLE 수강(학번 CHAR(10), FOREIGN KEY(학번) REFERENCES 학생(학번));</li>
                </ul>
                
                <h5>🔹 다른 CREATE 문
                <ul>
                    <li><strong>CREATE DATABASE</strong>: 데이터베이스 생성</li>
                    <li><strong>CREATE VIEW</strong>: 가상 테이블(뷰) 생성</li>
                    <li><strong>CREATE INDEX</strong>: 인덱스 생성</li>
                    <li><strong>CREATE USER</strong>: 사용자 계정 생성</li>
                </ul>
                
                <h5>🔹 주요 데이터 타입</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>타입</th><th>설명</th><th>예시</th></tr>
                    <tr><td>CHAR(n)</td><td>고정길이 문자</td><td>CHAR(10)</td></tr>
                    <tr><td>VARCHAR(n)</td><td>가변길이 문자</td><td>VARCHAR(50)</td></tr>
                    <tr><td>INT</td><td>정수</td><td>INT</td></tr>
                    <tr><td>DATE</td><td>날짜</td><td>DATE</td></tr>
                </table>
            `
        }
    },
    {
        id: 48,
        type: 'short',
        question: '권한을 사용자에게 부여하는 명령어는?',
        answer: 'GRANT',
        keywords: ['GRANT', 'grant', 'Grant'],
        explanation: 'GRANT는 특정 사용자에게 SELECT, INSERT 등의 권한을 부여하는 DCL입니다.',
        guide: {
            title: 'GRANT - 권한 부여',
            content: `
                <h4>🔑 GRANT 명령어 완전 가이드</h4>
                <p>GRANT는 데이터베이스 권한을 사용자에게 부여하는 DCL(Data Control Language) 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>GRANT 권한명 [(컬럼리스트)]
ON 객체명
TO 사용자명 [WITH GRANT OPTION];

-- 또는
GRANT 권한1, 권핐2, ...
ON 테이블명
TO 사용자명;</code></pre>
                </div>
                
                <h5>🔹 주요 권한 종류</h5>
                <ul>
                    <li><strong>SELECT</strong>: 데이터 조회 권한</li>
                    <li><strong>INSERT</strong>: 데이터 삽입 권한</li>
                    <li><strong>UPDATE</strong>: 데이터 수정 권한</li>
                    <li><strong>DELETE</strong>: 데이터 삭제 권한</li>
                    <li><strong>ALL</strong>: 모든 권한 (보통 DML 권한)</li>
                </ul>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>조회 권한</strong>:<br>
                    GRANT SELECT ON 학생 TO user1;</li>
                    <li><strong>여러 권한</strong>:<br>
                    GRANT SELECT, INSERT, UPDATE ON 학생 TO user2;</li>
                    <li><strong>모든 권한</strong>:<br>
                    GRANT ALL ON 학생 TO manager;</li>
                    <li><strong>권한 위임</strong>:<br>
                    GRANT SELECT ON 학생 TO user3 WITH GRANT OPTION;</li>
                </ul>
                
                <h5>🔹 권한 부여 단계</h5>
                <ol>
                    <li>데이터베이스 계정 생성</li>
                    <li>필요한 권한만 최소한으로 부여</li>
                    <li>정기적으로 권한 검토 및 정리</li>
                </ol>
                
                <h5>⚠️ 주의사항</h5>
                <ul>
                    <li>최소 권한 원칙: 필요한 권한만 부여</li>
                    <li>WITH GRANT OPTION 사용 시 신중히 결정</li>
                    <li>권한 체인 현상 방지</li>
                </ul>
            `
        }
    },
    {
        id: 49,
        type: 'short',
        question: '권한을 회수하는 명령어는?',
        answer: 'REVOKE',
        keywords: ['REVOKE', 'revoke', 'Revoke'],
        explanation: 'REVOKE는 이전에 GRANT로 부여한 권한을 취소(회수) 하는 명령어입니다.',
        guide: {
            title: 'REVOKE - 권한 회수',
            content: `
                <h4>🚫 REVOKE 명령어 완전 가이드</h4>
                <p>REVOKE는 이전에 부여된 데이터베이스 권한을 취소하는 DCL 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>REVOKE 권한명 [(컬럼리스트)]
ON 객체명
FROM 사용자동 [CASCADE | RESTRICT];

-- 또는
REVOKE 권핐1, 권핐2, ...
ON 테이블명
FROM 사용자명;</code></pre>
                </div>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>특정 권한 회수</strong>:<br>
                    REVOKE SELECT ON 학생 FROM user1;</li>
                    <li><strong>여러 권한 회수</strong>:<br>
                    REVOKE INSERT, UPDATE ON 학생 FROM user2;</li>
                    <li><strong>모든 권한 회수</strong>:<br>
                    REVOKE ALL ON 학생 FROM user3;</li>
                    <li><strong>CASCADE 옵션</strong>:<br>
                    REVOKE SELECT ON 학생 FROM manager CASCADE;</li>
                </ul>
                
                <h5>🔹 CASCADE vs RESTRICT</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>옵션</th><th>설명</th><th>언제 사용</th></tr>
                    <tr><td>CASCADE</td><td>연쇄된 권한도 함께 회수</td><td>권한 체인이 있을 때</td></tr>
                    <tr><td>RESTRICT</td><td>연쇄 권한이 있으면 실패</td><td>안전한 회수 원할 때</td></tr>
                </table>
                
                <h5>🔹 GRANT vs REVOKE</h5>
                <ul>
                    <li><strong>GRANT</strong>: 권한 부여 (+)</li>
                    <li><strong>REVOKE</strong>: 권한 회수 (-)</li>
                    <li>가역 관계: GRANT 후 REVOKE 가능</li>
                    <li>회수 후 재부여 가능</li>
                </ul>
                
                <h5>⚠️ 주의사항</h5>
                <ul>
                    <li>권한 체인 회수 시 CASCADE 옵션 필수</li>
                    <li>현재 접속 중인 세션에는 즉시 반영 안됨</li>
                    <li>시스템 권한은 더 신중하게 처리</li>
                </ul>
            `
        }
    },
    {
        id: 50,
        type: 'short',
        question: '트랜잭션의 변경 내용을 취소하는 명령어는?',
        answer: 'ROLLBACK',
        keywords: ['ROLLBACK', 'rollback', 'Rollback'],
        explanation: 'ROLLBACK은 트랜잭션 내에서 이루어진 변경 사항을 모두 되돌리고, 이전 상태로 복구합니다.',
        guide: {
            title: 'ROLLBACK - 트랜잭션 취소',
            content: `
                <h4>⏪ ROLLBACK 명령어 완전 가이드</h4>
                <p>ROLLBACK은 현재 트랜잭션의 변경사항을 취소하는 제어 명령어입니다.</p>
                
                <h5>🔹 기본 문법</h5>
                <div class="code-example">
                    <pre><code>ROLLBACK [WORK];

-- 또는 세이브포인트까지
ROLLBACK TO SAVEPOINT 세이브포인트명;</code></pre>
                </div>
                
                <h5>🔹 ROLLBACK의 역할</h5>
                <ul>
                    <li><strong>데이터 복원</strong>: 트랜잭션 시작 이전 상태로 되돌림</li>
                    <li><strong>록 해제</strong>: 트랜잭션이 걸어둔 모든 잠금 해제</li>
                    <li><strong>메모리 정리</strong>: 트랜잭션 관련 임시 데이터 제거</li>
                </ul>
                
                <h5>🔹 사용 예시</h5>
                <ul>
                    <li><strong>전체 취소</strong>:<br>
                    BEGIN TRANSACTION;<br>
                    UPDATE 학생 SET 성적=90 WHERE 학번='2023001';<br>
                    ROLLBACK; -- 변경사항 취소</li>
                    <li><strong>세이브포인트 활용</strong>:<br>
                    SAVEPOINT sp1;<br>
                    DELETE FROM 학생 WHERE 학년=1;<br>
                    ROLLBACK TO sp1; -- sp1으로 되돌리기</li>
                </ul>
                
                <h5>🔹 트랜잭션 제어 비교</h5>
                <table style="border: 1px solid #ddd; width: 100%;">
                    <tr><th>명령어</th><th>기능</th><th>결과</th></tr>
                    <tr><td>BEGIN</td><td>트랜잭션 시작</td><td>새로운 트랜잭션 생성</td></tr>
                    <tr><td>COMMIT</td><td>변경사항 확정</td><td>데이터베이스에 영구 반영</td></tr>
                    <tr><td>ROLLBACK</td><td>변경사항 취소</td><td>시작 이전 상태로 복구</td></tr>
                </table>
                
                <h5>🔹 자동 ROLLBACK 발생 상황</h5>
                <ul>
                    <li>시스템 오류 발생</li>
                    <li>데드락(Deadlock) 감지</li>
                    <li>제약조건 위반</li>
                    <li>사용자가 명시적으로 ROLLBACK 실행</li>
                </ul>
                
                <h5>⚠️ 주의사항</h5>
                <ul>
                    <li>ROLLBACK 후에는 다시 COMMIT이나 ROLLBACK 불가</li>
                    <li>세이브포인트를 활용한 부분 ROLLBACK 가능</li>
                    <li>DDL 명령어는 자동 COMMIT되어 ROLLBACK 불가</li>
                </ul>
            `
        }
    }
];