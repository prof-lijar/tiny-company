export interface TypingPracticeText {
  id: string;
  level: number;
  category: 'sentence' | 'essay';
  text: string;
  title: string;
}

export const typingPracticeTexts: TypingPracticeText[] = [
  {
    id: 's1',
    level: 2,
    category: 'sentence',
    title: 'Basic Introduction',
    text: '안녕하세요. 저는 학생입니다. 한국어를 공부하고 있습니다.',
  },
  {
    id: 's2',
    level: 3,
    category: 'sentence',
    title: 'Daily Routine',
    text: '저는 매일 아침 일곱 시에 일어나서 운동을 하고 학교에 갑니다.',
  },
  {
    id: 's3',
    level: 4,
    category: 'sentence',
    title: 'Opinion Expressing',
    text: '현대 사회에서 환경 보호는 매우 중요한 과제이며, 우리 모두의 노력이 필요합니다.',
  },
  {
    id: 'e1',
    level: 4,
    category: 'essay',
    title: 'Environmental Issues',
    text: '최근 환경 오염 문제가 심각해지면서 많은 사람들이 환경 보호의 필요성을 느끼고 있습니다. 특히 미세먼지와 기후 변화는 우리의 건강과 삶의 질에 직접적인 영향을 미치고 있습니다. 따라서 우리는 일상생활에서 일회용품 사용을 줄이고 대중교통을 이용하는 등 작은 실천부터 시작해야 합니다.',
  },
  {
    id: 'e2',
    level: 5,
    category: 'essay',
    title: 'AI and Education',
    text: '인공지능 기술의 발전은 교육 현장에 큰 변화를 가져왔습니다. AI는 학습자 개개인의 수준에 맞춘 맞춤형 학습을 가능하게 함으로써 교육의 효율성을 높이고 있습니다. 하지만 AI가 교사의 역할을 완전히 대체할 수는 없습니다. 인간 교사의 정서적 교감과 윤리적 지도가 함께 이루어져야 진정한 교육이 완성될 수 있기 때문입니다.',
  },
];
