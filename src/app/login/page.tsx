'use client';

import { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Check,
  LogIn,
  AlertCircle,
  Loader2,
  Heart,
  PawPrint
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validación en tiempo real
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('');
    } else if (!emailRegex.test(email)) {
      setEmailError('Formato de correo inválido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorLogin(false);

    // Validaciones finales
    if (emailError || passwordError) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      const data = await response.json();
  
      if (data.success && data.idUsuario) {
        localStorage.setItem('idUsuario', data.idUsuario);
      
        // Guardar email si se marcó "recordarme"
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
      
        // Obtener el rol
        const rolResponse = await fetch(`/api/obtener-rol?idUsuario=${data.idUsuario}`);
        const rolData = await rolResponse.json();
      
        if (rolData.rol) {
          localStorage.setItem("rolUsuario", rolData.rol);
      
          if (rolData.rol === 'Refugio') {
            try {
              // Obtener el ID del refugio
              const refugioResponse = await fetch(`/api/obtener-id-refugio?idUsuario=${data.idUsuario}`);
              const refugioData = await refugioResponse.json();
      
              if (refugioData.success && refugioData.idRefugio) {
                localStorage.setItem('idRefugio', refugioData.idRefugio);
      
                // ✅ Obtener perfil completo del refugio para nombre y foto
                const perfilResponse = await fetch(`/api/refugio-perfil/${refugioData.idRefugio}`);
                const perfilData = await perfilResponse.json();
      
                if (perfilData.NombreRefugio) {
                  localStorage.setItem('nombreRefugio', perfilData.NombreRefugio);
                  localStorage.setItem('fotoRefugio', perfilData.Foto_Perfil || '/Refugio/refugio1.jpeg');
                }
      
                setTimeout(() => {
                  window.location.href = '/refugio';
                }, 500);
              } else {
                console.error('No se pudo obtener el ID del refugio');
                setErrorLogin(true);
                setIsLoading(false);
              }
            } catch (error) {
              console.error('Error al obtener el ID del refugio:', error);
              setErrorLogin(true);
              setIsLoading(false);
            }
          } else if (rolData.rol === 'Administrador') {
            setTimeout(() => {
              window.location.href = '/admin';
            }, 500);
          } else {
            setTimeout(() => {
              window.location.href = '/match';
            }, 500);
          }
        } else {
          setErrorLogin(true);
          setIsLoading(false);
        }
      }
      
    } catch (err) {
      console.error('Error en login:', err);
      setErrorLogin(true);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 text-blue-200 opacity-60">
        <PawPrint size={40} />
      </div>
      <div className="absolute bottom-20 right-20 text-pink-200 opacity-60">
        <Heart size={32} />
      </div>
      <div className="absolute top-1/4 right-10 text-blue-100 opacity-40">
        <PawPrint size={24} />
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white/20">
        
        {/* Panel izquierdo - Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-[#30588C] to-[#BF3952] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center space-y-6">
            <div className="w- h- bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm p-4">
              <Image
                src="/Logo/logo3.png"
                alt="MatchPet Logo"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold">MatchPet</h1>
            <p className="text-xl opacity-90">Conectando corazones con patitas</p>
            <div className="flex gap-4 justify-center mt-8">
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            </div>
          </div>
          
          {/* Elementos decorativos */}
          <div className="absolute top-20 right-10 text-white/20">
            <Heart size={60} />
          </div>
          <div className="absolute bottom-10 left-10 text-white/20">
            <PawPrint size={80} />
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="p-8 lg:p-12 space-y-8">
          {/* Header móvil */}
          <div className="lg:hidden text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#30588C] to-[#BF3952] rounded-full flex items-center justify-center mx-auto p-2">
              <Image
                src="/Logo/logo3.png"
                alt="MatchPet Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">MatchPet</h2>
          </div>

          {/* Título principal */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">¡Bienvenido de vuelta!</h2>
            <p className="text-gray-600">Inicia sesión para encontrar a tu compañero ideal 🐾</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border-2 transition-all duration-200 ${
                    emailError 
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 bg-gray-50 focus:border-[#30588C] focus:ring-blue-200'
                  } focus:ring-4 outline-none`}
                  placeholder="tu@email.com"
                />
                {email && !emailError && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                )}
                {emailError && (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                )}
              </div>
              {emailError && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {emailError}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  className={`w-full pl-10 pr-10 py-3 text-sm rounded-xl border-2 transition-all duration-200 ${
                    passwordError 
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 bg-gray-50 focus:border-[#30588C] focus:ring-blue-200'
                  } focus:ring-4 outline-none`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {passwordError}
                </p>
              )}
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-[#30588C] focus:ring-[#30588C]"
                />
                <span className="text-gray-600">Recordarme</span>
              </label>
              <Link 
                href="/recuperar-contrasena" 
                className="text-[#30588C] hover:text-[#254559] transition-colors font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de login */}
            <Button
              type="submit"
              disabled={isLoading || !!emailError || !!passwordError}
              className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-[#30588C] to-[#BF3952] hover:from-[#254559] hover:to-[#9c2f46] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <LogIn size={18} />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          {/* Link de registro */}
          <div className="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link 
              href="/register" 
              className="text-[#BF3952] hover:text-[#9c2f46] font-medium transition-colors"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de error mejorado */}
      {errorLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-6 animate-bounce-in">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="text-red-500" size={32} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-gray-800">Credenciales incorrectas</h4>
              <p className="text-gray-600">
                Verifica tu correo electrónico y contraseña, luego intenta nuevamente.
              </p>
            </div>
            <Button
              onClick={() => setErrorLogin(false)}
              className="bg-gradient-to-r from-[#30588C] to-[#BF3952] text-white hover:from-[#254559] hover:to-[#9c2f46] px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Entendido
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}