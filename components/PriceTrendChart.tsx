'use client';

import { PriceTrend } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface PriceTrendChartProps {
  data: PriceTrend[];
  currency?: string;
}

export default function PriceTrendChart({ data, currency = 'USD' }: PriceTrendChartProps) {
  const today = new Date().toISOString().split('T')[0];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">{data.date}</p>
          <p className="text-lg font-bold text-primary-600">
            {formatCurrency(data.price, currency)}
          </p>
          {data.prediction && (
            <p className="text-xs text-gray-500 italic">Predicted</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Price Trend & Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={today}
            stroke="#ef4444"
            strokeDasharray="3 3"
            label={{ value: 'Today', position: 'top', fill: '#ef4444', fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
          <span className="text-gray-600">Historical prices</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 border-2 border-red-500 rounded-full"></div>
          <span className="text-gray-600">Today</span>
        </div>
        <div className="text-gray-600">
          Dotted line = Predictions
        </div>
      </div>
    </div>
  );
}
