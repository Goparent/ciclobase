
/* =============================================
   CicloBase — Main JavaScript
   SPA Router + Interactions + i18n (ES/CA)
   ============================================= */

// ============================================
// TRANSLATIONS
// ============================================
const i18n = {
  es: {
    nav: {
      howItWorks: 'Cómo funciona',
      marketplace: 'Marketplace',
      impact: 'Impacto',
      about: 'Nosotros',
      login: 'Iniciar sesión',
      register: 'Registrarse gratis',
    },
    hero: {
      eyebrow: 'Economía circular B2B · España',
      title: 'Los residuos son <em>recursos sin destino</em>',
      subtitle: 'CicloBase conecta empresas, pymes y autónomos para comprar y vender materiales industriales, subproductos y residuos. Sin comisiones. Sin burocracia. Con impacto real.',
      cta1: 'Publicar recurso',
      cta2: 'Explorar marketplace',
      stat1: { value: '12.400+', label: 'Toneladas circulando' },
      stat2: { value: '840+',    label: 'Empresas activas' },
      stat3: { value: '9.200t',  label: 'CO₂ evitado' },
    },
    howItWorks: {
      label: 'Cómo funciona',
      title: 'Tres pasos para cerrar el círculo',
      subtitle: 'CicloBase elimina la fricción del comercio de residuos. Regístrate como empresa, pyme o autónomo en menos de 2 minutos.',
      step1: { title: 'Regístrate', desc: 'Crea tu cuenta con email y datos de empresa. Sin CIF/NIF obligatorio en el primer paso. Acceso inmediato.' },
      step2: { title: 'Publica o busca', desc: 'Generadores publican sus recursos con fotos, cantidades y precio. Compradores filtran por categoría, zona y tipo.' },
      step3: { title: 'Cierra el trato', desc: 'Contacta directamente, negocia y cierra la transacción. Descarga tu informe de impacto ambiental.' },
    },
    footer: {
      tagline: 'La plataforma española de compraventa de residuos y subproductos industriales. Gratis para pymes y autónomos.',
      platform: 'Plataforma',
      company: 'Empresa',
      help: 'Ayuda',
      links: {
        marketplace: 'Marketplace',
        pricing: 'Precios',
        impact: 'Impacto',
        about: 'Sobre nosotros',
        contact: 'Contacto',
        press: 'Prensa',
        faq: 'Preguntas frecuentes',
        guide: 'Guía de usuario',
        legal: 'Aviso legal',
        privacy: 'Privacidad',
        cookies: 'Cookies',
      },
      rights: '© 2025 CicloBase. Todos los derechos reservados.',
      madeIn: 'Hecho en España 🇪🇸',
    }
  },
  ca: {
    nav: {
      howItWorks: 'Com funciona',
      marketplace: 'Marketplace',
      impact: 'Impacte',
      about: 'Nosaltres',
      login: 'Iniciar sessió',
      register: "Registrar-se gratuïtament",
    },
    hero: {
      eyebrow: 'Economia circular B2B · Espanya',
      title: 'Els residus són <em>recursos sense destí</em>',
      subtitle: 'CicloBase connecta empreses, pimes i autònoms per comprar i vendre materials industrials, subproductes i residus. Sense comissions. Sense burocràcia. Amb impacte real.',
      cta1: 'Publicar recurs',
      cta2: 'Explorar marketplace',
      stat1: { value: '12.400+', label: 'Tones en circulació' },
      stat2: { value: '840+',    label: 'Empreses actives' },
      stat3: { value: '9.200t',  label: 'CO₂ evitat' },
    },
    howItWorks: {
      label: 'Com funciona',
      title: 'Tres passos per tancar el cercle',
      subtitle: 'CicloBase elimina la fricció del comerç de residus. Registra\'t com a empresa, pime o autònom en menys de 2 minuts.',
      step1: { title: 'Registra\'t', desc: 'Crea el teu compte amb correu i dades d\'empresa. Sense CIF/NIF obligatori al primer pas. Accés immediat.' },
      step2: { title: 'Publica o busca', desc: 'Els generadors publiquen els seus recursos amb fotos, quantitats i preu. Els compradors filtren per categoria, zona i tipus.' },
      step3: { title: 'Tanca el tracte', desc: 'Contacta directament, negocia i tanca la transacció. Descarrega el teu informe d\'impacte ambiental.' },
    },
    footer: {
      tagline: 'La plataforma espanyola de compravenda de residus i subproductes industrials. Gratuïta per a pimes i autònoms.',
      platform: 'Plataforma',
      company: 'Empresa',
      help: 'Ajuda',
      links: {
        marketplace: 'Marketplace',
        pricing: 'Preus',
        impact: 'Impacte',
        about: 'Sobre nosaltres',
        contact: 'Contacte',
        press: 'Premsa',
        faq: 'Preguntes freqüents',
        guide: "Guia d'usuari",
        legal: 'Avís legal',
        privacy: 'Privacitat',
        cookies: 'Cookies',
      },
      rights: '© 2025 CicloBase. Tots els drets reservats.',
      madeIn: 'Fet a Espanya 🇪🇸',
    }
  }
};

// ============================================
// STATE
// ============================================
const state = {
  lang: 'es',
  currentPage: 'home',
  selectedRole: null,
  filters: {
    categories: [],
    resourceType: null,
    priceType: null,
  }
};

// ============================================
// SAMPLE DATA
// ============================================
const listings = [
  { id: 1, emoji: '🔩', title: 'Virutas de aluminio 6061', company: 'Metalúrgica Roca', companyVerified: true, location: 'Barcelona', qty: '2.400 kg', price: '0.40€/kg', priceType: 'negotiable', type: 'subproducto', category: 'metales', ler: '12 01 03', impact: '1.2t CO₂' },
  { id: 2, emoji: '🪵', title: 'Palets de madera EUR 1200×800', company: 'LogiPalet SL', companyVerified: true, location: 'Valencia', qty: '500 ud', price: 'Gratis', priceType: 'free', type: 'excedente', category: 'madera', ler: '15 01 03', impact: '0.8t CO₂' },
  { id: 3, emoji: '♻️', title: 'HDPE triturado post-industrial', company: 'PlastiRec BCN', companyVerified: false, location: 'Tarragona', qty: '800 kg', price: '0.55€/kg', priceType: 'fixed', type: 'residuo', category: 'plasticos', ler: '07 02 13', impact: '1.6t CO₂' },
  { id: 4, emoji: '🧵', title: 'Retales de tejido técnico', company: 'Fibres Tèxtils CAT', companyVerified: true, location: 'Sabadell', qty: '300 kg', price: '0.20€/kg', priceType: 'negotiable', type: 'subproducto', category: 'textil', ler: '04 02 21', impact: '0.4t CO₂' },
  { id: 5, emoji: '🫙', title: 'Aceite de corte usado filtrado', company: 'TallerMec Lleida', companyVerified: false, location: 'Lleida', qty: '1.200 L', price: 'Transporte', priceType: 'transport', type: 'residuo', category: 'aceites', ler: '12 01 07', impact: '2.1t CO₂' },
  { id: 6, emoji: '📦', title: 'Film stretch LLDPE transparente', company: 'MercaEmbal SL', companyVerified: true, location: 'Madrid', qty: '1.500 kg', price: '0.30€/kg', priceType: 'fixed', type: 'excedente', category: 'plasticos', ler: '15 01 02', impact: '1.0t CO₂' },
];

