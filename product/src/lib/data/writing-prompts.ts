import { WritingPrompt } from '@/lib/types';

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'w1',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Daily Life',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `저는 어제 친구와 함께 공원을 방문했습니다. 산책을 하며 ( ＿ ) 좋았습니다. 산책 후에는 ( ＿ ) 마셨습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 기분이 매우 / ( ＿ ) 시원한 커피를',
    scoringCriteria: 'Correct grammar, appropriate vocabulary for the context, and natural flow.',
    tags: ['Grammar', 'Daily Life'],
  },
  {
    id: 'w2',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Formal/Academic',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `현대 사회에서 인공지능 기술의 발전은 매우 빠르게 이루어지고 있습니다. 인공지능은 이제 인간의 업무를 ( ＿ ) 수준에 이르렀습니다. 하지만 이에 따른 ( ＿ ) 문제에 대한 논의가 필요합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 상당 부분 대체할 수 있는 / ( ＿ ) 윤리적',
    scoringCriteria: 'Use of formal written style(-ㄴ/는다는), academic vocabulary, and logical coherence.',
    tags: ['Academic', 'Ethics', 'Formal'],
  },
  {
    id: 'w3',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Environmental Trends',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Plastic Waste Production in Korea]
- 2010: 10 million tons
- 2015: 15 million tons
- 2020: 22 million tons
- Reason: Increase in delivery services and disposable packaging.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `한국의 플라스틱 쓰레기 배출량은 2010년 1,000만 톤에서 2015년 1,500만 톤으로 증가하였으며, 2020년에는 2,200만 톤에 이르렀습니다. 이러한 증가의 원인은 배달 서비스의 확대와 일회용 포장재 사용의 증가인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation, use of descriptive graph language (증가하였다, 분석된다), and appropriate length.',
    tags: ['Data Analysis', 'Environment', 'Graph Description'],
  },
  {
    id: 'w4',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Education',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The necessity of lifelong learning in the modern era.
1. Why is lifelong learning necessary today?
2. What are the challenges of lifelong learning?
3. How can we overcome these challenges?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `현대 사회는 기술의 급격한 발전으로 인해 지식의 유효 기간이 짧아지고 있습니다. 따라서 평생 학습은 단순한 자기계발을 넘어 생존을 위한 필수적인 선택이 되었습니다. 하지만 직장 생활과 학습을 병행해야 하는 시간적 제약과 경제적 부담은 큰 걸림돌이 됩니다. 이를 극복하기 위해서는 온라인 교육 플랫폼의 활성화와 기업 차원의 학습 지원으로 학습으로 접근성을 높여야 합니다. 결국 개인의 의지와 사회적 시스템이 조화를 이룰 때 진정한 의미의 평생 학습 사회가 구현될 수 있습니다.`,
    scoringCriteria: 'Structure (Intro-Body-Conclusion), logical argumentation, sophisticated vocabulary, and adherence to length requirements.',
    tags: ['Essay', 'Education', 'Argumentation'],
  },
  {
    id: 'w5',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Travel',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `이번 여름 휴가는 제주도에 가기로 했습니다. 제주도는 ( ＿ ) 풍경이 아름답기로 유명합니다. 그곳에서 ( ＿ ) 시간을 보내고 싶습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 자연 ',
    scoringCriteria: 'Appropriate use of causal connectors and vocabulary related to travel.',
    tags: ['Grammar', 'Travel'],
  },
  {
    id: 'w6',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Health',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `건강을 유지하기 위해서는 규칙적인 운동과 균형 잡힌 식단이 필수적입니다. 운동은 신체적 건강뿐만 아니라 ( ＿ ) 건강에도 긍정적인 영향을 미칩니다. 따라서 ( ＿ ) 운동 습관을 기르는 것이 중요합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 정신적 / ( ＿ ) 꾸준한',
    scoringCriteria: 'Formal style, logical connection between physical and mental health.',
    tags: ['Academic', 'Health', 'Formal'],
  },
  {
    id: 'w7',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Youth Unemployment',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Youth Unemployment Rate in Korea]
- 2015: 8.2%
- 2018: 9.5%
- 2021: 11.2%
- Reason: Mismatch between university majors and industry needs.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `한국의 청년 실업률은 2015년 8.2%에서 2018년 9.5%로 상승하였으며, 2021년에는 11.2%까지 증가하는 추세를 보였습니다. 이러한 실업률 상승의 주요 원인은 대학 전공과 산업 현장에서 요구하는 직무 역량 간의 불일치 때문인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation, professional tone, correct usage of "상승하였다" and "분석된다".',
    tags: ['Data Analysis', 'Economy', 'Graph Description'],
  },
  {
    id: 'w8',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Environment',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The responsibility of corporations vs. individuals in solving climate change.
1. To what extent are individuals responsible?
2. To what extent are corporations responsible?
3. What is the most effective way for them to collaborate?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `기후 위기는 인류가 직면한 가장 시급한 과제 중 하나입니다. 개인은 일회용품 사용 지양과 에너지 절약 등 작은 실천을 통해 탄소 배출을 줄이는 노력을 해야 합니다. 하지만 더 근본적인 해결을 위해서는 막대한 탄소 배출의 주체인 기업들의 책임이 더 큽니다. 기업은 친환경 공법 도입과 에너지 효율 개선을 통해 환경 영향을 최소화해야 합니다. 결국 정부의 규제와 기업의 변화, 그리고 개인의 실천이 삼박자를 이룰 때 비로소 기후 위기를 극복할 수 있습니다.`,
    scoringCriteria: 'Complex sentence structures, clear thesis, balanced argument, and high-level vocabulary.',
    tags: ['Essay', 'Environment', 'Argumentation'],
  },
  {
    id: 'w9',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Shopping',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `요즘은 온라인 쇼핑을 하는 사람들이 많습니다. 온라인 쇼핑은 ( ＿ ) 편리합니다. 하지만 직접 물건을 ( ＿ ) 수 없다는 단점이 있습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 매우 / ( ＿ ) 확인해 볼',
    scoringCriteria: 'Appropriate use of contrast (convenience vs. disadvantage).',
    tags: ['Grammar', 'Shopping'],
  },
  {
    id: 'w10',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Culture',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `전통 문화는 한 민족의 정체성을 보여주는 중요한 자산입니다. 따라서 전통 문화를 ( ＿ ) 하는 노력이 필요합니다. 이를 통해 우리는 ( ＿ ) 가치를 배울 수 있습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 보존하고 계승 / ( ＿ ) 조상들의 지혜와',
    scoringCriteria: 'Use of formal style and vocabulary related to cultural heritage.',
    tags: ['Academic', 'Culture', 'Formal'],
  },
  {
    id: 'w11',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Hobbies',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `저는 주말마다 등산을 합니다. 등산을 하면 ( ＿ ) 좋았습니다. 그리고 ( ＿ ) 풍경을 볼 수 있습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 건강이 / ( ＿ ) 아름다운',
    scoringCriteria: 'Natural flow and appropriate hobby-related vocabulary.',
    tags: ['Grammar', 'Hobbies'],
  },
  {
    id: 'w12',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Technology',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `스마트폰의 보급으로 인해 정보 접근성이 획기적으로 향상되었습니다. 사람들은 이제 언제 어디서나 ( ＿ ) 수 있게 되었습니다. 하지만 과도한 스마트폰 사용은 ( ＿ ) 문제를 야기할 수 있습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 필요한 정보를 얻을 / ( ＿ ) 거북목 증후군이나 중독처럼 정신과 신체적',
    scoringCriteria: 'Formal tone and logical contrast between benefit and drawback.',
    tags: ['Academic', 'Technology', 'Formal'],
  },
  {
    id: 'w13',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Coffee Consumption',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Per Capita Coffee Consumption in Korea]
- 2010: 25kg
- 2015: 40kg
- 2020: 65kg
- Reason: Expansion of franchise cafes and preference for iced americano.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `한국인의 1인당 커피 소비량은 2010년 25kg에서 2015년 40kg으로 증가하였으며, 2020년에는 65kg에 도달하며 가파른 상승세를 보였습니다. 이러한 현상은 프랜차이즈 카페의 확산과 아이스 아메리카노에 대한 선호도 증가가 주요 원인인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation and use of phrases like "가파른 상승세를 보였다".',
    tags: ['Data Analysis', 'Consumption', 'Graph Description'],
  },
  {
    id: 'w14',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Social Media',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The impact of social media on human relationships.
1. How has social media changed the way we communicate?
2. What are the positive and negative effects of these changes?
3. How can we maintain healthy relationships in the digital age?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `소셜 미디어의 등장은 인간의 소통 방식을 획기적으로 변화시켰습니다. 시간과 장소의 제약 없이 전 세계 사람들과 연결될 수 있다는 점은 긍정적입니다. 하지만 직접적인 소통이 줄어들면서 관계의 깊이가 얕아지고, 타인과 자신을 비교하며 느끼는 상대적 박탈감은 현대인의 정신 건강에 부정적인 영향을 미칩니다. 따라서 디지털 기기를 통한 소통과 더불어, 오프라인에서 직접 얼굴을 마주하는 시간을 늘려 정서적 유대감을 강화하는 노력이 필요합니다. 결국 기술은 도구일 뿐, 진정한 관계의 핵심은 서로에 대한 관심과 공감에 있기 때문입니다.`,
    scoringCriteria: 'Logical structure, balanced perspective, and high-level vocabulary.',
    tags: ['Essay', 'Society', 'Argumentation'],
  },
  {
    id: 'w15',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Weather',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `오늘은 날씨가 매우 ( ＿ ). 그래서 저는 친구와 함께 ( ＿ ) 공원에 가기로 했습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 맑습니다 / ( ＿ ) 가까운',
    scoringCriteria: 'Simple and natural sentence completion.',
    tags: ['Grammar', 'Weather'],
  },
  {
    id: 'w16',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Urbanization',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `도시화가 진행됨에 따라 사람들은 ( ＿ ) 관계를 맺는 경향이 있습니다. 이는 과거의 공동체 중심 문화에서 ( ＿ ) 문화로의 변화를 의미합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 익명적이고 파편적인 / ( ＿ ) 개인 중심의',
    scoringCriteria: 'Use of contrast markers and formal academic style.',
    tags: ['Academic', 'Society', 'Formal'],
  },
  {
    id: 'w17',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Online Education',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Proportion of Online Learning in Universities]
- 2018: 12%
- 2019: 15%
- 2020: 78%
- Reason: COVID-19 pandemic and digitalization of education.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `대학 내 온라인 학습 비중은 2018년 12%에서 2019년 15%로 완만하게 상승하다가, 2020년에는 78%로 급격히 증가하였습니다. 이러한 급격한 증가는 코로나19 팬데믹으로 인한 비대면 수업의 강제적 도입과 교육의 디지털 전환 가속화가 결정적인 원인이 된 것으로 분석됩니다.`,
    scoringCriteria: 'Contrast between "완만하게 상승" and "급격히 증가", and accurate causal analysis.',
    tags: ['Data Analysis', 'Education', 'Graph Description'],
  },
  {
    id: 'w18',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Work-Life Balance',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The importance of work-life balance (Worabel) in modern society.
1. Why has work-life balance become a key value?
2. What are the consequences of a lack of balance?
3. What systemic changes are needed to achieve it?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `현대 사회에서 일과 삶의 균형, 즉 워라밸은 단순한 유행을 넘어 삶의 질을 결정하는 핵심 가치가 되었습니다. 무분별한 경쟁과 과도한 노동은 개인의 번아웃을 초래하고, 이는 결국 국가 전반의 생산성 저하와 저출산 문제로 이어집니다. 이를 해결하기 위해서는 개인의 노력뿐만 아니라 기업 문화의 근본적인 변화가 필요합니다. 정시 퇴근을 당연시하는 분위기를 조성하고, 유연 근무제를 도입하여 개인이 자신의 삶을 주도적으로 설계할 수 있는 환경을 구축해야 합니다. 결국 삶의 균형이 잡힐 때 업무 효율성 또한 극대화될 수 있습니다.`,
    scoringCriteria: 'Logical flow, use of terms like "번아웃", "유연 근무제", and strong conclusion.',
    tags: ['Essay', 'Work', 'Argumentation'],
  },
  {
    id: 'w19',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Pets',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `저는 강아지를 키우고 있습니다. 강아지와 함께 ( ＿ ) 시간이 정말 행복합니다. 특히 ( ＿ ) 산책하는 것을 좋아합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 보내는 / ( ＿ ) 저녁에',
    scoringCriteria: 'Natural expression of emotion and activity.',
    tags: ['Grammar', 'Pets'],
  },
  {
    id: 'w20',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Artificial Intelligence',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `인공지능의 발전은 많은 분야에서 혁신을 일으키고 있습니다. 특히 의료 분야에서는 ( ＿ ) 가능성을 높여 많은 생명을 구할 수 있게 되었습니다. 하지만 AI의 ( ＿ ) 문제에 대한 사회적 합의가 필요합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 질병의 조기 진단 / ( ＿ ) 윤리적',
    scoringCriteria: 'Academic vocabulary and professional tone.',
    tags: ['Academic', 'AI', 'Formal'],
  },
  {
    id: 'w21',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Electric Vehicle Sales',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Global Electric Vehicle (EV) Sales]
- 2015: 500k units
- 2018: 2M units
- 2022: 10M units
- Reason: Government subsidies and improvement in battery technology.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `전 세계 전기차 판매량은 2015년 50만 대에서 2018년 200만 대로 증가하였으며, 2022년에는 1,000만 대를 기록하며 폭발적인 성장세를 보였습니다. 이러한 성장은 각국 정부의 구매 보조금 지원과 배터리 효율 및 성능의 비약적인 발전이 주요 원인인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation and use of "폭발적인 성장세".',
    tags: ['Data Analysis', 'Technology', 'Graph Description'],
  },
  {
    id: 'w22',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Universal Basic Income',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The feasibility and necessity of Universal Basic Income (UBI).
1. Why is UBI being discussed now?
2. What are the arguments for and against UBI?
3. What is your perspective on the most reasonable implementation method?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `자동화와 인공지능의 발전으로 인한 일자리 감소 위기 속에서 기본 소득 제도는 새로운 사회 안전망으로 주목받고 있습니다. 기본 소득은 모든 시민에게 조건 없이 일정 금액을 지급함으로써 최소한의 인간다운 삶을 보장하고 소비를 진작시키는 효과가 있습니다. 반면, 막대한 재원 마련의 어려움과 노동 의욕 저하라는 비판도 존재합니다. 따라서 전면적인 도입보다는 특정 계층부터 단계적으로 시행하며 사회적 합의를 도출하는 점진적 도입 방식이 가장 현실적인 대안이 될 것입니다.`,
    scoringCriteria: 'Sophisticated argumentation, clear structure, and realistic policy suggestions.',
    tags: ['Essay', 'Economy', 'Argumentation'],
  },
  {
    id: 'w23',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Cooking',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `저는 요리하는 것을 좋아합니다. 요리를 하면 ( ＿ ) 기분이 듭니다. 특히 ( ＿ ) 요리를 만드는 것을 가장 좋아합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 마음이 편안해지는 / ( ＿ ) 한국',
    scoringCriteria: 'Natural and simple sentence completion.',
    tags: ['Grammar', 'Hobbies'],
  },
  {
    id: 'w24',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Space Exploration',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `우주 탐사는 인류의 지적 호기심을 충족시키고 새로운 자원을 발견하는 데 큰 의미가 있습니다. 특히 화성 탐사는 인류가 ( ＿ ) 가능성을 열어주었습니다. 앞으로 ( ＿ ) 기술이 더욱 발전한다면 외계 생명체의 존재를 확인하는 것도 가능할지 모릅니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 다른 행성에서 거주할 / ( ＿ ) 우주 항해',
    scoringCriteria: 'Formal tone and appropriate academic terms.',
    tags: ['Academic', 'Science', 'Formal'],
  },
  {
    id: 'w25',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - 1-Person Households',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Proportion of 1-Person Households in Korea]
- 2000: 15%
- 2010: 23%
- 2020: 31%
- Reason: Change in marriage values and aging population.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `한국의 1인 가구 비율은 2000년 15%에서 2010년 23%로 증가하였으며, 2020년에는 31%에 도달하며 지속적인 상승 곡선을 그렸습니다. 이러한 증가의 원인은 결혼에 대한 가치관의 변화와 고령 사회 진입으로 인한 독거 노인 가구의 증가가 복합적으로 작용한 결과인 것으로 분석됩니다.`,
    scoringCriteria: 'Use of "지속적인 상승 곡선을 그렸다" and accurate analysis of causes.',
    tags: ['Data Analysis', 'Society', 'Graph Description'],
  },
  {
    id: 'w26',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Genetic Engineering',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The ethics of genetic engineering in humans.
1. What are the potential benefits of genetic engineering?
2. What are the ethical concerns (e.g., designer babies)?
3. Where should the line be drawn between treatment and enhancement?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `유전자 편집 기술의 발전은 유전성 질환을 근본적으로 치료할 수 있는 획기적인 가능성을 제시합니다. 하지만 이를 통한 "맞춤형 아기"의 탄생은 인간의 존엄성을 훼손하고 사회적 불평등을 심화시킬 수 있다는 심각한 윤리적 문제를 야기합니다. 따라서 유전자 편집의 활용 범위는 생명에 치명적인 질병의 치료와 예방에만 국한되어야 하며, 외모나 지능 향상을 위한 강화 목적의 사용은 엄격히 금지되어야 합니다. 기술의 발전보다 중요한 것은 그 기술을 다루는 인간의 윤리적 성찰입니다.`,
    scoringCriteria: 'Deep ethical analysis, clear distinction between treatment and enhancement, and strong conclusion.',
    tags: ['Essay', 'Ethics', 'Argumentation'],
  },
  {
    id: 'w27',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Reading Books',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `저는 책 읽는 것을 좋아합니다. 책을 읽으면 ( ＿ ) 수 있습니다. 특히 ( ＿ ) 책을 읽는 것을 가장 좋아합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 새로운 지식을 얻을 / ( ＿ ) 소설',
    scoringCriteria: 'Simple and natural sentence completion.',
    tags: ['Grammar', 'Hobbies'],
  },
  {
    id: 'w28',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Renewable Energy',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `화석 연료의 사용으로 인한 환경 오염이 심각해지면서 재생 에너지에 대한 관심이 높아지고 있습니다. 태양광과 풍력 에너지는 ( ＿ ) 에너지원이라는 장점이 있습니다. 하지만 ( ＿ ) 문제가 여전히 해결해야 할 과제로 남아 있습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 무한하고 친환경적인 / ( ＿ ) 발전 효율',
    scoringCriteria: 'Formal tone and appropriate environmental terminology.',
    tags: ['Academic', 'Environment', 'Formal'],
  },
  {
    id: 'w29',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Tourism Recovery',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Number of Foreign Tourists visiting Korea]
- 2019: 17.5M
- 2020: 2.5M
- 2022: 13M
- Reason: Pandemics followed by the gradual reopening of borders.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `한국을 방문하는 외국인 관광객 수는 2019년 1,750만 명에서 2020년 250만 명으로 급격히 감소하였습니다. 하지만 이후 국가 간 이동 제한이 점진적으로 해제되면서 2022년에는 1,300만 명으로 회복세를 보였습니다. 이러한 V자형 회복 곡선은 억눌렸던 여행 수요가 한꺼번에 폭발하는 "보복 여행" 현상이 반영된 결과인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate representation of the drop and subsequent recovery.',
    tags: ['Data Analysis', 'Tourism', 'Graph Description'],
  },
  {
    id: 'w30',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Urban Regeneration',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: Full redevelopment vs. Urban regeneration (preserving old neighborhoods).
1. What are the pros and cons of full redevelopment?
2. What are the benefits of urban regeneration?
3. Which approach is more sustainable for the future of cities?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `도시의 노후화 문제를 해결하기 위해 전면 재개발과 도시 재생이라는 두 가지 접근 방식이 대립합니다. 전면 재개발은 효율적인 토지 이용과 현대적 인프라 구축이 가능하다는 장점이 있지만, 기존 공동체의 파괴와 젠트리피케이션이라는 부작용을 낳습니다. 반면 도시 재생은 지역의 역사성과 정체성을 보존하면서 점진적으로 주거 환경을 개선하는 방식입니다. 미래의 지속 가능한 도시를 위해서는 무분별한 개발보다는 지역의 특성을 살린 도시 재생을 통해 도시의 매력을 유지하고 상생하는 방향으로 나아가야 합니다.`,
    scoringCriteria: 'Balanced argument, use of term "젠트리피케이션", and a clear sustainable perspective.',
    tags: ['Essay', 'Urban Planning', 'Argumentation'],
  },
  {
    id: 'w31',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Job Application',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `안녕하세요. 저는 이번 채용 공고를 보고 지원하게 된 김철수입니다. 저는 관련 분야에서 ( ＿ ) 경험이 있습니다. 이번 기회를 통해 회사에서 ( ＿ ) 싶습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 실무를 수행한 / ( ＿ ) 역량을 발휘하고',
    scoringCriteria: 'Appropriate use of job-application vocabulary and formal style.',
    tags: ['Grammar', 'Work', 'Formal'],
  },
  {
    id: 'w32',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Psychology',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `인간의 심리는 외부 자극에 의해 ( ＿ ) 영향을 받습니다. 특히 정서적 상태는 특정 행동을 ( ＿ ) 하는 효과가 있습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 결정적인 / ( ＿ ) 유도시키는',
    scoringCriteria: 'Academic vocabulary related to psychology and formal written style.',
    tags: ['Academic', 'Psychology', 'Formal'],
  },
  {
    id: 'w33',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Digital Payment Usage',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Digital Payment Usage in Korea] 
- 2015: 20% 
- 2018: 45% 
- 2022: 82% 
- Reason: Expansion of mobile payment systems and contactless technology.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `한국의 디지털 결제 이용률은 2015년 20%에서 2018년 45%로 증가하였으며, 2022년에는 82%에 도달하며 급격한 상승세를 보였습니다. 이러한 증가는 모바일 결제 시스템의 확산과 비접촉식 결제 기술의 도입으로 인한 편의성 증대가 핵심적인 원인이 된 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation and use of graph description phrases.',
    tags: ['Data Analysis', 'Technology', 'Graph Description'],
  },
  {
    id: 'w34',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - AI in Arts',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: Can AI-generated art be considered "true" art? 
1. What are the characteristics of AI-generated art? 
2. What is the essential element of human art that AI lacks? 
3. How should we define the concept of "artist" in the AI era?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `최근 인공지능(AI)이 생성한 그림과 음악이 예술로 인정받으며 많은 주목을 받고 있습니다. AI 예술은 방대한 데이터를 학습하여 최적의 결과물을 도출내는 계산적 특성을 지닙니다. 하지만 예술의 본질은 단순한 결과물이 아니라 창작 과정에서 느끼는 인간의 고뇌와 철학적 성찰에 있습니다. AI는 데이터의 조합일 뿐, 주체적인 의도를 가지고 예술을 창조하는 것이 아니기 때문입니다. 따라서 AI 시대의 예술가는 단순히 기술을 사용하는 사람이 아니라, AI를 도구로 활용하여 새로운 예술적 가치를 정의하는 기획자로 재정의되어야 합니다.`,
    scoringCriteria: 'Logical structure, sophisticated vocabulary, and clear thesis.',
    tags: ['Essay', 'AI', 'Philosophy'],
  },
  {
    id: 'w35',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Hospital',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `어제부터 아니 감기 기운이 심해서 병원에 왔습니다. ( ＿ ) 검사를 받고 싶습니다. 그리고 ( ＿ ) 약을 처방받고 싶습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 정밀 / ( ＿ ) 적절한',
    scoringCriteria: 'Natural flow and appropriate medical-related vocabulary.',
    tags: ['Grammar', 'Health'],
  },
  {
    id: 'w36',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Sociology',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `도시화가 진행됨에 따라 사람들은 ( ＿ ) 관계를 맺는 경향이 있습니다. 이는 과거의 공동체 중심 문화에서 ( ＿ ) 문화로의 변화를 의미합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 익명적이고 파편적인 / ( ＿ ) 개인 중심의',
    scoringCriteria: 'Formal style and use of sociological terms.',
    tags: ['Academic', 'Sociology', 'Formal'],
  },
  {
    id: 'w37',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Average Sleep Hours',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Average Sleep Hours of Korean Adults] 
- 20-30s: 6.2 hours 
- 40-50s: 6.8 hours 
- 60s+: 7.5 hours 
- Reason: Work pressure and digital device usage among youth.`,
    prompt: 'Describe the trend and the reason for the difference.',
    sampleAnswer: `한국 성인의 평균 수면 시간은 연령대가 높아질수록 증가하는 경향을 보입니다. 20~30대는 6.2시간으로 가장 짧았으며, 40~50대는 6.8시간, 60대 이상은 7.5시간으로 나타났습니다. 특히 청년층의 수면 시간이 짧은 이유는 과도한 업무 압박과 취침 전 디지털 기기 사용의 증가가 주요 원인인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate comparison of data and causal analysis.',
    tags: ['Data Analysis', 'Health', 'Graph Description'],
  },
  {
    id: 'w38',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Mental Health',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The importance of mental health care in modern society. 
1. Why is mental health as important as physical health? 
2. What are the social barriers to seeking mental health care? 
3. How can society create a support system for mental wellness?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `현대 사회에서 정신 건강은 신체 건강만큼이나 중요한 삶의 척도가 되었습니다. 신체적 질병이 삶의 질을 떨어뜨리듯, 우울증이나 불안과 같은 정신적 고통은 개인의 일상 기능을 마비시키고 심각한 사회적 손실을 초래할 수 있습니다. 하지만 여전히 우리 사회에는 정신과 진료에 대한 편견과 사회적 시선이라는 높은 벽이 존재합니다. 이를 해결하기 위해서는 정신 건강 관리를 부끄러운 일이 아닌, 당연한 건강 관리의 일환으로 보는 인식 개선과 더불어 누구나 쉽게 접근할 수 있는 공공 상담 시스템의 확충이 필요합니다.`,
    scoringCriteria: 'Logical flow, empathetic yet professional tone, and clear solutions.',
    tags: ['Essay', 'Health', 'Society'],
  },
  {
    id: 'w39',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Education',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `저는 이번 학기에 한국어 수업을 ( ＿ ). 한국어 능력을 높여서 나중에 한국 대학에서 ( ＿ ) 싶습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 듣고 있습니다 / ( ＿ ) 공부하고',
    scoringCriteria: 'Correct grammar and natural expressions for education.',
    tags: ['Grammar', 'Education'],
  },
  {
    id: 'w40',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Science',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `기후 변화로 인한 지구 온난화는 생태계에 ( ＿ ) 영향을 미칩니다. 특히 해수면 상승은 저지대 국가들의 ( ＿ ) 문제를 야기합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 치명적인 / ( ＿ ) 생존',
    scoringCriteria: 'Academic tone and use of environmental terminology.',
    tags: ['Academic', 'Science', 'Formal'],
  },
  {
    id: 'w41',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Online Shopping Growth',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Online Shopping Transaction Volume] 
- 2017: 100 trillion KRW 
- 2019: 150 trillion KRW 
- 2021: 220 trillion KRW 
- Reason: Improvement in logistics and growth of e-commerce platforms.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `온라인 쇼핑 거래액은 2017년 100조 원에서 2019년 150조 원으로 증가하였고, 2021년에는 220조 원에 이르며 가파른 성장세를 기록했습니다. 이러한 성장은 물류 시스템의 혁신과 이커머스 플랫폼의 다변화로 인한 소비자 편의성 증대가 결정적인 원인이 된 것으로 보입니다.`,
    scoringCriteria: 'Accurate data representation and professional tone.',
    tags: ['Data Analysis', 'Economy', 'Graph Description'],
  },
  {
    id: 'w42',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Government Role in Economy',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The ideal role of the government in the economy. 
1. Should the government intervene in the market? 
2. What are the risks of excessive government intervention? 
3. What is the most balanced approach for economic stability?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `시장의 효율성을 극대화하기 위해 정부의 개입은 최소화되어야 한다는 주장이 지배적입니다. 기본적으로 시장은 자율적인 가격 기제에 의해 자원을 효율적으로 배분하는 능력이 있지만, 독과점이나 외부 효과와 같은 시장 실패가 발생할 때는 정부의 적절한 개입이 필수적입니다. 하지만 과도한 개입은 기업의 창의성을 저해하고 시장의 역동성을 떨어뜨리는 부작용을 낳을 수 있습니다. 따라서 정부는 직접적인 시장 통제보다는 공정한 경쟁 환경을 조성하는 제도적 틀을 구축하는 조력자로서의 역할에 집중해야 합니다.`,
    scoringCriteria: 'Complex argumentation, professional vocabulary, and logical structure.',
    tags: ['Essay', 'Economy', 'Politics'],
  },
  {
    id: 'w43',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Airport',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `비행기 표를 예약하고 공항에 왔습니다. ( ＿ )을/를 하고 곧은 짐을 부치고 싶습니다. 그리고 ( ＿ ) 면세점에서 쇼핑을 하고 싶습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 체크인 / ( ＿ ) 공항',
    scoringCriteria: 'Appropriate travel vocabulary and natural flow.',
    tags: ['Grammar', 'Travel'],
  },
  {
    id: 'w44',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Ethics',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `윤리적 소비란 단순히 제품의 품질뿐만 아니라 생산 과정의 ( ＿ ) 함께 고려하여 구매하는 소비 행위입니다. 이는 소비자가 사회적 ( ＿ )을/를 실천하는 방법 중 하나입니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 윤리성이나 공정성 / ( ＿ ) 책임감',
    scoringCriteria: 'Academic style and correct use of ethical terms.',
    tags: ['Academic', 'Ethics', 'Formal'],
  },
  {
    id: 'w45',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Youth Population Decline',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Youth Population (ages 15-29) in Korea] 
- 2010: 10.5 million 
- 2015: 9.8 million 
- 2020: 8.5 million 
- Reason: Low birth rate and increasing preference for late marriage.`,
    prompt: 'Describe the trend and the reason for the decrease.',
    sampleAnswer: `한국의 15~29세 청년 인구는 2010년 1,050만 명에서 2015년 980만 명으로 감소하였으며, 2020년에는 850만 명으로 떨어지며 지속적인 하락세를 보였습니다. 이러한 인구 감소의 주요 원인은 저출산 현상의 심화와 더불어 결혼 및 출산 연령이 늦어지는 사회적 추세가 반영된 결과인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation and correct causal phrases.',
    tags: ['Data Analysis', 'Society', 'Graph Description'],
  },
  {
    id: 'w46',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Digital Nomadism',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The rise of digital nomadism and its impact on the traditional concept of work. 
1. What is digital nomadism? 
2. What are the advantages and disadvantages of this work style? 
3. How will this change the future of urban development and company culture?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `디지털 노마드란 장소에 구애받지 않고 정보통신기술을 활용해 일하며 살아가는 사람들을 의미합니다. 이러한 업무 형태는 시간과 공간의 자유를 누리며 삶의 질을 높일 수 있다는 장점이 있지만, 사회적 고립감과 불분명한 공사 구분이 스트레스로 다가올 수 있다는 단점도 존재합니다. 앞으로 디지털 노마드의 확산은 기업 문화의 유연화를 촉진하고, 도시 개발 측면에서는 특정 중심지 중심의 개발에서 벗어나 지역 사회가 분산되는 다극화 현상을 가속화할 것으로 전망됩니다.`,
    scoringCriteria: 'Sophisticated vocabulary, logical flow, and forward-looking perspective.',
    tags: ['Essay', 'Work', 'Technology'],
  },
  {
    id: 'w47',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Shopping',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `옷을 샀는데 사이즈가 너무 커서 ( ＿ ) 싶습니다. 혹시 ( ＿ )이/가 가능한가요?`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 교환하고 / ( ＿ ) 환불',
    scoringCriteria: 'Correct use of shopping-related terms (exchange/refund).',
    tags: ['Grammar', 'Shopping'],
  },
  {
    id: 'w48',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Economics',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `인플레이션은 물가가 지속적으로 상승하여 화폐의 ( ＿ ) 가치가 하락하는 현상입니다. 이는 실질 소득의 ( ＿ ) 결과를 초래하여 소비 위축을 가져옵니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 구매 / ( ＿ ) 감소',
    scoringCriteria: 'Academic tone and correct economic terms.',
    tags: ['Academic', 'Economy', 'Formal'],
  },
  {
    id: 'w49',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Renewable Energy Adoption',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Share of Renewable Energy in Total Energy Consumption] 
- 2010: 5% 
- 2015: 12% 
- 2020: 25% 
- Reason: Global climate crisis and technological advancement in solar/wind power.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `전체 에너지 소비 중 재생 에너지의 비중은 2010년 5%에서 2015년 12%로 증가하였으며, 2020년에는 25%까지 상승하며 가파른 증가세를 나타냈습니다. 이는 전 지구적인 기후 위기에 대응하려는 노력과 더불어 태양광 및 풍력 발전 기술의 효율성 및 경제성이 크게 향상된 것이 주요 원인인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation and professional phrasing.',
    tags: ['Data Analysis', 'Environment', 'Graph Description'],
  },
  {
    id: 'w50',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Future of Education',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The role of teachers in the age of AI-driven personalized learning. 
1. How is AI changing the way students learn? 
2. Will AI replace human teachers? Why or why not? 
3. What new competencies should future teachers possess?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `AI 기반의 맞춤형 학습은 학습자 개개인의 수준과 속도에 맞는 최적의 커리큘럼을 제공함으로써 학습 효율성을 획기적으로 높이고 있습니다. 하지만 AI가 지식 전달의 효율성은 높일 수 있어도, 인간 교사가 제공하는 정서적 교감과 사회적 상호작용까지 대체할 수는 없습니다. 따라서 미래의 교사는 단순한 지식 전달자에서 벗어나, AI가 제공하는 데이터를 분석해 학습 방향을 제시하고 학생의 잠재력을 끌어내는 학습 촉진자(Facilitator)로서의 역할을 수행해야 합니다.`,
    scoringCriteria: 'Clear thesis, logical argumentation, and sophisticated vocabulary.',
    tags: ['Essay', 'Education', 'AI'],
  },
  {
    id: 'w51',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Music',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `저는 음악 듣는 것을 아주 좋아합니다. 특히 ( ＿ ) 음악을 가장 좋아합니다. 나중에 ( ＿ ) 악기를 배워보고 싶습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 클래식 / ( ＿ ) 피아노',
    scoringCriteria: 'Natural flow and appropriate hobby-related vocabulary.',
    tags: ['Grammar', 'Hobbies'],
  },
  {
    id: 'w52',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Law',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `법은 사회 구성원 간의 갈등을 ( ＿ ) 하고 사회 질서를 유지하기 위해 존재합니다. 특히 기본권 보장은 국가 권력의 ( ＿ ) 을/를 방지하는 핵심적인 역할을 합니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 조정 / ( ＿ ) 남용',
    scoringCriteria: 'Formal style and correct legal terminology.',
    tags: ['Academic', 'Law', 'Formal'],
  },
  {
    id: 'w53',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Pet Ownership Trends',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Number of Households with Pets in Korea] 
- 2010: 10 million 
- 2015: 13 million 
- 2020: 16 million 
- Reason: Increase in single-person households and changes in perception of pets as family.`,
    prompt: 'Describe the trend and the reason for the increase.',
    sampleAnswer: `한국의 반려동물 양육 가구 수는 2010년 1,000만 가구에서 2015년 1,300만 가구로 늘어났으며, 2020년에는 1,600만 가구에 도달하며 꾸준한 증가세를 보였습니다. 이러한 현상은 1인 가구의 급증과 더불어 반려동물을 단순한 동물이 아닌 가족의 일원으로 생각하는 인식의 변화가 반영된 결과인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation and a natural causal link.',
    tags: ['Data Analysis', 'Society', 'Graph Description'],
  },
  {
    id: 'w54',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Privacy vs Security',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The conflict between individual privacy and national security. 
1. Why is the tension between privacy and security increasing? 
2. What are the risks of prioritizing security over privacy? 
3. How can we achieve a balance between the two?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `디지털 기술의 발전으로 국가의 감시 능력이 비약적으로 향상됨에 따라 개인의 프라이버시 보호와 국가 안보라는 두 가치가 충돌하고 있습니다. 특히 테러나 범죄 예방이라는 명목으로 이루어지는 과도한 정보 수집은 개인의 자유를 억압하고 국가 권력의 남용으로 이어질 위험이 있습니다. 따라서 법적 절차에 따른 엄격한 통제와 투명한 운영을 통해 보안을 유지하면서도 개인의 기본권을 침해하지 않는 균형 잡힌 시스템을 구축하는 것이 무엇보다 중요합니다.`,
    scoringCriteria: 'Logical structure, balanced perspective, and high-level vocabulary.',
    tags: ['Essay', 'Politics', 'Ethics'],
  },
  {
    id: 'w55',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Appointment',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `친구와 약속을 잡으려고 합니다. ( ＿ )에 만나는 것이 어때요? 시간이 안 되면 ( ＿ ) 시간으로 변경해도 괜찮습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 이번 주 토요일 / ( ＿ ) 다음 주',
    scoringCriteria: 'Natural and simple sentence completion.',
    tags: ['Grammar', 'Daily Life'],
  },
  {
    id: 'w56',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Globalization',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `세계화의 진전으로 국가 간의 ( ＿ ) 교류가 활발해졌습니다. 이는 경제적 이득뿐만 아니라 서로 다른 문화에 대한 ( ＿ ) 을/를 높이는 계기가 되었습니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 인적, 물적 / ( ＿ ) 이해도',
    scoringCriteria: 'Formal style and appropriate terms for globalization.',
    tags: ['Academic', 'Culture', 'Formal'],
  },
  {
    id: 'w57',
    taskNumber: 53,
    level: 5,
    title: 'Graph Description - Coffee Consumption by Age',
    instruction: 'Write a description of the provided data (approx. 200-300 characters).',
    context: `Data: [Topic: Monthly Coffee Consumption by Age Group] 
- 20s: 15 cups 
- 30s: 12 cups 
- 40s: 8 cups 
- 50s+: 5 cups 
- Reason: Coffee culture as a social tool and preference for caffeine among youth.`,
    prompt: 'Describe the trend and the reason for the difference.',
    sampleAnswer: `연령대별 월평균 커피 소비량은 연령대가 낮을수록 많은 경향을 보입니다. 20대가 15잔으로 가장 많았으며, 30대 12잔, 40대 8잔, 50대 이상은 5잔 순으로 감소하는 경향을 보였습니다. 이러한 차이는 커피를 통한 사회적 교류를 선호하는 청년층의 문화와 카페인 섭취에 대한 선호도가 높기 때문인 것으로 분석됩니다.`,
    scoringCriteria: 'Accurate data representation and correct phrasing.',
    tags: ['Data Analysis', 'Consumption', 'Graph Description'],
  },
  {
    id: 'w58',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Tradition vs Modernity',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The value of preserving traditions in a rapidly changing modern society. 
1. Why do some people view traditions as obsolete? 
2. What is the spiritual or social value of tradition? 
3. How can tradition be creatively adapted to fit modern life?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `급격한 현대화 과정에서 전통은 효율성과 실용성이라는 잣대에 밀려 낡고 불필요한 것으로 치부되곤 합니다. 하지만 전통은 단순한 과거의 유산이 아니라, 한 공동체가 오랜 시간 쌓아온 지혜와 정체성이 응축된 결정체입니다. 전통을 통해 우리는 자신의 뿌리를 확인하고 사회적 유대감을 강화하며 정신적 안정을 얻을 수 있습니다. 따라서 전통을 무조건 보존하기보다 현대적인 감각으로 재해석하고 창의적으로 변용함으로써 현대인의 삶 속에 자연스럽게 녹아들게 하는 노력이 필요합니다.`,
    scoringCriteria: 'Logical flow, sophisticated vocabulary, and clear conclusion.',
    tags: ['Essay', 'Culture', 'Philosophy'],
  },
  {
    id: 'w59',
    taskNumber: 51,
    level: 3,
    title: 'Short Answer Completion - Formal Request',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `선생님, 제가 개인적인 사정으로 오늘 수업에 ( ＿ ). 혹시 ( ＿ ) 방법이 있을까요?`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 참석하기 어려울 것 같습니다 / ( ＿ ) 보강할',
    scoringCriteria: 'Appropriate honorifics and formal request style.',
    tags: ['Grammar', 'Formal'],
  },
  {
    id: 'w60',
    taskNumber: 52,
    level: 4,
    title: 'Short Answer Completion - Research Ethics',
    instruction: 'Fill in the blanks ( ＿ ) and ( ＿ ) to complete the text.',
    context: `학술 연구에서 연구자의 ( ＿ ) 는/은 매우 중요합니다. 데이터를 조작하거나 표절하는 행위는 학문의 ( ＿ ) 을/를 심각하게 훼손하는 일입니다.`,
    prompt: 'Fill in ( ＿ ) and ( ＿ )',
    sampleAnswer: '( ＿ ) 연구 윤리 / ( ＿ ) 신뢰성',
    scoringCriteria: 'Academic tone and correct research-related terminology.',
    tags: ['Academic', 'Ethics', 'Formal'],
  },
  {
    id: 'w61',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Space Exploration',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The ethics and necessity of space exploration.
1. Why do humans seek to explore space despite the high cost?
2. What are the ethical concerns regarding the colonization of other planets?
3. How should we balance space investment with solving problems on Earth?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `인류는 오래전부터 미지의 세계에 대한 호기심을 바탕으로 우주 탐사를 지속해 왔습니다. 우주 탐사는 새로운 자원 개발 가능성을 열어줄 뿐만 아니라, 지구의 한계를 넘어 인류의 생존 영역을 확장한다는 점에서 필수적입니다. 하지만 타 행성을 식민지화하는 과정에서 발생할 수 있는 환경 파괴와 윤리적 문제는 신중하게 다뤄져야 합니다. 결국 우주 개발의 성과가 지구의 환경 문제 해결과 인류 공영에 기여하는 방향으로 추진될 때, 우주 탐사는 진정한 가치를 가질 수 있습니다.`,
    scoringCriteria: 'Logical structure, balanced argument between necessity and ethics, and advanced vocabulary.',
    tags: ['Essay', 'Science', 'Ethics'],
  },
  {
    id: 'w62',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Aging Population',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The impact of an aging population on modern society.
1. What are the primary causes of the rapid increase in the elderly population?
2. What social and economic challenges does an aging society face?
3. What systemic measures are needed to create a sustainable society for all ages?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `현대 사회는 의료 기술의 발전과 출생률 감소의 영향으로 급격한 고령 사회 진입을 맞이하고 있습니다. 고령 인구의 증가는 노동 가능 인구의 감소로 인한 경제 성장 둔화와 노인 복지 비용의 증가라는 사회적 과제를 던집니다. 이를 해결하기 위해서는 정년 연장과 노인 일자리 창출을 통해 고령층의 경제 활동 참여를 유도하고, 세대 간 갈등을 최소화하는 사회적 합의를 도출해야 합니다. 결국 모든 세대가 공존할 수 있는 지속 가능한 사회 시스템을 구축하는 것이 시급합니다.`,
    scoringCriteria: 'Analysis of cause and effect, concrete suggestions for solutions, and formal written style.',
    tags: ['Essay', 'Sociology', 'Economy'],
  },
  {
    id: 'w63',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - EQ vs IQ',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The role of Emotional Intelligence (EQ) compared to Intelligence Quotient (IQ) in achieving success.
1. Why is EQ becoming more valued than IQ in the modern workplace?
2. How does EQ contribute to leadership and teamwork?
3. Is it possible to develop EQ in adulthood?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `과거에는 지적 능력의 척도인 IQ가 성공의 절대적 기준으로 여겨졌으나, 현대의 복잡한 사회 구조 속에서는 감성 지능인 EQ의 중요성이 더욱 강조되고 있습니다. 특히 협업과 소통이 필수적인 현대의 업무 환경에서 타인의 감정을 이해하고 공감하는 능력은 리더십의 핵심 요소가 됩니다. EQ는 타고나는 부분도 있지만, 지속적인 자기 성찰과 타인에 대한 배려, 다양한 사회적 경험을 통해 성인기에도 충분히 발달시킬 수 있습니다. 결국 IQ와 EQ의 조화가 진정한 성공의 열쇠가 될 것입니다.`,
    scoringCriteria: 'Comparison of IQ and EQ, logical flow, and use of professional terminology.',
    tags: ['Essay', 'Psychology', 'Success'],
  },
  {
    id: 'w64',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Hallyu and National Image',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The influence of Hallyu (Korean Wave) on Korea's national image and diplomacy.
1. How has Hallyu changed the global perception of Korea?
2. What are the risks of relying too heavily on pop culture for national branding?
3. How can Hallyu be leveraged to strengthen international diplomacy?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `K-팝과 K-드라마로 대표되는 한류는 한국을 전 세계에 알리는 강력한 소프트 파워가 되었습니다. 한류는 한국에 대한 긍정적인 이미지를 구축하고 한국어 학습과 한국 관광 산업의 성장으로 이어지는 경제적 효과를 창출했습니다. 하지만 대중문화에만 의존한 국가 브랜드 구축은 깊이 있는 국가 이미지 형성에 한계가 있으며, 일시적인 유행에 그칠 위험이 있습니다. 따라서 한류의 인기를 바탕으로 한국의 전통문화와 예술, 그리고 민주적 가치를 함께 알림으로써 보다 성숙하고 다각적인 국가 이미지를 구축해 나가야 합니다.`,
    scoringCriteria: 'Analysis of soft power, critical view on pop culture reliance, and high-level vocabulary.',
    tags: ['Essay', 'Culture', 'Diplomacy'],
  },
  {
    id: 'w65',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Mandatory Military Service',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The pros and cons of mandatory military service in the modern era.
1. What are the arguments in favor of mandatory service (e.g., national security, discipline)?
2. What are the arguments against it (e.g., personal freedom, economic loss)?
3. What is the most reasonable direction for the future of national defense?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `국가 안보라는 특수한 상황 속에서 징병제는 효율적인 국방력 유지와 사회적 단결을 가능케 한다는 장점이 있습니다. 특히 외부의 위협이 상존하는 환경에서 징병제는 가장 확실한 안보 전략으로 평가받습니다. 반면, 개인의 자유와 선택권을 침해하고 청년기의 경제적 손실을 초래한다는 강력한 비판이 존재합니다. 앞으로의 국방은 무조건적인 인원 충원보다는 첨단 기술 기반의 과학 기술 강군으로 전환하고, 모병제와 징병제의 장점을 절충한 효율적인 시스템을 구축하는 방향으로 나아가야 합니다.`,
    scoringCriteria: 'Balanced perspective on security vs freedom, logical structure, and formal tone.',
    tags: ['Essay', 'Politics', 'Society'],
  },
  {
    id: 'w66',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Animal Testing',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The ethics of animal testing for medical advancement.
1. To what extent is animal testing necessary for human health?
2. What are the ethical problems associated with animal testing?
3. What are the alternatives to animal testing, and how feasible are they?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `의학의 발전 과정에서 동물 실험은 인체 적용 전 안전성을 검증하는 필수적인 단계로 여겨져 왔습니다. 수많은 질병의 치료제 개발은 동물 실험을 통해 가능했으며 이는 인류의 생명 연장에 크게 기여했습니다. 하지만 동물의 생명권 침해와 불필요한 고통 유발이라는 윤리적 비판은 계속해서 제기되고 있습니다. 최근에는 인공 세포 배양이나 컴퓨터 시뮬레이션과 같은 대체 시험법이 개발되고 있으며, 이러한 기술적 진보를 통해 동물 실험을 점진적으로 줄이고 윤리적인 연구 문화를 정착시켜야 합니다.`,
    scoringCriteria: 'Ethical analysis, discussion of alternatives, and sophisticated vocabulary.',
    tags: ['Essay', 'Ethics', 'Science'],
  },
  {
    id: 'w67',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Urbanization and Mental Health',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The impact of urban living on mental health.
1. Why does urban living often lead to higher stress and alienation?
2. What are the psychological consequences of the "urban paradox" (surrounded by people but feeling alone)?
3. How can city planning be improved to promote mental wellness?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `현대인들은 편리한 인프라 속에서 살아가고 있지만, 역설적으로 심각한 정신적 고통을 겪고 있습니다. 도시의 치열한 경쟁과 소음, 그리고 파편화된 인간관계는 현대인을 극심한 스트레스와 소외감으로 몰아넣습니다. 수많은 사람에게 둘러싸여 있음에도 정작 마음을 나눌 곳이 없는 "도시적 고독"은 우울증과 불안 장애의 주요 원인이 됩니다. 이를 해결하기 위해서는 도시 계획 단계부터 녹지 공간을 확충하고, 주민들이 자연스럽게 교류할 수 있는 커뮤니티 중심의 공간 설계를 통해 정서적 안정을 도모하는 도시 환경을 구축해야 합니다.`,
    scoringCriteria: 'Psychological insight, logical flow, and formal written style.',
    tags: ['Essay', 'Sociology', 'Psychology'],
  },
  {
    id: 'w68',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Critical Thinking in AI Era',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The importance of critical thinking in the age of AI.
1. How is AI changing the way we process information?
2. What are the risks of over-relying on AI-generated answers?
3. How can education be reformed to foster critical thinking?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `인공지능의 발전으로 우리는 방대한 정보를 순식간에 요약하고 정답을 얻는 시대에 살고 있습니다. 하지만 AI가 제공하는 정보가 항상 정확한 것은 아니며, 때로는 "환각 현상"이라 불리는 그럴듯한 거짓말을 생성하기도 합니다. 이러한 정보에 무비판적으로 의존할 경우, 사고 능력이 퇴화하고 편향된 시각을 갖게 될 위험이 큽니다. 따라서 교육의 방향은 정답을 찾는 법이 아니라, 제공된 정보의 진위 여부를 판단하고 논리적으로 분석하는 "비판적 사고력"을 기르는 방향으로 전환되어야 합니다.`,
    scoringCriteria: 'Analysis of AI risks, educational suggestions, and sophisticated vocabulary.',
    tags: ['Essay', 'Education', 'AI'],
  },
  {
    id: 'w69',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Individualism vs Collectivism',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: Finding a balance between individualism and collectivism in modern Korea.
1. What are the characteristics of traditional Korean collectivism?
2. Why is individualism becoming more prominent among the younger generation?
3. How can we integrate the strengths of both to create a healthy society?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `한국 사회는 전통적으로 공동체의 화합과 유대감을 중시하는 집단주의적 성향이 강했습니다. 이는 위기 상황에서 강력한 응집력을 발휘하는 장점이 있었지만, 개인의 개성과 자율성을 억압하는 부작용을 낳기도 했습니다. 최근 젊은 세대를 중심으로 개인의 행복과 권리를 우선시하는 개인주의적 가치관이 확산되는 것은 이러한 억압에 대한 반작용이자 시대적 흐름입니다. 우리는 집단주의의 상호 부조 정신과 개인주의의 자율성을 조화롭게 통합하여, 서로의 다름을 존중하면서도 함께 성장하는 성숙한 사회 모델을 구축해야 합니다.`,
    scoringCriteria: 'Sociological analysis, balanced perspective, and high-level vocabulary.',
    tags: ['Essay', 'Philosophy', 'Society'],
  },
  {
    id: 'w70',
    taskNumber: 54,
    level: 6,
    title: 'Argumentative Essay - Basic Income for Artists',
    instruction: 'Write an essay of 600-700 characters on the following topic.',
    context: `Topic: The necessity of a basic income system for artists.
1. Why do artists often face economic instability?
2. How does the economic stability of artists benefit society as a whole?
3. What are the potential drawbacks of providing a basic income to a specific professional group?`,
    prompt: 'Write a structured essay addressing all three points.',
    sampleAnswer: `예술 활동은 본질적으로 상업적 성공과 예술적 가치가 일치하지 않는 경우가 많아, 많은 예술가가 경제적 불안정 속에 살아갑니다. 하지만 예술가의 경제적 안정이 보장될 때, 사회는 더욱 다양하고 수준 높은 문화적 자산을 향유할 수 있으며 이는 시민들의 정서적 풍요로 이어집니다. 물론 특정 직업군에만 기본 소득을 제공하는 것이 형평성 논란을 일으킬 수 있다는 우려가 있습니다. 그럼에도 불구하고 예술의 공공적 가치를 인정하고 이를 지원하는 시스템을 마련하는 것은 문화 강국으로 나아가기 위한 필수적인 투자입니다.`,
    scoringCriteria: 'Economic and cultural analysis, balanced argument, and formal tone.',
    tags: ['Essay', 'Economy', 'Arts'],
  },
];
