"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import AdminInformasiSection from "@/Components/Dashboard/Admin/AdminInformasiSection";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import {
  InformasiSekolahItem,
  createInformasiSekolah,
  deleteInformasiSekolah,
  listInformasiSekolah,
  updateInformasiSekolah,
} from "@/lib/client/admin";

export default function AdminInformasiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [infoList, setInfoList] = useState<InformasiSekolahItem[]>([]);
  const [infoForm, setInfoForm] = useState({
    judul: "",
    slug: "",
    konten: "",
    ringkasan: "",
    gambar: "",
    tipe: "berita",
    status: "draft",
    urutan: 1,
  });
  const [infoUpdate, setInfoUpdate] = useState({
    info_id: "",
    judul: "",
    slug: "",
    konten: "",
    ringkasan: "",
    gambar: "",
    tipe: "berita",
    status: "draft",
    urutan: 1,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role !== "admin") {
        router.push("/dashboard/siswa");
        return;
      }
      const infoResponse = await listInformasiSekolah();
      if (!infoResponse.success) {
        setError(infoResponse.error || "Gagal memuat informasi sekolah");
      }
      setInfoList(infoResponse.data || []);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  const handleCreateInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const response = await createInformasiSekolah({
      judul: infoForm.judul,
      slug: infoForm.slug,
      konten: infoForm.konten,
      ringkasan: infoForm.ringkasan || null,
      gambar: infoForm.gambar || null,
      tipe: infoForm.tipe,
      status: infoForm.status,
      urutan: Number(infoForm.urutan),
    });
    if (!response.success) {
      setError(response.error || "Gagal membuat informasi sekolah");
      return;
    }
    const refreshed = await listInformasiSekolah();
    if (refreshed.success && refreshed.data) {
      setInfoList(refreshed.data);
    }
    setInfoForm({
      judul: "",
      slug: "",
      konten: "",
      ringkasan: "",
      gambar: "",
      tipe: "berita",
      status: "draft",
      urutan: 1,
    });
  };

  const handleUpdateInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const infoId = Number(infoUpdate.info_id);
    if (!infoId) {
      setError("Pilih informasi dari daftar untuk diperbarui");
      return;
    }
    const response = await updateInformasiSekolah(infoId, {
      judul: infoUpdate.judul,
      slug: infoUpdate.slug,
      konten: infoUpdate.konten,
      ringkasan: infoUpdate.ringkasan || null,
      gambar: infoUpdate.gambar || null,
      tipe: infoUpdate.tipe,
      status: infoUpdate.status,
      urutan: Number(infoUpdate.urutan),
    });
    if (!response.success) {
      setError(response.error || "Gagal memperbarui informasi sekolah");
      return;
    }
    const refreshed = await listInformasiSekolah();
    if (refreshed.success && refreshed.data) {
      setInfoList(refreshed.data);
    }
    setInfoUpdate({
      info_id: "",
      judul: "",
      slug: "",
      konten: "",
      ringkasan: "",
      gambar: "",
      tipe: "berita",
      status: "draft",
      urutan: 1,
    });
    setEditingId(null);
  };

  const handleSelectInfo = (info: InformasiSekolahItem) => {
    setInfoUpdate({
      info_id: String(info.info_id),
      judul: info.judul,
      slug: info.slug,
      konten: info.konten,
      ringkasan: info.ringkasan || "",
      gambar: info.gambar || "",
      tipe: info.tipe,
      status: info.status,
      urutan: info.urutan,
    });
    setEditingId(info.info_id);
    setError(null);
  };

  const handleCloseEditModal = () => {
    setEditingId(null);
  };

  const handleDeleteInfo = async (info_id: number) => {
    if (!confirm("Yakin ingin menghapus informasi ini?")) return;
    setError(null);
    const response = await deleteInformasiSekolah(info_id);
    if (!response.success) {
      setError(response.error || "Gagal menghapus informasi");
      return;
    }
    const refreshed = await listInformasiSekolah();
    if (refreshed.success && refreshed.data) {
      setInfoList(refreshed.data);
    }
    if (infoUpdate.info_id === String(info_id)) {
      setInfoUpdate({
        info_id: "",
        judul: "",
        slug: "",
        konten: "",
        ringkasan: "",
        gambar: "",
        tipe: "berita",
        status: "draft",
        urutan: 1,
      });
      setEditingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat informasi sekolah...
      </div>
    );
  }

  return (
    <DashboardShell
      title="Blog"
      subtitle="Kelola artikel blog untuk website"
      sidebarTitle="Admin Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/admin" },
        { label: "Jadwal PPDB", href: "/dashboard/admin/jadwal-ppdb" },
        { label: "Kelas PPDB", href: "/dashboard/admin/kelas" },
        { label: "PPDB", href: "/dashboard/admin/ppdb" },
        { label: "Blog", href: "/dashboard/admin/informasi" },
        { label: "Profil", href: "/dashboard/admin/profile" },
      ]}
      onLogout={handleLogout}
    >
      {error ? (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      ) : null}

      <AdminInformasiSection
        infoList={infoList}
        infoForm={infoForm}
        infoUpdate={infoUpdate}
        onChangeInfoForm={setInfoForm}
        onChangeInfoUpdate={setInfoUpdate}
        onCreate={handleCreateInfo}
        onUpdate={handleUpdateInfo}
        onSelectInfo={handleSelectInfo}
        onDeleteInfo={handleDeleteInfo}
        editingId={editingId}
        onCloseEditModal={handleCloseEditModal}
      />
    </DashboardShell>
  );
}

