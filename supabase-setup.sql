-- ============================================================
-- CicloBase — Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE (extends auth.users)
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id              UUID PRIMARY KEY,
  email           TEXT NOT NULL,
  company_name    TEXT NOT NULL DEFAULT '',
  cif             TEXT NOT NULL DEFAULT '',
  role            TEXT NOT NULL DEFAULT 'comprador'
                  CHECK (role IN ('generador', 'comprador', 'ambos')),
  nima            TEXT,
  sector          TEXT,
  employees       TEXT,
  address         TEXT,
  municipality    TEXT,
  province        TEXT,
  contact_person  TEXT,
  phone           TEXT,
  website         TEXT,
  verified        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 2. LISTINGS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.listings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category        TEXT NOT NULL
                  CHECK (category IN ('metales','plasticos','aceites','quimicos','papel','otros')),
  subcategory     TEXT NOT NULL DEFAULT '',
  ler_code        TEXT NOT NULL DEFAULT '',
  quantity        NUMERIC(12,3) NOT NULL CHECK (quantity > 0),
  unit            TEXT NOT NULL DEFAULT 'T',
  frequency       TEXT NOT NULL DEFAULT 'puntual'
                  CHECK (frequency IN ('puntual','mensual','trimestral','continuo')),
  description     TEXT NOT NULL DEFAULT '',
  min_price       NUMERIC(12,2),
  municipality    TEXT NOT NULL DEFAULT '',
  province        TEXT NOT NULL DEFAULT '',
  docs_albaran    BOOLEAN NOT NULL DEFAULT FALSE,
  docs_analisis   BOOLEAN NOT NULL DEFAULT FALSE,
  docs_fitxa      BOOLEAN NOT NULL DEFAULT FALSE,
  status          TEXT NOT NULL DEFAULT 'pending_review'
                  CHECK (status IN ('draft','pending_review','active','paused','closed','rejected')),
  views_count     INTEGER NOT NULL DEFAULT 0,
  contacts_count  INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days')
);

-- ────────────────────────────────────────────────────────────
-- 3. LISTING_PHOTOS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE public.listing_photos (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id  UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 4. INDEXES
-- ────────────────────────────────────────────────────────────
CREATE INDEX listings_profile_id_idx    ON public.listings(profile_id);
CREATE INDEX listings_category_idx      ON public.listings(category);
CREATE INDEX listings_status_idx        ON public.listings(status);
CREATE INDEX listings_province_idx      ON public.listings(province);
CREATE INDEX listings_created_at_idx    ON public.listings(created_at DESC);
CREATE INDEX listing_photos_listing_idx ON public.listing_photos(listing_id, sort_order);

-- ────────────────────────────────────────────────────────────
-- 5. AUTO-UPDATE updated_at TRIGGER
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ────────────────────────────────────────────────────────────
-- 6. ROW-LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_photos ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- listings
CREATE POLICY "listings_select" ON public.listings
  FOR SELECT TO authenticated
  USING (status = 'active' OR profile_id = auth.uid());

CREATE POLICY "listings_insert" ON public.listings
  FOR INSERT TO authenticated
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "listings_update" ON public.listings
  FOR UPDATE TO authenticated
  USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());

CREATE POLICY "listings_delete" ON public.listings
  FOR DELETE TO authenticated
  USING (profile_id = auth.uid());

-- listing_photos
CREATE POLICY "photos_select" ON public.listing_photos
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id
        AND (l.status = 'active' OR l.profile_id = auth.uid())
    )
  );

CREATE POLICY "photos_insert" ON public.listing_photos
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id AND l.profile_id = auth.uid()
    )
  );

CREATE POLICY "photos_delete" ON public.listing_photos
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id AND l.profile_id = auth.uid()
    )
  );

-- ────────────────────────────────────────────────────────────
-- 7. MARKETPLACE VIEW
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.listings_with_details AS
SELECT
  l.*,
  p.company_name,
  p.verified AS company_verified,
  (
    SELECT lp.url
    FROM public.listing_photos lp
    WHERE lp.listing_id = l.id
    ORDER BY lp.sort_order
    LIMIT 1
  ) AS cover_photo_url,
  (
    SELECT COUNT(*)
    FROM public.listing_photos lp
    WHERE lp.listing_id = l.id
  ) AS photo_count
FROM public.listings l
JOIN public.profiles p ON p.id = l.profile_id
WHERE l.status = 'active';

GRANT SELECT ON public.listings_with_details TO authenticated;
