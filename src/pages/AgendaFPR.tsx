import Layout from "@/components/Layout";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

const agendaList = [
    { id: 1, title: "Rapat Pleno Pembahasan Ranperda RTRW", date: "20 Mei 2026", time: "09:00 - Selesai", location: "Ruang Rapat DPUPR", status: "Upcoming" },
    { id: 2, title: "Sosialisasi Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang (PKKPR)", date: "15 Juni 2026", time: "08:30 - 12:00", location: "Gedung Serbaguna Rembang", status: "Planned" },
    { id: 3, title: "Evaluasi Teknis Usulan Pemanfaatan Ruang Kawasan Industri", date: "02 Juli 2026", time: "10:00 - Selesai", location: "Kantor Kabupaten", status: "Planned" },
];

const AgendaFPR = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-5xl px-4 py-20">
                    <div className="mb-12 flex flex-col items-center text-center">
                        <h1 className="text-4xl font-black text-slate-900 md:text-5xl">Agenda FPR</h1>
                        <p className="mt-4 max-w-xl text-lg text-slate-500">Jadwal kegiatan dan pertemuan Forum Penataan Ruang Kabupaten Rembang.</p>
                        <div className="mt-6 h-1 w-20 rounded-full bg-primary" />
                    </div>

                    <div className="space-y-6">
                        {agendaList.map((item) => (
                            <div key={item.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl md:flex-row">
                                <div className="flex w-full flex-col justify-center bg-primary/5 px-8 py-10 text-center md:w-48">
                                    <span className="text-xs font-black uppercase tracking-widest text-primary/60">Agenda</span>
                                    <p className="mt-2 text-3xl font-black text-primary">{item.date.split(" ")[0]}</p>
                                    <p className="text-sm font-bold text-slate-600">{item.date.split(" ").slice(1).join(" ")}</p>
                                </div>
                                <div className="flex flex-1 flex-col justify-center p-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${item.status === "Upcoming" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-primary">{item.title}</h3>
                                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-primary" />
                                            {item.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            {item.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center border-t border-slate-50 p-6 md:border-l md:border-t-0">
                                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all group-hover:bg-primary group-hover:text-white">
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 rounded-3xl bg-[#1F5E3B]/5 border border-[#1F5E3B]/10 p-10 text-center">
                        <Calendar className="mx-auto h-12 w-12 text-[#1F5E3B] opacity-40" />
                        <h4 className="mt-4 text-xl font-bold text-slate-800">Ingin mengajukan audiensi?</h4>
                        <p className="mt-2 text-slate-500">Hubungi sekretariat FPR melalui email atau whatsapp resmi DPUPR.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AgendaFPR;
