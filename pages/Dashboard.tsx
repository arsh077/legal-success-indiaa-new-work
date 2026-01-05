import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  LogOut,
  UserPlus,
  ChevronRight,
  Menu,
  ChevronLeft,
  Settings,
  Bell,
  LayoutDashboard,
  X,
  UserCheck,
  ShieldAlert,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  MessageSquare,
  Hash
} from 'lucide-react';
import { User, Lead, LeadStatus, UserRole } from '../types.ts';
import Logo from '../components/Logo.tsx';

interface DashboardProps {
  globalLeads: Lead[];
  onUpdateLead: (lead: Lead) => void;
  globalUsers: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onRemoveUser: (userId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  globalLeads, 
  onUpdateLead, 
  globalUsers, 
  onAddUser, 
  onRemoveUser 
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'users'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'EMPLOYEE' as UserRole });

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      navigate('/login');
      return;
    }
    setCurrentUser(JSON.parse(userJson));

    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarVisible(false);
      else setIsSidebarVisible(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateStatus = (leadId: string, status: LeadStatus) => {
    const lead = globalLeads.find(l => l.id === leadId);
    if (lead) {
      const updated = { ...lead, status, updatedAt: new Date().toISOString() };
      onUpdateLead(updated);
      if (selectedLead?.id === leadId) setSelectedLead(updated);
    }
  };

  const assignLead = (leadId: string, userId: string) => {
    const lead = globalLeads.find(l => l.id === leadId);
    if (lead) {
      const updated = { 
        ...lead, 
        assignedTo: userId === 'unassigned' ? undefined : userId, 
        updatedAt: new Date().toISOString() 
      };
      onUpdateLead(updated);
      if (selectedLead?.id === leadId) setSelectedLead(updated);
    }
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    onAddUser(newUser);
    setNewUser({ name: '', email: '', role: 'EMPLOYEE' });
    setIsAddUserModalOpen(false);
  };

  const filteredLeads = globalLeads.filter(l => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = l.name.toLowerCase().includes(query) || 
                         l.email.toLowerCase().includes(query) ||
                         l.service.toLowerCase().includes(query) ||
                         l.phone.includes(searchQuery);
    
    if (currentUser?.role === 'EMPLOYEE') {
      return matchesSearch && l.assignedTo === currentUser.id;
    }
    return matchesSearch;
  });

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'NEW': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'IN_PROGRESS': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'COMPLETED': return 'bg-green-50 text-green-600 border-green-100';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const isAdmin = currentUser?.role === 'HEAD_ADMIN' || currentUser?.role === 'ADMIN';

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex animate-in fade-in duration-700 relative overflow-hidden">
      
      {/* LEAD DETAIL MODAL - TRIGGERED BY CIRCULAR BUTTON */}
      {selectedLead && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] w-full max-w-2xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-3 bg-black" />
             
             <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-10 right-10 p-3 hover:bg-gray-100 rounded-full transition-all hover:rotate-90"
            >
              <X size={20} />
            </button>

            <div className="mb-10">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-20 h-20 bg-black text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-xl">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                   <h2 className="text-3xl font-black tracking-tighter mb-2 text-[#0B0B0B]">{selectedLead.name}</h2>
                   <div className="flex items-center gap-3">
                     <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${getStatusColor(selectedLead.status)}`}>
                       {selectedLead.status.replace('_', ' ')}
                     </span>
                     <span className="text-gray-200">/</span>
                     <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{selectedLead.service}</p>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-100">
                 <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Mobile ID</label>
                      <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-4 text-xl font-bold text-black hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Phone size={18} />
                        </div>
                        {selectedLead.phone}
                      </a>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Email Gateway</label>
                      <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-4 text-lg font-bold text-black truncate">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                          <Mail size={18} />
                        </div>
                        {selectedLead.email}
                      </a>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Inquiry Created</label>
                      <div className="flex items-center gap-4 text-xl font-bold text-black">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                          <Calendar size={18} />
                        </div>
                        {new Date(selectedLead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Internal ID</label>
                      <div className="flex items-center gap-4 text-xl font-bold text-black/30">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                          <Hash size={18} />
                        </div>
                        {selectedLead.id.slice(0, 8)}
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {isAdmin && (
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Case Assignment</label>
                    <select 
                      value={selectedLead.assignedTo || 'unassigned'}
                      onChange={(e) => assignLead(selectedLead.id, e.target.value)}
                      className="w-full p-5 bg-gray-50 border-none rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer"
                    >
                      <option value="unassigned">-- Select Expert --</option>
                      {globalUsers.filter(u => u.role !== 'HEAD_ADMIN').map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                      ))}
                    </select>
                  </div>
               )}
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Update Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => updateStatus(selectedLead.id, s as LeadStatus)}
                        className={`px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                          selectedLead.status === s ? 'bg-black text-white shadow-xl' : 'bg-gray-50 text-gray-400'
                        }`}
                      >
                        {s.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-[100] transition-all duration-700 ${isSidebarVisible ? 'w-80' : 'w-0 -translate-x-full'} overflow-hidden`}>
        <div className="w-80 p-10 h-full flex flex-col">
          <div className="mb-16 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-[#0B0B0B]">LSI. PORTAL</span>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mt-1">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <button onClick={() => setIsSidebarVisible(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-200">
              <ChevronLeft size={20} />
            </button>
          </div>

          <nav className="flex-grow space-y-3">
            <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] transition-all ${activeTab === 'leads' ? 'bg-black text-white shadow-2xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50'}`}>
              <LayoutDashboard size={18} /> Pipeline
            </button>
            {isAdmin && (
              <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] transition-all ${activeTab === 'users' ? 'bg-black text-white shadow-2xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50'}`}>
                <Users size={18} /> Team
              </button>
            )}
          </nav>

          <div className="pt-10 border-t border-gray-50 mt-auto">
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-grow h-screen overflow-y-auto transition-all duration-700 ${isSidebarVisible ? 'pl-[320px] pr-12 pt-12' : 'px-12 md:px-24 pt-12 md:pt-32'}`}>
        {!isSidebarVisible && (
          <button onClick={() => setIsSidebarVisible(true)} className="fixed top-8 left-8 z-[110] p-4 bg-white border border-gray-100 rounded-2xl shadow-2xl hover:bg-black hover:text-white transition-all">
            <Menu size={20} />
          </button>
        )}

        <div className="max-w-7xl mx-auto pb-40">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <div>
              <div className="mb-10 opacity-30"><Logo className="h-6" /></div>
              <h1 className="text-6xl font-black tracking-tighter text-[#0B0B0B] leading-[0.9]">
                {activeTab === 'leads' ? 'Active Pipeline' : 'Expert Network'}
              </h1>
              <p className="text-gray-400 mt-6 font-bold text-xl uppercase tracking-tighter">
                {activeTab === 'leads' ? `Managing ${filteredLeads.length} live inquiries.` : `Authorized Team: ${globalUsers.length} members.`}
              </p>
            </div>
            {activeTab === 'users' && currentUser.role === 'HEAD_ADMIN' && (
              <button onClick={() => setIsAddUserModalOpen(true)} className="bg-black text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest flex items-center gap-4 hover:bg-gray-800 transition-all">
                <UserPlus size={18} /> Add Expert
              </button>
            )}
          </div>

          {activeTab === 'leads' && (
            <div className="space-y-12">
              <div className="relative">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                <input 
                  type="text" 
                  placeholder="Filter by name, phone or email gateway..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-[2.5rem] py-8 pl-20 pr-10 focus:ring-2 focus:ring-black outline-none transition-all shadow-sm text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredLeads.map((lead, idx) => (
                  <div key={lead.id} className="bg-white border border-gray-50 rounded-[3rem] p-10 hover:shadow-2xl transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden">
                    <div className="flex items-center gap-10 flex-grow">
                      <div className="w-20 h-20 bg-black text-white rounded-[1.8rem] flex items-center justify-center font-bold text-3xl shadow-xl">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h3 className="font-black text-2xl text-[#0B0B0B] tracking-tighter">{lead.name}</h3>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${getStatusColor(lead.status)}`}>
                            {lead.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                          <div className="flex items-center gap-2 text-black">
                            <Phone size={14} className="opacity-30" /> {lead.phone}
                          </div>
                          <span>•</span>
                          <span>{lead.service}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="text-right hidden md:block">
                        <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Created</div>
                        <div className="text-sm font-bold text-black">{new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
                      </div>
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-black/20"
                      >
                        <ChevronRight size={28} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;