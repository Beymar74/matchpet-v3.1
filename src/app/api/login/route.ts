import { NextResponse } from 'next/server';
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

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // conectar a la base de datos
    await sql.connect(config);

    // consulta para validar el usuario
    const result = await sql.query`
      SELECT * FROM Usuarios 
      WHERE Correo = ${email} AND Contrasena = ${password}
    `;

    if (result.recordset.length > 0) {
      const usuario = result.recordset[0];
      return NextResponse.json({ success: true, usuario });
    } else {
      return NextResponse.json({ success: false, error: 'Credenciales inválidas' }, { status: 401 });
    }

  } catch (error) {
    console.error('Error en conexión SQL:', error);
    return NextResponse.json({ success: false, error: 'Error de conexión o servidor SQL' }, { status: 500 });
  }
}
