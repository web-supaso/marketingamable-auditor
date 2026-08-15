import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Ruta de mantenimiento / Keep-Alive para evitar que Supabase se pause por inactividad
export async function GET() {
  const startTime = Date.now();

  try {
    if (!supabase) {
      return NextResponse.json({
        success: false,
        message: 'Supabase no está configurado en las variables de entorno.',
        timestamp: new Date().toISOString(),
      }, { status: 400 });
    }

    // Ping ligero a la base de datos para mantenerla activa
    const { count, error } = await supabase
      .from('auditorias')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }

    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: 'Keep-alive de Supabase ejecutado correctamente. Base de datos despierta y activa.',
      total_auditorias_guardadas: count || 0,
      latencia_ms: durationMs,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    const error = err as Error;
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