const categories = [
  { id: 'plasticos', label: 'Plásticos y cauchos', emoji: '♻️', count: 48 },
  { id: 'metales', label: 'Metales y ferrosos', emoji: '🔩', count: 37 },
  { id: 'madera', label: 'Madera y derivados', emoji: '🪵', count: 29 },
  { id: 'textil', label: 'Textil e indumentaria', emoji: '🧵', count: 21 },
  { id: 'aceites', label: 'Aceites y lubricantes', emoji: '🫙', count: 18 },
  { id: 'papel', label: 'Papel y cartón', emoji: '📄', count: 34 },
  { id: 'construccion', label: 'Construcción y minería', emoji: '🏗️', count: 26 },
  { id: 'alimentos', label: 'Residuos alimentarios', emoji: '🌾', count: 15 },
  { id: 'equipos', label: 'Equipos e instalaciones', emoji: '⚙️', count: 12 },
  { id: 'quimicos', label: 'Productos químicos', emoji: '⚗️', count: 9 },
];

// ============================================
// ROUTER
// ============================================
const pages = {
  home: renderHome,
  marketplace: renderMarketplace,
  dashboard: renderDashboard,
  impact: renderImpact,
  login: renderLogin,
  register: renderRegister,
};

function navigate(page) {
  state.currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
  // Update URL hash for GitHub Pages compatibility
  history.pushState(null, '', `#${page}`);
}

function render() {
  const app = document.getElementById('app');
  const isDashboard = state.currentPage === 'dashboard';
  const isAuth = state.currentPage === 'login' || state.currentPage === 'register';

  if (isDashboard) {
    app.innerHTML = pages[state.currentPage]();
  } else if (isAuth) {
    app.innerHTML = pages[state.currentPage]();
  } else {
    app.innerHTML = renderNavbar() + pages[state.currentPage]() + renderFooter();
  }

  attachEventListeners();
  initScrollEffects();
  initAnimations();
}

// ============================================
// NAVBAR
// ============================================
function renderNavbar() {
  const t = i18n[state.lang].nav;
  return `
    <nav class="navbar" id="navbar">
      <div class="container">
        <div class="navbar__inner">
          <a class="navbar__logo" onclick="navigate('home')">
            <span class="logo-dot"></span>CicloBase
          </a>
          <nav class="navbar__nav">
            <a onclick="navigate('home')" class="${state.currentPage==='home'?'active':''}">${t.howItWorks}</a>
            <a onclick="navigate('marketplace')" class="${state.currentPage==='marketplace'?'active':''}">${t.marketplace}</a>
            <a onclick="navigate('impact')" class="${state.currentPage==='impact'?'active':''}">${t.impact}</a>
            <a href="#">${t.about}</a>
          </nav>
          <div class="navbar__actions">
            <div class="lang-switcher">
              <span class="${state.lang==='es'?'active':''}" onclick="switchLang('es')">ES</span>
              <span>/</span>
              <span class="${state.lang==='ca'?'active':''}" onclick="switchLang('ca')">CA</span>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="navigate('login')">${t.login}</button>
            <button class="btn btn-primary btn-sm" onclick="navigate('register')">${t.register}</button>
          </div>
          <div class="mobile-menu-btn" onclick="toggleMobileMenu()">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-nav" id="mobileNav">
      <div class="mobile-nav__close" onclick="toggleMobileMenu()">✕</div>
      <div class="mobile-nav__links">
        <a onclick="navigate('home');toggleMobileMenu()">${t.howItWorks}</a>
        <a onclick="navigate('marketplace');toggleMobileMenu()">${t.marketplace}</a>
        <a onclick="navigate('impact');toggleMobileMenu()">${t.impact}</a>
        <a href="#" onclick="toggleMobileMenu()">${t.about}</a>
        <a onclick="navigate('login');toggleMobileMenu()">${t.login}</a>
      </div>
      <div style="margin-top:2rem">
        <button class="btn btn-primary btn-lg w-full" onclick="navigate('register');toggleMobileMenu()">${t.register}</button>
      </div>
    </div>
  `;
}

