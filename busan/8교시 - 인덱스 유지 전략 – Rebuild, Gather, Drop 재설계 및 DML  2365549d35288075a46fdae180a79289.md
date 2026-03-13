# 8교시 - 인덱스 유지 전략 – Rebuild, Gather, Drop/재설계 및 DML 성능 연계 전략

### 🎯 학습 목표

- 인덱스의 상태, 조각화, 사용률 등을 점검하고 **유지 전략(Rebuild, Gather, Drop)**을 결정할 수 있다.
- 불필요한 인덱스를 식별하고 DML 성능 저하와의 연관성을 분석할 수 있다.
- 인덱스의 **재사용률**, **클러스터링 팩터**, **BLEVEL**, **LEAF_BLOCKS** 등을 활용하여 유지/제거 판단을 내릴 수 있다.
- 대용량 테이블의 인덱스 유지 관리 기준과 통계 갱신 시점 등을 실습할 수 있다.

---

### 🧑‍🏫 강의 흐름 및 설명 내용

1. **[도입 – 5분]**
    
    “우리는 지금까지 인덱스를 만드는 방법과 활용 전략을 배워 왔습니다.
    
    그런데 실제 운영 환경에서는 **인덱스를 만든 후에도 관리하지 않으면 성능 저하**가 발생합니다.
    
    이번 시간에는 인덱스를 삭제해야 할 때, 재생성해야 할 때, 통계를 갱신해야 할 때를 판단하고
    
    이를 SQL 튜닝과 DML 튜닝 관점에서 연계해보겠습니다.”
    

---

1. **[인덱스 구조 진단 기준 정리 – 10분]**
    
    ▶ 인덱스 구조 확인
    
    ```sql
    SELECT INDEX_NAME, BLEVEL, LEAF_BLOCKS, DISTINCT_KEYS, CLUSTERING_FACTOR
    FROM USER_INDEXES
    WHERE TABLE_NAME = 'EMP';
    ```
    
    ▶ 진단 항목
    
    | 항목 | 의미 | 이상 징후 |
    | --- | --- | --- |
    | BLEVEL | 인덱스 트리 깊이 | 3 이상이면 Rebuild 고려 |
    | CLUSTERING_FACTOR | 테이블 정렬 유사도 | Row 수에 근접하면 Random I/O 증가 |
    | LEAF_BLOCKS | Leaf 블록 수 | 대량 삭제 후 과도하게 증가 시 재구성 필요 |
    
    ➤ CLUSTERING_FACTOR ↑ → 인덱스 효율 ↓
    
    ➤ LEAF_BLOCKS ↑ + BLEVEL ↑ → 조각화 심화
    

---

1. **[Rebuild vs Gather vs Drop 판단 기준 – 10분]**
    
    
    | 작업 | 목적 | 시기 | 주의점 |
    | --- | --- | --- | --- |
    | **REBUILD** | 조각화 제거, Tree 깊이 축소 | 대량 삭제 후, BLEVEL↑ | Online 옵션 권장 |
    | **GATHER_STATS** | 옵티마이저 통계 갱신 | 데이터 변경 시 | 정확한 히스토그램 수집 필요 |
    | **DROP** | 미사용 인덱스 제거 | 사용률 낮고 DML 부하 큰 경우 | FK 제약조건 여부 확인 |
    
    ▶ 인덱스 Rebuild 예:
    
    ```sql
    ALTER INDEX IDX_EMP_SAL REBUILD ONLINE;
    ```
    
    ▶ 통계 수집:
    
    ```sql
    EXEC DBMS_STATS.GATHER_INDEX_STATS(OWNNAME=>'HR', INDNAME=>'IDX_EMP_SAL');
    ```
    

---

1. **[DML 성능과 인덱스의 관계 설명 – 10분]**
    - INSERT, UPDATE, DELETE 발생 시
        
        → **해당 인덱스도 함께 변경됨**
        
    - 불필요한 인덱스가 많을수록 DML 성능 하락
    - 다중 인덱스 → 트랜잭션 부하 증가 + Undo, Redo 용량 증가
    
    🔍 실무 진단:
    
    ```sql
    SELECT * FROM V$OBJECT_USAGE WHERE INDEX_NAME = 'IDX_EMP_SAL';
    ```
    
    ➤ 사용 이력 없는 인덱스 = Drop 후보
    

---

1. **[실습 – 인덱스 사용률 점검 및 Rebuild 수행] – 15분**
    
    ▶ Step 1: 인덱스 활성화 추적 시작
    
    ```sql
    ALTER INDEX IDX_EMP_SAL MONITORING USAGE;
    ```
    
    ▶ Step 2: 관련 SQL 실행 (WHERE SAL = ...)
    
    ▶ Step 3: 사용 이력 확인
    
    ```sql
    SELECT INDEX_NAME, USED FROM V$OBJECT_USAGE;
    ```
    
    ▶ Step 4: Rebuild 수행 후 통계 재수집
    
    ```sql
    ALTER INDEX IDX_EMP_SAL REBUILD ONLINE;
    EXEC DBMS_STATS.GATHER_INDEX_STATS(OWNNAME=>'HR', INDNAME=>'IDX_EMP_SAL');
    ```
    

---

1. **[정리 및 마무리 – 5분]**
    - 인덱스는 성능을 높이는 도구이자, DML에 부담을 주는 양날의 검
    - 인덱스를 만들고 끝나는 것이 아니라, **유지와 관리가 반드시 필요**
    - “튜닝은 인덱스를 쓰는 것이 아니라,
        
        **쓸모없는 인덱스를 제거하고 유지하는 것도 포함한 전략**이다.”
        

---

### 📝 과제

1. 실습 테이블에서 인덱스의 BLEVEL, CLUSTERING_FACTOR, LEAF_BLOCKS 분석
2. 사용하지 않는 인덱스 탐지 후 Drop 또는 Rebuild 실습
3. DML 성능 개선 관점에서 불필요 인덱스 제거 시 이점 정리

---

### 🔧 실습환경 준비 사항

- Oracle 23 AI Free SQL Developer 환경
- 실습용 인덱스 생성 가능
- `DBMS_STATS`, `V$OBJECT_USAGE`, `USER_INDEXES` 접근 권한
- 인덱스 Rebuild, Drop, Gather 권한 허용