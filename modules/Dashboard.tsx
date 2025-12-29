
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const data = [
    { name: '1月', revenue: 45, expense: 20 },
    { name: '2月', revenue: 52, expense: 25 },
    { name: '3月', revenue: 38, expense: 18 },
    { name: '4月', revenue: 65, expense: 30 },
  ];

  const pieData = [
    { name: '建築設計', value: 40 },
    { name: '室內裝修', value: 30 },
    { name: '變更使用', value: 20 },
    { name: '其他', value: 10 },
  ];

  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#6366f1'];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '本月營收', value: '$1,240,000', change: '+12%', icon: 'fa-dollar-sign', color: 'bg-blue-500' },
          { label: '專案總數', value: '48', change: '+3', icon: 'fa-project-diagram', color: 'bg-amber-500' },
          { label: '待簽核項目', value: '12', change: '-2', icon: 'fa-clock', color: 'bg-rose-500' },
          { label: '預算使用率', value: '78%', change: 'Normal', icon: 'fa-percentage', color: 'bg-emerald-500' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                item.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.change}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{item.label}</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">收支趨勢圖</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                <span className="w-3 h-3 bg-amber-500 rounded-full"></span> 收入
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                <span className="w-3 h-3 bg-slate-300 rounded-full"></span> 支出
              </span>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">案件性質分佈</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">最新動態</h3>
        <div className="space-y-6">
          {[
            { user: '陳經理', action: '核准了', target: '25-A01 報價單', time: '10 分鐘前', icon: 'fa-check-circle', color: 'text-emerald-500' },
            { user: '張建築師', action: '建立了新專案', target: '25C-AS03 台中工廠變更案', time: '1 小時前', icon: 'fa-plus-circle', color: 'text-amber-500' },
            { user: '系統通知', action: '專案合約到期提醒', target: '24-E15 室內裝修案', time: '3 小時前', icon: 'fa-exclamation-triangle', color: 'text-rose-500' },
          ].map((activity, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className={`mt-1 ${activity.color}`}>
                <i className={`fas ${activity.icon} text-lg`}></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-800">
                  <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-amber-600">{activity.target}</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
