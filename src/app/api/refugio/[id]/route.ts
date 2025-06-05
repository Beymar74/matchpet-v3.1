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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT Nombre, FotoPerfil 
      FROM Usuarios 
      WHERE ID_Usuario = ${params.id}
    `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Refugio no encontrado' }, { status: 404 });
    }

    const usuario = result.recordset[0];

    return NextResponse.json({
      nombre: usuario.Nombre,
      fotoPerfil: usuario.FotoPerfil ?? '/Refugio/refugio1.jpeg'
    });
  } catch (error) {
    console.error('Error al consultar el refugio:', error);
    return NextResponse.json({ error: 'Error al cargar datos' }, { status: 500 });
  }
}
