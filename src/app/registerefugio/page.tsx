'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail, Lock, Eye, EyeOff, Phone, Upload, AlertTriangle
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const [nombreRefugio, setNombreRefugio] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagenRefugio, setImagenRefugio] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenRefugio(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRegisterRefugio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    let fotoRefugioUrl = '';

    try {
      if (imagenRefugio) {
        const formData = new FormData();
        formData.append('file', imagenRefugio);
        formData.append('upload_preset', 'matchpet_preset');

        const res = await fetch('https://api.cloudinary.com/v1_1/duqzhng9e/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        fotoRefugioUrl = data.secure_url;
      }

      const response = await fetch('/api/registro-refugio', {
        method: 'POST',
        body: JSON.stringify({
          nombreRefugio,
          correo: email,
          telefono,
          direccion,
          contrasena: password,
          fotoRefugioUrl
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        router.push('/dashboard-refugio');
      } else {
        setErrorMessage(result.error || 'Error al registrar refugio');
      }
    } catch (error) {
      console.error('Registro de refugio fallido:', error);
      setErrorMessage('Hubo un error durante el registro del refugio.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fdfdfd] to-[#e0ecf9] px-4 py-12">
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-2xl animate-fade-in">

        {/* Botones para cambiar registro */}
        <div className="flex justify-center gap-4 mb-8">
          <Link href="/registerefugio" passHref legacyBehavior>
            <a className="px-6 py-2 rounded-xl bg-[#BF3952] text-white font-semibold hover:bg-[#a53044] transition">
              Registro Refugio
            </a>
          </Link>
          <Link href="/register" passHref legacyBehavior>
            <a className="px-6 py-2 rounded-xl border border-[#30588C] text-[#30588C] font-semibold hover:bg-[#30588C] hover:text-white transition">
              Registro Usuario
            </a>
          </Link>
        </div>

        <h2 className="text-3xl font-extrabold text-black mb-6 text-center">
          Registro de Refugio
        </h2>

        <form onSubmit={handleRegisterRefugio} className="space-y-5">
          {/* Aquí va el resto del formulario igual que antes */}

          {/* --- Campos de formulario aquí (idénticos a los anteriores) --- */}
          <div className="relative">
            <input
              type="text"
              required
              value={nombreRefugio}
              onChange={(e) => setNombreRefugio(e.target.value)}
              className="w-full pl-3 pr-3 py-3 text-sm rounded-xl border border-gray-300 bg-white text-black focus:ring-[#30588C] focus:border-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Nombre del refugio"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              required
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full pl-3 pr-3 py-3 text-sm rounded-xl border border-gray-300 bg-white text-black focus:ring-[#30588C] focus:border-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Dirección"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-3 pr-3 py-3 text-sm rounded-xl border border-gray-300 bg-white text-black focus:ring-[#30588C] focus:border-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Correo electrónico"
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full pl-3 pr-3 py-3 text-sm rounded-xl border border-gray-300 bg-white text-black focus:ring-[#30588C] focus:border-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Número de teléfono"
            />
          </div>

          {[{
            label: "Contraseña",
            value: password,
            setValue: setPassword,
            show: showPassword,
            toggle: () => setShowPassword(!showPassword)
          },
          {
            label: "Confirmar contraseña",
            value: confirmPassword,
            setValue: setConfirmPassword,
            show: showConfirmPassword,
            toggle: () => setShowConfirmPassword(!showConfirmPassword)
          }].map((field, idx) => (
            <div className="relative" key={idx}>
              <Lock className="absolute left-3 top-3 text-[#30588C]" size={20} />
              <input
                type={field.show ? 'text' : 'password'}
                required
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-gray-300 bg-white text-black focus:ring-[#30588C] focus:border-[#30588C] outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                placeholder={field.label}
              />
              <div className="absolute right-3 top-3 cursor-pointer" onClick={field.toggle}>
                {field.show ? <EyeOff className="text-gray-400" size={20} /> : <Eye className="text-gray-400" size={20} />}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[#30588C] font-medium">
              <Upload size={18} />
              Foto del refugio
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} required />
            </label>
            {imagePreview && <Image src={imagePreview} alt="Vista previa" width={50} height={50} className="rounded-lg" />}
          </div>

          <Button type="submit" className="w-full py-3 rounded-xl text-white bg-[#BF3952] hover:bg-[#a53044] shadow-lg hover:shadow-xl transition-all font-semibold">
            Registrar Refugio
          </Button>
        </form>

        {/* Mensajes de carga y error (igual que antes) */}
        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4 animate-fade-in-up">
              <svg className="animate-spin h-12 w-12 text-[#BF3952]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-[#30588C] font-medium">Procesando registro, por favor espera...</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full space-y-4 text-center">
              <AlertTriangle className="text-[#BF3952] mx-auto" size={40} />
              <h4 className="text-lg font-bold text-[#BF3952]">¡Ups! Algo salió mal</h4>
              <p className="text-sm text-gray-700">{errorMessage}</p>
              <Button onClick={() => setErrorMessage('')} className="bg-[#30588C] text-white hover:bg-[#254559] px-6 py-2 rounded-xl">
                Entendido
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
