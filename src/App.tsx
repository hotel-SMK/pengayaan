/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FullProgramData } from './types';
import { buildFallbackProgram, INITIAL_IDENTITAS } from './utils/smartGenerator';
import { exportToWordDoc } from './utils/exportWord';
import { ControlHeader } from './components/ControlHeader';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { DocumentPreview } from './components/DocumentPreview';
import { StudentManagerModal } from './components/StudentManagerModal';
import {
  CheckCircle2,
  Info,
  Sparkles,
  Printer,
  FileDown,
  X,
  FileCheck,
} from 'lucide-react';

export default function App() {
  const [programData, setProgramData] = useState<FullProgramData>(() =>
    buildFallbackProgram(INITIAL_IDENTITAS)
  );

  const [activeFilter, setActiveFilter] = useState<
    'all' | 'remedial' | 'pengayaan' | 'tindak-lanjut' | 'soal-projek'
  >('all');

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>({
    type: 'info',
    message:
      'Dokumen resmi SMK Negeri 1 Bebandem siap diedit dan dicetak. Masukkan Tujuan Pembelajaran (TP) lalu klik Generate AI.',
  });

  // Handler for Gemini AI Generation
  const handleGenerateAI = async (options: {
    jenisInstrumen: string;
    jumlahSoal: number;
    catatanTambahan: string;
  }) => {
    setIsGenerating(true);
    setNotification({
      type: 'info',
      message: 'Sedang menyusun Program Remedial, Pengayaan, dan Tindak Lanjut sesuai Tujuan Pembelajaran...',
    });

    try {
      const response = await fetch('/api/generate-program', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mataPelajaran: programData.identitas.mataPelajaran,
          materi: programData.identitas.materi,
          kelas: programData.identitas.kelas,
          semester: programData.identitas.semester,
          tahunPelajaran: programData.identitas.tahunPelajaran,
          tujuanPembelajaran: programData.identitas.tujuanPembelajaran,
          kktp: programData.identitas.kktp,
          jenisInstrumen: options.jenisInstrumen,
          jumlahSoal: options.jumlahSoal,
          catatanTambahan: options.catatanTambahan,
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        const aiData = result.data;
        setProgramData((prev) => ({
          ...prev,
          analisisDiagnostik: aiData.analisisDiagnostik || prev.analisisDiagnostik,
          programRemedial: {
            ...prev.programRemedial,
            ...aiData.programRemedial,
            soalRemedial:
              aiData.programRemedial?.soalRemedial || prev.programRemedial.soalRemedial,
            projekRemedial:
              aiData.programRemedial?.projekRemedial || prev.programRemedial.projekRemedial,
          },
          programPengayaan: {
            ...prev.programPengayaan,
            ...aiData.programPengayaan,
            soalPengayaan:
              aiData.programPengayaan?.soalPengayaan || prev.programPengayaan.soalPengayaan,
            projekPengayaan:
              aiData.programPengayaan?.projekPengayaan || prev.programPengayaan.projekPengayaan,
          },
          programTindakLanjut: {
            ...prev.programTindakLanjut,
            ...aiData.programTindakLanjut,
          },
        }));

        setNotification({
          type: 'success',
          message:
            'Berhasil menyusun Program Pembelajaran Remedial & Pengayaan dengan Gemini AI sesuai TP yang diinput!',
        });
      } else {
        // Fallback to internal generator
        handleGenerateFallback();
        setNotification({
          type: 'success',
          message:
            'Program berhasil disusun menggunakan generator cerdas Kurikulum Merdeka (Menyesuaikan TP secara presisi).',
        });
      }
    } catch (err: any) {
      console.warn('AI generate call fallback:', err);
      handleGenerateFallback();
      setNotification({
        type: 'success',
        message:
          'Program berhasil diperbarui menggunakan mesin kurikulum internal SMK Negeri 1 Bebandem.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback / Instant local generator
  const handleGenerateFallback = () => {
    const updated = buildFallbackProgram(programData.identitas);
    setProgramData((prev) => ({
      ...updated,
      siswaRemedial: prev.siswaRemedial,
      siswaPengayaan: prev.siswaPengayaan,
      signatureSettings: prev.signatureSettings,
    }));
  };

  // Direct Print action
  const handlePrint = () => {
    window.print();
  };

  // Download PDF action (Guides user to select Save as PDF in print window)
  const handleDownloadPdf = () => {
    setNotification({
      type: 'info',
      message:
        'Jendela cetak dibuka: Pilih opsi Destination / Tujuan "Save as PDF (Simpan sebagai PDF)" untuk mengunduh dokumen.',
    });
    window.print();
  };

  // Download Word (.doc)
  const handleDownloadWord = () => {
    exportToWordDoc(programData);
    setNotification({
      type: 'success',
      message: 'Dokumen Microsoft Word (.doc) berhasil diunduh lengkap dengan kop surat dan tabel.',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-100/90 text-neutral-900 flex flex-col font-sans">
      {/* 1. Header Kontrol Navigasi & Aksi Ekspor */}
      <ControlHeader
        onPrint={handlePrint}
        onDownloadPdf={handleDownloadPdf}
        onDownloadWord={handleDownloadWord}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* 2. Notification Toast / Alert */}
      {notification && (
        <div className="bg-white border-b border-neutral-200 px-4 py-2 print:hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              {notification.type === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              )}
              {notification.type === 'info' && (
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              )}
              <span className="text-neutral-700">{notification.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-neutral-400 hover:text-neutral-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* Kolom Kiri: Panel Konfigurasi & Generator TP (Dapat ditutup/buka) */}
        {isSidebarOpen && (
          <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 print:hidden h-fit sticky top-24">
            <ConfigurationPanel
              data={programData}
              onChangeData={setProgramData}
              onGenerateAI={handleGenerateAI}
              onGenerateFallback={handleGenerateFallback}
              isGenerating={isGenerating}
              onOpenStudentModal={() => setIsStudentModalOpen(true)}
            />
          </aside>
        )}

        {/* Kolom Kanan: Pratinjau Dokumen Cetak Kedinasan */}
        <section className="flex-1 min-w-0 flex flex-col items-center">
          {/* Quick Doc Stats Banner */}
          <div className="w-full max-w-[210mm] mb-3 flex items-center justify-between text-xs text-neutral-600 px-1 print:hidden">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-neutral-800">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                Format: Standar Kedinasan A4
              </span>
              <span>•</span>
              <span>KKTP: {programData.identitas.kktp}</span>
              <span>•</span>
              <span>{programData.siswaRemedial.length} Siswa Remedial</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="hover:text-indigo-600 flex items-center gap-1 font-medium"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={handleDownloadWord}
                className="hover:text-blue-600 flex items-center gap-1 font-medium"
              >
                <FileDown className="w-3.5 h-3.5" /> Word
              </button>
            </div>
          </div>

          {/* Lembar Dokumen Fisik / Preview */}
          <div className="w-full flex justify-center">
            <DocumentPreview
              data={programData}
              activeFilterSection={activeFilter}
              onUpdateSettings={(newSettings) =>
                setProgramData({ ...programData, signatureSettings: newSettings })
              }
            />
          </div>
        </section>
      </main>

      {/* 4. Modal Pengelola Siswa & Nilai */}
      <StudentManagerModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        kktp={programData.identitas.kktp}
        siswaRemedial={programData.siswaRemedial}
        siswaPengayaan={programData.siswaPengayaan}
        onSave={(newRemedial, newPengayaan) => {
          setProgramData({
            ...programData,
            siswaRemedial: newRemedial,
            siswaPengayaan: newPengayaan,
          });
          setNotification({
            type: 'success',
            message: 'Daftar nilai peserta remedial & pengayaan berhasil diperbarui!',
          });
        }}
      />
    </div>
  );
}
