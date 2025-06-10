'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, X } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState({
    usuario: '',
    mascota: '',
    tipo: '',
    fecha: ''
  });
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const solicitudesExistentes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    if (!Array.isArray(solicitudesExistentes)) {
      localStorage.setItem('solicitudes', '[]');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.usuario || !form.mascota || !form.tipo || !form.fecha) return;

    const solicitudesGuardadas = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    const nuevaSolicitud = {
      ...form,
      id: Date.now(),
      estado: 'Pendiente'
    };
    localStorage.setItem('solicitudes', JSON.stringify([...solicitudesGuardadas, nuevaSolicitud]));

    setEnviado(true);
    setTimeout(() => router.push('/EvaluacionSolicitudes'), 1500);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nueva Solicitud de Adopción</h2>

      {enviado ? (
        <div className="flex items-center gap-2 text-green-700 bg-green-100 p-3 rounded">
          <CheckCircle size={20} /> Solicitud registrada correctamente. Redirigiendo...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Nombre del Usuario</label>
            <input
              type="text"
              required
              value={form.usuario}
              onChange={(e) => setForm({ ...form, usuario: e.target.value })}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Nombre de la Mascota</label>
            <input
              type="text"
              required
              value={form.mascota}
              onChange={(e) => setForm({ ...form, mascota: e.target.value })}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Tipo</label>
            <select
              required
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Seleccionar...</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Fecha</label>
            <input
              type="date"
              required
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => router.push('/refugio')}
              className="mb-4 inline-flex items-center gap-2 text-sm text-blue-700 hover:underline"
            >
              ← Volver al Panel de Refugio
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Registrar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
