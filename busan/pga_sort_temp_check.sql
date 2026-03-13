
-- [1] PGA 설정 수동화
ALTER SESSION SET WORKAREA_SIZE_POLICY = MANUAL;
ALTER SESSION SET SORT_AREA_SIZE = 100000;

-- [2] 정렬 대상 테이블 생성
BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE sort_test PURGE';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

CREATE TABLE sort_test AS
SELECT LEVEL AS id, DBMS_RANDOM.STRING('U', 10) AS name
FROM dual CONNECT BY LEVEL <= 100000;

-- [3] 정렬 수행
SELECT * FROM sort_test ORDER BY name;

-- [4] TEMP 사용 여부 확인
SELECT username, tablespace, blocks, segtype, sql_id
FROM v$tempseg_usage;

-- [5] 현재 세션 PGA 사용량 확인
SELECT name, ROUND(value/1024/1024, 2) AS value_mb
FROM v$sesstat s, v$statname n
WHERE s.statistic# = n.statistic#
  AND s.sid = (SELECT sid FROM v$mystat WHERE ROWNUM = 1)
  AND name LIKE '%session PGA%';

-- [6] PGA 자동 복원
ALTER SESSION SET WORKAREA_SIZE_POLICY = AUTO;
