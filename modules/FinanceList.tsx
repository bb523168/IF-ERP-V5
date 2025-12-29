
import React, { useState } from 'react';
import { getAccountingSuggestion } from '../services/geminiService';
import { UserRole } from '../types';

interface FinanceListProps {
  role: UserRole;
}

const FinanceList: React.FC<FinanceListProps> = ({ role }) => {
  const [activeView, setActiveView] = useState<'summary' | 'ledger'>('summary');
  const [aiNote, setAiNote] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const testAiHelper = async () => {
    setIsAiLoading(true);
    const suggestion = await getAccountingSuggestion("支付結構技師複委託費用 20 萬元，包含 5% 營業稅。");
    try {
      setAiNote(JSON.parse(suggestion));
    } catch (e) {
      setAiNote({ account: '專業服務費', category: '複委託', note: suggestion });
    }
    setIsAiLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-1 p-1 bg-slate-200 rounded-xl w-fit">
        <button 
          onClick={() => setActiveView('summary')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'summary' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
        >
          財會總覽
        </button>
        <button 
          onClick={() => setActiveView('ledger')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'ledger' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
        >
          專案收支分戶帳
        </button>
      </div>

      {activeView === 'summary' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl text-white shadow-xl">
              <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-widest">年度應收帳款</p>
              <p className="text-3xl font-black mb-4">$8,450,000</p>
              <div className="flex justify-between items-end">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-[10px] ml-4 opacity-60">65% 回收率</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">待支付規費/委外</p>
                <p className="text-3xl font-black text-rose-500">$1,220,000</p>
              </div>
              <button className="text-amber-500 text-sm font-bold mt-4 flex items-center gap-2 hover:gap-3 transition-all">
                查看明細 <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between border-l-4 border-l-emerald-500">
              <div>
                <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">目前淨現金流</p>
                <p className="text-3xl font-black text-emerald-600">+$2,150,000</p>
              </div>
              <p className="text-[10px] text-slate-400 mt-4">更新於: 2025-02-14 15:30</p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center text-xl shadow-lg">
              <i className="fas fa-magic"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-indigo-900 font-bold mb-1">AI 會計記帳助手</h4>
              <p className="text-indigo-700/70 text-sm mb-4">輸入您的收支敘述，AI 將自動建議對應的會計科目與稅務分類。</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="試試看輸入：支付結構技師費用 20 萬..."
                  className="flex-1 px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button 
                  onClick={testAiHelper}
                  disabled={isAiLoading}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : 'AI 分析'}
                </button>
              </div>
              {aiNote && (
                <div className="mt-4 p-4 bg-white rounded-xl border border-indigo-100 shadow-sm animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">建議科目</p>
                      <p className="font-bold text-slate-800">{aiNote.account}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">支出性質</p>
                      <p className="font-bold text-slate-800">{aiNote.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic">{aiNote.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
           <div className="p-4 border-b flex justify-between items-center">
             <h3 className="font-bold text-slate-800">2025 年度專案帳冊</h3>
             <div className="flex gap-2">
               <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all">匯出 CSV</button>
               <button className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all">年度損益</button>
             </div>
           </div>
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-500 font-bold border-b">
               <tr>
                 <th className="px-6 py-4">專案編號/名稱</th>
                 <th className="px-6 py-4">合約總額</th>
                 <th className="px-6 py-4">已收金額</th>
                 <th className="px-6 py-4">委外/規費支出</th>
                 <th className="px-6 py-4 text-emerald-600">專案淨利</th>
               </tr>
             </thead>
             <tbody className="divide-y">
               <tr>
                 <td className="px-6 py-4">
                   <p className="font-bold">25-A01 台北李宅</p>
                 </td>
                 <td className="px-6 py-4 font-mono">$1,200,000</td>
                 <td className="px-6 py-4 font-mono text-emerald-600">$240,000</td>
                 <td className="px-6 py-4 font-mono text-rose-500">$50,000</td>
                 <td className="px-6 py-4 font-bold">$190,000</td>
               </tr>
             </tbody>
           </table>
        </div>
      )}
    </div>
  );
};

export default FinanceList;
