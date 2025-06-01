'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Sparkles, AlertTriangle, PawPrint } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const preguntas = [
  {
    texto: '¿En qué tipo de vivienda vives?',
    tipo: 'opciones',
    opciones: ['Casa Propia', 'Departamento', 'Otro'],
  },
  {
    texto: '¿Tienes espacio exterior para una mascota?',
    tipo: 'opciones',
    opciones: ['Sí, patio grande', 'Sí, terraza', 'No'],
  },
  {
    texto: '¿Cuántas horas al día estás fuera de casa?',
    tipo: 'texto',
  },
  {
    texto: '¿Prefieres adoptar un perro, un gato o estás abierto a ambos?',
    tipo: 'opciones',
    opciones: ['Perro', 'Gato', 'Ambos', 'No estoy seguro'],
  },
  {
    texto: '¿Tienes experiencia previa cuidando mascotas?',
    tipo: 'comentario',
    placeholder: 'Describe tu experiencia si aplica...'
  },
  {
    texto: '¿Qué tipo de personalidad esperas en tu compañero ideal?',
    tipo: 'comentario',
    placeholder: 'Ej. juguetón, protector, tranquilo...'
  },
  {
    texto: '¿Tienes otras mascotas actualmente?',
    tipo: 'opciones',
    opciones: ['Sí, perros', 'Sí, gatos', 'Otras', 'No tengo'],
  },
  {
    texto: '¿Tienes alguna alergia o restricción que debamos considerar?',
    tipo: 'comentario',
    placeholder: 'Especifica si aplica (opcional)...'
  },
  {
    texto: '¿Qué tamaño de mascota prefieres?',
    tipo: 'opciones',
    opciones: ['Pequeño', 'Mediano', 'Grande', 'Sin preferencia'],
  },
  {
    texto: '¿Por qué deseas adoptar una mascota?',
    tipo: 'texto',
  }
];

export default function CompatibilidadPage() {
  const [actual, setActual] = useState(0);
  const [respuestas, setRespuestas] = useState<string[]>(Array(preguntas.length).fill(''));
  const [otroTexto, setOtroTexto] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const router = useRouter();

  const handleRespuesta = (valor: string) => {
    const nuevas = [...respuestas];
    nuevas[actual] = valor;
    setRespuestas(nuevas);
  };

  const siguiente = () => {
    const respuesta = respuestas[actual];
    const esOtro = respuesta === 'Otro';

    if (!respuesta || (esOtro && !otroTexto.trim())) {
      setShowWarning(true);
      return;
    }

    if (esOtro) handleRespuesta(`Otro: ${otroTexto}`);

    if (actual < preguntas.length - 1) {
      setActual(actual + 1);
      setOtroTexto('');
    } else {
      setShowModal(true);
    }
  };

  const progreso = ((actual + 1) / preguntas.length) * 100;
  const pregunta = preguntas[actual];

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f7fafe] px-6 py-12 text-black">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 space-y-8 text-black">

        <div className="text-center space-y-2 text-black">
          <h2 className="text-3xl font-bold text-[#30588C] flex items-center justify-center gap-2 text-black">
            <PawPrint className="text-[#BF3952] text-black" /> Test de Compatibilidad
          </h2>
          <p className="text-gray-600 text-sm text-black">¡Descubre qué mascota encaja perfecto contigo!</p>
          <Image
            src="/Logo/logo1.png"
            alt="Logo MatchPet"
            width={130}
            height={130}
            className="mx-auto text-black"
          />
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 text-black">
          <div
            className="bg-[#30588C] h-full rounded-full transition-all duration-500 text-black"
            style={{ width: `${progreso}%` }}
          />
        </div>

        <h3 className="text-lg font-semibold text-center text-[#30588C] min-h-[60px] text-black">
          {pregunta.texto}
        </h3>

        {pregunta.tipo === 'opciones' && (
          <div className="flex flex-wrap justify-center gap-4 text-black">
            {pregunta.opciones?.map((opcion, i) => (
              <button
                key={i}
                onClick={() => handleRespuesta(opcion)}
                className={`px-5 py-2 rounded-xl border text-sm font-medium transition shadow-sm
                  ${respuestas[actual] === opcion ? 'bg-[#30588C] text-white' : 'border-[#30588C] text-[#30588C] hover:bg-[#30588C]/10'}`}
              >
                {opcion}
              </button>
            ))}

            {respuestas[actual] === 'Otro' && (
              <input
                type="text"
                value={otroTexto}
                onChange={(e) => setOtroTexto(e.target.value)}
                placeholder="Especifica..."
                className="w-full border rounded-xl px-4 py-2 text-sm mt-3 focus:ring-[#30588C] focus:border-[#30588C] text-black"
              />
            )}
          </div>
        )}

        {pregunta.tipo === 'texto' && (
          <input
            type="text"
            value={respuestas[actual]}
            onChange={(e) => handleRespuesta(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-[#30588C] focus:border-[#30588C] text-black"
            placeholder="Tu respuesta..."
          />
        )}

        {pregunta.tipo === 'comentario' && (
          <textarea
            value={respuestas[actual]}
            onChange={(e) => handleRespuesta(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-[#30588C] focus:border-[#30588C] text-black"
            rows={4}
            placeholder={pregunta.placeholder || 'Escribe tu comentario...'}
          />
        )}

        <div className="text-center text-black">
          <Button
            onClick={siguiente}
            className="bg-[#BF3952] text-white px-6 py-2 rounded-xl shadow hover:bg-[#a53044] text-black"
          >
            {actual === preguntas.length - 1 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </div>
      </div>

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 text-black">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center space-y-4 animate-fade-in-up text-black">
            <AlertTriangle className="text-[#BF3952] mx-auto text-black" size={40} />
            <h4 className="text-lg font-semibold text-[#BF3952] text-black">¡Ups! Falta tu respuesta</h4>
            <p className="text-gray-600 text-sm text-black">Selecciona una opción o escribe algo para continuar.</p>
            <Button
              onClick={() => setShowWarning(false)}
              className="bg-[#30588C] text-white hover:bg-[#254559] px-6 py-2 rounded-xl shadow text-black"
            >
              Entendido
            </Button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 text-black">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-4 animate-fade-in-up text-black">
            <div className="flex justify-end text-black">
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-black">
                <X size={20} />
              </button>
            </div>
            <Sparkles className="text-[#BF3952] mx-auto text-black" size={40} />
            <h3 className="text-2xl font-bold text-[#30588C] text-black">¡Test completado! 🐾</h3>
            <p className="text-gray-600 text-sm text-black">
              Gracias por tus respuestas. Pronto te mostraremos tus coincidencias más adorables.
            </p>
            <Button
              onClick={() => router.push('/resultados')}
              className="mt-4 bg-[#30588C] text-white hover:bg-[#254559] px-6 py-2 rounded-xl shadow-md text-black"
            >
              Ver resultados
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
