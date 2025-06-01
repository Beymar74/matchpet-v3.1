"use client";

import React, { useState, ChangeEvent } from 'react';

const VerificacionIdentidadDocumentos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'ready' | 'uploading' | 'uploaded' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const isImage = (file: File | null) => file?.type.startsWith("image/");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadStatus(file ? 'ready' : 'idle');
    setMessage('');
    setProgress(0);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setMessage('');
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Por favor, seleccione un archivo para subir.');
      return;
    }

    setUploadStatus('uploading');
    setMessage('Subiendo...');
    let simulatedProgress = 0;

    const interval = setInterval(() => {
      simulatedProgress += 10;
      setProgress(simulatedProgress);
    }, 150);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      clearInterval(interval);
      setProgress(100);
      setUploadStatus('uploaded');
      setMessage('¡Documento subido exitosamente!');
    } catch (error) {
      clearInterval(interval);
      setUploadStatus('error');
      setMessage('Error al subir el archivo.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg px-10 py-8 mt-10 border border-gray-100">
      <h1 className="text-2xl font-bold text-[#30588C] mb-4">Verificación de Identidad</h1>
      <p className="text-sm text-gray-700 mb-6">
        Por favor, suba los documentos requeridos (<span className="font-medium">identificación oficial, comprobante de domicilio</span>, etc.) para verificar su identidad.
      </p>

      {/* Cargar archivo */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <label className="cursor-pointer inline-block px-5 py-2 bg-[#BF3952] text-white rounded-md text-sm font-medium hover:bg-[#a33044] transition">
            Seleccionar archivo
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf"
            />
          </label>
          <span className="text-sm text-gray-600">
            {selectedFile ? selectedFile.name : 'Ningún archivo seleccionado'}
          </span>
        </div>

        {selectedFile && isImage(selectedFile) && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Vista previa"
            className="w-40 h-40 object-cover border rounded-md"
          />
        )}

        {uploadStatus === 'uploading' && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#30588C] h-2 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {uploadStatus === 'uploaded' && (
          <div className="flex items-center gap-2 mt-2 text-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <p className="text-sm mt-1 text-red-600">{message}</p>
        )}

        {uploadStatus !== 'uploaded' && uploadStatus !== 'error' && message && (
          <p className="text-sm mt-1 text-gray-600">{message}</p>
        )}

        {/* Botones */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploadStatus === 'uploading'}
            className="mt-2 px-5 py-2 bg-[#BF3952] text-white rounded-md text-sm font-medium hover:bg-[#a33044] transition disabled:opacity-50"
          >
            {uploadStatus === 'uploading' ? 'Subiendo...' : 'Subir Documento'}
          </button>

          {selectedFile && (
            <button
              onClick={handleRemoveFile}
              className="text-sm text-red-500 hover:underline"
            >
              Eliminar archivo
            </button>
          )}
        </div>
      </div>

      {/* Estado final */}
      <div className="border-t pt-4 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Estado de Verificación</h3>
        <p className="text-sm text-gray-700">
          Estado:{' '}
          <span className={`font-medium ${
            uploadStatus === 'uploaded' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {uploadStatus === 'uploaded' ? 'Verificado (simulado)' : 'Pendiente'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerificacionIdentidadDocumentos;
