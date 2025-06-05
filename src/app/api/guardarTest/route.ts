import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true },
};

export async function POST(request: Request) {
  try {
    const { id_usuario, respuestas } = await request.json();
    const pool = await sql.connect(config);

    await pool.request()
      .input('ID_Usuario', sql.Int, id_usuario)
      .input('Respuestas', sql.NVarChar(sql.MAX), respuestas)
      .input('Fecha_Registro', sql.DateTime, new Date())
      .query(`
        INSERT INTO Test_Compatibilidad (ID_Usuario, Respuestas, Fecha_Registro)
        VALUES (@ID_Usuario, @Respuestas, @Fecha_Registro)
      `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al guardar test:', error);
    return NextResponse.json({ success: false, error: 'Error al guardar test' }, { status: 500 });
  }
}
