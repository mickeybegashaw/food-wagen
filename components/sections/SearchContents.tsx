"use client";

import { useSearchParams } from "next/navigation";
import { useSearchFoods } from "@/lib/query";
import MealCard from "@/components/sections/MealCard";
import { Food } from "@/types";
import DualRingLoader from "@/components/ui/LoadingComponent";
import Link from "next/link";

export default function SearchContent() {
  const query = useSearchParams().get("name") || "";
  const { data: foods = [], isLoading } = useSearchFoods(query);


  if (isLoading)
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center mb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>
        <div className="flex justify-center items-center py-20">
          <DualRingLoader />
        </div>
      </section>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        </div>

        <p className="text-lg text-gray-600">
          Showing results for:{" "}
          <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {query}
          </span>
        </p>
      </div>

      {/*  Grid */}
      {foods.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No meals found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any meals matching{" "}
              <span className="font-medium text-gray-700">{query}</span>. Try
              searching with different keywords.
            </p>

            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
              >
                <svg
                  className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {foods.map((food: Food) => (
            <MealCard key={food.id} food={food} />
          ))}
        </div>
      )}

      {/* Suggestions */}
      {foods.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-gray-500 mb-4">
            POPULAR SEARCHES
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Chicken",
              "Pasta",
              "Salad",
              "Dessert",
              "Vegetarian",
              "Breakfast",
            ].map((term) => (
              <Link
                key={term}
                href={`/search?name=${term}`}
                className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}