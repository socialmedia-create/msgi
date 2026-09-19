import React, { useState } from 'react';
import { CHART_REGISTRATIONS_OVER_TIME } from '../../data/admin/dashboard';

export const ChartRegistrationTime = () => {
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 3m
  const data = CHART_REGISTRATIONS_OVER_TIME[timeRange] || [];

  const maxVal = Math.max(...data.map((d) => d.count), 100);
  const minVal = Math.min(...data.map((d) => d.count), 0);

  // Calculate SVG polyline path
  const width = 500;
  const height = 180;
  const padding = 20;

  const points = data.map((d, idx) => {
    const x = padding + (idx / (data.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - ((d.count - minVal) / (maxVal - minVal || 1)) * (height - padding * 2);
    return `${x},${y}`;
  });

  const polylinePath = points.join(' ');
  const areaPath = `${padding},${height - padding} ${polylinePath} ${width - padding},${height - padding}`;

  return (
    <div className="admin-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="admin-title text-base font-semibold">Registrations Over Time</h3>
          <p className="text-xs text-muted">Daily participant growth trajectory</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-[#080807] border border-[#D4AF64]/20 rounded-md px-2.5 py-1 text-xs text-[#F0E8D8] outline-none cursor-pointer"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="3m">Last 3 Months</option>
        </select>
      </div>

      {/* SVG Chart Render */}
      <div className="relative w-full overflow-hidden my-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF64" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D4AF64" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(212,175,100,0.08)" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="rgba(212,175,100,0.08)" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(212,175,100,0.12)" />

          {/* Area Fill */}
          <polygon points={areaPath} fill="url(#goldGradient)" />

          {/* Line */}
          <polyline
            fill="none"
            stroke="#D4AF64"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePath}
          />

          {/* Data Points */}
          {data.map((d, idx) => {
            const coords = points[idx].split(',');
            const cx = parseFloat(coords[0]);
            const cy = parseFloat(coords[1]);
            return (
              <g key={idx} className="group cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill="#080807"
                  stroke="#E8C97A"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-150"
                />
                <title>{`${d.date}: ${d.count} registrations`}</title>
              </g>
            );
          })}
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between text-[10px] text-muted pt-1 px-1">
          {data.map((d, i) => (
            <span key={i}>{d.date}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartRegistrationTime;
