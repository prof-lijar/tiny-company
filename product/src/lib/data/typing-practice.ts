import { TopikLevel } from '@/lib/types';

export interface TypingPracticeText {
  id: string;
  level: TopikLevel;
  text: string;
  category: 'essay' | 'sentence' | 'grammar';
}

export const typingPracticeTexts: TypingPracticeText[] = [
  {
    id: 't1',
    level: 3,
    category: 'sentence',
    text: '한국어 공부를 시작한 지 일 년이 되었습니다.',
  },
  {
    id: 't2',
    level: 3,
    category: 'sentence',
    text: '요즘 많은 사람들이 환경 보호에 관심을 가지고 있습니다.',
  },
  {
    id: 't3',
    level: 4,
    category: 'sentence',
    text: '현대 사회에서 기술의 발전은 우리 삶에 큰 변화를 가져왔습니다.',
  },
  {
    id: 't4',
    level: 4,
    category: 'essay',
    text: '문화 다양성을 존중하는 것은 글로벌 시대의 필수적인 덕목이다.',
  },
  {
    id: 't5',
    level: 5,
    category: 'essay',
    text: '경제 성장과 환경 보존 사이의 균형을 맞추는 것은 매우 어려운 과제이다.',
  },
  {
    id: 't6',
    level: 5,
    category: 'essay',
    text: '인공지능의 발전이 인간의 창의성을 대체할 수 있을지에 대해 논란이 많다.',
  },
  {
    id: 't7',
    level: 6,
    category: 'essay',
    text: '사회적 갈등을 해소하기 위해서는 상호 이해와 양보의 정신이 무엇보다 중요하다.',
  },
  {
    id: 't8',
    level: 6,
    category: 'essay',
    text: '지속 가능한 발전을 위해서는 전 지구적인 협력과 정책적 뒷받침이 필수적이다.',
  },
];
