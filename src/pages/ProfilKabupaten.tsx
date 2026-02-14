import Layout from "@/components/Layout";
import { Map, Info, Flag, Building } from "lucide-react";

const ProfilKabupaten = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                <div className="relative h-[45vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/assets/branding/Kabupaten%20Rembang%20Hero.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                    <div className="absolute bottom-10 left-0 w-full">
                        <div className="mx-auto max-w-7xl px-4">
                            <h1 className="text-4xl font-black text-white md:text-7xl">Kabupaten Rembang</h1>
                            <p className="mt-4 max-w-2xl text-xl font-medium text-white/90">"The Cola of Java" — Kota Garam yang penuh sejarah dan potensi masa depan.</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-20">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="md:col-span-2 space-y-12">
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    <h2 className="text-3xl font-bold text-slate-800">Sekilas Rembang</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-lg leading-relaxed text-slate-600">
                                    <p>
                                        Kabupaten Rembang adalah sebuah kabupaten di Provinsi Jawa Tengah, Indonesia. Ibukotanya adalah Rembang.
                                        Kabupaten ini berbatasan dengan Laut Jawa di utara, Provinsi Jawa Timur di timur, Kabupaten Blora di selatan,
                                        serta Kabupaten Pati di barat.
                                    </p>
                                    <p className="mt-4">
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

                            <div className="aspect-square rounded-3xl bg-slate-200 overflow-hidden shadow-xl flex items-center justify-center text-slate-400 font-bold italic">
                                Peta Kabupaten Rembang
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilKabupaten;
