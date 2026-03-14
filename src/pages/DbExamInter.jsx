import { useState, useEffect, useRef, useCallback } from 'react';
import useAOS from '../hooks/useAOS';

/* ─── 50문제 데이터 ─── */
const questions = [
  // 객관식 (1-30)
  { id:1, type:'multiple', cat:'객관식', pts:2, q:'데이터베이스를 사용하는 경우의 장점이 아닌 것은?', opts:['데이터 중복의 최소화','데이터의 공유','데이터 무결성 유지','전산화 비용 증가'], ans:3, exp:'데이터베이스 도입 시 장점은 중복 최소화, 공유, 일관성·무결성 유지, 독립성 확보 등이고, 전산화 비용 증가는 오히려 단점에 해당합니다.',
    guide:'데이터베이스 시스템의 장점: 중복 최소화, 공유, 무결성, 독립성, 보안\n단점: 초기 비용, 복잡성, 전문 인력 필요' },
  { id:2, type:'multiple', cat:'객관식', pts:2, q:'DBMS의 필수 기능이 아닌 것은?', opts:['정의 기능','조작 기능','제어 기능','계산 기능'], ans:3, exp:'DBMS는 데이터를 구조적으로 정의(DDL), 조작(DML), 제어(DCL)하는 기능이 핵심입니다.',
    guide:'DBMS 3대 기능:\n• 정의(DDL): CREATE, ALTER, DROP\n• 조작(DML): SELECT, INSERT, UPDATE, DELETE\n• 제어(DCL): GRANT, REVOKE, COMMIT, ROLLBACK' },
  { id:3, type:'multiple', cat:'객관식', pts:2, q:'스키마 3단계 구조가 아닌 것은?', opts:['외부 스키마','개념 스키마','내부 스키마','구조 스키마'], ans:3, exp:'스키마는 외부(사용자 관점), 개념(전체 논리), 내부(물리) 스키마의 3단계 구조로 나뉩니다.',
    guide:'스키마 3단계 구조:\n• 외부 스키마: 사용자 관점, 뷰\n• 개념 스키마: 전체 논리적 구조\n• 내부 스키마: 물리적 저장 구조\n→ 논리적/물리적 독립성 보장' },
  { id:4, type:'multiple', cat:'객관식', pts:2, q:'릴레이션의 속성 값이 취할 수 있는 값들의 집합은?', opts:['튜플','필드','도메인','차수'], ans:2, exp:'도메인(Domain)은 한 속성이 가질 수 있는 값들의 범위(집합)를 의미합니다.',
    guide:'관계형 DB 용어:\n• 튜플(Tuple) = 행(Row)\n• 속성(Attribute) = 열(Column)\n• 도메인(Domain) = 속성값의 범위\n• 차수(Degree) = 속성 개수\n• 기수(Cardinality) = 튜플 개수' },
  { id:5, type:'multiple', cat:'객관식', pts:2, q:'기본키의 특징으로 옳지 않은 것은?', opts:['중복될 수 없다','NULL을 허용하지 않는다','유일성과 최소성을 가진다','여러 개 정의할 수 있다'], ans:3, exp:'한 테이블에는 기본키는 1개만 존재합니다.',
    guide:'기본키(PK) 조건:\n• 유일성 — 중복 불가\n• 최소성 — 최소 속성으로 구성\n• NOT NULL — NULL 불가 (개체 무결성)\n• 테이블당 1개만 존재' },
  { id:6, type:'multiple', cat:'객관식', pts:2, q:'후보키 중에서 기본키로 선택되지 않은 키를 무엇이라 하는가?', opts:['슈퍼키','대체키','외래키','부분키'], ans:1, exp:'후보키들 중 하나가 기본키로 선정되고, 나머지를 대체키(Alternate Key)라고 부릅니다.',
    guide:'키의 계층:\n슈퍼키 ⊃ 후보키 ⊃ 기본키/대체키\n• 슈퍼키: 유일 식별 가능한 속성 집합\n• 후보키: 최소성 만족하는 슈퍼키\n• 대체키: 기본키가 되지 못한 후보키' },
  { id:7, type:'multiple', cat:'객관식', pts:2, q:'외래키(FK)에 대한 설명으로 옳은 것은?', opts:['NULL을 절대 가질 수 없다','다른 테이블의 기본키를 참조한다','유일성만 만족하면 된다','기본키가 아닌 속성을 의미한다'], ans:1, exp:'외래키는 다른 릴레이션의 기본키를 참조하는 속성입니다.',
    guide:'외래키(FK):\n• 다른 테이블의 기본키를 참조\n• NULL 허용 가능 (선택적 관계)\n• 중복 허용 가능\n• 참조 무결성 규칙: RESTRICT, CASCADE, SET NULL' },
  { id:8, type:'multiple', cat:'객관식', pts:2, q:'데이터 독립성 중 논리적 독립성의 의미는?', opts:['내부 구조 변경 시 응용프로그램 영향 없음','논리 구조 변경 시 응용프로그램 영향 없음','저장 장치 변경 가능','뷰 변경 가능'], ans:1, exp:'논리적 독립성은 개념 스키마(논리 구조) 변경이 있어도 응용프로그램에 영향을 주지 않는 것입니다.',
    guide:'데이터 독립성:\n• 논리적 독립성: 개념 스키마 변경 → 외부 스키마 영향 없음\n• 물리적 독립성: 내부 스키마 변경 → 개념 스키마 영향 없음' },
  { id:9, type:'multiple', cat:'객관식', pts:2, q:'정규화의 목적이 아닌 것은?', opts:['이상 현상 제거','데이터 중복 최소화','저장공간 증가','데이터 일관성 유지'], ans:2, exp:'정규화는 중복 감소, 이상 현상 제거, 일관성과 무결성 향상이 목적입니다.',
    guide:'정규화 목적:\n• 이상 현상(삽입/삭제/갱신) 제거\n• 데이터 중복 최소화\n• 데이터 일관성·무결성 유지\n→ 저장공간은 줄어들지 늘어나지 않음' },
  { id:10, type:'multiple', cat:'객관식', pts:2, q:'제1정규형의 조건은?', opts:['기본키가 완전 함수 종속','원자 값이어야 함','이행 종속 제거','모든 결정자가 후보키'], ans:1, exp:'제1정규형(1NF)은 모든 속성이 원자 값을 가져야 합니다.',
    guide:'정규화 단계:\n• 1NF: 모든 속성이 원자 값 (반복 그룹 제거)\n• 2NF: 부분 함수 종속 제거\n• 3NF: 이행적 함수 종속 제거\n• BCNF: 모든 결정자가 후보키' },
  { id:11, type:'multiple', cat:'객관식', pts:2, q:'제2정규형의 조건은?', opts:['원자성','부분 함수 종속 제거','다치 종속 제거','이행 종속 제거'], ans:1, exp:'제2정규형(2NF)은 1NF를 만족하면서 부분 함수 종속을 제거한 상태입니다.',
    guide:'2NF — 부분 함수 종속 제거:\n복합키의 일부에만 종속되는 속성 분리\n예: (학번,과목)→교수명에서 과목→교수명이면\n과목 테이블로 분리' },
  { id:12, type:'multiple', cat:'객관식', pts:2, q:'제3정규형은 어떤 종속을 제거해야 하는가?', opts:['부분 함수 종속','이행적 함수 종속','다치 종속','조인 종속'], ans:1, exp:'제3정규형(3NF)은 2NF를 만족하면서 이행 함수 종속을 제거한 정규형입니다.',
    guide:'3NF — 이행적 함수 종속 제거:\nX→Y, Y→Z일 때 X→Z 관계 분리\n예: 학번→학과, 학과→학과사무실\n→ 학과 테이블로 분리' },
  { id:13, type:'multiple', cat:'객관식', pts:2, q:'트랜잭션의 ACID 중 일관성이 의미하는 것은?', opts:['트랜잭션이 모두 수행되거나 취소','데이터의 무결성 유지','다른 트랜잭션 간 간섭 없음','영구적으로 저장됨'], ans:1, exp:'일관성(Consistency)은 트랜잭션 수행 전·후에 DB가 무결성 제약 조건을 항상 만족하는 상태입니다.',
    guide:'ACID 특성:\n• Atomicity(원자성): All or Nothing\n• Consistency(일관성): 무결성 제약조건 유지\n• Isolation(고립성): 트랜잭션 간 간섭 없음\n• Durability(영속성): 커밋 후 영구 반영' },
  { id:14, type:'multiple', cat:'객관식', pts:2, q:'COMMIT의 기능은?', opts:['트랜잭션 취소','변경 내용 확정','이전 상태로 되돌림','백업 수행'], ans:1, exp:'COMMIT은 트랜잭션의 변경 내용을 데이터베이스에 영구 반영하는 명령입니다.',
    guide:'COMMIT: 트랜잭션 변경사항을 영구 반영\n• 록(Lock) 해제\n• 세이브포인트 제거\n• DDL/DCL 실행 시 자동 커밋\n• COMMIT 후 ROLLBACK 불가' },
  { id:15, type:'multiple', cat:'객관식', pts:2, q:'ROLLBACK의 기능은?', opts:['작업 취소 및 이전상태 복구','작업 영구 반영','인덱스 생성','제약 조건 생성'], ans:0, exp:'ROLLBACK은 변경 작업을 모두 취소하고 이전 상태로 복구하는 명령입니다.',
    guide:'트랜잭션 제어 명령어:\n• COMMIT: 변경사항 영구 저장\n• ROLLBACK: 변경사항 취소, 이전 상태 복구\n• SAVEPOINT: 중간 저장점 설정' },
  { id:16, type:'multiple', cat:'객관식', pts:2, q:'SELECT 문에서 중복 제거는 어떤 키워드인가?', opts:['DISTINCT','UNIQUE','REMOVE','CLEAN'], ans:0, exp:'SELECT 결과에서 중복 튜플을 제거할 때 DISTINCT 키워드를 사용합니다.',
    guide:'SELECT 중복 제거:\nSELECT DISTINCT 컬럼명 FROM 테이블;\n→ 결과에서 중복 행을 제거하여 고유 값만 반환' },
  { id:17, type:'multiple', cat:'객관식', pts:2, q:'WHERE 절의 역할은?', opts:['정렬','조건 검색','그룹화','중복 제거'], ans:1, exp:'WHERE 절은 조건을 지정하여 필요한 튜플만 필터링합니다.',
    guide:'SQL 절의 역할:\n• WHERE: 조건 필터링\n• ORDER BY: 정렬\n• GROUP BY: 그룹화\n• HAVING: 그룹 조건\n• DISTINCT: 중복 제거' },
  { id:18, type:'multiple', cat:'객관식', pts:2, q:'GROUP BY 절을 사용할 때 그룹에 대한 조건 절은?', opts:['ORDER BY','WHERE','HAVING','DISTINCT'], ans:2, exp:'GROUP BY로 그룹을 만든 후, 그룹 단위에 조건을 걸 때 HAVING 절을 사용합니다.',
    guide:'WHERE vs HAVING:\n• WHERE: 그룹화 전 개별 행 필터링\n• HAVING: 그룹화 후 그룹 필터링\nSELECT 학과, COUNT(*) FROM 학생\nGROUP BY 학과 HAVING COUNT(*) >= 5;' },
  { id:19, type:'multiple', cat:'객관식', pts:2, q:'ORDER BY에서 기본 정렬은?', opts:['ASC','DESC','RANDOM','NONE'], ans:0, exp:'ORDER BY는 기본값이 ASC(오름차순)이며, 내림차순은 DESC를 명시해야 합니다.',
    guide:'ORDER BY 정렬:\n• ASC: 오름차순 (기본값, 생략 가능)\n• DESC: 내림차순 (명시 필요)\n예: ORDER BY 이름 ASC, 성적 DESC' },
  { id:20, type:'multiple', cat:'객관식', pts:2, q:'다음 중 DDL이 아닌 것은?', opts:['CREATE','ALTER','INSERT','DROP'], ans:2, exp:'DDL은 CREATE, ALTER, DROP 등이며, INSERT는 DML입니다.',
    guide:'SQL 분류:\n• DDL(정의어): CREATE, ALTER, DROP, TRUNCATE\n• DML(조작어): SELECT, INSERT, UPDATE, DELETE\n• DCL(제어어): GRANT, REVOKE\n• TCL(트랜잭션): COMMIT, ROLLBACK' },
  { id:21, type:'multiple', cat:'객관식', pts:2, q:'다음 중 DML에 해당하는 것은?', opts:['GRANT','UPDATE','CREATE','ALTER'], ans:1, exp:'DML은 SELECT, INSERT, UPDATE, DELETE 등 데이터를 조작하는 명령어입니다.',
    guide:'DML(Data Manipulation Language):\n• SELECT: 조회\n• INSERT: 삽입\n• UPDATE: 수정\n• DELETE: 삭제' },
  { id:22, type:'multiple', cat:'객관식', pts:2, q:'데이터 무결성 제약 조건이 아닌 것은?', opts:['도메인 무결성','개체 무결성','참조 무결성','논리 무결성'], ans:3, exp:'대표적인 무결성은 개체, 도메인, 참조 무결성입니다. 논리 무결성이라는 용어는 사용하지 않습니다.',
    guide:'무결성 제약조건:\n• 개체 무결성: 기본키 NOT NULL, UNIQUE\n• 참조 무결성: 외래키는 참조 테이블에 존재\n• 도메인 무결성: 속성값은 도메인 범위 내' },
  { id:23, type:'multiple', cat:'객관식', pts:2, q:'개체 무결성에서 기본키가 가질 수 없는 값은?', opts:['문자열','숫자','NULL','0'], ans:2, exp:'개체 무결성 규칙에 따라 기본키는 NULL이나 중복 값을 가질 수 없습니다.',
    guide:'개체 무결성(Entity Integrity):\n기본키를 구성하는 모든 속성은\n• NULL 값 불가\n• 중복 값 불가\n→ 튜플을 고유하게 식별해야 함' },
  { id:24, type:'multiple', cat:'객관식', pts:2, q:'참조 무결성이 위배되는 경우는?', opts:['참조하는 PK가 존재하지 않음','PK가 변경됨','NULL 값 존재','데이터가 중복됨'], ans:0, exp:'참조 무결성은 외래키 값이 NULL 또는 참조 릴레이션의 기본키 값 중 하나여야 합니다.',
    guide:'참조 무결성(Referential Integrity):\n외래키 값은 반드시:\n• 참조 테이블의 기본키에 존재하거나\n• NULL이어야 함\n→ 존재하지 않는 PK를 참조하면 위반' },
  { id:25, type:'multiple', cat:'객관식', pts:2, q:'뷰(View)의 특징으로 틀린 것은?', opts:['가상 테이블','독자적인 저장 공간을 가진다','데이터 보안 제공','ALTER 불가'], ans:1, exp:'뷰는 논리적으로 정의된 가상 테이블이며, 별도의 물리 저장공간을 갖지 않습니다.',
    guide:'뷰(View):\n• 가상 테이블 — 물리적 저장공간 없음\n• 장점: 보안, 편의성, 논리적 독립성\n• 단점: 인덱스 불가, 갱신 제한\n• ALTER 불가, DROP 후 재생성' },
  { id:26, type:'multiple', cat:'객관식', pts:2, q:'로킹(Locking)의 목적은?', opts:['저장공간 절약','병행 제어','중복성 증가','속성 증가'], ans:1, exp:'로킹은 동시 접근을 제어하여 일관성과 무결성을 보장하는 병행 제어 기법입니다.',
    guide:'로킹(Locking):\n동시에 여러 트랜잭션이 같은 데이터에 접근할 때\n일관성을 유지하기 위한 병행 제어 기법\n• 공유 록(S-Lock): 읽기 허용\n• 배타 록(X-Lock): 읽기/쓰기 모두 차단' },
  { id:27, type:'multiple', cat:'객관식', pts:2, q:'관계대수에서 SELECT(sigma)의 기능은?', opts:['속성 추출','조건에 맞는 튜플 선택','조인','나누기'], ans:1, exp:'sigma(Select)는 조건식을 만족하는 튜플만 선택하는 수평 연산입니다.',
    guide:'관계대수 연산:\n• σ(Select): 조건에 맞는 행 선택 → WHERE\n• π(Project): 원하는 열 추출 → SELECT 컬럼\n• ⋈(Join): 두 릴레이션 결합 → JOIN\n• ÷(Division): 나누기 연산' },
  { id:28, type:'multiple', cat:'객관식', pts:2, q:'조인(Join) 연산은 두 릴레이션을 어떻게 하는 연산인가?', opts:['나눔','합침','조건 검색','정렬'], ans:1, exp:'조인은 두 릴레이션을 공통 속성을 기준으로 결합하여 하나의 릴레이션을 생성합니다.',
    guide:'조인(Join):\n두 릴레이션을 공통 속성 기준으로 결합\n• INNER JOIN: 일치하는 행만\n• LEFT JOIN: 왼쪽 테이블 모든 행\n• CROSS JOIN: 카티션 곱' },
  { id:29, type:'multiple', cat:'객관식', pts:2, q:'트랜잭션 종료 시 로그를 기반으로 다시 수행하여 복구하는 것은?', opts:['UNDO','REDO','ROLLBACK','COMMIT'], ans:1, exp:'REDO는 로그를 이용해 작업을 다시 수행하여 복구하는 기법입니다.',
    guide:'회복 기법:\n• REDO: 커밋된 트랜잭션을 로그로 재실행\n• UNDO: 미완료 트랜잭션의 변경을 취소\n• 즉시갱신: REDO + UNDO 모두 필요\n• 지연갱신: REDO만 필요' },
  { id:30, type:'multiple', cat:'객관식', pts:2, q:'외래키는 어떤 테이블의 기본키를 참조하는가?', opts:['자기 테이블','다른 테이블','임의의 테이블','시스템 테이블'], ans:1, exp:'외래키는 다른 릴레이션의 기본키를 참조하며, 참조 무결성이 유지됩니다.',
    guide:'외래키(FK):\n• 다른 테이블의 기본키(PK)를 참조\n• 자기 자신 참조도 가능(자기 참조)\n• 테이블 간 관계를 표현\n• 참조 무결성 제약 적용' },
  // 단답식 (31-50)
  { id:31, type:'short', cat:'단답식', pts:2, q:"'행'을 의미하는 릴레이션 용어는?", ans:'튜플', keywords:['튜플','tuple'], exp:'릴레이션에서 한 줄(레코드)을 튜플이라고 합니다.',
    guide:'행(Row) = 튜플(Tuple) = 레코드(Record)\n릴레이션에서 하나의 데이터 단위를 의미합니다.' },
  { id:32, type:'short', cat:'단답식', pts:2, q:"'열'을 의미하는 릴레이션 용어는?", ans:'속성', keywords:['속성','attribute','애트리뷰트'], exp:'릴레이션의 세로 방향, 각 컬럼을 속성(Attribute)이라고 합니다.',
    guide:'열(Column) = 속성(Attribute) = 필드(Field)\n릴레이션에서 데이터의 특성을 나타냅니다.' },
  { id:33, type:'short', cat:'단답식', pts:2, q:'한 테이블에서 속성의 개수를 의미하는 용어는?', ans:'차수', keywords:['차수','degree'], exp:'릴레이션에서 열(속성)의 개수를 차수라고 부릅니다.',
    guide:'차수(Degree) = 릴레이션의 속성(열) 개수\n기수(Cardinality) = 릴레이션의 튜플(행) 개수' },
  { id:34, type:'short', cat:'단답식', pts:2, q:'한 테이블에서 튜플의 개수를 의미하는 용어는?', ans:'기수', keywords:['기수','cardinality','카디널리티'], exp:'릴레이션에서 행(튜플)의 개수를 기수(카디널리티)라고 합니다.',
    guide:'기수(Cardinality) = 릴레이션의 튜플(행) 개수\n차수(Degree) = 릴레이션의 속성(열) 개수' },
  { id:35, type:'short', cat:'단답식', pts:2, q:'기본키로 선정되지 않은 후보키를 무엇이라 하는가?', ans:'대체키', keywords:['대체키','alternate key'], exp:'후보키 중 기본키로 채택되지 않은 나머지 키들을 대체키라고 부릅니다.',
    guide:'후보키 = 기본키 + 대체키\n기본키로 선택되지 않은 나머지 후보키를\n대체키(Alternate Key)라고 합니다.' },
  { id:36, type:'short', cat:'단답식', pts:2, q:'다른 테이블의 PK를 참조하는 속성은?', ans:'외래키', keywords:['외래키','foreign key','FK'], exp:'외래키는 다른 릴레이션의 기본키를 참조하는 속성입니다.',
    guide:'외래키(Foreign Key, FK):\n다른 테이블의 기본키(PK)를 참조하여\n테이블 간 관계를 연결하는 속성입니다.' },
  { id:37, type:'short', cat:'단답식', pts:2, q:'모든 속성이 원자값이어야 함을 의미하는 정규형은?', ans:'제1정규형', keywords:['제1정규형','1NF','1정규형'], exp:'제1정규형은 각 속성이 원자 값만을 가지도록 하는 정규형입니다.',
    guide:'제1정규형(1NF): 모든 속성이 원자 값\n반복 그룹이나 다중 값을 허용하지 않습니다.\n예: "수학,영어" → 별도 행으로 분리' },
  { id:38, type:'short', cat:'단답식', pts:2, q:'부분 함수 종속을 제거한 정규형은?', ans:'제2정규형', keywords:['제2정규형','2NF','2정규형'], exp:'복합키의 일부에만 종속하는 속성이 없도록 한 것이 2NF입니다.',
    guide:'제2정규형(2NF):\n1NF + 부분 함수 종속 제거\n복합키의 일부에만 종속되는 속성을 분리합니다.' },
  { id:39, type:'short', cat:'단답식', pts:2, q:'이행 함수 종속을 제거한 정규형은?', ans:'제3정규형', keywords:['제3정규형','3NF','3정규형'], exp:'일반 속성 간 이행 종속을 제거한 상태가 3NF입니다.',
    guide:'제3정규형(3NF):\n2NF + 이행적 함수 종속 제거\nX→Y, Y→Z에서 X→Z 관계를 분리합니다.' },
  { id:40, type:'short', cat:'단답식', pts:2, q:'트랜잭션이 완전히 실행되거나 전혀 실행되지 않는 성질은?', ans:'원자성', keywords:['원자성','atomicity'], exp:'원자성은 트랜잭션을 모두 수행되거나 전혀 수행되지 않도록 보장하는 특성입니다.',
    guide:'원자성(Atomicity): All or Nothing\n트랜잭션은 분할 불가능한 최소 작업 단위입니다.\n전부 실행되거나 전혀 실행되지 않습니다.' },
  { id:41, type:'short', cat:'단답식', pts:2, q:'트랜잭션 완료 시 데이터가 영구적으로 저장되는 성질은?', ans:'영속성', keywords:['영속성','durability','지속성'], exp:'영속성은 COMMIT 이후 결과가 시스템 고장 이후에도 보존되는 특성입니다.',
    guide:'영속성(Durability):\nCOMMIT된 트랜잭션의 결과는\n시스템 장애가 발생해도 영구적으로 보존됩니다.' },
  { id:42, type:'short', cat:'단답식', pts:2, q:'트랜잭션 간 서로 간섭을 허용하지 않는 성질은?', ans:'고립성', keywords:['고립성','isolation','격리성'], exp:'고립성은 여러 트랜잭션이 동시에 수행되더라도 서로 영향을 주지 못하게 합니다.',
    guide:'고립성(Isolation):\n동시에 실행되는 트랜잭션들이\n서로의 중간 결과를 보거나 간섭할 수 없습니다.' },
  { id:43, type:'short', cat:'단답식', pts:2, q:'조건에 맞는 데이터를 검색하는 SQL 명령어는?', ans:'SELECT', keywords:['SELECT','select'], exp:'SELECT는 테이블에서 원하는 데이터를 조회하는 DML 명령어입니다.',
    guide:'SELECT — 데이터 검색(조회)\nSELECT 컬럼 FROM 테이블 WHERE 조건;\nDML의 대표적인 명령어입니다.' },
  { id:44, type:'short', cat:'단답식', pts:2, q:'새로운 튜플을 삽입하는 SQL 명령어는?', ans:'INSERT', keywords:['INSERT','insert'], exp:'INSERT는 테이블에 새로운 행을 추가하는 명령어입니다.',
    guide:'INSERT — 데이터 삽입\nINSERT INTO 테이블(컬럼) VALUES(값);\n테이블에 새로운 행을 추가합니다.' },
  { id:45, type:'short', cat:'단답식', pts:2, q:'기존 튜플을 수정하는 SQL 명령어는?', ans:'UPDATE', keywords:['UPDATE','update'], exp:'UPDATE는 기존 데이터의 값을 변경하는 명령어입니다.',
    guide:'UPDATE — 데이터 수정\nUPDATE 테이블 SET 컬럼=값 WHERE 조건;\n기존 행의 값을 변경합니다.' },
  { id:46, type:'short', cat:'단답식', pts:2, q:'튜플을 삭제하는 SQL 명령어는?', ans:'DELETE', keywords:['DELETE','delete'], exp:'DELETE는 조건에 맞는 튜플을 삭제하는 DML입니다.',
    guide:'DELETE — 데이터 삭제\nDELETE FROM 테이블 WHERE 조건;\n조건에 맞는 행을 삭제합니다.' },
  { id:47, type:'short', cat:'단답식', pts:2, q:'데이터 정의어(DDL) 중 테이블 생성 명령어는?', ans:'CREATE', keywords:['CREATE','create'], exp:'CREATE는 테이블, 뷰 등의 객체를 새로 생성하는 DDL입니다.',
    guide:'CREATE — 객체 생성 (DDL)\nCREATE TABLE 테이블명 (컬럼 자료형 ...);\n테이블, 뷰, 인덱스 등을 생성합니다.' },
  { id:48, type:'short', cat:'단답식', pts:2, q:'권한을 사용자에게 부여하는 명령어는?', ans:'GRANT', keywords:['GRANT','grant'], exp:'GRANT는 특정 사용자에게 권한을 부여하는 DCL입니다.',
    guide:'GRANT — 권한 부여 (DCL)\nGRANT 권한 ON 객체 TO 사용자;\n예: GRANT SELECT ON 학생 TO user1;' },
  { id:49, type:'short', cat:'단답식', pts:2, q:'권한을 회수하는 명령어는?', ans:'REVOKE', keywords:['REVOKE','revoke'], exp:'REVOKE는 이전에 부여한 권한을 취소하는 명령어입니다.',
    guide:'REVOKE — 권한 회수 (DCL)\nREVOKE 권한 ON 객체 FROM 사용자;\n이전에 GRANT한 권한을 취소합니다.' },
  { id:50, type:'short', cat:'단답식', pts:2, q:'트랜잭션의 변경 내용을 취소하는 명령어는?', ans:'ROLLBACK', keywords:['ROLLBACK','rollback'], exp:'ROLLBACK은 변경 사항을 모두 되돌리고 이전 상태로 복구합니다.',
    guide:'ROLLBACK — 트랜잭션 취소\n변경 사항을 모두 되돌리고\n트랜잭션 시작 전 상태로 복구합니다.' },
];

