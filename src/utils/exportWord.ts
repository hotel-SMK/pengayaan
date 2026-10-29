import { FullProgramData } from '../types';

export function exportToWordDoc(data: FullProgramData, titlePrefix: string = 'Program_Remedial_Pengayaan_TindakLanjut') {
  const { identitas, analisisDiagnostik, programRemedial, programPengayaan, programTindakLanjut, siswaRemedial, siswaPengayaan } = data;

  const sanitizeText = (txt: string) => {
    if (!txt) return '';
    return txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>${sanitizeText(identitas.mataPelajaran)} - Program Remedial, Pengayaan & Tindak Lanjut</title>
<!--[if gte mso 9]>
<xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
 </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page Section1 {
    size: 210mm 297mm;
    margin: 25mm 20mm 20mm 20mm;
    mso-header-margin: 35.4pt;
    mso-footer-margin: 35.4pt;
    mso-paper-source: 0;
  }
  div.Section1 {
    page: Section1;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    line-height: 1.35;
    color: #000000;
  }
  .kop-container {
    text-align: center;
    border-bottom: 3px double #000000;
    padding-bottom: 6px;
    margin-bottom: 18px;
  }
  .kop-p1 {
    font-size: 13pt;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .kop-p2 {
    font-size: 14pt;
    font-weight: bold;
    margin: 1px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .kop-p3 {
    font-size: 16pt;
    font-weight: bold;
    margin: 2px 0;
    text-transform: uppercase;
    color: #000000;
    letter-spacing: 1px;
  }
  .kop-p4 {
    font-size: 11pt;
    font-weight: bold;
    margin: 1px 0;
  }
  .kop-p5 {
    font-size: 10pt;
    font-style: italic;
    margin: 2px 0 0 0;
  }
  .doc-title {
    text-align: center;
    font-size: 13pt;
    font-weight: bold;
    text-decoration: underline;
    margin: 14px 0 3px 0;
    text-transform: uppercase;
  }
  .doc-subtitle {
    text-align: center;
    font-size: 11pt;
    font-weight: bold;
    margin-bottom: 16px;
  }
  table.identity-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    font-size: 10.5pt;
  }
  table.identity-table td {
    padding: 3px 5px;
    vertical-align: top;
  }
  h2.section-header {
    font-size: 11.5pt;
    font-weight: bold;
    background-color: #f0f0f0;
    padding: 4px 8px;
    margin: 18px 0 8px 0;
    border-left: 4px solid #333;
    text-transform: uppercase;
  }
  h3.subsection-header {
    font-size: 11pt;
    font-weight: bold;
    margin: 12px 0 4px 0;
    color: #111;
  }
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 16px 0;
    font-size: 10pt;
  }
  table.data-table th {
    border: 1px solid #000;
    background-color: #f2f2f2;
    padding: 6px 5px;
    text-align: center;
    font-weight: bold;
  }
  table.data-table td {
    border: 1px solid #000;
    padding: 5px;
    vertical-align: top;
  }
  .question-box {
    margin-bottom: 12px;
    padding-left: 8px;
  }
  .signature-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;
    page-break-inside: avoid;
  }
  .signature-table td {
    vertical-align: top;
    width: 50%;
    text-align: center;
    font-size: 11pt;
  }
  .badge-stamp {
    border: 2px solid #1e3a8a;
    color: #1e3a8a;
    padding: 6px 12px;
    display: inline-block;
    border-radius: 4px;
    font-size: 8.5pt;
    margin: 10px 0;
    font-family: sans-serif;
  }
  .page-break {
    page-break-before: always;
  }
</style>
</head>
<body>
<div class="Section1">

  <!-- KOP SURAT RESMI -->
  <div class="kop-container">
    <div class="kop-p1">${sanitizeText(identitas.namaProvinsi)}</div>
    <div class="kop-p2">${sanitizeText(identitas.namaDinas)}</div>
    <div class="kop-p3">${sanitizeText(identitas.namaSekolah)}</div>
    <div class="kop-p4">TAHUN AJARAN ${sanitizeText(identitas.tahunPelajaran)}</div>
    <div class="kop-p5">${sanitizeText(identitas.alamatSekolah)} | Telp: ${sanitizeText(identitas.teleponSekolah)}</div>
  </div>

  <div class="doc-title">PROGRAM REMEDIAL, PENGAYAAN, DAN TINDAK LANJUT</div>
  <div class="doc-subtitle">KURIKULUM MERDEKA - SMK NEGERI 1 BEBANDEM</div>

  <!-- IDENTITAS -->
  <table class="identity-table">
    <tr>
      <td style="width: 20%;"><strong>Satuan Pendidikan</strong></td>
      <td style="width: 2%;">:</td>
      <td style="width: 38%;">${sanitizeText(identitas.namaSekolah)}</td>
      <td style="width: 18%;"><strong>Kelas / Fase</strong></td>
      <td style="width: 2%;">:</td>
      <td style="width: 20%;">${sanitizeText(identitas.kelas)}</td>
    </tr>
    <tr>
      <td><strong>Mata Pelajaran</strong></td>
      <td>:</td>
      <td>${sanitizeText(identitas.mataPelajaran)}</td>
      <td><strong>Semester</strong></td>
      <td>:</td>
      <td>${sanitizeText(identitas.semester)}</td>
    </tr>
    <tr>
      <td><strong>Materi Pokok</strong></td>
      <td>:</td>
      <td>${sanitizeText(identitas.materi)}</td>
      <td><strong>Tahun Pelajaran</strong></td>
      <td>:</td>
      <td>${sanitizeText(identitas.tahunPelajaran)}</td>
    </tr>
    <tr>
      <td><strong>KKTP / KKM</strong></td>
      <td>:</td>
      <td><strong>${identitas.kktp}</strong></td>
      <td><strong>Guru Pengampu</strong></td>
      <td>:</td>
      <td>${sanitizeText(identitas.namaGuru)}</td>
    </tr>
    <tr>
      <td><strong>Tujuan Pembelajaran</strong></td>
      <td>:</td>
      <td colspan="4" style="background-color: #fafafa; border: 1px solid #ddd; padding: 6px;">
        <strong>${sanitizeText(identitas.tujuanPembelajaran)}</strong>
      </td>
    </tr>
  </table>

  <!-- BAGIAN I: ANALISIS DIAGNOSTIK -->
  <h2 class="section-header">I. ANALISIS DIAGNOSTIK & IDENTIFIKASI KESULITAN BELAJAR</h2>
  <p><strong>Akar Masalah Pembelajaran:</strong><br/>${sanitizeText(analisisDiagnostik.akarMasalah)}</p>
  <p><strong>Faktor Penyebab Kesulitan:</strong></p>
  <ul>
    ${analisisDiagnostik.faktorKesulitan.map((item) => `<li>${sanitizeText(item)}</li>`).join('')}
  </ul>
  <p><strong>Strategi Intervensi:</strong><br/>${sanitizeText(analisisDiagnostik.strategiIntervensi)}</p>

  <!-- BAGIAN II: PROGRAM REMEDIAL -->
  <h2 class="section-header">II. PROGRAM PEMBELAJARAN REMEDIAL</h2>
  <table class="identity-table">
    <tr>
      <td style="width: 25%;"><strong>Bentuk Kegiatan</strong></td>
      <td style="width: 2%;">:</td>
      <td>${sanitizeText(programRemedial.bentukKegiatan)}</td>
    </tr>
    <tr>
      <td><strong>Alokasi Waktu</strong></td>
      <td>:</td>
      <td>${sanitizeText(programRemedial.alokasiWaktu)}</td>
    </tr>
    <tr>
      <td><strong>Deskripsi Pelaksanaan</strong></td>
      <td>:</td>
      <td>${sanitizeText(programRemedial.deskripsi)}</td>
    </tr>
  </table>

  <h3 class="subsection-header">A. Langkah-Langkah Pembelajaran Remedial</h3>
  <ol>
    ${programRemedial.langkahPembelajaran.map((langkah) => `<li>${sanitizeText(langkah)}</li>`).join('')}
  </ol>

  <h3 class="subsection-header">B. Instrumen Butir Soal Remedial (Sesuai TP)</h3>
  ${programRemedial.soalRemedial
    .map(
      (s) => `
    <div class="question-box">
      <p><strong>Soal No. ${s.nomor} (${sanitizeText(s.bentuk)})</strong><br/>
      <em>TP Terkait: ${sanitizeText(s.tujuanPembelajaranTerkait || identitas.tujuanPembelajaran)}</em><br/>
      ${sanitizeText(s.pertanyaan)}</p>
      ${
        s.opsi && s.opsi.length > 0
          ? `<ul style="list-style-type: none; padding-left: 15px;">
          ${s.opsi.map((op) => `<li>${sanitizeText(op)}</li>`).join('')}
        </ul>`
          : ''
      }
      <p style="background-color: #f9f9f9; padding: 4px; border-left: 2px solid #4b5563;">
        <strong>Kunci Jawaban / Pedoman:</strong> ${sanitizeText(s.kunciJawaban)}<br/>
        <strong>Rubrik Penilaian:</strong> ${sanitizeText(s.rubrikSkor)}
      </p>
    </div>
  `
    )
    .join('')}

  <h3 class="subsection-header">C. Instrumen Aktifitas Projek Remedial (Unjuk Kerja Terapan)</h3>
  <table class="identity-table" style="border: 1px solid #ccc;">
    <tr>
      <td style="width: 25%; font-weight: bold;">Judul Projek</td>
      <td>: ${sanitizeText(programRemedial.projekRemedial.judulProjek)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Tujuan Projek</td>
      <td>: ${sanitizeText(programRemedial.projekRemedial.tujuanProjek)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Alat & Bahan</td>
      <td>: ${programRemedial.projekRemedial.alatBahan.map((a) => sanitizeText(a)).join(', ')}</td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Langkah Kerja</td>
      <td>
        <ol>
          ${programRemedial.projekRemedial.langkahKerja.map((lk) => `<li>${sanitizeText(lk)}</li>`).join('')}
        </ol>
      </td>
    </tr>
  </table>

  <p><strong>Rubrik Penilaian Projek Remedial:</strong></p>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 8%;">No</th>
        <th style="width: 32%;">Aspek Penilaian</th>
        <th style="width: 15%;">Skor Maksimal</th>
        <th style="width: 45%;">Kriteria Penilaian</th>
      </tr>
    </thead>
    <tbody>
      ${programRemedial.projekRemedial.rubrikPenilaianProjek
        .map(
          (rb, idx) => `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td><strong>${sanitizeText(rb.aspek)}</strong></td>
          <td style="text-align: center;">${rb.skorMaksimal}</td>
          <td>${sanitizeText(rb.kriteria)}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <h3 class="subsection-header">D. Daftar Peserta Didik dan Hasil Pelaksanaan Remedial</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 5%;">No</th>
        <th style="width: 25%;">Nama Peserta Didik</th>
        <th style="width: 12%;">NIS</th>
        <th style="width: 8%;">Nilai Awal</th>
        <th style="width: 26%;">Bentuk Kegiatan Remedial</th>
        <th style="width: 8%;">Nilai Akhir</th>
        <th style="width: 16%;">Status</th>
      </tr>
    </thead>
    <tbody>
      ${siswaRemedial
        .map(
          (s, idx) => `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td>${sanitizeText(s.nama)}</td>
          <td style="text-align: center;">${sanitizeText(s.nis)}</td>
          <td style="text-align: center; color: #b91c1c; font-weight: bold;">${s.nilaiAwal}</td>
          <td>${sanitizeText(s.bentukRemedial)}</td>
          <td style="text-align: center; color: #15803d; font-weight: bold;">${s.nilaiAkhir}</td>
          <td style="text-align: center; font-weight: bold;">${sanitizeText(s.status)}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <!-- BAGIAN III: PROGRAM PENGAYAAN -->
  <div class="page-break"></div>
  <h2 class="section-header">III. PROGRAM PEMBELAJARAN PENGAYAAN</h2>
  <table class="identity-table">
    <tr>
      <td style="width: 25%;"><strong>Bentuk Kegiatan</strong></td>
      <td style="width: 2%;">:</td>
      <td>${sanitizeText(programPengayaan.bentukKegiatan)}</td>
    </tr>
    <tr>
      <td><strong>Alokasi Waktu</strong></td>
      <td>:</td>
      <td>${sanitizeText(programPengayaan.alokasiWaktu)}</td>
    </tr>
    <tr>
      <td><strong>Deskripsi Pelaksanaan</strong></td>
      <td>:</td>
      <td>${sanitizeText(programPengayaan.deskripsi)}</td>
    </tr>
  </table>

  <h3 class="subsection-header">A. Langkah-Langkah Pembelajaran Pengayaan</h3>
  <ol>
    ${programPengayaan.langkahPembelajaran.map((langkah) => `<li>${sanitizeText(langkah)}</li>`).join('')}
  </ol>

  <h3 class="subsection-header">B. Instrumen Soal Pengayaan (Penalaran Tingkat Tinggi / HOTS)</h3>
  ${programPengayaan.soalPengayaan
    .map(
      (s) => `
    <div class="question-box">
      <p><strong>Soal No. ${s.nomor} (${sanitizeText(s.bentuk)})</strong><br/>
      ${sanitizeText(s.pertanyaan)}</p>
      <p style="background-color: #f9f9f9; padding: 4px; border-left: 2px solid #2563eb;">
        <strong>Kunci Jawaban / Pedoman Penalaran:</strong> ${sanitizeText(s.kunciJawaban)}<br/>
        <strong>Rubrik Penilaian:</strong> ${sanitizeText(s.rubrikSkor)}
      </p>
    </div>
  `
    )
    .join('')}

  <h3 class="subsection-header">C. Instrumen Aktifitas Projek Pengayaan (Inovasi & Portofolio SMK)</h3>
  <table class="identity-table" style="border: 1px solid #ccc;">
    <tr>
      <td style="width: 25%; font-weight: bold;">Judul Projek Inovasi</td>
      <td>: ${sanitizeText(programPengayaan.projekPengayaan.judulProjek)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Tujuan Projek</td>
      <td>: ${sanitizeText(programPengayaan.projekPengayaan.tujuanProjek)}</td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Alat & Bahan</td>
      <td>: ${programPengayaan.projekPengayaan.alatBahan.map((a) => sanitizeText(a)).join(', ')}</td>
    </tr>
    <tr>
      <td style="font-weight: bold;">Langkah Kerja</td>
      <td>
        <ol>
          ${programPengayaan.projekPengayaan.langkahKerja.map((lk) => `<li>${sanitizeText(lk)}</li>`).join('')}
        </ol>
      </td>
    </tr>
  </table>

  <p><strong>Rubrik Penilaian Projek Pengayaan:</strong></p>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 8%;">No</th>
        <th style="width: 32%;">Aspek Penilaian</th>
        <th style="width: 15%;">Skor Maksimal</th>
        <th style="width: 45%;">Kriteria Penilaian</th>
      </tr>
    </thead>
    <tbody>
      ${programPengayaan.projekPengayaan.rubrikPenilaianProjek
        .map(
          (rb, idx) => `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td><strong>${sanitizeText(rb.aspek)}</strong></td>
          <td style="text-align: center;">${rb.skorMaksimal}</td>
          <td>${sanitizeText(rb.kriteria)}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <h3 class="subsection-header">D. Daftar Peserta Didik Program Pengayaan</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 5%;">No</th>
        <th style="width: 25%;">Nama Peserta Didik</th>
        <th style="width: 12%;">NIS</th>
        <th style="width: 10%;">Nilai Awal</th>
        <th style="width: 30%;">Bentuk Aktivitas Pengayaan</th>
        <th style="width: 10%;">Capaian</th>
      </tr>
    </thead>
    <tbody>
      ${siswaPengayaan
        .map(
          (p, idx) => `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td>${sanitizeText(p.nama)}</td>
          <td style="text-align: center;">${sanitizeText(p.nis)}</td>
          <td style="text-align: center; font-weight: bold;">${p.nilaiAwal}</td>
          <td>${sanitizeText(p.bentukPengayaan)}</td>
          <td style="text-align: center; color: #1e40af; font-weight: bold;">${p.nilaiPengayaan}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <!-- BAGIAN IV: TINDAK LANJUT -->
  <h2 class="section-header">IV. PROGRAM TINDAK LANJUT PEMBELAJARAN</h2>
  <p><strong>Analisis Hasil Evaluasi:</strong><br/>${sanitizeText(programTindakLanjut.analisisEvaluasi)}</p>

  <h3 class="subsection-header">A. Tindak Lanjut untuk Peserta Didik</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 35%;">Kategori Peserta Didik</th>
        <th style="width: 65%;">Rencana Tindak Lanjut / Aksi Nyata</th>
      </tr>
    </thead>
    <tbody>
      ${programTindakLanjut.tindakLanjutSiswa
        .map(
          (tl) => `
        <tr>
          <td><strong>${sanitizeText(tl.kategori)}</strong></td>
          <td>${sanitizeText(tl.tindakan)}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <h3 class="subsection-header">B. Refleksi & Tindak Lanjut Perbaikan Guru</h3>
  <ul>
    ${programTindakLanjut.tindakLanjutRefleksiGuru.map((ref) => `<li>${sanitizeText(ref)}</li>`).join('')}
  </ul>

  <p><strong>Rekomendasi bagi Wali Kelas & Orang Tua:</strong><br/>
  ${sanitizeText(programTindakLanjut.rekomendasiWaliKelasDanOrangTua)}</p>

  <h3 class="subsection-header">C. Jadwal dan Rencana Aksi Pelaksanaan</h3>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width: 10%;">No</th>
        <th style="width: 65%;">Uraian Kegiatan</th>
        <th style="width: 25%;">Alokasi Waktu / Jadwal</th>
      </tr>
    </thead>
    <tbody>
      ${programTindakLanjut.jadwalPelaksanaan
        .map(
          (j, idx) => `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td>${sanitizeText(j.kegiatan)}</td>
          <td style="text-align: center;">${sanitizeText(j.waktu)}</td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <!-- PENGESAHAN DAN TANDA TANGAN DIGITAL -->
  <table class="signature-table">
    <tr>
      <td>
        Mengetahui,<br/>
        <strong>Kepala SMK Negeri 1 Bebandem</strong><br/>
        <div style="height: 15px;"></div>
        <div class="badge-stamp">
          [ TERTANDA SECARA DIGITAL ]<br/>
          BSrE / E-SIGN VERIFIED<br/>
          SMK NEGERI 1 BEBANDEM
        </div>
        <div style="height: 10px;"></div>
        <strong><u>${sanitizeText(identitas.namaKepalaSekolah)}</u></strong><br/>
        NIP. ${sanitizeText(identitas.nipKepalaSekolah)}
      </td>
      <td>
        ${sanitizeText(identitas.tempatDokumen)}, ${sanitizeText(identitas.tanggalDokumen)}<br/>
        <strong>Guru Mata Pelajaran</strong><br/>
        <div style="height: 15px;"></div>
        <div class="badge-stamp">
          [ TERTANDA SECARA DIGITAL ]<br/>
          VALIDASI PEMBELAJARAN<br/>
          GURU PENGAMPU
        </div>
        <div style="height: 10px;"></div>
        <strong><u>${sanitizeText(identitas.namaGuru)}</u></strong><br/>
        NIP. ${sanitizeText(identitas.nipGuru)}
      </td>
    </tr>
  </table>

</div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeFilename = `${titlePrefix}_${identitas.mataPelajaran.replace(/[^a-zA-Z0-9]/g, '_')}_${identitas.kelas.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
  a.href = url;
  a.download = safeFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
