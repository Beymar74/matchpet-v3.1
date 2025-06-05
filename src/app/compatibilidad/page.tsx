'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Sparkles, AlertTriangle, PawPrint, ChevronLeft, ChevronRight, Save, RefreshCw, Clock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeaderMain from "@/components/layout/HeaderMain";

const preguntas = [
  {
    id: 'vivienda',
    texto: '¿En qué tipo de vivienda vives?',
    tipo: 'opciones',
    opciones: ['Casa Propia', 'Departamento', 'Casa Alquilada', 'Otro'],
    categoria: 'Hogar'
  },
  {
    id: 'espacio_exterior',
    texto: '¿Tienes espacio exterior para una mascota?',
    tipo: 'opciones',
    opciones: ['Sí, patio grande', 'Sí, patio pequeño', 'Sí, terraza/balcón', 'No tengo espacio exterior'],
    categoria: 'Hogar'
  },
  {
    id: 'horas_fuera',
    texto: '¿Cuántas horas al día estás fuera de casa?',
    tipo: 'opciones',
    opciones: ['Menos de 4 horas', '4-6 horas', '6-8 horas', 'Más de 8 horas'],
    categoria: 'Estilo de vida'
  },
  {
    id: 'preferencia_animal',
    texto: '¿Qué tipo de compañero prefieres adoptar?',
    tipo: 'opciones',
    opciones: ['Perro', 'Gato', 'Ambos me gustan', 'No estoy seguro/a'],
    categoria: 'Preferencias'
  },
  {
    id: 'experiencia',
    texto: '¿Tienes experiencia previa cuidando mascotas?',
    tipo: 'opciones',
    opciones: ['Mucha experiencia', 'Algo de experiencia', 'Poca experiencia', 'Soy principiante'],
    categoria: 'Experiencia'
  },
  {
    id: 'personalidad_ideal',
    texto: '¿Qué personalidad buscas en tu compañero ideal?',
    tipo: 'comentario',
    placeholder: 'Ej: Juguetón y energético, tranquilo y cariñoso, protector, independiente...',
    categoria: 'Personalidad'
  },
  {
    id: 'otras_mascotas',
    texto: '¿Tienes otras mascotas actualmente en casa?',
    tipo: 'opciones',
    opciones: ['Sí, tengo perros', 'Sí, tengo gatos', 'Tengo otros animales', 'No tengo mascotas'],
    categoria: 'Convivencia'
  },
  {
    id: 'alergias',
    texto: '¿Tienes alguna alergia o restricción médica?',
    tipo: 'comentario',
    placeholder: 'Especifica cualquier alergia al pelo de animales, restricciones médicas, etc. (Opcional)',
    categoria: 'Salud'
  },
  {
    id: 'tamaño_preferido',
    texto: '¿Qué tamaño de mascota prefieres?',
    tipo: 'opciones',
    opciones: ['Pequeño (menos de 10kg)', 'Mediano (10-25kg)', 'Grande (más de 25kg)', 'Sin preferencia de tamaño'],
    categoria: 'Características'
  },
  {
    id: 'edad_preferida',
    texto: '¿Qué edad prefieres en tu nueva mascota?',
    tipo: 'opciones',
    opciones: ['Cachorro/Gatito', 'Joven (1-3 años)', 'Adulto (3-7 años)', 'Senior (7+ años)', 'Sin preferencia'],
    categoria: 'Características'
  },
  {
    id: 'actividad_fisica',
    texto: '¿Cuánto tiempo puedes dedicar diariamente a ejercicio/juegos?',
    tipo: 'opciones',
    opciones: ['Menos de 30 min', '30-60 minutos', '1-2 horas', 'Más de 2 horas'],
    categoria: 'Estilo de vida'
  },
  {
    id: 'motivacion',
    texto: '¿Por qué deseas adoptar una mascota?',
    tipo: 'comentario',
    placeholder: 'Comparte tu motivación para adoptar...',
    categoria: 'Motivación'
  }
];

