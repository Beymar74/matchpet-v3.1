import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true },
};

// GET: Obtener perfil completo del refugio usando ID_Usuario
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const userId = parseInt(params.id);
      const body = await req.json();
      const { Nombre, Ubicacion, Contacto, Descripcion, Foto_Perfil, Email } = body;
  
      const pool = await sql.connect(config);
  
      // ✅ Actualiza tabla Refugios
      await pool.request()
        .input('ID_Usuario', sql.Int, userId)
        .input('Nombre', sql.NVarChar, Nombre)
        .input('Ubicacion', sql.NVarChar, Ubicacion)
        .input('Contacto', sql.NVarChar, Contacto)
        .input('Descripcion', sql.Text, Descripcion)
        .query(`
          UPDATE Refugios
          SET Nombre = @Nombre,
              Ubicacion = @Ubicacion,
              Contacto = @Contacto,
              Descripcion = @Descripcion
          WHERE ID_Usuario = @ID_Usuario
        `);
  
      // ✅ Actualiza tabla Usuarios
      const userUpdate = pool.request().input('ID_Usuario', sql.Int, userId);
  
      if (Nombre) userUpdate.input('Nombre', sql.NVarChar, Nombre);
      if (Ubicacion) userUpdate.input('Ubicacion', sql.NVarChar, Ubicacion);
      if (Contacto) userUpdate.input('Contacto', sql.NVarChar, Contacto);
      if (Descripcion) userUpdate.input('Descripcion', sql.Text, Descripcion);
      if (Foto_Perfil) userUpdate.input('Foto_Perfil', sql.VarChar, Foto_Perfil);
      if (Email) userUpdate.input('Email', sql.NVarChar, Email);
  
      await userUpdate.query(`
        UPDATE Usuarios
        SET 
          ${Nombre ? 'Nombre = @Nombre,' : ''}
          ${Ubicacion ? 'Ubicacion = @Ubicacion,' : ''}
          ${Contacto ? 'Contacto = @Contacto,' : ''}
          ${Descripcion ? 'Descripcion = @Descripcion,' : ''}
          ${Email ? 'Correo = @Email,' : ''}
          ${Foto_Perfil ? 'Foto_Perfil = @Foto_Perfil,' : ''}
          Fecha_Registro = Fecha_Registro -- para evitar coma final
        WHERE ID_Usuario = @ID_Usuario
      `);
  
      return NextResponse.json({ success: true, message: 'Perfil actualizado correctamente' });
    } catch (error: any) {
      return NextResponse.json({ error: 'Error al actualizar perfil', detalle: error.message }, { status: 500 });
    }
  }
  