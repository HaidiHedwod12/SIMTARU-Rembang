export interface Regulation {
    no: number;
    kawasan: string;
    peruntukkan: string;
    keterangan: string;
    boleh: string[];
    syarat: string[];
    tidak: string[];
}

export const regulationData: Regulation[] = [
    {
        no: 1,
        kawasan: "Kawasan Peruntukan Budidaya",
        peruntukkan: "Hutan Produksi Terbatas",
        keterangan: "-",
        boleh: [
            "pengembangan usaha kehutanan untuk menunjang kegiatan pemanfaatan hasil hutan",
            "penanaman tanaman jenis rimba pohon jati",
            "peternakan unggas",
            "peternakan ternak besar",
            "pembangunan jaringan irigasi"
        ],
        syarat: [
            "pemanfaatan hasil hutan untuk menjaga kestabilan neraca sumber daya kehutanan",
            "pemanfaatan lahan hutan untuk kepentingan pengelolaan hutan bersama masyarakat",
            "industri kecil dan menengah pengolah hasil hutan",
            "pembangunan prasarana dan sarana kepentingan umum",
            "pemanfaatan hutan untuk penelitian, pendidikan, pelatihan, religi & budaya",
            "pertambangan minyak dan gas bumi sesuai izin resmi",
            "pertanian hortikultura & tanaman pangan",
            "wisata dengan intensitas rendah",
            "penebangan pohon jati (terbatas/berizin)",
            "permukiman (khusus/terbatas)",
            "bangunan air & pemanfaatan mata air"
        ],
        tidak: [
            "kegiatan yang dapat merusak hutan produksi",
            "pengembangan kegiatan budidaya yang mengurangi luas hutan",
            "penebangan hutan tanpa izin dari instansi yang berwenang"
        ]
    },
    {
        no: 2,
        kawasan: "Kawasan Peruntukan Budidaya",
        peruntukkan: "Hutan Produksi Tetap",
        keterangan: "-",
        boleh: [
            "pengembangan usaha kehutanan untuk menunjang kegiatan pemanfaatan hasil hutan",
            "penanaman tanaman jenis rimba pohon jati",
            "peternakan unggas",
            "peternakan ternak besar",
            "pembangunan jaringan irigasi"
        ],
        syarat: [
            "pemanfaatan hasil hutan untuk menjaga kestabilan neraca",
            "pengelolaan hutan bersama masyarakat (PHBM)",
            "industri pengolah hasil hutan",
            "pembangunan sarana kepentingan umum",
            "kepentingan penelitian & pendidikan",
            "pertambangan migas (dengan izin)",
            "pertanian tanaman pangan & hortikultura",
            "pariwisata alam intensitas rendah",
            "permukiman terbatas",
            "bangunan air"
        ],
        tidak: [
            "kegiatan destruktif terhadap ekosistem hutan",
            "penggurulan atau pengurangan luas kawasan hutan secara ilegal",
            "aktivitas tanpa izin resmi dari kementerian/dinas terkait"
        ]
    },
    {
        no: 3,
        kawasan: "Kawasan Pemukiman",
        peruntukkan: "Pemukiman Perkotaan",
        keterangan: "-",
        boleh: [
            "pembangunan rumah tinggal tunggal",
            "pembangunan rumah deret",
            "pembangunan fasilitas umum skala lingkungan",
            "pembangunan taman bermain",
            "kegiatan perdagangan dan jasa skala lingkungan"
        ],
        syarat: [
            "pembangunan rumah susun (dengan kajian khusus)",
            "pembangunan perkantoran (terbatas)",
            "fasilitas kesehatan skala kelurahan",
            "industri rumah tangga (non-polusi)"
        ],
        tidak: [
            "pembangunan pabrik/industri skala besar",
            "kegiatan pergudangan",
            "kegiatan pertambangan",
            "pembangunan terminal bus"
        ]
    },
    {
        no: 4,
        kawasan: "Kawasan Perdagangan dan Jasa",
        peruntukkan: "Pusat Perbelanjaan dan Perkantoran",
        keterangan: "-",
        boleh: [
            "pembangunan pusat perbelanjaan (mall)",
            "pembangunan gedung perkantoran",
            "pembangunan ruko/rukan",
            "pembangunan hotel dan penginapan",
            "fasilitas parkir umum"
        ],
        syarat: [
            "pembangunan stasiun pengisian bahan bakar (SPBU)",
            "pembangunan fasilitas hiburan malam",
            "kegiatan industri kreatif (tanpa limbah cair berbahaya)"
        ],
        tidak: [
            "pembangunan rumah potong hewan",
            "kegiatan pertanian intensif",
            "penempatan tempat pembuangan akhir sampah"
        ]
    }
];
