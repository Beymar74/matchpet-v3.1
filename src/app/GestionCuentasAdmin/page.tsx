'use client';

import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Usuario A', email: 'usuarioa@example.com', status: 'activo' },
  { id: 2, name: 'Usuario B', email: 'usuariob@example.com', status: 'bloqueado' },
  { id: 3, name: 'Usuario C', email: 'usuarioc@example.com', status: 'inactivo' },
  { id: 4, name: 'Usuario D', email: 'usuariod@example.com', status: 'activo' },
];

const statusColors: Record<string, string> = {
  activo: 'bg-green-600 text-white',
  inactivo: 'bg-yellow-500 text-white',
  bloqueado: 'bg-red-600 text-white',
};

const GestionCuentasAdmin: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleChangeStatus = (userId: number, nuevoEstado: string) => {
    const actualizados = users.map(user =>
      user.id === userId ? { ...user, status: nuevoEstado } : user
    );
    setUsers(actualizados);
  };

  return (
    <div className="p-6 bg-white text-gray-800 min-h-screen">
      <h1 className="text-2xl font-bold text-[#30588C] mb-6">
        Gestión de Cuentas de Usuarios (Admin)
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#30588C] text-white">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Correo electrónico</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-100 transition">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-xs ${statusColors[user.status]}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  {user.status !== 'activo' && (
                    <button
                      onClick={() => handleChangeStatus(user.id, 'activo')}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                    >
                      Activar
                    </button>
                  )}
                  {user.status === 'activo' && (
                    <button
                      onClick={() => handleChangeStatus(user.id, 'inactivo')}
                      className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                    >
                      Desactivar
                    </button>
                  )}
                  {user.status !== 'bloqueado' && (
                    <button
                      onClick={() => handleChangeStatus(user.id, 'bloqueado')}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      Bloquear
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionCuentasAdmin;
