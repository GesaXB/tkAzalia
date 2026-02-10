"use client"; 

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
  const pathname = usePathname();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`
          px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ease-in-out
          ${isActive 
            ? "bg-[#01793B] text-white shadow-md transform scale-105" 
            : "text-gray-700 hover:text-[#01793B] hover:bg-green-50" 
          }
        `}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 font-sans transition-all">
      
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
            <Image 
              src="/logotk.png" 
              alt="Logo TK Azalia" 
              fill 
              className="object-contain"
            />
        </div>
        <div className="flex flex-col">
            <span className="text-xl font-bold text-[#01793B] tracking-wide">TK AZALIA</span>
        </div>
      </Link>

      {/* MENU TENGAH */}
      <div className="hidden md:flex items-center gap-6">
        <NavLink href="/about">Tentang</NavLink>
        <NavLink href="/pendaftaran">Pendaftaran</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </div>

      {/* TOMBOL LOGIN & REGISTER */}
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="px-5 py-2 rounded-lg border-2 border-[#01793B] text-[#01793B] font-bold text-sm hover:bg-green-50 transition-all duration-300"
        >
          Masuk
        </Link>

        <Link
          href="/auth/register"
          className="px-5 py-2 rounded-lg bg-[#01793B] text-white font-bold text-sm border-2 border-transparent hover:bg-green-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Daftar
        </Link>
      </div>

    </nav>
  );
}