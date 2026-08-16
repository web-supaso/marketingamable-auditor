"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Copy, 
  Check, 
  Crown, 
  MessageSquare, 
  DollarSign, 
  Code2, 
  ShieldAlert, 
  Sparkles, 
  FileText,
  Scale,
  XCircle,
  Mail,
  Send,
  ExternalLink,
  History,
  Clock,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Globe,
  FileCode,
  Camera,
  Upload,
  X,
  Image as ImageIcon,
  Printer,
  Download,
  PhoneCall,
  Presentation,
  ChevronLeft,
  ChevronRight,
  Calculator,
  ShieldCheck
} from 'lucide-react';

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

interface AuditResult {
  id?: string;
  created_at?: string;
  url: string;
  industria?: string;
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
  detectedInfo?: {
    title?: string;
    isSpa?: boolean;
    hasIframe?: boolean;
    hasWhatsapp?: boolean;
    hasPhone?: boolean;
    hasEmail?: boolean;
    hasGoogleMaps?: boolean;
    hasAnalytics?: boolean;
    hasAvisoLegal?: boolean;
    hasPrivacyPolicy?: boolean;
    hasCookiesPolicy?: boolean;
    hasCmpBanner?: boolean;
    telemetryWithoutConsent?: boolean;
  };
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [inputMode, setInputMode] = useState<'url' | 'html_file' | 'screenshot'>('url');
  const [url, setUrl] = useState('');
  const [htmlFileName, setHtmlFileName] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState('');
  const [screenshotBase64, setScreenshotBase64] = useState('');
  const [screenshotMime, setScreenshotMime] = useState('image/png');

  const [industria, setIndustria] = useState('Clínica Dental / Salud');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'outreach' | 'perdidas' | 'guion' | 'nexus' | 'growth' | 'rgpd'>('outreach');
  const [outreachSubTab, setOutreachSubTab] = useState<'email_1' | 'email_2' | 'antiban' | 'whatsapp'>('email_1');
  const [showPresentation, setShowPresentation] = useState(false);
  const [presentationSlide, setPresentationSlide] = useState(0);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [historial, setHistorial] = useState<AuditResult[]>([]);

  useEffect(() => {
    let isMounted = true;
    const authStatus = typeof window !== 'undefined' ? localStorage.getItem('mkt_intranet_auth') : null;
    
    if (authStatus === 'true') {
      setTimeout(() => {
        if (isMounted) {
          setIsAuthenticated(true);
          setCheckingAuth(false);
        }
      }, 0);

      fetch('/api/audit')
        .then((res) => res.json())
        .then((json) => {
          if (isMounted && json.success && Array.isArray(json.data)) {
            setHistorial(json.data as AuditResult[]);
          }
        })
        .catch(() => {});
    } else {
      setTimeout(() => {
        if (isMounted) setCheckingAuth(false);
      }, 0);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) return;
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('mkt_intranet_auth', 'true');
        setIsAuthenticated(true);
        refreshHistorial();
      } else {
        setLoginError(data.error || 'Clave de acceso incorrecta');
      }
    } catch {
      setLoginError('Error al conectar con el servidor de autenticación');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mkt_intranet_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const refreshHistorial = () => {
    fetch('/api/audit')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setHistorial(json.data as AuditResult[]);
        }
      })
      .catch(() => {});
  };

  const [isDragging, setIsDragging] = useState(false);

  const processHtmlFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
      setError('Por favor, sube un archivo con extensión .html o .htm');
      return;
    }
    setError('');
    setHtmlFileName(file.name);
    if (!url) setUrl(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setHtmlContent((event.target?.result as string) || '');
    };
    reader.readAsText(file);
  };

  const processScreenshotFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Por favor, sube un archivo de imagen válido (PNG, JPG, WebP)');
      return;
    }
    setError('');
    setScreenshotMime(file.type || 'image/png');
    if (!url) setUrl(file.name ? file.name.replace(/\.[^/.]+$/, '') : 'Captura de Pantalla');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = (event.target?.result as string) || '';
      setScreenshotPreview(result);
      setScreenshotBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleHtmlFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processHtmlFile(file);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processScreenshotFile(file);
  };

  const handleHtmlDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processHtmlFile(file);
  };

  const handleScreenshotDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processScreenshotFile(file);
  };

  useEffect(() => {
    const handleWindowPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            setInputMode('screenshot');
            processScreenshotFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handleWindowPaste);
    return () => window.removeEventListener('paste', handleWindowPaste);
  }, []);

  const clearHtmlFile = () => {
    setHtmlFileName('');
    setHtmlContent('');
  };

  const clearScreenshot = () => {
    setScreenshotPreview('');
    setScreenshotBase64('');
  };

  const handleAudit = async () => {
    if (inputMode === 'url' && !url.trim()) return;
    if (inputMode === 'html_file' && !htmlContent.trim()) {
      setError('Por favor, selecciona o sube un archivo .html para auditar.');
      return;
    }
    if (inputMode === 'screenshot' && !screenshotBase64) {
      setError('Por favor, sube una captura de pantalla para auditar con IA Vision.');
      return;
    }

    setLoading(true);
    setError('');
    setResultado(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: url.trim(), 
          industria,
          tipo_analisis: inputMode,
          html_content: htmlContent,
          image_base64: screenshotBase64,
          image_mime_type: screenshotMime
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResultado(data.data as AuditResult);
        setActiveTab('outreach');
        refreshHistorial();
      } else {
        setError(data.error || 'Error al procesar el análisis.');
      }
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj?.message || 'Error de conexión con el servidor. Revisa tu API Key de Gemini.');
    } finally {
      setLoading(false);
    }
  };

  const seleccionarDelHistorial = (audit: AuditResult) => {
    setResultado(audit);
    setUrl(audit.url || '');
    if (audit.industria) setIndustria(audit.industria);
    setActiveTab('outreach');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const pitchText = resultado?.pitch_whatsapp || (resultado ? `Hola, estuve revisando su web (${resultado.url}) y noté un par de detalles que podrían estar frenando sus consultas. 

📊 Puntuación de conversión: ${resultado.puntuacion_global}/100
💡 Resumen: ${resultado.resumen_ejecutivo}

🔴 Fugas detectadas:
${resultado.fugas_de_dinero?.map((f: FugaDinero, i: number) => `${i + 1}. *${f.titulo}*: ${f.impacto_negocio}`).join('\n') || ''}

✅ Puntos fuertes: ${resultado.puntos_fuertes?.join(', ') || ''}

Soy desarrollador web y puedo solucionar la "Recomendación Prioritaria" (${resultado.recomendacion_prioritaria || ''}) en menos de 24 horas. ¿Les gustaría que les envíe una propuesta sin compromiso?` : '');

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(pitchText)}`;
  const mailSubject = resultado?.cold_email?.asunto_1 || `Una duda rápida sobre ${url}`;
  const mailBody = resultado?.cold_email?.cuerpo_aida || pitchText;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  const generateFullMarkdownDossier = (res: AuditResult): string => {
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    return `# 🌿 DOSSIER DE AUDITORÍA DIGITAL 360° & DIAGNÓSTICO COMERCIAL
**Cliente / URL:** ${res.url}
**Sector / Industria:** ${res.industria || 'General'}
**Fecha de Diagnóstico:** ${fecha}
**Auditoría Realizada por:** Marketing Amable (Intranet Oficial)

---

## 📊 1. RESUMEN EJECUTIVO & PUNTUACIÓN DE CONVERSIÓN
- **Puntuación Global de Conversión:** ${res.puntuacion_global}/100
- **Nota de Autoridad:** ${res.nota_autoridad || `${(res.puntuacion_global / 10).toFixed(1)} / 10`}
- **Diagnóstico:** ${res.resumen_ejecutivo}

${res.elephant_in_the_room ? `> 🐘 **THE ELEPHANT IN THE ROOM (Error Crítico Detectado):**\n> ${res.elephant_in_the_room}\n` : ''}

---

## ⚖️ 2. MÓDULO LEGAL RGPD & RIESGO SANCIONADOR (AEPD / UE)
- **Nivel de Riesgo Legal:** ${res.rgpd_audit?.nivel_riesgo || 'Medio'}
- **Puntuación de Cumplimiento:** ${res.rgpd_audit?.puntuacion_cumplimiento || 0}/100
- **Estimación Sancionadora:** ${res.rgpd_audit?.sancion_estimada_euros || 'N/A'}
- **Diagnóstico Legal:** ${res.rgpd_audit?.diagnostico_legal || 'N/A'}
- **Gancho de Urgencia Comercial:** ${res.rgpd_audit?.gancho_urgencia_comercial || 'N/A'}

### Checklist de Cumplimiento Técnico:
- Aviso Legal: ${res.rgpd_audit?.elementos_detectados?.tiene_aviso_legal ? '✅ Implementado' : '❌ NO DETECTADO (Infracción LSSI)'}
- Política de Privacidad: ${res.rgpd_audit?.elementos_detectados?.tiene_politica_privacidad ? '✅ Implementado' : '❌ NO DETECTADO (Infracción RGPD)'}
- Política de Cookies: ${res.rgpd_audit?.elementos_detectados?.tiene_politica_cookies ? '✅ Implementado' : '❌ NO DETECTADO'}
- Banner CMP de Consentimiento: ${res.rgpd_audit?.elementos_detectados?.tiene_banner_cmp ? '✅ Implementado' : '❌ NO DETECTADO'}
- Telemetría sin Consentimiento: ${res.rgpd_audit?.elementos_detectados?.telemetria_sin_bloqueo ? '⚠️ INFRACCIÓN: Scripts de rastreo cargados antes de consentimiento' : '✅ Sin fugas de telemetría'}

${res.rgpd_audit?.infracciones && res.rgpd_audit.infracciones.length > 0 ? `### Infracciones Específicas Detectadas:\n` + res.rgpd_audit.infracciones.map((inf, i) => `${i + 1}. **${inf.tipo}** (${inf.gravedad}) - *${inf.articulo_legal}*\n   - Explicación: ${inf.explicacion}\n   - Solución: ${inf.como_solucionarlo}`).join('\n\n') : ''}

---

## 📉 3. CALCULADORA DE DINERO PERDIDO AL MES (Fuga Financiera Oculta)
- **Pérdida Mensual Estimada:** ${res.calculadora_perdidas?.perdida_estimada_mensual || 'N/A'}
- **Impacto Anual Proyectado:** ${res.calculadora_perdidas?.impacto_anual || 'N/A'}
${res.calculadora_perdidas?.motivos_fuga && res.calculadora_perdidas.motivos_fuga.length > 0 ? `### Motivos Principales de Fuga:\n` + res.calculadora_perdidas.motivos_fuga.map((m, i) => `${i + 1}. ${m}`).join('\n') : ''}

---

## 🛡️ 4. ESTRATEGIA DE PROSPECCIÓN SEGURA & COLD EMAILS (ANTI-BAN WHATSAPP)

### A. Secuencia de Cold Emails (Contacto Seguro por Correo):
- **Asunto 1 (Intriga):** ${res.cold_email?.asunto_1 || ''}
- **Asunto 2 (Negocio):** ${res.cold_email?.asunto_2 || ''}
- **Asunto 3 (Personalizado):** ${res.cold_email?.asunto_3 || ''}

#### Email 1 (Estructura AIDA):
${res.cold_email?.cuerpo_aida || ''}

#### Email 1 Alternativo (Estructura PAS):
${res.cold_email?.cuerpo_pas || ''}

