import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function GET() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT u.ID_Usuario, u.Nombre, u.Correo, u.Telefono, u.Fecha_Registro, u.Foto_Perfil, r.NombreRol
      FROM Usuarios u
      LEFT JOIN Usuarios_Roles ur ON u.ID_Usuario = ur.ID_Usuario
      LEFT JOIN Roles r ON ur.ID_Rol = r.ID_Rol
    `);
    return NextResponse.json(result.recordset);
  } catch (err) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}
