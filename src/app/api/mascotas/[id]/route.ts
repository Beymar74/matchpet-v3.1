import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true,
  },
};

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT 
        id_mascota AS id,
        nombre,
        especie,
        raza,
        edad,
        estado_adopcion AS estado,
        descripcion,
        foto_url AS foto
      FROM Mascota
      WHERE id_mascota = ${id}
    `;

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Mascota no encontrada' }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0], { status: 200 });
  } catch (error) {
    console.error('Error en GET mascota:', error);
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const {
    nombre,
    especie,
    raza,
    edad,
    estado,
    descripcion,
    foto
  } = await req.json();

  if (!nombre || !especie || !estado || edad === undefined) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  try {
    await sql.connect(config);

    await sql.query`
      UPDATE Mascota
      SET
        nombre = ${nombre},
        especie = ${especie},
        raza = ${raza || ''},
        edad = ${edad},
        estado_adopcion = ${estado},
        descripcion = ${descripcion || ''},
        foto_url = ${foto || ''}
      WHERE id_mascota = ${id}
    `;

    return NextResponse.json({ message: 'Mascota actualizada correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error en PUT mascota:', error);
    return NextResponse.json({ error: 'Error al actualizar datos' }, { status: 500 });
  }
}
