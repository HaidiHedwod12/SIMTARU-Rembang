import { useState } from "react";
import Layout from "@/components/Layout";
import { dokumenData, kategoriDokumen } from "@/data/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, Eye } from "lucide-react";

const DokumenPage = () => {
  const [kategori, setKategori] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = dokumenData.filter((d) => {
    if (kategori !== "Semua" && d.kategori !== kategori) return false;
    if (search && !d.judul.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-primary">Dokumen & Regulasi</h1>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari dokumen..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden w-48 shrink-0 md:block">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</h3>
            <ul className="space-y-1">
              {["Semua", ...kategoriDokumen].map((k) => (
                <li key={k}>
                  <button
                    onClick={() => setKategori(k)}
                    className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${kategori === k ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"}`}
                  >
                    {k}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Mobile filter */}
            <div className="mb-4 flex flex-wrap gap-2 md:hidden">
              {["Semua", ...kategoriDokumen].map((k) => (
                <Badge
                  key={k}
                  variant={kategori === k ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setKategori(k)}
                >
                  {k}
                </Badge>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => (
                <Card key={d.id} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="mb-2 w-fit text-xs">{d.kategori}</Badge>
                    <h3 className="mb-1 text-sm font-semibold leading-snug">{d.judul}</h3>
                    <p className="mb-1 text-xs text-muted-foreground">Tahun: {d.tahun}</p>
                    <p className="mb-4 flex-1 text-xs text-muted-foreground">{d.deskripsi}</p>
                    <div className="mt-auto grid grid-cols-2 gap-2">
                      {d.file ? (
                        <>
                          <a href={`/assets/dokumen/${d.file}`} download className="block">
                            <Button size="sm" variant="outline" className="w-full gap-1 border-primary/20 text-primary hover:bg-primary/5">
                              <Download className="h-3.5 w-3.5" /> Unduh
                            </Button>
                          </a>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="w-full gap-1"
                          >
                            <a
                              href={`/assets/dokumen/${d.file}?preview=1`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye className="h-3.5 w-3.5" /> Pratinjau
                            </a>
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="col-span-2 gap-1">
                          <Download className="h-3.5 w-3.5" /> Unduh
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">Tidak ada dokumen ditemukan.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DokumenPage;
