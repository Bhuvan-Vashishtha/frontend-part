import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

// Dummy data for bar chart - log count by severity
const severityData = [
  { severity: 'Info', count: 148 },
  { severity: 'Warning', count: 89 },
  { severity: 'Error', count: 34 },
  { severity: 'Critical', count: 12 },
];

// Dummy data for line chart - logs over time
const timeSeriesData = [
  { date: 'Mar 13', logs: 240 },
  { date: 'Mar 14', logs: 321 },
  { date: 'Mar 15', logs: 289 },
  { date: 'Mar 16', logs: 451 },
  { date: 'Mar 17', logs: 389 },
  { date: 'Mar 18', logs: 512 },
  { date: 'Mar 19', logs: 478 },
];

// Dummy data for pie chart - logs by service
const serviceData = [
  { name: 'API Server', value: 245 },
  { name: 'Database', value: 189 },
  { name: 'Cache Manager', value: 156 },
  { name: 'Auth Service', value: 142 },
  { name: 'Payment Gateway', value: 98 },
  { name: 'Email Service', value: 87 },
  { name: 'Storage Service', value: 76 },
];

// Colors for charts
const SEVERITY_COLORS = {
  Info: '#3b82f6',
  Warning: '#f59e0b',
  Error: '#ef4444',
  Critical: '#7c2d12',
};

const SERVICE_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="text-sm font-medium text-gray-900">
          {payload[0].payload.severity || payload[0].payload.date || payload[0].payload.name}
        </p>
        <p className="text-sm text-blue-600">
          {payload[0].value} {payload[0].name}
        </p>
      </div>
    );
  }
  return null;
};

export default function LogAnalytics() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={24} className="text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Charts
        </button>
        <button
          onClick={() => setActiveTab('severity')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'severity'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Severity
        </button>
        <button
          onClick={() => setActiveTab('timeseries')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'timeseries'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('service')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'service'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Services
        </button>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Log Count by Severity */}
        {(activeTab === 'all' || activeTab === 'severity') && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Log Count by Severity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="severity" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  shape={
                    <shape
                      render={({ x, y, width, height, fill }) => (
                        <rect x={x} y={y} width={width} height={height} fill={fill} radius="8" />
                      )}
                    />
                  }
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[entry.severity]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Line Chart - Logs Over Time */}
        {(activeTab === 'all' || activeTab === 'timeseries') && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Logs Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="logs"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Total Logs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Pie Chart - Logs by Service */}
        {(activeTab === 'all' || activeTab === 'service') && (
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Logs by Service
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SERVICE_COLORS[index % SERVICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} logs`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Legend for Pie Chart */}
        {(activeTab === 'all' || activeTab === 'service') && activeTab !== 'all' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Service Breakdown
            </h3>
            <div className="space-y-2">
              {serviceData.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{
                        backgroundColor: SERVICE_COLORS[index % SERVICE_COLORS.length],
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {service.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {service.value} logs
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend for All Tabs */}
        {activeTab === 'all' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Service Summary
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {serviceData.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: SERVICE_COLORS[index % SERVICE_COLORS.length],
                      }}
                    />
                    <span className="text-xs font-medium text-gray-700">
                      {service.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">
                    {service.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 font-medium">Total Logs</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {severityData.reduce((sum, item) => sum + item.count, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 font-medium">Error Rate</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {(
              (severityData.find(d => d.severity === 'Error').count /
                severityData.reduce((sum, item) => sum + item.count, 0)) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 font-medium">Avg Logs/Day</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {(
              timeSeriesData.reduce((sum, item) => sum + item.logs, 0) /
              timeSeriesData.length
            ).toFixed(0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600 font-medium">Total Services</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {serviceData.length}
          </p>
        </div>
      </div>
    </div>
  );
}
