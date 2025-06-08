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

// Función para normalizar las respuestas
function normalize(answer: string): string {
  return answer.toLowerCase().trim().replace(/\s+/g, ' ');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, respuesta1, respuesta2, respuesta3 } = body;

    if (!userId || !respuesta1 || !respuesta2 || !respuesta3) {
      return NextResponse.json({ success: false, message: 'Faltan datos' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    await pool
      .request()
      .input('userId', sql.Int, userId)
      .input('pregunta1', sql.NVarChar, normalize(respuesta1))
      .input('pregunta2', sql.NVarChar, normalize(respuesta2))
      .input('pregunta3', sql.NVarChar, normalize(respuesta3))
      .query(`
        INSERT INTO user_security_answers_simple (user_id, pregunta1, pregunta2, pregunta3)
        VALUES (@userId, @pregunta1, @pregunta2, @pregunta3)
      `);

    return NextResponse.json({ success: true, message: 'Preguntas guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar preguntas:', error);
    return NextResponse.json({ success: false, message: 'Error al guardar en la base de datos' }, { status: 500 });
  }
}
