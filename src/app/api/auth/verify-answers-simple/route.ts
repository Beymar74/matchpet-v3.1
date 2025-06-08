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

// Función para normalizar respuestas
const normalize = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, ' ');

export async function POST(request: Request) {
  try {
    const { userId, respuesta1, respuesta2, respuesta3 } = await request.json();

    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .input('userId', sql.Int, userId)
      .query(`
        SELECT pregunta1, pregunta2, pregunta3
        FROM user_security_answers_simple
        WHERE user_id = @userId
      `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ success: false, message: 'No se encontraron preguntas para este usuario' }, { status: 404 });
    }

    const { pregunta1, pregunta2, pregunta3 } = result.recordset[0];

    const correctas =
      normalize(pregunta1) === normalize(respuesta1) &&
      normalize(pregunta2) === normalize(respuesta2) &&
      normalize(pregunta3) === normalize(respuesta3);

    return NextResponse.json({ success: correctas });
  } catch (error) {
    console.error('Error al verificar respuestas:', error);
    return NextResponse.json({ success: false, message: 'Error interno del servidor' }, { status: 500 });
  }
}
