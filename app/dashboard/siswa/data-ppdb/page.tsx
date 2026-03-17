"use client";

import { useEffect, useState } from "react";
import { User, Home, Phone, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { getSiswaMe, updateSiswaData } from "@/lib/client/ppdb";

export default function SiswaDataPpdbPage() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [ppdbForm, setPpdbForm] = useState({
    nama_anak: "",
    nama_panggilan: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    anak_ke: "",
    nama_ayah: "",
    pekerjaan_ayah: "",
    nama_ibu: "",
    pekerjaan_ibu: "",
    no_whatsapp: "",
    alamat_rumah: "",
  });

  useEffect(() => {
    const load = async () => {
      setError(null);
      const siswaRes = await getSiswaMe();
      if (siswaRes.success && siswaRes.data) {
        const data = siswaRes.data;
        setPpdbForm({
          nama_anak: data.nama_anak || "",
          nama_panggilan: data.nama_panggilan || "",
          tempat_lahir: data.tempat_lahir || "",
          tanggal_lahir: data.tanggal_lahir ? data.tanggal_lahir.split("T")[0] : "",
          jenis_kelamin: data.jenis_kelamin || "",
          anak_ke: data.anak_ke ? String(data.anak_ke) : "",
          nama_ayah: data.nama_ayah || "",
          pekerjaan_ayah: data.pekerjaan_ayah || "",
          nama_ibu: data.nama_ibu || "",
          pekerjaan_ibu: data.pekerjaan_ibu || "",
          no_whatsapp: data.no_whatsapp || "",
          alamat_rumah: data.alamat_rumah || "",
        });
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setSaving(true);

    try {
      const res = await updateSiswaData({
        nama_anak: ppdbForm.nama_anak || null,
        nama_panggilan: ppdbForm.nama_panggilan || null,
        tempat_lahir: ppdbForm.tempat_lahir || null,
        tanggal_lahir: ppdbForm.tanggal_lahir || null,
        jenis_kelamin: ppdbForm.jenis_kelamin || null,
        anak_ke: ppdbForm.anak_ke ? Number(ppdbForm.anak_ke) : null,
        nama_ayah: ppdbForm.nama_ayah || null,
        pekerjaan_ayah: ppdbForm.pekerjaan_ayah || null,
        nama_ibu: ppdbForm.nama_ibu || null,
        pekerjaan_ibu: ppdbForm.pekerjaan_ibu || null,
        no_whatsapp: ppdbForm.no_whatsapp || null,
        alamat_rumah: ppdbForm.alamat_rumah || null,
      });

      setSaving(false);
      if (!res.success) {
        setError(res.error || "Gagal menyimpan data PPDB");
        return;
      }
      setSuccessMessage("Data PPDB berhasil disimpan");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setSaving(false);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">{error}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-linear-to-r from-[#01793B]/5 to-[#01793B]/10 rounded-2xl p-6 border border-[#01793B]/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#01793B]/15 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-[#01793B]" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Data Pendaftaran PPDB</h1>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Lengkapi semua informasi data pribadi dan data orang tua/wali dengan benar dan sesuai dengan dokumen asli Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="w-full rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-[#01793B]/5 to-[#01793B]/10 px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Formulir Lengkap</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          {/* DATA CALON SISWA */}
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b-2 border-[#01793B]/10">
              <h3 className="text-lg font-bold text-gray-900">Bagian 1: Data Calon Siswa</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-5 bg-linear-to-br from-blue-50/40 to-blue-50/20 p-6 rounded-xl border border-blue-100/30">
              <FormInput
                label="Nama Lengkap Anak"
                placeholder="Sesuai Akta Kelahiran"
                value={ppdbForm.nama_anak}
                onChange={(e) => setPpdbForm((f) => ({ ...f, nama_anak: e.target.value }))}
                helpText="Harus sesuai dengan identitas resmi"
              />
              <FormInput
                label="Nama Panggilan"
                placeholder="Nama Panggilan"
                value={ppdbForm.nama_panggilan}
                onChange={(e) => setPpdbForm((f) => ({ ...f, nama_panggilan: e.target.value }))}
              />
              <FormInput
                label="Tempat Lahir"
                placeholder="Kota Kelahiran"
                value={ppdbForm.tempat_lahir}
                onChange={(e) => setPpdbForm((f) => ({ ...f, tempat_lahir: e.target.value }))}
              />
              <FormInput
                label="Tanggal Lahir"
                type="date"
                placeholder=""
                value={ppdbForm.tanggal_lahir}
                onChange={(e) => setPpdbForm((f) => ({ ...f, tanggal_lahir: e.target.value }))}
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Jenis Kelamin</label>
                <div className="flex gap-3">
                  <FormRadio
                    label="Laki-laki"
                    name="jenis_kelamin"
                    value="Laki-laki"
                    checked={ppdbForm.jenis_kelamin === "Laki-laki"}
                    onChange={(e) =>
                      setPpdbForm((f) => ({ ...f, jenis_kelamin: e.target.value }))
                    }
                  />
                  <FormRadio
                    label="Perempuan"
                    name="jenis_kelamin"
                    value="Perempuan"
                    checked={ppdbForm.jenis_kelamin === "Perempuan"}
                    onChange={(e) =>
                      setPpdbForm((f) => ({ ...f, jenis_kelamin: e.target.value }))
                    }
                  />
                </div>
              </div>

              <FormInput
                label="Anak Ke-"
                type="number"
                placeholder="Urutan anak"
                value={ppdbForm.anak_ke}
                onChange={(e) => setPpdbForm((f) => ({ ...f, anak_ke: e.target.value }))}
                helpText="Contoh: 1, 2, 3, dst"
              />
            </div>
          </div>

          <div className="h-0.5 bg-gray-100"></div>

          {/* DATA ORANG TUA */}
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b-2 border-[#01793B]/10">
              <h3 className="text-lg font-bold text-gray-900">Bagian 2: Data Orang Tua / Wali</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-5 bg-linear-to-br from-emerald-50/40 to-emerald-50/20 p-6 rounded-xl border border-emerald-100/30">
              <FormInput
                label="Nama Ayah"
                placeholder="Nama Lengkap Ayah"
                value={ppdbForm.nama_ayah}
                onChange={(e) => setPpdbForm((f) => ({ ...f, nama_ayah: e.target.value }))}
              />
              <FormInput
                label="Pekerjaan Ayah"
                placeholder="Pekerjaan saat ini"
                value={ppdbForm.pekerjaan_ayah}
                onChange={(e) => setPpdbForm((f) => ({ ...f, pekerjaan_ayah: e.target.value }))}
              />
              <FormInput
                label="Nama Ibu"
                placeholder="Nama Lengkap Ibu"
                value={ppdbForm.nama_ibu}
                onChange={(e) => setPpdbForm((f) => ({ ...f, nama_ibu: e.target.value }))}
              />
              <FormInput
                label="Pekerjaan Ibu"
                placeholder="Pekerjaan saat ini"
                value={ppdbForm.pekerjaan_ibu}
                onChange={(e) => setPpdbForm((f) => ({ ...f, pekerjaan_ibu: e.target.value }))}
              />
              <FormInput
                label="No. WhatsApp Aktif"
                type="tel"
                placeholder="0812xxxxxxxxxx"
                value={ppdbForm.no_whatsapp}
                onChange={(e) => setPpdbForm((f) => ({ ...f, no_whatsapp: e.target.value }))}
                icon={<Phone className="w-4 h-4 text-gray-400" />}
                helpText="Nomor yang aktif untuk komunikasi"
              />
              <FormInput
                label="Alamat Rumah"
                placeholder="Alamat Lengkap Domisili"
                value={ppdbForm.alamat_rumah}
                onChange={(e) => setPpdbForm((f) => ({ ...f, alamat_rumah: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#01793B] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <Save className="w-4 h-4" />
              {saving ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
  icon,
  value,
  onChange,
  helpText,
}: {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/30 transition-all text-sm bg-white"
        />
        {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2">{icon}</div>}
      </div>
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}

function FormRadio({
  label,
  name,
  value,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg border-2 transition-all ${
        checked ? "border-[#01793B] bg-[#01793B]/5" : "border-gray-200 bg-transparent"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-[#01793B] w-4 h-4"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}
