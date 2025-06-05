import { connectToDb, sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    await connectToDb()

    const { searchParams } = new URL(request.url)
    const edad = searchParams.get('edad')
    const especie = searchParams.get('especie')
    const tamaño = searchParams.get('tamaño')
    const estado = searchParams.get('estado')

    // Construcción dinámica de filtros
    const condiciones: string[] = []
    const valores: any[] = []

    if (edad) {
      if (edad === 'cachorro') {
        condiciones.push('edad <= 1')
      } else if (edad === 'adulto') {
        condiciones.push('edad > 1 AND edad <= 7')
      } else if (edad === 'anciano') {
        condiciones.push('edad > 7')
      }
    }

    if (especie) {
      condiciones.push('LOWER(especie) = LOWER($' + (valores.length + 1) + ')')
      valores.push(especie)
    }

    if (tamaño) {
      condiciones.push('LOWER(tamaño) = LOWER($' + (valores.length + 1) + ')')
      valores.push(tamaño)
    }

    if (estado) {
      condiciones.push('LOWER(estado_adopcion) = LOWER($' + (valores.length + 1) + ')')
      valores.push(estado)
    }

    const whereClause = condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : ''

    const query = `
      SELECT id_mascota, nombre, especie, raza, edad, estado_adopcion, descripcion, foto_url
      FROM Mascota
      ${whereClause}
    `

    const result = await sql.unsafe(query, valores)
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error al aplicar filtros:', error)
    return NextResponse.json({ error: 'Error al consultar mascotas filtradas' }, { status: 500 })
  }
}
