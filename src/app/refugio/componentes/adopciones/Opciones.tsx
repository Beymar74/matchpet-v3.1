'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Opcion {
  titulo: string;
  ruta: string;
  imagen: string;
}

const Opciones: React.FC<{ opciones: Opcion[] }> = ({ opciones }) => {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {opciones.map((op) => (
        <button
          key={op.ruta}
          onClick={() => router.push(op.ruta)}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden text-left p-4"
        >
          <Image
            src={op.imagen}
            alt={op.titulo}
            width={500}
            height={300}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{op.titulo}</h2>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Opciones;

