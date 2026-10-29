import React, { useState } from 'react';
import { SiswaItem, SiswaPengayaanItem } from '../types';
import { Plus, Trash2, CheckCircle2, UserCheck, Users, X } from 'lucide-react';

interface StudentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  kktp: number;
  siswaRemedial: SiswaItem[];
  siswaPengayaan: SiswaPengayaanItem[];
  onSave: (remedial: SiswaItem[], pengayaan: SiswaPengayaanItem[]) => void;
}

export const StudentManagerModal: React.FC<StudentManagerModalProps> = ({
  isOpen,
  onClose,
  kktp,
  siswaRemedial,
  siswaPengayaan,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'remedial' | 'pengayaan'>('remedial');
  const [remedialList, setRemedialList] = useState<SiswaItem[]>(siswaRemedial);
  const [pengayaanList, setPengayaanList] = useState<SiswaPengayaanItem[]>(siswaPengayaan);

  if (!isOpen) return null;

  // Add Remedial
  const handleAddRemedial = () => {
    const newId = `s_${Date.now()}`;
    setRemedialList([
      ...remedialList,
      {
        id: newId,
        no: remedialList.length + 1,
        nama: '',
        nis: `2425${1000 + remedialList.length + 1}`,
        nilaiAwal: 60,
        tpBelumTuntas: 'Konsep dasar indikator TP',
        bentukRemedial: 'Bimbingan khusus dan penugasan soal terstruktur',
        nilaiAkhir: kktp,
        status: 'Tuntas',
      },
    ]);
  };

  // Add Pengayaan
  const handleAddPengayaan = () => {
    const newId = `p_${Date.now()}`;
    setPengayaanList([
      ...pengayaanList,
      {
        id: newId,
        no: pengayaanList.length + 1,
        nama: '',
        nis: `2425${2000 + pengayaanList.length + 1}`,
        nilaiAwal: 85,
        bentukPengayaan: 'Eksplorasi studi kasus nyata dan mini riset',
        nilaiPengayaan: 92,
        keterangan: 'Sangat Baik / Mandiri',
      },
    ]);
  };

  const handleRemoveRemedial = (id: string) => {
    setRemedialList(remedialList.filter((s) => s.id !== id));
  };

  const handleRemovePengayaan = (id: string) => {
    setPengayaanList(pengayaanList.filter((s) => s.id !== id));
  };

  const handleSaveAll = () => {
    onSave(remedialList, pengayaanList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-neutral-200 overflow-hidden">
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-lg">Kelola Data Nilai & Peserta Didik</h3>
              <p className="text-xs text-neutral-500">
                Sesuaikan daftar siswa peserta remedial dan pengayaan beserta nilai awal dan nilai akhirnya.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="px-6 pt-3 border-b border-neutral-200 flex gap-4 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('remedial')}
            className={`pb-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'remedial'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Peserta Remedial ({remedialList.length} Siswa)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pengayaan')}
            className={`pb-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'pengayaan'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Peserta Pengayaan ({pengayaanList.length} Siswa)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'remedial' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-600">
                  Ambang batas KKTP: <strong className="text-emerald-700">{kktp}</strong>. Status tuntas dihitung otomatis jika nilai akhir &ge; {kktp}.
                </p>
                <button
                  type="button"
                  onClick={handleAddRemedial}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Siswa Remedial
                </button>
              </div>

              <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-neutral-100 text-neutral-700 uppercase font-semibold">
                    <tr>
                      <th className="p-2.5 w-10 text-center">No</th>
                      <th className="p-2.5 w-44">Nama Siswa</th>
                      <th className="p-2.5 w-24">NIS</th>
                      <th className="p-2.5 w-20 text-center">Nilai Awal</th>
                      <th className="p-2.5">Bentuk Remedial</th>
                      <th className="p-2.5 w-20 text-center">Nilai Akhir</th>
                      <th className="p-2.5 w-24 text-center">Status</th>
                      <th className="p-2.5 w-12 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {remedialList.map((siswa, index) => (
                      <tr key={siswa.id} className="hover:bg-neutral-50">
                        <td className="p-2 text-center font-mono text-neutral-500">{index + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={siswa.nama}
                            placeholder="Nama Lengkap Siswa"
                            onChange={(e) => {
                              const updated = [...remedialList];
                              updated[index].nama = e.target.value;
                              setRemedialList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs border border-neutral-200 rounded focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={siswa.nis}
                            placeholder="NIS"
                            onChange={(e) => {
                              const updated = [...remedialList];
                              updated[index].nis = e.target.value;
                              setRemedialList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs font-mono border border-neutral-200 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={siswa.nilaiAwal}
                            min={0}
                            max={100}
                            onChange={(e) => {
                              const updated = [...remedialList];
                              updated[index].nilaiAwal = Number(e.target.value);
                              setRemedialList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs text-center border border-neutral-200 rounded text-red-600 font-bold"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={siswa.bentukRemedial}
                            onChange={(e) => {
                              const updated = [...remedialList];
                              updated[index].bentukRemedial = e.target.value;
                              setRemedialList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs border border-neutral-200 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={siswa.nilaiAkhir}
                            min={0}
                            max={100}
                            onChange={(e) => {
                              const updated = [...remedialList];
                              const finalVal = Number(e.target.value);
                              updated[index].nilaiAkhir = finalVal;
                              updated[index].status = finalVal >= kktp ? 'Tuntas' : 'Belum Tuntas';
                              setRemedialList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs text-center border border-neutral-200 rounded text-emerald-700 font-bold"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              siswa.status === 'Tuntas'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {siswa.status}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveRemedial(siswa.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-100"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-600">
                  Daftar peserta didik yang telah melampaui KKTP dan mengikuti pengayaan/projek inovasi vokasi.
                </p>
                <button
                  type="button"
                  onClick={handleAddPengayaan}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Siswa Pengayaan
                </button>
              </div>

              <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-neutral-100 text-neutral-700 uppercase font-semibold">
                    <tr>
                      <th className="p-2.5 w-10 text-center">No</th>
                      <th className="p-2.5 w-44">Nama Siswa</th>
                      <th className="p-2.5 w-24">NIS</th>
                      <th className="p-2.5 w-20 text-center">Nilai Awal</th>
                      <th className="p-2.5">Aktivitas Pengayaan</th>
                      <th className="p-2.5 w-20 text-center">Capaian</th>
                      <th className="p-2.5 w-32">Keterangan</th>
                      <th className="p-2.5 w-12 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {pengayaanList.map((siswa, index) => (
                      <tr key={siswa.id} className="hover:bg-neutral-50">
                        <td className="p-2 text-center font-mono text-neutral-500">{index + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={siswa.nama}
                            placeholder="Nama Siswa"
                            onChange={(e) => {
                              const updated = [...pengayaanList];
                              updated[index].nama = e.target.value;
                              setPengayaanList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs border border-neutral-200 rounded focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={siswa.nis}
                            placeholder="NIS"
                            onChange={(e) => {
                              const updated = [...pengayaanList];
                              updated[index].nis = e.target.value;
                              setPengayaanList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs font-mono border border-neutral-200 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={siswa.nilaiAwal}
                            min={0}
                            max={100}
                            onChange={(e) => {
                              const updated = [...pengayaanList];
                              updated[index].nilaiAwal = Number(e.target.value);
                              setPengayaanList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs text-center border border-neutral-200 rounded font-bold"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={siswa.bentukPengayaan}
                            onChange={(e) => {
                              const updated = [...pengayaanList];
                              updated[index].bentukPengayaan = e.target.value;
                              setPengayaanList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs border border-neutral-200 rounded"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={siswa.nilaiPengayaan}
                            min={0}
                            max={100}
                            onChange={(e) => {
                              const updated = [...pengayaanList];
                              updated[index].nilaiPengayaan = Number(e.target.value);
                              setPengayaanList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs text-center border border-neutral-200 rounded text-blue-700 font-bold"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={siswa.keterangan}
                            onChange={(e) => {
                              const updated = [...pengayaanList];
                              updated[index].keterangan = e.target.value;
                              setPengayaanList(updated);
                            }}
                            className="w-full px-2 py-1 text-xs border border-neutral-200 rounded"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemovePengayaan(siswa.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-100"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-200 rounded-lg"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" /> Terapkan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};
