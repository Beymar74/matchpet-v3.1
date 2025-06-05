// src/app/api/usuarios/actualizar/route.ts
import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function PATCH(request: Request) {
  let pool;
  try {
    const { idUsuario, nuevoRol, nuevoEstado } = await request.json();
    
    if (!idUsuario) {
      return NextResponse.json({ success: false, error: 'ID de usuario requerido' }, { status: 400 });
    }

    console.log('🔄 Actualizando usuario:', idUsuario, 'Rol:', nuevoRol, 'Estado:', nuevoEstado);
    
    pool = await sql.connect(config);
    
    // Actualizar estado si se proporciona
    if (nuevoEstado) {
      console.log('📝 Actualizando estado...');
      await pool.request()
        .input('Estado', sql.NVarChar(50), nuevoEstado)
        .input('ID', sql.Int, idUsuario)
        .query(`
          UPDATE Usuarios 
          SET Estado = @Estado
          WHERE ID_Usuario = @ID
        `);
      console.log('✅ Estado actualizado');
    }

    // Actualizar rol si se proporciona
    if (nuevoRol) {
      console.log('📝 Actualizando rol...');
      
      // Primero obtener el ID del rol
      const rolResult = await pool.request()
        .input('NombreRol', sql.NVarChar(50), nuevoRol)
        .query(`SELECT ID_Rol FROM Roles WHERE NombreRol = @NombreRol`);
      
      if (rolResult.recordset.length === 0) {
        await pool.close();
        return NextResponse.json({ success: false, error: 'Rol no encontrado' }, { status: 400 });
      }

      const idRol = rolResult.recordset[0].ID_Rol;
      console.log('🔍 ID del rol encontrado:', idRol);

      // Verificar estructura de tabla Usuarios_Roles
      const columnsCheck = await pool.request().query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'Usuarios_Roles'
        ORDER BY ORDINAL_POSITION
      `);
      
      const columns = columnsCheck.recordset.map(c => c.COLUMN_NAME);
      console.log('📋 Columnas en Usuarios_Roles:', columns);

      // Eliminar rol anterior si existe
      console.log('🗑️ Eliminando rol anterior...');
      await pool.request()
        .input('IDUsuario', sql.Int, idUsuario)
        .query(`DELETE FROM Usuarios_Roles WHERE ID_Usuario = @IDUsuario`);

      // Determinar qué columna usar para la fecha
      let fechaColumn = 'GETDATE()';
      if (columns.includes('Fecha_Asignacion')) {
        fechaColumn = 'GETDATE()';
      } else if (columns.includes('FechaAsignacion')) {
        fechaColumn = 'GETDATE()';
      } else if (columns.includes('Fecha_Creacion')) {
        fechaColumn = 'GETDATE()';
      } else if (columns.includes('CreatedAt')) {
        fechaColumn = 'GETDATE()';
      }

      // Construir query dinámicamente
      let insertQuery;
      if (columns.includes('Fecha_Asignacion')) {
        insertQuery = `
          INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol, Fecha_Asignacion)
          VALUES (@IDUsuario, @IDRol, GETDATE())
        `;
      } else if (columns.includes('FechaAsignacion')) {
        insertQuery = `
          INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol, FechaAsignacion)
          VALUES (@IDUsuario, @IDRol, GETDATE())
        `;
      } else if (columns.includes('Fecha_Creacion')) {
        insertQuery = `
          INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol, Fecha_Creacion)
          VALUES (@IDUsuario, @IDRol, GETDATE())
        `;
      } else if (columns.includes('CreatedAt')) {
        insertQuery = `
          INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol, CreatedAt)
          VALUES (@IDUsuario, @IDRol, GETDATE())
        `;
      } else {
        // Sin columna de fecha
        insertQuery = `
          INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol)
          VALUES (@IDUsuario, @IDRol)
        `;
      }

      console.log('📝 Query a ejecutar:', insertQuery);

      // Asignar nuevo rol
      await pool.request()
        .input('IDUsuario', sql.Int, idUsuario)
        .input('IDRol', sql.Int, idRol)
        .query(insertQuery);

      console.log('✅ Rol actualizado correctamente');
    }

    await pool.close();
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    if (pool) {
      try {
        await pool.close();
      } catch (closeError) {
        console.error('Error cerrando conexión:', closeError);
      }
    }
    return NextResponse.json({ 
      success: false, 
      error: 'Error al actualizar usuario: ' + error.message 
    }, { status: 500 });
  }
}