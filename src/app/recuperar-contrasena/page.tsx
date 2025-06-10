'use client';
import React, { useState } from 'react';
import { ArrowLeft, Mail, Heart, Lock, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';

// Componentes definidos fuera para evitar re-creación en cada render
const EmailScreen = ({ email, setEmail, handleEmailSubmit }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
      {/* Lado Izquierdo - Información */}
      <div className="text-center lg:text-left">
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6" 
             style={{background: 'linear-gradient(135deg, #BF3952 0%, #30588C 100%)'}}>
          <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{color: '#011526'}}>
          Recupera tu contraseña
        </h1>
        <p className="text-lg lg:text-xl mb-6" style={{color: '#254559'}}>
          Ingresa tu correo electrónico y podrás crear una nueva contraseña al instante.
        </p>
        
        <div className="hidden lg:block space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#6093BF'}}>
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span style={{color: '#254559'}}>Ingresa tu email registrado</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#BF3952'}}>
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span style={{color: '#254559'}}>Crea tu nueva contraseña</span>
          </div>
        </div>
      </div>

      {/* Lado Derecho - Formulario */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3" style={{color: '#011526'}}>Ingresa tu email</h2>
          <p className="text-base" style={{color: '#254559'}}>Introduce tu dirección de correo electrónico para continuar</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-base font-medium mb-3" style={{color: '#30588C'}}>
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#6093BF'}} />
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailSubmit();
                  }
                }}
                className="w-full pl-12 pr-4 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#30588C'
                }}
              />
            </div>
          </div>

          <button 
            onClick={handleEmailSubmit}
            className="w-full text-white py-4 rounded-xl font-medium text-base transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #30588C 0%, #6093BF 100%)',
            }}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #254559 0%, #30588C 100%)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #30588C 0%, #6093BF 100%)'}
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="text-center pt-4">
            <a href="#" className="text-base font-medium hover:underline transition-colors" style={{color: '#6093BF'}}>
              Volver al inicio de sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PasswordScreen = ({ email, passwords, setPasswords, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, handlePasswordSubmit, setCurrentScreen }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
      {/* Lado Izquierdo - Información */}
      <div className="text-center lg:text-left order-2 lg:order-1">
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6" 
             style={{background: 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)'}}>
          <Lock className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
        </div>
        
        <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{color: '#011526'}}>
          Nueva Contraseña
        </h1>
        <p className="text-lg lg:text-xl mb-8" style={{color: '#254559'}}>
          Crea una contraseña segura para tu cuenta de MatchPet.
        </p>
        <p className="text-base mb-8 px-4 py-3 rounded-lg" style={{color: '#254559', backgroundColor: '#f1f5f9'}}>
          Email: <strong>{email}</strong>
        </p>

        <div className="hidden lg:block p-6 rounded-xl" style={{backgroundColor: '#f8fafc', borderLeft: '4px solid #30588C'}}>
          <h4 className="text-lg font-medium mb-4" style={{color: '#30588C'}}>Consejos para una contraseña segura:</h4>
          <ul className="space-y-2 text-base" style={{color: '#254559'}}>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#6093BF'}}></div>
              Usa al menos 6 caracteres
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#6093BF'}}></div>
              Combina letras y números
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#6093BF'}}></div>
              Evita información personal
            </li>
          </ul>
        </div>
      </div>

      {/* Lado Derecho - Formulario */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 order-1 lg:order-2">
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setCurrentScreen('email')}
            className="inline-flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-all" 
            style={{color: '#254559'}}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Nueva Contraseña */}
          <div>
            <label className="block text-base font-medium mb-3" style={{color: '#011526'}}>
              Nueva contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#6093BF'}} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={passwords.nueva}
                onChange={(e) => setPasswords(prev => ({...prev, nueva: e.target.value}))}
                className="w-full pl-12 pr-12 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#BF3952'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
                style={{color: '#6093BF'}}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-base font-medium mb-3" style={{color: '#011526'}}>
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#6093BF'}} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repite tu contraseña"
                value={passwords.confirmar}
                onChange={(e) => setPasswords(prev => ({...prev, confirmar: e.target.value}))}
                className="w-full pl-12 pr-12 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#BF3952'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
                style={{color: '#6093BF'}}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwords.nueva && passwords.confirmar && passwords.nueva !== passwords.confirmar && (
              <p className="text-sm mt-2" style={{color: '#BF3952'}}>
                Las contraseñas no coinciden
              </p>
            )}
          </div>

          <button 
            onClick={handlePasswordSubmit}
            disabled={!passwords.nueva || !passwords.confirmar || passwords.nueva !== passwords.confirmar}
            className="w-full text-white py-4 rounded-xl font-medium text-base transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)',
            }}
            onMouseEnter={(e) => !e.target.disabled && (e.target.style.background = 'linear-gradient(135deg, #BF3952 0%, #30588C 100%)')}
            onMouseLeave={(e) => !e.target.disabled && (e.target.style.background = 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)')}
          >
            Actualizar Contraseña
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SuccessScreen = ({ email, resetForm }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" 
             style={{background: 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)'}}>
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold mb-6" style={{color: '#011526'}}>
          ¡Contraseña Actualizada!
        </h1>
        <p className="text-lg lg:text-xl mb-4 max-w-md mx-auto" style={{color: '#254559'}}>
          Tu contraseña ha sido cambiada exitosamente para:
        </p>
        <p className="text-lg font-medium mb-10 px-4 py-2 rounded-lg inline-block" style={{color: '#30588C', backgroundColor: '#f1f5f9'}}>
          {email}
        </p>

        <div className="space-y-4 max-w-sm mx-auto">
          <button 
            onClick={resetForm}
            className="w-full text-white py-4 rounded-xl font-medium text-base transition-all transform hover:scale-[1.02] shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #30588C 0%, #6093BF 100%)',
            }}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #254559 0%, #30588C 100%)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #30588C 0%, #6093BF 100%)'}
          >
            Ir a Iniciar Sesión
          </button>
          
          <button 
            onClick={resetForm}
            className="w-full py-4 font-medium text-base transition-all hover:underline" 
            style={{color: '#6093BF'}}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SimplePasswordRecovery = () => {
  const [currentScreen, setCurrentScreen] = useState('email');
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({ nueva: '', confirmar: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSubmit = () => {
    if (email.trim()) {
      setCurrentScreen('password');
    } else {
      alert('Por favor ingresa un email válido');
    }
  };

  const handlePasswordSubmit = async () => {
    if (!passwords.nueva || !passwords.confirmar || passwords.nueva !== passwords.confirmar) return;
  
    try {
      const res = await fetch('/api/recuperar/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          nuevaContrasena: passwords.nueva
        })
      });
  
      const data = await res.json();
  
      if (data.success) {
        setCurrentScreen('success');
      } else {
        alert(data.error || 'No se pudo actualizar la contraseña');
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    }
  };
  

  const resetForm = () => {
    setCurrentScreen('email');
    setEmail('');
    setPasswords({nueva: '', confirmar: ''});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const screenProps = {
    email,
    setEmail,
    passwords,
    setPasswords,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleEmailSubmit,
    handlePasswordSubmit,
    setCurrentScreen,
    resetForm
  };

  return (
    <div className="relative">
      {currentScreen === 'email' && <EmailScreen {...screenProps} />}
      {currentScreen === 'password' && <PasswordScreen {...screenProps} />}
      {currentScreen === 'success' && <SuccessScreen {...screenProps} />}
    </div>
  );
};

export default SimplePasswordRecovery;