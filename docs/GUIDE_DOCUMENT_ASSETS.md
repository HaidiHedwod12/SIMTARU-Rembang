# Panduan Penempatan Aset Dokumen Tata Ruang

Untuk mengintegrasikan file PDF dan gambar pratinjau untuk RDTR dan RTRW, silakan ikuti langkah-langkah berikut:

## 1. Lokasi Penempatan File
Simpan file Anda di folder `public/assets/dokumen/` (folder ini akan saya buatkan secara otomatis).

### A. File Dokumen (PDF)
Simpan file PDF dengan nama persis seperti berikut:
- `RDTR Perkotaan Lasem Kab Rembang.pdf`
- `RTRW Kabupaten Rembang.pdf`

### B. Gambar Pratinjau (JPG)
Simpan file gambar pratinjau dengan nama:
- `RDTR.jpg`
- `RTRW.jpg`

## 2. Struktur Folder
Struktur akhir seharusnya terlihat seperti ini:
```text
public/
└── assets/
    └── dokumen/
        ├── RDTR Perkotaan Lasem Kab Rembang.pdf
        ├── RTRW Kabupaten Rembang.pdf
        ├── RDTR.jpg
        └── RTRW.jpg
```

## 3. Implementasi Kode
Setelah file diletakkan, saya akan memperbarui bagian statistik di halaman Beranda agar tombol "UNDUH DOKUMEN RESMI" langsung mengarah ke file tersebut dan gambar pratinjau menampilkan file `.jpg` yang Anda sediakan.

> [!IMPORTANT]
> Pastikan nama file PDF tidak ada salah ketik (termasuk spasi) agar fitur unduhan berfungsi dengan baik.
