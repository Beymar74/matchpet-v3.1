// app/api/obtener-id-refugio/route.ts
import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idUsuario = searchParams.get('idUsuario');

  if (!idUsuario) {
    return NextResponse.json({ success: false, error: 'Falta idUsuario' }, { status: 400 });
  }

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT ID_Refugio FROM Refugios WHERE ID_Usuario = ${idUsuario}
    `;

    if (result.recordset.length === 0) {
      return NextResponse.json({ success: false, error: 'No se encontró el refugio' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      idRefugio: result.recordset[0].ID_Refugio
    });
  } catch (error) {
    console.error('Error al buscar ID_Refugio:', error);
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}
