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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Correo no proporcionado' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .input('email', sql.NVarChar, email.trim().toLowerCase())
      .query(`
        SELECT id, correo 
        FROM usuarios 
        WHERE correo = @email
      `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ success: false, message: 'Correo no encontrado' }, { status: 404 });
    }

    const usuario = result.recordset[0];

    return NextResponse.json({
      success: true,
      userId: usuario.id,
      correo: usuario.correo
    });
  } catch (error) {
    console.error('Error verificando email:', error);
    return NextResponse.json({ success: false, message: 'Error al verificar correo' }, { status: 500 });
  }
}
