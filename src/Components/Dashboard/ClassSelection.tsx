import { useToast } from "@/context/ToastContext";
import { getListKelas, getSiswaMe, updateSiswaKelas, type KelasItem } from "@/lib/client/ppdb";
import { motion } from "framer-motion";
import { Check, Lock, School, Users } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function ClassSelection() {
  const [kelasList, setKelasList] = useState<KelasItem[]>([]);
  const [selectedKelasId, setSelectedKelasId] = useState<number | null>(null);
  const [existingSelection, setExistingSelection] = useState<number | null>(null); // To track if database already has a value
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; kelasId: number | null }>({
    open: false,
    kelasId: null,
  });
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const [kelasRes, siswaRes] = await Promise.all([getListKelas(), getSiswaMe()]);

        if (kelasRes.success && kelasRes.data) {
          setKelasList(kelasRes.data);
        }

        if (siswaRes.success && siswaRes.data) {
          setSelectedKelasId(siswaRes.data.kelas_id);
          setExistingSelection(siswaRes.data.kelas_id);
        }
      } catch (error) {
        console.error("Failed to load data", error);
        toast.error("Gagal memuat data kelas");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [toast]);

  const initiateSelect = (kelasId: number) => {
    // If already locked (existingSelection is present), do nothing
    if (existingSelection) return;

    setConfirmModal({ open: true, kelasId });
  };

  const handleConfirmSelect = async () => {
    const kelasId = confirmModal.kelasId;
    if (!kelasId) return;

    setSaving(true);
    const res = await updateSiswaKelas(kelasId);
    setSaving(false);

    if (res.success) {
      setSelectedKelasId(kelasId);
      setExistingSelection(kelasId); // Lock it
      setConfirmModal({ open: false, kelasId: null });
      toast.success(`Berhasil memilih ${kelasList.find(k => k.kelas_id === kelasId)?.nama}`);
    } else {
      toast.error(res.error || "Gagal menyimpan pilihan kelas");
      setConfirmModal({ open: false, kelasId: null });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-48 animate-pulse bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        Memuat pilihan kelas...
      </div>
    );
  }

  // Helper to guess age group based on class name (simple logic)
  const getAgeGroup = (name: string) => {
    if (name.toLowerCase().includes("a")) return "Usia 4-5 Tahun";
    if (name.toLowerCase().includes("b")) return "Usia 5-6 Tahun";
    return "Taman Kanak-Kanak";
  };

  const getDescription = (name: string) => {
    if (name.toLowerCase().includes("a")) return "Fokus pada sosialisasi, bermain sambil belajar, dan pengenalan dasar.";
    if (name.toLowerCase().includes("b")) return "Persiapan masuk SD, membaca, menulis, berhitung dasar, dan kemandirian.";
    return "Program pendidikan anak usia dini yang menyenangkan.";
  };

  const targetKelas = kelasList.find(k => k.kelas_id === confirmModal.kelasId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <School className="w-5 h-5 text-[#01793B]" />
        <h3 className="text-lg font-bold text-gray-900">Pilih Kelas</h3>
        {existingSelection && (
          <span className="ml-auto text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1.5">
            <Lock size={12} />
            Pilihan terkunci
          </span>
        )}
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {kelasList.map((kelas) => {
          const isSelected = selectedKelasId === kelas.kelas_id;
          const isLocked = !!existingSelection;
          const isOtherSelected = isLocked && !isSelected;

          return (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
              }}
              key={kelas.kelas_id}
              onClick={() => !isLocked && initiateSelect(kelas.kelas_id)}
              whileHover={!isLocked ? { scale: 1.02, y: -2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" } : {}}
              whileTap={!isLocked ? { scale: 0.98 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`
                relative overflow-hidden rounded-2xl border-2 p-6 transition-colors
                ${isSelected
                  ? "border-[#01793B] bg-[#01793B]/5"
                  : isOtherSelected
                    ? "border-slate-100 bg-slate-50 opacity-60 grayscale cursor-not-allowed"
                    : "border-gray-100 bg-white cursor-pointer"
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#01793B] text-white text-xs font-bold px-2 py-1 rounded-full">
                  <Check size={12} />
                  DIPILIH
                </div>
              )}

              <div className="flex flex-col h-full">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold
                  ${isSelected ? "bg-[#01793B] text-white shadow-lg shadow-[#01793B]/20" : "bg-gray-100 text-gray-500"}
                `}>
                  {kelas.nama.charAt(kelas.nama.length - 1)}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-1">{kelas.nama}</h4>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-3">
                  <Users size={16} />
                  {getAgeGroup(kelas.nama)}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  {getDescription(kelas.nama)}
                </p>

                <button
                  disabled={isLocked || saving}
                  className={`
                    mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${isSelected
                      ? "bg-emerald-100 text-emerald-800 cursor-default"
                      : isOtherSelected
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 group-hover:bg-[#01793B] group-hover:text-white"
                    }
                  `}
                >
                  {isLocked
                    ? (isSelected ? "Kelas Terpilih" : "Tidak Dipilih")
                    : "Pilih Kelas Ini"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <ConfirmModal
        open={confirmModal.open}
        onClose={() => setConfirmModal({ ...confirmModal, open: false })}
        onConfirm={handleConfirmSelect}
        title={`Pilih ${targetKelas?.nama}?`}
        description={`Apakah Anda yakin ingin memilih ${targetKelas?.nama}? Pilihan kelas tidak dapat diubah setelah disimpan.`}
        confirmLabel="Ya, Pilih Kelas"
        cancelLabel="Batal"
        isLoading={saving}
      />
    </div>
  );
}
