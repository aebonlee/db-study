# Day01 학습내용 - Oracle 내부 처리 구조 및 Block 기반 I/O 구조 이해

## ✅ 목표

- Oracle 23c Free 내장된 기본 데이터베이스(CDB: `FREE`, PDB: `FREEPDB1`)를 **사용**
- 실습용 계정(`SCOTT`) 생성
- SQL 튜닝 예제 테이블(`EMP`, `DEPT`)까지 준비

## 🔁 전제 조건

- `OracleServiceFREE` 서비스가 **실행 중** ✅ (이미 확인 완료)
- 잘못된 `spfilefree.ora`, `initfree.ora` 파일이 있다면 **삭제** 또는 **경로 확인**
- 

### ✅ ① 명령 프롬프트에서 SQL*Plus 실행

❗ **반드시 Windows 명령창(cmd) 또는 PowerShell에서 실행**해야 합니다.

```bash

sqlplus / as sysdba
```

---

### ✅ ② 사용자명 입력 시

```sql
사용자명 입력: sys as sysdba
비밀번호 입력: oracle123! ← 직접 입력 (설치 시 설정한 비밀번호, 보통 welcome1)
```

접속되면 아래와 같은 메시지가 나옵니다:

```sql
다음에 접속됨:
Oracle Database 23ai Free Release ...
SQL>
```

### ✅ PDB 접속

```sql
SHOW CON_NAME;
ALTER SESSION SET CONTAINER=FREEPDB1;
SHOW CON_NAME;
```

→ `FREEPDB1` 이 나오면 성공

![image.png](image%204.png)

### ✅ 튜닝 실습용 계정 생성

```sql
CREATE USER scott IDENTIFIED BY tiger;
GRANT CONNECT, RESOURCE TO scott;
```

![image.png](image%205.png)

## ✅ 다음 단계: SQL 튜닝 실습을 위한 기본 예제 테이블 생성

우선 실습에 필요한 대표적인 **예제 테이블**을 생성하겠습니다:

- `EMP` (직원 정보)
- `DEPT` (부서 정보)
- `BONUS`, `SALGRADE` (옵션)

## 📦 1. 튜닝 계정(SCOTT 등)으로 접속

SQL*Plus 또는 SQL Developer에서 다음처럼 접속합니다:

```sql
sqlplus scott/tiger@localhost:1521/freepdb1
```

![image.png](image%206.png)

> 계정명/비밀번호는 사용자가 만든 것으로 변경 가능
> 
> 
> `PDB 이름이 다르면` 그에 맞게 변경
> 

## 📄 2. 예제 테이블 DDL 생성 SQL

튜닝 실습용으로 아래 SQL을 그대로 실행하세요:

```sql
CREATE TABLE DEPT (
    DEPTNO NUMBER(2) PRIMARY KEY,
    DNAME VARCHAR2(14),
    LOC VARCHAR2(13)
);

CREATE TABLE EMP (
    EMPNO NUMBER(4) PRIMARY KEY,
    ENAME VARCHAR2(10),
    JOB VARCHAR2(9),
    MGR NUMBER(4),
    HIREDATE DATE,
    SAL NUMBER(7,2),
    COMM NUMBER(7,2),
    DEPTNO NUMBER(2),
    FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO)
);
```

### 📥 3. 예제 데이터 INSERT

