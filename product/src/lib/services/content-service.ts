import { createClient as createBrowserClient } from '../supabase/client';
import { createClient as createServerClient } from '../supabase/server';
import { 
  Vocabulary, 
  Grammar, 
  ReadingPassage, 
  ReadingQuestion, 
  ListeningPassage, 
  ListeningQuestion, 
  MockTest, 
  MockTestSection, 
  MockTestQuestion, 
  WritingPrompt 
} from '@/types/content';

export class ContentService {
  constructor(private supabase: any) {}

  // --- Vocabulary ---
  async getVocabulary(level?: number, tag?: string) {
    let query = this.supabase
      .from('vocabulary')
      .select('*');

    if (level) query = query.eq('level', level);
    if (tag) query = query.contains('tags', [tag]);

    const { data, error } = await query;
    if (error) throw error;
    return data as Vocabulary[];
  }

  async getVocabularyById(id: string) {
    const { data, error } = await this.supabase
      .from('vocabulary')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Vocabulary;
  }

  // --- Grammar ---
  async getGrammar(level?: number) {
    let query = this.supabase
      .from('grammar')
      .select('*');

    if (level) query = query.eq('level', level);

    const { data, error } = await query;
    if (error) throw error;
    return data as Grammar[];
  }

  async getGrammarById(id: string) {
    const { data, error } = await this.supabase
      .from('grammar')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Grammar;
  }

  // --- Reading ---
  async getReadingPassages(level?: number) {
    let query = this.supabase
      .from('reading_passages')
      .select('*');

    if (level) query = query.eq('level', level);

    const { data, error } = await query;
    if (error) throw error;
    return data as ReadingPassage[];
  }

  async getReadingPassageWithQuestions(id: string) {
    const { data: passage, error: pError } = await this.supabase
      .from('reading_passages')
      .select('*')
      .eq('id', id)
      .single();
    if (pError) throw pError;

    const { data: questions, error: qError } = await this.supabase
      .from('reading_questions')
      .select('*')
      .eq('passage_id', id);
    if (qError) throw qError;

    return { passage: passage as ReadingPassage, questions: questions as ReadingQuestion[] };
  }

  // --- Listening ---
  async getListeningPassages(level?: number) {
    let query = this.supabase
      .from('listening_passages')
      .select('*');

    if (level) query = query.eq('level', level);

    const { data, error } = await query;
    if (error) throw error;
    return data as ListeningPassage[];
  }

  async getListeningPassageWithQuestions(id: string) {
    const { data: passage, error: pError } = await this.supabase
      .from('listening_passages')
      .select('*')
      .eq('id', id)
      .single();
    if (pError) throw pError;

    const { data: questions, error: qError } = await this.supabase
      .from('listening_questions')
      .select('*')
      .eq('passage_id', id);
    if (qError) throw qError;

    return { passage: passage as ListeningPassage, questions: questions as ListeningQuestion[] };
  }

  // --- Mock Tests ---
  async getMockTests() {
    const { data, error } = await this.supabase
      .from('mock_tests')
      .select('*');
    if (error) throw error;
    return data as MockTest[];
  }

  async getMockTestFull(id: string) {
    const { data: test, error: tError } = await this.supabase
      .from('mock_tests')
      .select('*')
      .eq('id', id)
      .single();
    if (tError) throw tError;

    const { data: sections, error: sError } = await this.supabase
      .from('mock_test_sections')
      .select('*')
      .eq('test_id', id);
    if (sError) throw sError;

    const sectionIds = sections.map((s: any) => s.id);
    const { data: questions, error: qError } = await this.supabase
      .from('mock_test_questions')
      .select('*')
      .in('section_id', sectionIds);
    if (qError) throw qError;

    return { 
      test: test as MockTest, 
      sections: sections as MockTestSection[], 
      questions: questions as MockTestQuestion[] 
    };
  }

  // --- Writing ---
  async getWritingPrompts(level?: number) {
    let query = this.supabase
      .from('writing_prompts')
      .select('*');

    if (level) query = query.eq('level', level);

    const { data, error } = await query;
    if (error) throw error;
    return data as WritingPrompt[];
  }

  async getWritingPromptById(id: string) {
    const { data, error } = await this.supabase
      .from('writing_prompts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as WritingPrompt;
  }
}

/**
 * Factory for creating ContentService for Client Components
 */
export function createClientContentService() {
  const client = createBrowserClient();
  return new ContentService(client);
}

/**
 * Factory for creating ContentService for Server Components/API Routes
 */
export async function createServerContentService() {
  const client = await createServerClient();
  return new ContentService(client);
}
