-- ============================================================
-- CicloBase Admin Panel — Setup Migration
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- PHASE 1: Schema + helper function
-- ────────────────────────────────────────────────────────────

-- Add is_admin flag to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

-- Helper function used by RLS policies (SECURITY DEFINER bypasses RLS for this lookup)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = TRUE
  );
$$;

-- ────────────────────────────────────────────────────────────
-- PHASE 2: Update RLS policies to grant admin full access
-- ────────────────────────────────────────────────────────────

-- profiles: allow admin to update any profile (e.g. verify companies)
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE TO authenticated
  USING      (auth.uid() = id OR public.is_admin_user())
  WITH CHECK (auth.uid() = id OR public.is_admin_user());

-- listings SELECT: admin sees all statuses, not just 'active' or own
DROP POLICY IF EXISTS "listings_select" ON public.listings;
CREATE POLICY "listings_select" ON public.listings
  FOR SELECT TO authenticated
  USING (
    status = 'active'
    OR profile_id = auth.uid()
    OR public.is_admin_user()
  );

-- listings UPDATE: admin can change status (approve/reject/pause)
DROP POLICY IF EXISTS "listings_update" ON public.listings;
CREATE POLICY "listings_update" ON public.listings
  FOR UPDATE TO authenticated
  USING      (profile_id = auth.uid() OR public.is_admin_user())
  WITH CHECK (profile_id = auth.uid() OR public.is_admin_user());

-- listing_photos SELECT: admin can view photos for any listing
DROP POLICY IF EXISTS "photos_select" ON public.listing_photos;
CREATE POLICY "photos_select" ON public.listing_photos
  FOR SELECT TO authenticated
  USING (
    public.is_admin_user()
    OR EXISTS (
      SELECT 1 FROM public.listings l
      WHERE l.id = listing_id
        AND (l.status = 'active' OR l.profile_id = auth.uid())
    )
  );

-- ────────────────────────────────────────────────────────────
-- PHASE 3: Create the first admin account
--
-- STEP A: Go to Supabase Dashboard → Authentication → Users
--         Click "Add user" and create:
--           Email:    admin@ciclobase.com
--           Password: CicloAdmin2025!
--         Copy the UUID assigned to that user.
--
-- STEP B: Paste the UUID below and run this query:
-- ────────────────────────────────────────────────────────────

INSERT INTO public.profiles (id, email, company_name, cif, role, verified, is_admin)
VALUES (
  'PASTE-UUID-HERE',           -- ← replace with UUID from Auth tab
  'admin@ciclobase.com',
  'CicloBase Admin',
  'A00000000',
  'comprador',
  TRUE,
  TRUE
)
ON CONFLICT (id) DO UPDATE
  SET is_admin     = TRUE,
      verified     = TRUE,
      company_name = 'CicloBase Admin';

-- ────────────────────────────────────────────────────────────
-- VERIFICATION
-- After running, confirm:
-- ────────────────────────────────────────────────────────────
-- SELECT column_name FROM information_schema.columns
--   WHERE table_name = 'profiles' AND column_name = 'is_admin';
-- Should return 1 row.

-- SELECT * FROM profiles WHERE is_admin = TRUE;
-- Should return your admin user after Step B.
