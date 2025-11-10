export default function DualRingLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 rounded-full border-3 border-gray-300"></div>
        <div className="absolute inset-0 rounded-full border-3 border-[#ffb30e] border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
