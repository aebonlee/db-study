# 5교시 - Oracle Buffer Cache 구조와 메모리 I/O 최적화 전략

### 🎯 학습 목표

- Buffer Cache의 구조와 역할을 이해하고 SQL 수행 시 어떤 방식으로 활용되는지 설명할 수 있다.
- 논리적 I/O(Logical I/O)와 물리적 I/O(Physical I/O)의 차이를 구분할 수 있다.
- Buffer Cache Hit Ratio의 개념과 튜닝 관점에서의 활용법을 학습한다.
- 비효율적인 SQL이 Buffer Cache를 독점할 수 있는 상황을 인지하고 대응 전략을 수립한다.

---

### 🧑‍🏫 강의 흐름 및 설명 내용

1. **[도입 – 5분]**
    
    “지금까지 SQL이 데이터를 어떻게 읽는지, 그리고 어떤 방식으로 Access 하는지를 배웠습니다.
    
    이번 시간에는 Oracle의 핵심 성능 결정 요소인 ‘Buffer Cache’를 알아보겠습니다.
    
    Oracle은 모든 데이터를 디스크에서 읽지 않습니다. **가장 먼저 이 Buffer Cache라는 메모리 공간에서 데이터를 찾습니다.**
    
    그리고 여기서 찾을 수 없을 때만 디스크 I/O가 발생합니다. 이 구조를 알면 튜닝이 절반은 끝났다고 할 수 있습니다.”
    

---

1. **[Buffer Cache 구조 설명 – 15분]**
    - Buffer Cache는 SGA(System Global Area)의 일부로, Oracle이 가장 먼저 데이터를 찾는 **캐시 메모리**
    - Block 단위로 저장되며, 최근 사용한 블록을 오래 유지하기 위해 LRU(Least Recently Used) 알고리즘을 사용
    - 구성 요소:
        - **Free Block**: 아직 사용되지 않았거나, 재사용 가능한 블록
        - **Pinned Block**: 현재 세션에서 접근 중인 블록 (다른 세션 대기 가능)
        - **Dirty Block**: 변경은 되었지만 아직 디스크에 쓰이지 않은 블록
    
    🧠 Oracle은 "논리적 I/O(Logical Read)" → Buffer Cache에서 읽는 것
    
    💾 "물리적 I/O(Physical Read)" → 디스크에서 블록을 읽는 것
    

---

1. **[Buffer Cache Hit Ratio 개념 설명 – 10분]**
    - Buffer Cache Hit Ratio =
        
        ```
        (1 - (Physical Reads / Logical Reads)) * 100
        ```
        
        - 90% 이상이면 일반적으로 ‘양호’
        - 그러나, **Hit Ratio만으로 절대 평가 금지**
    - 예외 사례 설명:
        - 일부 SQL이 매우 높은 Logical Read만 반복 → 전체 Hit Ratio는 높지만 전체 성능은 나쁠 수 있음
        - 즉, **“캐시를 잘 쓰고 있는지”가 아니라 “누가 캐시를 점유하고 있는지”를 봐야 함**

---

1. **[실습 – Buffer Cache 사용 패턴 분석 – 15분]**
    
    🔸 V$BH 또는 V$DB_CACHE_ADVICE 사용 (권한 있는 경우)
    
    ```sql
    
    SELECT COUNT(*) FROM V$BH WHERE STATUS = 'xcur';
    
    ```
    
    🔸 예시 SQL: Buffer Cache 내 Hit 시, 물리 I/O 발생 없음
    
    ```sql
    SET AUTOTRACE ON
    SELECT * FROM SALES WHERE SALE_ID = 1;
    SELECT * FROM SALES WHERE SALE_ID = 1;
    ```
    
    🔸 동일 SQL 2회 실행 후 물리적 I/O가 줄었는지 확인
    
    → 첫 실행은 디스크에서, 두 번째는 Buffer Cache에서 읽음
    
    🔸 부하 유발 SQL로 Cache 소비 확인
    
    ```sql
    SELECT * FROM SALES WHERE AMOUNT BETWEEN 1000 AND 5000;
    ```
    
    ➤ 해당 SQL이 대량 블록을 Access하며 Cache Hit을 유발
    
    ➤ 이때 다른 세션이 사용하는 중요한 블록들이 밀려나게 됨
    

---

1. **[Buffer Busy Waits 및 Cache 경합 설명 – 10분]**
    - **Buffer Busy Waits**: 여러 세션이 동시에 동일 블록에 접근하려 할 때 발생하는 대기 시간
    - **Latch: cache buffer chains**: LRU 내 블록 검색 시 동시성 제어 경합
    - 발생 원인:
        - Hot Block 집중 Access
        - 대용량 비효율 SQL 반복 실행
        - Full Scan이 자주 발생하며 Cache 오염
    
    ➤ 해결 전략:
    
    - SQL 튜닝: 범위 줄이기, 인덱스 활용
    - 자주 쓰는 테이블은 Keep Pool로 설정 (후속시간에 학습)

---

1. **[정리 및 마무리 – 5분]**
    - Buffer Cache는 성능 향상의 첫 관문이다.
    - 대부분의 튜닝은 **디스크 접근을 줄이는 것**이 아니라 **Buffer Cache를 잘 활용하는 것**에서 시작된다.
    - “Hit Ratio만 보지 말고, 누가 Cache를 점유하고 있는지 봐라.”
    - 대량 데이터를 반복 Access하는 잘못된 SQL이 시스템 전체의 Cache를 오염시킬 수 있다.

---

### 📝 과제

1. SALES 테이블에서 특정 조건의 반복 조회 SQL을 작성하여, 첫 실행과 반복 실행 간의 AUTOTRACE 결과 비교
2. V$SQL에서 EXECUTIONS 수치가 높은 SQL 중, Logical Reads가 과도한 SQL을 찾아 기록
3. Buffer Cache를 많이 사용하는 TOP SQL이 누구인지 V$SQL 또는 AWR로 탐색

---

### 🔧 실습환경 준비 사항

- Oracle 23 AI Free SQL Developer 환경 또는 웹 SQL
- `V$BH`, `V$SQL`, `DBMS_XPLAN`, `AUTOTRACE`, `V$DB_CACHE_ADVICE` 권한 확인
- Buffer Cache 관련 실습을 위해 SGA_TARGET이 설정된 환경 권장