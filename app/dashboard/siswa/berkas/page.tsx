"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import SiswaUploadSection from "@/Components/Dashboard/Siswa/SiswaUploadSection";
import SiswaBerkasSection from "@/Components/Dashboard/Siswa/SiswaBerkasSection";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import {
  BerkasSiswaItem,
  CreateBerkasPayload,
  JenisBerkasItem,
  createBerkas,
  deleteBerkas,
  ensureSiswa,
  listBerkas,
  listJenisBerkas,
  updateBerkas,
  uploadBerkasFile,
} from "@/lib/client/ppdb";

export default function SiswaBerkasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>("");
  const [berkasList, setBerkasList] = useState<BerkasSiswaItem[]>([]);
  const [jenisBerkasList, setJenisBerkasList] = useState<JenisBerkasItem[]>([]);
  const [form, setForm] = useState<CreateBerkasPayload>({
    jenis_berkas_id: 0,
    nama_file: "",
    path_file: "",
    ukuran_file: 0,
    tipe_file: "",
  });
  const [fileName, setFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role === "admin") {
        router.push("/dashboard/admin");
        return;
      }
      setProfileName(profile.data.nama_lengkap);
      await ensureSiswa();
      const [jenisRes, berkasResponse] = await Promise.all([
        listJenisBerkas(),
        listBerkas(),
      ]);
      if (jenisRes.success && jenisRes.data?.length) {
        setJenisBerkasList(jenisRes.data);
        setForm((f) => ({ ...f, jenis_berkas_id: jenisRes.data![0].jenis_berkas_id }));
      }
      if (!berkasResponse.success) {
        setError(berkasResponse.error || "Gagal memuat berkas");
      }
      setBerkasList(berkasResponse.data || []);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!form.jenis_berkas_id || form.jenis_berkas_id < 1) {
      setError("Pilih jenis berkas");
      return;
    }
    if (!selectedFile) {
      setError("Pilih file untuk diunggah");
      return;
    }
    const uploadRes = await uploadBerkasFile(selectedFile);
    if (!uploadRes.success || !uploadRes.data) {
      setError(uploadRes.error || "Gagal mengunggah file");
      return;
    }
    const payload: CreateBerkasPayload = {
      jenis_berkas_id: form.jenis_berkas_id,
      nama_file: uploadRes.data.nama_file,
      path_file: uploadRes.data.path_file,
      ukuran_file: uploadRes.data.ukuran_file,
      tipe_file: uploadRes.data.tipe_file,
    };
    const response = await createBerkas(payload);
    if (!response.success) {
      setError(response.error || "Gagal menyimpan berkas");
      return;
    }
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) {
      setBerkasList(refreshed.data);
    }
    setForm({
      ...form,
      nama_file: "",
      path_file: "",
      ukuran_file: 0,
      tipe_file: "",
    });
    setFileName("");
    setSelectedFile(null);
  };

  const handleDelete = async (berkasSiswaId: number) => {
    setError(null);
    const response = await deleteBerkas(berkasSiswaId);
    if (!response.success) {
      setError(response.error || "Gagal menghapus berkas");
      return;
    }
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) setBerkasList(refreshed.data);
  };

  const handleUpdate = async (
    berkasSiswaId: number,
    payload: Partial<CreateBerkasPayload>,
    newFile?: File
  ) => {
    setError(null);
    let finalPayload = payload;
    if (newFile) {
      const uploadRes = await uploadBerkasFile(newFile);
      if (!uploadRes.success || !uploadRes.data) {
        setError(uploadRes.error || "Gagal mengunggah file");
        throw new Error(uploadRes.error);
      }
      finalPayload = {
        nama_file: uploadRes.data.nama_file,
        path_file: uploadRes.data.path_file,
        ukuran_file: uploadRes.data.ukuran_file,
        tipe_file: uploadRes.data.tipe_file,
      };
    }
    const response = await updateBerkas(berkasSiswaId, finalPayload);
    if (!response.success) {
      setError(response.error || "Gagal memperbarui berkas");
      throw new Error(response.error);
    }
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) setBerkasList(refreshed.data);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat berkas...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Berkas PPDB"
      subtitle={`Halo, ${profileName}`}
      sidebarTitle="Siswa Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/siswa" },
        { label: "Status PPDB", href: "/dashboard/siswa/status" },
        { label: "Upload Berkas", href: "/dashboard/siswa/berkas" },
        { label: "Profil", href: "/dashboard/siswa/profile" },
      ]}
      onLogout={handleLogout}
    >
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      ) : null}

      <div className="space-y-8">
        <SiswaUploadSection
          form={form}
          fileName={fileName}
          jenisBerkasList={jenisBerkasList}
          onChangeForm={setForm}
          onChangeFileName={setFileName}
          onFileSelect={setSelectedFile}
          onSubmit={handleSubmit}
        />

        <SiswaBerkasSection
          berkasList={berkasList}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </DashboardShell>
  );
}

