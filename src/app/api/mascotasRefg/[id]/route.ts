import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await sql.connect(config);

    const result = await sql.query`
  SELECT 
    M.ID_Mascota,
    M.Nombre,
    M.Edad,
    M.Raza,
    FM.URL_Foto AS Foto,  -- ✅ Traer la foto correctamente
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
  LEFT JOIN Fotos_Mascotas FM ON M.ID_Mascota = FM.ID_Mascota -- ✅ Aquí está el JOIN correcto
`;


    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Mascota no encontrada' }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0]);
  } catch (error) {
    console.error('❌ Error en GET /api/mascotas/[id]:', error);
    return NextResponse.json(
      { error: 'Error interno al obtener la mascota', detalle: (error as Error).message },
      { status: 500 }
    );
  }
}
