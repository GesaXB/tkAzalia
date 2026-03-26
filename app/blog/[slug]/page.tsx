"use client";

import type { PublicInformasiSekolahItem, PublicKomentar } from "@/lib/client/public";
import { getArtikelBySlug, listKomentarByInfoId, addKomentar, updateKomentar, publicDeleteKomentar } from "@/lib/client/public";
import { fetchProfile, AuthUser } from "@/lib/client/auth";
import { ArrowLeft, Calendar, ImageIcon, Share2, MessageCircle, Send, User, ChevronRight, Trash2, Edit2, X, Check, Reply, CornerDownRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

import ConfirmModal from "@/Components/ui/ConfirmModal";

const KATEGORI_LABEL: Record<string, string> = {
  berita: "Berita",
  artikel: "Artikel",
  kegiatan: "Kegiatan",
  profil: "Profil",
  visi: "Visi",
  misi: "Misi",
  fasilitas: "Fasilitas",
  kontak: "Kontak",
  syarat_pendaftaran: "Syarat Pendaftaran",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Sub-component for individual comments
interface CommentItemProps {
  comment: PublicKomentar;
  user: AuthUser | null;
  isReply?: boolean;
  onReply?: () => void;
  onEdit: (val: string) => void;
  onDelete: () => void;
  isEditing: boolean;
  editValue: string;
  setEditValue: (val: string) => void;
  onUpdate: () => void;
  onCancelEdit: () => void;
  isUpdating: boolean;
}

const CommentItem = ({ 
  comment, 
  user, 
  isReply = false, 
  onReply, 
  onEdit, 
  onDelete, 
  isEditing, 
  editValue, 
  setEditValue, 
  onUpdate, 
  onCancelEdit,
  isUpdating
}: CommentItemProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-4 group"
  >
    <div className={`rounded-full bg-emerald-100 flex items-center justify-center shrink-0 ${isReply ? 'w-8 h-8' : 'w-10 h-10'}`}>
      <User size={isReply ? 16 : 20} className="text-emerald-600" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-2">
          <h5 className={`${isReply ? 'text-xs' : 'text-sm'} font-bold text-gray-900`}>{comment.nama}</h5>
          <span className="text-[10px] text-gray-400 font-medium">
            {formatDate(comment.created_at)}
          </span>
          
          {/* Edit/Delete/Reply for Owner/Admin */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
            {!isEditing && !isReply && user && (
              <button
                onClick={onReply}
                className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100"
                title="Balas komentar"
              >
                <Reply size={14} />
              </button>
            )}
            
            {(user?.user_id === comment.user_id || user?.role === 'admin') && (
              <>
                {user?.user_id === comment.user_id && !isEditing && (
                  <button
                    onClick={() => onEdit(comment.isi)}
                    className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100"
                    title="Edit komentar"
                  >
                    <Edit2 size={14} />
                  </button>
                )}
                <button
                  onClick={onDelete}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                  title="Hapus komentar"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {isEditing ? (
        <div className="mt-2 space-y-3">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 bg-white text-sm focus:border-emerald-500 outline-none transition-all resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancelEdit}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-all"
            >
              <X size={12} /> Batal
            </button>
            <button
              onClick={onUpdate}
              disabled={isUpdating}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              {isUpdating ? "..." : (
                <>
                  <Check size={12} /> Simpan
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className={`${isReply ? 'text-xs' : 'text-sm'} text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl rounded-tl-none inline-block border border-gray-100/50`}>
          {comment.isi}
        </p>
      )}
    </div>
  </motion.div>
);

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [post, setPost] = useState<PublicInformasiSekolahItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // User state
  const [user, setUser] = useState<AuthUser | null>(null);

  // Comments state
  const [comments, setComments] = useState<PublicKomentar[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState({ nama: "", isi: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit state
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Reply state
  const [replyTo, setReplyTo] = useState<PublicKomentar | null>(null);
  const [replyValue, setReplyValue] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      const res = await getArtikelBySlug(slug);
      if (!res.success) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPost(res.data || null);
      setLoading(false);
      
      // Load comments if post found
      if (res.data?.info_id) {
        loadComments(res.data.info_id);
      }
    };
    load();

    // Check auth
    const checkAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('tkazalia_token') : null;
      if (token) {
        const res = await fetchProfile();
        if (res.success) {
          setUser(res.data || null);
        }
      }
    };
    checkAuth();
  }, [slug]);

  const loadComments = async (infoId: number) => {
    setLoadingComments(true);
    const res = await listKomentarByInfoId(infoId);
    if (res.success) setComments(res.data || []);
    setLoadingComments(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.judul,
          text: post?.ringkasan || "",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link berhasil disalin!");
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post?.info_id) return;
    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk berkomentar");
      return;
    }
    if (!newComment.isi) {
      toast.error("Isi komentar wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    const res = await addKomentar(post.info_id, { nama: user.nama_lengkap, isi: newComment.isi });
    if (res.success) {
      toast.success("Komentar berhasil dikirim!");
      setNewComment({ nama: "", isi: "" });
      setReplyTo(null);
      setReplyValue("");
      loadComments(post.info_id);
    } else {
      toast.error(res.error || res.message || "Gagal mengirim komentar");
    }
    setIsSubmitting(false);
  };

  const handleReplyComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post?.info_id || !replyTo) return;
    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk membalas");
      return;
    }
    if (!replyValue.trim()) {
      toast.error("Isi balasan wajib diisi!");
      return;
    }

    setIsReplying(true);
    const res = await addKomentar(post.info_id, { 
      nama: user.nama_lengkap, 
      isi: replyValue, 
      parent_id: replyTo.komentar_id 
    });
    
    if (res.success) {
      toast.success("Balasan berhasil dikirim!");
      setReplyValue("");
      setReplyTo(null);
      loadComments(post.info_id);
    } else {
      toast.error(res.error || res.message || "Gagal mengirim balasan");
    }
    setIsReplying(false);
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!editValue.trim()) {
      toast.error("Komentar tidak boleh kosong!");
      return;
    }

    setIsUpdating(true);
    const res = await updateKomentar(commentId, editValue);
    if (res.success) {
      toast.success("Komentar berhasil diperbarui!");
      setEditingComment(null);
      if (post?.info_id) loadComments(post.info_id);
    } else {
      toast.error(res.error || "Gagal memperbarui komentar");
    }
    setIsUpdating(false);
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    
    setIsDeleting(true);
    // Use public version that handles both admin and owner
    const res = await publicDeleteKomentar(commentToDelete);
    if (res.success) {
      toast.success("Komentar berhasil dihapus");
      if (post?.info_id) loadComments(post.info_id);
      setIsModalOpen(false);
      setCommentToDelete(null);
    } else {
      toast.error(res.error || "Gagal menghapus komentar");
    }
    setIsDeleting(false);
  };

  // Reading progress bar - thinner and more subtle
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-4 bg-gray-50 rounded-full w-24 mx-auto" />
            <div className="h-12 bg-gray-50 rounded-2xl w-full" />
            <div className="aspect-video bg-gray-50 rounded-3xl w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-16 flex items-center justify-center text-center">
        <div className="px-6">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ImageIcon size={32} className="text-gray-200" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Artikel tidak ditemukan</h1>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:underline"
          >
            <ArrowLeft size={16} /> Kembali ke Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Subtle Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-0.5 bg-gray-50 z-50">
        <motion.div
          className="h-full bg-emerald-500"
          animate={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <main className="min-h-screen bg-white">
        <article className="pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-6">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-emerald-600 transition-colors mb-12 uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Blog Utama
            </Link>

            {/* Simplified Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">
                  {KATEGORI_LABEL[post.tipe] || post.tipe}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <Calendar size={12} />
                  {formatDate(post.created_at)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                {post.judul}
              </h1>
            </header>

            {/* Featured Image - Clean */}
            {post.gambar ? (
              <div className="mb-12 rounded-3xl overflow-hidden bg-gray-50 aspect-video border border-gray-100">
                <img
                  src={post.gambar}
                  alt={post.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}

            {/* Content Section */}
            <div className="relative">
              {post.ringkasan && (
                <div className="mb-12 p-8 rounded-2xl bg-gray-50 border-l-4 border-emerald-500">
                  <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed italic">
                    {post.ringkasan}
                  </p>
                </div>
              )}

              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                {post.konten}
              </div>
            </div>

            {/* Clean Interaction Area */}
            <div className="mt-16 py-8 border-y border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle size={18} />
                  <span className="text-xs font-bold">{comments.length} Komentar</span>
                </div>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-900 hover:text-emerald-600 transition-colors"
              >
                <Share2 size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Bagikan</span>
              </button>
            </div>

            {/* Simple Comments Section */}
            <section className="mt-20">
              <h3 className="text-xl font-extrabold text-gray-900 mb-10">Komentar</h3>
              
              {/* Comment Form */}
              {!user ? (
                <div className="mb-16 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <MessageCircle size={24} className="text-gray-300" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Ingin ikut berdiskusi?</h4>
                  <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">Silakan login atau daftar akun terlebih dahulu untuk memberikan komentar pada artikel ini.</p>
                  <div className="flex items-center justify-center gap-4">
                    <Link href="/auth/login" className="px-8 py-3 rounded-full bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                      Masuk
                    </Link>
                    <Link href="/auth/register" className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                      Daftar
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitComment} className="mb-16 border border-slate-100 p-6 md:p-8 rounded-3xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <User size={14} className="text-emerald-600" />
                    </div>
                    <p className="text-sm font-bold text-gray-900">Posting sebagai <span className="text-emerald-600">{user.nama_lengkap}</span></p>
                  </div>
                  <div className="space-y-4">
                    <textarea
                      placeholder="Apa pendapat Anda?"
                      rows={4}
                      value={newComment.isi}
                      onChange={(e) => setNewComment({ ...newComment, isi: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        disabled={isSubmitting}
                        className="flex items-center gap-3 px-8 py-3 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? "Mengirim..." : (
                          <>
                            Kirim Komentar
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Comments List */}
              <div className="space-y-8">
                {loadingComments ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-gray-50 rounded-2xl" />
                    <div className="h-20 bg-gray-50 rounded-2xl" />
                  </div>
                ) : comments.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm italic py-10">Belum ada komentar. Jadilah yang pertama!</p>
                ) : (
                  <div className="space-y-12">
                    {comments.filter(c => !c.parent_id).map((comment) => {
                      const replies = comments.filter(r => r.parent_id === comment.komentar_id);
                      
                      return (
                        <div key={comment.komentar_id} className="space-y-6">
                          <CommentItem 
                            comment={comment}
                            user={user}
                            onReply={() => setReplyTo(comment)}
                            onEdit={(val) => {
                              setEditingComment(comment.komentar_id);
                              setEditValue(val);
                            }}
                            onDelete={() => {
                              setCommentToDelete(comment.komentar_id);
                              setIsModalOpen(true);
                            }}
                            isEditing={editingComment === comment.komentar_id}
                            editValue={editValue}
                            setEditValue={setEditValue}
                            onUpdate={() => handleUpdateComment(comment.komentar_id)}
                            onCancelEdit={() => setEditingComment(null)}
                            isUpdating={isUpdating}
                          />

                          {/* Reply Form for this comment */}
                          <AnimatePresence>
                            {replyTo?.komentar_id === comment.komentar_id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-10 md:ml-14 overflow-hidden"
                              >
                                <form onSubmit={handleReplyComment} className="bg-slate-50 p-4 md:p-6 rounded-3xl border border-slate-200/50">
                                  <div className="flex items-center gap-2 mb-4">
                                    <CornerDownRight size={14} className="text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Membalas {comment.nama}</span>
                                  </div>
                                  <textarea
                                    value={replyValue}
                                    onChange={(e) => setReplyValue(e.target.value)}
                                    placeholder="Tulis balasan Anda..."
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:border-emerald-500 outline-none transition-all resize-none mb-4"
                                    rows={3}
                                    autoFocus
                                  />
                                  <div className="flex justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReplyTo(null);
                                        setReplyValue("");
                                      }}
                                      className="px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all"
                                    >
                                      Batal
                                    </button>
                                    <button
                                      type="submit"
                                      disabled={isReplying || !replyValue.trim()}
                                      className="px-8 py-2 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all disabled:opacity-50"
                                    >
                                      {isReplying ? "Mengirim..." : "Balas"}
                                    </button>
                                  </div>
                                </form>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Replies List */}
                          {replies.length > 0 && (
                            <div className="ml-10 md:ml-14 space-y-6 border-l-2 border-gray-50 pl-6 md:pl-8">
                              {replies.map(reply => (
                                <CommentItem 
                                  key={reply.komentar_id}
                                  comment={reply}
                                  user={user}
                                  isReply
                                  onEdit={(val) => {
                                    setEditingComment(reply.komentar_id);
                                    setEditValue(val);
                                  }}
                                  onDelete={() => {
                                    setCommentToDelete(reply.komentar_id);
                                    setIsModalOpen(true);
                                  }}
                                  isEditing={editingComment === reply.komentar_id}
                                  editValue={editValue}
                                  setEditValue={setEditValue}
                                  onUpdate={() => handleUpdateComment(reply.komentar_id)}
                                  onCancelEdit={() => setEditingComment(null)}
                                  isUpdating={isUpdating}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          </div>
        </article>

        {/* Custom Confirmation Modal */}
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCommentToDelete(null);
          }}
          onConfirm={handleDeleteComment}
          isLoading={isDeleting}
          title="Hapus Komentar?"
          message="Komentar ini akan dihapus secara permanen dan tidak dapat dikembalikan."
          confirmText="Ya, Hapus"
          cancelText="Batal"
        />
      </main>
    </>
  );
}
