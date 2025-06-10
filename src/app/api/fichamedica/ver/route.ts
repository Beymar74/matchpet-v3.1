import { NextResponse } from 'next/server'
import sql from 'mssql'

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
}

export async function GET() {
  try {
    await sql.connect(config)

    // 1. Obtener datos de todas las mascotas con ficha médica
    const mascotasResult = await sql.query(`
      SELECT 
        M.ID_Mascota,
        M.Nombre,
        M.Edad,
        E.Nombre_Especie,
        FM.Esterilizado,
        FM.Notas
      FROM Mascotas M
      INNER JOIN Mascotas_Especies ME ON M.ID_Mascota = ME.ID_Mascota
      INNER JOIN Especies E ON ME.ID_Especie = E.ID_Especie
      LEFT JOIN Ficha_Medica_Mascotas FM ON M.ID_Mascota = FM.ID_Mascota
    `)

    const fichas = await Promise.all(
      mascotasResult.recordset.map(async (m) => {
        const vacunas = await sql.query`
          SELECT Nombre_Vacuna FROM Vacunas_Mascotas WHERE ID_Mascota = ${m.ID_Mascota}
        `
        const enfermedades = await sql.query`
          SELECT Nombre_Enfermedad FROM Enfermedades_Mascotas WHERE ID_Mascota = ${m.ID_Mascota}
        `

        return {
          idMascota: m.ID_Mascota,
          nombre: m.Nombre,
          especie: m.Nombre_Especie,
          edad: `${m.Edad} años`,
          esterilizado: m.Esterilizado ? 'Sí' : 'No',
          notas: m.Notas ?? '',
          vacunas: vacunas.recordset.map(v => v.Nombre_Vacuna).join(', ') || 'Ninguna',
          enfermedades: enfermedades.recordset.map(e => e.Nombre_Enfermedad).join(', ') || 'Ninguna',
        }
      })
    )

    return NextResponse.json(fichas)
  } catch (error) {
    console.error('❌ Error al obtener fichas médicas:', error)
    return NextResponse.json(
      { error: 'Error al obtener las fichas médicas', detalle: (error as Error).message },
      { status: 500 }
    )
  }
}
