import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AtivosManager from './components/AtivosManager';
import TokensManager from './components/UsersManager';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'ativos':
        return <AtivosManager />;
      case 'tokens':
        return <TokensManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;