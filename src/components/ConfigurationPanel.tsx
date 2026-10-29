import React, { useState } from 'react';
import { FullProgramData, IdentitasDokumen } from '../types';
import { PRESET_CONTOH, SubjectPreset } from '../utils/presets';
import {
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
  User,
  Sliders,
  FileSpreadsheet,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface ConfigurationPanelProps {
  data: FullProgramData;
  onChangeData: (newData: FullProgramData) => void;
  onGenerateAI: (options: {
    jenisInstrumen: string;
    jumlahSoal: number;
    catatanTambahan: string;
  }) => Promise<void>;
  onGenerateFallback: () => void;
  isGenerating: boolean;
  onOpenStudentModal: () => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  data,
  onChangeData,
  onGenerateAI,
  onGenerateFallback,
  isGenerating,
  onOpenStudentModal,
}) => {
  const [activeTab, setActiveTab] = useState<'identitas' | 'tp' | 'signature'>('tp');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('tkj-routing');
  const [jenisInstrumen, setJenisInstrumen] = useState<string>('keduanya');
  const [jumlahSoal, setJumlahSoal] = useState<number>(4);
  const [catatanTambahan, setCatatanTambahan] = useState<string>('');

  const identitas = data.identitas;

  const handleUpdateIdentitas = (field: keyof IdentitasDokumen, value: any) => {
    onChangeData({
      ...data,
      identitas: {
        ...data.identitas,
        [field]: value,
      },
    });
  };

  const handleApplyPreset = (preset: SubjectPreset) => {
    setSelectedPresetId(preset.id);
    const updatedIdentitas: IdentitasDokumen = {
      ...identitas,
      mataPelajaran: preset.mataPelajaran,
      materi: preset.materi,
      kelas: preset.kelas,
      kktp: preset.kktp,
      tujuanPembelajaran: preset.tujuanPembelajaran,
    };
    onChangeData({
      ...data,
      identitas: updatedIdentitas,
    });
  };

  const handleToggleStamp = () => {
    onChangeData({
      ...data,
      signatureSettings: {
        ...data.signatureSettings,
        showOfficialStamp: !data.signatureSettings.showOfficialStamp,
      },
    });
  };

  const handleToggleQr = () => {
    onChangeData({
      ...data,
      signatureSettings: {
        ...data.signatureSettings,
        showQrVerification: !data.signatureSettings.showQrVerification,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header Tabs */}
      <div className="p-3 bg-neutral-50/80 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex gap-1 bg-neutral-200/60 p-1 rounded-xl w-full">
          <button
            type="button"
            onClick={() => setActiveTab('tp')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'tp'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            TP & AI Generator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('identitas')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'identitas'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Identitas Guru & Sekolah
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signature')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'signature'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Tanda Tangan & Cap
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
        {/* TAB 1: TUJUAN PEMBELAJARAN & GENERATOR */}
        {activeTab === 'tp' && (
          <div className="space-y-4">
            {/* Template Presets */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-neutral-800 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  Pilih Contoh Kompetensi Keahlian SMK:
                </label>
                <span className="text-[10px] text-neutral-500">SMKN 1 Bebandem</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_CONTOH.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className={`text-left p-2 rounded-lg border text-[11px] leading-tight transition-all ${
                      selectedPresetId === preset.id
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <p className="font-bold truncate">{preset.jurusan}</p>
                    <p className="text-[10px] text-neutral-500 truncate">{preset.materi}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Tujuan Pembelajaran (TP) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-neutral-800 flex items-center gap-1 text-xs">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  Tujuan Pembelajaran (TP) yang Diinput:
                </label>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-medium">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Program remedial, butir soal, dan aktivitas projek akan disesuaikan secara presisi dengan TP di bawah ini:
              </p>
              <textarea
                rows={4}
                value={identitas.tujuanPembelajaran}
                onChange={(e) => handleUpdateIdentitas('tujuanPembelajaran', e.target.value)}
                placeholder="Contoh: Peserta didik mampu melakukan konfigurasi routing statis..."
                className="w-full p-2.5 text-xs rounded-xl border border-neutral-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-neutral-50/40 text-neutral-900 leading-relaxed font-sans"
              />
            </div>

            {/* Materi Pokok & KKTP */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-1">
                <label className="font-semibold text-neutral-700 text-[11px]">Materi Pokok / Lingkup Materi:</label>
                <input
                  type="text"
                  value={identitas.materi}
                  onChange={(e) => handleUpdateIdentitas('materi', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 focus:ring-1 focus:ring-indigo-500 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700 text-[11px]">KKTP / KKM:</label>
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={identitas.kktp}
                  onChange={(e) => handleUpdateIdentitas('kktp', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 text-center font-bold text-emerald-800"
                />
              </div>
            </div>

            {/* Opsi Generator */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2.5">
              <p className="font-bold text-neutral-800 text-[11px] uppercase tracking-wide">
                Konfigurasi Instrumen Evaluasi:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-1">Bentuk Evaluasi:</label>
                  <select
                    value={jenisInstrumen}
                    onChange={(e) => setJenisInstrumen(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="keduanya">Lengkap (Soal & Projek)</option>
                    <option value="soal">Hanya Butir Soal & Rubrik</option>
                    <option value="projek">Hanya Aktifitas Projek SMK</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-1">Jumlah Butir Soal:</label>
                  <select
                    value={jumlahSoal}
                    onChange={(e) => setJumlahSoal(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value={3}>3 Butir Soal</option>
                    <option value={4}>4 Butir Soal</option>
                    <option value={5}>5 Butir Soal</option>
                    <option value={8}>8 Butir Soal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10.5px] text-neutral-600 block mb-1">
                  Catatan Tambahan Guru (Opsional):
                </label>
                <input
                  type="text"
                  value={catatanTambahan}
                  onChange={(e) => setCatatanTambahan(e.target.value)}
                  placeholder="Contoh: Fokuskan pada aspek keselamatan kerja bengkel / studi kasus Bali..."
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isGenerating}
                onClick={() =>
                  onGenerateAI({
                    jenisInstrumen,
                    jumlahSoal,
                    catatanTambahan,
                  })
                }
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-sm transition-all ${
                  isGenerating
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-indigo-200'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating
                  ? 'Sedang Memproses Program dengan AI...'
                  : '✨ Generate Program Otomatis (Gemini 3.8 Flash)'}
              </button>

              <button
                type="button"
                disabled={isGenerating}
                onClick={onGenerateFallback}
                className="w-full py-2 px-3 rounded-xl font-semibold text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Generate Instan (Internal Template SMK)
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={onOpenStudentModal}
                  className="text-xs text-indigo-700 hover:underline font-semibold flex items-center gap-1"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Kelola Daftar Siswa ({data.siswaRemedial.length} Remedial, {data.siswaPengayaan.length} Pengayaan)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IDENTITAS GURU & KEPALA SEKOLAH */}
        {activeTab === 'identitas' && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-amber-900 text-[11px] flex gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p>
                Identitas kepala sekolah default adalah <strong>I Wayan Darmayasa, S.T.,M.Si.</strong> (NIP: 19730522 200501 1 009) dan satuan pendidikan SMK Negeri 1 Bebandem.
              </p>
            </div>

            {/* Identitas Guru */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <p className="font-bold text-neutral-800 text-[11px] uppercase tracking-wide">
                Identitas Guru Pengampu:
              </p>
              <div>
                <label className="text-[10.5px] text-neutral-600 block mb-0.5">Nama Lengkap & Gelar:</label>
                <input
                  type="text"
                  value={identitas.namaGuru}
                  onChange={(e) => handleUpdateIdentitas('namaGuru', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 font-medium"
                />
              </div>
              <div>
                <label className="text-[10.5px] text-neutral-600 block mb-0.5">NIP Guru:</label>
                <input
                  type="text"
                  value={identitas.nipGuru}
                  onChange={(e) => handleUpdateIdentitas('nipGuru', e.target.value)}
                  placeholder="19880415 201402 1 003 atau '-'"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-0.5">Mata Pelajaran:</label>
                  <input
                    type="text"
                    value={identitas.mataPelajaran}
                    onChange={(e) => handleUpdateIdentitas('mataPelajaran', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-0.5">Kelas / Fase:</label>
                  <input
                    type="text"
                    value={identitas.kelas}
                    onChange={(e) => handleUpdateIdentitas('kelas', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-0.5">Semester:</label>
                  <select
                    value={identitas.semester}
                    onChange={(e) => handleUpdateIdentitas('semester', e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="Ganjil">Semester Ganjil</option>
                    <option value="Genap">Semester Genap</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-0.5">Tahun Pelajaran:</label>
                  <input
                    type="text"
                    value={identitas.tahunPelajaran}
                    onChange={(e) => handleUpdateIdentitas('tahunPelajaran', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Identitas Kepala Sekolah */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <p className="font-bold text-neutral-800 text-[11px] uppercase tracking-wide">
                Identitas Kepala Sekolah:
              </p>
              <div>
                <label className="text-[10.5px] text-neutral-600 block mb-0.5">Nama Kepala Sekolah:</label>
                <input
                  type="text"
                  value={identitas.namaKepalaSekolah}
                  onChange={(e) => handleUpdateIdentitas('namaKepalaSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 font-bold"
                />
              </div>
              <div>
                <label className="text-[10.5px] text-neutral-600 block mb-0.5">NIP Kepala Sekolah:</label>
                <input
                  type="text"
                  value={identitas.nipKepalaSekolah}
                  onChange={(e) => handleUpdateIdentitas('nipKepalaSekolah', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-0.5">Tempat Pengesahan:</label>
                  <input
                    type="text"
                    value={identitas.tempatDokumen}
                    onChange={(e) => handleUpdateIdentitas('tempatDokumen', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] text-neutral-600 block mb-0.5">Tanggal Dokumen:</label>
                  <input
                    type="text"
                    value={identitas.tanggalDokumen}
                    onChange={(e) => handleUpdateIdentitas('tanggalDokumen', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TANDA TANGAN & CAP */}
        {activeTab === 'signature' && (
          <div className="space-y-3">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
              <p className="font-bold text-neutral-800 text-[11px] uppercase tracking-wide">
                Fitur Tanda Tangan & Cap Kedinasan:
              </p>

              {/* Checkbox Cap */}
              <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-neutral-100">
                <input
                  type="checkbox"
                  checked={data.signatureSettings.showOfficialStamp}
                  onChange={handleToggleStamp}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <p className="font-semibold text-neutral-900 text-xs">
                    Cap / Stempel Dinas Resmi SMK Negeri 1 Bebandem
                  </p>
                  <p className="text-[10.5px] text-neutral-500">
                    Menampilkan stempel bundar Disdikpora berwarna ungu/biru kedinasan di lembar tanda tangan.
                  </p>
                </div>
              </label>

              {/* Checkbox QR Code */}
              <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-lg hover:bg-neutral-100">
                <input
                  type="checkbox"
                  checked={data.signatureSettings.showQrVerification}
                  onChange={handleToggleQr}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <p className="font-semibold text-neutral-900 text-xs">
                    Badge Verifikasi Digital & QR Code
                  </p>
                  <p className="text-[10.5px] text-neutral-500">
                    Menampilkan barcode/QR validasi elektronik resmi untuk verifikasi dokumen.
                  </p>
                </div>
              </label>
            </div>

            {/* Mode Tanda Tangan */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
              <p className="font-bold text-neutral-800 text-[11px] uppercase tracking-wide">
                Gaya Tanda Tangan:
              </p>

              <div>
                <label className="text-[10.5px] text-neutral-600 block mb-1">
                  Format Tanda Tangan Kepala Sekolah:
                </label>
                <select
                  value={data.signatureSettings.signatureModeKepsek}
                  onChange={(e) =>
                    onChangeData({
                      ...data,
                      signatureSettings: {
                        ...data.signatureSettings,
                        signatureModeKepsek: e.target.value as any,
                      },
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="digital_badge">E-Sign Sertifikasi Elektronik (Rekomendasi)</option>
                  <option value="drawn">Goresan Tanda Tangan (Canvas)</option>
                  <option value="manual">Ruang Kosong untuk Tanda Tangan Basah</option>
                </select>
              </div>

              <div>
                <label className="text-[10.5px] text-neutral-600 block mb-1">
                  Format Tanda Tangan Guru:
                </label>
                <select
                  value={data.signatureSettings.signatureModeGuru}
                  onChange={(e) =>
                    onChangeData({
                      ...data,
                      signatureSettings: {
                        ...data.signatureSettings,
                        signatureModeGuru: e.target.value as any,
                      },
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="digital_badge">E-Sign Validasi Guru Digital (Rekomendasi)</option>
                  <option value="drawn">Goresan Tanda Tangan (Canvas)</option>
                  <option value="manual">Ruang Kosong untuk Tanda Tangan Basah</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
