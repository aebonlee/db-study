# 4교시 - 고난도 SQL 튜닝 종합 실습 I – 비효율 SQL 사례 분석 및 개선 전략

### 🎯 학습 목표

- 실제 비효율 SQL의 실행계획을 해석하고, 병목 원인을 식별할 수 있다.
- 인덱스 구조, 조건절 구성, 통계정보, 조인 방식 등을 종합적으로 검토하여 튜닝 방향을 설정한다.
- SQL 튜닝 전후의 실행계획 차이와 성능 수치를 비교하여 개선 효과를 평가할 수 있다.
- 실전 SQL 튜닝 절차(진단 → 분석 → 설계 → 적용 → 검증)를 체계적으로 익힌다.

---

### 🧑‍🏫 강의 흐름 및 설명 내용

1. **[도입 – 5분]**
    
    “이제 여러분은 SQL 실행계획을 읽을 수 있고, 인덱스를 설계할 수 있으며, 힌트를 사용할 수 있습니다.
    
    오늘은 그 모든 기술을 ‘하나의 문제 해결 과정’으로 묶어보는 시간입니다.
    
    실무에서는 비효율 SQL을 하나 발견했을 때, 단순히 힌트를 넣고 끝내는 것이 아니라
    
    구조를 분석하고, 필요한 경우 테이블/인덱스를 재설계해야 하기도 합니다.
    
    함께 실전 SQL을 튜닝해 봅시다.”
    

---

1. **[사례 제시 – 비효율 SQL 구조 분석] – 5분**
    
    🔸 실습 SQL (예시: Full Scan + 서브쿼리 반복)
    
    ```sql
    SELECT E.ENAME, D.DNAME
    FROM EMP E
    WHERE E.DEPTNO IN (
      SELECT D.DEPTNO
      FROM DEPT D
      WHERE D.LOC = 'CHICAGO'
    )
    AND TO_CHAR(E.HIREDATE, 'YYYY') = '1981';
    
    ```
    
    ➤ 문제점:
    
    - IN 서브쿼리 → 옵티마이저에 따라 인덱스 미사용
    - TO_CHAR 함수 → 인덱스 무력화
    - 실행계획: `TABLE ACCESS FULL` + `FILTER` 반복

---

1. **[분석 및 개선 전략 설계] – 10분**
    - 개선 포인트:
        - `TO_CHAR(HIREDATE, 'YYYY')` → BETWEEN 날짜로 변경
        - 서브쿼리 → EXISTS 또는 JOIN으로 구조 변경
        - 함수 기반 인덱스 또는 구조 튜닝 고려
    
    🔧 튜닝 SQL (1차 개선안):
    
    ```sql
    SELECT E.ENAME, D.DNAME
    FROM EMP E
      JOIN DEPT D ON E.DEPTNO = D.DEPTNO
    WHERE D.LOC = 'CHICAGO'
      AND E.HIREDATE BETWEEN TO_DATE('1981-01-01','YYYY-MM-DD') AND TO_DATE('1981-12-31','YYYY-MM-DD');
    ```
    
    ➤ JOIN 전환 + 함수 제거 → 인덱스 적용 유도
    

---

1. **[실행계획 비교 및 수치 평가] – 10분**
    
    🔸 실행계획 도출:
    
    ```sql
    EXPLAIN PLAN FOR ...
    SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
    ```
    
    🔸 주요 지표 비교:
    
    | 항목 | 개선 전 | 개선 후 |
    | --- | --- | --- |
    | COST | 280 | 9 |
    | BUFFER_GETS | 12,000 | 540 |
    | ELAPSED_TIME | 1.9s | 0.1s |
    
    ➤ 실행계획에서 `INDEX RANGE SCAN`, `HASH JOIN`, `TABLE ACCESS BY INDEX ROWID`로 변경 확인
    

---

1. **[함수 기반 인덱스 실습 (대안 전략)] – 10분**
    - 함수 유지가 불가피한 경우:
        
        ```sql
        CREATE INDEX IDX_EMP_HIREYEAR ON EMP(TO_CHAR(HIREDATE, 'YYYY'));
        ```
        
    - 성능 비교:
        - 함수 기반 인덱스 활용 vs 구조 변경 방식 중 효율 높은 쪽 채택
    
    ➤ 실제 업무에서는 “쿼리 변경이 불가능한 경우” 함수 기반 인덱스가 대안
    

---

1. **[정리 및 마무리 – 5분]**
    - 실전 SQL 튜닝은 진단 → 원인분석 → 구조설계 → 인덱스 적용 → 검증 → 리포트화까지 이어져야 완성
    - 성능을 개선하는 것이 아니라, **병목을 제거하는 것**이 핵심
    - “SQL 튜닝은 한 줄의 수정이 아니라, **전체 구조를 재설계하는 아키텍처 작업**이다.”

---

### 📝 과제

1. 예제 SQL에 대해 개선 전/후 실행계획을 비교하고 Cost 및 주요 지표를 테이블로 정리
2. EXISTS, JOIN, 함수 기반 인덱스 각각을 적용해 보고 가장 효율적인 구조를 선택해 보고서 작성
3. 본인이 생성한 SALES 또는 EMP 확장 테이블에 대해 유사 사례를 구성하고 튜닝 적용

---

### 🔧 실습환경 준비 사항

- Oracle 23 AI Free SQL Developer 환경
- EMP, DEPT 테이블 및 통계 수집 완료 상태
- `DBMS_XPLAN.DISPLAY`, `DBMS_STATS`, 인덱스 생성 권한 포함