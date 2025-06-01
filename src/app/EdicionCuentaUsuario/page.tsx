'use client';

import React, { useState, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import './customDatepicker.css';

const EditarPerfilUsuario: React.FC = () => {
  const [form, setForm] = useState({
    nombreCompleto: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    genero: '',
    mascotas: [] as string[],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMascota = (mascota: string) => {
    const nuevas = form.mascotas.includes(mascota)
      ? form.mascotas.filter((m) => m !== mascota)
      : [...form.mascotas, mascota];
    setForm({ ...form, mascotas: nuevas });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!form.nombreCompleto) newErrors.nombreCompleto = 'Campo requerido';
    if (!form.username) newErrors.username = 'Campo requerido';
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Correo inválido';
    if (form.password && form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'No coincide';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log('Formulario enviado:', form);
    setSuccessMsg('Perfil actualizado correctamente.');
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg border">
        <h2 className="text-2xl font-bold text-[#30588C] mb-6">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Nombre Completo</label>
            <input
              type="text"
              name="nombreCompleto"
              value={form.nombreCompleto}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              placeholder="Ingrese su nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Fecha de Cumpleaños</label>
            <DatePicker
              locale={es}
              selected={form.fechaNacimiento ? new Date(form.fechaNacimiento) : null}
              onChange={(date: Date | null) =>
                setForm({
                  ...form,
                  fechaNacimiento: date ? date.toISOString().split('T')[0] : '',
                })
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Seleccione o escriba una fecha"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              calendarClassName="custom-calendar"
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              showPopperArrow={false}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              placeholder="Nombre de usuario"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Género</label>
            <div className="flex gap-4">
              {['Femenino', 'Masculino'].map((gen) => (
                <button
                  key={gen}
                  type="button"
                  onClick={() => setForm({ ...form, genero: gen })}
                  className={`px-4 py-2 rounded-md border ${
                    form.genero === gen
                      ? 'bg-[#BF3952] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {gen}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              placeholder="Ingrese su email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Soy una persona de</label>
            <div className="flex gap-4">
              {['Gatos', 'Perros'].map((animal) => (
                <button
                  key={animal}
                  type="button"
                  onClick={() => toggleMascota(animal)}
                  className={`px-4 py-2 rounded-md border ${
                    form.mascotas.includes(animal)
                      ? 'bg-[#6093BF] text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {animal === 'Gatos' ? '🐱 Gatos' : '🐶 Perros'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              placeholder="Nueva contraseña"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              placeholder="Confirme su contraseña"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#BF3952] text-white px-6 py-2 rounded-md hover:bg-[#a32e45] transition"
            >
              Guardar Cambios
            </button>
          </div>

          {successMsg && (
            <div className="md:col-span-2 text-green-600 text-center font-semibold">
              {successMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditarPerfilUsuario;
