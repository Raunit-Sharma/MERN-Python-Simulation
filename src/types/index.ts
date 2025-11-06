export interface GasReading {
  NH3: number;
  H2S: number;
  TMA: number;
  DMS: number;
}

export interface LEDStatus {
  NH3_LED: 'Green' | 'Yellow' | 'Red';
  H2S_LED: 'Green' | 'Yellow' | 'Red';
  TMA_LED: 'Green' | 'Yellow' | 'Red';
  DMS_LED: 'Green' | 'Yellow' | 'Red';
  Food_Status: 'Fresh' | 'Spoiled';
}

export interface GasConfig {
  name: string;
  label: string;
  threshold: number;
  unit: string;
  max: number;
}
