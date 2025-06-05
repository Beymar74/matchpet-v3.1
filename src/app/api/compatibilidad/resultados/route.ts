import { NextResponse } from 'next/server';
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idUsuario = searchParams.get('idUsuario');

    if (!idUsuario) {
      return NextResponse.json({ success: false, error: 'ID de usuario faltante' }, { status: 400 });
    }

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('IDUsuario', sql.Int, parseInt(idUsuario))
      .query(`
        SELECT TOP 1 Respuestas, Fecha_Registro 
        FROM Test_Compatibilidad 
        WHERE ID_Usuario = @IDUsuario 
        ORDER BY Fecha_Registro DESC
      `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ success: false, error: 'Sin respuestas encontradas' });
    }

    const fila = result.recordset[0];

    return NextResponse.json({
      success: true,
      respuestas: JSON.parse(fila.Respuestas),
      fecha: fila.Fecha_Registro
    });
  } catch (error) {
    console.error('Error al obtener respuestas:', error);
    return NextResponse.json({ success: false, error: 'Error al recuperar resultados' }, { status: 500 });
  }
}
