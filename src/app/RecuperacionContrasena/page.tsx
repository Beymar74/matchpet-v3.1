'use client';

import React, { useState } from 'react';

const RecuperacionContrasena: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendLink = () => {
    setEmailError('');
    setMessage('');

    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Ingresa un formato de correo electrónico válido.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('Recibirás un enlace de recuperación.');
      setEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-md border border-gray-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#30588C] mb-4 text-center">
          Recuperación de Contraseña
        </h2>

        <p className="text-sm text-gray-600 mb-6 text-center">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        <input
            type="email"
            placeholder="Correo electrónico"
            className={`w-full px-4 py-2 border rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#30588C] ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}

        <button
          onClick={handleSendLink}
          disabled={loading}
          className="w-full mt-4 bg-[#BF3952] hover:bg-[#a03045] text-white py-2 px-4 rounded-md text-sm font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
        </button>

        {message && (
          <p className="text-black text-sm mt-4 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default RecuperacionContrasena;
