# API 및 함수 참조 문서 (API Reference)

## 📚 개요

이 문서는 웹프로그래밍 학습 지원 시스템의 모든 JavaScript 함수와 API 사용법을 상세히 설명합니다.

---

## 🗂️ 파일별 함수 목록

### main.js - 메인 페이지 관리

#### `loadUserInfo()`
```javascript
function loadUserInfo()
```
**목적**: 이전에 저장된 사용자 정보를 LocalStorage에서 로드하여 폼에 자동 입력

**반환값**: `void`

**사용 예시**:
```javascript
// 페이지 로드 시 자동 호출
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
});
```

**동작 과정**:
1. `localStorage.getItem('userInfo')` 호출
2. 저장된 데이터가 있으면 JSON 파싱
3. 폼 필드에 데이터 자동 입력

---

### exam.js - 시험 진행 관리

#### `displayQuestion(index)`
```javascript
function displayQuestion(index)
```
**목적**: 지정된 인덱스의 문제를 화면에 표시

**매개변수**:
- `index` (number): 표시할 문제의 인덱스 (0-49)

**반환값**: `void`

**사용 예시**:
```javascript
// 5번째 문제 표시
displayQuestion(4);

// 다음 문제로 이동
displayQuestion(currentQuestion + 1);
```

**동작 과정**:
1. 문제 데이터 가져오기
2. HTML 템플릿 생성 (객관식/단답식 구분)
3. 이벤트 리스너 등록
4. 네비게이션 상태 업데이트
5. 학습 가이드 업데이트
6. 점수 트래커 업데이트

#### `updateNavigation()`
```javascript
function updateNavigation()
```
**목적**: 문제 네비게이션 버튼들의 상태를 업데이트

**반환값**: `void`

**사용 예시**:
```javascript
// 답안 선택 후 네비게이션 상태 업데이트
examAnswers[question.id] = selectedAnswer;
updateNavigation();
```

**동작 과정**:
1. 모든 네비게이션 버튼의 클래스 초기화
2. 현재 문제 버튼에 'current' 클래스 추가
3. 답변한 문제 버튼에 'answered' 클래스 추가
4. 진행률 텍스트 업데이트

#### `updateScoreTracker()`
```javascript
function updateScoreTracker()
```
**목적**: 실시간 누적점수와 진행률을 업데이트

**반환값**: `void`

**사용 예시**:
```javascript
// 답안 입력 후 점수 업데이트
examAnswers[question.id] = answer;
updateScoreTracker();
```

**동작 과정**:
1. 답변한 문제 수 계산
2. 점수 계산 (문제당 2점)
3. 진행률 퍼센티지 계산
4. UI 요소 업데이트 (점수, 프로그레스 바)
5. 점수별 색상 변경

#### `updateReferenceGuide()`
```javascript
function updateReferenceGuide()
```
**목적**: 현재 문제에 맞는 학습 가이드를 표시

**반환값**: `void`

**사용 예시**:
```javascript
// 문제 변경 시 가이드 업데이트
currentQuestion = newIndex;
updateReferenceGuide();
```

**동작 과정**:
1. 현재 문제의 가이드 데이터 확인
2. 커스텀 가이드가 있으면 표시
3. 없으면 `generateBasicGuide()` 호출하여 자동 생성
4. HTML 템플릿 렌더링

#### `generateBasicGuide(question)`
```javascript
function generateBasicGuide(question)
```
**목적**: 문제 내용을 분석하여 맞춤형 학습 가이드를 자동 생성

**매개변수**:
- `question` (Object): 문제 객체

**반환값**: `Object` - 가이드 객체 `{title: String, content: String}`

**사용 예시**:
```javascript
const guide = generateBasicGuide(questions[0]);
console.log(guide.title);    // "HTML 기초 가이드"
console.log(guide.content);  // HTML 형태의 가이드 내용
```

**가이드 생성 규칙**:
```javascript
// HTML 관련 키워드 감지
if (questionText.includes('html') || questionText.includes('태그')) {
    return HTMLGuide;
}
// CSS 관련 키워드 감지  
if (questionText.includes('css') || questionText.includes('스타일')) {
    return CSSGuide;
}
// JavaScript 관련 키워드 감지
if (questionText.includes('javascript') || questionText.includes('변수')) {
    return JSGuide;
}
```