// ============================================
// FOOTER
// ============================================
function renderFooter() {
  const t = i18n[state.lang].footer;
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="logo-text"><span style="width:8px;height:8px;background:var(--terra);border-radius:999px;display:inline-block;margin-right:6px"></span>CicloBase</div>
            <p>${t.tagline}</p>
            <div class="social-icons mt-6">
              <div class="social-icon">in</div>
              <div class="social-icon">𝕏</div>
              <div class="social-icon">f</div>
            </div>
          </div>
          <div>
            <div class="footer__col-title">${t.platform}</div>
            <ul class="footer__links">
              <li><a onclick="navigate('marketplace')">${t.links.marketplace}</a></li>
              <li><a href="#">${t.links.pricing}</a></li>
              <li><a onclick="navigate('impact')">${t.links.impact}</a></li>
            </ul>
          </div>
          <div>
            <div class="footer__col-title">${t.company}</div>
            <ul class="footer__links">
              <li><a href="#">${t.links.about}</a></li>
              <li><a href="#">${t.links.contact}</a></li>
              <li><a href="#">${t.links.press}</a></li>
            </ul>
          </div>
          <div>
            <div class="footer__col-title">${t.help}</div>
            <ul class="footer__links">
              <li><a href="#">${t.links.faq}</a></li>
              <li><a href="#">${t.links.guide}</a></li>
              <li><a href="#">${t.links.legal}</a></li>
              <li><a href="#">${t.links.privacy}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>${t.rights}</span>
          <div class="footer__bottom-links">
            <a href="#">${t.links.legal}</a>
            <a href="#">${t.links.privacy}</a>
            <a href="#">${t.links.cookies}</a>
          </div>
          <span>${t.madeIn}</span>
        </div>
      </div>
    </footer>
  `;
}

// ============================================
// HOME PAGE
// ============================================
function renderHome() {
  const t = i18n[state.lang];
  const h = t.hero;
  const hw = t.howItWorks;

  return `
    <!-- HERO -->
    <section class="hero">
      <div class="container">
        <div class="hero__inner">
          <div class="hero__content">
            <div class="hero__eyebrow animate-fade-up">🔄 ${h.eyebrow}</div>
            <h1 class="hero__title animate-fade-up-1">${h.title}</h1>
            <p class="hero__subtitle animate-fade-up-2">${h.subtitle}</p>
            <div class="hero__actions animate-fade-up-3">
              <button class="btn btn-primary btn-lg" onclick="navigate('register')">
                🌱 ${h.cta1}
              </button>
              <button class="btn btn-secondary btn-lg" onclick="navigate('marketplace')">
                ${h.cta2} →
              </button>
            </div>
            <div class="hero__stats animate-fade-up-3">
              <div>
                <div class="hero__stat-value" data-count="${h.stat1.value}">${h.stat1.value}</div>
                <div class="hero__stat-label">${h.stat1.label}</div>
              </div>
              <div>
                <div class="hero__stat-value">${h.stat2.value}</div>
                <div class="hero__stat-label">${h.stat2.label}</div>
              </div>
              <div>
                <div class="hero__stat-value">${h.stat3.value}</div>
                <div class="hero__stat-label">${h.stat3.label}</div>
              </div>
            </div>
          </div>
          <div class="hero__visual animate-fade-in">
            <div class="hero__card-stack">
              <div class="hero__card-bg"></div>
              <div class="hero__card-bg"></div>
              <div class="hero__main-card">
                <div class="listing-preview__header">
                  <div class="listing-preview__img">🔩</div>
                  <div>
                    <div class="listing-preview__title">Virutas de aluminio 6061</div>
                    <div class="listing-preview__company">✓ Metalúrgica Roca · Barcelona</div>
                  </div>
                </div>
                <div class="listing-preview__tags">
                  <span class="tag tag-terra">Subproducto</span>
                  <span class="tag tag-sand">Metales</span>
                  <span class="tag tag-sage">LER 12 01 03</span>
                </div>
                <div class="listing-preview__meta">
                  <div class="listing-preview__meta-item">
                    <div class="listing-preview__meta-val">2.400</div>
                    <div class="listing-preview__meta-key">kg disp.</div>
                  </div>
                  <div class="listing-preview__meta-item">
                    <div class="listing-preview__meta-val">0.40€</div>
                    <div class="listing-preview__meta-key">por kg</div>
                  </div>
                  <div class="listing-preview__meta-item">
                    <div class="listing-preview__meta-val">BCN</div>
                    <div class="listing-preview__meta-key">origen</div>
                  </div>
                </div>
                <div class="listing-preview__impact">
                  <div class="listing-preview__impact-icon">🌿</div>
                  <div class="listing-preview__impact-text">Evita 1.2t CO₂ · 3.400L agua · 8.200 MJ</div>
                </div>
                <button class="btn btn-primary w-full mt-4" style="justify-content:center">Contactar vendedor</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUSTED BY -->
    <div style="background:var(--white);padding:var(--s8) 0;border-bottom:1px solid var(--border)">
      <div class="container">
        <div style="display:flex;align-items:center;gap:var(--s8);flex-wrap:wrap;justify-content:center">
          <span style="font-size:var(--text-xs);color:var(--bark-light);text-transform:uppercase;letter-spacing:0.1em;font-weight:600">Empresas que confían</span>
          ${['Cemex España','Solvay','Roca Sanitario','Nestlé España','Uralita','Holcim'].map(c=>`<span style="font-family:var(--font-display);font-weight:600;color:var(--bark-light);font-size:var(--text-sm);white-space:nowrap">${c}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- HOW IT WORKS -->
    <section class="section how-it-works">
      <div class="container">
        <div class="text-center">
          <div class="section-label" style="justify-content:center">${hw.label}</div>
          <h2 class="section-title">${hw.title}</h2>
          <p class="section-subtitle" style="margin:0 auto">${hw.subtitle}</p>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h4>${hw.step1.title}</h4>
            <p>${hw.step1.desc}</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h4>${hw.step2.title}</h4>
            <p>${hw.step2.desc}</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h4>${hw.step3.title}</h4>
            <p>${hw.step3.desc}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUE PROPS -->
    <section class="section value-props">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s16);align-items:center">
          <div>
            <div class="section-label">Por qué CicloBase</div>
            <h2 class="section-title">Pensado para pymes y autónomos</h2>
            <p class="section-subtitle" style="margin-bottom:var(--s8)">Recircular cobra comisiones. Nosotros no. CicloBase es gratuito para pequeñas empresas, talleres, cooperativas y profesionales independientes.</p>
            <button class="btn btn-primary" onclick="navigate('register')">Empieza gratis →</button>
          </div>
          <div class="grid-2" style="gap:var(--s4)">
            <div class="value-card">
              <span class="value-icon">💸</span>
              <h4>Sin comisiones</h4>
              <p>Tier gratuito sin porcentaje sobre transacciones. Para siempre.</p>
            </div>
            <div class="value-card">
              <span class="value-icon">⚡</span>
              <h4>Registro en 2 min</h4>
              <p>Sin CIF obligatorio al inicio. Publica tu primer recurso en minutos.</p>
            </div>
            <div class="value-card">
              <span class="value-icon">🔍</span>
              <h4>AI matching</h4>
              <p>Sugerimos compradores para tu material automáticamente.</p>
            </div>
            <div class="value-card">
              <span class="value-icon">🌿</span>
              <h4>Informe de impacto</h4>
              <p>Métricas reales para tu memoria de sostenibilidad o EINF.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAND -->
    <section class="stats-band">
      <div class="container">
        <div class="grid-4">
          <div class="stat-item">
            <div class="stat-item__value">12.400t</div>
            <div class="stat-item__sub">Circulando</div>
            <div class="stat-item__label">Toneladas de residuos valorizados</div>
          </div>
          <div class="stat-item">
            <div class="stat-item__value">840+</div>
            <div class="stat-item__sub">Empresas</div>
            <div class="stat-item__label">Activas en la plataforma</div>
          </div>
          <div class="stat-item">
            <div class="stat-item__value">9.200t</div>
            <div class="stat-item__sub">CO₂ Evitado</div>
            <div class="stat-item__label">Toneladas equivalentes</div>
          </div>
          <div class="stat-item">
            <div class="stat-item__value">€680K</div>
            <div class="stat-item__sub">Ahorrado</div>
            <div class="stat-item__label">En costes de gestión de residuos</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES PREVIEW -->
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:var(--s10)">
          <div>
            <div class="section-label">Categorías</div>
            <h2 class="section-title" style="margin-bottom:0">¿Qué tipo de material buscas?</h2>
          </div>
          <button class="btn btn-secondary" onclick="navigate('marketplace')">Ver todo →</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--s3)">
          ${categories.slice(0,10).map(c => `
            <div onclick="navigate('marketplace')" style="background:var(--sand-light);border:1px solid var(--border);border-radius:var(--r-lg);padding:var(--s5);text-align:center;cursor:pointer;transition:all 0.25s var(--ease)" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
              <div style="font-size:1.75rem;margin-bottom:var(--s2)">${c.emoji}</div>
              <div style="font-size:var(--text-xs);font-weight:600;color:var(--bark);margin-bottom:2px">${c.label}</div>
              <div style="font-size:0.65rem;color:var(--bark-light)">${c.count} recursos</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="section" style="background:var(--terra-light);text-align:center">
      <div class="container container--narrow">
        <div class="section-label" style="justify-content:center">Únete a CicloBase</div>
        <h2 class="section-title">¿Tienes residuos o buscas materiales?</h2>
        <p class="section-subtitle" style="margin:var(--s4) auto var(--s8)">Más de 840 empresas ya están cerrando el círculo. Regístrate gratis en menos de 2 minutos.</p>
        <div style="display:flex;gap:var(--s4);justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" onclick="navigate('register')">🌱 Publicar mi primer recurso</button>
          <button class="btn btn-secondary btn-lg" onclick="navigate('marketplace')">Explorar marketplace</button>
        </div>
      </div>
    </section>
  `;
}

// ============================================
// MARKETPLACE PAGE
// ============================================
function renderMarketplace() {
  const activeFilters = state.filters.categories;

  const filteredListings = activeFilters.length > 0
    ? listings.filter(l => activeFilters.includes(l.category))
    : listings;

  return `
    <div class="page-hero">
      <div class="container">
        <div class="breadcrumb">
          <span onclick="navigate('home')">Inicio</span>
          <span class="sep">›</span>
          <span>Marketplace</span>
        </div>
        <h1>Marketplace de recursos</h1>
        <p>Compra y vende residuos, subproductos y excedentes industriales entre empresas españolas.</p>
      </div>
    </div>

    <section class="section" style="padding-top:var(--s8)">
      <div class="container">
        <div class="marketplace-layout">

          <!-- SIDEBAR -->
          <aside class="filter-sidebar">
            <h3>🔍 Filtros</h3>

            <div class="filter-group">
              <div class="filter-group__label">Categoría</div>
              ${categories.slice(0, 8).map(c => `
                <label class="filter-option">
                  <input type="checkbox" value="${c.id}" ${activeFilters.includes(c.id) ? 'checked' : ''} onchange="toggleFilter('${c.id}')">
                  ${c.emoji} ${c.label}
                  <span class="count">${c.count}</span>
                </label>
              `).join('')}
            </div>

            <div class="filter-group">
              <div class="filter-group__label">Tipo de recurso</div>
              ${[['residuo','🔴 Residuo'],['subproducto','🟡 Subproducto'],['excedente','🟢 Excedente']].map(([v,l])=>`
                <label class="filter-option">
                  <input type="checkbox" value="${v}" onchange="toggleFilter('${v}')">
                  ${l}
                </label>
              `).join('')}
            </div>

            <div class="filter-group">
              <div class="filter-group__label">Precio</div>
              ${[['free','Solo gratuitos'],['negotiable','Precio negociable'],['fixed','Precio fijo']].map(([v,l])=>`
                <label class="filter-option">
                  <input type="checkbox" value="${v}" onchange="toggleFilter('${v}')">
                  ${l}
                </label>
              `).join('')}
            </div>

            <button class="btn btn-secondary w-full btn-sm mt-4" onclick="clearFilters()">Limpiar filtros</button>
          </aside>

          <!-- MAIN -->
          <div>
            <div class="marketplace-header">
              <div class="search-bar">
                <span class="search-icon">🔍</span>
                <input type="text" placeholder="Buscar por material, LER, empresa..." id="searchInput" oninput="handleSearch(this.value)">
              </div>
              <select class="sort-select" onchange="handleSort(this.value)">
                <option value="recent">Más recientes</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="qty">Mayor cantidad</option>
              </select>
            </div>

            <div style="font-size:var(--text-sm);color:var(--bark-light);margin-bottom:var(--s4)">
              ${filteredListings.length} recursos encontrados ${activeFilters.length > 0 ? `· <span style="color:var(--terra);cursor:pointer" onclick="clearFilters()">Limpiar filtros</span>` : ''}
            </div>

            <div class="listings-grid" id="listingsGrid">
              ${filteredListings.map(l => renderListingCard(l)).join('')}
            </div>

            ${filteredListings.length === 0 ? `
              <div style="text-align:center;padding:var(--s16) var(--s8);color:var(--bark-light)">
                <div style="font-size:3rem;margin-bottom:var(--s4)">🔍</div>
                <h3 style="color:var(--bark-mid);margin-bottom:var(--s3)">Sin resultados</h3>
                <p>Prueba con otros filtros o explora todas las categorías.</p>
                <button class="btn btn-secondary mt-4" onclick="clearFilters()">Ver todos los recursos</button>
              </div>
            ` : ''}

            <!-- PAGINATION -->
            <div style="display:flex;justify-content:center;gap:var(--s2);margin-top:var(--s10)">
              ${[1,2,3,'...',12].map((n,i) => `
                <button style="width:36px;height:36px;border-radius:var(--r-md);background:${n===1?'var(--terra)':'var(--white)'};color:${n===1?'var(--white)':'var(--bark-mid)'};border:1.5px solid ${n===1?'var(--terra)':'var(--border)'};font-size:var(--text-sm);cursor:pointer">${n}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderListingCard(l) {
  const priceColor = l.priceType === 'free' ? 'color:var(--sage)' : l.priceType === 'transport' ? 'color:var(--bark-mid)' : 'color:var(--terra)';
  return `
    <div class="listing-card" onclick="showListingDetail(${l.id})">
      <div class="listing-card__img">
        ${l.emoji}
        <span class="listing-card__type-badge">
          <span class="tag ${l.type==='residuo'?'tag-terra':l.type==='subproducto'?'tag-sand':'tag-sage'}">${l.type}</span>
        </span>
      </div>
      <div class="listing-card__body">
        <div class="listing-card__location">📍 ${l.location}</div>
        <div class="listing-card__title">${l.title}</div>
        <div class="listing-card__company">
          ${l.companyVerified ? '✅' : '🏢'} ${l.company}
        </div>
        <div class="listing-card__tags" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:var(--s4)">
          <span class="tag tag-sage" style="font-size:0.65rem">${l.ler}</span>
          <span class="tag tag-sand" style="font-size:0.65rem">${l.impact}</span>
        </div>
        <div class="listing-card__meta">
          <span class="listing-card__qty">${l.qty}</span>
          <span class="listing-card__price" style="${priceColor}">${l.price}</span>
        </div>
      </div>
    </div>
  `;
}

function showListingDetail(id) {
  const listing = listings.find(l => l.id === id);
  if (!listing) return;

  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(61,43,31,0.5);z-index:500;display:flex;align-items:center;justify-content:center;padding:var(--s6);backdrop-filter:blur(4px)';
  modal.innerHTML = `
    <div style="background:var(--white);border-radius:var(--r-xl);padding:var(--s8);max-width:560px;width:100%;box-shadow:var(--shadow-xl);max-height:90vh;overflow-y:auto">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--s6)">
        <div style="display:flex;gap:var(--s4);align-items:center">
          <div style="font-size:3rem">${listing.emoji}</div>
          <div>
            <h3 style="margin-bottom:4px">${listing.title}</h3>
            <div style="font-size:var(--text-sm);color:var(--bark-light)">${listing.companyVerified?'✅':''} ${listing.company} · ${listing.location}</div>
          </div>
        </div>
        <button onclick="this.closest('[style*=fixed]').remove()" style="font-size:1.25rem;cursor:pointer;color:var(--bark-light);padding:var(--s2)">✕</button>
      </div>
      <div style="display:flex;gap:var(--s2);flex-wrap:wrap;margin-bottom:var(--s6)">
        <span class="tag tag-terra">${listing.type}</span>
        <span class="tag tag-sand">${listing.category}</span>
        <span class="tag tag-sage">LER ${listing.ler}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--s3);background:var(--sand-light);border-radius:var(--r-lg);padding:var(--s5);margin-bottom:var(--s6)">
        <div style="text-align:center">
          <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:var(--bark)">${listing.qty}</div>
          <div style="font-size:0.65rem;color:var(--bark-light);text-transform:uppercase;letter-spacing:0.06em">Disponible</div>
        </div>
        <div style="text-align:center">
          <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:var(--terra)">${listing.price}</div>
          <div style="font-size:0.65rem;color:var(--bark-light);text-transform:uppercase;letter-spacing:0.06em">Precio</div>
        </div>
        <div style="text-align:center">
          <div style="font-family:var(--font-display);font-weight:700;font-size:var(--text-lg);color:var(--sage)">${listing.impact}</div>
          <div style="font-size:0.65rem;color:var(--bark-light);text-transform:uppercase;letter-spacing:0.06em">CO₂ evitado</div>
        </div>
      </div>
      <div style="background:var(--sage-light);border-radius:var(--r-lg);padding:var(--s4);margin-bottom:var(--s6)">
        <div style="font-size:var(--text-xs);font-weight:600;color:var(--sage);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--s2)">🌿 Impacto ambiental estimado</div>
        <div style="display:flex;gap:var(--s4);flex-wrap:wrap">
          <span style="font-size:var(--text-sm);color:var(--bark-mid)">🌍 ${listing.impact} CO₂</span>
          <span style="font-size:var(--text-sm);color:var(--bark-mid)">💧 3.200L agua</span>
          <span style="font-size:var(--text-sm);color:var(--bark-mid)">⚡ 7.800 MJ</span>
        </div>
      </div>
      <div style="display:flex;gap:var(--s3)">
        <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="this.closest('[style*=fixed]').remove();navigate('register')">✉️ Contactar vendedor</button>
        <button class="btn btn-secondary" onclick="this.closest('[style*=fixed]').remove();navigate('register')">📦 Solicitar muestra</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if(e.target === modal) modal.remove(); });
}

