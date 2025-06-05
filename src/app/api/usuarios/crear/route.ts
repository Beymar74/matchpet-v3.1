// src/app/api/usuarios/crear/route.ts
import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function POST(request: Request) {
  try {
    const { nombre, email, telefono, ubicacion, rol, estado, contrasena } = await request.json();
    
    // Validaciones básicas
    if (!nombre || !email || !rol || !contrasena) {
      return NextResponse.json({ 
        success: false, 
        error: 'Nombre, email, rol y contraseña son requeridos' 
      }, { status: 400 });
    }

    if (contrasena.length < 6) {
      return NextResponse.json({ 
        success: false, 
        error: 'La contraseña debe tener al menos 6 caracteres' 
      }, { status: 400 });
    }

    const pool = await sql.connect(config);
    
    // Verificar si el email ya existe
    const emailCheck = await pool.request()
      .input('Email', sql.NVarChar(255), email)
      .query(`SELECT ID_Usuario FROM Usuarios WHERE Correo = @Email`);
    
    if (emailCheck.recordset.length > 0) {
      await pool.close();
      return NextResponse.json({ 
        success: false, 
        error: 'El email ya está registrado' 
      }, { status: 400 });
    }

    // Insertar usuario (usando nombres de columnas probables)
    const userResult = await pool.request()
      .input('Nombre', sql.NVarChar(255), nombre)
      .input('Email', sql.NVarChar(255), email)
      .input('Telefono', sql.NVarChar(20), telefono || null)
      .input('Ubicacion', sql.NVarChar(255), ubicacion || null)
      .input('Contrasena', sql.NVarChar(255), contrasena)
      .input('Estado', sql.NVarChar(50), estado || 'Activo')
      .query(`
        INSERT INTO Usuarios (
          Nombre, Correo, Telefono, Ubicacion, Contrasena, 
          Estado, Fecha_Registro
        )
        OUTPUT INSERTED.ID_Usuario
        VALUES (
          @Nombre, @Email, @Telefono, @Ubicacion, @Contrasena,
          @Estado, GETDATE()
        )
      `);

    const nuevoUsuarioId = userResult.recordset[0].ID_Usuario;

    // Asignar rol si se proporciona
    if (rol) {
      // Obtener ID del rol
      const rolResult = await pool.request()
        .input('NombreRol', sql.NVarChar(50), rol)
        .query(`SELECT ID_Rol FROM Roles WHERE NombreRol = @NombreRol`);
      
      if (rolResult.recordset.length > 0) {
        const idRol = rolResult.recordset[0].ID_Rol;
        
        // Verificar estructura de tabla Usuarios_Roles
        const columnsCheck = await pool.request().query(`
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'Usuarios_Roles'
        `);
        
        const columns = columnsCheck.recordset.map(c => c.COLUMN_NAME);
        
        // Construir query dinámicamente basado en las columnas que existen
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
        } else {
          // Sin columna de fecha
          insertQuery = `
            INSERT INTO Usuarios_Roles (ID_Usuario, ID_Rol)
            VALUES (@IDUsuario, @IDRol)
          `;
        }
        
        await pool.request()
          .input('IDUsuario', sql.Int, nuevoUsuarioId)
          .input('IDRol', sql.Int, idRol)
          .query(insertQuery);
      }
    }

    await pool.close();
    return NextResponse.json({ 
      success: true, 
      message: 'Usuario creado exitosamente',
      usuarioId: nuevoUsuarioId
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno del servidor: ' + error.message 
    }, { status: 500 });
  }
}