import Image from "next/image";

const Header = () => {
  return (
    <header
      className="food-header
 
"
    >
      <div className="flex items-center gap-[11.5px] cursor-pointer">
        <Image
          src="/logo.png"
          alt="Food Wagen Logo"
          width={28}
          height={29.98}
        />
        <h1 className="text-3xl font-bold txt-primary">
          {" "}
          Food <span className="txt-secondary">Wagen</span>{" "}
        </h1>
      </div>
      <button className="btn-secondary">Add Meal</button>
    </header>
  );
};

export default Header;