// ============================================
// DASHBOARD PAGE
// ============================================
function renderDashboard() {
  const lang = state.lang;
  return `
    <div class="dashboard-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar-nav" id="sidebarNav">
        <div class="sidebar-nav__logo">
          <span class="logo-dot" style="width:8px;height:8px;background:var(--terra);border-radius:var(--r-full)"></span>
          CicloBase
        </div>
        <div class="sidebar-nav__section">Principal</div>
        <div class="sidebar-nav__item active" onclick="highlightNav(this)">
          <span class="icon">🏠</span> Resumen
        </div>
        <div class="sidebar-nav__item" onclick="highlightNav(this)">
          <span class="icon">📦</span> Mis recursos
          <span class="sidebar-nav__badge">4</span>
        </div>
        <div class="sidebar-nav__item" onclick="highlightNav(this)">
          <span class="icon">💬</span> Mensajes
          <span class="sidebar-nav__badge">3</span>
        </div>
        <div class="sidebar-nav__item" onclick="highlightNav(this)">
          <span class="icon">🔄</span> Transacciones
        </div>
        <div class="sidebar-nav__section">Empresa</div>
        <div class="sidebar-nav__item" onclick="highlightNav(this)">
          <span class="icon">🌿</span> Informe de impacto
        </div>
        <div class="sidebar-nav__item" onclick="highlightNav(this)">
          <span class="icon">🏢</span> Perfil empresa
        </div>
        <div class="sidebar-nav__item" onclick="highlightNav(this)">
          <span class="icon">⚙️</span> Configuración
        </div>
        <div style="margin-top:auto;padding-top:var(--s8)">
          <div class="sidebar-nav__item" style="color:var(--error)" onclick="navigate('home')">
            <span class="icon">←</span> Salir
          </div>
        </div>
      </aside>

      <!-- MAIN -->
      <main class="dashboard-main">
        <div class="dashboard-topbar">
          <div>
            <h1>Buenas, Taller Gómez 👋</h1>
            <p style="font-size:var(--text-sm);color:var(--bark-light);margin-top:4px">Hoy, ${new Date().toLocaleDateString('es-ES', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
          </div>
          <div style="display:flex;align-items:center;gap:var(--s3)">
            <button class="btn btn-primary btn-sm" onclick="navigate('marketplace')">+ Publicar recurso</button>
            <div class="user-avatar">🏭</div>
          </div>
        </div>

        <!-- STAT CARDS -->
        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-card__icon">📦</div>
            <div class="stat-card__value">4</div>
            <div class="stat-card__label">Recursos activos</div>
            <div class="stat-card__change up">↑ +1 esta semana</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__icon">🔄</div>
            <div class="stat-card__value">7</div>
            <div class="stat-card__label">Transacciones en curso</div>
            <div class="stat-card__change up">↑ 2 pendientes de acción</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__icon">🌿</div>
            <div class="stat-card__value">4.2t</div>
            <div class="stat-card__label">CO₂ evitado (total)</div>
            <div class="stat-card__change up">↑ +0.8t este mes</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__icon">💶</div>
            <div class="stat-card__value">€3.240</div>
            <div class="stat-card__label">Ahorrado en gestión</div>
            <div class="stat-card__change up">↑ +€680 este mes</div>
          </div>
        </div>

        <!-- MAIN GRID -->
        <div class="dashboard-grid">
          <!-- ACTIVITY -->
          <div class="card">
            <div class="card__header">
              <div class="card__title">Actividad reciente</div>
              <button class="btn btn-ghost btn-sm">Ver todo</button>
            </div>
            ${[
              { dot: '', text: '<strong>Nestlé España</strong> ha solicitado muestra de <strong>Film LLDPE</strong>', time: 'hace 15 min' },
              { dot: 'sage', text: 'Transacción #TB-0047 <strong>completada</strong> con Cementos Molins', time: 'hace 2 horas' },
              { dot: 'sage', text: 'Nuevo mensaje de <strong>LogiPalet Valencia</strong> sobre palets EUR', time: 'hace 3 horas' },
              { dot: '', text: '<strong>PlastiRec BCN</strong> ha hecho una oferta por <strong>Viruta de aluminio</strong>', time: 'ayer' },
              { dot: 'sand', text: 'Tu recurso <strong>Retales tejido técnico</strong> ha expirado', time: 'ayer' },
            ].map(a => `
              <div class="activity-item">
                <div class="activity-dot ${a.dot}"></div>
                <div>
                  <div class="activity-text">${a.text}</div>
                  <div class="activity-time">${a.time}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- IMPACT SUMMARY -->
          <div>
            <div class="card">
              <div class="card__header">
                <div class="card__title">Mi impacto</div>
                <button class="btn btn-ghost btn-sm" onclick="navigate('impact')">Ver informe</button>
              </div>
              <div class="impact-mini-card">
                <div class="impact-mini-icon">🌍</div>
                <div>
                  <div class="impact-mini-label">CO₂ evitado</div>
                  <div class="impact-mini-value">4.2t</div>
                </div>
              </div>
              <div class="impact-mini-card">
                <div class="impact-mini-icon">💧</div>
                <div>
                  <div class="impact-mini-label">Agua ahorrada</div>
                  <div class="impact-mini-value">8.400L</div>
                </div>
              </div>
              <div class="impact-mini-card">
                <div class="impact-mini-icon">⚡</div>
                <div>
                  <div class="impact-mini-label">Energía recuperada</div>
                  <div class="impact-mini-value">28.200 MJ</div>
                </div>
              </div>
              <button class="btn btn-sage w-full mt-4" style="justify-content:center;font-size:var(--text-sm)">📄 Descargar informe PDF</button>
            </div>

            <!-- QUICK ACTIONS -->
            <div class="card mt-4">
              <div class="card__title mb-4">Acciones rápidas</div>
              <div style="display:flex;flex-direction:column;gap:var(--s3)">
                <button class="btn btn-primary" style="justify-content:flex-start" onclick="navigate('marketplace')">➕ Publicar nuevo recurso</button>
                <button class="btn btn-secondary" style="justify-content:flex-start" onclick="navigate('marketplace')">🔍 Buscar materiales</button>
                <button class="btn btn-secondary" style="justify-content:flex-start">💬 Ir a mensajes <span style="background:var(--terra);color:white;border-radius:999px;font-size:0.6rem;padding:1px 6px;margin-left:4px">3</span></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

// ============================================
// IMPACT PAGE
// ============================================
function renderImpact() {
  return `
    <div class="impact-hero">
      <div class="container">
        <div class="section-label" style="justify-content:center;color:var(--sand-light)">Metodología verificada</div>
        <h1>Impacto real, medido con rigor</h1>
        <p>CicloBase calcula el impacto ambiental de cada transacción usando metodología ACV (Análisis de Ciclo de Vida), verificada por terceros independientes.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="text-center mb-6">
          <div class="section-label" style="justify-content:center">Indicadores</div>
          <h2 class="section-title">Cuatro métricas que importan</h2>
        </div>
        <div class="impact-metrics">
          ${[
            { icon: '🌍', value: '9.200t', unit: 'toneladas CO₂ eq.', label: 'Huella de carbono evitada', color: 'var(--sage)' },
            { icon: '💧', value: '18.4M',  unit: 'litros de agua',    label: 'Agua ahorrada',            color: 'var(--info)' },
            { icon: '⚡', value: '48 GJ',  unit: 'gigajulios',        label: 'Demanda energía recuperada', color: 'var(--warning)' },
            { icon: '❤️', value: '0.14',   unit: 'AVAD evitados',     label: 'Salud humana mejorada',    color: 'var(--error)' },
          ].map(m => `
            <div class="impact-metric-card">
              <span class="impact-metric-icon">${m.icon}</span>
              <div class="impact-metric-value" style="color:${m.color}">${m.value}</div>
              <div class="impact-metric-unit">${m.unit}</div>
              <div class="impact-metric-label">${m.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="methodology-section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s16);align-items:center">
          <div>
            <div class="section-label">Metodología ACV</div>
            <h2 class="section-title">¿Cómo calculamos el impacto?</h2>
            <p class="section-subtitle" style="margin-bottom:var(--s8)">Utilizamos Análisis de Ciclo de Vida (ACV/LCA) con bases de datos ecoinvent y ELCD. Solo necesitamos tres datos tuyos para calcular el impacto evitado vs. el tratamiento habitual del residuo.</p>
            <div style="display:flex;flex-direction:column;gap:var(--s3)">
              ${[['1','Categoría del material','Plástico, metal, madera...'],['2','Cantidad','En kg, litros o unidades'],['3','Tratamiento habitual','Vertedero, incineración, reciclaje...']].map(([n,t,d])=>`
                <div style="display:flex;align-items:flex-start;gap:var(--s4);background:var(--sand-light);border-radius:var(--r-lg);padding:var(--s4)">
                  <div style="width:28px;height:28px;background:var(--terra);color:white;border-radius:var(--r-full);display:flex;align-items:center;justify-content:center;font-size:var(--text-xs);font-weight:700;flex-shrink:0">${n}</div>
                  <div>
                    <div style="font-weight:600;font-size:var(--text-sm);color:var(--bark)">${t}</div>
                    <div style="font-size:var(--text-xs);color:var(--bark-light)">${d}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div>
            <div class="lca-bar">
              <div class="lca-bar__label"><span>Plástico reciclado vs vertedero</span><span style="color:var(--sage)">−68% CO₂</span></div>
              <div class="lca-bar__track"><div class="lca-bar__fill" style="width:68%;background:var(--sage)"></div></div>
            </div>
            <div class="lca-bar" style="margin-top:var(--s5)">
              <div class="lca-bar__label"><span>Metal recuperado vs extracción</span><span style="color:var(--terra)">−91% CO₂</span></div>
              <div class="lca-bar__track"><div class="lca-bar__fill" style="width:91%;background:var(--terra)"></div></div>
            </div>
            <div class="lca-bar" style="margin-top:var(--s5)">
              <div class="lca-bar__label"><span>Madera reutilizada vs nueva</span><span style="color:var(--warning)">−45% CO₂</span></div>
              <div class="lca-bar__track"><div class="lca-bar__fill" style="width:45%;background:var(--warning)"></div></div>
            </div>
            <div class="lca-bar" style="margin-top:var(--s5)">
              <div class="lca-bar__label"><span>Textil recuperado vs fabricación</span><span style="color:var(--info)">−73% CO₂</span></div>
              <div class="lca-bar__track"><div class="lca-bar__fill" style="width:73%;background:var(--info)"></div></div>
            </div>
            <div style="background:var(--sage-light);border-radius:var(--r-lg);padding:var(--s5);margin-top:var(--s8);border:1px solid rgba(107,143,113,0.2)">
              <div style="font-size:var(--text-xs);font-weight:600;color:var(--sage);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--s2)">Métodos utilizados</div>
              ${['ReCiPe 2016 Midpoint (H)','CED v1.10 (Energía)','AWARE v1.01 (Agua)','ReCiPe 2016 Endpoint'].map(m=>`<div style="font-size:var(--text-sm);color:var(--bark-mid);padding:var(--s1) 0">✓ ${m}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="methodology-section" style="background:var(--sand-light)">
      <div class="container">
        <div class="text-center mb-6">
          <h2 class="section-title">Para tu informe de sostenibilidad</h2>
          <p class="section-subtitle" style="margin:0 auto">Los datos de impacto de CicloBase son utilizables directamente en memorias de sostenibilidad, EINF (Estado de Información No Financiera) y reportes bajo estándares GRI y CSRD.</p>
        </div>
        <div class="methodology-steps">
          <div class="method-card">
            <div class="method-card__badge">EINF / CSRD</div>
            <h4>Reporte no financiero</h4>
            <p>Datos de impacto con metodología trazable para tu declaración no financiera anual obligatoria.</p>
          </div>
          <div class="method-card">
            <div class="method-card__badge">ODS / SDG</div>
            <h4>Objetivos de Desarrollo</h4>
            <p>Contribución a ODS 12 (producción responsable) y ODS 13 (acción climática) con datos cuantificados.</p>
          </div>
          <div class="method-card">
            <div class="method-card__badge">ISO 14040/44</div>
            <h4>Norma ACV</h4>
            <p>Metodología alineada con norma ISO de Análisis de Ciclo de Vida para máxima credibilidad externa.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--bark);text-align:center">
      <div class="container container--narrow">
        <h2 style="color:var(--sand);font-family:var(--font-display)">Empieza a medir tu impacto hoy</h2>
        <p style="color:rgba(232,217,197,0.7);margin:var(--s4) auto var(--s8);font-size:var(--text-lg)">Cada transacción en CicloBase genera automáticamente tu informe de impacto descargable.</p>
        <button class="btn btn-primary btn-lg" onclick="navigate('register')">Registrarse gratis →</button>
      </div>
    </section>
  `;
}

// ============================================
// LOGIN PAGE
// ============================================
function renderLogin() {
  const t = i18n[state.lang];
  return `
    <div class="auth-layout">
      <div class="auth-visual">
        <div class="auth-visual__content">
          <div class="auth-visual__logo">
            <span style="width:8px;height:8px;background:var(--terra);border-radius:var(--r-full);display:inline-block"></span>
            CicloBase
          </div>
          <h2 class="auth-visual__title">Vuelves para cerrar el círculo</h2>
          <p class="auth-visual__subtitle">Cientos de empresas están esperando para valorizar sus residuos. O para comprar los tuyos.</p>
          <div class="auth-benefits">
            <div class="auth-benefit"><div class="auth-benefit__icon">💸</div> Sin comisiones de transacción</div>
            <div class="auth-benefit"><div class="auth-benefit__icon">🌿</div> Informe de impacto descargable</div>
            <div class="auth-benefit"><div class="auth-benefit__icon">🔍</div> AI matching automático</div>
            <div class="auth-benefit"><div class="auth-benefit__icon">📄</div> Documentación LER integrada</div>
          </div>
        </div>
      </div>
      <div class="auth-form-panel">
        <div class="auth-form-inner">
          <div onclick="navigate('home')" style="display:inline-flex;align-items:center;gap:var(--s2);font-size:var(--text-sm);color:var(--bark-light);cursor:pointer;margin-bottom:var(--s8)">← Volver al inicio</div>
          <h2>Iniciar sesión</h2>
          <p>Accede a tu cuenta de CicloBase</p>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" placeholder="empresa@ejemplo.com">
          </div>
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <input class="form-input" type="password" placeholder="••••••••">
            <div class="form-hint" style="text-align:right;cursor:pointer;color:var(--terra)">¿Olvidaste tu contraseña?</div>
          </div>
          <button class="btn btn-primary btn-lg w-full" style="justify-content:center;margin-top:var(--s4)">Iniciar sesión</button>
          <div class="form-divider">o</div>
          <button class="btn btn-secondary btn-lg w-full" style="justify-content:center">🏢 Acceder con CIF/NIF</button>
          <p style="text-align:center;margin-top:var(--s6);font-size:var(--text-sm);color:var(--bark-light)">
            ¿No tienes cuenta? <span style="color:var(--terra);cursor:pointer;font-weight:600" onclick="navigate('register')">Regístrate gratis</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// REGISTER PAGE
// ============================================
function renderRegister() {
  return `
    <div class="auth-layout">
      <div class="auth-visual">
        <div class="auth-visual__content">
          <div class="auth-visual__logo">
            <span style="width:8px;height:8px;background:var(--terra);border-radius:var(--r-full);display:inline-block"></span>
            CicloBase
          </div>
          <h2 class="auth-visual__title">Únete a la economía circular española</h2>
          <p class="auth-visual__subtitle">Registro gratuito para empresas, pymes y autónomos. Sin CIF obligatorio al inicio. Empieza a publicar en minutos.</p>
          <div class="auth-benefits">
            <div class="auth-benefit"><div class="auth-benefit__icon">⚡</div> Acceso inmediato sin validación</div>
            <div class="auth-benefit"><div class="auth-benefit__icon">💸</div> Tier gratuito sin comisiones</div>
            <div class="auth-benefit"><div class="auth-benefit__icon">🌐</div> Marketplace en español y catalán</div>
            <div class="auth-benefit"><div class="auth-benefit__icon">🤝</div> +840 empresas activas</div>
          </div>
        </div>
      </div>
      <div class="auth-form-panel" style="overflow-y:auto">
        <div class="auth-form-inner">
          <div onclick="navigate('home')" style="display:inline-flex;align-items:center;gap:var(--s2);font-size:var(--text-sm);color:var(--bark-light);cursor:pointer;margin-bottom:var(--s8)">← Volver al inicio</div>
          <h2>Crear cuenta gratuita</h2>
          <p>Sin tarjeta. Sin CIF obligatorio. Empieza ahora.</p>

          <!-- ROLE SELECTOR -->
          <div class="form-group">
            <label class="form-label">Soy principalmente...</label>
            <div class="role-selector">
              <div class="role-card ${state.selectedRole==='generator'?'selected':''}" onclick="selectRole('generator')">
                <div class="role-card__icon">🏭</div>
                <div class="role-card__name">Generador</div>
                <div class="role-card__desc">Tengo residuos o subproductos</div>
              </div>
              <div class="role-card ${state.selectedRole==='consumer'?'selected':''}" onclick="selectRole('consumer')">
                <div class="role-card__icon">🛒</div>
                <div class="role-card__name">Comprador</div>
                <div class="role-card__desc">Busco materiales secundarios</div>
              </div>
              <div class="role-card ${state.selectedRole==='manager'?'selected':''}" onclick="selectRole('manager')">
                <div class="role-card__icon">♻️</div>
                <div class="role-card__name">Gestor</div>
                <div class="role-card__desc">Gestiono residuos de terceros</div>
              </div>
              <div class="role-card ${state.selectedRole==='both'?'selected':''}" onclick="selectRole('both')">
                <div class="role-card__icon">🔄</div>
                <div class="role-card__name">Ambos</div>
                <div class="role-card__desc">Genero y también compro</div>
              </div>
            </div>
          </div>

          <div class="grid-2" style="gap:var(--s4)">
            <div class="form-group">
              <label class="form-label">Nombre</label>
              <input class="form-input" type="text" placeholder="Ana">
            </div>
            <div class="form-group">
              <label class="form-label">Apellidos</label>
              <input class="form-input" type="text" placeholder="García López">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email de empresa</label>
            <input class="form-input" type="email" placeholder="ana@empresa.com">
          </div>
          <div class="form-group">
            <label class="form-label">Nombre de empresa o negocio</label>
            <input class="form-input" type="text" placeholder="Ej: Taller García SL, Cooperativa Can Roca...">
          </div>
          <div class="form-group">
            <label class="form-label">Sector</label>
            <select class="form-select">
              <option value="">Selecciona tu sector</option>
              ${['Manufactura','Construcción','Alimentación y bebidas','Textil','Química e industria','Logística y transporte','Hostelería','Automoción','Electrónica','Gestión ambiental','Otro'].map(s=>`<option>${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">CIF / NIF <span style="color:var(--bark-light);font-weight:400">(opcional — puedes añadirlo después)</span></label>
            <input class="form-input" type="text" placeholder="B12345678">
            <div class="form-hint">El CIF es necesario para generar documentación oficial de residuos.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <input class="form-input" type="password" placeholder="Mínimo 8 caracteres">
          </div>
          <label style="display:flex;align-items:flex-start;gap:var(--s3);font-size:var(--text-xs);color:var(--bark-mid);cursor:pointer;margin-bottom:var(--s5)">
            <input type="checkbox" style="margin-top:2px;accent-color:var(--terra)">
            Acepto los <span style="color:var(--terra)">Términos de uso</span> y la <span style="color:var(--terra)">Política de privacidad</span> de CicloBase
          </label>
          <button class="btn btn-primary btn-lg w-full" style="justify-content:center" onclick="navigate('dashboard')">Crear cuenta y empezar →</button>
          <p style="text-align:center;margin-top:var(--s5);font-size:var(--text-sm);color:var(--bark-light)">
            ¿Ya tienes cuenta? <span style="color:var(--terra);cursor:pointer;font-weight:600" onclick="navigate('login')">Iniciar sesión</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// EVENT HANDLERS
// ============================================
function attachEventListeners() {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }
}

function switchLang(lang) {
  state.lang = lang;
  render();
}

function toggleMobileMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

function toggleFilter(value) {
  const idx = state.filters.categories.indexOf(value);
  if (idx === -1) state.filters.categories.push(value);
  else state.filters.categories.splice(idx, 1);
  render();
  // Re-scroll to listings
  const grid = document.getElementById('listingsGrid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearFilters() {
  state.filters = { categories: [], resourceType: null, priceType: null };
  render();
}

function handleSearch(val) {
  // Client-side search demo
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.listing-card');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(val.toLowerCase()) ? '' : 'none';
  });
}

function handleSort(val) {
  // Visual feedback only (would connect to DB in production)
  console.log('Sort by:', val);
}

function selectRole(role) {
  state.selectedRole = role;
  render();
}

function highlightNav(el) {
  document.querySelectorAll('.sidebar-nav__item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.step-card, .value-card, .impact-metric-card, .method-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

function initScrollEffects() {
  // LCA bar animations
  document.querySelectorAll('.lca-bar__fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = width; }, 300);
  });
}

// ============================================
// INIT
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  state.currentPage = pages[hash] ? hash : 'home';
  render();
});

window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  state.currentPage = pages[hash] ? hash : 'home';
  render();
});