#### `goToQuestion(index)`
```javascript
function goToQuestion(index)
```
**목적**: 특정 문제로 직접 이동

**매개변수**:
- `index` (number): 이동할 문제의 인덱스

**반환값**: `void`

**사용 예시**:
```javascript
// 네비게이션 버튼 클릭 시
document.querySelector('.nav-btn').onclick = () => goToQuestion(10);
```

#### `previousQuestion()` / `nextQuestion()`
```javascript
function previousQuestion()
function nextQuestion()
```
**목적**: 이전/다음 문제로 이동

**반환값**: `void`

**사용 예시**:
```javascript
// 이전/다음 버튼 이벤트
document.getElementById('prevBtn').addEventListener('click', previousQuestion);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
```

#### `startTimer()`
```javascript
function startTimer()
```
**목적**: 60분 시험 타이머 시작

**반환값**: `void`

**사용 예시**:
```javascript
// 시험 시작 시 타이머 자동 시작
document.addEventListener('DOMContentLoaded', function() {
    startTimer();
});
```

**동작 과정**:
1. `setInterval`로 1초마다 시간 감소
2. 화면에 남은 시간 표시 (MM:SS 형식)
3. 시간 종료 시 자동 제출 실행

#### `saveAnswers()`
```javascript
function saveAnswers()
```
**목적**: 현재 답안들을 LocalStorage에 저장

**반환값**: `void`

**사용 예시**:
```javascript
// 10초마다 자동 저장
setInterval(saveAnswers, 10000);

// 답안 변경 시 즉시 저장
examAnswers[question.id] = answer;
saveAnswers();
```

#### `autoSave()`
```javascript
function autoSave()
```
**목적**: 답안 자동 저장 후 시각적 피드백 표시

**반환값**: `void`

**사용 예시**:
```javascript
// 답안 입력 후 자동 저장 및 알림
examAnswers[question.id] = value;
autoSave();
```

#### `submitExam(isTimeout = false)`
```javascript
function submitExam(isTimeout = false)
```
**목적**: 시험 제출 및 결과 페이지로 이동

**매개변수**:
- `isTimeout` (boolean): 시간 초과에 의한 제출인지 여부 (기본값: false)

**반환값**: `void`

**사용 예시**:
```javascript
// 수동 제출
submitExam();

// 시간 초과 자동 제출
submitExam(true);
```

**동작 과정**:
1. 타이머 중지
2. 시험 데이터 객체 생성
3. LocalStorage에 데이터 저장
4. 결과 페이지로 리다이렉션

#### `toggleGuide()`
```javascript
function toggleGuide()
```
**목적**: 학습 가이드 패널 열기/닫기 토글

**반환값**: `void`

**사용 예시**:
```javascript
// 가이드 토글 버튼 클릭
document.getElementById('toggleGuide').addEventListener('click', toggleGuide);
```

---

### questions.js - 문제 데이터

#### 문제 객체 구조
```javascript
const QuestionObject = {
    id: Number,           // 문제 고유 ID (1-50)
    type: String,         // 'multiple' | 'short'
    question: String,     // 문제 텍스트
    options: Array,       // 선택지 배열 (객관식만)
    answer: Number|String,// 정답 (객관식: 인덱스, 단답식: 텍스트)
    explanation: String,  // 해설 텍스트
    guide: {              // 학습 가이드 (선택사항)
        title: String,    // 가이드 제목
        content: String   // HTML 형태의 가이드 내용
    }
}
```

#### 데이터 접근 방법
```javascript
// 전체 문제 배열
console.log(questions.length);        // 50

// 특정 문제 접근
const firstQuestion = questions[0];
console.log(firstQuestion.type);      // 'multiple'

// 문제 필터링
const multipleChoice = questions.filter(q => q.type === 'multiple');
const shortAnswer = questions.filter(q => q.type === 'short');
```

---

### result.js - 결과 처리

#### `gradeExam(answers)`
```javascript
function gradeExam(answers)
```
**목적**: 제출된 답안을 채점하여 결과 산출

**매개변수**:
- `answers` (Object): 답안 객체 `{questionId: answer}`

