import React from 'react';
import { Heart, Users, Shield, Award, Target, Sparkles } from 'lucide-react';

const SobreNosotros = () => {
  const stats = [
    { number: "1,000+", label: "Mascotas Adoptadas", icon: Heart },
    { number: "50+", label: "Refugios Aliados", icon: Shield },
    { number: "2,500+", label: "Familias Felices", icon: Users },
    { number: "95%", label: "Tasa de Éxito", icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: "Amor Incondicional",
      description: "Creemos que cada mascota merece una familia que la ame y cuide por el resto de su vida."
    },
    {
      icon: Shield,
      title: "Adopción Responsable",
      description: "Promovemos procesos de adopción conscientes que aseguren el bienestar tanto de las mascotas como de las familias."
    },
    {
      icon: Sparkles,
      title: "Tecnología al Servicio",
      description: "Utilizamos algoritmos inteligentes para crear conexiones perfectas entre mascotas y adoptantes."
    },
    {
      icon: Target,
      title: "Impacto Real",
      description: "Nuestro objetivo es reducir el abandono animal y crear una sociedad más empática con los animales."
    }
  ];

  const team = [
    {
      name: "Equipo de Desarrollo",
      role: "Tecnología e Innovación",
      description: "Desarrolladores apasionados por crear soluciones tecnológicas que generen impacto social positivo."
    },
    {
      name: "Especialistas en Bienestar Animal",
      role: "Consultores Veterinarios",
      description: "Profesionales veterinarios que nos guían en las mejores prácticas de cuidado y adopción animal."
    },
    {
      name: "Red de Refugios",
      role: "Socios Estratégicos",
      description: "Refugios y organizaciones de rescate animal que confían en nuestra plataforma para encontrar hogares."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Sobre MatchPet</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Somos una plataforma tecnológica dedicada a revolucionar el proceso de adopción de mascotas, 
            conectando corazones y creando familias a través de la inteligencia artificial y el amor por los animales.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Nuestra Misión</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                En MatchPet, creemos que cada mascota merece un hogar lleno de amor y que cada familia 
                merece encontrar a su compañero perfecto. Nuestra misión es facilitar este encuentro 
                mágico a través de tecnología innovadora y un enfoque centrado en el bienestar animal.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Trabajamos incansablemente para crear un mundo donde ninguna mascota tenga que esperar 
                indefinidamente por una familia, y donde cada adopción sea una historia de éxito que 
                perdure toda la vida.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl p-8 text-white">
                <Heart className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Con amor y tecnología</h3>
                <p className="text-pink-100">
                  Combinamos algoritmos inteligentes con el poder del amor para crear 
                  conexiones perfectas entre mascotas y familias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Nuestro Impacto en Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            ¿Cómo Funciona MatchPet?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Crea tu Perfil</h3>
              <p className="text-gray-600">
                Completa un perfil detallado sobre tu estilo de vida, preferencias y el tipo de mascota que buscas.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Emparejamiento Inteligente</h3>
              <p className="text-gray-600">
                Nuestro algoritmo analiza tu perfil y te sugiere mascotas que son compatibles contigo.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Adopta con Confianza</h3>
              <p className="text-gray-600">
                Conéctate con refugios, conoce a tu futura mascota y completa el proceso de adopción de forma segura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}  
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <div className="text-indigo-600 font-semibold mb-4">{member.role}</div>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para Encontrar a tu Compañero Perfecto?</h2>
          <p className="text-xl mb-8 text-pink-100">
            Únete a miles de familias que ya han encontrado el amor incondicional a través de MatchPet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
              Comenzar Adopción
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
              Soy un Refugio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;