```sql
INSERT INTO DEPT VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO DEPT VALUES (20, 'RESEARCH', 'DALLAS');
INSERT INTO DEPT VALUES (30, 'SALES', 'CHICAGO');
INSERT INTO DEPT VALUES (40, 'OPERATIONS', 'BOSTON');

INSERT INTO EMP VALUES (7839, 'KING', 'PRESIDENT', NULL, TO_DATE('1981-11-17','YYYY-MM-DD'), 5000, NULL, 10);
INSERT INTO EMP VALUES (7566, 'JONES', 'MANAGER', 7839, TO_DATE('1981-04-02','YYYY-MM-DD'), 2975, NULL, 20);
INSERT INTO EMP VALUES (7698, 'BLAKE', 'MANAGER', 7839, TO_DATE('1981-05-01','YYYY-MM-DD'), 2850, NULL, 30);
INSERT INTO EMP VALUES (7782, 'CLARK', 'MANAGER', 7839, TO_DATE('1981-06-09','YYYY-MM-DD'), 2450, NULL, 10);
INSERT INTO EMP VALUES (7902, 'FORD', 'ANALYST', 7566, TO_DATE('1981-12-03','YYYY-MM-DD'), 3000, NULL, 20);
INSERT INTO EMP VALUES (7369, 'SMITH', 'CLERK', 7902, TO_DATE('1980-12-17','YYYY-MM-DD'), 800, NULL, 20);
INSERT INTO EMP VALUES (7499, 'ALLEN', 'SALESMAN', 7698, TO_DATE('1981-02-20','YYYY-MM-DD'), 1600, 300, 30);
INSERT INTO EMP VALUES (7521, 'WARD', 'SALESMAN', 7698, TO_DATE('1981-02-22','YYYY-MM-DD'), 1250, 500, 30);
INSERT INTO EMP VALUES (7654, 'MARTIN', 'SALESMAN', 7698, TO_DATE('1981-09-28','YYYY-MM-DD'), 1250, 1400, 30);
INSERT INTO EMP VALUES (7844, 'TURNER', 'SALESMAN', 7698, TO_DATE('1981-06-09','YYYY-MM-DD'), 1500, 0, 30);
INSERT INTO EMP VALUES (7876, 'ADAMS', 'CLERK', 7788, TO_DATE('1983-01-12','YYYY-MM-DD'), 1100, NULL, 20);
INSERT INTO EMP VALUES (7900, 'JAMES', 'CLERK', 7698, TO_DATE('1981-12-03','YYYY-MM-DD'), 950, NULL, 30);
INSERT INTO EMP VALUES (7934, 'MILLER', 'CLERK', 7782, TO_DATE('1982-01-23','YYYY-MM-DD'), 1300, NULL, 10);

```

```sql
COMMIT;
```

### ✅ 4. 확인 쿼리

```sql
SELECT * FROM DEPT;
SELECT * FROM EMP;
```

정상적으로 출력되면 **SQL 튜닝 실습 환경 완성**입니다.

---

## ❗ 요약된 오류 상황

### 1. `ORA-01917: 사용자 또는 롤 'SCOTT'이 존재하지 않습니다`

→ `SCOTT` 사용자가 **아직 생성되지 않았거나**,

현재 **다른 컨테이너(CDB$ROOT)** 에 있기 때문에 `PDB` 내 사용자 정보를 찾지 못한 상태입니다.

### 2. `ORA-01919: 'PLUSTRACE' 롤이 존재하지 않습니다`

→ `PLUSTRACE` 롤은 **기본적으로 존재하지 않으며**, 수동으로 생성해야 합니다.

---

## ✅ 해결 순서: 튜닝 실습 계정(SCOTT) 제대로 만들기

---

### 🧭 1단계: 현재 컨테이너 확인

```sql
SHOW CON_NAME;
```

### ▶ 결과가 `CDB$ROOT`라면:

👉 아래 명령으로 **PDB로 전환**해야 합니다.

```sql
ALTER SESSION SET CONTAINER=FREEPDB1;
```

다시 확인:

```sql
SHOW CON_NAME;
-- 결과가 FREEPDB1 이어야 정상
```

---

### 🧭 2단계: SCOTT 사용자 생성

```sql
CREATE USER scott IDENTIFIED BY tiger;
GRANT CONNECT, RESOURCE TO scott;
```

옵션: 공간 부족 시

```sql
ALTER USER scott DEFAULT TABLESPACE users QUOTA UNLIMITED ON users;
```

---

### 🧭 3단계: 권한 부여 재시도

```sql
GRANT SELECT ON v_$session TO scott;
GRANT SELECT ON v_$sesstat TO scott;
GRANT SELECT ON v_$mystat TO scott;
GRANT SELECT ON v_$sql TO scott;
GRANT SELECT ON v_$sql_plan TO scott;
GRANT SELECT ON v_$sql_plan_statistics_all TO scott;
GRANT SELECT_CATALOG_ROLE TO scott;
```

---

