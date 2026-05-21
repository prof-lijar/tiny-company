import { ReadingPassage } from '@/lib/types';

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'reading-1',
    level: 3,
    title: '한국의 전통 음식 (Traditional Korean Food)',
    content: `한국 사람들은 예전부터 김치를 많이 먹었습니다. 김치는 배추나 무 같은 채소를 소금에 절여 고춧가루, 마늘, 생강 등을 넣어 만든 음식입니다. 김치에는 비타민과 무기질이 많아서 건강에 매우 좋습니 다. 요즘은 외국 사람들도 김치의 맛과 건강 효능에 관심을 가지고 많이 먹기 시작했습니다. 특히 매운 맛을 좋아하는 사람들이 김치를 선호합니다.`,
    questions: [
      {
        id: 'q1-1',
        question: '이 글의 주제로 가장 적절한 것은 무엇입니까?',
        options: [
          '김치를 만드는 방법',
          '김치의 특징과 장점',
          '한국의 다양한 채소',
          '외국인들이 좋아하는 음식'
        ],
        correctAnswer: 1,
        explanation: 'The text describes what Kimchi is and its health benefits, and notes that foreigners are now interested in it.',
        tags: ['Main Idea', 'Culture'],
      },
      {
        id: 'q1-2',
        question: '김치가 건강에 좋은 이유는 무엇입니까?',
        options: [
          '매운 맛이 나기 때문에',
          '채소를 많이 사용하기 때문에',
          '비타민과 무기질이 많기 때문에',
          '외국 사람들이 많이 먹기 때문에'
        ],
        correctAnswer: 2,
        explanation: 'The text explicitly states "김치에는 비타민과 무기질이 많아서 건강에 매우 좋습니 다" (Kimchi is very good for health because it has many vitamins and minerals).',
        tags: ['Detail', 'Health'],
      }
    ]
  },
  {
    id: 'reading-2',
    level: 4,
    title: '현대 사회의 소통 문제 (Communication Problems in Modern Society)',
    content: `현대 사회에서는 스마트폰의 보급으로 인해 언제 어디서나 어디서나 쉽게 소통할 수 있게 되었습니다. 하지만 역설적으로 사람들은 과거보다 더 외로움을 느낀다고 합니다. 온라인상의 관계는 깊지 않고 가볍게 처리되기 때문입니다. 진정한 소통은 단순히 정보를 주고받는 것이 아니라 서로의 감정을 공유하고 공감하는 과정입니다. 따라서 우리는 디지털 기기기기에 너무 의존하지 말고 직접 얼굴을 마주 보는 시간을 늘려야 합니다.`,
    questions: [
      {
        id: 'q2-1',
        question: '필자가 생각하는 진정한 소통이란 무엇입니까?',
        options: [
          '쉽게 정보를 주고받는 것',
          '스마트폰을 통해 관계를 맺는 것',
          '감정을 공유하고 공감하는 것',
          '디지털 기기를 효율적으로 사용하는 것'
        ],
        correctAnswer: 2,
        explanation: 'The text states "진정한 소통은 단순히 정보를 주고받는 것이 아니라 서로의 감정을 공유하고 공감하는 과정입니다" (True communication is not simply exchanging information but a process of sharing and empathizing with each other\'s emotions).',
        tags: ['Vocabulary', 'Abstract Concepts'],
      },
      {
        id: 'q2-2',
        question: '글의 내용과 일치하는 것은 무엇입니까?',
        options: [
          '스마트폰 덕분에 현대인은 더 이상 외롭지 않다.',
          '온라인 관계는 오프라인 관계보다 더 깊다.',
          '디지털 기기 사용을 늘려야 소통이 원활해진다.',
          '현대 사회의 소통 방식에는 한계가 있다.'
        ],
        correctAnswer: 3,
        explanation: 'The text argues that despite fast communication via smartphones, people feel lonelier and online relationships lack depth, implying a limitation in modern communication methods.',
        tags: ['Inference', 'Society'],
      }
    ]
  },
  {
    id: 'reading-3',
    level: 5,
    title: '인공지능과 예술의 경계 (The Boundary Between AI and Art)',
    content: `최근 인공지능이 생성한 그림이나 음악이 예술 작품으로 인정받으며 큰 논란이 되고 있습니다. 인공지능은 방대한 데이터를 학습하여 인간이 만든 기존의 스타일을 완벽하게 재현할 수 있습니다. 그러나 예술의 본질이 인간의 고유한 경험과 감정, 그리고 이를 표현하고자 하는 의지에 있다면 인공지능의 결과물은 단지 정교한 계산의 산물일 뿐입니다. 예술은 단순히 결과물의 완성도가 아니라 그 과정에 담긴 인간적 고뇌와 철학이 중요하기 때문입니다.`,
    questions: [
      {
        id: 'q3-1',
        question: '필자가 인공지능의 예술 작품에 대해 가지는 관점은 무엇입니까?',
        options: [
          '인간보다 더 뛰어난 예술적 능력을 갖췄다.',
          '데이터 학습을 통해 진정한 예술을 구현했다.',
          '인간의 고유한 경험과 철학이 결여되어 있다.',
          '결과물의 완성도가 높으므로 예술로 인정해야 한다.'
        ],
        correctAnswer: 2,
        explanation: `The author argues that if art is about human experience and will, AI's output is just a product of calculation, lacking human agony and philosophy.`,
        tags: ['Author\'s Perspective', 'Philosophy'],
      }
    ]
  }
];
