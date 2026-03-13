@echo off
echo [Oracle 23c Free SCOTT 계정 및 PDB 설정 시작]

sqlplus / as sysdba @create_scott.sql

echo [설정 완료]
pause