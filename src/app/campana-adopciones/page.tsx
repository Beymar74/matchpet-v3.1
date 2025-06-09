// src/app/GestionNotificaciones/campana-adopciones/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Pencil, Send, Trash2, X, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface Campana {
    id: number;
    nombre: string;
    tipo: string;
    estado: string;
    enviadas: number;
    programadas: number;
    tasa_apertura: number;
    fecha: string;
    descripcion: string;
    creada: string;
    actualizada: string;
}

const estadosDisponibles = ['Programada', 'Activa', 'Finalizada', 'Expirada'];

const CampanasAdopciones = () => {
    const router = useRouter();
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [modalConfirmacion, setModalConfirmacion] = useState<'reenviar' | 'eliminar' | null>(null);
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [filtroFecha, setFiltroFecha] = useState('');

    const [campanas, setCampanas] = useState<Campana[]>([]);
    const [campanaSeleccionada, setCampanaSeleccionada] = useState<Campana | null>(null);
    const [nuevaCampana, setNuevaCampana] = useState({ nombre: '', descripcion: '', fecha: '', estado: 'Programada' });
    const [edicionCampana, setEdicionCampana] = useState({ nombre: '', descripcion: '', fecha: '', estado: 'Programada' });

    useEffect(() => {
        const hoy = new Date();
        const datos: Campana[] = [
            {
                id: 1,
                nombre: 'Campaña Adopción Mayo',
                tipo: 'Email',
                estado: 'Activa',
                enviadas: 234,
                programadas: 45,
                tasa_apertura: 67.4,
                fecha: '2025-06-10',
                descripcion: 'Promoción de adopciones para mayo en refugios aliados.',
                creada: '2025-06-01',
                actualizada: '2025-06-05'
            },
            {
                id: 2,
                nombre: 'Campaña Vacunación Gratuita',
                tipo: 'Email',
                estado: 'Programada',
                enviadas: 0,
                programadas: 60,
                tasa_apertura: 0,
                fecha: '2025-06-15',
                descripcion: 'Invitación a jornada de vacunación gratuita para mascotas.',
                creada: '2025-06-03',
                actualizada: '2025-06-06'
            },
            {
                id: 3,
                nombre: 'Campaña Adopta un Amigo',
                tipo: 'Email',
                estado: 'Finalizada',
                enviadas: 180,
                programadas: 0,
                tasa_apertura: 72.3,
                fecha: '2025-05-20',
                descripcion: 'Cierre exitoso de adopciones en abril. ¡Gracias por apoyar!',
                creada: '2025-04-15',
                actualizada: '2025-05-21'
            }
        ].map(c => {
            const fechaCampana = new Date(c.fecha);
            if (c.estado === 'Programada' && fechaCampana < hoy) {
                return { ...c, estado: 'Expirada' };
            }
            return c;
        });
        setCampanas(datos);
    }, []);

    const abrirModal = (campana: Campana) => {
        setCampanaSeleccionada(campana);
        setModalAbierto(true);
    };

    const abrirModalEditar = () => {
        if (campanaSeleccionada) {
            setEdicionCampana({
                nombre: campanaSeleccionada.nombre,
                descripcion: campanaSeleccionada.descripcion,
                fecha: campanaSeleccionada.fecha,
                estado: campanaSeleccionada.estado
            });
            setModalEditarAbierto(true);
        }
    };

    const guardarEdicion = () => {
        if (!edicionCampana.nombre || !edicionCampana.fecha || new Date(edicionCampana.fecha) < new Date()) {
            alert('❗ Completa todos los campos y asegúrate de que la fecha sea válida.');
            return;
        }
        setCampanas(prev => prev.map(c => c.id === campanaSeleccionada?.id ? {
            ...c,
            nombre: edicionCampana.nombre,
            descripcion: edicionCampana.descripcion,
            fecha: edicionCampana.fecha,
            estado: edicionCampana.estado,
            actualizada: new Date().toISOString().split('T')[0]
        } : c));
        setModalEditarAbierto(false);
        setModalAbierto(false);
    };

    const reenviarCampana = () => {
        setModalConfirmacion(null);
        alert('📤 Campaña reenviada con éxito.');
    };

    const eliminarCampana = () => {
        if (campanaSeleccionada) {
            setCampanas(campanas.filter(c => c.id !== campanaSeleccionada.id));
        }
        setModalAbierto(false);
        setModalConfirmacion(null);
    };

    const crearNuevaCampana = () => {
        if (!nuevaCampana.nombre || !nuevaCampana.fecha || new Date(nuevaCampana.fecha) < new Date()) {
            alert('❗ Completa todos los campos y asegúrate de que la fecha sea válida.');
            return;
        }
        const nueva: Campana = {
            id: Date.now(),
            nombre: nuevaCampana.nombre,
            descripcion: nuevaCampana.descripcion,
            fecha: nuevaCampana.fecha,
            tipo: 'Email',
            estado: nuevaCampana.estado,
            enviadas: 0,
            programadas: 50,
            tasa_apertura: 0,
            creada: new Date().toISOString().split('T')[0],
            actualizada: new Date().toISOString().split('T')[0]
        };
        setCampanas([...campanas, nueva]);
        setModalCrearAbierto(false);
        setNuevaCampana({ nombre: '', descripcion: '', fecha: '', estado: 'Programada' });
    };

    const campanasFiltradas = campanas.filter(c => {
        const coincideEstado = filtroEstado === 'Todos' || c.estado === filtroEstado;
        const coincideFecha = !filtroFecha || c.fecha === filtroFecha;
        return coincideEstado && coincideFecha;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:underline flex items-center">
                ← Volver
            </button>

            <div className="flex flex-col gap-1 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Campañas de Correo para Adopciones</h1>
                <p className="text-gray-600 max-w-3xl">
                    Administra y supervisa las campañas de correo electrónico enfocadas en la promoción de adopciones.
                    Desde esta sección puedes programar nuevas campañas, visualizar métricas clave, reenviarlas, editarlas,
                    o dar seguimiento a su rendimiento y estado actual.
                </p>
                <button
                    onClick={() => setModalCrearAbierto(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <PlusCircle className="w-4 h-4" /> Nueva Campaña
                </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <select className="p-2 border rounded" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
                    <option value="Todos">Todos los estados</option>
                    {estadosDisponibles.map(estado => (
                        <option key={estado} value={estado}>{estado}</option>
                    ))}
                </select>
                <input type="date" className="p-2 border rounded" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {campanasFiltradas.map(c => (
                    <div
                        key={c.id}
                        onClick={() => abrirModal(c)}
                        className="cursor-pointer p-5 bg-white shadow rounded-lg hover:bg-blue-50 transition"
                    >
                        <h2 className="text-lg font-semibold">{c.nombre}</h2>
                        <p className="text-sm text-gray-600">{c.descripcion}</p>
                        <p className="text-xs text-gray-400 mt-1">{c.fecha}</p>
                        <span className="text-xs text-white px-2 py-1 rounded bg-blue-600 inline-block mt-2">{c.estado}</span>
                    </div>
                ))}
            </div>

            {modalAbierto && campanaSeleccionada && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
                        <button onClick={() => setModalAbierto(false)} className="absolute top-2 right-2"><X /></button>
                        <h2 className="text-xl font-bold mb-4">{campanaSeleccionada.nombre}</h2>
                        <p>{campanaSeleccionada.descripcion}</p>
                        <p className="text-sm mt-2 text-gray-500">📅 Programada: {campanaSeleccionada.fecha}</p>
                        <p className="text-sm text-gray-500">📈 Tasa de apertura: {campanaSeleccionada.tasa_apertura}%</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={abrirModalEditar} className="flex items-center gap-1 px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 rounded"><Pencil className="w-4 h-4" /> Editar</button>
                            <button onClick={() => setModalConfirmacion('reenviar')} className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"><Send className="w-4 h-4" /> Reenviar</button>
                            <button onClick={() => setModalConfirmacion('eliminar')} className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"><Trash2 className="w-4 h-4" /> Eliminar</button>
                        </div>
                    </div>
                </div>
            )}

            {modalConfirmacion && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded shadow-lg max-w-sm w-full">
                        <p className="text-center text-lg font-semibold">
                            {modalConfirmacion === 'reenviar' ? '¿Deseas reenviar esta campaña?' : '¿Estás seguro de eliminar esta campaña?'}
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button onClick={() => setModalConfirmacion(null)} className="px-4 py-1 border rounded">Cancelar</button>
                            <button
                                onClick={modalConfirmacion === 'reenviar' ? reenviarCampana : eliminarCampana}
                                className="px-4 py-1 bg-red-600 text-white rounded"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalCrearAbierto && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                        <button onClick={() => setModalCrearAbierto(false)} className="absolute top-2 right-2"><X /></button>
                        <h2 className="text-lg font-semibold mb-4">Crear Nueva Campaña</h2>
                        <input type="text" placeholder="Nombre" className="w-full border p-2 mb-2" value={nuevaCampana.nombre} onChange={e => setNuevaCampana({ ...nuevaCampana, nombre: e.target.value })} />
                        <textarea placeholder="Descripción" className="w-full border p-2 mb-2" value={nuevaCampana.descripcion} onChange={e => setNuevaCampana({ ...nuevaCampana, descripcion: e.target.value })} />
                        <input type="date" className="w-full border p-2 mb-2" value={nuevaCampana.fecha} onChange={e => setNuevaCampana({ ...nuevaCampana, fecha: e.target.value })} />
                        <select className="w-full border p-2 mb-4" value={nuevaCampana.estado} onChange={e => setNuevaCampana({ ...nuevaCampana, estado: e.target.value })}>
                            {estadosDisponibles.map(estado => <option key={estado} value={estado}>{estado}</option>)}
                        </select>
                        <button onClick={crearNuevaCampana} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Crear Campaña</button>
                    </div>
                </div>
            )}

            {modalEditarAbierto && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                        <button onClick={() => setModalEditarAbierto(false)} className="absolute top-2 right-2"><X /></button>
                        <h2 className="text-lg font-semibold mb-4">Editar Campaña</h2>
                        <input type="text" placeholder="Nombre" className="w-full border p-2 mb-2" value={edicionCampana.nombre} onChange={e => setEdicionCampana({ ...edicionCampana, nombre: e.target.value })} />
                        <textarea placeholder="Descripción" className="w-full border p-2 mb-2" value={edicionCampana.descripcion} onChange={e => setEdicionCampana({ ...edicionCampana, descripcion: e.target.value })} />
                        <input type="date" className="w-full border p-2 mb-2" value={edicionCampana.fecha} onChange={e => setEdicionCampana({ ...edicionCampana, fecha: e.target.value })} />
                        <select className="w-full border p-2 mb-4" value={edicionCampana.estado} onChange={e => setEdicionCampana({ ...edicionCampana, estado: e.target.value })}>
                            {estadosDisponibles.map(estado => <option key={estado} value={estado}>{estado}</option>)}
                        </select>
                        <button onClick={guardarEdicion} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Guardar Cambios</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampanasAdopciones;
