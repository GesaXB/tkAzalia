import Navbar from "@/Components/layout/Navbar";
import MainContent from "@/Components/sections/MainContent";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden font-sans">
      <Navbar/>
      <MainContent/>
    </main>
  );
}
