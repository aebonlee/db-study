# 6교시 - Cursor Sharing 전략과 파라미터 튜닝 – 바인드 변수, CHILD CURSOR, 공유 실패 분석

### 🎯 학습 목표

- Oracle에서 SQL 공유를 위한 Cursor Sharing 메커니즘을 이해하고 설정 전략을 설명할 수 있다.
- 바인드 변수 사용이 SQL 공유와 시스템 성능에 미치는 영향을 분석할 수 있다.
- `V$SQL`, `V$SQL_SHARED_CURSOR` 뷰를 활용하여 **커서 공유 실패 원인과 Child Cursor 생성 사유**를 진단할 수 있다.
- 실습을 통해 하드파싱, 바인드 민감성, 옵티마이저 환경 차이에 따른 Cursor 분기 현상을 확인한다.

---

### 🧑‍🏫 강의 흐름 및 설명 내용

1. **[도입 – 5분]**
    
    “대규모 트랜잭션 시스템에서는 하루에도 수십만 개의 SQL이 발생합니다.
    
    그런데 이 SQL들이 매번 새로 파싱된다면, CPU와 Library Cache는 금방 병목 상태에 빠지게 됩니다.
    
    오늘은 Oracle이 동일 SQL을 얼마나 잘 공유하는지를 제어하는 핵심 설정인 **Cursor Sharing**,
    
    그리고 그 공유를 방해하는 원인들인 **바인드 민감성, 실행계획 차이, 환경 차이** 등을 실습을 통해 분석합니다.”
    

---

1. **[Cursor Sharing의 동작 원리 설명 – 10분]**
    - **하드파싱 vs 소프트파싱** 개념 복습
    - Cursor Sharing 종류:
        
        
        | 설정 | 설명 |
        | --- | --- |
        | `EXACT` (기본값) | SQL 문장 전체가 동일해야 공유됨 |
        | `FORCE` | Literal SQL도 바인드로 강제 변환 |
        | `SIMILAR` | 과거 사용되던 설정, 비추천 (11g 이상 미사용) |
    - 설정 변경 예:
        
        ```sql
        ALTER SYSTEM SET cursor_sharing = FORCE;
        ```
        
    - 바인드 변수 사용 시 Shared Cursor 수 감소 → CPU·Library Cache 부하 절감

---

1. **[실습 – 바인드 변수 유무에 따른 Cursor 생성 수 차이 확인 – 15분]**
    
    🔸 Literal SQL 반복 실행
    
    ```sql
    BEGIN
      FOR i IN 1..50 LOOP
        EXECUTE IMMEDIATE 'SELECT * FROM EMP WHERE EMPNO = ' || TO_CHAR(7000 + i);
      END LOOP;
    END;
    ```
    
    🔸 바인드 변수 사용 실행
    
    ```sql
    VARIABLE v_empno NUMBER;
    EXEC :v_empno := 7369;
    SELECT * FROM EMP WHERE EMPNO = :v_empno;
    ```
    
    🔸 커서 수 확인
    
    ```sql
    SELECT SQL_ID, COUNT(*) AS CHILD_COUNT
    FROM V$SQL
    WHERE SQL_TEXT LIKE 'SELECT * FROM EMP WHERE EMPNO%'
    GROUP BY SQL_ID;
    ```
    

---

1. **[Cursor Sharing 실패 원인 진단 – 10분]**
    - 동일 SQL이지만 Child Cursor가 여러 개 생성되는 이유:
        - 바인드 변수 사용 시 **Bind Type**이 서로 다름
        - **NLS 설정 값 차이**, **Optimizer 환경 변수 차이**
        - **Adaptive Plan** 사용 여부에 따라 실행계획이 다름
    
    🔎 진단 SQL:
    
    ```sql
    SELECT SQL_ID, CHILD_NUMBER, REASON
    FROM V$SQL_SHARED_CURSOR
    WHERE SQL_ID = '해당_SQL_ID';
    ```
    
    ➤ REASON 예시: BIND_MISMATCH, OPTIMIZER_MISMATCH, LANGUAGE_MISMATCH 등
    

---

1. **[튜닝 전략 및 시스템 파라미터 설정 가이드 – 10분]**
    - 바인드 변수 표준화:
        - 숫자 → TO_NUMBER
        - 날짜 → TO_DATE
        - 문자열 → VARCHAR2 고정
    - `session_cached_cursors` 활용 (세션 커서 재사용 수):
        
        ```sql
        ALTER SYSTEM SET session_cached_cursors = 100;
        ```
        
    - Shared Pool 경합 방지:
        - 바인드 변수 남용도 피해야 함 → 과도한 Plan Sharing으로 인한 성능 저하 발생 가능

---

1. **[정리 및 마무리 – 5분]**
    - SQL 공유는 튜닝보다 더 중요한 **시스템 효율의 핵심 조건**
    - 커서가 공유되지 않는 이유를 모르면, 파싱 대란으로 이어질 수 있음
    - “성능 좋은 SQL은 잘 짜인 SQL이 아니라, **잘 공유되는 SQL**이다.”

---

### 📝 과제

1. 동일 구조 SQL을 Literal, 바인드 방식으로 각각 50회 실행하고 Child Cursor 수 비교
2. `V$SQL_SHARED_CURSOR`를 활용해 공유 실패 사유를 캡처하고 사유별로 정리
3. Cursor Sharing 설정 변경(`EXACT` → `FORCE`)에 따른 Cursor 공유율 비교 실험

---

### 🔧 실습환경 준비 사항

- Oracle 23 AI Free SQL Developer 환경
- SYS 또는 DBA 권한으로 시스템 파라미터 변경 가능
- `V$SQL`, `V$SQLAREA`, `V$SQL_SHARED_CURSOR`, `DBMS_XPLAN.DISPLAY_CURSOR` 접근 가능