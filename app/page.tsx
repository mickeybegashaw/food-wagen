import FeaturedMeal from "@/components/FeaturedMeal";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return <div className="flex flex-col gap-7 md:gap-14">
    <HeroSection/>
    <FeaturedMeal/>
  </div>;
}
