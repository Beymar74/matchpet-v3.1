// /api/refugio/[id]/route.ts
import { NextResponse } from 'next/server'
import sql from 'mssql'

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
}

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ success: false, error: 'ID inválido' }, { status: 400 });
  }

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT u.Nombre, u.Foto_Perfil
      FROM Refugios r
      JOIN Usuarios u ON r.ID_Usuario = u.ID_Usuario
      WHERE r.ID_Refugio = ${id}
    `;

    if (result.recordset.length === 0) {
      return NextResponse.json({ success: false, error: 'Refugio no encontrado' }, { status: 404 });
    }

    const refugio = result.recordset[0];

    return NextResponse.json({
      success: true,
      nombre: refugio.Nombre,
      fotoPerfil: refugio.Foto_Perfil ?? '/Refugio/refugio1.jpeg'
    });
  } catch (error) {
    console.error('❌ Error al obtener datos del refugio:', error);
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}
