'use client'; // Asegúrate de colocar esto al principio del archivo

import React, { useState } from 'react';
import { FileText, Download, Trash, Link } from 'lucide-react';

// Definir el tipo para el documento
interface Documento {
  id: number;
  nombre: string;
  tipo: string;
  fechaCreacion: string;
  estado: 'Pendiente' | 'Generado' | 'Archivado';
  url: string; // Se agrega un campo URL para almacenar la URL del archivo
}

const Documentos = () => {
  const [documentos, setDocumentos] = useState<Documento[]>([
    // Datos simulados de documentos
    {
      id: 1,
      nombre: 'Contrato de Adopción - María García',
      tipo: 'Contrato',
      fechaCreacion: '2024-05-25',
      estado: 'Pendiente',
      url: 'https://example.com/contrato-adopcion-maria', // Simulando una URL
    },
    {
      id: 2,
      nombre: 'Contrato de Adopción - Carlos López',
      tipo: 'Contrato',
      fechaCreacion: '2024-06-01',
      estado: 'Generado',
      url: 'https://example.com/contrato-adopcion-carlos',
    },
    {
      id: 3,
      nombre: 'Plantilla de Adopción - Ana Pérez',
      tipo: 'Plantilla',
      fechaCreacion: '2024-06-02',
      estado: 'Archivado',
      url: 'https://example.com/plantilla-adopcion-ana',
    },
  ]);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaURL, setNuevaURL] = useState('');

  const handleDescargar = (url: string) => {
    // Simula la descarga del documento usando la URL
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('URL no disponible para descarga');
    }
  };

  const handleEliminar = (id: number) => {
    // Lógica para eliminar el documento
    const nuevosDocumentos = documentos.filter(doc => doc.id !== id);
    setDocumentos(nuevosDocumentos);
  };

  const handleNuevoDocumento = () => {
    // Lógica para agregar un nuevo documento
    if (!nuevoNombre || !nuevoTipo || !nuevaFecha || !nuevaURL) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevoDoc: Documento = {
      id: documentos.length + 1,
      nombre: nuevoNombre,
      tipo: nuevoTipo,
      fechaCreacion: nuevaFecha,
      estado: 'Pendiente',
      url: nuevaURL,
    };

    setDocumentos([...documentos, nuevoDoc]);
    setNuevoNombre('');
    setNuevoTipo('');
    setNuevaFecha('');
    setNuevaURL('');
  };

  return (
    <div className="space-y-6">
      {/* Barra de Título */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestión de Documentos</h1>
              <p className="text-gray-600 mt-1">Generar y gestionar documentos de adopción</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleNuevoDocumento}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Generar Nuevo Documento</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ingreso de datos del documento */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Nombre del Documento"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo de Documento"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={nuevoTipo}
            onChange={(e) => setNuevoTipo(e.target.value)}
          />
          <input
            type="date"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ingresa la URL del archivo"
            className="px-4 py-2 border rounded-lg bg-gray-100"
            value={nuevaURL}
            onChange={(e) => setNuevaURL(e.target.value)}
          />
          <button
            onClick={handleNuevoDocumento}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Subir Documento
          </button>
        </div>
      </div>

      {/* Tabla de Documentos */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-left">Fecha de Creación</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((documento) => (
              <tr key={documento.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{documento.nombre}</td>
                <td className="py-3 px-4">{documento.tipo}</td>
                <td className="py-3 px-4">{new Date(documento.fechaCreacion).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded ${documento.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : documento.estado === 'Generado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {documento.estado}
                  </span>
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <button onClick={() => handleDescargar(documento.url)} className="text-blue-600 hover:text-blue-800">
                    <Download className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleEliminar(documento.id)} className="text-red-600 hover:text-red-800">
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Documentos;
