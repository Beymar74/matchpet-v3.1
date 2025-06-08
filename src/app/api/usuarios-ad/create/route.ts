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
    const { nombre, correo, telefono, contrasena, fotoPerfil, rol } = await request.json();

    if (!nombre || !correo || !contrasena || !rol) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    // Insertar usuario y obtener ID
    const result = await pool.request()
      .input('Nombre', sql.NVarChar, nombre)
      .input('Correo', sql.NVarChar, correo)
      .input('Telefono', sql.NVarChar, telefono || '')
      .input('Contrasena', sql.NVarChar, contrasena)
      .input('Foto_Perfil', sql.NVarChar, fotoPerfil || '')
      .query(`
        INSERT INTO Usuarios (Nombre, Correo, Telefono, Contrasena, Foto_Perfil, Fecha_Registro)
        OUTPUT INSERTED.ID_Usuario
        VALUES (@Nombre, @Correo, @Telefono, @Contrasena, @Foto_Perfil, GETDATE())
      `);

    const nuevoID = result.recordset[0].ID_Usuario;

    // Obtener ID del rol
    const rolResult = await pool.request()
      .input('NombreRol', sql.NVarChar, rol)
      .query(`SELECT ID_Rol FROM Roles WHERE NombreRol = @NombreRol`);

    if (rolResult.recordset.length === 0) {
      return NextResponse.json({ success: false, error: 'Rol no válido' }, { status: 400 });
    }

    const idRol = rolResult.recordset[0].ID_Rol;

    // Insertar relación en Usuarios_Roles
    await pool.request()
      .input('IDUsuario', sql.Int, nuevoID)
      .input('IDRol', sql.Int, idRol)
      .query(`INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol) VALUES (@IDUsuario, @IDRol)`);

    return NextResponse.json({ success: true, idUsuario: nuevoID });
  } catch (err) {
    console.error('Error en el registro:', err);
    return NextResponse.json({ success: false, error: 'Error al crear usuario' }, { status: 500 });
  }
}
