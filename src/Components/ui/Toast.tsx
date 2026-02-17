import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
};

const styles = {
  success: "bg-emerald-50 border-emerald-100 text-emerald-900",
  error: "bg-red-50 border-red-100 text-red-900",
  info: "bg-blue-50 border-blue-100 text-blue-900",
  warning: "bg-amber-50 border-amber-100 text-amber-900",
};

export default function Toast({ id, type, message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-sm w-full pointer-events-auto ${styles[type]}`}
    >
      <div className="shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm font-medium leading-5">{message}</div>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}
