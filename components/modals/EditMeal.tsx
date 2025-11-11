"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FoodType } from "@/lib/ZodSchema";
import { foodSchema } from "@/lib/ZodSchema";
import z from "zod";
import InputField from "../ui/InputField";

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FoodType) => Promise<void> | void;
  initialData: FoodType;
}

export default function EditMealModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: EditMealModalProps) {
  const [formData, setFormData] = useState({
    foodName: "",
    foodRating: "",
    foodImage: "",
    restaurantName: "",
    restaurantImage: "",
    restaurantStatus: "open",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        foodName: initialData.name || "",
        foodRating: initialData.rating?.toString() || "",
        foodImage: initialData.image || "",
        restaurantName: initialData.restaurantName || "",
        restaurantImage: initialData.logo || "",
        restaurantStatus: initialData.open ? "open" : "close",
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData: FoodType = foodSchema.parse({
        name: formData.foodName,
        rating: formData.foodRating || "0",
        image: formData.foodImage || "",
        logo: formData.restaurantImage || "",
        open: formData.restaurantStatus === "open",
        restaurantName: formData.restaurantName,
      });

      await onSubmit(validatedData);

      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors: typeof errors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0] === "name") zodErrors.foodName = issue.message;
          if (issue.path[0] === "rating") zodErrors.foodRating = issue.message;
          if (issue.path[0] === "image") zodErrors.foodImage = issue.message;
          if (issue.path[0] === "logo")
            zodErrors.restaurantImage = issue.message;
        });
        setErrors(zodErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#C6C2C285] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-[670px] rounded-2xl bg-white p-6 shadow-lg flex flex-col items-center"
        >
          <h1 className="mb-4 text-center text-3xl font-bold text-amber-500">
            Edit Meal
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <InputField
              name="foodName"
              placeholder="Food name"
              value={formData.foodName}
              onChange={handleInputChange}
              error={errors.foodName}
            />
            <InputField
              name="foodRating"
              placeholder="Food rating (0-5)"
              value={formData.foodRating}
              onChange={handleInputChange}
              error={errors.foodRating}
            />
            <InputField
              name="foodImage"
              placeholder="Food image URL"
              value={formData.foodImage}
              onChange={handleInputChange}
              error={errors.foodImage}
            />
            <InputField
              name="restaurantName"
              placeholder="Restaurant name"
              value={formData.restaurantName}
              onChange={handleInputChange}
              error={errors.restaurantName}
            />
            <InputField
              name="restaurantImage"
              placeholder="Restaurant image URL"
              value={formData.restaurantImage}
              onChange={handleInputChange}
              error={errors.restaurantImage}
            />
            <select
              name="restaurantStatus"
              value={formData.restaurantStatus}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="open">Open Now</option>
              <option value="close">Closed</option>
            </select>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg px-6 py-3 font-semibold btn-secondary disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-lg border-2 border-amber-500 px-6 py-3 font-semibold text-gray-900 hover:bg-amber-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
