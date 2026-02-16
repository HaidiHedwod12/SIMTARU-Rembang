import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import {
    Users,
    UserPlus,
    Shield,
    Key,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

const UserManagement = () => {
    const { allUsers, createUser } = useAuth();
    const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Form state
    const [newUsername, setNewUsername] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRole, setNewRole] = useState<'admin' | 'staff'>('staff');

    const togglePassword = (username: string) => {
        setShowPasswords(prev => ({
            ...prev,
            [username]: !prev[username]
        }));
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newUsername || !newName || !newPassword) {
            toast.error('Harap isi semua kolom');
            return;
        }

        if (allUsers.find(u => u.username === newUsername)) {
            toast.error('Username sudah digunakan');
            return;
        }

        createUser({
            username: newUsername,
            name: newName,
            password: newPassword,
            role: newRole
        });

        toast.success(`User ${newName} berhasil dibuat`);
        setIsAddDialogOpen(false);
        // Reset form
        setNewUsername('');
        setNewName('');
        setNewPassword('');
        setNewRole('staff');
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manajemen Akun</h1>
                        <p className="text-slate-500 font-medium">Kelola akses sistem, buat akun baru, dan pantau kredensial.</p>
                    </div>

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-2xl h-14 px-8 bg-[#1F5E3B] hover:bg-[#1a5032] font-black gap-3 shadow-xl transition-all hover:scale-105">
                                <UserPlus className="h-5 w-5" />
                                BUAT AKUN BARU
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black text-slate-900">Tambah Operator Baru</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddUser} className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                                    <Input
                                        placeholder="Contoh: Ahmad Subagjo"
                                        className="rounded-xl h-12 border-slate-200"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Username</label>
                                    <Input
                                        placeholder="ahmad_dpu"
                                        className="rounded-xl h-12 border-slate-200"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                                    <Input
                                        type="text"
                                        placeholder="Min. 8 Karakter"
                                        className="rounded-xl h-12 border-slate-200"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Role / Jabatan</label>
                                    <Select value={newRole} onValueChange={(v: any) => setNewRole(v)}>
                                        <SelectTrigger className="rounded-xl h-12 border-slate-200">
                                            <SelectValue placeholder="Pilih Role" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-200">
                                            <SelectItem value="admin">Admin Bidang (Tanpa Approval)</SelectItem>
                                            <SelectItem value="staff">Staff Operator (Butuh Approval)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full h-14 rounded-2xl bg-[#1F5E3B] font-black mt-4">
                                    SIMPAN AKUN
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6">
                    {allUsers.map((u, i) => (
                        <Card key={i} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex items-center gap-6">
                                        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 ${u.role === 'superadmin' ? 'bg-amber-100 text-amber-600' :
                                                u.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            <Shield className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-black text-slate-800">{u.name}</h3>
                                                {u.role === 'superadmin' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase">Main Admin</span>
                                                )}
                                            </div>
                                            <p className="text-sm font-bold text-slate-400 mt-0.5">@{u.username} • <span className="uppercase">{u.role === 'admin' ? 'Admin Bidang' : u.role}</span></p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                                        <div className="bg-slate-50 flex items-center gap-4 px-6 py-3 rounded-2xl border border-slate-100">
                                            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center border border-slate-200">
                                                <Key className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Akses Password</span>
                                                <div className="flex items-center gap-2 min-w-[120px]">
                                                    <span className="font-mono font-bold text-slate-700">
                                                        {showPasswords[u.username] ? u.password : '••••••••'}
                                                    </span>
                                                    <button
                                                        onClick={() => togglePassword(u.username)}
                                                        className="text-slate-300 hover:text-primary transition-colors"
                                                    >
                                                        {showPasswords[u.username] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                            <span className="text-sm font-black text-emerald-700">AKUN AKTIF</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="rounded-[2rem] bg-amber-50 p-8 border border-amber-100 flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-black text-amber-900">Informasi Keamanan</h4>
                        <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                            Sebagai Superadmin, Anda memiliki akses penuh untuk melihat kredensial seluruh operator. Pastikan kerahasiaan password tetap terjaga.
                            Setiap penambahan user baru akan langsung memiliki akses ke Dashboard CMS sesuai dengan perannya masing-masing.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserManagement;
