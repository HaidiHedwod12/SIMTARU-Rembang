# Panduan Penempatan Gambar Ikonik Kecamatan

Untuk memperbarui gambar pratinjau kecamatan di halaman **Profil Daerah** dan **Statistik Beranda** dengan gambar lokal yang Anda miliki, silakan ikuti panduan berikut:

## 1. Lokasi Penempatan File
Simpan semua file gambar `.jpg` Anda di folder berikut (buat folder `kecamatan` jika belum ada):
`public/assets/kecamatan/`

## 2. Aturan Penamaan File
Pastikan nama file sesuai dengan nama kecamatan (Case Sensitive/Perhatikan Huruf Kapital) dan berakhiran `.jpg`.

**Daftar Penamaan:**
- `Kabupaten Rembang.jpg`
- `Rembang.jpg`
- `Lasem.jpg`
- `Kragan.jpg`
- `Pamotan.jpg`
- `Sedan.jpg`
- `Sluke.jpg`
- `Sarang.jpg`
- `Bulu.jpg`
- `Gunem.jpg`
- `Kaliori.jpg`
- `Pancur.jpg`
- `Sumber.jpg`
- `Sulang.jpg`
- `Sale.jpg`

## 3. Cara Penggunaan di Kode
Setelah gambar ditempatkan di folder tersebut, Anda dapat memperbarui file `src/data/kecamatan.ts`. 

Ubah bagian `image:` pada setiap data kecamatan menjadi:
`image: "/assets/kecamatan/NamaKecamatan.jpg"`

**Contoh untuk Kragan:**
```typescript
{
    id: "kragan",
    name: "Kragan",
    image: "/assets/kecamatan/Kragan.jpg",
    // ... data lainnya
}
```

> [!TIP]
> Menggunakan folder `public` memungkinkan gambar diakses langsung melalui URL tanpa perlu proses kompilasi tambahan dari Vite, sehingga lebih cepat dan mudah dikelola.
