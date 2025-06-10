import { NextResponse } from 'next/server';
import sql from 'mssql';

export const dynamic = 'force-dynamic'; // Fuerza la ejecución en tiempo real

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
  let pool: sql.ConnectionPool | null = null;

  try {
    pool = await sql.connect(config);

    const [
      usuarios,
      mascotas,
      adopciones,
      refugios,
      pendientes,
      compatibilidad
    ] = await Promise.all([
      pool.request().query(`SELECT COUNT(*) AS total FROM Usuarios`),
      pool.request().query(`SELECT COUNT(*) AS total FROM Mascotas`),
      pool.request().query(`
        SELECT COUNT(*) AS total 
        FROM Historial_Adopciones 
        WHERE MONTH(Fecha_Adopcion) = MONTH(GETDATE()) 
          AND YEAR(Fecha_Adopcion) = YEAR(GETDATE())
      `),
      pool.request().query(`SELECT COUNT(*) AS total FROM Refugios`),
      pool.request().query(`SELECT COUNT(*) AS total FROM Solicitudes_Adopcion WHERE Estado = 'Pendiente'`),
      pool.request().query(`SELECT ISNULL(AVG(Nivel_Compatibilidad), 0) AS total FROM Compatibilidad_Mascotas`)
    ]);

    const estadisticas = {
      usuarios: usuarios.recordset[0].total,
      mascotas: mascotas.recordset[0].total,
      adopciones: adopciones.recordset[0].total,
      refugios: refugios.recordset[0].total,
      pendientes: pendientes.recordset[0].total,
      compatibilidad: parseFloat(compatibilidad.recordset[0].total.toFixed(1))
    };

    return NextResponse.json(estadisticas);

  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error);
    return NextResponse.json({ error: 'Error al obtener estadísticas', detalle: `${error}` }, { status: 500 });
  } finally {
    try {
      if (pool) await pool.close();
    } catch (e) {
      console.warn('⚠️ No se pudo cerrar la conexión SQL:', e);
    }
  }
}
