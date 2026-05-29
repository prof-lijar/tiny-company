# Content Library Migration Guide: Static Data to Supabase

This guide outlines the steps required to migrate the TOPIK content library from static TypeScript files in `product/src/lib/data` to the Supabase PostgreSQL database.

## 1. Database Schema Setup
Ensure that the schema defined in `docs/supabase-schema.sql` has been applied to your Supabase instance. You can do this by running the SQL in the Supabase SQL Editor.

## 2. Data Migration Process

Since the volume of data is significant, we recommend using a Node.js migration script rather than manual SQL inserts.

### Migration Script Template
Create a temporary script (e.g., `scripts/migrate-content.ts`) with the following logic:

```typescript
import { createClient } from '@supabase/supabase-js';
import { VOCABULARY_DATA } from '../product/src/lib/data/vocabulary';
import { GRAMMAR_DATA } from '../product/src/lib/data/grammar';
// ... import other data files

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key to bypass RLS
);

async function migrate() {
  console.log('Migrating Vocabulary...');
  const { error: vError } = await supabase.from('vocabulary').insert(
    VOCABULARY_DATA.map(item => ({
      id: item.id,
      korean: item.korean,
      english: item.english,
      romanization: item.romanization,
      example: item.example,
      example_translation: item.exampleTranslation,
      level: item.level,
      part_of_speech: item.partOfSpeech,
      tags: item.tags,
    }))
  );
  if (vError) console.error('Vocabulary error:', vError);

  // Repeat similar logic for Grammar, Reading, Listening, and Mock Tests
  // Note: For Reading/Listening, you must insert Passages first, 
  // then use the returned IDs to insert Questions.
}

migrate();
```

### Execution Steps:
1. Install necessary dependencies: `npm install @supabase/supabase-js ts-node`
2. Run the script: `npx ts-node scripts/migrate-content.ts`
3. Verify the data in the Supabase Dashboard.

## 3. Application Integration

The application should now transition from importing static files to using the `ContentService`.

### Implementation Pattern:
Instead of:
```typescript
import { VOCABULARY_DATA } from '@/lib/data/vocabulary';
const words = VOCABULARY_DATA.filter(w => w.level === 3);
```

Use:
```typescript
import { createServerContentService } from '@/lib/services/content-service';

const contentService = await createServerContentService();
const words = await contentService.getVocabulary(3);
```

## 4. Validation & Cleanup
1. **Verification**: Test all learning modules (Vocab, Grammar, Reading, Listening, Mock Tests) to ensure data is loading correctly from Supabase.
2. **Cleanup**: Once the production environment is verified, delete the files in `product/src/lib/data/` to reduce bundle size and eliminate the risk of using stale static data.
