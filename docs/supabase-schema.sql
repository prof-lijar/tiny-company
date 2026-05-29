-- TOPIK Content Library Schema
-- Target: Supabase (PostgreSQL)

-- 1. Vocabulary
CREATE TABLE IF NOT EXISTS vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    korean TEXT NOT NULL,
    english TEXT NOT NULL,
    romanization TEXT,
    example TEXT,
    example_translation TEXT,
    level INTEGER CHECK (level IN (3, 4, 5, 6)),
    part_of_speech TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Grammar
CREATE TABLE IF NOT EXISTS grammar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level INTEGER CHECK (level IN (3, 4, 5, 6)),
    title TEXT NOT NULL,
    pattern TEXT NOT NULL,
    explanation TEXT NOT NULL,
    examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    usage_notes TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Reading
CREATE TABLE IF NOT EXISTS reading_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level INTEGER CHECK (level IN (3, 4, 5, 6)),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    time_limit_minutes INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reading_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passage_id UUID REFERENCES reading_passages(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_answer INTEGER CHECK (correct_answer BETWEEN 0 AND 3),
    explanation TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Listening
CREATE TABLE IF NOT EXISTS listening_passages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level INTEGER CHECK (level IN (3, 4, 5, 6)),
    title TEXT NOT NULL,
    audio_url TEXT,
    transcript TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS listening_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passage_id UUID REFERENCES listening_passages(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_answer INTEGER CHECK (correct_answer BETWEEN 0 AND 3),
    explanation TEXT,
    audio_url TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Mock Tests
CREATE TABLE IF NOT EXISTS mock_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mock_test_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    duration_minutes INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mock_test_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES mock_test_sections(id) ON DELETE CASCADE,
    question TEXT,
    passage TEXT,
    audio_url TEXT,
    options TEXT[],
    correct_answer INTEGER,
    prompt TEXT,
    task_number INTEGER,
    context TEXT,
    sample_answer TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Writing Prompts
CREATE TABLE IF NOT EXISTS writing_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_number INTEGER CHECK (task_number BETWEEN 51 AND 54),
    level INTEGER CHECK (level IN (3, 4, 5, 6)),
    title TEXT NOT NULL,
    instruction TEXT NOT NULL,
    context TEXT,
    prompt TEXT NOT NULL,
    sample_answer TEXT,
    scoring_criteria TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_test_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_prompts ENABLE ROW LEVEL SECURITY;

-- Create Public Read Policies
CREATE POLICY "Allow public read access to vocabulary" ON vocabulary FOR SELECT USING (true);
CREATE POLICY "Allow public read access to grammar" ON grammar FOR SELECT USING (true);
CREATE POLICY "Allow public read access to reading_passages" ON reading_passages FOR SELECT USING (true);
CREATE POLICY "Allow public read access to reading_questions" ON reading_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to listening_passages" ON listening_passages FOR SELECT USING (true);
CREATE POLICY "Allow public read access to listening_questions" ON listening_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to mock_tests" ON mock_tests FOR SELECT USING (true);
CREATE POLICY "Allow public read access to mock_test_sections" ON mock_test_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read access to mock_test_questions" ON mock_test_questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to writing_prompts" ON writing_prompts FOR SELECT USING (true);
