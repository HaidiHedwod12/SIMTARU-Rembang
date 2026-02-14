import Layout from "@/components/Layout";
import { Target, Users, Landmark, Phone, Mail, User, HardHat, Building2, Droplets, PenTool, LayoutDashboard } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const bidangData = [
    {
        name: "Bina Marga",
        icon: HardHat,
        kabid: "Sunarto, ST., MT.",
        desc: "Bertanggung jawab atas pembangunan, pemeliharaan, dan peningkatan kualitas jalan serta jembatan di seluruh wilayah kabupaten.",
        members: ["Seksi Pembangunan Jalan", "Seksi Pemeliharaan Jalan & Jembatan", "Seksi Teknis Bina Marga"]
    },
    {
        name: "Penataan Bangunan & Bina Konstruksi",
        icon: Building2,
        kabid: "Ir. H. Bambang S., MT.",
        desc: "Menangani regulasi bangunan gedung, penataan lingkungan pemukiman, serta pembinaan jasa konstruksi lokal.",
        members: ["Seksi Penataan Bangunan", "Seksi Penyehatan Lingkungan", "Seksi Pembinaan Konstruksi"]
    },
    {
        name: "Tata Ruang",
        icon: PenTool,
        kabid: "Endro Wahyudi, ST.",
        desc: "Mengelola perencanaan tata ruang wilayah, pemanfaatan ruang, serta pengendalian dan pengawasan tata ruang kabupaten.",
        members: ["Seksi Perencanaan Tata Ruang", "Seksi Pemanfaatan Ruang", "Seksi Pengendalian Ruang"]
    },
    {
        name: "Sanitasi & Air Minum",
        icon: Droplets,
        kabid: "Siti Aminah, ST., M.Eng.",
        desc: "Fokus pada penyediaan sarana air bersih layak minum serta pengelolaan sistem sanitasi dan drainase pemukiman.",
        members: ["Seksi Air Minum", "Seksi Air Limbah & Persampahan", "Seksi Teknis Sanitasi"]
    },
    {
        name: "Sekretariat",
        icon: LayoutDashboard,
        kabid: "Puji Haryono, SH.",
        desc: "Mendukung operasional kedinasan melalui manajemen kepegawaian, keuangan, aset, serta koordinasi umum.",
        members: ["Sub Bagian Umum & Kepegawaian", "Sub Bagian Keuangan", "Sub Bagian Perencanaan & Evaluasi"]
    }
];

