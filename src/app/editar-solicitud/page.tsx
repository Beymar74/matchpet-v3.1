'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

// Datos simulados (deben coincidir con los de EvaluacionSolicitudes)
const solicitudesMock = [
  { id: 1, usuario: 'Carlos R.', mascota: 'Luna', tipo: 'Gato', estado: 'Pendiente', fecha: '2025-05-25 10:45' },
  { id: 2, usuario: 'María F.', mascota: 'Max', tipo: 'Gato', estado: 'Aceptada', fecha: '2025-05-26 09:20' },
  { id: 3, usuario: 'Luis M.', mascota: 'Bella', tipo: 'Gato', estado: 'Rechazada', fecha: '2025-05-24 16:30' },
  { id: 4, usuario: 'Cristian R.', mascota: 'Pimpi', tipo: 'Gato', estado: 'Pendiente', fecha: '2025-05-24 16:30' },
  { id: 5, usuario: 'Ivan C.', mascota: 'Silpi', tipo: 'Perro', estado: 'Aceptada', fecha: '2025-05-24 16:30' },
  { id: 6, usuario: 'Beymar M.', mascota: 'Gael', tipo: 'Perro', estado: 'Rechazada', fecha: '2025-05-24 16:30' },
];

export default function EditarSolicitudPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const [solicitud, setSolicitud] = useState<any | null>(null);

  useEffect(() => {
    const encontrada = solicitudesMock.find((s) => s.id === id);
    setSolicitud(encontrada || null);
  }, [id]);

  if (!solicitud) return <div className="p-6">Cargando solicitud...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSolicitud({ ...solicitud, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    alert(`Solicitud actualizada:\n\n${JSON.stringify(solicitud, null, 2)}`);
    router.push('/GestionAdopciones/evaluar-solicitudes'); // Redirigir después
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">Editar Solicitud #{solicitud.id}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={solicitud.usuario}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mascota</label>
          <input
            type="text"
            name="mascota"
            value={solicitud.mascota}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select
            name="tipo"
            value={solicitud.tipo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option>Perro</option>
            <option>Gato</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select
            name="estado"
            value={solicitud.estado}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option>Pendiente</option>
            <option>Aceptada</option>
            <option>Rechazada</option>
          </select>
        </div>

        <button
          onClick={guardarCambios}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 mt-4"
        >
          <Save size={16} /> Guardar Cambios
        </button>
      </div>
    </div>
  );
}
