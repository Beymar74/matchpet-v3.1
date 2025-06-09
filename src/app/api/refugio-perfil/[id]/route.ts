import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true
  }
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT 
        Nombre AS nombre,
        Correo AS correo,
        Fecha_Registro AS fechaRegistro,
        Telefono AS telefono,
        Foto_Perfil AS fotoPerfil
      FROM Usuarios
      WHERE ID_Usuario = ${id}
    `;

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0]);
  } catch (error) {
    console.error('Error SQL:', error);
    return NextResponse.json({ error: 'Error al cargar datos' }, { status: 500 });
  }
}