const ProfilDPUPR = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-white">
                <div className="bg-slate-50 py-20 px-4">
                    <div className="mx-auto max-w-7xl text-center">
                        <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">Kabupaten Rembang</span>
                        <h1 className="mt-4 text-4xl font-black text-slate-900 md:text-6xl uppercase tracking-tight">Dinas Pekerjaan Umum<br className="hidden md:block" /> dan Penataan Ruang</h1>
                        <div className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                    </div>
                </div>

                {/* Kepala Dinas Section */}
                <div className="mx-auto max-w-7xl px-4 py-20">
                    <div className="group relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] bg-[#1F5E3B] p-10 text-white shadow-2xl transition-all hover:shadow-primary/20">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                        <div className="relative flex flex-col items-center gap-8 md:flex-row">
                            <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-[2.5rem] bg-white/20 backdrop-blur-md border border-white/30 text-white">
                                <User className="h-20 w-20" />
                            </div>
                            <div className="text-center md:text-left">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Kepala Dinas DPUTARU Rembang</span>
                                <h2 className="mt-2 text-3xl font-black md:text-5xl">Maryosa, A.TD., M.T.</h2>
                                <p className="mt-4 text-lg font-medium text-white/80 leading-relaxed">
                                    "Berkomitmen untuk mewujudkan infrastruktur yang inklusif dan berkelanjutan demi kesejahteraan masyarakat Kabupaten Rembang."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 pb-20">
                    <div className="grid gap-12 md:grid-cols-2">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-primary">
                                <Target className="h-8 w-8" />
                                <h2 className="text-3xl font-bold text-slate-800">Visi & Misi</h2>
                            </div>
                            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 transition-all hover:shadow-2xl">
                                <h3 className="text-xl font-bold text-primary">Visi</h3>
                                <p className="mt-4 text-lg italic text-slate-600">"Terwujudnya Infrastruktur Kabupaten Rembang yang Andal dan Berkelanjutan."</p>

                                <h3 className="mt-10 text-xl font-bold text-primary">Misi</h3>
                                <ul className="mt-4 space-y-4 text-slate-600 font-medium">
                                    <li className="flex gap-4">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">1</span>
                                        <span>Meningkatkan kualitas jaringan jalan dan jembatan yang terintegrasi.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">2</span>
                                        <span>Mewujudkan pengelolaan tata ruang yang tertib dan berkelanjutan.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">3</span>
                                        <span>Meningkatkan penyediaan infrastruktur pemukiman dan sanitasi.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-primary">
                                <Users className="h-8 w-8" />
                                <h2 className="text-3xl font-bold text-slate-800">Struktur Organisasi</h2>
                            </div>
                            <div className="group relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-xl transition-all hover:shadow-2xl cursor-pointer">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold italic">
                                    Bagan Struktur Organisasi
                                </div>
                                <div className="absolute inset-0 bg-primary/0 transition-all group-hover:bg-primary/5" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-32">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="text-3xl font-black text-slate-800">Bidang Utama DPUTARU</h2>
                            <div className="mt-1 h-1 w-12 rounded-full bg-primary" />
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            {bidangData.map((bidang, idx) => (
                                <Dialog key={idx}>
                                    <DialogTrigger asChild>
                                        <button className="group flex flex-col items-center rounded-[2rem] border border-slate-50 bg-slate-50/50 p-8 text-center transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/5 active:scale-95">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg text-primary transition-transform group-hover:scale-110">
                                                <bidang.icon className="h-8 w-8" />
                                            </div>
                                            <h4 className="mt-8 text-sm font-black leading-tight text-slate-800">{bidang.name}</h4>
                                            <span className="mt-4 text-[10px] font-black uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">Klik Detail</span>
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none p-10 shadow-2xl">
                                        <DialogHeader>
                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <bidang.icon className="h-7 w-7" />
                                            </div>
                                            <DialogTitle className="text-2xl font-black text-slate-800">{bidang.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-6 space-y-8">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Kepala Bidang</p>
                                                <p className="mt-1 text-lg font-black text-slate-700">{bidang.kabid}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tugas Pokok</p>
                                                <p className="mt-2 text-sm leading-relaxed text-slate-500 font-medium">{bidang.desc}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Struktur Seksi</p>
                                                <ul className="mt-4 grid gap-3">
                                                    {bidang.members.map((m, i) => (
                                                        <li key={i} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-600 border border-slate-100">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            {m}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 py-20 text-white">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="grid gap-12 md:grid-cols-2 lg:items-center">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <Landmark className="h-8 w-8 text-primary" />
                                    <h3 className="text-3xl font-black">Kontak Resmi</h3>
                                </div>
                                <p className="text-lg text-white/60 mb-10 max-w-md">Kami siap melayani Anda dalam kebutuhan penataan ruang dan infrastruktur di Rembang.</p>
                                <div className="space-y-6">
                                    <a href="tel:0295691033" className="flex items-center gap-6 group w-fit">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all group-hover:bg-primary/20 group-hover:border-primary/50 text-primary">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Telepon</p>
                                            <p className="text-xl font-black">(0295) 691033</p>
                                        </div>
                                    </a>
                                    <a href="mailto:dputaru@rembangkab.go.id" className="flex items-center gap-6 group w-fit">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all group-hover:bg-primary/20 group-hover:border-primary/50 text-primary">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Email</p>
                                            <p className="text-xl font-black">dputaru@rembangkab.go.id</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="rounded-[3rem] bg-white p-10 text-slate-900 shadow-2xl">
                                <h4 className="text-xl font-black mb-6">Jam Pelayanan</h4>
                                <div className="space-y-4 font-bold text-slate-500">
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span>Senin - Kamis</span>
                                        <span className="text-slate-900">07:30 - 16:00</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span>Jumat</span>
                                        <span className="text-slate-900">07:30 - 11:30</span>
                                    </div>
                                    <div className="flex justify-between text-rose-500">
                                        <span>Sabtu - Minggu</span>
                                        <span>Tutup</span>
                                    </div>
                                </div>
                                <Button className="mt-10 w-full h-14 rounded-2xl bg-primary hover:bg-[#1a5032] font-black text-white transition-all shadow-xl shadow-primary/20">
                                    Hubungi Sekretariat
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilDPUPR;
