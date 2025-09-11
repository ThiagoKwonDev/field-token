import React from 'react';
import { Building, TrendingUp } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">FieldToken</h1>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              v1.0
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-green-100 text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('ativos')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'ativos'
                  ? 'bg-green-100 text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Ativos
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'tokens'
                  ? 'bg-green-100 text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Tokens
            </button>
          </nav>

          <div className="flex items-center space-x-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Sistema Online</span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-1">
          {['dashboard', 'ativos', 'tokens'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 text-sm rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;