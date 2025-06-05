import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true },
};

export async function GET() {
  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT 
        m.id_mascota AS id,
        m.nombre,
        m.especie,
        m.edad,
        f.estado_salud,
        f.vacunas,
        f.esterilizado
      FROM Mascota m
      LEFT JOIN FichaMedica f ON m.id_mascota = f.id_mascota
    `;

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener fichas médicas:', error);
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
  }
}
