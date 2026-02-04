import Navbar from "@/Components/layout/Navbar";
import LandingPage from "@/Components/sections/LandingPage";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden font-sans">
      <Navbar/>
      <LandingPage/>
    </main>
  );
}
