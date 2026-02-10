"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  pathname: string;
  onClick?: () => void;
  mobile?: boolean;
}

function NavLink({ href, children, pathname, onClick, mobile = false }: NavLinkProps) {
  const isActive = pathname === href;

  const baseClasses = "font-medium rounded-lg transition-colors duration-200";
  const desktopClasses = "px-4 py-2 text-sm";
  const mobileClasses = "block px-6 py-4 text-lg w-full text-left";

  const activeClasses = "bg-[#01793B] text-white";
  const inactiveClasses = "text-gray-600 hover:text-[#01793B] hover:bg-gray-50";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses} ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang" },
    { href: "/pendaftaran", label: "Pendaftaran" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "py-3 bg-white/95 backdrop-blur-lg shadow-sm"
          : "py-4 bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <Image
                src="/logotk.png"
                alt="TK Azalia"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#01793B]">
              TK AZALIA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                pathname={pathname}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-[#01793B] border border-[#01793B] rounded-lg hover:bg-green-50 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 text-sm font-medium text-white bg-[#01793B] rounded-lg hover:bg-green-700 transition-colors"
            >
              Daftar
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black/40 z-40" onClick={closeMenu} />
        )}

        {isMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-50 shadow-lg">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  pathname={pathname}
                  onClick={closeMenu}
                  mobile={true}
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-4 space-y-3 border-t border-gray-100">
                <Link
                  href="/auth/login"
                  onClick={closeMenu}
                  className="block px-6 py-4 text-center text-lg font-medium text-[#01793B] border border-[#01793B] rounded-lg hover:bg-green-50 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  onClick={closeMenu}
                  className="block px-6 py-4 text-center text-lg font-medium text-white bg-[#01793B] rounded-lg hover:bg-green-700 transition-colors"
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
