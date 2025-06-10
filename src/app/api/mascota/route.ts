import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

export async function GET() {
  try {
    await sql.connect(config);

    const result = await sql.query(`
      SELECT 
        m.ID_Mascota AS id,
        m.Nombre AS nombre,
        m.Edad AS edad,
        e.Nombre_Especie AS especie,
        m.Raza AS raza,
        em.Nombre_Estado AS estado,
        r.Nombre_Refugio AS refugio,
        f.URL_Foto AS foto
      FROM Mascotas m
      LEFT JOIN Mascotas_Especies me ON me.ID_Mascota = m.ID_Mascota
      LEFT JOIN Especies e ON e.ID_Especie = me.ID_Especie
      LEFT JOIN Estados_Mascotas em ON em.ID_Estado = m.ID_Estado
      LEFT JOIN Refugios r ON r.ID_Refugio = m.ID_Refugio
      OUTER APPLY (
        SELECT TOP 1 URL_Foto 
        FROM Fotos_Mascotas 
        WHERE ID_Mascota = m.ID_Mascota
        ORDER BY ID_Foto ASC
      ) f
    `);

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error("❌ Error al obtener mascotas:", err);
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500
