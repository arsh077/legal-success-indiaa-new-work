
import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate } from 'react-router-dom';
import { User, Lead, LeadStatus, UserRole } from '../types.ts';

// --- ICONS COMPONENT ---
const Icons = {
  Dots: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
  Grid: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  List: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Bell: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Theme: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  Trash: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 6h18M8 6V4h8v2m-1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ),
  Home: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Chart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 19V5M10 19V9M16 19V3M22 19H2" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Calendar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 2v4M17 2v4M3 8h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Settings: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.8 1.8 0 0 0 15 19.4a1.8 1.8 0 0 0-1 .33 1.8 1.8 0 0 0-.82 1.51V21.5a2 2 0 1 1-4 0v-.26A1.8 1.8 0 0 0 7 19.4a1.8 1.8 0 0 0-1.98-.36l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-.33-1 1.8 1.8 0 0 0-1.51-.82H2.5a2 2 0 1 1 0-4h.26A1.8 1.8 0 0 0 4.6 7a1.8 1.8 0 0 0-.36-1.98l-.06-.06A2 2 0 1 1 7.01 2.13l.06.06A1.8 1.8 0 0 0 9 4.6c.34 0 .67-.11 1-.33.46-.31.77-.82.82-1.38V2.5a2 2 0 1 1 4 0v.26c.05.56.36 1.07.82 1.38.33.22.66.33 1 .33a1.8 1.8 0 0 0 1.98-.36l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.8 1.8 0 0 0 19.4 9c0 .34.11.67.33 1 .31.46.82.77 1.38.82h.39a2 2 0 1 1 0 4h-.39c-.56.05-1.07.36-1.38.82-.22.33-.33.66-.33 1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  Close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Chat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.4L5.8 21l1.2-6.8-5-4.9 6.9-1z" fill="currentColor" />
    </svg>
  ),
  Arrow: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 5v14m7-7-7 7-7-7" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  LogOut: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" fill="none" />
        <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
};

// --- TYPES & CONSTANTS ---
const spacing = {
  page: {
    header: "px-4 sm:px-6 lg:px-8 py-4",
    sidebar: "px-2 sm:px-3 py-4",
    main: "px-4 sm:px-6 lg:px-8 py-4",
    messages: "px-4 sm:px-6 py-4"
  },
  card: {
    base: "p-4 sm:p-5 lg:p-6",
    compact: "p-3 sm:p-4"
  },
  button: {
    sm: "px-2.5 py-1.5",
    md: "px-3 py-2",
    lg: "px-4 py-2.5"
  },
  gap: {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6"
  }
};

type SortBy = "manual" | "date" | "name" | "progress";
type SortDir = "asc" | "desc";
type ThemeMode = "light" | "dark" | "system";

interface DashboardProps {
  globalLeads: Lead[];
  onUpdateLead: (lead: Lead) => void;
  globalUsers: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onRemoveUser: (userId: string) => void;
}

// Map Lead status to progress percentage
const STATUS_PROGRESS: Record<LeadStatus, number> = {
  'NEW': 10,
  'CONTACTED': 30,
  'IN_PROGRESS': 50,
  'DOCUMENTATION': 75,
  'COMPLETED': 100,
  'CANCELLED': 0
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  'NEW': '#6366f1', // Indigo
  'CONTACTED': '#0ea5e9', // Sky
  'IN_PROGRESS': '#f59e0b', // Amber
  'DOCUMENTATION': '#8b5cf6', // Violet
  'COMPLETED': '#10b981', // Emerald
  'CANCELLED': '#ef4444' // Red
};

