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

export async function GET() {
  try {
    await sql.connect(config);

    const result = await sql.query`
  SELECT 
    M.ID_Mascota,
    M.Nombre,
    M.Edad,
    M.Raza,
    M.ID_Refugio,
    M.ID_Estado,
    R.Nombre AS NombreRefugio
  FROM Mascotas M
  LEFT JOIN Refugios R ON M.ID_Refugio = R.ID_Refugio
  -- LEFT JOIN Estados E ON M.ID_Estado = E.ID_Estado
`;


    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('❌ Error en API /api/mascotasAdmin/ver:', error);
    return NextResponse.json(
      { error: 'Error interno en la consulta', detalle: (error as Error).message },
      { status: 500 }
    );
  }
}
