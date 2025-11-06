import { GasReading, LEDStatus } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface DatasetRow extends GasReading {
  foodSpoiled: string;
}

export async function simulateSpoilageDetection(readings: GasReading): Promise<LEDStatus> {
  const response = await fetch(`${API_URL}/api/simulate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(readings),
  });

  if (!response.ok) {
    throw new Error('Failed to simulate spoilage detection');
  }

  return response.json();
}

export async function fetchDataset(): Promise<DatasetRow[]> {
  const response = await fetch(`${API_URL}/api/dataset`);

  if (!response.ok) {
    throw new Error('Failed to fetch dataset');
  }

  return response.json();
}
