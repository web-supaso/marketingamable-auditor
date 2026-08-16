import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_ACCESS_KEY || '123';

    if (!password || password.trim() !== correctPassword.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Contraseña de acceso incorrecta. Verifica tu clave de Intranet.',
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Autenticación exitosa en Intranet Marketing Amable.',
      token: 'authenticated_' + Buffer.from(correctPassword).toString('base64').slice(0, 12),
    });

  } catch (err) {
    const error = err as Error;
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