### 🧭 4단계: PLUSTRACE 롤 수동 생성 (옵션)

```sql

CONNECT / AS SYSDBA

-- 롤 직접 생성
CREATE ROLE plustrace;
GRANT SELECT ON v_$sesstat TO plustrace;
GRANT SELECT ON v_$statname TO plustrace;
GRANT SELECT ON v_$mystat TO plustrace;

-- 롤 부여
GRANT plustrace TO scott;
```

---

## ✅ 최종 확인

1. SCOTT 계정 생성됨
2. 권한 부여 성공
3. SQL*Plus에서 `SET AUTOTRACE ON` 동작 확인

---

# 🎓 SQL 튜닝 실습 과정 :  실행계획(Execution Plan) 이해 및 분석

### 🧭 [Step 1] 사전 준비 – EMP / DEPT 테이블 확인

튜닝용 계정(SCOTT 등)으로 접속한 상태에서 다음 SQL 실행:

```sql
SELECT * FROM EMP;
SELECT * FROM DEPT;
```

결과가 정상적으로 나와야 이후 실습 진행 가능

### 🧭 [Step 2] AUTOTRACE 설정

SQL 실행 시 실행계획(PLAN)과 통계 정보를 함께 확인할 수 있는 **AUTOTRACE**를 설정합니다.

```sql
-- 1. AUTOTRACE 권한 부여 (SYS 계정에서 1회만)
CONNECT / AS SYSDBA

GRANT SELECT ON v_$session TO scott;
GRANT SELECT ON v_$sql_plan TO scott;
GRANT SELECT ON v_$sql TO scott;
GRANT SELECT ON v_$sqlarea TO scott;
GRANT SELECT ON v_$statname TO scott;
GRANT SELECT ON v_$sesstat TO scott;
GRANT SELECT ON v_$mystat TO scott;
GRANT SELECT ON v_$sql_plan_statistics_all TO scott;

GRANT SELECT_CATALOG_ROLE TO scott;
GRANT PLUSTRACE TO scott;
```

## 🧭 [Step 3] SQL*Plus에서 AUTOTRACE 설정

튜닝 계정으로 다시 접속 후:

```sql
SET AUTOTRACE ON EXPLAIN
```

또는 통계 포함:

```sql
SET AUTOTRACE ON
```

## 🧪 [Step 4] 튜닝 전 예제 쿼리 실습

### ✅ 예제 1: 단순 SELECT

```sql
SELECT * FROM EMP WHERE DEPTNO = 30;
```

### ✅ 예제 2: 인덱스 없는 JOIN

```sql
SELECT E.ENAME, D.DNAME
FROM EMP E, DEPT D
WHERE E.DEPTNO = D.DEPTNO;
```

### ✅ 결과 해석 방법

- **Execution Plan**:
    - `TABLE ACCESS FULL`: 비효율적 (전체 테이블 스캔)
    - `INDEX RANGE SCAN`: 효율적 (인덱스 활용)
- **Statistics**:
    - `consistent gets`, `physical reads` 수치 확인
    - → 읽은 블록 수가 많을수록 성능 저하

### 🧭 [Step 5] 튜닝을 위한 실습 시나리오 제시

| 주제 | 실습 예시 |
| --- | --- |
| 인덱스 활용 | `CREATE INDEX` 후 실행계획 비교 |
| WHERE 조건 튜닝 | `LIKE`, `IN`, `BETWEEN` 등 비교 |
| JOIN 튜닝 | NESTED LOOP vs HASH JOIN 실습 |
| GROUP BY / HAVING | 집계함수 튜닝 |
| 서브쿼리 vs JOIN | 효율성 비교 |

## ✍️ Test

튜닝 전/후 차이를 분석해 보세요:

```sql
-- BEFORE
SELECT * FROM EMP WHERE JOB = 'SALESMAN';

-- INDEX 생성
CREATE INDEX idx_emp_job ON EMP(JOB);

-- AFTER
SELECT * FROM EMP WHERE JOB = 'SALESMAN';
```

→ 실행계획 및 블록 읽기 차이 비교

---

# 🎓 인덱스 튜닝 전략

**– 언제 만들고, 언제 만들지 말아야 하는가**

