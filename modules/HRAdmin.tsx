
import React, { useState } from 'react';

const HRAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [isSigning, setIsSigning] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex gap-1 p-1 bg-slate-200 rounded-xl w-fit">
        {['attendance', 'leave', 'assets'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all capitalize ${activeTab === tab ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
          >
            {tab === 'attendance' ? '差勤打卡' : tab === 'leave' ? '請假管理' : '設備/印章借用'}
          </button>
        ))}
      </div>

      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <h3 className="text-3xl font-black text-slate-800 mb-2">09:41 AM</h3>
            <p className="text-slate-500 mb-8 font-medium">2025年2月14日 星期五</p>
            <div className="grid grid-cols-2 gap-4 w-full">
              <button className="bg-emerald-500 text-white p-6 rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all">
                <i className="fas fa-sign-in-alt mb-2 block"></i> 上班打卡
              </button>
              <button className="bg-slate-100 text-slate-400 p-6 rounded-2xl font-black text-lg cursor-not-allowed">
                <i className="fas fa-sign-out-alt mb-2 block"></i> 下班打卡
              </button>
            </div>
            <div className="mt-8 p-4 bg-slate-50 w-full rounded-xl text-left border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">今日紀錄</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">尚未打卡</span>
                <span className="text-slate-400 italic">-- : --</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">年假剩餘額度 (特休)</h3>
            <div className="space-y-8">
              {[
                { label: '特休假', used: 4, total: 10, color: 'bg-amber-500' },
                { label: '事假', used: 2, total: 14, color: 'bg-blue-500' },
                { label: '病假', used: 1, total: 30, color: 'bg-rose-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.used} / {item.total} 天</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`${item.color} h-full rounded-full transition-all duration-1000`} 
                      style={{ width: `${(item.used/item.total)*100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assets' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">設備/印章借用申請</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none">
                <option>選擇借用標的...</option>
                <option>事務所正章</option>
                <option>投影機</option>
                <option>雷射測距儀</option>
              </select>
              <input type="text" placeholder="借用原因敘述..." className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
              <button 
                onClick={() => setIsSigning(true)}
                className="bg-amber-500 text-white font-bold py-2 rounded-lg shadow-md"
              >
                前往簽名借用
              </button>
            </div>
          </div>

          {isSigning && (
            <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-lg p-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-black text-slate-800">數位簽名板</h3>
                  <p className="text-sm text-slate-500">請在下方灰色區域內進行簽署</p>
                </div>
                <div className="h-64 bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center relative group">
                  <span className="text-slate-400 italic pointer-events-none group-hover:hidden">Signature Area</span>
                  <canvas className="absolute inset-0 w-full h-full cursor-crosshair"></canvas>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsSigning(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all">取消</button>
                  <button className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg transition-all hover:bg-black">確認簽署</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HRAdmin;
