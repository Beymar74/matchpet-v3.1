import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      ID_Mascota,
      Nombre,
      Especie,
      Raza,
      Edad,
      Foto,
      Estado
    } = body;

    if (!ID_Mascota || !Nombre || !Especie || !Edad || !Estado) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    await sql.connect(config);

    // Supongamos que hay una tabla `Estados_Mascota` con ID_Estado
    const estadoQuery = await sql.query`
      SELECT ID_Estado FROM Estados_Mascota WHERE Nombre_Estado = ${Estado}
    `;

    if (estadoQuery.recordset.length === 0) {
      return NextResponse.json({ error: `Estado '${Estado}' no válido` }, { status: 400 });
    }

    const ID_Estado = estadoQuery.recordset[0].ID_Estado;

    await sql.query`
      UPDATE Mascotas
      SET 
        Nombre = ${Nombre},
        Especie = ${Especie},
        Raza = ${Raza},
        Edad = ${Edad},
        Foto = ${Foto},
        ID_Estado = ${ID_Estado}
      WHERE ID_Mascota = ${ID_Mascota}
    `;

    return NextResponse.json({ mensaje: 'Mascota actualizada correctamente' });
  } catch (error) {
    console.error('❌ Error en PUT /api/mascotas/editar:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la mascota', detalle: (error as Error).message },
      { status: 500 }
    );
  }
}
