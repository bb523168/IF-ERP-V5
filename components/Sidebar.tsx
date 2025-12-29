
import React from 'react';
import { UserRole } from '../types.ts';

interface SidebarProps {
  currentModule: string;
  setCurrentModule: (module: string) => void;
  userRole: UserRole;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, setCurrentModule, userRole, isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: '儀表板', icon: 'fa-chart-pie', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER, UserRole.VIEWER] },
    { id: 'crm', label: '客戶管理', icon: 'fa-users', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER] },
    { id: 'projects', label: '專案管理', icon: 'fa-building', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER] },
    { id: 'quotations', label: '報價系統', icon: 'fa-file-invoice-dollar', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER] },
    { id: 'finance', label: '財務會計', icon: 'fa-calculator', roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { id: 'legal', label: '法務合約', icon: 'fa-gavel', roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { id: 'hr', label: '行政人資', icon: 'fa-user-tie', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DESIGNER] },
    { id: 'approvals', label: '線上簽核', icon: 'fa-check-double', roles: [UserRole.ADMIN, UserRole.MANAGER] },
    { id: 'settings', label: '系統設定', icon: 'fa-cog', roles: [UserRole.ADMIN] },
  ];

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out shadow-xl z-20">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-slate-900 text-xl">如</div>
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-wider">如果建築</span>
          <span className="text-xs text-slate-400">ARCH ERP v4.0</span>
        </div>
      </div>
      
      <nav className="flex-1 mt-4 overflow-y-auto px-2">
        {menuItems.map((item) => {
          if (!item.roles.includes(userRole)) return null;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentModule(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                currentModule === item.id 
                ? 'bg-amber-500/10 text-amber-500 border-r-4 border-amber-500' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-5 text-center`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        © 2025 如果建築師事務所
      </div>
    </div>
  );
};

export default Sidebar;
