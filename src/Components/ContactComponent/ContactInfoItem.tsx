import { ReactNode } from 'react';

interface ContactInfoItemProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

export default function ContactInfoItem({ icon, title, content }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#01793B] flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm mt-1">{content}</p>
      </div>
    </div>
  );
}
