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

    const resultado = await sql.query(`
      SELECT 
        M.ID_Mascota AS idMascota,
        M.Nombre,
        E.Nombre_Especie AS especie,
        M.Edad,
        ISNULL(V.Vacunas, '') AS vacunas,
        C.Tipo_Cirugia,
        FORMAT(C.Fecha_Cirugia, 'yyyy-MM-dd') AS fechaCirugia,
        FORMAT(D.Fecha_Desparasitacion, 'yyyy-MM-dd') AS fechaDesparasitacion
      FROM Mascotas M
      LEFT JOIN Mascotas_Especies ME ON M.ID_Mascota = ME.ID_Mascota
      LEFT JOIN Especies E ON ME.ID_Especie = E.ID_Especie
      LEFT JOIN (
        SELECT ID_Mascota, STRING_AGG(Nombre_Vacuna, ', ') AS Vacunas
        FROM Vacunas_Mascotas GROUP BY ID_Mascota
      ) V ON V.ID_Mascota = M.ID_Mascota
      LEFT JOIN Cirugias_Mascotas C ON C.ID_Mascota = M.ID_Mascota
      LEFT JOIN Desparasitaciones_Mascotas D ON D.ID_Mascota = M.ID_Mascota
    `)

    return NextResponse.json(resultado.recordset)
  } catch (error) {
    console.error('❌ Error al obtener fichas médicas:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
