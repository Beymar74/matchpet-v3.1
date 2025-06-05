// src/app/api/usuarios/todos/route.ts
import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function GET() {
  let pool;
  try {
    console.log('🔄 Conectando a la base de datos...');
    pool = await sql.connect(config);
    console.log('✅ Conexión exitosa');
    
    // Verificar columnas exactas de la tabla
    console.log('🔍 Detectando columnas...');
    const columnsResult = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'Usuarios'
      ORDER BY ORDINAL_POSITION
    `);
    
    const columns = columnsResult.recordset.map(c => c.COLUMN_NAME);
    console.log('📋 Columnas disponibles:', columns);
    
    // Query dinámico basado en las columnas que existen
    const selectFields = [];
    
    // ID (requerido)
    if (columns.includes('ID_Usuario')) {
      selectFields.push('u.ID_Usuario AS id');
    } else {
      throw new Error('Columna ID_Usuario no encontrada');
    }
    
    // Nombre
    if (columns.includes('Nombre')) {
      selectFields.push('u.Nombre AS nombre');
    } else {
      selectFields.push("'Sin nombre' AS nombre");
    }
    
    // Email
    if (columns.includes('Correo')) {
      selectFields.push('u.Correo AS email');
    } else if (columns.includes('Email')) {
      selectFields.push('u.Email AS email');
    } else {
      selectFields.push("'sin@email.com' AS email");
    }
    
    // Teléfono
    if (columns.includes('Telefono')) {
      selectFields.push("COALESCE(u.Telefono, 'No especificado') AS telefono");
    } else if (columns.includes('Telephone')) {
      selectFields.push("COALESCE(u.Telephone, 'No especificado') AS telefono");
    } else {
      selectFields.push("'No especificado' AS telefono");
    }
    
    // Foto
    if (columns.includes('Foto_Perfil')) {
      selectFields.push("COALESCE(u.Foto_Perfil, '/images/default-avatar.png') AS fotoPerfil");
    } else if (columns.includes('FotoPerfil')) {
      selectFields.push("COALESCE(u.FotoPerfil, '/images/default-avatar.png') AS fotoPerfil");
    } else {
      selectFields.push("'/images/default-avatar.png' AS fotoPerfil");
    }
    
    // Ubicación
    if (columns.includes('Ubicacion')) {
      selectFields.push("COALESCE(u.Ubicacion, 'No especificada') AS ubicacion");
    } else if (columns.includes('Location')) {
      selectFields.push("COALESCE(u.Location, 'No especificada') AS ubicacion");
    } else {
      selectFields.push("'No especificada' AS ubicacion");
    }
    
    // Estado
    if (columns.includes('Estado_Cuenta')) {
      selectFields.push("COALESCE(u.Estado_Cuenta, 'Activo') AS estado");
    } else if (columns.includes('Estado')) {
      selectFields.push("COALESCE(u.Estado, 'Activo') AS estado");
    } else if (columns.includes('Status')) {
      selectFields.push("COALESCE(u.Status, 'Activo') AS estado");
    } else {
      selectFields.push("'Activo' AS estado");
    }
    
    // Fecha de registro
    if (columns.includes('Fecha_Registro')) {
      selectFields.push('u.Fecha_Registro AS fechaRegistro');
    } else if (columns.includes('FechaRegistro')) {
      selectFields.push('u.FechaRegistro AS fechaRegistro');
    } else if (columns.includes('CreatedAt')) {
      selectFields.push('u.CreatedAt AS fechaRegistro');
    } else {
      selectFields.push('GETDATE() AS fechaRegistro');
    }
    
    // Última actividad
    if (columns.includes('Ultima_Actividad')) {
      selectFields.push('COALESCE(u.Ultima_Actividad, u.Fecha_Registro) AS ultimaActividad');
    } else if (columns.includes('UltimaActividad')) {
      selectFields.push('COALESCE(u.UltimaActividad, u.Fecha_Registro) AS ultimaActividad');
    } else if (columns.includes('LastActivity')) {
      selectFields.push('COALESCE(u.LastActivity, u.Fecha_Registro) AS ultimaActividad');
    } else {
      // Usar fecha de registro como fallback
      if (columns.includes('Fecha_Registro')) {
        selectFields.push('u.Fecha_Registro AS ultimaActividad');
      } else {
        selectFields.push('GETDATE() AS ultimaActividad');
      }
    }
    
    // Por ahora, rol dinámico con JOIN
    selectFields.push("COALESCE(r.NombreRol, 'Sin Rol') AS rol");
    
    const query = `
      SELECT ${selectFields.join(', ')} 
      FROM Usuarios u
      LEFT JOIN Usuarios_Roles ur ON u.ID_Usuario = ur.ID_Usuario
      LEFT JOIN Roles r ON ur.ID_Rol = r.ID_Rol
      ORDER BY u.ID_Usuario DESC
    `;
    
    console.log('🔍 Query generado:', query);
    
    const result = await pool.request().query(query);
    console.log('📊 Registros encontrados:', result.recordset.length);
    
    if (result.recordset.length > 0) {
      console.log('📋 Primer registro raw:', result.recordset[0]);
    }
    
    // Procesar las fechas
    const usuarios = result.recordset.map(usuario => ({
      ...usuario,
      fechaRegistro: usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toISOString() : new Date().toISOString(),
      ultimaActividad: usuario.ultimaActividad ? new Date(usuario.ultimaActividad).toISOString() : new Date().toISOString()
    }));
    
    console.log('✅ Usuarios procesados:', usuarios.length);
    if (usuarios.length > 0) {
      console.log('📋 Primer usuario procesado:', usuarios[0]);
    }
    
    return NextResponse.json(usuarios);
    
  } catch (error) {
    console.error('❌ Error completo:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Error en la base de datos',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  } finally {
    if (pool) {
      try {
        await pool.close();
      } catch (closeError) {
        console.error('❌ Error cerrando conexión:', closeError);
      }
    }
  }
}