'use client';
import React from 'react';

const contacto = {
  nombre: 'Juan Pérez',
  correo: 'juanperez@gmail.com',
  telefono: '777-12345',
  direccion: 'Calle 21, La Paz',
  ocupacion: 'Ingeniero de Sistemas',
  tiempoDisponible: 'Medio tiempo',
};

export default function ContactoAdoptante() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Información de Contacto</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-2">
        <p><strong>Nombre:</strong> {contacto.nombre}</p>
        <p><strong>Correo:</strong> {contacto.correo}</p>
        <p><strong>Teléfono:</strong> {contacto.telefono}</p>
        <p><strong>Dirección:</strong> {contacto.direccion}</p>
        <p><strong>Ocupación:</strong> {contacto.ocupacion}</p>
        <p><strong>Tiempo disponible:</strong> {contacto.tiempoDisponible}</p>
      </div>
    </div>
  );
}
