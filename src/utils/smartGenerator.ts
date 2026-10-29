import {
  FullProgramData,
  IdentitasDokumen,
  SiswaItem,
  SiswaPengayaanItem,
} from '../types';

export const INITIAL_IDENTITAS: IdentitasDokumen = {
  namaProvinsi: 'PEMERINTAH PROVINSI BALI',
  namaDinas: 'DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA',
  namaSekolah: 'SMK NEGERI 1 BEBANDEM',
  alamatSekolah: 'Jl. Kuncara Giri, Sibetan, Bebandem, Karangasem, Bali.',
  teleponSekolah: '(0363) 22345 / smkn1bebandem@gmail.com',
  websiteSekolah: 'smkn1bebandem.sch.id',
  tahunPelajaran: '2026/2027',
  semester: 'Ganjil',
  mataPelajaran: 'Konsentrasi Keahlian Teknik Komputer dan Jaringan',
  materi: 'Konfigurasi Jaringan Routing Statis dan Dinamis (OSPF)',
  kelas: 'Fase F / Kelas XI TKJ 1',
  kktp: 75,
  tujuanPembelajaran: 'Peserta didik mampu melakukan konfigurasi routing statis dan routing dinamis OSPF pada perangkat router jaringan serta menganalisis pengujian konektivitas antarnode sesuai standar industri.',
  namaGuru: 'I Made Sujana, S.Pd., M.Kom.',
  nipGuru: '19880415 201402 1 003',
  namaKepalaSekolah: 'I Wayan Darmayasa, S.T.,M.Si.',
  nipKepalaSekolah: '19730522 200501 1 009',
  tempatDokumen: 'Bebandem',
  tanggalDokumen: '28 Oktober 2026',
};

export const INITIAL_SISWA_REMEDIAL: SiswaItem[] = [
  {
    id: 's1',
    no: 1,
    nama: 'I Gede Agus Pratama',
    nis: '24251001',
    nilaiAwal: 62,
    tpBelumTuntas: 'Membedakan parameter gateway pada routing statis',
    bentukRemedial: 'Bimbingan khusus dan penugasan soal terstruktur',
    nilaiAkhir: 78,
    status: 'Tuntas',
  },
  {
    id: 's2',
    no: 2,
    nama: 'Ni Kadek Ayu Lestari',
    nis: '24251002',
    nilaiAwal: 65,
    tpBelumTuntas: 'Konfigurasi IP table routing dinamis OSPF',
    bentukRemedial: 'Tutor sebaya dan praktik ulang di laboratorium',
    nilaiAkhir: 80,
    status: 'Tuntas',
  },
  {
    id: 's3',
    no: 3,
    nama: 'I Komang Satria Wibawa',
    nis: '24251003',
    nilaiAwal: 58,
    tpBelumTuntas: 'Troubleshooting kegagalan ping antar segmen VLAN',
    bentukRemedial: 'Pembelajaran ulang konsep dasar dan tugas projek terarah',
    nilaiAkhir: 76,
    status: 'Tuntas',
  },
  {
    id: 's4',
    no: 4,
    nama: 'Ni Putu Desi Anggraini',
    nis: '24251004',
    nilaiAwal: 68,
    tpBelumTuntas: 'Analisis tabel routing dan cost metric',
    bentukRemedial: 'Penugasan soal latihan mandiri dengan umpan balik cepat',
    nilaiAkhir: 82,
    status: 'Tuntas',
  },
  {
    id: 's5',
    no: 5,
    nama: 'I Ketut Aditya Dharma',
    nis: '24251005',
    nilaiAwal: 60,
    tpBelumTuntas: 'Verifikasi jalur traceroute dan default gateway',
    bentukRemedial: 'Bimbingan kelompok kecil dan simulasi software',
    nilaiAkhir: 78,
    status: 'Tuntas',
  },
];

