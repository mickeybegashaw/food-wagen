"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/Images/logo.png";
import { AddMealModal } from "../modals/AddMeal";
import { useAddFood } from "@/lib/query";
import { FoodType } from "@/lib/ZodSchema";
import AlertModal from "../modals/Alert";
import Link from "next/link";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }>({
    isOpen: false,
    message: "",
    type: "success",
  });
  const addFoodMutation = useAddFood();

  const handleAddMeal = async (formData: FoodType) => {
    try {
      await addFoodMutation.mutateAsync(formData);

      setAlert({
        isOpen: true,
        message: "Meal added successfully!",
        type: "success",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add meal:", error);

      setAlert({
        isOpen: true,
        message: "Failed to add meal. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <header className="food-header">
      <Link href={"/"} className="flex items-center gap-[5.5px] cursor-pointer">
        <Image src={Logo} alt="Food Wagen Logo" width={20} height={21.98} />
        <h1 className="text-[21px] md:text-[23px] font-bold txt-primary">
          Food<span className="txt-secondary">Wagen</span>
        </h1>
      </Link>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-secondary py-1.5  px-3 md:px-7 rounded-lg text-[15px] font-bold shadow-[0px_20px_40px_0px_#FFAE004A]"
      >
        Add Meal
      </button>

      {/* Add mal modal */}
      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMeal}
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        message={alert.message}
        type={alert.type}
      />
    </header>
  );
};

export default Header;
