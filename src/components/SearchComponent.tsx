interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filter: string) => void;
  onDateChange: (startDate: string, endDate: string) => void;
  startDate: string;
  endDate: string;
}

// Componente de búsqueda actualizado
export function SearchComponent({ 
  onSearch, 
  onFilterChange, 
  onDateChange,
  startDate,
  endDate 
}: SearchComponentProps) {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onDateChange(e.target.value, endDate)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onDateChange(startDate, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">

        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All states</option>
          <option value="Pending">Pending</option>
          <option value="Success">Success</option>
          <option value="Reversed">Reversed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
    </div>
  );
}
