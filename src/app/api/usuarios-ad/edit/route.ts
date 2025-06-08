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
    const { idUsuario, nombre, correo, telefono, contrasena, fotoPerfil } = await request.json();
    const pool = await sql.connect(config);
    const requestSQL = pool.request().input('ID', sql.Int, idUsuario);
    const updates: string[] = [];

    if (nombre) {
      requestSQL.input('Nombre', sql.NVarChar, nombre);
      updates.push('Nombre = @Nombre');
    }
    if (correo) {
      requestSQL.input('Correo', sql.NVarChar, correo);
      updates.push('Correo = @Correo');
    }
    if (telefono) {
      requestSQL.input('Telefono', sql.NVarChar, telefono);
      updates.push('Telefono = @Telefono');
    }
    if (contrasena) {
      requestSQL.input('Contrasena', sql.NVarChar, contrasena);
      updates.push('Contrasena = @Contrasena');
    }
    if (fotoPerfil) {
      requestSQL.input('Foto_Perfil', sql.NVarChar, fotoPerfil);
      updates.push('Foto_Perfil = @Foto_Perfil');
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: 'Nada para actualizar' }, { status: 400 });
    }

    await requestSQL.query(`UPDATE Usuarios SET ${updates.join(', ')} WHERE ID_Usuario = @ID`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al editar usuario' }, { status: 500 });
  }
}
