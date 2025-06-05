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

// OBTENER ficha médica de una mascota
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT 
        m.nombre,
        m.especie,
        m.edad,
        f.estado_salud,
        f.vacunas,
        f.esterilizado
      FROM Mascota m
      LEFT JOIN FichaMedica f ON m.id_mascota = f.id_mascota
      WHERE m.id_mascota = ${id}
    `;

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Ficha no encontrada' }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0]);
  } catch (error) {
    console.error('Error en GET ficha médica:', error);
    return NextResponse.json({ error: 'Error al obtener la ficha médica' }, { status: 500 });
  }
}

// ACTUALIZAR ficha médica
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { estado_salud, vacunas, esterilizado } = await req.json();

  try {
    await sql.connect(config);

    // Verifica si existe una ficha médica para esa mascota
    const check = await sql.query`
      SELECT COUNT(*) AS total FROM FichaMedica WHERE id_mascota = ${id}
    `;

    const existe = check.recordset[0].total > 0;

    if (existe) {
      // UPDATE si ya existe
      await sql.query`
        UPDATE FichaMedica
        SET
          estado_salud = ${estado_salud},
          vacunas = ${vacunas},
          esterilizado = ${esterilizado},
          fecha_actualizacion = GETDATE()
        WHERE id_mascota = ${id}
      `;
    } else {
      // INSERT si no existe
      await sql.query`
        INSERT INTO FichaMedica (id_mascota, estado_salud, vacunas, esterilizado, fecha_actualizacion)
        VALUES (${id}, ${estado_salud}, ${vacunas}, ${esterilizado}, GETDATE())
      `;
    }

    return NextResponse.json({ message: 'Ficha médica actualizada correctamente' });
  } catch (error) {
    console.error('Error en PUT ficha médica:', error);
    return NextResponse.json({ error: 'Error al actualizar la ficha médica' }, { status: 500 });
  }
}
