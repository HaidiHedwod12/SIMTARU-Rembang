import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Map, FileText, Layers, Building2, TreePine, FileDown,
  ArrowRight, ShieldCheck, Globe, CheckCircle2, Info, X,
  ChevronLeft, Eye
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import logo from "@/assets/logo-kabupaten-rembang.png";

const kecamatanData: Record<string, string[]> = {
  "Rembang": ["Tasikagung", "Kabongan Lor", "Kabongan Kidul", "Kasreman", "Kedungrejo", "Leteh", "Magersari", "Mondoteko", "Ngotet", "Pandean", "Pasarbanggi", "Punjulharjo", "Rembang Kota", "Sawahan", "Sukoharjo", "Tanjungsari", "Turusgede", "Waru", "Weton"],
  "Lasem": ["Babagan", "Binangun", "Bonang", "Dasun", "Dorokandang", "Gedongmulyo", "Karangturi", "Ngemplak", "Selopuro", "Soditan"],
  "Kragan": ["Balongmulyo", "Kragan", "Narukan", "Pandangan Kulon", "Pandangan Wetan", "Plawangan", "Sumurpule", "Tegalmulyo"],
  "Pamotan": ["Bamban", "Bangunrejo", "Ketangi", "Pamotan", "Rembang", "Samaran", "Segoromulyo", "Sidorejo", "Tempel"],
  "Sedan": ["Bogorejo", "Dadapan", "Karangasem", "Kenongo", "Kumendung", "Lemahputih", "Pacing", "Sedan", "Sidorejo"],
  "Sluke": ["Bendo", "Jatisari", "Labuhan Kidul", "Manggar", "Pangkalan", "Rakitan", "Sluke", "Trahan"],
  "Sarang": ["Bajingjowo", "Kalipang", "Karangmangu", "Sarang Meduro", "Sendangmulyo", "Tanjungseloka"],
  "Bulu": ["Bulu", "Kadiwono", "Lambangan Kulon", "Lambangan Wetan", "Mantingan", "Pasedan", "Pinggan"],
  "Gunem": ["Banyuurip", "Gunem", "Kajar", "Pasucen", "Suntri", "Tegaldowo", "Timbrangan"],
  "Kaliori": ["Banyudono", "Kaliori", "Kuangsan", "Mojowarno", "Purworejo", "Tambakagung", "Tunggulrejo"],
  "Pancur": ["Criwik", "Jeruk", "Pancur", "Punggurharjo", "Sidowayah", "Warugunung"],
  "Sumber": ["Grawan", "Jatihadi", "Krikilan", "Logede", "Sumber", "Tlogotunggal"],
  "Sulang": ["Glebeg", "Jatimalang", "Kaliombo", "Sulang", "Tanjung", "Tlogorejo"],
  "Sale": ["Bancang", "Gading", "Jinanten", "Mrayun", "Sale", "Tengger"]
};

const kecamatanImages: Record<string, string> = {
  "Rembang": "/assets/kecamatan/Rembang.jpg",
  "Lasem": "/assets/kecamatan/Lasem.jpg",
  "Kragan": "/assets/kecamatan/Kragan.jpg",
  "Pamotan": "/assets/kecamatan/Pamotan.jpg",
  "Sedan": "/assets/kecamatan/Sedan.jpg",
  "Sluke": "/assets/kecamatan/Sluke.jpg",
  "Sarang": "/assets/kecamatan/Sarang.jpg",
  "Bulu": "/assets/kecamatan/Bulu.jpg",
  "Gunem": "/assets/kecamatan/Gunem.jpg",
  "Kaliori": "/assets/kecamatan/Kaliori.jpg",
  "Pancur": "/assets/kecamatan/Pancur.jpg",
  "Sumber": "/assets/kecamatan/Sumber.jpg",
  "Sulang": "/assets/kecamatan/Sulang.jpg",
  "Sale": "/assets/kecamatan/Sale.jpg"
};

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
};

