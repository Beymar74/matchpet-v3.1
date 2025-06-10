import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true
  }
};

export async function PUT(req: NextRequest) {
  try {
    const { email, nuevaContrasena } = await req.json();

    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('Correo', sql.NVarChar, email)
      .input('Contrasena', sql.NVarChar, nuevaContrasena)
      .query(`
        UPDATE Usuarios
        SET Contrasena = @Contrasena
        WHERE Correo = @Correo
      `);

    if (result.rowsAffected[0] > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Correo no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 });
  }
}
