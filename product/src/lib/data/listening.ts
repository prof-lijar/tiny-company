import { ListeningPassage } from '@/lib/types';

export const listeningData: ListeningPassage[] = [
  {
    id: 'listen-1',
    level: 3,
    title: 'Daily Life: Scheduling an Appointment',
    transcript: 'A: 안녕하세요, 치과 예약 좀 하려고 하는데요.\\nB: 네, 언제쯤이 편하세요?\\\\nA: 이번 주 금요일 오후 3시 가능할까요?\\\\nB: 죄송하지만 금요일 3시는 이미 예약이 찼습니다. 4시는 어떠신가요?\\\\nA: 네, 4시로 해주세요.',
    questions: [
      {
        id: 'l1-q1',
        question: '여자는 왜 전화를 했습니까?',
        options: [
          '치과 진료비를 문의하려고',
          '치과 예약을 하기 위해',
          '치과 진료를 취소하기 위해',
          '예약 시간을 변경하기 위해'
        ],
        correctAnswer: 1,
        explanation: 'The woman says "치과 예약 좀 하려고 하는데요", which means she wants to make a dental appointment.',
        audioUrl: '/audio/listening-1-q1.mp3',
        tags: ['Daily Life', 'Scheduling'],
      }
    ]
  },
  {
    id: 'listen-2',
    level: 4,
    title: 'Workplace: Project Discussion',
    transcript: 'A: 이번 프로젝트 보고서 내용이 아주 훌륭합니다. 특히 데이터 분석 부분이 정밀하게 작성된 점 칭찬하고 싶어요.\\\\nB: 감사합니다. 어떤 부분을 더 보완하면 좋을까요?\\\\nA: 최근 3년간의 시장 변화 추이를 그래프로 추가한다면 훨씬 설득력이 있을 것 같습니다.\\\\nB: 좋은 생각입니다. 바로 수정해서 내일가지 제출하겠습니다.',
    questions: [
      {
        id: 'l2-q1',
        question: '남자가 제안한 내용은 무엇입니까?',
        options: [
          '보고서 전체 내용을 수정하는 것',
          '데이터 분석 방법을 변경하는 것',
          '시장 변화 추이 그래프를 추가하는 것',
          '제출 기한을 연장하는 것'
        ],
        correctAnswer: 2,
        explanation: 'The man suggests "최근 3년간의 시장 변화 추이를 그래프로 추가한다면", meaning adding a graph of market trends for the last 3 years.',
        audioUrl: '/audio/listening-2-q1.mp3',
        tags: ['Business', 'Data Representation'],
      }
    ]
  },
  {
    id: 'listen-3',
    level: 5,
    title: 'Social Issue: Environmental Protection',
    transcript: '최근 플라스틱 사용량을 줄이기 위한 정부의 노력이 계속되고 있습니다. 특히 일회용 컵 사용 규제가 강화되면서 많은 카페에서 다회용 컵 사용을 권장하고 있습니다. 하지만 일부 소비자들은 불편함을 이유로 여전히 일회용 컵을 선호하고 있어, 시민적 의식을 높이는 인식 개선 캠페인이 병행되어야 한다는 지적이 나옵니다.',
    questions: [
      {
        id: 'l3-q1',
        question: '이 글의 주제로 가장 적절한 것은?',
        options: [
          '다회용 컵의 경제적 이점',
          '정부의 플라스틱 규제 강화와 한계',
          '카페 산업의 성장과 환경 오염',
          '환경 보호를 위한 시민들의 자발적 참여'
        ],
        correctAnswer: 1,
        explanation: 'The text discusses government efforts to reduce plastic (especially single-use cups) but notes the limitation (consumer inconvenience) and the need for awareness campaigns.',
        audioUrl: '/audio/listening-3-q1.mp3',
        tags: ['Environment', 'Social Issues'],
      }
    ]
  },
  {
    id: 'listen-4',
    level: 6,
    title: 'Academic: Philosophy of Ethics',
    transcript: '윤리학에서 공리주의는 최대 다수의 최대 행복을 도덕적 판단의 기준으로 삼습니다. 이는 결과 중심적인 사회관점으로, 행위의 동기보다 그 행위가 가져올 결과를 중시한다는 점이 특징입니다. 그러나 이러한 관점은 소수의 권리가 무시될 수 있다는 치명적인 약점을 가지고 있으며, 이는 현대 사회에서 인권 개념과 충돌하는 지점이 됩니다.',
    questions: [
      {
        id: 'l4-q1',
        question: '공리주의에 대한 설명으로 옳은 것은?',
        options: [
          '행위의 동기를 가장 중요하게 생각한다.',
          '소수의 권리를 최우선으로 보호한다.',
          '결과적으로 최대 다수의 행복을 추구한다.',
          '현대 사회의 인권 개념과 완벽히 일치한다.'
        ],
        correctAnswer: 2,
        explanation: 'Utilitarianism is described as focusing on the "maximum happiness for the maximum number of people," emphasizing results over motives.',
        audioUrl: '/audio/listening-4-q1.mp3',
        tags: ['Philosophy', 'Academic'],
      }
    ]
  },
];
