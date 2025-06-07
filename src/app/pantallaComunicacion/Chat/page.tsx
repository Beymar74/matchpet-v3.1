'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';


export default function ChatSimuladoPage() {
  const [mensajes, setMensajes] = useState([
    { id: 1, texto: 'Hola, estoy interesado en adoptar a Luna 🐶', autor: 'usuario' },
    { id: 2, texto: '¡Hola! Claro, ¿quieres agendar una visita?', autor: 'refugio' },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const enviarMensaje = () => {
    if (nuevoMensaje.trim()) {
      setMensajes([
        ...mensajes,
        { id: mensajes.length + 1, texto: nuevoMensaje, autor: 'usuario' },
      ]);
      setNuevoMensaje('');
      
    }
  };
}

export default function ChatUsuario() {
  const userId = "usuario_123"; // 🔁 Reemplázalo luego por el ID real del usuario autenticado
  const [conversacionActiva, setConversacionActiva] = useState<string | null>(null);


  return (
    <div className="pt-[80px] min-h-screen bg-white dark:bg-[#0F172A] text-[#011526] dark:text-white">
      <Header />

      <div className="max-w-xl mx-auto p-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#30588C] dark:text-[#4EDCD8]">📢 Chat con Refugio Patitas 🐾</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Conversación activa con el refugio</p>
        </div>

        {/* Contenedor del chat con scroll propio */}
        <div className="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-[#F3F4F6] dark:bg-[#1E293B] shadow-inner mb-6">
          {mensajes.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 flex ${msg.autor === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-2 px-4 rounded-xl text-sm break-words ${
                  msg.autor === 'usuario'
                    ? 'bg-[#BF3952] text-white'
                    : 'bg-[#30588C] text-white'
                }`}
              >
                {msg.texto}
              </div>
            </div>
          ))}
        </div>

        {/* Área de entrada de texto */}
        <div className="flex gap-2">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF3952] bg-white dark:bg-[#0F172A] dark:text-white"
          />
          <button
            onClick={enviarMensaje}
            className="bg-[#30588C] hover:bg-[#254559] text-white px-4 py-2 rounded-md transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
