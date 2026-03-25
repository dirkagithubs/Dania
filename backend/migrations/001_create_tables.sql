-- ============================================
-- Dania Real Estate — Database Schema
-- Run this SQL in the Supabase SQL Editor
-- ============================================

-- 1. Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  price         BIGINT NOT NULL,
  location      TEXT NOT NULL,
  beds          INT NOT NULL DEFAULT 0,
  baths         INT NOT NULL DEFAULT 0,
  area          INT NOT NULL DEFAULT 0,
  status        TEXT NOT NULL CHECK (status IN ('For Sale', 'For Rent')),
  type          TEXT NOT NULL CHECK (type IN ('Villa', 'Penthouse', 'Apartment', 'Townhouse', 'Duplex')),
  description   TEXT DEFAULT '',
  main_image    TEXT DEFAULT '',
  gallery_images TEXT[] DEFAULT '{}',
  amenities     JSONB DEFAULT '[]',
  agent_name    TEXT DEFAULT 'Ahmed Al-Sayed',
  agent_title   TEXT DEFAULT 'Senior Specialist',
  agent_image   TEXT DEFAULT '',
  video_preview TEXT DEFAULT '',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Inquiries / Contact Form Submissions
CREATE TABLE IF NOT EXISTS inquiries (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT DEFAULT '',
  subject      TEXT DEFAULT '',
  message      TEXT NOT NULL,
  property_id  UUID REFERENCES properties(id) ON DELETE SET NULL,
  status       TEXT DEFAULT 'Unread' CHECK (status IN ('Unread', 'Read', 'Replied')),
  priority     TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries  ENABLE ROW LEVEL SECURITY;

-- 4. Public read access for properties (anyone can browse listings)
CREATE POLICY "Public can read properties" ON properties
  FOR SELECT USING (true);

-- 5. Public can insert inquiries (contact form)
CREATE POLICY "Public can submit inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- 6. Public can read/update/delete all for now (admin use via anon key)
--    In production, you'd use auth + service_role for admin operations
CREATE POLICY "Admin full access to properties" ON properties
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access to inquiries" ON inquiries
  FOR ALL USING (true) WITH CHECK (true);

-- 7. Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
