# 기술 명세서

## 시스템 아키텍처

### 1. 클라이언트 사이드 아키텍처
```
┌─────────────────────────────────────┐
│         웹 브라우저 (Client)          │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │    Presentation Layer       │    │
│  │  (HTML, CSS, JavaScript)    │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │     Business Logic          │    │
│  │  (exam.js, result.js)       │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │      Data Storage           │    │
│  │     (LocalStorage)          │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

## 데이터 구조

### 1. 문제 데이터 구조
```javascript
{
    id: Number,           // 문제 고유 ID
    type: String,         // 'multiple' | 'short'
    question: String,     // 문제 내용
    options: Array,       // 객관식 선택지 (객관식만)
    answer: Number|String,// 정답
    keywords: Array,      // 키워드 배열 (단답식만)
    explanation: String   // 해설
}
```

### 2. 사용자 정보 구조
```javascript
{
    name: String,         // 사용자 이름
    email: String,        // 이메일
    startTime: String     // 시작 시간 (ISO 8601)
}
```

### 3. 시험 데이터 구조
```javascript
{
    userInfo: Object,     // 사용자 정보
    answers: Object,      // {questionId: answer}
    startTime: String,    // 시작 시간
    endTime: String,      // 종료 시간
    timeSpent: Number,    // 소요 시간 (초)
    isTimeout: Boolean    // 시간 초과 여부
}
```

## LocalStorage 키 명세

| 키 이름 | 데이터 타입 | 설명 | 생명주기 |
|--------|------------|------|---------|
| `userInfo` | JSON String | 사용자 정보 | 영구 |
| `examAnswers` | JSON String | 시험 답안 | 시험 종료 시까지 |
| `timeLeft` | String | 남은 시간 (초) | 시험 종료 시까지 |
| `examData` | JSON String | 완료된 시험 데이터 | 영구 |
| `examSubmitted` | String | 제출 여부 | 다시 응시 시까지 |

## API 함수 명세

### main.js

#### `loadUserInfo()`
- **설명**: 저장된 사용자 정보 로드
- **매개변수**: 없음
- **반환값**: void
- **부작용**: 폼 필드에 값 설정

### exam.js

#### `displayQuestion(index)`
- **설명**: 특정 인덱스의 문제 표시
- **매개변수**: 
  - `index` (Number): 문제 인덱스
- **반환값**: void
- **부작용**: DOM 업데이트

#### `saveAnswers()`
- **설명**: 현재 답안을 LocalStorage에 저장
- **매개변수**: 없음
- **반환값**: void
- **부작용**: LocalStorage 업데이트

#### `startTimer()`
- **설명**: 60분 타이머 시작
- **매개변수**: 없음
- **반환값**: void
- **부작용**: 타이머 인터벌 설정

#### `submitExam(isTimeout)`
- **설명**: 시험 제출 처리
- **매개변수**:
  - `isTimeout` (Boolean): 시간 초과 여부
- **반환값**: void
- **부작용**: LocalStorage 업데이트, 페이지 이동

### result.js

#### `gradeExam(answers)`
- **설명**: 답안 채점
- **매개변수**:
  - `answers` (Object): 사용자 답안
- **반환값**: Object (채점 결과)
- **순수 함수**: 예

#### `displayResults(results, examData)`
- **설명**: 채점 결과 화면 표시
- **매개변수**:
  - `results` (Object): 채점 결과
  - `examData` (Object): 시험 데이터
- **반환값**: void
- **부작용**: DOM 업데이트

## 이벤트 처리

### 전역 이벤트
| 이벤트 | 핸들러 | 설명 |
|--------|--------|------|
| `DOMContentLoaded` | 초기화 함수 | 페이지 로드 완료 시 |
| `beforeunload` | 경고 표시 | 페이지 이탈 시 |
| `copy` | 방지 | 복사 시도 시 |
| `paste` | 방지 | 붙여넣기 시도 시 |

### 폼 이벤트
| 이벤트 | 대상 | 핸들러 |
|--------|------|---------|
| `submit` | userForm | 시험 시작 |
| `click` | 문제 옵션 | 답안 선택 |
| `input` | 단답식 입력 | 답안 저장 |

## 스타일 가이드

### CSS 변수
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    --dark-color: #1f2937;
    --light-color: #f3f4f6;
    --border-color: #e5e7eb;
    --text-color: #374151;
    --success-color: #22c55e;
}
```

### 반응형 브레이크포인트
- **모바일**: < 768px
- **태블릿**: 768px - 1024px
- **데스크톱**: > 1024px

## 성능 최적화

### 1. DOM 조작 최소화
- 문제 전환 시 innerHTML 한 번만 사용
- 이벤트 위임 패턴 활용

### 2. 타이머 최적화
- `setInterval` 대신 `requestAnimationFrame` 고려
- 1초 단위 업데이트로 성능 부담 감소

### 3. LocalStorage 최적화
- JSON 파싱/문자열화 최소화
- 자동 저장 간격 10초 설정

## 보안 고려사항

### 1. 클라이언트 사이드 제한
- 모든 데이터가 클라이언트에 노출
- 답안 조작 가능성 존재

### 2. 보안 강화 방안
- 복사/붙여넣기 방지
- 개발자 도구 감지 (선택적)
- 우클릭 방지 (선택적)

### 3. 향후 서버 사이드 구현 시
- 답안 암호화 전송
- 서버 사이드 타이머
- 서버 사이드 채점

## 브라우저 호환성

### 필수 요구사항
| 기능 | 최소 버전 |
|------|----------|
| LocalStorage | IE 8+ |
| ES6 문법 | Chrome 51+ |
| CSS Grid | Chrome 57+ |
| Flexbox | Chrome 29+ |

### 지원 브라우저
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 접근성 (WCAG 2.1)

### 레벨 A 준수
- [x] 대체 텍스트 제공
- [x] 키보드 접근성
- [x] 페이지 언어 명시

### 레벨 AA 준수
- [x] 색상 대비 4.5:1 이상
- [x] 텍스트 크기 조절 가능
- [x] 포커스 표시

## 테스트 전략

### 단위 테스트
- 채점 로직 테스트
- 타이머 함수 테스트
- 데이터 검증 테스트

### 통합 테스트
- 전체 시험 플로우
- 자동 저장 및 복구
- 결과 페이지 정확성

### E2E 테스트
- 사용자 시나리오 테스트
- 브라우저 간 호환성
- 반응형 디자인

## 배포 고려사항

### 정적 호스팅
- GitHub Pages
- Netlify
- Vercel

### CDN 설정
- 정적 자원 캐싱
- 압축 (gzip/brotli)
- 이미지 최적화

### 모니터링
- Google Analytics
- 에러 트래킹
- 사용자 행동 분석

---

*이 문서는 시스템의 기술적 세부사항을 명세합니다.*