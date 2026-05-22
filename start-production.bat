@echo off
echo ========================================
echo Bakong Vendor Bot - Production Start
echo ========================================
echo.

REM Check if PM2 is installed
where pm2 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo PM2 is not installed. Installing PM2...
    call npm install -g pm2
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install PM2. Please run: npm install -g pm2
        pause
        exit /b 1
    )
)

echo Starting bot with PM2...
call pm2 start ecosystem.config.js

echo.
echo ========================================
echo Bot started successfully!
echo ========================================
echo.
echo Useful commands:
echo   pm2 status          - View bot status
echo   pm2 logs bakong-bot - View logs
echo   pm2 restart bakong-bot - Restart bot
echo   pm2 stop bakong-bot - Stop bot
echo   pm2 monit           - Monitor resources
echo.
echo To save PM2 configuration (auto-start on reboot):
echo   pm2 save
echo   pm2 startup
echo.
pause
