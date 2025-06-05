'use client';

import { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Facebook,
  Check,
  LogIn,
  Github
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      const data = await response.json();
  
      if (data.success && data.idUsuario) {
        // Guardar ID de usuario
        localStorage.setItem('idUsuario', data.idUsuario);
  
        // Obtener el rol
        const rolResponse = await fetch(`/api/obtener-rol?idUsuario=${data.idUsuario}`);
        const rolData = await rolResponse.json();
  
        if (rolData.rol) {
          localStorage.setItem("rolUsuario", rolData.rol);
  
          // Redirigir según rol
          if (rolData.rol === 'Administrador') {
            window.location.href = '/admin-dashboard';
          } else if (rolData.rol === 'Refugio') {
            window.location.href = '/dashboard-refugio';
          } else {
            window.location.href = '/match';
          }
        } else {
          alert("No se pudo obtener el rol del usuario.");
        }
      } else {
        setErrorLogin(true);
      }
    } catch (err) {
      console.error('Error en login:', err);
      setErrorLogin(true);
    }
  };
  
  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl p-8 md:p-12 rounded-3xl">
        
        {/* Columna izquierda: Formulario */}
        <div className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-black">Bienvenido a MatchPet</h2>
            <p className="text-sm text-gray-500">Conéctate con tu compañero ideal 🐾</p>
            <Image
              src="/Logo/logo1.png"
              alt="Logo MatchPet"
              width={70}
              height={70}
              className="mx-auto md:mx-0 mt-2"
            />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#30588C]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:ring-[#30588C] focus:border-[#30588C] outline-none"
                placeholder="Correo electrónico"
              />
              {email && <Check className="absolute right-3 top-3 text-[#BF3952]" />}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#30588C]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm rounded-xl border border-gray-300 bg-gray-50 text-gray-900 focus:ring-[#30588C] focus:border-[#30588C] outline-none"
                placeholder="Contraseña"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-[#BF3952] hover:bg-[#9c2f46] transition flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              Iniciar sesión
            </Button>
          </form>

          <div className="text-sm text-center md:text-left">
          <Link href="/RecuperacionContrasena" className="text-[#30588C] hover:text-[#254559] underline">
            ¿Olvidaste tu contraseña?
          </Link>
          </div>
        </div>

        {/* Columna derecha: redes sociales */}
        <div className="flex flex-col justify-center space-y-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-500">O ingresa con</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center justify-center gap-3">
              <Facebook className="text-blue-600" size={20} />
              Facebook
            </Button>

            <Button variant="outline" className="w-full flex items-center justify-center gap-3">
              <Image
                src="/google-icon.png"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Google
            </Button>

            <Button variant="outline" className="w-full flex items-center justify-center gap-3">
              <Github size={20} />
              GitHub
            </Button>
          </div>

          <div className="text-sm text-center mt-6 text-black">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="text-[#BF3952] hover:text-[#30588C] font-medium underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de error */}
      {errorLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center space-y-4 animate-fade-in-up">
            <h4 className="text-lg font-bold text-[#BF3952]">Credenciales incorrectas</h4>
            <p className="text-gray-600 text-sm">Verifica tu correo y contraseña. Intenta nuevamente.</p>
            <Button
              onClick={() => setErrorLogin(false)}
              className="bg-[#30588C] text-white hover:bg-[#254559] px-6 py-2 rounded-xl"
            >
              Entendido
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
