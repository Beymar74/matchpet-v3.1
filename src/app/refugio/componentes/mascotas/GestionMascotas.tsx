import React, { useState } from 'react';
import { PlusCircle, Search, Filter, Heart, MapPin, Calendar, Edit, Trash2, X } from 'lucide-react';

// Componente FiltrosBusqueda
const FiltrosBusqueda = ({ 
  filtroTexto, 
  filtroEspecie, 
  filtroEstado, 
  onFiltroTextoChange, 
  onFiltroEspecieChange, 
  onFiltroEstadoChange 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro de texto */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar por nombre o raza..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
            value={filtroTexto}
            onChange={(e) => onFiltroTextoChange(e.target.value)}
          />
        </div>
        
        {/* Filtro de especie */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent appearance-none"
            value={filtroEspecie}
            onChange={(e) => onFiltroEspecieChange(e.target.value)}
          >
            <option value="">Todas las especies</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Ave">Ave</option>
            <option value="Conejo">Conejo</option>
          </select>
        </div>
        
        {/* Filtro de estado */}
        <div className="relative">
          <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent appearance-none"
            value={filtroEstado}
            onChange={(e) => onFiltroEstadoChange(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Disponible">Disponible</option>
            <option value="En tratamiento">En tratamiento</option>
            <option value="Adoptado">Adoptado</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Componente TarjetaMascota
const TarjetaMascota = ({ mascota, onClick }) => {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En tratamiento': return 'bg-yellow-100 text-yellow-800';
      case 'Adoptado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-gradient-to-br from-[#BF3952] to-[#254559] flex items-center justify-center text-white text-6xl">
        {mascota.especie === 'Perro' ? '🐕' : mascota.especie === 'Gato' ? '🐱' : '🐾'}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#011526]">{mascota.nombre}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(mascota.estado)}`}>
            {mascota.estado}
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <p><strong>Raza:</strong> {mascota.raza}</p>
          <p><strong>Edad:</strong> {mascota.edad}</p>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>{mascota.ubicacion}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 line-clamp-2">{mascota.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

// Componente ModalMascota
const ModalMascota = ({ mascota, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-[#011526]">{mascota.nombre}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Imagen placeholder */}
          <div className="h-64 bg-gradient-to-br from-[#BF3952] to-[#254559] rounded-lg flex items-center justify-center text-white text-8xl mb-6">
            {mascota.especie === 'Perro' ? '🐕' : mascota.especie === 'Gato' ? '🐱' : '🐾'}
          </div>
          
          {/* Información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-[#011526] mb-2">Información Básica</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Especie:</strong> {mascota.especie}</p>
                <p><strong>Raza:</strong> {mascota.raza}</p>
                <p><strong>Edad:</strong> {mascota.edad}</p>
                <p><strong>Sexo:</strong> {mascota.sexo}</p>
                <p><strong>Estado:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    mascota.estado === 'Disponible' ? 'bg-green-100 text-green-800' :
                    mascota.estado === 'En tratamiento' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {mascota.estado}
                  </span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#011526] mb-2">Detalles Adicionales</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Peso:</strong> {mascota.peso}</p>
                <p><strong>Color:</strong> {mascota.color}</p>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{mascota.ubicacion}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Registrado: {mascota.fechaRegistro}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Descripción */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#011526] mb-2">Descripción</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{mascota.descripcion}</p>
          </div>
          
          {/* Historial médico */}
          {mascota.historialMedico && (
            <div className="mb-6">
              <h3 className="font-semibold text-[#011526] mb-2">Historial Médico</h3>
              <p className="text-sm text-gray-600">{mascota.historialMedico}</p>
            </div>
          )}
          
          {/* Botones de acción */}
          <div className="flex space-x-3">
            <button
              onClick={() => onEdit && onEdit(mascota)}
              className="flex items-center space-x-2 bg-[#254559] text-white px-4 py-2 rounded-lg hover:bg-[#BF3952] transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>Editar</span>
            </button>
            
            <button
              onClick={() => onDelete && onDelete(mascota.id)}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente RegistrarMascota
const RegistrarMascota = ({ onClose, onMascotaRegistrada }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    sexo: '',
    peso: '',
    color: '',
    ubicacion: '',
    estado: 'Disponible',
    descripcion: '',
    historialMedico: ''
  });

  const handleSubmit = () => {
    if (!formData.nombre || !formData.especie) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    
    const nuevaMascota = {
      ...formData,
      id: Date.now(),
      fechaRegistro: new Date().toLocaleDateString()
    };
    onMascotaRegistrada(nuevaMascota);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#011526]">Registrar Nueva Mascota</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especie *</label>
                <select
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                >
                  <option value="">Seleccionar especie</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Conejo">Conejo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raza</label>
                <input
                  type="text"
                  name="raza"
                  value={formData.raza}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                <input
                  type="text"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  placeholder="Ej: 2 años, 6 meses"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                >
                  <option value="">Seleccionar sexo</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peso</label>
                <input
                  type="text"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  placeholder="Ej: 15 kg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="En tratamiento">En tratamiento</option>
                  <option value="Adoptado">Adoptado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                placeholder="Describe las características y personalidad de la mascota..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Historial Médico</label>
              <textarea
                name="historialMedico"
                value={formData.historialMedico}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BF3952] focus:border-transparent"
                placeholder="Vacunas, tratamientos, observaciones médicas..."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#BF3952] text-white px-6 py-2 rounded-lg hover:bg-[#254559] transition-colors"
              >
                Registrar Mascota
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal GestionMascotas
const GestionMascotas = () => {
  const [mascotaSeleccionadaId, setMascotaSeleccionadaId] = useState(null);
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);
  
  // Estado con datos de ejemplo
  const [mascotas, setMascotas] = useState([
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      sexo: "Macho",
      peso: "28 kg",
      color: "Dorado",
      ubicacion: "Santa Cruz, BO",
      estado: "Disponible",
      fechaRegistro: "15/05/2024",
      descripcion: "Max es un perro muy cariñoso y juguetón. Le encanta correr en el parque y es excelente con los niños. Está entrenado y es muy obediente.",
      historialMedico: "Vacunas al día. Desparasitado. Castrado. Última revisión: 01/05/2024"
    },
    {
      id: 2,
      nombre: "Luna",
      especie: "Gato",
      raza: "Siamés",
      edad: "2 años",
      sexo: "Hembra",
      peso: "4.5 kg",
      color: "Crema con puntas oscuras",
      ubicacion: "Santa Cruz, BO",
      estado: "En tratamiento",
      fechaRegistro: "20/04/2024",
      descripcion: "Luna es una gata elegante y cariñosa. Es muy tranquila y le gusta pasar tiempo en lugares altos observando todo a su alrededor.",
      historialMedico: "En tratamiento por infección respiratoria leve. Vacunas completas. Esterilizada."
    },
    {
      id: 3,
      nombre: "Rocky",
      especie: "Perro",
      raza: "Pastor Alemán",
      edad: "5 años",
      sexo: "Macho",
      peso: "35 kg",
      color: "Negro y café",
      ubicacion: "Santa Cruz, BO",
      estado: "Adoptado",
      fechaRegistro: "10/03/2024",
      descripcion: "Rocky es un perro guardián muy leal y protector. Necesita una familia con experiencia en perros grandes. Es muy inteligente y aprende rápido.",
      historialMedico: "Excelente estado de salud. Vacunas completas. Entrenamiento básico completado."
    }
  ]);

  // Estados para los filtros
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroEspecie, setFiltroEspecie] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Mascota seleccionada para ver detalle en el modal
  const mascotaSeleccionada = mascotas.find(m => m.id === mascotaSeleccionadaId);

  // Aplicar filtros a las mascotas
  const mascotasFiltradas = mascotas.filter((mascota) => {
    const coincideTexto =
      mascota.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      mascota.raza.toLowerCase().includes(filtroTexto.toLowerCase());
    const coincideEspecie = filtroEspecie === '' || mascota.especie === filtroEspecie;
    const coincideEstado = filtroEstado === '' || mascota.estado === filtroEstado;
    return coincideTexto && coincideEspecie && coincideEstado;
  });

  const handleEditarMascota = (mascota) => {
    // Aquí podrías abrir otro modal para editar
    console.log('Editar mascota:', mascota);
  };

  const handleEliminarMascota = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      setMascotas(prev => prev.filter(m => m.id !== id));
      setMascotaSeleccionadaId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header con botón agregar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h2 className="text-3xl font-bold text-[#011526]">Gestión de Mascotas</h2>
          <button
            className="bg-[#BF3952] text-white px-6 py-3 rounded-lg hover:bg-[#254559] flex items-center space-x-2 transition-colors shadow-md"
            onClick={() => setModalRegistroAbierto(true)}
          >
            <PlusCircle className="h-5 w-5" />
            <span>Agregar Mascota</span>
          </button>
        </div>

        {/* Componente de filtros */}
        <FiltrosBusqueda
          filtroTexto={filtroTexto}
          filtroEspecie={filtroEspecie}
          filtroEstado={filtroEstado}
          onFiltroTextoChange={setFiltroTexto}
          onFiltroEspecieChange={setFiltroEspecie}
          onFiltroEstadoChange={setFiltroEstado}
        />

        {/* Contador de resultados */}
        <div className="text-sm text-gray-600">
          Mostrando {mascotasFiltradas.length} de {mascotas.length} mascotas
        </div>

        {/* Tarjetas de mascotas filtradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotasFiltradas.length > 0 ? (
            mascotasFiltradas.map((mascota) => (
              <TarjetaMascota
                key={mascota.id}
                mascota={mascota}
                onClick={() => setMascotaSeleccionadaId(mascota.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron mascotas</h3>
              <p className="text-gray-500">
                {mascotas.length === 0 
                  ? "No hay mascotas registradas aún. ¡Agrega la primera!"
                  : "Intenta ajustar los filtros para encontrar lo que buscas."
                }
              </p>
            </div>
          )}
        </div>

        {/* Modal de detalles */}
        {mascotaSeleccionada && (
          <ModalMascota
            mascota={mascotaSeleccionada}
            onClose={() => setMascotaSeleccionadaId(null)}
            onEdit={handleEditarMascota}
            onDelete={handleEliminarMascota}
          />
        )}

        {/* Modal de registrar nueva mascota */}
        {modalRegistroAbierto && (
          <RegistrarMascota 
            onClose={() => setModalRegistroAbierto(false)}
            onMascotaRegistrada={(nuevaMascota) => {
              setMascotas(prev => [...prev, nuevaMascota]);
              setModalRegistroAbierto(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GestionMascotas;