### 📚 주요 이론 정리

### 🔹 인덱스란?

- **데이터를 빠르게 찾기 위한 구조** (B*Tree 또는 Bitmap 구조)
- `WHERE`, `JOIN`, `ORDER BY`, `GROUP BY` 조건에서 성능 향상

**🔹 인덱스를 만들어야 하는 경우**

| 조건 | 설명 |
| --- | --- |
| WHERE 절에 자주 사용되는 컬럼 | ex) `WHERE deptno = 10` |
| 조인 키 컬럼 | ex) `emp.deptno = dept.deptno` |
| 정렬 기준 컬럼 | ex) `ORDER BY hiredate` |
| 조회 대상 데이터가 전체의 **5~10% 이하일 경우** | Selectivity가 높은 컬럼 |

🔹 인덱스를 만들면 **안 되는 경우**

| 조건 | 설명 |
| --- | --- |
| 조회 건수가 전체의 20~30% 이상 | 인덱스보다 Full Scan이 빠름 |
| 컬럼 값이 거의 같은 경우 (저선택도) | ex) 성별, 부서 등 |
| 자주 갱신되는 컬럼 | DML 비용 증가 |
| 함수나 변환이 적용된 조건 | ex) `WHERE UPPER(name) = 'JANE'` → 인덱스 사용 불가 |

---

## 🧪 실습: 단일 컬럼 vs 복합 인덱스 성능 비교

### ✅ STEP 1. 단일 인덱스 생성

```sql
CREATE INDEX idx_emp_deptno ON emp(deptno);
```

실행계획 확인:

```sql
SET AUTOTRACE ON
SELECT * FROM emp WHERE deptno = 10;
```

👉 결과에 `INDEX RANGE SCAN` 뜨는지 확인

### ✅ STEP 2. 복합 인덱스 생성

```sql
CREATE INDEX idx_emp_deptno_job ON emp(deptno, job);
```

복합 인덱스를 활용하는 쿼리:

```sql
SELECT * FROM emp WHERE deptno = 10 AND job = 'CLERK';
```

→ 실행계획에서 `INDEX RANGE SCAN` 또는 `INDEX SKIP SCAN` 구분

### ✅ STEP 3. Selectivity 확인 실습

```sql
SELECT deptno, COUNT(*) FROM emp GROUP BY deptno;
SELECT job, COUNT(*) FROM emp GROUP BY job;
```

→ 특정 컬럼 값의 **편중 여부**를 보고 Selectivity 판단

### 🎯 결과 비교 관찰 포인트

| 비교 항목 | 단일 인덱스 | 복합 인덱스 |
| --- | --- | --- |
| 인덱스 사용 여부 | 조건 일치 시 사용 | **복합 조건 모두 일치**해야 최적 |
| Selectivity | 높을수록 좋음 | 선두 컬럼의 선택도가 중요 |
| 실행계획 | INDEX RANGE SCAN | INDEX SKIP SCAN or RANGE SCAN |
| 블록 읽기 수 | 줄어드는 것이 이상적 | AUTOTRACE 결과로 확인 |

## 📝 Test

```sql
-- SELECTIVITY가 낮은 컬럼
CREATE INDEX idx_emp_job ON emp(job);
SELECT * FROM emp WHERE job = 'CLERK'; -- 성능 비교

-- 인덱스 없는 경우
DROP INDEX idx_emp_job;
SELECT * FROM emp WHERE job = 'CLERK'; -- 다시 실행

-- AUTOTRACE 통계 비교
```

---

# 🎓 옵티마이저 힌트(Hint) 전략

**– 실행계획을 강제로 바꾸는 법**

## 🧠 옵티마이저 힌트 기본 개념

Oracle 옵티마이저는 SQL을 분석하여 **최적의 실행계획(Execution Plan)** 을 결정함

→ 하지만, 때로는 **비효율적인 실행계획**을 택하기도 함

→ 이때 힌트를 사용하면 실행계획을 **개발자가 직접 개입하여 조정**할 수 있음

### 🧾 힌트 문법 구조

```sql
SELECT /*+ HINT */ ...
```

예시:

```sql
SELECT /*+ FULL(emp) */ * FROM emp WHERE job = 'CLERK';
```