const categorias = ['Hogar', 'Estilo de vida', 'Preferencias', 'Experiencia', 'Personalidad', 'Convivencia', 'Salud', 'Características', 'Motivación'];

export default function CompatibilidadPage() {
  const [actual, setActual] = useState(0);
  const [respuestas, setRespuestas] = useState<{[key: string]: string}>({});
  const [otroTexto, setOtroTexto] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showGuardarModal, setShowGuardarModal] = useState(false);
  const [tiempoInicio] = useState(new Date());
  const [guardadoAutomatico, setGuardadoAutomatico] = useState(false);
  const router = useRouter();

  const pregunta = preguntas[actual];
  const progreso = ((actual + 1) / preguntas.length) * 100;
  const tiempoTranscurrido = Math.floor((new Date().getTime() - tiempoInicio.getTime()) / 60000);
  const [showReiniciarModal, setShowReiniciarModal] = useState(false);

  // Autoguardado cada 2 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(respuestas).length > 0) {
        localStorage.setItem('matchpet_test_respuestas', JSON.stringify({
          respuestas,
          actual,
          timestamp: new Date().toISOString()
        }));
        setGuardadoAutomatico(true);
        setTimeout(() => setGuardadoAutomatico(false), 2000);
      }
    }, 120000);
    
    
    return () => clearInterval(interval);
  }, [respuestas, actual]);

  // Cargar respuestas guardadas al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('matchpet_test_respuestas');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const savedDate = new Date(data.timestamp);
        const hoursDiff = (new Date().getTime() - savedDate.getTime()) / (1000 * 3600);
        
        if (hoursDiff < 24) { // Solo cargar si es menos de 24 horas
          setRespuestas(data.respuestas || {});
          setActual(data.actual || 0);
        }
      } catch (error) {
        console.error('Error loading saved responses:', error);
      }
    }
  }, []);

  const handleRespuesta = (valor: string) => {
    setRespuestas(prev => ({
      ...prev,
      [pregunta.id]: valor
    }));
  };

  const siguiente = () => {
    const respuesta = respuestas[pregunta.id];
    const esOtro = respuesta === 'Otro';

    if (!respuesta || (esOtro && !otroTexto.trim())) {
      setShowWarning(true);
      return;
    }

    if (esOtro && otroTexto.trim()) {
      handleRespuesta(`${otroTexto}`);
    }

    if (actual < preguntas.length - 1) {
      setActual(actual + 1);
      setOtroTexto('');
    } else {
      setShowModal(true);
    }
  };

  const anterior = () => {
    if (actual > 0) {
      setActual(actual - 1);
      setOtroTexto('');
    }
  };

  const guardarProgreso = () => {
    localStorage.setItem('matchpet_test_respuestas', JSON.stringify({
      respuestas,
      actual,
      timestamp: new Date().toISOString()
    }));
    setShowGuardarModal(true);
  };

  const reiniciarTest = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar el test? Se perderán todas las respuestas.')) {
      setRespuestas({});
      setActual(0);
      setOtroTexto('');
      localStorage.removeItem('matchpet_test_respuestas');
    }
  };

  const salirSinGuardar = () => {
    if (Object.keys(respuestas).length > 0) {
      if (confirm('¿Quieres guardar tu progreso antes de salir?')) {
        guardarProgreso();
      }
    }
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderMain />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header del Test */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <PawPrint className="text-[#BF3952]" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-[#30588C]">Test de Compatibilidad</h1>
                <p className="text-gray-600 text-sm">Descubre tu compañero ideal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{tiempoTranscurrido} min</span>
              </div>
              {guardadoAutomatico && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Save size={16} />
                  <span>Guardado</span>
                </div>
              )}
            </div>
          </div>

          {/* Barra de Progreso Mejorada */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pregunta {actual + 1} de {preguntas.length}</span>
              <span className="text-[#30588C] font-medium">{Math.round(progreso)}% completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#30588C] to-[#6093BF] h-full rounded-full transition-all duration-500 relative"
                style={{ width: `${progreso}%` }}
              >
                <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-md transform translate-x-1"></div>
              </div>
            </div>
            
            {/* Indicador de categorías */}
            <div className="flex flex-wrap gap-1 mt-3">
              {categorias.map((cat, index) => {
                const preguntasCategoria = preguntas.filter(p => p.categoria === cat);
                const completadas = preguntasCategoria.filter(p => respuestas[p.id]).length;
                const total = preguntasCategoria.length;
                const porcentaje = (completadas / total) * 100;
                
                return (
                  <div key={cat} className="text-xs px-2 py-1 rounded-full bg-gray-100 flex items-center space-x-1">
                    <span className={`w-2 h-2 rounded-full ${porcentaje === 100 ? 'bg-green-500' : porcentaje > 0 ? 'bg-yellow-500' : 'bg-gray-300'}`}></span>
                    <span className="text-gray-600">{cat}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#30588C]/10 rounded-full mb-4">
              <span className="text-2xl font-bold text-[#30588C]">{actual + 1}</span>
            </div>
            <div className="max-w-md mx-auto mb-2">
              <span className="inline-block px-3 py-1 bg-[#BF3952]/10 text-[#BF3952] text-xs font-medium rounded-full mb-3">
                {pregunta.categoria}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {pregunta.texto}
            </h2>
          </div>

          {/* Opciones de Respuesta */}
          <div className="max-w-2xl mx-auto">
            {pregunta.tipo === 'opciones' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pregunta.opciones?.map((opcion, i) => (
                  <button
                    key={i}
                    onClick={() => handleRespuesta(opcion)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                      respuestas[pregunta.id] === opcion 
                        ? 'border-[#30588C] bg-[#30588C] text-white shadow-lg transform scale-[1.02]' 
                        : 'border-gray-200 text-gray-700 hover:border-[#30588C]/50 hover:bg-[#30588C]/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{opcion}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        respuestas[pregunta.id] === opcion ? 'border-white' : 'border-gray-300'
                      }`}>
                        {respuestas[pregunta.id] === opcion && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}

                {respuestas[pregunta.id] === 'Otro' && (
                  <div className="col-span-full mt-4">
                    <input
                      type="text"
                      value={otroTexto}
                      onChange={(e) => setOtroTexto(e.target.value)}
                      placeholder="Especifica tu respuesta..."
                      className="w-full border-2 border-[#30588C] rounded-xl px-4 py-3 focus:ring-4 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none text-[#30588C]"
                      autoFocus
                    />

                  </div>
                )}
              </div>
            )}

            {(pregunta.tipo === 'texto' || pregunta.tipo === 'comentario') && (
              <div className="space-y-3">
                <textarea
                  value={respuestas[pregunta.id] || ''}
                  onChange={(e) => handleRespuesta(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-4 focus:ring-[#30588C]/20 focus:border-[#30588C] outline-none resize-none text-[#30588C]"
                  rows={pregunta.tipo === 'comentario' ? 4 : 2}
                  placeholder={pregunta.placeholder || 'Escribe tu respuesta...'}
                />

                <div className="text-right text-sm text-gray-500">
                  {(respuestas[pregunta.id] || '').length}/500
                </div>
              </div>
            )}
          </div>

          {/* Controles de Navegación */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
            <div className="flex space-x-3">
              <Button
                onClick={anterior}
                disabled={actual === 0}
                variant="outline"
                className="flex items-center space-x-2 px-6 py-2 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
                <span>Anterior</span>
              </Button>
              
              <Button
                onClick={guardarProgreso}
                variant="outline"
                className="flex items-center space-x-2 px-4 py-2 text-[#30588C] border-[#30588C]/30 hover:bg-[#30588C]/5"
              >
                <Save size={18} />
                <span className="hidden sm:inline">Guardar</span>
              </Button>
            </div>

            <div className="flex space-x-3">
            <Button
              onClick={() => setShowReiniciarModal(true)}
              variant="outline"
              className="flex items-center space-x-2 px-4 py-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <RefreshCw size={18} />
              <span className="hidden sm:inline">Reiniciar</span>
            </Button>

              
              <Button
                onClick={siguiente}
                className="bg-[#BF3952] hover:bg-[#a53044] text-white px-8 py-2 flex items-center space-x-2 shadow-lg"
              >
                <span>{actual === preguntas.length - 1 ? 'Finalizar Test' : 'Siguiente'}</span>
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Botón Salir */}
        <div className="text-center mt-6">
          <button
            onClick={salirSinGuardar}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Salir del test
          </button>
        </div>
      </div>

      {/* Modal de Advertencia */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-4 animate-in fade-in duration-300">
            <AlertTriangle className="text-[#BF3952] mx-auto" size={48} />
            <h4 className="text-xl font-semibold text-[#BF3952]">¡Falta tu respuesta!</h4>
            <p className="text-gray-600">
              Por favor selecciona una opción o escribe tu respuesta para continuar con el test.
            </p>
            <Button
              onClick={() => setShowWarning(false)}
              className="bg-[#30588C] hover:bg-[#254559] text-white px-6 py-2 w-full"
            >
              Entendido
            </Button>
          </div>
        </div>
      )}

      {/* Modal de Progreso Guardado */}
      {showGuardarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-4 animate-in fade-in duration-300">
            <Save className="text-green-600 mx-auto" size={48} />
            <h4 className="text-xl font-semibold text-green-600">¡Progreso Guardado!</h4>
            <p className="text-gray-600">
              Tu progreso ha sido guardado exitosamente. Puedes continuar más tarde desde donde lo dejaste.
            </p>
            <Button
              onClick={() => setShowGuardarModal(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* Modal de Finalización */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-end">
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-[#BF3952] to-[#30588C] rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="text-white" size={40} />
              </div>
              
              <h3 className="text-3xl font-bold text-[#30588C]">
                ¡Test Completado! 🎉
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Excelente trabajo completando el test de compatibilidad. 
                Nuestro algoritmo ya está analizando tus respuestas para encontrar 
                a tu compañero perfecto.
              </p>
              
              <div className="bg-gradient-to-r from-[#30588C]/10 to-[#BF3952]/10 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong>Tiempo total:</strong> {tiempoTranscurrido} minutos<br/>
                  <strong>Respuestas completadas:</strong> {Object.keys(respuestas).length}/{preguntas.length}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push('/resultados')}
                className="flex-1 bg-gradient-to-r from-[#30588C] to-[#6093BF] hover:from-[#254559] hover:to-[#30588C] text-white py-3 text-lg font-medium shadow-lg"
              >
                Ver Mis Resultados
              </Button>
              <Button
                onClick={() => router.push('/dashboard')}
                variant="outline"
                className="px-6 py-3 border-[#30588C]/30 text-[#30588C] hover:bg-[#30588C]/5"
              >
                Ir al Dashboard
              </Button>
            </div>
            
            <p className="text-xs text-gray-500">
              Puedes revisar y modificar tus respuestas en cualquier momento desde tu perfil.
            </p>
          </div>
        </div>
      )}
      {/* Modal de Confirmación para Reiniciar */}
{showReiniciarModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-4 animate-in fade-in duration-300">
      <AlertTriangle className="text-[#BF3952] mx-auto" size={48} />
      <h4 className="text-xl font-semibold text-[#BF3952]">¿Reiniciar el test?</h4>
      <p className="text-gray-600">
        Se perderán todas las respuestas registradas hasta el momento.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          onClick={() => {
            setShowReiniciarModal(false);
            setRespuestas({});
            setActual(0);
            setOtroTexto('');
            localStorage.removeItem('matchpet_test_respuestas');
          }}
          className="bg-red-600 hover:bg-red-700 text-white w-full"
        >
          Sí, reiniciar
        </Button>
        <Button
          onClick={() => setShowReiniciarModal(false)}
          variant="outline"
          className="w-full border-gray-300 text-gray-700"
        >
          Cancelar
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}