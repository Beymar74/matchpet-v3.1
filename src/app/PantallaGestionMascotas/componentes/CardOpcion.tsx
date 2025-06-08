'use client';

import Link from 'next/link';

interface CardOpcionProps {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export default function CardOpcion({ icon, label, href, onClick }: CardOpcionProps) {
  const contenido = (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition">
      <span className="text-2xl">{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        {contenido}
      </Link>
    );
  }

  return (
    <div className="cursor-pointer" onClick={onClick}>
      {contenido}
    </div>
  );
}