- **Llamada a la Acción (Soft CTA):** ${res.cold_email?.llamada_a_la_accion || ''}

${res.cold_email?.email_seguimiento_48h ? `#### Email 2 (Seguimiento Amable a las 48h):
**Asunto:** ${res.cold_email.email_seguimiento_48h.asunto}
${res.cold_email.email_seguimiento_48h.cuerpo}\n` : ''}
### B. Protocolo de Transición Segura a WhatsApp ("Agéndanos"):
> ⚠️ **Nota de Seguridad Anti-Ban:** Para evitar suspensiones de WhatsApp Business, solicita al prospecto que guarde tu contacto en su agenda antes de enviarle archivos o notas de voz.
\`\`\`text
${res.cold_email?.protocolo_antiban_whatsapp || '¡Hola! Para poder compartirte capturas y el documento por WhatsApp sin que el sistema bloquee los enlaces, por favor añade nuestro contacto a tu agenda telefónica.'}
\`\`\`

### C. Pitch de WhatsApp (Una vez agendados):
\`\`\`text
${res.pitch_whatsapp || ''}
\`\`\`

---

## 🔴 5. FUGAS DE DINERO & CONVERSIÓN
${res.fugas_de_dinero?.map((f, i) => `${i + 1}. **${f.titulo}**\n   - **Impacto:** ${f.impacto_negocio}\n   - **Solución Propuesta:** ${f.solucion_simple}`).join('\n\n') || 'Ninguna fuga crítica detectada.'}

---

## 🎯 6. MATRIZ GAP DE TRANSFORMACIÓN DIGITAL 360°
| Capa de Análisis | Hallazgo Crítico | Impacto Técnico | Impacto en Negocio ($) | Solución Propuesta |
| :--- | :--- | :--- | :--- | :--- |
${res.matriz_gap?.map(g => `| **${g.capa}** | ${g.hallazgo || g.hallazgo_critico || ''} | ${g.impacto_tecnico || ''} | ${g.impacto_negocio_dolares || g.impacto_negocio || ''} | ${g.solucion || g.solucion_propuesta || ''} |`).join('\n') || ''}

---

## 💰 7. PROYECCIÓN FINANCIERA DE ROI ESTIMADO
- **Tráfico Estimado:** ${res.proyeccion_roi?.trafico_mensual || 'N/A'}
- **Ticket Medio:** ${res.proyeccion_roi?.ticket_medio || 'N/A'}
- **Conversión Actual:** ${res.proyeccion_roi?.conversion_actual || 'N/A'}
- **Escenario Conservador:** ${res.proyeccion_roi?.escenario_pesimista || 'N/A'}
- **Escenario Realista:** ${res.proyeccion_roi?.escenario_realista || 'N/A'}
- **Escenario Óptimo:** ${res.proyeccion_roi?.escenario_optimista || 'N/A'}
- **Conclusión Financiera:** ${res.proyeccion_roi?.conclusion || 'N/A'}

---

## 🤖 8. GEO & POSICIONAMIENTO EN MOTORES DE IA (SCHEMA.ORG)
- **Entidades Clave:** ${res.geo_schema?.entidades?.join(', ') || 'N/A'}
${res.geo_schema?.wikidata_ids && res.geo_schema.wikidata_ids.length > 0 ? `- **Wikidata IDs:** ${res.geo_schema.wikidata_ids.join(', ')}\n` : ''}- **Frase de Citabilidad para LLMs:** "${res.geo_schema?.frase_citabilidad || 'N/A'}"
- **Estructura JSON-LD:**
\`\`\`json
${JSON.stringify(res.geo_schema?.json_ld || {}, null, 2)}
\`\`\`

---

${res.experimentos_ab && res.experimentos_ab.length > 0 ? `## 🧪 9. HIPÓTESIS DE TESTING A/B VALIDABLES
${res.experimentos_ab.map((exp: ExperimentoAB, i: number) => `### Experimento A/B ${i + 1}: ${exp.nombre}
- **Hipótesis:** ${exp.hipotesis}
- **Variable A (Control):** ${exp.variable_a_control}
- **Variable B (Variante):** ${exp.variable_b_variante}
- **Métrica de Éxito Estimada:** ${exp.metrica_exito}`).join('\n\n')}

---
` : ''}${res.lead_magnet_tecnico ? `## 🔌 10. PROPUESTA DE LEAD MAGNET TÉCNICO INTERACTIVO ("Widget de Amabilidad Digital")
### "${res.lead_magnet_tecnico.nombre}"
${res.lead_magnet_tecnico.descripcion}

- **Funcionamiento Técnico:** ${res.lead_magnet_tecnico.como_funciona_vanilla_js}
- **Impacto en Captación:** ${res.lead_magnet_tecnico.impacto_captacion}

---
` : ''}## ✍️ 11. COPYS REESCRITOS DE ALTO IMPACTO
${res.copys_reescritos?.map((c, i) => `### Enfoque ${i + 1}: ${c.enfoque}\n- **Titular:** "${c.headline}"\n- **Subtitular:** "${c.subheadline}"`).join('\n\n') || ''}

---

## 🛡️ 12. ARMAS CONTRA OBJECIONES DEL CLIENTE
${res.armas_venta_objeciones?.map((a, i) => `${i + 1}. **Objeción:** "${a.objecion || a.objecion_cliente || ''}"\n   - **Contramedida Persuasiva:** ${a.contramedida || a.contramedida_persuasiva || ''}`).join('\n\n') || ''}

---

## 🗺️ 13. ROADMAP DE IMPLEMENTACIÓN EN 5 FASES
${res.roadmap?.map((r) => `- **${r.fase}:** ${r.accion}`).join('\n') || ''}

---

