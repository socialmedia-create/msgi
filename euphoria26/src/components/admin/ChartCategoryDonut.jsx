import React from 'react';
import { CHART_CATEGORY_DISTRIBUTION } from '../../data/admin/dashboard';

export const ChartCategoryDonut = () => {
  const categories = CHART_CATEGORY_DISTRIBUTION;
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  // Calculate SVG donut stroke-dasharray segments
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeAngle = 0;

  const segments = categories.map((cat) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativeAngle;
    cumulativeAngle += (cat.percentage / 100) * circumference;
    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <div className="admin-card p-5 h-full flex flex-col justify-between">
      <div>
        <h3 className="admin-title text-base font-semibold mb-1">Registrations by Category</h3>
        <p className="text-xs text-muted">Distribution across festival tracks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 my-3">
        {/* SVG Donut */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {segments.map((seg, idx) => (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
              >
                <title>{`${seg.name}: ${seg.count} (${seg.percentage}%)`}</title>
              </circle>
            ))}
          </svg>

          {/* Central Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-[#F0E8D8] font-mono leading-none">{total.toLocaleString()}</span>
            <span className="text-[10px] text-muted uppercase tracking-wider mt-0.5">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1.5 text-xs">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 text-dim">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="truncate text-xs">{cat.name}</span>
              </div>
              <span className="font-mono text-xs font-semibold text-[#F0E8D8]">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartCategoryDonut;
