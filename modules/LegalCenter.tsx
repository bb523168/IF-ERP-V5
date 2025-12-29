
import React, { useState } from 'react';
import { getLegalDraft } from '../services/geminiService.ts';
import { UserRole } from '../types.ts';

interface LegalCenterProps {
  role: UserRole;
}

const LegalCenter: React.FC<LegalCenterProps> = ({ role }) => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAIDraft = async () => {
    if (!prompt) return;
    setLoading(true);
    const draft = await getLegalDraft(prompt);
    setResult(draft);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800">AI 合約助手</h3>
          </div>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            輸入您的合約需求或法律爭議情境，AI 將為您生成正式的條款建議。
          </p>
          <textarea
            className="w-full h-40 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm resize-none"
            placeholder="例如：請撰寫一條關於業主遲延支付款項之罰則條款，需包含寬限期 7 天與年利率 5% 的遲延利息..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            onClick={handleAIDraft}
            disabled={loading}
            className="mt-4 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <><i className="fas fa-magic"></i> 生成條款建議</>
            )}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">合約範本庫</h3>
          <div className="space-y-3">
            {['建築設計委託合約', '室內裝修施工合約', '變更使用併報室裝合約', '結構複委託合約'].map(tmp => (
              <div key={tmp} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg group cursor-pointer border border-transparent hover:border-slate-200 transition-all">
                <span className="text-sm font-medium text-slate-700">{tmp}</span>
                <i className="fas fa-download text-slate-400 group-hover:text-amber-500"></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
          <span className="text-amber-500 text-xs font-black uppercase tracking-widest">Draft Output Preview</span>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-white"><i className="fas fa-copy"></i></button>
            <button className="p-2 text-slate-400 hover:text-white"><i className="fas fa-print"></i></button>
          </div>
        </div>
        <div className="flex-1 p-8 text-slate-300 font-serif leading-loose whitespace-pre-wrap overflow-y-auto">
          {result || <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50 space-y-4">
            <i className="fas fa-gavel text-6xl"></i>
            <p className="italic">等待 AI 生成內容...</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default LegalCenter;
