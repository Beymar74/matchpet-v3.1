import { NextRequest, NextResponse } from 'next/server'
import sql from 'mssql'

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true,
  },
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params

  try {
    await sql.connect(config)

    // 1. Marcar mascota como Borrador
    await sql.query`
      UPDATE Mascota
      SET estado_adopcion = 'Borrador'
      WHERE id_mascota = ${id}
    `

    // 2. Registrar el cambio en Historial_Cambios
    const descripcionCambio = `Mascota con ID ${id} marcada como "Borrador"`
    const responsable = 'refugio_1' // puedes cambiar esto según usuario autenticado

    await sql.query`
      INSERT INTO Historial_Cambios (fecha_cambio, descripcion_cambio, responsable)
      VALUES (GETDATE(), ${descripcionCambio}, ${responsable})
    `

    return NextResponse.json({ message: 'Mascota marcada como borrador y registrada en historial' }, { status: 200 })

  } catch (error) {
    console.error('Error al marcar como borrador:', error)
    return NextResponse.json({ error: 'Error al actualizar mascota' }, { status: 500 })
  }
}

