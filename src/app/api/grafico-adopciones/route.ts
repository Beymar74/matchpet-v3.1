// src/app/api/grafico-adopciones/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: { encrypt: true }
};

export async function GET(req: NextRequest) {
  const periodo = req.nextUrl.searchParams.get('periodo') || 'mes';

  try {
    const pool = await sql.connect(config);
    let query = '';
    let etiquetas: string[] = [];

    if (periodo === 'mes') {
      query = `
        SELECT 
          DATENAME(MONTH, Fecha_Adopcion) AS etiqueta,
          COUNT(*) AS adopciones
        FROM Historial_Adopciones
        WHERE YEAR(Fecha_Adopcion) = YEAR(GETDATE())
        GROUP BY DATENAME(MONTH, Fecha_Adopcion), MONTH(Fecha_Adopcion)
        ORDER BY MONTH(Fecha_Adopcion)
      `;
      etiquetas = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    } else if (periodo === 'semana') {
      query = `
        SELECT 
          DATENAME(WEEKDAY, Fecha_Adopcion) AS etiqueta,
          COUNT(*) AS adopciones
        FROM Historial_Adopciones
        WHERE Fecha_Adopcion >= DATEADD(DAY, -7, GETDATE())
        GROUP BY DATENAME(WEEKDAY, Fecha_Adopcion), DATEPART(WEEKDAY, Fecha_Adopcion)
        ORDER BY DATEPART(WEEKDAY, Fecha_Adopcion)
      `;
      etiquetas = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    } else if (periodo === 'año') {
      query = `
        SELECT 
          YEAR(Fecha_Adopcion) AS etiqueta,
          COUNT(*) AS adopciones
        FROM Historial_Adopciones
        GROUP BY YEAR(Fecha_Adopcion)
        ORDER BY YEAR(Fecha_Adopcion)
      `;
    }

    const adopcionesData = await pool.request().query(query);

    return NextResponse.json({
      etiquetas: adopcionesData.recordset.map(r => r.etiqueta),
      adopciones: adopcionesData.recordset.map(r => r.adopciones),
      solicitudes: adopcionesData.recordset.map(r => Math.round(r.adopciones * 1.3)) // estimación si no tienes otra tabla
    });
  } catch (error) {
    console.error('❌ Error al cargar gráfico de adopciones:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
