export type TopikLevel = 3 | 4 | 5 | 6;

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index (0-3)
  explanation: string;
  tags: string[]; // Added for weakness analysis (e.g., ['Grammar: -기 때문에', 'Vocab: Environment'])
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
  tags: string[]; // Added for weakness analysis (e.g., ['Academic', 'Abstract'])
}

export interface GrammarLesson {
  id: string;
  level: TopikLevel;
  title: string;
  pattern: string;
  explanation: string;
  examples: { korean: string; english: string }[];
  usageNotes: string;
  tags: string[]; // Added for weakness analysis
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
  tags: string[]; // Added for weakness analysis
}

export interface MockTestQuestion {
  id: string;
  question?: string;
  passage?: string;
  audioUrl?: string;
  options?: string[];
  correctAnswer?: number;
  prompt?: string; // For writing questions
  taskNumber?: 51 | 52 | 53 | 54;
  context?: string;
  sampleAnswer?: string;
  tags?: string[]; // Added for weakness analysis
}

export interface MockTestSection {
  id: string;
  name: string;
  durationMinutes: number;
  questions: MockTestQuestion[];
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
  tags: string[]; // Added for weakness analysis
}

export interface ListeningPassage {
  id: string;
  level: TopikLevel;
  title: string;
  transcript: string; // For admin/study purposes, not shown to user initially
  questions: ListeningQuestion[];
}

export interface UserMistake {
  questionId: string;
  category: 'reading' | 'listening' | 'vocabulary' | 'grammar';
  tags: string[];
  timestamp: number;
}

export interface WeaknessReport {
  topWeaknesses: {
    tag: string;
    errorCount: number;
    impact: 'high' | 'medium' | 'low';
    recommendation: string;
    targetUrl: string;
  }[];
  overallAnalysis: string;
}
