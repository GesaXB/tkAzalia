import Navbar from "@/Components/layout/Navbar";
import LandingPage from "@/Components/sections/LandingPage";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-sans">
      <Navbar/>
      <div className="pt-16">
        <LandingPage/>  
      </div>
    </main>
  );
}
