export default function BackgroundDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute bg-white opacity-20 rounded-full w-64 h-64 -top-10 -left-10 flex items-center justify-center">
        <div className="bg-[#01793B] opacity-30 rounded-full w-40 h-40"></div>
      </div>

      <div className="absolute bg-white opacity-25 rounded-3xl w-80 h-80 top-1/3 -right-20 flex items-center justify-center">
        <div className="bg-[#01793B] opacity-40 rounded-2xl w-48 h-48"></div>
      </div>

      <div className="absolute bg-white opacity-20 rounded-full w-72 h-72 bottom-20 left-10 flex items-center justify-center">
        <div className="bg-[#01793B] opacity-30 rounded-full w-44 h-44"></div>
      </div>
    </div>
  );
}
