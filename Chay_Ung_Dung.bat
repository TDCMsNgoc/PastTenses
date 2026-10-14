@echo off
title Phan Mem Trac Nghiem 20 Cau - Past Tenses
chcp 65001 > nul
cd /d "%~dp0"

echo =========================================================
echo    KHOI DONG PHAN MEM TRAC NGHIEM PAST TENSES (20 CAU)
echo =========================================================
echo Dang khoi dong may chu web local...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

pause
