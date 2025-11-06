import { GasConfig } from '../types';

interface GasSliderProps {
  config: GasConfig;
  value: number;
  onChange: (value: number) => void;
}

export default function GasSlider({ config, value, onChange }: GasSliderProps) {
  const percentage = (value / config.max) * 100;
  const isWarning = value > config.threshold * 0.7;
  const isDanger = value > config.threshold;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700">
          {config.label}
        </label>
        <span className={`text-lg font-bold ${isDanger ? 'text-red-600' : isWarning ? 'text-yellow-600' : 'text-green-600'}`}>
          {value.toFixed(2)} {config.unit}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max={config.max}
        step={config.max > 10 ? 0.5 : 0.01}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #22c55e 0%, #22c55e ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
        }}
      />

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0</span>
        <span className="text-red-500 font-medium">Threshold: {config.threshold}</span>
        <span>{config.max}</span>
      </div>
    </div>
  );
}
