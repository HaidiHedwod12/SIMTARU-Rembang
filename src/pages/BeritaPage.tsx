import Layout from "@/components/Layout";
import { User, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
    {
        id: 1,
        title: "Pemerintah Kabupaten Rembang Verifikasi Lapangan Perbaikan Jalan",
        excerpt: "Tim teknis DPUPR melakukan peninjauan langsung di beberapa titik strategis jalur Pantura untuk memastikan kualitas infrastruktur.",
        image: "https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=800&q=80",
        author: "Admin DPUPR",
        date: "14 Feb 2026"
    },
    {
        id: 2,
        title: "Workshop Penataan Ruang Berbasis Mitigasi Bencana",
        excerpt: "Meningkatkan pemahaman aparatur dalam menyusun rencana tata ruang yang tangguh terhadap potensi bencana di pesisir.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
        author: "Sekretariat FPR",
        date: "12 Feb 2026"
    },
    {
        id: 3,
        title: "Update Rencana Detail Tata Ruang (RDTR) Kawasan Industri",
        excerpt: "Proses penyusunan RDTR kini memasuki tahap sinkronisasi dengan kementerian terkait untuk percepatan investasi.",
        image: "https://images.unsplash.com/photo-1541888941255-20218177543f?auto=format&fit=crop&w=800&q=80",
        author: "Bidang Tata Ruang",
        date: "10 Feb 2026"
    },
    {
        id: 4,
        title: "Pemanfaatan Teknologi GIS dalam Monitoring Pemanfaatan Ruang",
        excerpt: "Pengembangan sistem informasi geografis untuk memudahkan pengawasan pelanggaran tata ruang secara real-time.",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536ad39?auto=format&fit=crop&w=800&q=80",
        author: "IT Support",
        date: "08 Feb 2026"
    }
];

const BeritaPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-50/50">
                <div className="mx-auto max-w-7xl px-4 py-20">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-16">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-black text-slate-900 md:text-6xl">Warta & Berita</h1>
                            <p className="mt-4 text-lg font-medium text-slate-500">Informasi terbaru seputar tata ruang dan infrastruktur di Rembang.</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <div className="h-2 w-8 rounded-full bg-primary/20" />
                        </div>
                    </div>

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
                        {newsItems.map((item) => (
                            <div key={item.id} className="group flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 transition-all hover:-translate-y-2 lg:flex-row">
                                <div className="relative h-64 overflow-hidden lg:h-auto lg:w-2/5">
                                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:hidden" />
                                </div>
                                <div className="flex flex-1 flex-col p-8 lg:p-10">
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full">
                                            <User className="h-3.5 w-3.5 text-primary" />
                                            {item.author}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full">
                                            <Calendar className="h-3.5 w-3.5 text-primary" />
                                            {item.date}
                                        </div>
                                    </div>
                                    <h3 className="mt-6 text-2xl font-black leading-tight text-slate-800 transition-colors group-hover:text-primary">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-slate-500 leading-relaxed font-medium">
                                        {item.excerpt}
                                    </p>
                                    <div className="mt-auto pt-10">
                                        <Button variant="ghost" className="flex items-center gap-2 rounded-2xl bg-primary/5 p-0 px-6 h-12 font-black text-primary hover:bg-primary hover:text-white transition-all">
                                            Selengkapnya <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center">
                        <Button variant="outline" className="rounded-2xl border-2 border-primary/20 px-10 h-14 font-black text-primary hover:bg-primary/5">
                            Lihat Semua Berita
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BeritaPage;
