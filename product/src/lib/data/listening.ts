import { ListeningPassage } from '@/lib/types';

export const listeningData: ListeningPassage[] = [
  {
    id: 'listen-1',
    level: 3,
    title: 'Daily Life: Scheduling an Appointment',
    transcript: 'A: 안녕하세요, 치과 예약 좀 하려고 하는데요.\nB: 네, 언제쯤이 편하세요?\nA: 이번 주 금요일 오후 3시쯤 가능할까요?\nB: 잠시만요... 죄송하지만 금요일 3시는 이미 예약이 찼습니다. 4시는 어떠신가요?\nA: 네, 4시로 해주세요.',
    questions: [
      {
        id: 'l1-q1',
        question: '여자는 왜 전화를 했습니까?',
        options: [
          '치과 진료비를 문의하려고',
          '치과 예약을 하기 위해',
          '치과 위치를 물어보려고',
          '예약을 취소하기 위해'
        ],
        correctAnswer: 1,
        explanation: 'The woman says "치과 예약 좀 하려고 하는데요", which means she wants to make a dental appointment.',
        audioUrl: '/audio/listening-1-q1.mp3'
      }
    ]
  },
  {
    id: 'listen-2',
    level: 4,
    title: 'Workplace: Project Discussion',
    transcript: 'A: 이번 프로젝트 보고서 말이에요, 데이터 분석 부분이 조금 부족한 것 같아요.\nB: 아, 그렇군요. 어떤 부분을 더 보완하면 좋을까요?\nA: 최근 3년간의 시장 변화 추이를 그래프로 추가하면 훨씬 설득력이 있을 것 같습니다.\nB: 좋은 생각입니다. 바로 수정해서 내일까지 제출하겠습니다.',
    questions: [
      {
        id: 'l2-q1',
        question: '남자가 제안한 내용은 무엇입니까?',
        options: [
          '보고서 제출 날짜를 미루는 것',
          '데이터 분석을 생략하는 것',
          '시장 변화 추이 그래프를 추가하는 것',
          '새로운 팀원을 충원하는 것'
        ],
        correctAnswer: 2,
        explanation: 'The man suggests "최근 3년간의 시장 변화 추이를 그래프로 추가하면", meaning adding a graph of market trends for the last 3 years.',
        audioUrl: '/audio/listening-2-q1.mp3'
      }
    ]
  },
  {
    id: 'listen-3',
    level: 5,
    title: 'Social Issue: Environmental Protection',
    transcript: '최근 플라스틱 사용량을 줄이기 위한 정부의 노력이 계속되고 있습니다. 특히 일회용 컵 사용 규제가 강화되면서 많은 카페에서 다회용 컵 사용을 권장하고 있습니다. 하지만 일부 소비자들은 불편함을 이유로 여전히 일회용 컵을 선호하고 있어, 실질적인 변화를 위해서는 인식 개선 캠페인이 병행되어야 한다는 지적이 나옵니다.',
    questions: [
      {
        id: 'l3-q1',
        question: '이 글의 주제로 가장 적절한 것은?',
        options: [
          '다회용 컵의 경제적 이점',
          '정부의 일회용 컵 규제 강화와 한계',
          '카페 산업의 급격한 성장 배경',
          '환경 보호 캠페인의 성공 사례'
        ],
        correctAnswer: 1,
        explanation: 'The text discusses government efforts to reduce plastic (especially single-use cups) but notes the limitation (consumer inconvenience) and the need for awareness campaigns.',
        audioUrl: '/audio/listening-3-q1.mp3'
      }
    ]
  },
  {
    id: 'listen-4',
    level: 6,
    title: 'Academic: Philosophy of Ethics',
    transcript: '윤리학에서 공리주의는 최대 다수의 최대 행복을 도덕적 판단의 기준으로 삼습니다. 이는 결과 중심적인 사고방식으로, 행위의 동기보다는 그 행위가 가져올 결과의 총합을 중시합니다. 그러나 이러한 관점은 소수의 권리가 무시될 수 있다는 치명적인 약점을 가지고 있으며, 이는 현대 사회에서 인권 개념과 충돌하는 지점이 됩니다.',
    questions: [
      {
        id: 'l4-q1',
        question: '공리주의에 대한 설명으로 옳은 것은?',
        options: [
          '행위의 동기를 가장 중요하게 생각한다.',
          '소수의 권리를 최우선으로 보호한다.',
          '결과적으로 많은 사람에게 행복을 주는 것을 중시한다.',
          '현대 인권 개념과 완벽하게 일치한다.'
        ],
        correctAnswer: 2,
        explanation: 'Utilitarianism is described as focusing on the "maximum happiness for the maximum number of people," emphasizing results over motives.',
        audioUrl: '/audio/listening-4-q1.mp3'
      }
    ]
  }
];
