# CicloBase

**Marketplace B2B de residuos y subproductos industriales en España.**

> Plataforma web para comprar y vender materiales industriales, subproductos y residuos entre empresas, pymes y autónomos. Sin comisiones. Con impacto medido.

---

## 🚀 Deploy en GitHub Pages

### 1. Crear repositorio
```bash
git init
git add .
git commit -m "feat: CicloBase v1.0 initial commit"
git remote add origin https://github.com/TU_USUARIO/ciclobase.git
git push -u origin main
```

### 2. Activar GitHub Pages
- Ve a **Settings → Pages**
- Source: `Deploy from a branch`
- Branch: `main` → `/ (root)`
- Guarda y espera ~2 min

Tu sitio estará en: `https://TU_USUARIO.github.io/ciclobase/`

---

## 📁 Estructura del proyecto

```
ciclobase/
├── index.html              ← Entrada SPA (GitHub Pages)
├── css/
│   └── style.css           ← Design system completo
├── js/
│   └── app.js              ← Router + páginas + i18n
├── supabase_schema.sql     ← Schema PostgreSQL completo con RLS
└── README.md
```

---

## 📄 Páginas incluidas

| Ruta (hash) | Página |
|-------------|--------|
| `#home` | Landing page con hero, how-it-works, categorías, stats |
| `#marketplace` | Marketplace con filtros, búsqueda, cards |
| `#dashboard` | Dashboard empresa con stats, actividad, impacto |
| `#impact` | Metodología ACV + métricas globales |
| `#login` | Iniciar sesión |
| `#register` | Registro con selección de rol |

---

## 🗄️ Supabase — Setup

### 1. Crear proyecto Supabase
- Ve a [supabase.com](https://supabase.com) → New project
- Región: `eu-west-2` (London) o `eu-central-1` (Frankfurt)

### 2. Ejecutar schema
```bash
# En el SQL Editor de Supabase, ejecuta:
supabase_schema.sql
```

### 3. Habilitar extensiones (automático con el schema)
- `postgis` (geolocalización)
- `pg_trgm` (búsqueda fuzzy)
- `unaccent` (búsqueda sin acentos en español)

### 4. Configurar Storage buckets
En **Storage → New bucket**, crear:
- `listing-photos` (público, max 5MB)
- `company-logos` (público, max 2MB)
- `impact-reports` (privado, max 20MB)
- `certifications` (privado, max 10MB)

### 5. Habilitar Realtime
En **Database → Replication**, habilitar para:
- `messages`
- `notifications`
- `transactions`

---

## 🔗 Conectar frontend con Supabase

En `js/app.js`, añade al inicio:

```javascript
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://TU_PROJECT_ID.supabase.co',
  'TU_ANON_KEY'
)
```

---

## 🌿 Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 + Vanilla JS (SPA) |
| Hosting | GitHub Pages (estático) |
| Base de datos | Supabase (PostgreSQL + PostGIS) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Realtime | Supabase Realtime |
| Pagos (futuro) | Stripe Connect |
| Idiomas | Español (ES) + Català (CA) |

---

## 🎨 Design System

**Paleta Earth Tones:**
- Terracotta: `#C4613A` — CTAs principales
- Arena: `#E8D9C5` — fondos cálidos
- Sage: `#6B8F71` — acento ecológico
- Bark: `#3D2B1F` — texto principal

**Fuentes:**
- Display: Fraunces (serif variable)
- Body: DM Sans

---

## 📋 Roles de usuario

| Rol | Descripción |
|-----|-------------|
| `generator` | Generador de residuos / vendedor |
| `consumer` | Comprador de materiales secundarios |
| `manager` | Gestor de residuos autorizado |
| `mixed` | Genera y compra |
| `admin` | Administrador de plataforma |

---

## 🌍 Diferenciadores vs Recircular

- ✅ **Sin comisiones** en tier gratuito (para siempre)
- ✅ **Sin CIF obligatorio** al registro (barrera cero)
- ✅ **Abierto a autónomos y pymes** (no solo corporaciones)
- ✅ **Bilingüe ES + CA** desde el inicio
- ✅ **AI matching** incluido en todos los planes

---

## 📧 Contacto

hola@ciclobase.es · [ciclobase.es](https://ciclobase.es)
