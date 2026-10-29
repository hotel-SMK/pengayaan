export interface SubjectPreset {
  id: string;
  jurusan: string;
  mataPelajaran: string;
  materi: string;
  kelas: string;
  kktp: number;
  tujuanPembelajaran: string;
}

export const PRESET_CONTOH: SubjectPreset[] = [
  {
    id: 'tkj-routing',
    jurusan: 'Teknik Komputer & Jaringan',
    mataPelajaran: 'Konsentrasi Keahlian TKJ',
    materi: 'Konfigurasi Routing Statis & Dinamis (OSPF) pada Jaringan Komputer',
    kelas: 'Fase F / Kelas XI TKJ 1',
    kktp: 75,
    tujuanPembelajaran: 'Peserta didik mampu melakukan konfigurasi routing statis dan routing dinamis OSPF pada router MikroTik serta menganalisis troubleshoot jalur konektivitas jaringan sesuai kebutuhan industri.'
  },
  {
    id: 'rpl-database',
    jurusan: 'Rekayasa Perangkat Lunak',
    mataPelajaran: 'Pemrograman Web dan Perangkat Bergerak',
    materi: 'Implementasi Relasi Basis Data SQL dan Operasi CRUD RESTful API',
    kelas: 'Fase F / Kelas XI RPL 2',
    kktp: 78,
    tujuanPembelajaran: 'Peserta didik mampu merancang skema relasi basis data multi-tabel (one-to-many, many-to-many) dan mengimplementasikan operasi CRUD menggunakan RESTful API dengan response code yang tepat.'
  },
  {
    id: 'tkro-efi',
    jurusan: 'Teknik Kendaraan Ringan Otomotif',
    mataPelajaran: 'Pemeliharaan Mesin Kendaraan Ringan',
    materi: 'Diagnosis Kerusakan Sistem Injeksi Bahan Bakar Elektronik (EFI)',
    kelas: 'Fase F / Kelas XII TKRO 1',
    kktp: 75,
    tujuanPembelajaran: 'Peserta didik mampu mendiagnosis malfungsi sensor sistem EFI (MAP sensor, TPS, O2 sensor) menggunakan scanner diagnostik OBD-II dan melakukan perbaikan sesuai SOP bengkel resmi.'
  },
  {
    id: 'dkv-branding',
    jurusan: 'Desain Komunikasi Visual',
    mataPelajaran: 'Desain Komunikasi Visual Terpadu',
    materi: 'Perancangan Identitas Visual Logo dan Desain Kemasan Produk UMKM Bali',
    kelas: 'Fase F / Kelas XI DKV 1',
    kktp: 76,
    tujuanPembelajaran: 'Peserta didik mampu merancang identitas visual (logo, palet warna, tipografi) dan layout kemasan produk UMKM lokal dengan memperhatikan prinsip estetika dan standar ergonomi cetak.'
  },
  {
    id: 'perhotelan-fo',
    jurusan: 'Perhotelan',
    mataPelajaran: 'Layanan Operasional Front Office',
    materi: 'Penanganan Reservasi Tamu dan Prosedur Check-In Berbasis PMS Hotel',
    kelas: 'Fase F / Kelas XI Perhotelan 1',
    kktp: 75,
    tujuanPembelajaran: 'Peserta didik mampu mengoperasikan sistem reservasi Property Management System (PMS), menangani alur check-in tamu VIP secara profesional, dan mengatasi komplain layanan dengan etika hospitalitas yang santun.'
  },
  {
    id: 'kuliner-pastry',
    jurusan: 'Kuliner / Tata Boga',
    mataPelajaran: 'Pengolahan dan Penyajian Makanan Kontinental',
    materi: 'Teknik Pembuatan Pastry & Bakery Standar Food Safety HACCP',
    kelas: 'Fase F / Kelas XI Kuliner 2',
    kktp: 76,
    tujuanPembelajaran: 'Peserta didik mampu mengidentifikasi takaran bahan dan menguasai teknik folding dough choux pastry dan croissant dengan tekstur renyah serta menerapkan standar kebersihan sanitasi pangan HACCP.'
  },
  {
    id: 'akl-keuangan',
    jurusan: 'Akuntansi dan Keuangan Lembaga',
    mataPelajaran: 'Praktikum Akuntansi Perusahaan Dagang',
    materi: 'Pencatatan Transaksi Jurnal Khusus dan Penyusunan Laporan Laba Rugi',
    kelas: 'Fase F / Kelas XI AKL 1',
    kktp: 77,
    tujuanPembelajaran: 'Peserta didik mampu menganalisis bukti transaksi keuangan ke dalam jurnal khusus (pembelian, penjualan, penerimaan kas, pengeluaran kas) dan menyusun laporan laba rugi berbasis spreadsheet komputer akuntansi.'
  },
  {
    id: 'matematika-smk',
    jurusan: 'Mata Pelajaran Umum',
    mataPelajaran: 'Matematika Terapan SMK',
    materi: 'Penerapan Trigonometri dan Sudut Elevasi dalam Masalah Kejuruan',
    kelas: 'Fase E / Kelas X Semua Jurusan',
    kktp: 75,
    tujuanPembelajaran: 'Peserta didik mampu menerapkan konsep perbandingan trigonometri (sin, cos, tan) untuk mengukur tinggi menara BTS/gedung dan menghitung kemiringan bidang kerja secara akurat.'
  }
];
