import { GasReading, LEDStatus } from '../types';

interface CircuitDiagramProps {
  gasReadings: GasReading;
  ledStatus: LEDStatus;
}

export default function CircuitDiagram({ gasReadings, ledStatus }: CircuitDiagramProps) {
  // Helper to get LED fill color
  const getLEDColor = (color: 'Green' | 'Yellow' | 'Red') => {
    switch (color) {
      case 'Green': return '#22c55e';
      case 'Yellow': return '#facc15';
      case 'Red': return '#ef4444';
    }
  };

  // Helper to check if gas is active (>50% of threshold)
  const isGasActive = (gas: keyof GasReading, threshold: number) => {
    return gasReadings[gas] > threshold * 0.5;
  };

  const thresholds = { NH3: 7.5, H2S: 0.2, TMA: 10.0, DMS: 1.0 };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border-2 border-amber-300">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Circuit Simulation (Breadboard Style)
      </h3>

      <svg
        viewBox="0 0 800 650"
        className="w-full h-auto"
        style={{ maxHeight: '650px' }}
      >
        {/* Breadboard background */}
        <rect x="50" y="50" width="700" height="500" rx="10" fill="#f4e8d0" stroke="#8b7355" strokeWidth="3" />
        
        {/* Breadboard holes pattern (simplified) */}
        {Array.from({ length: 12 }, (_, i) => (
          <g key={`row-${i}`}>
            {Array.from({ length: 20 }, (_, j) => (
              <circle
                key={`hole-${i}-${j}`}
                cx={80 + j * 35}
                cy={80 + i * 40}
                r="3"
                fill="#8b7355"
                opacity="0.3"
              />
            ))}
          </g>
        ))}

        {/* Arduino board (center-right) */}
        <g id="arduino">
          <rect x="520" y="200" width="200" height="140" rx="8" fill="#006699" stroke="#004466" strokeWidth="2" />
          <text x="620" y="225" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
            Arduino Uno
          </text>
          <text x="620" y="240" textAnchor="middle" fill="#a0d4ff" fontSize="10">
            Microcontroller
          </text>
          
          {/* USB port */}
          <rect x="515" y="255" width="10" height="20" fill="#c0c0c0" stroke="#888" strokeWidth="1" />
          <text x="510" y="268" textAnchor="end" fontSize="8" fill="#333">USB</text>
          
          {/* Pin headers with labels */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`pin-${i}`}>
              <rect x="540" y={245 + i * 20} width="8" height="8" fill="#333" />
              <text x="555" y={252 + i * 20} fontSize="10" fill="white">D{i + 2}</text>
            </g>
          ))}
          
          {/* GND Pin */}
          <rect x="540" y="325" width="8" height="8" fill="#333" />
          <text x="555" y="332" fontSize="10" fill="white">GND</text>
          
          {/* 5V Pin */}
          <rect x="690" y="245" width="8" height="8" fill="#dc2626" />
          <text x="705" y="252" fontSize="10" fill="white">5V</text>
          
          {/* Power LED */}
          <circle cx="700" cy="220" r="4" fill="#22c55e" opacity="0.8" />
          <text x="710" y="222" fontSize="8" fill="white">PWR</text>
        </g>

        {/* Gas Sensors (left side) */}
        <g id="sensors">
          {/* NH3 Sensor */}
          <g id="nh3-sensor">
            <rect x="80" y="100" width="80" height="60" rx="4" fill="#4a5568" stroke="#2d3748" strokeWidth="2" />
            <text x="120" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">NH₃</text>
            <text x="120" y="135" textAnchor="middle" fill="#a0aec0" fontSize="9">Gas Sensor</text>
            <text x="120" y="150" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
              {gasReadings.NH3.toFixed(1)} ppm
            </text>
            {/* Sensor pins with labels */}
            <circle cx="100" cy="165" r="3" fill="#fbbf24" />
            <text x="100" y="177" textAnchor="middle" fontSize="7" fill="#333">SIG</text>
            <circle cx="140" cy="165" r="3" fill="#333" />
            <text x="140" y="177" textAnchor="middle" fontSize="7" fill="#333">GND</text>
          </g>

          {/* H2S Sensor */}
          <g id="h2s-sensor">
            <rect x="80" y="200" width="80" height="60" rx="4" fill="#4a5568" stroke="#2d3748" strokeWidth="2" />
            <text x="120" y="220" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">H₂S</text>
            <text x="120" y="235" textAnchor="middle" fill="#a0aec0" fontSize="9">Gas Sensor</text>
            <text x="120" y="250" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
              {gasReadings.H2S.toFixed(2)} ppm
            </text>
            <circle cx="100" cy="265" r="3" fill="#fbbf24" />
            <text x="100" y="277" textAnchor="middle" fontSize="7" fill="#333">SIG</text>
            <circle cx="140" cy="265" r="3" fill="#333" />
            <text x="140" y="277" textAnchor="middle" fontSize="7" fill="#333">GND</text>
          </g>

          {/* TMA Sensor */}
          <g id="tma-sensor">
            <rect x="80" y="300" width="80" height="60" rx="4" fill="#4a5568" stroke="#2d3748" strokeWidth="2" />
            <text x="120" y="320" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">TMA</text>
            <text x="120" y="335" textAnchor="middle" fill="#a0aec0" fontSize="9">Gas Sensor</text>
            <text x="120" y="350" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
              {gasReadings.TMA.toFixed(1)} ppm
            </text>
            <circle cx="100" cy="365" r="3" fill="#fbbf24" />
            <text x="100" y="377" textAnchor="middle" fontSize="7" fill="#333">SIG</text>
            <circle cx="140" cy="365" r="3" fill="#333" />
            <text x="140" y="377" textAnchor="middle" fontSize="7" fill="#333">GND</text>
          </g>

          {/* DMS Sensor */}
          <g id="dms-sensor">
            <rect x="80" y="400" width="80" height="60" rx="4" fill="#4a5568" stroke="#2d3748" strokeWidth="2" />
            <text x="120" y="420" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DMS</text>
            <text x="120" y="435" textAnchor="middle" fill="#a0aec0" fontSize="9">Gas Sensor</text>
            <text x="120" y="450" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
              {gasReadings.DMS.toFixed(2)} ppm
            </text>
            <circle cx="100" cy="465" r="3" fill="#fbbf24" />
            <text x="100" y="477" textAnchor="middle" fontSize="7" fill="#333">SIG</text>
            <circle cx="140" cy="465" r="3" fill="#333" />
            <text x="140" y="477" textAnchor="middle" fontSize="7" fill="#333">GND</text>
          </g>
        </g>

        {/* Wires from sensors to Arduino */}
        {/* NH3 sensor to Arduino D2 */}
        <line
          x1="100" y1="165" x2="100" y2="180"
          stroke={isGasActive('NH3', thresholds.NH3) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('NH3', thresholds.NH3) ? 0.9 : 0.5}
        />
        <line
          x1="100" y1="180" x2="540" y2="245"
          stroke={isGasActive('NH3', thresholds.NH3) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('NH3', thresholds.NH3) ? 0.9 : 0.5}
        >
          {isGasActive('NH3', thresholds.NH3) && (
            <animate attributeName="stroke-dasharray" values="0 10;10 0" dur="0.5s" repeatCount="indefinite" />
          )}
        </line>
        <text x="280" y="210" fontSize="9" fill="#666" fontWeight="bold">NH₃ Signal → D2</text>

        {/* H2S sensor to Arduino D3 */}
        <line
          x1="100" y1="265" x2="100" y2="280"
          stroke={isGasActive('H2S', thresholds.H2S) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('H2S', thresholds.H2S) ? 0.9 : 0.5}
        />
        <line
          x1="100" y1="280" x2="540" y2="265"
          stroke={isGasActive('H2S', thresholds.H2S) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('H2S', thresholds.H2S) ? 0.9 : 0.5}
        >
          {isGasActive('H2S', thresholds.H2S) && (
            <animate attributeName="stroke-dasharray" values="0 10;10 0" dur="0.5s" repeatCount="indefinite" />
          )}
        </line>
        <text x="280" y="268" fontSize="9" fill="#666" fontWeight="bold">H₂S Signal → D3</text>

        {/* TMA sensor to Arduino D4 */}
        <line
          x1="100" y1="365" x2="100" y2="380"
          stroke={isGasActive('TMA', thresholds.TMA) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('TMA', thresholds.TMA) ? 0.9 : 0.5}
        />
        <line
          x1="100" y1="380" x2="540" y2="285"
          stroke={isGasActive('TMA', thresholds.TMA) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('TMA', thresholds.TMA) ? 0.9 : 0.5}
        >
          {isGasActive('TMA', thresholds.TMA) && (
            <animate attributeName="stroke-dasharray" values="0 10;10 0" dur="0.5s" repeatCount="indefinite" />
          )}
        </line>
        <text x="280" y="328" fontSize="9" fill="#666" fontWeight="bold">TMA Signal → D4</text>

        {/* DMS sensor to Arduino D5 */}
        <line
          x1="100" y1="465" x2="100" y2="480"
          stroke={isGasActive('DMS', thresholds.DMS) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('DMS', thresholds.DMS) ? 0.9 : 0.5}
        />
        <line
          x1="100" y1="480" x2="540" y2="305"
          stroke={isGasActive('DMS', thresholds.DMS) ? '#fbbf24' : '#888'}
          strokeWidth="3"
          opacity={isGasActive('DMS', thresholds.DMS) ? 0.9 : 0.5}
        >
          {isGasActive('DMS', thresholds.DMS) && (
            <animate attributeName="stroke-dasharray" values="0 10;10 0" dur="0.5s" repeatCount="indefinite" />
          )}
        </line>
        <text x="280" y="388" fontSize="9" fill="#666" fontWeight="bold">DMS Signal → D5</text>

        {/* Ground wires (black) */}
        <line x1="140" y1="165" x2="350" y2="165" stroke="#333" strokeWidth="2" opacity="0.6" />
        <line x1="140" y1="265" x2="350" y2="265" stroke="#333" strokeWidth="2" opacity="0.6" />
        <line x1="140" y1="365" x2="350" y2="365" stroke="#333" strokeWidth="2" opacity="0.6" />
        <line x1="140" y1="465" x2="350" y2="465" stroke="#333" strokeWidth="2" opacity="0.6" />
        <line x1="350" y1="165" x2="350" y2="500" stroke="#333" strokeWidth="3" opacity="0.6" />
        <line x1="350" y1="330" x2="540" y2="330" stroke="#333" strokeWidth="3" opacity="0.6" />
        <text x="360" y="325" fontSize="9" fill="#333" fontWeight="bold">Common Ground</text>

        {/* LEDs (right side, connected from Arduino) */}
        <g id="leds">
          {/* NH3 LED */}
          <g id="nh3-led">
            <line x1="720" y1="245" x2="760" y2="245" stroke="#888" strokeWidth="2" />
            <text x="735" y="240" fontSize="8" fill="#666">D2</text>
            <circle
              cx="770"
              cy="245"
              r="12"
              fill={getLEDColor(ledStatus.NH3_LED)}
              stroke="#333"
              strokeWidth="2"
              opacity="0.9"
            >
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="770" y="228" textAnchor="middle" fontSize="9" fill="#666" fontWeight="bold">NH₃ LED</text>
          </g>

          {/* H2S LED */}
          <g id="h2s-led">
            <line x1="720" y1="265" x2="760" y2="265" stroke="#888" strokeWidth="2" />
            <text x="735" y="260" fontSize="8" fill="#666">D3</text>
            <circle
              cx="770"
              cy="265"
              r="12"
              fill={getLEDColor(ledStatus.H2S_LED)}
              stroke="#333"
              strokeWidth="2"
              opacity="0.9"
            >
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="770" y="248" textAnchor="middle" fontSize="9" fill="#666" fontWeight="bold">H₂S LED</text>
          </g>

          {/* TMA LED */}
          <g id="tma-led">
            <line x1="720" y1="285" x2="760" y2="285" stroke="#888" strokeWidth="2" />
            <text x="735" y="280" fontSize="8" fill="#666">D4</text>
            <circle
              cx="770"
              cy="285"
              r="12"
              fill={getLEDColor(ledStatus.TMA_LED)}
              stroke="#333"
              strokeWidth="2"
              opacity="0.9"
            >
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="770" y="268" textAnchor="middle" fontSize="9" fill="#666" fontWeight="bold">TMA LED</text>
          </g>

          {/* DMS LED */}
          <g id="dms-led">
            <line x1="720" y1="305" x2="760" y2="305" stroke="#888" strokeWidth="2" />
            <text x="735" y="300" fontSize="8" fill="#666">D5</text>
            <circle
              cx="770"
              cy="305"
              r="12"
              fill={getLEDColor(ledStatus.DMS_LED)}
              stroke="#333"
              strokeWidth="2"
              opacity="0.9"
            >
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="770" y="288" textAnchor="middle" fontSize="9" fill="#666" fontWeight="bold">DMS LED</text>
          </g>
        </g>

        {/* Power rails (red/black lines on breadboard) */}
        <line x1="60" y1="80" x2="60" y2="520" stroke="#dc2626" strokeWidth="4" opacity="0.6" />
        <text x="45" y="75" fontSize="10" fill="#dc2626" fontWeight="bold">+5V</text>
        <line x1="740" y1="80" x2="740" y2="520" stroke="#333" strokeWidth="4" opacity="0.6" />
        <text x="735" y="75" fontSize="10" fill="#333" fontWeight="bold">GND</text>
        
        {/* Power connection from 5V rail to Arduino */}
        <line x1="60" y1="245" x2="690" y2="245" stroke="#dc2626" strokeWidth="2" opacity="0.4" strokeDasharray="4 2" />
        <text x="330" y="240" fontSize="8" fill="#dc2626">Power Supply</text>

        {/* Legend */}
        <g id="legend">
          <rect x="150" y="545" width="500" height="85" fill="white" opacity="0.9" rx="5" stroke="#333" strokeWidth="1" />
          <text x="400" y="565" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#333">
            Circuit Diagram Legend
          </text>
          
          {/* Legend items */}
          <g id="legend-items">
            {/* Signal wires */}
            <line x1="170" y1="580" x2="200" y2="580" stroke="#fbbf24" strokeWidth="3" />
            <text x="210" y="584" fontSize="10" fill="#666">Signal Wire (SIG → Arduino Pin)</text>
            
            {/* Ground wires */}
            <line x1="170" y1="595" x2="200" y2="595" stroke="#333" strokeWidth="3" />
            <text x="210" y="599" fontSize="10" fill="#666">Ground Wire (GND)</text>
            
            {/* Power rail */}
            <line x1="170" y1="610" x2="200" y2="610" stroke="#dc2626" strokeWidth="3" />
            <text x="210" y="614" fontSize="10" fill="#666">Power Rail (+5V)</text>
          </g>
          
          <g id="legend-status">
            {/* Active signal */}
            <circle cx="430" cy="580" r="6" fill="#22c55e" />
            <text x="445" y="584" fontSize="10" fill="#666">LED Green (Safe)</text>
            
            <circle cx="430" cy="595" r="6" fill="#facc15" />
            <text x="445" y="599" fontSize="10" fill="#666">LED Yellow (Warning)</text>
            
            <circle cx="430" cy="610" r="6" fill="#ef4444" />
            <text x="445" y="614" fontSize="10" fill="#666">LED Red (Danger)</text>
          </g>
        </g>
        
        {/* Component labels */}
        <text x="50" y="540" fontSize="10" fill="#333" fontWeight="bold">Gas Sensors</text>
        <text x="520" y="190" fontSize="10" fill="#333" fontWeight="bold">Microcontroller</text>
        <text x="740" y="190" fontSize="10" fill="#333" fontWeight="bold">Status LEDs</text>
      </svg>
    </div>
  );
}
