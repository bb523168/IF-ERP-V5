
import React, { useState } from 'react';

const CRMList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">客戶關係管理 (CRM)</h2>
        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-amber-500/20">
          <i className="fas fa-user-plus mr-2"></i> 新增客戶資料
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b">
            <tr>
              <th className="px-6 py-4">公司/業主</th>
              <th className="px-6 py-4">統一編號</th>
              <th className="px-6 py-4">主要聯絡人</th>
              <th className="px-6 py-4">案件數量</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-bold text-slate-800">大同開發股份有限公司</td>
              <td className="px-6 py-4 font-mono text-slate-600">54321098</td>
              <td className="px-6 py-4 text-sm">
                <p className="font-bold">王大同 總經理</p>
                <p className="text-xs text-slate-500">0912-345-678</p>
              </td>
              <td className="px-6 py-4">
                <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-black">5 案</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-amber-500 p-2"><i className="fas fa-chart-bar"></i> 客戶報表</button>
                <button className="text-slate-400 hover:text-slate-600 p-2"><i className="fas fa-edit"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CRMList;
