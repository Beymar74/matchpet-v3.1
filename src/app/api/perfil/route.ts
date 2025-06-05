// app/api/perfil/route.ts
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

export async function POST(request: Request) {
  try {
    const { idUsuario } = await request.json()
    await sql.connect(config)

    const result = await sql.query`
      SELECT u.Nombre, u.Correo, u.Telefono, u.FechaRegistro, r.NombreRol, p.foto_per
      FROM Usuario u
      JOIN User_roles ur ON u.id_user = ur.id_user
      JOIN Rol r ON ur.id_rol = r.id_rol
      LEFT JOIN Perfil p ON u.id_user = p.id_user
      WHERE u.id_user = ${idUsuario}
    `

    if (result.recordset.length > 0) {
      return NextResponse.json({ success: true, data: result.recordset[0] })
    } else {
      return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error al obtener perfil:', error)
    return NextResponse.json({ success: false, error: 'Error de servidor' }, { status: 500 })
  }
}
