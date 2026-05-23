export type TopikLevel = 3 | 4 | 5 | 6;

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index (0-3)
  explanation: string;
  tags: string[];
}

export interface ReadingPassage {
  id: string;
  level: TopikLevel;
  title: string;
  content: string;
  time_limit_minutes: number;
  questions: ReadingQuestion[];
}

export interface VocabularyWord {
  id: string;
  korean: string;
  english: string;
  romanization: string;
  example: string;
  example_translation: string;
  level: TopikLevel;
  part_of_speech: string;
  tags: string[];
}

export interface GrammarLesson {
  id: string;
  level: TopikLevel;
  title: string;
  pattern: string;
  explanation: string;
  examples: { korean: string; english: string }[];
  usage_notes: string;
  tags: string[];
}

export interface WritingPrompt {
  id: string;
  taskNumber: 51 | 52 | 53 | 54;
  level: TopikLevel;
  title: string;
  instruction: string;
  context: string;
  prompt: string;
  sampleAnswer: string;
  scoringCriteria: string;
  tags: string[];
}

export interface MockTestQuestion {
  id: string;
  question?: string;
  passage?: string;
  audioUrl?: string;
  options?: string[];
  correctAnswer?: number;
  prompt?: string;
  taskNumber?: 51 | 52 | 53 | 54;
  context?: string;
  sampleAnswer?: string;
  tags?: string[];
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
  audioUrl: string;
  tags: string[];
}

export interface ListeningPassage {
  id: string;
  level: TopikLevel;
  title: string;
  audio_url: string;
  transcript: string;
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

export interface StudyTask {
  id: string;
  type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'writing' | 'mock-test';
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  targetUrl?: string;
}

export interface StudyPlan {
  userId: string;
  targetExamDate: string;
  daysRemaining: number;
  overallProgress: number;
  dailyTasks: StudyTask[];
  streak: number;
}

export interface OutlineSection {
  title: string;
  points: string[];
}

export interface EssayOutline {
  structure: OutlineSection[];
  vocabularySuggestions: { word: string; meaning: string; level: number }[];
  grammarConnectors: { connector: string; usage: string }[];
}

export interface WritingSample {
  id: string;
  promptId: string;
  level: TopikLevel;
  score: number;
  text: string;
  analysis: string;
  expertTips: string[];
}

export interface WritingFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  correctedText: string;
  templateUsage: {
    detectedTemplates: string[];
    naturalAlternatives: { template: string; alternative: string }[];
    structuralVarietyScore: number;
  };
}

export interface SRSState {
  interval: number;
  easeFactor: number;
  nextReview: number;
}

export interface TypingPracticeText {
  id: string;
  level: TopikLevel;
  text: string;
  category: 'essay' | 'sentence' | 'grammar' | 'paragraph';
}
