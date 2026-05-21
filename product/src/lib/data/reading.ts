import { ReadingPassage } from '@/lib/types';

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: "reading-1",
    level: 3,
    title: "한국의 전통 음식 (Traditional Korean Food)",
    content: `한국 사람들은 오래전부터 김치를 매우 중요하게 생각했습니다. 김치는 배추나 무 같은 채소를 소금에 절여 고춧가루, 마늘, 생강 등을 넣어 만드는 음식입니다. 김치에는 비타민과 무기질이 많아서 건강에 매우 좋다고 합니다. 요즘은 외국 사람들도 김치의 맛과 건강 효능에 관심을 가지고 많이 먹기 시작했습니다. 특히 매운 맛을 좋아하는 사람들이 김치를 선호합니다.`,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "q1-1",
        question: "이 글의 주제로 가장 적절한 것은?",
        options: [
          "김치를 만드는 방법",
          "김치의 특징과 장점",
          "한국의 다양한 채소",
          "외국인이 좋아하는 음식"
        ],
        correctAnswer: 1,
        explanation: "The text describes what Kimchi is, its health benefits, and its growing popularity.",
        tags: ["Main Idea", "Culture"],
      },
      {
        id: "q1-2",
        question: "김치가 건강에 좋은 이유는 무엇입니까?",
        options: [
          "매운 맛이 나기 때문에",
          "채소를 많이 사용하기 때문에",
          "비타민과 무기질이 많기 때문에",
          "외국인들이 많이 먹기 때문에"
        ],
        correctAnswer: 2,
        explanation: "The text explicitly states \"김치에는 비타민과 무기질이 많아서 건강에 매우 좋다고 합니다.\"",
        tags: ["Detail", "Health"],
      }
    ]
  },
  {
    id: "reading-2",
    level: 4,
    title: "현대 사회의 소통 문제 (Communication Problems in Modern Society)",
    content: `현대 사회에서는 스마트폰의 보급으로 인해 언제 어디서나 쉽게 소통할 수 있게 되었습니다. 하지만 역설적으로 사람들은 더 외롭다고 말합니다. 온라인상의 관계는 아주 쉽게 만들어지지만 깊이가 부족하기 때문입니다. 진정한 소통은 단순히 정보를 주고받는 것이 아니라 서로의 감정을 공유하고 공감하는 과정입니다. 따라서 우리는 디지털 기기 사용을 줄이고 직접 얼굴을 마주 보는 시간을 늘려야 합니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q2-1",
        question: "필자가 생각하는 진정한 소통이란 무엇입니까?",
        options: [
          "정보를 빠르게 주고받는 것",
          "스마트폰을 통해 연결되는 것",
          "서로의 감정을 공유하고 공감하는 것",
          "많은 온라인 관계를 맺는 것"
        ],
        correctAnswer: 2,
        explanation: "The text states \"진정한 소통은 단순히 정보를 주고받는 것이 아니라 서로의 감정을 공유하고 공감하는 과정입니다.\"",
        tags: ["Vocabulary", "Abstract Concepts"],
      },
      {
        id: "q2-2",
        question: "현대인들이 더 외로움을 느끼는 이유는 무엇입니까?",
        options: [
          "스마트폰 사용량이 너무 적어서",
          "온라인 관계의 깊이가 부족해서",
          "정보 공유가 제대로 안 되어서",
          "얼굴을 보는 시간이 너무 많아서"
        ],
        correctAnswer: 1,
        explanation: "The text mentions \"온라인상의 관계는 아주 쉽게 만들어지지만 깊이가 부족하기 때문입니다.\"",
        tags: ["Inference", "Society"],
      }
    ]
  },
  {
    id: "reading-3",
    level: 5,
    title: "인공지능과 예술의 경계 (The Boundary Between AI and Art)",
    content: `최근 인공지능이 생성한 그림이나 음악이 예술 작품으로 인정받으며 큰 논란이 되고 있습니다. 인공지능은 방대한 데이터를 학습하여 인간이 만들 법한 스타일을 완벽하게 재현할 수 있습니다. 하지만 예술의 본질이 인간의 고유한 경험과 감정, 그리고 이를 표현하려는 의지에 있다면 인공지능의 결과물은 단지 정교한 계산의 산물일 뿐입니다. 예술은 단순히 결과물의 완성도가 아니라 그 과정 속에 담긴 인간적 고뇌와 철학이 더해져야 하기 때문입니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q3-1",
        question: "필자는 인공지능의 예술 활동에 대해 어떻게 생각하고 있습니까?",
        options: [
          "인공지능이 인간보다 더 뛰어난 예술을 한다고 본다.",
          "인공지능의 작품은 데이터의 산물일 뿐 예술이 아니라고 본다.",
          "인공지능이 인간의 고유한 경험을 완벽히 재현했다고 본다.",
          "예술의 본질은 결과물의 완성도에 있다고 본다."
        ],
        correctAnswer: 1,
        explanation: "The author argues that AI output is a product of calculation, lacking the human struggle and philosophy inherent in true art.",
        tags: ["Author's Perspective", "Philosophy"],
      }
    ]
  },
  {
    id: "reading-4",
    level: 3,
    title: "편의점 이용 안내 (Convenience Store Guide)",
    content: `우리 동네 편의점은 24시간 운영합니다. 이곳에서는 간단한 음식과 음료뿐만 아니라 택배 서비스와 공과금 납부 서비스도 이용할 수 있습니다. 특히 밤 10시부터 새벽 2시까지는 1+1 행사 상품이 많으니 참고하시기 바랍니다. 매장 내에서는 금연이며, 쓰레기는 지정된 곳에 버려주시기 바랍니다.`,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "q4-1",
        question: "이 편의점에서 이용할 수 없는 서비스는 무엇입니까?",
        options: [
          "음식 구매",
          "택배 서비스",
          "공과금 납부",
          "은행 계좌 개설"
        ],
        correctAnswer: 3,
        explanation: "The text lists food, drinks, delivery, and bill payment, but not bank account opening.",
        tags: ["Detail", "Practical"],
      },
      {
        id: "q4-2",
        question: "1+1 행사 상품이 많은 시간대는 언제입니까?",
        options: [
          "오전 8시 ~ 오전 12시",
          "오후 2시 ~ 오후 6시",
          "오후 10시 ~ 새벽 2시",
          "새벽 4시 ~ 오전 8시"
        ],
        correctAnswer: 2,
        explanation: "The text says \"특히 밤 10시부터 새벽 2시까지는 1+1 행사 상품이 많으니...\"",
        tags: ["Detail", "Practical"],
      }
    ]
  },
  {
    id: "reading-5",
    level: 4,
    title: "도시 재생과 지역 사회 (Urban Regeneration and Local Community)",
    content: `도시 재생이란 도시를 완전히 허물고 새로 짓는 재개발과 달리, 기존의 정체성과 지역의 특성을 유지하면서 환경을 개선하는 방식입니다. 도시 재생의 가장 큰 장점은 지역 주민들이 직접 참여하여 공동체를 유지할 수 있다는 점입니다. 또한 오래된 골목을 리모델링하여 문화 공간으로 활용함으로써 지역 경제를 활성화하고 관광객을 유치하는 효과도 얻을 수 있습니다. 하지만 사업 추진 과정에서 주민 간의 의견 조율이 어렵다는 단점이 있습니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q5-1",
        question: "도시 재생과 재개발의 차이점은 무엇입니까?",
        options: [
          "도시 재생은 건물을 모두 허물고 새로 짓는 것이다.",
          "재개발은 지역의 정체성을 유지하는 방식이다.",
          "도시 재생은 기존의 특성을 유지하며 환경을 개선하는 것이다.",
          "재개발은 주민들의 참여가 더 활발하다."
        ],
        correctAnswer: 2,
        explanation: "The text defines urban regeneration as maintaining identity instead of completely demolishing (redevelopment).",
        tags: ["Comparison", "Urban Planning"],
      },
      {
        id: "q5-2",
        question: "도시 재생의 단점으로 언급된 것은 무엇입니까?",
        options: [
          "지역 경제 활성화가 되지 않는다.",
          "관광객 유치가 불가능하다.",
          "주민들이 모두 찬성한다.",
          "주민 간의 의견 조율이 어렵다."
        ],
        correctAnswer: 3,
        explanation: "The text states \"하지만 사업 추진 과정에서 주민 간의 의견 조율이 어렵다는 단점이 있습니다.\"",
        tags: ["Detail", "Urban Planning"],
      }
    ]
  },
  {
    id: "reading-6",
    level: 5,
    title: "경제적 불평등과 사회적 갈등 (Economic Inequality and Social Conflict)",
    content: `현대 사회에서 소득 불평등의 심화는 단순한 경제적 문제를 넘어 사회적 갈등으로 이어지고 있습니다. 부의 편중은 교육의 기회 불평등을 야기하고, 이는 다시 계층 이동의 사다리를 없애는 결과를 초래합니다. 특히 청년 세대에서 느끼는 상대적 박탈감은 사회적 신뢰를 무너뜨리고 공동체 의식을 약화시킵니다. 이를 해결하기 위해서는 조세 제도의 개편을 통한 재분배 기능 강화와 사회적 안전망 구축이 시급합니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q6-1",
        question: "부의 편중이 사회에 미치는 영향으로 적절하지 않은 것은?",
        options: [
          "교육 기회의 불평등 야기",
          "계층 이동의 어려움 초래",
          "사회적 신뢰의 붕괴",
          "공동체 의식의 강화"
        ],
        correctAnswer: 3,
        explanation: "The text says it \"무너뜨리고\" (breaks down) social trust and weakens community spirit, not strengthens it.",
        tags: ["Analysis", "Economy"],
      },
      {
        id: "q6-2",
        question: "필자가 제시하는 해결 방안은 무엇입니까?",
        options: [
          "개인의 노력으로 부를 축적하는 것",
          "조세 제도 개편 및 사회적 안전망 구축",
          "계층 이동의 사다리를 없애는 것",
          "경제 성장만을 최우선으로 하는 것"
        ],
        correctAnswer: 1,
        explanation: "The text suggests \"조세 제도의 개편을 통한 재분배 기능 강화와 사회적 안전망 구축이 시급합니다.\"",
        tags: ["Solution", "Economy"],
      }
    ]
  },
  {
    id: "reading-7",
    level: 3,
    title: "도서관 이용 규칙 (Library Rules)",
    content: `우리 도서관은 매주 월요일에 휴관합니다. 도서는 1인당 최대 5권까지 2주 동안 대출할 수 있습니다. 대출 기간이 지나면 연체료가 발생하므로 주의하시기 바랍니다. 도서관 내에서는 정숙해야 하며, 음식물 반입은 금지되어 있습니다. 책을 읽은 후에는 반드시 서류함 옆 정리함에 넣어주시기 바랍니다.`,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "q7-1",
        question: "도서관을 이용할 수 없는 날은 언제입니까?",
        options: [
          "매주 화요일",
          "매주 수요일",
          "매주 월요일",
          "매주 일요일"
        ],
        correctAnswer: 2,
        explanation: "The text states \"우리 도서관은 매주 월요일에 휴관합니다.\"",
        tags: ["Detail", "Practical"],
      },
      {
        id: "q7-2",
        question: "책을 반납할 때 주의해야 할 점은 무엇입니까?",
        options: [
          "음식물을 함께 제출해야 한다.",
          "대출 기간이 지나면 연체료가 나온다.",
          "책을 무작정 서가에 꽂아야 한다.",
          "한 번에 10권까지 반납해야 한다."
        ],
        correctAnswer: 1,
        explanation: "The text says \"대출 기간이 지나면 연체료가 발생하므로 주의하시기 바랍니다.\"",
        tags: ["Detail", "Practical"],
      }
    ]
  },
  {
    id: "reading-8",
    level: 4,
    title: "미세먼지와 건강 (Fine Dust and Health)",
    content: `최근 몇 년 사이 미세먼지 농도가 높아지면서 호흡기 질환을 호소하는 사람들이 늘고 있습니다. 미세먼지는 입자가 매우 작아 폐 깊숙이 침투하여 혈관으로 직접 들어가 심혈관 질환의 원인이 되기도 합니다. 특히 노약자와 어린이는 미세먼지에 더 취약하므로 각별히 주의해야 합니다. 미세먼지 주의보가 발령된 날에는 외출을 자제하고, 외출 시에는 반드시 인증된 보건 마스크를 착용하고, 귀가 후에는 손과 발을 깨끗이 씻는 것이 중요합니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q8-1",
        question: "미세먼지가 위험한 이유는 무엇입니까?",
        options: [
          "입자가 너무 커서 코에서 걸러지기 때문에",
          "폐 깊숙이 침투하여 혈관까지 들어갈 수 있기 때문에",
          "마스크를 쓰면 숨을 쉴 수 없게 만들기 때문에",
          "외출을 아예 못 하게 만들기 때문에"
        ],
        correctAnswer: 1,
        explanation: "The text explains that fine dust is very small and can penetrate deep into lungs and blood vessels.",
        tags: ["Detail", "Health"],
      },
      {
        id: "q8-2",
        question: "미세먼지 주의보가 내린 날 어떻게 해야 합니까?",
        options: [
          "운동을 위해 야외 활동을 늘린다.",
          "외출을 자제하고 보건 마스크를 착용한다.",
          "마스크 없이 빠르게 외출한다.",
          "창문을 모두 열어 환기를 시킨다."
        ],
        correctAnswer: 1,
        explanation: "The text recommends avoiding outings and wearing certified health masks.",
        tags: ["Detail", "Health"],
      }
    ]
  },
  {
    id: "reading-9",
    level: 5,
    title: "디지털 격차와 정보 불평등 (Digital Divide and Information Inequality)",
    content: `디지털 기술의 급격한 발전은 사회의 효율성을 높였지만, 동시에 디지털 기기 활용 능력에 따른 정보 격차, 즉 디지털 디바이드(Digital Divide) 문제를 야기했습니다. 고령층이나 저소득층은 디지털 서비스 접근이 어려워 금융, 의료, 행정 서비스 이용에서 소외되는 현상이 나타나고 있습니다. 이러한 정보 불평등은 단순한 불편함을 넘어 경제적, 사회적 기회의 차이로 이어지며 사회적 소외를 심화시킵니다. 따라서 국가 차원의 디지털 리터러시 교육 확대와 보편적 접근성 보장이 필요합니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q9-1",
        question: "디지털 디바이드가 초래하는 결과로 가장 적절한 것은?",
        options: [
          "모든 사람이 동일한 정보에 접근하게 된다.",
          "고령층의 디지털 기기 사용 능력이 향상된다.",
          "특정 계층이 사회적 서비스 이용에서 소외된다.",
          "디지털 서비스의 비용이 낮아진다."
        ],
        correctAnswer: 2,
        explanation: "The text states that elderly and low-income groups are marginalized from financial, medical, and administrative services.",
        tags: ["Analysis", "Society"],
      },
      {
        id: "q9-2",
        question: "필자가 제시하는 해결 방안은 무엇입니까?",
        options: [
          "디지털 기기 생산을 중단하는 것",
          "디지털 리터러시 교육 확대와 접근성 보장",
          "오프라인 서비스만을 이용하는 것",
          "스마트폰 사용을 금지하는 것"
        ],
        correctAnswer: 1,
        explanation: "The text suggests \"국가 차원의 디지털 리터러시 교육 확대와 보편적 접근성 보장이 필요합니다.\"",
        tags: ["Solution", "Society"],
      }
    ]
  },
  {
    id: "reading-10",
    level: 3,
    title: "박물관 관람 안내 (Museum Visiting Guide)",
    content: `국립 박물관은 오전 10시부터 오후 6시까지 운영합니다. 관람료는 성인 5,000원, 청소년 3,000이며 만 65세 이상 어르신은 무료입니다. 전시실 내에서는 사진 촬영이 가능하지만 플래시 사용은 금지되어 있습니다. 작품을 눈으로만 감상하시고 절대도 만지지 마십시오. 오디오 가이드는 입구에서 대여하실 수 있습니다.`,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "q10-1",
        question: "박물관 관람 시 금지되는 행동은 무엇입니까?",
        options: [
          "오디오 가이드 대여",
          "사진 촬영",
          "플래시 사용 및 작품 접촉",
          "오전 10시 입장"
        ],
        correctAnswer: 2,
        explanation: "The text explicitly forbids flash photography and touching artworks.",
        tags: ["Detail", "Practical"],
      },
      {
        id: "q10-2",
        question: "누가 무료로 관람할 수 있습니까?",
        options: [
          "모든 성인",
          "만 65세 이상 어르신",
          "모든 청소년",
          "오디오 가이드 대여객"
        ],
        correctAnswer: 1,
        explanation: "The text says \"만 65세 이상 어르신은 무료입니다.\"",
        tags: ["Detail", "Practical"],
      }
    ]
  },
  {
    id: "reading-11",
    level: 3,
    title: "헬스클럽 오픈 이벤트 (Fitness Center Promo)",
    content: `안녕하세요! 우리 동네에 '건강 라이프 헬스클럽'이 새롭게 문을 열었습니다. 오픈 기념으로 선착순 50분께 회원권 30% 할인 혜택을 드립니다. 요가, 필라테스, 웨이트 트레이닝 등 다양한 프로그램을 운영하고 있습니다. 운영 시간은 오전 6시부터 오후 11시까지이며, 강남역 4번 출구 바로 앞에 위치해 있습니다. 지금 바로 등록하세요!`,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "q11-1",
        question: "이 광고의 목적으로 가장 적절한 것은?",
        options: [
          "헬스클럽의 폐업을 알리기 위해",
          "새로 오픈한 헬스클럽을 홍보하기 위해",
          "요가 수업의 장점을 설명하기 위해",
          "강남역의 위치를 안내하기 위해"
        ],
        correctAnswer: 1,
        explanation: "The ad is announcing the opening of a new gym and offering a discount to attract members.",
        tags: ["Purpose", "Practical"],
      },
      {
        id: "q11-2",
        question: "할인 혜택을 받을 수 있는 조건은 무엇입니까?",
        options: [
          "강남역 근처에 거주해야 한다.",
          "선착순 50명 안에 들어야 한다.",
          "요가 프로그램을 신청해야 한다.",
          "오전 6시에 방문해야 한다."
        ],
        correctAnswer: 1,
        explanation: "The text states \"선착순 50분께 회원권 30% 할인 혜택을 드립니다.\"",
        tags: ["Detail", "Practical"],
      }
    ]
  },
  {
    id: "reading-12",
    level: 3,
    title: "제주도 여행 후기 (Traveling to Jeju)",
    content: `지난주에 친구들과 함께 제주도에 다녀왔습니다. 날씨가 정말 좋았고 바다가 아주 푸르렀습니다. 특히 성산 일출봉에 올라가서 본 풍경은 평생 잊지 못할 것 같습니다. 제주도에서 먹은 흑돼지 구이도 정말 맛있었습니다. 다음에는 가족들과 함께 다시 방문하고 싶습니다.`,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "q12-1",
        question: "글쓴이가 제주도에서 가장 기억에 남는 것은 무엇입니까?",
        options: [
          "친구들과의 다툼",
          "성산 일출봉에서 본 풍경",
          "제주도의 나쁜 날씨",
          "비행기 표 가격"
        ],
        correctAnswer: 1,
        explanation: "The author mentions that the scenery from Seongsan Ilchulbong is unforgettable.",
        tags: ["Detail", "Experience"],
      },
      {
        id: "q12-2",
        question: "글쓴이는 제주도에서 무엇을 먹었습니까?",
        options: [
          "해산물 찌개",
          "흑돼지 구이",
          "전복 죽",
          "귤 주스"
        ],
        correctAnswer: 1,
        explanation: "The text explicitly mentions eating '흑돼지 구이' (black pork).",
        tags: ["Detail", "Experience"],
      }
    ]
  },
  {
    id: "reading-13",
    level: 4,
    title: "도심 항공 모빌리티의 시대 (Urban Air Mobility)",
    content: `한국 정부는 도심 항공 모빌리티(UAM)의 상용화를 앞당기기 위해 노력하고 있습니다. UAM은 전기 수직 이착륙(eVTOL) 항공기를 이용해 도심의 교통 정체를 해결하려는 새로운 교통 체계입니다. 이를 위해 주요 도심 거점에 '버티포트'라는 이착륙장을 구축할 계획입니다. UAM이 도입되면 기존의 도로 교통보다 이동 시간이 획기적으로 단축되어 도시 생활의 질이 높아질 것으로 기대됩니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q13-1",
        question: "UAM의 주요 목적은 무엇입니까?",
        options: [
          "항공기 제조 기술을 수출하는 것",
          "도심의 교통 정체를 해결하는 것",
          "외국인 관광객을 유치하는 것",
          "전기차 보급을 확대하는 것"
        ],
        correctAnswer: 1,
        explanation: "The text states that UAM aims to solve urban traffic congestion.",
        tags: ["Main Idea", "Technology"],
      },
      {
        id: "q13-2",
        question: "UAM 체계에서 '버티포트'란 무엇입니까?",
        options: [
          "전기 항공기의 배터리",
          "항공기 조종사의 훈련소",
          "항공기의 이착륙장",
          "교통 관제 센터"
        ],
        correctAnswer: 2,
        explanation: "The text describes vertiports as '이착륙장' (take-off and landing sites).",
        tags: ["Vocabulary", "Technology"],
      }
    ]
  },
  {
    id: "reading-14",
    level: 4,
    title: "투명 페트병 분리배출 정책 (New Recycling Policy)",
    content: `다음 달부터 시청에서는 투명 페트병 분리배출 정책을 더욱 강화합니다. 주민들은 투명 페트병을 버릴 때 반드시 내용물을 비우고 라벨을 제거한 뒤 압착하여 전용 수거함에 버려야 합니다. 만약 이를 어기고 일반 쓰레기와 함께 버리거나 라벨을 제거하지 않은 경우, 최대 10만 원의 과태료가 부과될 수 있습니다. 이는 고품질 재생 원료를 확보하여 환경 오염을 줄이기 위한 조치입니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q14-1",
        question: "투명 페트병을 버릴 때 지켜야 할 방법으로 적절한 것은?",
        options: [
          "라벨을 그대로 붙여서 버린다.",
          "내용물을 조금 남겨서 버린다.",
          "라벨을 제거하고 압착하여 전용 수거함에 버린다.",
          "일반 쓰레기통에 함께 버린다."
        ],
        correctAnswer: 2,
        explanation: "The text requires residents to empty contents, remove labels, and compress the bottles.",
        tags: ["Detail", "Environment"],
      },
      {
        id: "q14-2",
        question: "이 정책을 시행하는 근본적인 이유는 무엇입니까?",
        options: [
          "과태료 수입을 늘리기 위해",
          "고품질 재생 원료를 확보하고 환경 오염을 줄이기 위해",
          "수거함의 개수를 줄이기 위해",
          "주민들의 분리배출 습관을 없애기 위해"
        ],
        correctAnswer: 1,
        explanation: "The text states the goal is to obtain high-quality recycled raw materials and reduce pollution.",
        tags: ["Inference", "Environment"],
      }
    ]
  },
  {
    id: "reading-15",
    level: 5,
    title: "소비 심리와 정체성 구축 (The Psychology of Consumption)",
    content: `현대 사회에서 소비는 단순히 필요한 물건을 구입하는 행위를 넘어, 자신의 정체성을 구축하고 표현하는 수단이 되었습니다. 경제학자 베블런이 제시한 '과시적 소비' 개념은 사람들이 자신의 사회적 지위를 드러내기 위해 고가의 사치품을 구매하는 경향을 설명합니다. 특히 SNS의 발달은 타인에게 자신의 삶을 전시하려는 욕구를 자극하여 이러한 과시적 소비 현상을 더욱 가속화하고 있습니다. 결국 현대인은 물건의 실용성보다는 그 물건이 주는 상징적 가치에 더 큰 의미를 두는 경향이 있습니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q15-1",
        question: "현대 사회의 소비 특성으로 가장 적절한 것은?",
        options: [
          "실용적인 가치를 최우선으로 한다.",
          "자신의 정체성을 표현하는 수단으로 활용된다.",
          "필요한 물건만을 최소한으로 구매한다.",
          "사회적 지위와는 아무런 관련이 없다."
        ],
        correctAnswer: 1,
        explanation: "The text states that consumption has become a means of constructing and expressing identity.",
        tags: ["Main Idea", "Psychology"],
      },
      {
        id: "q15-2",
        question: "SNS가 과시적 소비에 미치는 영향은 무엇입니까?",
        options: [
          "물건의 실용성을 더 따지게 만든다.",
          "타인에게 자신의 삶을 전시하려는 욕구를 자극한다.",
          "사치품 구매를 억제하는 역할을 한다.",
          "베블런의 이론을 부정하게 만든다."
        ],
        correctAnswer: 1,
        explanation: "The text mentions that SNS stimulates the desire to display one's life to others, accelerating conspicuous consumption.",
        tags: ["Analysis", "Society"],
      }
    ]
  },
  {
    id: "reading-16",
    level: 5,
    title: "도시화와 생물 다양성 (Impact of Urbanization on Biodiversity)",
    content: `급격한 도시화는 자연 서식지를 파괴하고 파편화함으로써 도시 내 생물 다양성을 심각하게 위협합니다. 서식지가 조각나면 생물들은 고립되어 이동이 제한되고, 이는 결국 유전적 다양성 감소와 멸종으로 이어질 수 있습니다. 이를 해결하기 위해 최근 '생태 통로' 또는 '그린 코리더' 구축의 중요성이 강조되고 있습니다. 생태 통로는 단절된 녹지 축을 연결하여 야생 동물이 안전하게 이동할 수 있게 함으로써 생태계의 건강성을 회복시키는 역할을 합니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q16-1",
        question: "도시화가 생물 다양성에 위협이 되는 이유는 무엇입니까?",
        options: [
          "도시 내 녹지가 너무 많아지기 때문에",
          "서식지가 파괴되고 파편화되어 생물이 고립되기 때문에",
          "생물들의 이동 속도가 너무 빨라지기 때문에",
          "유전적 다양성이 갑자기 증가하기 때문에"
        ],
        correctAnswer: 1,
        explanation: "The text explains that urbanization destroys and fragments habitats, leading to isolation and potential extinction.",
        tags: ["Cause-Effect", "Science"],
      },
      {
        id: "q16-2",
        question: "'생태 통로'의 역할로 가장 적절한 것은?",
        options: [
          "도시의 도로를 더 넓히는 것",
          "단절된 녹지 축을 연결하여 생물의 이동을 돕는 것",
          "야생 동물을 도시 밖으로 완전히 쫓아내는 것",
          "인공 건축물을 더 많이 짓는 것"
        ],
        correctAnswer: 1,
        explanation: "The text describes ecological corridors as connecting severed green axes to allow safe movement of wildlife.",
        tags: ["Detail", "Science"],
      }
    ]
  },
  {
    id: "reading-17",
    level: 6,
    title: "현대성 속의 침묵 (The Meaning of Silence in Modernity)",
    content: `끊임없는 연결이 강요되는 초연결 시대에 침묵은 이제 하나의 사치품이 되었습니다. 하지만 진정한 침묵이란 단순히 소리가 없는 상태가 아니라, 외부의 자극으로부터 벗어나 자신의 내면에 집중하는 정신적 상태를 의미합니다. 우리는 소음으로 가득 찬 세상 속에서 잠시 멈추어 침묵의 시간을 가질 때 비로소 타인의 시선이 아닌 자신의 진실한 모습과 마주할 수 있습니다. 결국 침묵은 상실이 아니라, 존재의 본질을 회복하기 위한 가장 적극적인 행위인 것입니다.`,
    timeLimitMinutes: 15,
    questions: [
      {
        id: "q17-1",
        question: "필자가 정의하는 '진정한 침묵'이란 무엇입니까?",
        options: [
          "아무런 소리도 들리지 않는 물리적 정적",
          "타인과의 대화를 완전히 중단하는 것",
          "외부 자극에서 벗어나 내면에 집중하는 정신적 상태",
          "사회적 관계로부터 완전히 고립되는 것"
        ],
        correctAnswer: 2,
        explanation: "The author defines true silence not as the absence of sound, but as a mental state of focusing on one's inner self.",
        tags: ["Definition", "Philosophy"],
      },
      {
        id: "q17-2",
        question: "침묵의 시간을 갖는 것이 주는 이점은 무엇입니까?",
        options: [
          "타인의 시선을 더 잘 의식하게 된다.",
          "자신의 진실한 모습과 마주하고 존재의 본질을 회복한다.",
          "더 많은 정보를 빠르게 습득할 수 있다.",
          "사회적 성공을 위한 전략을 짤 수 있다."
        ],
        correctAnswer: 1,
        explanation: "The text suggests that silence allows individuals to face their true selves and recover the essence of their existence.",
        tags: ["Inference", "Philosophy"],
      }
    ]
  },
  {
    id: "reading-18",
    level: 6,
    title: "언어의 진화와 시대적 반영 (The Evolution of Language)",
    content: `언어는 고정된 틀이 아니라, 그것을 사용하는 사람들의 의식과 시대적 상황에 따라 끊임없이 변화하는 유기체와 같습니다. 최근 디지털 환경에서 등장한 신조어나 줄임말을 언어 파괴라고 비판하는 시각이 많지만, 이는 오히려 현대인의 가속화된 소통 속도와 효율성에 대한 욕구가 반영된 결과라고 보아야 합니다. 언어의 변화는 단순한 퇴보가 아니라, 새로운 시대의 가치관과 문화를 담아내기 위한 적응 과정이며, 이러한 역동성이야말로 언어가 생명력을 유지하는 핵심입니다.`,
    timeLimitMinutes: 15,
    questions: [
      {
        id: "q18-1",
        question: "필자는 언어의 본질을 무엇이라고 보는가?",
        options: [
          "절대로 변해서는 안 되는 고정된 규칙",
          "시대와 의식에 따라 변화하는 유기체",
          "문법적 정확성이 가장 중요한 도구",
          "단순히 정보를 전달하는 기계적 수단"
        ],
        correctAnswer: 1,
        explanation: "The author views language as an organism that constantly changes according to consciousness and era.",
        tags: ["Perspective", "Linguistics"],
      },
      {
        id: "q18-2",
        question: "디지털 신조어의 출현을 어떻게 해석하고 있는가?",
        options: [
          "언어의 품격을 떨어뜨리는 파괴 행위이다.",
          "교육 수준의 저하로 인한 결과이다.",
          "소통 속도와 효율성에 대한 욕구가 반영된 적응 과정이다.",
          "일시적인 유행일 뿐 아무런 의미가 없다."
        ],
        correctAnswer: 2,
        explanation: "The author argues that digital slang is a reflection of the speed of modern communication and a process of adaptation.",
        tags: ["Analysis", "Linguistics"],
      }
    ]
  },
  {
    id: "reading-19",
    level: 4,
    title: "비즈니스 한국어 과정 안내 (Professional Language Course)",
    content: `전문적인 비즈니스 한국어 능력을 키우고 싶은 분들을 위해 '실무 한국어 마스터 과정'을 개설합니다. 본 과정에서는 격식 있는 이메일 작성법부터 전문적인 프레젠테이션 스킬까지 실무에 즉시 적용 가능한 핵심 내용을 다룹니다. 총 8주간 진행되는 집중 프로그램으로, 수료 후에는 공인 수료증이 발급됩니다. 얼리버드 등록 기간은 7월 1일까지이며, 이 기간 내 등록 시 수강료 10% 할인 혜택을 드립니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q19-1",
        question: "이 과정에서 배울 수 있는 내용은 무엇입니까?",
        options: [
          "한국의 전통 문화와 역사",
          "격식 있는 이메일 작성 및 프레젠테이션 스킬",
          "한국어 기초 문법과 발음",
          "한국 여행을 위한 필수 회화"
        ],
        correctAnswer: 1,
        explanation: "The ad mentions formal email writing and professional presentation skills.",
        tags: ["Detail", "Practical"],
      },
      {
        id: "q19-2",
        question: "수강료 할인을 받기 위한 조건은 무엇입니까?",
        options: [
          "한국어 능력 시험 4급 이상이어야 한다.",
          "7월 1일까지 얼리버드 등록을 해야 한다.",
          "8주 과정을 모두 수료해야 한다.",
          "수료증을 이미 가지고 있어야 한다."
        ],
        correctAnswer: 1,
        explanation: "The text says early bird registration ends July 1st and offers a 10% discount.",
        tags: ["Detail", "Practical"],
      }
    ]
  },
  {
    id: "reading-20",
    level: 4,
    title: "독서의 즐거움과 가치 (The Joy of Reading Books)",
    content: `책을 읽는다는 것은 내가 직접 가보지 못한 세상과 만나고, 내가 되어보지 못한 타인의 삶을 간접적으로 경험하는 일입니다. 숏폼 콘텐츠가 주류가 된 시대에, 한 권의 책을 끝까지 읽기 위해 필요한 깊은 몰입과 집중력은 일종의 정신적 저항과도 같습니다. 이러한 느린 읽기의 과정은 단순히 정보를 얻는 것을 넘어, 타인에 대한 공감 능력을 확장하고 세상을 바라보는 관점을 넓혀줍니다. 결국 독서는 나를 둘러싼 좁은 세계를 깨고 더 넓은 세계로 나아가는 가장 정적인 여행입니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q20-1",
        question: "필자가 말하는 독서의 가장 큰 가치는 무엇입니까?",
        options: [
          "최신 정보를 빠르게 습득하는 것",
          "타인의 삶을 경험하며 공감 능력과 관점을 넓히는 것",
          "숏폼 콘텐츠를 더 잘 이해하게 되는 것",
          "정적인 취미를 통해 휴식을 취하는 것"
        ],
        correctAnswer: 1,
        explanation: "The author emphasizes expanding empathy and broadening perspectives through experiencing others' lives.",
        tags: ["Main Idea", "Culture"],
      },
      {
        id: "q20-2",
        question: "글쓴이는 '느린 읽기'를 무엇에 비유하고 있습니까?",
        options: [
          "지루한 시간 낭비",
          "정신적 저항",
          "빠른 정보 습득의 수단",
          "사치스러운 취미"
        ],
        correctAnswer: 1,
        explanation: "The text describes the deep concentration required for a book as a 'form of mental resistance' (정신적 저항).",
        tags: ["Analysis", "Culture"],
      }
    ]
  }
];
