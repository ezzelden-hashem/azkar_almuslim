@echo off
title Installing Capacitor, and Ionic dependencies...
color 6

echo ==================================================
echo   Installing all dependencies via npm...
echo ==================================================
echo.
cd .
REM Install all dependencies
npm install ^
@capacitor/cli ^
@capacitor/core ^
@capacitor/android ^
@capacitor/ios ^
@capacitor/device ^
@capacitor/network ^
@capacitor/preferences ^
@capacitor/app ^
@capacitor/geolocation ^
@capacitor/camera ^
@capacitor/filesystem ^
@capacitor/haptics ^
@capacitor/share ^
@capacitor/push-notifications ^
@capacitor/clipboard ^
@capacitor/browser ^
@capacitor/dialog ^
@capacitor/toast ^
@capacitor-community/sqlite ^
@ionic/react ^
@ionic/cli ^
@ionic/core ^
jeep-sqlite@latest --save

npm audit fix

echo.
echo ==================================================
echo ✅ All dependencies installed successfully!
echo ==================================================
pause
