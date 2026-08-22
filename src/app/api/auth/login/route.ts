import { NextRequest, NextResponse } from 'next/server';

interface UserProfileConfig {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  getPassEnv: () => string | undefined;
}

const AUTHORIZED_PROFILES: Record<string, UserProfileConfig> = {
  juanpablo: {
    id: 'juanpablo',
    name: 'Juan Pablo Vezzato',
    role: 'Lead Strategic Consultant',
    email: 'jpv016@gmail.com',
    avatar: '/juanpablo.avif',
    getPassEnv: () => process.env.AUTH_USER_JUANPABLO_PASS,
  },
  leandro: {
    id: 'leandro',
    name: 'Leandro Rodriguez',
    role: 'Social Media & Video',
    email: 'leanrodruguez.51@gmail.com',
    avatar: '/leandro.avif',
    getPassEnv: () => process.env.AUTH_USER_LEANDRO_PASS,
  },
  hugo: {
    id: 'hugo',
    name: 'Javier',
    role: 'Chief Designer',
    email: 'hugovezz@gmail.com',
    avatar: '/javier.avif',
    getPassEnv: () => process.env.AUTH_USER_HUGO_PASS,
  },
};

const GENERIC_AUTH_ERROR =
  'No pudimos validar el acceso. El correo electrónico y la contraseña no corresponden al perfil seleccionado.';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { profileId, email, password } = body;

    // Validación de tipos y presencia de campos
    if (
      !profileId ||
      !email ||
      !password ||
      typeof profileId !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          error: GENERIC_AUTH_ERROR,
        },
        { status: 401 }
      );
    }

    const normalizedProfileId = profileId.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!normalizedProfileId || !normalizedEmail || !cleanPassword) {
      return NextResponse.json(
        {
          success: false,
          error: GENERIC_AUTH_ERROR,
        },
        { status: 401 }
      );
    }

    const profile = AUTHORIZED_PROFILES[normalizedProfileId];

    // 1. Validar que el perfil exista en la matriz canónica
    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          error: GENERIC_AUTH_ERROR,
        },
        { status: 401 }
      );
    }

    // 2. Validar que el email pertenezca exactamente al perfil seleccionado
    if (normalizedEmail !== profile.email.toLowerCase()) {
      return NextResponse.json(
        {
          success: false,
          error: GENERIC_AUTH_ERROR,
        },
        { status: 401 }
      );
    }

    // 3. Obtener la clave configurada para este perfil específico
    const expectedPassword = profile.getPassEnv();

    if (!expectedPassword || !expectedPassword.trim()) {
      console.warn(`[AUTH] Variable de entorno de contraseña no configurada para el perfil: ${profile.id}`);
      return NextResponse.json(
        {
          success: false,
          error: GENERIC_AUTH_ERROR,
        },
        { status: 401 }
      );
    }

    // 4. Validar coincidencia de contraseña del perfil específico
    if (cleanPassword !== expectedPassword.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: GENERIC_AUTH_ERROR,
        },
        { status: 401 }
      );
    }

    // 5. Acceso exitoso
    return NextResponse.json({
      success: true,
      message: 'Autenticación exitosa en Intranet Marketing Amable.',
      user: {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        email: profile.email,
        avatar: profile.avatar,
      },
      token: 'authenticated_' + Buffer.from(`${profile.id}:${Date.now()}`).toString('base64').slice(0, 16),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: GENERIC_AUTH_ERROR,
      },
      { status: 401 }
    );
  }
}
