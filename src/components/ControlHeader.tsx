import React from 'react';
import {
  Printer,
  FileDown,
  FileText,
  Users,
  SlidersHorizontal,
  Sparkles,
  Layers,
  BookOpen,
} from 'lucide-react';

interface ControlHeaderProps {
  onPrint: () => void;
  onDownloadPdf: () => void;
  onDownloadWord: () => void;
  onOpenStudentModal: () => void;
  activeFilter: 'all' | 'remedial' | 'pengayaan' | 'tindak-lanjut' | 'soal-projek';
  onSelectFilter: (filter: 'all' | 'remedial' | 'pengayaan' | 'tindak-lanjut' | 'soal-projek') => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const ControlHeader: React.FC<ControlHeaderProps> = ({
  onPrint,
  onDownloadPdf,
  onDownloadWord,
  onOpenStudentModal,
  activeFilter,
  onSelectFilter,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 print:hidden shadow-xs">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & School Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-base">
            SR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm md:text-base text-neutral-900 leading-none">
                SI-REMA SMK Negeri 1 Bebandem
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                T.A. 2026/2027
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Program Remedial, Pengayaan & Tindak Lanjut Berbasis TP
            </p>
          </div>
        </div>

        {/* Action Buttons: Word, PDF, Print, Kelola Siswa, Toggle Sidebar */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Kelola Siswa */}
          <button
            type="button"
            onClick={onOpenStudentModal}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center gap-1.5 border border-neutral-200 transition-all"
            title="Kelola Daftar Siswa & Nilai"
          >
            <Users className="w-3.5 h-3.5 text-neutral-600" />
            <span className="hidden md:inline">Kelola Siswa</span>
          </button>

          {/* Unduh Word */}
          <button
            type="button"
            onClick={onDownloadWord}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
            title="Unduh dalam format Microsoft Word (.doc)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Unduh Word (.doc)</span>
          </button>

          {/* Unduh / Cetak PDF */}
          <button
            type="button"
            onClick={onDownloadPdf}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
            title="Unduh / Simpan sebagai PDF"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Unduh PDF</span>
          </button>

          {/* Cetak Langsung */}
          <button
            type="button"
            onClick={onPrint}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-black text-white flex items-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
            title="Cetak Dokumen ke Printer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen</span>
          </button>

          {/* Toggle Sidebar (for quick edit / TP) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all ${
              isSidebarOpen
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            }`}
            title="Tampilkan / Sembunyikan Panel Input"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden lg:inline">{isSidebarOpen ? 'Tutup Panel' : 'Edit & Buat'}</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar: Document Views */}
      <div className="bg-neutral-50/90 border-t border-neutral-200/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs overflow-x-auto gap-2">
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-[11px] text-neutral-500 font-medium mr-1 hidden sm:inline">
              Tampilan Dokumen:
            </span>
            <button
              type="button"
              onClick={() => onSelectFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              Semua (Lengkap)
            </button>
            <button
              type="button"
              onClick={() => onSelectFilter('remedial')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeFilter === 'remedial'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              Program Remedial
            </button>
            <button
              type="button"
              onClick={() => onSelectFilter('pengayaan')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeFilter === 'pengayaan'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              Program Pengayaan
            </button>
            <button
              type="button"
              onClick={() => onSelectFilter('tindak-lanjut')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeFilter === 'tindak-lanjut'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              Program Tindak Lanjut
            </button>
            <button
              type="button"
              onClick={() => onSelectFilter('soal-projek')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeFilter === 'soal-projek'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              Soal & Tugas Projek
            </button>
          </div>

          <div className="text-[11px] text-neutral-500 hidden xl:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Siap cetak standar margin A4 kedinasan
          </div>
        </div>
      </div>
    </header>
  );
};
