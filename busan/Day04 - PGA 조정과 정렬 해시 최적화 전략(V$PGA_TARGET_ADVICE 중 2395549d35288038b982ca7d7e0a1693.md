# Day04 - PGA 조정과 정렬/해시 최적화 전략(V$PGA_TARGET_ADVICE 중심)

### 🎯 학습 목표

- PGA의 구조와 SQL 정렬(Sort), 해시(Hash) 처리 시 메모리의 역할을 이해한다.
- `V$PGA_TARGET_ADVICE` 뷰를 통해 PGA 크기 조정 시 성능 향상을 예측한다.
- SQL 정렬, 해시 조인의 PGA 의존도를 실습하고 디스크(Temp) 사용 여부를 확인한다.

---

## 📘 이론 요약

| 항목 | 설명 |
| --- | --- |
| **PGA (Program Global Area)** | Server Process별 개별 메모리 영역 (정렬, 해시 연산 등) |
| **Sort Area** | `ORDER BY`, `GROUP BY`, `DISTINCT` 등 정렬 수행 |
| **Hash Area** | `HASH JOIN` 시 해시 테이블 저장 영역 |
| **Temp 사용** | PGA 부족 시 디스크(Temp Tablespace)에 정렬 자료 기록 |
| **V$PGA_TARGET_ADVICE** | PGA 크기 증가 시 성능 향상 예측 가능 |

---

## 🧪 실습 1: PGA 사용량 확인

```sql
-- 현재 세션의 PGA 메모리 사용량
SELECT name, value
FROM v$sesstat s, v$statname n
WHERE s.statistic# = n.statistic#
  AND s.sid = (SELECT sid FROM v$mystat WHERE ROWNUM = 1)
  AND name LIKE '%PGA memory%';
```

---

## 🧪 실습 2: 정렬 처리 → PGA 의존 vs TEMP 사용

### 1. 데이터 생성

```sql
CREATE TABLE pga_sort_test (
  id NUMBER,
  name VARCHAR2(100)
);

BEGIN
  FOR i IN 1..100000 LOOP
    INSERT INTO pga_sort_test VALUES (i, '이름_' || DBMS_RANDOM.STRING('A',10));
  END LOOP;
  COMMIT;
END;
```

### 2. Workarea 정책 설정

```sql
-- 수동 모드 (작은 PGA 설정 → Temp 사용 유도)
ALTER SESSION SET workarea_size_policy = MANUAL;
ALTER SESSION SET sort_area_size = 100000;  -- 매우 작게 설정

-- 정렬 쿼리 수행
SELECT * FROM pga_sort_test ORDER BY name;

-- Temp 사용 확인
SELECT username, tablespace, blocks, segtype
FROM v$tempseg_usage;
```

👉 Temp에 정렬 자료가 적재되었는지 확인

---

## 🧪 실습 3: 해시 조인 연산 → PGA 부족 유도

```sql
-- 동일 테이블 셀프 조인 (HASH JOIN 강제)
SELECT /*+ USE_HASH(a b) */ COUNT(*)
FROM pga_sort_test a
JOIN pga_sort_test b ON a.id = b.id;
```

👉 PGA가 부족하면 `direct path write temp` Wait Event 발생

---

## 🧪 실습 4: V$PGA_TARGET_ADVICE 분석

```sql
SELECT round(pga_target_for_estimate/1024/1024) AS "PGA_MB",
       estd_time, estd_extra_bytes_rw, estd_pga_cache_hit_percentage,
       estd_overalloc_count
FROM v$pga_target_advice;
```

| 컬럼 | 설명 |
| --- | --- |
| PGA_MB | 테스트 대상 PGA 설정값 (MB) |
| estd_time | 처리 시간 예상치 |
| estd_pga_cache_hit_percentage | PGA 내에서 처리된 비율 (높을수록 좋음) |
| estd_overalloc_count | 메모리 과도 사용 세션 수 (낮을수록 좋음) |

👉 Hit Ratio가 낮고 Overalloc이 많으면 PGA 증설 필요

---

## 🧪 실습 5: PGA 자동 관리 모드로 복원

```sql
ALTER SESSION SET workarea_size_policy = AUTO;
```

---

## 📝 과제

1. `V$PGA_TARGET_ADVICE`를 통해 현재 PGA 크기 대비 1.5배, 0.5배 수준의 예상 처리량 비교해보세요.
2. `Temp` 사용량이 많은 정렬 쿼리를 튜닝하여 **PGA 내에서 해결되도록** 조정해보세요.
3. `V$SYSSTAT`에서 다음 항목을 추출하여 `PGA Cache Hit Ratio` 계산해보세요:
    
    ```sql
    SELECT name, value FROM v$sysstat
    WHERE name IN ('bytes processed', 'extra bytes read/written');
    ```
    
    → `Hit Ratio = bytes processed / (bytes processed + extra bytes rw)`
    

---

## 📌 참고 자료

- 《오라클강의_PDF_교재_v1_0.pdf》
    - V$PGA_TARGET_ADVICE 분석, Temp 사용 여부 진단, 정렬/해시 메모리 구조
- 관련 뷰:
    - `V$PGA_TARGET_ADVICE`, `V$SYSSTAT`, `V$TEMPSEG_USAGE`, `V$SESSTAT`

---