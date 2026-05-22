import { createClient } from '@/lib/supabase/server';
import { SRSState } from '@/lib/types';

export const vocabularyDb = {
  async getProgress(userId: string): Promise<Record<string, SRSState>> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('vocabulary_progress')
      .select('word_id, interval, ease_factor, next_review, review_count')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching vocabulary progress:', error);
      throw error;
    }

    const progress: Record<string, SRSState> = {};
    if (data) {
      data.forEach((item) => {
        progress[item.word_id] = {
          interval: item.interval,
          easeFactor: item.ease_factor,
          nextReview: new Date(item.next_review).getTime(),
        };
      });
    }
    return progress;
  },

  async updateWordProgress(userId: string, wordId: string, state: SRSState): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('vocabulary_progress')
      .upsert({
        user_id: userId,
        word_id: wordId,
        interval: state.interval,
        ease_factor: state.easeFactor,
        next_review: new Date(state.nextReview).toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id, word_id'
      });

    if (error) {
      console.error('Error updating vocabulary progress:', error);
      throw error;
    }
  },

  async clearProgress(userId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('vocabulary_progress')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error clearing vocabulary progress:', error);
      throw error;
    }
  },
};
