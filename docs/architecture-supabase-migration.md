# Architecture: Content Library Migration to Supabase

## Overview
This document outlines the migration of the static TOPIK content library from TypeScript files in `product/src/lib/data` to a Supabase (PostgreSQL) backend. This migration enables dynamic content updates, better scalability, and the ability to manage content via the Supabase dashboard without redeploying the application.

## Database Schema Design

### 1. Vocabulary
**Table: `vocabulary`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `korean` | text | NOT NULL | The Korean word |
| `english` | text | NOT NULL | English translation |
| `romanization` | text | | Romanized version |
| `example` | text | | Usage example in Korean |
| `example_translation` | text | | English translation of the example |
| `level` | int | CHECK (level IN (3,4,5,6)) | TOPIK Level |
| `part_of_speech` | text | | e.g., noun, verb, adjective |
| `tags` | text[] | | Searchable tags |

### 2. Grammar
**Table: `grammar`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `level` | int | CHECK (level IN (3,4,5,6)) | TOPIK Level |
| `title` | text | NOT NULL | Lesson title |
| `pattern` | text | NOT NULL | The grammar pattern |
| `explanation` | text | NOT NULL | Detailed explanation |
| `examples` | jsonb | NOT NULL | Array of `{korean: string, english: string}` |
| `usage_notes` | text | | Additional usage tips |
| `tags` | text[] | | Searchable tags |

### 3. Reading
**Table: `reading_passages`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `level` | int | CHECK (level IN (3,4,5,6)) | TOPIK Level |
| `title` | text | NOT NULL | Passage title |
| `content` | text | NOT NULL | The full reading text |
| `time_limit_minutes` | int | | Suggested time limit |

**Table: `reading_questions`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `passage_id` | uuid | FK -> `reading_passages.id` | Link to passage |
| `question` | text | NOT NULL | The question text |
| `options` | text[] | NOT NULL | 4 multiple choice options |
| `correct_answer` | int | CHECK (correct_answer BETWEEN 0 AND 3) | Index of correct option |
| `explanation` | text | | Why this is correct |
| `tags` | text[] | | Searchable tags |

### 4. Listening
**Table: `listening_passages`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `level` | int | CHECK (level IN (3,4,5,6)) | TOPIK Level |
| `title` | text | NOT NULL | Passage title |
| `audio_url` | text | | URL to audio file in Supabase Storage |
| `transcript` | text | NOT NULL | Full transcript |

**Table: `listening_questions`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `passage_id` | uuid | FK -> `listening_passages.id` | Link to passage |
| `question` | text | NOT NULL | The question text |
| `options` | text[] | NOT NULL | 4 multiple choice options |
| `correct_answer` | int | CHECK (correct_answer BETWEEN 0 AND 3) | Index of correct option |
| `explanation` | text | | Why this is correct |
| `audio_url` | text | | Specific audio clip for the question |
| `tags` | text[] | | Searchable tags |

### 5. Mock Tests
**Table: `mock_tests`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `title` | text | NOT NULL | Test title (e.g., "Mock Test 1") |

**Table: `mock_test_sections`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `test_id` | uuid | FK -> `mock_tests.id` | Link to test |
| `name` | text | NOT NULL | Section name (e.g., "Reading") |
| `duration_minutes` | int | | Time allocated for section |

**Table: `mock_test_questions`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `section_id` | uuid | FK -> `mock_test_sections.id` | Link to section |
| `question` | text | | Question text |
| `passage` | text | | Reading/Listening passage text |
| `audio_url` | text | | URL to audio |
| `options` | text[] | | Multiple choice options |
| `correct_answer` | int | | Correct option index |
| `prompt` | text | | Writing prompt text |
| `task_number` | int | | TOPIK task number (51-54) |
| `context` | text | | Context for writing |
| `sample_answer` | text | | Model answer |
| `tags` | text[] | | Searchable tags |

### 6. Writing Prompts
**Table: `writing_prompts`**
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, Default: gen_random_uuid() | Unique identifier |
| `task_number` | int | CHECK (task_number BETWEEN 51 AND 54) | TOPIK Task |
| `level` | int | CHECK (level IN (3,4,5,6)) | TOPIK Level |
| `title` | text | NOT NULL | Prompt title |
| `instruction` | text | NOT NULL | Task instructions |
| `context` | text | | Background context |
| `prompt` | text | NOT NULL | The actual prompt |
| `sample_answer` | text | | Model answer |
| `scoring_criteria` | text | | Rubric for grading |
| `tags` | text[] | | Searchable tags |

## Migration Strategy

### Phase 1: Schema Deployment
1. Execute SQL scripts in the Supabase SQL Editor to create all tables and constraints.
2. Set up Row Level Security (RLS) policies:
   - `SELECT`: Public (anyone can read content).
   - `INSERT/UPDATE/DELETE`: Authenticated (only admins).

### Phase 2: Data Migration
1. Create a one-time migration script (Node.js) that:
   - Imports existing static data from `product/src/lib/data/*.ts`.
   - Transforms the data to match the Supabase schema.
   - Uses the Supabase Service Role key to bulk-insert data into the database.
2. Verify data integrity via the Supabase Dashboard.

### Phase 3: Application Refactor
1. Update `product/src/lib/supabase/client.ts` and `server.ts` to ensure proper client initialization.
2. Implement a `ContentService` in `product/src/lib/services/content-service.ts` to encapsulate all data fetching logic.
3. Replace static imports in the following areas:
   - Vocabulary study pages
   - Grammar lesson pages
   - Reading/Listening practice modules
   - Mock test simulator
4. Implement caching (e.g., via Next.js `fetch` cache or a simple in-memory cache) to avoid excessive API calls.

### Phase 4: Validation & Cleanup
1. Run E2E tests to ensure all learning modules still function correctly.
2. Once verified, delete the static files in `product/src/lib/data/` to prevent confusion and reduce bundle size.
3. Update `README.md` with instructions on how to add new content via Supabase.

## Technical Considerations
- **Type Safety**: Use `supabase gen types typescript` to generate types directly from the database schema.
- **Performance**: Use `.select('*')` carefully; only fetch required columns. Use pagination for vocabulary lists.
- **Stability**: Implement fallback mechanisms (e.g., empty states) if the database is unreachable.
