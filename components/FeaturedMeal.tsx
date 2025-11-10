"use client";
import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import DualRingLoader from "./ui/LoadingComponent";

export default function FeaturedMeal() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          "https://6852821e0594059b23cdd834.mockapi.io/Food"
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setFoods(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  if (loading)
    return (
      <section className="h-screen">
         <h1 className="font-bold  mb-10 text-center text-2xl md:text-3xl text-[#212121]">
        Featured Meals
      </h1>
        <DualRingLoader/>
      </section>
    );

  if (error)
    return (
      <section className=" py-12 px-6 text-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </section>
    );

  if (!foods.length)
    return (
      <section className="bg-white py-16 px-6 text-center">
        <p className="text-gray-500 text-lg font-medium">
          No meals available right now 🍽️
        </p>
      </section>
    );

  const displayedFoods = showAll ? foods : foods.slice(0, 3 * 4); // 3 rows × 4 cards

  return (
    <section className="pb-15">
      <h1 className="font-bold mb-7 md:mb-14  text-center text-2xl md:text-3xl text-[#212121]">
        Featured Meals
      </h1>

      <div className="max-w-6xl mx-auto px-4 md:px-16 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {displayedFoods.map((food) => (
          <MealCard key={food.id + food.createdAt} food={food} />
        ))}
      </div>

      {foods.length > 12 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-secondary text-sm font-semibold py-3 px-10 rounded-xl  shadow-md hover:opacity-90 transition"
          >
            {showAll ? <p>Show Less</p> : <p>Show More <span className="ml-2">{">"}</span></p>}
          </button>
        </div>
      )}
    </section>
  );
}
