
import React from 'react';

const Approvals: React.FC = () => {
  const mockApprovals = [
    { id: 'APP-101', type: '報價單', requester: '設計師 小王', target: 'Q25-002 台北陳宅', date: '2025-02-14 09:30', status: 'PENDING' },
    { id: 'APP-102', type: '請假申請', requester: '經理 陳姐', target: '特休 1 天 (2/20)', date: '2025-02-14 10:15', status: 'PENDING' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xl font-bold text-slate-800">待簽核項目</h2>
          {mockApprovals.map(app => (
            <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center hover:shadow-md transition-all">
              <div className="flex gap-4 items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${
                  app.type === '報價單' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                  <i className={`fas ${app.type === '報價單' ? 'fa-file-invoice-dollar' : 'fa-user-clock'}`}></i>
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">{app.target}</p>
                  <p className="text-xs text-slate-500">
                    <span className="font-bold text-slate-700">{app.requester}</span> 於 {app.date} 提交
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-sm hover:bg-rose-50 transition-all">駁回</button>
                <button className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all">核准並簽章</button>
              </div>
            </div>
          ))}
          {mockApprovals.length === 0 && (
            <div className="p-12 text-center text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed">
              目前無任何待簽核項目
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">簽核統計</h2>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">平均審查時長</p>
              <p className="text-3xl font-black text-slate-800">4.2 小時</p>
            </div>
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">本月已簽核</span>
                <span className="font-bold text-slate-800">128 件</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">被駁回件數</span>
                <span className="font-bold text-rose-500">12 件</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">總流程效率</span>
                <span className="font-bold text-emerald-500">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approvals;