export const INITIAL_SISWA_PENGAYAAN: SiswaPengayaanItem[] = [
  {
    id: 'p1',
    no: 1,
    nama: 'I Wayan Arya Mahardika',
    nis: '24251006',
    nilaiAwal: 88,
    bentukPengayaan: 'Eksplorasi perancangan topologi multi-area OSPF dan failover routing',
    nilaiPengayaan: 95,
    keterangan: 'Sangat Memuaskan / Ditunjuk sebagai Tutor Sebaya',
  },
  {
    id: 'p2',
    no: 2,
    nama: 'Ni Made Gita Suasti',
    nis: '24251007',
    nilaiAwal: 92,
    bentukPengayaan: 'Mini riset perbandingan efisiensi protokol routing statis vs OSPF v2',
    nilaiPengayaan: 96,
    keterangan: 'Sangat Baik / Disiapkan untuk Seleksi LKS SMK',
  },
  {
    id: 'p3',
    no: 3,
    nama: 'I Gusti Ngurah Agung Bayu',
    nis: '24251008',
    nilaiAwal: 85,
    bentukPengayaan: 'Pembuatan modul panduan praktis konfigurasi router untuk adik kelas',
    nilaiPengayaan: 90,
    keterangan: 'Sangat Baik / Portofolio Kejuruan',
  },
  {
    id: 'p4',
    no: 4,
    nama: 'Ni Wayan Sari Murni',
    nis: '24251009',
    nilaiAwal: 90,
    bentukPengayaan: 'Simulasi topologi jaringan industri skala menengah pada Cisco Packet Tracer',
    nilaiPengayaan: 94,
    keterangan: 'Sangat Memuaskan / Berpikir Kritis Tinggi',
  },
];

