
import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus, UserRole } from '../types.ts';
import { NATURE_CODES, STUDIO_CODES, PRODUCT_TYPES, STATUS_PROGRESS } from '../constants.tsx';
import { generateProjectCode } from '../utils/codeGenerator.ts';

interface ProjectListProps {
  role: UserRole;
}

const ProjectList: React.FC<ProjectListProps> = ({ role }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    caseName: '',
    location: '',
    productType: PRODUCT_TYPES[0],
    natures: [] as string[],
    studioCode: STUDIO_CODES[0].code,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    // Mock data load
    const mockProjects: Project[] = [
      {
        id: '1',
        projectCode: '25-A01',
        name: '台北李宅',
        client: '李曉明',
        caseName: '新建住宅工程',
        location: '台北市大安區',
        productType: 'H2透天',
        natures: ['A'],
        studioCode: '-',
        year: 2025,
        serial: 1,
        status: ProjectStatus.CONSTRUCTION,
        progress: 80,
        createdAt: '2025-01-10'
      },
      {
        id: '2',
        projectCode: '25L-A02',
        name: '台中王宅',
        client: '王大同',
        caseName: '室內裝修案',
        location: '台中市南屯區',
        productType: 'R2集合住宅',
        natures: ['A'],
        studioCode: 'L-',
        year: 2025,
        serial: 2,
        status: ProjectStatus.PLANNING,
        progress: 35,
        createdAt: '2025-02-15'
      }
    ];
    setProjects(mockProjects);
  }, []);

  const handleSaveProject = () => {
    if (editingId) {
      // Edit mode
      setProjects(projects.map(p => {
        if (p.id === editingId) {
          // Re-generate code if year, studio, or natures changed
          const code = generateProjectCode(formData.year, formData.studioCode, formData.natures, p.serial);
          return {
            ...p,
            projectCode: code,
            name: formData.name,
            client: formData.client,
            caseName: formData.caseName,
            location: formData.location,
            productType: formData.productType,
            natures: formData.natures,
            studioCode: formData.studioCode,
            year: formData.year,
          };
        }
        return p;
      }));
    } else {
      // Add mode
      const yearProjects = projects.filter(p => p.year === formData.year);
      const nextSerial = yearProjects.length + 1;
      const code = generateProjectCode(formData.year, formData.studioCode, formData.natures, nextSerial);
      
      const newProject: Project = {
        id: Date.now().toString(),
        projectCode: code,
        name: formData.name,
        client: formData.client,
        caseName: formData.caseName,
        location: formData.location,
        productType: formData.productType,
        natures: formData.natures,
        studioCode: formData.studioCode,
        year: formData.year,
        serial: nextSerial,
        status: ProjectStatus.QUOTING,
        progress: 5,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProjects([newProject, ...projects]);
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      name: project.name,
      client: project.client,
      caseName: project.caseName || '',
      location: project.location,
      productType: project.productType,
      natures: project.natures,
      studioCode: project.studioCode,
      year: project.year,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除此專案嗎？此操作無法還原。')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      client: '',
      caseName: '',
      location: '',
      productType: PRODUCT_TYPES[0],
      natures: [],
      studioCode: STUDIO_CODES[0].code,
      year: new Date().getFullYear(),
    });
  };

  const toggleNature = (code: string) => {
    setFormData(prev => ({
      ...prev,
      natures: prev.natures.includes(code) 
        ? prev.natures.filter(c => c !== code)
        : [...prev.natures, code]
    }));
  };

  const filteredProjects = projects.filter(p => 
    p.year === filterYear && 
    (p.name.includes(searchTerm) || p.projectCode.includes(searchTerm) || p.client.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <select 
            value={filterYear}
            onChange={(e) => setFilterYear(parseInt(e.target.value))}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y} 年度</option>)}
          </select>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="搜尋編號、名稱、業主..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {role !== UserRole.VIEWER && (
          <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <i className="fas fa-plus"></i> 新增專案
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">進行中案件</p>
          <p className="text-2xl font-black text-slate-800">{filteredProjects.filter(p => p.status !== ProjectStatus.CLOSED).length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">本年度結案</p>
          <p className="text-2xl font-black text-slate-800">{filteredProjects.filter(p => p.status === ProjectStatus.CLOSED).length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">案件總數</p>
          <p className="text-2xl font-black text-slate-800">{filteredProjects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">平均進度</p>
          <p className="text-2xl font-black text-amber-500">
            {filteredProjects.length > 0 
              ? Math.round(filteredProjects.reduce((acc, p) => acc + p.progress, 0) / filteredProjects.length) 
              : 0}%
          </p>
        </div>
      </div>

      {/* Project Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b">
              <tr>
                <th className="px-6 py-4">專案編號</th>
                <th className="px-6 py-4">專案/業主</th>
                <th className="px-6 py-4">類別/性質</th>
                <th className="px-6 py-4 w-1/4">當前進度</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map(project => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      {project.projectCode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">{project.name}</p>
                    <p className="text-xs text-slate-500">{project.client} | {project.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {project.productType}
                      </span>
                      {project.natures.map(n => (
                        <span key={n} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                          {NATURE_CODES.find(nc => nc.code === n)?.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-600">{project.status}</span>
                        <span className="text-amber-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {role !== UserRole.VIEWER && (
                      <>
                        <button 
                          onClick={() => handleEdit(project)}
                          className="text-slate-400 hover:text-amber-500 p-2"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        {(role === UserRole.ADMIN) && (
                          <button 
                            onClick={() => handleDelete(project.id)}
                            className="text-slate-400 hover:text-red-500 p-2"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    查無相關專案資料
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Modal (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center bg-slate-900 text-white">
              <h2 className="text-xl font-bold">{editingId ? '編輯專案資料' : '新建專案項目'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><i className="fas fa-times text-lg"></i></button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">專案名稱</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="例如：台北李宅"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">業主姓名/公司</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="例如：李曉明"
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">歸屬事務所</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none"
                    value={formData.studioCode}
                    onChange={(e) => setFormData({...formData, studioCode: e.target.value})}
                  >
                    {STUDIO_CODES.map(s => <option key={s.code} value={s.code}>{s.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">產品類型</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none"
                    value={formData.productType}
                    onChange={(e) => setFormData({...formData, productType: e.target.value})}
                  >
                    {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">建檔年份</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  >
                    {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">案件性質 (複選)</label>
                <div className="flex flex-wrap gap-2">
                  {NATURE_CODES.map(nature => (
                    <button
                      key={nature.code}
                      onClick={() => toggleNature(nature.code)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        formData.natures.includes(nature.code)
                        ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/30'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {nature.name} ({nature.code})
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">系統自動預覽編號</p>
                  <p className="text-xl font-black text-slate-900 font-mono">
                    {generateProjectCode(formData.year, formData.studioCode, formData.natures, editingId ? (projects.find(p => p.id === editingId)?.serial || 0) : projects.filter(p => p.year === formData.year).length + 1)}
                  </p>
                </div>
                <div className="text-right">
                  <i className="fas fa-barcode text-3xl text-slate-300"></i>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-200 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleSaveProject}
                disabled={!formData.name || formData.natures.length === 0}
                className="px-8 py-2.5 rounded-lg text-sm font-bold bg-slate-900 text-white hover:bg-black disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
              >
                {editingId ? '確認儲存' : '確認新增'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
