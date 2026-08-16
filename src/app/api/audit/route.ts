import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '@/lib/supabase';

interface GapRow {
  capa: string;
  hallazgo?: string;
  hallazgo_critico?: string;
  impacto_tecnico?: string;
  impacto_negocio?: string;
  impacto_negocio_dolares?: string;
  solucion?: string;
  solucion_propuesta?: string;
}

interface FugaDinero {
  titulo: string;
  impacto_negocio: string;
  solucion_simple: string;
}

interface CopyReescrito {
  enfoque: string;
  headline: string;
  subheadline: string;
}

interface ArmaVentaObjecion {
  objecion?: string;
  objecion_cliente?: string;
  contramedida?: string;
  contramedida_persuasiva?: string;
}

interface RoadmapItem {
  fase: string;
  accion: string;
}

export interface ColdEmail {
  asunto_1: string;
  asunto_2: string;
  asunto_3: string;
  cuerpo_aida: string;
  cuerpo_pas: string;
  llamada_a_la_accion: string;
  email_seguimiento_48h?: {
    asunto: string;
    cuerpo: string;
  };
  protocolo_antiban_whatsapp?: string;
}

export interface CalculadoraPerdidas {
  perdida_estimada_mensual: string;
  impacto_anual: string;
  motivos_fuga: string[];
}

export interface GuionLlamada15Min {
  min_0_3_apertura: string;
  min_3_8_demostracion: string;
  min_8_12_solucion: string;
  min_12_15_cierre: string;
}

export interface RgpdInfraccion {
  tipo: string;
  gravedad: 'Leve' | 'Grave' | 'Muy Grave';
  articulo_legal: string;
  explicacion: string;
  como_solucionarlo: string;
}

export interface RgpdAudit {
  nivel_riesgo: 'Crítico' | 'Alto' | 'Medio' | 'Bajo';
  puntuacion_cumplimiento: number;
  sancion_estimada_euros: string;
  diagnostico_legal: string;
  infracciones: RgpdInfraccion[];
  gancho_urgencia_comercial: string;
  elementos_detectados: {
    tiene_aviso_legal: boolean;
    tiene_politica_privacidad: boolean;
    tiene_politica_cookies: boolean;
    tiene_banner_cmp: boolean;
    telemetria_sin_bloqueo: boolean;
  };
}

export interface ExperimentoAB {
  nombre: string;
  hipotesis: string;
  variable_a_control: string;
  variable_b_variante: string;
  metrica_exito: string;
}

export interface LeadMagnetTecnico {
  nombre: string;
  descripcion: string;
  como_funciona_vanilla_js: string;
  impacto_captacion: string;
}

