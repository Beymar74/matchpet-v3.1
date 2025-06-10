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

    const result = await sql.query(`
      SELECT 
        m.ID_Mascota AS idMascota,
        m.Nombre,
        e.Nombre_Especie AS especie,
        m.Edad,
        f.Vacunas,
        f.Esterilizado,
        f.Enfermedades,
        f.Alergias,
        f.Notas
      FROM Mascotas m
      LEFT JOIN Fichas_Medicas f ON m.ID_Mascota = f.ID_Mascota
      LEFT JOIN Mascotas_Especies me ON m.ID_Mascota = me.ID_Mascota
      LEFT JOIN Especies e ON me.ID_Especie = e.ID_Especie
    `)

    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error('Error al obtener fichas médicas:', error)
    return NextResponse.json({ error: 'Error al obtener fichas médicas' }, { status: 500 })
  } finally {
    sql.close()
  }
}