${res.guion_llamada ? `## 📞 14. GUIÓN CONSULTIVO DE VIDEOLLAMADA / CIERRE (15 MINUTOS)
- **Minuto 0 a 3 (Apertura Empática):** ${res.guion_llamada.min_0_3_apertura}
- **Minuto 3 a 8 (Demostración de Fugas sin Culpar):** ${res.guion_llamada.min_3_8_demostracion}
- **Minuto 8 a 12 (Presentación de Solución Amable):** ${res.guion_llamada.min_8_12_solucion}
- **Minuto 12 a 15 (Cierre de Presupuesto con ROI):** ${res.guion_llamada.min_12_15_cierre}

---
` : ''}*© ${new Date().getFullYear()} Marketing Amable • Diseñado con pasión por Marketing Amable v.08*
`;
  };

  const handleCopyFullDossier = () => {
    if (!resultado) return;
    const markdown = generateFullMarkdownDossier(resultado);
    navigator.clipboard.writeText(markdown);
    setCopiedSection('full_dossier');
    setTimeout(() => setCopiedSection(null), 3000);
  };

  const handleDownloadMarkdown = () => {
    if (!resultado) return;
    const markdown = generateFullMarkdownDossier(resultado);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const urlBlob = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (resultado.url || 'auditoria')
      .replace(/^https?:\/\//, '')
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 45);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = urlBlob;
    link.download = `Auditoria_360_${safeName}_${dateStr}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(urlBlob);
  };

  const handlePrintPdf = () => {
    if (!resultado) return;
    const prevTitle = document.title;
    const safeClient = (resultado.url || 'cliente')
      .replace(/^https?:\/\//, '')
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 45);
    const dateStr = new Date().toISOString().slice(0, 10);
    document.title = `Auditoria_360_${safeClient}_${dateStr}_MarketingAmable`;
    window.print();
    setTimeout(() => {
      document.title = prevTitle;
    }, 2000);
  };

  // 1. Estado de carga de sesión inicial
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#D8F3DC]" size={32} />
      </div>
    );
  }

  // 2. Pantalla de Bloqueo / Login Intranet
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-slate-100 flex flex-col justify-between font-sans selection:bg-[#D8F3DC] selection:text-[#0D0D0D]">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#121212] p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            <div className="text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/40 border border-[#1B4332] text-[#D8F3DC] text-[11px] font-bold uppercase tracking-wider mb-3">
                <Image src="/002.gif" alt="Marketing Amable" width={18} height={18} className="h-4 w-auto" unoptimized />
                <span>Intranet Privada</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 mb-2">
                <span className="text-2xl font-black tracking-tight" style={{ color: '#FFFFFF' }}>MARKETING</span>
                <span className="text-2xl font-black tracking-tight" style={{ color: '#D8F3DC' }}>AMABLE</span>
              </div>

              <h2 className="text-lg font-bold text-white">Auditor Comercial & Autoridad 360°</h2>
              <p className="text-xs text-slate-400 mt-1">
                Ingresa tu clave de acceso para desbloquear el generador de auditorías y prospección.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Clave de Acceso Intranet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Escribe tu contraseña..."
                    className="w-full pl-10 pr-10 py-3 bg-[#0D0D0D] border border-white/15 text-white rounded-xl focus:ring-2 focus:ring-[#D8F3DC] focus:border-transparent outline-none transition text-sm"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading || !passwordInput}
                className="w-full bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] font-extrabold py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#D8F3DC]/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="animate-spin text-[#0D0D0D]" size={16} />
                    <span>Verificando acceso...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Ingresar a la Intranet</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-[11px] text-slate-500">
              Uso exclusivo para el equipo de Marketing Amable.
            </div>
          </div>
        </div>

        {/* Footer Oficial */}
        <footer className="w-full border-t border-white/10 py-5 bg-[#0D0D0D]">
          <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>&copy; {new Date().getFullYear()} Marketing Amable. Todos los derechos reservados.</div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Diseñado con pasión por</span>
              <a 
                href="https://www.marketingamable.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/15 transition-all align-middle shadow-sm"
              >
                <Image src="/002.gif" alt="Marketing Amable" width={20} height={20} className="h-5 w-auto" unoptimized />
                <span className="footer-marketing-span" style={{ color: '#FFFFFF', fontWeight: 800 }}>MARKETING</span>
                <span className="footer-amable-span" style={{ color: '#D8F3DC', fontWeight: 800 }}>AMABLE</span>
              </a>
              <span className="text-[10px] text-slate-500 font-mono tracking-tight">v.08</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // 3. Panel Principal Autenticado
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100 flex flex-col font-sans selection:bg-[#D8F3DC] selection:text-[#0D0D0D]">
      
      {/* Barra Superior de Sesión */}
      <div className="w-full bg-[#121212]/80 backdrop-blur border-b border-white/10 px-4 md:px-8 py-2.5 flex items-center justify-between text-xs no-print">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Sesión Activa en Intranet</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-slate-400 hover:text-rose-300 transition cursor-pointer px-2.5 py-1 rounded-lg hover:bg-white/5"
        >
          <LogOut size={13} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
        
        {/* Header Hero Branding Oficial */}
        <header className="mb-10 text-center flex flex-col items-center no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/40 border border-[#1B4332] text-[#D8F3DC] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Image src="/002.gif" alt="Marketing Amable" width={20} height={20} className="h-5 w-auto" unoptimized />
            <span>Auditor Comercial & Autoridad 360°</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#FFFFFF' }}>MARKETING</span>
            <span className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: '#D8F3DC' }}>AMABLE</span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-slate-300 tracking-normal mb-3 max-w-xl">
            Diagnóstico de <span className="text-[#D8F3DC] underline decoration-[#1B4332] underline-offset-4">Fugas de Dinero & Conversión</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Convierte datos técnicos y legales en argumentos de venta letales: de WhatsApp y Cold Email al cierre de presupuestos de consultoría.
          </p>
        </header>

        {/* Formulario de Entrada */}
        <div className="bg-[#121212] p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 mb-8 no-print">
          
          {/* Selector de Modo de Análisis (3 Opciones) */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
              Modalidad de Diagnóstico
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1 bg-[#0D0D0D] rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                  inputMode === 'url'
                    ? 'bg-[#1B4332] text-[#D8F3DC] shadow-sm border border-[#D8F3DC]/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Globe size={15} />
                <span>1. URL en Vivo</span>
              </button>

              <button
                type="button"
                onClick={() => setInputMode('html_file')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                  inputMode === 'html_file'
                    ? 'bg-[#1B4332] text-[#D8F3DC] shadow-sm border border-[#D8F3DC]/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <FileCode size={15} />
                <span>2. Archivo index.html</span>
              </button>

              <button
                type="button"
                onClick={() => setInputMode('screenshot')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                  inputMode === 'screenshot'
                    ? 'bg-[#1B4332] text-[#D8F3DC] shadow-sm border border-[#D8F3DC]/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Camera size={15} />
                <span>3. Captura / IA Vision</span>
              </button>
            </div>
          </div>

          {/* Campos dinámicos según el modo */}
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <div className="md:col-span-2">
              {inputMode === 'url' && (
                <>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    URL del Negocio / Cliente Prospecto
                  </label>
                  <input 
                    type="text" 
                    placeholder="ej: clinicadental.com o https://..." 
                    className="w-full p-3.5 bg-[#0D0D0D] border border-white/15 text-white rounded-xl focus:ring-2 focus:ring-[#D8F3DC] focus:border-transparent outline-none transition font-mono text-sm"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                  />
                </>
              )}

              {inputMode === 'html_file' && (
                <>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Cargar Archivo index.html (Drag & Drop o Explorar)
                  </label>
                  {htmlFileName ? (
                    <div className="flex items-center justify-between p-3.5 bg-[#0D0D0D] border border-emerald-500/40 rounded-xl">
                      <div className="flex items-center gap-3 text-sm text-emerald-300 font-mono overflow-hidden">
                        <div className="p-2 rounded-lg bg-[#1B4332] text-[#D8F3DC]">
                          <FileCode size={20} />
                        </div>
                        <div className="truncate">
                          <span className="font-semibold block truncate text-white">{htmlFileName}</span>
                          <span className="text-[10px] text-emerald-400">Archivo HTML listo para auditar</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearHtmlFile}
                        className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
                        title="Eliminar archivo"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <label 
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleHtmlDrop}
                      className={`flex flex-col items-center justify-center p-6 bg-[#0D0D0D] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 group ${
                        isDragging 
                          ? 'border-[#D8F3DC] bg-[#1B4332]/30 scale-[1.01] ring-2 ring-[#D8F3DC]/40' 
                          : 'border-white/15 hover:border-[#D8F3DC]/60 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#1B4332] text-slate-300 group-hover:text-[#D8F3DC] transition mb-2">
                        <Upload size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-200 group-hover:text-[#D8F3DC] text-center">
                        Arrastra y suelta aquí tu archivo <span className="underline decoration-[#D8F3DC]">index.html</span> o .htm
                      </span>
                      <span className="text-xs text-slate-400 mt-1 text-center">
                        o haz clic para buscarlo en tu ordenador
                      </span>
                      <input 
                        type="file" 
                        accept=".html,.htm" 
                        className="hidden" 
                        onChange={handleHtmlFileUpload} 
                      />
                    </label>
                  )}
                </>
              )}

              {inputMode === 'screenshot' && (
                <>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Captura de Pantalla (Drag & Drop, Explorar o Ctrl + V)
                  </label>
                  {screenshotPreview ? (
                    <div className="flex items-center justify-between p-3 bg-[#0D0D0D] border border-emerald-500/40 rounded-xl">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img 
                          src={screenshotPreview} 
                          alt="Screenshot Preview" 
                          className="h-14 w-24 object-cover rounded-lg border border-white/20 shrink-0 shadow-sm" 
                        />
                        <div className="text-xs truncate">
                          <span className="text-white font-bold block truncate">Captura Cargada con Éxito</span>
                          <span className="text-[11px] text-emerald-400 font-mono">Lista para análisis de IA Vision</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearScreenshot}
                        className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
                        title="Eliminar imagen"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <label 
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleScreenshotDrop}
                      className={`flex flex-col items-center justify-center p-6 bg-[#0D0D0D] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 group ${
                        isDragging 
                          ? 'border-[#D8F3DC] bg-[#1B4332]/30 scale-[1.01] ring-2 ring-[#D8F3DC]/40' 
                          : 'border-white/15 hover:border-[#D8F3DC]/60 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#1B4332] text-slate-300 group-hover:text-[#D8F3DC] transition mb-2">
                        <Camera size={24} />
                      </div>
                      <span className="text-sm font-bold text-slate-200 group-hover:text-[#D8F3DC] text-center">
                        Arrastra y suelta tu captura (<span className="text-[#D8F3DC]">PNG, JPG, WebP</span>)
                      </span>
                      <span className="text-xs text-slate-400 mt-1 text-center">
                        o haz clic para explorar • <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">Ctrl + V</kbd> para pegar directo
                      </span>
                      <input 
                        type="file" 
                        accept="image/png,image/jpeg,image/jpg,image/webp" 
                        className="hidden" 
                        onChange={handleScreenshotUpload} 
                      />
                    </label>
                  )}
                </>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Industria / Nicho
              </label>
              <select 
                className="w-full p-3.5 bg-[#0D0D0D] border border-white/15 text-white rounded-xl focus:ring-2 focus:ring-[#D8F3DC] outline-none transition cursor-pointer text-sm"
                value={industria}
                onChange={(e) => setIndustria(e.target.value)}
              >
                <option>🏨 Turismo / Eventos / Experiencias VIP / Glamping</option>
                <option>🩺 Clínica Dental / Medicina / Salud</option>
                <option>💼 Consultoría B2B / Servicios High-Ticket</option>
                <option>🛒 Comercio / Tienda Online / E-Commerce</option>
                <option>🍽️ Restaurante / Hostelería / Gastronomía</option>
                <option>⚖️ Despacho Legal / Asesoría / Contable</option>
                <option>🏡 Inmobiliaria / Real Estate / Promotoras</option>
                <option>🔨 Reformas / Construcción / Hogar / Arquitectura</option>
                <option>👗 Moda / Estilo de Vida / Decoración</option>
                <option>💆 Estética / Belleza / Spa / Cuidado Personal</option>
                <option>🚀 SaaS / Software / Producto Digital</option>
                <option>🎓 Formación / Infoproductos / Creadores / Coaching</option>
                <option>🏋️ Fitness / Gimnasios / Entrenadores Personales</option>
                <option>🚗 Automoción / Concesionarios / Talleres</option>
                <option>🐾 Veterinaria / Mascotas / Cuidado Animal</option>
                <option>🏭 Industria / Manufactura / Distribución B2B</option>
                <option>💍 Joyería / Arte / Lujo & Exclusividad</option>
                <option>🌱 ONG / Institucional / Eco-Tech & Sostenibilidad</option>
                <option>🌐 General / Otra Industria</option>
              </select>
            </div>
          </div>

          {/* Historial Reciente de Supabase */}
          {historial.length > 0 && (
            <div className="mb-5 p-3.5 bg-[#0D0D0D] rounded-xl border border-white/10">
              <div className="flex items-center justify-between gap-2 mb-2 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5 text-[#D8F3DC]">
                  <History size={14} /> Auditorías Guardadas ({historial.length})
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Clock size={11} /> Clic para recargar sin gastar tokens
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {historial.map((h, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => seleccionarDelHistorial(h)}
                    className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition cursor-pointer"
                  >
                    <span className="font-mono text-slate-200">{h.url.replace(/^https?:\/\//, '')}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      h.puntuacion_global >= 70 ? 'bg-emerald-950 text-emerald-300' :
                      h.puntuacion_global >= 40 ? 'bg-amber-950 text-amber-300' : 'bg-rose-950 text-rose-300'
                    }`}>
                      {h.puntuacion_global}/100
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <button 
            onClick={handleAudit}
            disabled={
              loading || 
              (inputMode === 'url' && !url.trim()) ||
              (inputMode === 'html_file' && !htmlContent.trim()) ||
              (inputMode === 'screenshot' && !screenshotBase64)
            }
            className="w-full bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] font-extrabold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#D8F3DC]/10 disabled:opacity-50 disabled:cursor-not-allowed text-base cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin text-[#0D0D0D]" size={20} /> 
                <span>
                  {inputMode === 'url' && 'Ejecutando diagnóstico 360° con IA y escaneo legal...'}
                  {inputMode === 'html_file' && 'Analizando estructura HTML local y RGPD con IA...'}
                  {inputMode === 'screenshot' && 'Analizando diseño visual, CTAs y conversión con Gemini Vision...'}
                </span>
              </>
            ) : (
              <>
                <Sparkles size={20} className="text-[#0D0D0D]" />
                <span>
                  {inputMode === 'url' && 'Generar Auditoría & Estrategia Comercial'}
                  {inputMode === 'html_file' && 'Auditar Archivo HTML Local'}
                  {inputMode === 'screenshot' && 'Auditar Captura con IA Vision'}
                </span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/60 text-rose-300 p-5 rounded-xl mb-8 border border-rose-800 flex items-start gap-3 no-print">
            <AlertTriangle className="text-rose-400 shrink-0 mt-0.5" size={20} />
            <div>
              <div className="font-bold">Error en la auditoría</div>
              <div className="text-sm opacity-90">{error}</div>
            </div>
          </div>
        )}

        {/* Dashboard de Resultados */}
        {resultado && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 no-print">
            
            {/* Header del Reporte */}
            <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  <span>Reporte Generado</span> • <span className="text-[#D8F3DC]">{industria}</span>
                </div>
                <h2 className="text-2xl font-black text-white">{resultado.url}</h2>
                {resultado.detectedInfo?.title && (
                  <p className="text-sm text-slate-400 mt-1">Título detectado: <span className="text-slate-300 font-mono">&ldquo;{resultado.detectedInfo.title}&rdquo;</span></p>
                )}
              </div>

              <div className="flex items-center gap-4 bg-[#0D0D0D] px-6 py-4 rounded-xl border border-white/10 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Score Conversión</div>
                  <div className="text-xs text-[#D8F3DC] font-medium">Nota: {resultado.nota_autoridad || `${(resultado.puntuacion_global / 10).toFixed(1)} / 10`}</div>
                </div>
                <div className={`text-4xl font-black ${
                  resultado.puntuacion_global >= 70 ? 'text-emerald-400' : 
                  resultado.puntuacion_global >= 40 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {resultado.puntuacion_global}<span className="text-xl text-slate-500 font-normal">/100</span>
                </div>
              </div>
            </div>

            {/* Suite de Exportación Integral en 1 Clic */}
            <div className="bg-[#121212] border border-[#D8F3DC]/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-[#D8F3DC]/5 no-print">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="font-bold text-white">Suite de Exportación del Dossier Completo</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <button
                  onClick={() => { setPresentationSlide(0); setShowPresentation(true); }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] text-xs font-bold transition shadow-sm cursor-pointer"
                  title="Abrir presentación visual en diapositivas para videollamada"
                >
                  <Presentation size={15} />
                  <span>Presentación (Slides)</span>
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition border border-white/15 cursor-pointer"
                  title="Imprimir o Guardar como PDF corporativo"
                >
                  <Printer size={15} className="text-[#D8F3DC]" />
                  <span>Descargar PDF</span>
                </button>

                <button
                  onClick={handleCopyFullDossier}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2d6a4f] text-[#D8F3DC] text-xs font-bold transition border border-[#D8F3DC]/30 cursor-pointer"
                  title="Copiar todo el informe formateado para Notion, Google Docs o Word"
                >
                  {copiedSection === 'full_dossier' ? (
                    <>
                      <Check size={15} className="text-[#D8F3DC]" />
                      <span>¡Dossier Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} className="text-[#D8F3DC]" />
                      <span>Copiar Dossier Completo</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition border border-white/15 cursor-pointer"
                  title="Descargar archivo Markdown .md"
                >
                  <Download size={15} className="text-[#D8F3DC]" />
                  <span>Descargar .MD</span>
                </button>
              </div>
            </div>

            {/* Selector de Pestañas Principales */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2 no-print">
              <button
                onClick={() => setActiveTab('outreach')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
                  activeTab === 'outreach'
                    ? 'bg-[#D8F3DC] text-[#0D0D0D] shadow-md shadow-[#D8F3DC]/10'
                    : 'bg-[#121212] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mail size={16} />
                <span>1. Prospección Segura & Emails</span>
              </button>

              <button
                onClick={() => setActiveTab('perdidas')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
                  activeTab === 'perdidas'
                    ? 'bg-[#D8F3DC] text-[#0D0D0D] shadow-md shadow-[#D8F3DC]/10'
                    : 'bg-[#121212] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calculator size={16} />
                <span>2. Dinero Perdido al Mes</span>
              </button>

              <button
                onClick={() => setActiveTab('guion')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
                  activeTab === 'guion'
                    ? 'bg-[#D8F3DC] text-[#0D0D0D] shadow-md shadow-[#D8F3DC]/10'
                    : 'bg-[#121212] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <PhoneCall size={16} />
                <span>3. Guión Llamada (15 Min)</span>
              </button>

              <button
                onClick={() => setActiveTab('nexus')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
                  activeTab === 'nexus'
                    ? 'bg-[#D8F3DC] text-[#0D0D0D] shadow-md shadow-[#D8F3DC]/10'
                    : 'bg-[#121212] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Crown size={16} />
                <span>4. Informe Autoridad (GAP 360°)</span>
              </button>

              <button
                onClick={() => setActiveTab('growth')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
                  activeTab === 'growth'
                    ? 'bg-[#D8F3DC] text-[#0D0D0D] shadow-md shadow-[#D8F3DC]/10'
                    : 'bg-[#121212] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TrendingUp size={16} />
                <span>5. Testing A/B & Lead Magnet</span>
              </button>

              <button
                onClick={() => setActiveTab('rgpd')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition cursor-pointer ${
                  activeTab === 'rgpd'
                    ? 'bg-[#D8F3DC] text-[#0D0D0D] shadow-md shadow-[#D8F3DC]/10'
                    : 'bg-[#121212] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Scale size={16} />
                <span>6. RGPD & Multas UE</span>
                {resultado.rgpd_audit?.nivel_riesgo && (
                  <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-black ${
                    resultado.rgpd_audit.nivel_riesgo === 'Crítico' || resultado.rgpd_audit.nivel_riesgo === 'Alto'
                      ? 'bg-rose-500 text-white'
                      : 'bg-[#1B4332] text-[#D8F3DC]'
                  }`}>
                    {resultado.rgpd_audit.nivel_riesgo}
                  </span>
                )}
              </button>
            </div>

            {/* TAB 1: PROSPECCIÓN SEGURA & COLD EMAILS (ANTI-BAN WHATSAPP) */}
            {activeTab === 'outreach' && (
              <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setOutreachSubTab('email_1')}
                      className={`px-3.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                        outreachSubTab === 'email_1'
                          ? 'bg-[#1B4332] text-[#D8F3DC] border border-[#D8F3DC]/30'
                          : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      📧 Email 1 (Primer Contacto)
                    </button>
                    <button
                      onClick={() => setOutreachSubTab('email_2')}
                      className={`px-3.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                        outreachSubTab === 'email_2'
                          ? 'bg-[#1B4332] text-[#D8F3DC] border border-[#D8F3DC]/30'
                          : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      ⏱️ Email 2 (Seguimiento 48h)
                    </button>
                    <button
                      onClick={() => setOutreachSubTab('antiban')}
                      className={`px-3.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                        outreachSubTab === 'antiban'
                          ? 'bg-[#1B4332] text-[#D8F3DC] border border-[#D8F3DC]/30'
                          : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      🛡️ Protocolo Anti-Ban WhatsApp
                    </button>
                    <button
                      onClick={() => setOutreachSubTab('whatsapp')}
                      className={`px-3.5 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                        outreachSubTab === 'whatsapp'
                          ? 'bg-[#1B4332] text-[#D8F3DC] border border-[#D8F3DC]/30'
                          : 'bg-[#0D0D0D] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      💬 Pitch WhatsApp (Agendados)
                    </button>
                  </div>
                </div>

                {/* Subvista: Email 1 Primer Contacto */}
                {outreachSubTab === 'email_1' && (
                  <div className="space-y-6">
                    {resultado.cold_email && (
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#D8F3DC] flex items-center gap-1.5">
                          <Mail size={16} /> Asuntos de Alta Apertura (+60% de tasa estimada sin palabras de spam):
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Opción 1 (Intriga):</span>
                              <p className="text-sm font-semibold text-white">&ldquo;{resultado.cold_email.asunto_1}&rdquo;</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(resultado.cold_email?.asunto_1 || '', 'subj1')}
                              className="mt-2 self-start flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 text-[#D8F3DC] px-2.5 py-1 rounded transition"
                            >
                              {copiedSection === 'subj1' ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedSection === 'subj1' ? 'Copiado' : 'Copiar Asunto'}</span>
                            </button>
                          </div>

                          <div className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Opción 2 (Impacto en Negocio):</span>
                              <p className="text-sm font-semibold text-white">&ldquo;{resultado.cold_email.asunto_2}&rdquo;</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(resultado.cold_email?.asunto_2 || '', 'subj2')}
                              className="mt-2 self-start flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 text-[#D8F3DC] px-2.5 py-1 rounded transition"
                            >
                              {copiedSection === 'subj2' ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedSection === 'subj2' ? 'Copiado' : 'Copiar Asunto'}</span>
                            </button>
                          </div>

                          <div className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2 flex flex-col justify-between">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Opción 3 (Personalizado Web):</span>
                              <p className="text-sm font-semibold text-white">&ldquo;{resultado.cold_email.asunto_3}&rdquo;</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(resultado.cold_email?.asunto_3 || '', 'subj3')}
                              className="mt-2 self-start flex items-center gap-1 text-[11px] bg-white/5 hover:bg-white/10 text-[#D8F3DC] px-2.5 py-1 rounded transition"
                            >
                              {copiedSection === 'subj3' ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedSection === 'subj3' ? 'Copiado' : 'Copiar Asunto'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#0D0D0D] p-5 rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                            <span className="text-xs font-bold uppercase text-[#D8F3DC]">Plantilla AIDA (Atención-Interés-Deseo-Acción)</span>
                            <button
                              onClick={() => copyToClipboard(resultado.cold_email?.cuerpo_aida || '', 'aida')}
                              className="flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 text-[#D8F3DC] font-bold px-2.5 py-1 rounded transition"
                            >
                              {copiedSection === 'aida' ? <Check size={13} /> : <Copy size={13} />}
                              <span>{copiedSection === 'aida' ? 'Copiado' : 'Copiar'}</span>
                            </button>
                          </div>
                          <div className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {resultado.cold_email?.cuerpo_aida || 'Generando plantilla AIDA...'}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#0D0D0D] p-5 rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                            <span className="text-xs font-bold uppercase text-amber-400">Plantilla PAS (Problema-Agitación-Solución)</span>
                            <button
                              onClick={() => copyToClipboard(resultado.cold_email?.cuerpo_pas || '', 'pas')}
                              className="flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 text-amber-400 font-bold px-2.5 py-1 rounded transition"
                            >
                              {copiedSection === 'pas' ? <Check size={13} /> : <Copy size={13} />}
                              <span>{copiedSection === 'pas' ? 'Copiado' : 'Copiar'}</span>
                            </button>
                          </div>
                          <div className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {resultado.cold_email?.cuerpo_pas || 'Generando plantilla PAS...'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {resultado.cold_email?.llamada_a_la_accion && (
                      <div className="p-4 bg-[#1B4332]/20 rounded-xl border border-[#1B4332] text-xs text-slate-300">
                        <strong className="text-[#D8F3DC] block mb-1">💡 Soft CTA de Cierre Recomendado:</strong>
                        &ldquo;{resultado.cold_email.llamada_a_la_accion}&rdquo;
                      </div>
                    )}
                  </div>
                )}

                {/* Subvista: Email 2 Seguimiento 48h */}
                {outreachSubTab === 'email_2' && (
                  <div className="bg-[#0D0D0D] p-6 rounded-xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-xs font-bold uppercase text-[#D8F3DC] block">Email de Seguimiento a las 48h (Aportando Valor)</span>
                        <span className="text-xs text-slate-400">Para enviar si no hubo respuesta al primer correo, sin sonar insistente.</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${resultado.cold_email?.email_seguimiento_48h?.asunto}\n\n${resultado.cold_email?.email_seguimiento_48h?.cuerpo}`, 'email2')}
                        className="flex items-center gap-1.5 bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                      >
                        {copiedSection === 'email2' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedSection === 'email2' ? '¡Copiado!' : 'Copiar Email 2'}</span>
                      </button>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 block mb-1">Asunto Recomendado:</span>
                      <p className="text-sm font-semibold text-white">&ldquo;{resultado.cold_email?.email_seguimiento_48h?.asunto || `Re: ${resultado.url} - Detalle adicional`}&rdquo;</p>
                    </div>

                    <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {resultado.cold_email?.email_seguimiento_48h?.cuerpo || 'Generando email de seguimiento...'}
                    </div>
                  </div>
                )}

                {/* Subvista: Protocolo Anti-Ban WhatsApp */}
                {outreachSubTab === 'antiban' && (
                  <div className="bg-[#0D0D0D] p-6 rounded-xl border border-amber-500/30 space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs">
                      <ShieldAlert size={20} className="shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-amber-200 font-bold mb-0.5">🛡️ PROTOCOLO DE SEGURIDAD PARA WHATSAPP:</strong>
                        Nunca envíes mensajes en frío con enlaces directos por WhatsApp porque el usuario puede reportarte como spam y WhatsApp suspenderá tu número. Cuando el cliente responda a tu email, envíale este mensaje para que te guarde primero en sus contactos.
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-[#D8F3DC]">Mensaje de Transición Segura:</span>
                        <button
                          onClick={() => copyToClipboard(resultado.cold_email?.protocolo_antiban_whatsapp || '', 'antiban_txt')}
                          className="flex items-center gap-1 bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                        >
                          {copiedSection === 'antiban_txt' ? <Check size={14} /> : <Copy size={14} />}
                          <span>{copiedSection === 'antiban_txt' ? '¡Copiado!' : 'Copiar Texto'}</span>
                        </button>
                      </div>
                      <div className="p-4 bg-black/50 rounded-xl border border-white/10 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {resultado.cold_email?.protocolo_antiban_whatsapp || '¡Hola! Para poder compartirte capturas y el documento por WhatsApp sin que el sistema bloquee los enlaces por seguridad, por favor añade nuestro contacto a tu agenda telefónica. En cuanto nos tengas guardados, te paso el acceso directo.'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Subvista: Pitch WhatsApp */}
                {outreachSubTab === 'whatsapp' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-bold uppercase text-emerald-400">Mensaje de WhatsApp (Para enviar una vez agendados):</span>
                      <div className="flex gap-2">
                        <a
                          href={waShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                        >
                          <Send size={14} />
                          <span>Abrir WhatsApp</span>
                        </a>
                        <button
                          onClick={() => copyToClipboard(pitchText, 'pitch_txt')}
                          className="flex items-center gap-1.5 bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                        >
                          {copiedSection === 'pitch_txt' ? <Check size={14} /> : <Copy size={14} />}
                          <span>{copiedSection === 'pitch_txt' ? '¡Copiado!' : 'Copiar Texto'}</span>
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#0D0D0D] p-5 rounded-xl border border-white/10 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {pitchText}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 2: CALCULADORA DE DINERO PERDIDO AL MES (FUGA OCULTA) */}
            {activeTab === 'perdidas' && (
              <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider text-xs">
                  <Calculator size={16} /> Calculadora de Fuga Financiera Oculta
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-gradient-to-br from-rose-950/40 to-[#0D0D0D] border border-rose-900/60 rounded-2xl space-y-2">
                    <span className="text-xs font-bold uppercase text-rose-400 tracking-wider">Dinero Perdido Estimado al Mes:</span>
                    <div className="text-4xl font-black text-rose-300">
                      {resultado.calculadora_perdidas?.perdida_estimada_mensual || '$1,850 / mes'}
                    </div>
                    <p className="text-xs text-slate-400">Pérdida mensual por fricción, lentitud y falta de canal directo.</p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-amber-950/40 to-[#0D0D0D] border border-amber-900/60 rounded-2xl space-y-2">
                    <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">Impacto Financiero Anual:</span>
                    <div className="text-4xl font-black text-amber-300">
                      {resultado.calculadora_perdidas?.impacto_anual || '$22,200 / año'}
                    </div>
                    <p className="text-xs text-slate-400">Total acumulado que se fuga hacia competidores cada 12 meses.</p>
                  </div>
                </div>

                {resultado.calculadora_perdidas?.motivos_fuga && resultado.calculadora_perdidas.motivos_fuga.length > 0 && (
                  <div className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-3">
                    <span className="text-xs font-bold uppercase text-[#D8F3DC] block">¿De dónde sale esta fuga?:</span>
                    <div className="space-y-2">
                      {resultado.calculadora_perdidas.motivos_fuga.map((motivo: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <XCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                          <span>{motivo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resultado.fugas_de_dinero && resultado.fugas_de_dinero.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold uppercase text-slate-400 block">Detalle de Fugas Detectadas:</span>
                    <div className="grid md:grid-cols-2 gap-3">
                      {resultado.fugas_de_dinero.map((f: FugaDinero, i: number) => (
                        <div key={i} className="p-4 bg-[#0D0D0D] border border-white/10 rounded-xl space-y-2">
                          <div className="font-bold text-white text-sm">{i + 1}. {f.titulo}</div>
                          <p className="text-xs text-slate-400">{f.impacto_negocio}</p>
                          <div className="text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-900/40">
                            <strong>Solución:</strong> {f.solucion_simple}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GUIÓN DE LLAMADA / VIDEOLLAMADA CONSULTIVA (15 MINUTOS) */}
            {activeTab === 'guion' && (
              <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-2 text-[#D8F3DC] font-bold uppercase tracking-wider text-xs">
                  <PhoneCall size={16} /> Guión Consultivo de Cierre para Videollamada / Teléfono (15 Minutos)
                </div>

                <div className="space-y-4">
                  <div className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase">Paso 1: Minuto 0 a 3 (Apertura Empática & Elefante en la Habitación)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {resultado.guion_llamada?.min_0_3_apertura || 'Agradece el tiempo, elogia la calidad del servicio del cliente y plantea con delicadeza que detectaste un cuello de botella técnico que frena su crecimiento sin que ellos lo sospechen.'}
                    </p>
                  </div>

                  <div className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-amber-400 uppercase">Paso 2: Minuto 3 a 8 (Demostración de Fugas sin Culpabilizar)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {resultado.guion_llamada?.min_3_8_demostracion || 'Muestra la calculadora de pérdidas y el fallo de indexación/móvil dejando claro que es un fallo del código antiguo y no de su gestión comercial.'}
                    </p>
                  </div>

                  <div className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-[#D8F3DC] uppercase">Paso 3: Minuto 8 a 12 (Presentación de la Solución Amable & Widget)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {resultado.guion_llamada?.min_8_12_solucion || 'Presenta el plan de blindaje legal, optimización WPO y la instalación del widget interactivo a medida para captar leads en automático.'}
                    </p>
                  </div>

                  <div className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-emerald-300 uppercase">Paso 4: Minuto 12 a 15 (Cierre de Presupuesto con Proyección de ROI)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {resultado.guion_llamada?.min_12_15_cierre || 'Muestra la proyección financiera: con captar 2 clientes adicionales la inversión queda amortizada. Acuerda fecha para arrancar la Fase 1 en 48 horas.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: INFORME DE AUTORIDAD 360° (NEXUS) */}
            {activeTab === 'nexus' && (
              <div className="space-y-6">
                
                {/* Resumen Ejecutivo & The Elephant in the Room */}
                <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-[#D8F3DC] font-bold uppercase tracking-wider text-xs">
                    <Crown size={16} /> Resumen Ejecutivo & Diagnóstico Crítico
                  </div>
                  <h3 className="text-2xl font-black text-white">{resultado.resumen_ejecutivo}</h3>
                  
                  {resultado.elephant_in_the_room && (
                    <div className="p-5 bg-rose-950/40 border border-rose-900/80 rounded-xl space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <ShieldAlert size={16} /> &ldquo;The Elephant in the Room&rdquo; (Error Crítico de Negocio)
                      </div>
                      <p className="text-slate-200 leading-relaxed text-sm md:text-base">{resultado.elephant_in_the_room}</p>
                    </div>
                  )}
                </div>

                {/* Matriz GAP 5.0 */}
                {resultado.matriz_gap && resultado.matriz_gap.length > 0 && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText className="text-[#D8F3DC]" size={20} /> Matriz GAP (Diagnóstico Holístico en 5 Capas)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-xs font-bold uppercase text-slate-400">
                            <th className="py-3 px-4">Capa</th>
                            <th className="py-3 px-4">Hallazgo Crítico</th>
                            <th className="py-3 px-4">Impacto en Negocio ($)</th>
                            <th className="py-3 px-4">Solución Propuesta</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {resultado.matriz_gap.map((row: GapRow, i: number) => (
                            <tr key={i} className="hover:bg-white/5 transition">
                              <td className="py-3.5 px-4 font-bold text-[#D8F3DC] whitespace-nowrap">{row.capa}</td>
                              <td className="py-3.5 px-4 text-slate-200">{row.hallazgo || row.hallazgo_critico}</td>
                              <td className="py-3.5 px-4 text-rose-300 text-xs">{row.impacto_negocio || row.impacto_negocio_dolares}</td>
                              <td className="py-3.5 px-4 text-emerald-400 text-xs">{row.solucion || row.solucion_propuesta}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Proyección Financiera de ROI */}
                {resultado.proyeccion_roi && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <DollarSign className="text-emerald-400" size={22} /> Proyección Financiera de ROI
                      </h3>
                      <div className="text-xs text-slate-400">
                        Base: {resultado.proyeccion_roi.trafico_mensual || '1,500 visitas'} • Ticket: {resultado.proyeccion_roi.ticket_medio || '$450'}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Escenario Conservador (+5%)</div>
                        <div className="text-2xl font-black text-slate-200">{resultado.proyeccion_roi.escenario_pesimista}</div>
                        <div className="text-xs text-slate-500 mt-1">Mejora mínima de conversión</div>
                      </div>

                      <div className="p-5 bg-[#1B4332]/20 rounded-xl border border-[#1B4332]">
                        <div className="text-xs font-bold text-[#D8F3DC] uppercase tracking-wider mb-1">Escenario Realista (+15%)</div>
                        <div className="text-2xl font-black text-[#D8F3DC]">{resultado.proyeccion_roi.escenario_realista}</div>
                        <div className="text-xs text-[#D8F3DC]/80 mt-1">Objetivo comercial estándar</div>
                      </div>

                      <div className="p-5 bg-emerald-950/30 rounded-xl border border-emerald-800/60">
                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Escenario Optimista (+30%)</div>
                        <div className="text-2xl font-black text-emerald-300">{resultado.proyeccion_roi.escenario_optimista}</div>
                        <div className="text-xs text-emerald-400/80 mt-1">Transformación visual completa</div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 italic text-center">
                      &ldquo;{resultado.proyeccion_roi.conclusion}&rdquo;
                    </p>
                  </div>
                )}

                {/* GEO (SEO para IAs) & Schema JSON-LD */}
                {resultado.geo_schema && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Code2 className="text-[#D8F3DC]" size={20} /> GEO: Posicionamiento para IAs & Schema JSON-LD
                      </h3>
                      <button
                        onClick={() => copyToClipboard(typeof resultado.geo_schema?.json_ld === 'string' ? resultado.geo_schema.json_ld : JSON.stringify(resultado.geo_schema?.json_ld || resultado.geo_schema?.json_ld_code, null, 2), 'schema')}
                        className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-white font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        {copiedSection === 'schema' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedSection === 'schema' ? 'Copiado' : 'Copiar JSON-LD'}</span>
                      </button>
                    </div>

                    {resultado.geo_schema.frase_citabilidad && (
                      <div className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 text-sm">
                        <span className="text-xs font-bold text-[#D8F3DC] uppercase block mb-1">Frase de Citabilidad (LLMs / ChatGPT / Perplexity):</span>
                        <p className="text-slate-300 italic font-mono">&ldquo;{resultado.geo_schema.frase_citabilidad}&rdquo;</p>
                      </div>
                    )}

                    <div className="bg-[#0D0D0D] p-4 rounded-xl border border-white/10 text-xs font-mono text-emerald-400 overflow-x-auto max-h-48">
                      <pre>{typeof resultado.geo_schema.json_ld === 'string' ? resultado.geo_schema.json_ld : JSON.stringify(resultado.geo_schema.json_ld || resultado.geo_schema.json_ld_code, null, 2)}</pre>
                    </div>
                  </div>
                )}

                {/* Copywriting Reescrito (3 Enfoques) */}
                {resultado.copys_reescritos && resultado.copys_reescritos.length > 0 && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="text-[#D8F3DC]" size={20} /> Copywriting Reescrito (3 Enfoques Psicológicos)
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {resultado.copys_reescritos.map((copy: CopyReescrito, i: number) => (
                        <div key={i} className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2">
                          <div className="text-xs font-bold text-[#D8F3DC] uppercase tracking-wider">{copy.enfoque}</div>
                          <div className="font-bold text-white text-base">&ldquo;{copy.headline}&rdquo;</div>
                          <p className="text-xs text-slate-400 leading-relaxed">&ldquo;{copy.subheadline}&rdquo;</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Armas de Venta & Anticipación de Objeciones */}
                {resultado.armas_venta_objeciones && resultado.armas_venta_objeciones.length > 0 && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="text-rose-400" size={20} /> Armas de Venta (Anticipación de Objeciones)
                    </h3>
                    <div className="space-y-3">
                      {resultado.armas_venta_objeciones.map((item: ArmaVentaObjecion, i: number) => (
                        <div key={i} className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-2">
                          <div className="text-xs font-bold text-rose-400 uppercase">Objeción del cliente: &ldquo;{item.objecion || item.objecion_cliente}&rdquo;</div>
                          <div className="text-sm text-slate-300 pl-3 border-l-2 border-[#D8F3DC]">
                            <strong className="text-white">Contramedida letal:</strong> {item.contramedida || item.contramedida_persuasiva}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Roadmap de 5 Fases */}
                {resultado.roadmap && resultado.roadmap.length > 0 && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <TrendingUp className="text-[#D8F3DC]" size={20} /> Roadmap de Transformación
                    </h3>
                    <div className="grid md:grid-cols-5 gap-3">
                      {resultado.roadmap.map((paso: RoadmapItem, i: number) => (
                        <div key={i} className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-1">
                          <div className="text-xs font-bold text-[#D8F3DC]">{paso.fase}</div>
                          <p className="text-xs text-slate-300 leading-snug">{paso.accion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 5: TESTING A/B & LEAD MAGNET TÉCNICO */}
            {activeTab === 'growth' && (
              <div className="space-y-6">
                {/* Experimentos A/B */}
                {resultado.experimentos_ab && resultado.experimentos_ab.length > 0 && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <TrendingUp className="text-[#D8F3DC]" size={20} /> Hipótesis de Testing A/B Validables
                    </h3>
                    <div className="space-y-4">
                      {resultado.experimentos_ab.map((exp: ExperimentoAB, i: number) => (
                        <div key={i} className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-3">
                          <div className="font-bold text-white text-base">Experimento {i + 1}: {exp.nombre}</div>
                          <p className="text-xs text-slate-300 italic">&ldquo;{exp.hipotesis}&rdquo;</p>
                          <div className="grid md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                              <span className="font-bold text-slate-400 block mb-1">Variable A (Control actual):</span>
                              <span className="text-slate-200">{exp.variable_a_control}</span>
                            </div>
                            <div className="p-3 bg-[#1B4332]/30 rounded-lg border border-[#1B4332]">
                              <span className="font-bold text-[#D8F3DC] block mb-1">Variable B (Variante propuesta):</span>
                              <span className="text-slate-200">{exp.variable_b_variante}</span>
                            </div>
                          </div>
                          <div className="text-xs text-emerald-400 font-semibold">
                            🎯 Métrica de Éxito: {exp.metrica_exito}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lead Magnet Técnico Interactivo */}
                {resultado.lead_magnet_tecnico && (
                  <div className="bg-[#121212] border border-[#1B4332] p-6 md:p-8 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-[#D8F3DC] font-bold uppercase tracking-wider text-xs">
                      <Sparkles size={16} /> Propuesta de Lead Magnet Técnico (&ldquo;Widget de Amabilidad Digital&rdquo;)
                    </div>
                    <h3 className="text-2xl font-black text-white">&ldquo;{resultado.lead_magnet_tecnico.nombre}&rdquo;</h3>
                    <p className="text-slate-300 text-sm">{resultado.lead_magnet_tecnico.descripcion}</p>

                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-1">
                        <span className="text-xs font-bold text-[#D8F3DC] uppercase block">Funcionamiento Técnico:</span>
                        <p className="text-xs text-slate-300">{resultado.lead_magnet_tecnico.como_funciona_vanilla_js}</p>
                      </div>
                      <div className="p-4 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-1">
                        <span className="text-xs font-bold text-emerald-400 uppercase block">Impacto en Captación:</span>
                        <p className="text-xs text-slate-300">{resultado.lead_magnet_tecnico.impacto_captacion}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: MÓDULO LEGAL RGPD & SANCIONES UE / AEPD */}
            {activeTab === 'rgpd' && (
              <div className="space-y-6">
                
                {/* Resumen de Riesgo Legal & Sanción Estimada */}
                <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider text-xs">
                        <Scale size={16} /> Auditoría de Cumplimiento Legal (RGPD & LSSI)
                      </div>
                      <h3 className="text-2xl font-black text-white mt-1">Exposición a Sanciones y Multas AEPD</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {resultado.rgpd_audit?.diagnostico_legal || 'Diagnóstico de vulnerabilidad regulatoria en la Unión Europea.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 bg-[#0D0D0D] p-4 rounded-xl border border-white/10 shrink-0">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Riesgo Global</div>
                        <div className={`text-xl font-black ${
                          resultado.rgpd_audit?.nivel_riesgo === 'Crítico' || resultado.rgpd_audit?.nivel_riesgo === 'Alto'
                            ? 'text-rose-400'
                            : 'text-emerald-400'
                        }`}>
                          {resultado.rgpd_audit?.nivel_riesgo || 'Alto'}
                        </div>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <div className="text-xs text-slate-400 uppercase font-bold">Sanción Estimada</div>
                        <div className="text-lg font-black text-amber-400">
                          {resultado.rgpd_audit?.sancion_estimada_euros || '3.000€ - 30.000€'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist de Elementos Legales Detectados */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                    <div className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 ${
                      resultado.rgpd_audit?.elementos_detectados?.tiene_aviso_legal 
                        ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-300' 
                        : 'bg-rose-950/20 border-rose-900/60 text-rose-300'
                    }`}>
                      {resultado.rgpd_audit?.elementos_detectados?.tiene_aviso_legal ? <CheckCircle size={18} /> : <XCircle size={18} />}
                      <span className="text-xs font-bold">Aviso Legal</span>
                      <span className="text-[10px] opacity-75">{resultado.rgpd_audit?.elementos_detectados?.tiene_aviso_legal ? 'Detectado' : 'Faltante'}</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 ${
                      resultado.rgpd_audit?.elementos_detectados?.tiene_politica_privacidad 
                        ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-300' 
                        : 'bg-rose-950/20 border-rose-900/60 text-rose-300'
                    }`}>
                      {resultado.rgpd_audit?.elementos_detectados?.tiene_politica_privacidad ? <CheckCircle size={18} /> : <XCircle size={18} />}
                      <span className="text-xs font-bold">Privacidad</span>
                      <span className="text-[10px] opacity-75">{resultado.rgpd_audit?.elementos_detectados?.tiene_politica_privacidad ? 'Detectado' : 'Faltante'}</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 ${
                      resultado.rgpd_audit?.elementos_detectados?.tiene_politica_cookies 
                        ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-300' 
                        : 'bg-rose-950/20 border-rose-900/60 text-rose-300'
                    }`}>
                      {resultado.rgpd_audit?.elementos_detectados?.tiene_politica_cookies ? <CheckCircle size={18} /> : <XCircle size={18} />}
                      <span className="text-xs font-bold">Política Cookies</span>
                      <span className="text-[10px] opacity-75">{resultado.rgpd_audit?.elementos_detectados?.tiene_politica_cookies ? 'Detectado' : 'Faltante'}</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 ${
                      resultado.rgpd_audit?.elementos_detectados?.tiene_banner_cmp 
                        ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-300' 
                        : 'bg-rose-950/20 border-rose-900/60 text-rose-300'
                    }`}>
                      {resultado.rgpd_audit?.elementos_detectados?.tiene_banner_cmp ? <CheckCircle size={18} /> : <XCircle size={18} />}
                      <span className="text-xs font-bold">Banner CMP</span>
                      <span className="text-[10px] opacity-75">{resultado.rgpd_audit?.elementos_detectados?.tiene_banner_cmp ? 'Detectado' : 'No Detectado'}</span>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 col-span-2 md:col-span-1 ${
                      !resultado.rgpd_audit?.elementos_detectados?.telemetria_sin_bloqueo 
                        ? 'bg-emerald-950/20 border-emerald-900/60 text-emerald-300' 
                        : 'bg-rose-950/30 border-rose-800 text-rose-300'
                    }`}>
                      {!resultado.rgpd_audit?.elementos_detectados?.telemetria_sin_bloqueo ? <CheckCircle size={18} /> : <ShieldAlert size={18} />}
                      <span className="text-xs font-bold">Bloqueo Cookies</span>
                      <span className="text-[10px] opacity-75">{!resultado.rgpd_audit?.elementos_detectados?.telemetria_sin_bloqueo ? 'Correcto' : 'Dispara sin Opt-in'}</span>
                    </div>
                  </div>

                  {/* Gancho de Urgencia Comercial */}
                  {resultado.rgpd_audit?.gancho_urgencia_comercial && (
                    <div className="p-5 bg-gradient-to-r from-[#1B4332]/40 via-[#1B4332]/20 to-transparent border border-[#1B4332] rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-[#D8F3DC] uppercase tracking-wider">🎯 Gancho Comercial de Cierre Rápido:</div>
                        <p className="text-slate-200 text-sm italic font-medium">&ldquo;{resultado.rgpd_audit.gancho_urgencia_comercial}&rdquo;</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(resultado.rgpd_audit?.gancho_urgencia_comercial || '', 'rgpd_hook')}
                        className="shrink-0 flex items-center gap-1.5 bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] font-bold px-3.5 py-2 rounded-lg text-xs transition cursor-pointer"
                      >
                        {copiedSection === 'rgpd_hook' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedSection === 'rgpd_hook' ? '¡Copiado!' : 'Copiar Gancho'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Infracciones Detalladas */}
                {resultado.rgpd_audit?.infracciones && resultado.rgpd_audit.infracciones.length > 0 && (
                  <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="text-rose-400" size={20} /> Infracciones & Riesgos Regulatorios Detectados
                    </h4>
                    <div className="space-y-4">
                      {resultado.rgpd_audit.infracciones.map((inf: RgpdInfraccion, idx: number) => (
                        <div key={idx} className="p-5 bg-[#0D0D0D] rounded-xl border border-white/10 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                            <span className="font-bold text-white text-base flex items-center gap-2">
                              <span className="text-rose-400">#{idx + 1}</span> {inf.tipo}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                {inf.gravedad}
                              </span>
                              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-white/5 text-slate-300 border border-white/10">
                                {inf.articulo_legal}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed">{inf.explicacion}</p>
                          <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-900/40 text-xs text-emerald-300 flex items-start gap-2">
                            <CheckCircle size={15} className="shrink-0 mt-0.5" />
                            <div><strong>Solución técnica que ofreces:</strong> {inf.como_solucionarlo}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* 🖥️ MODAL DE MODO PRESENTACIÓN INTERACTIVO (SLIDES PARA ZOOM / GOOGLE MEET) */}
        {/* ========================================================================= */}
        {showPresentation && resultado && (
          <div className="fixed inset-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md flex flex-col justify-between p-6 md:p-12 text-white no-print">
            
            {/* Header de la Presentación */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Image src="/002.gif" alt="Marketing Amable" width={28} height={28} className="h-7 w-auto" unoptimized />
                <span className="font-extrabold text-sm tracking-wider text-white">
                  MARKETING <span className="text-[#D8F3DC]">AMABLE</span> • Presentación Ejecutiva 360°
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">Diapositiva {presentationSlide + 1} de 5</span>
                <button
                  onClick={() => setShowPresentation(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                  title="Cerrar presentación"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Contenido Dinámico de la Slide */}
            <div className="my-auto max-w-4xl mx-auto w-full py-6">
              
              {/* Slide 0: Portada & Diagnóstico */}
              {presentationSlide === 0 && (
                <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#D8F3DC] text-xs font-bold uppercase tracking-wider">
                    Diagnóstico de Autoridad Digital & Conversión
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white">{resultado.url}</h1>
                  <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">{resultado.resumen_ejecutivo}</p>

                  <div className="flex justify-center items-center gap-6 pt-4">
                    <div className="p-5 bg-[#121212] border border-white/10 rounded-2xl">
                      <div className="text-xs text-slate-400 uppercase font-bold">Puntuación Global</div>
                      <div className="text-4xl font-black text-[#D8F3DC] mt-1">{resultado.puntuacion_global}/100</div>
                    </div>
                    <div className="p-5 bg-[#121212] border border-white/10 rounded-2xl">
                      <div className="text-xs text-slate-400 uppercase font-bold">Nota de Autoridad</div>
                      <div className="text-4xl font-black text-emerald-400 mt-1">{resultado.nota_autoridad || '3.5 / 10'}</div>
                    </div>
                  </div>

                  {resultado.elephant_in_the_room && (
                    <div className="p-5 bg-rose-950/40 border border-rose-900/60 rounded-xl text-left max-w-2xl mx-auto">
                      <span className="text-xs font-bold uppercase text-rose-400 block mb-1">🐘 The Elephant in the Room:</span>
                      <p className="text-xs text-slate-200 leading-relaxed">{resultado.elephant_in_the_room}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Slide 1: Pérdidas Financieras Ocultas */}
              {presentationSlide === 1 && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="text-center">
                    <span className="text-xs font-bold uppercase text-rose-400 tracking-wider">Fuga Financiera Detectada</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mt-1">El Coste de la Fricción Digital</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-rose-950/30 border border-rose-900/60 rounded-2xl text-center space-y-2">
                      <span className="text-xs font-bold uppercase text-rose-400">Pérdida Estimada al Mes</span>
                      <div className="text-4xl font-black text-rose-300">{resultado.calculadora_perdidas?.perdida_estimada_mensual || '$1,850 / mes'}</div>
                      <p className="text-xs text-slate-400">Por rebote móvil, lentitud y falta de canal inmediato.</p>
                    </div>
                    <div className="p-6 bg-amber-950/30 border border-amber-900/60 rounded-2xl text-center space-y-2">
                      <span className="text-xs font-bold uppercase text-amber-400">Pérdida Anual Acumulada</span>
                      <div className="text-4xl font-black text-amber-300">{resultado.calculadora_perdidas?.impacto_anual || '$22,200 / año'}</div>
                      <p className="text-xs text-slate-400">Capital que se transfiere silenciosamente a la competencia.</p>
                    </div>
                  </div>

                  {resultado.calculadora_perdidas?.motivos_fuga && (
                    <div className="p-5 bg-[#121212] rounded-xl border border-white/10 space-y-2">
                      <span className="text-xs font-bold uppercase text-[#D8F3DC] block">Cuellos de Botella Detectados:</span>
                      {resultado.calculadora_perdidas.motivos_fuga.map((m: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <XCircle size={14} className="text-rose-400 shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Slide 2: Matriz GAP 5.0 */}
              {presentationSlide === 2 && (
                <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="text-center">
                    <span className="text-xs font-bold uppercase text-[#D8F3DC] tracking-wider">Metodología de Élite</span>
                    <h2 className="text-3xl font-black text-white mt-1">Matriz GAP de Transformación en 5 Capas</h2>
                  </div>

                  <div className="space-y-3">
                    {resultado.matriz_gap?.map((row: GapRow, i: number) => (
                      <div key={i} className="p-4 bg-[#121212] border border-white/10 rounded-xl flex justify-between items-center gap-4 text-xs">
                        <div className="w-1/4 font-bold text-[#D8F3DC]">{row.capa}</div>
                        <div className="w-2/4 text-slate-300">{row.hallazgo || row.hallazgo_critico}</div>
                        <div className="w-1/4 text-right text-emerald-400 font-semibold">{row.solucion || row.solucion_propuesta}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 3: Testing A/B & Lead Magnet */}
              {presentationSlide === 3 && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="text-center">
                    <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Estrategia de Captación Inmediata</span>
                    <h2 className="text-3xl font-black text-white mt-1">Widget Interactivo & Tests A/B</h2>
                  </div>

                  {resultado.lead_magnet_tecnico && (
                    <div className="p-6 bg-[#121212] border border-[#1B4332] rounded-2xl space-y-3">
                      <span className="text-xs font-bold uppercase text-[#D8F3DC]">Propuesta de Herramienta Exclusiva:</span>
                      <h3 className="text-2xl font-black text-white">&ldquo;{resultado.lead_magnet_tecnico.nombre}&rdquo;</h3>
                      <p className="text-xs text-slate-300">{resultado.lead_magnet_tecnico.descripcion}</p>
                      <div className="p-3 bg-[#0D0D0D] rounded-xl border border-white/10 text-xs text-emerald-400">
                        <strong>Impacto:</strong> {resultado.lead_magnet_tecnico.impacto_captacion}
                      </div>
                    </div>
                  )}

                  {resultado.experimentos_ab && resultado.experimentos_ab[0] && (
                    <div className="p-4 bg-[#121212] border border-white/10 rounded-xl text-xs space-y-2">
                      <div className="font-bold text-white">Test A/B Prioritario: {resultado.experimentos_ab[0].nombre}</div>
                      <div className="text-slate-400">{resultado.experimentos_ab[0].hipotesis}</div>
                      <div className="text-emerald-400 font-bold">Métrica esperada: {resultado.experimentos_ab[0].metrica_exito}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Slide 4: Proyección ROI & Roadmap */}
              {presentationSlide === 4 && (
                <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#D8F3DC] tracking-wider">Retorno de Inversión</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mt-1">Proyección de Crecimiento</h2>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-5 bg-[#121212] border border-white/10 rounded-2xl">
                      <span className="text-xs font-bold text-slate-400 block uppercase">Conservador</span>
                      <div className="text-2xl font-black text-slate-200 mt-1">{resultado.proyeccion_roi?.escenario_pesimista}</div>
                    </div>
                    <div className="p-5 bg-[#1B4332] border border-[#D8F3DC]/30 rounded-2xl">
                      <span className="text-xs font-bold text-[#D8F3DC] block uppercase">Realista</span>
                      <div className="text-2xl font-black text-[#D8F3DC] mt-1">{resultado.proyeccion_roi?.escenario_realista}</div>
                    </div>
                    <div className="p-5 bg-[#121212] border border-white/10 rounded-2xl">
                      <span className="text-xs font-bold text-emerald-400 block uppercase">Optimista</span>
                      <div className="text-2xl font-black text-emerald-300 mt-1">{resultado.proyeccion_roi?.escenario_optimista}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic max-w-xl mx-auto">&ldquo;{resultado.proyeccion_roi?.conclusion}&rdquo;</p>
                  
                  <div className="pt-2">
                    <button
                      onClick={() => setShowPresentation(false)}
                      className="bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] font-extrabold px-6 py-3 rounded-xl transition text-sm cursor-pointer shadow-lg shadow-[#D8F3DC]/20"
                    >
                      Cerrar Presentación y Ver Detalles
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer y Controles de la Presentación */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <button
                disabled={presentationSlide === 0}
                onClick={() => setPresentationSlide(prev => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Anterior</span>
              </button>

              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map(idx => (
                  <button
                    key={idx}
                    onClick={() => setPresentationSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition cursor-pointer ${
                      presentationSlide === idx ? 'bg-[#D8F3DC] scale-125' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={presentationSlide === 4}
                onClick={() => setPresentationSlide(prev => Math.min(4, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D8F3DC] hover:bg-white text-[#0D0D0D] text-xs font-bold transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 🖨️ DOSSIER EJECUTIVO IMPRIMIBLE COMPLETO (SOLO SE MUESTRA EN IMPRESIÓN/PDF) */}
        {/* ========================================================================= */}
        {resultado && (
          <div id="dossier-imprimible" className="hidden print:block print:w-full bg-white text-slate-900 font-sans p-2 space-y-6 print:text-xs">
            
            {/* Portada & Cabecera de Marca */}
            <div className="border-b-2 border-[#1B4332] pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/002.gif" alt="Marketing Amable" width={36} height={36} className="h-9 w-auto" unoptimized />
                <div>
                  <div className="text-xl font-black tracking-tight text-[#1B4332]">
                    <span>MARKETING</span> <span className="text-emerald-700">AMABLE</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Intranet de Consultoría Digital & Auditoría Comercial 360°
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-600">
                <div><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div><strong>Versión:</strong> v.08</div>
              </div>
            </div>

            {/* Tarjeta Principal de Identificación & Score */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Cliente Prospecto Auditado</span>
                <h1 className="text-lg font-black text-slate-900 mt-0.5">{resultado.url}</h1>
                <div className="text-xs text-slate-600 mt-0.5">
                  <strong>Sector:</strong> {resultado.industria || industria}
                  {resultado.detectedInfo?.title && (
                    <span className="ml-2 italic text-slate-500">• &ldquo;{resultado.detectedInfo.title}&rdquo;</span>
                  )}
                </div>
              </div>
              <div className="text-right bg-white px-4 py-2 rounded-lg border border-slate-300 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-500">Score Conversión</div>
                <div className="text-2xl font-black text-slate-900">
                  {resultado.puntuacion_global}<span className="text-xs text-slate-500 font-normal">/100</span>
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold">
                  Nota: {resultado.nota_autoridad || `${(resultado.puntuacion_global / 10).toFixed(1)} / 10`}
                </div>
              </div>
            </div>

            {/* 1. Resumen Ejecutivo & The Elephant in the Room */}
            <div className="print-avoid-break bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-2">
                📊 1. Resumen Ejecutivo & Diagnóstico Estratégico
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{resultado.resumen_ejecutivo}</p>
              
              {resultado.elephant_in_the_room && (
                <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <div className="text-[11px] font-bold text-amber-900 uppercase">🐘 The Elephant in the Room (Fallo Crítico):</div>
                  <div className="text-xs text-amber-800 mt-0.5">{resultado.elephant_in_the_room}</div>
                </div>
              )}
            </div>

            {/* 2. Dinero Perdido al Mes & Fuga Financiera */}
            {resultado.calculadora_perdidas && (
              <div className="print-avoid-break bg-rose-50/50 border border-rose-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-rose-900 uppercase tracking-wider mb-2">
                  📉 2. Dinero Perdido al Mes (Fuga Financiera Oculta)
                </h2>
                <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                  <div className="p-2.5 bg-white border border-rose-200 rounded-lg">
                    <span className="text-[10px] font-bold text-rose-700 block">PÉRDIDA MENSUAL ESTIMADA</span>
                    <span className="font-bold text-slate-900 text-sm">{resultado.calculadora_perdidas.perdida_estimada_mensual}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-amber-200 rounded-lg">
                    <span className="text-[10px] font-bold text-amber-800 block">IMPACTO ANUAL PROYECTADO</span>
                    <span className="font-bold text-slate-900 text-sm">{resultado.calculadora_perdidas.impacto_anual}</span>
                  </div>
                </div>
                {resultado.calculadora_perdidas.motivos_fuga && (
                  <div className="text-[11px] text-slate-700 space-y-1">
                    {resultado.calculadora_perdidas.motivos_fuga.map((m: string, i: number) => (
                      <div key={i}>• {m}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Módulo Legal RGPD & Riesgo Sancionador */}
            <div className="print-avoid-break border border-slate-200 rounded-xl p-4">
              <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-3">
                ⚖️ 3. Módulo Legal RGPD & Riesgo Sancionador (AEPD / UE)
              </h2>
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-bold block">NIVEL DE RIESGO</span>
                  <span className="font-bold text-rose-700">{resultado.rgpd_audit?.nivel_riesgo || 'Medio'}</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-bold block">CUMPLIMIENTO</span>
                  <span className="font-bold text-slate-900">{resultado.rgpd_audit?.puntuacion_cumplimiento || 0}/100</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-bold block">SANCIÓN ESTIMADA</span>
                  <span className="font-bold text-rose-700">{resultado.rgpd_audit?.sancion_estimada_euros || 'N/A'}</span>
                </div>
              </div>

              <div className="text-xs text-slate-700 mb-3">
                <strong>Diagnóstico Legal:</strong> {resultado.rgpd_audit?.diagnostico_legal}
              </div>

              {resultado.rgpd_audit?.infracciones && resultado.rgpd_audit.infracciones.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-800 uppercase">Infracciones Detectadas:</div>
                  {resultado.rgpd_audit.infracciones.map((inf, i) => (
                    <div key={i} className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs">
                      <div className="font-bold text-rose-900">{i + 1}. {inf.tipo} ({inf.gravedad}) — <span className="italic font-normal">{inf.articulo_legal}</span></div>
                      <div className="text-rose-800 text-[11px] mt-0.5">{inf.explicacion}</div>
                      <div className="text-slate-700 text-[11px] mt-1"><strong>Solución:</strong> {inf.como_solucionarlo}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Prospección Comercial & Cold Emails */}
            <div className="print-avoid-break border border-slate-200 rounded-xl p-4">
              <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-3">
                💬 4. Argumentarios de Prospección Segura
              </h2>
              <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="text-[11px] font-bold text-emerald-900 uppercase mb-1">Pitch Directo de WhatsApp (Para contactos agendados):</div>
                <div className="text-xs text-slate-800 whitespace-pre-line font-mono">{resultado.pitch_whatsapp}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-800 mb-1">Plantilla Cold Email AIDA:</div>
                  <div className="text-slate-700 whitespace-pre-line text-[11px]">{resultado.cold_email?.cuerpo_aida}</div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="font-bold text-slate-800 mb-1">Plantilla Cold Email PAS:</div>
                  <div className="text-slate-700 whitespace-pre-line text-[11px]">{resultado.cold_email?.cuerpo_pas}</div>
                </div>
              </div>
            </div>

            {/* 5. Detección de Fugas de Dinero */}
            {resultado.fugas_de_dinero && resultado.fugas_de_dinero.length > 0 && (
              <div className="print-avoid-break border border-slate-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-rose-800 uppercase tracking-wider mb-3">
                  🔴 5. Fugas de Dinero & Conversión Detectadas
                </h2>
                <div className="space-y-2">
                  {resultado.fugas_de_dinero.map((f, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex justify-between gap-4">
                      <div>
                        <div className="font-bold text-slate-900">{i + 1}. {f.titulo}</div>
                        <div className="text-slate-600 text-[11px] mt-0.5">{f.impacto_negocio}</div>
                      </div>
                      <div className="text-right text-[11px] text-emerald-800 font-semibold shrink-0 max-w-xs">
                        Solución: {f.solucion_simple}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Matriz GAP 360° */}
            {resultado.matriz_gap && resultado.matriz_gap.length > 0 && (
              <div className="print-avoid-break border border-slate-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-3">
                  🎯 6. Matriz GAP de Transformación Digital 360°
                </h2>
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300">
                      <th className="p-2 font-bold text-slate-700">Capa</th>
                      <th className="p-2 font-bold text-slate-700">Hallazgo</th>
                      <th className="p-2 font-bold text-slate-700">Impacto Negocio ($)</th>
                      <th className="p-2 font-bold text-slate-700">Solución Propuesta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.matriz_gap.map((g, i) => (
                      <tr key={i} className="border-b border-slate-200">
                        <td className="p-2 font-bold text-slate-800">{g.capa}</td>
                        <td className="p-2 text-slate-600">{g.hallazgo || g.hallazgo_critico}</td>
                        <td className="p-2 font-semibold text-rose-700">{g.impacto_negocio_dolares || g.impacto_negocio}</td>
                        <td className="p-2 text-slate-700">{g.solucion || g.solucion_propuesta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 7. Proyección Financiera de ROI */}
            {resultado.proyeccion_roi && (
              <div className="print-avoid-break bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-3">
                  💰 7. Proyección Financiera de Retorno de Inversión (ROI)
                </h2>
                <div className="grid grid-cols-3 gap-3 mb-3 text-xs text-center">
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold block">CONSERVADOR</span>
                    <span className="font-bold text-slate-800">{resultado.proyeccion_roi.escenario_pesimista}</span>
                  </div>
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <span className="text-[10px] text-emerald-800 font-bold block">REALISTA</span>
                    <span className="font-bold text-emerald-900 text-sm">{resultado.proyeccion_roi.escenario_realista}</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                    <span className="text-[10px] text-slate-500 font-bold block">OPTIMISTA</span>
                    <span className="font-bold text-slate-800">{resultado.proyeccion_roi.escenario_optimista}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 italic">{resultado.proyeccion_roi.conclusion}</p>
              </div>
            )}

            {/* 8. Hipótesis de Testing A/B Validables */}
            {resultado.experimentos_ab && resultado.experimentos_ab.length > 0 && (
              <div className="print-avoid-break border border-slate-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-3">
                  🧪 8. Hipótesis de Testing A/B Validables
                </h2>
                <div className="space-y-3">
                  {resultado.experimentos_ab.map((exp: ExperimentoAB, i: number) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                      <div className="font-bold text-slate-900 mb-1">Experimento {i + 1}: {exp.nombre}</div>
                      <div className="text-slate-700 text-[11px] mb-2 italic">&ldquo;{exp.hipotesis}&rdquo;</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] mb-1">
                        <div className="p-2 bg-white rounded border border-slate-200">
                          <span className="font-bold text-slate-500 block">Variable A (Control):</span>
                          <span className="text-slate-700">{exp.variable_a_control}</span>
                        </div>
                        <div className="p-2 bg-emerald-50 rounded border border-emerald-200">
                          <span className="font-bold text-emerald-800 block">Variable B (Variante):</span>
                          <span className="text-emerald-900">{exp.variable_b_variante}</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                        Métrica de Éxito Estimada: {exp.metrica_exito}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. Propuesta de Lead Magnet Técnico Interactivo */}
            {resultado.lead_magnet_tecnico && (
              <div className="print-avoid-break bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-2">
                  🔌 9. Propuesta de Lead Magnet Técnico (&ldquo;Widget de Amabilidad Digital&rdquo;)
                </h2>
                <div className="text-xs text-slate-900 font-bold mb-1">
                  &ldquo;{resultado.lead_magnet_tecnico.nombre}&rdquo;
                </div>
                <p className="text-xs text-slate-700 mb-2">{resultado.lead_magnet_tecnico.descripcion}</p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-white rounded border border-emerald-200">
                    <span className="font-bold text-emerald-900 block">Funcionamiento Técnico:</span>
                    <span className="text-slate-700">{resultado.lead_magnet_tecnico.como_funciona_vanilla_js}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-emerald-200">
                    <span className="font-bold text-emerald-900 block">Impacto en Captación MoFu:</span>
                    <span className="text-slate-700">{resultado.lead_magnet_tecnico.impacto_captacion}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 10. Copys Reescritos & Objeciones */}
            <div className="print-avoid-break grid grid-cols-2 gap-4">
              {resultado.copys_reescritos && (
                <div className="border border-slate-200 rounded-xl p-4">
                  <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-2">
                    ✍️ 10. Copys de Alta Conversión
                  </h2>
                  <div className="space-y-2 text-xs">
                    {resultado.copys_reescritos.map((c, i) => (
                      <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="font-bold text-slate-800">{c.enfoque}:</div>
                        <div className="text-slate-900 font-semibold mt-0.5">&ldquo;{c.headline}&rdquo;</div>
                        <div className="text-slate-600 text-[11px]">{c.subheadline}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resultado.armas_venta_objeciones && (
                <div className="border border-slate-200 rounded-xl p-4">
                  <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-2">
                    🛡️ 11. Armas de Venta vs Objeciones
                  </h2>
                  <div className="space-y-2 text-xs">
                    {resultado.armas_venta_objeciones.map((a, i) => (
                      <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="font-bold text-rose-800">Objeción: &ldquo;{a.objecion || a.objecion_cliente}&rdquo;</div>
                        <div className="text-slate-700 text-[11px] mt-0.5"><strong>Respuesta:</strong> {a.contramedida || a.contramedida_persuasiva}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 12. Roadmap en 5 Fases */}
            {resultado.roadmap && (
              <div className="print-avoid-break border border-slate-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-2">
                  🗺️ 12. Roadmap de Implementación en 5 Fases
                </h2>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {resultado.roadmap.map((r, i) => (
                    <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] font-bold text-emerald-800 block">{r.fase}</span>
                      <span className="text-[11px] text-slate-700 block mt-1">{r.accion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 13. Guión Consultivo de Cierre */}
            {resultado.guion_llamada && (
              <div className="print-avoid-break bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-wider mb-2">
                  📞 13. Guión Consultivo de Cierre en Videollamada (15 Minutos)
                </h2>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Min 0-3 (Apertura):</strong>
                    <span className="text-slate-700">{resultado.guion_llamada.min_0_3_apertura}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Min 3-8 (Demostración):</strong>
                    <span className="text-slate-700">{resultado.guion_llamada.min_3_8_demostracion}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Min 8-12 (Solución):</strong>
                    <span className="text-slate-700">{resultado.guion_llamada.min_8_12_solucion}</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Min 12-15 (Cierre):</strong>
                    <span className="text-slate-700">{resultado.guion_llamada.min_12_15_cierre}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pie de Página Oficial en PDF */}
            <div className="border-t-2 border-[#1B4332] pt-3 flex items-center justify-between text-[10px] text-slate-500">
              <div>© {new Date().getFullYear()} Marketing Amable • Todos los derechos reservados.</div>
              <div>Diseñado con pasión por <strong>MARKETING AMABLE</strong> <span className="font-mono">v.08</span></div>
            </div>

          </div>
        )}

      </main>

      {/* Footer Obligatorio Oficial de Marketing Amable (Pill Glassmorphism) */}
      <footer className="w-full border-t border-white/10 py-6 mt-16 bg-[#0D0D0D] no-print">
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <span className="text-slate-200 font-semibold">Auditor Épico</span> • Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Diseñado con pasión por</span>
            <a 
              href="https://www.marketingamable.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/15 transition-all align-middle shadow-sm"
            >
              <Image src="/002.gif" alt="Marketing Amable" width={20} height={20} className="h-5 w-auto" unoptimized />
              <span className="footer-marketing-span" style={{ color: '#FFFFFF', fontWeight: 800 }}>MARKETING</span>
              <span className="footer-amable-span" style={{ color: '#D8F3DC', fontWeight: 800 }}>AMABLE</span>
            </a>
            <span className="text-[10px] text-slate-500 font-mono tracking-tight">v.08</span>
          </div>
        </div>
      </footer>
    </div>
  );
}