'use client';

import React, { useState, useEffect } from 'react';

const simulatedUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Adoptante', status: 'Activo' },
  { id: 2, name: 'Bob Johnson', email: 'bob@refugio.org', role: 'Refugio', status: 'Activo' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Adoptante', status: 'Inactivo' },
  { id: 4, name: 'David Davis', email: 'david@admin.com', role: 'Admin', status: 'Activo' },
  { id: 5, name: 'Eve Williams', email: 'eve@refugio.org', role: 'Refugio', status: 'Bloqueado' },
];

const GestionUsuariosGeneral: React.FC = () => {
  const [users, setUsers] = useState<typeof simulatedUsers>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(simulatedUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-gray-700 text-lg font-medium">
        Cargando usuarios...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-2xl font-bold text-[#30588C] mb-6">Gestión de Usuarios (Admin General)</h1>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#30588C]"
        />
      </div>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#30588C] text-white">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Correo Electrónico</th>
              <th className="px-6 py-3">Rol</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Activo'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'Inactivo'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-[#6093BF] text-white text-xs rounded hover:bg-[#5079a4]">
                    Editar
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón de crear nuevo */}
      <div className="mt-6">
        <button className="bg-[#BF3952] hover:bg-[#a03045] text-white font-medium px-5 py-2 rounded shadow">
          Crear Nuevo Usuario
        </button>
      </div>
    </div>
  );
};

export default GestionUsuariosGeneral;
