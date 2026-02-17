import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    ChevronRight,
    FileText,
    X,
    ShieldCheck,
    ShieldAlert,
    Info,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cekKesesuaian, ComplianceResult } from "@/services/zonasiService";
import { Regulation } from "@/data/zonasi";

interface CompliancePanelProps {
    zona: Regulation | null;
    onClose: () => void;
}

const buildingTypes = [
    { value: "Rumah Tinggal", label: "Rumah Tinggal" },
    { value: "Kos-kosan", label: "Kos-kosan" },
    { value: "Toko / Ruko", label: "Toko / Ruko" },
    { value: "Industri / Gudang", label: "Industri / Gudang" },
    { value: "Puskesmas / RS", label: "Fasilitas Kesehatan" },
    { value: "Sekolah", label: "Fasilitas Pendidikan" },
    { value: "Perkantoran", label: "Perkantoran" },
    { value: "Lainnya", label: "Lainnya" }
];

const CompliancePanel: React.FC<CompliancePanelProps> = ({ zona, onClose }) => {
    const [step, setStep] = useState<"form" | "loading" | "result">("form");
    const [jenisKegiatan, setJenisKegiatan] = useState("");
    const [jumlahLantai, setJumlahLantai] = useState(1);
    const [luasBangunan, setLuasBangunan] = useState(50);
    const [result, setResult] = useState<ComplianceResult | null>(null);

    // Reset panel when zona changes (new location selected)
    useEffect(() => {
        if (zona) {
            setStep("form");
            setResult(null);
        }
    }, [zona]);

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!zona || !jenisKegiatan) return;

        setStep("loading");
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        const res = cekKesesuaian(zona, { jenisKegiatan, jumlahLantai, luasBangunan });
        setResult(res);
        setStep("result");
    };

    const reset = () => {
        setStep("form");
        setResult(null);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
                <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Cek Kesesuaian</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Simulasi Tata Ruang</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100">
                    <X className="h-5 w-5 text-slate-400" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <AnimatePresence mode="wait">
                    {step === "form" && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary/60 uppercase">Terdeteksi di Zona:</p>
                                        <p className="text-sm font-black text-slate-800">{zona?.peruntukkan || "Mencari Lokasi..."}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleCheck} className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Apa yang ingin Anda bangun?</Label>
                                    <Select onValueChange={setJenisKegiatan} value={jenisKegiatan} required>
                                        <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:ring-primary/20 bg-white">
                                            <SelectValue placeholder="Pilih jenis bangunan..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                            {buildingTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value} className="font-medium focus:bg-primary/5 focus:text-primary">
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                            <Maximize2 className="h-3 w-3" /> Luas Bangunan
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                min={1}
                                                className="h-12 rounded-xl border-slate-200 focus-visible:ring-primary/20 pr-10"
                                                value={luasBangunan}
                                                onChange={(e) => setLuasBangunan(parseInt(e.target.value))}
                                                required
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">M²</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                            <Building2 className="h-3 w-3" /> Jml Lantai
                                        </Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            className="h-12 rounded-xl border-slate-200 focus-visible:ring-primary/20"
                                            value={jumlahLantai}
                                            onChange={(e) => setJumlahLantai(parseInt(e.target.value))}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" disabled={!jenisKegiatan} className="w-full h-14 rounded-2xl bg-primary font-black text-white shadow-xl shadow-primary/20 group disabled:opacity-50">
                                    CEK KESESUAIAN <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {step === "loading" && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="relative mb-6">
                                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                                <Loader2 className="h-16 w-16 text-primary animate-spin relative z-10" />
                            </div>
                            <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">Menganalisis Spasial...</h4>
                            <p className="text-sm text-slate-500 font-medium mt-2">Menyamakan rencana kegiatan dengan<br />aturan pola ruang Rembang 2026.</p>
                        </motion.div>
                    )}

                    {step === "result" && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className={`rounded-3xl p-6 text-center border-2 ${result.status === "Diizinkan" ? "bg-emerald-50 border-emerald-100" :
                                result.status === "Bersyarat" ? "bg-amber-50 border-amber-100" : "bg-rose-50 border-rose-100"
                                }`}>
                                <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4 ${result.status === "Diizinkan" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" :
                                    result.status === "Bersyarat" ? "bg-amber-500 text-white shadow-lg shadow-amber-200" : "bg-rose-500 text-white shadow-lg shadow-rose-200"
                                    }`}>
                                    {result.status === "Diizinkan" ? <CheckCircle2 className="h-8 w-8" /> :
                                        result.status === "Bersyarat" ? <Info className="h-8 w-8" /> : <ShieldAlert className="h-8 w-8" />}
                                </div>
                                <h4 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">Hasil Analisis</h4>
                                <div className={`text-2xl font-black mt-1 uppercase ${result.status === "Diizinkan" ? "text-emerald-600" :
                                    result.status === "Bersyarat" ? "text-amber-600" : "text-rose-600"
                                    }`}>
                                    {result.status}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ringkasan Ketentuan</Label>
                                    <p className="text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        {result.ringkasan}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Zona Peruntukan</Label>
                                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-800">{result.zona.peruntukkan}</p>
                                            <p className="text-[10px] font-medium text-slate-500">{result.zona.kawasan}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {result.isSimulated && (
                                <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-100 flex gap-3 items-start">
                                    <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-amber-800 font-medium italic leading-relaxed">
                                        Hasil ini bersifat simulasi prototype. Untuk keputusan resmi, harap ajukan PKKPR melalui sistem OSS atau konsultasi dengan DPUPR Kabupaten Rembang.
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={reset} className="flex-1 h-12 rounded-xl border-slate-200 font-bold hover:bg-slate-50">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> ULANGI
                                </Button>
                                <Button className="flex-1 h-12 rounded-xl bg-primary font-black text-white hover:bg-primary/90" onClick={() => window.location.href = "/unduh"}>
                                    <FileText className="mr-2 h-4 w-4" /> ATURAN TEKNIS
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CompliancePanel;
