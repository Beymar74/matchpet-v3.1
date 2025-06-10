// /app/api/solicitudes/route.ts
import { NextResponse } from 'next/server';
import sql from 'mssql';

export const runtime = 'nodejs';               // forzar entorno Node.js
export const dynamic = 'force-dynamic';        // evitar caché estática

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function GET() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT 
        s.ID_Solicitud AS id,
        m.Nombre AS petName,
        CONVERT(varchar, s.Fecha_Solicitud, 23) AS requestDate,
        s.Estado AS status
      FROM Solicitudes_Adopcion s
      INNER JOIN Mascotas m ON s.ID_Mascota = m.ID_Mascota
    `);        
    return Response.json(result.recordset);
  } catch (err) {
    console.error('❌ Error obteniendo solicitudes:', err);
    return NextResponse.json([], { status: 500 });
  }
}
