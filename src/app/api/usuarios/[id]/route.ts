import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const idUsuario = parseInt(params.id);
    if (isNaN(idUsuario)) {
      return NextResponse.json({ success: false, error: 'ID inválido' }, { status: 400 });
    }

    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('ID_Usuario', sql.Int, idUsuario)
      .query(`
        SELECT Nombre, Correo, Telefono, Foto_Perfil
        FROM Usuarios
        WHERE ID_Usuario = @ID_Usuario
      `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, usuario: result.recordset[0] });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
