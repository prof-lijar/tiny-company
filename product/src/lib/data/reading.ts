import { ReadingPassage } from '@/lib/types';

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: "reading-1",
    level: 3,
    title: "한국의 전통 음식 (Traditional Korean Food)",
    content: `한국 사람들은 예전부터 김치를 매우 중요하게 생각했습니다. 김치는 배추나 무 같은 채소를 소금에 절여 고춧가루, 마늘, 생강 등을 넣어 만드는 음식입니다. 김치에는 비타민과 무기질이 많아서 건강에 매우 좋다고 합니다. 요즘은 외국 사람들도 김치의 맛과 건강 효능에 관심을 가지고 많이 먹기 시작했습니다. 특히 매운 맛을 좋아하는 사람들이 김치를 선호합니다.`,
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
          "외국 사람들이 좋아하기 때문에"
        ],
        correctAnswer: 2,
        explanation: "The text explicitly states \"김치에는 비타민과 무기질이 많아서 건강에 매우 좋다고 합니다\".",
        tags: ["Detail", "Health"],
      }
    ]
  },
  {
    id: "reading-2",
    level: 4,
    title: "현대 사회의 소통 문제 (Communication Problems in Modern Society)",
    content: `현대 사회에서는 스마트폰의 보급으로 인해 언제 어디서나 쉽게 소통할 수 있게 되었습니다. 하지만 역설적으로 사람들은 더 외롭다고 말합니다. 온라인상의 관계는 아주 빠르게 맺어지지만 깊이가 부족하기 때문입니다. 진정한 소통은 단순히 정보를 주고받는 것이 아니라 서로의 감정을 공유하고 공감하는 과정입니다. 따라서 우리는 디지털 기기 사용을 줄이고 직접 얼굴을 마주 보는 시간을 늘려야 합니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q2-1",
        question: "필자가 생각하는 진정한 소통이란 무엇입니까?",
        options: [
          "정보를 빠르게 주고받는 것",
          "스마트폰을 통해 연결되는 것",
          "서로의 감정을 공유하고 공감하는 것",
          "많은 사람과 관계를 맺는 것"
        ],
        correctAnswer: 2,
        explanation: "The text states \"진정한 소통은 단순히 정보를 주고받는 것이 아니라 서로의 감정을 공유하고 공감하는 과정입니다\".",
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
        explanation: "The text mentions \"온라인상의 관계는 아주 빠르게 맺어지지만 깊이가 부족하기 때문입니다\".",
        tags: ["Inference", "Society"],
      }
    ]
  },
  {
    id: "reading-3",
    level: 5,
    title: "인공지능과 예술의 경계 (The Boundary Between AI and Art)",
    content: `최근 인공지능이 생성한 그림이나 음악이 예술 작품으로 인정받으며 큰 논란이 되고 있습니다. 인공지능은 방대한 데이터를 학습하여 인간이 만든 스타일을 완벽하게 재현할 수 있습니다. 하지만 예술의 본질이 인간의 고유한 경험과 감정, 그리고 이를 표현하려는 의지에 있다면 인공지능의 결과물은 단지 정교한 계산의 산물일 뿐입니다. 예술은 단순히 결과물의 완성도가 아니라 그 작품이 만들어지기까지의 고뇌와 철학이 담겨야 하기 때문입니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q3-1",
        question: "필자는 인공지능의 예술 활동에 대해 어떤 관점을 가지고 있습니까?",
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
          "오전 8시 ~ 오후 12시",
          "오후 2시 ~ 오후 6시",
          "오후 10시 ~ 새벽 2시",
          "새벽 4시 ~ 오전 8시"
        ],
        correctAnswer: 2,
        explanation: "The text says \"특히 밤 10시부터 새벽 2시까지는 1+1 행사 상품이 많으니...\".",
        tags: ["Detail", "Practical"],
      }
    ]
  },
  {
    id: "reading-5",
    level: 4,
    title: "도시 재생과 지역 사회 (Urban Regeneration and Local Community)",
    content: `도시 재생이란 낡은 도시를 완전히 허물고 새로 짓는 재개발과 달리, 기존의 정체성을 유지하면서 환경을 개선하는 방식입니다. 도시 재생의 가장 큰 장점은 지역 주민들이 계속해서 거주하며 공동체를 유지할 수 있다는 점입니다. 또한 오래된 건물을 리모델링하여 문화 공간으로 활용함으로써 지역 경제를 활성화하고 관광객을 유치하는 효과도 거둘 수 있습니다. 하지만 사업 속도가 느리고 주민 간의 의견 조율이 어렵다는 단점이 있습니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q5-1",
        question: "도시 재생과 재개발의 차이점은 무엇입니까?",
        options: [
          "도시 재생은 건물을 모두 허물고 새로 짓는 것이다.",
          "재개발은 기존의 정체성을 유지하는 방식이다.",
          "도시 재생은 기존 정체성을 유지하며 환경을 개선하는 것이다.",
          "재개발은 주민 공동체를 유지하는 데 더 유리하다."
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
          "주민들이 모두 떠나게 된다.",
          "의견 조율이 어렵고 속도가 느리다."
        ],
        correctAnswer: 3,
        explanation: "The text states \"하지만 사업 속도가 느리고 주민 간의 의견 조율이 어렵다는 단점이 있습니다\".",
        tags: ["Detail", "Urban Planning"],
      }
    ]
  },
  {
    id: "reading-6",
    level: 5,
    title: "경제적 불평등과 사회적 갈등 (Economic Inequality and Social Conflict)",
    content: `현대 사회에서 소득 불평등의 심화는 단순한 경제적 문제를 넘어 심각한 사회적 갈등으로 이어지고 있습니다. 부의 편중은 교육의 기회 불평등을 야기하고, 이는 다시 계층 이동의 사다리를 걷어차는 결과를 초래합니다. 특히 청년 세대에서 느끼는 상대적 박탈감은 사회적 신뢰를 무너뜨리고 공동체 의식을 약화시킵니다. 이를 해결하기 위해서는 조세 제도의 개편을 통한 재분배 기능 강화와 더불어, 실질적인 기회 균등을 보장하는 사회적 안전망 구축이 시급합니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q6-1",
        question: "부의 편중이 사회에 미치는 영향으로 적절하지 않은 것은?",
        options: [
          "교육 기회의 불평등 초래",
          "계층 이동의 어려움 증가",
          "청년 세대의 상대적 박탈감 심화",
          "사회적 신뢰의 급격한 상승"
        ],
        correctAnswer: 3,
        explanation: "The text says it \"무너뜨리고\" (breaks down) social trust, not increases it.",
        tags: ["Analysis", "Economy"],
      },
      {
        id: "q6-2",
        question: "필자가 제시하는 해결 방안은 무엇입니까?",
        options: [
          "개인의 노력만으로 극복하는 것",
          "조세 제도 개편 및 사회적 안전망 구축",
          "계층 이동 사다리를 완전히 없애는 것",
          "경제 성장에만 집중하여 부를 늘리는 것"
        ],
        correctAnswer: 1,
        explanation: "The text suggests \"조세 제도의 개편을 통한 재분배 기능 강화와 더불어... 사회적 안전망 구축이 시급합니다\".",
        tags: ["Solution", "Economy"],
      }
    ]
  },
  {
    id: "reading-7",
    level: 3,
    title: "도서관 이용 규칙 (Library Rules)",
    content: `우리 도서관은 매주 월요일에 휴관합니다. 도서는 1인당 최대 5권까지 2주 동안 대출할 수 있습니다. 대출 기간이 지나면 연체료가 발생하므로 주의하시기 바랍니다. 도서관 내에서는 정숙해야 하며, 음식물 반입은 금지되어 있습니다. 책을 읽은 후에는 반드시 원래 있던 자리에 꽂아주시기 바랍니다.`,
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
        explanation: "The text states \"우리 도서관은 매주 월요일에 휴관합니다\".",
        tags: ["Detail", "Practical"],
      },
      {
        id: "q7-2",
        question: "책을 빌릴 때 주의해야 할 점은 무엇입니까?",
        options: [
          "음식물을 가지고 들어와야 한다.",
          "대출 기간이 지나면 연체료가 나온다.",
          "책을 무작정 아무 데나 둔다.",
          "한 번에 10권까지 빌릴 수 있다."
        ],
        correctAnswer: 1,
        explanation: "The text says \"대출 기간이 지나면 연체료가 발생하므로 주의하시기 바랍니다\".",
        tags: ["Detail", "Practical"],
      }
    ]
  },
  {
    id: "reading-8",
    level: 4,
    title: "미세먼지와 건강 (Fine Dust and Health)",
    content: `최근 몇 년 사이 미세먼지 농도가 높아지면서 호흡기 질환을 호소하는 사람들이 늘고 있습니다. 미세먼지는 입자가 매우 작아 폐 깊숙이 침투하며 혈관까지 들어갈 수 있어 심혈관 질환의 원인이 되기도 합니다. 특히 노약자와 어린이는 미세먼지에 더 취약하므로 고농도 미세먼지 주의보가 발령된 날에는 외출을 자제해야 합니다. 외출 시에는 반드시 인증된 보건 마스크를 착용하고, 귀가 후에는 손과 발을 깨끗이 씻는 것이 중요합니다.`,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q8-1",
        question: "미세먼지가 위험한 이유는 무엇입니까?",
        options: [
          "입자가 커서 코에서 걸러지기 때문에",
          "폐 깊숙이 침투하고 혈관까지 들어갈 수 있기 때문에",
          "마스크를 쓰면 숨을 쉴 수 없게 하기 때문에",
          "외출을 못 하게 만들기 때문에"
        ],
        correctAnswer: 1,
        explanation: "The text explains that fine dust is very small and can penetrate deep into lungs and blood vessels.",
        tags: ["Detail", "Health"],
      },
      {
        id: "q8-2",
        question: "미세먼지 주의보가 내린 날 권장되는 행동은 무엇입니까?",
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
    content: `디지털 기술의 급격한 발전은 삶의 편의성을 높였지만, 동시에 디지털 기기 활용 능력에 따른 정보 격차, 즉 디지털 디바이드(Digital Divide) 문제를 야기했습니다. 고령층이나 저소득층은 디지털 서비스 접근성이 낮아 금융, 의료, 행정 서비스 이용에서 소외되는 현상이 나타나고 있습니다. 이러한 정보 불평등은 단순한 불편함을 넘어 경제적, 사회적 기회의 차이로 이어지며 사회적 소외를 심화시킵니다. 따라서 국가 차원의 디지털 리터러시 교육 확대와 보편적 접근성 보장이 필요합니다.`,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q9-1",
        question: "디지털 디바이드가 초래하는 결과로 가장 적절한 것은?",
        options: [
          "모든 사람이 동일한 정보에 접근하게 된다.",
          "고령층의 디지털 기기 사용 능력이 급격히 향상된다.",
          "특정 계층이 사회적 서비스 이용에서 소외된다.",
          "디지털 서비스의 비용이 낮아진다."
        ],
        correctAnswer: 2,
        explanation: "The text states that elderly and low-income groups are marginalized from financial, medical, and administrative services.",
        tags: ["Analysis", "Society"],
      },
      {
        id: "q9-2",
        question: "필자가 제시하는 해결책은 무엇입니까?",
        options: [
          "디지털 기기 생산을 중단하는 것",
          "디지털 리터러시 교육 확대와 접근성 보장",
          "오프라인 서비스만 이용하도록 강제하는 것",
          "고령층의 스마트폰 사용을 금지하는 것"
        ],
        correctAnswer: 1,
        explanation: "The text suggests \"국가 차원의 디지털 리터러시 교육 확대와 보편적 접근성 보장이 필요합니다\".",
        tags: ["Solution", "Society"],
      }
    ]
  },
  {
    id: "reading-10",
    level: 3,
    title: "박물관 관람 안내 (Museum Visiting Guide)",
    content: `국립 박물관은 오전 10시부터 오후 6시까지 운영합니다. 관람료는 성인 5,000원, 청소년 3,000원이며 만 65세 이상 어르신은 무료입니다. 전시실 내에서는 사진 촬영이 가능하지만 플래시 사용은 금지되어 있습니다. 작품을 손으로 만지는 행위는 엄격히 금지되니 협조 부탁드립니다. 오디오 가이드는 입구에서 대여하실 수 있습니다.`,
    timeLimitMinutes: 5,
    questions: [
      {
        id: "q10-1",
        question: "박물관 관람 시 금지되는 행동은 무엇입니까?",
        options: [
          "오디오 가이드 대여",
          "사진 촬영",
          "플래시 사용 및 작품 접촉",
          "오전 10시에 입장"
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
        explanation: "The text says \"만 65세 이상 어르신은 무료입니다\".",
        tags: ["Detail", "Practical"],
      }
    ]
  }
];
