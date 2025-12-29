
import React from 'react';
import { UserRole } from '../types.ts';

interface HeaderProps {
  user: { name: string; role: UserRole };
  currentModule: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, currentModule, toggleSidebar }) => {
  const getModuleTitle = (id: string) => {
    const titles: Record<string, string> = {
      dashboard: '儀表板總覽',
      projects: '專案管理系統',
      finance: '專案收支與財報',
      crm: '客戶關係管理',
      quotations: '報價單系統',
      legal: '法務中心',
      hr: '行政與人資管理',
      approvals: '流程簽核中心',
      settings: '系統全域設定'
    };
    return titles[id] || '系統模組';
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-md lg:hidden">
          <i className="fas fa-bars text-slate-600"></i>
        </button>
        <h1 className="text-xl font-bold text-slate-800">{getModuleTitle(currentModule)}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <button className="p-2 text-slate-500 hover:text-amber-500 transition-colors">
            <i className="fas fa-bell"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter">
              {user.role === UserRole.ADMIN ? '建築師' : user.role}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 border-2 border-slate-100 overflow-hidden">
            <img src="https://picsum.photos/100/100?grayscale" alt="avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
