-- Migration: create_content_tables
-- Created: 2026-05-23T13:50:39.373867+00:00

CREATE TABLE IF NOT EXISTS public.vocabulary (
    id TEXT PRIMARY KEY,
    korean TEXT NOT NULL,
    english TEXT NOT NULL,
    romanization TEXT,
    example TEXT,
    example_translation TEXT,
    level INTEGER CHECK (level >= 3 AND level <= 6),
    part_of_speech TEXT,
    tags TEXT[]
);

CREATE TABLE IF NOT EXISTS public.grammar_lessons (
    id TEXT PRIMARY KEY,
    level INTEGER CHECK (level >= 3 AND level <= 6),
    title TEXT NOT NULL,
    pattern TEXT,
    explanation TEXT,
    examples JSONB,
    usage_notes TEXT,
    tags TEXT[]
);

CREATE TABLE IF NOT EXISTS public.reading_passages (
    id TEXT PRIMARY KEY,
    level INTEGER CHECK (level >= 3 AND level <= 6),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    time_limit_minutes INTEGER,
    questions JSONB
);

CREATE TABLE IF NOT EXISTS public.listening_passages (
    id TEXT PRIMARY KEY,
    level INTEGER CHECK (level >= 3 AND level <= 6),
    title TEXT NOT NULL,
    transcript TEXT,
    questions JSONB
);
