"use client";
import DeliveryIcon from "@/public/Icons/delivery-icon.svg";
import PickupIcon from "@/public/Icons/pickup-icon.svg";
import SearchIcon from "@/public/Icons/search-icon.svg";
import SearchIconWhite from "@/public/Icons/search-icon-white.svg";
import HeroImage from "@/public/Images/hero-image.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertModal from "../modals/Alert";

const HeroSection = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }>({
    isOpen: false,
    message: "",
    type: "success",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      setAlert({
        isOpen: true,
        message: "Please enter a search term.",
        type: "error",
      });
    }

    if (search.trim()){

      router.push(`/search?name=${encodeURIComponent(search)}`);
    }

  };

  return (
    <section className="w-full h-[450px] bg-[hsl(41,100%,53%)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex items-center px-4 md:px-10">
        {/* Left Content */}
        <div className="w-full lg:w-[70%] flex flex-col gap-6 relative z-10">
          <h1 className="text-white font-bold text-[45px] md:text-[58px] leading-[100%]">
            Are you starving?
          </h1>

          <p className="text-white font-medium text-md leading-[120%]">
            Within a few clicks, find meals that are accessible near you
          </p>

          {/* Order Card */}
          <div className="flex flex-col w-full rounded-2xl bg-white shadow-lg">
            <div className="flex p-4 gap-3 border-b border-[#EEEEEE]">
              <button className="bg-[#F172281A] font-bold text-[#F17228] text-sm py-1 px-3 flex gap-2 rounded-lg">
                <Image
                  src={DeliveryIcon}
                  alt="Delivery Icon"
                  width={16}
                  height={16}
                />
                Delivery
              </button>

              <button className="font-bold text-[#757575] text-sm py-1 px-3 flex gap-2 rounded-lg">
                <Image
                  src={PickupIcon}
                  alt="Pickup Icon"
                  width={12}
                  height={12}
                />
                Pickup
              </button>
            </div>

            <div className="flex items-center p-4 gap-2">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2.5 w-full"
              >
                <div className="bg-[#F5F5F5] rounded-md w-[68%] md:w-[75%] flex items-center gap-2 px-3 py-2">
                  <Image
                    src={SearchIcon}
                    alt="Search Icon"
                    width={12}
                    height={12}
                  />
                  <input
                    type="text"
                    placeholder="What do you like to eat today?"
                    className="bg-transparent outline-none w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary py-3 px-2 md:px-7 rounded-md flex items-center gap-1 md:gap-2 font-bold text-[13px]"
                >
                  <Image
                    src={SearchIconWhite}
                    alt="Search Icon"
                    width={12}
                    height={12}
                  />
                  Find meal
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="hidden lg:block w-[50%] h-full relative">
          <Image
            src={HeroImage}
            alt="Hero Image"
            className="h-[350px] w-[350px] -bottom-10 right-5 shadow-[-30px_0_40px_rgba(0,0,0,0.4)] rounded-full absolute"
            priority
          />
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        message={alert.message}
        type={alert.type}
      />
    </section>
  );
};

export default HeroSection;
