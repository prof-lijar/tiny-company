-- Migration: migrate_content_library
-- Created: 2026-05-23T09:58:47.641765+00:00

-- Vocabulary Table
CREATE TABLE IF NOT EXISTS public.vocabulary (
    id TEXT PRIMARY KEY,
    korean TEXT NOT NULL,
    english TEXT NOT NULL,
    romanization TEXT,
    example TEXT,
    example_translation TEXT,
    level INTEGER NOT NULL,
    part_of_speech TEXT,
    tags TEXT[]
);

-- Reading Passages Table
CREATE TABLE IF NOT EXISTS public.reading_passages (
    id TEXT PRIMARY KEY,
    level INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    time_limit_minutes INTEGER,
    questions JSONB NOT NULL
);

-- Listening Passages Table
CREATE TABLE IF NOT EXISTS public.listening_passages (
    id TEXT PRIMARY KEY,
    level INTEGER NOT NULL,
    title TEXT NOT NULL,
    transcript TEXT NOT NULL,
    questions JSONB NOT NULL
);

-- Grammar Lessons Table
CREATE TABLE IF NOT EXISTS public.grammar_lessons (
    id TEXT PRIMARY KEY,
    level INTEGER NOT NULL,
    title TEXT NOT NULL,
    pattern TEXT,
    explanation TEXT,
    examples JSONB,
    usage_notes TEXT,
    tags TEXT[]
);

