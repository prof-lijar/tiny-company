import { MockTest } from '@/lib/types';

export const mockTests: MockTest[] = [
  {
    id: 'mt-1',
    title: 'TOPIK II Full Mock Test #1 (2026 Reform)',
    sections: [
      {
        id: 'listening',
        name: 'Listening',
        durationMinutes: 70, // Increased by 10 mins total (approx split)
        questions: Array.from({ length: 60 }, (_, i) => ({
          id: `l${i + 1}`,
          audioUrl: `/audio/l${i + 1}.mp3`,
          question: i < 2 ? (i === 0 ? 'What is the main topic of the conversation?' : 'Why did the speaker call?') : `Listening Question ${i + 1}: Analyze the speaker's intent.`,
          options: i < 2 ? (i === 0 ? ['Travel', 'Work', 'Health', 'Education'] : ['To invite', 'To apologize', 'To inquire', 'To complain']) : ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: i < 2 ? (i === 0 ? 1 : 2) : 0,
          tags: ['Listening', '2026-Reform'],
        })),
      },
      {
        id: 'reading',
        name: 'Reading',
        durationMinutes: 70, 
        questions: Array.from({ length: 40 }, (_, i) => ({
          id: `r${i + 1}`,
          passage: i < 2 ? (i === 0 ? '현대 사회에서 환경 보호는 더 이상 선택이 아니라 필수입니다. 특히 플라스틱 사용을 줄이는 것은 매우 시급한 과제입니다.' : '한국의 경제 성장은 세계적으로 유명합니다. 하지만 그 이면에는 많은 사회적 갈등과 불평등이 존재합니다.') : `Reading Passage ${i + 1}: This is a mock passage for the 2026 TOPIK reform format.`,
          question: i < 2 ? (i === 0 ? 'What is the main point of the passage?' : 'What is the "back side" (이면) mentioned in the text?') : `Reading Question ${i + 1}: What can be inferred from the text?`,
          options: i < 2 ? (i === 0 ? ['Plastic is useful', 'Environment protection is essential', 'Modern society is complex', 'Reducing waste is hard'] : ['Economic growth', 'Global fame', 'Social conflict and inequality', 'Fast speed']) : ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: i < 2 ? (i === 0 ? 1 : 2) : 0,
          tags: ['Reading', '2026-Reform'],
        })),
      },
      {
        id: 'writing',
        name: 'Writing',
        durationMinutes: 50,
        questions: [
          {
            id: 'w51',
            taskNumber: 51,
            prompt: 'Fill in the blanks: ( ㉠ ) and ( ㉡ )',
            context: '저는 요즘 한국어 공부를 하고 있습니다. 한국어는 ( ㉠ ) 하지만 ( ㉡ ) 공부하고 있습니다.',
            sampleAnswer: '( ㉠ ) 어렵지만 / ( ㉡ ) 재미있게',
            tags: ['Grammar', 'Sentence Completion'],
          },
          {
            id: 'w54',
            taskNumber: 54,
            prompt: 'Write an essay on the importance of cultural diversity.',
            context: 'Discuss why cultural diversity is important in a globalized world.',
            sampleAnswer: '...',
            tags: ['Essay', 'Culture', 'Argumentation'],
          },
        ],
      },
    ],
  },
];
