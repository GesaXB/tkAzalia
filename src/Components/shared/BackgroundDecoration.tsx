export default function BackgroundDecoration() {
  return (
    <>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-700/20 rounded-full blur-2xl -z-10 md:w-[600px] md:h-[600px] md:-top-80 md:-left-60"></div>

      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-700/20 rounded-full blur-2xl -z-10 md:w-[700px] md:h-[700px] md:-bottom-80 md:-right-60"></div>
    </>
  );
}
