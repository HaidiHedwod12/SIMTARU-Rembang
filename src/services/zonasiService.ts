import { regulationData, Regulation } from "../data/zonasi";

export interface ComplianceInput {
    jenisKegiatan: string;
    jumlahLantai: number;
    luasBangunan: number;
}

export interface ComplianceResult {
    zona: Regulation;
    status: "Diizinkan" | "Bersyarat" | "Tidak Diizinkan";
    ringkasan: string;
    isSimulated: boolean;
}

/**
 * Simulasi identifikasi zona berdasarkan koordinat atau polygon.
 */
export const identifikasiZona = async (latlngOrPolygon: any): Promise<Regulation> => {
    // Simulasi delay pencarian spasial
    await new Promise(resolve => setTimeout(resolve, 800));

    // Pilih secara acak dari data agar bervariasi
    const seed = Math.floor(Math.random() * regulationData.length);
    return regulationData[seed];
};

/**
 * Logika pengecekan kesesuaian berdasarkan peraturan zona dan input user.
 */
export const cekKesesuaian = (zona: Regulation, input: ComplianceInput): ComplianceResult => {
    const { jenisKegiatan, jumlahLantai, luasBangunan } = input;
    const kegiatanLower = jenisKegiatan.toLowerCase();

    // Keyword matching sederhana (simulasi)
    const isMatch = (list: string[], query: string) => {
        return list.some(item => {
            const itemLower = item.toLowerCase();
            return itemLower.includes(query) || query.includes(itemLower);
        });
    };

    let status: ComplianceResult["status"] = "Tidak Diizinkan";
    let ringkasan = "";

    if (isMatch(zona.boleh, kegiatanLower)) {
        status = "Diizinkan";
        ringkasan = `Kegiatan ${jenisKegiatan} diperbolehkan di zona ${zona.peruntukkan}. `;
    } else if (isMatch(zona.syarat, kegiatanLower)) {
        status = "Bersyarat";
        ringkasan = `Kegiatan ${jenisKegiatan} diperbolehkan di zona ${zona.peruntukkan} dengan persyaratan tertentu. `;
    } else {
        status = "Tidak Diizinkan";
        ringkasan = `Kegiatan ${jenisKegiatan} tidak diperbolehkan di zona ${zona.peruntukkan} sesuai dengan rencana pola ruang yang berlaku. `;
    }

    // Tambahan logika dummy berdasarkan luas dan lantai
    if (status !== "Tidak Diizinkan") {
        if (luasBangunan > 500 && zona.peruntukkan.includes("Pemukiman")) {
            status = "Bersyarat";
            ringkasan += "Luas bangunan melebihi ambang batas rumah tinggal standar, diperlukan ijin khusus lingkungan.";
        } else if (jumlahLantai > 3 && zona.peruntukkan.includes("Pemukiman")) {
            status = "Bersyarat";
            ringkasan += "Ketinggian bangunan di atas 3 lantai memerlukan kajian struktur dan GSP (Garis Sempadan Pagar).";
        } else {
            ringkasan += "Pastikan tetap mengikuti standar teknis bangunan yang berlaku (KDB & KLB).";
        }
    }

    return {
        zona,
        status,
        ringkasan,
        isSimulated: true
    };
};
