# Food Freshness Simulation - Multi-Gas Sensor System

A full-stack web application simulating a food spoilage detection system using multi-gas sensors (NH3, H2S, TMA, DMS) with real-time LED indicators and breadboard-style circuit visualization.

## 🎯 Project Overview

This simulation demonstrates how gas sensors detect food spoilage by measuring volatile organic compounds. The system:
- Reads gas concentration levels (in ppm) from sensors
- Analyzes thresholds using Python-based logic
- Displays LED status indicators (Green/Yellow/Red)
- Provides visual circuit diagram simulation
- Allows dataset navigation with automatic analysis

## 🏗️ Architecture

**3-Tier Stack:**
1. **Frontend** - React + TypeScript + Vite + Tailwind CSS
2. **Backend** - Node.js + Express (API Gateway)
3. **Analysis Service** - Python + Flask (Threshold Analysis Logic)

**Data Flow:**
```
Frontend (Sliders/Dataset) 
    ↓ POST /api/simulate
Backend (Node.js Port 3001) 
    ↓ POST /analyze
Python Service (Flask Port 5000)
    ↓ Returns LED Status
Frontend Updates UI & Circuit
```

## 📋 Prerequisites

- **Node.js** (v16+)
- **Python** (3.8+)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1️⃣ Install Frontend Dependencies

```powershell
cd "d:\Raunit\Raunit's Skillset\Research\Food Freshness Simulation"
npm install
```

### 2️⃣ Install Backend Dependencies

```powershell
cd backend
npm install
cd ..
```

### 3️⃣ Setup Python Virtual Environment

```powershell
cd python-service
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd ..
```

## ▶️ Running the Application

### **🚀 Option 1: Run All Services at Once (Recommended)**

From the root directory, run:

```powershell
npm run all
```

This will start all three services concurrently in a single terminal with color-coded output.

**Alternative - Separate Windows:**
```powershell
.\start-all.ps1
```

This PowerShell script opens each service in its own terminal window.

---

### **🔧 Option 2: Manual Start (3 Terminals)**

You need **3 terminals** running simultaneously:

#### Terminal 1: Python Service (Port 5000)

```powershell
cd "d:\Raunit\Raunit's Skillset\Research\Food Freshness Simulation\python-service"
.venv\Scripts\Activate.ps1
python app.py
```

**Expected Output:**
```
* Running on http://127.0.0.1:5000
* Debug mode: on
```

#### Terminal 2: Backend API (Port 3001)

```powershell
cd "d:\Raunit\Raunit's Skillset\Research\Food Freshness Simulation\backend"
npm start
```

**Expected Output:**
```
Node.js backend running on port 3001
Python service URL: http://localhost:5000
```

#### Terminal 3: Frontend Dev Server (Port 5173)

```powershell
cd "d:\Raunit\Raunit's Skillset\Research\Food Freshness Simulation"
npm run dev
```

**Expected Output:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 4️⃣ Open the Application

Navigate to **http://localhost:5173** in your browser.

## 🎮 Features Implemented

### ✅ **1. Breadboard-Style Circuit Simulation**
- SVG-based interactive circuit diagram
- Shows Arduino board, 4 gas sensors, 4 LEDs
- Animated signal wires when sensors are active
- Real-time LED color updates (Green/Yellow/Red)
- Breadboard aesthetic with hole patterns and power rails

### ✅ **2. Dataset Navigation**
- **Previous/Next** buttons to iterate through 20 CSV data rows
- **Wrap-around navigation** (last → first, first → last)
- **Auto-updates sliders** with dataset values
- **Auto-simulation** on every navigation
- Shows current position: "X / 20"
- Displays expected status: "✓ Fresh" or "⚠️ Spoiled"

### ✅ **3. Manual Gas Control**
- 4 interactive sliders for NH3, H2S, TMA, DMS
- Real-time color feedback (green → yellow → red)
- Manual "Simulate Detection" button
- Range: 0 to max ppm for each gas

### ✅ **4. LED Status Display**
- 4 individual gas LEDs with live animations
- Main "Food Status" LED (Fresh/Spoiled)
- Threshold reference table

## 📊 Dataset Structure

Located at: `backend/dataset/gas_sensor_dataset.csv`

**Format:**
```csv
NH3 (ppm),H2S (ppm),TMA (ppm),DMS (ppm),Food Spoiled
4.23,0.08,6.15,0.72,No
11.37,0.18,8.56,0.92,Yes
...
```

**20 sample rows** with various gas concentration levels.

## 🔧 Gas Thresholds

