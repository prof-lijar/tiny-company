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

export interface WritingPrompt {
  id: string;
  taskNumber: 51 | 52 | 53 | 54;
  level: TopikLevel;
  title: string;
  instruction: string;
  context: string; // The passage or data description
  prompt: string; // The specific question or gap
  sampleAnswer: string;
  scoringCriteria: string;
}

export interface MockTestSection {
  id: string;
  name: string;
  durationMinutes: number;
  questions: any[]; // Will specify further based on section type
}

export interface MockTest {
  id: string;
  title: string;
  sections: MockTestSection[];
}

export interface MockTestResult {
  sectionScores: { [sectionId: string]: number };
  totalScore: number;
  timeTakenSeconds: number;
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  audioUrl: string; // Path to audio file or mock URL
}

export interface ListeningPassage {
  id: string;
  level: TopikLevel;
  title: string;
  transcript: string; // For admin/study purposes, not shown to user initially
  questions: ListeningQuestion[];
}
