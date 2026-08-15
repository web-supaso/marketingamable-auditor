# 📋 Hoja de Ruta - Auditor Épico (Marketing Amable)

## Estado de los Módulos

- [x] **0. Base del Sistema & Tipado Estricto**
  - Next.js 16 + React 19 + Tailwind v4 + Gemini API (`@google/genai`).
  - Scraping con Cheerio (meta, SPA detection, iframes, canales de contacto, PageSpeed).
  - Framework NEXUS v5.0 (Pitch WhatsApp, Matriz GAP, ROI en $, Schema JSON-LD, Copys reescritos, Armas de venta).
  - 0 errores en `npm run lint` y `npm run build`.

- [x] **1. ⚖️ Módulo RGPD & Multas UE / AEPD** (Completado)
  - Detección automática en scraping de Aviso Legal, Política de Privacidad, Política de Cookies y CMP/Banner de Cookies (Cookiebot, Complianz, OneTrust, Iubenda, CookieYes, etc.).
  - Detección de telemetría sin consentimiento previo.
  - Estimación de riesgo y sanciones reales (1.500€ a 30.000€+).
  - Pestaña interactiva con checklist de 5 elementos legales, desglose de infracciones y gancho de urgencia comercial para cerrar ventas.

- [x] **2. 📧 Generador de Cold Email B2B** (Completado)
  - Generación de 3 Asuntos de alta tasa de apertura (+60% sin spam).
  - Plantillas completas AIDA (Atención-Interés-Deseo-Acción) y PAS (Problema-Agitación-Solución).
  - Sub-selector interactivo en la pestaña de Outreach para alternar entre WhatsApp Directo y Cold Email con enlace directo a gestor de correo (`mailto:`).

- [x] **3. 🌿 Restyling Visual Oficial (Marketing Amable)** (Completado)
  - Paleta oficial aplicada: Fondo `#0D0D0D`, Modales/Cards `#121212`, Verde Bosque `#1B4332`, Verde Sostenible `#D8F3DC`, Blanco Puro `#FFFFFF`.
  - Tipografías oficiales Google Fonts: `Lexend` (800 / ExtraBold) e `Inter`.
  - Header Hero con branding oficial `MARKETING` (Blanco) `AMABLE` (Verde Sostenible) y logotipo animado `002.gif`.
  - Footer Obligatorio en Pill Glassmorphism oficial con isotipo animado `002.gif` y año dinámico `{new Date().getFullYear()}` enlazando a `https://www.marketingamable.com/`.

- [x] **4. 🔐 Supabase, Historial & Intranet Gate** (Completado)
  - Proyecto `marketingamable-briefs` reactivado en `eu-west-2` (Europa).
  - Tabla `public.auditorias` creada en PostgreSQL con RLS (Row Level Security) activado y políticas de acceso.
  - Guardado automático de cada nuevo diagnóstico generado.
  - Endpoint GET `/api/audit` y visualizador de auditorías recientes en el panel de inicio para recarga instantánea sin consumo de tokens.
  - **Bloqueo Intranet Marketing Amable:** Pantalla de Login privada con clave de acceso configurable (`ADMIN_ACCESS_KEY` en `.env.local`), sesión recordada en navegador y botón de cierre de sesión.
  - **Anti-Pausa Supabase:** Endpoint `/api/cron` y archivo `vercel.json` configurado con expresión `0 7 */3 * *` (cada 3 días a las 7:00). Compatible también con `cron-job.org`.

- [x] **5. 🚀 Preparación para Despliegue en Vercel & marketingamable.com** (Completado)
  - 0 errores en TypeScript y 0 warnings en ESLint (`npm run lint`).
  - Compilación de producción limpia y optimizada (`npm run build`).
  - Variables de entorno documentadas en `.env.example`.

