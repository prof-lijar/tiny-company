/**
 * Content Library Types
 * These types align with the Supabase schema defined in docs/supabase-schema.sql
 */

export type TopikLevel = 3 | 4 | 5 | 6;

export interface Vocabulary {
  id: string;
  korean: string;
  english: string;
  romanization?: string;
  example?: string;
  example_translation?: string;
  level: TopikLevel;
  part_of_speech?: string;
  tags?: string[];
  created_at?: string;
}

export interface Grammar {
  id: string;
  level: TopikLevel;
  title: string;
  pattern: string;
  explanation: string;
  examples: { korean: string; english: string }[];
  usage_notes?: string;
  tags?: string[];
  created_at?: string;
}

export interface ReadingPassage {
  id: string;
  level: TopikLevel;
  title: string;
  content: string;
  time_limit_minutes?: number;
  created_at?: string;
}

export interface ReadingQuestion {
  id: string;
  passage_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  tags?: string[];
  created_at?: string;
}

export interface ListeningPassage {
  id: string;
  level: TopikLevel;
  title: string;
  audio_url?: string;
  transcript: string;
  created_at?: string;
}

export interface ListeningQuestion {
  id: string;
  passage_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  audio_url?: string;
  tags?: string[];
  created_at?: string;
}

export interface MockTest {
  id: string;
  title: string;
  created_at?: string;
}

export interface MockTestSection {
  id: string;
  test_id: string;
  name: string;
  duration_minutes?: number;
  created_at?: string;
}

export interface MockTestQuestion {
  id: string;
  section_id: string;
  question?: string;
  passage?: string;
  audio_url?: string;
  options?: string[];
  correct_answer?: number;
  prompt?: string;
  task_number?: number;
  context?: string;
  sample_answer?: string;
  tags?: string[];
  created_at?: string;
}

export interface WritingPrompt {
  id: string;
  task_number: number;
  level: TopikLevel;
  title: string;
  instruction: string;
  context?: string;
  prompt: string;
  sample_answer?: string;
  scoring_criteria?: string;
  tags?: string[];
  created_at?: string;
}
