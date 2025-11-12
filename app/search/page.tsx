import { Suspense } from "react";
import SearchContent from "@/components/sections/SearchContents";
import DualRingLoader from "@/components/ui/LoadingComponent";

export default function SearchPage() {
  return (
    <Suspense 
      fallback={
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
      }
    >
      <SearchContent />
    </Suspense>
  );
}