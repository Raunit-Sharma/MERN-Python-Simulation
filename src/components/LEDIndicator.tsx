interface LEDIndicatorProps {
  label: string;
  color: 'Green' | 'Yellow' | 'Red';
  size?: 'sm' | 'md' | 'lg';
}

export default function LEDIndicator({ label, color, size = 'md' }: LEDIndicatorProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const colorClasses = {
    Green: 'bg-green-500 shadow-green-500/50',
    Yellow: 'bg-yellow-400 shadow-yellow-400/50',
    Red: 'bg-red-500 shadow-red-500/50',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full shadow-lg transition-all duration-300`}
        style={{
          boxShadow: `0 0 20px ${color === 'Green' ? '#22c55e' : color === 'Yellow' ? '#facc15' : '#ef4444'}`,
        }}
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}
