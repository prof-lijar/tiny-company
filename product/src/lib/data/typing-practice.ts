import { TopikLevel } from '@/lib/types';

export interface TypingPracticeText {
  id: string;
  level: TopikLevel;
  text: string;
  category: 'essay' | 'sentence' | 'paragraph';
}

export const typingPracticeTexts: TypingPracticeText[] = [
  // --- LEVEL 3: Basic Sentences & Daily Life ---
  {
    id: 't1',
    level: 3,
    category: 'sentence',
    text: '한국어 공공서비스를 이용하기 위해 시청에 방문했습니다.',
  },
  {
    id: 't2',
    level: 3,
    category: 'sentence',
    text: '요즘 많은 사람들이 환경 보호에 관심을 가지고 있습니다.',
  },
  {
    id: 't3',
    level: 3,
    category: 'sentence',
    text: '외국어 학습은 새로운 문화를 이해하는 가장 좋은 방법입니다.',
  },
  {
    id: 't4',
    level: 3,
    category: 'paragraph',
    text: '저는 한국 요리를 매우 좋아합니다. 특히 비빔밥과 불고기가 가장 맛있다고 생각합니다. 앞으로 더 다양한 한국 음식을 만들어 보고 싶습니다.',
  },
  {
    id: 't5',
    level: 3,
    category: 'paragraph',
    text: '주말에는 보통 친구들과 함께 공원에서 산책을 합니다. 날씨가 좋으면 자전거를 타기도 합니다. 운동을 하고 나면 기분이 매우 상쾌해집니다.',
  },

  // --- LEVEL 4: Social Issues & Academic Basics ---
  {
    id: 't6',
    level: 4,
    category: 'sentence',
    text: '현대 사회에서 기술의 발전은 우리 삶의 방식을 근본적으로 변화시켰습니다.',
  },
  {
    id: 't7',
    level: 4,
    category: 'sentence',
    text: '경제 성장을 위해서는 교육 시스템의 혁신이 무엇보다 중요합니다.',
  },
  {
    id: 't8',
    level: 4,
    category: 'paragraph',
    text: '많은 사람들이 도시로 몰리면서 주거 문제와 교통 체증이 심각해지고 있습니다. 이를 해결하기 위해 정부는 신도시 개발과 대중교통 확충에 힘써야 합니다.',
  },
  {
    id: 't9',
    level: 4,
    category: 'paragraph',
    text: '인터넷의 발달로 정보 습득이 매우 빨라졌지만, 가짜 뉴스의 확산이라는 부작용도 나타나고 있습니다. 따라서 비판적인 사고로 정보를 수용하는 태도가 필요합니다.',
  },
  {
    id: 't10',
    level: 4,
    category: 'essay',
    text: '문화 다양성은 사회의 창의성과 경쟁력을 높이는 중요한 요소입니다. 서로 다른 문화적 배경을 가진 사람들이 조화를 이루며 살 때, 새로운 아이디어가 창출되고 사회적 갈등이 줄어들 수 있습니다.',
  },

  // --- LEVEL 5: Professional & Abstract Topics ---
  {
    id: 't11',
    level: 5,
    category: 'sentence',
    text: '기업의 사회적 책임은 단순한 기부를 넘어 지속 가능한 경영 체계를 구축하는 것에 있습니다.',
  },
  {
    id: 't12',
    level: 5,
    category: 'sentence',
    text: '인공지능의 발전은 노동 시장의 구조적 변화를 야기하며 새로운 직무 역량을 요구하고 있습니다.',
  },
  {
    id: 't13',
    level: 5,
    category: 'paragraph',
    text: '전통적인 교육 방식에서 벗어나 학습자 중심의 맞춤형 교육으로 전환하는 추세입니다. 이는 학습자의 능동적인 참여를 유도하고 실질적인 문제 해결 능력을 키우는 데 목적이 있습니다.',
  },
  {
    id: 't14',
    level: 5,
    category: 'paragraph',
    text: '글로벌 경제 위기 상황에서 국가 간의 협력은 선택이 아닌 필수입니다. 상호 의존성이 높아진 현대 경제 구조에서는 단독 대응보다 공동의 전략 수립이 더 효율적이기 때문입니다.',
  },
  {
    id: 't15',
    level: 5,
    category: 'essay',
    text: '현대인의 정신 건강 문제는 개인의 취약성보다는 급격한 사회 변화와 경쟁 중심의 문화에서 기인한 측면이 큽니다. 따라서 심리적 치유를 위한 사회적 안전망 구축과 인식 개선이 시급합니다.',
  },

  // --- LEVEL 6: Academic, Literary & Complex Structures ---
  {
    id: 't16',
    level: 6,
    category: 'sentence',
    text: '인간의 실존적 고뇌는 역설적으로 삶의 의미를 탐구하게 만드는 원동력이 된다.',
  },
  {
    id: 't17',
    level: 6,
    category: 'sentence',
    text: '포스트모더니즘의 등장은 절대적 진리라는 개념을 해체하고 상대적 가치의 중요성을 부각시켰다.',
  },
  {
    id: 't18',
    level: 6,
    category: 'paragraph',
    text: '언어는 단순한 소통의 도구를 넘어 사고의 틀을 규정하는 결정적인 역할을 수행합니다. 특정 언어가 가진 구조와 어휘는 그 언어를 사용하는 집단의 세계관을 반영하며, 이는 다시 개인의 인지 방식에 영향을 미칩니다.',
  },
  {
    id: 't19',
    level: 6,
    category: 'paragraph',
    text: '권력의 집중은 필연적으로 부패를 야기한다는 명제는 역사적 사례를 통해 반복적으로 증명되어 왔습니다. 견제와 균형이라는 민주주의의 핵심 원리가 작동하지 않을 때, 사회적 정의는 훼손될 수밖에 없습니다.',
  },
  {
    id: 't20',
    level: 6,
    category: 'essay',
    text: '과학 기술의 비약적인 발전이 인류에게 풍요를 가져다준 것은 부정할 수 없는 사실이나, 동시에 윤리적 공백이라는 심각한 과제를 던져주었습니다. 기술적 가능성이 곧 도덕적 정당성을 의미하지는 않기에, 우리는 기술의 속도에 맞춘 윤리적 성찰을 병행해야 합니다. 특히 유전자 편집이나 AI의 자율성 같은 문제는 인류의 정의를 다시 써야 할 만큼 근본적인 질문을 내포하고 있습니다.',
  },
];
