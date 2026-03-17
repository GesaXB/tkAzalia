"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Hapus",
  cancelText = "Batal",
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <AlertCircle size={28} />
              </div>

              <h3 className="mb-2 text-xl font-extrabold text-gray-900">
                {title}
              </h3>
              <p className="mb-8 text-sm font-medium text-gray-500">
                {message}
              </p>

              <div className="flex w-full gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-2xl border border-gray-100 py-3 text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 rounded-2xl bg-red-500 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? "Memproses..." : confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
