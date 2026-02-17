import { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Info, Map as MapIcon, ShieldAlert, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const regulationData = [
  {
    no: 1,
    kawasan: "Kawasan Peruntukan Budidaya",
    peruntukkan: "Hutan Produksi Terbatas",
    keterangan: "-",
    boleh: [
      "pengembangan usaha kehutanan untuk menunjang kegiatan pemanfaatan hasil hutan",
      "penanaman tanaman jenis rimba pohon jati",
      "peternakan unggas",
      "peternakan ternak besar",
      "pembangunan jaringan irigasi"
    ],
    syarat: [
      "pemanfaatan hasil hutan untuk menjaga kestabilan neraca sumber daya kehutanan",
      "pemanfaatan lahan hutan untuk kepentingan pengelolaan hutan bersama masyarakat",
      "industri kecil dan menengah pengolah hasil hutan",
      "pembangunan prasarana dan sarana kepentingan umum",
      "pemanfaatan hutan untuk penelitian, pendidikan, pelatihan, religi & budaya",
      "pertambangan minyak dan gas bumi sesuai izin resmi",
      "pertanian hortikultura & tanaman pangan",
      "wisata dengan intensitas rendah",
      "penebangan pohon jati (terbatas/berizin)",
      "permukiman (khusus/terbatas)",
      "bangunan air & pemanfaatan mata air"
    ],
    tidak: [
      "kegiatan yang dapat merusak hutan produksi",
      "pengembangan kegiatan budidaya yang mengurangi luas hutan",
      "penebangan hutan tanpa izin dari instansi yang berwenang"
    ]
  },
  {
    no: 2,
    kawasan: "Kawasan Peruntukan Budidaya",
    peruntukkan: "Hutan Produksi Tetap",
    keterangan: "-",
    boleh: [
      "pengembangan usaha kehutanan untuk menunjang kegiatan pemanfaatan hasil hutan",
      "penanaman tanaman jenis rimba pohon jati",
      "peternakan unggas",
      "peternakan ternak besar",
      "pembangunan jaringan irigasi"
    ],
    syarat: [
      "pemanfaatan hasil hutan untuk menjaga kestabilan neraca",
      "pengelolaan hutan bersama masyarakat (PHBM)",
      "industri pengolah hasil hutan",
      "pembangunan sarana kepentingan umum",
      "kepentingan penelitian & pendidikan",
      "pertambangan migas (dengan izin)",
      "pertanian tanaman pangan & hortikultura",
      "pariwisata alam intensitas rendah",
      "permukiman terbatas",
      "bangunan air"
    ],
    tidak: [
      "kegiatan destruktif terhadap ekosistem hutan",
      "penggurulan atau pengurangan luas kawasan hutan secara ilegal",
      "aktivitas tanpa izin resmi dari kementerian/dinas terkait"
    ]
  }
];

const ListItems = ({ items, type }: { items: string[]; type: 'boleh' | 'syarat' | 'tidak' }) => {
  const iconMap = {
    boleh: <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1 shrink-0" />,
    syarat: <Info className="h-4 w-4 text-amber-500 mt-1 shrink-0" />,
    tidak: <ShieldAlert className="h-4 w-4 text-rose-500 mt-1 shrink-0" />
  };

  return (
    <ul className="space-y-2 min-w-[200px]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600 font-medium">
          {iconMap[type]}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const InformasiZonasi = () => {
  const [search, setSearch] = useState("");

  const filtered = regulationData.filter((d) =>
    d.peruntukkan.toLowerCase().includes(search.toLowerCase()) ||
    d.kawasan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50/50 pb-20">
        {/* Header Section */}
        <div className="bg-[#1F5E3B] text-white py-12 px-4 shadow-lg">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20">
                  <ShieldCheck className="h-3 w-3 text-[#D4A017]" /> Regulasi Tata Ruang Resmi
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-[1.1]">Peruntukkan Tata Ruang</h1>
                <p className="text-white/70 font-medium max-w-2xl text-sm md:text-base">
                  Informasi detail mengenai regulasi pemanfaatan ruang, jenis kegiatan yang diperbolehkan, bersyarat, maupun dilarang di Kabupaten Rembang.
                </p>
              </div>
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  className="h-14 rounded-2xl border-white/20 bg-white/10 pl-12 text-white placeholder:text-white/40 focus-visible:ring-primary/20 backdrop-blur-sm"
                  placeholder="Cari jenis peruntukkan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Table */}
        <div className="mx-auto max-w-7xl px-4 -mt-6">
          <div className="flex md:hidden justify-end mb-2">
            <Badge variant="outline" className="text-[9px] font-bold text-slate-400 border-slate-200 uppercase tracking-tighter animate-pulse">
              Geser Horizontal &rarr;
            </Badge>
          </div>
          <div className="rounded-[2rem] bg-white shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                    <TableHead className="w-16 py-6 text-center font-black text-slate-400 uppercase text-xs">No</TableHead>
                    <TableHead className="min-w-[150px] py-6 font-black text-slate-700 uppercase text-xs">Kawasan</TableHead>
                    <TableHead className="min-w-[150px] py-6 font-black text-slate-700 uppercase text-xs">Peruntukkan</TableHead>
                    <TableHead className="min-w-[200px] py-6 font-black text-emerald-700 uppercase text-xs bg-emerald-50/30">Diperbolehkan</TableHead>
                    <TableHead className="min-w-[250px] py-6 font-black text-amber-700 uppercase text-xs bg-amber-50/30">Diperbolehkan Bersyarat</TableHead>
                    <TableHead className="min-w-[200px] py-6 font-black text-rose-700 uppercase text-xs bg-rose-50/30">Tidak Diperbolehkan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((d) => (
                    <TableRow key={d.no} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-8 align-top text-center font-bold text-slate-400 text-sm">{d.no}</TableCell>
                      <TableCell className="py-8 align-top">
                        <div className="flex items-start gap-2">
                          <MapIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="font-black text-slate-800 text-[13px] leading-snug tracking-tight">{d.kawasan}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-8 align-top">
                        <Badge variant="outline" className="rounded-lg border-primary/20 bg-primary/5 text-primary font-black py-1.5 px-3 uppercase text-[11px] tracking-wider whitespace-nowrap">
                          {d.peruntukkan}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-8 align-top bg-emerald-50/10">
                        <ListItems items={d.boleh} type="boleh" />
                      </TableCell>
                      <TableCell className="py-8 align-top bg-amber-50/10">
                        <ListItems items={d.syarat} type="syarat" />
                      </TableCell>
                      <TableCell className="py-8 align-top bg-rose-50/10">
                        <ListItems items={d.tidak} type="tidak" />
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-20 text-center">
                        <Search className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-lg font-black text-slate-800">Data regulasi tidak ditemukan</p>
                        <p className="text-slate-400 font-medium mt-1">Gunakan kata kunci pencarian yang berbeda.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 p-6 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative">
            <Info className="h-8 w-8 text-slate-400 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-black text-slate-800 uppercase tracking-widest">Catatan Penting:</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Tabel di atas merupakan ringkasan izin pemanfaatan ruang. Detail teknis lebih lanjut mengenai KDB, KLB, dan GSB dapat dilihat pada dokumen RDTR/RTRW resmi yang tersedia di menu Unduh Dokumen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InformasiZonasi;
