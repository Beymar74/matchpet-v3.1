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
    const { nombre, correo, fotoPerfil } = await request.json();

    if (!nombre || !correo) {
      return NextResponse.json({ success: false, error: 'Faltan datos' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    // 1. Verificar si ya existe un usuario con ese correo
    const existe = await pool.request()
      .input('Correo', sql.NVarChar, correo)
      .query(`SELECT ID_Usuario FROM Usuarios WHERE Correo = @Correo`);

    let idUsuario: number;

    if (existe.recordset.length > 0) {
      // Ya está registrado
      idUsuario = existe.recordset[0].ID_Usuario;
    } else {
      // 2. Insertar nuevo usuario sin contraseña
      const result = await pool.request()
        .input('Nombre', sql.NVarChar, nombre)
        .input('Correo', sql.NVarChar, correo)
        .input('Contrasena', sql.NVarChar, '') // contraseña vacía
        .input('FotoPerfil', sql.NVarChar, fotoPerfil || '')
        .query(`
          INSERT INTO Usuarios (Nombre, Correo, Contrasena, Foto_Perfil, Fecha_Registro)
          OUTPUT INSERTED.ID_Usuario
          VALUES (@Nombre, @Correo, @Contrasena, @FotoPerfil, GETDATE())
        `);

      idUsuario = result.recordset[0].ID_Usuario;
    }

    // 3. Obtener el ID del rol "Adoptante"
    const rolResult = await pool.request()
      .input('NombreRol', sql.NVarChar, 'Adoptante')
      .query('SELECT ID_Rol FROM Roles WHERE NombreRol = @NombreRol');

    const idRol = rolResult.recordset[0]?.ID_Rol;

    // 4. Insertar en Usuarios_Roles si no existe
    if (idRol) {
      await pool.request()
        .input('ID_Usuario', sql.Int, idUsuario)
        .input('ID_Rol', sql.Int, idRol)
        .query(`
          IF NOT EXISTS (
            SELECT * FROM Usuarios_Roles 
            WHERE ID_Usuario = @ID_Usuario AND ID_Rol = @ID_Rol
          )
          INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol) 
          VALUES (@ID_Usuario, @ID_Rol)
        `);
    }

    return NextResponse.json({ success: true, idUsuario });

  } catch (error) {
    console.error('Error en registroGoogle:', error);
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}
