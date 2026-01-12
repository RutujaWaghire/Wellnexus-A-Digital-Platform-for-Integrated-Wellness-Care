#!/bin/bash

# Wellnexus Quick Start Script
# This script helps start both backend and frontend servers

echo "🚀 Wellnexus Platform - Quick Start"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -d "wellness_backend" ] || [ ! -d "wellness_project" ]; then
    echo "❌ Error: Please run this script from the root directory of the project"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

# Check Java
if command_exists java; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
    echo "✅ Java $JAVA_VERSION found"
else
    echo "❌ Java not found. Please install Java 17 or higher"
    exit 1
fi

# Check Maven
if command_exists mvn || [ -f "wellness_backend/mvnw" ]; then
    echo "✅ Maven found"
else
    echo "❌ Maven not found. Please install Maven 3.6+"
    exit 1
fi

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js $NODE_VERSION found"
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check MySQL
if command_exists mysql; then
    echo "✅ MySQL found"
else
    echo "⚠️  MySQL not found. Make sure MySQL is installed and running"
fi

echo ""
echo "📝 Setup Instructions:"
echo "1. Make sure MySQL is running"
echo "2. Create database: CREATE DATABASE wellness_db;"
echo "3. Configure wellness_backend/src/main/resources/application.properties"
echo ""
read -p "Have you completed the setup? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please complete the setup first and run this script again."
    exit 0
fi

echo ""
echo "🔧 Starting services..."
echo ""

# Start backend in background
echo "🟢 Starting Backend (Spring Boot)..."
cd wellness_backend
if [ -f "mvnw" ]; then
    ./mvnw spring-boot:run > ../backend.log 2>&1 &
else
    mvn spring-boot:run > ../backend.log 2>&1 &
fi
BACKEND_PID=$!
cd ..
echo "   Backend PID: $BACKEND_PID"
echo "   Backend URL: http://localhost:8080"
echo "   Swagger UI: http://localhost:8080/swagger-ui.html"
echo "   Logs: backend.log"

# Wait a bit for backend to start
sleep 5

# Install frontend dependencies if needed
if [ ! -d "wellness_project/node_modules" ]; then
    echo ""
    echo "📦 Installing frontend dependencies..."
    cd wellness_project
    npm install
    cd ..
fi

# Start frontend
echo ""
echo "🟢 Starting Frontend (React + Vite)..."
cd wellness_project
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo "   Frontend PID: $FRONTEND_PID"
echo "   Frontend URL: http://localhost:5173"
echo "   Logs: frontend.log"

echo ""
echo "✅ Services started successfully!"
echo ""
echo "📝 Service Information:"
echo "   Backend:  http://localhost:8080 (PID: $BACKEND_PID)"
echo "   Frontend: http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""
echo "📊 To view logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop services:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   Or press Ctrl+C and run: pkill -f 'spring-boot:run'"
echo ""
echo "🌐 Open http://localhost:5173 in your browser to access the application"
echo ""

# Save PIDs to file for easy cleanup
echo "$BACKEND_PID" > .pids
echo "$FRONTEND_PID" >> .pids

# Wait for user input
read -p "Press Enter to stop all services..."

# Cleanup
echo ""
echo "🛑 Stopping services..."
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
pkill -f "spring-boot:run" 2>/dev/null
pkill -f "vite" 2>/dev/null
rm -f .pids

echo "✅ All services stopped"
