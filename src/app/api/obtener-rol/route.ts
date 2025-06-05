// app/api/obtener-rol/route.ts
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
  },
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const idUsuario = searchParams.get('idUsuario')

  if (!idUsuario) {
    return NextResponse.json({ error: 'Falta el parámetro idUsuario' }, { status: 400 })
  }

  try {
    await sql.connect(config)

    const result = await sql.query(`
      SELECT 
        u.ID_Usuario,
        u.Nombre AS NombreUsuario,
        u.Foto_Perfil,
        r.NombreRol
      FROM Usuarios u
      JOIN Usuarios_Roles ur ON u.ID_Usuario = ur.ID_Usuario
      JOIN Roles r ON ur.ID_Rol = r.ID_Rol
      WHERE u.ID_Usuario = ${idUsuario}
    `)

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const usuario = result.recordset[0]

    return NextResponse.json({
      rol: usuario.NombreRol,
      nombre: usuario.NombreUsuario,
      foto: usuario.Foto_Perfil ?? '/Perfil/Usuario1.jpeg',
    })
  } catch (error) {
    console.error('Error SQL:', error)
    return NextResponse.json({ error: 'Error en la base de datos', detalle: error }, { status: 500 })
  }
}
