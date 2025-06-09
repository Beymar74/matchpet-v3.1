// src/components/usuario/ModalMascotaUsuario.tsx
'use client'

import React from 'react'
import { Mascota } from '@/app/mis-favoritas/page'
import ContactarButton from '@/components/chat/ContactarButton'

interface Props {
  mascota: Mascota
  onClose: () => void
}

const ModalMascotaUsuario: React.FC<Props> = ({ mascota, onClose }) => {
  const handleBackdropClick = () => onClose()
  const stopClickPropagation = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
        onClick={stopClickPropagation}
      >
        <button className="absolute top-3 right-3 text-gray-500" onClick={onClose}>
          ✖
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={mascota.foto || '/sin-foto.jpg'}
            alt={mascota.nombre}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{mascota.nombre}</h2>
            <p className="text-gray-700 mb-1">Especie: {mascota.especie}</p>
            <p className="text-gray-700 mb-1">Raza: {mascota.raza}</p>
            <p className="text-gray-700 mb-1">Edad: {mascota.edad} años</p>
            <p className="text-gray-700 mb-1">Estado: {mascota.estado}</p>
            <p className="text-gray-700 mb-3">Descripción: {mascota.descripcion}</p>

            <h3 className="text-md font-semibold text-blue-700">🏠 Refugio: {mascota.refugio}</h3>
            <p className="text-sm text-gray-600">Ubicación: La Paz, Bolivia</p>
            <p className="text-sm text-gray-600 mb-3">Contacto: contacto@{mascota.refugio.toLowerCase().replace(/\s+/g, '')}.org</p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                📨 Enviar solicitud de adopción
              </button>
              <ContactarButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalMascotaUsuario
