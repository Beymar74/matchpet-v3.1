'use client';
import { useRouter } from 'next/navigation';

const VolverButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => router.push('/refugio')}
        className="px-6 py-2 text-sm bg-[#2D3B5A] text-white rounded-full hover:bg-[#254266] transition duration-300"
      >
        Volver al Refugio
      </button>
    </div>
  );
};

export default VolverButton;
