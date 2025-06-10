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

export async function POST(request: Request) {
  const data = await request.json()
  const {
    idMascota,
    vacunas,
    tipoCirugia,
    fechaCirugia,
    fechaDesparasitacion
  } = data

  try {
    await sql.connect(config)

    // 1. Insertar vacunas seleccionadas
    for (const nombreVacuna of vacunas || []) {
      await sql.query`
        INSERT INTO Vacunas_Mascotas (ID_Mascota, Nombre_Vacuna)
        VALUES (${idMascota}, ${nombreVacuna})
      `
    }

    // 2. Insertar cirugía si hay datos
    if (tipoCirugia && fechaCirugia) {
      await sql.query`
        INSERT INTO Cirugias_Mascotas (ID_Mascota, Tipo_Cirugia, Fecha_Cirugia)
        VALUES (${idMascota}, ${tipoCirugia}, ${fechaCirugia})
      `
    }

    // 3. Insertar desparasitación si hay fecha
    if (fechaDesparasitacion) {
      await sql.query`
        INSERT INTO Desparasitaciones_Mascotas (ID_Mascota, Fecha_Desparasitacion)
        VALUES (${idMascota}, ${fechaDesparasitacion})
      `
    }

    return NextResponse.json({ mensaje: 'Ficha médica registrada correctamente' })
  } catch (error) {
    console.error('❌ Error en /api/ficha-medica:', error)
    return NextResponse.json(
      { error: 'Error al registrar ficha médica', detalle: (error as Error).message },
      { status: 500 }
    )
  }
}
