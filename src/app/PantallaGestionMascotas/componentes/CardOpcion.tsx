'use client'
import Link from 'next/link';

interface CardOpcionProps {
  href: string;
  icon: string;
  label: string;
}

export default function CardOpcion({ href, icon, label }: CardOpcionProps) {
  return (
    <Link href={`/PantallaGestionMascotas${href}`}>
      <div className="bg-gradient-to-r from-[#30588C] via-[#6093BF] to-[#254559] hover:from-[#BF3952] hover:to-[#30588C] text-white p-4 rounded-lg shadow-lg transition-all duration-300 text-center font-medium">
        {icon} {label}
      </div>
    </Link>
  );
}
