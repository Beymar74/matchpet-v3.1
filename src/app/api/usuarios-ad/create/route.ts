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
    const { nombre, correo, telefono, contrasena, fotoPerfil } = await request.json();
    const pool = await sql.connect(config);
    await pool.request()
      .input('Nombre', sql.NVarChar, nombre)
      .input('Correo', sql.NVarChar, correo)
      .input('Telefono', sql.NVarChar, telefono)
      .input('Contrasena', sql.NVarChar, contrasena)
      .input('Foto_Perfil', sql.NVarChar, fotoPerfil || '')
      .query(`
        INSERT INTO Usuarios (Nombre, Correo, Telefono, Contrasena, Foto_Perfil, Fecha_Registro)
        VALUES (@Nombre, @Correo, @Telefono, @Contrasena, @Foto_Perfil, GETDATE())
      `);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
  }
}
