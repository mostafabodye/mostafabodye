@echo off
chcp 65001 >nul
cd /d "%~dp0ai-studio-tools"
call "make_reel.bat" %*
