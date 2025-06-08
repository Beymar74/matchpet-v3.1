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
    const { userId, nuevaContrasena } = await request.json();

    if (!userId || !nuevaContrasena) {
      return NextResponse.json({ success: false, message: 'Datos incompletos' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    await pool
      .request()
      .input('userId', sql.Int, userId)
      .input('contrasena', sql.NVarChar, nuevaContrasena) // Se guarda en texto plano
      .query(`
        UPDATE Usuario
        SET contrasena = @contrasena
        WHERE id_usuario = @userId
      `);

    return NextResponse.json({ success: true, message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return NextResponse.json({ success: false, message: 'Error interno del servidor' }, { status: 500 });
  }
}
