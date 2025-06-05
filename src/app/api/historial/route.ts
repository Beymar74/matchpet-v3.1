import { NextResponse } from 'next/server'
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

export async function GET() {
  try {
    await sql.connect(config)

    const result = await sql.query(`
      SELECT fecha_cambio, descripcion_cambio, responsable
      FROM Historial_Cambios
      ORDER BY fecha_cambio DESC
    `)

    return NextResponse.json(result.recordset, { status: 200 })

  } catch (error) {
    console.error('Error al obtener historial:', error)
    return NextResponse.json({ error: 'Error al obtener historial de cambios' }, { status: 500 })
  }
}
