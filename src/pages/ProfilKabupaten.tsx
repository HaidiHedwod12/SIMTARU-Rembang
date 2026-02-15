import Layout from "@/components/Layout";
import { Map, Info, Flag, Building, ZoomIn } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

const ProfilKabupaten = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                <div className="relative h-[55vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                        style={{ backgroundImage: "url('/assets/branding/Kabupaten%20Rembang%20Hero.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                    <div className="absolute bottom-10 left-0 w-full animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <div className="mx-auto max-w-7xl px-4">
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-4 block">Profil Daerah</span>
                            <h1 className="text-5xl font-black text-white md:text-8xl tracking-tight">KABUPATEN<br />REMBANG</h1>
                            <p className="mt-6 max-w-2xl text-xl font-medium text-white/80 border-l-4 border-primary pl-6">"The Cola of Java" — Kota Garam yang penuh sejarah dan potensi masa depan.</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-16">
                    {/* Pimpinan Daerah - Moved to Top for ethical/professional hierarchy */}
                    <section className="mb-20">
                        <div className="group relative overflow-hidden rounded-[3.5rem] bg-white border border-slate-100 shadow-2xl transition-all hover:shadow-primary/10">
                            <div className="flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="relative h-80 w-full lg:w-[28rem] shrink-0 overflow-hidden rounded-[2.5rem] bg-slate-50 shadow-inner cursor-zoom-in group/img">
                                            <img
                                                src="/assets/branding/Bupati%20Wabup%20Rembang.jpg"
                                                alt="Bupati & Wakil Bupati Rembang"
                                                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest shadow-xl">
                                                    <ZoomIn className="h-4 w-4" />
                                                    Perbesar
                                                </div>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[95vw] w-fit max-h-[90vh] p-4 rounded-[2rem] border-none overflow-hidden">
                                        <div className="overflow-auto max-h-[85vh] rounded-xl">
                                            <img
                                                src="/assets/branding/Bupati%20Wabup%20Rembang.jpg"
                                                alt="Bupati & Wakil Bupati Rembang Full"
                                                className="w-full h-auto max-w-4xl"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <div className="flex-1 space-y-10 text-center lg:text-left">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                                            <div className="h-10 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Pimpinan Daerah</h2>
                                        </div>
                                        <p className="text-slate-500 font-medium max-w-xl italic">"Membangun sinergi untuk mewujudkan Rembang yang gemilang, sejahtera, dan bermartabat."</p>
                                    </div>

                                    <div className="grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Bupati Rembang</span>
                                            <h3 className="text-3xl font-black text-slate-800">H. Harno, S.E.</h3>
                                        </div>
                                        <div className="space-y-2 lg:border-l lg:border-slate-100 lg:pl-8">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Wakil Bupati Rembang</span>
                                            <h3 className="text-2xl font-black text-slate-700">Mochamad Hanies Cholil Barro'</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
                        </div>
                    </section>

                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-16">
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-12 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Sekilas Rembang</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-600 font-medium">
                                    <p>
                                        Kabupaten Rembang adalah sebuah kabupaten di Provinsi Jawa Tengah, Indonesia. Ibukotanya adalah Rembang.
                                        Kabupaten ini berbatasan dengan Laut Jawa di utara, Provinsi Jawa Timur di timur, Kabupaten Blora di selatan,
                                        serta Kabupaten Pati di barat.
                                    </p>
                                    <p className="mt-6">
                                        Dikenal sebagai Kota Garam, Rembang memiliki garis pantai yang panjang serta sejarah yang kental,
                                        termasuk menjadi tempat peristirahatan terakhir pahlawan emansipasi wanita Indonesia, R.A. Kartini.
                                    </p>
                                </div>
                            </section>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {[
                                    { label: "Luas Wilayah", value: "1.014,1 km²", icon: Map },
                                    { label: "Populasi", value: "~645.000 Jiwa", icon: Info },
                                    { label: "Jumlah Kecamatan", value: "14 Kecamatan", icon: Building },
                                    { label: "Semboyan", value: "Rembang BANGKIT", icon: Flag },
                                ].map((stat, idx) => (
                                    <div key={idx} className="flex items-center gap-6 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-white">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <stat.icon className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                                            <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="rounded-3xl bg-[#1F5E3B] p-8 text-white shadow-2xl">
                                <h3 className="text-2xl font-bold mb-6">Kenapa Rembang?</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_white]" />
                                        <span>Lokasi strategis di jalur Pantura.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_white]" />
                                        <span>Potensi maritim dan perikanan yang besar.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_white]" />
                                        <span>Kekayaan sejarah dan budaya (R.A. Kartini).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white shadow-[0_0_8px_white]" />
                                        <span>Produksi garam dan semen berkualitas nasional.</span>
                                    </li>
                                </ul>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="relative aspect-square rounded-3xl bg-white overflow-hidden shadow-xl flex items-center justify-center border border-slate-100 cursor-zoom-in group/map">
                                        <img
                                            src="/assets/branding/Peta%20Rembang.jpg"
                                            alt="Peta Kabupaten Rembang"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover/map:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/map:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest shadow-xl">
                                                <ZoomIn className="h-4 w-4" />
                                                Peta Full
                                            </div>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] w-fit max-h-[90vh] p-4 rounded-[2rem] border-none">
                                    <div className="overflow-auto max-h-[85vh] rounded-xl flex items-center justify-center bg-slate-50">
                                        <img
                                            src="/assets/branding/Peta%20Rembang.jpg"
                                            alt="Peta Kabupaten Rembang Full"
                                            className="h-auto w-auto max-w-full max-h-full"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilKabupaten;
