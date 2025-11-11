"use client";
import FeaturedMeal from "@/components/sections/FeaturedMeal";
import HeroSection from "@/components/sections/HeroSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-7 md:gap-14">
        <HeroSection />
        <FeaturedMeal />
      </div>
    </QueryClientProvider>
  );
}
