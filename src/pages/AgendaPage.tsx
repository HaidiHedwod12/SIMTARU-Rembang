import Layout from "@/components/Layout";
import { CalendarDays, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const agendas = [
    {
        id: 1,
        title: "Festival Tata Ruang dan Arsitektur Rembang",
        date: "24-26 Mei 2026",
        location: "Alun-alun Rembang",
        image: "https://images.unsplash.com/photo-1540575861501-7ad058bc321e?auto=format&fit=crop&w=800&q=80",
        category: "Event Utama"
    },
    {
        id: 2,
        title: "Rapat Koordinasi Lintas Sektoral RDTR Lasem",
        date: "05 Juni 2026",
        location: "Hotel Fave Rembang",
        image: "https://images.unsplash.com/photo-1505373633560-eb1096057a7d?auto=format&fit=crop&w=800&q=80",
        category: "Rapat"
    },
    {
        id: 3,
        title: "Workshop Pemanfaatan Peta Digital untuk Desa",
        date: "10 Juni 2026",
        location: "Aula Kantor DPUPR",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        category: "Pelatihan"
    },
    {
        id: 4,
        title: "Kunjungan Kerja Komisi Teknis Tata Ruang Nasional",
        date: "14 Juli 2026",
        location: "Kawasan Industri Rembang",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        category: "Kunjungan"
    }
];

const AgendaPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-20">
                    <div className="grid gap-12 lg:grid-cols-4">
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Agenda <span className="text-primary">Strategeis</span></h1>
                                <p className="mt-4 font-medium text-slate-500">Pantau jadwal kegiatan penting DPUPR dan Forum Penataan Ruang.</p>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <Input className="h-14 rounded-2xl border-none bg-white shadow-xl shadow-slate-100 pl-12 focus-visible:ring-primary/20" placeholder="Cari agenda..." />
                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-100">
                                <h4 className="font-bold text-slate-800 mb-4">Kategori</h4>
                                <div className="space-y-2">
                                    {["Semua Agenda", "Event Utama", "Rapat", "Pelatihan", "Kunjungan"].map(cat => (
                                        <button key={cat} className="w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-primary transition-all">
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {agendas.map((item) => (
                                    <div key={item.id} className="group relative h-96 overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl transition-all hover:shadow-primary/20 cursor-pointer">
                                        <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40" />
                                        <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
                                            <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary backdrop-blur-md border border-primary/30">
                                                {item.category}
                                            </span>
                                            <h3 className="mt-4 text-2xl font-black text-white leading-tight">
                                                {item.title}
                                            </h3>
                                            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
                                                <div className="flex items-center gap-2">
                                                    <CalendarDays className="h-4 w-4 text-primary" />
                                                    {item.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                    {item.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AgendaPage;
