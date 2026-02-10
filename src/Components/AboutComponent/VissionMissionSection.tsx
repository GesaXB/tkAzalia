export default function VisionMissionSection() {
  return (
    <section className="bg-gray-50 py-20 mb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#01793B]">DEMO PAGE</h2>
          <p className="text-gray-500 mt-2">Arah dan tujuan pendidikan kami</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <VisionCard />
          <MissionCard />
        </div>
      </div>
    </section>
  );
}

function VisionCard() {
  return (
    <div className="bg-[#01793B] rounded-3xl p-10 text-white shadow-lg hover:-translate-y-2 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-white/20 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold">DEMO PAGE</h3>
      </div>
      <p className="text-lg leading-relaxed opacity-90">
        DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE.
      </p>
    </div>
  );
}

function MissionCard() {
  return (
    <div className="bg-white rounded-3xl p-10 text-gray-800 shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-green-50 rounded-xl text-[#01793B]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#01793B]">DEMO PAGE</h3>
      </div>
      <ul className="space-y-4">
        <li className="flex gap-3">
          <span className="text-[#01793B] font-bold">•</span>
          <span>DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[#01793B] font-bold">•</span>
          <span>DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[#01793B] font-bold">•</span>
          <span>DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE DEMO PAGE.</span>
        </li>
      </ul>
    </div>
  );
}
