@echo off
title سيرفر تشغيل محلي - AM Marketing
echo ========================================================
echo  AM Marketing ^| سيرفر المعاينة المحلي
echo ========================================================
echo جاري تشغيل سيرفر محلي على المنفذ 8080...
echo الرابط: http://localhost:8080
echo.
echo للإنهاء اضغط Ctrl + C
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Start-Process 'http://localhost:8080/index.html'; while ($listener.IsListening) { $context = $listener.GetContext(); $req = $context.Request; $res = $context.Response; $path = Join-Path '%~dp0' $req.Url.LocalPath.TrimStart('/'); if (-not (Test-Path $path) -or (Get-Item $path).PSIsContainer) { $path = Join-Path '%~dp0' 'index.html' }; $bytes = [System.IO.File]::ReadAllBytes($path); $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length); $res.OutputStream.Close() }"
pause
