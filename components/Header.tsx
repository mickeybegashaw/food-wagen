import Image from "next/image";
import Logo from "@/public/Images/logo.png"
const Header = () => {
  return (
    <header
      className="food-header"
    >
      <div className="flex items-center gap-[5.5px] cursor-pointer">
        <Image
          src={Logo}
          alt="Food Wagen Logo"
          width={20}
          height={21.98}
        />
        <h1 className="text-[21px] md:text-[23px] font-bold txt-primary">
          Food<span className="txt-secondary">Wagen</span>
        </h1>
      </div>
      <button className="btn-secondary py-1.5  px-3 md:px-7 rounded-lg text-[15px] font-bold shadow-[0px_20px_40px_0px_#FFAE004A]">Add Meal</button>
    </header>
  );
};

export default Header;
