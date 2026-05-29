import { WritingSample } from '@/lib/types';
import { TopikLevel } from '@/lib/types';

export const writingSamples: WritingSample[] = [
  {
    id: 's1',
    promptId: 'p1',
    level: 3,
    score: 85,
    text: '제 취미는 독서입니다. 저는 책을 읽는 것을 매우 좋아합니다. 책을 읽으면 새로운 지식을 배울 수 있고 마음이 편안해집니다. 특히 소설책을 좋아합니다.',
    analysis: 'This sample demonstrates a good grasp of Level 3 vocabulary and basic sentence structures. The flow is natural, though it could be expanded with more specific examples.',
    expertTips: [
      'Use more diverse adjectives to describe the feeling of reading.',
      'Try connecting sentences with more complex conjunctions like ~기 때문에 or ~는데.'
    ]
  },
  {
    id: 's2',
    promptId: 'p2',
    level: 4,
    score: 90,
    text: '환경 문제를 해결하기 위해 개인의 노력도 중요하지만 정부의 규제가 필수적이라고 생각합니다. 개인의 노력만으로는 한계가 있기 때문입니다. 예를 들어, 탄소 배출 규제는 기업의 변화를 이끌어낼 수 있는 가장 강력한 수단입니다.',
    analysis: 'Strong argumentative structure. Clearly states the position and provides a logical reason. The tone is appropriately formal for Level 4.',
    expertTips: [
      'Incorporate more academic vocabulary related to environmental policy.',
      'Expand on the "counter-argument" to make the essay more persuasive.'
    ]
  },
  {
    id: 's3',
    promptId: 'p3',
    level: 5,
    score: 95,
    text: '인공지능의 급격한 발전은 노동 시장의 구조적 변화를 야기하며, 이는 필연적으로 인간 노동의 대체라는 위기감을 조성합니다. 그러나 AI를 단순한 대체재가 아닌 보완재로 인식한다면, 인간은 보다 창의적이고 고차원적인 업무에 집중함으로써 새로운 가치를 창출할 수 있을 것입니다.',
    analysis: 'Excellent use of advanced vocabulary (e.g., 구조적 변화, 필연적으로, 보완재). The argument is sophisticated and the flow is professional.',
    expertTips: [
      'Maintain this level of formality throughout the entire essay.',
      'Ensure that the conclusion ties back strongly to the initial problem statement.'
    ]
  }
];
