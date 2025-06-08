'use client';
// Navegación entre pantallas para preview - No incluir en producción
import React, { useState } from 'react';
import { ArrowLeft, Mail, Heart, MapPin, ChefHat, Lock, CheckCircle, Settings, Eye, EyeOff, ArrowRight } from 'lucide-react';

const MatchPetRecoverySystem = () => {
  const [currentScreen, setCurrentScreen] = useState('email');
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState({ p1: '', p2: '', p3: '' });
  const [passwords, setPasswords] = useState({ nueva: '', confirmar: '' });


  // src/app/recuperar-contrasena/page.tsx
  const EmailScreen = () => (
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
            Te ayudamos a recuperar el acceso a tu cuenta de MatchPet de forma segura y rápida.
          </p>
          
          <div className="hidden lg:block space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#6093BF'}}>
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span style={{color: '#254559'}}>Verifica tu identidad con tu email</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#30588C'}}>
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span style={{color: '#254559'}}>Responde preguntas de seguridad</span>
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
            <p className="text-base" style={{color: '#254559'}}>Comenzaremos verificando tu dirección de correo electrónico</p>
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
                  className="w-full pl-12 pr-4 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    borderColor: '#6093BF',
                    '--tw-ring-color': '#30588C'
                  }}
                />
              </div>
            </div>

            <button 
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

  // src/app/recuperar-contrasena/preguntas/page.tsx
  const QuestionsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <button className="inline-flex items-center gap-2 mb-6 p-3 hover:bg-white rounded-xl transition-all" style={{color: '#254559'}}>
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4" style={{color: '#011526'}}>
            Preguntas de Seguridad
          </h1>
          <p className="text-lg" style={{color: '#254559'}}>
            Responde estas 3 preguntas para verificar tu identidad
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-3xl mx-auto">
          <div className="grid gap-8">
            {/* Pregunta 1 */}
            <div className="space-y-3">
              <label className="block text-lg font-medium flex items-center gap-3" style={{color: '#011526'}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#BF3952'}}>
                  <Heart className="w-5 h-5 text-white" />
                </div>
                ¿Cuál es el nombre de tu primera mascota?
              </label>
              <input
                type="text"
                placeholder="Escribe el nombre de tu primera mascota"
                className="w-full px-6 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#BF3952'
                }}
              />
            </div>

            {/* Pregunta 2 */}
            <div className="space-y-3">
              <label className="block text-lg font-medium flex items-center gap-3" style={{color: '#011526'}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#30588C'}}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                ¿En qué ciudad naciste?
              </label>
              <input
                type="text"
                placeholder="Escribe la ciudad donde naciste"
                className="w-full px-6 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#30588C'
                }}
              />
            </div>

            {/* Pregunta 3 */}
            <div className="space-y-3">
              <label className="block text-lg font-medium flex items-center gap-3" style={{color: '#011526'}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#6093BF'}}>
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                ¿Cuál es tu comida favorita?
              </label>
              <input
                type="text"
                placeholder="Escribe tu comida favorita"
                className="w-full px-6 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#6093BF'
                }}
              />
            </div>

            <button 
              className="w-full text-white py-4 rounded-xl font-medium text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg mt-8"
              style={{
                background: 'linear-gradient(135deg, #BF3952 0%, #30588C 100%)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #BF3952 0%, #30588C 100%)'}
            >
              Verificar Respuestas
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // src/app/recuperar-contrasena/nueva-contrasena/page.tsx
  const PasswordScreen = () => (
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
            Crea una contraseña segura para proteger tu cuenta de MatchPet.
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
            <button className="inline-flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-all" style={{color: '#254559'}}>
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
                  className="w-full pl-12 pr-12 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    borderColor: '#6093BF',
                    '--tw-ring-color': '#BF3952'
                  }}
                />
                <button
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
                  className="w-full pl-12 pr-12 py-4 border rounded-xl text-base focus:ring-2 focus:border-transparent transition-all"
                  style={{
                    borderColor: '#6093BF',
                    '--tw-ring-color': '#BF3952'
                  }}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
                  style={{color: '#6093BF'}}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              className="w-full text-white py-4 rounded-xl font-medium text-base transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #BF3952 0%, #30588C 100%)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)'}
            >
              Actualizar Contraseña
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // src/app/recuperar-contrasena/exito/page.tsx
  const SuccessScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" 
               style={{background: 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)'}}>
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Content */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-6" style={{color: '#011526'}}>
            ¡Contraseña Actualizada!
          </h1>
          <p className="text-lg lg:text-xl mb-10 max-w-md mx-auto" style={{color: '#254559'}}>
            Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
          </p>

          {/* Actions */}
          <div className="space-y-4 max-w-sm mx-auto">
            <button 
              className="w-full text-white py-4 rounded-xl font-medium text-base transition-all transform hover:scale-[1.02] shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #30588C 0%, #6093BF 100%)',
              }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #254559 0%, #30588C 100%)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #30588C 0%, #6093BF 100%)'}
            >
              Ir a Iniciar Sesión
            </button>
            
            <button className="w-full py-4 font-medium text-base transition-all hover:underline" style={{color: '#6093BF'}}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // src/app/perfil/configurar-preguntas/page.tsx
  const ConfigureScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <button className="inline-flex items-center gap-2 mb-6 p-3 hover:bg-white rounded-xl transition-all" style={{color: '#254559'}}>
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al perfil</span>
          </button>
          
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4" style={{color: '#011526'}}>
            Configurar Preguntas de Seguridad
          </h1>
          <p className="text-lg" style={{color: '#254559'}}>
            Estas preguntas te ayudarán a recuperar tu contraseña si la olvidas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pregunta 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#BF3952'}}>
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#011526'}}>Primera Mascota</h3>
            </div>
            
            <div className="space-y-4">
              <label className="block text-base font-medium" style={{color: '#BF3952'}}>
                ¿Cuál es el nombre de tu primera mascota?
              </label>
              <input
                type="text"
                placeholder="Ej: Firulais, Luna, Max..."
                className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#BF3952'
                }}
              />
              <p className="text-sm" style={{color: '#254559'}}>
                No importan mayúsculas ni espacios extras
              </p>
            </div>
          </div>

          {/* Pregunta 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#30588C'}}>
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#011526'}}>Ciudad Natal</h3>
            </div>
            
            <div className="space-y-4">
              <label className="block text-base font-medium" style={{color: '#30588C'}}>
                ¿En qué ciudad naciste?
              </label>
              <input
                type="text"
                placeholder="Ej: Santa Cruz, La Paz..."
                className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#30588C'
                }}
              />
            </div>
          </div>

          {/* Pregunta 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#6093BF'}}>
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#011526'}}>Comida Favorita</h3>
            </div>
            
            <div className="space-y-4">
              <label className="block text-base font-medium" style={{color: '#6093BF'}}>
                ¿Cuál es tu comida favorita?
              </label>
              <input
                type="text"
                placeholder="Ej: Pizza, Sopa, Asado..."
                className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: '#6093BF',
                  '--tw-ring-color': '#6093BF'
                }}
              />
            </div>
          </div>
        </div>

        {/* Botón y Nota */}
        <div className="text-center mt-12">
          <button 
            className="inline-flex items-center justify-center gap-3 text-white px-12 py-4 rounded-xl font-medium text-lg transition-all transform hover:scale-[1.02] shadow-lg mb-8"
            style={{
              background: 'linear-gradient(135deg, #BF3952 0%, #30588C 100%)',
            }}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #30588C 0%, #BF3952 100%)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #BF3952 0%, #30588C 100%)'}
          >
            Guardar Preguntas
            <CheckCircle className="w-5 h-5" />
          </button>

          <div className="bg-white p-6 rounded-xl border border-gray-100 max-w-2xl mx-auto" style={{borderLeft: '4px solid #BF3952'}}>
            <p className="text-base" style={{color: '#BF3952'}}>
              <strong>Importante:</strong> Asegúrate de recordar estas respuestas. Las necesitarás para recuperar tu contraseña en el futuro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const screens = {
    email: EmailScreen,
    questions: QuestionsScreen,
    password: PasswordScreen,
    success: SuccessScreen,
    configure: ConfigureScreen
  };

  const CurrentScreen = screens[currentScreen];

  return (
    <div className="relative">
      {/* Current Screen */}
      <CurrentScreen />
    </div>
  );
};

export default MatchPetRecoverySystem;