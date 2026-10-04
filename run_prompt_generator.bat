@echo off
chcp 65001 >nul
title AI Studio - 100 Layered Image Codes Generator
python "%~dp0ai-studio-tools\prompt_generator.py"
pause
