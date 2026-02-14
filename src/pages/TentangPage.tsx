import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Eye, Users, Mail, Phone, MapPin } from "lucide-react";

const team = [
  { name: "Ir. Bambang Supriyadi, M.T.", role: "Kepala Dinas PUPR" },
  { name: "Dra. Siti Nurhaliza", role: "Kabid Tata Ruang" },
  { name: "Andi Prasetyo, S.T.", role: "Operator SIMTARU" },
  { name: "Rina Wulandari, S.Si.", role: "Analis GIS" },
];

const TentangPage = () => (
  <Layout>
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-primary">Tentang SIMTARU</h1>

      {/* Tujuan */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Eye className="h-5 w-5 text-accent" /> Tujuan Sistem</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          SIMTARU (Sistem Informasi Tata Ruang) Kabupaten Rembang dikembangkan untuk menyediakan akses informasi penataan ruang yang transparan, akurat, dan mudah diakses oleh seluruh pemangku kepentingan. Sistem ini bertujuan mendukung pengambilan keputusan dalam pemanfaatan dan pengendalian ruang wilayah kabupaten.
        </p>
      </section>

      {/* Landasan Hukum */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Scale className="h-5 w-5 text-accent" /> Landasan Hukum</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Undang-Undang No. 26 Tahun 2007 tentang Penataan Ruang</li>
          <li>Peraturan Pemerintah No. 21 Tahun 2021 tentang Penyelenggaraan Penataan Ruang</li>
          <li>Perda Kabupaten Rembang No. 14 Tahun 2011 tentang RTRW Kabupaten Rembang</li>
          <li>Peraturan Bupati Rembang terkait RDTR dan Peraturan Zonasi</li>
        </ul>
      </section>

      {/* Visi */}
      <section className="mb-8 rounded-lg bg-primary/5 p-6">
        <h2 className="mb-2 text-lg font-semibold text-primary">Visi Transparansi</h2>
        <p className="text-sm text-muted-foreground">
          Mewujudkan tata ruang Kabupaten Rembang yang terencana, terpadu, dan berkelanjutan melalui penyediaan informasi spasial yang terbuka dan partisipatif.
        </p>
      </section>

      {/* Tim */}
      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold"><Users className="h-5 w-5 text-accent" /> Tim Pengelola</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {team.map((t) => (
            <Card key={t.name} className="border-none shadow-sm">
              <CardContent className="p-4">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Kontak */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Kontak Dinas</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Jl. P. Diponegoro No. 88, Rembang, Jawa Tengah 59211</p>
          <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> simtaru@rembangkab.go.id</p>
          <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> (0295) 691 234</p>
        </div>
      </section>
    </div>
  </Layout>
);

export default TentangPage;
