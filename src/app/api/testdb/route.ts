import type { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true, // Azure requiere conexión cifrada
    trustServerCertificate: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { idUsuario } = req.query;

  if (!idUsuario) {
    return res.status(400).json({ error: 'Falta el parámetro idUsuario' });
  }

  try {
    await sql.connect(config);

    const result = await sql.query(`
      SELECT r.NombreRol
      FROM Usuarios u
      JOIN Usuarios_Roles ur ON u.ID_Usuario = ur.ID_Usuario
      JOIN Roles r ON ur.ID_Rol = r.ID_Rol
      WHERE u.ID_Usuario = ${idUsuario}
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    return res.status(200).json({ rol: result.recordset[0].NombreRol });
  } catch (error) {
    console.error('Error al consultar rol:', error);
    return res.status(500).json({ error: 'Error al conectar a la base de datos', detalle: error });
  }
}
