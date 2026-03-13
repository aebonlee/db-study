COLUMN object_name FORMAT A40
COLUMN number_of_blocks FORMAT 999,999,999,999

SELECT o.object_name, bh.status, COUNT(*) number_of_blocks, COUNT(*)*8000/1024168 SIZE_MB
FROM DBA_OBJECTS o, V$BH bh
WHERE o.data_object_id = bh.OBJD
AND o.owner != 'SYS'
GROUP BY o.object_Name, bh.status
ORDER BY 2 DESC;