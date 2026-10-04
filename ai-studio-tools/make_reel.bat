@echo off
chcp 65001 >nul
title AI Studio - Reel & Video Montage Engine (Abdel Salam)
color 0B

echo ================================================================
echo        AM Marketing AI Studio - صانع الريلز والمونتاج الذكي
echo                 المطور: عبد السلام (Abdel Salam)
echo ================================================================
echo.

if "%~1"=="" goto interactive

:: Drag and drop mode
set INPUT_FILE=%~1
echo [!] تم استلام الملف: %INPUT_FILE%
echo.
echo 1. تحويل لفيديو ريلز عمودي 9:16 (مع خلفية بلور سنمائية)
echo 2. تحويل صورة AI إلى فيديو حركي Ken Burns Zoom (مدة 6 ثواني)
echo.
set /p MODE="اختر رقم العملية (1 أو 2): "

if "%MODE%"=="1" (
    python "%~dp0ai_reel_maker.py" --mode convert --input "%INPUT_FILE%"
) else (
    python "%~dp0ai_reel_maker.py" --mode motion --input "%INPUT_FILE%" --duration 6
)
goto finish

:interactive
python "%~dp0ai_reel_maker.py"

:finish
echo.
echo ================================================================
echo  تم الانتهاء! تجد الفيديو في المجلد: D:\portfolio\public\assets\videos\
echo ================================================================
pause
