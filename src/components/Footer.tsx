import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold">SIMTARU Kabupaten Rembang</h3>
          <p className="text-sm opacity-80">
            Sistem Informasi Tata Ruang Kabupaten Rembang — Portal resmi informasi penataan ruang untuk masyarakat dan pemangku kepentingan.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Kontak</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              Jl. P. Diponegoro No. 88, Rembang, Jawa Tengah 59211
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              simtaru@rembangkab.go.id
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              (0295) 691 234
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Tautan</h4>
          <ul className="space-y-1 text-sm opacity-80">
            <li>Dinas PUPR Kab. Rembang</li>
            <li>ATR/BPN Jawa Tengah</li>
            <li>Portal Data Rembang</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-primary-foreground/20 pt-4 text-center text-xs opacity-60">
        © 2024 Pemerintah Kabupaten Rembang. Hak cipta dilindungi.
      </div>
    </div>
  </footer>
);

export default Footer;
