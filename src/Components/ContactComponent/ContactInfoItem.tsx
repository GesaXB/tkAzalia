import { ReactNode } from 'react';

interface ContactInfoItemProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

export default function ContactInfoItem({ icon, title, content }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-5 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300">
      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#01793B] flex-shrink-0 shadow-sm border border-green-100">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}