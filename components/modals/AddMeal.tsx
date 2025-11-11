"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FormData } from "@/types/index";
import { foodSchema, type FoodType } from "@/lib/ZodSchema";
import z from "zod";
import InputField from "../ui/InputField";
import type { AddMealModalProps } from "@/types";


export function AddMealModal({ isOpen, onClose, onSubmit }: AddMealModalProps) {
  const [formData, setFormData] = useState<FormData>({
    foodName: "",
    foodRating: "",
    foodImage: "",
    restaurantName: "",
    restaurantImage: "",
    restaurantStatus: "open",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Transform formData to match API/Zod schema
  const transformFormData = (data: FormData): FoodType => ({
    name: data.foodName,
    rating: data.foodRating || "0",
    image: data.foodImage || "",
    logo: data.restaurantImage || "",
    open: data.restaurantStatus === "open",
    restaurantName: data.restaurantName,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const transformedData = transformFormData(formData);

      // Validate with Zod
      const validatedData = foodSchema.parse(transformedData);

      await onSubmit(validatedData);

      // Reset form
      setFormData({
        foodName: "",
        foodRating: "",
        foodImage: "",
        restaurantName: "",
        restaurantImage: "",
        restaurantStatus: "open",
      });
      setErrors({});
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors: typeof errors = {};
        error.issues.forEach((issue) => {
          if (issue.path[0] === "name") zodErrors.foodName = issue.message;
          if (issue.path[0] === "rating") zodErrors.foodRating = issue.message;
          if (issue.path[0] === "avatar") zodErrors.foodImage = issue.message;
          if (issue.path[0] === "logo") zodErrors.restaurantImage = issue.message;
        });
        setErrors(zodErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      foodName: "",
      foodRating: "",
      foodImage: "",
      restaurantName: "",
      restaurantImage: "",
      restaurantStatus: "open",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed overflow-scroll no-scrollbar inset-0 z-50 flex items-center justify-center bg-[#C6C2C285] p-4 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full  max-w-[670px] mt-48 pt-16 rounded-2xl bg-white p-4 shadow-lg flex flex-col items-center"
        >
          <h1 className="mb-2 text-center text-3xl font-bold text-amber-500">Add a meal</h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 w-[70%]">
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
              placeholder="Food image URL (Link)"
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
              placeholder="Restaurant image URL (Link)"
              value={formData.restaurantImage}
              onChange={handleInputChange}
              error={errors.restaurantImage}
            />

            <select
              name="restaurantStatus"
              value={formData.restaurantStatus}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
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
                {isSubmitting ? "Adding..." : "Add"}
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
