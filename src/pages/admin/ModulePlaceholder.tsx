import AdminLayout from '@/components/admin/AdminLayout';
import { Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminModuleProps {
    title: string;
    description: string;
}

const AdminModulePlaceholder: React.FC<AdminModuleProps> = ({ title, description }) => {
    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
                        <p className="text-slate-500 font-medium mt-1">{description}</p>
                    </div>
                    <Button className="rounded-xl h-12 px-6 bg-primary hover:bg-[#1a5032] font-black gap-3 shadow-lg shadow-primary/20">
                        <Plus className="h-5 w-5" />
                        TAMBAH DATA BARU
                    </Button>
                </div>

                <div className="rounded-[2.5rem] bg-white p-12 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                        <Settings className="h-10 w-10 animate-spin-slow" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800">Modul Sedang Dikembangkan</h2>
                    <p className="text-slate-400 font-medium mt-2 max-w-sm">
                        Fitur manajemen untuk {title.toLowerCase()} akan segera hadir. Anda dapat mengatur data melalui database untuk sementara.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminModulePlaceholder;
