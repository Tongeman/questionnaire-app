-- X2 Diagnostic - Supabase Database Schema
-- Run this in your Supabase SQL editor to create the required tables

-- ============================================================================
-- USERS TABLE
-- Stores basic user information
-- ============================================================================
CREATE TABLE IF NOT EXISTS diagnostic_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    email_consent BOOLEAN DEFAULT FALSE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_diagnostic_users_email ON diagnostic_users(email);

-- ============================================================================
-- SUBMISSIONS TABLE
-- Stores each diagnostic submission with context, scores, and raw answers
-- ============================================================================
CREATE TABLE IF NOT EXISTS diagnostic_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES diagnostic_users(id) ON DELETE CASCADE,
    questionnaire_version TEXT NOT NULL,
    
    -- Context answers (denormalized for easy querying)
    business_name TEXT,
    business_description TEXT,
    annual_revenue TEXT,
    hours_per_week TEXT,
    
    -- Calculated results
    area_scores JSONB,           -- {"financial-control": {score: 12, status: "amber"}, ...}
    primary_constraint TEXT,     -- Name of the lowest-scoring area
    
    -- Raw answers for audit/analysis
    raw_answers JSONB            -- All 45 answers: {"fc-1": 3, "fc-2": 4, ...}
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_diagnostic_submissions_user_id ON diagnostic_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_submissions_created_at ON diagnostic_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_diagnostic_submissions_primary_constraint ON diagnostic_submissions(primary_constraint);
CREATE INDEX IF NOT EXISTS idx_diagnostic_submissions_annual_revenue ON diagnostic_submissions(annual_revenue);

-- ============================================================================
-- ROW LEVEL SECURITY (Optional but recommended)
-- Uncomment these if you want to enable RLS
-- ============================================================================

-- Enable RLS on tables
-- ALTER TABLE diagnostic_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE diagnostic_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon users (for the diagnostic submission)
-- CREATE POLICY "Allow anonymous inserts" ON diagnostic_users
--     FOR INSERT TO anon
--     WITH CHECK (true);

-- CREATE POLICY "Allow anonymous inserts" ON diagnostic_submissions
--     FOR INSERT TO anon
--     WITH CHECK (true);

-- ============================================================================
-- USEFUL VIEWS (Optional)
-- These can help with reporting and analysis
-- ============================================================================

-- View: Summary of submissions by primary constraint
CREATE OR REPLACE VIEW diagnostic_constraint_summary AS
SELECT 
    primary_constraint,
    COUNT(*) as submission_count,
    COUNT(DISTINCT user_id) as unique_users
FROM diagnostic_submissions
WHERE primary_constraint IS NOT NULL
GROUP BY primary_constraint
ORDER BY submission_count DESC;

-- View: Summary by revenue band
CREATE OR REPLACE VIEW diagnostic_revenue_summary AS
SELECT 
    annual_revenue,
    COUNT(*) as submission_count,
    primary_constraint,
    COUNT(*) as constraint_count
FROM diagnostic_submissions
WHERE annual_revenue IS NOT NULL
GROUP BY annual_revenue, primary_constraint
ORDER BY annual_revenue, constraint_count DESC;

-- View: Recent submissions with user info
CREATE OR REPLACE VIEW diagnostic_recent_submissions AS
SELECT 
    ds.id as submission_id,
    ds.created_at,
    du.name,
    du.email,
    ds.business_name,
    ds.annual_revenue,
    ds.hours_per_week,
    ds.primary_constraint,
    ds.questionnaire_version
FROM diagnostic_submissions ds
JOIN diagnostic_users du ON ds.user_id = du.id
ORDER BY ds.created_at DESC
LIMIT 100;

-- ============================================================================
-- GRANT PERMISSIONS
-- Ensure the anon role can insert (required for Netlify functions with anon key)
-- ============================================================================

GRANT INSERT ON diagnostic_users TO anon;
GRANT INSERT ON diagnostic_submissions TO anon;
GRANT SELECT ON diagnostic_users TO anon;
GRANT SELECT ON diagnostic_submissions TO anon;
