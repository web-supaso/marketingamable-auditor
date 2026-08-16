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

interface AuditResultPayload {
  puntuacion_global: number;
  nota_autoridad?: string;
  resumen_ejecutivo: string;
  elephant_in_the_room?: string;
  pitch_whatsapp?: string;
  cold_email?: ColdEmail;
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
    frase_citabilidad?: string;
    json_ld?: unknown;
    json_ld_code?: unknown;
  };
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

        $('script, style, noscript, svg').remove();

        title = $('title').first().text().trim() || 'Sin título';
        metaDesc = $('meta[name="description"]').attr('content')?.trim() || 
                   $('meta[property="og:description"]').attr('content')?.trim() || 'Sin descripción';
        ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
        ogDesc = $('meta[property="og:description"]').attr('content')?.trim() || '';

        headings = $('h1, h2, h3').map((_, el) => $(el).text().trim()).get().filter(t => t.length > 0).slice(0, 10);

        const isClientShell = (
          rawLowerHtml.includes('id="root"') || 
          rawLowerHtml.includes('id="app"') || 
          rawLowerHtml.includes('id="__next"') ||
          rawLowerHtml.includes('vite/client') ||
          rawLowerHtml.includes('bundle.js')
        );
        if (isClientShell && html.length < 2500 && headings.length === 0) {
          isSpa = true;
        }

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

        bodyTextSnippet = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 1200);

      } catch (scrapingErr) {
        const err = scrapingErr as Error;
        console.warn('Error al parsear el HTML:', err.message);
        bodyTextSnippet = 'No se pudo parsear completamente el HTML.';
      }
    }

    // 2. Métricas de PageSpeed (Mobile)
    let pagespeedData: { available: boolean; performance?: number; seo?: number; lcp?: string; note?: string } = {
      available: false,
      note: 'Métricas de PageSpeed no aplicables para archivos locales o capturas.',
    };

    if (tipo_analisis === 'url' && url) {
      try {
        const psApiKey = process.env.PAGESPEED_API_KEY ? `&key=${process.env.PAGESPEED_API_KEY}` : '';
        const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(cleanUrl)}&strategy=mobile${psApiKey}`;
        const psRes = await fetch(psUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const psData = await psRes.json();
        
        if (psData.lighthouseResult) {
          const l = psData.lighthouseResult;
          pagespeedData = {
            available: true,
            performance: Math.round((l.categories?.performance?.score || 0) * 100),
            seo: Math.round((l.categories?.seo?.score || 0) * 100),
            lcp: l.audits?.['largest-contentful-paint']?.displayValue || 'N/A',
          };
        }
      } catch {
        console.log("PageSpeed omitido");
      }
    }

    // 3. Prompt Maestro para Gemini
    const speedInfo = pagespeedData.available
      ? `Rendimiento Mobile: ${pagespeedData.performance}/100, SEO Técnico: ${pagespeedData.seo}/100, Tiempo LCP: ${pagespeedData.lcp}`
      : `Datos PageSpeed: No aplicables o estimados por estructura.`;

    const spaContext = isSpa 
      ? `⚠️ ARQUITECTURA: SPA con CSR. El HTML inicial entregado por el servidor llega prácticamente vacío. Sin SSR/SSG pre-renderizado.`
      : `Estructura estándar de servidor detectada.`;

    const iframeContext = (hasIframe || html.includes('<iframe') || html.includes('&lt;iframe'))
      ? `⚠️ ARQUITECTURA IFRAME: Se detecta renderizado o incrustación mediante iframe.`
      : `No se detectan iframes bloqueantes.`;

    const rgpdAuditContext = `
    ⚖️ AUDITORÍA LEGAL & RGPD (UE / AEPD):
    - ¿Tiene enlace visible a Aviso Legal?: ${hasAvisoLegal ? 'Sí' : 'NO (Infracción LSSI Art. 10)'}
    - ¿Tiene enlace a Política de Privacidad?: ${hasPrivacyPolicy ? 'Sí' : 'NO (Infracción RGPD Art. 13/14)'}
    - ¿Tiene enlace a Política de Cookies?: ${hasCookiesPolicy ? 'Sí' : 'NO (Infracción LSSI Art. 22.2)'}
    - ¿Tiene Banner / Plataforma CMP de Cookies detectada?: ${hasCmpBanner ? 'Sí' : 'NO (Infracción crítica si carga telemetría sin consentimiento)'}
    - ¿Carga Analytics/Pixel antes de obtener consentimiento?: ${telemetryWithoutConsent ? 'SÍ, INFRACCIÓN MUY GRAVE' : 'No detectado o bloqueado'}
    `;

    const visualContext = tipo_analisis === 'screenshot' 
      ? `📸 MODO CAPTURA DE PANTALLA (ANÁLISIS CRO MULTIMODAL): Analiza directamente la imagen adjunta. Evalúa la jerarquía visual del titular, contraste de botones CTAs, legibilidad de textos, espacio en blanco, saturación visual, presencia de prueba social y fricción visual para el usuario.`
      : ``;

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
    - Extracto de contenido del sitio: "${bodyTextSnippet.slice(0, 600)}"
    - ${speedInfo}
    - ${spaContext}
    - ${iframeContext}
    ${visualContext}
    ${rgpdAuditContext}
    `;

    const prompt = `Eres un consultor de élite en CRO (Conversión), Transformación Digital, Compliance Legal Web (RGPD / AEPD) y Estrategia Comercial de Alto Valor (Nivel McKinsey / Agencia Élite).
Tu misión es analizar la presencia digital de esta empresa con los datos técnicos, visuales y legales proporcionados y generar un ENTREGABLE INTEGRAL:
1. PITCH DE VENTA RÁPIDO (WhatsApp / Outreach): Directo, educado, sin tecnicismos abrumadores, enfocado en abrir la conversación ofreciendo resolver el problema crítico en menos de 24h.
2. GENERADOR DE COLD EMAIL B2B (Email en frío de élite): 3 asuntos con más del 60% de tasa de apertura estimada (curiosidad, sin palabras de spam), plantilla con estructura AIDA (Atención, Interés, Deseo, Acción) y plantilla con estructura PAS (Problema, Agitación, Solución) con llamada a la acción suave (Soft CTA).
3. INFORME DE AUTORIDAD DIGITAL & TRANSFORMACIÓN 360° (NEXUS v5.0): Una auditoría holística de máxima sofisticación con Matriz GAP, Proyección Financiera de ROI en $, Schema JSON-LD para IAs (GEO), Copys reescritos, Armas contra Objeciones y Roadmap.
4. MÓDULO LEGAL RGPD & SANCIONES AEPD: Diagnóstico riguroso de riesgos de sanción (1.500€ a 30.000€+), identificación de artículos vulnerados y gancho de urgencia comercial para cerrar servicios de compliance y rediseño legal.

DATOS DEL ANÁLISIS:
${webAnalysisData}

INSTRUCCIONES CLAVE:
- Sé implacable y honesto con la nota (0-100 y nota sobre 10).
- Si el título es genérico o la web tiene fallos visuales/técnicos, destácalo como "The Elephant in the Room" (el gran fallo que destruye la credibilidad).
- En Cold Email B2B, redacta asuntos ultra-personalizados y cuerpos hiper-persuasivos pero profesionales.
- En RGPD, evalúa con rigor según la normativa europea (LSSI y RGPD): si falta Aviso Legal, Privacidad, Cookies o si dispara telemetría sin CMP, marca riesgo Alto o Crítico y estima la sanción real.
- En la Proyección de ROI, calcula cifras monetarias en USD realistas para la industria.
- En GEO (SEO para IAs), genera las entidades y el código JSON-LD Schema.org completo y válido.
- En Copys Reescritos, redacta 3 enfoques psicológicos de alto impacto: 1) B2B Directo/Autoridad, 2) Exclusividad VIP High-Ticket, 3) Reducción de Tiempo/Fricción.
- En Armas de Venta, incluye las 2 objeciones más frecuentes del dueño con sus contramedidas letales.

Devuelve estrictamente un JSON válido con esta estructura:
{
  "puntuacion_global": 0-100,
  "nota_autoridad": "X.X / 10",
  "resumen_ejecutivo": "1 o 2 frases contundentes sobre el estado de la web.",
  "elephant_in_the_room": "Explicación del error crítico de negocio y diseño que destruye la credibilidad del cliente.",
  "pitch_whatsapp": "Texto completo y persuasivo listo para copiar y pegar en WhatsApp/Email.",
  "cold_email": {
    "asunto_1": "Asunto de alta apertura 1 (Intriga / Curiosidad)",
    "asunto_2": "Asunto de alta apertura 2 (Impacto en Negocio / Pérdida de clientes)",
    "asunto_3": "Asunto de alta apertura 3 (Personalizado con Nombre/URL)",
    "cuerpo_aida": "Texto completo del email estructurado en AIDA...",
    "cuerpo_pas": "Texto completo del email estructurado en PAS...",
    "llamada_a_la_accion": "¿Tendría sentido que les envíe un breve vídeo de 2 minutos mostrándolo o prefieren revisarlo en una llamada rápida esta semana?"
  },
  "rgpd_audit": {
    "nivel_riesgo": "Crítico" | "Alto" | "Medio" | "Bajo",
    "puntuacion_cumplimiento": 0-100,
    "sancion_estimada_euros": "ej: 3.000€ a 12.000€ (según baremo AEPD)",
    "diagnostico_legal": "Resumen claro del estado de cumplimiento normativo y exposición a multas.",
    "infracciones": [
      {
        "tipo": "Nombre de la infracción",
        "gravedad": "Muy Grave" | "Grave" | "Leve",
        "articulo_legal": "Art. 22.2 LSSI / Art. 13 RGPD...",
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
      "capa": "Privacidad & Telemetría",
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
      "capa": "GEO / Entidades LLM",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    },
    {
      "capa": "Velocidad & Core Web Vitals",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    },
    {
      "capa": "Copywriting de Autoridad",
      "hallazgo": "...",
      "impacto_tecnico": "...",
      "impacto_negocio": "...",
      "solucion": "..."
    }
  ],
  "proyeccion_roi": {
    "trafico_mensual": "ej: 3,000 visitas/mes",
    "ticket_medio": "ej: $1,200",
    "conversion_actual": "ej: 1.0% (30 clientes = $36,000/mes)",
    "escenario_pesimista": "+$1,800/mes (+5% conversión)",
    "escenario_realista": "+$5,400/mes (+15% conversión)",
    "escenario_optimista": "+$10,800/mes (+30% conversión)",
    "conclusion": "Explicación de cómo la inversión se amortiza rápidamente."
  },
  "geo_schema": {
    "entidades": ["Entidad 1", "Entidad 2", "Entidad 3"],
    "frase_citabilidad": "Frase de posicionamiento para que ChatGPT/Perplexity citen a esta empresa como referente.",
    "json_ld": {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Nombre Negocio",
      "description": "...",
      "url": "${cleanUrl}"
    }
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
      "objecion": "Ya captamos clientes por recomendación offline / boca a boca.",
      "contramedida": "El boca a boca inicia la búsqueda, pero el 90% audita la web antes de agendar. Una presencia descuidada es un filtro silencioso que aleja a los clientes más rentables."
    },
    {
      "objecion": "La web se ve bien en mi móvil.",
      "contramedida": "Visualmente puede intuirse, pero técnicamente el contraste y los tiempos de carga penalizan la indexación en Google y expulsan al tráfico frío en los primeros 3 segundos."
    }
  ],
  "puntos_fuertes": ["Punto 1", "Punto 2"],
  "recomendacion_prioritaria": "La acción prioritaria número 1 a ejecutar en las próximas 24 horas.",
  "roadmap": [
    { "fase": "FASE 1 (24-48h)", "accion": "Quick Win inmediato de conversión..." },
    { "fase": "FASE 2 (72h)", "accion": "Corrección de contraste, jerarquía y CTAs..." },
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