import { SRSState } from '@/lib/types';

// Mock storage for vocabulary progress
// Key: userId, Value: Map of wordId -> SRSState
const vocabProgress: Record<string, Record<string, SRSState>> = {};

export const vocabularyDb = {
  async getProgress(userId: string): Promise<Record<string, SRSState>> {
    return vocabProgress[userId] || {};
  },

  async updateWordProgress(userId: string, wordId: string, state: SRSState): Promise<void> {
    if (!vocabProgress[userId]) {
      vocabProgress[userId] = {};
    }
    vocabProgress[userId][wordId] = state;
  },

  async clearProgress(userId: string): Promise<void> {
    delete vocabProgress[userId];
  }
};