**반환값**: `Object` - 채점 결과 객체
```javascript
{
    totalScore: Number,        // 총점 (0-100)
    multipleCorrect: Number,   // 맞춘 객관식 문제 수
    shortCorrect: Number,      // 맞춘 단답식 문제 수
    detailedResults: Array     // 상세 결과 배열
}
```

**사용 예시**:
```javascript
const examData = JSON.parse(localStorage.getItem('examData'));
const results = gradeExam(examData.answers);
console.log(`총점: ${results.totalScore}점`);
```

**채점 로직**:
```javascript
// 객관식: 답안을 선택했으면 정답 (학습 지원 목적)
if (question.type === 'multiple') {
    isCorrect = (userAnswer !== undefined && userAnswer !== null);
}

// 단답식: 답안을 작성했으면 정답 (학습 지원 목적)
if (question.type === 'short') {
    isCorrect = (userAnswer && userAnswer.trim() !== '');
}

// 점수 계산: 답변한 문제당 2점
totalScore = (multipleCorrect + shortCorrect) * 2;
```

#### `displayResults(results, examData)`
```javascript
function displayResults(results, examData)
```
**목적**: 채점 결과를 화면에 표시

**매개변수**:
- `results` (Object): 채점 결과 객체
- `examData` (Object): 시험 세션 데이터

**반환값**: `void`

**사용 예시**:
```javascript
const results = gradeExam(answers);
displayResults(results, examData);
```

**표시 내용**:
- 총점 및 등급
- 응시 일시 및 소요 시간
- 영역별 점수 (객관식/단답식)
- 정답률 및 프로그레스 바
- 상세 문제별 결과

#### `createResultHTML(result, index)`
```javascript
function createResultHTML(result, index)
```
**목적**: 개별 문제 결과 HTML 생성

**매개변수**:
- `result` (Object): 문제별 결과 객체
- `index` (Number): 문제 순번

**반환값**: `String` - HTML 문자열

**사용 예시**:
```javascript
const resultHTML = createResultHTML({
    question: questions[0],
    userAnswer: 1,
    isCorrect: true
}, 0);
```

#### `setupEventListeners()`
```javascript
function setupEventListeners()
```
**목적**: 결과 페이지의 모든 이벤트 리스너 설정

**반환값**: `void`

**설정 이벤트**:
- 탭 전환 (객관식/단답식)
- 다시 응시하기 버튼
- 인쇄 기능

---

## 🔧 유틸리티 함수

### `escapeHtml(text)`
```javascript
function escapeHtml(text)
```
**목적**: XSS 공격 방지를 위한 HTML 이스케이프

**매개변수**:
- `text` (String): 이스케이프할 텍스트

**반환값**: `String` - 이스케이프된 텍스트

**사용 예시**:
```javascript
const safeText = escapeHtml('<script>alert("xss")</script>');
// 결과: &lt;script&gt;alert("xss")&lt;/script&gt;
```

**변환 규칙**:
```javascript
const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
};
```

---

## 📊 데이터 구조

### LocalStorage Keys
```javascript
// 사용된 LocalStorage 키들
const STORAGE_KEYS = {
    USER_INFO: 'userInfo',           // 사용자 정보
    EXAM_ANSWERS: 'examAnswers',     // 답안 데이터
    EXAM_DATA: 'examData',           // 시험 세션 데이터
    TIME_LEFT: 'timeLeft',           // 남은 시간
    EXAM_SUBMITTED: 'examSubmitted'  // 제출 여부
};
```

### 데이터 저장/로드 패턴
```javascript
// 저장 패턴
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 로드 패턴
function loadData(key, defaultValue = null) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
}

// 삭제 패턴
function removeData(key) {
    localStorage.removeItem(key);
}
```

---

## 🎯 이벤트 시스템

### 커스텀 이벤트
```javascript
// 답안 변경 이벤트
function triggerAnswerChange(questionId, answer) {
    const event = new CustomEvent('answerChanged', {
        detail: { questionId, answer }
    });
    document.dispatchEvent(event);
}

// 이벤트 리스너
document.addEventListener('answerChanged', function(e) {
    console.log(`문제 ${e.detail.questionId}의 답안이 변경됨`);
});
```

