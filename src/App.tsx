import { useState, useEffect } from 'react';
import { Activity, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import LEDIndicator from './components/LEDIndicator';
import GasSlider from './components/GasSlider';
import CircuitDiagram from './components/CircuitDiagram';
import { GAS_SENSORS } from './config/sensors';
import { simulateSpoilageDetection, fetchDataset, DatasetRow } from './services/api';
import { GasReading, LEDStatus } from './types';

function App() {
  const [gasReadings, setGasReadings] = useState<GasReading>({
    NH3: 3.0,
    H2S: 0.1,
    TMA: 5.0,
    DMS: 0.5,
  });

  const [ledStatus, setLedStatus] = useState<LEDStatus>({
    NH3_LED: 'Green',
    H2S_LED: 'Green',
    TMA_LED: 'Green',
    DMS_LED: 'Green',
    Food_Status: 'Fresh',
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataset, setDataset] = useState<DatasetRow[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Load dataset on mount
  useEffect(() => {
    const loadDataset = async () => {
      try {
        const data = await fetchDataset();
        setDataset(data);
        if (data.length > 0) {
          // Load first row
          loadDatasetRow(data[0]);
        }
      } catch (err) {
        setError('Failed to load dataset from backend.');
        console.error(err);
      }
    };
    loadDataset();
  }, []);

  // Function to load a specific dataset row
  const loadDatasetRow = async (row: DatasetRow) => {
    const readings: GasReading = {
      NH3: row.NH3,
      H2S: row.H2S,
      TMA: row.TMA,
      DMS: row.DMS,
    };
    setGasReadings(readings);
    
    // Auto-simulate
    setIsSimulating(true);
    setError(null);
    try {
      const result = await simulateSpoilageDetection(readings);
      setLedStatus(result);
    } catch (err) {
      setError('Failed to connect to backend. Make sure the server is running.');
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleGasChange = (gas: keyof GasReading, value: number) => {
    setGasReadings((prev: GasReading) => ({ ...prev, [gas]: value }));
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    setError(null);

    try {
      const result = await simulateSpoilageDetection(gasReadings);
      setLedStatus(result);
    } catch (err) {
      setError('Failed to connect to backend. Make sure the server is running.');
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Navigation handlers with wrap-around
  const handlePrevious = () => {
    if (dataset.length === 0) return;
    const newIndex = currentIndex === 0 ? dataset.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    loadDatasetRow(dataset[newIndex]);
  };

  const handleNext = () => {
    if (dataset.length === 0) return;
    const newIndex = currentIndex === dataset.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    loadDatasetRow(dataset[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Activity className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Food Spoilage Detector
            </h1>
          </div>
          <p className="text-gray-600">
            Multi-Gas Sensor Simulation with LED Indicators
          </p>
        </header>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Gas Sensor Controls
              </h2>

              <div className="space-y-4">
                {Object.entries(GAS_SENSORS).map(([key, config]) => (
                  <GasSlider
                    key={key}
                    config={config}
                    value={gasReadings[key as keyof GasReading]}
                    onChange={(value) => handleGasChange(key as keyof GasReading, value)}
                  />
                ))}
              </div>

              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
              >
                {isSimulating ? 'Simulating...' : 'Simulate Detection'}
              </button>

              {/* Dataset Navigation */}
              {dataset.length > 0 && (
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">
                    Dataset Navigation
                  </h3>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={handlePrevious}
                      disabled={isSimulating}
                      className="flex items-center gap-2 bg-white hover:bg-gray-50 disabled:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200 shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {currentIndex + 1} / {dataset.length}
                      </div>
                      <div className="text-xs text-gray-500">
                        {dataset[currentIndex]?.foodSpoiled === 'Yes' ? '⚠️ Spoiled' : '✓ Fresh'}
                      </div>
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={isSimulating}
                      className="flex items-center gap-2 bg-white hover:bg-gray-50 disabled:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200 shadow-sm"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <CircuitDiagram gasReadings={gasReadings} ledStatus={ledStatus} />
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                LED Status Indicators
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <LEDIndicator label="NH₃" color={ledStatus.NH3_LED} />
                <LEDIndicator label="H₂S" color={ledStatus.H2S_LED} />
                <LEDIndicator label="TMA" color={ledStatus.TMA_LED} />
                <LEDIndicator label="DMS" color={ledStatus.DMS_LED} />
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
                  Food Status
                </h3>
                <div className="flex justify-center">
                  <LEDIndicator
                    label={ledStatus.Food_Status}
                    color={ledStatus.Food_Status === 'Fresh' ? 'Green' : 'Red'}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Threshold Reference
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-700">Ammonia (NH₃)</span>
                  <span className="text-gray-600">5–10 ppm</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-700">Hydrogen Sulfide (H₂S)</span>
                  <span className="text-gray-600">0.2 ppm</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-700">Trimethylamine (TMA)</span>
                  <span className="text-gray-600">10 ppm</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Dimethyl Sulfide (DMS)</span>
                  <span className="text-gray-600">1 ppm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
