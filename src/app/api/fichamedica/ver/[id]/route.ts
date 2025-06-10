import { NextResponse } from 'next/server';
import sql from 'mssql';

// Configuración de conexión a Azure SQL Server
const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true, // obligatorio para Azure
    trustServerCertificate: false,
  },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idMascota = searchParams.get('id');

  if (!idMascota) {
    return NextResponse.json({ error: 'ID de mascota requerido' }, { status: 400 });
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('idMascota', sql.Int, parseInt(idMascota))
      .query(`
        SELECT 
          ID_Mascota,
          Vacunas,
          Alergias,
          Enfermedades,
          Esterilizado,
          Notas
        FROM Fichas_Medicas
        WHERE ID_Mascota = @idMascota
      `);

    if (result.recordset.length === 0) {
      return NextResponse.json(null); // No hay ficha
    }

    return NextResponse.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error al obtener ficha médica:', error);
    return NextResponse.json({ error: 'Error al conectar o consultar' }, { status: 500 });
  } finally {
    sql.close();
  }
}
