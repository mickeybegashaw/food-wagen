"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import type { AlertModalProps } from "@/types";


const icons = {
  success: <CheckCircle className="h-6 w-6 text-green-500" />,
  error: <AlertCircle className="h-6 w-6 text-red-500" />,
  info: <Info className="h-6 w-6 text-blue-500" />,
};

export default function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  autoClose = true,
  duration = 5500,
}: AlertModalProps) {
  if (isOpen && autoClose) {
    setTimeout(() => {
      onClose();
    }, duration);
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#C6C2C285] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg flex flex-col items-center gap-3"
        >
          {/* Icon */}
          <div>{icons[type]}</div>

          {/* Title */}
          {title && <h2 className="text-lg font-bold">{title}</h2>}

          {/* Message */}
          <p className="text-center text-gray-700">{message}</p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
