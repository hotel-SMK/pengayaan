import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get GoogleGenAI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Endpoint: AI-assisted Program Generator
app.post('/api/generate-program', async (req, res) => {
  try {
    const {
      mataPelajaran,
      materi,
      kelas,
      semester,
      tahunPelajaran,
      tujuanPembelajaran,
      kktp,
      jenisInstrumen, // 'soal', 'projek', or 'keduanya'
      jumlahSoal,
      catatanTambahan,
    } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response handled gracefully
      return res.json({
        success: false,
        fallback: true,
        message: 'GEMINI_API_KEY tidak terdeteksi. Gunakan generator cerdas internal.',
      });
    }

    const prompt = `Anda adalah konsultan kurikulum dan pengawas pendidikan vokasi SMK berpengalaman di Indonesia (Kurikulum Merdeka).
Buatkan dokumen komprehensif untuk Program Remedial, Pengayaan, dan Tindak Lanjut untuk sekolah kejuruan (SMK Negeri 1 Bebandem).

DATA PEMBELAJARAN:
- Satuan Pendidikan: SMK Negeri 1 Bebandem
- Mata Pelajaran: ${mataPelajaran || 'Dasar-Dasar Kejuruan'}
- Materi Pokok: ${materi || 'Materi Pokok Kejuruan'}
- Kelas / Fase: ${kelas || 'Fase F / Kelas XI'}
- Semester: ${semester || 'Ganjil'}
- Tahun Pelajaran: ${tahunPelajaran || '2026/2027'}
- Kriteria Ketercapaian Tujuan Pembelajaran (KKTP/KKM): ${kktp || 75}
- Tujuan Pembelajaran (TP) yang diinput:
"${tujuanPembelajaran || 'Peserta didik mampu memahami dan menerapkan konsep dasar kejuruan sesuai standar industri.'}"
- Bentuk Instrumen Diinginkan: ${jenisInstrumen || 'keduanya (soal dan aktifitas projek)'}
- Jumlah Butir Soal: ${jumlahSoal || 5} butir
${catatanTambahan ? `- Catatan Khusus Guru: ${catatanTambahan}` : ''}

HASILKAN DALAM FORMAT JSON MURNI (tanpa markdown backtick, hanya JSON valid) dengan struktur sebagai berikut:
{
  "analisisDiagnostik": {
    "faktorKesulitan": ["faktor 1", "faktor 2", "faktor 3"],
    "akarMasalah": "Ringkasan akar penyebab siswa belum mencapai KKTP",
    "strategiIntervensi": "Metode intervensi pedagogik yang sesuai"
  },
  "programRemedial": {
    "deskripsi": "Deskripsi pelaksanaan program remedial yang disesuaikan dengan TP",
    "bentukKegiatan": "Tutor Sebaya / Bimbingan Kelompok / Pembelajaran Ulang berbasis Praktik",
    "alokasiWaktu": "2 x 45 Menit (atau alokasi sesuai SMK)",
    "langkahPembelajaran": [
      "Langkah 1: Identifikasi kelemahan spesifik TP",
      "Langkah 2: Rekontekstualisasi materi secara aplikatif",
      "Langkah 3: Pendampingan terbimbing",
      "Langkah 4: Asesmen remedial"
    ],
    "soalRemedial": [
      {
        "nomor": 1,
        "bentuk": "Pilihan Ganda / Uraian Terbimbing",
        "tujuanPembelajaranTerkait": "TP yang diuji",
        "pertanyaan": "Soal remedial yang spesifik, jelas, dan mengukur indikator TP",
        "opsi": ["A. ...", "B. ...", "C. ...", "D. ..."],
        "kunciJawaban": "Jawaban benar dan penjelasan singkat",
        "rubrikSkor": "Skor maksimal dan kriteria penilaian"
      }
    ],
    "projekRemedial": {
      "judulProjek": "Judul aktivitas projek remedial",
      "tujuanProjek": "Tujuan proyek terkait TP",
      "alatBahan": ["Alat/bahan 1", "Alat/bahan 2"],
      "langkahKerja": [
        "Tahap 1: Persiapan",
        "Tahap 2: Pelaksanaan",
        "Tahap 3: Pelaporan/Presentasi"
      ],
      "rubrikPenilaianProjek": [
        {"aspek": "Kesesuaian Prosedur", "skorMaksimal": 40, "kriteria": "Kriteria penilaian"},
        {"aspek": "Hasil Akhir / Produk", "skorMaksimal": 40, "kriteria": "Kriteria penilaian"},
        {"aspek": "Ketepatan Waktu & K3", "skorMaksimal": 20, "kriteria": "Kriteria penilaian"}
      ]
    }
  },
  "programPengayaan": {
    "deskripsi": "Deskripsi program pengayaan bagi siswa yang telah melampaui KKTP",
    "bentukKegiatan": "Eksplorasi Proyek Nyata / Mini Riset / Penugasan HOTS Mandiri",
    "alokasiWaktu": "2 x 45 Menit",
    "langkahPembelajaran": [
      "Langkah 1: Pemberian tantangan tingkat lanjut (advance/HOTS)",
      "Langkah 2: Eksplorasi mandiri dan studi kasus industri",
      "Langkah 3: Pembuatan portofolio/karya inovasi"
    ],
    "soalPengayaan": [
      {
        "nomor": 1,
        "bentuk": "Soal HOTS Studi Kasus",
        "pertanyaan": "Soal analisis tingkat tinggi (C4-C6) yang menuntut pemecahan masalah nyata",
        "kunciJawaban": "Panduan jawaban dan penalaran ilmiah/teknis",
        "rubrikSkor": "Kriteria penilaian analitis"
      }
    ],
    "projekPengayaan": {
      "judulProjek": "Judul aktivitas projek pengayaan (tingkat lanjut / inovatif)",
      "tujuanProjek": "Pengembangan kreativitas dan kesiapan dunia kerja",
      "alatBahan": ["Alat/bahan 1", "Alat/bahan 2"],
      "langkahKerja": [
        "Langkah 1: Analisis kebutuhan industri/studi kasus nyata",
        "Langkah 2: Pembuatan purwarupa/solusi komprehensif",
        "Langkah 3: Evaluasi dan pameran karya/presentasi"
      ],
      "rubrikPenilaianProjek": [
        {"aspek": "Inovasi & Kreativitas", "skorMaksimal": 35, "kriteria": "Kriteria penilaian"},
        {"aspek": "Kedalaman Teknis", "skorMaksimal": 45, "kriteria": "Kriteria penilaian"},
        {"aspek": "Dokumentasi & Presentasi", "skorMaksimal": 20, "kriteria": "Kriteria penilaian"}
      ]
    }
  },
  "programTindakLanjut": {
    "analisisEvaluasi": "Analisis ringkas terhadap efektivitas proses pembelajaran dan asesmen",
    "tindakLanjutSiswa": [
      {
        "kategori": "Siswa yang Tuntas Setelah Remedial",
        "tindakan": "Diberikan penguatan materi dan diizinkan melanjutkan ke TP berikutnya."
      },
      {
        "kategori": "Siswa yang Masih Belum Tuntas Setelah Remedial",
        "tindakan": "Diberikan pendampingan personal khusus, koordinasi dengan guru BK dan orang tua, serta penugasan alternatif berbasis portofolio."
      },
      {
        "kategori": "Siswa Peserta Pengayaan",
        "tindakan": "Diberikan apresiasi nilai tambah, diarahkan menjadi tutor sebaya dan disiapkan untuk ajang LKS / portofolio magang."
      }
    ],
    "tindakLanjutRefleksiGuru": [
      "Perbaikan modul ajar pada bagian diferensiasi proses",
      "Penambahan media pembelajaran interaktif/alat peraga bengkel",
      "Peningkatan asesmen formatif berkala selama pembelajaran"
    ],
    "rekomendasiWaliKelasDanOrangTua": "Rekomendasi tertulis bagi pihak wali kelas dan orang tua murid demi pendampingan belajar di rumah dan asrama.",
    "jadwalPelaksanaan": [
      {"kegiatan": "Asesmen Diagnostik & Analisis Hasil Asesmen", "waktu": "Minggu ke-1 setelah tes"},
      {"kegiatan": "Pelaksanaan Pembelajaran Remedial & Pengayaan", "waktu": "Minggu ke-2"},
      {"kegiatan": "Asesmen Ulang (Post-Test Remedial) & Evaluasi Produk Projek", "waktu": "Minggu ke-2"},
      {"kegiatan": "Pelaporan Nilai Akhir & Tindak Lanjut Lanjutan", "waktu": "Minggu ke-3"}
    ]
  }
}
Pastikan konten sangat kontekstual dengan materi dan TP yang diberikan!`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      // If backticks were added
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating program with Gemini:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Terjadi kesalahan saat memproses permintaan AI.',
    });
  }
});

// Production or Vite development middleware
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server SI-REMA running on http://localhost:${port}`);
  });
}

setupServer();
