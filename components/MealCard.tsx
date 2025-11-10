"use client";
import Image from "next/image";
import { Tag, Star, MoreVertical } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MealCard({ food }: { food: any }) {
  const [openMenu, setOpenMenu] = useState(false);
  const foodImage =
    food.image && food.image.trim() !== ""
      ? food.image
      : "https://placehold.net/default.png";
  const restaurantImage =
    food.logo && food.logo.trim() !== ""
      ? food.logo
      : "https://placehold.net/default.png";
  const foodName =
    food.name && food.name.trim() !== "" ? food.name : "Unknown Meal";
  const rating = food.rating || "0.0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-xl overflow-hidden relative hover:shadow-xl transition-all duration-150 flex flex-col gap-5"
    >
      {/* Image */}
      <div className="relative">
        <Image
          src={foodImage}
          alt={foodName}
          width={400}
          height={250}
          className="w-full h-52 object-cover"
        />

        {/* Price Tag */}
        <div className="food-price absolute top-4 left-2 bg-[#F17228] px-2 py-1 rounded-md text-sm font-semibold flex items-center text-white">
          <Tag size={14} className="mr-1 fill-white stroke-none" />$
          {food.Price ?? "—"}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 pb-4 justify-between">
        <div className="flex gap-3 items-center justify-between">
          <div className="restaurant-logo flex items-center gap-3">
            <Image
              src={restaurantImage}
              alt="logo"
              width={54}
              height={54}
              className="h-12 w-12 rounded-xl object-cover border border-gray-200"
            />
            <div>
              <h3 className="food-name font-semibold text-lg text-[#424242] line-clamp-1">
                {foodName}
              </h3>
              <div className="food-rating flex items-center gap-1 text-yellow-400">
                <Star size={14} className="fill-yellow-400 stroke-none" />
                <span>{rating}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1 rounded-md text-black"
          >
            <MoreVertical size={16} />
          </button>
          {openMenu && (
            <div className="absolute right-5 top-64 bg-white text-black rounded-lg shadow-md w-24 text-sm overflow-hidden z-10">
              <button className="block w-full text-left px-3 py-1 hover:bg-gray-100">
                Edit
              </button>
              <button className="block w-full text-left px-3 py-1 text-[red] hover:bg-gray-100">
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col mt-auto">
          <div
            className={`food-status w-fit px-2 py-1 mt-1 text-md font-bold rounded-lg ${
              food.open
                ? "bg-[#79B93C33] text-[#79B93C]"
                : "bg-[#F1722833] text-[#F17228]"
            }`}
          >
            {food.open ? "Open Now" : "Closed"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
