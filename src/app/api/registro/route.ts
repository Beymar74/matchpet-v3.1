import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true,
  },
};

export async function POST(request: Request) {
  try {
    const { nombre, correo, telefono, contrasena, fotoPerfilUrl } = await request.json();

    if (!nombre || !correo || !contrasena) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    await sql.connect(config);

    await sql.query`
      INSERT INTO Usuarios (Nombre, Correo, Telefono, Contrasena, Foto_Perfil, Fecha_Registro)
      VALUES (
        ${nombre},
        ${correo},
        ${telefono || ''},
        ${contrasena},
        ${fotoPerfilUrl || ''},
        GETDATE()
      )
    `;

    return NextResponse.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar:', error);
    return NextResponse.json({ success: false, error: 'Error en el registro' }, { status: 500 });
  }
}
