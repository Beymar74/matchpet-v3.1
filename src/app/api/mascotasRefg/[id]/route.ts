export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const data = await request.json()

  try {
    await sql.connect(config)

    // Actualizar Mascotas
    await sql.query`
      UPDATE Mascotas
      SET 
        Nombre = ${data.Nombre},
        Edad = ${data.Edad},
        Raza = ${data.Raza},
        Descripcion = ${data.Descripcion ?? null}
      WHERE ID_Mascota = ${id}
    `

    // Actualizar Estado (si es necesario)
    if (data.Nombre_Estado) {
      const estado = await sql.query`SELECT ID_Estado FROM Estados_Mascota WHERE Nombre_Estado = ${data.Nombre_Estado}`
      if (estado.recordset[0]) {
        await sql.query`
          UPDATE Mascotas
          SET ID_Estado = ${estado.recordset[0].ID_Estado}
          WHERE ID_Mascota = ${id}
        `
      }
    }

    // Actualizar Especie
    if (data.Nombre_Especie) {
      const especie = await sql.query`SELECT ID_Especie FROM Especies WHERE Nombre_Especie = ${data.Nombre_Especie}`
      if (especie.recordset[0]) {
        await sql.query`
          UPDATE Mascotas_Especies
          SET ID_Especie = ${especie.recordset[0].ID_Especie}
          WHERE ID_Mascota = ${id}
        `
      }
    }

    // Actualizar Foto
    if (data.Foto) {
      await sql.query`
        UPDATE Fotos_Mascotas
        SET URL_Foto = ${data.Foto}
        WHERE ID_Mascota = ${id}
      `
    }

    return NextResponse.json({ mensaje: 'Mascota actualizada' })
  } catch (error) {
    console.error('❌ Error al actualizar mascota:', error)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
