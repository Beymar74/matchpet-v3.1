import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function POST(request: Request) {
  try {
    const { idUsuario } = await request.json();

    const pool = await sql.connect(config);
    await pool.request()
      .input('ID', sql.Int, idUsuario)
      .query(`
        DELETE FROM Usuarios_Roles WHERE ID_Usuario = @ID;
        DELETE FROM Usuarios WHERE ID_Usuario = @ID;
      `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json({ success: false, error: 'Error al eliminar usuario' }, { status: 500 });
  }
}
