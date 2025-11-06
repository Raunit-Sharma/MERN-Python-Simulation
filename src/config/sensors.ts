import { GasConfig } from '../types';

export const GAS_SENSORS: Record<string, GasConfig> = {
  NH3: {
    name: 'NH3',
    label: 'Ammonia (NH₃)',
    threshold: 7.5,
    unit: 'ppm',
    max: 20,
  },
  H2S: {
    name: 'H2S',
    label: 'Hydrogen Sulfide (H₂S)',
    threshold: 0.2,
    unit: 'ppm',
    max: 2,
  },
  TMA: {
    name: 'TMA',
    label: 'Trimethylamine (TMA)',
    threshold: 10,
    unit: 'ppm',
    max: 30,
  },
  DMS: {
    name: 'DMS',
    label: 'Dimethyl Sulfide (DMS)',
    threshold: 1,
    unit: 'ppm',
    max: 5,
  },
};
