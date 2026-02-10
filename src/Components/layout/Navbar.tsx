"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang" },
    { href: "/program", label: "Program" },
    { href: "/pendaftaran", label: "Pendaftaran" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logotk.png"
                alt="Logo TK Azalia"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#01793B] to-emerald-600 bg-clip-text text-transparent tracking-tight">
                TK AZALIA
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">
                Masa Depan Cemerlang
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeLink === link.href
                    ? "bg-emerald-50 text-[#01793B]"
                    : "text-gray-600 hover:text-[#01793B] hover:bg-emerald-50/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-5 py-2 rounded-lg text-[#01793B] font-medium bg-emerald-50/40 hover:bg-emerald-100/60 transition-all duration-300 hover:scale-105"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2 rounded-lg bg-[#01793B] text-white font-medium hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Daftar
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden bg-white border-t border-gray-100 transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setIsMenuOpen(false);
              }}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                activeLink === link.href
                  ? "bg-emerald-50 text-[#01793B]"
                  : "text-gray-600 hover:bg-emerald-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 pb-2 space-y-3">
            <Link
              href="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-center rounded-lg text-[#01793B] font-medium bg-emerald-50/40 hover:bg-emerald-100/60 transition-all duration-300 active:scale-95"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-center rounded-lg bg-[#01793B] text-white font-medium hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
