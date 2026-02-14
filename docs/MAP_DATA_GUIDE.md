# Panduan Data Spasial (GeoJSON) - SIMTARU Rembang

Untuk menampilkan data pada halaman **Peta Interaktif**, file GeoJSON harus diletakkan di folder `public/data/map/` dengan penamaan yang spesifik agar terbaca oleh sistem.

## Lokasi File
```
public/
└── data/
    └── map/
        ├── batas_kabupaten.json
        ├── batas_kecamatan.json
        ├── batas_desa.json
        ├── jaringan_jalan.json
        ├── sungai.json
        └── rtrw_pola_ruang.json
```

## Daftar Nama File & Layer
Berikut adalah padanan antara Layer di aplikasi dengan nama file yang dibutuhkan:

| Kategori | Nama Layer | Nama File GeoJSON | Tipe Data |
| :--- | :--- | :--- | :--- |
| **Batas Administrasi** | Batas Kabupaten | `batas_kabupaten.json` | Polygon |
| **Batas Administrasi** | Batas Kecamatan | `batas_kecamatan.json` | Polygon |
| **Batas Administrasi** | Batas Desa | `batas_desa.json` | Polygon |
| **Jaringan Transportasi**| Jaringan Jalan | `jaringan_jalan.json` | LineString |
| **Perairan** | Sungai | `sungai.json` | LineString |
| **Rencana Tata Ruang** | RTRW Pola Ruang | `rtrw_pola_ruang.json` | Polygon (Pola) |
| **Rencana Tata Ruang** | RDTR Perkotaan Lasem| `rdtr_lasem.json` | Polygon (Pola) |

## Catatan Penting
1. **Format File**: Pastikan file menggunakan format `.json` (atau ganti ekstensi `.geojson` menjadi `.json`).
2. **Atribut Spasial**: 
   - Untuk layer **RTRW Pola Ruang**, sistem mencari properti `NAMOBJ` atau `pola_ruang` untuk memberikan pewarnaan otomatis (Hutan, Sawah, Permukiman, Industri).
   - Pastikan koordinat menggunakan sistem proyeksi **WGS 84 (EPSG:4326)** agar muncul di posisi yang benar pada peta.
3. **Popup Info**: Sistem akan secara otomatis menampilkan semua atribut yang ada di dalam `properties`. Namun, kolom berikut akan dijadikan **Judul Utama** di bagian atas popup agar lebih rapi:
   - Batas Kabupaten: `Nama_Wilayah_Administrasi_Kabupaten/Kota`
   - Batas Kecamatan: `Nama_Wilayah_Administrasi_Kecamatan/Distirk`
   - Batas Desa: `Nama_Wilayah_Administrasi_Kelurahan/Desa`
   - Jaringan Jalan: `Fungsi_Jalan`
   - Sungai: `Nama_Wilayah_Sungai`
