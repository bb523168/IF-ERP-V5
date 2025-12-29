
import React, { useState } from 'react';
import { NATURE_CODES, STUDIO_CODES, PRODUCT_TYPES } from '../constants.tsx';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex min-h-[600px]">
      <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Settings Menu</h3>
        <nav className="space-y-1">
          {[
            { id: 'general', label: '基本資訊', icon: 'fa-info-circle' },
            { id: 'masters', label: '主資料管理', icon: 'fa-database' },
            { id: 'stamps', label: '印章與簽名', icon: 'fa-stamp' },
            { id: 'templates', label: '報價單備註', icon: 'fa-sticky-note' },
            { id: 'rbac', label: '權限設定', icon: 'fa-user-shield' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <i className={`fas ${tab.icon} w-5`}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-8">
        {activeTab === 'general' && (
          <div className="max-w-xl space-y-6">
            <h2 className="text-xl font-bold text-slate-800">事務所基本資訊</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">事務所名稱</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg" defaultValue="如果建築師事務所" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">統一編號</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg" defaultValue="88776655" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">通訊地址</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" defaultValue="台中市西區民權路233巷5號" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">主要銀行帳戶</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" defaultValue="台新銀行 大里分行 (812) 2068-xx-xxxxxxx" />
              </div>
            </div>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">儲存變更</button>
          </div>
        )}

        {activeTab === 'masters' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-2">案件性質代碼管理 (Natures)</h3>
              <div className="flex flex-wrap gap-2">
                {NATURE_CODES.map(n => (
                  <div key={n.code} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-amber-600">{n.code}</span>
                    <span className="text-xs text-slate-600">{n.name}</span>
                  </div>
                ))}
                <button className="w-8 h-8 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500">
                  <i className="fas fa-plus text-xs"></i>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-3 border-b pb-2">建築產品類型 (Product Types)</h3>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_TYPES.map(t => (
                  <div key={t} className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stamps' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">數位印章與簽名管理</h2>
            <p className="text-sm text-slate-500 italic">僅「建築師(Admin)」權限可在此上傳與管理正式對外文件使用之數位章。</p>
            
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-amber-500 transition-all cursor-pointer bg-slate-50">
                <div className="w-24 h-24 bg-white rounded-full shadow-inner flex items-center justify-center text-slate-300">
                  <i className="fas fa-stamp text-4xl"></i>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-700">上傳建築師正章</p>
                  <p className="text-xs text-slate-400 mt-1">建議 PNG 透明背景</p>
                </div>
              </div>
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-amber-500 transition-all cursor-pointer bg-slate-50">
                <div className="w-24 h-24 bg-white rounded-lg shadow-inner flex items-center justify-center text-slate-300">
                  <i className="fas fa-pen-fancy text-4xl"></i>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-700">上傳手寫簽名檔</p>
                  <p className="text-xs text-slate-400 mt-1">用於線上合約簽署</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
