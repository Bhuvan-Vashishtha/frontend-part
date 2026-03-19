import { useState, useMemo } from 'react';
import { Search, AlertCircle, AlertTriangle, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LogTable({ logs = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logs based on search term
  const filteredLogs = useMemo(() => {
    return logs.filter(
      (log) =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.severity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  // Reset to first page when search changes
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Get badge styling based on severity
  const getSeverityStyles = (severity) => {
    const lowerSeverity = severity.toLowerCase();
    
    if (lowerSeverity === 'info') {
      return {
        badge: 'bg-blue-100 text-blue-800',
        icon: Info,
      };
    } else if (lowerSeverity === 'warning') {
      return {
        badge: 'bg-yellow-100 text-yellow-800',
        icon: AlertTriangle,
      };
    } else if (lowerSeverity === 'error') {
      return {
        badge: 'bg-red-100 text-red-800',
        icon: AlertCircle,
      };
    }
    return {
      badge: 'bg-gray-100 text-gray-800',
      icon: Info,
    };
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Logs</h2>
          <span className="text-sm text-gray-500">
            {filteredLogs.length} of {logs.length} logs
          </span>
        </div>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by message, service, or severity..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => {
                const { badge, icon: IconComponent } = getSeverityStyles(log.severity);
                return (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${badge}`}>
                        <IconComponent size={14} />
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-md truncate">
                      {log.message}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No logs found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
