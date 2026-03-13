# 7교시 - AWR 기반 Top SQL의 성능 개선 전략 – Buffer Gets, Executions, Disk Reads 중심 분석

### 🎯 학습 목표

- AWR 리포트에서 Top SQL을 식별하고 SQL 자원 사용 지표별 의미를 해석할 수 있다.
- SQL의 Buffer Gets, Executions, Disk Reads 수치를 통해 튜닝 우선순위와 개선 방향을 설정할 수 있다.
- 수치 기반으로 SQL의 병목 원인을 판단하고 실행계획과 연계하여 튜닝 전략을 수립할 수 있다.
- 실습을 통해 SQL 자원 소비 구조를 분석하고 리포트 형태로 정리할 수 있다.

---

### 🧑‍🏫 강의 흐름 및 설명 내용

1. **[도입 – 5분]**
    
    “AWR 리포트를 통해 상위 자원을 소비하는 SQL을 식별할 수 있다는 건 모두 아실 겁니다.
    
    하지만 단순히 ‘Elapsed Time’이 높다고 무조건 튜닝 우선순위가 되진 않습니다.
    
    오늘은 ‘Buffer Gets’, ‘Executions’, ‘Disk Reads’라는 수치를 중심으로 SQL의 구조적 병목을 분석하고,
    
    실행계획과 연계하여 최적의 튜닝 방향을 결정하는 훈련을 해보겠습니다.”
    

---

1. **[AWR SQL 영역 주요 항목 설명 – 10분]**
    
    
    | 항목 | 의미 | 주의할 분석 포인트 |
    | --- | --- | --- |
    | **Elapsed Time** | SQL 총 실행 시간 | 느린 SQL, 단일 실행 부하 |
    | **CPU Time** | CPU 사용량 | 비효율적 연산 구조 |
    | **Executions** | 실행 횟수 | 반복 호출, 공유 실패 |
    | **Buffer Gets** | 메모리 읽기량 | 캐시 낭비, 불필요 반복 |
    | **Disk Reads** | 디스크 읽기량 | 인덱스 미사용, Full Scan |
    
    ➤ Buffer Gets가 높고 Rows는 적다면 비효율적 캐시 사용 의심
    
    ➤ Executions가 지나치게 많다면 바인드 변수 또는 공유 실패 의심
    

---

1. **[실습 – AWR Top SQL 확인 및 수치 분석] – 15분**
    
    🔸 SQL_ID 기반 분석 (AWR 또는 V$SQL 활용)
    
    ```sql
    SELECT sql_id, buffer_gets, disk_reads, executions, rows_processed
    FROM dba_hist_sqlstat
    WHERE sql_id = '9czqspfnn0qg9';
    ```
    
    🔸 실행계획 조회
    
    ```sql
    SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_AWR('9czqspfnn0qg9'));
    ```
    
    ➤ 수치 기반 해석 훈련:
    
    - Buffer Gets = 250,000 / Rows Processed = 1,000 → Row당 250 Gets → 비효율
    - Disk Reads > Buffer Gets → 디스크 I/O 병목
    - Executions = 10,000 이상이면 캐시 재사용 구조 검토 필요

---

1. **[개선 전략 도출 – 10분]**
    
    ➤ 문제 유형별 전략 매핑:
    
    | 문제 패턴 | 진단 근거 | 개선 전략 |
    | --- | --- | --- |
    | 높은 Buffer Gets | Gets/Rows 비정상적 | 인덱스 설계, 조건절 튜닝 |
    | 높은 Disk Reads | Full Scan 의심 | 인덱스 적용 또는 파티션 |
    | 높은 Executions | 반복 호출 | 바인드 변수, 공유 커서 설정 |
    | 낮은 Rows | 조건절 비효율 | LIKE '%', NOT IN 제거 |
    
    🔧 전략 예시:
    
    - 비효율 조건절 제거 (`TO_CHAR`, `OR`, `NOT IN`)
    - 힌트 활용 (`LEADING`, `INDEX`, `FULL`)
    - 인라인 뷰 → Merge 구조로 변경

---

1. **[튜닝 전후 비교 및 보고서화 전략 – 5분]**
    - 튜닝 전/후 SQL_ID 고정
    - `Elapsed Time`, `Executions`, `Buffer Gets`, `COST` 비교
    - 간단 보고서 템플릿 제공:
        
        ```
        [SQL 튜닝 보고서 예시]
        
        - 대상 SQL_ID: 9czqspfnn0qg9
        - 문제 요약: 조건절 내 함수 사용, Full Scan 발생
        - 개선 조치: 조건절 변경 + 인덱스 생성
        - 개선 효과:
          · Elapsed Time: 1.2s → 0.2s
          · Buffer Gets: 240K → 12K
        ```
        

---

1. **[정리 및 마무리 – 5분]**
    - SQL 튜닝은 이제 실행계획뿐 아니라 **수치 기반 판단의 시대**
    - Buffer Gets와 Executions는 **SQL 내부의 비효율 루프**를 보여주는 핵심 지표
    - “빠른 SQL은 짧은 SQL이 아니다.
        
        SQL이 쓰는 자원을 줄이는 것이 진짜 튜닝이다.”
        

---

### 📝 과제

1. AWR 또는 V$SQL에서 상위 Buffer Gets SQL 3개를 추출하여 실행계획 비교
2. Buffer Gets, Executions, Disk Reads 기반으로 병목 포인트 진단
3. 수치 분석 → 개선 SQL 설계 → 튜닝 효과 요약 리포트 작성

---

### 🔧 실습환경 준비 사항

- Oracle 23 AI Free 또는 AWR 사용 가능한 환경
- `DBA_HIST_SQLSTAT`, `DBMS_XPLAN.DISPLAY_AWR`, `V$SQL` 접근 권한
- 실행계획 캡처 및 통계 수집 가능 상태