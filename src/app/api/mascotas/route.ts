import { connectToDb, sql } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET: Listar mascotas
export async function GET() {
  try {
    await connectToDb();

    const result = await sql`
      SELECT 
        id_mascota AS id,
        nombre,
        especie,
        raza,
        edad,
        estado_adopcion AS estado,
        descripcion,
        foto_url AS foto,
        id_user
      FROM Mascota
      WHERE estado_adopcion != 'Eliminado' -- puedes ajustar si no usas borrado lógico
    `;

    return NextResponse.json(result.rows, { status: 200 });

  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    return NextResponse.json({ error: 'Error al obtener mascotas' }, { status: 500 });
  }
}

// POST: Registrar nueva mascota
export async function POST(request: Request) {
  try {
    const {
      nombre,
      especie,
      raza,
      edad,
      estado, // corresponde a estado_adopcion
      descripcion,
      foto,
      id_user // debe venir del refugio logueado
    } = await request.json();

    await connectToDb();

    await sql`
      INSERT INTO Mascota (nombre, especie, raza, edad, estado_adopcion, descripcion, foto_url, id_user)
      VALUES (${nombre}, ${especie}, ${raza}, ${edad}, ${estado}, ${descripcion}, ${foto}, ${id_user})
    `;

    // 2. Insertar en historial
    const descripcionCambio = `Nueva mascota registrada: ${nombre}`;
    const responsable = `refugio_${id_user}`; // puedes personalizar según roles

    await sql`
      INSERT INTO Historial_Cambios (fecha_cambio, descripcion_cambio, responsable)
      VALUES (NOW(), ${descripcionCambio}, ${responsable})
    `;

    return NextResponse.json({ mensaje: 'Mascota registrada correctamente' }, { status: 201 });

  } catch (error) {
    console.error('Error al insertar mascota:', error);
    return NextResponse.json({ error: 'Error al registrar mascota' }, { status: 500 });
  }
}

