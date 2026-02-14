

# SIMTARU Kabupaten Rembang
**Sistem Informasi Tata Ruang — Frontend Prototype**

Portal pemerintah untuk informasi tata ruang Kabupaten Rembang. Desain profesional, formal, dan kredibel dengan data demo realistis. Tanpa backend — semua menggunakan mock data.

---

## Identitas Visual
- **Warna utama**: Deep Green (#1F5E3B) sebagai warna dominan
- **Aksen**: Gold (#D4A017) untuk hover, highlight, badge, dan icon
- **Background**: Putih / light gray, bersih dan lega
- **Logo**: Logo Kabupaten Rembang di navbar kiri atas (menggunakan logo yang diunggah)
- **Gaya**: Government-grade, formal, banyak white space, shadow lembut, tanpa animasi berlebihan

---

## Halaman 1 — Home (Landing Page)
- **Navbar sticky** dengan menu: Home, Peta Interaktif, Informasi Zonasi, Dokumen, Tentang, dan tombol Login
- **Hero section** dengan judul "SIMTARU Kabupaten Rembang", subtitle, dua tombol CTA (Jelajahi Peta & Informasi Zonasi), dan background pattern GIS/contour yang subtle
- **3 Feature cards** horizontal: Informasi Tata Ruang, Peta Interaktif, Unduh Dokumen
- **4 Statistik boxes**: 14 Kecamatan, 294 Desa/Kelurahan, 1 RDTR Aktif, 1 RTRW Berlaku
- **Footer** hijau tua dengan alamat dinas, email, kontak, dan copyright

## Halaman 2 — Peta Interaktif (Halaman Utama Terpenting)
- Layout full-width seperti GIS viewer profesional
- **Panel layer kiri** (collapsible) dengan checkbox: Batas Administrasi, RDTR Pola Ruang, RDTR Struktur Ruang, Kawasan Lindung, Jaringan Jalan, Sungai, Citra Satelit
- **Map area** menggunakan Leaflet dengan peta OpenStreetMap, centered di Kabupaten Rembang
- Fitur: zoom control, scale bar, legend, coordinate display, basemap switch, search bar
- Simulasi polygon berwarna untuk zona berbeda, klik polygon menampilkan popup detail
- Tombol Print, Export PDF, Download SHP (dummy) di pojok kanan atas
- Loading spinner simulasi

## Halaman 3 — Informasi Zonasi
- **Filter horizontal**: dropdown Kecamatan, Desa, Jenis Zona + search + tombol Filter
- **Tabel data** dengan 15-20 baris mock data (kolom: Kecamatan, Desa, Kode Zona, Nama Zona, Peruntukan, Status)
- Klik baris membuka **modal detail** dengan info zona lengkap (KDB, KLB, Ketinggian Maksimum, dll)
- Zebra row styling dan hover highlight

## Halaman 4 — Dokumen & Regulasi
- Search bar di atas halaman
- **Filter kategori** sidebar kiri: RTRW, RDTR, Perbup, Peta PDF, Lampiran Teknis
- **Grid 3 kolom** kartu dokumen berisi: icon, judul, tahun, deskripsi, tombol Download
- Mock data dokumen seperti "RTRW Kabupaten Rembang 2020–2040"

## Halaman 5 — Tentang SIMTARU
- Konten: tujuan sistem, landasan hukum, visi transparansi, tim pengelola (nama demo), dan kontak dinas
- Layout formal dan informatif

## Halaman 6 — Login (UI Only)
- Centered login card dengan logo, form username/password, tombol Login hijau
- Menampilkan info demo account (Admin, Operator, User) — tanpa autentikasi nyata

