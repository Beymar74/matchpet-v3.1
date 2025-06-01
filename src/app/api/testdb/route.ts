import { NextResponse } from 'next/server';
import sql from 'mssql';

const config = {
  user: 'Beymar',
  password: 'Santiago12345',
  server: 'matchpetdb01.database.windows.net',
  database: 'matchpetdb01',
  options: {
    encrypt: true
  }
};

export async function GET() {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT TOP 1 * FROM Usuarios`;
    return NextResponse.json({ success: true, result: result.recordset });
  } catch (error) {
    console.error('❌ Error al conectar con SQL:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
