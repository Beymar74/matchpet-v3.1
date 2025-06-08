// src/components/ui/Modal.tsx
'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Template } from '@/components/admin-dashboard/types/Template'; // ✅ ya tienes el tipo correcto

interface ModalProps {
  template: Template | null;
  onClose: () => void;
  onSave: (nuevo: Template) => void;
}

export default function Modal({ template, onClose, onSave }: ModalProps) {
  const [form, setForm] = useState<Template>({
    id: template?.id,
    nombre: template?.nombre || '',
    tipo: template?.tipo || 'Email',
    contenido: template?.contenido || '',
    estado: template?.estado || 'Borrador',
    fecha: template?.fecha || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={onClose}>
          <X />
        </button>
        <h3 className="text-xl font-bold mb-4 text-[#30588C] dark:text-[#7FB9C2]">
          {form.id ? 'Editar Plantilla' : 'Nueva Plantilla'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre de la plantilla"
            required
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push</option>
          </select>
          <textarea
            name="contenido"
            value={form.contenido}
            onChange={handleChange}
            placeholder="Contenido del mensaje..."
            rows={4}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          />
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="Borrador">Borrador</option>
            <option value="Publicado">Publicado</option>
          </select>
          <button
            type="submit"
            className="bg-[#30588C] text-white px-4 py-2 rounded hover:bg-[#27446d] w-full"
          >
            Guardar Plantilla
          </button>
        </form>
      </div>
    </div>
  );
}
