export type TopikLevel = 3 | 4 | 5 | 6;

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index (0-3)
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  level: TopikLevel;
  title: string;
  content: string;
  questions: ReadingQuestion[];
}

export interface VocabularyWord {
  id: string;
  korean: string;
  english: string;
  exampleSentence: string;
  level: TopikLevel;
  partOfSpeech: string;
}

export interface GrammarLesson {
  id: string;
  level: TopikLevel;
  title: string;
  pattern: string;
  explanation: string;
  examples: { korean: string; english: string }[];
  usageNotes: string;
}