const TIME_LIMIT = 60 * 60;
const CATS = ['객관식', '단답식'];

/* ─── 채점 ─── */
function scoreQuestion(q, userAns) {
  if (userAns === undefined || userAns === null || userAns === '') return 0;
  if (q.type === 'multiple') return userAns === q.ans ? q.pts : 0;
  const input = String(userAns).trim().toLowerCase();
  if (q.keywords) {
    return q.keywords.some(kw => input === kw.toLowerCase() || input.includes(kw.toLowerCase())) ? q.pts : 0;
  }
  return input === q.ans.toLowerCase() ? q.pts : 0;
}

/* ─── 메인 컴포넌트 ─── */
const DbExamInter = () => {
  useAOS();
  const [phase, setPhase] = useState('intro');
  const [studentName, setStudentName] = useState('');
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [results, setResults] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('객관식');
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase !== 'exam') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === 'exam' && timeLeft === 0) handleSubmit();
  }, [timeLeft, phase]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const startExam = () => { if (studentName.trim()) setPhase('exam'); };

  const saveAnswer = useCallback((val) => {
    setAnswers(prev => ({ ...prev, [cur]: val }));
  }, [cur]);

  const getAnsweredCount = () => Object.keys(answers).filter(k => answers[k] !== '' && answers[k] !== undefined).length;

  const getLiveScore = () => {
    let score = 0;
    questions.forEach((q, i) => { score += scoreQuestion(q, answers[i]); });
    return score;
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    let total = 0;
    const cats = {};
    CATS.forEach(c => { cats[c] = { s: 0, t: 0 }; });
    questions.forEach(q => { cats[q.cat].t += q.pts; });
    const details = questions.map((q, i) => {
      const sc = scoreQuestion(q, answers[i]);
      total += sc;
      cats[q.cat].s += sc;
      return { ...q, userAns: answers[i], score: sc };
    });
    setResults({ total, cats, details, student: studentName, time: TIME_LIMIT - timeLeft });
    setPhase('result');
    setShowConfirm(false);
  };

  const retake = () => {
    setAnswers({}); setCur(0); setTimeLeft(TIME_LIMIT); setResults(null); setPhase('intro'); setActiveTab('객관식');
  };

  /* ─── INTRO ─── */
  if (phase === 'intro') {
    return (
      <>
        <section className="page-header"><div className="container">
          <h1>DB 중급테스트</h1>
          <p>데이터베이스 기초 이론 종합 평가 — 50문제, 100점 만점, 60분</p>
        </div></section>
        <section className="section"><div className="container">
          <div className="exam-intro" data-aos="fade-up">
            <div className="exam-info-grid">
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x2713;</span>
                <strong>객관식</strong><span>30문제 · 60점</span>
              </div>
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x270D;</span>
                <strong>단답식</strong><span>20문제 · 40점</span>
              </div>
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x23F1;</span>
                <strong>제한시간</strong><span>60분</span>
              </div>
              <div className="exam-info-card">
                <span className="exam-info-icon">&#x1F3AF;</span>
                <strong>합격기준</strong><span>70점 이상</span>
              </div>
            </div>
            <div className="exam-notice">
              <h3>시험 안내</h3>
              <ul>
                <li>객관식 30문항(각 2점)과 단답식 20문항(각 2점)으로 구성됩니다.</li>
                <li>시험 시간은 60분이며, 시간 초과 시 자동 제출됩니다.</li>
                <li>문제를 풀면서 학습 가이드를 참고할 수 있습니다.</li>
                <li>제출 후 문제별 해설과 정답을 확인할 수 있습니다.</li>
              </ul>
            </div>
            <div className="exam-start-form">
              <input type="text" placeholder="이름을 입력하세요" value={studentName}
                onChange={e => setStudentName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && startExam()}
                className="exam-name-input" />
              <button onClick={startExam} className="exam-start-btn" disabled={!studentName.trim()}>시험 시작</button>
            </div>
          </div>
        </div></section>
      </>
    );
  }

  /* ─── EXAM ─── */
  if (phase === 'exam') {
    const q = questions[cur];
    const multipleQs = questions.filter(x => x.type === 'multiple');
    const shortQs = questions.filter(x => x.type === 'short');
    const liveScore = getLiveScore();

    return (
      <>
        <section className="page-header exam-header-bar"><div className="container exam-top-bar">
          <span className="exam-student">{studentName}</span>
          <span className="exam-progress-text">{getAnsweredCount()} / {questions.length} 답변</span>
          <span className={`exam-timer ${timeLeft <= 300 ? 'exam-timer--warn' : ''}`}>{fmt(timeLeft)}</span>
        </div></section>
        <section className="section"><div className="container">
          <div className="exam-sidebar-layout">
            {/* 사이드바 */}
            <div className="exam-sidebar">
              <div className="exam-nav-section">
                <h4>객관식 (1-30)</h4>
                <div className="exam-nav-buttons">
                  {multipleQs.map((_, i) => {
                    const gi = i;
                    const answered = answers[gi] !== undefined && answers[gi] !== '';
                    return (
                      <button key={gi} className={`exam-nav-btn ${gi === cur ? 'exam-nav-btn--cur' : ''} ${answered ? 'exam-nav-btn--done' : ''}`}
                        onClick={() => setCur(gi)}>{i + 1}</button>
                    );
                  })}
                </div>
              </div>
              <div className="exam-nav-section">
                <h4>단답식 (31-50)</h4>
                <div className="exam-nav-buttons">
                  {shortQs.map((_, i) => {
                    const gi = 30 + i;
                    const answered = answers[gi] !== undefined && answers[gi] !== '' && answers[gi] !== undefined;
                    return (
                      <button key={gi} className={`exam-nav-btn ${gi === cur ? 'exam-nav-btn--cur' : ''} ${answered ? 'exam-nav-btn--done' : ''}`}
                        onClick={() => setCur(gi)}>{31 + i}</button>
                    );
                  })}
                </div>
              </div>
              <div className="exam-score-tracker">
                <h4>예상 점수</h4>
                <div className="exam-live-score">{liveScore}<span> / 100</span></div>
                <div className="exam-progress-track">
                  <div className="exam-progress-fill" style={{ width: `${liveScore}%` }} />
                </div>
              </div>
            </div>

            {/* 문제 영역 */}
            <div className="exam-question-area">
              <div className="exam-q-header">
                <span className="exam-q-num">문제 {cur + 1}</span>
                <span className="exam-q-meta">{q.cat} · {q.pts}점</span>
              </div>
              <p className="exam-q-text">{q.q}</p>

              {q.type === 'multiple' ? (
                <div className="exam-options">
                  {q.opts.map((opt, oi) => (
                    <label key={oi} className={`exam-option ${answers[cur] === oi ? 'exam-option--sel' : ''}`}>
                      <input type="radio" name={`q${cur}`} checked={answers[cur] === oi}
                        onChange={() => saveAnswer(oi)} />
                      {opt}
                    </label>
                  ))}
                </div>
              ) : (
                <textarea className="exam-textarea" rows={3}
                  placeholder="답을 입력하세요..."
                  value={answers[cur] || ''}
                  onChange={e => saveAnswer(e.target.value)} />
              )}

              <div className="exam-controls">
                <button className="exam-ctrl-btn" disabled={cur === 0} onClick={() => setCur(cur - 1)}>이전</button>
                {cur < questions.length - 1 ? (
                  <button className="exam-ctrl-btn exam-ctrl-btn--next" onClick={() => setCur(cur + 1)}>다음</button>
                ) : (
                  <button className="exam-ctrl-btn exam-ctrl-btn--submit" onClick={() => setShowConfirm(true)}>제출</button>
                )}
              </div>
            </div>

            {/* 학습 가이드 */}
            <div className="exam-guide-area">
              <div className="exam-guide-panel">
                <h4>📖 학습 가이드</h4>
                {q.guide ? (
                  <div className="exam-guide-content">
                    <pre>{q.guide}</pre>
                  </div>
                ) : (
                  <p className="exam-guide-empty">이 문제에 대한 가이드가 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          {/* 제출 확인 모달 */}
          {showConfirm && (
            <div className="exam-modal-overlay" onClick={() => setShowConfirm(false)}>
              <div className="exam-modal" onClick={e => e.stopPropagation()}>
                <h3>시험 제출 확인</h3>
                <div className="exam-modal-stats">
                  <p>답변: <strong>{getAnsweredCount()}</strong> / {questions.length}</p>
                  <p>미답변: <strong style={{color:'var(--warning-color,#f59e0b)'}}>{questions.length - getAnsweredCount()}</strong>개</p>
                  <p>예상 점수: <strong style={{color:'var(--primary-color,#3b82f6)'}}>{liveScore}</strong>점</p>
                </div>
                <p className="exam-modal-warn">제출 후에는 답안을 수정할 수 없습니다.</p>
                <div className="exam-modal-actions">
                  <button className="exam-ctrl-btn exam-ctrl-btn--submit" onClick={handleSubmit}>제출</button>
                  <button className="exam-ctrl-btn" onClick={() => setShowConfirm(false)}>취소</button>
                </div>
              </div>
            </div>
          )}
        </div></section>
      </>
    );
  }

  /* ─── RESULT ─── */
  const { total, cats, details, student, time } = results;
  const grade = total >= 90 ? 'A' : total >= 80 ? 'B' : total >= 70 ? 'C' : total >= 60 ? 'D' : 'F';
  const gradeColor = total >= 90 ? '#22c55e' : total >= 80 ? '#3b82f6' : total >= 70 ? '#f59e0b' : '#ef4444';
  const correctCount = details.filter(d => d.score === d.pts).length;

  return (
    <>
      <section className="page-header"><div className="container">
        <h1>시험 결과</h1>
        <p>{student}님의 중급테스트 결과입니다</p>
      </div></section>
      <section className="section"><div className="container">
        <div className="exam-result-summary" data-aos="fade-up">
          <div className="exam-score-circle" style={{ borderColor: gradeColor }}>
            <span className="exam-score-num" style={{ color: gradeColor }}>{total}</span>
            <span className="exam-score-label">/ 100</span>
          </div>
          <div className="exam-score-info">
            <span className="exam-grade" style={{ background: gradeColor }}>{grade}등급</span>
            <span>소요시간: {fmt(time)}</span>
            <span>정답률: {Math.round(correctCount / questions.length * 100)}%</span>
            <span>정답: {correctCount} / {questions.length}</span>
          </div>
        </div>

        <div className="exam-cat-scores" data-aos="fade-up" data-aos-delay="100">
          {Object.entries(cats).map(([cat, { s, t }]) => (
            <div key={cat} className="exam-cat-bar">
              <div className="exam-cat-label"><strong>{cat}</strong><span>{s} / {t}</span></div>
              <div className="exam-bar-track"><div className="exam-bar-fill" style={{ width: `${(s/t)*100}%`, background: gradeColor }} /></div>
            </div>
          ))}
        </div>

        <div className="exam-result-tabs" data-aos="fade-up" data-aos-delay="150">
          {CATS.map(c => (
            <button key={c} className={`exam-tab-btn ${activeTab === c ? 'exam-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(c)}>{c} ({details.filter(d => d.cat === c).length})</button>
          ))}
        </div>

        <div className="exam-detail-list">
          {details.filter(d => d.cat === activeTab).map((d) => (
            <details key={d.id} className={`exam-detail-item ${d.score === d.pts ? 'exam-detail--ok' : 'exam-detail--wrong'}`}>
              <summary>
                <span className="exam-detail-num">Q{d.id}</span>
                <span className="exam-detail-q">{d.q.length > 60 ? d.q.slice(0,60)+'...' : d.q}</span>
                <span className="exam-detail-score">{d.score}/{d.pts}</span>
              </summary>
              <div className="exam-detail-body">
                <p><strong>내 답안:</strong></p>
                <pre className="exam-detail-ans">{d.type === 'multiple' ? (d.userAns !== undefined ? d.opts[d.userAns] : '(미답변)') : (d.userAns || '(미답변)')}</pre>
                <p><strong>정답:</strong></p>
                <pre className="exam-detail-ans exam-detail-correct">{d.type === 'multiple' ? d.opts[d.ans] : d.ans}</pre>
                {d.exp && <div className="exam-explanation"><strong>해설:</strong> {d.exp}</div>}
              </div>
            </details>
          ))}
        </div>

        <div className="exam-result-actions" data-aos="fade-up">
          <button className="exam-ctrl-btn exam-ctrl-btn--next" onClick={retake}>다시 풀기</button>
          <button className="exam-ctrl-btn" onClick={() => window.print()}>인쇄</button>
        </div>
      </div></section>
    </>
  );
};

export default DbExamInter;
