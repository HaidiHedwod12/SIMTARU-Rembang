import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-kabupaten-rembang.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Beranda", path: "/" },
  {
    label: "Profil",
    path: "/profil",
    items: [
      { label: "Profil Daerah", path: "/profil/daerah" },
      { label: "Profil DPUPR", path: "/profil/dpupr" },
      { label: "Profil Kabupaten Rembang", path: "/profil/kabupaten" },
    ],
  },
  { label: "Peta Interaktif", path: "/peta" },
  { label: "Dokumen", path: "/dokumen" },
  { label: "Peruntukkan Tata Ruang", path: "/zonasi" },
  {
    label: "FPR",
    path: "/fpr",
    items: [
      { label: "Profil FPR", path: "/fpr/profil" },
      { label: "Agenda FPR", path: "/fpr/agenda" },
    ],
  },
  { label: "Berita", path: "/berita" },
  { label: "Agenda", path: "/agenda" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-card/70 shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2 transition-all hover:opacity-90">
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/30 transition-all" />
            <img src={logo} alt="Logo" className="relative h-9 w-9 object-contain drop-shadow-[0_0_8px_rgba(34,197,94,0.3)] transition-transform duration-500 group-hover:scale-110 md:h-11 md:w-11" />
          </div>
          <div className="flex flex-col justify-center leading-none">
            <span className="whitespace-nowrap text-[11px] font-black tracking-wide text-foreground/90 uppercase md:text-sm lg:text-base">
              Sistem Informasi Tata Ruang
            </span>
            <span className="text-[8px] font-bold tracking-[0.2em] text-primary uppercase md:text-[10px]">
              Kabupaten Rembang
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {navLinks.map((l) => {
            const isActive = location.pathname === l.path || location.pathname.startsWith(l.path + "/");

            if (l.items) {
              return (
                <DropdownMenu key={l.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`relative flex items-center gap-1 rounded-xl px-2.5 py-2 text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                        }`}
                    >
                      {l.label}
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 rounded-xl border-primary/20 bg-card/95 p-2 backdrop-blur-xl">
                    {l.items.map((sub) => (
                      <DropdownMenuItem key={sub.path} asChild>
                        <Link
                          to={sub.path}
                          className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-bold text-foreground/70 transition-all hover:bg-primary/10 hover:text-primary whitespace-nowrap"
                        >
                          {sub.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Link
                key={l.path}
                to={l.path}
                className={`relative rounded-xl px-2.5 py-2 text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${isActive
                  ? "bg-primary/10 text-primary shadow-[inset_0_0_12px_rgba(34,197,94,0.1)]"
                  : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                {l.label}
                {location.pathname === l.path && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                )}
              </Link>
            );
          })}
          <div className="ml-1 h-6 w-[1px] bg-border/50" />
          <Link to="/login" className="flex-shrink-0">
            <Button size="sm" className="ml-2 group relative overflow-hidden rounded-xl bg-primary px-5 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] whitespace-nowrap">
              <span className="relative z-10 flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Masuk
              </span>
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="rounded-xl bg-muted/50 p-2 text-foreground/80 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-primary/10 bg-card/90 px-4 py-6 backdrop-blur-2xl md:hidden max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <div key={l.label}>
                {l.items ? (
                  <div className="space-y-1">
                    <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary/60">
                      {l.label}
                    </div>
                    {l.items.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center rounded-xl px-4 py-3 text-sm font-bold transition-all ${location.pathname === sub.path
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/70 active:bg-muted"
                          }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={l.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center rounded-xl px-4 py-3 text-sm font-bold transition-all ${location.pathname === l.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 active:bg-muted"
                      }`}
                  >
                    {l.label}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="mt-4">
              <Button size="lg" className="w-full gap-2 rounded-xl font-bold">
                <LogIn className="h-4 w-4" /> Masuk ke Sistem
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
