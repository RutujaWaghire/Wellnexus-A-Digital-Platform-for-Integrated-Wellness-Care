@echo off
REM Wellnexus Quick Start Script for Windows
REM This script helps start both backend and frontend servers

echo ========================================
echo Wellnexus Platform - Quick Start
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "wellness_backend" (
    echo Error: wellness_backend directory not found
    echo Please run this script from the root directory of the project
    pause
    exit /b 1
)

if not exist "wellness_project" (
    echo Error: wellness_project directory not found
    echo Please run this script from the root directory of the project
    pause
    exit /b 1
)

echo Checking prerequisites...
echo.

REM Check Java
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Java not found. Please install Java 17 or higher
    pause
    exit /b 1
) else (
    echo [OK] Java found
)

REM Check Maven
if exist "wellness_backend\mvnw.cmd" (
    echo [OK] Maven wrapper found
) else (
    where mvn >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo [X] Maven not found. Please install Maven 3.6+
        pause
        exit /b 1
    ) else (
        echo [OK] Maven found
    )
)

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
) else (
    echo [OK] Node.js found
)

REM Check MySQL
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] MySQL not found. Make sure MySQL is installed and running
) else (
    echo [OK] MySQL found
)

echo.
echo Setup Instructions:
echo 1. Make sure MySQL is running
echo 2. Create database: CREATE DATABASE wellness_db;
echo 3. Configure wellness_backend\src\main\resources\application.properties
echo.
set /p continue="Have you completed the setup? (y/n) "
if /i not "%continue%"=="y" (
    echo Please complete the setup first and run this script again.
    pause
    exit /b 0
)

echo.
echo Starting services...
echo.

REM Start Backend
echo Starting Backend (Spring Boot)...
cd wellness_backend
if exist "mvnw.cmd" (
    start "Wellnexus Backend" cmd /c "mvnw.cmd spring-boot:run"
) else (
    start "Wellnexus Backend" cmd /c "mvn spring-boot:run"
)
cd ..
echo    Backend URL: http://localhost:8080
echo    Swagger UI: http://localhost:8080/swagger-ui.html

REM Wait for backend to start
echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

REM Install frontend dependencies if needed
if not exist "wellness_project\node_modules" (
    echo.
    echo Installing frontend dependencies...
    cd wellness_project
    call npm install
    cd ..
)

REM Start Frontend
echo.
echo Starting Frontend (React + Vite)...
cd wellness_project
start "Wellnexus Frontend" cmd /c "npm run dev"
cd ..
echo    Frontend URL: http://localhost:5173

echo.
echo ========================================
echo Services started successfully!
echo ========================================
echo.
echo Service Information:
echo    Backend:  http://localhost:8080
echo    Frontend: http://localhost:5173
echo.
echo The services are running in separate windows.
echo Close those windows to stop the services.
echo.
echo Open http://localhost:5173 in your browser to access the application
echo.
pause
