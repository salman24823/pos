'use client';

export default function SummaryCard({ title, value, change, isPositive, icon, color }) {
  return (
    <div className={`p-5 rounded-xl shadow-sm border ${color} flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
        <p className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {change} from last month
        </p>
      </div>
      <div className="p-3 bg-white rounded-lg shadow-xs">
        {icon}
      </div>
    </div>
  );
}