interface AuditResultPayload {
  puntuacion_global: number;
  nota_autoridad?: string;
  resumen_ejecutivo: string;
  elephant_in_the_room?: string;
  pitch_whatsapp?: string;
  cold_email?: ColdEmail;
  calculadora_perdidas?: CalculadoraPerdidas;
  guion_llamada?: GuionLlamada15Min;
  fugas_de_dinero?: FugaDinero[];
  rgpd_audit?: RgpdAudit;
  matriz_gap?: GapRow[];
  proyeccion_roi?: {
    trafico_mensual?: string;
    ticket_medio?: string;
    conversion_actual?: string;
    escenario_pesimista?: string;
    escenario_realista?: string;
    escenario_optimista?: string;
    conclusion?: string;
  };
  geo_schema?: {
    entidades?: string[];
    wikidata_ids?: string[];
    frase_citabilidad?: string;
    json_ld?: unknown;
    json_ld_code?: unknown;
  };
  experimentos_ab?: ExperimentoAB[];
  lead_magnet_tecnico?: LeadMagnetTecnico;
  copys_reescritos?: CopyReescrito[];
  armas_venta_objeciones?: ArmaVentaObjecion[];
  puntos_fuertes?: string[];
  recomendacion_prioritaria?: string;
  roadmap?: RoadmapItem[];
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'tu_gemini_api_key_aqui' || apiKey.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Por favor, configura tu GEMINI_API_KEY en el archivo .env.local' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const { 
      url, 
      industria, 
      tipo_analisis = 'url', 
      html_content, 
      image_base64, 
      image_mime_type 
    } = await req.json();

    const cleanUrl = url ? (url.startsWith('http') ? url : `https://${url}`) : (tipo_analisis === 'html_file' ? 'Archivo index.html (Local)' : 'Captura de Pantalla');

    // 1. Scraping enriquecido del HTML (para URL o archivo HTML subido)
    let html = '';
    let isSpa = false;
    let title = '';
    let metaDesc = 'Sin descripción';
    let ogTitle = '';
    let ogDesc = '';
    let headings: string[] = [];
    let hasWhatsapp = false;
    let hasPhone = false;
    let hasEmail = false;
    let hasForms = false;
    let hasGoogleMaps = false;
    let socialLinks: string[] = [];
    let ctaButtons: string[] = [];
    let hasAnalytics = false;
    let hasIframe = false;
    let missingAltCount = 0;
    let hasViewport = true;
    let bodyTextSnippet = '';

    // Auditoría Legal RGPD & LSSI
    let hasAvisoLegal = false;
    let hasPrivacyPolicy = false;
    let hasCookiesPolicy = false;
    let hasCmpBanner = false;
    let telemetryWithoutConsent = false;

    if (tipo_analisis === 'html_file' && html_content) {
      html = html_content;
    } else if (tipo_analisis === 'url' && url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const htmlRes = await fetch(cleanUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
          },
        });
        clearTimeout(timeoutId);
        html = await htmlRes.text();
      } catch (e) {
        console.warn(`No se pudo scrapear directamente ${cleanUrl}:`, e);
      }
    }

    if (html) {
      try {
        const rawLowerHtml = html.toLowerCase();
        const $ = cheerio.load(html);

        const cmpKeywords = [
          'cookiebot', 'complianz', 'onetrust', 'iubenda', 'cookieyes', 'klaro',
          'tarteaucitron', 'usercentrics', 'axeptio', 'cookie-law-info', 'borlabs-cookie',
          'moove_gdpr', 'cmplz', 'cc-window', 'cookie-notice', 'termsfeed', 'quantcast',
          'didomi', 'osano', 'cookie-script', 'cookiescript', 'gdpr-cookie-consent'
        ];
        hasCmpBanner = cmpKeywords.some(cmp => rawLowerHtml.includes(cmp));
        const scriptSources = $('script[src]').map((_, el) => $(el).attr('src') || '').get();
        const detectedVendorBundles = scriptSources.filter(src => /vendor|chunk|app|main|bundle|react|vue|angular|next|vite|runtime/i.test(src)).slice(0, 8);
        const externalFontLinks = $('link[href*="fonts.googleapis.com"], link[href*="use.typekit.net"]').map((_, el) => $(el).attr('href') || '').get();
        const hasExternalFontCalls = rawLowerHtml.includes('fonts.googleapis.com') || externalFontLinks.length > 0;

        const isClientShell = (
          rawLowerHtml.includes('id="root"') || 
          rawLowerHtml.includes('id="app"') || 
          rawLowerHtml.includes('id="__next"') ||
          rawLowerHtml.includes('vite/client') ||
          rawLowerHtml.includes('bundle.js') ||
          detectedVendorBundles.length > 0
        );
        if (isClientShell && (html.length < 3500 || headings.length === 0)) {
          isSpa = true;
        }

        $('script, style, noscript, svg').remove();

        title = $('title').first().text().trim() || 'Sin título';
        metaDesc = $('meta[name="description"]').attr('content')?.trim() || 
                   $('meta[property="og:description"]').attr('content')?.trim() || 'Sin descripción';
        ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
        ogDesc = $('meta[property="og:description"]').attr('content')?.trim() || '';

        headings = $('h1, h2, h3').map((_, el) => $(el).text().trim()).get().filter(t => t.length > 0).slice(0, 10);

        const allLinks = $('a').map((_, el) => $(el).attr('href') || '').get();
        hasWhatsapp = rawLowerHtml.includes('wa.me') || 
                      rawLowerHtml.includes('api.whatsapp.com') || 
                      rawLowerHtml.includes('whatsapp') ||
                      allLinks.some(h => h.includes('wa.me') || h.includes('whatsapp'));
        
        hasPhone = allLinks.some(h => h.startsWith('tel:')) || 
                   /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b/.test(html);

        hasEmail = allLinks.some(h => h.startsWith('mailto:')) || 
                   /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(html);

        hasGoogleMaps = allLinks.some(h => h.includes('maps.google') || h.includes('goo.gl/maps') || h.includes('google.com/maps'));

        const socialDomains = ['instagram.com', 'facebook.com', 'linkedin.com', 'tiktok.com', 'twitter.com', 'x.com'];
        socialLinks = allLinks.filter(h => socialDomains.some(domain => h.includes(domain))).slice(0, 5);

        hasForms = $('form').length > 0;
        ctaButtons = $('button, a[class*="btn"], a[class*="button"], a[class*="cta"]')
          .map((_, el) => $(el).text().trim())
          .get()
          .filter(t => t.length > 1 && t.length < 40)
          .slice(0, 6);

        hasAnalytics = rawLowerHtml.includes('gtag') || 
                       rawLowerHtml.includes('google-analytics') || 
                       rawLowerHtml.includes('gtm.js') || 
                       rawLowerHtml.includes('fbq(') ||
                       rawLowerHtml.includes('fbevents.js');

        telemetryWithoutConsent = hasAnalytics && !hasCmpBanner;

        const allLinksWithText = $('a').map((_, el) => ({
          href: ($(el).attr('href') || '').toLowerCase(),
          text: $(el).text().toLowerCase().trim()
        })).get();

        hasAvisoLegal = allLinksWithText.some(l => 
          l.href.includes('aviso-legal') || l.href.includes('aviso_legal') || l.href.includes('legal-notice') ||
          l.text.includes('aviso legal') || l.text.includes('información legal') || l.text.includes('menciones legales')
        );

        hasPrivacyPolicy = allLinksWithText.some(l => 
          l.href.includes('privacidad') || l.href.includes('privacy') || l.href.includes('politica-privacidad') || l.href.includes('politica-de-privacidad') ||
          l.text.includes('privacidad') || l.text.includes('privacy') || l.text.includes('protección de datos')
        );

        hasCookiesPolicy = allLinksWithText.some(l => 
          l.href.includes('cookie') || l.href.includes('cookies') || l.href.includes('politica-cookies') || l.href.includes('politica-de-cookies') ||
          l.text.includes('cookie') || l.text.includes('cookies')
        );

        const iframes = $('iframe').map((_, el) => $(el).attr('src') || '').get().filter(s => s.length > 0);
        hasIframe = iframes.length > 0;

        missingAltCount = $('img:not([alt]), img[alt=""]').length;
        hasViewport = $('meta[name="viewport"]').length > 0;

        const hasJsLangSwitch = rawLowerHtml.includes('changelang(') || rawLowerHtml.includes('setlang(') || rawLowerHtml.includes('switchlang(');
        const hasHreflang = rawLowerHtml.includes('hreflang');
        const hasRenderBlockingExternalFonts = hasExternalFontCalls || rawLowerHtml.includes('font-awesome') || rawLowerHtml.includes('cdnjs.cloudflare.com');
        const hasSchemaJsonLd = rawLowerHtml.includes('application/ld+json');

        bodyTextSnippet = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 1500);

      } catch (scrapingErr) {
        const err = scrapingErr as Error;
        console.warn('Error al parsear el HTML:', err.message);
        bodyTextSnippet = 'No se pudo parsear completamente el HTML.';
      }
    }

    let pagespeedData: { available: boolean; performance?: number; seo?: number; lcp?: string; note?: string } = {
      available: false,
      note: 'Métricas de PageSpeed no aplicables para archivos locales o capturas.',
    };

    if (tipo_analisis === 'url' && url) {
      try {
        const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&strategy=mobile&category=PERFORMANCE&category=SEO`;
        const psiController = new AbortController();
        const psiTimeout = setTimeout(() => psiController.abort(), 8000);

        const psiRes = await fetch(psiUrl, { signal: psiController.signal });
        clearTimeout(psiTimeout);

        if (psiRes.ok) {
          const psiJson = await psiRes.json();
          const perfScore = Math.round((psiJson.lighthouseResult?.categories?.performance?.score || 0) * 100);
          const seoScore = Math.round((psiJson.lighthouseResult?.categories?.seo?.score || 0) * 100);
          const lcp = psiJson.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue || 'N/D';

          pagespeedData = {
            available: true,
            performance: perfScore,
            seo: seoScore,
            lcp: lcp,
            note: `Performance Mobile: ${perfScore}/100, SEO: ${seoScore}/100, LCP: ${lcp}`
          };
        }
      } catch (psiErr) {
        console.warn('PageSpeed API omitido o timeout:', psiErr);
      }
    }

    const speedInfo = pagespeedData.available
      ? `PageSpeed Mobile: Rendimiento ${pagespeedData.performance}/100, SEO ${pagespeedData.seo}/100, LCP: ${pagespeedData.lcp}`
      : 'PageSpeed: No disponible (análisis heurístico)';

    const spaContext = isSpa
      ? '⚠️ AVISO TÉCNICO SPA: Se detectó una aplicación web renderizada en cliente (Client-Side Rendering) con shell vacía o carga pesada de JavaScript.'
      : 'Renderizado del lado del servidor o HTML estático con contenido parseable.';

    const iframeContext = hasIframe
      ? '⚠️ AVISO IFRAME: Se detectó uso de iframes para contenido de terceros.'
      : '';

    const technicalAuditContext = `
    - Cambio de idioma por JavaScript (Trampa de indexación): ${html.toLowerCase().includes('changelang(') ? 'Sí (Grave para SEO internacional)' : 'No detectado'}
    - Etiquetas hreflang presentes: ${html.toLowerCase().includes('hreflang') ? 'Sí' : 'No (Invisibilidad multilingüe)'}
    - Fuentes externas bloqueantes (Google Fonts/CDN): ${html.toLowerCase().includes('fonts.googleapis.com') ? 'Sí (Retrasa FCP y transfiere IPs sin consentimiento)' : 'No'}
    - Marcado Schema JSON-LD detectado: ${html.toLowerCase().includes('application/ld+json') ? 'Sí' : 'No (Invisibilidad para IAs)'}
    `;

    const visualContext = tipo_analisis === 'screenshot' 
      ? `📸 MODO CAPTURA DE PANTALLA (ANÁLISIS CRO MULTIMODAL): Analiza directamente la imagen adjunta. Evalúa la jerarquía visual del titular, contraste de botones CTAs, legibilidad de textos, espacio en blanco, saturación visual (Ley de Miller), presencia de prueba social y fricción visual para el usuario.`
      : ``;

    const rgpdAuditContext = `
    - Aviso Legal detectado: ${hasAvisoLegal ? 'Sí' : 'NO (Infracción Art. 10 LSSI)'}
    - Política de Privacidad detectada: ${hasPrivacyPolicy ? 'Sí' : 'NO (Infracción Art. 13 RGPD)'}
    - Política de Cookies detectada: ${hasCookiesPolicy ? 'Sí' : 'NO (Infracción Art. 22.2 LSSI)'}
    - Banner CMP de Consentimiento: ${hasCmpBanner ? 'Sí' : 'NO'}
    - Telemetría/Scripts disparados sin consentimiento: ${telemetryWithoutConsent ? 'Sí (Infracción Grave)' : 'No'}
    `;

    const webAnalysisData = `
    - Modo de Análisis: ${tipo_analisis === 'url' ? 'URL Online' : tipo_analisis === 'html_file' ? 'Archivo index.html Local' : 'Captura de Pantalla / Screenshot'}
    - Nombre / URL: ${cleanUrl}
    - Nicho / Industria: ${industria || 'Negocio Local / Servicios Profesionales'}
    - Título HTML: "${title}"
    - Meta Descripción: "${metaDesc}"
    - Título Open Graph: "${ogTitle}"
    - Descripción Open Graph: "${ogDesc}"
    - Tiene etiqueta viewport responsive: ${hasViewport ? 'Sí' : 'No'}
    - Encabezados (H1/H2/H3): ${headings.length > 0 ? headings.join(' | ') : 'Ninguno detectado en HTML estático'}
    - ¿Tiene WhatsApp directo?: ${hasWhatsapp ? 'Sí' : 'No'}
    - ¿Tiene Teléfono clicable?: ${hasPhone ? 'Sí' : 'No'}
    - ¿Tiene Email visible?: ${hasEmail ? 'Sí' : 'No'}
    - ¿Tiene enlace a Google Maps / Ubicación?: ${hasGoogleMaps ? 'Sí' : 'No'}
    - ¿Tiene Formularios de contacto?: ${hasForms ? 'Sí' : 'No'}
    - Botones / CTAs detectados: ${ctaButtons.length > 0 ? ctaButtons.join(', ') : 'Ninguno claro'}
    - Redes sociales: ${socialLinks.length > 0 ? socialLinks.join(', ') : 'Ninguna'}
    - Herramientas de telemetría/pixel: ${hasAnalytics ? 'Sí' : 'No'}
    - Imágenes sin etiqueta alt descriptiva: ${missingAltCount}
    - Extracto de contenido del sitio: "${bodyTextSnippet.slice(0, 1000)}"
    - ${speedInfo}
    - ${spaContext}
    - ${iframeContext}
    ${technicalAuditContext}
    ${visualContext}
    ${rgpdAuditContext}
    `;

    const prompt = `Eres un consultor de máxima autoridad en CRO (Conversión), Transformación Digital 360°, Compliance Legal Web (RGPD / AEPD / CNIL) y Estrategia Comercial de Alto Valor (Nivel McKinsey / NEXUS 5.0).
Tu misión es analizar la presencia digital de esta empresa con los datos técnicos, visuales y legales proporcionados y generar un ENTREGABLE DE CONSULTORÍA DE MÁXIMO NIVEL:
1. PITCH DE VENTA RÁPIDO (WhatsApp / Outreach): Directo, educado, sin tecnicismos abrumadores, enfocado en abrir la conversación ofreciendo resolver el problema crítico en menos de 24h.
2. ESTRATEGIA DE PROSPECCIÓN SEGURA & COLD EMAIL (Sin riesgo de bloqueo de WhatsApp):
   - 3 asuntos con alta tasa de apertura (curiosidad, sin palabras de spam).
   - Plantilla con estructura AIDA y plantilla con estructura PAS con llamada a la acción suave (Soft CTA) invitando a responder o solicitar llamada breve.
   - Email de Seguimiento a las 48h con un hallazgo técnico adicional de alto valor.
   - Protocolo Anti-Ban WhatsApp: El texto exacto para pedirle al cliente que nos agregue a su libreta de contactos antes de interactuar por WhatsApp, protegiendo 100% la cuenta de WhatsApp Business contra reportes de spam.
3. CALCULADORA DE DINERO PERDIDO AL MES (Fuga Financiera Oculta): Cálculo monetario mensual y anual realista de lo que el cliente pierde por los fallos detectados.
4. GUIÓN DE LLAMADA / VIDEOLLAMADA CONSULTIVA DE 15 MINUTOS: Estructura exacta minuto a minuto (0-3 min Apertura, 3-8 min Diagnóstico sin culpas, 8-12 min Solución Amable, 12-15 min Cierre con ROI).
5. INFORME DE AUTORIDAD DIGITAL & TRANSFORMACIÓN 360° (NEXUS 5.0):
   - Matriz GAP de 5 capas de élite (Privacidad & Ética, CRO Fogg B=MAP con análisis de comoditización vs High-Ticket, GEO/LLMs con Wikidata IDs, Neuro-UI Ley de Miller, Eco-Performance WPO con evaluación de arquitectura JS/SPA, CPU-bound y TBT vs 0KB JS).
   - Proyección Financiera de ROI en $ (3 escenarios con ticket medio y volumen de clientes).
   - Schema JSON-LD hiper-enriquecido: @type "ProfessionalService", address, geo (GeoCoordinates), openingHoursSpecification, sameAs, knowsAbout y hasOfferCatalog con 2 servicios de alto valor con descripciones.
   - 2 Experimentos A/B Validables (Variable A Control, Variable B Variante, Métrica de éxito).
   - 1 Propuesta de Lead Magnet Técnico Interactivo ("Widget de Amabilidad Digital") en Vanilla JS < 4KB.
6. MÓDULO LEGAL RGPD & SANCIONES AEPD: Diagnóstico riguroso de riesgos de sanción (1.500€ a 30.000€+), artículos vulnerados y gancho de urgencia comercial.

DATOS DEL ANÁLISIS:
${webAnalysisData}

INSTRUCCIONES CLAVE DE CALIDAD Y CONSULTORÍA DE ÉLITE:
- Sé implacable y honesto con la nota (0-100 y nota sobre 10).
- "The Elephant in the Room": Identifica con precisión quirúrgica el fallo estratégico o técnico oculto más grave (por ejemplo, la paradoja de vender alta tecnología/sostenibilidad en un SPA que carga JavaScript pesado bloqueando CPU, o tener un catálogo comoditizado de servicios baratos en lugar de una propuesta de alto valor).
- En la Matriz GAP cubre las 5 capas de élite con hallazgo, impacto técnico, impacto en negocio ($) y solución.
- En GEO (SEO para IAs), genera entidades semánticas con sus IDs de Wikidata, frase exacta de citabilidad para rastreadores LLM y código JSON-LD enriquecido con "hasOfferCatalog" y "knowsAbout".
- En Experimentos A/B, formula 2 hipótesis de testing validables con Variables A y B y métrica de éxito estimada.
- En Lead Magnet Técnico, propone una herramienta interactiva ("Widget de Amabilidad Digital") ligera en Vanilla JS para captar leads MoFu sin cookies.

Devuelve estrictamente un JSON válido con esta estructura:
{
  "puntuacion_global": 0-100,
  "nota_autoridad": "X.X / 10",
  "resumen_ejecutivo": "1 o 2 frases contundentes sobre el estado de la web.",
  "elephant_in_the_room": "Explicación del error crítico de negocio y diseño que destruye la credibilidad o visibilidad del cliente.",
  "pitch_whatsapp": "Texto completo y persuasivo listo para cuando el cliente ya nos haya agendado en su teléfono.",
  "cold_email": {
    "asunto_1": "Asunto de alta apertura 1 (Intriga / Curiosidad)",
    "asunto_2": "Asunto de alta apertura 2 (Impacto en Negocio / Pérdida de clientes)",
    "asunto_3": "Asunto de alta apertura 3 (Personalizado con Nombre/URL)",
    "cuerpo_aida": "Texto completo del email de primer contacto estructurado en AIDA...",
    "cuerpo_pas": "Texto completo del email de primer contacto estructurado en PAS...",
    "llamada_a_la_accion": "¿Tendría sentido que les envíe un breve vídeo de 2 minutos mostrándolo o prefieren revisarlo en una llamada rápida de 10 minutos esta semana?",
    "email_seguimiento_48h": {
      "asunto": "Re: [Nombre Empresa] - Detalle adicional sobre la auditoría",
      "cuerpo": "Texto del email de seguimiento a las 48h aportando valor adicional sin presionar..."
    },
    "protocolo_antiban_whatsapp": "¡Hola [Nombre]! Para poder compartirte los documentos interactivos y capturas del diagnóstico por WhatsApp sin que el sistema bloquee los enlaces por seguridad, por favor añade nuestro contacto a tu agenda telefónica. En cuanto nos tengas guardados, te paso el acceso directo."
  },
  "calculadora_perdidas": {
    "perdida_estimada_mensual": "ej: $1,850 / mes",
    "impacto_anual": "ej: $22,200 / año",
    "motivos_fuga": [
      "Fuga por lentitud y fricción en móviles (rebote del tráfico)",
      "Pérdida de clientes que buscan contacto inmediato por WhatsApp/teléfono",
      "Invisibilidad en el mercado en otros idiomas por traducción en JS"
    ]
  },
  "guion_llamada": {
    "min_0_3_apertura": "Apertura empática, agradecimiento por el tiempo y validación del excelente concepto del negocio, introduciendo con delicadeza el elefante en la habitación...",
    "min_3_8_demostracion": "Exposición de las 3 fugas de dinero principales demostrando que no es un fallo de su servicio sino de la infraestructura digital...",
    "min_8_12_solucion": "Presentación del plan de amabilidad digital: blindaje legal, WPO, rutas estáticas y widget interactivo...",
    "min_12_15_cierre": "Presentación del ROI proyectado, respuesta a objeciones y acuerdo para iniciar la Fase 1 en 48 horas."
  },
  "rgpd_audit": {
    "nivel_riesgo": "Crítico" | "Alto" | "Medio" | "Bajo",
    "puntuacion_cumplimiento": 0-100,
    "sancion_estimada_euros": "ej: 3.000€ a 15.000€ (según baremos AEPD/CNIL)",
    "diagnostico_legal": "Resumen claro del estado de cumplimiento normativo y exposición a multas.",
    "infracciones": [
      {
        "tipo": "Nombre de la infracción",
        "gravedad": "Muy Grave" | "Grave" | "Leve",
        "articulo_legal": "Art. 10 LSSI / Art. 13 RGPD / Art. 22.2 LSSI...",
        "explicacion": "Por qué incumple la ley actualmente.",
        "como_solucionarlo": "Cómo lo resuelves tú de inmediato."
      }
    ],
    "gancho_urgencia_comercial": "Frase de alto impacto para advertir al dueño del negocio y justificar la intervención inmediata.",
    "elementos_detectados": {
      "tiene_aviso_legal": ${hasAvisoLegal},
      "tiene_politica_privacidad": ${hasPrivacyPolicy},
      "tiene_politica_cookies": ${hasCookiesPolicy},
      "tiene_banner_cmp": ${hasCmpBanner},
      "telemetria_sin_bloqueo": ${telemetryWithoutConsent}
    }
  },
  "fugas_de_dinero": [
    {
      "titulo": "Nombre corto del problema",
      "impacto_negocio": "Cómo esto le hace perder dinero o clientes.",
      "solucion_simple": "Cómo lo solucionas tú en poco tiempo."
    }
  ],
  "matriz_gap": [
    {
      "capa": "Privacidad & Ética",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    },
    {
      "capa": "CRO / Fogg B=MAP",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    },
    {
      "capa": "GEO (SEO para IAs)",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    },
    {
      "capa": "Neuro-UI / Carga Cognitiva",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    },
    {
      "capa": "Eco-Performance (WPO)",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    }
  ],
  "proyeccion_roi": {
    "trafico_mensual": "ej: 1,500 visitas/mes",
    "ticket_medio": "ej: $450 por reserva",
    "conversion_actual": "ej: 0.8% (12 reservas = $5,400/mes)",
    "escenario_pesimista": "+$1,350/mes (+5% relativo)",
    "escenario_realista": "+$4,050/mes (+15% relativo)",
    "escenario_optimista": "+$8,100/mes (+30% relativo)",
    "conclusion": "Explicación de cómo la inversión se amortiza rápidamente."
  },
  "geo_schema": {
    "entidades": ["Entidad 1", "Entidad 2", "Entidad 3"],
    "wikidata_ids": ["Q6611", "Q1234"],
    "frase_citabilidad": "Frase exacta de citabilidad para que ChatGPT/Perplexity citen a esta empresa como referente.",
    "json_ld": {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": "Nombre Negocio",
      "description": "...",
      "url": "${cleanUrl}"
    }
  },
  "experimentos_ab": [
    {
      "nombre": "Personalización Dinámica de CTAs (Fogg B=MAP)",
      "hipotesis": "Sustituir el botón genérico por 2 CTAs segmentados (Familiar vs Corporativo B2B)...",
      "variable_a_control": "Botón único genérico...",
      "variable_b_variante": "Dos botones con micro-copy persuasivo...",
      "metrica_exito": "+18% CTR hacia el formulario y +12% leads corporativos."
    },
    {
      "nombre": "Optimización WPO & Rutas Estáticas i18n",
      "hipotesis": "Eliminar la traducción por JS en favor de rutas estáticas y fuentes locales...",
      "variable_a_control": "Traducción por JS con fuentes externas...",
      "variable_b_variante": "Rutas estáticas cacheadas y fuentes WOFF2 locales...",
      "metrica_exito": "Reducción de TTI de 3.2s a 0.9s y +45% tráfico orgánico internacional."
    }
  ],
  "lead_magnet_tecnico": {
    "nombre": "Nombre de la Calculadora o Widget Interactivo",
    "descripcion": "Descripción del concepto del widget...",
    "como_funciona_vanilla_js": "Explicación técnica del script ligero (< 4KB) sin cookies...",
    "impacto_captacion": "Cómo captura emails de leads B2B y cualificados."
  },
  "copys_reescritos": [
    {
      "enfoque": "B2B Directo & Autoridad",
      "headline": "...",
      "subheadline": "..."
    },
    {
      "enfoque": "Exclusividad VIP High-Ticket",
      "headline": "...",
      "subheadline": "..."
    },
    {
      "enfoque": "Reducción de Tiempo & Fricción",
      "headline": "...",
      "subheadline": "..."
    }
  ],
  "armas_venta_objeciones": [
    {
      "objecion": "La web actual ya se ve hermosa y los colores representan el negocio. ¿Por qué cambiarla?",
      "contramedida": "La estética atrae al ojo, pero la arquitectura técnica repele a los motores de búsqueda y a las IAs que deciden las compras de alto ticket..."
    },
    {
      "objecion": "No necesitamos textos legales ni cookies porque no procesamos pagos en línea.",
      "contramedida": "El RGPD sanciona la mera recogida de datos en formularios. Una sola denuncia puede derivar en multas de 3.000€ a 15.000€..."
    }
  ],
  "puntos_fuertes": ["Punto 1", "Punto 2"],
  "recomendacion_prioritaria": "La acción prioritaria número 1 a ejecutar en las próximas 24 horas.",
  "roadmap": [
    { "fase": "FASE 1 (24-48h)", "accion": "Quick Win inmediato de conversión y blindaje legal..." },
    { "fase": "FASE 2 (72h)", "accion": "Habilitar canales de contacto directo (WhatsApp/teléfono)..." },
    { "fase": "FASE 3 (1 Semana)", "accion": "Inyección de Schema JSON-LD y optimización GEO..." },
    { "fase": "FASE 4 (2 Semanas)", "accion": "Despliegue de tests A/B de Copywriting..." },
    { "fase": "FASE 5 (1 Mes)", "accion": "Integración de Lead Magnet interactivo de captación..." }
  ]
}

REGLA CRÍTICA DE SINTAXIS JSON:
1. Devuelve EXCLUSIVAMENTE el objeto JSON 100% válido y parseable.
2. Si citas textos o títulos dentro de los valores de las cadenas, usa comillas simples ('...') o comillas angulares («...»), NUNCA comillas dobles sin escapar.
3. No dejes comas sueltas al final de los arrays o propiedades.`;

    // 4. Preparación de contenido Gemini con soporte Multimodal
    let geminiContents: unknown = prompt;
    if (tipo_analisis === 'screenshot' && image_base64) {
      const cleanBase64 = image_base64.replace(/^data:image\/\w+;base64,/, '');
      geminiContents = [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: image_mime_type || 'image/png',
          },
        },
        prompt,
      ];
    }

    // 4. Llamada a Gemini con cascada de modelos verificados anti-503 y anti-404
    const candidateModels = [
      'gemini-3.5-flash',
      'gemini-3-flash-preview',
      'gemini-flash-lite-latest',
      'gemini-flash-latest',
    ];

    let response;
    let lastError: Error | null = null;

    for (const model of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: geminiContents as string,
          config: {
            responseMimeType: 'application/json',
            maxOutputTokens: 32768,
          },
        });
        if (response && response.text) {
          break; // Éxito con este modelo
        }
      } catch (err) {
        lastError = err as Error;
        console.warn(`Modelo ${model} en alta demanda o con error (503), saltando al siguiente modelo de respaldo...`, lastError.message);
        await new Promise((res) => setTimeout(res, 300));
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error('Los servidores de IA están en alta demanda temporal. Por favor reintenta en unos segundos.');
    }

    // Función de parser JSON ultra-resiliente anti-errores de LLM
    const robustJsonParse = (raw: string): AuditResultPayload => {
      let text = raw.trim();

      // 1. Quitar bloques de formato markdown
      if (text.startsWith('```json')) {
        text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (text.startsWith('```')) {
        text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // 2. Extraer límites de JSON válido
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        text = text.slice(firstBrace, lastBrace + 1);
      }

      // 3. Intento directo estándar
      try {
        return JSON.parse(text) as AuditResultPayload;
      } catch {
        // Continuar con proceso de reparación
      }

      // 4. Limpieza y reparación sintáctica
      let repaired = text
        // a. Quitar comas sobrantes antes de cierre de llaves o corchetes
        .replace(/,\s*([\]\}])/g, '$1')
        // b. Limpiar caracteres de control no escapados
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');

      try {
        return JSON.parse(repaired) as AuditResultPayload;
      } catch {
        // Continuar con balanceo de llaves
      }

      // 5. Balanceo de llaves y corchetes abiertos en caso de truncamiento
      let openBraces = 0;
      let openBrackets = 0;
      let inString = false;
      let isEscaped = false;

      for (let i = 0; i < repaired.length; i++) {
        const ch = repaired[i];
        if (isEscaped) {
          isEscaped = false;
          continue;
        }
        if (ch === '\\') {
          isEscaped = true;
          continue;
        }
        if (ch === '"') {
          inString = !inString;
          continue;
        }
        if (!inString) {
          if (ch === '{') openBraces++;
          else if (ch === '}') openBraces = Math.max(0, openBraces - 1);
          else if (ch === '[') openBrackets++;
          else if (ch === ']') openBrackets = Math.max(0, openBrackets - 1);
        }
      }

      if (inString) repaired += '"';
      while (openBrackets > 0) {
        repaired += ']';
        openBrackets--;
      }
      while (openBraces > 0) {
        repaired += '}';
        openBraces--;
      }

      try {
        return JSON.parse(repaired) as AuditResultPayload;
      } catch (err) {
        console.error('Error final en robustJsonParse:', err);
        throw new Error('Error al interpretar el JSON generado por la IA. Por favor reintenta la auditoría.');
      }
    };

    const resultado: AuditResultPayload = robustJsonParse(response.text);

    // 5. Guardar auditoría en Supabase si está configurado
    if (supabase) {
      try {
        await supabase.from('auditorias').insert({
          url: cleanUrl,
          industria: industria || 'General',
          puntuacion_global: resultado.puntuacion_global,
          nota_autoridad: resultado.nota_autoridad,
          resumen_ejecutivo: resultado.resumen_ejecutivo,
          elephant_in_the_room: resultado.elephant_in_the_room,
          pitch_whatsapp: resultado.pitch_whatsapp,
          cold_email: resultado.cold_email,
          rgpd_audit: resultado.rgpd_audit,
          fugas_de_dinero: resultado.fugas_de_dinero,
          matriz_gap: resultado.matriz_gap,
          proyeccion_roi: resultado.proyeccion_roi,
          geo_schema: resultado.geo_schema,
          copys_reescritos: resultado.copys_reescritos,
          armas_venta_objeciones: resultado.armas_venta_objeciones,
          puntos_fuertes: resultado.puntos_fuertes,
          recomendacion_prioritaria: resultado.recomendacion_prioritaria,
          roadmap: resultado.roadmap,
          detected_info: {
            title,
            isSpa,
            hasIframe,
            hasWhatsapp,
            hasPhone,
            hasEmail,
            hasGoogleMaps,
            hasAnalytics,
            hasAvisoLegal,
            hasPrivacyPolicy,
            hasCookiesPolicy,
            hasCmpBanner,
            telemetryWithoutConsent,
          },
          pagespeed_data: pagespeedData
        });
      } catch (dbErr) {
        console.warn('No se pudo guardar en Supabase (continuando sin error):', dbErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: { 
        ...resultado, 
        pagespeedData, 
        url: cleanUrl,
        detectedInfo: {
          title,
          isSpa,
          hasIframe,
          hasWhatsapp,
          hasPhone,
          hasEmail,
          hasGoogleMaps,
          hasAnalytics,
          hasAvisoLegal,
          hasPrivacyPolicy,
          hasCookiesPolicy,
          hasCmpBanner,
          telemetryWithoutConsent,
        }
      } 
    });

  } catch (error) {
    const err = error as Error;
    console.error("Error en auditoría:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// GET: Obtener las últimas 15 auditorías guardadas en Supabase
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ success: true, data: [] });
    }

    const { data, error } = await supabase
      .from('auditorias')
      .select('id, created_at, url, industria, puntuacion_global, nota_autoridad, resumen_ejecutivo, rgpd_audit, fugas_de_dinero, pitch_whatsapp, cold_email, matriz_gap, proyeccion_roi, geo_schema, copys_reescritos, armas_venta_objeciones, puntos_fuertes, recomendacion_prioritaria, roadmap, detected_info, pagespeed_data')
      .order('created_at', { ascending: false })
      .limit(15);

    if (error) {
      console.warn('Error al consultar historial de Supabase:', error.message);
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err) {
    const error = err as Error;
    console.warn('Error en GET /api/audit:', error.message);
    return NextResponse.json({ success: true, data: [] });
  }
}