
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './modules/Dashboard';
import ProjectList from './modules/ProjectList';
import FinanceList from './modules/FinanceList';
import CRMList from './modules/CRMList';
import QuotationList from './modules/QuotationList';
import Settings from './modules/Settings';
import LegalCenter from './modules/LegalCenter';
import HRAdmin from './modules/HRAdmin';
import Approvals from './modules/Approvals';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [user, setUser] = useState({ name: '張建築師', role: UserRole.ADMIN });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard': return <Dashboard />;
      case 'projects': return <ProjectList role={user.role} />;
      case 'finance': return <FinanceList role={user.role} />;
      case 'crm': return <CRMList />;
      case 'quotations': return <QuotationList role={user.role} />;
      case 'legal': return <LegalCenter role={user.role} />;
      case 'hr': return <HRAdmin role={user.role} />;
      case 'approvals': return <Approvals role={user.role} />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        currentModule={currentModule} 
        setCurrentModule={setCurrentModule} 
        userRole={user.role}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          user={user} 
          currentModule={currentModule}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default App;