const stats = [
  {
    value: 14,
    label: "Kecamatan",
    icon: Globe,
    isWilayah: true,
    detailTitle: "Daftar Kecamatan Kabupaten Rembang"
  },
  {
    value: 294,
    label: "Desa/Kelurahan",
    icon: Building2,
    isWilayah: true,
    detailTitle: "Eksplorasi Wilayah Desa"
  },
  {
    value: 1,
    label: "RDTR Aktif",
    icon: Map,
    isDoc: true,
    status: "Aktif",
    tahun: "2024-2044",
    nomor: "Perbup No. 23 Tahun 2024",
    fullTitle: "RDTR Kawasan Perkotaan Lasem",
    fileName: "RDTR Perkotaan Lasem Kab Rembang.pdf",
    preview: "/assets/dokumen/RDTR.jpg"
  },
  {
    value: 1,
    label: "RTRW Berlaku",
    icon: ShieldCheck,
    isDoc: true,
    status: "Berlaku",
    tahun: "2023-2043",
    nomor: "Perda No. 2 Tahun 2023",
    fullTitle: "RTRW Kabupaten Rembang",
    fileName: "RTRW Kabupaten Rembang.pdf",
    preview: "/assets/dokumen/RTRW.jpg"
  },
];

const features = [
  {
    icon: Layers,
    title: "Informasi Tata Ruang",
    desc: "Akses data zonasi, peruntukan lahan, dan regulasi penataan ruang secara presisi dan real-time.",
    color: "from-blue-600/20 to-cyan-600/20",
    path: "/zonasi"
  },
  {
    icon: Map,
    title: "Peta Interaktif",
    desc: "Jelajahi visualisasi spasial berbasis GIS dengan layer administrasi dan struktur ruang yang mendalam.",
    color: "from-emerald-600/20 to-teal-600/20",
    path: "/peta"
  },
  {
    icon: FileDown,
    title: "Unduh Dokumen",
    desc: "Akses cepat unduhan dokumen RTRW, RDTR, dan peta resmi dalam standar format kualitas tinggi.",
    color: "from-amber-600/20 to-orange-600/20",
    path: "/dokumen"
  },
];

