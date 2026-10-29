import React, { useRef, useState } from 'react';
import { IdentitasDokumen } from '../types';
import { PenTool, CheckCircle2, RotateCcw, ShieldCheck, QrCode } from 'lucide-react';

interface DigitalSignatureBlockProps {
  identitas: IdentitasDokumen;
  settings: {
    showQrVerification: boolean;
    showOfficialStamp: boolean;
    signatureModeGuru: 'digital_badge' | 'drawn' | 'manual';
    signatureModeKepsek: 'digital_badge' | 'drawn' | 'manual';
    drawnSignatureGuruUrl?: string;
    drawnSignatureKepsekUrl?: string;
  };
  onUpdateSettings?: (newSettings: any) => void;
}

export const DigitalSignatureBlock: React.FC<DigitalSignatureBlockProps> = ({
  identitas,
  settings,
  onUpdateSettings,
}) => {
  const [activeModal, setActiveModal] = useState<'guru' | 'kepsek' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1e3a8a';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !onUpdateSettings) return;
    const dataUrl = canvas.toDataURL('image/png');

    if (activeModal === 'guru') {
      onUpdateSettings({
        ...settings,
        signatureModeGuru: 'drawn',
        drawnSignatureGuruUrl: dataUrl,
      });
    } else if (activeModal === 'kepsek') {
      onUpdateSettings({
        ...settings,
        signatureModeKepsek: 'drawn',
        drawnSignatureKepsekUrl: dataUrl,
      });
    }
    setActiveModal(null);
  };

  return (
    <div className="mt-8 pt-4 font-serif text-black print:break-inside-avoid">
      <div className="grid grid-cols-2 gap-6 text-center text-sm md:text-base">
        {/* Kolom Mengetahui Kepala Sekolah */}
        <div className="relative flex flex-col items-center">
          <p className="font-serif">Mengetahui,</p>
          <p className="font-serif font-bold">Kepala SMK Negeri 1 Bebandem</p>

          {/* Area Tanda Tangan & Cap */}
          <div className="relative my-2 w-full h-32 flex items-center justify-center">
            {/* Stempel Resmi Sekolah (Overlay di sisi kiri tanda tangan kepala sekolah) */}
            {settings.showOfficialStamp && (
              <div className="absolute left-6 md:left-12 -top-2 w-28 h-28 pointer-events-none select-none opacity-85 z-0 transform -rotate-12">
                <svg viewBox="0 0 160 160" className="w-full h-full text-indigo-700">
                  <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="3" />
                  <circle cx="80" cy="80" r="66" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                  <circle cx="80" cy="80" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  {/* Teks Melingkar */}
                  <path id="curve-top" d="M 22 80 A 58 58 0 0 1 138 80" fill="none" />
                  <path id="curve-bottom" d="M 138 80 A 58 58 0 0 1 22 80" fill="none" />
                  <text fontSize="9.5" fontWeight="bold" fill="currentColor">
                    <textPath href="#curve-top" startOffset="50%" textAnchor="middle">
                      PEMERINTAH PROVINSI BALI
                    </textPath>
                  </text>
                  <text fontSize="8.5" fontWeight="bold" fill="currentColor">
                    <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">
                      SMK NEGERI 1 BEBANDEM
                    </textPath>
                  </text>
                  {/* Lambang tengah */}
                  <polygon points="80,58 84,68 95,68 86,74 89,84 80,78 71,84 74,74 65,68 76,68" fill="currentColor" />
                  <text x="80" y="98" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor">DISDIKPORA</text>
                </svg>
              </div>
            )}

            {/* Mode Tanda Tangan Kepsek */}
            <div className="relative z-10">
              {settings.signatureModeKepsek === 'digital_badge' && (
                <div className="border border-blue-800 bg-blue-50/70 text-blue-950 px-3 py-1.5 rounded-sm shadow-xs flex items-center gap-2 max-w-xs">
                  {settings.showQrVerification ? (
                    <div className="w-12 h-12 bg-white border border-blue-700 p-0.5 rounded flex items-center justify-center flex-shrink-0">
                      <QrCode className="w-10 h-10 text-blue-900" />
                    </div>
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-blue-800 flex-shrink-0" />
                  )}
                  <div className="text-left leading-tight text-[10px]">
                    <p className="font-bold tracking-tight text-blue-900 uppercase">Telah Ditandatangani Digital</p>
                    <p className="text-slate-600">Sertifikasi Elektronik BSrE</p>
                    <p className="font-mono text-[9px] text-slate-500">DocID: SMKN1BBD-{identitas.tahunPelajaran.replace('/', '')}-VAL</p>
                  </div>
                </div>
              )}

              {settings.signatureModeKepsek === 'drawn' && settings.drawnSignatureKepsekUrl && (
                <img
                  src={settings.drawnSignatureKepsekUrl}
                  alt="Tanda Tangan Kepala Sekolah"
                  className="h-20 object-contain mx-auto"
                />
              )}

              {settings.signatureModeKepsek === 'manual' && (
                <div className="h-20 flex items-center justify-center text-xs text-neutral-400 italic">
                  ( Ruang Tanda Tangan Basah )
                </div>
              )}
            </div>
          </div>

          <p className="font-serif font-bold underline mt-1 text-base">
            {identitas.namaKepalaSekolah}
          </p>
          <p className="font-serif text-xs md:text-sm">
            NIP. {identitas.nipKepalaSekolah}
          </p>

          {/* Quick Edit Signature button (Hidden during Print) */}
          {onUpdateSettings && (
            <div className="mt-2 flex gap-1 print:hidden">
              <button
                type="button"
                onClick={() => setActiveModal('kepsek')}
                className="text-[11px] px-2 py-0.5 rounded border border-neutral-300 hover:bg-neutral-100 flex items-center gap-1 text-neutral-700"
                title="Gambar Tanda Tangan"
              >
                <PenTool className="w-3 h-3" /> Tanda Tangan
              </button>
              <button
                type="button"
                onClick={() =>
                  onUpdateSettings({
                    ...settings,
                    signatureModeKepsek: settings.signatureModeKepsek === 'digital_badge' ? 'manual' : 'digital_badge',
                  })
                }
                className="text-[11px] px-2 py-0.5 rounded border border-neutral-300 hover:bg-neutral-100 text-neutral-700"
              >
                {settings.signatureModeKepsek === 'digital_badge' ? 'Mode Kosong' : 'Mode E-Sign'}
              </button>
            </div>
          )}
        </div>

        {/* Kolom Guru Mata Pelajaran */}
        <div className="relative flex flex-col items-center">
          <p className="font-serif">
            {identitas.tempatDokumen}, {identitas.tanggalDokumen}
          </p>
          <p className="font-serif font-bold">Guru Mata Pelajaran</p>

          {/* Area Tanda Tangan Guru */}
          <div className="relative my-2 w-full h-32 flex items-center justify-center">
            {settings.signatureModeGuru === 'digital_badge' && (
              <div className="border border-emerald-800 bg-emerald-50/70 text-emerald-950 px-3 py-1.5 rounded-sm shadow-xs flex items-center gap-2 max-w-xs">
                {settings.showQrVerification ? (
                  <div className="w-12 h-12 bg-white border border-emerald-700 p-0.5 rounded flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-10 h-10 text-emerald-900" />
                  </div>
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                )}
                <div className="text-left leading-tight text-[10px]">
                  <p className="font-bold tracking-tight text-emerald-900 uppercase">Tervalidasi Digital Guru</p>
                  <p className="text-slate-600">Sistem Perencanaan & Mutu SMK</p>
                  <p className="font-mono text-[9px] text-slate-500">GuruID: {identitas.nipGuru || 'SMK1BBD-GURU'}</p>
                </div>
              </div>
            )}

            {settings.signatureModeGuru === 'drawn' && settings.drawnSignatureGuruUrl && (
              <img
                src={settings.drawnSignatureGuruUrl}
                alt="Tanda Tangan Guru"
                className="h-20 object-contain mx-auto"
              />
            )}

            {settings.signatureModeGuru === 'manual' && (
              <div className="h-20 flex items-center justify-center text-xs text-neutral-400 italic">
                ( Ruang Tanda Tangan Basah )
              </div>
            )}
          </div>

          <p className="font-serif font-bold underline mt-1 text-base">
            {identitas.namaGuru}
          </p>
          <p className="font-serif text-xs md:text-sm">
            NIP. {identitas.nipGuru}
          </p>

          {/* Quick Edit Signature button (Hidden during Print) */}
          {onUpdateSettings && (
            <div className="mt-2 flex gap-1 print:hidden">
              <button
                type="button"
                onClick={() => setActiveModal('guru')}
                className="text-[11px] px-2 py-0.5 rounded border border-neutral-300 hover:bg-neutral-100 flex items-center gap-1 text-neutral-700"
                title="Gambar Tanda Tangan"
              >
                <PenTool className="w-3 h-3" /> Tanda Tangan
              </button>
              <button
                type="button"
                onClick={() =>
                  onUpdateSettings({
                    ...settings,
                    signatureModeGuru: settings.signatureModeGuru === 'digital_badge' ? 'manual' : 'digital_badge',
                  })
                }
                className="text-[11px] px-2 py-0.5 rounded border border-neutral-300 hover:bg-neutral-100 text-neutral-700"
              >
                {settings.signatureModeGuru === 'digital_badge' ? 'Mode Kosong' : 'Mode E-Sign'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Signature Canvas Drawing Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900 mb-1 flex items-center gap-2">
              <PenTool className="w-5 h-5 text-indigo-600" />
              Goreskan Tanda Tangan {activeModal === 'kepsek' ? 'Kepala Sekolah' : 'Guru Pengampu'}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Gunakan kursor mouse, touchpad, atau jari pada layar sentuh.
            </p>

            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-1 bg-neutral-50 mb-4">
              <canvas
                ref={canvasRef}
                width={380}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full bg-white rounded cursor-crosshair touch-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={clearCanvas}
                className="px-3 py-1.5 text-xs font-medium rounded-lg text-neutral-600 hover:bg-neutral-100 flex items-center gap-1 border border-neutral-200"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Hapus
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg text-neutral-600 hover:bg-neutral-100"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Simpan Tanda Tangan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