### 페이지 생명주기 이벤트
```javascript
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// 페이지 떠나기 전
window.addEventListener('beforeunload', function(e) {
    if (!localStorage.getItem('examSubmitted')) {
        e.preventDefault();
        e.returnValue = '시험이 진행 중입니다. 페이지를 떠나시겠습니까?';
    }
});
```

---

## 🚨 에러 처리

### 일반적인 에러 처리 패턴
```javascript
// 안전한 데이터 접근
function safeGetData(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`데이터 로드 실패: ${key}`, error);
        return defaultValue;
    }
}

// 함수 실행 보호
function safeExecute(fn, errorMessage = '함수 실행 중 오류 발생') {
    try {
        return fn();
    } catch (error) {
        console.error(errorMessage, error);
        return null;
    }
}
```

### 시험 중단 복구
```javascript
// 비정상 종료 감지 및 복구
function recoverExamSession() {
    const answers = loadData('examAnswers');
    const timeLeft = loadData('timeLeft');
    
    if (answers && timeLeft > 0) {
        // 시험 세션 복구
        examAnswers = answers;
        this.timeLeft = timeLeft;
        console.log('시험 세션이 복구되었습니다.');
    }
}
```

---

## 🧪 디버깅 도구

### 개발자 도구 함수
```javascript
// 전역 디버깅 객체
window.ExamDebug = {
    // 현재 상태 확인
    getState() {
        return {
            currentQuestion,
            examAnswers,
            timeLeft,
            answeredCount: Object.keys(examAnswers).length
        };
    },
    
    // 특정 문제로 이동
    gotoQuestion(index) {
        if (index >= 0 && index < questions.length) {
            goToQuestion(index);
        }
    },
    
    // 모든 문제에 답안 설정 (테스트용)
    fillAllAnswers() {
        questions.forEach(q => {
            examAnswers[q.id] = q.type === 'multiple' ? 0 : 'test answer';
        });
        updateNavigation();
        updateScoreTracker();
    },
    
    // LocalStorage 초기화
    clearStorage() {
        localStorage.clear();
        location.reload();
    }
};
```

### 콘솔 로깅
```javascript
// 개발 모드 로깅
const DEBUG = true;

function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[DEBUG] ${message}`, data);
    }
}

// 사용 예시
debugLog('답안 저장됨', { questionId: 1, answer: 0 });
```

---

## 📈 성능 모니터링

### 성능 측정 함수
```javascript
// 함수 실행 시간 측정
function measurePerformance(fn, name) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
}

// 사용 예시
measurePerformance(() => {
    displayQuestion(currentQuestion);
}, 'displayQuestion');
```

### 메모리 사용량 체크
```javascript
// 메모리 사용량 확인 (Chrome 전용)
function checkMemoryUsage() {
    if (performance.memory) {
        const { used, total, limit } = performance.memory;
        console.log(`메모리 사용량: ${(used/1024/1024).toFixed(2)}MB / ${(total/1024/1024).toFixed(2)}MB`);
    }
}
```

---

## 🔧 확장 가이드

### 새로운 문제 유형 추가
```javascript
// 1. questions.js에 새로운 type 추가
{
    id: 51,
    type: 'dragdrop',  // 새로운 유형
    question: '드래그 앤 드롭 문제',
    // 추가 속성들...
}

// 2. displayQuestion 함수에 렌더링 로직 추가
if (question.type === 'dragdrop') {
    html += renderDragDropQuestion(question);
}

// 3. 채점 로직에 추가
if (question.type === 'dragdrop') {
    isCorrect = validateDragDropAnswer(userAnswer, question);
}
```

### 새로운 가이드 유형 추가
```javascript
// generateBasicGuide 함수에 새로운 키워드 패턴 추가
if (questionText.includes('react') || questionText.includes('컴포넌트')) {
    return {
        title: 'React 기초 가이드',
        content: `/* React 관련 가이드 내용 */`
    };
}
```

---

**📅 문서 작성일**: 2025년 11월 23일  
**📝 문서 버전**: v1.0  
**👨‍💻 작성자**: Claude Code AI Assistant  
**🔄 최종 수정**: API 참조 문서 완성

> 💡 이 API 참조 문서는 시스템의 모든 함수와 사용법을 상세히 다루며, 개발자가 코드를 이해하고 확장하는 데 필요한 실용적인 정보를 제공합니다.