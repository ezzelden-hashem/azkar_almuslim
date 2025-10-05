@echo off
title Installing Capacitor, and React dependencies...

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
@mui/material ^
@emotion/react ^
@emotion/styled ^
@mui/icons-material ^
@reduxjs/toolkit ^
react-redux ^
react-router ^
react-i18next ^
i18next ^
jeep-sqlite@latest --save


npm install --save-dev ^
eslint ^
@typescript-eslint/parser ^
@typescript-eslint/eslint-plugin ^
prettier

npm audit fix

color 7

echo ==============================
echo  Setting up TypeScript for React
echo ==============================

REM Step 1: Install TypeScript and type definitions
echo Installing TypeScript and React type definitions...
npm install --save typescript @types/react @types/react-dom @types/node

REM Step 2: Initialize tsconfig.json
echo Initializing tsconfig.json...
npx tsc --init

REM Step 3: Overwrite with custom configuration
echo Writing custom tsconfig.json...
(
echo {
echo   "compilerOptions": {
echo     "target": "ESNext",
echo     "lib": ["DOM", "DOM.Iterable", "ESNext"],
echo     "allowJs": true,
echo     "skipLibCheck": true,
echo     "esModuleInterop": true,
echo     "allowSyntheticDefaultImports": true,
echo     "strict": true,
echo     "forceConsistentCasingInFileNames": true,
echo     "module": "ESNext",
echo     "moduleResolution": "Node",
echo     "resolveJsonModule": true,
echo     "isolatedModules": true,
echo     "noEmit": true,
echo     "jsx": "react-jsx",
echo     "baseUrl": "src",
echo     "paths": {
echo       "@/*": ["*"]
echo     }
echo   },
echo   "include": ["src"]
echo }
) > tsconfig.json


REM Step 4: Confirm done
echo ==============================
echo TypeScript configuration complete!
echo ==============================


color 6


echo.
echo.
echo.
echo.
echo.
echo ==============================
echo Initializing React Project Structure...
echo ==============================

REM Go into the src folder
cd src

REM Create main directories
mkdir api
mkdir assets
mkdir components
mkdir context
mkdir hooks
mkdir pages
mkdir routes
mkdir services
mkdir store
mkdir styles
mkdir types
mkdir utils

REM Create subdirectories
mkdir assets\images
mkdir assets\fonts
mkdir assets\icons

mkdir components\common
mkdir components\layout
mkdir components\ui

mkdir pages\Home
mkdir pages\About

mkdir store\slices

echo ==============================
echo ✅ Folder structure created successfully!
echo ==============================

color 7

echo.
echo.
echo.
echo ==================================================
echo ✅ All dependencies installed successfully!
echo ==================================================
pause
