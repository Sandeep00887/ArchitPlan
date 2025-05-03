import React from 'react';
import { X, Calendar, Download } from 'lucide-react';
import { HistoryItem } from '../../types';
import Button from '../ui/Button';

interface HistorySidebarProps {
  isOpen: boolean;
  history: HistoryItem[];
  onClose: () => void;
  onSelectItem: (item: HistoryItem) => void;
  onExport: (item: HistoryItem) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  history,
  onClose,
  onSelectItem,
  onExport
}) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Design History</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close history"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>
      
      <div className="overflow-y-auto h-[calc(100vh-65px)]">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
            <Calendar size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No history yet</h3>
            <p className="text-gray-500 mt-2 max-w-xs">
              Your design history will appear here after you generate your first house design.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {history.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div 
                    className="flex-1 cursor-pointer" 
                    onClick={() => onSelectItem(item)}
                  >
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">
                        {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-medium text-gray-800 mt-1">
                      {item.designs[0]?.title || 'House Design'}
                    </h3>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {item.landMeasurement.area}m²
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        {item.preferences.bedrooms} BD
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        {item.preferences.style}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="text"
                    size="sm"
                    leftIcon={<Download size={16} />}
                    onClick={() => onExport(item)}
                    aria-label="Export design"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;