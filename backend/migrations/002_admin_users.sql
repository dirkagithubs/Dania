-- Migration: Create admin_users table for branch user management
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

CREATE TABLE IF NOT EXISTS admin_users (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        UNIQUE NOT NULL,
  password    TEXT        NOT NULL,
  branch      TEXT        NOT NULL DEFAULT 'Main Branch',
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index on email for fast login lookups
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users (email);

-- Disable public access (only the service role key used by API routes can read/write)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- No public policies — all access goes through the service role key in API routes
