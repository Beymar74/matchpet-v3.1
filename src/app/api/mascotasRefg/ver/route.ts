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
	M.Foto,
	R.Nombre AS NombreRefugio,
	E.Nombre_Estado AS Nombre_Estado,
	ES.Nombre_Especie,
	T.Nombre_Tamanio,
	C.Nombre_Color
  FROM Mascotas M
  LEFT JOIN Refugios R ON M.ID_Refugio = R.ID_Refugio
  LEFT JOIN Estados_Mascota E ON M.ID_Estado = E.ID_Estado
  LEFT JOIN Mascotas_Especies ME ON M.ID_Mascota = ME.ID_Mascota
  LEFT JOIN Especies ES ON ME.ID_Especie = ES.ID_Especie
  LEFT JOIN Mascotas_Tamanios MT ON M.ID_Mascota = MT.ID_Mascota
  LEFT JOIN Tamanios T ON MT.ID_Tamanio = T.ID_Tamanio
  LEFT JOIN Mascotas_Colores MC ON M.ID_Mascota = MC.ID_Mascota
  LEFT JOIN Colores C ON MC.ID_Color = C.ID_Color
`;

	return NextResponse.json(result.recordset);
  } catch (error) {
	console.error('❌ Error en API /api/mascotas/ver:', error);
	return NextResponse.json(
	  { error: 'Error interno en la consulta', detalle: (error as Error).message },
	  { status: 500 }
	);
  }
}
