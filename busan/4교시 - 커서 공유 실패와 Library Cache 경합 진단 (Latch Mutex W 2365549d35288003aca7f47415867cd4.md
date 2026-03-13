# 4교시 - 커서 공유 실패와 Library Cache 경합 진단 (Latch / Mutex Wait 분석)

### 🎯 학습 목표

- SQL 커서 공유 실패가 발생하는 다양한 원인을 실습을 통해 식별할 수 있다.
- Library Cache 구조에서 발생하는 Latch와 Mutex 경합 현상의 원리를 이해한다.
- 경합 발생 시 성능 저하 증상을 관찰하고 진단 쿼리를 통해 병목 구간을 식별할 수 있다.
- 하드파싱, 커서 증가, 경합 방지를 위한 실무적 대응 방안을 제시할 수 있다.

### 🎯 학습 목표 요약

- **SQL 파싱 방식**(Hard Parsing vs Soft Parsing)의 차이를 정확히 이해한다.
- **SQL 공유 실패의 원인**과 이를 진단하는 방법을 습득한다.
- **Library Cache에서 발생하는 Latch, Mutex Wait** 구조를 파악하고 문제 발생 시 시스템 병목 지점을 찾아낼 수 있다.
- **SQL 커서 공유 실패를 방지하는 튜닝 전략**을 실제로 적용한다.

---

### 🧩 주요 학습 개념 요약

| 구분 | 내용 |
| --- | --- |
| 하드파싱 | SQL 구문 분석 + 실행계획 생성 → CPU 사용량 증가 + 경합 발생 |
| 소프트파싱 | 기존 실행계획 재사용 → 빠른 처리, 경합 없음 |
| 커서 공유 실패 | SQL이 공유되지 못해 Child Cursor가 계속 생성되는 현상 |
| 원인 | Literal SQL, 바인드 타입 불일치, 옵티마이저 환경 차이 등 |
| 진단 도구 | `V$SQL`, `V$SQLAREA`, `V$SQL_SHARED_CURSOR`, `V$SYSTEM_EVENT` |
| 경합 종류 | Latch Wait (`library cache latch`), Mutex Wait (`cursor: pin S wait on X`) |

---

### 🧑‍🏫 강의 흐름 및 설명 내용

1. **[도입 – 5분]**
    
    “우리가 아무리 SQL을 잘 작성해도, 그 SQL이 과도하게 파싱되거나 재사용되지 않는다면 시스템은 점점 느려질 수밖에 없습니다.
    
    특히 대규모 시스템에서는 공유 풀 내의 커서 경합이 발생하여 대기 시간(Mutex Wait)이 급증합니다.
    
    오늘은 커서 공유 실패가 성능에 어떤 문제를 유발하고, 어떻게 진단하고 대응하는지를 함께 실습해 보겠습니다.”
    

---

1. **[커서 공유 실패 원인과 분류 – 10분]**
    - **Child Cursor가 계속 생성되는 상황**
        - Literal SQL 사용
        - NLS 설정 값 차이
        - 바인드 변수 사용 중 데이터 타입 불일치
        - CURSOR_SHARING 설정 충돌
        - 실행계획 변화 (Adaptive Plan)
    
    🔎 진단 쿼리:
    
    ```sql
    SELECT sql_id, sql_text, child_number, executions, is_bind_sensitive, is_bind_aware
    FROM v$sql
    WHERE sql_text LIKE 'SELECT * FROM EMP WHERE EMPNO%';
    ```
    
    ➤ `CHILD_NUMBER`가 여러 개 → 공유 실패
    

---

1. **[Latch와 Mutex Wait 개념 설명 – 10분]**
    - **Latch**: Oracle의 Lightweight Lock, 메모리 내 데이터 구조 보호용
        - 예: Library Cache Latch
    - **Mutex**: 10g 이후 Latch 경합을 줄이기 위해 도입된 더 세분화된 락
        - 예: Cursor Pin S Wait on X, Library Cache: Mutex X
    - 경합 발생 시 CPU 대기, 공유 풀 경합, 파싱 지연 → 전체 시스템 성능 저하
    - 📌 대기 이벤트 확인:
        
        ```sql
        SELECT event, total_waits, time_waited
        FROM v$system_event
        WHERE event LIKE '%library cache%' OR event LIKE '%cursor%';
        ```
        

---

1. **[실습 – 공유 실패 유발 및 경합 분석 – 15분]**
    
    🔸 하드파싱 유발 SQL 반복 실행
    
    ```sql
    BEGIN
      FOR i IN 1..1000 LOOP
        EXECUTE IMMEDIATE 'SELECT * FROM EMP WHERE EMPNO = ' || TO_CHAR(7000 + i);
      END LOOP;
    END;
    ```
    
    🔸 커서 수 확인
    
    ```sql
    SELECT sql_id, COUNT(*) AS child_cursors
    FROM v$sql
    WHERE sql_text LIKE 'SELECT * FROM EMP WHERE EMPNO%'
    GROUP BY sql_id;
    ```
    
    🔸 공유 실패 이유 확인 (v$sql_shared_cursor)
    
    ```sql
    SELECT sql_id, child_number, reason
    FROM v$sql_shared_cursor
    WHERE sql_id = '해당_SQL_ID';
    ```
    
    ➤ `REASON` 열에 ‘Bind Mismatch’, ‘Different Optimizer Env’ 등 공유 실패 사유 표시
    
    ### 🧪 실습 요약
    
    1. **하드파싱 유도**
        
        ```sql
        BEGIN
          FOR i IN 1..1000 LOOP
            EXECUTE IMMEDIATE 'SELECT * FROM EMP WHERE EMPNO = ' || TO_CHAR(7000 + i);
          END LOOP;
        END;
        ```
        
    2. **SQL 커서 공유 상태 확인**
        
        ```sql
        SELECT SQL_ID, CHILD_NUMBER, EXECUTIONS
        FROM V$SQL
        WHERE SQL_TEXT LIKE 'SELECT * FROM EMP WHERE EMPNO%';
        ```
        
    3. **공유 실패 사유 확인**
        
        ```sql
        SELECT SQL_ID, CHILD_NUMBER, REASON
        FROM V$SQL_SHARED_CURSOR
        WHERE SQL_ID = '해당_SQL_ID';
        ```
        
    4. **Wait Event 확인**
        
        ```sql
        SELECT EVENT, TOTAL_WAITS, TIME_WAITED
        FROM V$SYSTEM_EVENT
        WHERE EVENT LIKE '%library%' OR EVENT LIKE '%cursor%';
        ```
        

---

1. **[대응 방안 및 설정 전략 – 10분]**
    - 바인드 변수 표준화 → Literal 제거
    - CURSOR_SHARING = FORCE or SIMILAR 검토
    - `session_cached_cursors` 파라미터 조정 (Default 50)
        - 많이 사용하는 커서 세션 단위로 캐시 가능
    - 커서 재사용 유도를 위한 바인드 타입 표준화 (TO_NUMBER, TO_CHAR 등으로 통일)

---

1. **[정리 및 마무리 – 5분]**
    - 커서 공유 실패는 단순한 실행계획 이슈가 아닌, **시스템 전체 성능을 잠식하는 병목 현상**
    - 공유 실패 원인을 정확히 진단하고 반복 커서 생성을 막는 것이 DBA의 핵심 역할
    - “좋은 SQL이란, 한 번 만들어져서 수천 번 재사용되는 SQL이다.
        
        튜닝은 코드가 아니라 캐시와 경합을 줄이는 일이다.”
        

---

### ⚠️ 실무 적용 시 주의점

- 커서 공유 실패는 시스템 성능 저하의 핵심 원인 중 하나
- Literal SQL 대신 바인드 변수 사용
- `CURSOR_SHARING` 설정 고려 (FORCE, SIMILAR 등)
- `session_cached_cursors` 조정으로 세션별 커서 재사용률 향상
- 히스토그램, NLS 환경, 실행계획 캐시 정책 차이로도 공유 실패 가능

---

### 💡 핵심 문장 요약

- “하드파싱은 성능의 적, 소프트파싱은 성능의 친구다.”
- “커서가 공유되지 않으면, 시스템은 자원을 낭비하고 경합에 빠진다.”
- “우리는 SQL이 어떻게 실행되는지를 넘어서, **왜 그렇게 실행되는지를 해석할 수 있어야 한다.**”

---

### 📝 과제

1. 하드파싱을 유발하는 SQL을 반복 실행하여 공유 실패 발생 여부 실험
2. `V$SQL_SHARED_CURSOR`를 활용하여 공유 실패 이유 분석 및 캡처
3. `CURSOR_SHARING` 설정 변경 전후 성능 차이와 경합 완화 여부 관찰
4. 동일 SQL 구조지만 리터럴 값만 다른 SQL을 10회 이상 실행하고

→ `V$SQLAREA`, `V$SQL_SHARED_CURSOR`에서 커서 수 확인

1. `CURSOR_SHARING = FORCE`로 변경 후 커서 공유 개선 여부 확인
2. 공유 실패 이유를 기준으로 ‘튜닝 가능 항목’과 ‘불가항목’을 정리하기

---

### 🔧 실습환경 준비 사항

- Oracle 23 AI Free SQL Developer 환경
- SYS 또는 DBA 권한으로 `FLUSH SHARED_POOL`, `ALTER SYSTEM` 가능
- `V$SQL`, `V$SQLAREA`, `V$SQL_SHARED_CURSOR`, `V$SYSTEM_EVENT` 조회 가능