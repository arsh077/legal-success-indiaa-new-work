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
  MessageSquare
} from 'lucide-react';
import { User, Lead, LeadStatus, UserRole } from '../types';
import Logo from '../components/Logo';

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
      if (window.innerWidth < 1024) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
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
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         l.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      
      {/* LEAD DETAIL MODAL - This opens when you click the circular button */}
      {selectedLead && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] w-full max-w-2xl p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-3 bg-black" />
             
             <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-10 right-10 p-3 hover:bg-gray-100 rounded-full transition-all hover:rotate-90"
            >
              <X size={20} />
            </button>

            <div className="mb-12">
              <div className="flex items-center gap-8 mb-10">
                <div className="w-24 h-24 bg-black text-white rounded-[2.2rem] flex items-center justify-center font-bold text-4xl shadow-2xl shadow-black/10">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                   <h2 className="text-4xl font-black tracking-tighter mb-2 text-[#0B0B0B]">{selectedLead.name}</h2>
                   <div className="flex items-center gap-3">
                     <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${getStatusColor(selectedLead.status)}`}>
                       {selectedLead.status.replace('_', ' ')}
                     </span>
                     <span className="text-gray-300 text-xs font-bold">•</span>
                     <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{selectedLead.service}</p>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-50/50 p-10 rounded-[2.5rem] border border-gray-50">
                 <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Mobile Number</label>
                      <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-4 text-xl font-bold text-black hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Phone size={18} />
                        </div>
                        {selectedLead.phone}
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </a>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Email Address</label>
                      <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-4 text-xl font-bold text-black hover:text-blue-600 transition-colors group">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Mail size={18} />
                        </div>
                        <span className="truncate max-w-[200px]">{selectedLead.email}</span>
                      </a>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Inquiry Date</label>
                      <div className="flex items-center gap-4 text-xl font-bold text-black">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                          <Calendar size={18} />
                        </div>
                        {new Date(selectedLead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-3">Internal Status</label>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                          <ShieldAlert size={18} className="text-yellow-500" />
                        </div>
                        <span className="font-bold text-black uppercase tracking-widest text-[12px]">{selectedLead.status.replace('_', ' ')}</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {isAdmin && (
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Assign Expert</label>
                    <div className="relative">
                      <select 
                        value={selectedLead.assignedTo || 'unassigned'}
                        onChange={(e) => assignLead(selectedLead.id, e.target.value)}
                        className="w-full p-6 bg-gray-50 border-none rounded-2xl text-[12px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-black outline-none transition-all cursor-pointer appearance-none"
                      >
                        <option value="unassigned">-- Unassigned --</option>
                        {globalUsers.filter(u => u.role !== 'HEAD_ADMIN').map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                      <UserCheck className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={18} />
                    </div>
                  </div>
               )}
               <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Update Pipeline</label>
                  <div className="flex flex-wrap gap-2">
                    {['NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => updateStatus(selectedLead.id, s as LeadStatus)}
                        className={`px-5 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          selectedLead.status === s ? 'bg-black text-white shadow-xl shadow-black/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {s.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
            
            <div className="mt-12 text-center">
               <button className="flex items-center gap-3 mx-auto text-[11px] font-black uppercase tracking-[0.25em] text-gray-300 hover:text-black transition-colors">
                  <MessageSquare size={16} />
                  Add Internal Note
               </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 md:p-14 shadow-2xl relative">
            <button 
              onClick={() => setIsAddUserModalOpen(false)}
              className="absolute top-10 right-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Add Team Member</h2>
            <p className="text-gray-400 text-sm mb-10">Grant portal access to a new compliance expert.</p>
            
            <form onSubmit={handleAddUserSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black transition-all"
                  placeholder="Employee Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Professional Email</label>
                <input 
                  type="email" 
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black transition-all"
                  placeholder="name@legalsuccess.in"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Access Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as UserRole})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black appearance-none cursor-pointer"
                >
                  <option value="EMPLOYEE">Employee (Assigned Leads Only)</option>
                  <option value="ADMIN">Admin (All Leads + Assignment)</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-6 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 mt-4"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-[100] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarVisible ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'
        } overflow-hidden shadow-2xl lg:shadow-none`}
      >
        <div className="w-80 p-10 h-full flex flex-col">
          <div className="mb-16 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-[#0B0B0B]">LSI. PORTAL</span>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mt-1">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <button 
              onClick={() => setIsSidebarVisible(false)}
              className="p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-200 hover:text-black"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <nav className="flex-grow space-y-3">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] transition-all duration-500 ${
                activeTab === 'leads' ? 'bg-black text-white shadow-2xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <LayoutDashboard size={18} />
              Pipeline
            </button>
            {isAdmin && (
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] transition-all duration-500 ${
                  activeTab === 'users' ? 'bg-black text-white shadow-2xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Users size={18} />
                Team
              </button>
            )}
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] text-gray-400 hover:bg-gray-50 hover:text-black transition-all">
              <Settings size={18} />
              Config
            </button>
          </nav>

          <div className="pt-10 border-t border-gray-50 mt-auto">
            <div className="flex items-center gap-4 mb-8 p-3 rounded-2xl bg-[#F9FAFB]">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-black truncate text-[#0B0B0B]">{currentUser.name}</div>
                <div className="text-[9px] text-gray-400 truncate uppercase tracking-[0.15em] font-bold">Authorized</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main 
        className={`flex-grow h-screen overflow-y-auto transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarVisible 
            ? 'pl-[320px] pr-12 pt-12' 
            : 'px-12 md:px-24 pt-12 md:pt-32'
        }`}
      >
        {/* HAMBURGER TRIGGER */}
        {!isSidebarVisible && (
          <button 
            onClick={() => setIsSidebarVisible(true)}
            className="fixed top-8 left-8 z-[110] p-4 bg-white border border-gray-100 rounded-2xl shadow-2xl hover:bg-black hover:text-white transition-all group"
          >
            <Menu size={20} className="group-hover:rotate-90 transition-transform" />
          </button>
        )}

        <div className={`max-w-7xl mx-auto pb-32 transition-all duration-1000 ${isSidebarVisible ? 'scale-[0.98]' : 'scale-100'}`}>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <div>
              <div className="mb-10 opacity-30 hover:opacity-100 transition-opacity">
                 <Logo className="h-6" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#0B0B0B] leading-[0.9]">
                {activeTab === 'leads' ? 'Real-time Pipeline' : 'The Legal Team'}
              </h1>
              <p className="text-gray-400 mt-6 font-bold text-lg md:text-xl max-w-xl uppercase tracking-tighter">
                {activeTab === 'leads' 
                  ? `Active Flow: ${filteredLeads.length} items requiring attention.` 
                  : `Managing access for ${globalUsers.length} compliance experts.`}
              </p>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-6 bg-white border border-gray-100 rounded-[1.5rem] text-gray-300 hover:text-black transition-all shadow-sm">
                 <Bell size={24} />
               </button>
               {activeTab === 'users' && currentUser.role === 'HEAD_ADMIN' && (
                <button 
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="bg-[#1D222B] text-white px-12 py-5 rounded-[2.2rem] font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-6 hover:bg-black transition-all shadow-2xl shadow-black/10 group h-20"
                >
                  <UserPlus size={26} className="group-hover:scale-110 transition-transform" />
                  <div className="text-left leading-none">
                    <div>ADD NEW</div>
                    <div className="opacity-40 mt-1">EXPERT</div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'leads' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="relative flex-grow">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                  <input 
                    type="text" 
                    placeholder="Search by client name, mobile number or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2.5rem] py-7 pl-20 pr-10 focus:ring-2 focus:ring-black outline-none transition-all shadow-sm text-sm font-medium"
                  />
                </div>
                <button className="flex items-center justify-center gap-4 px-12 py-7 bg-white border border-gray-100 rounded-[2.5rem] text-gray-400 font-black text-[11px] uppercase tracking-[0.2em] hover:text-black hover:border-black transition-all shadow-sm">
                  <Filter size={20} />
                  Pipeline Filter
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredLeads.map((lead, idx) => (
                  <div 
                    key={lead.id} 
                    className="bg-white border border-gray-50 rounded-[3.5rem] p-10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-10 flex-grow">
                      <div className="w-20 h-20 bg-black text-white rounded-[1.8rem] flex items-center justify-center font-bold text-3xl group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-black/5">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-5">
                          <h3 className="font-black text-2xl text-[#0B0B0B] tracking-tighter">{lead.name}</h3>
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] border rounded-full px-5 py-2 flex items-center gap-2 ${getStatusColor(lead.status)}`}>
                            {lead.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-[#6B7280] text-[13px] font-bold tracking-tight">
                          <div className="flex items-center gap-2 text-black">
                            <Phone size={14} className="opacity-30" />
                            {lead.phone}
                          </div>
                          <span className="text-gray-100">|</span>
                          <span className="uppercase text-[10px] tracking-widest text-gray-400">{lead.service}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-16 text-right w-full md:w-auto justify-between md:justify-end">
                      
                      {isAdmin && (
                        <div className="text-left min-w-[180px]">
                          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
                            <UserCheck size={14} />
                            Responsibility
                          </div>
                          <select 
                            value={lead.assignedTo || 'unassigned'}
                            onChange={(e) => assignLead(lead.id, e.target.value)}
                            className="w-full p-4 bg-gray-50/50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all cursor-pointer appearance-none text-gray-500 hover:bg-gray-100"
                          >
                            <option value="unassigned">-- Select Expert --</option>
                            {globalUsers.filter(u => u.role !== 'HEAD_ADMIN').map(user => (
                              <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {!isAdmin && lead.assignedTo && (
                        <div className="text-left">
                           <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-3">Expert In Charge</div>
                           <div className="text-[12px] font-black text-black uppercase tracking-tight">
                             {globalUsers.find(u => u.id === lead.assignedTo)?.name || 'Legal Team'}
                           </div>
                        </div>
                      )}

                      <div className="hidden lg:block text-center">
                        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.25em] mb-3">Timestamp</div>
                        <div className="text-[12px] font-black text-[#0B0B0B]">
                          {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}, {new Date(lead.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <select 
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="p-4 bg-gray-50/50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all cursor-pointer appearance-none font-black text-[#0B0B0B]"
                        >
                          <option value="NEW">NEW</option>
                          <option value="IN_PROGRESS">ACTIVE</option>
                          <option value="COMPLETED">DONE</option>
                          <option value="CANCELLED">VOID</option>
                        </select>
                      </div>

                      {/* THE CIRCULAR BUTTON - NOW FUNCTIONAL */}
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xl shadow-black/20 flex-shrink-0 active:scale-95 cursor-pointer hover:bg-[#111]"
                      >
                        <ChevronRight size={30} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {globalUsers.map((user, idx) => (
                <div 
                  key={user.id} 
                  className="bg-white p-12 border border-gray-50 rounded-[4.5rem] shadow-sm hover:border-black transition-all duration-700 group relative overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-8 mb-14">
                    <div className="w-20 h-20 bg-black text-white rounded-[2rem] flex items-center justify-center font-bold text-3xl group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-black/5">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-2xl tracking-tighter leading-none mb-3">{user.name}</h3>
                      <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">{user.role.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="space-y-10 mb-14">
                    <div className="flex flex-col gap-3">
                      <span className="text-gray-300 font-black uppercase tracking-[0.2em] text-[9px]">Professional Gateway</span>
                      <span className="font-bold text-[#0B0B0B] truncate text-base tracking-tight">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-black uppercase tracking-[0.2em] text-[9px]">Network Status</span>
                      <span className="text-[#10B981] font-black uppercase tracking-widest text-[9px] flex items-center gap-3 bg-[#10B981]/5 px-5 py-2.5 rounded-full border border-[#10B981]/10">
                        <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        ACTIVE
                      </span>
                    </div>
                  </div>
                  <div className="pt-10 border-t border-gray-50 flex justify-between items-center">
                     <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors hover:underline underline-offset-8">Consultant ID</button>
                     {currentUser.role === 'HEAD_ADMIN' && user.id !== currentUser.id && (
                        <button 
                          onClick={() => onRemoveUser(user.id)}
                          className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:scale-105 transition-all flex items-center gap-3 px-5 py-2.5 hover:bg-red-50 rounded-xl"
                        >
                          <ShieldAlert size={14} />
                          REVOKE
                        </button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;