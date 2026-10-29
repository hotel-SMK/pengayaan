import React from 'react';
import { IdentitasDokumen } from '../types';

interface KopSuratProps {
  identitas: IdentitasDokumen;
}

export const KopSurat: React.FC<KopSuratProps> = ({ identitas }) => {
  return (
    <div className="relative border-b-[3.5px] border-black pb-2 mb-6">
      {/* Container with logos on both sides and centered text */}
      <div className="flex items-center justify-between gap-4">
        {/* Logo Pemprov Bali (Sebelah Kiri Atas) */}
        <div className="w-20 h-24 flex-shrink-0 flex items-center justify-center">
          <img
            src="https://i.imgur.com/FPCA2Ql.png"
            alt="Logo Pemerintah Provinsi Bali"
            className="max-h-24 max-w-20 object-contain drop-shadow-xs"
            crossOrigin="anonymous"
          />
        </div>

        {/* Text Header Resmi */}
        <div className="flex-1 text-center text-black leading-tight select-text">
          <h3 className="font-serif text-sm md:text-base font-bold tracking-wider uppercase">
            {identitas.namaProvinsi}
          </h3>
          <h2 className="font-serif text-sm md:text-base font-bold tracking-wide uppercase mt-0.5">
            {identitas.namaDinas}
          </h2>
          <h1 className="font-serif text-lg md:text-2xl font-black tracking-widest uppercase mt-0.5 text-black">
            {identitas.namaSekolah}
          </h1>
          <p className="font-serif text-xs md:text-sm font-bold tracking-wide mt-0.5">
            TAHUN AJARAN {identitas.tahunPelajaran}
          </p>
          <p className="font-serif text-[11px] md:text-xs text-neutral-800 mt-1 italic">
            {identitas.alamatSekolah}
          </p>
          <p className="font-serif text-[10px] md:text-[11px] text-neutral-700">
            Telp: {identitas.teleponSekolah} | Website: {identitas.websiteSekolah}
          </p>
        </div>

        {/* Logo SMK Negeri 1 Bebandem (Sebelah Kanan Atas) */}
        <div className="w-20 h-24 flex-shrink-0 flex items-center justify-center">
          <img
            src="https://i.imgur.com/zuR9i4p.png"
            alt="Logo SMK Negeri 1 Bebandem"
            className="max-h-24 max-w-20 object-contain drop-shadow-xs"
            crossOrigin="anonymous"
          />
        </div>
      </div>

      {/* Garis ganda kop surat khas instansi pemerintah */}
      <div className="absolute -bottom-[6px] left-0 right-0 border-b-[1px] border-black"></div>
    </div>
  );
};
