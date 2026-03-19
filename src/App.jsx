import { useState } from 'react';
import {
  Menu,
  Home,
  BarChart3,
  Settings,
  LogOut,
  Search,
  AlertCircle,
  AlertTriangle,
  FileText,
  X,
} from 'lucide-react';
import LogTable from './components/LogTable';
import LogFilters from './components/LogFilters';
import LogAnalytics from './components/LogAnalytics';

// Sidebar Component
function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: FileText, label: 'Logs' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-30 md:relative md:transform-none md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
              onClick={onClose}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <nav className="px-4 py-8">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

// Navbar Component
function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1 mx-4 max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900 font-medium">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

// Sample log data
const sampleLogs = [
  {
    id: 1,
    timestamp: '2024-03-19 10:23:45',
    service: 'API Server',
    severity: 'error',
    message: 'Database connection failed - unable to connect to primary instance',
  },
  {
    id: 2,
    timestamp: '2024-03-19 10:22:30',
    service: 'System Monitor',
    severity: 'warning',
    message: 'High memory usage detected - 85% capacity',
  },
  {
    id: 3,
    timestamp: '2024-03-19 10:21:15',
    service: 'Auth Service',
    severity: 'info',
    message: 'User login successful - session created',
  },
  {
    id: 4,
    timestamp: '2024-03-19 10:20:00',
    service: 'API Server',
    severity: 'error',
    message: 'Request timeout - processing took longer than expected',
  },
  {
    id: 5,
    timestamp: '2024-03-19 10:19:45',
    service: 'Cache Manager',
    severity: 'info',
    message: 'Cache cleared successfully - freed 512MB of memory',
  },
  {
    id: 6,
    timestamp: '2024-03-19 10:18:30',
    service: 'System Monitor',
    severity: 'warning',
    message: 'Disk space running low - 90% capacity on /data partition',
  },
  {
    id: 7,
    timestamp: '2024-03-19 10:17:15',
    service: 'Backup Service',
    severity: 'info',
    message: 'Backup completed successfully - 125GB backed up',
  },
  {
    id: 8,
    timestamp: '2024-03-19 10:16:00',
    service: 'Payment Gateway',
    severity: 'error',
    message: 'Payment processing failed - connection to payment provider unavailable',
  },
  {
    id: 9,
    timestamp: '2024-03-19 10:15:30',
    service: 'Email Service',
    severity: 'warning',
    message: 'Email queue backup - 5000 emails pending delivery',
  },
  {
    id: 10,
    timestamp: '2024-03-19 10:14:45',
    service: 'Database',
    severity: 'info',
    message: 'Maintenance window started - replication lag: 2.5s',
  },
  {
    id: 11,
    timestamp: '2024-03-19 10:14:00',
    service: 'Load Balancer',
    severity: 'error',
    message: 'Backend server became unavailable - health check failed',
  },
  {
    id: 12,
    timestamp: '2024-03-19 10:13:15',
    service: 'Storage Service',
    severity: 'warning',
    message: 'Slow read performance detected - average latency 450ms',
  },
  {
    id: 13,
    timestamp: '2024-03-19 10:12:30',
    service: 'Search Engine',
    severity: 'info',
    message: 'Index rebuild completed - 2.3M documents indexed',
  },
  {
    id: 14,
    timestamp: '2024-03-19 10:11:45',
    service: 'API Server',
    severity: 'error',
    message: 'OutOfMemoryError - heap size exceeded limit',
  },
  {
    id: 15,
    timestamp: '2024-03-19 10:10:00',
    service: 'Notification Service',
    severity: 'info',
    message: 'Push notification delivered - 50000 devices notified',
  },
];

// Main App Component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    severity: null,
    serviceName: null,
    startDate: null,
    endDate: null,
  });

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  const handleClearFilters = () => {
    setAppliedFilters({
      severity: null,
      serviceName: null,
      startDate: null,
      endDate: null,
    });
  };

  // Apply filters to logs
  const filteredLogs = sampleLogs.filter(log => {
    if (appliedFilters.severity && log.severity !== appliedFilters.severity) {
      return false;
    }
    if (appliedFilters.serviceName && !log.service.toLowerCase().includes(appliedFilters.serviceName.toLowerCase())) {
      return false;
    }
    if (appliedFilters.startDate) {
      const logDate = log.timestamp.split(' ')[0];
      if (logDate < appliedFilters.startDate) {
        return false;
      }
    }
    if (appliedFilters.endDate) {
      const logDate = log.timestamp.split(' ')[0];
      if (logDate > appliedFilters.endDate) {
        return false;
      }
    }
    return true;
  });

  const stats = {
    totalLogs: 12453,
    errors: 234,
    warnings: 567,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">
                Here's what's happening with your logs today
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                icon={FileText}
                title="Total Logs"
                value={stats.totalLogs}
                color="#3b82f6"
              />
              <DashboardCard
                icon={AlertCircle}
                title="Errors"
                value={stats.errors}
                color="#ef4444"
              />
              <DashboardCard
                icon={AlertTriangle}
                title="Warnings"
                value={stats.warnings}
                color="#f59e0b"
              />
            </div>

            {/* Analytics Section */}
            <div className="mb-8">
              <LogAnalytics />
            </div>

            {/* Filters */}
            <LogFilters 
              onApplyFilters={handleApplyFilters}
              onClear={handleClearFilters}
            />

            {/* Log Table */}
            <LogTable logs={filteredLogs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
