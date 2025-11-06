import { Cpu, Circle } from 'lucide-react';

export default function MicrocontrollerDiagram() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Hardware Configuration
      </h3>

      <div className="relative">
        <div className="bg-blue-900 rounded-lg p-6 flex items-center justify-center mb-6">
          <Cpu className="w-16 h-16 text-blue-300" />
          <span className="ml-3 text-white font-bold text-xl">Microcontroller</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { sensor: 'NH₃ Sensor', led: 'LED 1', color: 'bg-green-500' },
            { sensor: 'H₂S Sensor', led: 'LED 2', color: 'bg-yellow-400' },
            { sensor: 'TMA Sensor', led: 'LED 3', color: 'bg-red-500' },
            { sensor: 'DMS Sensor', led: 'LED 4', color: 'bg-green-500' },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Circle className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-gray-700">{item.sensor}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-xs text-gray-600">{item.led}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-white rounded-lg p-3 shadow-md border-2 border-orange-300">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-red-500" />
            <span className="text-sm font-bold text-gray-800">Food Status LED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
