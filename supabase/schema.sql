-- =============================================================
-- KNOWVY ECOSYSTEM — SUPABASE POSTGRESQL SCHEMA
-- Project: oaigwpwlrbylmzvlfskq
-- =============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'unread'
);

-- 3. Event Registrations Table
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    github TEXT,
    college TEXT,
    year TEXT,
    registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Mentorship Requests Table
CREATE TABLE IF NOT EXISTS public.mentorship_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    track TEXT NOT NULL,
    message TEXT,
    github TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Feedback Table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- 7. Public Insert Policies (Allow anonymous visitors to submit forms)
CREATE POLICY "Allow public insert to newsletter_subscribers"
    ON public.newsletter_subscribers FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public insert to contact_messages"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public insert to event_registrations"
    ON public.event_registrations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public insert to mentorship_requests"
    ON public.mentorship_requests FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public insert to feedback"
    ON public.feedback FOR INSERT
    WITH CHECK (true);

-- 8. Admin Read Policies (Authenticated / Service Role read access)
CREATE POLICY "Allow service role read all"
    ON public.contact_messages FOR SELECT
    USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Allow service role read registrations"
    ON public.event_registrations FOR SELECT
    USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- =============================================================
-- 9. Events Table (Multi-Platform Synced: Unstop, MLH, Devpost, Devfolio)
-- =============================================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('knowvy', 'mlh', 'devfolio', 'devpost', 'unstop')),
    category TEXT DEFAULT 'Hackathon',
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed')),
    date TEXT NOT NULL,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    location TEXT DEFAULT 'Online',
    participants TEXT DEFAULT 'Open',
    banner_url TEXT NOT NULL,
    original_banner_url TEXT,
    external_url TEXT NOT NULL,
    short_description TEXT,
    about TEXT,
    prizes TEXT,
    tags TEXT[] DEFAULT '{}',
    synced_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all events
CREATE POLICY "Allow public read events"
    ON public.events FOR SELECT
    USING (true);

-- Allow upserting events from sync workers (service_role or public for dev convenience)
CREATE POLICY "Allow public insert and update events"
    ON public.events FOR ALL
    USING (true)
    WITH CHECK (true);

