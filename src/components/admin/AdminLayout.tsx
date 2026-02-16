import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Globe,
    FileText,
    Map,
    Users,
    Newspaper,
    Calendar,
    Settings,
    LogOut,
    ChevronRight,
    User,
    Menu,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const sidebarLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/profil', label: 'Kelola Profil', icon: User },
    { path: '/admin/peta', label: 'Kelola Peta', icon: Map },
    { path: '/admin/dokumen', label: 'Kelola Dokumen', icon: FileText },
    { path: '/admin/zonasi', label: 'Kelola Zonasi', icon: Globe },
    { path: '/admin/fpr', label: 'Kelola FPR', icon: Users },
    { path: '/admin/berita', label: 'Kelola Berita', icon: Newspaper },
    { path: '/admin/agenda', label: 'Kelola Agenda', icon: Calendar },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Filter sidebar links based on role
    const filteredSidebarLinks = sidebarLinks.filter(link => {
        if (link.path === '/admin/users' && user?.role !== 'superadmin') return false;
        return true;
    });

    // Add User Management link only for superadmin
    if (user?.role === 'superadmin' && !filteredSidebarLinks.find(l => l.path === '/admin/users')) {
        filteredSidebarLinks.push({ path: '/admin/users', label: 'Kelola User', icon: Users });
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1F5E3B] text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-20 px-8 border-b border-white/10">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center font-black">S</div>
                            <span className="text-xl font-black tracking-tighter">SIMTARU <span className="text-white/60">CMS</span></span>
                        </Link>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        {filteredSidebarLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${isActive
                                        ? 'bg-white text-[#1F5E3B] shadow-lg'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <link.icon className="h-5 w-5" />
                                        {link.label}
                                    </div>
                                    {isActive && <ChevronRight className="h-4 w-4" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-white/10 mt-auto">
                        <div className="rounded-2xl bg-white/5 p-4 mb-4">
                            <p className="text-[10px] font-black uppercase text-white/40 mb-1">Signed in as</p>
                            <p className="text-sm font-black truncate">{user?.name || 'Admin User'}</p>
                            <p className="text-[10px] font-bold text-white/60 uppercase">{user?.role === 'admin' ? 'ADMIN BIDANG' : user?.role}</p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start gap-4 rounded-xl text-white/60 hover:bg-rose-500 hover:text-white transition-all font-bold"
                        >
                            <LogOut className="h-5 w-5" />
                            Keluar Data
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 lg:hidden">
                        <Button size="icon" variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            {isSidebarOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Kabupaten Rembang</p>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1">Sistem Informasi Penataan Ruang</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size="sm" variant="outline" className="rounded-xl border-slate-200 font-bold" onClick={() => navigate('/')}>
                            Lihat Situs Luar
                        </Button>
                    </div>
                </header>

                <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
