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
    const {
      idUsuario,
      nombre,
      correo,
      telefono,
      contrasena,
      fotoPerfil
    } = await request.json();

    if (!idUsuario) {
      return NextResponse.json({ success: false, error: 'ID de usuario requerido' }, { status: 400 });
    }

    const pool = await sql.connect(config);
    const requestSQL = pool.request().input('ID', sql.Int, idUsuario);

    let updateQuery = 'UPDATE Usuarios SET ';
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
      requestSQL.input('FotoPerfil', sql.NVarChar, fotoPerfil);
      updates.push('Foto_Perfil = @FotoPerfil');
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: false, error: 'No hay campos para actualizar' }, { status: 400 });
    }

    updateQuery += updates.join(', ') + ' WHERE ID_Usuario = @ID';

    await requestSQL.query(updateQuery);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return NextResponse.json({ success: false, error: 'Error al actualizar perfil' }, { status: 500 });
  }
}
