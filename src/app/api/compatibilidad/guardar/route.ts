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
    const body = await request.json();
    const { idUsuario, respuestas } = body;

    const pool = await sql.connect(config);

    await pool.request()
      .input('ID_Usuario', sql.Int, idUsuario)
      .input('Tipo_Vivienda', sql.NVarChar, respuestas.vivienda || '')
      .input('Espacio_Exterior', sql.NVarChar, respuestas.espacio_exterior || '')
      .input('Horas_Fuera', sql.NVarChar, respuestas.horas_fuera || '')
      .input('Preferencia_Animal', sql.NVarChar, respuestas.preferencia_animal || '')
      .input('Experiencia', sql.NVarChar, respuestas.experiencia || '')
      .input('Personalidad_Ideal', sql.NVarChar, respuestas.personalidad_ideal || '')
      .input('Otras_Mascotas', sql.NVarChar, respuestas.otras_mascotas || '')
      .input('Alergias', sql.NVarChar, respuestas.alergias || '')
      .input('Tamano_Preferido', sql.NVarChar, respuestas.tamaño_preferido || '')
      .input('Edad_Preferida', sql.NVarChar, respuestas.edad_preferida || '')
      .input('Actividad_Fisica', sql.NVarChar, respuestas.actividad_fisica || '')
      .input('Motivacion', sql.NVarChar, respuestas.motivacion || '')
      .query(`
        INSERT INTO Test_Compatibilidad (
          ID_Usuario,
          Tipo_Vivienda,
          Espacio_Exterior,
          Horas_Fuera,
          Preferencia_Animal,
          Experiencia,
          Personalidad_Ideal,
          Otras_Mascotas,
          Alergias,
          Tamano_Preferido,
          Edad_Preferida,
          Actividad_Fisica,
          Motivacion
        )
        VALUES (
          @ID_Usuario,
          @Tipo_Vivienda,
          @Espacio_Exterior,
          @Horas_Fuera,
          @Preferencia_Animal,
          @Experiencia,
          @Personalidad_Ideal,
          @Otras_Mascotas,
          @Alergias,
          @Tamano_Preferido,
          @Edad_Preferida,
          @Actividad_Fisica,
          @Motivacion
        )
      `);

    return NextResponse.json({ success: true, message: 'Guardado exitoso' });
  } catch (error) {
    console.error('Error al guardar compatibilidad:', error);
    return NextResponse.json({ success: false, error: 'Error al guardar en la base de datos' }, { status: 500 });
  }
}
