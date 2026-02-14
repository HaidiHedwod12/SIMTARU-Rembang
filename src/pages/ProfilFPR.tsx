import Layout from "@/components/Layout";
import { ClipboardCheck, Users, MessageSquare, Landmark } from "lucide-react";

const ProfilFPR = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="relative bg-[#1F5E3B] py-24 text-white">
                    <div className="absolute inset-0 bg-white/5 opacity-10 blur-3xl animate-pulse" />
                    <div className="mx-auto max-w-7xl px-4 text-center relative z-10">
                        <h1 className="text-4xl font-black tracking-tight md:text-7xl">Profil Forum Penataan Ruang</h1>
                        <p className="mx-auto mt-6 max-w-3xl text-xl font-medium text-white/70">Wadah koordinasi dan kolaborasi strategis untuk penataan ruang yang berkualitas di Kabupaten Rembang.</p>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-24">
                    <div className="grid gap-16 md:grid-cols-2 lg:items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-slate-800">Apa itu FPR?</h2>
                            <div className="prose prose-slate max-w-none text-lg text-slate-600">
                                <p>
                                    Forum Penataan Ruang (FPR) adalah wadah di tingkat pusat dan daerah yang bertugas memberikan pertimbangan dalam penyelenggaraan penataan ruang.
                                </p>
                                <p>
                                    Di Kabupaten Rembang, FPR berperan penting dalam memastikan setiap pembangunan dan pemanfaatan ruang selaras dengan Rencana Tata Ruang Wilayah (RTRW) serta menjaga keseimbangan antara pembangunan ekonomi dan kelestarian lingkungan.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
                                    <Landmark className="h-8 w-8 text-primary mb-4" />
                                    <h4 className="font-bold text-slate-800">Dasar Hukum</h4>
                                    <p className="text-sm text-slate-500 mt-1">PP No. 21 Tahun 2021 tentang Penyelenggaraan PR.</p>
                                </div>
                                <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
                                    <ShieldCheck className="h-8 w-8 text-primary mb-4" />
                                    <h4 className="font-bold text-slate-800">Transparansi</h4>
                                    <p className="text-sm text-slate-500 mt-1">Proses evaluasi yang terbuka dan akuntabel.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            {[
                                { icon: ClipboardCheck, title: "Evaluasi Rencana", desc: "Memberikan masukan teknis terhadap rencana tata ruang daerah." },
                                { icon: Users, title: "Koordinasi Stakeholder", desc: "Menghubungkan pemerintah, akademisi, dan praktisi." },
                                { icon: MessageSquare, title: "Penanganan Masalah", desc: "Memberikan rekomendasi atas konflik pemanfaatan ruang." }
                            ].map((item, idx) => (
                                <div key={idx} className="group relative flex gap-6 rounded-3xl bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/5 lg:translate-x-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg text-primary transition-transform group-hover:scale-110">
                                        <item.icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800">{item.title}</h3>
                                        <p className="mt-2 text-slate-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilFPR;
const ShieldCheck = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>;
