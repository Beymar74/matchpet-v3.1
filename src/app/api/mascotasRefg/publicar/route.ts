import { NextResponse } from 'next/server'
import sql from 'mssql'

// Configuración de conexión
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
    nombre,
    especie,
    raza,
    edad,
    estado,
    tamano,
    foto,
  } = data

  try {
    await sql.connect(config)

    // 1. Insertar en Mascotas
    const result = await sql.query`
      INSERT INTO Mascotas (Nombre, Edad, Raza)
      OUTPUT INSERTED.ID_Mascota
      VALUES (${nombre}, ${edad}, ${raza})
    `
    const idMascota = result.recordset[0].ID_Mascota

    // 2. Insertar relación con especie
    const especieRes = await sql.query`
      SELECT ID_Especie FROM Especies WHERE Nombre_Especie = ${especie}
    `
    if (especieRes.recordset.length > 0) {
      const idEspecie = especieRes.recordset[0].ID_Especie
      await sql.query`
        INSERT INTO Mascotas_Especies (ID_Mascota, ID_Especie)
        VALUES (${idMascota}, ${idEspecie})
      `
    }

    // 3. Insertar relación con estado
    const estadoRes = await sql.query`
      SELECT ID_Estado FROM Estados_Mascota WHERE Nombre_Estado = ${estado}
    `
    if (estadoRes.recordset.length > 0) {
      const idEstado = estadoRes.recordset[0].ID_Estado
      await sql.query`
        UPDATE Mascotas
        SET ID_Estado = ${idEstado}
        WHERE ID_Mascota = ${idMascota}
      `
    }

    // 4. Insertar relación con tamaño
    const tamanioRes = await sql.query`
      SELECT ID_Tamanio FROM Tamanios WHERE Nombre_Tamanio = ${tamano}
    `
    if (tamanioRes.recordset.length > 0) {
      const idTamanio = tamanioRes.recordset[0].ID_Tamanio
      await sql.query`
        INSERT INTO Mascotas_Tamanios (ID_Mascota, ID_Tamanio)
        VALUES (${idMascota}, ${idTamanio})
      `
    }

    // 5. Insertar foto (si se subió)
    if (foto) {
      await sql.query`
        INSERT INTO Fotos_Mascotas (ID_Mascota, URL_Foto)
        VALUES (${idMascota}, ${foto})
      `
    }

    return NextResponse.json({ mensaje: 'Mascota registrada', id: idMascota })
  } catch (error) {
    console.error('❌ Error en API /api/mascotas:', error)
    return NextResponse.json(
      { error: 'Error al registrar mascota', detalle: (error as Error).message },
      { status: 500 }
    )
  }
}
