'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', 'Test Request': 1800, 'Contact Form': 4500 },
  { month: 'Feb', 'Test Request': 1600, 'Contact Form': 6200 },
  { month: 'Mar', 'Test Request': 1900, 'Contact Form': 7000 },
  { month: 'Apr', 'Test Request': 2000, 'Contact Form': 6800 },
  { month: 'May', 'Test Request': 1700, 'Contact Form': 8500 },
  { month: 'Jun', 'Test Request': 2200, 'Contact Form': 12800 },
  { month: 'Jul', 'Test Request': 1800, 'Contact Form': 10200 },
  { month: 'Aug', 'Test Request': 1900, 'Contact Form': 7500 },
  { month: 'Sep', 'Test Request': 2100, 'Contact Form': 6200 },
  { month: 'Oct', 'Test Request': 1500, 'Contact Form': 10500 },
  { month: 'Nov', 'Test Request': 1800, 'Contact Form': 9200 },
  { month: 'Dec', 'Test Request': 2300, 'Contact Form': 10800 },
];

const CustomTooltip = ({
  active,
  payload,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{payload[0].payload.month}</p>
        <p className="text-sm text-purple-600">
          Test Request {payload[0].value}
        </p>
        <p className="text-sm text-blue-600">
          Contact Form {payload[1].value}
        </p>
      </div>
    );
  }
  return null;
};

export function AnalyticsChart() {
  return (
    <div className="w-full h-[348px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '16px' }}
            iconType="square"
          />
          <Line
            type="monotone"
            dataKey="Test Request"
            stroke="#7c3aed"
            strokeWidth={1}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="Contact Form"
            stroke="#3b82f6"
            strokeWidth={1}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
