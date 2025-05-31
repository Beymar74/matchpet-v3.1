'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';

export default function ChatSimuladoPage() {
  const [mensajes, setMensajes] = useState([
    { id: 1, texto: 'Hola, estoy interesado en adoptar a Luna 🐶', autor: 'usuario' },
    { id: 2, texto: '¡Hola! Claro, ¿quieres agendar una visita?', autor: 'refugio' },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const enviarMensaje = () => {
    if (nuevoMensaje.trim()) {
      setMensajes([...mensajes, { id: mensajes.length + 1, texto: nuevoMensaje, autor: 'usuario' }]);
      setNuevoMensaje('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#011526]">
      <Header />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#BF3952]">💬 Chat con Refugio</h1>
        <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-[#F3F4F6] shadow-inner mb-4">
          {mensajes.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 flex ${msg.autor === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-2 px-4 rounded-xl text-sm ${
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
        <div className="flex gap-2">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BF3952]"
          />
          <button
            onClick={enviarMensaje}
            className="bg-[#30588C] hover:bg-[#254559] text-white px-4 py-2 rounded-md"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
