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

export async function POST(request: Request) {
  try {
    const { nombre, correo, telefono, contrasena, fotoPerfilUrl, rol } = await request.json();

    if (!nombre || !correo || !contrasena || !rol) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    // Paso 1: Insertar usuario
    const result = await pool.request()
      .input('Nombre', sql.NVarChar, nombre)
      .input('Correo', sql.NVarChar, correo)
      .input('Telefono', sql.NVarChar, telefono || '')
      .input('Contrasena', sql.NVarChar, contrasena)
      .input('FotoPerfil', sql.NVarChar, fotoPerfilUrl || '')
      .query(`
        INSERT INTO Usuarios (Nombre, Correo, Telefono, Contrasena, Foto_Perfil, Fecha_Registro)
        OUTPUT INSERTED.ID_Usuario
        VALUES (@Nombre, @Correo, @Telefono, @Contrasena, @FotoPerfil, GETDATE())
      `);

    const nuevoID = result.recordset[0].ID_Usuario;

    // Paso 2: Obtener ID del rol
    const rolResult = await pool.request()
      .input('NombreRol', sql.NVarChar, rol)
      .query(`SELECT ID_Rol FROM Roles WHERE NombreRol = @NombreRol`);

    if (rolResult.recordset.length === 0) {
      return NextResponse.json({ success: false, error: 'Rol no válido' }, { status: 400 });
    }

    const idRol = rolResult.recordset[0].ID_Rol;

    // Paso 3: Insertar en Usuarios_Roles
    await pool.request()
      .input('IDUsuario', sql.Int, nuevoID)
      .input('IDRol', sql.Int, idRol)
      .query(`INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol) VALUES (@IDUsuario, @IDRol)`);

    return NextResponse.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar:', error);
    return NextResponse.json({ success: false, error: 'Error en el registro' }, { status: 500 });
  }
}