힌트는 **`/*+`로 시작하고 `*/`로 닫아야** 하며,

**`SELECT` 구문 바로 뒤에 위치**해야 유효합니다.

### 🧪 주요 힌트 종류 및 실습 예제

### ✅ 1)  `FULL(table)` – 전체 테이블 스캔 유도

```sql
SELECT /*+ FULL(emp) */ * FROM emp WHERE job = 'CLERK';
```

- 인덱스가 있더라도 **무조건 Full Scan**
- 테스트 목적, 인덱스 미사용 조건 실험에 활용

### ✅ 2) `INDEX(table [index_name])` – 특정 인덱스 사용 강제

```sql
SELECT /*+ INDEX(emp idx_emp_job) */ * FROM emp WHERE job = 'CLERK';
```

- 특정 인덱스를 강제로 사용
- 옵티마이저가 선택하지 않을 경우 테스트 용도

### ✅ 3)  `USE_NL(table)` – Nested Loop Join 강제

```sql
SELECT /*+ USE_NL(e d) */ e.ename, d.dname
FROM emp e JOIN dept d ON e.deptno = d.deptno;
```

- `USE_HASH`, `USE_MERGE` 힌트와 비교 실습 가능

### ✅ 4) `LEADING(tabl)` – 조인 순서 제어

```sql

SELECT /*+ LEADING(d e) */ e.ename, d.dname
FROM emp e JOIN dept d ON e.deptno = d.deptno;
```

- 기본적으로 옵티마이저는 통계 기반 조인 순서를 결정
- `LEADING` 힌트를 통해 우선적으로 읽을 테이블을 지정

### ✅ 5) `ORDERED` – FROM 절의 테이블 순서대로 조인 유도

```sql

SELECT /*+ ORDERED */ *
FROM dept d, emp e
WHERE d.deptno = e.deptno;
```

- 조인 순서를 명시적으로 결정할 수 있음

## 📊 실습 시 비교 포인트

| 힌트 유무 | 실행계획 | 통계 정보 |
| --- | --- | --- |
| 없음 | Oracle이 자동 결정 |  |
| `FULL` 힌트 | TABLE ACCESS FULL | 논리적/물리적 I/O 비교 |
| `INDEX` 힌트 | INDEX RANGE SCAN | 더 적은 블록 읽기? |
| `USE_NL` vs `USE_HASH` | JOIN 방식 차이 | Nested Loop: 소규모 / Hash: 대량 |

## 📝 Test

### 👇 아래 SQL 3가지를 각각 실행하고 실행계획 비교

```sql
- 기본 쿼리
SELECT e.ename, d.dname
FROM emp e JOIN dept d ON e.deptno = d.deptno;

-- 힌트: FULL(emp)
SELECT /*+ FULL(emp) */ e.ename, d.dname
FROM emp e JOIN dept d ON e.deptno = d.deptno;

-- 힌트: USE_NL
SELECT /*+ USE_NL(d e) */ e.ename, d.dname
FROM emp e JOIN dept d ON e.deptno = d.deptno;

```

→ `AUTOTRACE` 또는 `EXPLAIN PLAN` 으로 결과 비교

---

## 🎓 SQL 실행계획 읽는 법

**– 비용(COST), 카디널리티(ROWS), I/O 해**

## 📚 실행계획(EXPLAIN PLAN) 개요

SQL이 실행되기 전, Oracle 옵티마이저는 **최적의 실행경로**를 선택합니다.

이 계획은 `EXPLAIN PLAN`, `AUTOTRACE`, `DBMS_XPLAN.DISPLAY` 등을 통해 확인할 수 있습니다.

---

### 📌 실행계획 확인 방법

```sql
EXPLAIN PLAN FOR
SELECT * FROM emp WHERE deptno = 10;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

또는:

```sql

