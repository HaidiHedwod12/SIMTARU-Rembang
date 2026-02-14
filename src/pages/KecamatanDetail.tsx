import Layout from "@/components/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import { KECAMATAN_DATA } from "@/data/kecamatan";
import { ArrowLeft, MapPin, Users, Maximize, Landmark, Building2, ChevronRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const KecamatanDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const kecamatan = KECAMATAN_DATA.find((k) => k.id === id);

    if (!kecamatan) {
        return (
            <Layout>
                <div className="flex min-h-[70vh] flex-col items-center justify-center">
                    <h1 className="text-4xl font-black text-slate-800">Data Tidak Ditemukan</h1>
                    <Button onClick={() => navigate("/profil/daerah")} className="mt-6">
                        Kembali ke Daftar
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50/30 pb-20">
                {/* Hero Section */}
                <div className="relative h-[55vh] w-full overflow-hidden bg-slate-900">
                    <img
                        src={kecamatan.image}
                        alt={kecamatan.name}
                        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[20s] hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-6 md:p-20">
                        <div className="mx-auto max-w-7xl">
                            <button
                                onClick={() => navigate(-1)}
                                className="mb-8 flex items-center gap-2 font-black text-white/70 transition-all hover:text-white"
                            >
                                <ArrowLeft className="h-5 w-5" /> KEMBALI
                            </button>
                            <div className="flex items-center gap-4 text-primary">
                                <div className="h-10 w-1.5 rounded-full bg-primary" />
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-white">Profil Kecamatan</span>
                            </div>
                            <h1 className="mt-4 text-5xl font-black text-white md:text-8xl">{kecamatan.name}</h1>
                        </div>
                    </div>
                </div>

                <div className="mx-auto -mt-10 max-w-7xl px-4 md:px-6">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-slate-200/50 border border-white md:p-12">
                                <h2 className="text-3xl font-black text-slate-800">Tentang Wilayah</h2>
                                <div className="mt-2 h-1 w-16 rounded-full bg-primary" />
                                <p className="mt-8 text-xl leading-relaxed text-slate-600 font-medium italic">
                                    "{kecamatan.description}"
                                </p>

                                <h3 className="mt-12 text-2xl font-black text-slate-800">Latar Belakang & Sejarah</h3>
                                <p className="mt-4 text-lg leading-relaxed text-slate-500">
                                    {kecamatan.history}
                                </p>

                                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    {[
                                        { label: "Luas Wilayah", value: kecamatan.luas, icon: Maximize },
                                        { label: "Populasi", value: kecamatan.penduduk, icon: Users },
                                        { label: "Kelurahan/Desa", value: `${kecamatan.desa} Desa`, icon: Landmark },
                                        { label: "Titik Ikonik", value: "Tersedia", icon: MapPin },
                                    ].map((stat, idx) => (
                                        <div key={idx} className="rounded-3xl bg-slate-50 p-6 text-center border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
                                            <stat.icon className="mx-auto h-8 w-8 text-primary" />
                                            <p className="mt-4 text-[10px] font-black uppercase tracking-wider text-slate-400">{stat.label}</p>
                                            <p className="mt-1 text-base font-black text-slate-800">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] bg-white p-8 shadow-2xl border border-white">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black text-slate-800">Potensi Spasial</h3>
                                    <Share2 className="h-5 w-5 text-slate-300" />
                                </div>
                                <div className="aspect-[21/9] w-full rounded-3xl bg-slate-100 overflow-hidden relative group">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold italic">
                                        Peta Visualisasi Spasial Kecamatan {kecamatan.name}
                                    </div>
                                    <div className="absolute inset-0 bg-primary/0 transition-all group-hover:bg-primary/5" />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="rounded-[2.5rem] bg-[#1F5E3B] p-10 text-white shadow-2xl shadow-primary/20">
                                <Building2 className="mb-6 h-12 w-12 opacity-50" />
                                <h3 className="text-2xl font-black">Informasi Ikonik</h3>
                                <p className="mt-4 font-medium text-white/80 leading-relaxed">
                                    Setiap wilayah di Rembang memiliki ciri khas. Di {kecamatan.name}, tempat yang paling direkomendasikan adalah:
                                </p>
                                <div className="mt-8 rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/20">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Tempat Terpopuler</span>
                                    <p className="mt-2 text-xl font-black">{kecamatan.iconicPlace}</p>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] bg-white p-8 shadow-xl border border-white">
                                <h4 className="text-lg font-black text-slate-800">Kecamatan Lainnya</h4>
                                <div className="mt-6 space-y-3">
                                    {KECAMATAN_DATA.filter((k) => k.id !== id).slice(0, 5).map((k) => (
                                        <Link
                                            key={k.id}
                                            to={`/profil/daerah/${k.id}`}
                                            className="group flex items-center justify-between rounded-2xl p-4 transition-all hover:bg-slate-50"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                                                <span className="font-bold text-slate-600 group-hover:text-primary">{k.name}</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/profil/daerah" className="mt-8 block text-center text-sm font-black text-primary hover:underline">
                                    LIHAT SEMUA
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default KecamatanDetail;
