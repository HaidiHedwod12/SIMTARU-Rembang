import Layout from "@/components/Layout";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { KECAMATAN_DATA } from "@/data/kecamatan";

const ProfilDaerah = () => {
    const [search, setSearch] = useState("");

    const filtered = KECAMATAN_DATA.filter(k =>
        k.name.toLowerCase().includes(search.toLowerCase()) ||
        k.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50/50 pb-20">
                <div className="relative h-[40vh] overflow-hidden bg-[#1F5E3B]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay opacity-40 transition-transform duration-[10s] hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F5E3B] via-transparent to-transparent" />
                    <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12">
                        <span className="mb-2 text-sm font-black uppercase tracking-[0.3em] text-white/60">Wilayah Administratif</span>
                        <h1 className="text-4xl font-black text-white md:text-7xl">Profil Daerah</h1>
                        <p className="mt-4 max-w-2xl text-lg font-medium text-white/80">Jelajahi potensi dan karakteristik unik dari 14 kecamatan di Kabupaten Rembang.</p>
                    </div>
                </div>

                <div className="mx-auto -mt-10 max-w-7xl px-4">
                    <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-xl border border-white md:p-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800">Daftar Kecamatan</h2>
                                <div className="mt-1 h-1 w-12 rounded-full bg-primary" />
                            </div>
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <Input
                                    className="h-14 rounded-2xl border-slate-100 bg-slate-50 pl-14 text-lg font-medium focus-visible:ring-primary/20"
                                    placeholder="Cari nama atau wilayah..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filtered.map((k) => (
                                <Link
                                    to={`/profil/daerah/${k.id}`}
                                    key={k.id}
                                    className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={k.image}
                                            alt={k.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest opacity-0 transition-all group-hover:opacity-100">
                                            <MapPin className="h-3 w-3" /> Rembang
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="text-xl font-black text-slate-800 transition-colors group-hover:text-primary">
                                            {k.name}
                                        </h3>
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 font-medium">
                                            {k.description}
                                        </p>
                                        <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase text-slate-400">Luas Wilayah</span>
                                                <span className="text-xs font-bold text-slate-700">{k.luas}</span>
                                            </div>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="py-32 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-300">
                                    <Search className="h-10 w-10" />
                                </div>
                                <p className="text-xl font-black text-slate-800">Kecamatan tidak ditemukan</p>
                                <p className="mt-2 text-slate-500 font-medium">Coba gunakan kata kunci pencarian yang berbeda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilDaerah;