SET AUTOTRACE ON
SELECT * FROM emp WHERE deptno = 10;
```

---

## 🧠 실행계획 주요 항목 설명

| 항목 | 설명 | 강조 내용 |
| --- | --- | --- |
| **OPERATION** | 어떤 연산을 수행하는지 (ex. TABLE ACCESS, JOIN, FILTER 등) | "이 부분이 실제 Oracle이 수행하는 액션입니다. 가장 중요합니다." |
| **OBJECT_NAME** | 접근 대상 테이블 또는 인덱스 이름 | "여기서 어떤 테이블/인덱스가 쓰이는지 알 수 있습니다." |
| **ACCESS PATH** | 접근 방식 (FULL, INDEX RANGE SCAN, NESTED LOOP 등) | "접근 방식이 효율적인지 반드시 체크해야 합니다." |
| **COST** | 옵티마이저가 계산한 상대 비용 (낮을수록 좋음) | "COST는 꼭 비교를 위한 지표입니다. 절대적인 수치는 아닙니다." |
| **ROWS** | 예상 반환 행 수 (카디널리티) | "이 ROWS 수치가 옵티마이저의 계획에 가장 큰 영향을 줍니다." |
| **BYTES** | 읽어들일 데이터 예상 크기 | "쿼리의 데이터 이동량을 판단하는 데 사용됩니다." |
| **ID** | 실행 단계 순서 (계층적 트리 구조로 표현) | "실제로는 아래 단계부터 위로 실행됩니다." |

---

## 🧪 실습 예제: 실행계획 읽기

```sql
EXPLAIN PLAN FOR
SELECT * FROM emp WHERE deptno = 10;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

출력 예시:

```

-------------------------------------------------------------------------------------
| Id | Operation         | Name          | Rows  | Bytes | Cost (%CPU)| Time     |
-------------------------------------------------------------------------------------
|  0 | SELECT STATEMENT  |               |    4  |   148 |     3   (0)| 00:00:01 |
|* 1 |  TABLE ACCESS FULL| EMP           |    4  |   148 |     3   (0)| 00:00:01 |
-------------------------------------------------------------------------------------
```

---

### 💬 포인트

- **Operation**: “TABLE ACCESS FULL이면 인덱스를 쓰지 않았다는 뜻입니다.”
- **Rows**: “4건 정도 반환될 거라고 Oracle이 예측한 수치입니다. 통계정보에 따라 달라집니다.”
- **Cost**: “비용은 옵티마이저 내부 점수입니다. 낮을수록 좋지만 ‘비교용 지표’일 뿐입니다.”
- **%CPU**: “CPU 사용량 비율입니다. 대부분 (0)으로 뜹니다.”

---

### ✅ 복합 조건 예제 실습

```sql

EXPLAIN PLAN FOR
SELECT * FROM emp WHERE deptno = 30 AND job = 'SALESMAN';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

→ 이때 인덱스를 생성하거나 제거하면서 실행계획이 어떻게 바뀌는지 확인

---

## 🎯 튜닝 전략 연계

| 문제가 보이면 | 고려할 액션 |
| --- | --- |
| `TABLE ACCESS FULL` | 인덱스 생성 또는 조건 개선 |
| 예상 `ROWS` 수치가 현실과 다름 | 통계정보 갱신 필요 (`ANALYZE` 또는 `DBMS_STATS`) |
| `HASH JOIN`, `MERGE JOIN`이 느림 | `USE_NL`, `INDEX` 힌트로 변경 시도 |

---

## ✅ 요약

> “이 실행계획은 SQL이 실제로 수행되기 전에 Oracle이 어떻게 접근할지 미리 설계한 지도입니다.”
> 
> 
> “여기 보이는 Operation은 수행되는 액션이고, Rows는 Oracle이 예측하는 데이터 양입니다.”
> 
> “이 예측이 잘못되면 실행계획도 잘못되기 때문에 통계정보가 아주 중요합니다.”
> 
> “Cost는 Oracle이 계산한 점수지만, 절대값이 아니라 **비교용 지표**입니다.”
> 
> “계획이 비효율적으로 나왔다면 인덱스를 만들거나 힌트를 넣어 개선할 수 있습니다.”
> 

---

## 📝 Test

- `deptno`, `job`, `ename` 각각에 대해 인덱스를 만들어가며 실행계획 변화 비교
- `ANALYZE TABLE` 또는 `DBMS_STATS.GATHER_TABLE_STATS` 로 통계 변경 후 실행계획 확인

---