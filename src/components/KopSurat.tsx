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
        {/* Logo Pemprov Bali (Vector SVG) */}
        <div className="w-20 h-24 flex-shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 120"
            className="w-18 h-22 drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Perisai Segi Lima Bali */}
            <path
              d="M50 4 L94 20 L80 94 L50 116 L20 94 L6 20 Z"
              fill="#c2410c"
              stroke="#fbbf24"
              strokeWidth="3"
            />
            {/* Lingkaran dalam */}
            <circle cx="50" cy="55" r="32" fill="#1e3a8a" stroke="#fef08a" strokeWidth="2" />
            {/* Candi Bentar Meru Simbolik */}
            <path
              d="M38 78 L38 38 L46 32 L46 78 Z"
              fill="#fbbf24"
            />
            <path
              d="M62 78 L62 38 L54 32 L54 78 Z"
              fill="#fbbf24"
            />
            {/* Padi & Kapas */}
            <path
              d="M30 78 C25 60 30 45 42 36"
              stroke="#fef08a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M70 78 C75 60 70 45 58 36"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Pita Bintang */}
            <path d="M32 86 L68 86 L62 94 L38 94 Z" fill="#ffffff" stroke="#991b1b" strokeWidth="1" />
            <text x="50" y="92" fontSize="5" textAnchor="middle" fill="#991b1b" fontWeight="bold">BALI DWIPA</text>
          </svg>
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

        {/* Logo SMK / Kemendikbudristek (Vector SVG) */}
        <div className="w-20 h-24 flex-shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-18 h-18 drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lingkaran Luar Biru Vokasi */}
            <circle cx="50" cy="50" r="46" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            {/* Sayap Kemendikbud / Bintang */}
            <polygon
              points="50,15 54,28 68,28 57,36 61,49 50,41 39,49 43,36 32,28 46,28"
              fill="#fef08a"
            />
            {/* Roda Gigi Vokasi SMK */}
            <circle cx="50" cy="62" r="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="50" cy="62" r="7" fill="#0284c7" />
            {/* Teks SMK BISA */}
            <text x="50" y="90" fontSize="7" textAnchor="middle" fill="#ffffff" fontWeight="bold">SMK BISA-HEBAT</text>
          </svg>
        </div>
      </div>

      {/* Garis ganda kop surat khas instansi pemerintah */}
      <div className="absolute -bottom-[6px] left-0 right-0 border-b-[1px] border-black"></div>
    </div>
  );
};
