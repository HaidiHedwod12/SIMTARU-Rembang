import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import {
    BarChart3,
    Users,
    FileText,
    Eye,
    MousePointer2,
    Newspaper,
    Calendar,
    AlertCircle,
    Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
    { label: 'Total Pengunjung', value: '1,284', icon: Eye, change: '+12%', trend: 'up' },
    { label: 'Dokumen Produk', value: '42', icon: FileText, change: '+2', trend: 'up' },
    { label: 'Berita Aktif', value: '156', icon: Newspaper, change: '0', trend: 'neutral' },
    { label: 'Agenda Datang', value: '8', icon: Calendar, change: '+1', trend: 'up' },
];

const Dashboard = () => {
    const { user } = useAuth();

    const activityLogs = [
        { user: 'Budi (Bidang Tata Ruang)', action: 'Menambahkan berita baru', time: '2 Jam yang lalu' },
        { user: 'Siti (Sekretariat)', action: 'Mengubah dokumen pelayanan', time: '5 Jam yang lalu' },
        { user: 'Superadmin', action: 'Memperbarui peta interaktif', time: 'Kemarin' },
    ];

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ringkasan Statistik</h1>
                        <p className="text-slate-500 font-medium">Selamat datang kembali, <span className="text-primary font-black uppercase">{user?.name}</span>! Berikut adalah ringkasan performa portal hari ini.</p>
                    </div>
                    {user?.role === 'superadmin' && (
                        <div className="flex items-center gap-3 px-6 py-3 bg-amber-50 rounded-2xl border border-amber-100">
                            <Shield className="h-5 w-5 text-amber-500" />
                            <span className="text-xs font-black text-amber-900 uppercase tracking-widest leading-none">Akses Penuh Superadmin</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <Card key={i} className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className={`p-3 rounded-2xl ${i % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-[#1F5E3B]/10 text-[#1F5E3B]'} group-hover:scale-110 transition-transform`}>
                                        <s.icon className="h-6 w-6" />
                                    </div>
                                    <span className={`text-xs font-black ${s.trend === 'up' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                        {s.change}
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                    <h3 className="text-3xl font-black text-slate-800 mt-1">{s.value}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 rounded-[2.5rem] bg-white p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                <BarChart3 className="h-5 w-5 text-primary" />
                                Aktivitas Portal Terakhir
                            </h2>
                            <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-500 focus:ring-0">
                                <option>7 Hari Terakhir</option>
                                <option>30 Hari Terakhir</option>
                            </select>
                        </div>
                        <div className="aspect-video md:aspect-[21/9] bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 font-bold italic text-center p-6">
                            Grafik Aktivitas Pengunjung (Visual Placeholder)
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] bg-white p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <h2 className="text-xl font-black text-slate-800 mb-8">Log Aktivitas {user?.role === 'superadmin' ? 'Semua' : 'Internal'}</h2>
                        <div className="space-y-6">
                            {activityLogs.map((log, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                        <Users className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-700">{log.user}</p>
                                        <p className="text-xs font-medium text-slate-500 mt-0.5">{log.action}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-4 text-xs font-black text-primary hover:bg-primary/5 rounded-2xl transition-all uppercase tracking-widest mt-4">
                                Lihat Semua Aktivitas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

const User = ({ className }: { className?: string }) => <Users className={className} />;

export default Dashboard;
