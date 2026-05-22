import { createClient } from '@/lib/supabase/server';
import { ModelEssay } from '@/lib/types/model-essays';

export async function getModelEssays() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('model_essays')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching model essays:', error);
    throw new Error('Failed to fetch model essays');
  }
  
  return data as ModelEssay[];
}

export async function getModelEssayById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('model_essays')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching model essay:', error);
    throw new Error(`Failed to fetch model essay with id ${id}`);
  }
  
  return data as ModelEssay;
}

export async function getModelEssaysByTheme(theme: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('model_essays')
    .select('*')
    .eq('theme', theme);
  
  if (error) {
    console.error('Error fetching model essays by theme:', error);
    throw new Error(`Failed to fetch model essays by theme ${theme}`);
  }
  
  return data as ModelEssay[];
}