| Gas | Threshold | Warning (70%) | Unit |
|-----|-----------|---------------|------|
| NH3 (Ammonia) | 7.5 | 5.25 | ppm |
| H2S (Hydrogen Sulfide) | 0.2 | 0.14 | ppm |
| TMA (Trimethylamine) | 10.0 | 7.0 | ppm |
| DMS (Dimethyl Sulfide) | 1.0 | 0.7 | ppm |

**LED Logic:**
- **Green**: Below 70% of threshold
- **Yellow**: 70-99% of threshold
- **Red**: At or above threshold
- **Food Status = Spoiled** if ANY gas LED is Red

## 📁 Project Structure

```
.
├── backend/
│   ├── dataset/
│   │   └── gas_sensor_dataset.csv    # 20 sample gas readings
│   ├── server.js                      # Express API (ports 3001)
│   └── package.json
├── python-service/
│   ├── app.py                         # Flask analysis service
│   ├── requirements.txt               # Flask==3.0.0, Flask-CORS==4.0.0
│   └── .venv/                         # Virtual environment (created)
├── src/
│   ├── components/
│   │   ├── CircuitDiagram.tsx         # ⭐ NEW: Breadboard SVG circuit
│   │   ├── GasSlider.tsx              # Gas control slider
│   │   ├── LEDIndicator.tsx           # LED status display
│   │   └── MicrocontrollerDiagram.tsx # (optional legacy)
│   ├── config/
│   │   └── sensors.ts                 # Sensor metadata & thresholds
│   ├── services/
│   │   └── api.ts                     # ⭐ UPDATED: Added fetchDataset()
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   ├── App.tsx                        # ⭐ UPDATED: Dataset nav + auto-sim
│   └── main.tsx
├── package.json                       # Frontend dependencies
└── README.md                          # This file
```

## 🌐 API Endpoints

### Backend (Port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/simulate` | Forward gas readings to Python service |
| GET | `/api/dataset` | ⭐ **NEW**: Returns CSV dataset as JSON array |
| GET | `/health` | Health check |

### Python Service (Port 5000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyze` | Analyze gas readings, return LED status |
| GET | `/health` | Health check with thresholds |

## 🧪 Testing

### Test Dataset API:
```powershell
curl http://localhost:3001/api/dataset
```

### Test Analysis Endpoint:
```powershell
curl -X POST http://localhost:5000/analyze `
  -H "Content-Type: application/json" `
  -d '{"NH3":8.5,"H2S":0.15,"TMA":11.0,"DMS":0.9}'
```

### Test Full Flow via Backend:
```powershell
curl -X POST http://localhost:3001/api/simulate `
  -H "Content-Type: application/json" `
  -d '{"NH3":3.0,"H2S":0.05,"TMA":5.0,"DMS":0.4}'
```

## 🎨 UI Components

1. **Gas Sensor Controls** - Left panel with 4 sliders
2. **Dataset Navigation** - Previous/Next buttons with counter
3. **Circuit Diagram** - Breadboard-style SVG visualization
4. **LED Status Panel** - Right panel with 4 gas LEDs + Food Status
5. **Threshold Reference** - Quick lookup table

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Find process using port 3001 or 5000
netstat -ano | findstr :3001
netstat -ano | findstr :5000

# Kill process by PID
taskkill /PID <PID> /F
```

### Python Virtual Environment Not Activating
```powershell
# Allow script execution (run as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then retry activation
.venv\Scripts\Activate.ps1
```

### Backend Can't Connect to Python Service
- Ensure Python service is running on port 5000
- Check `PYTHON_SERVICE_URL` environment variable
- Verify Flask output shows "Running on http://127.0.0.1:5000"

### Frontend Can't Connect to Backend
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify `VITE_API_URL` (defaults to http://localhost:3001)

## 🔮 Future Enhancements

- [ ] Add more dataset samples
- [ ] Export analysis results to CSV
- [ ] Real-time chart/graph of gas levels over time
- [ ] Configurable thresholds via UI
- [ ] Docker Compose for one-command startup
- [ ] Unit tests for Python analysis logic
- [ ] E2E tests with Playwright

## 📝 Notes

- **All Python commands must run inside the virtual environment** (`.venv`)
- Dataset navigation uses **wrap-around** (circular navigation)
- Auto-simulation triggers on **every dataset row change**
- Circuit diagram shows **animated wires** when gas levels are high
- TypeScript type errors are compile-time only; app runs fine after `npm install`

## 👨‍💻 Development Scripts

```powershell
# Frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
npm start            # Start Node.js server
npm run dev          # Start with --watch (auto-restart)

# Python (in virtual environment)
python app.py        # Start Flask server
```

## 📄 License

This project is for research and educational purposes.

---

**Created for:** Food Freshness Research Project  
**Last Updated:** November 6, 2025
