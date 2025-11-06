# Food Freshness Simulation - Startup Script
# This script starts all three services in separate windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Food Freshness Simulation - Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

# Start Python Service (Port 5000)
Write-Host "Starting Python Flask Service (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\python-service'; .\.venv\Scripts\Activate.ps1; Write-Host 'Python Flask Service Running on http://127.0.0.1:5000' -ForegroundColor Green; python app.py"

# Wait a moment for Python service to start
Start-Sleep -Seconds 3

# Start Node.js Backend (Port 3001)
Write-Host "Starting Node.js Backend (Port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\backend'; Write-Host 'Node.js Backend Running on http://localhost:3001' -ForegroundColor Green; npm start"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend (Port 5173)
Write-Host "Starting Vite Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath'; Write-Host 'Vite Frontend Running on http://localhost:5173' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "All services are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Open your browser and navigate to:" -ForegroundColor White
Write-Host "http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
