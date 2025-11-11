"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DeleteMealModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  open,
  onConfirm,
  onCancel,
}: DeleteMealModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center bg-[#C6C2C285]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white relative top-24 w-[90%] md:w-[450px] h-52 rounded-xl pt-10 px-5 shadow-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.30, ease: "easeOut" }}
          >
            <h2 className="text-center text-2xl font-bold text-[#FFAE00]">
              Delete Meal
            </h2>

            <p className="text-center text-gray-500 mt-3 text-sm">
              Are you sure you want to delete this meal? Actions cannot be reversed.
            </p>

            <div className="flex justify-center gap-6 mt-5">
              <button
                data-test-id="food-confirm-delete-btn"

                onClick={onConfirm}
                className="w-1/2 py-2 btn-secondary text-white text-sm font-semibold rounded-xl shadow-md"
              >
                Yes
              </button>

              <button
                onClick={onCancel}
                className="w-1/2 border py-2 border-[#FFBE24] text-sm text-black font-semibold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
