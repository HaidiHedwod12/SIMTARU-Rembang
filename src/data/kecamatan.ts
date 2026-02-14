export interface Kecamatan {
    id: string;
    name: string;
    image: string;
    description: string;
    luas: string;
    penduduk: string;
    desa: number;
    iconicPlace: string;
    history: string;
}

export const KECAMATAN_DATA: Kecamatan[] = [
    {
        id: "rembang",
        name: "Rembang",
        image: "/assets/kecamatan/Rembang.jpg",
        description: "Ibu kota kabupaten yang menjadi pusat pemerintahan dan ekonomi dengan garis pantai yang landai.",
        luas: "61,54 km²",
        penduduk: "~92.000",
        desa: 34,
        iconicPlace: "Alun-alun Rembang & Pantai Dampo Awang",
        history: "Sebagai pusat administrasi sejak zaman kolonial, Rembang merupakan titik temu perdagangan maritim di pesisir utara."
    },
    {
        id: "lasem",
        name: "Lasem",
        image: "/assets/kecamatan/Lasem.jpg",
        description: "Kota Pusaka yang dikenal sebagai 'Tiongkok Kecil' dengan kekayaan arsitektur budaya Tionghoa dan Jawa.",
        luas: "47,19 km²",
        penduduk: "~50.000",
        desa: 20,
        iconicPlace: "Vihara Ratanavana Arama & Kawasan Pecinan",
        history: "Lasem dulunya merupakan pelabuhan besar and pusat penyebaran agama serta industri batik tulis yang legendaris."
    },
    {
        id: "sarang",
        name: "Sarang",
        image: "/assets/kecamatan/Sarang.jpg",
        description: "Kecamatan paling timur yang berbatasan langsung dengan Jawa Timur, dikenal sebagai pusat pesantren.",
        luas: "57,51 km²",
        penduduk: "~62.000",
        desa: 23,
        iconicPlace: "Pantai Sarang & Kawasan Santri",
        history: "Dikenal sebagai 'Kota Santri' di wilayah timur, Sarang memiliki peran besar dalam pendidikan Islam di Jawa Tengah."
    },
    {
        id: "sluke",
        name: "Sluke",
        image: "/assets/kecamatan/Sluke.jpg",
        description: "Kawasan pesisir dengan potensi industri maritim dan pelabuhan internasional yang sedang berkembang.",
        luas: "37,61 km²",
        penduduk: "~30.000",
        desa: 13,
        iconicPlace: "Pelabuhan Tanjung Bonang",
        history: "Secara historis merupakan daerah nelayan, kini bertransformasi menjadi koridor industri penting di jalur Pantura."
    },
    {
        id: "kragan",
        name: "Kragan",
        image: "/assets/kecamatan/Kragan.jpg",
        description: "Kecamatan pesisir yang dikenal dengan industri kapal tradisional dan hasil lautnya yang melimpah.",
        luas: "51,64 km²",
        penduduk: "~65.000",
        desa: 27,
        iconicPlace: "Sentra Pembuatan Kapal Tradisional",
        history: "Kragan memiliki tradisi maritim yang kuat, terutama dalam pembuatan kapal kayu yang dipasarkan hingga ke luar daerah."
    },
    {
        id: "pamotan",
        name: "Pamotan",
        image: "/assets/kecamatan/Pamotan.jpg",
        description: "Titik temu jalur transportasi darat yang menghubungkan Rembang bagian utara dan selatan.",
        luas: "80,62 km²",
        penduduk: "~50.000",
        desa: 23,
        iconicPlace: "Pasar Pamotan",
        history: "Menjadi pusat perdagangan palawija dan hasil bumi dari wilayah perbukitan Kapur Utara."
    },
    {
        id: "sulang",
        name: "Sulang",
        image: "/assets/kecamatan/Sulang.jpg",
        description: "Wilayah yang didominasi perkebunan tembakau dan menjadi salah satu penghasil kualitas terbaik.",
        luas: "84,40 km²",
        penduduk: "~38.000",
        desa: 21,
        iconicPlace: "Lahan Tembakau Sulang",
        history: "Tradisi menanam tembakau di Sulang telah berlangsung turun-temurun, didukung oleh kondisi tanah yang spesifik."
    },
    {
        id: "gunem",
        name: "Gunem",
        image: "/assets/kecamatan/Gunem.jpg",
        description: "Kecamatan di wilayah perbukitan dengan potensi sumber daya alam kapur yang melimpah.",
        luas: "84,80 km²",
        penduduk: "~24.000",
        desa: 16,
        iconicPlace: "Kawasan Pegunungan Kendeng",
        history: "Menjadi lokasi strategis untuk industri semen nasional karena kandungan mineral perbukitannya."
    },
    {
        id: "bulu",
        name: "Bulu",
        image: "/assets/kecamatan/Bulu.jpg",
        description: "Pintu masuk dari arah selatan yang memiliki kawasan hutan jati yang asri dan udara sejuk.",
        luas: "101,1 km²",
        penduduk: "~27.000",
        desa: 16,
        iconicPlace: "Makam R.A. Kartini (Mantingan)",
        history: "Sangat ikonik sebagai tempat peristirahatan terakhir tokoh emansipasi wanita Indonesia."
    },
    {
        id: "sale",
        name: "Sale",
        image: "/assets/kecamatan/Sale.jpg",
        description: "Wilayah subur dengan sumber mata air alami yang melimpah di lereng pegunungan.",
        luas: "109,7 km²",
        penduduk: "~39.000",
        desa: 15,
        iconicPlace: "Pemandian Sumber Semen",
        history: "Dikenal sebagai daerah konservasi air yang menyuplai kebutuhan air bersih bagi warga sekitarnya."
    },
    {
        id: "pancur",
        name: "Pancur",
        image: "/assets/kecamatan/Pancur.jpg",
        description: "Daerah transisi antara pesisir dan perbukitan dengan kerajinan UMKM yang variatif.",
        luas: "42,93 km²",
        penduduk: "~30.000",
        desa: 23,
        iconicPlace: "Sentra Kerajinan Pancur",
        history: "Wilayah pendukung Lasem yang memiliki keunikan perpaduan budaya maritim dan agraris."
    },
    {
        id: "kaliori",
        name: "Kaliori",
        image: "/assets/kecamatan/Kaliori.jpg",
        description: "Gerbang masuk dari arah Barat (Pati), didominasi oleh tambak garam dan perikanan air payau.",
        luas: "61,30 km²",
        penduduk: "~41.000",
        desa: 23,
        iconicPlace: "Garam Kaliori & Pantai Pasir Putih",
        history: "Salah satu penghasil garam tradisional terbesar di Rembang dengan teknik kristalisasi yang khas."
    },
    {
        id: "sumber",
        name: "Sumber",
        image: "/assets/kecamatan/Sumber.jpg",
        description: "Kawasan dengan hamparan lahan jagung dan kedelai di wilayah selatan-barat.",
        luas: "77,88 km²",
        penduduk: "~35.000",
        desa: 18,
        iconicPlace: "Waduk Banyukuwung",
        history: "Daerah yang berkembang pesat sebagai pusat pertanian palawija penunjang ketahanan pangan daerah."
    },
    {
        id: "sedan",
        name: "Sedan",
        image: "/assets/kecamatan/Sedan.jpg",
        description: "Wilayah perbukitan di lereng Gunung Lasem yang sejuk, dikenal sebagai sentra pendidikan dan agribisnis.",
        luas: "51,56 km²",
        penduduk: "~55.000",
        desa: 21,
        iconicPlace: "Kawasan Wisata Lereng Lasem",
        history: "Sedan berkembang sebagai pusat aktivitas ekonomi di wilayah timur laut Rembang dengan basis agraris dan pesantren yang kuat."
    }
];