// --- UTILS ---
const cx = (...classes: Array<string | false | null | undefined>) => {
  return classes.filter(Boolean).join(" ");
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const readLS = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeLS = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

// --- COMPONENT ---
const Dashboard: React.FC<DashboardProps> = ({ 
  globalLeads, 
  onUpdateLead, 
  globalUsers, 
  onAddUser, 
  onRemoveUser 
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // VIEW STATE
  const [viewMode, setViewMode] = useState<"grid" | "list">(readLS("d_view", "grid"));
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'leads' | 'users'>('leads');
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  
  // ADD USER STATE
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserDraft, setNewUserDraft] = useState<{name: string, email: string, role: UserRole}>({
      name: '',
      email: '',
      role: 'EMPLOYEE'
  });

  // DELETE USER STATE
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  
  // SORT & FILTER
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // EDITING STATE
  const [editingId, setEditingId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<any | null>(null);
  
  // VIRTUALIZATION
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // THEME
  const [theme, setTheme] = useState<ThemeMode>(readLS("d_theme", "light"));

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      navigate('/login');
      return;
    }
    setCurrentUser(JSON.parse(userJson));
  }, [navigate]);

  useEffect(() => {
    writeLS("d_view", viewMode);
  }, [viewMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    writeLS("d_theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- DATA PREPARATION ---
  const preparedData = useMemo(() => {
    let data = activeTab === 'leads' ? [...globalLeads] : [...globalUsers];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.name.toLowerCase().includes(q) || 
        (item as Lead).email?.toLowerCase().includes(q)
      );
    }

    // Filter
    if (activeTab === 'leads' && statusFilter !== 'all') {
      data = (data as Lead[]).filter(l => l.status === statusFilter);
    }

    // Sort
    data.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      if (sortBy === 'date' && 'createdAt' in a) cmp = new Date((a as Lead).createdAt).getTime() - new Date((b as Lead).createdAt).getTime();
      if (sortBy === 'progress' && 'status' in a) {
         cmp = STATUS_PROGRESS[(a as Lead).status] - STATUS_PROGRESS[(b as Lead).status];
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return data;
  }, [globalLeads, globalUsers, activeTab, searchQuery, statusFilter, sortBy, sortDir]);

  // --- STATS ---
  const stats = useMemo(() => {
    if (activeTab === 'users') {
        return [
            { label: 'Total Experts', value: globalUsers.length },
            { label: 'Admins', value: globalUsers.filter(u => u.role !== 'EMPLOYEE').length },
            { label: 'Employees', value: globalUsers.filter(u => u.role === 'EMPLOYEE').length },
        ];
    }
    const total = globalLeads.length;
    const completed = globalLeads.filter(l => l.status === 'COMPLETED').length;
    const active = total - completed;
    return [
      { label: 'Active Cases', value: active },
      { label: 'Completed', value: completed },
      { label: 'Total Inquiries', value: total },
    ];
  }, [globalLeads, globalUsers, activeTab]);

  const isAdmin = currentUser?.role === 'HEAD_ADMIN' || currentUser?.role === 'ADMIN';

  // --- ACTIONS ---
  const handleUpdateStatus = (leadId: string, newStatus: LeadStatus) => {
    const lead = globalLeads.find(l => l.id === leadId);
    if (lead) onUpdateLead({ ...lead, status: newStatus, updatedAt: new Date().toISOString() });
    setDetailItem(null); // Close modal
  };

  const handleAssignUser = (leadId: string, userId: string) => {
    const lead = globalLeads.find(l => l.id === leadId);
    if (lead) onUpdateLead({ ...lead, assignedTo: userId, updatedAt: new Date().toISOString() });
  };

  const confirmDeleteUser = () => {
      if (deleteConfirmationId) {
        onRemoveUser(deleteConfirmationId);
        setDeleteConfirmationId(null);
      }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if(newUserDraft.name && newUserDraft.email) {
        onAddUser(newUserDraft);
        setIsAddUserModalOpen(false);
        setNewUserDraft({ name: '', email: '', role: 'EMPLOYEE' });
    }
  };

  // --- MOCK MESSAGES ---
  const messages = [
    { id: 'm1', name: 'System', text: 'Welcome to LSI Portal 2.0', time: 'Just now', avatar: 'https://ui-avatars.com/api/?name=System&background=000&color=fff' },
    { id: 'm2', name: 'Compliance Team', text: 'New FSSAI guidelines updated.', time: '2h ago', avatar: 'https://ui-avatars.com/api/?name=CT&background=random' },
  ];

  if (!currentUser) return null;

  return (
    <div className={cx("pd-container flex flex-col h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300")}>
      
      {/* --- HEADER --- */}
      <header className={cx(
        "flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 z-20",
        spacing.page.header,
        spacing.gap.sm
      )}>
        <div className={cx("flex items-center min-w-0", spacing.gap.sm)}>
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-black text-white shrink-0">
            <Icons.Logo className="size-5" />
          </span>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate leading-tight">
              LSI COMMAND
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {activeTab === 'leads' ? 'Pipeline View' : 'Team View'}
            </p>
          </div>

          <label className={cx(
            "hidden md:flex items-center rounded-lg bg-slate-50 dark:bg-slate-800",
            "ring-1 ring-slate-200 dark:ring-slate-700 px-3 py-2 ml-8 w-64",
            spacing.gap.xs
          )}>
            <Icons.Search className="size-4 text-slate-500 dark:text-slate-400" />
            <input
              className="bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none text-sm w-full"
              placeholder="Search leads, emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>

        <div className={cx("flex items-center", spacing.gap.xs)}>
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className={cx(
              "rounded-lg ring-1 ring-slate-200 dark:ring-slate-700",
              "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200",
              "hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
              "p-2"
            )}
          >
            <Icons.Theme className="size-5" />
          </button>

          <button
            onClick={() => setIsMessagesOpen(!isMessagesOpen)}
            className={cx(
              "rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 relative",
              "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200",
              "hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",
              "p-2"
            )}
          >
            <Icons.Bell className="size-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

          <button className="flex items-center gap-3 pl-2">
            <img 
              src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=000&color=fff`} 
              alt="" 
              className="size-9 rounded-xl object-cover shadow-sm" 
            />
            <div className="hidden sm:block text-left">
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1">{currentUser.role.replace('_', ' ')}</div>
            </div>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* --- SIDEBAR --- */}
        <aside className={cx(
          "hidden sm:flex flex-col items-center border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 z-10",
          spacing.page.sidebar,
          spacing.gap.sm
        )}>
          {[
            { id: 'leads', icon: <Icons.Chart className="size-5" />, label: 'Pipeline' },
            { id: 'users', icon: <Icons.Users className="size-5" />, label: 'Team' },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveTab(l.id as any)}
              className={cx(
                "size-11 inline-flex items-center justify-center rounded-xl transition-all",
                "ring-1 ring-slate-200 dark:ring-slate-700",
                activeTab === l.id
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-indigo-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
              title={l.label}
            >
              {l.icon}
            </button>
          ))}
          
          <div className="flex-grow"></div>
          
          <button
             onClick={handleLogout}
             className={cx(
                "size-11 inline-flex items-center justify-center rounded-xl transition-all",
                "ring-1 ring-slate-200 dark:ring-slate-700 bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100"
              )}
              title="Logout"
          >
            <Icons.LogOut className="size-5" />
          </button>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className={cx("flex-1 min-w-0 overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-900", spacing.page.main)}>
           
           {/* Controls Bar */}
           <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Stats Row */}
              <div className={cx("flex flex-wrap items-center", spacing.gap.md)}>
                 {stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <span className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{s.value}</span>
                       <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{s.label}</span>
                       {i < stats.length - 1 && <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>}
                    </div>
                 ))}
              </div>

              {/* Filters */}
              <div className={cx("flex items-center", spacing.gap.xs)}>
                 {activeTab === 'leads' && (
                   <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className={cx("rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium", spacing.button.sm)}
                   >
                      <option value="all">All Status</option>
                      {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                   </select>
                 )}

                 {activeTab === 'users' && isAdmin && (
                    <button 
                      onClick={() => setIsAddUserModalOpen(true)}
                      className={cx(
                        "rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-all flex items-center gap-2", 
                        spacing.button.md
                      )}
                    >
                      <Icons.Plus className="size-4" />
                      <span className="hidden sm:inline">Add Expert</span>
                    </button>
                 )}

                 <div className="inline-flex rounded-lg ring-1 ring-slate-200 dark:ring-slate-700 bg-white dark:bg-slate-800 p-1">
                    <button 
                      onClick={() => setViewMode("list")}
                      className={cx(
                        "p-1.5 rounded-md transition-colors", 
                        viewMode === "list" ? "bg-slate-100 dark:bg-slate-700 text-black dark:text-white" : "text-slate-400"
                      )}
                    >
                      <Icons.List className="size-4" />
                    </button>
                    <button 
                      onClick={() => setViewMode("grid")}
                      className={cx(
                        "p-1.5 rounded-md transition-colors", 
                        viewMode === "grid" ? "bg-slate-100 dark:bg-slate-700 text-black dark:text-white" : "text-slate-400"
                      )}
                    >
                      <Icons.Grid className="size-4" />
                    </button>
                 </div>
              </div>
           </div>

           {/* Content Area */}
           <div className={cx(
              "flex-1 overflow-y-auto pr-2",
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"
           )}>
              {preparedData.length === 0 && (
                 <div className="col-span-full h-64 flex flex-col items-center justify-center text-slate-400">
                    <Icons.Search className="size-12 mb-4 opacity-20" />
                    <p>No records found matching your criteria.</p>
                 </div>
              )}

              {activeTab === 'leads' ? (
                 (preparedData as Lead[]).map((lead) => (
                    <div 
                      key={lead.id}
                      onClick={() => setDetailItem(lead)}
                      className={cx(
                         "group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer hover:shadow-xl",
                         viewMode === "list" ? "p-4 flex items-center gap-6" : "p-6 flex flex-col"
                      )}
                    >
                       {/* Card Header */}
                       <div className={cx("flex justify-between items-start", viewMode === "list" ? "w-1/3" : "w-full mb-4")}>
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                                {lead.name.charAt(0)}
                             </div>
                             <div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate">{lead.name}</h3>
                                <p className="text-xs text-slate-500 truncate max-w-[120px]">{lead.service}</p>
                             </div>
                          </div>
                       </div>

                       {/* Progress / Status */}
                       <div className={cx(viewMode === "list" ? "flex-1 px-4" : "w-full mb-6")}>
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                             <span>Progress</span>
                             <span>{STATUS_PROGRESS[lead.status]}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                             <div 
                               className="h-full transition-all duration-500 rounded-full"
                               style={{ width: `${STATUS_PROGRESS[lead.status]}%`, backgroundColor: STATUS_COLORS[lead.status] }}
                             ></div>
                          </div>
                       </div>

                       {/* Footer / Meta */}
                       <div className={cx("flex items-center justify-between", viewMode === "list" ? "w-1/4 justify-end gap-4" : "w-full")}>
                          <span className={cx(
                             "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border",
                             "border-slate-100 dark:border-slate-700 text-slate-500"
                          )}>
                             {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                          
                          {/* Assigned Avatar */}
                          <div className="flex -space-x-2">
                             {lead.assignedTo ? (
                                <img 
                                  src={`https://ui-avatars.com/api/?name=${globalUsers.find(u=>u.id===lead.assignedTo)?.name || '?'}&background=random`} 
                                  className="size-6 rounded-full border-2 border-white dark:border-slate-800" 
                                  title="Assigned Expert"
                                />
                             ) : (
                                <div className="size-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 flex items-center justify-center text-[8px] text-slate-500">?</div>
                             )}
                          </div>
                       </div>
                    </div>
                 ))
              ) : (
                 (preparedData as User[]).map((user) => (
                    <div 
                       key={user.id}
                       className={cx(
                          "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex items-center justify-between group",
                          viewMode === "list" ? "p-4" : "flex-col text-center p-8"
                       )}
                    >
                       <div className={cx("flex items-center gap-4", viewMode === "grid" && "flex-col mb-4")}>
                          <img 
                             src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                             className="size-16 rounded-2xl shadow-md"
                          />
                          <div className={cx(viewMode === "grid" && "text-center")}>
                             <h3 className="font-bold text-slate-900 dark:text-slate-100">{user.name}</h3>
                             <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mt-1">{user.role}</p>
                             <p className="text-xs text-slate-400 mt-1">{user.email}</p>
                          </div>
                       </div>
                       
                       {isAdmin && user.role !== 'HEAD_ADMIN' && (
                          <button 
                             onClick={(e) => {
                                 e.stopPropagation();
                                 setDeleteConfirmationId(user.id);
                             }}
                             className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                             title="Delete User"
                          >
                             <Icons.Trash className="size-4" />
                          </button>
                       )}
                    </div>
                 ))
              )}
           </div>
        </main>

        {/* --- MESSAGES PANEL --- */}
        <aside className={cx(
           "w-80 border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 absolute right-0 h-full z-30 shadow-2xl md:relative md:shadow-none",
           isMessagesOpen ? "translate-x-0" : "translate-x-full md:translate-x-0 md:w-80 hidden md:block"
        )}>
           <div className="h-full flex flex-col">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                 <h3 className="font-bold text-slate-900 dark:text-slate-100">Activity & Notices</h3>
                 <button onClick={() => setIsMessagesOpen(false)} className="md:hidden p-2"><Icons.Close className="size-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                 {messages.map(msg => (
                    <div key={msg.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                       <div className="flex items-center gap-3 mb-2">
                          <img src={msg.avatar} className="size-6 rounded-full" />
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{msg.name}</span>
                          <span className="text-[10px] text-slate-400 ml-auto">{msg.time}</span>
                       </div>
                       <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{msg.text}</p>
                    </div>
                 ))}
                 <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 text-center">
                    <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium">All systems operational.</p>
                 </div>
              </div>
           </div>
        </aside>
      </div>

      {/* --- ADD USER MODAL --- */}
      {isAddUserModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700 animate-in fade-in zoom-in duration-300">
               <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Add Team Member</h2>
                  <button onClick={() => setIsAddUserModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                     <Icons.Close className="size-5 text-slate-500" />
                  </button>
               </div>
               
               <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Full Name</label>
                     <input
                        type="text"
                        value={newUserDraft.name}
                        onChange={(e) => setNewUserDraft({...newUserDraft, name: e.target.value})}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        placeholder="John Doe"
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Email Address</label>
                     <input
                        type="email"
                        value={newUserDraft.email}
                        onChange={(e) => setNewUserDraft({...newUserDraft, email: e.target.value})}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        placeholder="john@legalsuccess.in"
                        required
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Role</label>
                     <select
                        value={newUserDraft.role}
                        onChange={(e) => setNewUserDraft({...newUserDraft, role: e.target.value as UserRole})}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-black dark:focus:ring-white appearance-none"
                     >
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ADMIN">Admin</option>
                     </select>
                  </div>

                  <button 
                     type="submit"
                     className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg active:scale-[0.98] mt-4"
                  >
                     Create Account
                  </button>
               </form>
            </div>
         </div>
      )}
      
      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl p-6 ring-1 ring-slate-200 dark:ring-slate-700 animate-in fade-in zoom-in duration-200">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Confirm Deletion</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Are you sure you want to remove this expert? They will be unassigned from any active leads.
                </p>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setDeleteConfirmationId(null)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmDeleteUser}
                        className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- LEAD DETAIL MODAL --- */}
      {detailItem && (activeTab === 'leads') && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700 animate-in fade-in zoom-in duration-300">
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex gap-6">
                     <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-3xl shadow-lg">
                        {(detailItem as Lead).name.charAt(0)}
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{(detailItem as Lead).name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{(detailItem as Lead).service}</span>
                           <span className="text-slate-300">•</span>
                           <span className="text-xs text-slate-500">{(detailItem as Lead).phone}</span>
                        </div>
                     </div>
                  </div>
                  <button onClick={() => setDetailItem(null)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors"><Icons.Close className="size-5" /></button>
               </div>
               
               <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Status Control */}
                  <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Case Status</label>
                     <div className="grid grid-cols-2 gap-2">
                        {Object.keys(STATUS_COLORS).map(status => (
                           <button
                              key={status}
                              onClick={() => handleUpdateStatus(detailItem.id, status as LeadStatus)}
                              className={cx(
                                 "px-3 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border",
                                 (detailItem as Lead).status === status 
                                    ? "bg-black text-white border-black shadow-lg" 
                                    : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                              )}
                           >
                              {status.replace('_', ' ')}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Assignment Control */}
                  {isAdmin && (
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Assigned Expert</label>
                        <select
                           value={(detailItem as Lead).assignedTo || ''}
                           onChange={(e) => handleAssignUser(detailItem.id, e.target.value)}
                           className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                           <option value="">-- Unassigned --</option>
                           {globalUsers.map(u => (
                              <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                           ))}
                        </select>
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                           <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                              Assigning an expert grants them full access to view and update this lead.
                           </p>
                        </div>
                     </div>
                  )}
               </div>

               <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                     Lead ID: {detailItem.id} • Created: {new Date(detailItem.createdAt).toLocaleDateString()}
                  </p>
               </div>
            </div>
         </div>
      )}

      <style>{`
        .pd-container { font-family: 'Inter', system-ui, sans-serif; }
        .pd-container ::-webkit-scrollbar { width: 6px; }
        .pd-container ::-webkit-scrollbar-track { background: transparent; }
        .pd-container ::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
        .dark .pd-container ::-webkit-scrollbar-thumb { background-color: #475569; }
      `}</style>
    </div>
  );
}

export default Dashboard;
