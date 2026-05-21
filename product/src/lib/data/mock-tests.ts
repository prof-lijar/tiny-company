import { MockTest } from '@/lib/types';

export const mockTests: MockTest[] = [
  {
    id: 'mt-1',
    title: 'TOPIK II Full Mock Test #1',
    sections: [
      {
        id: 'listening',
        name: 'Listening',
        durationMinutes: 60,
        questions: [
          {
            id: 'l1',
            audioUrl: '/audio/l1.mp3',
            question: 'What is the main topic of the conversation?',
            options: ['Travel', 'Work', 'Health', 'Education'],
            correctAnswer: 1,
            tags: ['Main Idea', 'Workplace'],
          },
          {
            id: 'l2',
            audioUrl: '/audio/l2.mp3',
            question: 'Why did the speaker call?',
            options: ['To invite', 'To apologize', 'To inquire', 'To complain'],
            correctAnswer: 2,
            tags: ['Detail', 'Daily Life'],
          },
        ],
      },
      {
        id: 'reading',
        name: 'Reading',
        durationMinutes: 70,
        questions: [
          {
            id: 'r1',
            passage: '현대 사회에서 환경 보호는 더 이상 선택이 아니라 필수입니다. 특히 플라스틱 사용을 줄이는 것은 매우 시급한 과제입니다.',
            question: 'What is the main point of the passage?',
            options: ['Plastic is useful', 'Environment protection is essential', 'Modern society is complex', 'Reducing waste is hard'],
            correctAnswer: 1,
            tags: ['Main Idea', 'Environment'],
          },
          {
            id: 'r2',
            passage: '한국의 경제 성장은 세계적으로 유명합니다. 하지만 그 이면에는 많은 사회적 갈등과 불평등이 존재합니다.',
            question: 'What is the "back side" (이면) mentioned in the text?',
            options: ['Economic growth', 'Global fame', 'Social conflict and inequality', 'Fast speed'],
            correctAnswer: 2,
            tags: ['Vocabulary', 'Society'],
          },
        ],
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
