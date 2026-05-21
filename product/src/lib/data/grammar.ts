export interface GrammarPattern {
  id: string;
  level: number;
  title: string;
  pattern: string;
  explanation: string;
  examples: {
    korean: string;
    english: string;
  }[];
  usage_notes: string;
}

export const grammarData: GrammarPattern[] = [
  {
    id: 'g1',
    level: 3,
    title: '-(으)ㄴ/는 반면(에)',
    pattern: '-(으)ㄴ/는 반면(에)',
    explanation: 'Used to contrast two facts or states. Equivalent to "while" or "on the other hand".',
    examples: [
      { korean: '형은 공부를 잘하는 반면, 동생은 운동을 잘해요.', english: 'My older brother is good at studying, while my younger brother is good at sports.' },
      { korean: '이 제품은 가격이 싼 반면, 품질은 좋지 않아요.', english: 'This product is cheap, but on the other hand, the quality is not good.' },
    ],
    usage_notes: 'Can be used with verbs and adjectives. For adjectives, use -ㄴ/은 반면. For verbs in present tense, use -는 반면.',
  },
  {
    id: 'g2',
    level: 3,
    title: '-(으)ㄹ 뿐만 아니라',
    pattern: '-(으)ㄹ 뿐만 아니라',
    explanation: 'Used to express that something is not only A, but also B. Equivalent to "not only... but also...".',
    examples: [
      { korean: '그녀는 한국어를 잘할 뿐만 아니라 영어도 잘해요.', english: 'She not only speaks Korean well but also English.' },
      { korean: '이 식당은 음식 맛이 좋을 뿐만 아니라 서비스도 친절해요.', english: 'This restaurant not only has great food but also friendly service.' },
    ],
    usage_notes: 'Commonly used to add more information that is in the same direction (positive or negative).',
  },
  {
    id: 'g3',
    level: 4,
    title: '-기 때문에',
    pattern: '-기 때문에',
    explanation: 'Used to express a reason or cause. More formal than -아/어서.',
    examples: [
      { korean: '비가 오기 때문에 경기가 취소되었습니다.', english: 'Because it is raining, the game has been cancelled.' },
      { korean: '한국어를 공부하기 때문에 한국 문화에 관심이 생겼어요.', english: 'Because I study Korean, I became interested in Korean culture.' },
    ],
    usage_notes: 'Cannot be used with imperative or suggestive sentences.',
  },
  {
    id: 'g4',
    level: 4,
    title: '-ㄴ/은/는 모양이다',
    pattern: '-ㄴ/은/는 모양이다',
    explanation: 'Used to express an inference based on some evidence. Equivalent to "it seems that" or "it looks like".',
    examples: [
      { korean: '하늘에 구름이 많은 것을 보니 비가 올 모양이에요.', english: 'Looking at the clouds in the sky, it seems it will rain.' },
      { korean: '불이 꺼져 있는 것을 보니 아무도 없는 모양이에요.', english: 'It looks like nobody is there since the lights are off.' },
    ],
    usage_notes: 'Usually based on visual evidence or a situation the speaker has observed.',
  },
  {
    id: 'g5',
    level: 5,
    title: '-거니와',
    pattern: '-거니와',
    explanation: 'Used to express that the first clause is a given fact and adds another fact to it. Similar to -ㄹ 뿐만 아니라 but more formal/literary.',
    examples: [
      { korean: '그는 성격이 좋을 거니와 능력도 뛰어납니다.', english: 'He not only has a good personality but also possesses outstanding ability.' },
      { korean: '이 지역은 경치가 아름다울 거니와 공기도 맑습니다.', english: 'This region has beautiful scenery and the air is also clean.' },
    ],
    usage_notes: 'Often used in written language or formal speeches.',
  },
  {
    id: 'g6',
    level: 5,
    title: '-ㄴ/은/는 법이다',
    pattern: '-ㄴ/은/는 법이다',
    explanation: 'Used to express a general truth or a natural law. Equivalent to "it is only natural that" or "it is bound to".',
    examples: [
      { korean: '겨울이 가면 봄이 오는 법이다.', english: 'Once winter passes, spring is bound to come.' },
      { korean: '노력하지 않으면 실패하는 법이다.', english: "If you don't put in effort, you are bound to fail." },
    ],
    usage_notes: 'Used for things that are considered universal truths or inevitable outcomes.',
  },
  {
    id: 'g7',
    level: 6,
    title: '-기 십상이다',
    pattern: '-기 십상이다',
    explanation: 'Used to express that it is very easy to fall into a certain state or result, often a negative one.',
    examples: [
      { korean: '방심하면 실수하기 십상이다.', english: 'Mistakes are easy to make if you let your guard down.' },
      { korean: '과도한 기대는 실망하기 십상이다.', english: 'Excessive expectations often lead to disappointment.' },
    ],
    usage_notes: 'Usually used with negative outcomes.',
  },
  {
    id: 'g8',
    level: 6,
    title: '-ㄹ/을 리가 없다',
    pattern: '-ㄹ/을 리가 없다',
    explanation: 'Used to express a strong disbelief or denial of a possibility. Equivalent to "there is no way that...".',
    examples: [
      { korean: '그가 거짓말을 할 리가 없다.', english: 'There is no way that he would lie.' },
      { korean: '그렇게 열심히 공부했는데 시험에 떨어질 리가 없다.', english: 'Since they studied so hard, there is no way they would fail the exam.' },
    ],
    usage_notes: 'Expresses the strong subjective belief of the speaker.',
  },
];

export type TOPIKLevel = 3 | 4 | 5 | 6;