export function buildFallbackProgram(identitas: IdentitasDokumen): FullProgramData {
  const mapel = identitas.mataPelajaran || 'Mata Pelajaran Kejuruan';
  const materi = identitas.materi || 'Materi Pokok';
  const tp = identitas.tujuanPembelajaran || 'Peserta didik memahami materi pembelajaran sesuai standar kompetensi.';
  const kktp = identitas.kktp || 75;

  return {
    identitas,
    analisisDiagnostik: {
      faktorKesulitan: [
        `Sebagian peserta didik masih mengalami miskonsepsi pada konsep fundamental materi "${materi}".`,
        `Keterbatasan jam latihan mandiri dan kebutuhan scaffolding bertahap dalam mengimplementasikan indikator pada TP: "${tp.slice(0, 80)}...".`,
        'Perlunya visualisasi contoh konkret dan studi kasus terapan di lingkungan industri vokasi.',
      ],
      akarMasalah: `Peserta didik yang belum tuntas KKTP (${kktp}) membutuhkan pendekatan pembelajaran berpusat pada siswa dengan pembagian materi ke dalam unit-unit kecil (chunking) dan pendampingan praktik langsung.`,
      strategiIntervensi:
        'Pemberian bimbingan perorangan, penyederhanaan instruksi kerja, kolaborasi tutor sebaya, dan evaluasi berbasis unjuk kerja atau tugas projek aplikatif.',
    },
    programRemedial: {
      deskripsi: `Program pembelajaran remedial dirancang khusus untuk memfasilitasi peserta didik yang belum mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP ${kktp}) pada materi ${materi}. Program ini berfokus langsung pada penguatan indikator esensial TP: "${tp}".`,
      bentukKegiatan: 'Kombinasi Pembelajaran Ulang Terbimbing, Tutor Sebaya, dan Penugasan Projek Ringkas',
      alokasiWaktu: '2 x 45 Menit (di luar jam reguler atau sesi khusus bengkel/lab)',
      langkahPembelajaran: [
        'Tahap 1 - Identifikasi Defisit Belajar: Menganalisis kesalahan pada lembar asesmen formatif sebelumnya.',
        'Tahap 2 - Rekonstruksi Pemahaman Konseptual: Penjelasan ulang konsep esensial menggunakan bagan visual, video tutorial, atau demonstrasi alat peraga.',
        'Tahap 3 - Latihan Terbimbing (Guided Practice): Peserta didik mempraktikkan atau mengerjakan latihan bertahap dengan pendampingan langsung guru atau tutor sebaya.',
        'Tahap 4 - Asesmen Ulang (Post-Test): Pengerjaan instrumen asesmen remedial atau evaluasi tugas projek perbaikan.',
      ],
      soalRemedial: [
        {
          nomor: 1,
          bentuk: 'Pilihan Ganda Berbantuan Analisis',
          tujuanPembelajaranTerkait: tp,
          pertanyaan: `Pada materi ${materi}, manakah di antara pernyataan berikut yang paling tepat menggambarkan fungsi utama dari konsep yang dipelajari sesuai prosedur standar?`,
          opsi: [
            'A. Mengoptimalkan alur kerja dan meminimalisir kesalahan operasional secara sistematis',
            'B. Menghilangkan seluruh proses verifikasi awal guna mempercepat penyelesaian kerja',
            'C. Mengganti seluruh standar operasional prosedur tanpa pertimbangan teknis',
            'D. Mengabaikan aspek keselamatan dan dokumentasi hasil kerja',
          ],
          kunciJawaban:
            'A. Mengoptimalkan alur kerja dan meminimalisir kesalahan operasional secara sistematis. (Penjelasan: Sesuai TP, pemahaman esensial menekankan efisiensi, akurasi prosedur, dan kepatuhan terhadap standar teknis kejuruan).',
          rubrikSkor: 'Skor 20: Menjawab benar A | Skor 0: Menjawab selain A.',
        },
        {
          nomor: 2,
          bentuk: 'Uraian Pemahaman Konseptual',
          tujuanPembelajaranTerkait: tp,
          pertanyaan: `Jelaskan secara ringkas 3 (tiga) tahapan penting yang wajib dilakukan dalam melaksanakan ${materi} agar hasil kerja memenuhi standar kualitas yang diharapkan!`,
          opsi: [],
          kunciJawaban:
            'Jawaban ideal mencakup: 1) Tahap persiapan (pemeriksaan alat/bahan/skenario), 2) Tahap pelaksanaan teknis sesuai SOP dan parameter yang tepat, 3) Tahap pengujian, verifikasi hasil, dan dokumentasi.',
          rubrikSkor:
            'Skor 25: Menjelaskan 3 tahap lengkap dan logis | Skor 15: Menjelaskan 2 tahap | Skor 10: Menjelaskan 1 tahap | Skor 0: Salah/tidak menjawab.',
        },
        {
          nomor: 3,
          bentuk: 'Studi Kasus Sederhana (Troubleshooting)',
          tujuanPembelajaranTerkait: tp,
          pertanyaan: `Apabila terjadi ketidaksesuaian hasil atau kendala teknis saat mempraktikkan ${materi}, sebutkan langkah diagnostik pertama yang harus diambil dan bagaimana solusi penyelesaiannya!`,
          opsi: [],
          kunciJawaban:
            'Melakukan pengecekan parameter awal, mengidentifikasi pesan indikator kesalahan, meneliti sambungan/konfigurasi, dan melakukan penyesuaian ulang parameter sesuai spesifikasi baku.',
          rubrikSkor:
            'Skor 25: Solusi runtut dan relevan secara teknis | Skor 15: Solusi cukup tepat namun kurang mendalam | Skor 5: Kurang tepat.',
        },
        {
          nomor: 4,
          bentuk: 'Uraian Aplikatif',
          tujuanPembelajaranTerkait: tp,
          pertanyaan: `Bagaimanakah penerapan prinsip keselamatan kerja (K3) dan ketelitian saat menyelesaikan tugas pada lingkup materi ${materi}?`,
          opsi: [],
          kunciJawaban:
            'Memastikan area kerja bersih, menggunakan perlengkapan pelindung yang disyaratkan, mematuhi urutan instruksi kerja, serta merapikan kembali perangkat setelah selesai.',
          rubrikSkor:
            'Skor 30: Menyebutkan prinsip K3 dan ketelitian kerja secara lengkap | Skor 15: Cukup lengkap | Skor 5: Minimal.',
        },
      ],
      projekRemedial: {
        judulProjek: `Mini Projek Perbaikan: Implementasi Alur Kerja Standar pada ${materi}`,
        tujuanProjek: `Membuktikan pencapaian kompetensi pada TP: "${tp}" melalui pembuatan lembar kerja praktik atau demonstrasi kerja terstruktur.`,
        alatBahan: [
          'Lembar Kerja Peserta Didik (LKPD) Remedial',
          'Perangkat komputer / alat praktik kejuruan standar lab bengkel',
          'Buku referensi / modul ajar digital',
          'Format laporan ringkas hasil pengujian',
        ],
        langkahKerja: [
          '1. Membaca lembar instruksi kerja projek remedial dengan cermat.',
          '2. Menyiapkan perangkat dan parameter teknis yang disyaratkan.',
          '3. Melaksanakan langkah demi langkah instruksi kerja dengan mencatat setiap parameter penting.',
          '4. Melakukan verifikasi mandiri bersama guru pendamping.',
          '5. Membuat kesimpulan ringkas 1 halaman mengenai pemecahan masalah yang dilakukan.',
        ],
        rubrikPenilaianProjek: [
          {
            aspek: 'Kesesuaian Prosedur & Langkah Kerja',
            skorMaksimal: 35,
            kriteria: 'Peserta didik menjalankan tahapan secara urut, tepat, dan memperhatikan SOP.',
          },
          {
            aspek: 'Kualitas Hasil / Fungsi Produk',
            skorMaksimal: 45,
            kriteria: 'Hasil praktik/penugasan berfungsi dengan baik dan parameter memenuhi standar TP.',
          },
          {
            aspek: 'Sikap Kerja, Ketepatan Waktu & K3',
            skorMaksimal: 20,
            kriteria: 'Disiplin, menjaga kebersihan alat/lingkungan, dan mengumpulkan tepat waktu.',
          },
        ],
      },
    },
    programPengayaan: {
      deskripsi: `Program pengayaan disediakan bagi peserta didik yang telah melampaui KKTP (${kktp}). Pembelajaran difokuskan pada pengayaan analitis bernalar kritis (HOTS), penguatan portofolio kejuruan, pemecahan masalah kompleks dunia industri, dan peran kepemimpinan sebagai tutor sebaya.`,
      bentukKegiatan: 'Pemberian Tantangan Studi Kasus Industri Tingkat Lanjut, Mini Riset, dan Proyek Inovasi',
      alokasiWaktu: '2 x 45 Menit (dikerjakan secara mandiri atau kolaboratif)',
      langkahPembelajaran: [
        'Tahap 1 - Orientasi Kasus Tingkat Lanjut: Pemberian skenario studi kasus riil industri yang memiliki kompleksitas lebih tinggi dibanding materi standar.',
        'Tahap 2 - Riset & Perancangan Solusi: Peserta didik mengidentifikasi alternatif solusi, efisiensi biaya, kecepatan eksekusi, dan aspek skalabilitas.',
        'Tahap 3 - Eksekusi & Pembuatan Portofolio: Mewujudkan rancangan ke dalam purwarupa, dokumen analisis teknis, atau modul tutorial interaktif.',
        'Tahap 4 - Presentasi & Berbagi Praktik Baik: Mempresentasikan temuan di depan kelas dan membantu mendampingi rekan sejawat.',
      ],
      soalPengayaan: [
        {
          nomor: 1,
          bentuk: 'Studi Kasus Analisis & Evaluasi (HOTS C5/C6)',
          pertanyaan: `Sebuah perusahaan/industri menghadapi tantangan pada penerapan ${materi}, di mana beban operasional meningkat 300% dan terjadi penurunan performa sistem. Rancanglah sebuah analisis komparatif minimal dua skema arsitektur/pendekatan untuk mengatasi masalah tersebut, serta tentukan rekomendasi terbaik Anda dengan justifikasi data!`,
          kunciJawaban:
            'Peserta didik menyajikan analisis mendalam: Skema A vs Skema B, membandingkan parameter reliabilitas, throughput, fleksibilitas ekspansi, dan efisiensi sumber daya. Rekomendasi disertai mitigasi risiko sistemik.',
          rubrikSkor:
            'Skor 50: Analisis komprehensif, kritis, data pendukung valid, dan rekomendasi orisinal | Skor 35: Cukup mendalam | Skor 20: Dasar.',
        },
        {
          nomor: 2,
          bentuk: 'Perancangan Solusi Inovatif & Skalabilitas (HOTS)',
          pertanyaan: `Bagaimana Anda mengintegrasikan teknologi terkini (seperti otomasi, kecerdasan buatan, atau standar industri hijau) ke dalam alur kerja ${materi} agar memiliki nilai tambah ekonomis dan keberlanjutan bagi sekolah atau UMKM lokal di Bali?`,
          kunciJawaban:
            'Jawaban kreatif yang menunjukkan keterhubungan antara materi kejuruan dengan inovasi ramah lingkungan, digitalisasi proses, atau efisiensi energi yang realistis diterapkan.',
          rubrikSkor:
            'Skor 50: Gagasan inovatif, terstruktur, aplikatif, dan berwawasan masa depan | Skor 30: Menjawab baik.',
        },
      ],
      projekPengayaan: {
        judulProjek: `Projek Inovasi Kejuruan: Solusi Terapan Mandiri pada ${materi}`,
        tujuanProjek: `Mendorong peserta didik berprestasi mengembangkan inovasi terapan berskala industri yang relevan dengan potensi kearifan lokal Bali dan kebutuhan dunia kerja.`,
        alatBahan: [
          'Perangkat teknologi / bengkel kejuruan lengkap',
          'Dokumentasi standar industri / jurnal teknis internasional',
          'Software perancangan / simulasi profesional',
          'Format pelaporan portofolio profesional',
        ],
        langkahKerja: [
          '1. Identifikasi permasalahan nyata di bengkel atau industri mitra.',
          '2. Penyusunan proposal teknis ringkas dan sketsa/diagram alur kerja.',
          '3. Fabrikasi, perakitan, konfigurasi, atau coding prototype solusi.',
          '4. Pengujian performa ekstrem (stress-test) dan evaluasi parameter keberhasilan.',
          '5. Penyusunan video demonstrasi produk atau poster pameran karya inovasi.',
        ],
        rubrikPenilaianProjek: [
          {
            aspek: 'Inovasi & Nilai Kebaruan (Novelty)',
            skorMaksimal: 35,
            kriteria: 'Karya menawarkan sudut pandang baru, efisiensi tinggi, dan solusi bernilai tambah.',
          },
          {
            aspek: 'Kematangan Teknis & Fungsionalitas',
            skorMaksimal: 45,
            kriteria: 'Produk/sistem bekerja stabil, mematuhi standar industri dan kode etik kejuruan.',
          },
          {
            aspek: 'Kualitas Dokumentasi & Komunikasi Publik',
            skorMaksimal: 20,
            kriteria: 'Laporan rapi, penyampaian meyakinkan, serta mampu menjawab pertanyaan analitis.',
          },
        ],
      },
    },
    programTindakLanjut: {
      analisisEvaluasi: `Berdasarkan hasil asesmen formatif materi ${materi}, dari peserta didik yang mengikuti remedial telah tercapai peningkatan ketuntasan belajar melampaui KKTP (${kktp}). Peserta didik pengayaan berhasil meningkatkan kemandirian bernalar kritis dan menghasilkan produk portofolio yang dapat dijadikan referensi rekan sejawat.`,
      tindakLanjutSiswa: [
        {
          kategori: 'Peserta Didik Tuntas Pasca-Remedial',
          tindakan: `Diberikan sertifikasi/validasi ketuntasan TP dan dipersilakan melanjutkan ke modul/Tujuan Pembelajaran (TP) berikutnya dengan tetap diberikan kartu monitoring pemahaman berkelanjutan.`,
        },
        {
          kategori: 'Peserta Didik Belum Mencapai KKTP Pasca-Remedial',
          tindakan: `Dilakukan intervensi tahap 2 dengan pendekatan diferensiasi personal, konsultasi bersama Guru Bimbingan Konseling (BK), komunikasi dengan orang tua/wali siswa, serta penyesuaian metode asesmen alternatif berbasis unjuk kerja sederhana.`,
        },
        {
          kategori: 'Peserta Didik Program Pengayaan',
          tindakan: `Diberikan sertifikat penghargaan internal guru mata pelajaran, didaftarkan dalam bank data siswa berprestasi untuk seleksi Lomba Kompetensi Siswa (LKS), serta dimandatkan sebagai Ketua Tim Praktik/Tutor Sebaya.`,
        },
      ],
      tindakLanjutRefleksiGuru: [
        'Meninjau kembali alokasi waktu pemaparan konsep abstrak pada Modul Ajar dan memperbanyak porsi demonstrasi langsung.',
        'Mengembangkan media pembelajaran interaktif berbasis digital atau alat peraga bengkel yang lebih visual dan kontekstual.',
        'Memperkuat asesmen formatif di awal dan tengah pembelajaran untuk mendeteksi kesenjangan belajar sejak dini.',
        'Melakukan sharing session pembelajaran berkualitas bersama MGMP sekolah di SMK Negeri 1 Bebandem.',
      ],
      rekomendasiWaliKelasDanOrangTua:
        'Wali kelas diharapkan terus memantau kehadiran dan keaktifan peserta didik, sedangkan orang tua/wali diharapkan memberikan motivasi belajar dan ruang latihan di rumah agar kebiasaan disiplin belajar vokasi tetap terjaga.',
      jadwalPelaksanaan: [
        { kegiatan: 'Analisis Hasil Asesmen Formatif & Pemetaan Siswa', waktu: 'Hari ke-1 setelah tes' },
        { kegiatan: 'Pelaksanaan Pembelajaran Remedial & Pengayaan', waktu: 'Hari ke-3 sampai ke-4' },
        { kegiatan: 'Pelaksanaan Asesmen Ulang (Post-Test & Penilaian Projek)', waktu: 'Hari ke-5' },
        { kegiatan: 'Input Nilai Akhir & Pelaporan Rekapitulasi ke Kurikulum', waktu: 'Hari ke-7' },
      ],
    },
    siswaRemedial: INITIAL_SISWA_REMEDIAL,
    siswaPengayaan: INITIAL_SISWA_PENGAYAAN,
    signatureSettings: {
      showQrVerification: true,
      showOfficialStamp: true,
      signatureModeGuru: 'digital_badge',
      signatureModeKepsek: 'digital_badge',
    },
  };
}
