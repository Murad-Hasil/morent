const segments = [
  { label: "Sport Car",  value: 17439, color: "#0D3B8E", percent: 24 },
  { label: "SUV",        value: 9478,  color: "#1B4FBF", percent: 13 },
  { label: "Coupe",      value: 18197, color: "#2B6BE6", percent: 25 },
  { label: "Hatchback",  value: 12510, color: "#7AABF6", percent: 17 },
  { label: "MPV",        value: 14406, color: "#C7DCFD", percent: 20 },
];

function DonutChart() {
  const cx = 80, cy = 80, r = 60, innerR = 44;
  let current = -90;

  const paths = segments.map(({ color, percent }) => {
    const angle = (percent / 100) * 360;
    const startAngle = current;
    const endAngle = current + angle - 2;
    current += angle;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;

    return (
      <path
        key={color}
        d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1} Z`}
        fill={color}
      />
    );
  });

  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      {paths}
      <text x="80" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" className="fill-gray-900 dark:fill-white">72,030</text>
      <text x="80" y="92" textAnchor="middle" fontSize="9" className="fill-[#90A3BF] dark:fill-gray-400">Rental Car</text>
    </svg>
  );
}

export default function Top5Chart() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[10px] p-5 border border-transparent dark:border-gray-800">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 dark:text-white text-base">Top 5 Car Rental</h2>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-bold tracking-widest text-xs">•••</button>
      </div>

      <div className="flex items-center gap-6">
        <DonutChart />
        <ul className="flex flex-col gap-3 flex-1">
          {segments.map(({ label, value, color }) => (
            <li key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{value.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
