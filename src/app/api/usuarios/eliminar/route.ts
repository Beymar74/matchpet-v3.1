// src/app/api/usuarios/eliminar/route.ts
import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function DELETE(request: Request) {
  try {
    const { idUsuario } = await request.json();
    
    if (!idUsuario) {
      return NextResponse.json({ success: false, error: 'ID de usuario requerido' }, { status: 400 });
    }

    const pool = await sql.connect(config);
    
    // Eliminar en orden correcto para evitar violaciones de clave foránea
    
    // 1. Eliminar roles del usuario
    await pool.request()
      .input('ID', sql.Int, idUsuario)
      .query(`DELETE FROM Usuarios_Roles WHERE ID_Usuario = @ID`);
    
    // 2. Aquí puedes agregar más eliminaciones si hay otras tablas relacionadas
    // Por ejemplo: adopciones, mensajes, etc.
    
    // 3. Finalmente eliminar el usuario
    const result = await pool.request()
      .input('ID', sql.Int, idUsuario)
      .query(`DELETE FROM Usuarios WHERE ID_Usuario = @ID`);

    await pool.close();

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json({ success: false, error: 'Error al eliminar usuario' }, { status: 500 });
  }
}