"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import AdminInformasiSection from "@/Components/Dashboard/Admin/AdminInformasiSection";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { InformasiSekolahItem, createInformasiSekolah, deleteInformasiSekolah, listInformasiSekolah, updateInformasiSekolah, listKomentarAdmin, deleteKomentar, PublicKomentar, addKomentarAdmin } from "@/lib/client/admin";
import { toast } from "react-hot-toast";

export default function AdminInformasiPage() {
  const router = useRouter();
  const { setDashboardInfo } = useDashboard();
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
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Comments management context
  const [showComments, setShowComments] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<InformasiSekolahItem | null>(null);
  const [comments, setComments] = useState<PublicKomentar[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);

  useEffect(() => {
    setDashboardInfo("Blog", "Kelola artikel blog untuk website");
  }, [setDashboardInfo]);

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
  }, [router, setDashboardInfo]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  const handleCreateInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tid = toast.loading("Sedang memposting artikel...");
    setIsProcessing(true);
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
    setIsProcessing(false);
    
    if (!response.success) {
      toast.error(response.error || "Gagal membuat artikel", { id: tid });
      return;
    }
    
    toast.success("Artikel berhasil diposting!", { id: tid });
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
    const infoId = Number(infoUpdate.info_id);
    if (!infoId) return;

    const tid = toast.loading("Menyimpan perubahan...");
    setIsProcessing(true);
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
    setIsProcessing(false);
    
    if (!response.success) {
      toast.error(response.error || "Gagal memperbarui artikel", { id: tid });
      return;
    }
    
    toast.success("Perubahan berhasil disimpan!", { id: tid });
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
    const tid = toast.loading("Menghapus artikel...");
    setIsProcessing(true);
    const response = await deleteInformasiSekolah(info_id);
    setIsProcessing(false);
    
    if (!response.success) {
      toast.error(response.error || "Gagal menghapus artikel", { id: tid });
      return;
    }
    
    toast.success("Artikel berhasil dihapus", { id: tid });
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
  
  const handleViewComments = async (info: InformasiSekolahItem) => {
    setSelectedInfo(info);
    setShowComments(true);
    setLoadingComments(true);
    const res = await listKomentarAdmin(info.info_id);
    if (res.success) {
      setComments(res.data || []);
    } else {
      toast.error(res.error || "Gagal memuat komentar");
    }
    setLoadingComments(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("Yakin ingin menghapus komentar ini?")) return;
    
    setDeletingCommentId(commentId);
    const res = await deleteKomentar(commentId);
    setDeletingCommentId(null);
    
    if (res.success) {
      toast.success("Komentar berhasil dihapus");
      setComments(prev => prev.filter(c => c.komentar_id !== commentId));
    } else {
      toast.error(res.error || "Gagal menghapus komentar");
    }
  };

  const handleReplyComment = async (commentId: number, isi: string) => {
    if (!selectedInfo) return false;
    if (!isi.trim()) {
      toast.error("Isi balasan tidak boleh kosong");
      return false;
    }

    const profile = await fetchProfile();
    if (!profile.success || !profile.data) return false;

    const tid = toast.loading("Mengirim balasan...");
    const res = await addKomentarAdmin(selectedInfo.info_id, {
      nama: profile.data.nama_lengkap,
      isi,
      parent_id: commentId
    });

    if (res.success) {
      toast.success("Balasan berhasil dikirim", { id: tid });
      // Refresh comments
      const refreshed = await listKomentarAdmin(selectedInfo.info_id);
      if (refreshed.success) setComments(refreshed.data || []);
      return true;
    } else {
      toast.error(res.error || "Gagal mengirim balasan", { id: tid });
      return false;
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
    <>
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
        isLoading={isProcessing}
        onViewComments={handleViewComments}
        showComments={showComments}
        comments={comments}
        loadingComments={loadingComments}
        onDeleteComment={handleDeleteComment}
        selectedInfo={selectedInfo}
        onCloseComments={() => setShowComments(false)}
        deletingCommentId={deletingCommentId}
        onReplyComment={handleReplyComment}
      />
    </>
  );
}

