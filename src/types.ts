export interface IdentitasDokumen {
  namaProvinsi: string;
  namaDinas: string;
  namaSekolah: string;
  alamatSekolah: string;
  teleponSekolah: string;
  websiteSekolah: string;
  tahunPelajaran: string;
  semester: 'Ganjil' | 'Genap';
  mataPelajaran: string;
  materi: string;
  kelas: string;
  kktp: number;
  tujuanPembelajaran: string;
  namaGuru: string;
  nipGuru: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  tempatDokumen: string;
  tanggalDokumen: string;
}

export interface SiswaItem {
  id: string;
  no: number;
  nama: string;
  nis: string;
  nilaiAwal: number;
  tpBelumTuntas: string;
  bentukRemedial: string;
  nilaiAkhir: number;
  status: 'Tuntas' | 'Belum Tuntas';
}

export interface SiswaPengayaanItem {
  id: string;
  no: number;
  nama: string;
  nis: string;
  nilaiAwal: number;
  bentukPengayaan: string;
  nilaiPengayaan: number;
  keterangan: string;
}

export interface SoalRemedialItem {
  nomor: number;
  bentuk: string;
  tujuanPembelajaranTerkait: string;
  pertanyaan: string;
  opsi?: string[];
  kunciJawaban: string;
  rubrikSkor: string;
}

export interface RubrikAspek {
  aspek: string;
  skorMaksimal: number;
  kriteria: string;
}

export interface ProjekRemedialItem {
  judulProjek: string;
  tujuanProjek: string;
  alatBahan: string[];
  langkahKerja: string[];
  rubrikPenilaianProjek: RubrikAspek[];
}

export interface SoalPengayaanItem {
  nomor: number;
  bentuk: string;
  pertanyaan: string;
  kunciJawaban: string;
  rubrikSkor: string;
}

export interface ProjekPengayaanItem {
  judulProjek: string;
  tujuanProjek: string;
  alatBahan: string[];
  langkahKerja: string[];
  rubrikPenilaianProjek: RubrikAspek[];
}

export interface ProgramRemedialData {
  deskripsi: string;
  bentukKegiatan: string;
  alokasiWaktu: string;
  langkahPembelajaran: string[];
  soalRemedial: SoalRemedialItem[];
  projekRemedial: ProjekRemedialItem;
}

export interface ProgramPengayaanData {
  deskripsi: string;
  bentukKegiatan: string;
  alokasiWaktu: string;
  langkahPembelajaran: string[];
  soalPengayaan: SoalPengayaanItem[];
  projekPengayaan: ProjekPengayaanItem;
}

export interface TindakLanjutSiswaItem {
  kategori: string;
  tindakan: string;
}

export interface JadwalPelaksanaanItem {
  kegiatan: string;
  waktu: string;
}

export interface ProgramTindakLanjutData {
  analisisEvaluasi: string;
  tindakLanjutSiswa: TindakLanjutSiswaItem[];
  tindakLanjutRefleksiGuru: string[];
  rekomendasiWaliKelasDanOrangTua: string;
  jadwalPelaksanaan: JadwalPelaksanaanItem[];
}

export interface AnalisisDiagnostikData {
  faktorKesulitan: string[];
  akarMasalah: string;
  strategiIntervensi: string;
}

export interface FullProgramData {
  identitas: IdentitasDokumen;
  analisisDiagnostik: AnalisisDiagnostikData;
  programRemedial: ProgramRemedialData;
  programPengayaan: ProgramPengayaanData;
  programTindakLanjut: ProgramTindakLanjutData;
  siswaRemedial: SiswaItem[];
  siswaPengayaan: SiswaPengayaanItem[];
  signatureSettings: {
    showQrVerification: boolean;
    showOfficialStamp: boolean;
    signatureModeGuru: 'digital_badge' | 'drawn' | 'manual';
    signatureModeKepsek: 'digital_badge' | 'drawn' | 'manual';
    drawnSignatureGuruUrl?: string;
    drawnSignatureKepsekUrl?: string;
  };
}
