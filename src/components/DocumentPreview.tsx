import React from 'react';
import { FullProgramData } from '../types';
import { KopSurat } from './KopSurat';
import { DigitalSignatureBlock } from './DigitalSignatureBlock';
import { CheckCircle, AlertCircle, Award, Calendar, BookOpen, Layers } from 'lucide-react';

interface DocumentPreviewProps {
  data: FullProgramData;
  onUpdateSettings?: (settings: any) => void;
  activeFilterSection?: 'all' | 'remedial' | 'pengayaan' | 'tindak-lanjut' | 'soal-projek';
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  data,
  onUpdateSettings,
  activeFilterSection = 'all',
}) => {
  const {
    identitas,
    analisisDiagnostik,
    programRemedial,
    programPengayaan,
    programTindakLanjut,
    siswaRemedial,
    siswaPengayaan,
    signatureSettings,
  } = data;

  const showRemedial = activeFilterSection === 'all' || activeFilterSection === 'remedial' || activeFilterSection === 'soal-projek';
  const showPengayaan = activeFilterSection === 'all' || activeFilterSection === 'pengayaan' || activeFilterSection === 'soal-projek';
  const showTindakLanjut = activeFilterSection === 'all' || activeFilterSection === 'tindak-lanjut';

  return (
    <div className="bg-white text-black p-6 md:p-10 shadow-lg mx-auto max-w-[210mm] min-h-[297mm] font-serif print:shadow-none print:p-0 print:max-w-none print:w-full border border-neutral-200 print:border-none print:m-0 text-neutral-900 leading-relaxed selection:bg-amber-100">
      {/* 1. KOP SURAT RESMI */}
      <KopSurat identitas={identitas} />

      {/* 2. JUDUL DOKUMEN */}
      <div className="text-center my-4">
        <h2 className="text-base md:text-lg font-bold underline uppercase tracking-wider text-black">
          PROGRAM PEMBELAJARAN REMEDIAL, PENGAYAAN, DAN TINDAK LANJUT
        </h2>
        <p className="text-xs md:text-sm font-semibold uppercase tracking-wide text-neutral-800 mt-0.5">
          IMPLEMENTASI KURIKULUM MERDEKA - SMK NEGERI 1 BEBANDEM
        </p>
      </div>

      {/* 3. IDENTITAS GURU DAN MATA PELAJARAN (Sesuai Permintaan User) */}
      <div className="border border-neutral-800 rounded-xs p-3 my-4 bg-neutral-50/50 print:bg-transparent text-xs md:text-sm">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="align-top">
              <td className="w-32 py-1 font-semibold text-neutral-700">Satuan Pendidikan</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1 font-bold text-black">{identitas.namaSekolah}</td>
              <td className="w-28 py-1 font-semibold text-neutral-700">Kelas / Fase</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1 font-bold text-black">{identitas.kelas}</td>
            </tr>
            <tr className="align-top">
              <td className="py-1 font-semibold text-neutral-700">Mata Pelajaran</td>
              <td className="py-1">:</td>
              <td className="py-1 font-bold text-black">{identitas.mataPelajaran}</td>
              <td className="py-1 font-semibold text-neutral-700">Semester</td>
              <td className="py-1">:</td>
              <td className="py-1">{identitas.semester}</td>
            </tr>
            <tr className="align-top">
              <td className="py-1 font-semibold text-neutral-700">Materi Pokok</td>
              <td className="py-1">:</td>
              <td className="py-1 font-medium text-black">{identitas.materi}</td>
              <td className="py-1 font-semibold text-neutral-700">Tahun Pelajaran</td>
              <td className="py-1">:</td>
              <td className="py-1 font-bold text-black">{identitas.tahunPelajaran}</td>
            </tr>
            <tr className="align-top">
              <td className="py-1 font-semibold text-neutral-700">Guru Pengampu</td>
              <td className="py-1">:</td>
              <td className="py-1 font-medium">{identitas.namaGuru}</td>
              <td className="py-1 font-semibold text-neutral-700">KKTP / KKM</td>
              <td className="py-1">:</td>
              <td className="py-1 font-bold text-emerald-800">{identitas.kktp}</td>
            </tr>
            <tr className="align-top">
              <td className="py-1 font-semibold text-neutral-700">NIP Guru</td>
              <td className="py-1">:</td>
              <td className="py-1 text-neutral-800">{identitas.nipGuru || '-'}</td>
              <td className="py-1 font-semibold text-neutral-700">Beban Waktu</td>
              <td className="py-1">:</td>
              <td className="py-1">2 x 45 Menit</td>
            </tr>
            <tr className="align-top border-t border-dashed border-neutral-300">
              <td className="pt-2 font-semibold text-neutral-800">Tujuan Pembelajaran</td>
              <td className="pt-2">:</td>
              <td colSpan={4} className="pt-2 font-medium text-neutral-900 bg-amber-50/70 p-2 rounded-xs border border-amber-200/80 my-1">
                {identitas.tujuanPembelajaran}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. BAGIAN I: ANALISIS DIAGNOSTIK & IDENTIFIKASI KESULITAN BELAJAR */}
      {showRemedial && (
        <section className="my-5">
          <div className="bg-neutral-800 text-white px-3 py-1 font-serif font-bold text-xs md:text-sm tracking-wide uppercase flex items-center gap-1.5 print:bg-neutral-200 print:text-black print:border print:border-black">
            <BookOpen className="w-4 h-4 print:hidden" />
            I. ANALISIS DIAGNOSTIK & IDENTIFIKASI KESULITAN BELAJAR
          </div>

          <div className="mt-2 text-xs md:text-sm space-y-2">
            <div>
              <p className="font-bold text-neutral-900">Akar Masalah Pembelajaran:</p>
              <p className="text-neutral-800 text-justify">{analisisDiagnostik.akarMasalah}</p>
            </div>

            <div>
              <p className="font-bold text-neutral-900">Faktor Penyebab Peserta Didik Belum Mencapai KKTP:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-neutral-800">
                {analisisDiagnostik.faktorKesulitan.map((faktor, idx) => (
                  <li key={idx} className="text-justify">{faktor}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-bold text-neutral-900">Strategi Intervensi & Diferensiasi Pembelajaran:</p>
              <p className="text-neutral-800 text-justify">{analisisDiagnostik.strategiIntervensi}</p>
            </div>
          </div>
        </section>
      )}

      {/* 5. BAGIAN II: PROGRAM PEMBELAJARAN REMEDIAL */}
      {showRemedial && (
        <section className="my-6">
          <div className="bg-neutral-800 text-white px-3 py-1 font-serif font-bold text-xs md:text-sm tracking-wide uppercase flex items-center gap-1.5 print:bg-neutral-200 print:text-black print:border print:border-black">
            <AlertCircle className="w-4 h-4 print:hidden text-amber-300" />
            II. PROGRAM PEMBELAJARAN REMEDIAL (SESUAI TUJUAN PEMBELAJARAN)
          </div>

          <div className="mt-2 text-xs md:text-sm space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-neutral-50 p-2.5 rounded border border-neutral-200 print:bg-transparent">
              <div>
                <span className="font-bold text-neutral-700">Bentuk Pelaksanaan:</span>
                <p className="text-neutral-900 font-medium">{programRemedial.bentukKegiatan}</p>
              </div>
              <div>
                <span className="font-bold text-neutral-700">Alokasi Waktu:</span>
                <p className="text-neutral-900 font-medium">{programRemedial.alokasiWaktu}</p>
              </div>
              <div className="col-span-full">
                <span className="font-bold text-neutral-700">Deskripsi Alur:</span>
                <p className="text-neutral-800 text-justify">{programRemedial.deskripsi}</p>
              </div>
            </div>

            {/* Langkah Remedial */}
            <div>
              <p className="font-bold text-neutral-900 mb-1">A. Langkah-Langkah Pembelajaran Remedial:</p>
              <ol className="list-decimal pl-5 space-y-1 text-neutral-800">
                {programRemedial.langkahPembelajaran.map((langkah, idx) => (
                  <li key={idx} className="text-justify">{langkah}</li>
                ))}
              </ol>
            </div>

            {/* Butir Soal Remedial */}
            <div className="mt-3">
              <p className="font-bold text-neutral-900 mb-1.5 flex items-center justify-between">
                <span>B. Butir Instrumen Soal Remedial (Terkait Erat dengan TP):</span>
                <span className="text-[11px] font-normal text-neutral-600 print:hidden">
                  Total: {programRemedial.soalRemedial.length} Soal
                </span>
              </p>

              <div className="space-y-3">
                {programRemedial.soalRemedial.map((soal) => (
                  <div
                    key={soal.nomor}
                    className="p-3 border border-neutral-300 rounded bg-white space-y-1.5 print:border-neutral-400"
                  >
                    <div className="flex items-center justify-between text-[11px] font-sans">
                      <span className="font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded border border-neutral-300">
                        Soal No. {soal.nomor} — {soal.bentuk}
                      </span>
                      <span className="text-neutral-500 italic">
                        Target TP: {soal.tujuanPembelajaranTerkait.slice(0, 40)}...
                      </span>
                    </div>

                    <p className="font-serif font-medium text-neutral-900 text-sm mt-1 text-justify">
                      {soal.pertanyaan}
                    </p>

                    {soal.opsi && soal.opsi.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pl-3 text-xs text-neutral-800 font-sans my-1">
                        {soal.opsi.map((op, oIdx) => (
                          <div key={oIdx} className="py-0.5">
                            {op}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-2 pt-2 border-t border-dashed border-neutral-200 text-xs space-y-0.5 bg-neutral-50 p-2 rounded print:bg-transparent">
                      <p>
                        <strong className="text-emerald-800">Kunci Jawaban:</strong>{' '}
                        <span className="text-neutral-900">{soal.kunciJawaban}</span>
                      </p>
                      <p>
                        <strong className="text-blue-800">Pedoman / Rubrik Penilaian:</strong>{' '}
                        <span className="text-neutral-700">{soal.rubrikSkor}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aktifitas Projek Remedial */}
            <div className="mt-4 pt-3 border-t border-neutral-300">
              <p className="font-bold text-neutral-900 mb-1.5">
                C. Instrumen Aktifitas Projek Remedial (Unjuk Kerja Terapan Kejuruan):
              </p>

              <div className="border border-neutral-300 rounded p-3 bg-neutral-50/70 print:bg-transparent space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="col-span-2">
                    <span className="font-bold text-neutral-700">Judul Projek:</span>
                    <p className="font-bold text-neutral-900 text-sm">{programRemedial.projekRemedial.judulProjek}</p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-700">Sasaran Unjuk Kerja:</span>
                    <p className="text-neutral-800">{programRemedial.projekRemedial.tujuanProjek}</p>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-neutral-700 text-xs">Alat & Bahan Praktik:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {programRemedial.projekRemedial.alatBahan.map((alat, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[11px] bg-white border border-neutral-300 px-2 py-0.5 rounded text-neutral-700"
                      >
                        {alat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-neutral-700 text-xs">Langkah Kerja Siswa:</span>
                  <ol className="list-decimal pl-5 space-y-0.5 text-xs text-neutral-800 mt-1">
                    {programRemedial.projekRemedial.langkahKerja.map((lk, lkIdx) => (
                      <li key={lkIdx} className="text-justify">{lk}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <span className="font-bold text-neutral-700 text-xs">Rubrik Penilaian Unjuk Kerja:</span>
                  <table className="w-full mt-1 border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-200 text-black border border-neutral-400">
                        <th className="p-1 w-10 text-center">No</th>
                        <th className="p-1 text-left">Aspek Dinilai</th>
                        <th className="p-1 w-24 text-center">Skor Maks</th>
                        <th className="p-1 text-left">Kriteria Pencapaian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {programRemedial.projekRemedial.rubrikPenilaianProjek.map((rb, rIdx) => (
                        <tr key={rIdx} className="border border-neutral-300">
                          <td className="p-1 text-center font-mono">{rIdx + 1}</td>
                          <td className="p-1 font-semibold">{rb.aspek}</td>
                          <td className="p-1 text-center font-bold text-blue-900">{rb.skorMaksimal}</td>
                          <td className="p-1 text-neutral-700">{rb.kriteria}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabel Daftar Siswa Remedial */}
            <div className="mt-4 pt-3 border-t border-neutral-300">
              <p className="font-bold text-neutral-900 mb-1.5 flex items-center justify-between">
                <span>D. Rekapitulasi Daftar Peserta Didik dan Hasil Remedial:</span>
                <span className="text-[11px] font-normal text-neutral-600 print:hidden">
                  KKTP Standar: {identitas.kktp}
                </span>
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-100 border border-neutral-400 text-black">
                      <th className="p-1.5 w-8 text-center">No</th>
                      <th className="p-1.5 text-left">Nama Peserta Didik</th>
                      <th className="p-1.5 w-20 text-center">NIS</th>
                      <th className="p-1.5 w-16 text-center">Nilai Awal</th>
                      <th className="p-1.5 text-left">Bentuk Intervensi Remedial</th>
                      <th className="p-1.5 w-16 text-center">Nilai Akhir</th>
                      <th className="p-1.5 w-24 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswaRemedial.map((siswa, idx) => (
                      <tr key={siswa.id} className="border border-neutral-300 hover:bg-neutral-50">
                        <td className="p-1.5 text-center font-mono">{idx + 1}</td>
                        <td className="p-1.5 font-medium">{siswa.nama}</td>
                        <td className="p-1.5 text-center font-mono text-neutral-600">{siswa.nis}</td>
                        <td className="p-1.5 text-center font-bold text-red-700 bg-red-50/50">
                          {siswa.nilaiAwal}
                        </td>
                        <td className="p-1.5 text-neutral-800">{siswa.bentukRemedial}</td>
                        <td className="p-1.5 text-center font-bold text-emerald-800 bg-emerald-50/50">
                          {siswa.nilaiAkhir}
                        </td>
                        <td className="p-1.5 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              siswa.status === 'Tuntas'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-red-100 text-red-900 border border-red-300'
                            }`}
                          >
                            {siswa.status === 'Tuntas' && <CheckCircle className="w-2.5 h-2.5" />}
                            {siswa.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. BAGIAN III: PROGRAM PEMBELAJARAN PENGAYAAN */}
      {showPengayaan && (
        <section className="my-6 print:break-before-page">
          <div className="bg-neutral-800 text-white px-3 py-1 font-serif font-bold text-xs md:text-sm tracking-wide uppercase flex items-center gap-1.5 print:bg-neutral-200 print:text-black print:border print:border-black">
            <Award className="w-4 h-4 print:hidden text-amber-300" />
            III. PROGRAM PEMBELAJARAN PENGAYAAN (ENRICHMENT / HOTS)
          </div>

          <div className="mt-2 text-xs md:text-sm space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-neutral-50 p-2.5 rounded border border-neutral-200 print:bg-transparent">
              <div>
                <span className="font-bold text-neutral-700">Bentuk Kegiatan:</span>
                <p className="text-neutral-900 font-medium">{programPengayaan.bentukKegiatan}</p>
              </div>
              <div>
                <span className="font-bold text-neutral-700">Alokasi Waktu:</span>
                <p className="text-neutral-900 font-medium">{programPengayaan.alokasiWaktu}</p>
              </div>
              <div className="col-span-full">
                <span className="font-bold text-neutral-700">Deskripsi Pelaksanaan:</span>
                <p className="text-neutral-800 text-justify">{programPengayaan.deskripsi}</p>
              </div>
            </div>

            {/* Langkah Pengayaan */}
            <div>
              <p className="font-bold text-neutral-900 mb-1">A. Langkah-Langkah Pembelajaran Pengayaan:</p>
              <ol className="list-decimal pl-5 space-y-1 text-neutral-800">
                {programPengayaan.langkahPembelajaran.map((langkah, idx) => (
                  <li key={idx} className="text-justify">{langkah}</li>
                ))}
              </ol>
            </div>

            {/* Butir Soal Pengayaan HOTS */}
            <div className="mt-3">
              <p className="font-bold text-neutral-900 mb-1.5">
                B. Instrumen Soal Pengayaan (Studi Kasus & Analisis Tingkat Tinggi / HOTS):
              </p>

              <div className="space-y-3">
                {programPengayaan.soalPengayaan.map((soal) => (
                  <div
                    key={soal.nomor}
                    className="p-3 border border-neutral-300 rounded bg-white space-y-1.5 print:border-neutral-400"
                  >
                    <div className="flex items-center justify-between text-[11px] font-sans">
                      <span className="font-bold bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                        Soal Pengayaan No. {soal.nomor} — {soal.bentuk}
                      </span>
                    </div>

                    <p className="font-serif font-medium text-neutral-900 text-sm mt-1 text-justify">
                      {soal.pertanyaan}
                    </p>

                    <div className="mt-2 pt-2 border-t border-dashed border-neutral-200 text-xs space-y-0.5 bg-blue-50/50 p-2 rounded print:bg-transparent">
                      <p>
                        <strong className="text-blue-900">Pedoman Penalaran / Solusi:</strong>{' '}
                        <span className="text-neutral-800">{soal.kunciJawaban}</span>
                      </p>
                      <p>
                        <strong className="text-indigo-900">Rubrik Penilaian Analitis:</strong>{' '}
                        <span className="text-neutral-700">{soal.rubrikSkor}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projek Inovasi Pengayaan */}
            <div className="mt-4 pt-3 border-t border-neutral-300">
              <p className="font-bold text-neutral-900 mb-1.5">
                C. Instrumen Aktifitas Projek Inovasi & Portofolio Kejuruan Pengayaan:
              </p>

              <div className="border border-neutral-300 rounded p-3 bg-neutral-50/70 print:bg-transparent space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="col-span-2">
                    <span className="font-bold text-neutral-700">Judul Projek Inovasi:</span>
                    <p className="font-bold text-neutral-900 text-sm">{programPengayaan.projekPengayaan.judulProjek}</p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-700">Fokus Kemampuan:</span>
                    <p className="text-neutral-800">{programPengayaan.projekPengayaan.tujuanProjek}</p>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-neutral-700 text-xs">Peralatan / Sumber Daya:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {programPengayaan.projekPengayaan.alatBahan.map((alat, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[11px] bg-white border border-neutral-300 px-2 py-0.5 rounded text-neutral-700"
                      >
                        {alat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-neutral-700 text-xs">Tahapan Proyek:</span>
                  <ol className="list-decimal pl-5 space-y-0.5 text-xs text-neutral-800 mt-1">
                    {programPengayaan.projekPengayaan.langkahKerja.map((lk, lkIdx) => (
                      <li key={lkIdx} className="text-justify">{lk}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <span className="font-bold text-neutral-700 text-xs">Rubrik Evaluasi Portofolio:</span>
                  <table className="w-full mt-1 border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-200 text-black border border-neutral-400">
                        <th className="p-1 w-10 text-center">No</th>
                        <th className="p-1 text-left">Aspek Kompetensi</th>
                        <th className="p-1 w-24 text-center">Skor Maks</th>
                        <th className="p-1 text-left">Kriteria Evaluasi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {programPengayaan.projekPengayaan.rubrikPenilaianProjek.map((rb, rIdx) => (
                        <tr key={rIdx} className="border border-neutral-300">
                          <td className="p-1 text-center font-mono">{rIdx + 1}</td>
                          <td className="p-1 font-semibold">{rb.aspek}</td>
                          <td className="p-1 text-center font-bold text-blue-900">{rb.skorMaksimal}</td>
                          <td className="p-1 text-neutral-700">{rb.kriteria}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabel Daftar Siswa Pengayaan */}
            <div className="mt-4 pt-3 border-t border-neutral-300">
              <p className="font-bold text-neutral-900 mb-1.5">
                D. Daftar Peserta Didik Program Pengayaan:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-100 border border-neutral-400 text-black">
                      <th className="p-1.5 w-8 text-center">No</th>
                      <th className="p-1.5 text-left">Nama Peserta Didik</th>
                      <th className="p-1.5 w-20 text-center">NIS</th>
                      <th className="p-1.5 w-16 text-center">Nilai Awal</th>
                      <th className="p-1.5 text-left">Bentuk Aktivitas Pengayaan</th>
                      <th className="p-1.5 w-16 text-center">Capaian</th>
                      <th className="p-1.5 w-40 text-left">Keterangan / Peran</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswaPengayaan.map((siswa, idx) => (
                      <tr key={siswa.id} className="border border-neutral-300 hover:bg-neutral-50">
                        <td className="p-1.5 text-center font-mono">{idx + 1}</td>
                        <td className="p-1.5 font-medium">{siswa.nama}</td>
                        <td className="p-1.5 text-center font-mono text-neutral-600">{siswa.nis}</td>
                        <td className="p-1.5 text-center font-bold text-neutral-800">{siswa.nilaiAwal}</td>
                        <td className="p-1.5 text-neutral-800">{siswa.bentukPengayaan}</td>
                        <td className="p-1.5 text-center font-bold text-blue-800 bg-blue-50/50">
                          {siswa.nilaiPengayaan}
                        </td>
                        <td className="p-1.5 text-[11px] text-neutral-600 italic">{siswa.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. BAGIAN IV: PROGRAM TINDAK LANJUT PEMBELAJARAN */}
      {showTindakLanjut && (
        <section className="my-6 print:break-before-page">
          <div className="bg-neutral-800 text-white px-3 py-1 font-serif font-bold text-xs md:text-sm tracking-wide uppercase flex items-center gap-1.5 print:bg-neutral-200 print:text-black print:border print:border-black">
            <Layers className="w-4 h-4 print:hidden" />
            IV. PROGRAM TINDAK LANJUT PEMBELAJARAN
          </div>

          <div className="mt-2 text-xs md:text-sm space-y-3">
            <div>
              <p className="font-bold text-neutral-900">Analisis Hasil Evaluasi Pelaksanaan:</p>
              <p className="text-neutral-800 text-justify">{programTindakLanjut.analisisEvaluasi}</p>
            </div>

            {/* Tindak Lanjut Siswa */}
            <div>
              <p className="font-bold text-neutral-900 mb-1">A. Rencana Tindak Lanjut untuk Peserta Didik:</p>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-100 border border-neutral-400">
                    <th className="p-1.5 w-1/3 text-left">Kelompok Peserta Didik</th>
                    <th className="p-1.5 text-left">Bentuk Tindak Lanjut Nyata</th>
                  </tr>
                </thead>
                <tbody>
                  {programTindakLanjut.tindakLanjutSiswa.map((item, idx) => (
                    <tr key={idx} className="border border-neutral-300">
                      <td className="p-1.5 font-semibold text-neutral-900 align-top">{item.kategori}</td>
                      <td className="p-1.5 text-neutral-800 text-justify">{item.tindakan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Refleksi Guru */}
            <div>
              <p className="font-bold text-neutral-900 mb-1">B. Refleksi & Tindak Lanjut Perbaikan Guru:</p>
              <ul className="list-disc pl-5 space-y-0.5 text-neutral-800 text-xs">
                {programTindakLanjut.tindakLanjutRefleksiGuru.map((ref, idx) => (
                  <li key={idx} className="text-justify">{ref}</li>
                ))}
              </ul>
            </div>

            {/* Rekomendasi Wali Kelas */}
            <div>
              <p className="font-bold text-neutral-900 mb-0.5">C. Koordinasi & Rekomendasi bagi Wali Kelas / Orang Tua:</p>
              <p className="text-neutral-800 text-xs text-justify bg-neutral-50 p-2 rounded border border-neutral-200 print:bg-transparent">
                {programTindakLanjut.rekomendasiWaliKelasDanOrangTua}
              </p>
            </div>

            {/* Jadwal Pelaksanaan */}
            <div>
              <p className="font-bold text-neutral-900 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 print:hidden text-neutral-600" />
                D. Jadwal dan Rencana Aksi Pelaksanaan Tindak Lanjut:
              </p>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-100 border border-neutral-400">
                    <th className="p-1.5 w-10 text-center">No</th>
                    <th className="p-1.5 text-left">Uraian Kegiatan</th>
                    <th className="p-1.5 w-40 text-center">Alokasi Waktu / Jadwal</th>
                  </tr>
                </thead>
                <tbody>
                  {programTindakLanjut.jadwalPelaksanaan.map((item, idx) => (
                    <tr key={idx} className="border border-neutral-300">
                      <td className="p-1.5 text-center font-mono">{idx + 1}</td>
                      <td className="p-1.5">{item.kegiatan}</td>
                      <td className="p-1.5 text-center font-medium text-neutral-700">{item.waktu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 8. PENGESAHAN DAN TANDA TANGAN DIGITAL (Sesuai Identitas Kepala Sekolah yang diminta) */}
      <DigitalSignatureBlock
        identitas={identitas}
        settings={signatureSettings}
        onUpdateSettings={onUpdateSettings}
      />
    </div>
  );
};
