
import React, { useState } from 'react';
import { UserRole } from '../types.ts';

interface QuotationListProps {
  role: UserRole;
}

const QuotationList: React.FC<QuotationListProps> = ({ role }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const mockQuotation = {
    id: 'Q-2025-001',
    projectCode: '25-A01',
    projectName: '台北李宅新建工程',
    client: '李曉明先生',
    amount: 1200000,
    status: 'APPROVED',
    items: [
      { phase: '規劃設計階段', percentage: 20, amount: 240000, condition: '合約簽訂後' },
      { phase: '建照申請階段', percentage: 30, amount: 360000, condition: '送件審查前' },
      { phase: '施工圖說階段', percentage: 30, amount: 360000, condition: '建照核發後' },
      { phase: '工程竣工階段', percentage: 20, amount: 240000, condition: '取得使照後' },
    ],
    bank: '台新銀行 (812) 大里分行',
    accName: '如果建築師事務所',
    accNo: '2068-10-0001234-5'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">報價單列表</h2>
        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-amber-500/20">
          <i className="fas fa-plus mr-2"></i> 新增報價草稿
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b">
            <tr>
              <th className="px-6 py-4">編號</th>
              <th className="px-6 py-4">專案名稱</th>
              <th className="px-6 py-4">總金額</th>
              <th className="px-6 py-4">狀態</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono font-bold text-slate-700">Q25-001</td>
              <td className="px-6 py-4 text-sm">
                <p className="font-bold text-slate-800">25-A01 台北李宅</p>
                <p className="text-xs text-slate-500">業主：李曉明</p>
              </td>
              <td className="px-6 py-4 font-bold text-slate-800">$1,200,000</td>
              <td className="px-6 py-4">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">已核准</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => setShowPreview(true)}
                  className="text-amber-500 hover:text-amber-600 font-bold text-xs flex items-center gap-1 ml-auto"
                >
                  <i className="fas fa-file-pdf"></i> 預覽輸出
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* High-End PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-slate-900/95 z-[60] flex flex-col items-center p-4 md:p-12 overflow-y-auto">
          <div className="w-full max-w-4xl flex justify-between items-center mb-8 text-white">
            <h3 className="text-2xl font-light tracking-widest uppercase">Quotation Preview</h3>
            <button onClick={() => setShowPreview(false)} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="w-full max-w-4xl bg-[#1a1a1a] p-12 shadow-2xl rounded-sm border border-amber-900/30 text-[#d4af37] font-serif relative overflow-hidden">
            {/* Watermark/Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <i className="fas fa-building text-[300px]"></i>
            </div>
            
            <div className="flex justify-between items-start border-b border-[#d4af37]/30 pb-12 mb-12">
              <div>
                <h1 className="text-4xl font-black mb-2 tracking-tighter">IF ARCHITECTS</h1>
                <p className="text-sm font-sans text-amber-200/60 uppercase tracking-widest">Architectural Design & Planning</p>
              </div>
              <div className="text-right font-sans text-sm text-amber-200/80">
                <p className="font-bold text-amber-500">NO. {mockQuotation.id}</p>
                <p>DATE: 2025.02.14</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <p className="text-xs uppercase font-sans tracking-widest text-amber-200/40">Client Info</p>
                <div className="text-lg">
                  <p className="font-bold">{mockQuotation.client}</p>
                  <p className="text-sm opacity-80 mt-1">台北市大安區新生南路...</p>
                </div>
              </div>
              <div className="space-y-4 text-right">
                <p className="text-xs uppercase font-sans tracking-widest text-amber-200/40">Project Info</p>
                <div className="text-lg">
                  <p className="font-bold">{mockQuotation.projectName}</p>
                  <p className="text-sm opacity-80 mt-1">CODE: {mockQuotation.projectCode}</p>
                </div>
              </div>
            </div>

            <table className="w-full mb-12 text-sm font-sans">
              <thead>
                <tr className="border-b border-[#d4af37]/20 text-amber-200/40 uppercase tracking-widest text-left">
                  <th className="py-4">Phase / Description</th>
                  <th className="py-4 text-center">Percent</th>
                  <th className="py-4 text-right">Amount (TWD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/10">
                {mockQuotation.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-6">
                      <p className="font-bold text-amber-200">{item.phase}</p>
                      <p className="text-xs opacity-60 mt-1 italic">{item.condition}</p>
                    </td>
                    <td className="py-6 text-center font-mono">{item.percentage}%</td>
                    <td className="py-6 text-right font-mono font-bold">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-[#d4af37] text-xl">
                  <td colSpan={2} className="py-8 font-serif uppercase tracking-widest font-bold">Total Investment</td>
                  <td className="py-8 text-right font-black">${mockQuotation.amount.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-[#d4af37]/30">
              <div className="text-xs space-y-2 opacity-60 font-sans">
                <p className="font-bold text-amber-500 uppercase tracking-widest mb-4">Payment Information</p>
                <p>BANK: {mockQuotation.bank}</p>
                <p>ACCOUNT NAME: {mockQuotation.accName}</p>
                <p>ACCOUNT NO: {mockQuotation.accNo}</p>
                <p className="mt-6 italic">* 以上報價不含 5% 營業稅。代收規費將依據主管機關公文另計。</p>
              </div>
              <div className="flex flex-col items-end justify-end">
                <div className="relative border border-[#d4af37]/30 p-4 rounded bg-black/20">
                  <div className="w-32 h-32 flex items-center justify-center opacity-80">
                    {/* Simulated digital stamp */}
                    <div className="border-4 border-amber-600 rounded-full w-24 h-24 flex flex-col items-center justify-center text-amber-600 font-bold leading-tight">
                      <span className="text-[10px]">REGISTERED</span>
                      <span className="text-xs">如果建築師</span>
                      <span className="text-[10px]">ARCHITECT</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-center mt-2 font-sans uppercase tracking-tighter opacity-50">Authorized Signature</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button className="bg-[#d4af37] text-black px-12 py-3 rounded font-bold uppercase tracking-widest hover:bg-amber-400 transition-all font-sans">
                <i className="fas fa-print mr-2"></i> Download Official PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationList;