const StatsModalContent = ({
  mode
}: {
  mode: "kecamatan" | "desa"
}) => {
  const [currentView, setCurrentView] = useState<"kecamatan" | "desa">("kecamatan");
  const [selectedKec, setSelectedKec] = useState<string | null>(null);

  const kecamatanList = Object.keys(kecamatanData);
  const desaList = selectedKec ? kecamatanData[selectedKec] : [];

  const handleKecClick = (kec: string) => {
    setSelectedKec(kec);
    if (mode === "desa") {
      setCurrentView("desa");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-[450px]">
          <div className="p-4 bg-[#1F5E3B] text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              {currentView === "desa" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20 p-0"
                  onClick={() => setCurrentView("kecamatan")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <span className="text-xs font-bold uppercase tracking-widest">
                {currentView === "kecamatan" ? "Daftar Kecamatan" : `Desa di Kec. ${selectedKec}`}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
              {currentView === "kecamatan" ? "14" : desaList.length} Entitas
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 text-left">
            <div className="grid grid-cols-1 gap-1">
              {(currentView === "kecamatan" ? kecamatanList : desaList).map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors group cursor-pointer text-left ${selectedKec === item && currentView === "kecamatan"
                    ? "bg-emerald-100 border border-emerald-200"
                    : "hover:bg-emerald-50 border border-transparent"
                    }`}
                  onClick={() => {
                    if (currentView === "kecamatan") {
                      handleKecClick(item);
                    }
                  }}
                >
                  <span className="text-[10px] font-bold text-slate-400 w-4">{idx + 1}.</span>
                  <span className={`font-bold transition-colors ${selectedKec === item && currentView === "kecamatan"
                    ? "text-[#1F5E3B]"
                    : "text-slate-700 group-hover:text-[#1F5E3B]"
                    }`}>
                    {item}
                  </span>
                  {currentView === "kecamatan" && mode === "desa" && (
                    <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 text-[#D4A017] transition-all" />
                  )}
                  {currentView === "kecamatan" && mode === "kecamatan" && selectedKec === item && (
                    <div className="ml-auto flex items-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-[#D4A017]" />
                      <span className="text-[8px] font-black text-[#D4A017] uppercase">Terpilih</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden flex flex-col group h-[450px]">
          <div className="absolute inset-0 z-0 text-left">
            {selectedKec && kecamatanImages[selectedKec] ? (
              <img
                src={kecamatanImages[selectedKec]}
                alt={selectedKec}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <img
                src="/assets/branding/Kabupaten%20Rembang.jpg"
                alt="Kabupaten Rembang"
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 mt-auto p-8 text-white">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4">
              <Map className="h-6 w-6 text-[#D4A017]" />
            </div>
            <h6 className="text-xl font-black uppercase mb-1 tracking-tight">
              {selectedKec ? `Kecamatan ${selectedKec}` : "Kabupaten Rembang"}
            </h6>
            <p className="text-sm text-white/70 font-medium max-w-[280px]">
              {currentView === "kecamatan"
                ? selectedKec
                  ? `Menampilkan visualisasi wilayah Kecamatan ${selectedKec}.`
                  : "Pilih kecamatan untuk melihat pratinjau wilayah."
                : `Daftar administrasi desa/kelurahan di wilayah Kecamatan ${selectedKec}.`}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F5E3B] text-[10px] font-bold border border-emerald-400/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GIS ASSET PREVIEW
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const heroImages = [
    "/assets/branding/Kabupaten%20Rembang%20Hero.jpg",
    "/assets/branding/Kabupaten%20Rembang%202.jpg",
    "/assets/branding/Kabupaten%20Rembang%203.jpg",
    "/assets/branding/Kabupaten%20Rembang%204.jpg",
    "/assets/branding/Kabupaten%20Rembang%205.jpg"
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const handleLogoClick = () => {
    setCurrentBgIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1F5E3B] px-4 pt-16 text-white">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentBgIndex === idx ? "opacity-100" : "opacity-0"
                }`}
              style={{
                backgroundImage: `url('${img}')`,
                transform: 'scale(1.05)'
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a4a2e]/20 via-[#1F5E3B]/50 to-[#1F5E3B]" />

          {/* Animated Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" style={{ animationDelay: '2s' }} />

          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Logo */}
            <div className="flex justify-center lg:justify-end animate-float">
              <div
                className="relative cursor-pointer group/logo"
                onClick={handleLogoClick}
              >
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover/logo:bg-primary/40" />
                <img
                  src={logo}
                  alt="Logo Kabupaten Rembang"
                  className="relative h-60 w-60 md:h-72 md:w-72 lg:h-[380px] lg:w-[380px] object-contain drop-shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-transform duration-500 group-hover/logo:scale-110 active:scale-95"
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md mb-6 animate-fade-in text-white/80">
                <Building2 className="h-4 w-4 text-[#D4A017]" /> Pemerintah Kabupaten Rembang
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white/90 mb-2">Selamat Datang di</h2>
              <h1 className="mb-6 text-6xl font-black tracking-tight leading-[1] md:text-8xl lg:text-[100px] drop-shadow-xl">
                <span className="text-white">SIM</span>
                <span className="text-[#D4A017] italic">TARU</span>
              </h1>

              <p className="mb-10 max-w-xl text-lg text-white/70 leading-relaxed md:text-xl">
                Portal spasial masa depan untuk transparansi penataan ruang dan keunggulan regulasi wilayah Kabupaten Rembang secara akurat dan terintegrasi.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link to="/peta">
                  <Button size="lg" className="h-16 px-10 gap-3 text-lg font-black bg-[#D4A017] hover:bg-[#D4A017]/90 shadow-[0_0_25px_rgba(212,160,23,0.4)] transition-all duration-300 hover:translate-y-[-4px] rounded-2xl text-white">
                    <Map className="h-6 w-6" /> Jelajahi Peta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section - Institutional Style */}
      <section className="relative px-4 py-12 bg-slate-50 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="mx-auto max-w-7xl relative z-10 w-full">
          <div className="mb-10 text-left max-w-2xl">
            <div className="inline-block px-3 py-1 bg-[#D4A017]/10 border border-[#D4A017]/20 rounded mb-4">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4A017]">Layanan Utama</span>
            </div>
            <h2 className="text-3xl font-extrabold md:text-4xl text-[#1F5E3B] mb-4 tracking-tight">Inovasi Tata Ruang Digital</h2>
            <p className="text-base text-slate-600 font-medium leading-relaxed">
              Portal resmi penataan ruang Kabupaten Rembang yang menyediakan akses data spasial transparan, akurat, dan terintegrasi.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Stacked Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Informasi Tata Ruang */}
              <Link to="/zonasi" className="group">
                <Card className="h-full border-t-4 border-t-[#D4A017] border-slate-200 shadow-sm transition-all duration-200 hover:translate-y-[-4px] hover:shadow-xl rounded-xl">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F5E3B]/10 text-[#1F5E3B]">
                      <Layers className="h-6 w-6" />
                    </div>
                    <h4 className="mb-2 text-xl font-bold text-[#1F5E3B]">Informasi Tata Ruang</h4>
                    <p className="mb-4 text-sm text-slate-600 font-medium">Data zonasi, peruntukan lahan, dan regulasi penataan ruang presisi.</p>
                    <Button variant="ghost" className="mt-auto h-auto self-start px-0 text-xs font-black group-hover:text-[#D4A017] transition-colors">
                      LIHAT DETAIL <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Unduh Dokumen */}
              <Link to="/dokumen" className="group">
                <Card className="h-full border-t-4 border-t-[#D4A017] border-slate-200 shadow-sm transition-all duration-200 hover:translate-y-[-4px] hover:shadow-xl rounded-xl">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F5E3B]/10 text-[#1F5E3B]">
                      <FileDown className="h-6 w-6" />
                    </div>
                    <h4 className="mb-2 text-xl font-bold text-[#1F5E3B]">Unduh Dokumen</h4>
                    <p className="mb-4 text-sm text-slate-600 font-medium">Akses unduhan dokumen RTRW, RDTR, dan peta resmi format kualitas tinggi.</p>
                    <Button variant="ghost" className="mt-auto h-auto self-start px-0 text-xs font-black group-hover:text-[#D4A017] transition-colors">
                      DOWNLOAD <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Right Column: Large Peta Interaktif Card */}
            <div className="lg:col-span-7">
              <Link to="/peta" className="group block h-full">
                <Card className="relative h-full border-t-4 border-t-[#D4A017] border-slate-200 shadow-md transition-all duration-200 hover:translate-y-[-4px] hover:shadow-2xl rounded-xl overflow-hidden bg-[#1F5E3B] text-white">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gis-pattern" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F5E3B] via-transparent to-black/40" />
                  </div>

                  <CardContent className="relative z-10 p-8 flex flex-col h-full min-h-[350px]">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 shadow-lg group-hover:bg-[#D4A017] group-hover:scale-110 transition-all duration-300">
                      <Map className="h-8 w-8" />
                    </div>
                    <h4 className="mb-3 text-3xl font-black tracking-tight">Peta Interaktif</h4>
                    <p className="mb-8 text-white/80 font-medium text-base max-w-md leading-relaxed">
                      Jelajahi visualisasi spasial berbasis GIS dengan layer administrasi, regulasi tata ruang, dan struktur wilayah.
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <Button className="h-12 px-8 bg-[#D4A017] hover:bg-[#D4A017]/90 text-white font-black text-base gap-2 rounded-xl shadow-xl transition-all duration-200 group-hover:scale-105">
                        BUKA PETA GIS <Map className="h-4 w-4" />
                      </Button>

                      <div className="hidden md:flex flex-col items-end opacity-40">
                        <span className="text-[10px] font-bold tracking-widest uppercase">GIS ENGINE v5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Stats Section - Dashboard Look */}
      <section className="relative overflow-hidden bg-slate-100/50 py-24 bg-gis-pattern border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="mb-16 text-left">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4A017] mb-3 block">Data Wilayah</span>
            <h2 className="text-3xl font-extrabold md:text-4xl text-[#1F5E3B] mb-4">Statistik Tata Ruang Kabupaten Rembang</h2>
            <p className="text-slate-600 font-medium max-w-2xl">Ringkasan data administratif dan dokumen tata ruang terkini yang terintegrasi secara digital.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Dialog key={s.label}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer border-t-4 border-t-[#D4A017] border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl hover:translate-y-[-6px]">
                    <CardContent className="flex flex-col items-center p-10 text-center">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F5E3B]/10 text-[#1F5E3B] transition-colors group-hover:bg-[#1F5E3B] group-hover:text-white">
                        <s.icon className="h-7 w-7" />
                      </div>
                      <p className="text-5xl font-black text-[#1F5E3B] mb-2 tabular-nums">
                        <CountUp end={s.value} />
                      </p>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-[#D4A017] opacity-0 group-hover:opacity-100 transition-opacity">
                        KLIK UNTUK RINCIAN <Info className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 bg-white">
                  <DialogHeader className="p-6 border-b bg-slate-50">
                    <DialogTitle className="text-2xl font-black text-[#1F5E3B] flex items-center gap-3">
                      <s.icon className="h-6 w-6 text-[#D4A017]" />
                      {s.detailTitle || s.label}
                    </DialogTitle>
                  </DialogHeader>

                  {s.isWilayah ? (
                    <StatsModalContent mode={s.label === "Kecamatan" ? "kecamatan" : "desa"} />
                  ) : s.isDoc ? (
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="grid md:grid-cols-2 gap-8 items-center py-6">
                        <div className="space-y-6">
                          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                            <h5 className="text-sm font-bold text-emerald-800 uppercase mb-4 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4" /> Status Dokumen
                            </h5>
                            <div className="space-y-4 text-slate-700">
                              <div className="flex justify-between border-b border-emerald-100 pb-2">
                                <span className="font-medium text-slate-500">Judul</span>
                                <span className="font-bold text-right text-[#1F5E3B]">{s.fullTitle}</span>
                              </div>
                              <div className="flex justify-between border-b border-emerald-100 pb-2">
                                <span className="font-medium text-slate-500">Status</span>
                                <span className="font-bold text-emerald-700">{s.status}</span>
                              </div>
                              <div className="flex justify-between border-b border-emerald-100 pb-2">
                                <span className="font-medium text-slate-500">Tahun Berlaku</span>
                                <span className="font-bold">{s.tahun}</span>
                              </div>
                              <div className="flex justify-between border-b border-emerald-100 pb-2">
                                <span className="font-medium text-slate-500">Nomor Regulasi</span>
                                <span className="font-bold">{s.nomor}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <a
                              href={`/assets/dokumen/${s.fileName}`}
                              download
                              className="block"
                            >
                              <Button className="w-full h-14 bg-[#1F5E3B] hover:bg-[#1F5E3B]/90 font-black gap-2">
                                <FileDown className="h-5 w-5" /> UNDUH DOKUMEN RESMI (PDF)
                              </Button>
                            </a>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full h-14 border-[#1F5E3B] text-[#1F5E3B] hover:bg-emerald-50 font-black gap-2"
                            >
                              <a
                                href={`/assets/dokumen/${s.fileName}?preview=1`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye className="h-5 w-5" /> PRATINJAU DOKUMEN RESMI
                              </a>
                            </Button>
                          </div>
                        </div>
                        <a
                          href={`/assets/dokumen/${s.fileName}?preview=1`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative aspect-[3/4] rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner group cursor-pointer"
                        >
                          {s.preview ? (
                            <>
                              <img
                                src={s.preview}
                                alt={s.label}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                  <Eye className="h-6 w-6 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Preview Dokumen</p>
                                <p className="text-white text-sm font-black">{s.label}</p>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-4">
                              <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
                                <Layers className="h-8 w-8 text-slate-400" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-500">Preview Peta {s.label}</p>
                                <p className="text-xs text-slate-400 mt-1 italic">Layer spasial akan dimuat di sini</p>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                            <Info className="h-4 w-4 text-white" />
                          </div>
                        </a>
                      </div>
                    </div>
                  ) : null}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Komitmen Section (Bottom CTA) */}
      <section className="relative bg-white py-24 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Content */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4A017] mb-3 block">Visi & Komitmen</span>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-[#1F5E3B]">
                  Integrasi dan Transparansi <br />
                  <span className="text-[#D4A017]">Tata Ruang Digital</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Kami berkomitmen menghadirkan keterbukaan informasi publik yang terintegrasi, akurat, dan mudah diakses untuk mendukung pembangunan berkelanjutan di Kabupaten Rembang.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: ShieldCheck, text: "Integrasi Data Antar Sistem" },
                  { icon: Layers, text: "Validasi Spasial yang Akurat" },
                  { icon: Globe, text: "Akses Informasi Terbuka" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-[#D4A017] group-hover:bg-[#1F5E3B] group-hover:text-white transition-all">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold text-slate-800">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/peta">
                  <Button className="h-14 px-8 bg-[#1F5E3B] hover:bg-[#1F5E3B]/90 text-white font-black text-lg rounded-xl shadow-xl transition-all hover:scale-105">
                    Jelajahi Peta Interaktif
                  </Button>
                </Link>
                <Link to="/dokumen">
                  <Button variant="outline" className="h-14 px-8 border-primary/20 bg-primary/5 hover:bg-primary/10 text-[#1F5E3B] font-black text-lg rounded-xl transition-all">
                    Lihat Dokumen Tata Ruang
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side: Abstract Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative z-10 opacity-[0.08]">
                <TreePine className="h-64 w-64 text-[#1F5E3B] mx-auto animate-float" />
              </div>
              {/* GIS Contour Lines Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-full bg-gis-pattern opacity-20 animate-pulse-slow" />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#1F5E3B]/5 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
};

export default Index;
