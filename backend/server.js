import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5000';

app.use(cors());
app.use(express.json());

app.post('/api/simulate', async (req, res) => {
  try {
    const gasReadings = req.body;

    console.log('Received gas readings:', gasReadings);

    const response = await fetch(`${PYTHON_SERVICE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gasReadings),
    });

    if (!response.ok) {
      throw new Error(`Python service responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Analysis result:', result);

    res.json(result);
  } catch (error) {
    console.error('Error communicating with Python service:', error);
    res.status(500).json({
      error: 'Failed to analyze gas readings',
      message: error.message,
    });
  }
});

app.get('/api/dataset', (req, res) => {
  try {
    const datasetPath = path.join(__dirname, 'dataset', 'gas_sensor_dataset.csv');
    const csvData = fs.readFileSync(datasetPath, 'utf-8');
    
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    
    const dataset = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        NH3: parseFloat(values[0]),
        H2S: parseFloat(values[1]),
        TMA: parseFloat(values[2]),
        DMS: parseFloat(values[3]),
        foodSpoiled: values[4].trim()
      };
    });
    
    res.json(dataset);
  } catch (error) {
    console.error('Error reading dataset:', error);
    res.status(500).json({
      error: 'Failed to load dataset',
      message: error.message,
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Node.js backend running on port ${PORT}`);
  console.log(`Python service URL: ${PYTHON_SERVICE_URL}`);
});
