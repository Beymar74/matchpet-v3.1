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
    const { idUsuario, nombre, correo, telefono, contrasena, fotoPerfil, rol } = await request.json();
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

    if (updates.length > 0) {
      await requestSQL.query(`UPDATE Usuarios SET ${updates.join(', ')} WHERE ID_Usuario = @ID`);
    }

    // ✅ Actualizar rol si viene incluido
    if (rol) {
      const resultRol = await pool
        .request()
        .input('NombreRol', sql.NVarChar, rol)
        .query(`SELECT ID_Rol FROM Roles WHERE NombreRol = @NombreRol`);

      if (resultRol.recordset.length === 0) {
        return NextResponse.json({ success: false, error: 'Rol no válido' }, { status: 400 });
      }

      const idRol = resultRol.recordset[0].ID_Rol;

      // Verificar si ya tiene un rol asignado
      const rolExistente = await pool
        .request()
        .input('ID_Usuario', sql.Int, idUsuario)
        .query(`SELECT * FROM Usuarios_Roles WHERE ID_Usuario = @ID_Usuario`);

      if (rolExistente.recordset.length > 0) {
        // Actualizar rol existente
        await pool
          .request()
          .input('ID_Usuario', sql.Int, idUsuario)
          .input('ID_Rol', sql.Int, idRol)
          .query(`UPDATE Usuarios_Roles SET ID_Rol = @ID_Rol WHERE ID_Usuario = @ID_Usuario`);
      } else {
        // Insertar nuevo rol
        await pool
          .request()
          .input('ID_Usuario', sql.Int, idUsuario)
          .input('ID_Rol', sql.Int, idRol)
          .query(`INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol) VALUES (@ID_Usuario, @ID_Rol)`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al editar usuario' }, { status: 500 });
  }
}
