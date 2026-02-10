interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
      <div className="w-12 h-12 bg-[#01793B] text-white flex items-center justify-center rounded-full text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}

export default function PendaftaranSteps() {
  const steps = [
    {
      number: 1,
      title: "Buat Akun",
      description: "Lakukan pendaftaran akun orang tua melalui website ini."
    },
    {
      number: 2,
      title: "Isi Formulir",
      description: "Lengkapi data diri anak dan orang tua serta upload dokumen."
    },
    {
      number: 3,
      title: "Observasi",
      description: "Jadwal observasi/wawancara akan diinformasikan via WhatsApp/Email."
    },
    {
      number: 4,
      title: "Pengumuman",
      description: "Hasil seleksi akan diumumkan melalui akun Anda."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Alur Pendaftaran</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </div>
    </section>
  );
}
