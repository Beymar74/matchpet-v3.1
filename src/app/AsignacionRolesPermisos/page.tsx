'use client';

import React, { useState } from 'react';

const rolesDisponibles = ['Adoptante', 'Refugio', 'Admin'];

const AsignacionRolesPermisos: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Usuario A', role: 'Adoptante' },
    { id: 2, name: 'Refugio B', role: 'Refugio' },
    { id: 3, name: 'Admin C', role: 'Admin' },
    { id: 4, name: 'Usuario D', role: 'Adoptante' },
  ]);

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Gestión de Roles y Permisos <span className="text-indigo-600">(Admin)</span>
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">ID</th>
              <th className="px-6 py-3 text-left font-semibold">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold">Rol Actual</th>
              <th className="px-6 py-3 text-left font-semibold">Cambiar Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 font-medium text-gray-700">{user.id}</td>
                <td className="px-6 py-4 text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.role}</td>
                <td className="px-6 py-4">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {rolesDisponibles.map(rol => (
                      <option key={rol} value={rol}>{rol}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsignacionRolesPermisos;
