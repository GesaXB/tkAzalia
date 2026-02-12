import Link from "next/link";

interface CTAButtonProps {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

function CTAButton({ href, variant, children }: CTAButtonProps) {
  const baseStyles = "px-8 py-3 font-bold rounded-lg transition-all";

  if (variant === "primary") {
    return (
      <Link
        href={href}
        className={`${baseStyles} bg-white text-[#01793B] hover:shadow-lg`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseStyles} border-2 border-white text-white hover:bg-white/10`}
    >
      {children}
    </Link>
  );
}

export default function PendaftaranCTA() {
  return (
    <section className="max-w-4xl mx-auto px-4">
      <div className="bg-gradient-to-r from-[#01793B] to-green-600 rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>

        <h2 className="text-3xl font-bold mb-4 relative z-10">Sudah Siap Mendaftar?</h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto relative z-10">
          Kuota terbatas! Segera daftarkan putra-putri Anda sekarang juga melalui sistem online kami.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <CTAButton href="/auth/register" variant="primary">
            Daftar Sekarang
          </CTAButton>
          <CTAButton href="/contact" variant="secondary">
            Tanya Dulu
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
