"use client";

import React, { useState } from 'react';
import { Heart, MessageCircle, Users, Camera, Award, Star, Plus, Share2, BookOpen, Calendar, MapPin } from 'lucide-react';

const Comunidad = () => {
  const [activeTab, setActiveTab] = useState('historias');

  const successStories = [
    {
      id: 1,
      petName: "Luna",
      ownerName: "María González",
      image: "/Adoptante/m_immedicohospitalario_estudio_asegura_perros_47965_04115049.jpg",
      story:
        "Luna llegó a mi vida cuando más la necesitaba. Era una perrita tímida que había pasado meses en el refugio. Ahora es la reina de la casa y mi compañera de aventuras diarias.",
      timeAgo: "2 días",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      petName: "Max",
      ownerName: "Carlos Ruiz",
      image: "/Adoptante/EZCSEFJLM5D6VENJQQYZJDWK6E.avif",
      story:
        "Adoptar a Max fue la mejor decisión de nuestras vidas. Los niños han aprendido sobre responsabilidad y él nos ha enseñado sobre amor incondicional.",
      timeAgo: "1 semana",
      likes: 78,
      comments: 23,
    },
    {
      id: 3,
      petName: "Mimi",
      ownerName: "Ana Torres",
      image: "/Adoptante/b5648233-d5c4-48ab-84f8-7e5fd5485fba_16-9-aspect-ratio_default_0.jpg",
      story:
        "Mimi era una gatita senior que nadie quería adoptar. Hoy, a sus 8 años, sigue siendo juguetona y cariñosa. La edad es solo un número cuando hay tanto amor que dar.",
      timeAgo: "3 días",
      likes: 67,
      comments: 18,
    },
    {
      id: 4,
      petName: "Toby",
      ownerName: "Lucía Fernández",
      image: "/Adoptante/istockphoto-1307238003-612x612.jpg",
      story:
        "Toby fue rescatado tras vivir en las calles. Su energía y cariño nos han cambiado la vida. Ahora corre libremente en el jardín y duerme abrazado a su peluche favorito.",
      timeAgo: "5 días",
      likes: 52,
      comments: 9,
    },
  ];

  const events = [
    {
      id: 1,
      title: "Jornada de Adopción - Refugio Esperanza",
      date: "15 de Junio",
      time: "10:00 AM - 4:00 PM",
      location: "Parque Central",
      attendees: 45,
      type: "Adopción"
    },
    {
      id: 2,
      title: "Taller: Cuidados Básicos para Cachorros",
      date: "18 de Junio",
      time: "2:00 PM - 4:00 PM",
      location: "Centro Veterinario San Rafael",
      attendees: 28,
      type: "Educativo"
    },
    {
      id: 3,
      title: "Campaña de Esterilización Gratuita",
      date: "22 de Junio",
      time: "8:00 AM - 12:00 PM",
      location: "Clínica Veterinaria Popular",
      attendees: 67,
      type: "Salud"
    }
  ];

  const tips = [
    {
      id: 1,
      title: "Preparando tu hogar para un nuevo cachorro",
      author: "Dr. Patricia Mendez",
      category: "Preparación",
      readTime: "5 min",
      likes: 34
    },
    {
      id: 2,
      title: "Cómo ayudar a tu gato a adaptarse a su nuevo hogar",
      author: "Refugio Patitas Felices",
      category: "Adaptación",
      readTime: "7 min",
      likes: 52
    },
    {
      id: 3,
      title: "Señales de que tu mascota está feliz y saludable",
      author: "Veterinaria Los Robles",
      category: "Bienestar",
      readTime: "4 min",
      likes: 41
    }
  ];

  const champions = [
    {
      name: "Sofia Martinez",
      adopciones: 3,
      voluntariado: "120 horas",
      badge: "Ángel de Rescate"
    },
    {
      name: "Roberto Fernández",
      adopciones: 2,
      voluntariado: "85 horas",
      badge: "Defensor Animal"
    },
    {
      name: "Lucia Herrera",
      adopciones: 4,
      voluntariado: "150 horas",
      badge: "Super Adoptante"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Comunidad MatchPet</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Únete a nuestra familia de adoptantes, refugios y amantes de los animales. 
            Comparte historias, aprende y conecta con personas que comparten tu pasión por el bienestar animal.
          </p>
        </div>
      </section>

      <section className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-8 py-6">
            {[
                { id: 'historias', label: 'Historias de Éxito', icon: Heart },
            ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                >
                    <IconComponent className="w-5 h-5" />
                    {tab.label}
                </button>
                );
            })}
            </div>
        </div>
        </section>


      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Historias de Éxito */}
          <div className="grid lg:grid-cols-2 gap-8">
  {successStories.map((story) => (
    <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Imagen de la historia */}
      <div className="h-64 overflow-hidden">
        <img
          src={story.image}
          alt={`${story.petName} con ${story.ownerName}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">{story.petName} & {story.ownerName}</h3>
                    <p className="text-gray-500 text-sm">{story.timeAgo}</p>
                </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{story.story}</p>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{story.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{story.comments}</span>
                    </button>
                </div>
                <button className="text-gray-400 hover:text-blue-500">
                    <Share2 className="w-4 h-4" />
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Únete al espíritu de MatchPet</h2>
            <p className="text-xl mb-4 text-indigo-100">
            Nuestra comunidad celebra cada historia de amor entre humanos y mascotas.
            </p>
            <p className="text-lg text-indigo-200">
            Conoce historias reales, inspírate y descubre cómo pequeñas acciones pueden cambiar vidas.
            </p>
        </div>
        </section>

    </div>
  );
};

export default Comunidad;