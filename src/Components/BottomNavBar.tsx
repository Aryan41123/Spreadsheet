// src/components/BottomNavBar.tsx
import React from 'react';

interface BottomNavBarProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="bg-white p-3 border-t border-gray-200 flex items-center justify-start space-x-4 shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === tab
              ? 'bg-[#e8f0e9] border-t-4 border-t-green-800 text-green-800 font-semibold shadow-inner'
              : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
          {tab}
        </button>
      ))}

      {/* Plus Button */}
      <button className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
};

export default BottomNavBar;
