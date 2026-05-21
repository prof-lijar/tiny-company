import { ListeningPassage } from '@/lib/types';

export const listeningData: ListeningPassage[] = [
  {
    id: 'listen-1',
    level: 3,
    title: 'Daily Life: Scheduling an Appointment',
    transcript: `A: 안녕하세요, 치과 예약 좀 하려고 하는데요.
B: 네, 언제쯤이 편하세요?
A: 이번 주 금요일 오후 3시 가능할까요?
B: 죄송하지만 금요일 3시는 이미 예약이 찼습니다. 4시는 어떠신가요?
A: 네, 4시로 해주세요.`,
    questions: [
      {
        id: 'l1-q1',
        question: '여자는 왜 전화를 했습니까?',
        options: [
          '치과 진료비를 문의하려고',
          '치과 예약을 하기 위해',
          '치과 진료 시간을 변경하려고',
          '예약 시간을 확인하려고'
        ],
        correctAnswer: 1,
        explanation: `The woman says "치과 예약 좀 하려고 하는데요", meaning she wants to make a dental appointment.`,
        audioUrl: '/audio/listening-1-q1.mp3',
        tags: ['Daily Life', 'Scheduling'],
      },
      {
        id: 'l1-q2',
        question: '최종적으로 예약된 시간은 언제입니까?',
        options: [
          '금요일 오후 1시',
          '금요일 오후 2시',
          '금요일 오후 3시',
          '금요일 오후 4시'
        ],
        correctAnswer: 3,
        explanation: `The receptionist suggests 4 PM and the woman agrees: "네, 4시로 해주세요."`,
        audioUrl: '/audio/listening-1-q2.mp3',
        tags: ['Daily Life', 'Scheduling'],
      }
    ]
  },
  {
    id: 'listen-2',
    level: 4,
    title: 'Workplace: Project Discussion',
    transcript: `A: 이번 프로젝트 보고서 내용이 아주 훌륭합니다. 특히 데이터 분석 부분이 정교하게 작성된 점 칭찬하고 싶어요.
B: 감사합니다. 어떤 부분을 더 보완하면 좋을까요?
A: 최근 3년간의 시장 변화 추이를 그래프로 추가한다면 훨씬 설득력이 있을 것 같습니다.
B: 좋은 생각입니다. 바로 수정해서 내일까지 제출하겠습니다.`,
    questions: [
      {
        id: 'l2-q1',
        question: '남자가 칭찬한 내용은 무엇입니까?',
        options: [
          '보고서의 전체적인 분량',
          '데이터 분석의 정교함',
          '그래프의 시각적 효과',
          '빠른 제출 속도'
        ],
        correctAnswer: 1,
        explanation: `The man says "특히 데이터 분석 부분이 정교하게 작성된 점 칭찬하고 싶어요".`,
        audioUrl: '/audio/listening-2-q1.mp3',
        tags: ['Business', 'Data Representation'],
      },
      {
        id: 'l2-q2',
        question: '보고서에 추가하기로 한 내용은 무엇입니까?',
        options: [
          '최근 3년간의 시장 변화 그래프',
          '경쟁사 분석 표',
          '고객 만족도 조사 결과',
          '향후 프로젝트 일정'
        ],
        correctAnswer: 0,
        explanation: `The man suggests adding "최근 3년간의 시장 변화 추이를 그래프로 추가".`,
        audioUrl: '/audio/listening-2-q2.mp3',
        tags: ['Business', 'Data Representation'],
      }
    ]
  },
  {
    id: 'listen-3',
    level: 5,
    title: 'Social Issue: Environmental Protection',
    transcript: `최근 플라스틱 사용량을 줄이기 위해 많은 지자체에서 일회용 컵 보증금제를 도입하고 있습니다. 하지만 일부 소비자들은 여전히 편리함을 이유로 일회용 컵 사용을 선호하고 있어, 인식 개선을 위한 캠페인이 절실한 상황입니다. 특히 기업들이 친환경 소재 개발에 더 많은 투자를 해야 한다는 목소리가 높습니다.`,
    questions: [
      {
        id: 'l3-q1',
        question: '이 글의 주제로 가장 적절한 것은?',
        options: [
          '일회용 컵 보증금제의 경제적 효과',
          '플라스틱 사용 감소를 위한 노력과 과제',
          '친환경 소재 개발의 기술적 한계',
          '지자체별 환경 정책의 차이점'
        ],
        correctAnswer: 1,
        explanation: `The text discusses efforts to reduce plastic (deposit system) and the need for awareness and corporate investment.`,
        audioUrl: '/audio/listening-3-q1.mp3',
        tags: ['Environment', 'Social Issues'],
      },
      {
        id: 'l3-q2',
        question: '소비자들이 일회용 컵을 계속 사용하는 이유는 무엇입니까?',
        options: [
          '가격이 저렴해서',
          '디자인이 예뻐서',
          '사용이 편리해서',
          '보증금 환급이 어려워서'
        ],
        correctAnswer: 2,
        explanation: `The text mentions "일부 소비자들은 여전히 편리함을 이유로 일회용 컵 사용을 선호".`,
        audioUrl: '/audio/listening-3-q2.mp3',
        tags: ['Environment', 'Social Issues'],
      }
    ]
  },
  {
    id: 'listen-4',
    level: 6,
    title: 'Academic: Philosophy of Ethics',
    transcript: `공리주의에서는 최대 다수의 최대 행복을 도덕적 판단의 기준으로 삼습니다. 이는 결과 중심적인 사고방식으로, 행위의 동기보다는 그 결과가 가져오는 전체적인 유익함을 중시합니다. 하지만 이러한 관점은 소수의 희생을 정당화할 수 있다는 윤리적 비판에 직면해 있으며, 이에 대해 현대 철학자들은 정의와 권리의 개념을 결합하여 보완하려 노력하고 있습니다.`,
    questions: [
      {
        id: 'l4-q1',
        question: '공리주의의 핵심 원리는 무엇입니까?',
        options: [
          '개인의 절대적 권리 보호',
          '최대 다수의 최대 행복',
          '행위자의 순수한 동기',
          '전통적인 도덕 규범의 준수'
        ],
        correctAnswer: 1,
        explanation: `Utilitarianism is described as basing judgment on "최대 다수의 최대 행복".`,
        audioUrl: '/audio/listening-4-q1.mp3',
        tags: ['Philosophy', 'Academic'],
      },
      {
        id: 'l4-q2',
        question: '공리주의에 대한 주요 비판 내용은 무엇입니까?',
        options: [
          '결과를 예측하기 어렵다',
          '동기를 지나치게 강조한다',
          '소수의 희생을 정당화할 수 있다',
          '현대 사회에 적용하기에 너무 복잡하다'
        ],
        correctAnswer: 2,
        explanation: `The text states that it "소수의 희생을 정당화할 수 있다는 윤리적 비판에 직면".`,
        audioUrl: '/audio/listening-4-q2.mp3',
        tags: ['Philosophy', 'Academic'],
      }
    ]
  },
  {
    id: 'listen-5',
    level: 3,
    title: 'Daily Life: At the Hospital',
    transcript: `A: 어디가 불편해서 오셨나요?
B: 어제부터 갑자기 열이 나고 목이 너무 아파요.
A: 네, 우선 체온부터 측정하겠습니다. 입을 크게 벌려 보세요.
B: 윽, 정말 많이 부은 것 같아요.
A: 염증이 좀 있네요. 약 처방해 드릴 테니 며칠간 푹 쉬셔야 합니다.`,
    questions: [
      {
        id: 'l5-q1',
        question: '환자의 증상은 무엇입니까?',
        options: [
          '배가 아프고 설사를 한다',
          '열이 나고 목이 아프다',
          '머리가 무겁고 어지럽다',
          '기침이 심하고 가래가 나온다'
        ],
        correctAnswer: 1,
        explanation: `The patient says "어제부터 갑자기 열이 나고 목이 너무 아파요".`,
        audioUrl: '/audio/listening-5-q1.mp3',
        tags: ['Daily Life', 'Health'],
      },
      {
        id: 'l5-q2',
        question: '의사가 환자에게 권고한 사항은 무엇입니까?',
        options: [
          '운동을 열심히 하라',
          '물을 많이 마셔라',
          '며칠간 푹 쉬어라',
          '음식을 조심해서 먹어라'
        ],
        correctAnswer: 2,
        explanation: `The doctor says "약 처방해 드릴 테니 며칠간 푹 쉬셔야 합니다".`,
        audioUrl: '/audio/listening-5-q2.mp3',
        tags: ['Daily Life', 'Health'],
      }
    ]
  },
  {
    id: 'listen-6',
    level: 3,
    title: 'Daily Life: Airport Check-in',
    transcript: `A: 안녕하세요, 어디로 가시나요?
B: 뉴욕으로 갑니다. 여기 여권과 예약 확인서입니다.
A: 네, 확인되었습니다. 수하물은 몇 개인가요?
B: 캐리어 하나만 부치고, 이 가방은 기내에 가지고 타겠습니다.
A: 알겠습니다. 여기 탑승권입니다. 15번 게이트로 가시면 됩니다.`,
    questions: [
      {
        id: 'l6-q1',
        question: '여자는 어디로 여행을 갑니까?',
        options: [
          '런던',
          '파리',
          '뉴욕',
          '도쿄'
        ],
        correctAnswer: 2,
        explanation: `The woman says "뉴욕으로 갑니다".`,
        audioUrl: '/audio/listening-6-q1.mp3',
        tags: ['Daily Life', 'Travel'],
      },
      {
        id: 'l6-q2',
        question: '수하물 처리는 어떻게 했습니까?',
        options: [
          '모든 짐을 기내에 가지고 탄다',
          '캐리어 하나만 부치고 나머지는 기내에 가져간다',
          '모든 짐을 수하물로 부친다',
          '짐이 없어 수하물 처리를 하지 않는다'
        ],
        correctAnswer: 1,
        explanation: `The woman says "캐리어 하나만 부치고, 이 가방은 기내에 가지고 타겠습니다".`,
        audioUrl: '/audio/listening-6-q2.mp3',
        tags: ['Daily Life', 'Travel'],
      }
    ]
  },
  {
    id: 'listen-7',
    level: 3,
    title: 'Daily Life: Shopping for Clothes',
    transcript: `A: 저기요, 이 셔츠 파란색 말고 흰색은 없나요?
B: 잠시만요... 아, 흰색은 현재 품절입니다. 대신 연한 하늘색은 있는데 보시겠어요?
A: 네, 그것 좀 보여주세요. 그리고 이 옷은 사이즈가 어떻게 되나요?
B: 이건 프리사이즈라 대부분 잘 맞으실 거예요.`,
    questions: [
      {
        id: 'l7-q1',
        question: '손님이 찾고 있는 셔츠의 색상은 무엇입니까?',
        options: [
          '파란색',
          '흰색',
          '하늘색',
          '검은색'
        ],
        correctAnswer: 1,
        explanation: `The customer asks "이 셔츠 파란색 말고 흰색은 없나요?".`,
        audioUrl: '/audio/listening-7-q1.mp3',
        tags: ['Daily Life', 'Shopping'],
      },
      {
        id: 'l7-q2',
        question: '점원이 추천한 대안은 무엇입니까?',
        options: [
          '다른 디자인의 셔츠',
          '연한 하늘색 셔츠',
          '다른 매장의 흰색 셔츠',
          '더 큰 사이즈의 셔츠'
        ],
        correctAnswer: 1,
        explanation: `The clerk says "대신 연한 하늘색은 있는데 보시겠어요?".`,
        audioUrl: '/audio/listening-7-q2.mp3',
        tags: ['Daily Life', 'Shopping'],
      }
    ]
  },
  {
    id: 'listen-8',
    level: 3,
    title: 'Daily Life: Weather and Plans',
    transcript: `A: 오늘 날씨 정말 좋네요. 오후에 같이 공원에서 산책할까요?
B: 저도 그러고 싶은데, 오후에 갑자기 비 소식이 있더라고요.
A: 정말요? 일기예보에서는 맑다고 했는데 이상하네요.
B: 네, 방금 앱으로 확인했는데 비가 올 확률이 80%래요. 그냥 카페에서 만나는 게 어때요?`,
    questions: [
      {
        id: 'l8-q1',
        question: '남자가 처음 제안한 활동은 무엇입니까?',
        options: [
          '영화 관람',
          '공원 산책',
          '카페 방문',
          '쇼핑하기'
        ],
        correctAnswer: 1,
        explanation: `The man asks "오후에 같이 공원에서 산책할까요?".`,
        audioUrl: '/audio/listening-8-q1.mp3',
        tags: ['Daily Life', 'Weather'],
      },
      {
        id: 'l8-q2',
        question: '여자가 계획을 변경하자고 한 이유는 무엇입니까?',
        options: [
          '갑자기 일이 생겨서',
          '날씨가 너무 더워서',
          '비가 올 가능성이 높아서',
          '몸 상태가 좋지 않아서'
        ],
        correctAnswer: 2,
        explanation: `The woman says "오후에 갑자기 비 소식이 있더라고요" and "비가 올 확률이 80%래요".`,
        audioUrl: '/audio/listening-8-q2.mp3',
        tags: ['Daily Life', 'Weather'],
      }
    ]
  },
  {
    id: 'listen-9',
    level: 4,
    title: 'Workplace: Job Interview',
    transcript: `A: 우리 회사에 지원하게 된 동기가 무엇인가요?
B: 귀사의 혁신적인 제품 개발 방향이 저의 전공 지식과 잘 맞고, 특히 지속 가능한 기술 구현에 기여하고 싶어 지원했습니다.
A: 본인의 강점 중 우리 업무에 가장 도움이 될 점은 무엇이라고 생각하시나요?
B: 저는 다양한 프로젝트에서 팀원들과 협력하여 문제를 해결한 경험이 많아, 원활한 소통을 통해 성과를 낼 자신이 있습니다.`,
    questions: [
      {
        id: 'l9-q1',
        question: '지원자가 회사를 선택한 이유는 무엇입니까?',
        options: [
          '높은 연봉과 복지 혜택 때문에',
          '회사의 인지도가 높아서',
          '혁신적인 제품 방향과 전공의 일치',
          '집에서 가까운 위치에 있어서'
        ],
        correctAnswer: 2,
        explanation: `The applicant says "귀사의 혁신적인 제품 개발 방향이 저의 전공 지식과 잘 맞고...".`,
        audioUrl: '/audio/listening-9-q1.mp3',
        tags: ['Business', 'Interview'],
      },
      {
        id: 'l9-q2',
        question: '지원자가 강조한 본인의 강점은 무엇입니까?',
        options: [
          '뛰어난 외국어 능력',
          '전문적인 기술 지식',
          '원활한 소통과 협력 경험',
          '철저한 시간 관리 능력'
        ],
        correctAnswer: 2,
        explanation: `The applicant mentions "팀원들과 협력하여 문제를 해결한 경험이 많아, 원활한 소통을 통해 성과를 낼 자신이 있습니다".`,
        audioUrl: '/audio/listening-9-q2.mp3',
        tags: ['Business', 'Interview'],
      }
    ]
  },
  {
    id: 'listen-10',
    level: 4,
    title: 'Workplace: Project Deadline',
    transcript: `A: 김 대리님, 이번 주 금요일까지 제출하기로 한 기획안은 어떻게 되어 가나요?
B: 죄송합니다, 팀장님. 자료 조사 단계에서 예상보다 시간이 더 걸려서 아직 마무리 단계입니다.
A: 금요일은 클라이언트 미팅 날이라 늦어지면 곤란합니다. 목요일 오후까지는 초안을 보내주세요.
B: 네, 최대한 서둘러서 목요일 퇴근 전까지 보내드리겠습니다.`,
    questions: [
      {
        id: 'l10-q1',
        question: '기획안 제출이 늦어지고 있는 이유는 무엇입니까?',
        options: [
          '팀원 간의 의견 조율이 안 되어서',
          '자료 조사에 시간이 많이 소요되어서',
          '컴퓨터 고장으로 파일이 삭제되어서',
          '담당자가 휴가를 갔기 때문에'
        ],
        correctAnswer: 1,
        explanation: `The employee says "자료 조사 단계에서 예상보다 시간이 더 걸려서".`,
        audioUrl: '/audio/listening-10-q1.mp3',
        tags: ['Business', 'Deadline'],
      },
      {
        id: 'l10-q2',
        question: '팀장이 요청한 최종 기한은 언제입니까?',
        options: [
          '수요일 오전',
          '목요일 오후',
          '금요일 오전',
          '다음 주 월요일'
        ],
        correctAnswer: 1,
        explanation: `The manager says "목요일 오후까지는 초안을 보내주세요".`,
        audioUrl: '/audio/listening-10-q2.mp3',
        tags: ['Business', 'Deadline'],
      }
    ]
  },
  {
    id: 'listen-11',
    level: 4,
    title: 'Workplace: Office Politics',
    transcript: `A: 이번 인사 평가 결과가 나왔는데, 생각보다 점수가 낮게 나와서 속상하네요.
B: 너무 낙담하지 마세요. 이번에 평가 기준이 까다로워졌다고 들었어요.
A: 그래도 저는 최선을 다했는데, 결과가 이렇게 나오니 허탈합니다.
B: 일단 팀장님과 면담을 통해 부족한 점이 무엇인지 정확히 파악하는 게 좋을 것 같아요.`,
    questions: [
      {
        id: 'l11-q1',
        question: '여자가 속상해하는 이유는 무엇입니까?',
        options: [
          '업무량이 너무 많아서',
          '인사 평가 점수가 낮게 나와서',
          '동료와 갈등이 생겨서',
          '승진 기회를 놓쳐서'
        ],
        correctAnswer: 1,
        explanation: `The woman says "인사 평가 결과가 나왔는데, 생각보다 점수가 낮게 나와서 속상하네요".`,
        audioUrl: '/audio/listening-11-q1.mp3',
        tags: ['Business', 'Evaluation'],
      },
      {
        id: 'l11-q2',
        question: '남자가 제안한 해결 방법은 무엇입니까?',
        options: [
          '다른 부서로 이동 신청을 하라',
          '평가 결과에 대해 공식적으로 이의를 제기하라',
          '팀장님과 면담하여 부족한 점을 파악하라',
          '잠시 휴식을 취하며 마음을 추스르라'
        ],
        correctAnswer: 2,
        explanation: `The man suggests "팀장님과 면담을 통해 부족한 점이 무엇인지 정확히 파악하는 게 좋을 것 같아요".`,
        audioUrl: '/audio/listening-11-q2.mp3',
        tags: ['Business', 'Evaluation'],
      }
    ]
  },
  {
    id: 'listen-12',
    level: 4,
    title: 'Workplace: Tech Trends',
    transcript: `최근 기업들 사이에서 AI 도입을 통한 업무 효율화가 화두입니다. 특히 단순 반복 업무를 자동화함으로써 직원들이 더 창의적인 업무에 집중할 수 있는 환경을 조성하는 것이 목표입니다. 하지만 기술 도입 과정에서 기존 인력의 재교육 문제와 일자리 감소에 대한 우려도 동시에 제기되고 있습니다.`,
    questions: [
      {
        id: 'l12-q1',
        question: '기업들이 AI를 도입하려는 주된 목적은 무엇입니까?',
        options: [
          '인건비를 완전히 없애기 위해',
          '업무 효율화를 통해 창의적 업무에 집중하기 위해',
          '최신 기술 트렌드를 따라가기 위해',
          '고객 서비스의 속도를 높이기 위해'
        ],
        correctAnswer: 1,
        explanation: `The text says "단순 반복 업무를 자동화함으로써 직원들이 더 창의적인 업무에 집중할 수 있는 환경을 조성하는 것이 목표입니다".`,
        audioUrl: '/audio/listening-12-q1.mp3',
        tags: ['Business', 'Technology'],
      },
      {
        id: 'l12-q2',
        question: 'AI 도입에 따른 우려 사항은 무엇입니까?',
        options: [
          '시스템 구축 비용의 과다',
          '데이터 보안 및 개인정보 유출',
          '인력의 재교육 문제와 일자리 감소',
          'AI의 판단 오류로 인한 사고'
        ],
        correctAnswer: 2,
        explanation: `The text mentions "기존 인력의 재교육 문제와 일자리 감소에 대한 우려도 동시에 제기되고 있습니다".`,
        audioUrl: '/audio/listening-12-q2.mp3',
        tags: ['Business', 'Technology'],
      }
    ]
  },
  {
    id: 'listen-13',
    level: 5,
    title: 'Social Issue: Urbanization',
    transcript: `급격한 도시화는 경제 성장과 편의성 증대라는 긍정적인 면이 있지만, 동시에 심각한 도시 문제를 야기합니다. 주거 비용의 상승으로 인한 주거 불안정, 교통 혼잡, 그리고 녹지 공간의 부족 등이 대표적입니다. 이를 해결하기 위해 최근에는 도시 재생 사업을 통해 낡은 도심을 보존하면서도 기능을 회복시키는 지속 가능한 개발 방식이 주목받고 있습니다.`,
    questions: [
      {
        id: 'l13-q1',
        question: '도시화로 인해 발생하는 문제점이 아닌 것은?',
        options: [
          '주거 비용 상승',
          '교통 혼잡',
          '녹지 공간 부족',
          '경제 성장 둔화'
        ],
        correctAnswer: 3,
        explanation: `The text lists housing costs, traffic, and lack of green space as problems. Economic growth is mentioned as a positive side.`,
        audioUrl: '/audio/listening-13-q1.mp3',
        tags: ['Society', 'Urbanization'],
      },
      {
        id: 'l13-q2',
        question: '최근 주목받고 있는 도시 문제 해결 방식은 무엇입니까?',
        options: [
          '신도시 건설을 통한 인구 분산',
          '도시 재생 사업을 통한 지속 가능한 개발',
          '강력한 교통 규제를 통한 혼잡 완화',
          '주거 비용의 정부 직접 지원'
        ],
        correctAnswer: 1,
        explanation: `The text mentions "도시 재생 사업을 통해 낡은 도심을 보존하면서도 기능을 회복시키는 지속 가능한 개발 방식이 주목받고 있습니다".`,
        audioUrl: '/audio/listening-13-q2.mp3',
        tags: ['Society', 'Urbanization'],
      }
    ]
  },
  {
    id: 'listen-14',
    level: 5,
    title: 'Social Issue: Aging Society',
    transcript: `고령화 사회로의 진입은 생산 가능 인구의 감소라는 경제적 위기와 함께, 노인 빈곤 및 외로움이라는 사회적 문제를 동반합니다. 특히 은퇴 후 사회적 관계망이 단절된 노인들의 우울증 수치가 높아지고 있어, 지역 사회 중심의 돌봄 서비스와 노인 일자리 창출을 통한 사회적 참여 확대가 시급한 과제로 떠오르고 있습니다.`,
    questions: [
      {
        id: 'l14-q1',
        question: '고령화 사회가 가져오는 경제적 위기는 무엇입니까?',
        options: [
          '연금 재정의 고갈',
          '생산 가능 인구의 감소',
          '의료비 지출의 급증',
          '소비 시장의 위축'
        ],
        correctAnswer: 1,
        explanation: `The text explicitly mentions "생산 가능 인구의 감소라는 경제적 위기".`,
        audioUrl: '/audio/listening-14-q1.mp3',
        tags: ['Society', 'Aging'],
      },
      {
        id: 'l14-q2',
        question: '노인들의 우울증을 해결하기 위한 방안으로 제시된 것은?',
        options: [
          '정기적인 건강 검진 지원',
          '기초 연금의 대폭 인상',
          '지역 사회 돌봄 서비스 및 사회적 참여 확대',
          '노인 전용 주거 단지 조성'
        ],
        correctAnswer: 2,
        explanation: `The text suggests "지역 사회 중심의 돌봄 서비스와 노인 일자리 창출을 통한 사회적 참여 확대".`,
        audioUrl: '/audio/listening-14-q2.mp3',
        tags: ['Society', 'Aging'],
      }
    ]
  },
  {
    id: 'listen-15',
    level: 5,
    title: 'Social Issue: Climate Change',
    transcript: `기후 변화로 인한 이상 기후 현상은 더 이상 먼 미래의 이야기가 아닙니다. 전 세계적으로 기록적인 폭염과 홍수가 빈번해지고 있으며, 이는 농작물 피해로 이어져 식량 안보 위기를 초래하고 있습니다. 탄소 배출량을 줄이기 위한 국제적인 협력도 중요하지만, 개인 차원에서의 에너지 절약과 저탄소 생활 실천이 병행되어야 실질적인 변화를 끌어낼 수 있습니다.`,
    questions: [
      {
        id: 'l15-q1',
        question: '이상 기후 현상이 초래하는 직접적인 결과는 무엇입니까?',
        options: [
          '해수면의 급격한 하락',
          '농작물 피해로 인한 식량 안보 위기',
          '에너지 가격의 하락',
          '신규 서식지의 발견'
        ],
        correctAnswer: 1,
        explanation: `The text says "이는 농작물 피해로 이어져 식량 안보 위기를 초래하고 있습니다".`,
        audioUrl: '/audio/listening-15-q1.mp3',
        tags: ['Environment', 'Climate Change'],
      },
      {
        id: 'l15-q2',
        question: '기후 변화 해결을 위해 강조된 두 가지 차원의 노력은?',
        options: [
          '정부의 규제와 기업의 이윤 추구',
          '국제적 협력과 개인의 저탄소 생활 실천',
          '기술 개발과 경제 성장',
          '도시 개발과 자연 보존'
        ],
        correctAnswer: 1,
        explanation: `The text mentions "국제적인 협력도 중요하지만, 개인 차원에서의 에너지 절약과 저탄소 생활 실천이 병행되어야".`,
        audioUrl: '/audio/listening-15-q2.mp3',
        tags: ['Environment', 'Climate Change'],
      }
    ]
  },
  {
    id: 'listen-16',
    level: 5,
    title: 'Social Issue: Digital Divide',
    transcript: `디지털 기술의 급격한 발전은 삶의 편의성을 높였지만, 동시에 디지털 격차라는 새로운 사회적 불평등을 낳았습니다. 특히 고령층이나 저소득층은 디지털 기기 접근성과 활용 능력이 떨어져, 온라인 예약이나 금융 서비스 이용에서 소외되는 현상이 발생하고 있습니다. 이는 단순한 불편함을 넘어 기본적인 사회적 권리 향유의 불평등으로 이어질 수 있습니다.`,
    questions: [
      {
        id: 'l16-q1',
        question: '디지털 격차가 발생하는 주요 원인은 무엇입니까?',
        options: [
          '인터넷 요금의 과도한 상승',
          '디지털 기기의 성능 부족',
          '기기 접근성 및 활용 능력의 차이',
          '정부의 디지털 정책 부재'
        ],
        correctAnswer: 2,
        explanation: `The text says "특히 고령층이나 저소득층은 디지털 기기 접근성과 활용 능력이 떨어져".`,
        audioUrl: '/audio/listening-16-q1.mp3',
        tags: ['Society', 'Technology'],
      },
      {
        id: 'l16-q2',
        question: '디지털 격차가 가져오는 심각한 결과는 무엇입니까?',
        options: [
          '스마트폰 사용 시간의 증가',
          '기본적인 사회적 권리 향유의 불평등',
          '디지털 기기 시장의 포화',
          '온라인 콘텐츠의 품질 저하'
        ],
        correctAnswer: 1,
        explanation: `The text states "이는 단순한 불편함을 넘어 기본적인 사회적 권리 향유의 불평등으로 이어질 수 있습니다".`,
        audioUrl: '/audio/listening-16-q2.mp3',
        tags: ['Society', 'Technology'],
      }
    ]
  },
  {
    id: 'listen-17',
    level: 6,
    title: 'Academic: Aesthetics',
    transcript: `미학적 관점에서 아름다움이란 단순히 외형적인 조화나 균형만을 의미하지 않습니다. 현대 미학에서는 대상이 지닌 본질적인 가치와 그것을 바라보는 주체의 해석적 경험을 더 중요하게 생각합니다. 즉, 아름다움은 객관적으로 존재하는 속성이 아니라, 대상과 주체 사이의 상호작용을 통해 구성되는 역동적인 과정이라고 볼 수 있습니다.`,
    questions: [
      {
        id: 'l17-q1',
        question: '현대 미학에서 정의하는 아름다움의 특징은 무엇입니까?',
        options: [
          '외형적인 조화와 균형의 완성',
          '대상에 내재된 절대적인 속성',
          '주체의 해석적 경험과 상호작용의 결과',
          '보편적인 기준에 따른 객관적 평가'
        ],
        correctAnswer: 2,
        explanation: `The text says "아름다움은 객관적으로 존재하는 속성이 아니라, 대상과 주체 사이의 상호작용을 통해 구성되는 역동적인 과정".`,
        audioUrl: '/audio/listening-17-q1.mp3',
        tags: ['Philosophy', 'Aesthetics'],
      },
      {
        id: 'l17-q2',
        question: '전통적인 미학적 관점과 현대 미학의 가장 큰 차이점은?',
        options: [
          '색채의 사용 여부',
          '객관적 속성 중심에서 주관적 경험 중심으로의 이동',
          '예술 작품의 가격 결정 방식',
          '전시 공간의 중요성'
        ],
        correctAnswer: 1,
        explanation: `The text contrasts "외형적인 조화나 균형" (traditional/simple) with "주체의 해석적 경험" and "상호작용" (modern).`,
        audioUrl: '/audio/listening-17-q2.mp3',
        tags: ['Philosophy', 'Aesthetics'],
      }
    ]
  },
  {
    id: 'listen-18',
    level: 6,
    title: 'Academic: Epistemology',
    transcript: `인식론의 핵심 질문은 "우리는 무엇을 어떻게 알 수 있는가"입니다. 합리론은 이성과 논리적 추론을 통해 보편적 진리에 도달할 수 있다고 주장하는 반면, 경험론은 감각적 경험과 관찰을 통한 데이터의 축적이 지식의 근원이라고 봅니다. 칸트는 이 두 관점을 통합하여, 인간의 인식 구조라는 틀을 통해 경험된 데이터가 정리될 때 비로소 지식이 형성된다고 주장했습니다.`,
    questions: [
      {
        id: 'l18-q1',
        question: '합리론과 경험론의 지식 근원에 대한 관점 차이는 무엇입니까?',
        options: [
          '언어 능력과 기억력의 차이',
          '이성적 추론과 감각적 경험의 차이',
          '교육 수준과 환경의 차이',
          '직관과 분석의 차이'
        ],
        correctAnswer: 1,
        explanation: `Rationalism focuses on "이성과 논리적 추론", while Empiricism focuses on "감각적 경험과 관찰".`,
        audioUrl: '/audio/listening-18-q1.mp3',
        tags: ['Philosophy', 'Epistemology'],
      },
      {
        id: 'l18-q2',
        question: '칸트가 주장한 지식 형성의 과정은 무엇입니까?',
        options: [
          '순수한 이성만으로 진리에 도달하는 것',
          '무조건적인 경험의 축적',
          '인식 구조라는 틀을 통한 경험 데이터의 정리',
          '타인의 지식을 그대로 수용하는 것'
        ],
        correctAnswer: 2,
        explanation: `The text says "인간의 인식 구조라는 틀을 통해 경험된 데이터가 정리될 때 비로소 지식이 형성된다".`,
        audioUrl: '/audio/listening-18-q2.mp3',
        tags: ['Philosophy', 'Epistemology'],
      }
    ]
  },
  {
    id: 'listen-19',
    level: 6,
    title: 'Academic: Political Theory',
    transcript: `사회 계약설은 국가의 권력이 신이 부여한 것이 아니라, 구성원들의 자발적인 합의와 계약을 통해 형성되었다고 봅니다. 홉스는 혼란스러운 자연 상태를 벗어나기 위해 강력한 통치자에게 권리를 양도해야 한다고 주장한 반면, 루소는 일반 의지에 기초한 직접 민주주의적 통치를 강조했습니다. 이러한 이론들은 현대 민주주의 국가의 정당성을 뒷받침하는 이론적 기초가 되었습니다.`,
    questions: [
      {
        id: 'l19-q1',
        question: '사회 계약설의 핵심 전제는 무엇입니까?',
        options: [
          '권력은 신으로부터 부여받은 것이다',
          '국가는 혈연 중심의 공동체이다',
          '국가 권력은 구성원들의 자발적 합의로 형성된다',
          '강력한 1인 독재가 사회 안정을 보장한다'
        ],
        correctAnswer: 2,
        explanation: `The text says "국가의 권력이 신이 부여한 것이 아니라, 구성원들의 자발적인 합의와 계약을 통해 형성되었다고 봅니다".`,
        audioUrl: '/audio/listening-19-q1.mp3',
        tags: ['Philosophy', 'Political Theory'],
      },
      {
        id: 'l19-q2',
        question: '홉스와 루소의 관점 차이는 무엇입니까?',
        options: [
          '전자는 계약을 부정하고 후자는 긍정한다',
          '전자는 강력한 통치자를, 후자는 일반 의지를 강조한다',
          '전자는 민주주의를, 후자는 군주제를 주장한다',
          '전자는 개인의 자유를, 후자는 국가의 질서를 우선한다'
        ],
        correctAnswer: 1,
        explanation: `Hobbes argued for "강력한 통치자에게 권리를 양도", while Rousseau emphasized "일반 의지에 기초한 직접 민주주의적 통치".`,
        audioUrl: '/audio/listening-19-q2.mp3',
        tags: ['Philosophy', 'Political Theory'],
      }
    ]
  },
  {
    id: 'listen-20',
    level: 6,
    title: 'Academic: Literary Analysis',
    transcript: `문학 작품에서의 상징은 단순한 비유를 넘어 작품 전체의 주제를 응축하여 전달하는 장치입니다. 독자는 텍스트에 나타난 구체적인 사물이나 행동이 어떤 추상적인 의미를 내포하고 있는지를 분석함으로써 작가가 숨겨놓은 의도를 파악할 수 있습니다. 특히 모순 형용과 같은 역설적 표현은 독자로 하여금 기존의 상식을 깨고 새로운 차원의 진실을 성찰하게 만드는 효과를 줍니다.`,
    questions: [
      {
        id: 'l20-q1',
        question: '문학 작품에서 상징의 역할은 무엇입니까?',
        options: [
          '작품의 분량을 늘리는 것',
          '현실 세계를 그대로 복제하는 것',
          '주제를 응축하여 전달하는 것',
          '이야기의 전개를 빠르게 하는 것'
        ],
        correctAnswer: 2,
        explanation: `The text says "상징은 단순한 비유를 넘어 작품 전체의 주제를 응축하여 전달하는 장치입니다".`,
        audioUrl: '/audio/listening-20-q1.mp3',
        tags: ['Literature', 'Academic'],
      },
      {
        id: 'l20-q2',
        question: '역설적 표현이 독자에게 주는 효과는 무엇입니까?',
        options: [
          '작품의 내용을 쉽게 이해하게 한다',
          '기존의 상식을 깨고 새로운 진실을 성찰하게 한다',
          '작가의 개인 경험을 직접적으로 전달한다',
          '작품의 분위기를 가볍게 만든다'
        ],
        correctAnswer: 1,
        explanation: `The text states "역설적 표현은 독자로 하여금 기존의 상식을 깨고 새로운 차원의 진실을 성찰하게 만드는 효과를 줍니다".`,
        audioUrl: '/audio/listening-20-q2.mp3',
        tags: ['Literature', 'Academic'],
      }
    ]
  },
];
